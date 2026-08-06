// Markdown -> HTML with Docusaurus-flavoured extensions:
// :::type[Title] admonitions, <Tabs>/<TabItem> blocks, Shiki dual-theme code.
import MarkdownIt from 'markdown-it';
import { createHighlighter } from 'shiki';

const LANG_ALIASES = {
  yml: 'yaml', sh: 'bash', shell: 'bash', dockerfile: 'docker',
  js: 'javascript', ts: 'typescript', conf: 'ini', text: 'txt', plaintext: 'txt',
};
const SHIKI_LANGS = ['yaml', 'bash', 'docker', 'java', 'properties', 'json', 'typescript',
  'javascript', 'css', 'markdown', 'sql', 'powershell', 'html', 'xml', 'ini', 'nginx', 'python', 'diff'];

let highlighter = null;
export async function initHighlighter() {
  highlighter = await createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: SHIKI_LANGS,
  });
}

function highlight(code, lang) {
  let l = (lang || '').toLowerCase();
  l = LANG_ALIASES[l] ?? l;
  if (!highlighter || !SHIKI_LANGS.includes(l)) l = 'txt';
  try {
    return highlighter.codeToHtml(code, {
      lang: l,
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: 'light',
    });
  } catch {
    return null;
  }
}

export function createRenderer() {
  const md = new MarkdownIt({ html: true, linkify: true });

  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx];
    const info = (token.info || '').trim();
    const lang = info.split(/\s+/)[0] || '';
    // ```bash title="foo" support
    const titleMatch = info.match(/title="([^"]+)"/);
    const html = highlight(token.content.replace(/\n$/, ''), lang);
    const inner = html ?? `<pre class="shiki"><code>${escapeHtml(token.content)}</code></pre>`;
    const langLabel = lang && lang !== 'txt' ? lang : '';
    return `<div class="codeblock">` +
      (titleMatch ? `<div class="codeblock-title">${escapeHtml(titleMatch[1])}</div>` : '') +
      `<button class="codeblock-copy" type="button" aria-label="Copy code">` +
      `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>` +
      `</button>` +
      (langLabel ? `<span class="codeblock-lang">${escapeHtml(langLabel)}</span>` : '') +
      inner + `</div>\n`;
  };

  // heading anchors
  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const next = tokens[idx + 1];
    if (next && next.type === 'inline' && ['h2', 'h3', 'h4'].includes(token.tag)) {
      const slug = slugify(plainText(next));
      const used = env.__anchors ?? (env.__anchors = new Map());
      let final = slug;
      let n = used.get(slug) ?? 0;
      if (n > 0) final = `${slug}-${n}`;
      used.set(slug, n + 1);
      token.attrSet('id', final);
      (env.headings ?? (env.headings = [])).push({ level: Number(token.tag[1]), id: final, text: plainText(next) });
      return `<${token.tag} id="${final}" class="anchor-heading">`;
    }
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.heading_close = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const open = tokens[idx - 2];
    if (open && open.attrGet && open.attrGet('id') && ['h2', 'h3', 'h4'].includes(token.tag)) {
      return `<a class="anchor-link" href="#${open.attrGet('id')}" aria-label="Direct link">#</a></${token.tag}>`;
    }
    return self.renderToken(tokens, idx, options);
  };

  return md;
}

function plainText(inlineToken) {
  return inlineToken.children
    ? inlineToken.children.filter(t => t.type === 'text' || t.type === 'code_inline').map(t => t.content).join('')
    : inlineToken.content;
}

export function slugify(text) {
  return text.toLowerCase().trim()
    .replace(/[^\w\- ]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const ADMONITION_ICONS = {
  note: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  tip: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z"/></svg>',
  info: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8h.01M12 12v4"/></svg>',
  warning: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/></svg>',
  caution: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01"/></svg>',
  danger: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
};
const ADMONITION_LABELS = { note: 'Note', tip: 'Tip', info: 'Info', warning: 'Warning', caution: 'Caution', danger: 'Danger' };

// Pre-pass: convert Docusaurus-only syntax into raw-HTML islands that
// markdown-it will pass through, recursing so inner markdown still renders.
export function preprocess(source, renderInner) {
  let out = source.replace(/\r\n?/g, '\n');
  // strip MDX imports
  out = out.replace(/^import\s+.*from\s+['"][^'"]+['"];?\s*$/gm, '');
  out = transformTabs(out, renderInner);
  out = transformAdmonitions(out, renderInner);
  // <details>/<summary> pass through natively; <br/> ok.
  return out;
}

function transformAdmonitions(src, renderInner) {
  const lines = src.split('\n');
  const out = [];
  const stack = [];
  for (const line of lines) {
    const open = line.match(/^:::(note|tip|info|warning|caution|danger)(?:\[(.*?)\]?)?\s*(.*)$/);
    if (open) {
      stack.push({ type: open[1], title: (open[2] ?? open[3] ?? '').replace(/\]$/, '').trim(), lines: [] });
      continue;
    }
    if (/^:::\s*$/.test(line) && stack.length) {
      const adm = stack.pop();
      const type = adm.type;
      const title = adm.title || ADMONITION_LABELS[type];
      const inner = renderInner(adm.lines.join('\n'));
      const html = `<div class="admonition admonition-${type}">` +
        `<div class="admonition-heading">${ADMONITION_ICONS[type]}<span>${escapeHtml(title)}</span></div>` +
        `<div class="admonition-content">\n\n${inner}\n\n</div></div>`;
      if (stack.length) stack[stack.length - 1].lines.push(html);
      else out.push(html);
      continue;
    }
    if (stack.length) stack[stack.length - 1].lines.push(line);
    else out.push(line);
  }
  // Unclosed admonition: emit content as-is rather than dropping it.
  while (stack.length) {
    const adm = stack.shift();
    out.push(`:::${adm.type}${adm.title ? ' ' + adm.title : ''}`, ...adm.lines);
  }
  return out.join('\n');
}

// Finds balanced <Tag ...>...</Tag> blocks, tolerating same-tag nesting.
function findBalancedBlocks(src, tag) {
  const openRe = new RegExp(`<${tag}(\\s[^>]*)?>`, 'g');
  const anyRe = new RegExp(`<${tag}(\\s[^>]*)?>|</${tag}>`, 'g');
  const blocks = [];
  let m;
  while ((m = openRe.exec(src)) !== null) {
    anyRe.lastIndex = openRe.lastIndex;
    let depth = 1;
    let t;
    while (depth > 0 && (t = anyRe.exec(src)) !== null) {
      depth += t[0].startsWith('</') ? -1 : 1;
    }
    if (depth !== 0) break; // unbalanced: leave the rest untouched
    blocks.push({
      start: m.index,
      end: anyRe.lastIndex,
      attrs: m[1] ?? '',
      inner: src.slice(openRe.lastIndex, anyRe.lastIndex - `</${tag}>`.length),
    });
    openRe.lastIndex = anyRe.lastIndex;
  }
  return blocks;
}

// Strips the common leading indentation MDX allows inside JSX children,
// which plain markdown would otherwise read as an indented code block.
function dedent(src) {
  const lines = src.split('\n');
  let min = Infinity;
  for (const l of lines) {
    if (!l.trim()) continue;
    min = Math.min(min, l.match(/^ */)[0].length);
  }
  if (!isFinite(min) || min === 0) return src;
  return lines.map(l => l.slice(min)).join('\n');
}

function transformTabs(src, renderInner, state = { n: 0 }) {
  const blocks = findBalancedBlocks(src, 'Tabs');
  if (!blocks.length) return src;
  let out = '';
  let pos = 0;
  for (const block of blocks) {
    out += src.slice(pos, block.start);
    out += renderTabsBlock(block, renderInner, state);
    pos = block.end;
  }
  return out + src.slice(pos);
}

function renderTabsBlock(block, renderInner, state) {
  const groupId = (block.attrs.match(/groupId="([^"]+)"/) || [])[1] || `tabs-${state.n}`;
  const uid = `tabs-${state.n++}`;
  const items = findBalancedBlocks(block.inner, 'TabItem').map((b, i) => ({
    value: (b.attrs.match(/value="([^"]+)"/) || [])[1] || `tab-${i}`,
    label: (b.attrs.match(/label="([^"]+)"/) || [])[1] || `Tab ${i + 1}`,
    isDefault: /\bdefault\b/.test(b.attrs),
    content: dedent(b.inner),
  }));
  if (!items.length) return block.inner;
  const defaultIdx = Math.max(0, items.findIndex(i => i.isDefault));
  const tabs = items.map((it, i) =>
    `<button role="tab" class="tab-btn${i === defaultIdx ? ' active' : ''}" data-value="${escapeHtml(it.value)}" aria-selected="${i === defaultIdx}">${escapeHtml(it.label)}</button>`
  ).join('');
  const panels = items.map((it, i) =>
    `<div role="tabpanel" class="tab-panel${i === defaultIdx ? ' active' : ''}" data-value="${escapeHtml(it.value)}">\n\n${renderInner(it.content)}\n\n</div>`
  ).join('\n');
  // Only tab sets with an explicit groupId sync across the site; anonymous
  // ones would otherwise collide on a generated id shared between pages.
  const synced = /groupId="/.test(block.attrs);
  return `<div class="tabs" data-group="${escapeHtml(groupId)}" data-sync="${synced}" id="${uid}">` +
    `<div class="tab-list" role="tablist">${tabs}</div>${panels}</div>`;
}
