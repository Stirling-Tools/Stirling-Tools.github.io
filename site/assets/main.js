// Docs shell behaviour + client-side router.
//
// Navigation swaps only the article, table of contents and pager from a JSON
// content fragment; the navbar, sidebar and footer are never re-rendered, so
// DocSearch/Kapa stay mounted and there is nothing to re-initialise. The whole
// site's content (~240KB gzipped) is fetched once in the background, after
// which every navigation is zero-network.
//
// Interactive behaviour uses delegated document-level listeners so swapping
// content never attaches (or leaks) per-element handlers.
(function () {
  'use strict';

  var doc = document;
  var BUNDLE_URL = window.__DOCS_BUNDLE__ || '';

  // ── Helpers ──────────────────────────────────────────────────────────────

  function keyFromPath(pathname) {
    var d;
    try { d = decodeURIComponent(pathname); } catch (e) { d = pathname; }
    d = d.replace(/\/+$/, '');
    return d === '' ? '/' : d;
  }

  function fragmentUrl(key) {
    var p = key === '/' ? '/index' : key;
    return '/_content/pages' + p.split('/').map(encodeURIComponent).join('/') + '.json';
  }

  // ── Theme ────────────────────────────────────────────────────────────────

  var themeBtn = doc.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var dark = doc.documentElement.getAttribute('data-theme') === 'dark';
      if (dark) doc.documentElement.removeAttribute('data-theme');
      else doc.documentElement.setAttribute('data-theme', 'dark');
      try { localStorage.setItem('theme', dark ? 'light' : 'dark'); } catch (e) {}
    });
  }

  // ── Mobile drawer ────────────────────────────────────────────────────────

  var menuBtn = doc.querySelector('.menu-toggle');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () { doc.body.classList.toggle('nav-open'); });
  }
  var backdrop = doc.querySelector('.sidebar-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', function () { doc.body.classList.remove('nav-open'); });
  }

  // ── GitHub star count (cached a day; falls back to the baked-in value) ────

  var starEl = doc.querySelector('[data-star-count]');
  if (starEl) {
    var renderStars = function (n) {
      starEl.textContent = n >= 10000 ? Math.round(n / 1000) + 'k'
        : n >= 1000 ? (Math.round(n / 100) / 10) + 'k' : String(n);
    };
    try {
      var cached = JSON.parse(localStorage.getItem('gh-stars') || 'null');
      if (cached && Date.now() - cached.t < 864e5) {
        renderStars(cached.n);
      } else {
        fetch('https://api.github.com/repos/Stirling-Tools/Stirling-PDF')
          .then(function (r) { return r.json(); })
          .then(function (d) {
            if (d && typeof d.stargazers_count === 'number') {
              renderStars(d.stargazers_count);
              localStorage.setItem('gh-stars', JSON.stringify({ n: d.stargazers_count, t: Date.now() }));
            }
          })
          .catch(function () {});
      }
    } catch (e) {}
  }

  // ── Kapa launcher hover colour ───────────────────────────────────────────
  // Its hover derives from the project colour (bright blue). Keep a subtle
  // override alive; the widget re-renders and re-injects styles at will, so an
  // observer re-asserts it (last in DOM, current hashed classes) each time.

  (function fixKapaHover(attempts) {
    var c = doc.querySelector('#kapa-widget-container');
    if (!c || !c.shadowRoot) {
      if (attempts > 0) setTimeout(function () { fixKapaHover(attempts - 1); }, 500);
      return;
    }
    var root = c.shadowRoot;
    var ensure = function () {
      var btn = root.querySelector('button');
      var sels = ['button:has(img)'];
      if (btn) {
        [].forEach.call(btn.classList, function (x) {
          if (/^mantine-[a-z0-9]+$/.test(x) && x !== 'mantine-active' && x !== 'mantine-focus-auto') {
            sels.push('.' + x);
          }
        });
      }
      // Kapa tints the launcher's border with the project colour; on the black
      // button that reads as a stray coloured outline, so neutralise it.
      var css = sels.join(', ') +
        ' { border-color: rgba(255, 255, 255, 0.16) !important; }\n' +
        sels.map(function (s) { return s + ':hover'; }).join(', ') +
        ' { background-color: #1f1f23 !important; }';
      var style = root.querySelector('#stirling-kapa-hover');
      if (!style) {
        style = doc.createElement('style');
        style.id = 'stirling-kapa-hover';
      }
      if (style.textContent !== css) style.textContent = css;
      if (root.lastElementChild !== style) root.appendChild(style);
    };
    ensure();
    var pending = null;
    new MutationObserver(function () {
      if (pending) return;
      pending = setTimeout(function () { pending = null; ensure(); }, 100);
    }).observe(root, { childList: true, subtree: true });
  })(20);

  // ── Delegated interactions (attached once, survive every content swap) ────

  function selectTab(tabsEl, value) {
    tabsEl.querySelectorAll(':scope > .tab-list > .tab-btn').forEach(function (b) {
      var on = b.getAttribute('data-value') === value;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    tabsEl.querySelectorAll(':scope > .tab-panel').forEach(function (p) {
      p.classList.toggle('active', p.getAttribute('data-value') === value);
    });
  }

  doc.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;

    // Sidebar category expand/collapse
    var caret = t.closest('.side-caret');
    if (caret) {
      e.preventDefault();
      e.stopPropagation();
      var cat = caret.closest('.side-category');
      if (cat) cat.classList.toggle('open');
      return;
    }
    // An open category collapses on click, even when its label links to its own page;
    // preventDefault also stops the router navigating. A closed link label opens and navigates.
    var catLabel = t.closest('.side-cat-label');
    if (catLabel) {
      var cat2 = catLabel.closest('.side-category');
      if (cat2 && cat2.classList.contains('open')) {
        e.preventDefault();
        cat2.classList.remove('open');
      } else if (cat2) {
        cat2.classList.add('open');
      }
      return;
    }

    // Navbar dropdowns: hover/focus is handled in CSS; this adds click
    // toggling so they work on touch, and closes them on outside clicks.
    var trigger = t.closest('.nav-trigger');
    if (trigger) {
      var item = trigger.closest('.nav-item');
      var wasOpen = item.classList.contains('open');
      doc.querySelectorAll('.nav-item.open').forEach(function (n) {
        n.classList.remove('open');
        var b = n.querySelector('.nav-trigger');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      item.classList.toggle('open', !wasOpen);
      trigger.setAttribute('aria-expanded', String(!wasOpen));
      return;
    }
    doc.querySelectorAll('.nav-item.open').forEach(function (n) {
      n.classList.remove('open');
      var b = n.querySelector('.nav-trigger');
      if (b) b.setAttribute('aria-expanded', 'false');
    });

    // Tabs (synced by groupId, remembered across pages)
    var tabBtn = t.closest('.tab-btn');
    if (tabBtn) {
      var tabsEl = tabBtn.closest('.tabs');
      if (tabsEl) {
        var value = tabBtn.getAttribute('data-value');
        var group = tabsEl.getAttribute('data-group');
        selectTab(tabsEl, value);
        // Only tab sets that opted into a groupId sync and persist; anonymous
        // ones are page-local and must not share state across pages.
        if (group && tabsEl.getAttribute('data-sync') === 'true') {
          try { localStorage.setItem('tab-group:' + group, value); } catch (err) {}
          doc.querySelectorAll('.tabs[data-sync="true"][data-group="' + CSS.escape(group) + '"]').forEach(function (el) {
            if (el !== tabsEl && el.querySelector('.tab-btn[data-value="' + CSS.escape(value) + '"]')) selectTab(el, value);
          });
        }
      }
      return;
    }

    // Copy button
    var copy = t.closest('.codeblock-copy');
    if (copy) {
      var pre = copy.parentElement.querySelector('pre');
      // clipboard is unavailable on non-secure origins
      if (!pre || !navigator.clipboard) return;
      navigator.clipboard.writeText(pre.innerText).then(function () {
        copy.classList.add('copied');
        setTimeout(function () { copy.classList.remove('copied'); }, 1600);
      }).catch(function () {});
      return;
    }
  });

  doc.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    doc.querySelectorAll('.nav-item.open').forEach(function (n) {
      n.classList.remove('open');
      var b = n.querySelector('.nav-trigger');
      if (b) { b.setAttribute('aria-expanded', 'false'); b.blur(); }
    });
  });

  // ── ToC scroll-spy (one listener; heading list rebuilt per page) ──────────

  var spy = { links: {}, headings: [], active: null };

  // Collect nodes only - no geometry reads, so this never forces a layout
  // during a content swap. onScroll() (which measures) is deferred to a frame.
  function rebuildSpy() {
    spy.links = {};
    spy.headings = [];
    spy.active = null;
    doc.querySelectorAll('.toc a[href^="#"]').forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      spy.links[id] = a;
      var h = doc.getElementById(id);
      if (h) spy.headings.push(h);
    });
  }

  // Run after the browser has painted. Falls back to a timer when rAF is
  // throttled (background/hidden tabs) so deferred work still happens.
  function afterPaint(fn) {
    var ran = false;
    var once = function () { if (!ran) { ran = true; fn(); } };
    if ('requestAnimationFrame' in window) {
      requestAnimationFrame(once);
      setTimeout(once, 60);
    } else {
      setTimeout(once, 0);
    }
  }

  function onScroll() {
    scrollPositions[historyKey] = window.scrollY;   // for back/forward restore
    if (!spy.headings.length) return;
    var line = 96; // just under the sticky navbar
    var current = null;
    for (var i = 0; i < spy.headings.length; i++) {
      if (spy.headings[i].getBoundingClientRect().top <= line) current = spy.headings[i];
      else break;
    }
    var link = current ? spy.links[current.id] : null;
    if (spy.active === link) return;
    if (spy.active) spy.active.classList.remove('active');
    if (link) link.classList.add('active');
    spy.active = link;
  }

  doc.addEventListener('scroll', onScroll, { passive: true });

  // ── Content cache: bundle (all pages) + per-page fragments ───────────────

  var cache = {};          // key -> fragment object
  var inflight = {};       // key -> promise
  var bundleLoaded = false;
  var stale = false;       // set when a deploy is detected; forces a real load

  // A tab left open across a deploy would otherwise serve pre-deploy content
  // forever against post-deploy CSS/JS. Re-check the build id when the tab
  // comes back to the foreground, and hand the next navigation to the browser.
  var BUNDLE_VERSION = (BUNDLE_URL.match(/bundle-([a-f0-9]+)\.json/) || [])[1] || '';
  var lastVersionCheck = Date.now();
  doc.addEventListener('visibilitychange', function () {
    if (doc.visibilityState !== 'visible' || stale || !BUNDLE_VERSION) return;
    if (Date.now() - lastVersionCheck < 300000) return;   // at most every 5 min
    lastVersionCheck = Date.now();
    fetch('/_content/version.json', { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (d && d.v && d.v !== BUNDLE_VERSION) stale = true; })
      .catch(function () {});
  });

  function getFragment(key) {
    if (cache[key]) return Promise.resolve(cache[key]);
    if (inflight[key]) return inflight[key];
    var p = fetch(fragmentUrl(key))
      .then(function (r) {
        if (!r.ok) throw new Error('fragment ' + r.status);
        return r.json();
      })
      .then(function (f) { cache[key] = f; delete inflight[key]; return f; })
      .catch(function (err) { delete inflight[key]; throw err; });
    inflight[key] = p;
    return p;
  }

  function loadBundle() {
    if (!BUNDLE_URL || bundleLoaded) return;
    bundleLoaded = true;
    fetch(BUNDLE_URL)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (!data || !data.pages) return;
        Object.keys(data.pages).forEach(function (k) {
          if (!cache[k]) cache[k] = data.pages[k];
        });
      })
      .catch(function () {});
  }

  // Start fetching the whole site's content as soon as the main thread is free.
  // This script runs at the end of <body>, so the page is already parsed and
  // painted; the transfer is a low-priority background request. Skipped on
  // data-saver or very slow connections, where per-page fragments are cheaper.
  (function scheduleBundle() {
    var c = navigator.connection;
    if (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ''))) return;
    if ('requestIdleCallback' in window) requestIdleCallback(loadBundle, { timeout: 800 });
    else setTimeout(loadBundle, 300);
  })();

  // ── Navigation ───────────────────────────────────────────────────────────

  var supported = 'fetch' in window && 'pushState' in history && 'MutationObserver' in window;

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  var navToken = 0;              // guards against out-of-order responses
  var scrollPositions = {};      // history key -> scrollY
  var historyKey = 0;
  var currentKey = keyFromPath(location.pathname);

  var progress = doc.createElement('div');
  progress.className = 'nav-progress';
  var progressTimer = null;

  function showProgress() {
    progressTimer = setTimeout(function () {
      if (!progress.parentNode) doc.body.appendChild(progress);
      progress.classList.add('active');
    }, 150);
  }
  function hideProgress() {
    clearTimeout(progressTimer);
    progress.classList.remove('active');
  }

  function setSidebarActive(key) {
    doc.querySelectorAll('.side-link.active').forEach(function (a) { a.classList.remove('active'); });
    var links = doc.querySelectorAll('.sidebar-nav a.side-link');
    for (var i = 0; i < links.length; i++) {
      if (keyFromPath(links[i].pathname) === key) {
        links[i].classList.add('active');
        var cat = links[i].closest('.side-category');
        while (cat) {
          cat.classList.add('open');
          cat = cat.parentElement ? cat.parentElement.closest('.side-category') : null;
        }
        return;
      }
    }
  }

  function applyStoredTabs(scope) {
    scope.querySelectorAll('.tabs[data-sync="true"]').forEach(function (tabsEl) {
      var group = tabsEl.getAttribute('data-group');
      try {
        var saved = localStorage.getItem('tab-group:' + group);
        if (saved && tabsEl.querySelector('.tab-btn[data-value="' + CSS.escape(saved) + '"]')) {
          selectTab(tabsEl, saved);
        }
      } catch (e) {}
    });
  }

  var liveRegion = doc.createElement('div');
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('role', 'status');
  liveRegion.className = 'sr-only';
  doc.body.appendChild(liveRegion);

  function render(fragment, key, hash, opts) {
    var article = doc.querySelector('.doc');
    var toc = doc.querySelector('.toc');
    var pager = doc.querySelector('.pager');
    if (!article) return false;

    article.innerHTML = fragment.article;
    if (toc) toc.innerHTML = fragment.toc || '';
    if (pager) pager.innerHTML = fragment.pager || '';

    doc.title = fragment.title ? fragment.title + ' | Stirling PDF' : 'Stirling PDF';
    var desc = doc.querySelector('meta[name="description"]');
    if (desc && fragment.description) desc.setAttribute('content', fragment.description);
    var canon = doc.querySelector('link[rel="canonical"]');
    if (canon) canon.setAttribute('href', location.origin + location.pathname);

    currentKey = key;
    setSidebarActive(key);
    applyStoredTabs(article);
    rebuildSpy();
    doc.body.classList.remove('nav-open');


    // Restore scroll for back/forward, otherwise honour the hash or go to top.
    if (opts && typeof opts.scrollTo === 'number') {
      window.scrollTo(0, opts.scrollTo);
    } else if (hash) {
      var target = doc.getElementById(decodeURIComponent(hash));
      if (target) target.scrollIntoView();
      else window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 0);
    }

    // Everything below is off the critical path: it either reads layout or
    // talks to third parties, and none of it affects what the user sees.
    afterPaint(function () {
      onScroll();
      var heading = article.querySelector('h1');
      if (heading && !(opts && opts.keepFocus)) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
      liveRegion.textContent = (fragment.title || 'Page') + ' loaded';
      if (window.posthog && typeof window.posthog.capture === 'function') {
        window.posthog.capture('$pageview');
      }
    });
    return true;
  }

  function navigate(url, opts) {
    opts = opts || {};
    var parsed = new URL(url, location.href);
    var key = keyFromPath(parsed.pathname);
    var hash = parsed.hash ? parsed.hash.slice(1) : '';
    var token = ++navToken;

    if (stale) { location.href = url; return; }   // a deploy happened; get fresh assets

    var finish = function (fragment) {
      if (token !== navToken) return;   // a newer click superseded this one
      hideProgress();
      if (opts.push !== false) {
        scrollPositions[historyKey] = window.scrollY;
        historyKey++;
        history.pushState({ k: historyKey }, '', parsed.pathname + parsed.search + parsed.hash);
      }
      if (!render(fragment, key, hash, opts)) location.href = url;
    };

    if (cache[key]) { finish(cache[key]); return; }

    showProgress();
    getFragment(key).then(finish).catch(function () {
      if (token !== navToken) return;
      hideProgress();
      location.href = url;      // fragment missing (redirect stub, stale deploy)
    });
  }

  function eligible(a, e) {
    if (!a || e.defaultPrevented || e.button !== 0) return null;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
    if (a.target && a.target !== '' && a.target !== '_self') return null;
    if (a.hasAttribute('download')) return null;
    if (a.getAttribute('rel') === 'external') return null;
    if (a.origin !== location.origin) return null;          // covers //host, http(s), mailto
    if (!/^https?:$/.test(a.protocol)) return null;
    if (a.closest('.DocSearch')) return null;               // search modal manages itself
    var href = a.getAttribute('href') || '';
    if (href.charAt(0) === '#') return null;                // same-page anchor
    if (a.pathname === location.pathname && a.hash) return null;
    return a.pathname + a.search + a.hash;
  }

  if (supported) {
    history.replaceState({ k: historyKey }, '', location.href);

    doc.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a') : null;
      var url = eligible(a, e);
      if (url == null) return;
      e.preventDefault();
      // Immediate feedback: mark the destination active and close the drawer
      // right away, rather than after the content resolves.
      setSidebarActive(keyFromPath(a.pathname));
      doc.body.classList.remove('nav-open');
      navigate(url);
    });

    // Prefetch on intent. Fragments are ~3KB gzipped, so this is cheap and
    // covers the window before the full bundle has landed.
    var warm = function (e) {
      // Once the bundle is in memory every page is already cached, so hover
      // prefetching has nothing left to do.
      if (bundleLoaded && Object.keys(cache).length > 1) return;
      var a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!a || a.origin !== location.origin) return;
      var key = keyFromPath(a.pathname);
      if (key === keyFromPath(location.pathname) || cache[key] || inflight[key]) return;
      getFragment(key).catch(function () {});
    };
    doc.addEventListener('mouseover', warm, { passive: true });
    doc.addEventListener('touchstart', warm, { passive: true });

    window.addEventListener('popstate', function (e) {
      var key = keyFromPath(location.pathname);
      var hash = location.hash ? location.hash.slice(1) : '';
      historyKey = (e.state && e.state.k) || 0;
      var restore = scrollPositions[historyKey];

      // Moving between anchors on the page we're already showing: just scroll.
      // Re-rendering identical content would flash and lose scroll context.
      if (key === currentKey) {
        if (hash) {
          var anchor = doc.getElementById(decodeURIComponent(hash));
          if (anchor) anchor.scrollIntoView();
        } else if (typeof restore === 'number') {
          window.scrollTo(0, restore);
        }
        return;
      }

      if (stale) { location.reload(); return; }
      var token = ++navToken;
      var apply = function (f) {
        if (token !== navToken) return;
        hideProgress();
        if (!render(f, key, hash, { scrollTo: hash ? undefined : restore, keepFocus: true })) location.reload();
      };
      if (cache[key]) apply(cache[key]);
      else {
        showProgress();
        getFragment(key).then(apply).catch(function () { location.reload(); });
      }
    });
  }

  // ── First paint ──────────────────────────────────────────────────────────

  rebuildSpy();
  onScroll();
})();
