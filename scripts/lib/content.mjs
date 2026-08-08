// Walks docs/, parses frontmatter + _category_.json, builds the nav tree
// and computes URLs matching the site's established scheme, so existing
// links and the search index keep working.
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export function loadContent(docsDir) {
  const tree = walkDir(docsDir, docsDir);
  const pages = [];
  flattenPages(tree, pages);
  pages.sort((a, b) => a.url.localeCompare(b.url));
  return { tree, pages };
}

function walkDir(dir, rootDir) {
  const rel = path.relative(rootDir, dir).split(path.sep).join('/');
  const dirName = path.basename(dir);
  const node = {
    type: 'category',
    label: dirName,
    position: Infinity,
    indexPage: null,
    items: [],
  };

  const catFile = path.join(dir, '_category_.json');
  let catLink = null;
  if (fs.existsSync(catFile)) {
    const cat = JSON.parse(fs.readFileSync(catFile, 'utf8'));
    if (cat.label) node.label = cat.label;
    if (typeof cat.position === 'number') node.position = cat.position;
    if (cat.link && cat.link.type === 'doc') catLink = cat.link.id;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      node.items.push(walkDir(full, rootDir));
      continue;
    }
    if (!/\.mdx?$/.test(entry.name)) continue;

    const raw = fs.readFileSync(full, 'utf8');
    const { data: fm, content } = matter(raw);
    const baseName = entry.name.replace(/\.mdx?$/, '');
    const id = fm.id ?? baseName;
    const relDir = rel === '' ? [] : rel.split('/');
    const docId = [...relDir, id].join('/');

    // A file named like its folder (or index/README) is the category index.
    const isIndex = rel !== '' && (baseName === dirName || /^(index|readme)$/i.test(baseName));

    let url;
    if (typeof fm.slug === 'string') {
      url = fm.slug.startsWith('/') ? fm.slug : '/' + [...relDir, fm.slug].join('/');
    } else if (isIndex) {
      url = '/' + relDir.join('/') + '/';
    } else {
      url = '/' + [...relDir, id].join('/');
    }
    const page = {
      type: 'doc',
      file: full,
      docId,
      id,
      url,
      title: fm.title ?? id,
      sidebarLabel: fm.sidebar_label ?? fm.title ?? id,
      position: typeof fm.sidebar_position === 'number' ? fm.sidebar_position : Infinity,
      description: fm.description ?? null,
      body: content,
      isIndex,
    };

    if (isIndex || (catLink && docId === catLink)) {
      node.indexPage = page;
      if (page.position !== Infinity && node.position === Infinity) node.position = page.position;
    } else {
      node.items.push(page);
    }
  }

  node.items.sort((a, b) => {
    const pa = a.position ?? Infinity;
    const pb = b.position ?? Infinity;
    if (pa !== pb) return pa - pb;
    return (a.label ?? a.sidebarLabel).localeCompare(b.label ?? b.sidebarLabel);
  });

  return node;
}

function flattenPages(node, out) {
  if (node.indexPage) out.push(node.indexPage);
  for (const item of node.items) {
    if (item.type === 'doc') out.push(item);
    else flattenPages(item, out);
  }
}

// Ordered list for prev/next navigation, following sidebar order.
export function navOrder(tree) {
  const out = [];
  const visit = (node) => {
    if (node.indexPage) out.push(node.indexPage);
    for (const item of node.items) {
      if (item.type === 'doc') out.push(item);
      else visit(item);
    }
  };
  visit(tree);
  return out;
}
