import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { loadContent, navOrder } from './lib/content.mjs';

test('the retirement guide is reachable without appearing in normal docs discovery', () => {
  const { tree, pages } = loadContent('docs');
  const guide = pages.find(page => page.id === 'Server-Plan-Retired');
  assert(guide?.unlisted);
  assert(!navOrder(tree).includes(guide));

  const html = fs.readFileSync('build/Server-Plan-Retired/index.html', 'utf8');
  assert(html.includes('The legacy Server plan is no longer available for new purchases.'));
  assert(html.includes('<meta name="robots" content="noindex, follow">'));
  assert(!fs.readFileSync('build/sitemap.xml', 'utf8').includes('Server-Plan-Retired'));

  for (const page of pages.filter(page => !page.unlisted)) {
    const file = path.join('build', page.url.replace(/^\//, ''), 'index.html');
    const publicHtml = fs.readFileSync(file, 'utf8');
    assert(!publicHtml.includes('href="/Server-Plan-Retired/"'), page.url);
    assert(publicHtml.includes('<meta name="robots" content="index, follow">'), page.url);
  }

  const fragment = JSON.parse(fs.readFileSync('build/_content/pages/Server-Plan-Retired.json', 'utf8'));
  assert.equal(fragment.unlisted, true);
  assert(!fragment.pager.includes('<a '));
});
