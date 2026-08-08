// Static site generator for docs.stirlingpdf.com.
// Renders docs/*.md into ./build, wiring up Kapa AI, Algolia, PostHog,
// Scarf and Termly, and emitting the content bundle the client router uses.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { loadContent, navOrder } from './lib/content.mjs';
import { createRenderer, preprocess, initHighlighter } from './lib/markdown.mjs';
import { renderPage, render404, renderFragment, BUNDLE_TOKEN, navKey, href } from './lib/template.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = path.join(root, 'docs');
const outDir = path.join(root, 'build');
const SITE_URL = 'https://docs.stirlingpdf.com';

async function main() {
  await initHighlighter();
  const md = createRenderer();
  const { tree, pages } = loadContent(docsDir);
  const ordered = navOrder(tree);

  // file path (relative to docs/, forward slashes) -> page, for .md link resolution
  const byFile = new Map();
  for (const p of pages) {
    byFile.set(path.relative(docsDir, p.file).split(path.sep).join('/'), p);
  }

  // doc-id lookup: some links reference a doc by id, e.g. "./analytics-telemetry"
  const byId = new Map();
  for (const p of pages) byId.set(p.docId, p);

  const resolveLink = (rawHref, page) => {
    if (/^(https?:|mailto:|#)/.test(rawHref)) return rawHref;
    const [target, hash] = rawHref.split('#');
    const clean = decodeURIComponent(target);
    if (!clean) return rawHref;
    let resolved;
    if (clean.startsWith('/')) {
      resolved = clean.replace(/^\//, '');
    } else {
      const fromDir = path.dirname(path.relative(docsDir, page.file)).split(path.sep).join('/');
      resolved = path.posix.normalize(path.posix.join(fromDir === '.' ? '' : fromDir, clean));
    }
    const noSlash = resolved.replace(/\/$/, '');
    const candidates = [resolved, resolved + '.md', resolved + '.mdx',
      noSlash + '/' + path.posix.basename(noSlash) + '.md'];
    for (const c of candidates) {
      const hit = byFile.get(c) ?? byId.get(c.replace(/\.mdx?$/, ''));
      if (hit) return href(hit.url) + (hash ? '#' + hash : '');
    }
    // images / static assets keep their path
    return rawHref;
  };

  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  // static assets
  copyDir(path.join(root, 'static'), outDir);
  copyDir(path.join(root, 'site', 'assets'), path.join(outDir, 'assets'));
  // images referenced relatively inside docs tree
  copyDocImages(docsDir, outDir);

  let count = 0;
  const fragments = {};       // nav key -> fragment payload (the content bundle)
  const rendered = [];        // { url, html } written after the bundle hash is known
  for (const page of pages) {
    const env = { headings: [] };
    md.renderer.rules.link_open = ((defaultRule) => (tokens, idx, options, e, self) => {
      const href = tokens[idx].attrGet('href');
      if (href) tokens[idx].attrSet('href', resolveLink(href, page));
      const final = tokens[idx].attrGet('href');
      if (/^https?:\/\//.test(final) && !final.startsWith(SITE_URL)) {
        tokens[idx].attrSet('target', '_blank');
        tokens[idx].attrSet('rel', 'noopener');
      }
      return self.renderToken(tokens, idx, options);
    })();

    const renderInner = (src) => md.render(preprocess(src, renderInner), env);
    const bodyHtml = md.render(preprocess(page.body, renderInner), env);

    const idx = ordered.indexOf(page);
    const prev = idx > 0 ? ordered[idx - 1] : null;
    const next = idx >= 0 && idx < ordered.length - 1 ? ordered[idx + 1] : null;

    const relPath = path.relative(root, page.file).split(path.sep).join('/');
    const editUrl = 'https://github.com/Stirling-Tools/Stirling-Tools.github.io/edit/main/' +
      relPath.split('/').map(encodeURIComponent).join('/');

    const headings = env.headings.filter(h => h.level <= 3);

    const html = renderPage({
      page, bodyHtml, tree, prev, next, editUrl, headings,
      siteUrl: SITE_URL,
    });
    rendered.push({ url: page.url, html });

    const fragment = renderFragment({ page, bodyHtml, prev, next, headings, editUrl });
    fragments[navKey(page.url)] = fragment;

    // Standalone fragment file: the fallback used for clicks that land before
    // the full bundle has finished downloading.
    const key = navKey(page.url);
    writeJson('/_content/pages' + (key === '/' ? '/index' : key) + '.json', fragment);
    count++;
  }

  // One bundle with every page's content (~200KB gzipped for the whole site),
  // fetched once in the background so later navigations need no network.
  const bundleBody = JSON.stringify({ pages: fragments });
  const bundleHash = crypto.createHash('sha256').update(bundleBody).digest('hex').slice(0, 12);
  const bundleUrl = `/_content/bundle-${bundleHash}.json`;
  fs.mkdirSync(path.join(outDir, '_content'), { recursive: true });
  fs.writeFileSync(path.join(outDir, `_content/bundle-${bundleHash}.json`), bundleBody);

  // Cheap endpoint the client re-checks after the tab has been backgrounded,
  // so a long-open tab notices a deploy instead of serving stale content.
  writeJson('/_content/version.json', { v: bundleHash });

  for (const { url, html } of rendered) {
    writePage(url, html.split(BUNDLE_TOKEN).join(bundleUrl));
  }

  // Redirect stubs for moved pages (redirects.json: old path -> new path)
  const redirectsFile = path.join(root, 'redirects.json');
  if (fs.existsSync(redirectsFile)) {
    const redirects = JSON.parse(fs.readFileSync(redirectsFile, 'utf8'));
    for (const [oldPath, newPath] of Object.entries(redirects)) {
      const target = href(newPath);
      const stub = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Redirecting…</title>
<link rel="canonical" href="${SITE_URL}${target}">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace('${target}' + location.hash);</script>
</head>
<body><p>This page has moved to <a href="${target}">${escapeAttr(newPath)}</a>.</p></body>
</html>`;
      const rel = oldPath.replace(/^\//, '').replace(/\/$/, '');
      const dir = path.join(outDir, rel);
      if (!fs.existsSync(path.join(dir, 'index.html'))) {
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), stub);
      }
    }
    console.log(`Wrote ${Object.keys(redirects).length} redirect stubs`);
  }

  // 404 + sitemap
  fs.writeFileSync(path.join(outDir, '404.html'),
    render404({ tree, siteUrl: SITE_URL }).split(BUNDLE_TOKEN).join(bundleUrl));
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    pages.map(p => `  <url><loc>${SITE_URL}${href(p.url)}</loc></url>`).join('\n') +
    `\n</urlset>\n`;
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
  fs.copyFileSync(path.join(root, 'CNAME'), path.join(outDir, 'CNAME'));
  // Browsers request /favicon.ico at the root regardless of link tags.
  fs.copyFileSync(path.join(root, 'static', 'img', 'favicon.ico'), path.join(outDir, 'favicon.ico'));

  console.log(`Built ${count} pages -> ${outDir}`);
}

function writeJson(urlPath, data) {
  const file = path.join(outDir, urlPath.replace(/^\//, ''));
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data));
}

function writePage(url, html) {
  // '/Foo/Bar' -> build/Foo/Bar/index.html ; '/' -> build/index.html
  const rel = url === '/' ? '' : url.replace(/^\//, '').replace(/\/$/, '');
  const dir = path.join(outDir, rel);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

function encodeUrl(url) {
  return url.split('/').map(encodeURIComponent).join('/').replace(/%2F/g, '/');
}

function escapeAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.cpSync(src, dest, { recursive: true });
}

function copyDocImages(dir, dest) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      copyDocImages(full, dest);
    } else if (/\.(png|jpe?g|gif|svg|webp|mp4)$/i.test(entry.name)) {
      const rel = path.relative(docsDir, full);
      const target = path.join(dest, rel);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(full, target);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
