// Page shell: navbar, sidebar, content, right-hand ToC.
// Third-party integrations:
// Termly, Kapa AI widget, Algolia DocSearch, PostHog, Scarf pixel.
import { escapeHtml } from './markdown.mjs';

const KAPA = {
  websiteId: '32633e81-a72c-4df4-9cb9-c6cd3a0899cb',
  projectName: 'Stirling PDF',
  projectColor: '#8E3131',
  // Chevron mark inlined as a data URI so the launcher icon renders
  // everywhere (locally and before/after deploys), no hosted file needed.
  projectLogo: 'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.961 29.046"><path d="M 0 14.489 L 17.69 0 L 17.69 13.531 L 0 28.02 L 0 14.489 Z" fill="rgb(173,115,115)"/><path d="M 9.25 15.498 L 26.961 0.991 L 26.961 14.539 L 9.25 29.046 Z" fill="rgb(142,49,49)"/></svg>'
  ),
};
const ALGOLIA = { appId: 'NJB9CKQAIT', apiKey: 'c67f84bf0cdec4d1962ac4e0d65fb4e5', indexName: 'stirlingpdf' };
const POSTHOG = { apiKey: 'phc_qy9V53BkvTATJESFrSBvg8Rw5m3KvYuTmmk9IojIjyZ', apiHost: 'https://eu.i.posthog.com' };

function encodeUrl(url) {
  return url.split('/').map(encodeURIComponent).join('/').replace(/%2F/g, '/');
}

// Canonical link form: directory URLs keep a trailing slash so they resolve
// directly instead of taking a 301 redirect (measured 67ms vs 150ms).
export function href(url) {
  const e = encodeUrl(url);
  return e === '/' ? '/' : e.replace(/\/?$/, '/');
}

// Placeholder swapped for the hashed bundle URL once every page is rendered.
export const BUNDLE_TOKEN = '__CONTENT_BUNDLE_URL__';

// Canonical lookup key for a page: decoded path, no trailing slash (except root).
// The client derives the same key from location.pathname.
export function navKey(url) {
  const clean = url.replace(/\/+$/, '');
  return clean === '' ? '/' : clean;
}

function head({ title, description, url, siteUrl }) {
  const fullTitle = title ? `${title} | Stirling PDF` : 'Stirling PDF Documentation';
  const desc = description ?? 'Documentation for Stirling PDF - your locally hosted one-stop-shop for all your PDF needs.';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(fullTitle)}</title>
<meta name="description" content="${escapeHtml(desc)}">
<link rel="canonical" href="${siteUrl}${href(url)}">
<link rel="icon" href="/img/stirling-mark.svg" type="image/svg+xml">
<link rel="alternate icon" href="/favicon.ico">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png">
<meta property="og:title" content="${escapeHtml(fullTitle)}">
<meta property="og:description" content="${escapeHtml(desc)}">
<meta property="og:image" content="${siteUrl}/img/Stirling_PDF_App_Icon_-_Favicon_2-f8d8fab3.png">
<meta property="og:url" content="${siteUrl}${href(url)}">
<meta name="twitter:card" content="summary">
<link rel="preconnect" href="https://app.termly.io">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Geist:wght@400;500;600;700&family=Alumni+Sans:wght@700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3">
<script>(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();</script>
<script src="https://app.termly.io/resource-blocker/aa66d813-045f-4a28-b465-6aab431924d6" type="text/javascript" data-autoblock="on"></script>
<script async src="https://widget.kapa.ai/kapa-widget.bundle.js"
  data-website-id="${KAPA.websiteId}"
  data-project-name="${KAPA.projectName}"
  data-project-color="${KAPA.projectColor}"
  data-project-logo="${KAPA.projectLogo}"
  data-view-mode="sidebar"
  data-button-bg-color="#000000"
  data-button-text-color="#ffffff"
  data-color-scheme-selector="[data-theme='dark']"></script>
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init('${POSTHOG.apiKey}',{api_host:'${POSTHOG.apiHost}',capture_pageview:false});
</script>
</head>`;
}

// Mirrors the stirling.com site header: light translucent bar, Alumni Sans
// wordmark beside the red chevron mark, and the Log in / Sign up pills.
function navbar() {
  return `<header class="navbar">
  <div class="navbar-inner">
    <button class="menu-toggle" aria-label="Toggle navigation">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    </button>
    <a class="brand" href="https://stirling.com/">
      <img src="/img/stirling-mark.svg" alt="" width="27" height="29">
      <span class="brand-name">Stirling</span>
    </a>
    <nav class="navbar-center">
      <div class="nav-item">
        <button class="nav-trigger" type="button" aria-expanded="false" aria-haspopup="true">Product <svg class="nav-caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg></button>
        <div class="nav-menu">
          <a class="nav-menu-item" href="https://stirling.com/#editor">
            <span class="nav-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9"/><path d="M13 3v6h6"/><path d="m17.5 11.5 3 3-4.5 4.5H13v-3z"/></svg></span>
            <span class="nav-menu-text"><span class="nav-menu-title">PDF Editor</span><span class="nav-menu-desc">60+ PDF operations</span></span>
          </a>
          <a class="nav-menu-item" href="https://stirling.com/#processor">
            <span class="nav-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/></svg></span>
            <span class="nav-menu-text"><span class="nav-menu-title">PDF Processor</span><span class="nav-menu-desc">Automated PDF pipelines</span></span>
          </a>
          <a class="nav-menu-item" href="https://stirling.com/#infrastructure">
            <span class="nav-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="7.5" ry="3"/><path d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6"/><path d="M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6"/></svg></span>
            <span class="nav-menu-text"><span class="nav-menu-title">PDF Server</span><span class="nav-menu-desc">Infrastructure for teams</span></span>
          </a>
          <a class="nav-menu-item" href="https://stirling.com/book-a-demo">
            <span class="nav-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg></span>
            <span class="nav-menu-text"><span class="nav-menu-title">Book a demo</span><span class="nav-menu-desc">Walk through it with our team.</span></span>
          </a>
        </div>
      </div>
      <div class="nav-item">
        <button class="nav-trigger" type="button" aria-expanded="false" aria-haspopup="true">Company <svg class="nav-caret" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg></button>
        <div class="nav-menu">
          <a class="nav-menu-item" href="https://stirling.com/about">
            <span class="nav-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3.2"/><path d="M2.8 20a6.2 6.2 0 0 1 12.4 0"/><path d="M16.5 5.3a3.2 3.2 0 0 1 0 5.9M18 14.4a6.2 6.2 0 0 1 3.2 5.6"/></svg></span>
            <span class="nav-menu-text"><span class="nav-menu-title">About</span><span class="nav-menu-desc">Who we are</span></span>
          </a>
          <a class="nav-menu-item" href="https://stirling.com/careers">
            <span class="nav-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg></span>
            <span class="nav-menu-text"><span class="nav-menu-title">Careers</span><span class="nav-menu-desc">Come build with us</span></span>
          </a>
          <a class="nav-menu-item" href="https://stirling.com/help-center">
            <span class="nav-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12a8 8 0 0 1-8 8H4l2.2-2.9A8 8 0 1 1 21 12z"/><path d="M9 11h6M9 14.5h4"/></svg></span>
            <span class="nav-menu-text"><span class="nav-menu-title">Help center</span><span class="nav-menu-desc">Guides and support</span></span>
          </a>
          <a class="nav-menu-item" href="https://stirling.com/legal/terms-of-service">
            <span class="nav-menu-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v18M5 7h14M7 7l-3 6h6zM17 7l-3 6h6z"/></svg></span>
            <span class="nav-menu-text"><span class="nav-menu-title">Legal</span><span class="nav-menu-desc">Terms and policies</span></span>
          </a>
        </div>
      </div>
      <a href="https://stirling.com/pricing">Pricing</a>
      <a href="https://stirling.com/download">Download</a>
      <a href="/" class="active">Docs</a>
    </nav>
    <nav class="navbar-links">
      <button class="ask-ai" type="button" onclick="window.Kapa&&window.Kapa.open()">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z"/></svg>
        <span>Ask AI</span>
      </button>
      <button class="theme-toggle" type="button" aria-label="Toggle dark mode">
        <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <a href="https://github.com/Stirling-Tools/Stirling-PDF" target="_blank" rel="noopener" class="gh-star" aria-label="Star on GitHub">
        <svg width="24" height="24" viewBox="0 0 24 23.406" fill="currentColor"><path d="M 12 0 C 5.37 0 0 5.373 0 12 C 0 17.303 3.438 21.8 8.205 23.385 C 8.805 23.498 9.025 23.127 9.025 22.808 C 9.025 22.523 9.015 21.768 9.01 20.768 C 5.672 21.492 4.968 19.158 4.968 19.158 C 4.422 17.773 3.633 17.403 3.633 17.403 C 2.546 16.659 3.717 16.674 3.717 16.674 C 4.922 16.758 5.555 17.91 5.555 17.91 C 6.625 19.745 8.364 19.215 9.05 18.908 C 9.158 18.132 9.467 17.603 9.81 17.303 C 7.145 17.003 4.344 15.971 4.344 11.374 C 4.344 10.063 4.809 8.993 5.579 8.153 C 5.444 7.85 5.039 6.63 5.684 4.977 C 5.684 4.977 6.689 4.655 8.984 6.207 C 9.944 5.941 10.964 5.808 11.984 5.803 C 13.004 5.808 14.024 5.941 14.984 6.207 C 17.264 4.655 18.269 4.977 18.269 4.977 C 18.914 6.63 18.509 7.85 18.389 8.153 C 19.154 8.993 19.619 10.063 19.619 11.374 C 19.619 15.983 16.814 16.998 14.144 17.293 C 14.564 17.663 14.954 18.398 14.954 19.523 C 14.954 21.135 14.939 22.413 14.939 22.808 C 14.939 23.127 15.154 23.503 15.764 23.385 C 20.565 21.795 24 17.3 24 12 C 24 5.373 18.627 0 12 0 Z"/></svg>
        <span class="gh-star-count" data-star-count>89.1k</span>
      </a>
      <a class="navbar-login" href="https://stirling.com/app/login">Log in</a>
      <a class="navbar-cta" href="https://stirling.com/app/signup">Sign up</a>
    </nav>
  </div>
</header>`;
}

function sidebarHtml(tree, currentUrl) {
  const renderItems = (items) => items.map(item => {
    if (item.type === 'doc') {
      const active = item.url === currentUrl ? ' active' : '';
      return `<li><a class="side-link${active}" href="${href(item.url)}">${escapeHtml(item.sidebarLabel)}</a></li>`;
    }
    const containsActive = categoryContains(item, currentUrl);
    const idxUrl = item.indexPage ? href(item.indexPage.url) : null;
    const activeIdx = item.indexPage && item.indexPage.url === currentUrl ? ' active' : '';
    // Category whose only page is its own index: render as a plain link.
    if (!item.items.length && idxUrl) {
      return `<li><a class="side-link${activeIdx}" href="${idxUrl}">${escapeHtml(item.label)}</a></li>`;
    }
    return `<li class="side-category${containsActive ? ' open' : ''}">
      <div class="side-category-row">
        ${idxUrl
          ? `<a class="side-link side-cat-label${activeIdx}" href="${idxUrl}">${escapeHtml(item.label)}</a>`
          : `<button class="side-link side-cat-label" type="button">${escapeHtml(item.label)}</button>`}
        <button class="side-caret" type="button" aria-label="Expand ${escapeHtml(item.label)}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
      <ul class="side-sub">${renderItems(item.items)}</ul>
    </li>`;
  }).join('\n');

  const top = [];
  if (tree.indexPage) {
    const active = tree.indexPage.url === currentUrl ? ' active' : '';
    top.push(`<li><a class="side-link${active}" href="${href(tree.indexPage.url)}">${escapeHtml(tree.indexPage.sidebarLabel)}</a></li>`);
  }
  return `<aside class="sidebar"><div class="sidebar-search"><div id="docsearch"></div></div><nav class="sidebar-nav"><ul>${top.join('')}${renderItems(tree.items)}</ul></nav></aside>`;
}

function categoryContains(cat, url) {
  if (cat.indexPage && cat.indexPage.url === url) return true;
  return cat.items.some(i => i.type === 'doc' ? i.url === url : categoryContains(i, url));
}

// Inner-HTML builders are shared by the full page shell and the JSON content
// fragments the client router swaps in, so both always render identically.
function tocInner(headings) {
  if (!headings.length) return '';
  const items = headings.map(h =>
    `<li class="toc-l${h.level}"><a href="#${h.id}">${escapeHtml(h.text)}</a></li>`).join('\n');
  return `<div class="toc-title">On this page</div><ul>${items}</ul>`;
}

function tocHtml(headings) {
  return `<aside class="toc">${tocInner(headings)}</aside>`;
}

function pagerInner(prev, next) {
  const cell = (p, dir) => p
    ? `<a class="pager-link pager-${dir}" href="${href(p.url)}">
        <span class="pager-dir">${dir === 'prev' ? '&larr; Previous' : 'Next &rarr;'}</span>
        <span class="pager-title">${escapeHtml(p.sidebarLabel)}</span>
      </a>`
    : '<span></span>';
  return cell(prev, 'prev') + cell(next, 'next');
}

function pagerHtml(prev, next) {
  return `<nav class="pager">${pagerInner(prev, next)}</nav>`;
}

// Mirrors the stirling.com site footer: brand + tagline + socials on the
// left, Product / Resources / Company columns, subdued legal row below.
function footerHtml() {
  const year = new Date().getFullYear();
  return `<footer class="footer">
  <div class="footer-inner">
    <div class="footer-main">
      <div class="footer-brand">
        <a class="footer-wordmark" href="https://stirling.com/">
          <img src="/img/stirling-mark.svg" alt="" width="20" height="22">
          <span>Stirling</span>
        </a>
        <p class="footer-tagline">The Secure PDF Processor</p>
        <div class="footer-social">
          <a href="https://discord.com/invite/Cn8pWhQRxZ" target="_blank" rel="noopener" aria-label="Discord">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.44.87-.6 1.25a18.3 18.3 0 0 0-5.5 0 12.6 12.6 0 0 0-.61-1.25.08.08 0 0 0-.08-.04 19.7 19.7 0 0 0-4.88 1.52.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06c0 .02.01.04.03.05a19.9 19.9 0 0 0 6 3.03.08.08 0 0 0 .08-.03c.46-.63.87-1.3 1.22-2a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1-.01-.12c.13-.1.25-.19.37-.29a.07.07 0 0 1 .08-.01c3.93 1.8 8.18 1.8 12.06 0a.07.07 0 0 1 .08 0c.12.11.25.2.37.3a.08.08 0 0 1 0 .12 12.3 12.3 0 0 1-1.88.9.08.08 0 0 0-.04.1c.36.7.77 1.37 1.22 2a.08.08 0 0 0 .08.03 19.8 19.8 0 0 0 6.02-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.68-3.55-13.66a.06.06 0 0 0-.03-.03zM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42s.96-2.42 2.16-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42s.95-2.42 2.15-2.42c1.22 0 2.18 1.1 2.16 2.42 0 1.34-.94 2.42-2.16 2.42z"/></svg>
          </a>
          <a href="https://x.com/StirlingPDF" target="_blank" rel="noopener" aria-label="X (Twitter)">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://www.linkedin.com/company/stirling-pdf/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z"/></svg>
          </a>
          <a href="https://github.com/Stirling-Tools/Stirling-PDF" target="_blank" rel="noopener" aria-label="GitHub">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.78 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .3.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-cols">
        <div class="footer-col">
          <div class="footer-title">Product</div>
          <a href="https://stirling.com/#1">Features</a>
          <a href="https://stirling.com/pricing">Pricing</a>
          <a href="https://stirling.com/download">Download</a>
        </div>
        <div class="footer-col">
          <div class="footer-title">Resources</div>
          <a href="/">Docs</a>
          <a href="https://registry.scalar.com/@stirlingpdf/apis/stirling-pdf-processing-api/" target="_blank" rel="noopener">API</a>
          <a href="https://github.com/Stirling-Tools/Stirling-PDF/releases" target="_blank" rel="noopener">Changelog</a>
        </div>
        <div class="footer-col">
          <div class="footer-title">Company</div>
          <a href="https://stirling.com/about">About</a>
          <a href="https://stirling.com/contact">Contact</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-legal">
        <a href="https://stirling.com/legal/terms-of-service">Terms of Service</a>
        <a href="https://stirling.com/legal/privacy-policy">Privacy Policy</a>
      </div>
      <div class="footer-copyright">&copy; ${year} Stirling PDF, Inc.</div>
    </div>
  </div>
</footer>`;
}

function scripts() {
  return `<script>window.__DOCS_BUNDLE__ = "${BUNDLE_TOKEN}";</script>
<script src="https://cdn.jsdelivr.net/npm/@docsearch/js@3"></script>
<script>
  docsearch({
    container: '#docsearch',
    appId: '${ALGOLIA.appId}',
    apiKey: '${ALGOLIA.apiKey}',
    indexName: '${ALGOLIA.indexName}',
    transformItems: function(items){
      return items
        .map(function(item){
          return Object.assign({}, item, { url: item.url.replace(/^https?:\\/\\/[^/]+/, '').replace(/^\\/docs\\//, '/') });
        })
        .filter(function(item){ return item.url.indexOf('/1.5/') !== 0; });
    }
  });
</script>
<script src="/assets/main.js"></script>
<img referrerpolicy="no-referrer-when-downgrade" src="https://static.scarf.sh/a.png?x-pxid=5d074971-2ecb-4c54-8397-30c0f91896b3" height="1" width="1" style="display:none" alt="">`;
}

function articleInner({ page, bodyHtml, editUrl }) {
  // Don't duplicate the H1 if the markdown already starts with one.
  const hasH1 = /<h1[\s>]/.test(bodyHtml.slice(0, 500));
  return `${hasH1 ? '' : `<h1 class="doc-title">${escapeHtml(page.title)}</h1>`}
    ${bodyHtml}
    ${editUrl ? `<div class="doc-source">
      <a href="${editUrl}" target="_blank" rel="noopener">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
        Edit this page on GitHub
      </a>
    </div>` : ''}`;
}

// The per-page payload the client router swaps in. Only the parts that differ
// between pages - the shell (navbar, sidebar, footer) is never re-rendered.
export function renderFragment({ page, bodyHtml, prev, next, headings, editUrl }) {
  return {
    title: page.title,
    description: page.description ?? '',
    article: articleInner({ page, bodyHtml, editUrl }),
    toc: tocInner(headings),
    pager: pagerInner(prev, next),
  };
}

export function renderPage({ page, bodyHtml, tree, prev, next, headings, siteUrl, editUrl }) {
  return `${head({ title: page.title, description: page.description, url: page.url, siteUrl })}
<body>
<a class="skip-link" href="#content">Skip to content</a>
${navbar()}
<div class="layout">
${sidebarHtml(tree, page.url)}
<main class="content" id="content">
  <article class="doc">
    ${articleInner({ page, bodyHtml, editUrl })}
  </article>
  ${pagerHtml(prev, next)}
</main>
${tocHtml(headings)}
</div>
${footerHtml()}
<div class="sidebar-backdrop"></div>
${scripts()}
</body>
</html>`;
}

export function render404({ tree, siteUrl }) {
  return `${head({ title: 'Page Not Found', description: null, url: '/404.html', siteUrl })}
<body>
${navbar()}
<div class="layout">
${sidebarHtml(tree, '__none__')}
<main class="content">
  <article class="doc notfound">
    <h1>Page not found</h1>
    <p>We couldn't find what you were looking for. Try the search in the sidebar, or head back to the <a href="/">documentation home</a>.</p>
  </article>
</main>
<aside class="toc"></aside>
</div>
${footerHtml()}
<div class="sidebar-backdrop"></div>
${scripts()}
</body>
</html>`;
}
