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
        // Search wiring (Task 3) hooks in here: initSearch(root, headings, rail);
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

})(Drupal, once);
