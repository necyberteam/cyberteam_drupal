(function (Drupal, once) {
  'use strict';

  var HEADING_SELECTOR = 'h2[id], h3[id], h4[id]';

  function levelOf(el) {
    return parseInt(el.tagName.charAt(1), 10);
  }

  // Build a nested tree from a flat heading list. h3 nests under the last h2;
  // h4 nests under the last h3 (or last h2 if no h3 has appeared in the section).
  function buildTocTree(headings) {
    var root = [];
    var lastH2 = null;
    var lastH3 = null;
    headings.forEach(function (h) {
      var node = { id: h.id, text: h.textContent.trim(), level: levelOf(h), children: [] };
      if (node.level === 2) {
        root.push(node);
        lastH2 = node;
        lastH3 = null;
      } else if (node.level === 3) {
        (lastH2 ? lastH2.children : root).push(node);
        lastH3 = node;
      } else { // h4
        var parent = lastH3 || lastH2;
        (parent ? parent.children : root).push(node);
      }
    });
    return root;
  }

  // Render the tree into <nav>. h4 groups (children of an h3/h2) are wrapped so
  // they can be revealed/collapsed per section. Returns nothing; mutates nav.
  function renderToc(tree, nav) {
    function renderList(items, isH4Group) {
      var ul = document.createElement('ul');
      ul.className = isH4Group ? 'appverse-doc-toc__sublist' : 'appverse-doc-toc__list';
      if (isH4Group) { ul.hidden = true; }
      items.forEach(function (item) {
        var li = document.createElement('li');
        li.className = 'appverse-doc-toc__item appverse-doc-toc__item--h' + item.level;
        var a = document.createElement('a');
        a.href = '#' + item.id;
        a.textContent = item.text;
        a.className = 'appverse-doc-toc__link';
        a.dataset.targetId = item.id;
        li.appendChild(a);
        if (item.children.length) {
          // h4 children of an h2/h3 form a collapsible sublist.
          var childrenAreH4 = item.children[0].level === 4;
          li.appendChild(renderList(item.children, childrenAreH4));
        }
        ul.appendChild(li);
      });
      return ul;
    }
    nav.appendChild(renderList(tree, false));
  }

  Drupal.behaviors.appverseDocSidebar = {
    attach: function attach(context) {
      var roots = once('appverse-doc-sidebar', '.appverse-doc-node', context);
      roots.forEach(function (root) {
        var rail = root.querySelector('.appverse-doc-sidebar');
        var nav = root.querySelector('.appverse-doc-toc');
        if (!rail || !nav) { return; }
        var headings = Array.prototype.slice.call(root.querySelectorAll(HEADING_SELECTOR));
        if (!headings.length) { return; } // no headings -> leave rail hidden

        var tree = buildTocTree(headings);
        renderToc(tree, nav);
        rail.removeAttribute('hidden');

        initScrollSpy(root, headings, nav);
        initDeepLink(headings, nav);
        initSearch(root, headings, rail, nav);
        initMobileDisclosure(rail);
      });
    }
  };

  // --- exposed for reasoning/manual testing ---
  Drupal.appverseDocSidebar = { buildTocTree: buildTocTree };

  var prefersReducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function scrollToId(id) {
    var target = document.getElementById(id);
    if (!target) { return; }
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
  }

  // Map a heading id -> its owning h2 id (itself if it's an h2), for reveal.
  function buildSectionMap(headings) {
    var map = {};
    var currentH2 = null;
    headings.forEach(function (h) {
      if (h.tagName === 'H2') { currentH2 = h.id; }
      map[h.id] = currentH2 || h.id;
    });
    return map;
  }

  function setActive(nav, activeId, sectionMap) {
    var links = nav.querySelectorAll('.appverse-doc-toc__link');
    var activeSection = sectionMap[activeId];
    links.forEach(function (link) {
      var isActive = link.dataset.targetId === activeId;
      if (isActive) { link.setAttribute('aria-current', 'true'); }
      else { link.removeAttribute('aria-current'); }
    });
    // Reveal h4 sublists only under the active section's h2; collapse others.
    var sublists = nav.querySelectorAll('.appverse-doc-toc__sublist');
    sublists.forEach(function (ul) {
      // The sublist belongs to the section of its parent link.
      var parentLink = ul.parentElement.querySelector('.appverse-doc-toc__link');
      var belongs = parentLink && sectionMap[parentLink.dataset.targetId] === activeSection;
      ul.hidden = !belongs;
      if (parentLink) { parentLink.setAttribute('aria-expanded', belongs ? 'true' : 'false'); }
    });
  }

  var initScrollSpy = function (root, headings, nav) {
    var sectionMap = buildSectionMap(headings);
    var visible = [];
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.id;
        var idx = visible.indexOf(id);
        if (entry.isIntersecting && idx === -1) { visible.push(id); }
        else if (!entry.isIntersecting && idx !== -1) { visible.splice(idx, 1); }
      });
      if (!visible.length) { return; }
      // "Last heading past the top edge wins": among currently-visible headings,
      // pick the one latest in document order (most recently entered). This is
      // pure DOM-position via compareDocumentPosition — NO getBoundingClientRect,
      // so no layout measurement/thrashing even with many headings.
      var lastId = visible.reduce(function (acc, id) {
        if (!acc) { return id; }
        var a = document.getElementById(acc);
        var b = document.getElementById(id);
        return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? id : acc;
      }, null);
      setActive(nav, lastId, sectionMap);
    }, { rootMargin: '-20% 0px -20% 0px', threshold: 0 });

    headings.forEach(function (h) { observer.observe(h); });

    // Click-to-scroll + hash update.
    nav.addEventListener('click', function (e) {
      var link = e.target.closest('.appverse-doc-toc__link');
      if (!link) { return; }
      e.preventDefault();
      var id = link.dataset.targetId;
      scrollToId(id);
      if (history.replaceState) { history.replaceState(null, '', '#' + id); }
      setActive(nav, id, sectionMap);
    });

    // Stash for deep-link init.
    nav._sectionMap = sectionMap;
  };

  var initDeepLink = function (headings, nav) {
    var hash = window.location.hash.replace(/^#/, '');
    if (!hash) { return; }
    if (!document.getElementById(hash)) { return; }
    scrollToId(hash);
    if (nav._sectionMap) { setActive(nav, hash, nav._sectionMap); }
  };

  function buildSearchIndex(headings) {
    return headings.map(function (h, i) {
      var level = parseInt(h.tagName.charAt(1), 10);
      var parts = [];
      var node = h.nextElementSibling;
      while (node) {
        // Stop at the next heading of equal-or-higher level.
        if (/^H[1-6]$/.test(node.tagName)) {
          var nl = parseInt(node.tagName.charAt(1), 10);
          if (nl <= level) { break; }
        }
        parts.push(node.textContent);
        node = node.nextElementSibling;
      }
      return { anchor: h.id, heading: h.textContent.trim(), text: parts.join(' ').replace(/\s+/g, ' ').trim() };
    });
  }

  function makeSnippet(text, query) {
    var SNIP = 120, HEAD = 150;
    var lower = text.toLowerCase();
    var pos = lower.indexOf(query.toLowerCase());
    if (pos === -1) {
      var head = text.slice(0, HEAD);
      return text.length > HEAD ? head.replace(/\s+\S*$/, '') + '…' : head;
    }
    var half = Math.floor((SNIP - query.length) / 2);
    var start = Math.max(0, pos - half);
    var end = Math.min(text.length, pos + query.length + half);
    var snip = text.slice(start, end);
    if (start > 0) { snip = '…' + snip.replace(/^\S*\s/, ''); }
    if (end < text.length) { snip = snip.replace(/\s+\S*$/, '') + '…'; }
    return snip;
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  // Wrap occurrences of query (case-insensitive) in <mark> within an escaped string.
  function markMatches(escapedText, query) {
    if (!query) { return escapedText; }
    var re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
    return escapedText.replace(re, '<mark>$1</mark>');
  }

  function clearDestinationMarks(root) {
    root.querySelectorAll('mark[data-appverse-search]').forEach(function (m) {
      var parent = m.parentNode;
      parent.replaceChild(document.createTextNode(m.textContent), m);
      parent.normalize();
    });
  }

  // Highlight query occurrences within one section element (heading..next peer).
  function highlightDestination(root, anchorId, query) {
    clearDestinationMarks(root);
    if (!query) { return; }
    var h = document.getElementById(anchorId);
    if (!h) { return; }
    var level = parseInt(h.tagName.charAt(1), 10);
    var re = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    var node = h.nextElementSibling;
    while (node) {
      if (/^H[1-6]$/.test(node.tagName) && parseInt(node.tagName.charAt(1), 10) <= level) { break; }
      // Wrap matches in text nodes only (skip existing markup walking).
      var walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
      var textNodes = [];
      while (walker.nextNode()) { textNodes.push(walker.currentNode); }
      textNodes.forEach(function (tn) {
        if (!re.test(tn.nodeValue)) { return; }
        re.lastIndex = 0;
        var span = document.createElement('span');
        span.innerHTML = tn.nodeValue.replace(/[&<>]/g, function (c) {
          return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c];
        }).replace(re, function (m) { return '<mark data-appverse-search="1">' + m + '</mark>'; });
        while (span.firstChild) { tn.parentNode.insertBefore(span.firstChild, tn); }
        tn.parentNode.removeChild(tn);
      });
      node = node.nextElementSibling;
    }
  }

  function initSearch(root, headings, rail, nav) {
    var input = rail.querySelector('.appverse-doc-search__input');
    var results = rail.querySelector('.appverse-doc-search__results');
    if (!input || !results) { return; }
    var index = buildSearchIndex(headings);
    var activeIdx = -1;
    var debounceTimer = null;

    function closeResults() {
      results.hidden = true;
      results.innerHTML = '';
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
      activeIdx = -1;
    }

    function render(query) {
      var q = query.trim();
      if (!q) { closeResults(); return; }
      var matches = index.filter(function (s) {
        return s.heading.toLowerCase().indexOf(q.toLowerCase()) !== -1 ||
               s.text.toLowerCase().indexOf(q.toLowerCase()) !== -1;
      });
      results.innerHTML = '';
      if (!matches.length) {
        var li = document.createElement('li');
        li.className = 'appverse-doc-search__empty';
        li.textContent = 'No results';
        li.setAttribute('role', 'presentation');
        results.appendChild(li);
        results.hidden = false;
        input.setAttribute('aria-expanded', 'true');
        return;
      }
      matches.forEach(function (s, i) {
        var li = document.createElement('li');
        li.id = 'appverse-doc-search-opt-' + i;
        li.className = 'appverse-doc-search__result';
        li.setAttribute('role', 'option');
        li.dataset.anchor = s.anchor;
        var snippet = makeSnippet(s.text, q);
        li.innerHTML = '<span class="appverse-doc-search__result-heading">' +
          markMatches(escapeHtml(s.heading), q) + '</span>' +
          '<span class="appverse-doc-search__result-snippet">' +
          markMatches(escapeHtml(snippet), q) + '</span>';
        results.appendChild(li);
      });
      results.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      activeIdx = -1;
    }

    function go(li, q) {
      var anchor = li.dataset.anchor;
      if (!anchor) { return; }
      scrollToId(anchor);
      highlightDestination(root, anchor, q);
      if (nav && nav._sectionMap) { setActive(nav, anchor, nav._sectionMap); }
      closeResults();
    }

    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      var q = input.value;
      debounceTimer = setTimeout(function () { render(q); }, 120);
    });

    input.addEventListener('keydown', function (e) {
      var opts = results.querySelectorAll('.appverse-doc-search__result');
      if (e.key === 'Escape') { closeResults(); clearDestinationMarks(root); return; }
      if (!opts.length) { return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIdx = Math.min(activeIdx + 1, opts.length - 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIdx = Math.max(activeIdx - 1, 0);
      } else if (e.key === 'Enter') {
        if (activeIdx >= 0) { e.preventDefault(); go(opts[activeIdx], input.value.trim()); }
        return;
      } else { return; }
      opts.forEach(function (o) { o.removeAttribute('aria-selected'); });
      var cur = opts[activeIdx];
      cur.setAttribute('aria-selected', 'true');
      input.setAttribute('aria-activedescendant', cur.id);
    });

    results.addEventListener('click', function (e) {
      var li = e.target.closest('.appverse-doc-search__result');
      if (li) { go(li, input.value.trim()); }
    });

    // Close on outside click.
    document.addEventListener('click', function (e) {
      if (!rail.contains(e.target)) { closeResults(); }
    });
  }

  function initMobileDisclosure(rail) {
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'appverse-doc-sidebar__toggle';
    toggle.textContent = 'On this page';
    toggle.setAttribute('aria-expanded', 'false');
    rail.insertBefore(toggle, rail.firstChild);

    function setOpen(open) {
      rail.classList.toggle('appverse-doc-sidebar--mobile-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    toggle.addEventListener('click', function () {
      setOpen(!rail.classList.contains('appverse-doc-sidebar--mobile-open'));
    });
    // Tapping a TOC link closes the disclosure (jump then collapse).
    rail.querySelector('.appverse-doc-toc').addEventListener('click', function (e) {
      if (e.target.closest('.appverse-doc-toc__link')) { setOpen(false); }
    });
    // Escape + outside tap close it.
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setOpen(false); } });
    document.addEventListener('click', function (e) { if (!rail.contains(e.target)) { setOpen(false); } });
  }

})(Drupal, once);
