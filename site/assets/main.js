// Theme toggle, mobile drawer, sidebar accordion, tabs (with groupId sync),
// code copy buttons, and a small SPA-style router: internal navigation
// fetches the next page and swaps the content area in place (navbar, Kapa
// widget and DocSearch stay mounted), with hover prefetch. No frameworks.
(function () {
  'use strict';

  // ── One-time chrome (survives SPA swaps) ─────────────────────────────────

  // Theme toggle
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (dark) {
        document.documentElement.removeAttribute('data-theme');
        try { localStorage.setItem('theme', 'light'); } catch (e) {}
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        try { localStorage.setItem('theme', 'dark'); } catch (e) {}
      }
    });
  }

  // Mobile drawer
  var menuBtn = document.querySelector('.menu-toggle');
  var backdrop = document.querySelector('.sidebar-backdrop');
  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
    });
  }
  if (backdrop) {
    backdrop.addEventListener('click', function () {
      document.body.classList.remove('nav-open');
    });
  }

  // GitHub star count (cached for a day; falls back to the baked-in value)
  var renderStars = function (n) {
    var el = document.querySelector('[data-star-count]');
    if (!el) return;
    el.textContent = n >= 10000 ? Math.round(n / 1000) + 'k'
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

  // Kapa launcher: its hover colour derives from the project colour (bright
  // blue). Keep a subtle-lighten override alive inside the widget's shadow
  // root. The widget re-renders and re-injects styles at will, so an observer
  // re-asserts the override (last in DOM, current hashed classes) each time.
  (function fixKapaHover(attempts) {
    var c = document.querySelector('#kapa-widget-container');
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
      var css = sels.map(function (s) { return s + ':hover'; }).join(', ') +
        ' { background-color: #1f1f23 !important; }';
      var style = root.querySelector('#stirling-kapa-hover');
      if (!style) {
        style = document.createElement('style');
        style.id = 'stirling-kapa-hover';
      }
      // Only touch the DOM when needed so the observer doesn't loop.
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

  // ── Per-page behaviours (re-run after every SPA swap) ────────────────────

  var scrollSpyCleanup = null;

  function initPage(scope) {
    // Sidebar accordion carets
    scope.querySelectorAll('.side-caret, .side-cat-label').forEach(function (el) {
      if (el.tagName === 'A') return; // index links navigate; only the caret toggles
      el.addEventListener('click', function () {
        var cat = el.closest('.side-category');
        if (cat) cat.classList.toggle('open');
      });
    });
    scope.querySelectorAll('.side-caret').forEach(function (el) {
      el.addEventListener('click', function (e) { e.stopPropagation(); });
    });

    // Tabs with groupId sync (docker-run vs docker-compose etc.)
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

    scope.querySelectorAll('.tabs').forEach(function (tabsEl) {
      var group = tabsEl.getAttribute('data-group');
      try {
        var saved = localStorage.getItem('tab-group:' + group);
        if (saved && tabsEl.querySelector('.tab-btn[data-value="' + CSS.escape(saved) + '"]')) {
          selectTab(tabsEl, saved);
        }
      } catch (e) {}
      tabsEl.querySelectorAll(':scope > .tab-list > .tab-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var value = btn.getAttribute('data-value');
          try { localStorage.setItem('tab-group:' + group, value); } catch (e) {}
          document.querySelectorAll('.tabs[data-group="' + CSS.escape(group) + '"]').forEach(function (t) {
            if (t.querySelector('.tab-btn[data-value="' + CSS.escape(value) + '"]')) selectTab(t, value);
          });
        });
      });
    });

    // Copy buttons
    scope.querySelectorAll('.codeblock-copy').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pre = btn.parentElement.querySelector('pre');
        if (!pre) return;
        navigator.clipboard.writeText(pre.innerText).then(function () {
          btn.classList.add('copied');
          setTimeout(function () { btn.classList.remove('copied'); }, 1600);
        });
      });
    });

    // ToC scroll-spy
    if (scrollSpyCleanup) { scrollSpyCleanup(); scrollSpyCleanup = null; }
    var tocLinks = Array.prototype.slice.call(scope.querySelectorAll('.toc a[href^="#"]'));
    if (tocLinks.length) {
      var byId = {};
      tocLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
      var headings = Object.keys(byId)
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);
      var activeLink = null;
      var setActive = function (link) {
        if (activeLink === link) return;
        if (activeLink) activeLink.classList.remove('active');
        if (link) link.classList.add('active');
        activeLink = link;
      };
      var onScroll = function () {
        var line = 96; // just under the sticky navbar
        var current = null;
        for (var i = 0; i < headings.length; i++) {
          if (headings[i].getBoundingClientRect().top <= line) current = headings[i];
          else break;
        }
        setActive(current ? byId[current.id] : null);
      };
      document.addEventListener('scroll', onScroll, { passive: true });
      scrollSpyCleanup = function () { document.removeEventListener('scroll', onScroll); };
      onScroll();
    }
  }

  // ── SPA-style navigation ─────────────────────────────────────────────────

  var supportsSpa = 'DOMParser' in window && 'history' in window && history.pushState;

  function internalHref(a) {
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return null;
    var href = a.getAttribute('href');
    if (!href || /^(#|mailto:|https?:\/\/)/.test(href) && a.origin !== location.origin) return null;
    if (href.charAt(0) === '#') return null;
    if (a.origin !== location.origin) return null;
    return a.pathname + a.search + a.hash;
  }

  function swapDocument(html, url, push) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    var newLayout = doc.querySelector('.layout');
    var curLayout = document.querySelector('.layout');
    if (!newLayout || !curLayout) { location.href = url; return false; }
    document.title = doc.title;
    curLayout.replaceWith(newLayout);
    document.body.classList.remove('nav-open');
    if (push) history.pushState({ spa: true }, '', url);
    // canonical + meta description for completeness
    ['link[rel="canonical"]', 'meta[name="description"]'].forEach(function (sel) {
      var from = doc.querySelector(sel), to = document.querySelector(sel);
      if (from && to) to.replaceWith(from);
    });
    initPage(newLayout);
    var hash = url.split('#')[1];
    if (hash) {
      var target = document.getElementById(decodeURIComponent(hash));
      if (target) target.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
    return true;
  }

  var pageCache = {};

  function fetchPage(path) {
    if (pageCache[path]) return pageCache[path];
    var p = fetch(path, { headers: { 'X-Requested-With': 'spa' } })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      });
    p.catch(function () { delete pageCache[path]; });
    pageCache[path] = p;
    return p;
  }

  if (supportsSpa) {
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target.closest && e.target.closest('a');
      if (!a || a.closest('.DocSearch')) return; // let the search modal manage itself
      var href = internalHref(a);
      if (href == null) return;
      var pathOnly = a.pathname + a.search;
      // same-page hash link: default browser behaviour
      if (a.pathname === location.pathname && a.hash) return;
      e.preventDefault();
      fetchPage(pathOnly)
        .then(function (html) { swapDocument(html, href, true); })
        .catch(function () { location.href = href; });
    });

    // Hover/touch prefetch: page is usually cached before the click lands.
    var warm = function (e) {
      var a = e.target.closest && e.target.closest('a');
      if (!a) return;
      var href = internalHref(a);
      if (href == null || a.pathname === location.pathname) return;
      fetchPage(a.pathname + a.search).catch(function () {});
    };
    document.addEventListener('mouseover', warm, { passive: true });
    document.addEventListener('touchstart', warm, { passive: true });

    window.addEventListener('popstate', function () {
      fetchPage(location.pathname + location.search)
        .then(function (html) { swapDocument(html, location.pathname + location.search + location.hash, false); })
        .catch(function () { location.reload(); });
    });
  }

  initPage(document);
})();
