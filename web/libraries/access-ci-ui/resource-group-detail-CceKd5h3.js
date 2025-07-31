var gc = Object.defineProperty;
var mc = (i, t, e) => t in i ? gc(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var F = (i, t, e) => mc(i, typeof t != "symbol" ? t + "" : t, e);
import { a as bi, u as v, e as mt, s as $o, f as vi, A as ie, k as wt, i as bc, d as Be, j as ts, m as Zs, y as Vo, n as vc, T as yc, B as xc } from "./index-GCiVlJeX.js";
import { I as Y } from "./icon-BHsjyCqx.js";
const Gs = () => {
  const i = new Event("accessci-update-sections");
  document.dispatchEvent(i);
};
function Bt({
  children: i,
  headerComponents: t = null,
  icon: e = null,
  sectionId: n = null,
  title: s
}) {
  const r = n || s.toLowerCase().replace(/[^0-9a-z]+/g, "-");
  return bi(() => (Gs(), Gs), []), /* @__PURE__ */ v("section", { id: r, "data-section-title": s, "data-section-icon": e, children: [
    /* @__PURE__ */ v("div", { class: "flex-header", children: [
      /* @__PURE__ */ v("h2", { children: [
        e ? /* @__PURE__ */ v(Y, { name: e }) : null,
        s
      ] }),
      t ? /* @__PURE__ */ v("div", { class: "header-components", children: t }) : null
    ] }),
    i
  ] });
}
function _c({ infoGroupId: i }) {
  const t = mt(
    `https://support.access-ci.org/api/1.0/affinity_groups/${i}`
  );
  if (!t || t.error || !t.length) return;
  const e = $o(t[0].slack_link);
  return /* @__PURE__ */ v(Bt, { title: "User Community", icon: "people-fill", children: [
    /* @__PURE__ */ v("p", { children: "Join the community by participating in an affinity group! Members get update about announcements, events, and outages." }),
    /* @__PURE__ */ v("div", { class: "button-group", children: [
      /* @__PURE__ */ v("a", { href: t[0].url, class: "btn secondary", children: [
        /* @__PURE__ */ v(Y, { name: "person-plus-fill" }),
        " Join Affinity Group"
      ] }),
      e ? /* @__PURE__ */ v("a", { href: e, class: "btn", children: [
        /* @__PURE__ */ v(Y, { name: "slack" }),
        " Connect on Slack"
      ] }) : null,
      /* @__PURE__ */ v("a", { href: "#questions-and-answers", class: "btn", children: [
        /* @__PURE__ */ v(Y, { name: "chat-fill" }),
        " Ask and Answer Questions"
      ] })
    ] })
  ] });
}
function wc({ infoGroupId: i }) {
  const t = vi(i), e = mt(
    t && t.infoResourceIds.length ? `https://operations-api.access-ci.org/wh2/cider/v1/info_resourceid/${t.infoResourceIds[0]}/?format=json` : null
  );
  if (!t) return;
  const { accessAllocated: n, name: s, description: r, imageUri: o, organizations: a } = t, c = n ? "https://allocations.access-ci.org/get-your-first-project" : null, l = e && e.results ? (e.results.compute || e.results.storage || {}).user_guide_url : null;
  return /* @__PURE__ */ v("div", { class: "resource-group-description", children: [
    o ? /* @__PURE__ */ v("img", { class: "resource-group-feature-image", src: o }) : null,
    /* @__PURE__ */ v("h1", { children: t.name }),
    a.map((u) => /* @__PURE__ */ v("p", { children: /* @__PURE__ */ v("a", { href: u.organization_url || "#", children: [
      u.organization_favicon_url ? /* @__PURE__ */ v(
        Y,
        {
          alt: u.organization_name,
          src: u.organization_favicon_url
        }
      ) : null,
      u.organization_name
    ] }) })),
    r ? /* @__PURE__ */ v("p", { children: r }) : null,
    /* @__PURE__ */ v("div", { style: { marginTop: "1rem" }, children: [
      c ? /* @__PURE__ */ v("a", { href: c, class: "btn secondary lg", children: [
        /* @__PURE__ */ v(Y, { name: "check2-circle" }),
        " Get Started with ",
        s
      ] }) : null,
      l ? /* @__PURE__ */ v("a", { href: l, class: "btn lg", children: [
        /* @__PURE__ */ v(Y, { name: "book" }),
        " User Guide"
      ] }) : null
    ] })
  ] });
}
function Sc({ column: i, row: t, style: e = {} }) {
  const n = i.format ? i.format(t[i.key], t) : t[i.key], s = ["cell"];
  return i.class && s.push(i.class), i.rowClass && s.push(i.rowClass(t)), /* @__PURE__ */ v("td", { class: s.join(" "), style: e, children: n });
}
const kc = {
  text: Sc
};
function kn({
  columns: i,
  rows: t,
  classes: e,
  frozenColumns: n = 0,
  maxHeight: s = 400,
  minWidth: r,
  rowClasses: o = [],
  scrollResetOnUpdate: a = !1
}) {
  const c = ie();
  bi(() => {
    c.current && a && (c.current.scrollTop = 0);
  }, [t]);
  const l = [0];
  for (let p = 0; p < n; p++)
    l[p + 1] = l[p] + (i[p].width || 100);
  const u = (p, m) => p < n ? {
    position: "sticky",
    left: `${l[p]}px`,
    minWidth: `${i[p].width || 100}px`,
    width: `${i[p].width || 100}px`,
    zIndex: m || 1
  } : {}, h = i.map((p, m) => /* @__PURE__ */ v(
    "th",
    {
      class: p.headerClass || p.class || "",
      style: u(m, 100),
      children: p.formatHeader ? p.formatHeader(p.name, p) : p.name
    },
    p.key
  )), f = t.map((p, m) => {
    const b = i.map((y, x) => {
      const S = kc[y.type || "text"];
      return /* @__PURE__ */ v(S, { column: y, row: p, style: u(x) }, y.key);
    });
    return /* @__PURE__ */ v("tr", { class: o[m] || "", children: b }, m);
  }), d = {};
  return r && (d.minWidth = r), /* @__PURE__ */ v(
    "div",
    {
      class: `grid ${e || ""}`,
      style: {
        maxHeight: Number.isInteger(s) ? `${s}px` : s || null
      },
      ref: c,
      children: /* @__PURE__ */ v("table", { class: "table", style: d, children: [
        /* @__PURE__ */ v("thead", { children: /* @__PURE__ */ v("tr", { children: h }) }),
        /* @__PURE__ */ v("tbody", { children: f })
      ] })
    }
  );
}
function Ac({ infoGroupId: i }) {
  const t = mt(
    `https://support.access-ci.org/api/1.0/affinity_groups/${i}`
  ), e = t && !t.error && t.length ? t[0].field_ask_ci_locale : null, n = e ? `${e}.json` : null, s = mt(n);
  return !s || s.error || !s.topic_list || !s.topic_list.topics || !s.topic_list.topics.length ? void 0 : /* @__PURE__ */ v(
    Bt,
    {
      title: "Questions and Answers",
      icon: "chat-fill",
      headerComponents: [
        /* @__PURE__ */ v("a", { href: e, class: "btn secondary", children: "Ask a Question" }),
        /* @__PURE__ */ v("a", { href: e, class: "btn", children: "View All Topics" })
      ],
      children: /* @__PURE__ */ v(
        kn,
        {
          columns: [
            {
              key: "title",
              name: "Topic",
              format: (a, c) => /* @__PURE__ */ v(wt, { children: [
                c.pinned ? /* @__PURE__ */ v(Y, { name: "pin-fill" }) : null,
                /* @__PURE__ */ v(
                  "a",
                  {
                    href: `https://ask.cyberinfrastructure.org/t/${c.slug}/${c.id}`,
                    children: a
                  }
                )
              ] })
            },
            {
              key: "posts_count",
              name: "Posts",
              format: (a) => a.toLocaleString("en-us")
            },
            {
              key: "bumped_at",
              name: "Last Update",
              format: (a) => new Date(a).toLocaleString("en-US", { dateStyle: "medium" })
            }
          ],
          rows: s.topic_list.topics.slice(0, 5)
        }
      )
    }
  );
}
var ut = "top", kt = "bottom", At = "right", ht = "left", As = "auto", yi = [ut, kt, At, ht], Ee = "start", li = "end", Mc = "clippingParents", Uo = "viewport", Xe = "popper", Oc = "reference", Js = /* @__PURE__ */ yi.reduce(function(i, t) {
  return i.concat([t + "-" + Ee, t + "-" + li]);
}, []), Yo = /* @__PURE__ */ [].concat(yi, [As]).reduce(function(i, t) {
  return i.concat([t, t + "-" + Ee, t + "-" + li]);
}, []), Dc = "beforeRead", Cc = "read", Tc = "afterRead", Ec = "beforeMain", Pc = "main", Rc = "afterMain", Lc = "beforeWrite", Fc = "write", Ic = "afterWrite", Bc = [Dc, Cc, Tc, Ec, Pc, Rc, Lc, Fc, Ic];
function Ht(i) {
  return i ? (i.nodeName || "").toLowerCase() : null;
}
function bt(i) {
  if (i == null)
    return window;
  if (i.toString() !== "[object Window]") {
    var t = i.ownerDocument;
    return t && t.defaultView || window;
  }
  return i;
}
function ye(i) {
  var t = bt(i).Element;
  return i instanceof t || i instanceof Element;
}
function St(i) {
  var t = bt(i).HTMLElement;
  return i instanceof t || i instanceof HTMLElement;
}
function Ms(i) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = bt(i).ShadowRoot;
  return i instanceof t || i instanceof ShadowRoot;
}
function zc(i) {
  var t = i.state;
  Object.keys(t.elements).forEach(function(e) {
    var n = t.styles[e] || {}, s = t.attributes[e] || {}, r = t.elements[e];
    !St(r) || !Ht(r) || (Object.assign(r.style, n), Object.keys(s).forEach(function(o) {
      var a = s[o];
      a === !1 ? r.removeAttribute(o) : r.setAttribute(o, a === !0 ? "" : a);
    }));
  });
}
function Hc(i) {
  var t = i.state, e = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, e.popper), t.styles = e, t.elements.arrow && Object.assign(t.elements.arrow.style, e.arrow), function() {
    Object.keys(t.elements).forEach(function(n) {
      var s = t.elements[n], r = t.attributes[n] || {}, o = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : e[n]), a = o.reduce(function(c, l) {
        return c[l] = "", c;
      }, {});
      !St(s) || !Ht(s) || (Object.assign(s.style, a), Object.keys(r).forEach(function(c) {
        s.removeAttribute(c);
      }));
    });
  };
}
const Xo = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: zc,
  effect: Hc,
  requires: ["computeStyles"]
};
function zt(i) {
  return i.split("-")[0];
}
var me = Math.max, un = Math.min, Pe = Math.round;
function es() {
  var i = navigator.userAgentData;
  return i != null && i.brands && Array.isArray(i.brands) ? i.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Ko() {
  return !/^((?!chrome|android).)*safari/i.test(es());
}
function Re(i, t, e) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  var n = i.getBoundingClientRect(), s = 1, r = 1;
  t && St(i) && (s = i.offsetWidth > 0 && Pe(n.width) / i.offsetWidth || 1, r = i.offsetHeight > 0 && Pe(n.height) / i.offsetHeight || 1);
  var o = ye(i) ? bt(i) : window, a = o.visualViewport, c = !Ko() && e, l = (n.left + (c && a ? a.offsetLeft : 0)) / s, u = (n.top + (c && a ? a.offsetTop : 0)) / r, h = n.width / s, f = n.height / r;
  return {
    width: h,
    height: f,
    top: u,
    right: l + h,
    bottom: u + f,
    left: l,
    x: l,
    y: u
  };
}
function Os(i) {
  var t = Re(i), e = i.offsetWidth, n = i.offsetHeight;
  return Math.abs(t.width - e) <= 1 && (e = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: i.offsetLeft,
    y: i.offsetTop,
    width: e,
    height: n
  };
}
function qo(i, t) {
  var e = t.getRootNode && t.getRootNode();
  if (i.contains(t))
    return !0;
  if (e && Ms(e)) {
    var n = t;
    do {
      if (n && i.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function Yt(i) {
  return bt(i).getComputedStyle(i);
}
function jc(i) {
  return ["table", "td", "th"].indexOf(Ht(i)) >= 0;
}
function re(i) {
  return ((ye(i) ? i.ownerDocument : (
    // $FlowFixMe[prop-missing]
    i.document
  )) || window.document).documentElement;
}
function An(i) {
  return Ht(i) === "html" ? i : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    i.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    i.parentNode || // DOM Element detected
    (Ms(i) ? i.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    re(i)
  );
}
function tr(i) {
  return !St(i) || // https://github.com/popperjs/popper-core/issues/837
  Yt(i).position === "fixed" ? null : i.offsetParent;
}
function Wc(i) {
  var t = /firefox/i.test(es()), e = /Trident/i.test(es());
  if (e && St(i)) {
    var n = Yt(i);
    if (n.position === "fixed")
      return null;
  }
  var s = An(i);
  for (Ms(s) && (s = s.host); St(s) && ["html", "body"].indexOf(Ht(s)) < 0; ) {
    var r = Yt(s);
    if (r.transform !== "none" || r.perspective !== "none" || r.contain === "paint" || ["transform", "perspective"].indexOf(r.willChange) !== -1 || t && r.willChange === "filter" || t && r.filter && r.filter !== "none")
      return s;
    s = s.parentNode;
  }
  return null;
}
function xi(i) {
  for (var t = bt(i), e = tr(i); e && jc(e) && Yt(e).position === "static"; )
    e = tr(e);
  return e && (Ht(e) === "html" || Ht(e) === "body" && Yt(e).position === "static") ? t : e || Wc(i) || t;
}
function Ds(i) {
  return ["top", "bottom"].indexOf(i) >= 0 ? "x" : "y";
}
function ni(i, t, e) {
  return me(i, un(t, e));
}
function Nc(i, t, e) {
  var n = ni(i, t, e);
  return n > e ? e : n;
}
function Qo() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Zo(i) {
  return Object.assign({}, Qo(), i);
}
function Go(i, t) {
  return t.reduce(function(e, n) {
    return e[n] = i, e;
  }, {});
}
var $c = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, {
    placement: e.placement
  })) : t, Zo(typeof t != "number" ? t : Go(t, yi));
};
function Vc(i) {
  var t, e = i.state, n = i.name, s = i.options, r = e.elements.arrow, o = e.modifiersData.popperOffsets, a = zt(e.placement), c = Ds(a), l = [ht, At].indexOf(a) >= 0, u = l ? "height" : "width";
  if (!(!r || !o)) {
    var h = $c(s.padding, e), f = Os(r), d = c === "y" ? ut : ht, p = c === "y" ? kt : At, m = e.rects.reference[u] + e.rects.reference[c] - o[c] - e.rects.popper[u], b = o[c] - e.rects.reference[c], y = xi(r), x = y ? c === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, S = m / 2 - b / 2, g = h[d], k = x - f[u] - h[p], w = x / 2 - f[u] / 2 + S, A = ni(g, w, k), M = c;
    e.modifiersData[n] = (t = {}, t[M] = A, t.centerOffset = A - w, t);
  }
}
function Uc(i) {
  var t = i.state, e = i.options, n = e.element, s = n === void 0 ? "[data-popper-arrow]" : n;
  s != null && (typeof s == "string" && (s = t.elements.popper.querySelector(s), !s) || qo(t.elements.popper, s) && (t.elements.arrow = s));
}
const Yc = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Vc,
  effect: Uc,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Le(i) {
  return i.split("-")[1];
}
var Xc = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Kc(i, t) {
  var e = i.x, n = i.y, s = t.devicePixelRatio || 1;
  return {
    x: Pe(e * s) / s || 0,
    y: Pe(n * s) / s || 0
  };
}
function er(i) {
  var t, e = i.popper, n = i.popperRect, s = i.placement, r = i.variation, o = i.offsets, a = i.position, c = i.gpuAcceleration, l = i.adaptive, u = i.roundOffsets, h = i.isFixed, f = o.x, d = f === void 0 ? 0 : f, p = o.y, m = p === void 0 ? 0 : p, b = typeof u == "function" ? u({
    x: d,
    y: m
  }) : {
    x: d,
    y: m
  };
  d = b.x, m = b.y;
  var y = o.hasOwnProperty("x"), x = o.hasOwnProperty("y"), S = ht, g = ut, k = window;
  if (l) {
    var w = xi(e), A = "clientHeight", M = "clientWidth";
    if (w === bt(e) && (w = re(e), Yt(w).position !== "static" && a === "absolute" && (A = "scrollHeight", M = "scrollWidth")), w = w, s === ut || (s === ht || s === At) && r === li) {
      g = kt;
      var O = h && w === k && k.visualViewport ? k.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        w[A]
      );
      m -= O - n.height, m *= c ? 1 : -1;
    }
    if (s === ht || (s === ut || s === kt) && r === li) {
      S = At;
      var E = h && w === k && k.visualViewport ? k.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        w[M]
      );
      d -= E - n.width, d *= c ? 1 : -1;
    }
  }
  var T = Object.assign({
    position: a
  }, l && Xc), D = u === !0 ? Kc({
    x: d,
    y: m
  }, bt(e)) : {
    x: d,
    y: m
  };
  if (d = D.x, m = D.y, c) {
    var I;
    return Object.assign({}, T, (I = {}, I[g] = x ? "0" : "", I[S] = y ? "0" : "", I.transform = (k.devicePixelRatio || 1) <= 1 ? "translate(" + d + "px, " + m + "px)" : "translate3d(" + d + "px, " + m + "px, 0)", I));
  }
  return Object.assign({}, T, (t = {}, t[g] = x ? m + "px" : "", t[S] = y ? d + "px" : "", t.transform = "", t));
}
function qc(i) {
  var t = i.state, e = i.options, n = e.gpuAcceleration, s = n === void 0 ? !0 : n, r = e.adaptive, o = r === void 0 ? !0 : r, a = e.roundOffsets, c = a === void 0 ? !0 : a, l = {
    placement: zt(t.placement),
    variation: Le(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: s,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, er(Object.assign({}, l, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: o,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, er(Object.assign({}, l, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Qc = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: qc,
  data: {}
};
var Li = {
  passive: !0
};
function Zc(i) {
  var t = i.state, e = i.instance, n = i.options, s = n.scroll, r = s === void 0 ? !0 : s, o = n.resize, a = o === void 0 ? !0 : o, c = bt(t.elements.popper), l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return r && l.forEach(function(u) {
    u.addEventListener("scroll", e.update, Li);
  }), a && c.addEventListener("resize", e.update, Li), function() {
    r && l.forEach(function(u) {
      u.removeEventListener("scroll", e.update, Li);
    }), a && c.removeEventListener("resize", e.update, Li);
  };
}
const Gc = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Zc,
  data: {}
};
var Jc = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function tn(i) {
  return i.replace(/left|right|bottom|top/g, function(t) {
    return Jc[t];
  });
}
var tl = {
  start: "end",
  end: "start"
};
function ir(i) {
  return i.replace(/start|end/g, function(t) {
    return tl[t];
  });
}
function Cs(i) {
  var t = bt(i), e = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: e,
    scrollTop: n
  };
}
function Ts(i) {
  return Re(re(i)).left + Cs(i).scrollLeft;
}
function el(i, t) {
  var e = bt(i), n = re(i), s = e.visualViewport, r = n.clientWidth, o = n.clientHeight, a = 0, c = 0;
  if (s) {
    r = s.width, o = s.height;
    var l = Ko();
    (l || !l && t === "fixed") && (a = s.offsetLeft, c = s.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: a + Ts(i),
    y: c
  };
}
function il(i) {
  var t, e = re(i), n = Cs(i), s = (t = i.ownerDocument) == null ? void 0 : t.body, r = me(e.scrollWidth, e.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0), o = me(e.scrollHeight, e.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0), a = -n.scrollLeft + Ts(i), c = -n.scrollTop;
  return Yt(s || e).direction === "rtl" && (a += me(e.clientWidth, s ? s.clientWidth : 0) - r), {
    width: r,
    height: o,
    x: a,
    y: c
  };
}
function Es(i) {
  var t = Yt(i), e = t.overflow, n = t.overflowX, s = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + s + n);
}
function Jo(i) {
  return ["html", "body", "#document"].indexOf(Ht(i)) >= 0 ? i.ownerDocument.body : St(i) && Es(i) ? i : Jo(An(i));
}
function si(i, t) {
  var e;
  t === void 0 && (t = []);
  var n = Jo(i), s = n === ((e = i.ownerDocument) == null ? void 0 : e.body), r = bt(n), o = s ? [r].concat(r.visualViewport || [], Es(n) ? n : []) : n, a = t.concat(o);
  return s ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(si(An(o)))
  );
}
function is(i) {
  return Object.assign({}, i, {
    left: i.x,
    top: i.y,
    right: i.x + i.width,
    bottom: i.y + i.height
  });
}
function nl(i, t) {
  var e = Re(i, !1, t === "fixed");
  return e.top = e.top + i.clientTop, e.left = e.left + i.clientLeft, e.bottom = e.top + i.clientHeight, e.right = e.left + i.clientWidth, e.width = i.clientWidth, e.height = i.clientHeight, e.x = e.left, e.y = e.top, e;
}
function nr(i, t, e) {
  return t === Uo ? is(el(i, e)) : ye(t) ? nl(t, e) : is(il(re(i)));
}
function sl(i) {
  var t = si(An(i)), e = ["absolute", "fixed"].indexOf(Yt(i).position) >= 0, n = e && St(i) ? xi(i) : i;
  return ye(n) ? t.filter(function(s) {
    return ye(s) && qo(s, n) && Ht(s) !== "body";
  }) : [];
}
function rl(i, t, e, n) {
  var s = t === "clippingParents" ? sl(i) : [].concat(t), r = [].concat(s, [e]), o = r[0], a = r.reduce(function(c, l) {
    var u = nr(i, l, n);
    return c.top = me(u.top, c.top), c.right = un(u.right, c.right), c.bottom = un(u.bottom, c.bottom), c.left = me(u.left, c.left), c;
  }, nr(i, o, n));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function ta(i) {
  var t = i.reference, e = i.element, n = i.placement, s = n ? zt(n) : null, r = n ? Le(n) : null, o = t.x + t.width / 2 - e.width / 2, a = t.y + t.height / 2 - e.height / 2, c;
  switch (s) {
    case ut:
      c = {
        x: o,
        y: t.y - e.height
      };
      break;
    case kt:
      c = {
        x: o,
        y: t.y + t.height
      };
      break;
    case At:
      c = {
        x: t.x + t.width,
        y: a
      };
      break;
    case ht:
      c = {
        x: t.x - e.width,
        y: a
      };
      break;
    default:
      c = {
        x: t.x,
        y: t.y
      };
  }
  var l = s ? Ds(s) : null;
  if (l != null) {
    var u = l === "y" ? "height" : "width";
    switch (r) {
      case Ee:
        c[l] = c[l] - (t[u] / 2 - e[u] / 2);
        break;
      case li:
        c[l] = c[l] + (t[u] / 2 - e[u] / 2);
        break;
    }
  }
  return c;
}
function ui(i, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, s = n === void 0 ? i.placement : n, r = e.strategy, o = r === void 0 ? i.strategy : r, a = e.boundary, c = a === void 0 ? Mc : a, l = e.rootBoundary, u = l === void 0 ? Uo : l, h = e.elementContext, f = h === void 0 ? Xe : h, d = e.altBoundary, p = d === void 0 ? !1 : d, m = e.padding, b = m === void 0 ? 0 : m, y = Zo(typeof b != "number" ? b : Go(b, yi)), x = f === Xe ? Oc : Xe, S = i.rects.popper, g = i.elements[p ? x : f], k = rl(ye(g) ? g : g.contextElement || re(i.elements.popper), c, u, o), w = Re(i.elements.reference), A = ta({
    reference: w,
    element: S,
    placement: s
  }), M = is(Object.assign({}, S, A)), O = f === Xe ? M : w, E = {
    top: k.top - O.top + y.top,
    bottom: O.bottom - k.bottom + y.bottom,
    left: k.left - O.left + y.left,
    right: O.right - k.right + y.right
  }, T = i.modifiersData.offset;
  if (f === Xe && T) {
    var D = T[s];
    Object.keys(E).forEach(function(I) {
      var z = [At, kt].indexOf(I) >= 0 ? 1 : -1, L = [ut, kt].indexOf(I) >= 0 ? "y" : "x";
      E[I] += D[L] * z;
    });
  }
  return E;
}
function ol(i, t) {
  t === void 0 && (t = {});
  var e = t, n = e.placement, s = e.boundary, r = e.rootBoundary, o = e.padding, a = e.flipVariations, c = e.allowedAutoPlacements, l = c === void 0 ? Yo : c, u = Le(n), h = u ? a ? Js : Js.filter(function(p) {
    return Le(p) === u;
  }) : yi, f = h.filter(function(p) {
    return l.indexOf(p) >= 0;
  });
  f.length === 0 && (f = h);
  var d = f.reduce(function(p, m) {
    return p[m] = ui(i, {
      placement: m,
      boundary: s,
      rootBoundary: r,
      padding: o
    })[zt(m)], p;
  }, {});
  return Object.keys(d).sort(function(p, m) {
    return d[p] - d[m];
  });
}
function al(i) {
  if (zt(i) === As)
    return [];
  var t = tn(i);
  return [ir(i), t, ir(t)];
}
function cl(i) {
  var t = i.state, e = i.options, n = i.name;
  if (!t.modifiersData[n]._skip) {
    for (var s = e.mainAxis, r = s === void 0 ? !0 : s, o = e.altAxis, a = o === void 0 ? !0 : o, c = e.fallbackPlacements, l = e.padding, u = e.boundary, h = e.rootBoundary, f = e.altBoundary, d = e.flipVariations, p = d === void 0 ? !0 : d, m = e.allowedAutoPlacements, b = t.options.placement, y = zt(b), x = y === b, S = c || (x || !p ? [tn(b)] : al(b)), g = [b].concat(S).reduce(function(et, it) {
      return et.concat(zt(it) === As ? ol(t, {
        placement: it,
        boundary: u,
        rootBoundary: h,
        padding: l,
        flipVariations: p,
        allowedAutoPlacements: m
      }) : it);
    }, []), k = t.rects.reference, w = t.rects.popper, A = /* @__PURE__ */ new Map(), M = !0, O = g[0], E = 0; E < g.length; E++) {
      var T = g[E], D = zt(T), I = Le(T) === Ee, z = [ut, kt].indexOf(D) >= 0, L = z ? "width" : "height", B = ui(t, {
        placement: T,
        boundary: u,
        rootBoundary: h,
        altBoundary: f,
        padding: l
      }), N = z ? I ? At : ht : I ? kt : ut;
      k[L] > w[L] && (N = tn(N));
      var q = tn(N), ot = [];
      if (r && ot.push(B[D] <= 0), a && ot.push(B[N] <= 0, B[q] <= 0), ot.every(function(et) {
        return et;
      })) {
        O = T, M = !1;
        break;
      }
      A.set(T, ot);
    }
    if (M)
      for (var J = p ? 3 : 1, vt = function(it) {
        var nt = g.find(function(_e) {
          var jt = A.get(_e);
          if (jt)
            return jt.slice(0, it).every(function(we) {
              return we;
            });
        });
        if (nt)
          return O = nt, "break";
      }, tt = J; tt > 0; tt--) {
        var ft = vt(tt);
        if (ft === "break") break;
      }
    t.placement !== O && (t.modifiersData[n]._skip = !0, t.placement = O, t.reset = !0);
  }
}
const ll = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: cl,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function sr(i, t, e) {
  return e === void 0 && (e = {
    x: 0,
    y: 0
  }), {
    top: i.top - t.height - e.y,
    right: i.right - t.width + e.x,
    bottom: i.bottom - t.height + e.y,
    left: i.left - t.width - e.x
  };
}
function rr(i) {
  return [ut, At, kt, ht].some(function(t) {
    return i[t] >= 0;
  });
}
function ul(i) {
  var t = i.state, e = i.name, n = t.rects.reference, s = t.rects.popper, r = t.modifiersData.preventOverflow, o = ui(t, {
    elementContext: "reference"
  }), a = ui(t, {
    altBoundary: !0
  }), c = sr(o, n), l = sr(a, s, r), u = rr(c), h = rr(l);
  t.modifiersData[e] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: l,
    isReferenceHidden: u,
    hasPopperEscaped: h
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": h
  });
}
const hl = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: ul
};
function fl(i, t, e) {
  var n = zt(i), s = [ht, ut].indexOf(n) >= 0 ? -1 : 1, r = typeof e == "function" ? e(Object.assign({}, t, {
    placement: i
  })) : e, o = r[0], a = r[1];
  return o = o || 0, a = (a || 0) * s, [ht, At].indexOf(n) >= 0 ? {
    x: a,
    y: o
  } : {
    x: o,
    y: a
  };
}
function dl(i) {
  var t = i.state, e = i.options, n = i.name, s = e.offset, r = s === void 0 ? [0, 0] : s, o = Yo.reduce(function(u, h) {
    return u[h] = fl(h, t.rects, r), u;
  }, {}), a = o[t.placement], c = a.x, l = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += l), t.modifiersData[n] = o;
}
const pl = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: dl
};
function gl(i) {
  var t = i.state, e = i.name;
  t.modifiersData[e] = ta({
    reference: t.rects.reference,
    element: t.rects.popper,
    placement: t.placement
  });
}
const ml = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: gl,
  data: {}
};
function bl(i) {
  return i === "x" ? "y" : "x";
}
function vl(i) {
  var t = i.state, e = i.options, n = i.name, s = e.mainAxis, r = s === void 0 ? !0 : s, o = e.altAxis, a = o === void 0 ? !1 : o, c = e.boundary, l = e.rootBoundary, u = e.altBoundary, h = e.padding, f = e.tether, d = f === void 0 ? !0 : f, p = e.tetherOffset, m = p === void 0 ? 0 : p, b = ui(t, {
    boundary: c,
    rootBoundary: l,
    padding: h,
    altBoundary: u
  }), y = zt(t.placement), x = Le(t.placement), S = !x, g = Ds(y), k = bl(g), w = t.modifiersData.popperOffsets, A = t.rects.reference, M = t.rects.popper, O = typeof m == "function" ? m(Object.assign({}, t.rects, {
    placement: t.placement
  })) : m, E = typeof O == "number" ? {
    mainAxis: O,
    altAxis: O
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, O), T = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, D = {
    x: 0,
    y: 0
  };
  if (w) {
    if (r) {
      var I, z = g === "y" ? ut : ht, L = g === "y" ? kt : At, B = g === "y" ? "height" : "width", N = w[g], q = N + b[z], ot = N - b[L], J = d ? -M[B] / 2 : 0, vt = x === Ee ? A[B] : M[B], tt = x === Ee ? -M[B] : -A[B], ft = t.elements.arrow, et = d && ft ? Os(ft) : {
        width: 0,
        height: 0
      }, it = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Qo(), nt = it[z], _e = it[L], jt = ni(0, A[B], et[B]), we = S ? A[B] / 2 - J - jt - nt - E.mainAxis : vt - jt - nt - E.mainAxis, Kt = S ? -A[B] / 2 + J + jt + _e + E.mainAxis : tt + jt + _e + E.mainAxis, Se = t.elements.arrow && xi(t.elements.arrow), Si = Se ? g === "y" ? Se.clientTop || 0 : Se.clientLeft || 0 : 0, Ne = (I = T == null ? void 0 : T[g]) != null ? I : 0, ki = N + we - Ne - Si, Ai = N + Kt - Ne, $e = ni(d ? un(q, ki) : q, N, d ? me(ot, Ai) : ot);
      w[g] = $e, D[g] = $e - N;
    }
    if (a) {
      var Ve, Mi = g === "x" ? ut : ht, Oi = g === "x" ? kt : At, Wt = w[k], qt = k === "y" ? "height" : "width", Ue = Wt + b[Mi], ae = Wt - b[Oi], Ye = [ut, ht].indexOf(y) !== -1, Di = (Ve = T == null ? void 0 : T[k]) != null ? Ve : 0, Ci = Ye ? Ue : Wt - A[qt] - M[qt] - Di + E.altAxis, Ti = Ye ? Wt + A[qt] + M[qt] - Di - E.altAxis : ae, Ei = d && Ye ? Nc(Ci, Wt, Ti) : ni(d ? Ci : Ue, Wt, d ? Ti : ae);
      w[k] = Ei, D[k] = Ei - Wt;
    }
    t.modifiersData[n] = D;
  }
}
const yl = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: vl,
  requiresIfExists: ["offset"]
};
function xl(i) {
  return {
    scrollLeft: i.scrollLeft,
    scrollTop: i.scrollTop
  };
}
function _l(i) {
  return i === bt(i) || !St(i) ? Cs(i) : xl(i);
}
function wl(i) {
  var t = i.getBoundingClientRect(), e = Pe(t.width) / i.offsetWidth || 1, n = Pe(t.height) / i.offsetHeight || 1;
  return e !== 1 || n !== 1;
}
function Sl(i, t, e) {
  e === void 0 && (e = !1);
  var n = St(t), s = St(t) && wl(t), r = re(t), o = Re(i, s, e), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (n || !n && !e) && ((Ht(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Es(r)) && (a = _l(t)), St(t) ? (c = Re(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : r && (c.x = Ts(r))), {
    x: o.left + a.scrollLeft - c.x,
    y: o.top + a.scrollTop - c.y,
    width: o.width,
    height: o.height
  };
}
function kl(i) {
  var t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Set(), n = [];
  i.forEach(function(r) {
    t.set(r.name, r);
  });
  function s(r) {
    e.add(r.name);
    var o = [].concat(r.requires || [], r.requiresIfExists || []);
    o.forEach(function(a) {
      if (!e.has(a)) {
        var c = t.get(a);
        c && s(c);
      }
    }), n.push(r);
  }
  return i.forEach(function(r) {
    e.has(r.name) || s(r);
  }), n;
}
function Al(i) {
  var t = kl(i);
  return Bc.reduce(function(e, n) {
    return e.concat(t.filter(function(s) {
      return s.phase === n;
    }));
  }, []);
}
function Ml(i) {
  var t;
  return function() {
    return t || (t = new Promise(function(e) {
      Promise.resolve().then(function() {
        t = void 0, e(i());
      });
    })), t;
  };
}
function Ol(i) {
  var t = i.reduce(function(e, n) {
    var s = e[n.name];
    return e[n.name] = s ? Object.assign({}, s, n, {
      options: Object.assign({}, s.options, n.options),
      data: Object.assign({}, s.data, n.data)
    }) : n, e;
  }, {});
  return Object.keys(t).map(function(e) {
    return t[e];
  });
}
var or = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function ar() {
  for (var i = arguments.length, t = new Array(i), e = 0; e < i; e++)
    t[e] = arguments[e];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Dl(i) {
  i === void 0 && (i = {});
  var t = i, e = t.defaultModifiers, n = e === void 0 ? [] : e, s = t.defaultOptions, r = s === void 0 ? or : s;
  return function(a, c, l) {
    l === void 0 && (l = r);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, or, r),
      modifiersData: {},
      elements: {
        reference: a,
        popper: c
      },
      attributes: {},
      styles: {}
    }, h = [], f = !1, d = {
      state: u,
      setOptions: function(y) {
        var x = typeof y == "function" ? y(u.options) : y;
        m(), u.options = Object.assign({}, r, u.options, x), u.scrollParents = {
          reference: ye(a) ? si(a) : a.contextElement ? si(a.contextElement) : [],
          popper: si(c)
        };
        var S = Al(Ol([].concat(n, u.options.modifiers)));
        return u.orderedModifiers = S.filter(function(g) {
          return g.enabled;
        }), p(), d.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var y = u.elements, x = y.reference, S = y.popper;
          if (ar(x, S)) {
            u.rects = {
              reference: Sl(x, xi(S), u.options.strategy === "fixed"),
              popper: Os(S)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(E) {
              return u.modifiersData[E.name] = Object.assign({}, E.data);
            });
            for (var g = 0; g < u.orderedModifiers.length; g++) {
              if (u.reset === !0) {
                u.reset = !1, g = -1;
                continue;
              }
              var k = u.orderedModifiers[g], w = k.fn, A = k.options, M = A === void 0 ? {} : A, O = k.name;
              typeof w == "function" && (u = w({
                state: u,
                options: M,
                name: O,
                instance: d
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Ml(function() {
        return new Promise(function(b) {
          d.forceUpdate(), b(u);
        });
      }),
      destroy: function() {
        m(), f = !0;
      }
    };
    if (!ar(a, c))
      return d;
    d.setOptions(l).then(function(b) {
      !f && l.onFirstUpdate && l.onFirstUpdate(b);
    });
    function p() {
      u.orderedModifiers.forEach(function(b) {
        var y = b.name, x = b.options, S = x === void 0 ? {} : x, g = b.effect;
        if (typeof g == "function") {
          var k = g({
            state: u,
            name: y,
            instance: d,
            options: S
          }), w = function() {
          };
          h.push(k || w);
        }
      });
    }
    function m() {
      h.forEach(function(b) {
        return b();
      }), h = [];
    }
    return d;
  };
}
var Cl = [Gc, ml, Qc, Xo, pl, ll, yl, Yc, hl], Tl = /* @__PURE__ */ Dl({
  defaultModifiers: Cl
}), El = "tippy-box", ea = "tippy-content", Pl = "tippy-backdrop", ia = "tippy-arrow", na = "tippy-svg-arrow", de = {
  passive: !0,
  capture: !0
}, sa = function() {
  return document.body;
};
function Fn(i, t, e) {
  if (Array.isArray(i)) {
    var n = i[t];
    return n ?? (Array.isArray(e) ? e[t] : e);
  }
  return i;
}
function Ps(i, t) {
  var e = {}.toString.call(i);
  return e.indexOf("[object") === 0 && e.indexOf(t + "]") > -1;
}
function ra(i, t) {
  return typeof i == "function" ? i.apply(void 0, t) : i;
}
function cr(i, t) {
  if (t === 0)
    return i;
  var e;
  return function(n) {
    clearTimeout(e), e = setTimeout(function() {
      i(n);
    }, t);
  };
}
function Rl(i) {
  return i.split(/\s+/).filter(Boolean);
}
function Oe(i) {
  return [].concat(i);
}
function lr(i, t) {
  i.indexOf(t) === -1 && i.push(t);
}
function Ll(i) {
  return i.filter(function(t, e) {
    return i.indexOf(t) === e;
  });
}
function Fl(i) {
  return i.split("-")[0];
}
function hn(i) {
  return [].slice.call(i);
}
function ur(i) {
  return Object.keys(i).reduce(function(t, e) {
    return i[e] !== void 0 && (t[e] = i[e]), t;
  }, {});
}
function ri() {
  return document.createElement("div");
}
function Mn(i) {
  return ["Element", "Fragment"].some(function(t) {
    return Ps(i, t);
  });
}
function Il(i) {
  return Ps(i, "NodeList");
}
function Bl(i) {
  return Ps(i, "MouseEvent");
}
function zl(i) {
  return !!(i && i._tippy && i._tippy.reference === i);
}
function Hl(i) {
  return Mn(i) ? [i] : Il(i) ? hn(i) : Array.isArray(i) ? i : hn(document.querySelectorAll(i));
}
function In(i, t) {
  i.forEach(function(e) {
    e && (e.style.transitionDuration = t + "ms");
  });
}
function hr(i, t) {
  i.forEach(function(e) {
    e && e.setAttribute("data-state", t);
  });
}
function jl(i) {
  var t, e = Oe(i), n = e[0];
  return n != null && (t = n.ownerDocument) != null && t.body ? n.ownerDocument : document;
}
function Wl(i, t) {
  var e = t.clientX, n = t.clientY;
  return i.every(function(s) {
    var r = s.popperRect, o = s.popperState, a = s.props, c = a.interactiveBorder, l = Fl(o.placement), u = o.modifiersData.offset;
    if (!u)
      return !0;
    var h = l === "bottom" ? u.top.y : 0, f = l === "top" ? u.bottom.y : 0, d = l === "right" ? u.left.x : 0, p = l === "left" ? u.right.x : 0, m = r.top - n + h > c, b = n - r.bottom - f > c, y = r.left - e + d > c, x = e - r.right - p > c;
    return m || b || y || x;
  });
}
function Bn(i, t, e) {
  var n = t + "EventListener";
  ["transitionend", "webkitTransitionEnd"].forEach(function(s) {
    i[n](s, e);
  });
}
function fr(i, t) {
  for (var e = t; e; ) {
    var n;
    if (i.contains(e))
      return !0;
    e = e.getRootNode == null || (n = e.getRootNode()) == null ? void 0 : n.host;
  }
  return !1;
}
var Lt = {
  isTouch: !1
}, dr = 0;
function Nl() {
  Lt.isTouch || (Lt.isTouch = !0, window.performance && document.addEventListener("mousemove", oa));
}
function oa() {
  var i = performance.now();
  i - dr < 20 && (Lt.isTouch = !1, document.removeEventListener("mousemove", oa)), dr = i;
}
function $l() {
  var i = document.activeElement;
  if (zl(i)) {
    var t = i._tippy;
    i.blur && !t.state.isVisible && i.blur();
  }
}
function Vl() {
  document.addEventListener("touchstart", Nl, de), window.addEventListener("blur", $l);
}
var Ul = typeof window < "u" && typeof document < "u", Yl = Ul ? (
  // @ts-ignore
  !!window.msCrypto
) : !1, Xl = {
  animateFill: !1,
  followCursor: !1,
  inlinePositioning: !1,
  sticky: !1
}, Kl = {
  allowHTML: !1,
  animation: "fade",
  arrow: !0,
  content: "",
  inertia: !1,
  maxWidth: 350,
  role: "tooltip",
  theme: "",
  zIndex: 9999
}, Ct = Object.assign({
  appendTo: sa,
  aria: {
    content: "auto",
    expanded: "auto"
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: !0,
  ignoreAttributes: !1,
  interactive: !1,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: "",
  offset: [0, 10],
  onAfterUpdate: function() {
  },
  onBeforeUpdate: function() {
  },
  onCreate: function() {
  },
  onDestroy: function() {
  },
  onHidden: function() {
  },
  onHide: function() {
  },
  onMount: function() {
  },
  onShow: function() {
  },
  onShown: function() {
  },
  onTrigger: function() {
  },
  onUntrigger: function() {
  },
  onClickOutside: function() {
  },
  placement: "top",
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: !1,
  touch: !0,
  trigger: "mouseenter focus",
  triggerTarget: null
}, Xl, Kl), ql = Object.keys(Ct), Ql = function(t) {
  var e = Object.keys(t);
  e.forEach(function(n) {
    Ct[n] = t[n];
  });
};
function aa(i) {
  var t = i.plugins || [], e = t.reduce(function(n, s) {
    var r = s.name, o = s.defaultValue;
    if (r) {
      var a;
      n[r] = i[r] !== void 0 ? i[r] : (a = Ct[r]) != null ? a : o;
    }
    return n;
  }, {});
  return Object.assign({}, i, e);
}
function Zl(i, t) {
  var e = t ? Object.keys(aa(Object.assign({}, Ct, {
    plugins: t
  }))) : ql, n = e.reduce(function(s, r) {
    var o = (i.getAttribute("data-tippy-" + r) || "").trim();
    if (!o)
      return s;
    if (r === "content")
      s[r] = o;
    else
      try {
        s[r] = JSON.parse(o);
      } catch {
        s[r] = o;
      }
    return s;
  }, {});
  return n;
}
function pr(i, t) {
  var e = Object.assign({}, t, {
    content: ra(t.content, [i])
  }, t.ignoreAttributes ? {} : Zl(i, t.plugins));
  return e.aria = Object.assign({}, Ct.aria, e.aria), e.aria = {
    expanded: e.aria.expanded === "auto" ? t.interactive : e.aria.expanded,
    content: e.aria.content === "auto" ? t.interactive ? null : "describedby" : e.aria.content
  }, e;
}
var Gl = function() {
  return "innerHTML";
};
function ns(i, t) {
  i[Gl()] = t;
}
function gr(i) {
  var t = ri();
  return i === !0 ? t.className = ia : (t.className = na, Mn(i) ? t.appendChild(i) : ns(t, i)), t;
}
function mr(i, t) {
  Mn(t.content) ? (ns(i, ""), i.appendChild(t.content)) : typeof t.content != "function" && (t.allowHTML ? ns(i, t.content) : i.textContent = t.content);
}
function ss(i) {
  var t = i.firstElementChild, e = hn(t.children);
  return {
    box: t,
    content: e.find(function(n) {
      return n.classList.contains(ea);
    }),
    arrow: e.find(function(n) {
      return n.classList.contains(ia) || n.classList.contains(na);
    }),
    backdrop: e.find(function(n) {
      return n.classList.contains(Pl);
    })
  };
}
function ca(i) {
  var t = ri(), e = ri();
  e.className = El, e.setAttribute("data-state", "hidden"), e.setAttribute("tabindex", "-1");
  var n = ri();
  n.className = ea, n.setAttribute("data-state", "hidden"), mr(n, i.props), t.appendChild(e), e.appendChild(n), s(i.props, i.props);
  function s(r, o) {
    var a = ss(t), c = a.box, l = a.content, u = a.arrow;
    o.theme ? c.setAttribute("data-theme", o.theme) : c.removeAttribute("data-theme"), typeof o.animation == "string" ? c.setAttribute("data-animation", o.animation) : c.removeAttribute("data-animation"), o.inertia ? c.setAttribute("data-inertia", "") : c.removeAttribute("data-inertia"), c.style.maxWidth = typeof o.maxWidth == "number" ? o.maxWidth + "px" : o.maxWidth, o.role ? c.setAttribute("role", o.role) : c.removeAttribute("role"), (r.content !== o.content || r.allowHTML !== o.allowHTML) && mr(l, i.props), o.arrow ? u ? r.arrow !== o.arrow && (c.removeChild(u), c.appendChild(gr(o.arrow))) : c.appendChild(gr(o.arrow)) : u && c.removeChild(u);
  }
  return {
    popper: t,
    onUpdate: s
  };
}
ca.$$tippy = !0;
var Jl = 1, Fi = [], zn = [];
function tu(i, t) {
  var e = pr(i, Object.assign({}, Ct, aa(ur(t)))), n, s, r, o = !1, a = !1, c = !1, l = !1, u, h, f, d = [], p = cr(ki, e.interactiveDebounce), m, b = Jl++, y = null, x = Ll(e.plugins), S = {
    // Is the instance currently enabled?
    isEnabled: !0,
    // Is the tippy currently showing and not transitioning out?
    isVisible: !1,
    // Has the instance been destroyed?
    isDestroyed: !1,
    // Is the tippy currently mounted to the DOM?
    isMounted: !1,
    // Has the tippy finished transitioning in?
    isShown: !1
  }, g = {
    // properties
    id: b,
    reference: i,
    popper: ri(),
    popperInstance: y,
    props: e,
    state: S,
    plugins: x,
    // methods
    clearDelayTimeouts: Ci,
    setProps: Ti,
    setContent: Ei,
    show: lc,
    hide: uc,
    hideWithInteractivity: hc,
    enable: Ye,
    disable: Di,
    unmount: fc,
    destroy: dc
  };
  if (!e.render)
    return g;
  var k = e.render(g), w = k.popper, A = k.onUpdate;
  w.setAttribute("data-tippy-root", ""), w.id = "tippy-" + g.id, g.popper = w, i._tippy = g, w._tippy = g;
  var M = x.map(function(_) {
    return _.fn(g);
  }), O = i.hasAttribute("aria-expanded");
  return Se(), J(), N(), q("onCreate", [g]), e.showOnCreate && Ue(), w.addEventListener("mouseenter", function() {
    g.props.interactive && g.state.isVisible && g.clearDelayTimeouts();
  }), w.addEventListener("mouseleave", function() {
    g.props.interactive && g.props.trigger.indexOf("mouseenter") >= 0 && z().addEventListener("mousemove", p);
  }), g;
  function E() {
    var _ = g.props.touch;
    return Array.isArray(_) ? _ : [_, 0];
  }
  function T() {
    return E()[0] === "hold";
  }
  function D() {
    var _;
    return !!((_ = g.props.render) != null && _.$$tippy);
  }
  function I() {
    return m || i;
  }
  function z() {
    var _ = I().parentNode;
    return _ ? jl(_) : document;
  }
  function L() {
    return ss(w);
  }
  function B(_) {
    return g.state.isMounted && !g.state.isVisible || Lt.isTouch || u && u.type === "focus" ? 0 : Fn(g.props.delay, _ ? 0 : 1, Ct.delay);
  }
  function N(_) {
    _ === void 0 && (_ = !1), w.style.pointerEvents = g.props.interactive && !_ ? "" : "none", w.style.zIndex = "" + g.props.zIndex;
  }
  function q(_, C, R) {
    if (R === void 0 && (R = !0), M.forEach(function(H) {
      H[_] && H[_].apply(H, C);
    }), R) {
      var $;
      ($ = g.props)[_].apply($, C);
    }
  }
  function ot() {
    var _ = g.props.aria;
    if (_.content) {
      var C = "aria-" + _.content, R = w.id, $ = Oe(g.props.triggerTarget || i);
      $.forEach(function(H) {
        var at = H.getAttribute(C);
        if (g.state.isVisible)
          H.setAttribute(C, at ? at + " " + R : R);
        else {
          var yt = at && at.replace(R, "").trim();
          yt ? H.setAttribute(C, yt) : H.removeAttribute(C);
        }
      });
    }
  }
  function J() {
    if (!(O || !g.props.aria.expanded)) {
      var _ = Oe(g.props.triggerTarget || i);
      _.forEach(function(C) {
        g.props.interactive ? C.setAttribute("aria-expanded", g.state.isVisible && C === I() ? "true" : "false") : C.removeAttribute("aria-expanded");
      });
    }
  }
  function vt() {
    z().removeEventListener("mousemove", p), Fi = Fi.filter(function(_) {
      return _ !== p;
    });
  }
  function tt(_) {
    if (!(Lt.isTouch && (c || _.type === "mousedown"))) {
      var C = _.composedPath && _.composedPath()[0] || _.target;
      if (!(g.props.interactive && fr(w, C))) {
        if (Oe(g.props.triggerTarget || i).some(function(R) {
          return fr(R, C);
        })) {
          if (Lt.isTouch || g.state.isVisible && g.props.trigger.indexOf("click") >= 0)
            return;
        } else
          q("onClickOutside", [g, _]);
        g.props.hideOnClick === !0 && (g.clearDelayTimeouts(), g.hide(), a = !0, setTimeout(function() {
          a = !1;
        }), g.state.isMounted || nt());
      }
    }
  }
  function ft() {
    c = !0;
  }
  function et() {
    c = !1;
  }
  function it() {
    var _ = z();
    _.addEventListener("mousedown", tt, !0), _.addEventListener("touchend", tt, de), _.addEventListener("touchstart", et, de), _.addEventListener("touchmove", ft, de);
  }
  function nt() {
    var _ = z();
    _.removeEventListener("mousedown", tt, !0), _.removeEventListener("touchend", tt, de), _.removeEventListener("touchstart", et, de), _.removeEventListener("touchmove", ft, de);
  }
  function _e(_, C) {
    we(_, function() {
      !g.state.isVisible && w.parentNode && w.parentNode.contains(w) && C();
    });
  }
  function jt(_, C) {
    we(_, C);
  }
  function we(_, C) {
    var R = L().box;
    function $(H) {
      H.target === R && (Bn(R, "remove", $), C());
    }
    if (_ === 0)
      return C();
    Bn(R, "remove", h), Bn(R, "add", $), h = $;
  }
  function Kt(_, C, R) {
    R === void 0 && (R = !1);
    var $ = Oe(g.props.triggerTarget || i);
    $.forEach(function(H) {
      H.addEventListener(_, C, R), d.push({
        node: H,
        eventType: _,
        handler: C,
        options: R
      });
    });
  }
  function Se() {
    T() && (Kt("touchstart", Ne, {
      passive: !0
    }), Kt("touchend", Ai, {
      passive: !0
    })), Rl(g.props.trigger).forEach(function(_) {
      if (_ !== "manual")
        switch (Kt(_, Ne), _) {
          case "mouseenter":
            Kt("mouseleave", Ai);
            break;
          case "focus":
            Kt(Yl ? "focusout" : "blur", $e);
            break;
          case "focusin":
            Kt("focusout", $e);
            break;
        }
    });
  }
  function Si() {
    d.forEach(function(_) {
      var C = _.node, R = _.eventType, $ = _.handler, H = _.options;
      C.removeEventListener(R, $, H);
    }), d = [];
  }
  function Ne(_) {
    var C, R = !1;
    if (!(!g.state.isEnabled || Ve(_) || a)) {
      var $ = ((C = u) == null ? void 0 : C.type) === "focus";
      u = _, m = _.currentTarget, J(), !g.state.isVisible && Bl(_) && Fi.forEach(function(H) {
        return H(_);
      }), _.type === "click" && (g.props.trigger.indexOf("mouseenter") < 0 || o) && g.props.hideOnClick !== !1 && g.state.isVisible ? R = !0 : Ue(_), _.type === "click" && (o = !R), R && !$ && ae(_);
    }
  }
  function ki(_) {
    var C = _.target, R = I().contains(C) || w.contains(C);
    if (!(_.type === "mousemove" && R)) {
      var $ = qt().concat(w).map(function(H) {
        var at, yt = H._tippy, ke = (at = yt.popperInstance) == null ? void 0 : at.state;
        return ke ? {
          popperRect: H.getBoundingClientRect(),
          popperState: ke,
          props: e
        } : null;
      }).filter(Boolean);
      Wl($, _) && (vt(), ae(_));
    }
  }
  function Ai(_) {
    var C = Ve(_) || g.props.trigger.indexOf("click") >= 0 && o;
    if (!C) {
      if (g.props.interactive) {
        g.hideWithInteractivity(_);
        return;
      }
      ae(_);
    }
  }
  function $e(_) {
    g.props.trigger.indexOf("focusin") < 0 && _.target !== I() || g.props.interactive && _.relatedTarget && w.contains(_.relatedTarget) || ae(_);
  }
  function Ve(_) {
    return Lt.isTouch ? T() !== _.type.indexOf("touch") >= 0 : !1;
  }
  function Mi() {
    Oi();
    var _ = g.props, C = _.popperOptions, R = _.placement, $ = _.offset, H = _.getReferenceClientRect, at = _.moveTransition, yt = D() ? ss(w).arrow : null, ke = H ? {
      getBoundingClientRect: H,
      contextElement: H.contextElement || I()
    } : i, Qs = {
      name: "$$tippy",
      enabled: !0,
      phase: "beforeWrite",
      requires: ["computeStyles"],
      fn: function(Pi) {
        var Ae = Pi.state;
        if (D()) {
          var pc = L(), Ln = pc.box;
          ["placement", "reference-hidden", "escaped"].forEach(function(Ri) {
            Ri === "placement" ? Ln.setAttribute("data-placement", Ae.placement) : Ae.attributes.popper["data-popper-" + Ri] ? Ln.setAttribute("data-" + Ri, "") : Ln.removeAttribute("data-" + Ri);
          }), Ae.attributes.popper = {};
        }
      }
    }, ce = [{
      name: "offset",
      options: {
        offset: $
      }
    }, {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: "flip",
      options: {
        padding: 5
      }
    }, {
      name: "computeStyles",
      options: {
        adaptive: !at
      }
    }, Qs];
    D() && yt && ce.push({
      name: "arrow",
      options: {
        element: yt,
        padding: 3
      }
    }), ce.push.apply(ce, (C == null ? void 0 : C.modifiers) || []), g.popperInstance = Tl(ke, w, Object.assign({}, C, {
      placement: R,
      onFirstUpdate: f,
      modifiers: ce
    }));
  }
  function Oi() {
    g.popperInstance && (g.popperInstance.destroy(), g.popperInstance = null);
  }
  function Wt() {
    var _ = g.props.appendTo, C, R = I();
    g.props.interactive && _ === sa || _ === "parent" ? C = R.parentNode : C = ra(_, [R]), C.contains(w) || C.appendChild(w), g.state.isMounted = !0, Mi();
  }
  function qt() {
    return hn(w.querySelectorAll("[data-tippy-root]"));
  }
  function Ue(_) {
    g.clearDelayTimeouts(), _ && q("onTrigger", [g, _]), it();
    var C = B(!0), R = E(), $ = R[0], H = R[1];
    Lt.isTouch && $ === "hold" && H && (C = H), C ? n = setTimeout(function() {
      g.show();
    }, C) : g.show();
  }
  function ae(_) {
    if (g.clearDelayTimeouts(), q("onUntrigger", [g, _]), !g.state.isVisible) {
      nt();
      return;
    }
    if (!(g.props.trigger.indexOf("mouseenter") >= 0 && g.props.trigger.indexOf("click") >= 0 && ["mouseleave", "mousemove"].indexOf(_.type) >= 0 && o)) {
      var C = B(!1);
      C ? s = setTimeout(function() {
        g.state.isVisible && g.hide();
      }, C) : r = requestAnimationFrame(function() {
        g.hide();
      });
    }
  }
  function Ye() {
    g.state.isEnabled = !0;
  }
  function Di() {
    g.hide(), g.state.isEnabled = !1;
  }
  function Ci() {
    clearTimeout(n), clearTimeout(s), cancelAnimationFrame(r);
  }
  function Ti(_) {
    if (!g.state.isDestroyed) {
      q("onBeforeUpdate", [g, _]), Si();
      var C = g.props, R = pr(i, Object.assign({}, C, ur(_), {
        ignoreAttributes: !0
      }));
      g.props = R, Se(), C.interactiveDebounce !== R.interactiveDebounce && (vt(), p = cr(ki, R.interactiveDebounce)), C.triggerTarget && !R.triggerTarget ? Oe(C.triggerTarget).forEach(function($) {
        $.removeAttribute("aria-expanded");
      }) : R.triggerTarget && i.removeAttribute("aria-expanded"), J(), N(), A && A(C, R), g.popperInstance && (Mi(), qt().forEach(function($) {
        requestAnimationFrame($._tippy.popperInstance.forceUpdate);
      })), q("onAfterUpdate", [g, _]);
    }
  }
  function Ei(_) {
    g.setProps({
      content: _
    });
  }
  function lc() {
    var _ = g.state.isVisible, C = g.state.isDestroyed, R = !g.state.isEnabled, $ = Lt.isTouch && !g.props.touch, H = Fn(g.props.duration, 0, Ct.duration);
    if (!(_ || C || R || $) && !I().hasAttribute("disabled") && (q("onShow", [g], !1), g.props.onShow(g) !== !1)) {
      if (g.state.isVisible = !0, D() && (w.style.visibility = "visible"), N(), it(), g.state.isMounted || (w.style.transition = "none"), D()) {
        var at = L(), yt = at.box, ke = at.content;
        In([yt, ke], 0);
      }
      f = function() {
        var ce;
        if (!(!g.state.isVisible || l)) {
          if (l = !0, w.offsetHeight, w.style.transition = g.props.moveTransition, D() && g.props.animation) {
            var Rn = L(), Pi = Rn.box, Ae = Rn.content;
            In([Pi, Ae], H), hr([Pi, Ae], "visible");
          }
          ot(), J(), lr(zn, g), (ce = g.popperInstance) == null || ce.forceUpdate(), q("onMount", [g]), g.props.animation && D() && jt(H, function() {
            g.state.isShown = !0, q("onShown", [g]);
          });
        }
      }, Wt();
    }
  }
  function uc() {
    var _ = !g.state.isVisible, C = g.state.isDestroyed, R = !g.state.isEnabled, $ = Fn(g.props.duration, 1, Ct.duration);
    if (!(_ || C || R) && (q("onHide", [g], !1), g.props.onHide(g) !== !1)) {
      if (g.state.isVisible = !1, g.state.isShown = !1, l = !1, o = !1, D() && (w.style.visibility = "hidden"), vt(), nt(), N(!0), D()) {
        var H = L(), at = H.box, yt = H.content;
        g.props.animation && (In([at, yt], $), hr([at, yt], "hidden"));
      }
      ot(), J(), g.props.animation ? D() && _e($, g.unmount) : g.unmount();
    }
  }
  function hc(_) {
    z().addEventListener("mousemove", p), lr(Fi, p), p(_);
  }
  function fc() {
    g.state.isVisible && g.hide(), g.state.isMounted && (Oi(), qt().forEach(function(_) {
      _._tippy.unmount();
    }), w.parentNode && w.parentNode.removeChild(w), zn = zn.filter(function(_) {
      return _ !== g;
    }), g.state.isMounted = !1, q("onHidden", [g]));
  }
  function dc() {
    g.state.isDestroyed || (g.clearDelayTimeouts(), g.unmount(), Si(), delete i._tippy, g.state.isDestroyed = !0, q("onDestroy", [g]));
  }
}
function _i(i, t) {
  t === void 0 && (t = {});
  var e = Ct.plugins.concat(t.plugins || []);
  Vl();
  var n = Object.assign({}, t, {
    plugins: e
  }), s = Hl(i), r = s.reduce(function(o, a) {
    var c = a && tu(a, n);
    return c && o.push(c), o;
  }, []);
  return Mn(i) ? r[0] : r;
}
_i.defaultProps = Ct;
_i.setDefaultProps = Ql;
_i.currentInput = Lt;
Object.assign({}, Xo, {
  effect: function(t) {
    var e = t.state, n = {
      popper: {
        position: e.options.strategy,
        left: "0",
        top: "0",
        margin: "0"
      },
      arrow: {
        position: "absolute"
      },
      reference: {}
    };
    Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow);
  }
});
_i.setDefaultProps({
  render: ca
});
function eu({
  color: i = "var(--contrast-6)",
  icon: t = "info-circle-fill",
  tooltip: e
}) {
  const n = ie(null);
  return bi(() => {
    n.current && _i(n.current, {
      content: e,
      theme: "access",
      appendTo: n.current.parentElement
    });
  }, [n.current]), /* @__PURE__ */ v("button", { class: "info-tip", style: { color: i }, ref: n, children: /* @__PURE__ */ v(Y, { name: t }) });
}
function iu({ infoGroupId: i }) {
  const t = mt(
    `https://support.access-ci.org/api/1.0/kb/${i}`
  );
  if (!(!t || t.error || !t.length))
    return /* @__PURE__ */ v(Bt, { title: "Documentation", icon: "book", children: /* @__PURE__ */ v("ul", { children: t.map(({ title: e, description: n, link: s }) => /* @__PURE__ */ v("li", { children: [
      /* @__PURE__ */ v("a", { href: bc(s), children: e }),
      n ? /* @__PURE__ */ v(eu, { tooltip: $o(n) }) : null
    ] })) }) });
}
function nu({ children: i, icon: t = "megaphone-fill" }) {
  return /* @__PURE__ */ v("div", { class: "alert", children: [
    t ? /* @__PURE__ */ v(Y, { name: t }) : null,
    /* @__PURE__ */ v("div", { class: "alert-body", children: i })
  ] });
}
function su({ children: i }) {
  const [t, e] = Be(!1);
  return /* @__PURE__ */ v("div", { class: `expand-text ${t ? "expanded" : "contracted"}`, children: [
    i,
    /* @__PURE__ */ v("button", { class: "expand-button", onClick: () => e(!t), children: [
      /* @__PURE__ */ v(Y, { name: `caret-${t ? "up" : "left"}-fill` }),
      t ? "Less" : "More"
    ] })
  ] });
}
function ru({
  date__end: i,
  date__start: t,
  description: e,
  location: n,
  registration: s,
  speaker: r,
  title: o
}) {
  const a = s, c = a ? /* @__PURE__ */ v("a", { href: a, children: o }) : o, l = [];
  let u = null;
  const h = t, f = i;
  if (h) {
    const d = new Date(h), p = new Date(f || h), [m, b] = [d, p].map(
      (w) => w.toLocaleString("en-US", { dateStyle: "long" })
    ), [y, x] = [d, p].map(
      (w) => w.toLocaleString("en-US", { timeStyle: "short" })
    ), S = d.toLocaleTimeString("en-US", { timeZoneName: "short" }).split(" ")[2], g = [`${m},`, y];
    (x != y || b != m) && (g.push("-"), b != m && g.push(`${b},`), g.push(x)), g.push(`(${S})`), l.push(/* @__PURE__ */ v(Y, { name: "calendar" }), g.join(" ")), r && l.push(/* @__PURE__ */ v(Y, { name: "people-fill" }), r), n && l.push(/* @__PURE__ */ v(Y, { name: "geo-alt-fill" }), n);
    const k = d.toLocaleString("en-US", { dateStyle: "medium" }).split(",")[0].split(" ").map((w) => /* @__PURE__ */ v("span", { children: w }));
    u = a ? /* @__PURE__ */ v("a", { href: a, class: "event-icon", children: k }) : /* @__PURE__ */ v("div", { class: "event-icon", children: k });
  }
  return /* @__PURE__ */ v("div", { class: "event", children: [
    u,
    /* @__PURE__ */ v("div", { class: "event-details", children: [
      /* @__PURE__ */ v("h3", { children: c }),
      l.length ? /* @__PURE__ */ v("div", { class: "event-metadata", children: l }) : null,
      e ? /* @__PURE__ */ v(su, { children: /* @__PURE__ */ v("p", { children: ts(e) }) }) : null
    ] })
  ] });
}
function ou({ infoGroupId: i }) {
  const t = vi(i), e = mt(
    "https://operations-api.access-ci.org/wh2/news/v1/affiliation/access-ci.org/current_outages/"
  ), n = mt(
    "https://operations-api.access-ci.org/wh2/news/v1/affiliation/access-ci.org/future_outages/"
  ), s = mt(
    `https://support.access-ci.org/api/1.1/events/ag/${i}`
  ), r = Zs(
    [t, e, n],
    (a, c, l) => [...c.results, ...l.results].filter(
      (u) => u.AffectedResources.some(
        (h) => a.infoResourceIds.includes(h.ResourceID)
      )
    ),
    []
  ), o = Zs(
    [s],
    (a) => a.filter((c) => new Date(c.date__start) >= /* @__PURE__ */ new Date()),
    []
  );
  if (!(!r.length && !o.length))
    return /* @__PURE__ */ v(Bt, { title: "Announcements and Events", icon: "calendar3", children: [
      r.map(({ Subject: a, Content: c }) => /* @__PURE__ */ v(nu, { children: [
        a,
        " ",
        /* @__PURE__ */ v("a", { href: "https://operations.access-ci.org/infrastructure_news_view", children: "Learn more." })
      ] })),
      o.map((a) => ru(a))
    ] });
}
function au({ children: i, headingLevel: t = 2, title: e }) {
  const [n, s] = Be(!1), r = `h${t}`;
  return /* @__PURE__ */ v("div", { class: "accordion", children: [
    /* @__PURE__ */ v(r, { class: "accordion-heading", children: /* @__PURE__ */ v("button", { "aria-expanded": n, onClick: () => s(!n), children: [
      e,
      /* @__PURE__ */ v(Y, { name: n ? "caret-up-fill" : "caret-down-fill" })
    ] }) }),
    /* @__PURE__ */ v(
      "div",
      {
        class: "accordion-content",
        style: { display: n ? "block" : "none" },
        children: i
      }
    )
  ] });
}
function cu({
  resource_descriptive_name: i,
  resource_description: t,
  compute: e,
  storage: n
}) {
  const s = (e || n || {}).recommended_use;
  return /* @__PURE__ */ v(au, { title: i, children: [
    t ? ts(t) : null,
    s ? /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ v("h3", { children: "Recommended Use" }),
      ts(s)
    ] }) : null
  ] });
}
function lu({ infoGroupId: i }) {
  const t = vi(i), e = mt(
    t ? t.infoResourceIds.map(
      (c) => `https://operations-api.access-ci.org/wh2/cider/v1/info_resourceid/${c}/?format=json`
    ) : null,
    { defaultValue: [] }
  ), n = e.filter((c) => c.results && c.results.cider_type == "Compute").map((c) => ({
    ...c.results.compute,
    key: c.results.info_resourceid,
    name: c.results.resource_descriptive_name,
    format: (l, u) => {
      const h = c.results.compute[u.attr];
      return u.format && h ? u.format(h, u) : h || /* @__PURE__ */ v(wt, { children: "—" });
    }
  })), s = e.length ? [
    {
      name: "Nodes",
      attr: "node_count",
      format: (c) => c.toLocaleString("en-us")
    },
    { name: "CPU Type", attr: "cpu_type" },
    {
      name: "CPU Speed",
      attr: "cpu_speed_ghz",
      format: (c) => `${c} Ghz`
    },
    { name: "CPU Cores per Node", attr: "cpu_count_per_node" },
    {
      name: "RAM per CPU Core",
      attr: "memory_per_cpu_gb",
      format: (c) => `${c.toLocaleString("en-us")} GB`
    },
    {
      name: "GPU",
      attr: "gpu_description"
    },
    {
      name: "Local Storage per Node",
      attr: "local_storage_per_node_gb",
      format: (c) => `${c.toLocaleString("en-us")} GB`
    },
    {
      name: "Network Interconnect",
      attr: "interconnect"
    },
    {
      name: "Operating System",
      attr: "operating_system"
    },
    {
      name: "Batch System",
      attr: "batch_system"
    }
  ].filter((c) => n.some((l) => l[c.attr])) : [], r = {
    key: "name",
    name: "Attribute",
    format: (c) => /* @__PURE__ */ v("strong", { children: c })
  }, o = n.length > 0 && s.length > 0, a = { compute: [], storage: [], other: [] };
  for (let { results: c } of e)
    (a[c.cider_type.toLowerCase()] || a.other).push(
      /* @__PURE__ */ v(cu, { ...c })
    );
  return /* @__PURE__ */ v(wt, { children: [
    o || a.compute.length > 0 ? /* @__PURE__ */ v(Bt, { title: "Compute Resources", icon: "cpu-fill", children: [
      a.compute,
      o && /* @__PURE__ */ v(wt, { children: [
        /* @__PURE__ */ v("h3", { children: "Specifications" }),
        /* @__PURE__ */ v(
          kn,
          {
            columns: [r, ...n],
            rows: s,
            maxHeight: null
          }
        )
      ] })
    ] }) : null,
    a.storage.length > 0 ? /* @__PURE__ */ v(Bt, { title: "Storage Resources", icon: "hdd-fill", children: a.storage }) : null,
    a.other.length > 0 ? /* @__PURE__ */ v(Bt, { title: "Other Resources", icon: "stars", children: a.other }) : null
  ] });
}
/*!
 * Glide.js v3.7.1
 * (c) 2013-2024 Jędrzej Chałubek (https://github.com/jedrzejchalubek/)
 * Released under the MIT License.
 */
function br(i, t) {
  var e = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(i);
    t && (n = n.filter(function(s) {
      return Object.getOwnPropertyDescriptor(i, s).enumerable;
    })), e.push.apply(e, n);
  }
  return e;
}
function vr(i) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2 ? br(Object(e), !0).forEach(function(n) {
      hu(i, n, e[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(e)) : br(Object(e)).forEach(function(n) {
      Object.defineProperty(i, n, Object.getOwnPropertyDescriptor(e, n));
    });
  }
  return i;
}
function en(i) {
  "@babel/helpers - typeof";
  return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? en = function(t) {
    return typeof t;
  } : en = function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, en(i);
}
function On(i, t) {
  if (!(i instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function uu(i, t) {
  for (var e = 0; e < t.length; e++) {
    var n = t[e];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(i, n.key, n);
  }
}
function Dn(i, t, e) {
  return t && uu(i.prototype, t), i;
}
function hu(i, t, e) {
  return t in i ? Object.defineProperty(i, t, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[t] = e, i;
}
function fu(i, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  i.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: i,
      writable: !0,
      configurable: !0
    }
  }), t && rs(i, t);
}
function Fe(i) {
  return Fe = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, Fe(i);
}
function rs(i, t) {
  return rs = Object.setPrototypeOf || function(n, s) {
    return n.__proto__ = s, n;
  }, rs(i, t);
}
function du() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
  if (typeof Proxy == "function") return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function pu(i) {
  if (i === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return i;
}
function gu(i, t) {
  if (t && (typeof t == "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return pu(i);
}
function mu(i) {
  var t = du();
  return function() {
    var n = Fe(i), s;
    if (t) {
      var r = Fe(this).constructor;
      s = Reflect.construct(n, arguments, r);
    } else
      s = n.apply(this, arguments);
    return gu(this, s);
  };
}
function bu(i, t) {
  for (; !Object.prototype.hasOwnProperty.call(i, t) && (i = Fe(i), i !== null); )
    ;
  return i;
}
function nn() {
  return typeof Reflect < "u" && Reflect.get ? nn = Reflect.get : nn = function(t, e, n) {
    var s = bu(t, e);
    if (s) {
      var r = Object.getOwnPropertyDescriptor(s, e);
      return r.get ? r.get.call(arguments.length < 3 ? t : n) : r.value;
    }
  }, nn.apply(this, arguments);
}
var vu = {
  /**
   * Type of the movement.
   *
   * Available types:
   * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
   * `carousel` - Changes slides without starting over when it reaches the first or last slide.
   *
   * @type {String}
   */
  type: "slider",
  /**
   * Start at specific slide number defined with zero-based index.
   *
   * @type {Number}
   */
  startAt: 0,
  /**
   * A number of slides visible on the single viewport.
   *
   * @type {Number}
   */
  perView: 1,
  /**
   * Focus currently active slide at a specified position in the track.
   *
   * Available inputs:
   * `center` - Current slide will be always focused at the center of a track.
   * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
   *
   * @type {String|Number}
   */
  focusAt: 0,
  /**
   * A size of the gap added between slides.
   *
   * @type {Number}
   */
  gap: 10,
  /**
   * Change slides after a specified interval. Use `false` for turning off autoplay.
   *
   * @type {Number|Boolean}
   */
  autoplay: !1,
  /**
   * Stop autoplay on mouseover event.
   *
   * @type {Boolean}
   */
  hoverpause: !0,
  /**
   * Allow for changing slides with left and right keyboard arrows.
   *
   * @type {Boolean}
   */
  keyboard: !0,
  /**
   * Stop running `perView` number of slides from the end. Use this
   * option if you don't want to have an empty space after
   * a slider. Works only with `slider` type and a
   * non-centered `focusAt` setting.
   *
   * @type {Boolean}
   */
  bound: !1,
  /**
   * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
   *
   * @type {Number|Boolean}
   */
  swipeThreshold: 80,
  /**
   * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
   *
   * @type {Number|Boolean}
   */
  dragThreshold: 120,
  /**
   * A number of slides moved on single swipe.
   *
   * Available types:
   * `` - Moves slider by one slide per swipe
   * `|` - Moves slider between views per swipe (number of slides defined in `perView` options)
   *
   * @type {String}
   */
  perSwipe: "",
  /**
   * Moving distance ratio of the slides on a swiping and dragging.
   *
   * @type {Number}
   */
  touchRatio: 0.5,
  /**
   * Angle required to activate slides moving on swiping or dragging.
   *
   * @type {Number}
   */
  touchAngle: 45,
  /**
   * Duration of the animation in milliseconds.
   *
   * @type {Number}
   */
  animationDuration: 400,
  /**
   * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
   *
   * @type {Boolean}
   */
  rewind: !0,
  /**
   * Duration of the rewinding animation of the `slider` type in milliseconds.
   *
   * @type {Number}
   */
  rewindDuration: 800,
  /**
   * Easing function for the animation.
   *
   * @type {String}
   */
  animationTimingFunc: "cubic-bezier(.165, .840, .440, 1)",
  /**
   * Wait for the animation to finish until the next user input can be processed
   *
   * @type {boolean}
   */
  waitForTransition: !0,
  /**
   * Throttle costly events at most once per every wait milliseconds.
   *
   * @type {Number}
   */
  throttle: 10,
  /**
   * Moving direction mode.
   *
   * Available inputs:
   * - 'ltr' - left to right movement,
   * - 'rtl' - right to left movement.
   *
   * @type {String}
   */
  direction: "ltr",
  /**
   * The distance value of the next and previous viewports which
   * have to peek in the current view. Accepts number and
   * pixels as a string. Left and right peeking can be
   * set up separately with a directions object.
   *
   * For example:
   * `100` - Peek 100px on the both sides.
   * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
   *
   * @type {Number|String|Object}
   */
  peek: 0,
  /**
   * Defines how many clones of current viewport will be generated.
   *
   * @type {Number}
   */
  cloningRatio: 1,
  /**
   * Collection of options applied at specified media breakpoints.
   * For example: display two slides per view under 800px.
   * `{
   *   '800px': {
   *     perView: 2
   *   }
   * }`
   */
  breakpoints: {},
  /**
   * Collection of internally used HTML classes.
   *
   * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
   * @type {Object}
   */
  classes: {
    swipeable: "glide--swipeable",
    dragging: "glide--dragging",
    direction: {
      ltr: "glide--ltr",
      rtl: "glide--rtl"
    },
    type: {
      slider: "glide--slider",
      carousel: "glide--carousel"
    },
    slide: {
      clone: "glide__slide--clone",
      active: "glide__slide--active"
    },
    arrow: {
      disabled: "glide__arrow--disabled"
    },
    nav: {
      active: "glide__bullet--active"
    }
  }
};
function Jt(i) {
  console.error("[Glide warn]: ".concat(i));
}
function Dt(i) {
  return parseInt(i);
}
function os(i) {
  return typeof i == "string";
}
function hi(i) {
  var t = en(i);
  return t === "function" || t === "object" && !!i;
}
function fn(i) {
  return typeof i == "function";
}
function yu(i) {
  return typeof i > "u";
}
function as(i) {
  return i.constructor === Array;
}
function xu(i, t, e) {
  var n = {};
  for (var s in t)
    fn(t[s]) ? n[s] = t[s](i, n, e) : Jt("Extension must be a function");
  for (var r in n)
    fn(n[r].mount) && n[r].mount();
  return n;
}
function Q(i, t, e) {
  Object.defineProperty(i, t, e);
}
function yr(i, t) {
  var e = Object.assign({}, i, t);
  if (t.hasOwnProperty("classes")) {
    e.classes = Object.assign({}, i.classes, t.classes);
    var n = ["direction", "type", "slide", "arrow", "nav"];
    n.forEach(function(s) {
      t.classes.hasOwnProperty(s) && (e.classes[s] = vr(vr({}, i.classes[s]), t.classes[s]));
    });
  }
  return t.hasOwnProperty("breakpoints") && (e.breakpoints = Object.assign({}, i.breakpoints, t.breakpoints)), e;
}
var _u = /* @__PURE__ */ function() {
  function i() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    On(this, i), this.events = t, this.hop = t.hasOwnProperty;
  }
  return Dn(i, [{
    key: "on",
    value: function(e, n) {
      if (as(e)) {
        for (var s = 0; s < e.length; s++)
          this.on(e[s], n);
        return;
      }
      this.hop.call(this.events, e) || (this.events[e] = []);
      var r = this.events[e].push(n) - 1;
      return {
        remove: function() {
          delete this.events[e][r];
        }
      };
    }
    /**
     * Runs registered handlers for specified event.
     *
     * @param {String|Array} event
     * @param {Object=} context
     */
  }, {
    key: "emit",
    value: function(e, n) {
      if (as(e)) {
        for (var s = 0; s < e.length; s++)
          this.emit(e[s], n);
        return;
      }
      this.hop.call(this.events, e) && this.events[e].forEach(function(r) {
        r(n || {});
      });
    }
  }]), i;
}(), wu = /* @__PURE__ */ function() {
  function i(t) {
    var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    On(this, i), this._c = {}, this._t = [], this._e = new _u(), this.disabled = !1, this.selector = t, this.settings = yr(vu, e), this.index = this.settings.startAt;
  }
  return Dn(i, [{
    key: "mount",
    value: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return this._e.emit("mount.before"), hi(e) ? this._c = xu(this, e, this._e) : Jt("You need to provide a object on `mount()`"), this._e.emit("mount.after"), this;
    }
    /**
     * Collects an instance `translate` transformers.
     *
     * @param  {Array} transformers Collection of transformers.
     * @return {Void}
     */
  }, {
    key: "mutate",
    value: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      return as(e) ? this._t = e : Jt("You need to provide a array on `mutate()`"), this;
    }
    /**
     * Updates glide with specified settings.
     *
     * @param {Object} settings
     * @return {Glide}
     */
  }, {
    key: "update",
    value: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return this.settings = yr(this.settings, e), e.hasOwnProperty("startAt") && (this.index = e.startAt), this._e.emit("update"), this;
    }
    /**
     * Change slide with specified pattern. A pattern must be in the special format:
     * `>` - Move one forward
     * `<` - Move one backward
     * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
     * `>>` - Rewinds to end (last slide)
     * `<<` - Rewinds to start (first slide)
     * `|>` - Move one viewport forward
     * `|<` - Move one viewport backward
     *
     * @param {String} pattern
     * @return {Glide}
     */
  }, {
    key: "go",
    value: function(e) {
      return this._c.Run.make(e), this;
    }
    /**
     * Move track by specified distance.
     *
     * @param {String} distance
     * @return {Glide}
     */
  }, {
    key: "move",
    value: function(e) {
      return this._c.Transition.disable(), this._c.Move.make(e), this;
    }
    /**
     * Destroy instance and revert all changes done by this._c.
     *
     * @return {Glide}
     */
  }, {
    key: "destroy",
    value: function() {
      return this._e.emit("destroy"), this;
    }
    /**
     * Start instance autoplaying.
     *
     * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Glide}
     */
  }, {
    key: "play",
    value: function() {
      var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
      return e && (this.settings.autoplay = e), this._e.emit("play"), this;
    }
    /**
     * Stop instance autoplaying.
     *
     * @return {Glide}
     */
  }, {
    key: "pause",
    value: function() {
      return this._e.emit("pause"), this;
    }
    /**
     * Sets glide into a idle status.
     *
     * @return {Glide}
     */
  }, {
    key: "disable",
    value: function() {
      return this.disabled = !0, this;
    }
    /**
     * Sets glide into a active status.
     *
     * @return {Glide}
     */
  }, {
    key: "enable",
    value: function() {
      return this.disabled = !1, this;
    }
    /**
     * Adds cuutom event listener with handler.
     *
     * @param  {String|Array} event
     * @param  {Function} handler
     * @return {Glide}
     */
  }, {
    key: "on",
    value: function(e, n) {
      return this._e.on(e, n), this;
    }
    /**
     * Checks if glide is a precised type.
     *
     * @param  {String} name
     * @return {Boolean}
     */
  }, {
    key: "isType",
    value: function(e) {
      return this.settings.type === e;
    }
    /**
     * Gets value of the core options.
     *
     * @return {Object}
     */
  }, {
    key: "settings",
    get: function() {
      return this._o;
    },
    set: function(e) {
      hi(e) ? this._o = e : Jt("Options must be an `object` instance.");
    }
    /**
     * Gets current index of the slider.
     *
     * @return {Object}
     */
  }, {
    key: "index",
    get: function() {
      return this._i;
    },
    set: function(e) {
      this._i = Dt(e);
    }
    /**
     * Gets type name of the slider.
     *
     * @return {String}
     */
  }, {
    key: "type",
    get: function() {
      return this.settings.type;
    }
    /**
     * Gets value of the idle status.
     *
     * @return {Boolean}
     */
  }, {
    key: "disabled",
    get: function() {
      return this._d;
    },
    set: function(e) {
      this._d = !!e;
    }
  }]), i;
}();
function Su(i, t, e) {
  var n = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {Void}
     */
    mount: function() {
      this._o = !1;
    },
    /**
     * Makes glides running based on the passed moving schema.
     *
     * @param {String} move
     */
    make: function(l) {
      var u = this;
      i.disabled || (!i.settings.waitForTransition || i.disable(), this.move = l, e.emit("run.before", this.move), this.calculate(), e.emit("run", this.move), t.Transition.after(function() {
        u.isStart() && e.emit("run.start", u.move), u.isEnd() && e.emit("run.end", u.move), u.isOffset() && (u._o = !1, e.emit("run.offset", u.move)), e.emit("run.after", u.move), i.enable();
      }));
    },
    /**
     * Calculates current index based on defined move.
     *
     * @return {Number|Undefined}
     */
    calculate: function() {
      var l = this.move, u = this.length, h = l.steps, f = l.direction, d = 1;
      if (f === "=") {
        if (i.settings.bound && Dt(h) > u) {
          i.index = u;
          return;
        }
        i.index = h;
        return;
      }
      if (f === ">" && h === ">") {
        i.index = u;
        return;
      }
      if (f === "<" && h === "<") {
        i.index = 0;
        return;
      }
      if (f === "|" && (d = i.settings.perView || 1), f === ">" || f === "|" && h === ">") {
        var p = s(d);
        p > u && (this._o = !0), i.index = r(p, d);
        return;
      }
      if (f === "<" || f === "|" && h === "<") {
        var m = o(d);
        m < 0 && (this._o = !0), i.index = a(m, d);
        return;
      }
      Jt("Invalid direction pattern [".concat(f).concat(h, "] has been used"));
    },
    /**
     * Checks if we are on the first slide.
     *
     * @return {Boolean}
     */
    isStart: function() {
      return i.index <= 0;
    },
    /**
     * Checks if we are on the last slide.
     *
     * @return {Boolean}
     */
    isEnd: function() {
      return i.index >= this.length;
    },
    /**
     * Checks if we are making a offset run.
     *
     * @param {String} direction
     * @return {Boolean}
     */
    isOffset: function() {
      var l = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
      return l ? this._o ? l === "|>" ? this.move.direction === "|" && this.move.steps === ">" : l === "|<" ? this.move.direction === "|" && this.move.steps === "<" : this.move.direction === l : !1 : this._o;
    },
    /**
     * Checks if bound mode is active
     *
     * @return {Boolean}
     */
    isBound: function() {
      return i.isType("slider") && i.settings.focusAt !== "center" && i.settings.bound;
    }
  };
  function s(c) {
    var l = i.index;
    return i.isType("carousel") ? l + c : l + (c - l % c);
  }
  function r(c, l) {
    var u = n.length;
    return c <= u ? c : i.isType("carousel") ? c - (u + 1) : i.settings.rewind ? n.isBound() && !n.isEnd() ? u : 0 : n.isBound() ? u : Math.floor(u / l) * l;
  }
  function o(c) {
    var l = i.index;
    if (i.isType("carousel"))
      return l - c;
    var u = Math.ceil(l / c);
    return (u - 1) * c;
  }
  function a(c, l) {
    var u = n.length;
    return c >= 0 ? c : i.isType("carousel") ? c + (u + 1) : i.settings.rewind ? n.isBound() && n.isStart() ? u : Math.floor(u / l) * l : 0;
  }
  return Q(n, "move", {
    /**
     * Gets value of the move schema.
     *
     * @returns {Object}
     */
    get: function() {
      return this._m;
    },
    /**
     * Sets value of the move schema.
     *
     * @returns {Object}
     */
    set: function(l) {
      var u = l.substr(1);
      this._m = {
        direction: l.substr(0, 1),
        steps: u ? Dt(u) ? Dt(u) : u : 0
      };
    }
  }), Q(n, "length", {
    /**
     * Gets value of the running distance based
     * on zero-indexing number of slides.
     *
     * @return {Number}
     */
    get: function() {
      var l = i.settings, u = t.Html.slides.length;
      return this.isBound() ? u - 1 - (Dt(l.perView) - 1) + Dt(l.focusAt) : u - 1;
    }
  }), Q(n, "offset", {
    /**
     * Gets status of the offsetting flag.
     *
     * @return {Boolean}
     */
    get: function() {
      return this._o;
    }
  }), n;
}
function xr() {
  return (/* @__PURE__ */ new Date()).getTime();
}
function la(i, t) {
  var e = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n, s, r, o, a = 0, c = function() {
    a = e.leading === !1 ? 0 : xr(), n = null, o = i.apply(s, r), n || (s = r = null);
  }, l = function() {
    var h = xr();
    !a && e.leading === !1 && (a = h);
    var f = t - (h - a);
    return s = this, r = arguments, f <= 0 || f > t ? (n && (clearTimeout(n), n = null), a = h, o = i.apply(s, r), n || (s = r = null)) : !n && e.trailing !== !1 && (n = setTimeout(c, f)), o;
  };
  return l.cancel = function() {
    clearTimeout(n), a = 0, n = s = r = null;
  }, l;
}
var Ii = {
  ltr: ["marginLeft", "marginRight"],
  rtl: ["marginRight", "marginLeft"]
};
function ku(i, t, e) {
  var n = {
    /**
     * Applies gaps between slides. First and last
     * slides do not receive it's edge margins.
     *
     * @param {HTMLCollection} slides
     * @return {Void}
     */
    apply: function(r) {
      for (var o = 0, a = r.length; o < a; o++) {
        var c = r[o].style, l = t.Direction.value;
        o !== 0 ? c[Ii[l][0]] = "".concat(this.value / 2, "px") : c[Ii[l][0]] = "", o !== r.length - 1 ? c[Ii[l][1]] = "".concat(this.value / 2, "px") : c[Ii[l][1]] = "";
      }
    },
    /**
     * Removes gaps from the slides.
     *
     * @param {HTMLCollection} slides
     * @returns {Void}
    */
    remove: function(r) {
      for (var o = 0, a = r.length; o < a; o++) {
        var c = r[o].style;
        c.marginLeft = "", c.marginRight = "";
      }
    }
  };
  return Q(n, "value", {
    /**
     * Gets value of the gap.
     *
     * @returns {Number}
     */
    get: function() {
      return Dt(i.settings.gap);
    }
  }), Q(n, "grow", {
    /**
     * Gets additional dimensions value caused by gaps.
     * Used to increase width of the slides wrapper.
     *
     * @returns {Number}
     */
    get: function() {
      return n.value * t.Sizes.length;
    }
  }), Q(n, "reductor", {
    /**
     * Gets reduction value caused by gaps.
     * Used to subtract width of the slides.
     *
     * @returns {Number}
     */
    get: function() {
      var r = i.settings.perView;
      return n.value * (r - 1) / r;
    }
  }), e.on(["build.after", "update"], la(function() {
    n.apply(t.Html.wrapper.children);
  }, 30)), e.on("destroy", function() {
    n.remove(t.Html.wrapper.children);
  }), n;
}
function ua(i) {
  if (i && i.parentNode) {
    for (var t = i.parentNode.firstChild, e = []; t; t = t.nextSibling)
      t.nodeType === 1 && t !== i && e.push(t);
    return e;
  }
  return [];
}
function cs(i) {
  return Array.prototype.slice.call(i);
}
var Au = '[data-glide-el="track"]';
function Mu(i, t, e) {
  var n = {
    /**
     * Setup slider HTML nodes.
     *
     * @param {Glide} glide
     */
    mount: function() {
      this.root = i.selector, this.track = this.root.querySelector(Au), this.collectSlides();
    },
    /**
     * Collect slides
     */
    collectSlides: function() {
      this.slides = cs(this.wrapper.children).filter(function(r) {
        return !r.classList.contains(i.settings.classes.slide.clone);
      });
    }
  };
  return Q(n, "root", {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get: function() {
      return n._r;
    },
    /**
     * Sets node of the glide main element.
     *
     * @return {Object}
     */
    set: function(r) {
      os(r) && (r = document.querySelector(r)), r !== null ? n._r = r : Jt("Root element must be a existing Html node");
    }
  }), Q(n, "track", {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get: function() {
      return n._t;
    },
    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set: function(r) {
      n._t = r;
    }
  }), Q(n, "wrapper", {
    /**
     * Gets node of the slides wrapper.
     *
     * @return {Object}
     */
    get: function() {
      return n.track.children[0];
    }
  }), e.on("update", function() {
    n.collectSlides();
  }), n;
}
function Ou(i, t, e) {
  var n = {
    /**
     * Setups how much to peek based on settings.
     *
     * @return {Void}
     */
    mount: function() {
      this.value = i.settings.peek;
    }
  };
  return Q(n, "value", {
    /**
     * Gets value of the peek.
     *
     * @returns {Number|Object}
     */
    get: function() {
      return n._v;
    },
    /**
     * Sets value of the peek.
     *
     * @param {Number|Object} value
     * @return {Void}
     */
    set: function(r) {
      hi(r) ? (r.before = Dt(r.before), r.after = Dt(r.after)) : r = Dt(r), n._v = r;
    }
  }), Q(n, "reductor", {
    /**
     * Gets reduction value caused by peek.
     *
     * @returns {Number}
     */
    get: function() {
      var r = n.value, o = i.settings.perView;
      return hi(r) ? r.before / o + r.after / o : r * 2 / o;
    }
  }), e.on(["resize", "update"], function() {
    n.mount();
  }), n;
}
function Du(i, t, e) {
  var n = {
    /**
     * Constructs move component.
     *
     * @returns {Void}
     */
    mount: function() {
      this._o = 0;
    },
    /**
     * Calculates a movement value based on passed offset and currently active index.
     *
     * @param  {Number} offset
     * @return {Void}
     */
    make: function() {
      var r = this, o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      this.offset = o, e.emit("move", {
        movement: this.value
      }), t.Transition.after(function() {
        e.emit("move.after", {
          movement: r.value
        });
      });
    }
  };
  return Q(n, "offset", {
    /**
     * Gets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    get: function() {
      return n._o;
    },
    /**
     * Sets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    set: function(r) {
      n._o = yu(r) ? 0 : Dt(r);
    }
  }), Q(n, "translate", {
    /**
     * Gets a raw movement value.
     *
     * @return {Number}
     */
    get: function() {
      return t.Sizes.slideWidth * i.index;
    }
  }), Q(n, "value", {
    /**
     * Gets an actual movement value corrected by offset.
     *
     * @return {Number}
     */
    get: function() {
      var r = this.offset, o = this.translate;
      return t.Direction.is("rtl") ? o + r : o - r;
    }
  }), e.on(["build.before", "run"], function() {
    n.make();
  }), n;
}
function Cu(i, t, e) {
  var n = {
    /**
     * Setups dimensions of slides.
     *
     * @return {Void}
     */
    setupSlides: function() {
      for (var r = "".concat(this.slideWidth, "px"), o = t.Html.slides, a = 0; a < o.length; a++)
        o[a].style.width = r;
    },
    /**
     * Setups dimensions of slides wrapper.
     *
     * @return {Void}
     */
    setupWrapper: function() {
      t.Html.wrapper.style.width = "".concat(this.wrapperSize, "px");
    },
    /**
     * Removes applied styles from HTML elements.
     *
     * @returns {Void}
     */
    remove: function() {
      for (var r = t.Html.slides, o = 0; o < r.length; o++)
        r[o].style.width = "";
      t.Html.wrapper.style.width = "";
    }
  };
  return Q(n, "length", {
    /**
     * Gets count number of the slides.
     *
     * @return {Number}
     */
    get: function() {
      return t.Html.slides.length;
    }
  }), Q(n, "width", {
    /**
     * Gets width value of the slider (visible area).
     *
     * @return {Number}
     */
    get: function() {
      return t.Html.track.offsetWidth;
    }
  }), Q(n, "wrapperSize", {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get: function() {
      return n.slideWidth * n.length + t.Gaps.grow + t.Clones.grow;
    }
  }), Q(n, "slideWidth", {
    /**
     * Gets width value of a single slide.
     *
     * @return {Number}
     */
    get: function() {
      return n.width / i.settings.perView - t.Peek.reductor - t.Gaps.reductor;
    }
  }), e.on(["build.before", "resize", "update"], function() {
    n.setupSlides(), n.setupWrapper();
  }), e.on("destroy", function() {
    n.remove();
  }), n;
}
function Tu(i, t, e) {
  var n = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     *
     * @return {Void}
     */
    mount: function() {
      e.emit("build.before"), this.typeClass(), this.activeClass(), e.emit("build.after");
    },
    /**
     * Adds `type` class to the glide element.
     *
     * @return {Void}
     */
    typeClass: function() {
      t.Html.root.classList.add(i.settings.classes.type[i.settings.type]);
    },
    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass: function() {
      var r = i.settings.classes, o = t.Html.slides[i.index];
      o && (o.classList.add(r.slide.active), ua(o).forEach(function(a) {
        a.classList.remove(r.slide.active);
      }));
    },
    /**
     * Removes HTML classes applied at building.
     *
     * @return {Void}
     */
    removeClasses: function() {
      var r = i.settings.classes, o = r.type, a = r.slide;
      t.Html.root.classList.remove(o[i.settings.type]), t.Html.slides.forEach(function(c) {
        c.classList.remove(a.active);
      });
    }
  };
  return e.on(["destroy", "update"], function() {
    n.removeClasses();
  }), e.on(["resize", "update"], function() {
    n.mount();
  }), e.on("move.after", function() {
    n.activeClass();
  }), n;
}
function Eu(i, t, e) {
  var n = {
    /**
     * Create pattern map and collect slides to be cloned.
     */
    mount: function() {
      this.items = [], i.isType("carousel") && (this.items = this.collect());
    },
    /**
     * Collect clones with pattern.
     *
     * @return {[]}
     */
    collect: function() {
      var r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], o = t.Html.slides, a = i.settings, c = a.perView, l = a.classes, u = a.cloningRatio;
      if (o.length > 0)
        for (var h = +!!i.settings.peek, f = c + h + Math.round(c / 2), d = o.slice(0, f).reverse(), p = o.slice(f * -1), m = 0; m < Math.max(u, Math.floor(c / o.length)); m++) {
          for (var b = 0; b < d.length; b++) {
            var y = d[b].cloneNode(!0);
            y.classList.add(l.slide.clone), r.push(y);
          }
          for (var x = 0; x < p.length; x++) {
            var S = p[x].cloneNode(!0);
            S.classList.add(l.slide.clone), r.unshift(S);
          }
        }
      return r;
    },
    /**
     * Append cloned slides with generated pattern.
     *
     * @return {Void}
     */
    append: function() {
      for (var r = this.items, o = t.Html, a = o.wrapper, c = o.slides, l = Math.floor(r.length / 2), u = r.slice(0, l).reverse(), h = r.slice(l * -1).reverse(), f = "".concat(t.Sizes.slideWidth, "px"), d = 0; d < h.length; d++)
        a.appendChild(h[d]);
      for (var p = 0; p < u.length; p++)
        a.insertBefore(u[p], c[0]);
      for (var m = 0; m < r.length; m++)
        r[m].style.width = f;
    },
    /**
     * Remove all cloned slides.
     *
     * @return {Void}
     */
    remove: function() {
      for (var r = this.items, o = 0; o < r.length; o++)
        t.Html.wrapper.removeChild(r[o]);
    }
  };
  return Q(n, "grow", {
    /**
     * Gets additional dimensions value caused by clones.
     *
     * @return {Number}
     */
    get: function() {
      return (t.Sizes.slideWidth + t.Gaps.value) * n.items.length;
    }
  }), e.on("update", function() {
    n.remove(), n.mount(), n.append();
  }), e.on("build.before", function() {
    i.isType("carousel") && n.append();
  }), e.on("destroy", function() {
    n.remove();
  }), n;
}
var ha = /* @__PURE__ */ function() {
  function i() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    On(this, i), this.listeners = t;
  }
  return Dn(i, [{
    key: "on",
    value: function(e, n, s) {
      var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
      os(e) && (e = [e]);
      for (var o = 0; o < e.length; o++)
        this.listeners[e[o]] = s, n.addEventListener(e[o], this.listeners[e[o]], r);
    }
    /**
     * Removes event listeners from arrows HTML elements.
     *
     * @param  {String|Array} events
     * @param  {Element|Window|Document} el
     * @param  {Boolean|Object} capture
     * @return {Void}
     */
  }, {
    key: "off",
    value: function(e, n) {
      var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
      os(e) && (e = [e]);
      for (var r = 0; r < e.length; r++)
        n.removeEventListener(e[r], this.listeners[e[r]], s);
    }
    /**
     * Destroy collected listeners.
     *
     * @returns {Void}
     */
  }, {
    key: "destroy",
    value: function() {
      delete this.listeners;
    }
  }]), i;
}();
function Pu(i, t, e) {
  var n = new ha(), s = {
    /**
     * Initializes window bindings.
     */
    mount: function() {
      this.bind();
    },
    /**
     * Binds `rezsize` listener to the window.
     * It's a costly event, so we are debouncing it.
     *
     * @return {Void}
     */
    bind: function() {
      n.on("resize", window, la(function() {
        e.emit("resize");
      }, i.settings.throttle));
    },
    /**
     * Unbinds listeners from the window.
     *
     * @return {Void}
     */
    unbind: function() {
      n.off("resize", window);
    }
  };
  return e.on("destroy", function() {
    s.unbind(), n.destroy();
  }), s;
}
var Ru = ["ltr", "rtl"], Lu = {
  ">": "<",
  "<": ">",
  "=": "="
};
function Fu(i, t, e) {
  var n = {
    /**
     * Setups gap value based on settings.
     *
     * @return {Void}
     */
    mount: function() {
      this.value = i.settings.direction;
    },
    /**
     * Resolves pattern based on direction value
     *
     * @param {String} pattern
     * @returns {String}
     */
    resolve: function(r) {
      var o = r.slice(0, 1);
      return this.is("rtl") ? r.split(o).join(Lu[o]) : r;
    },
    /**
     * Checks value of direction mode.
     *
     * @param {String} direction
     * @returns {Boolean}
     */
    is: function(r) {
      return this.value === r;
    },
    /**
     * Applies direction class to the root HTML element.
     *
     * @return {Void}
     */
    addClass: function() {
      t.Html.root.classList.add(i.settings.classes.direction[this.value]);
    },
    /**
     * Removes direction class from the root HTML element.
     *
     * @return {Void}
     */
    removeClass: function() {
      t.Html.root.classList.remove(i.settings.classes.direction[this.value]);
    }
  };
  return Q(n, "value", {
    /**
     * Gets value of the direction.
     *
     * @returns {Number}
     */
    get: function() {
      return n._v;
    },
    /**
     * Sets value of the direction.
     *
     * @param {String} value
     * @return {Void}
     */
    set: function(r) {
      Ru.indexOf(r) > -1 ? n._v = r : Jt("Direction value must be `ltr` or `rtl`");
    }
  }), e.on(["destroy", "update"], function() {
    n.removeClass();
  }), e.on("update", function() {
    n.mount();
  }), e.on(["build.before", "update"], function() {
    n.addClass();
  }), n;
}
function Iu(i, t) {
  return {
    /**
     * Negates the passed translate if glide is in RTL option.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function(n) {
      return t.Direction.is("rtl") ? -n : n;
    }
  };
}
function Bu(i, t) {
  return {
    /**
     * Modifies passed translate value with number in the `gap` settings.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function(n) {
      var s = Math.floor(n / t.Sizes.slideWidth);
      return n + t.Gaps.value * s;
    }
  };
}
function zu(i, t) {
  return {
    /**
     * Adds to the passed translate width of the half of clones.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function(n) {
      return n + t.Clones.grow / 2;
    }
  };
}
function Hu(i, t) {
  return {
    /**
     * Modifies passed translate value with a `peek` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function(n) {
      if (i.settings.focusAt >= 0) {
        var s = t.Peek.value;
        return hi(s) ? n - s.before : n - s;
      }
      return n;
    }
  };
}
function ju(i, t) {
  return {
    /**
     * Modifies passed translate value with index in the `focusAt` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function(n) {
      var s = t.Gaps.value, r = t.Sizes.width, o = i.settings.focusAt, a = t.Sizes.slideWidth;
      return o === "center" ? n - (r / 2 - a / 2) : n - a * o - s * o;
    }
  };
}
function Wu(i, t, e) {
  var n = [Bu, zu, Hu, ju].concat(i._t, [Iu]);
  return {
    /**
     * Piplines translate value with registered transformers.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    mutate: function(r) {
      for (var o = 0; o < n.length; o++) {
        var a = n[o];
        fn(a) && fn(a().modify) ? r = a(i, t, e).modify(r) : Jt("Transformer should be a function that returns an object with `modify()` method");
      }
      return r;
    }
  };
}
function Nu(i, t, e) {
  var n = {
    /**
     * Sets value of translate on HTML element.
     *
     * @param {Number} value
     * @return {Void}
     */
    set: function(r) {
      var o = Wu(i, t).mutate(r), a = "translate3d(".concat(-1 * o, "px, 0px, 0px)");
      t.Html.wrapper.style.mozTransform = a, t.Html.wrapper.style.webkitTransform = a, t.Html.wrapper.style.transform = a;
    },
    /**
     * Removes value of translate from HTML element.
     *
     * @return {Void}
     */
    remove: function() {
      t.Html.wrapper.style.transform = "";
    },
    /**
     * @return {number}
     */
    getStartIndex: function() {
      var r = t.Sizes.length, o = i.index, a = i.settings.perView;
      return t.Run.isOffset(">") || t.Run.isOffset("|>") ? r + (o - a) : (o + a) % r;
    },
    /**
     * @return {number}
     */
    getTravelDistance: function() {
      var r = t.Sizes.slideWidth * i.settings.perView;
      return t.Run.isOffset(">") || t.Run.isOffset("|>") ? r * -1 : r;
    }
  };
  return e.on("move", function(s) {
    if (!i.isType("carousel") || !t.Run.isOffset())
      return n.set(s.movement);
    t.Transition.after(function() {
      e.emit("translate.jump"), n.set(t.Sizes.slideWidth * i.index);
    });
    var r = t.Sizes.slideWidth * t.Translate.getStartIndex();
    return n.set(r - t.Translate.getTravelDistance());
  }), e.on("destroy", function() {
    n.remove();
  }), n;
}
function $u(i, t, e) {
  var n = !1, s = {
    /**
     * Composes string of the CSS transition.
     *
     * @param {String} property
     * @return {String}
     */
    compose: function(o) {
      var a = i.settings;
      return n ? "".concat(o, " 0ms ").concat(a.animationTimingFunc) : "".concat(o, " ").concat(this.duration, "ms ").concat(a.animationTimingFunc);
    },
    /**
     * Sets value of transition on HTML element.
     *
     * @param {String=} property
     * @return {Void}
     */
    set: function() {
      var o = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "transform";
      t.Html.wrapper.style.transition = this.compose(o);
    },
    /**
     * Removes value of transition from HTML element.
     *
     * @return {Void}
     */
    remove: function() {
      t.Html.wrapper.style.transition = "";
    },
    /**
     * Runs callback after animation.
     *
     * @param  {Function} callback
     * @return {Void}
     */
    after: function(o) {
      setTimeout(function() {
        o();
      }, this.duration);
    },
    /**
     * Enable transition.
     *
     * @return {Void}
     */
    enable: function() {
      n = !1, this.set();
    },
    /**
     * Disable transition.
     *
     * @return {Void}
     */
    disable: function() {
      n = !0, this.set();
    }
  };
  return Q(s, "duration", {
    /**
     * Gets duration of the transition based
     * on currently running animation type.
     *
     * @return {Number}
     */
    get: function() {
      var o = i.settings;
      return i.isType("slider") && t.Run.offset ? o.rewindDuration : o.animationDuration;
    }
  }), e.on("move", function() {
    s.set();
  }), e.on(["build.before", "resize", "translate.jump"], function() {
    s.disable();
  }), e.on("run", function() {
    s.enable();
  }), e.on("destroy", function() {
    s.remove();
  }), s;
}
var fa = !1;
try {
  var _r = Object.defineProperty({}, "passive", {
    get: function() {
      fa = !0;
    }
  });
  window.addEventListener("testPassive", null, _r), window.removeEventListener("testPassive", null, _r);
} catch {
}
var wr = fa, Vu = '[data-glide-el="controls[nav]"]', Rs = '[data-glide-el^="controls"]', Uu = "".concat(Rs, ' [data-glide-dir*="<"]'), Yu = "".concat(Rs, ' [data-glide-dir*=">"]');
function Xu(i, t, e) {
  var n = new ha(), s = wr ? {
    passive: !0
  } : !1, r = {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    mount: function() {
      this._n = t.Html.root.querySelectorAll(Vu), this._c = t.Html.root.querySelectorAll(Rs), this._arrowControls = {
        previous: t.Html.root.querySelectorAll(Uu),
        next: t.Html.root.querySelectorAll(Yu)
      }, this.addBindings();
    },
    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    setActive: function() {
      for (var a = 0; a < this._n.length; a++)
        this.addClass(this._n[a].children);
    },
    /**
     * Removes active class to current slide.
     *
     * @return {Void}
     */
    removeActive: function() {
      for (var a = 0; a < this._n.length; a++)
        this.removeClass(this._n[a].children);
    },
    /**
     * Toggles active class on items inside navigation.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    addClass: function(a) {
      var c = i.settings, l = a[i.index];
      l && (l.classList.add(c.classes.nav.active), ua(l).forEach(function(u) {
        u.classList.remove(c.classes.nav.active);
      }));
    },
    /**
     * Removes active class from active control.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    removeClass: function(a) {
      var c = a[i.index];
      c == null || c.classList.remove(i.settings.classes.nav.active);
    },
    /**
     * Calculates, removes or adds `Glide.settings.classes.disabledArrow` class on the control arrows
     */
    setArrowState: function() {
      if (!i.settings.rewind) {
        var a = r._arrowControls.next, c = r._arrowControls.previous;
        this.resetArrowState(a, c), i.index === 0 && this.disableArrow(c), i.index === t.Run.length && this.disableArrow(a);
      }
    },
    /**
     * Removes `Glide.settings.classes.disabledArrow` from given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    resetArrowState: function() {
      for (var a = i.settings, c = arguments.length, l = new Array(c), u = 0; u < c; u++)
        l[u] = arguments[u];
      l.forEach(function(h) {
        cs(h).forEach(function(f) {
          f.classList.remove(a.classes.arrow.disabled);
        });
      });
    },
    /**
     * Adds `Glide.settings.classes.disabledArrow` to given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    disableArrow: function() {
      for (var a = i.settings, c = arguments.length, l = new Array(c), u = 0; u < c; u++)
        l[u] = arguments[u];
      l.forEach(function(h) {
        cs(h).forEach(function(f) {
          f.classList.add(a.classes.arrow.disabled);
        });
      });
    },
    /**
     * Adds handles to the each group of controls.
     *
     * @return {Void}
     */
    addBindings: function() {
      for (var a = 0; a < this._c.length; a++)
        this.bind(this._c[a].children);
    },
    /**
     * Removes handles from the each group of controls.
     *
     * @return {Void}
     */
    removeBindings: function() {
      for (var a = 0; a < this._c.length; a++)
        this.unbind(this._c[a].children);
    },
    /**
     * Binds events to arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    bind: function(a) {
      for (var c = 0; c < a.length; c++)
        n.on("click", a[c], this.click), n.on("touchstart", a[c], this.click, s);
    },
    /**
     * Unbinds events binded to the arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    unbind: function(a) {
      for (var c = 0; c < a.length; c++)
        n.off(["click", "touchstart"], a[c]);
    },
    /**
     * Handles `click` event on the arrows HTML elements.
     * Moves slider in direction given via the
     * `data-glide-dir` attribute.
     *
     * @param {Object} event
     * @return {void}
     */
    click: function(a) {
      !wr && a.type === "touchstart" && a.preventDefault();
      var c = a.currentTarget.getAttribute("data-glide-dir");
      t.Run.make(t.Direction.resolve(c));
    }
  };
  return Q(r, "items", {
    /**
     * Gets collection of the controls HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function() {
      return r._c;
    }
  }), e.on(["mount.after", "move.after"], function() {
    r.setActive();
  }), e.on(["mount.after", "run"], function() {
    r.setArrowState();
  }), e.on("destroy", function() {
    r.removeBindings(), r.removeActive(), n.destroy();
  }), r;
}
var Ku = {
  Html: Mu,
  Translate: Nu,
  Transition: $u,
  Direction: Fu,
  Peek: Ou,
  Sizes: Cu,
  Gaps: ku,
  Move: Du,
  Clones: Eu,
  Resize: Pu,
  Build: Tu,
  Run: Su
}, qu = /* @__PURE__ */ function(i) {
  fu(e, i);
  var t = mu(e);
  function e() {
    return On(this, e), t.apply(this, arguments);
  }
  return Dn(e, [{
    key: "mount",
    value: function() {
      var s = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return nn(Fe(e.prototype), "mount", this).call(this, Object.assign({}, Ku, s));
    }
  }]), e;
}(wu);
function dn({ children: i, cssClass: t = "" }) {
  const e = ie(null);
  return Vo(() => {
    e.current && new qu(e.current).mount({ Controls: Xu });
  }, []), /* @__PURE__ */ v("section", { class: `carousel ${t}`, children: /* @__PURE__ */ v("div", { class: "glide", ref: e, children: [
    /* @__PURE__ */ v("div", { class: "glide__track", "data-glide-el": "track", children: /* @__PURE__ */ v("ul", { class: "glide__slides", children: i }) }),
    /* @__PURE__ */ v("div", { class: "glide__arrows", "data-glide-el": "controls", children: [
      /* @__PURE__ */ v("button", { class: "glide__arrow glide__arrow--left", "data-glide-dir": "<", children: /* @__PURE__ */ v(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ v("path", { d: "M0 12l10.975 11 2.848-2.828-6.176-6.176H24v-3.992H7.646l6.176-6.176L10.975 1 0 12z" })
        }
      ) }),
      /* @__PURE__ */ v("button", { class: "glide__arrow glide__arrow--right", "data-glide-dir": ">", children: /* @__PURE__ */ v(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ v("path", { d: "M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" })
        }
      ) })
    ] })
  ] }) });
}
function da({ children: i }) {
  return /* @__PURE__ */ v("li", { class: "glide__slide", children: i });
}
function Qu({
  title: i,
  description: t,
  linkText: e,
  linkURI: n,
  imageURI: s,
  imageAltText: r
}) {
  return /* @__PURE__ */ v(da, { children: /* @__PURE__ */ v("span", { class: "slide-inner", children: [
    s && /* @__PURE__ */ v("a", { href: n, class: "slide-image", children: /* @__PURE__ */ v("img", { src: s, alt: r }) }),
    /* @__PURE__ */ v("span", { class: "slide-text", children: [
      i && /* @__PURE__ */ v("h2", { children: i }),
      t && /* @__PURE__ */ v("p", { children: t }),
      e && /* @__PURE__ */ v("a", { href: n, children: e })
    ] })
  ] }) });
}
dn.Slide = da;
dn.ImageSlide = Qu;
function Zu({ children: i, maxHeight: t = "400px" }) {
  return /* @__PURE__ */ v("div", { class: "scroll-text", children: /* @__PURE__ */ v("div", { class: "scroll-text-inner", style: { maxHeight: t }, children: i }) });
}
const Gu = "https://allocations.access-ci.org/current-projects.json";
function Bi({ icon: i, text: t, title: e }) {
  if (t)
    return /* @__PURE__ */ v("abbr", { class: "project-meta", title: e, children: [
      /* @__PURE__ */ v(Y, { name: i }),
      t
    ] });
}
function Ju({ infoGroupId: i }) {
  const t = vi(i), e = mt(
    t ? `${Gu}?${t.infoResourceIds.map((s) => `info_resourceids[]=${s}`).join("&")}` : null
  );
  if (!e || !e.projects || !e.projects.length) return null;
  const n = [
    { key: "resourceName", name: "Resource" },
    {
      key: "allocation",
      name: "Current Allocation",
      format: (s, r) => r.units == "[Yes = 1, No = 0]" ? s == 1 ? "Yes" : "No" : `${s.toLocaleString("en-us")} ${r.units || ""}`
    }
  ];
  return /* @__PURE__ */ v(Bt, { title: "Recent Projects", icon: "pc-display", children: /* @__PURE__ */ v(dn, { cssClass: "carousel-projects", children: e.projects.map((s) => /* @__PURE__ */ v(dn.Slide, { children: [
    /* @__PURE__ */ v("h3", { children: s.requestTitle }),
    /* @__PURE__ */ v("div", { class: "project-metadata", children: [
      /* @__PURE__ */ v(
        Bi,
        {
          icon: "cash-coin",
          text: s.allocationType,
          title: "Allocation Type"
        }
      ),
      /* @__PURE__ */ v(
        Bi,
        {
          icon: "person-fill",
          text: `${s.pi} (${s.piInstitution})`,
          title: "Primary Investigator"
        }
      ),
      /* @__PURE__ */ v(
        Bi,
        {
          icon: "folder",
          text: s.fos,
          title: "Field of Science"
        }
      ),
      /* @__PURE__ */ v(
        Bi,
        {
          icon: "calendar-range",
          text: [s.beginDate, s.endDate].map(
            (r) => new Date(r).toLocaleString("en-US", {
              dateStyle: "medium"
            })
          ).join(" to "),
          title: "Project Dates"
        }
      )
    ] }),
    /* @__PURE__ */ v(Zu, { children: [
      /* @__PURE__ */ v("p", { children: s.abstract }),
      /* @__PURE__ */ v(
        kn,
        {
          columns: n,
          rows: s.resources,
          maxHeight: null
        }
      )
    ] })
  ] })) }) });
}
/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function wi(i) {
  return i + 0.5 | 0;
}
const Zt = (i, t, e) => Math.max(Math.min(i, e), t);
function Je(i) {
  return Zt(wi(i * 2.55), 0, 255);
}
function te(i) {
  return Zt(wi(i * 255), 0, 255);
}
function Ut(i) {
  return Zt(wi(i / 2.55) / 100, 0, 1);
}
function Sr(i) {
  return Zt(wi(i * 100), 0, 100);
}
const xt = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, ls = [..."0123456789ABCDEF"], th = (i) => ls[i & 15], eh = (i) => ls[(i & 240) >> 4] + ls[i & 15], zi = (i) => (i & 240) >> 4 === (i & 15), ih = (i) => zi(i.r) && zi(i.g) && zi(i.b) && zi(i.a);
function nh(i) {
  var t = i.length, e;
  return i[0] === "#" && (t === 4 || t === 5 ? e = {
    r: 255 & xt[i[1]] * 17,
    g: 255 & xt[i[2]] * 17,
    b: 255 & xt[i[3]] * 17,
    a: t === 5 ? xt[i[4]] * 17 : 255
  } : (t === 7 || t === 9) && (e = {
    r: xt[i[1]] << 4 | xt[i[2]],
    g: xt[i[3]] << 4 | xt[i[4]],
    b: xt[i[5]] << 4 | xt[i[6]],
    a: t === 9 ? xt[i[7]] << 4 | xt[i[8]] : 255
  })), e;
}
const sh = (i, t) => i < 255 ? t(i) : "";
function rh(i) {
  var t = ih(i) ? th : eh;
  return i ? "#" + t(i.r) + t(i.g) + t(i.b) + sh(i.a, t) : void 0;
}
const oh = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function pa(i, t, e) {
  const n = t * Math.min(e, 1 - e), s = (r, o = (r + i / 30) % 12) => e - n * Math.max(Math.min(o - 3, 9 - o, 1), -1);
  return [s(0), s(8), s(4)];
}
function ah(i, t, e) {
  const n = (s, r = (s + i / 60) % 6) => e - e * t * Math.max(Math.min(r, 4 - r, 1), 0);
  return [n(5), n(3), n(1)];
}
function ch(i, t, e) {
  const n = pa(i, 1, 0.5);
  let s;
  for (t + e > 1 && (s = 1 / (t + e), t *= s, e *= s), s = 0; s < 3; s++)
    n[s] *= 1 - t - e, n[s] += t;
  return n;
}
function lh(i, t, e, n, s) {
  return i === s ? (t - e) / n + (t < e ? 6 : 0) : t === s ? (e - i) / n + 2 : (i - t) / n + 4;
}
function Ls(i) {
  const e = i.r / 255, n = i.g / 255, s = i.b / 255, r = Math.max(e, n, s), o = Math.min(e, n, s), a = (r + o) / 2;
  let c, l, u;
  return r !== o && (u = r - o, l = a > 0.5 ? u / (2 - r - o) : u / (r + o), c = lh(e, n, s, u, r), c = c * 60 + 0.5), [c | 0, l || 0, a];
}
function Fs(i, t, e, n) {
  return (Array.isArray(t) ? i(t[0], t[1], t[2]) : i(t, e, n)).map(te);
}
function Is(i, t, e) {
  return Fs(pa, i, t, e);
}
function uh(i, t, e) {
  return Fs(ch, i, t, e);
}
function hh(i, t, e) {
  return Fs(ah, i, t, e);
}
function ga(i) {
  return (i % 360 + 360) % 360;
}
function fh(i) {
  const t = oh.exec(i);
  let e = 255, n;
  if (!t)
    return;
  t[5] !== n && (e = t[6] ? Je(+t[5]) : te(+t[5]));
  const s = ga(+t[2]), r = +t[3] / 100, o = +t[4] / 100;
  return t[1] === "hwb" ? n = uh(s, r, o) : t[1] === "hsv" ? n = hh(s, r, o) : n = Is(s, r, o), {
    r: n[0],
    g: n[1],
    b: n[2],
    a: e
  };
}
function dh(i, t) {
  var e = Ls(i);
  e[0] = ga(e[0] + t), e = Is(e), i.r = e[0], i.g = e[1], i.b = e[2];
}
function ph(i) {
  if (!i)
    return;
  const t = Ls(i), e = t[0], n = Sr(t[1]), s = Sr(t[2]);
  return i.a < 255 ? `hsla(${e}, ${n}%, ${s}%, ${Ut(i.a)})` : `hsl(${e}, ${n}%, ${s}%)`;
}
const kr = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
}, Ar = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function gh() {
  const i = {}, t = Object.keys(Ar), e = Object.keys(kr);
  let n, s, r, o, a;
  for (n = 0; n < t.length; n++) {
    for (o = a = t[n], s = 0; s < e.length; s++)
      r = e[s], a = a.replace(r, kr[r]);
    r = parseInt(Ar[o], 16), i[a] = [r >> 16 & 255, r >> 8 & 255, r & 255];
  }
  return i;
}
let Hi;
function mh(i) {
  Hi || (Hi = gh(), Hi.transparent = [0, 0, 0, 0]);
  const t = Hi[i.toLowerCase()];
  return t && {
    r: t[0],
    g: t[1],
    b: t[2],
    a: t.length === 4 ? t[3] : 255
  };
}
const bh = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function vh(i) {
  const t = bh.exec(i);
  let e = 255, n, s, r;
  if (t) {
    if (t[7] !== n) {
      const o = +t[7];
      e = t[8] ? Je(o) : Zt(o * 255, 0, 255);
    }
    return n = +t[1], s = +t[3], r = +t[5], n = 255 & (t[2] ? Je(n) : Zt(n, 0, 255)), s = 255 & (t[4] ? Je(s) : Zt(s, 0, 255)), r = 255 & (t[6] ? Je(r) : Zt(r, 0, 255)), {
      r: n,
      g: s,
      b: r,
      a: e
    };
  }
}
function yh(i) {
  return i && (i.a < 255 ? `rgba(${i.r}, ${i.g}, ${i.b}, ${Ut(i.a)})` : `rgb(${i.r}, ${i.g}, ${i.b})`);
}
const Hn = (i) => i <= 31308e-7 ? i * 12.92 : Math.pow(i, 1 / 2.4) * 1.055 - 0.055, Me = (i) => i <= 0.04045 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
function xh(i, t, e) {
  const n = Me(Ut(i.r)), s = Me(Ut(i.g)), r = Me(Ut(i.b));
  return {
    r: te(Hn(n + e * (Me(Ut(t.r)) - n))),
    g: te(Hn(s + e * (Me(Ut(t.g)) - s))),
    b: te(Hn(r + e * (Me(Ut(t.b)) - r))),
    a: i.a + e * (t.a - i.a)
  };
}
function ji(i, t, e) {
  if (i) {
    let n = Ls(i);
    n[t] = Math.max(0, Math.min(n[t] + n[t] * e, t === 0 ? 360 : 1)), n = Is(n), i.r = n[0], i.g = n[1], i.b = n[2];
  }
}
function ma(i, t) {
  return i && Object.assign(t || {}, i);
}
function Mr(i) {
  var t = { r: 0, g: 0, b: 0, a: 255 };
  return Array.isArray(i) ? i.length >= 3 && (t = { r: i[0], g: i[1], b: i[2], a: 255 }, i.length > 3 && (t.a = te(i[3]))) : (t = ma(i, { r: 0, g: 0, b: 0, a: 1 }), t.a = te(t.a)), t;
}
function _h(i) {
  return i.charAt(0) === "r" ? vh(i) : fh(i);
}
class fi {
  constructor(t) {
    if (t instanceof fi)
      return t;
    const e = typeof t;
    let n;
    e === "object" ? n = Mr(t) : e === "string" && (n = nh(t) || mh(t) || _h(t)), this._rgb = n, this._valid = !!n;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var t = ma(this._rgb);
    return t && (t.a = Ut(t.a)), t;
  }
  set rgb(t) {
    this._rgb = Mr(t);
  }
  rgbString() {
    return this._valid ? yh(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? rh(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? ph(this._rgb) : void 0;
  }
  mix(t, e) {
    if (t) {
      const n = this.rgb, s = t.rgb;
      let r;
      const o = e === r ? 0.5 : e, a = 2 * o - 1, c = n.a - s.a, l = ((a * c === -1 ? a : (a + c) / (1 + a * c)) + 1) / 2;
      r = 1 - l, n.r = 255 & l * n.r + r * s.r + 0.5, n.g = 255 & l * n.g + r * s.g + 0.5, n.b = 255 & l * n.b + r * s.b + 0.5, n.a = o * n.a + (1 - o) * s.a, this.rgb = n;
    }
    return this;
  }
  interpolate(t, e) {
    return t && (this._rgb = xh(this._rgb, t._rgb, e)), this;
  }
  clone() {
    return new fi(this.rgb);
  }
  alpha(t) {
    return this._rgb.a = te(t), this;
  }
  clearer(t) {
    const e = this._rgb;
    return e.a *= 1 - t, this;
  }
  greyscale() {
    const t = this._rgb, e = wi(t.r * 0.3 + t.g * 0.59 + t.b * 0.11);
    return t.r = t.g = t.b = e, this;
  }
  opaquer(t) {
    const e = this._rgb;
    return e.a *= 1 + t, this;
  }
  negate() {
    const t = this._rgb;
    return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this;
  }
  lighten(t) {
    return ji(this._rgb, 2, t), this;
  }
  darken(t) {
    return ji(this._rgb, 2, -t), this;
  }
  saturate(t) {
    return ji(this._rgb, 1, t), this;
  }
  desaturate(t) {
    return ji(this._rgb, 1, -t), this;
  }
  rotate(t) {
    return dh(this._rgb, t), this;
  }
}
/*!
 * Chart.js v4.5.0
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function Nt() {
}
const wh = /* @__PURE__ */ (() => {
  let i = 0;
  return () => i++;
})();
function U(i) {
  return i == null;
}
function Z(i) {
  if (Array.isArray && Array.isArray(i))
    return !0;
  const t = Object.prototype.toString.call(i);
  return t.slice(0, 7) === "[object" && t.slice(-6) === "Array]";
}
function j(i) {
  return i !== null && Object.prototype.toString.call(i) === "[object Object]";
}
function Mt(i) {
  return (typeof i == "number" || i instanceof Number) && isFinite(+i);
}
function Et(i, t) {
  return Mt(i) ? i : t;
}
function W(i, t) {
  return typeof i > "u" ? t : i;
}
const Sh = (i, t) => typeof i == "string" && i.endsWith("%") ? parseFloat(i) / 100 : +i / t, ba = (i, t) => typeof i == "string" && i.endsWith("%") ? parseFloat(i) / 100 * t : +i;
function X(i, t, e) {
  if (i && typeof i.call == "function")
    return i.apply(e, t);
}
function V(i, t, e, n) {
  let s, r, o;
  if (Z(i))
    for (r = i.length, s = 0; s < r; s++)
      t.call(e, i[s], s);
  else if (j(i))
    for (o = Object.keys(i), r = o.length, s = 0; s < r; s++)
      t.call(e, i[o[s]], o[s]);
}
function pn(i, t) {
  let e, n, s, r;
  if (!i || !t || i.length !== t.length)
    return !1;
  for (e = 0, n = i.length; e < n; ++e)
    if (s = i[e], r = t[e], s.datasetIndex !== r.datasetIndex || s.index !== r.index)
      return !1;
  return !0;
}
function gn(i) {
  if (Z(i))
    return i.map(gn);
  if (j(i)) {
    const t = /* @__PURE__ */ Object.create(null), e = Object.keys(i), n = e.length;
    let s = 0;
    for (; s < n; ++s)
      t[e[s]] = gn(i[e[s]]);
    return t;
  }
  return i;
}
function va(i) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(i) === -1;
}
function kh(i, t, e, n) {
  if (!va(i))
    return;
  const s = t[i], r = e[i];
  j(s) && j(r) ? di(s, r, n) : t[i] = gn(r);
}
function di(i, t, e) {
  const n = Z(t) ? t : [
    t
  ], s = n.length;
  if (!j(i))
    return i;
  e = e || {};
  const r = e.merger || kh;
  let o;
  for (let a = 0; a < s; ++a) {
    if (o = n[a], !j(o))
      continue;
    const c = Object.keys(o);
    for (let l = 0, u = c.length; l < u; ++l)
      r(c[l], i, o, e);
  }
  return i;
}
function oi(i, t) {
  return di(i, t, {
    merger: Ah
  });
}
function Ah(i, t, e) {
  if (!va(i))
    return;
  const n = t[i], s = e[i];
  j(n) && j(s) ? oi(n, s) : Object.prototype.hasOwnProperty.call(t, i) || (t[i] = gn(s));
}
const Or = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (i) => i,
  // default resolvers
  x: (i) => i.x,
  y: (i) => i.y
};
function Mh(i) {
  const t = i.split("."), e = [];
  let n = "";
  for (const s of t)
    n += s, n.endsWith("\\") ? n = n.slice(0, -1) + "." : (e.push(n), n = "");
  return e;
}
function Oh(i) {
  const t = Mh(i);
  return (e) => {
    for (const n of t) {
      if (n === "")
        break;
      e = e && e[n];
    }
    return e;
  };
}
function ne(i, t) {
  return (Or[t] || (Or[t] = Oh(t)))(i);
}
function Bs(i) {
  return i.charAt(0).toUpperCase() + i.slice(1);
}
const pi = (i) => typeof i < "u", se = (i) => typeof i == "function", Dr = (i, t) => {
  if (i.size !== t.size)
    return !1;
  for (const e of i)
    if (!t.has(e))
      return !1;
  return !0;
};
function Dh(i) {
  return i.type === "mouseup" || i.type === "click" || i.type === "contextmenu";
}
const G = Math.PI, pt = 2 * G, mn = Number.POSITIVE_INFINITY, Ch = G / 180, gt = G / 2, le = G / 4, Cr = G * 2 / 3, ya = Math.log10, ee = Math.sign;
function sn(i, t, e) {
  return Math.abs(i - t) < e;
}
function Tr(i) {
  const t = Math.round(i);
  i = sn(i, t, i / 1e3) ? t : i;
  const e = Math.pow(10, Math.floor(ya(i))), n = i / e;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * e;
}
function Th(i) {
  const t = [], e = Math.sqrt(i);
  let n;
  for (n = 1; n < e; n++)
    i % n === 0 && (t.push(n), t.push(i / n));
  return e === (e | 0) && t.push(e), t.sort((s, r) => s - r).pop(), t;
}
function Eh(i) {
  return typeof i == "symbol" || typeof i == "object" && i !== null && !(Symbol.toPrimitive in i || "toString" in i || "valueOf" in i);
}
function bn(i) {
  return !Eh(i) && !isNaN(parseFloat(i)) && isFinite(i);
}
function Ph(i, t) {
  const e = Math.round(i);
  return e - t <= i && e + t >= i;
}
function Rh(i, t, e) {
  let n, s, r;
  for (n = 0, s = i.length; n < s; n++)
    r = i[n][e], isNaN(r) || (t.min = Math.min(t.min, r), t.max = Math.max(t.max, r));
}
function Ft(i) {
  return i * (G / 180);
}
function Lh(i) {
  return i * (180 / G);
}
function Er(i) {
  if (!Mt(i))
    return;
  let t = 1, e = 0;
  for (; Math.round(i * t) / t !== i; )
    t *= 10, e++;
  return e;
}
function Fh(i, t) {
  const e = t.x - i.x, n = t.y - i.y, s = Math.sqrt(e * e + n * n);
  let r = Math.atan2(n, e);
  return r < -0.5 * G && (r += pt), {
    angle: r,
    distance: s
  };
}
function Ih(i, t) {
  return Math.sqrt(Math.pow(t.x - i.x, 2) + Math.pow(t.y - i.y, 2));
}
function ue(i) {
  return (i % pt + pt) % pt;
}
function us(i, t, e, n) {
  const s = ue(i), r = ue(t), o = ue(e), a = ue(r - s), c = ue(o - s), l = ue(s - r), u = ue(s - o);
  return s === r || s === o || n && r === o || a > c && l < u;
}
function Tt(i, t, e) {
  return Math.max(t, Math.min(e, i));
}
function Bh(i) {
  return Tt(i, -32768, 32767);
}
function De(i, t, e, n = 1e-6) {
  return i >= Math.min(t, e) - n && i <= Math.max(t, e) + n;
}
function zs(i, t, e) {
  e = e || ((o) => i[o] < t);
  let n = i.length - 1, s = 0, r;
  for (; n - s > 1; )
    r = s + n >> 1, e(r) ? s = r : n = r;
  return {
    lo: s,
    hi: n
  };
}
const hs = (i, t, e, n) => zs(i, e, n ? (s) => {
  const r = i[s][t];
  return r < e || r === e && i[s + 1][t] === e;
} : (s) => i[s][t] < e), zh = (i, t, e) => zs(i, e, (n) => i[n][t] >= e);
function Hh(i, t, e) {
  let n = 0, s = i.length;
  for (; n < s && i[n] < t; )
    n++;
  for (; s > n && i[s - 1] > e; )
    s--;
  return n > 0 || s < i.length ? i.slice(n, s) : i;
}
const xa = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function jh(i, t) {
  if (i._chartjs) {
    i._chartjs.listeners.push(t);
    return;
  }
  Object.defineProperty(i, "_chartjs", {
    configurable: !0,
    enumerable: !1,
    value: {
      listeners: [
        t
      ]
    }
  }), xa.forEach((e) => {
    const n = "_onData" + Bs(e), s = i[e];
    Object.defineProperty(i, e, {
      configurable: !0,
      enumerable: !1,
      value(...r) {
        const o = s.apply(this, r);
        return i._chartjs.listeners.forEach((a) => {
          typeof a[n] == "function" && a[n](...r);
        }), o;
      }
    });
  });
}
function Pr(i, t) {
  const e = i._chartjs;
  if (!e)
    return;
  const n = e.listeners, s = n.indexOf(t);
  s !== -1 && n.splice(s, 1), !(n.length > 0) && (xa.forEach((r) => {
    delete i[r];
  }), delete i._chartjs);
}
function _a(i) {
  const t = new Set(i);
  return t.size === i.length ? i : Array.from(t);
}
const wa = function() {
  return typeof window > "u" ? function(i) {
    return i();
  } : window.requestAnimationFrame;
}();
function Sa(i, t) {
  let e = [], n = !1;
  return function(...s) {
    e = s, n || (n = !0, wa.call(window, () => {
      n = !1, i.apply(t, e);
    }));
  };
}
function Wh(i, t) {
  let e;
  return function(...n) {
    return t ? (clearTimeout(e), e = setTimeout(i, t, n)) : i.apply(this, n), t;
  };
}
const Hs = (i) => i === "start" ? "left" : i === "end" ? "right" : "center", st = (i, t, e) => i === "start" ? t : i === "end" ? e : (t + e) / 2, Nh = (i, t, e, n) => i === (n ? "left" : "right") ? e : i === "center" ? (t + e) / 2 : t, Wi = (i) => i === 0 || i === 1, Rr = (i, t, e) => -(Math.pow(2, 10 * (i -= 1)) * Math.sin((i - t) * pt / e)), Lr = (i, t, e) => Math.pow(2, -10 * i) * Math.sin((i - t) * pt / e) + 1, ai = {
  linear: (i) => i,
  easeInQuad: (i) => i * i,
  easeOutQuad: (i) => -i * (i - 2),
  easeInOutQuad: (i) => (i /= 0.5) < 1 ? 0.5 * i * i : -0.5 * (--i * (i - 2) - 1),
  easeInCubic: (i) => i * i * i,
  easeOutCubic: (i) => (i -= 1) * i * i + 1,
  easeInOutCubic: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i : 0.5 * ((i -= 2) * i * i + 2),
  easeInQuart: (i) => i * i * i * i,
  easeOutQuart: (i) => -((i -= 1) * i * i * i - 1),
  easeInOutQuart: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i * i : -0.5 * ((i -= 2) * i * i * i - 2),
  easeInQuint: (i) => i * i * i * i * i,
  easeOutQuint: (i) => (i -= 1) * i * i * i * i + 1,
  easeInOutQuint: (i) => (i /= 0.5) < 1 ? 0.5 * i * i * i * i * i : 0.5 * ((i -= 2) * i * i * i * i + 2),
  easeInSine: (i) => -Math.cos(i * gt) + 1,
  easeOutSine: (i) => Math.sin(i * gt),
  easeInOutSine: (i) => -0.5 * (Math.cos(G * i) - 1),
  easeInExpo: (i) => i === 0 ? 0 : Math.pow(2, 10 * (i - 1)),
  easeOutExpo: (i) => i === 1 ? 1 : -Math.pow(2, -10 * i) + 1,
  easeInOutExpo: (i) => Wi(i) ? i : i < 0.5 ? 0.5 * Math.pow(2, 10 * (i * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (i * 2 - 1)) + 2),
  easeInCirc: (i) => i >= 1 ? i : -(Math.sqrt(1 - i * i) - 1),
  easeOutCirc: (i) => Math.sqrt(1 - (i -= 1) * i),
  easeInOutCirc: (i) => (i /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - i * i) - 1) : 0.5 * (Math.sqrt(1 - (i -= 2) * i) + 1),
  easeInElastic: (i) => Wi(i) ? i : Rr(i, 0.075, 0.3),
  easeOutElastic: (i) => Wi(i) ? i : Lr(i, 0.075, 0.3),
  easeInOutElastic(i) {
    return Wi(i) ? i : i < 0.5 ? 0.5 * Rr(i * 2, 0.1125, 0.45) : 0.5 + 0.5 * Lr(i * 2 - 1, 0.1125, 0.45);
  },
  easeInBack(i) {
    return i * i * ((1.70158 + 1) * i - 1.70158);
  },
  easeOutBack(i) {
    return (i -= 1) * i * ((1.70158 + 1) * i + 1.70158) + 1;
  },
  easeInOutBack(i) {
    let t = 1.70158;
    return (i /= 0.5) < 1 ? 0.5 * (i * i * (((t *= 1.525) + 1) * i - t)) : 0.5 * ((i -= 2) * i * (((t *= 1.525) + 1) * i + t) + 2);
  },
  easeInBounce: (i) => 1 - ai.easeOutBounce(1 - i),
  easeOutBounce(i) {
    return i < 1 / 2.75 ? 7.5625 * i * i : i < 2 / 2.75 ? 7.5625 * (i -= 1.5 / 2.75) * i + 0.75 : i < 2.5 / 2.75 ? 7.5625 * (i -= 2.25 / 2.75) * i + 0.9375 : 7.5625 * (i -= 2.625 / 2.75) * i + 0.984375;
  },
  easeInOutBounce: (i) => i < 0.5 ? ai.easeInBounce(i * 2) * 0.5 : ai.easeOutBounce(i * 2 - 1) * 0.5 + 0.5
};
function ka(i) {
  if (i && typeof i == "object") {
    const t = i.toString();
    return t === "[object CanvasPattern]" || t === "[object CanvasGradient]";
  }
  return !1;
}
function Fr(i) {
  return ka(i) ? i : new fi(i);
}
function jn(i) {
  return ka(i) ? i : new fi(i).saturate(0.5).darken(0.1).hexString();
}
const $h = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
], Vh = [
  "color",
  "borderColor",
  "backgroundColor"
];
function Uh(i) {
  i.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  }), i.describe("animation", {
    _fallback: !1,
    _indexable: !1,
    _scriptable: (t) => t !== "onProgress" && t !== "onComplete" && t !== "fn"
  }), i.set("animations", {
    colors: {
      type: "color",
      properties: Vh
    },
    numbers: {
      type: "number",
      properties: $h
    }
  }), i.describe("animations", {
    _fallback: "animation"
  }), i.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (t) => t | 0
        }
      }
    }
  });
}
function Yh(i) {
  i.set("layout", {
    autoPadding: !0,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
const Ir = /* @__PURE__ */ new Map();
function Xh(i, t) {
  t = t || {};
  const e = i + JSON.stringify(t);
  let n = Ir.get(e);
  return n || (n = new Intl.NumberFormat(i, t), Ir.set(e, n)), n;
}
function Cn(i, t, e) {
  return Xh(t, e).format(i);
}
const Kh = {
  values(i) {
    return Z(i) ? i : "" + i;
  },
  numeric(i, t, e) {
    if (i === 0)
      return "0";
    const n = this.chart.options.locale;
    let s, r = i;
    if (e.length > 1) {
      const l = Math.max(Math.abs(e[0].value), Math.abs(e[e.length - 1].value));
      (l < 1e-4 || l > 1e15) && (s = "scientific"), r = qh(i, e);
    }
    const o = ya(Math.abs(r)), a = isNaN(o) ? 1 : Math.max(Math.min(-1 * Math.floor(o), 20), 0), c = {
      notation: s,
      minimumFractionDigits: a,
      maximumFractionDigits: a
    };
    return Object.assign(c, this.options.ticks.format), Cn(i, n, c);
  }
};
function qh(i, t) {
  let e = t.length > 3 ? t[2].value - t[1].value : t[1].value - t[0].value;
  return Math.abs(e) >= 1 && i !== Math.floor(i) && (e = i - Math.floor(i)), e;
}
var Aa = {
  formatters: Kh
};
function Qh(i) {
  i.set("scale", {
    display: !0,
    offset: !1,
    reverse: !1,
    beginAtZero: !1,
    bounds: "ticks",
    clip: !0,
    grace: 0,
    grid: {
      display: !0,
      lineWidth: 1,
      drawOnChartArea: !0,
      drawTicks: !0,
      tickLength: 8,
      tickWidth: (t, e) => e.lineWidth,
      tickColor: (t, e) => e.color,
      offset: !1
    },
    border: {
      display: !0,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: !1,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: !1,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: !0,
      autoSkip: !0,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Aa.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: !1,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  }), i.route("scale.ticks", "color", "", "color"), i.route("scale.grid", "color", "", "borderColor"), i.route("scale.border", "color", "", "borderColor"), i.route("scale.title", "color", "", "color"), i.describe("scale", {
    _fallback: !1,
    _scriptable: (t) => !t.startsWith("before") && !t.startsWith("after") && t !== "callback" && t !== "parser",
    _indexable: (t) => t !== "borderDash" && t !== "tickBorderDash" && t !== "dash"
  }), i.describe("scales", {
    _fallback: "scale"
  }), i.describe("scale.ticks", {
    _scriptable: (t) => t !== "backdropPadding" && t !== "callback",
    _indexable: (t) => t !== "backdropPadding"
  });
}
const xe = /* @__PURE__ */ Object.create(null), fs = /* @__PURE__ */ Object.create(null);
function ci(i, t) {
  if (!t)
    return i;
  const e = t.split(".");
  for (let n = 0, s = e.length; n < s; ++n) {
    const r = e[n];
    i = i[r] || (i[r] = /* @__PURE__ */ Object.create(null));
  }
  return i;
}
function Wn(i, t, e) {
  return typeof t == "string" ? di(ci(i, t), e) : di(ci(i, ""), t);
}
class Zh {
  constructor(t, e) {
    this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = (n) => n.chart.platform.getDevicePixelRatio(), this.elements = {}, this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ], this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    }, this.hover = {}, this.hoverBackgroundColor = (n, s) => jn(s.backgroundColor), this.hoverBorderColor = (n, s) => jn(s.borderColor), this.hoverColor = (n, s) => jn(s.color), this.indexAxis = "x", this.interaction = {
      mode: "nearest",
      intersect: !0,
      includeInvisible: !1
    }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t), this.apply(e);
  }
  set(t, e) {
    return Wn(this, t, e);
  }
  get(t) {
    return ci(this, t);
  }
  describe(t, e) {
    return Wn(fs, t, e);
  }
  override(t, e) {
    return Wn(xe, t, e);
  }
  route(t, e, n, s) {
    const r = ci(this, t), o = ci(this, n), a = "_" + e;
    Object.defineProperties(r, {
      [a]: {
        value: r[e],
        writable: !0
      },
      [e]: {
        enumerable: !0,
        get() {
          const c = this[a], l = o[s];
          return j(c) ? Object.assign({}, l, c) : W(c, l);
        },
        set(c) {
          this[a] = c;
        }
      }
    });
  }
  apply(t) {
    t.forEach((e) => e(this));
  }
}
var K = /* @__PURE__ */ new Zh({
  _scriptable: (i) => !i.startsWith("on"),
  _indexable: (i) => i !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: !1,
    _indexable: !1
  }
}, [
  Uh,
  Yh,
  Qh
]);
function Gh(i) {
  return !i || U(i.size) || U(i.family) ? null : (i.style ? i.style + " " : "") + (i.weight ? i.weight + " " : "") + i.size + "px " + i.family;
}
function Br(i, t, e, n, s) {
  let r = t[s];
  return r || (r = t[s] = i.measureText(s).width, e.push(s)), r > n && (n = r), n;
}
function he(i, t, e) {
  const n = i.currentDevicePixelRatio, s = e !== 0 ? Math.max(e / 2, 0.5) : 0;
  return Math.round((t - s) * n) / n + s;
}
function zr(i, t) {
  !t && !i || (t = t || i.getContext("2d"), t.save(), t.resetTransform(), t.clearRect(0, 0, i.width, i.height), t.restore());
}
function Hr(i, t, e, n) {
  Ma(i, t, e, n, null);
}
function Ma(i, t, e, n, s) {
  let r, o, a, c, l, u, h, f;
  const d = t.pointStyle, p = t.rotation, m = t.radius;
  let b = (p || 0) * Ch;
  if (d && typeof d == "object" && (r = d.toString(), r === "[object HTMLImageElement]" || r === "[object HTMLCanvasElement]")) {
    i.save(), i.translate(e, n), i.rotate(b), i.drawImage(d, -d.width / 2, -d.height / 2, d.width, d.height), i.restore();
    return;
  }
  if (!(isNaN(m) || m <= 0)) {
    switch (i.beginPath(), d) {
      default:
        s ? i.ellipse(e, n, s / 2, m, 0, 0, pt) : i.arc(e, n, m, 0, pt), i.closePath();
        break;
      case "triangle":
        u = s ? s / 2 : m, i.moveTo(e + Math.sin(b) * u, n - Math.cos(b) * m), b += Cr, i.lineTo(e + Math.sin(b) * u, n - Math.cos(b) * m), b += Cr, i.lineTo(e + Math.sin(b) * u, n - Math.cos(b) * m), i.closePath();
        break;
      case "rectRounded":
        l = m * 0.516, c = m - l, o = Math.cos(b + le) * c, h = Math.cos(b + le) * (s ? s / 2 - l : c), a = Math.sin(b + le) * c, f = Math.sin(b + le) * (s ? s / 2 - l : c), i.arc(e - h, n - a, l, b - G, b - gt), i.arc(e + f, n - o, l, b - gt, b), i.arc(e + h, n + a, l, b, b + gt), i.arc(e - f, n + o, l, b + gt, b + G), i.closePath();
        break;
      case "rect":
        if (!p) {
          c = Math.SQRT1_2 * m, u = s ? s / 2 : c, i.rect(e - u, n - c, 2 * u, 2 * c);
          break;
        }
        b += le;
      case "rectRot":
        h = Math.cos(b) * (s ? s / 2 : m), o = Math.cos(b) * m, a = Math.sin(b) * m, f = Math.sin(b) * (s ? s / 2 : m), i.moveTo(e - h, n - a), i.lineTo(e + f, n - o), i.lineTo(e + h, n + a), i.lineTo(e - f, n + o), i.closePath();
        break;
      case "crossRot":
        b += le;
      case "cross":
        h = Math.cos(b) * (s ? s / 2 : m), o = Math.cos(b) * m, a = Math.sin(b) * m, f = Math.sin(b) * (s ? s / 2 : m), i.moveTo(e - h, n - a), i.lineTo(e + h, n + a), i.moveTo(e + f, n - o), i.lineTo(e - f, n + o);
        break;
      case "star":
        h = Math.cos(b) * (s ? s / 2 : m), o = Math.cos(b) * m, a = Math.sin(b) * m, f = Math.sin(b) * (s ? s / 2 : m), i.moveTo(e - h, n - a), i.lineTo(e + h, n + a), i.moveTo(e + f, n - o), i.lineTo(e - f, n + o), b += le, h = Math.cos(b) * (s ? s / 2 : m), o = Math.cos(b) * m, a = Math.sin(b) * m, f = Math.sin(b) * (s ? s / 2 : m), i.moveTo(e - h, n - a), i.lineTo(e + h, n + a), i.moveTo(e + f, n - o), i.lineTo(e - f, n + o);
        break;
      case "line":
        o = s ? s / 2 : Math.cos(b) * m, a = Math.sin(b) * m, i.moveTo(e - o, n - a), i.lineTo(e + o, n + a);
        break;
      case "dash":
        i.moveTo(e, n), i.lineTo(e + Math.cos(b) * (s ? s / 2 : m), n + Math.sin(b) * m);
        break;
      case !1:
        i.closePath();
        break;
    }
    i.fill(), t.borderWidth > 0 && i.stroke();
  }
}
function Oa(i, t, e) {
  return e = e || 0.5, !t || i && i.x > t.left - e && i.x < t.right + e && i.y > t.top - e && i.y < t.bottom + e;
}
function js(i, t) {
  i.save(), i.beginPath(), i.rect(t.left, t.top, t.right - t.left, t.bottom - t.top), i.clip();
}
function Ws(i) {
  i.restore();
}
function Jh(i, t) {
  t.translation && i.translate(t.translation[0], t.translation[1]), U(t.rotation) || i.rotate(t.rotation), t.color && (i.fillStyle = t.color), t.textAlign && (i.textAlign = t.textAlign), t.textBaseline && (i.textBaseline = t.textBaseline);
}
function tf(i, t, e, n, s) {
  if (s.strikethrough || s.underline) {
    const r = i.measureText(n), o = t - r.actualBoundingBoxLeft, a = t + r.actualBoundingBoxRight, c = e - r.actualBoundingBoxAscent, l = e + r.actualBoundingBoxDescent, u = s.strikethrough ? (c + l) / 2 : l;
    i.strokeStyle = i.fillStyle, i.beginPath(), i.lineWidth = s.decorationWidth || 2, i.moveTo(o, u), i.lineTo(a, u), i.stroke();
  }
}
function ef(i, t) {
  const e = i.fillStyle;
  i.fillStyle = t.color, i.fillRect(t.left, t.top, t.width, t.height), i.fillStyle = e;
}
function gi(i, t, e, n, s, r = {}) {
  const o = Z(t) ? t : [
    t
  ], a = r.strokeWidth > 0 && r.strokeColor !== "";
  let c, l;
  for (i.save(), i.font = s.string, Jh(i, r), c = 0; c < o.length; ++c)
    l = o[c], r.backdrop && ef(i, r.backdrop), a && (r.strokeColor && (i.strokeStyle = r.strokeColor), U(r.strokeWidth) || (i.lineWidth = r.strokeWidth), i.strokeText(l, e, n, r.maxWidth)), i.fillText(l, e, n, r.maxWidth), tf(i, e, n, l, r), n += Number(s.lineHeight);
  i.restore();
}
function vn(i, t) {
  const { x: e, y: n, w: s, h: r, radius: o } = t;
  i.arc(e + o.topLeft, n + o.topLeft, o.topLeft, 1.5 * G, G, !0), i.lineTo(e, n + r - o.bottomLeft), i.arc(e + o.bottomLeft, n + r - o.bottomLeft, o.bottomLeft, G, gt, !0), i.lineTo(e + s - o.bottomRight, n + r), i.arc(e + s - o.bottomRight, n + r - o.bottomRight, o.bottomRight, gt, 0, !0), i.lineTo(e + s, n + o.topRight), i.arc(e + s - o.topRight, n + o.topRight, o.topRight, 0, -gt, !0), i.lineTo(e + o.topLeft, n);
}
const nf = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/, sf = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function rf(i, t) {
  const e = ("" + i).match(nf);
  if (!e || e[1] === "normal")
    return t * 1.2;
  switch (i = +e[2], e[3]) {
    case "px":
      return i;
    case "%":
      i /= 100;
      break;
  }
  return t * i;
}
const of = (i) => +i || 0;
function Da(i, t) {
  const e = {}, n = j(t), s = n ? Object.keys(t) : t, r = j(i) ? n ? (o) => W(i[o], i[t[o]]) : (o) => i[o] : () => i;
  for (const o of s)
    e[o] = of(r(o));
  return e;
}
function Ca(i) {
  return Da(i, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function Ce(i) {
  return Da(i, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function Ot(i) {
  const t = Ca(i);
  return t.width = t.left + t.right, t.height = t.top + t.bottom, t;
}
function rt(i, t) {
  i = i || {}, t = t || K.font;
  let e = W(i.size, t.size);
  typeof e == "string" && (e = parseInt(e, 10));
  let n = W(i.style, t.style);
  n && !("" + n).match(sf) && (console.warn('Invalid font style specified: "' + n + '"'), n = void 0);
  const s = {
    family: W(i.family, t.family),
    lineHeight: rf(W(i.lineHeight, t.lineHeight), e),
    size: e,
    style: n,
    weight: W(i.weight, t.weight),
    string: ""
  };
  return s.string = Gh(s), s;
}
function Ni(i, t, e, n) {
  let s, r, o;
  for (s = 0, r = i.length; s < r; ++s)
    if (o = i[s], o !== void 0 && o !== void 0)
      return o;
}
function af(i, t, e) {
  const { min: n, max: s } = i, r = ba(t, (s - n) / 2), o = (a, c) => e && a === 0 ? 0 : a + c;
  return {
    min: o(n, -Math.abs(r)),
    max: o(s, r)
  };
}
function ze(i, t) {
  return Object.assign(Object.create(i), t);
}
function Ns(i, t = [
  ""
], e, n, s = () => i[0]) {
  const r = e || i;
  typeof n > "u" && (n = Ra("_fallback", i));
  const o = {
    [Symbol.toStringTag]: "Object",
    _cacheable: !0,
    _scopes: i,
    _rootScopes: r,
    _fallback: n,
    _getTarget: s,
    override: (a) => Ns([
      a,
      ...i
    ], t, r, n)
  };
  return new Proxy(o, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(a, c) {
      return delete a[c], delete a._keys, delete i[0][c], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(a, c) {
      return Ea(a, c, () => gf(c, t, i, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(a, c) {
      return Reflect.getOwnPropertyDescriptor(a._scopes[0], c);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(a, c) {
      return Wr(a).includes(c);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(a) {
      return Wr(a);
    },
    /**
    * A trap for setting property values.
    */
    set(a, c, l) {
      const u = a._storage || (a._storage = s());
      return a[c] = u[c] = l, delete a._keys, !0;
    }
  });
}
function Ie(i, t, e, n) {
  const s = {
    _cacheable: !1,
    _proxy: i,
    _context: t,
    _subProxy: e,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: Ta(i, n),
    setContext: (r) => Ie(i, r, e, n),
    override: (r) => Ie(i.override(r), t, e, n)
  };
  return new Proxy(s, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(r, o) {
      return delete r[o], delete i[o], !0;
    },
    /**
    * A trap for getting property values.
    */
    get(r, o, a) {
      return Ea(r, o, () => lf(r, o, a));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(r, o) {
      return r._descriptors.allKeys ? Reflect.has(i, o) ? {
        enumerable: !0,
        configurable: !0
      } : void 0 : Reflect.getOwnPropertyDescriptor(i, o);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(i);
    },
    /**
    * A trap for the in operator.
    */
    has(r, o) {
      return Reflect.has(i, o);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(i);
    },
    /**
    * A trap for setting property values.
    */
    set(r, o, a) {
      return i[o] = a, delete r[o], !0;
    }
  });
}
function Ta(i, t = {
  scriptable: !0,
  indexable: !0
}) {
  const { _scriptable: e = t.scriptable, _indexable: n = t.indexable, _allKeys: s = t.allKeys } = i;
  return {
    allKeys: s,
    scriptable: e,
    indexable: n,
    isScriptable: se(e) ? e : () => e,
    isIndexable: se(n) ? n : () => n
  };
}
const cf = (i, t) => i ? i + Bs(t) : t, $s = (i, t) => j(t) && i !== "adapters" && (Object.getPrototypeOf(t) === null || t.constructor === Object);
function Ea(i, t, e) {
  if (Object.prototype.hasOwnProperty.call(i, t) || t === "constructor")
    return i[t];
  const n = e();
  return i[t] = n, n;
}
function lf(i, t, e) {
  const { _proxy: n, _context: s, _subProxy: r, _descriptors: o } = i;
  let a = n[t];
  return se(a) && o.isScriptable(t) && (a = uf(t, a, i, e)), Z(a) && a.length && (a = hf(t, a, i, o.isIndexable)), $s(t, a) && (a = Ie(a, s, r && r[t], o)), a;
}
function uf(i, t, e, n) {
  const { _proxy: s, _context: r, _subProxy: o, _stack: a } = e;
  if (a.has(i))
    throw new Error("Recursion detected: " + Array.from(a).join("->") + "->" + i);
  a.add(i);
  let c = t(r, o || n);
  return a.delete(i), $s(i, c) && (c = Vs(s._scopes, s, i, c)), c;
}
function hf(i, t, e, n) {
  const { _proxy: s, _context: r, _subProxy: o, _descriptors: a } = e;
  if (typeof r.index < "u" && n(i))
    return t[r.index % t.length];
  if (j(t[0])) {
    const c = t, l = s._scopes.filter((u) => u !== c);
    t = [];
    for (const u of c) {
      const h = Vs(l, s, i, u);
      t.push(Ie(h, r, o && o[i], a));
    }
  }
  return t;
}
function Pa(i, t, e) {
  return se(i) ? i(t, e) : i;
}
const ff = (i, t) => i === !0 ? t : typeof i == "string" ? ne(t, i) : void 0;
function df(i, t, e, n, s) {
  for (const r of t) {
    const o = ff(e, r);
    if (o) {
      i.add(o);
      const a = Pa(o._fallback, e, s);
      if (typeof a < "u" && a !== e && a !== n)
        return a;
    } else if (o === !1 && typeof n < "u" && e !== n)
      return null;
  }
  return !1;
}
function Vs(i, t, e, n) {
  const s = t._rootScopes, r = Pa(t._fallback, e, n), o = [
    ...i,
    ...s
  ], a = /* @__PURE__ */ new Set();
  a.add(n);
  let c = jr(a, o, e, r || e, n);
  return c === null || typeof r < "u" && r !== e && (c = jr(a, o, r, c, n), c === null) ? !1 : Ns(Array.from(a), [
    ""
  ], s, r, () => pf(t, e, n));
}
function jr(i, t, e, n, s) {
  for (; e; )
    e = df(i, t, e, n, s);
  return e;
}
function pf(i, t, e) {
  const n = i._getTarget();
  t in n || (n[t] = {});
  const s = n[t];
  return Z(s) && j(e) ? e : s || {};
}
function gf(i, t, e, n) {
  let s;
  for (const r of t)
    if (s = Ra(cf(r, i), e), typeof s < "u")
      return $s(i, s) ? Vs(e, n, i, s) : s;
}
function Ra(i, t) {
  for (const e of t) {
    if (!e)
      continue;
    const n = e[i];
    if (typeof n < "u")
      return n;
  }
}
function Wr(i) {
  let t = i._keys;
  return t || (t = i._keys = mf(i._scopes)), t;
}
function mf(i) {
  const t = /* @__PURE__ */ new Set();
  for (const e of i)
    for (const n of Object.keys(e).filter((s) => !s.startsWith("_")))
      t.add(n);
  return Array.from(t);
}
function bf(i, t, e, n) {
  const { iScale: s } = i, { key: r = "r" } = this._parsing, o = new Array(n);
  let a, c, l, u;
  for (a = 0, c = n; a < c; ++a)
    l = a + e, u = t[l], o[a] = {
      r: s.parse(ne(u, r), l)
    };
  return o;
}
function Us() {
  return typeof window < "u" && typeof document < "u";
}
function Ys(i) {
  let t = i.parentNode;
  return t && t.toString() === "[object ShadowRoot]" && (t = t.host), t;
}
function yn(i, t, e) {
  let n;
  return typeof i == "string" ? (n = parseInt(i, 10), i.indexOf("%") !== -1 && (n = n / 100 * t.parentNode[e])) : n = i, n;
}
const Tn = (i) => i.ownerDocument.defaultView.getComputedStyle(i, null);
function vf(i, t) {
  return Tn(i).getPropertyValue(t);
}
const yf = [
  "top",
  "right",
  "bottom",
  "left"
];
function be(i, t, e) {
  const n = {};
  e = e ? "-" + e : "";
  for (let s = 0; s < 4; s++) {
    const r = yf[s];
    n[r] = parseFloat(i[t + "-" + r + e]) || 0;
  }
  return n.width = n.left + n.right, n.height = n.top + n.bottom, n;
}
const xf = (i, t, e) => (i > 0 || t > 0) && (!e || !e.shadowRoot);
function _f(i, t) {
  const e = i.touches, n = e && e.length ? e[0] : i, { offsetX: s, offsetY: r } = n;
  let o = !1, a, c;
  if (xf(s, r, i.target))
    a = s, c = r;
  else {
    const l = t.getBoundingClientRect();
    a = n.clientX - l.left, c = n.clientY - l.top, o = !0;
  }
  return {
    x: a,
    y: c,
    box: o
  };
}
function pe(i, t) {
  if ("native" in i)
    return i;
  const { canvas: e, currentDevicePixelRatio: n } = t, s = Tn(e), r = s.boxSizing === "border-box", o = be(s, "padding"), a = be(s, "border", "width"), { x: c, y: l, box: u } = _f(i, e), h = o.left + (u && a.left), f = o.top + (u && a.top);
  let { width: d, height: p } = t;
  return r && (d -= o.width + a.width, p -= o.height + a.height), {
    x: Math.round((c - h) / d * e.width / n),
    y: Math.round((l - f) / p * e.height / n)
  };
}
function wf(i, t, e) {
  let n, s;
  if (t === void 0 || e === void 0) {
    const r = i && Ys(i);
    if (!r)
      t = i.clientWidth, e = i.clientHeight;
    else {
      const o = r.getBoundingClientRect(), a = Tn(r), c = be(a, "border", "width"), l = be(a, "padding");
      t = o.width - l.width - c.width, e = o.height - l.height - c.height, n = yn(a.maxWidth, r, "clientWidth"), s = yn(a.maxHeight, r, "clientHeight");
    }
  }
  return {
    width: t,
    height: e,
    maxWidth: n || mn,
    maxHeight: s || mn
  };
}
const $i = (i) => Math.round(i * 10) / 10;
function Sf(i, t, e, n) {
  const s = Tn(i), r = be(s, "margin"), o = yn(s.maxWidth, i, "clientWidth") || mn, a = yn(s.maxHeight, i, "clientHeight") || mn, c = wf(i, t, e);
  let { width: l, height: u } = c;
  if (s.boxSizing === "content-box") {
    const f = be(s, "border", "width"), d = be(s, "padding");
    l -= d.width + f.width, u -= d.height + f.height;
  }
  return l = Math.max(0, l - r.width), u = Math.max(0, n ? l / n : u - r.height), l = $i(Math.min(l, o, c.maxWidth)), u = $i(Math.min(u, a, c.maxHeight)), l && !u && (u = $i(l / 2)), (t !== void 0 || e !== void 0) && n && c.height && u > c.height && (u = c.height, l = $i(Math.floor(u * n))), {
    width: l,
    height: u
  };
}
function Nr(i, t, e) {
  const n = t || 1, s = Math.floor(i.height * n), r = Math.floor(i.width * n);
  i.height = Math.floor(i.height), i.width = Math.floor(i.width);
  const o = i.canvas;
  return o.style && (e || !o.style.height && !o.style.width) && (o.style.height = `${i.height}px`, o.style.width = `${i.width}px`), i.currentDevicePixelRatio !== n || o.height !== s || o.width !== r ? (i.currentDevicePixelRatio = n, o.height = s, o.width = r, i.ctx.setTransform(n, 0, 0, n, 0, 0), !0) : !1;
}
const kf = function() {
  let i = !1;
  try {
    const t = {
      get passive() {
        return i = !0, !1;
      }
    };
    Us() && (window.addEventListener("test", null, t), window.removeEventListener("test", null, t));
  } catch {
  }
  return i;
}();
function $r(i, t) {
  const e = vf(i, t), n = e && e.match(/^(\d+)(\.\d+)?px$/);
  return n ? +n[1] : void 0;
}
const Af = function(i, t) {
  return {
    x(e) {
      return i + i + t - e;
    },
    setWidth(e) {
      t = e;
    },
    textAlign(e) {
      return e === "center" ? e : e === "right" ? "left" : "right";
    },
    xPlus(e, n) {
      return e - n;
    },
    leftForLtr(e, n) {
      return e - n;
    }
  };
}, Mf = function() {
  return {
    x(i) {
      return i;
    },
    setWidth(i) {
    },
    textAlign(i) {
      return i;
    },
    xPlus(i, t) {
      return i + t;
    },
    leftForLtr(i, t) {
      return i;
    }
  };
};
function Te(i, t, e) {
  return i ? Af(t, e) : Mf();
}
function La(i, t) {
  let e, n;
  (t === "ltr" || t === "rtl") && (e = i.canvas.style, n = [
    e.getPropertyValue("direction"),
    e.getPropertyPriority("direction")
  ], e.setProperty("direction", t, "important"), i.prevTextDirection = n);
}
function Fa(i, t) {
  t !== void 0 && (delete i.prevTextDirection, i.canvas.style.setProperty("direction", t[0], t[1]));
}
function Vi(i, t, e) {
  return i.options.clip ? i[e] : t[e];
}
function Of(i, t) {
  const { xScale: e, yScale: n } = i;
  return e && n ? {
    left: Vi(e, t, "left"),
    right: Vi(e, t, "right"),
    top: Vi(n, t, "top"),
    bottom: Vi(n, t, "bottom")
  } : t;
}
function Df(i, t) {
  const e = t._clip;
  if (e.disabled)
    return !1;
  const n = Of(t, i.chartArea);
  return {
    left: e.left === !1 ? 0 : n.left - (e.left === !0 ? 0 : e.left),
    right: e.right === !1 ? i.width : n.right + (e.right === !0 ? 0 : e.right),
    top: e.top === !1 ? 0 : n.top - (e.top === !0 ? 0 : e.top),
    bottom: e.bottom === !1 ? i.height : n.bottom + (e.bottom === !0 ? 0 : e.bottom)
  };
}
/*!
 * Chart.js v4.5.0
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
class Cf {
  constructor() {
    this._request = null, this._charts = /* @__PURE__ */ new Map(), this._running = !1, this._lastDate = void 0;
  }
  _notify(t, e, n, s) {
    const r = e.listeners[s], o = e.duration;
    r.forEach((a) => a({
      chart: t,
      initial: e.initial,
      numSteps: o,
      currentStep: Math.min(n - e.start, o)
    }));
  }
  _refresh() {
    this._request || (this._running = !0, this._request = wa.call(window, () => {
      this._update(), this._request = null, this._running && this._refresh();
    }));
  }
  _update(t = Date.now()) {
    let e = 0;
    this._charts.forEach((n, s) => {
      if (!n.running || !n.items.length)
        return;
      const r = n.items;
      let o = r.length - 1, a = !1, c;
      for (; o >= 0; --o)
        c = r[o], c._active ? (c._total > n.duration && (n.duration = c._total), c.tick(t), a = !0) : (r[o] = r[r.length - 1], r.pop());
      a && (s.draw(), this._notify(s, n, t, "progress")), r.length || (n.running = !1, this._notify(s, n, t, "complete"), n.initial = !1), e += r.length;
    }), this._lastDate = t, e === 0 && (this._running = !1);
  }
  _getAnims(t) {
    const e = this._charts;
    let n = e.get(t);
    return n || (n = {
      running: !1,
      initial: !0,
      items: [],
      listeners: {
        complete: [],
        progress: []
      }
    }, e.set(t, n)), n;
  }
  listen(t, e, n) {
    this._getAnims(t).listeners[e].push(n);
  }
  add(t, e) {
    !e || !e.length || this._getAnims(t).items.push(...e);
  }
  has(t) {
    return this._getAnims(t).items.length > 0;
  }
  start(t) {
    const e = this._charts.get(t);
    e && (e.running = !0, e.start = Date.now(), e.duration = e.items.reduce((n, s) => Math.max(n, s._duration), 0), this._refresh());
  }
  running(t) {
    if (!this._running)
      return !1;
    const e = this._charts.get(t);
    return !(!e || !e.running || !e.items.length);
  }
  stop(t) {
    const e = this._charts.get(t);
    if (!e || !e.items.length)
      return;
    const n = e.items;
    let s = n.length - 1;
    for (; s >= 0; --s)
      n[s].cancel();
    e.items = [], this._notify(t, e, Date.now(), "complete");
  }
  remove(t) {
    return this._charts.delete(t);
  }
}
var $t = /* @__PURE__ */ new Cf();
const Vr = "transparent", Tf = {
  boolean(i, t, e) {
    return e > 0.5 ? t : i;
  },
  color(i, t, e) {
    const n = Fr(i || Vr), s = n.valid && Fr(t || Vr);
    return s && s.valid ? s.mix(n, e).hexString() : t;
  },
  number(i, t, e) {
    return i + (t - i) * e;
  }
};
class Ef {
  constructor(t, e, n, s) {
    const r = e[n];
    s = Ni([
      t.to,
      s,
      r,
      t.from
    ]);
    const o = Ni([
      t.from,
      r,
      s
    ]);
    this._active = !0, this._fn = t.fn || Tf[t.type || typeof o], this._easing = ai[t.easing] || ai.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = n, this._from = o, this._to = s, this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(t, e, n) {
    if (this._active) {
      this._notify(!1);
      const s = this._target[this._prop], r = n - this._start, o = this._duration - r;
      this._start = n, this._duration = Math.floor(Math.max(o, t.duration)), this._total += r, this._loop = !!t.loop, this._to = Ni([
        t.to,
        e,
        s,
        t.from
      ]), this._from = Ni([
        t.from,
        s,
        e
      ]);
    }
  }
  cancel() {
    this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1));
  }
  tick(t) {
    const e = t - this._start, n = this._duration, s = this._prop, r = this._from, o = this._loop, a = this._to;
    let c;
    if (this._active = r !== a && (o || e < n), !this._active) {
      this._target[s] = a, this._notify(!0);
      return;
    }
    if (e < 0) {
      this._target[s] = r;
      return;
    }
    c = e / n % 2, c = o && c > 1 ? 2 - c : c, c = this._easing(Math.min(1, Math.max(0, c))), this._target[s] = this._fn(r, a, c);
  }
  wait() {
    const t = this._promises || (this._promises = []);
    return new Promise((e, n) => {
      t.push({
        res: e,
        rej: n
      });
    });
  }
  _notify(t) {
    const e = t ? "res" : "rej", n = this._promises || [];
    for (let s = 0; s < n.length; s++)
      n[s][e]();
  }
}
class Ia {
  constructor(t, e) {
    this._chart = t, this._properties = /* @__PURE__ */ new Map(), this.configure(e);
  }
  configure(t) {
    if (!j(t))
      return;
    const e = Object.keys(K.animation), n = this._properties;
    Object.getOwnPropertyNames(t).forEach((s) => {
      const r = t[s];
      if (!j(r))
        return;
      const o = {};
      for (const a of e)
        o[a] = r[a];
      (Z(r.properties) && r.properties || [
        s
      ]).forEach((a) => {
        (a === s || !n.has(a)) && n.set(a, o);
      });
    });
  }
  _animateOptions(t, e) {
    const n = e.options, s = Rf(t, n);
    if (!s)
      return [];
    const r = this._createAnimations(s, n);
    return n.$shared && Pf(t.options.$animations, n).then(() => {
      t.options = n;
    }, () => {
    }), r;
  }
  _createAnimations(t, e) {
    const n = this._properties, s = [], r = t.$animations || (t.$animations = {}), o = Object.keys(e), a = Date.now();
    let c;
    for (c = o.length - 1; c >= 0; --c) {
      const l = o[c];
      if (l.charAt(0) === "$")
        continue;
      if (l === "options") {
        s.push(...this._animateOptions(t, e));
        continue;
      }
      const u = e[l];
      let h = r[l];
      const f = n.get(l);
      if (h)
        if (f && h.active()) {
          h.update(f, u, a);
          continue;
        } else
          h.cancel();
      if (!f || !f.duration) {
        t[l] = u;
        continue;
      }
      r[l] = h = new Ef(f, t, l, u), s.push(h);
    }
    return s;
  }
  update(t, e) {
    if (this._properties.size === 0) {
      Object.assign(t, e);
      return;
    }
    const n = this._createAnimations(t, e);
    if (n.length)
      return $t.add(this._chart, n), !0;
  }
}
function Pf(i, t) {
  const e = [], n = Object.keys(t);
  for (let s = 0; s < n.length; s++) {
    const r = i[n[s]];
    r && r.active() && e.push(r.wait());
  }
  return Promise.all(e);
}
function Rf(i, t) {
  if (!t)
    return;
  let e = i.options;
  if (!e) {
    i.options = t;
    return;
  }
  return e.$shared && (i.options = e = Object.assign({}, e, {
    $shared: !1,
    $animations: {}
  })), e;
}
function Ur(i, t) {
  const e = i && i.options || {}, n = e.reverse, s = e.min === void 0 ? t : 0, r = e.max === void 0 ? t : 0;
  return {
    start: n ? r : s,
    end: n ? s : r
  };
}
function Lf(i, t, e) {
  if (e === !1)
    return !1;
  const n = Ur(i, e), s = Ur(t, e);
  return {
    top: s.end,
    right: n.end,
    bottom: s.start,
    left: n.start
  };
}
function Ff(i) {
  let t, e, n, s;
  return j(i) ? (t = i.top, e = i.right, n = i.bottom, s = i.left) : t = e = n = s = i, {
    top: t,
    right: e,
    bottom: n,
    left: s,
    disabled: i === !1
  };
}
function Ba(i, t) {
  const e = [], n = i._getSortedDatasetMetas(t);
  let s, r;
  for (s = 0, r = n.length; s < r; ++s)
    e.push(n[s].index);
  return e;
}
function Yr(i, t, e, n = {}) {
  const s = i.keys, r = n.mode === "single";
  let o, a, c, l;
  if (t === null)
    return;
  let u = !1;
  for (o = 0, a = s.length; o < a; ++o) {
    if (c = +s[o], c === e) {
      if (u = !0, n.all)
        continue;
      break;
    }
    l = i.values[c], Mt(l) && (r || t === 0 || ee(t) === ee(l)) && (t += l);
  }
  return !u && !n.all ? 0 : t;
}
function If(i, t) {
  const { iScale: e, vScale: n } = t, s = e.axis === "x" ? "x" : "y", r = n.axis === "x" ? "x" : "y", o = Object.keys(i), a = new Array(o.length);
  let c, l, u;
  for (c = 0, l = o.length; c < l; ++c)
    u = o[c], a[c] = {
      [s]: u,
      [r]: i[u]
    };
  return a;
}
function Nn(i, t) {
  const e = i && i.options.stacked;
  return e || e === void 0 && t.stack !== void 0;
}
function Bf(i, t, e) {
  return `${i.id}.${t.id}.${e.stack || e.type}`;
}
function zf(i) {
  const { min: t, max: e, minDefined: n, maxDefined: s } = i.getUserBounds();
  return {
    min: n ? t : Number.NEGATIVE_INFINITY,
    max: s ? e : Number.POSITIVE_INFINITY
  };
}
function Hf(i, t, e) {
  const n = i[t] || (i[t] = {});
  return n[e] || (n[e] = {});
}
function Xr(i, t, e, n) {
  for (const s of t.getMatchingVisibleMetas(n).reverse()) {
    const r = i[s.index];
    if (e && r > 0 || !e && r < 0)
      return s.index;
  }
  return null;
}
function Kr(i, t) {
  const { chart: e, _cachedMeta: n } = i, s = e._stacks || (e._stacks = {}), { iScale: r, vScale: o, index: a } = n, c = r.axis, l = o.axis, u = Bf(r, o, n), h = t.length;
  let f;
  for (let d = 0; d < h; ++d) {
    const p = t[d], { [c]: m, [l]: b } = p, y = p._stacks || (p._stacks = {});
    f = y[l] = Hf(s, u, m), f[a] = b, f._top = Xr(f, o, !0, n.type), f._bottom = Xr(f, o, !1, n.type);
    const x = f._visualValues || (f._visualValues = {});
    x[a] = b;
  }
}
function $n(i, t) {
  const e = i.scales;
  return Object.keys(e).filter((n) => e[n].axis === t).shift();
}
function jf(i, t) {
  return ze(i, {
    active: !1,
    dataset: void 0,
    datasetIndex: t,
    index: t,
    mode: "default",
    type: "dataset"
  });
}
function Wf(i, t, e) {
  return ze(i, {
    active: !1,
    dataIndex: t,
    parsed: void 0,
    raw: void 0,
    element: e,
    index: t,
    mode: "default",
    type: "data"
  });
}
function Ke(i, t) {
  const e = i.controller.index, n = i.vScale && i.vScale.axis;
  if (n) {
    t = t || i._parsed;
    for (const s of t) {
      const r = s._stacks;
      if (!r || r[n] === void 0 || r[n][e] === void 0)
        return;
      delete r[n][e], r[n]._visualValues !== void 0 && r[n]._visualValues[e] !== void 0 && delete r[n]._visualValues[e];
    }
  }
}
const Vn = (i) => i === "reset" || i === "none", qr = (i, t) => t ? i : Object.assign({}, i), Nf = (i, t, e) => i && !t.hidden && t._stacked && {
  keys: Ba(e, !0),
  values: null
};
class ve {
  constructor(t, e) {
    this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.supportsDecimation = !1, this.$context = void 0, this._syncList = [], this.datasetElementType = new.target.datasetElementType, this.dataElementType = new.target.dataElementType, this.initialize();
  }
  initialize() {
    const t = this._cachedMeta;
    this.configure(), this.linkScales(), t._stacked = Nn(t.vScale, t), this.addElements(), this.options.fill && !this.chart.isPluginEnabled("filler") && console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
  }
  updateIndex(t) {
    this.index !== t && Ke(this._cachedMeta), this.index = t;
  }
  linkScales() {
    const t = this.chart, e = this._cachedMeta, n = this.getDataset(), s = (h, f, d, p) => h === "x" ? f : h === "r" ? p : d, r = e.xAxisID = W(n.xAxisID, $n(t, "x")), o = e.yAxisID = W(n.yAxisID, $n(t, "y")), a = e.rAxisID = W(n.rAxisID, $n(t, "r")), c = e.indexAxis, l = e.iAxisID = s(c, r, o, a), u = e.vAxisID = s(c, o, r, a);
    e.xScale = this.getScaleForId(r), e.yScale = this.getScaleForId(o), e.rScale = this.getScaleForId(a), e.iScale = this.getScaleForId(l), e.vScale = this.getScaleForId(u);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(t) {
    return this.chart.scales[t];
  }
  _getOtherScale(t) {
    const e = this._cachedMeta;
    return t === e.iScale ? e.vScale : e.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const t = this._cachedMeta;
    this._data && Pr(this._data, this), t._stacked && Ke(t);
  }
  _dataCheck() {
    const t = this.getDataset(), e = t.data || (t.data = []), n = this._data;
    if (j(e)) {
      const s = this._cachedMeta;
      this._data = If(e, s);
    } else if (n !== e) {
      if (n) {
        Pr(n, this);
        const s = this._cachedMeta;
        Ke(s), s._parsed = [];
      }
      e && Object.isExtensible(e) && jh(e, this), this._syncList = [], this._data = e;
    }
  }
  addElements() {
    const t = this._cachedMeta;
    this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType());
  }
  buildOrUpdateElements(t) {
    const e = this._cachedMeta, n = this.getDataset();
    let s = !1;
    this._dataCheck();
    const r = e._stacked;
    e._stacked = Nn(e.vScale, e), e.stack !== n.stack && (s = !0, Ke(e), e.stack = n.stack), this._resyncElements(t), (s || r !== e._stacked) && (Kr(this, e._parsed), e._stacked = Nn(e.vScale, e));
  }
  configure() {
    const t = this.chart.config, e = t.datasetScopeKeys(this._type), n = t.getOptionScopes(this.getDataset(), e, !0);
    this.options = t.createResolver(n, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {};
  }
  parse(t, e) {
    const { _cachedMeta: n, _data: s } = this, { iScale: r, _stacked: o } = n, a = r.axis;
    let c = t === 0 && e === s.length ? !0 : n._sorted, l = t > 0 && n._parsed[t - 1], u, h, f;
    if (this._parsing === !1)
      n._parsed = s, n._sorted = !0, f = s;
    else {
      Z(s[t]) ? f = this.parseArrayData(n, s, t, e) : j(s[t]) ? f = this.parseObjectData(n, s, t, e) : f = this.parsePrimitiveData(n, s, t, e);
      const d = () => h[a] === null || l && h[a] < l[a];
      for (u = 0; u < e; ++u)
        n._parsed[u + t] = h = f[u], c && (d() && (c = !1), l = h);
      n._sorted = c;
    }
    o && Kr(this, f);
  }
  parsePrimitiveData(t, e, n, s) {
    const { iScale: r, vScale: o } = t, a = r.axis, c = o.axis, l = r.getLabels(), u = r === o, h = new Array(s);
    let f, d, p;
    for (f = 0, d = s; f < d; ++f)
      p = f + n, h[f] = {
        [a]: u || r.parse(l[p], p),
        [c]: o.parse(e[p], p)
      };
    return h;
  }
  parseArrayData(t, e, n, s) {
    const { xScale: r, yScale: o } = t, a = new Array(s);
    let c, l, u, h;
    for (c = 0, l = s; c < l; ++c)
      u = c + n, h = e[u], a[c] = {
        x: r.parse(h[0], u),
        y: o.parse(h[1], u)
      };
    return a;
  }
  parseObjectData(t, e, n, s) {
    const { xScale: r, yScale: o } = t, { xAxisKey: a = "x", yAxisKey: c = "y" } = this._parsing, l = new Array(s);
    let u, h, f, d;
    for (u = 0, h = s; u < h; ++u)
      f = u + n, d = e[f], l[u] = {
        x: r.parse(ne(d, a), f),
        y: o.parse(ne(d, c), f)
      };
    return l;
  }
  getParsed(t) {
    return this._cachedMeta._parsed[t];
  }
  getDataElement(t) {
    return this._cachedMeta.data[t];
  }
  applyStack(t, e, n) {
    const s = this.chart, r = this._cachedMeta, o = e[t.axis], a = {
      keys: Ba(s, !0),
      values: e._stacks[t.axis]._visualValues
    };
    return Yr(a, o, r.index, {
      mode: n
    });
  }
  updateRangeFromParsed(t, e, n, s) {
    const r = n[e.axis];
    let o = r === null ? NaN : r;
    const a = s && n._stacks[e.axis];
    s && a && (s.values = a, o = Yr(s, r, this._cachedMeta.index)), t.min = Math.min(t.min, o), t.max = Math.max(t.max, o);
  }
  getMinMax(t, e) {
    const n = this._cachedMeta, s = n._parsed, r = n._sorted && t === n.iScale, o = s.length, a = this._getOtherScale(t), c = Nf(e, n, this.chart), l = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    }, { min: u, max: h } = zf(a);
    let f, d;
    function p() {
      d = s[f];
      const m = d[a.axis];
      return !Mt(d[t.axis]) || u > m || h < m;
    }
    for (f = 0; f < o && !(!p() && (this.updateRangeFromParsed(l, t, d, c), r)); ++f)
      ;
    if (r) {
      for (f = o - 1; f >= 0; --f)
        if (!p()) {
          this.updateRangeFromParsed(l, t, d, c);
          break;
        }
    }
    return l;
  }
  getAllParsedValues(t) {
    const e = this._cachedMeta._parsed, n = [];
    let s, r, o;
    for (s = 0, r = e.length; s < r; ++s)
      o = e[s][t.axis], Mt(o) && n.push(o);
    return n;
  }
  getMaxOverflow() {
    return !1;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, n = e.iScale, s = e.vScale, r = this.getParsed(t);
    return {
      label: n ? "" + n.getLabelForValue(r[n.axis]) : "",
      value: s ? "" + s.getLabelForValue(r[s.axis]) : ""
    };
  }
  _update(t) {
    const e = this._cachedMeta;
    this.update(t || "default"), e._clip = Ff(W(this.options.clip, Lf(e.xScale, e.yScale, this.getMaxOverflow())));
  }
  update(t) {
  }
  draw() {
    const t = this._ctx, e = this.chart, n = this._cachedMeta, s = n.data || [], r = e.chartArea, o = [], a = this._drawStart || 0, c = this._drawCount || s.length - a, l = this.options.drawActiveElementsOnTop;
    let u;
    for (n.dataset && n.dataset.draw(t, r, a, c), u = a; u < a + c; ++u) {
      const h = s[u];
      h.hidden || (h.active && l ? o.push(h) : h.draw(t, r));
    }
    for (u = 0; u < o.length; ++u)
      o[u].draw(t, r);
  }
  getStyle(t, e) {
    const n = e ? "active" : "default";
    return t === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(n) : this.resolveDataElementOptions(t || 0, n);
  }
  getContext(t, e, n) {
    const s = this.getDataset();
    let r;
    if (t >= 0 && t < this._cachedMeta.data.length) {
      const o = this._cachedMeta.data[t];
      r = o.$context || (o.$context = Wf(this.getContext(), t, o)), r.parsed = this.getParsed(t), r.raw = s.data[t], r.index = r.dataIndex = t;
    } else
      r = this.$context || (this.$context = jf(this.chart.getContext(), this.index)), r.dataset = s, r.index = r.datasetIndex = this.index;
    return r.active = !!e, r.mode = n, r;
  }
  resolveDatasetElementOptions(t) {
    return this._resolveElementOptions(this.datasetElementType.id, t);
  }
  resolveDataElementOptions(t, e) {
    return this._resolveElementOptions(this.dataElementType.id, e, t);
  }
  _resolveElementOptions(t, e = "default", n) {
    const s = e === "active", r = this._cachedDataOpts, o = t + "-" + e, a = r[o], c = this.enableOptionSharing && pi(n);
    if (a)
      return qr(a, c);
    const l = this.chart.config, u = l.datasetElementScopeKeys(this._type, t), h = s ? [
      `${t}Hover`,
      "hover",
      t,
      ""
    ] : [
      t,
      ""
    ], f = l.getOptionScopes(this.getDataset(), u), d = Object.keys(K.elements[t]), p = () => this.getContext(n, s, e), m = l.resolveNamedOptions(f, d, p, h);
    return m.$shared && (m.$shared = c, r[o] = Object.freeze(qr(m, c))), m;
  }
  _resolveAnimations(t, e, n) {
    const s = this.chart, r = this._cachedDataOpts, o = `animation-${e}`, a = r[o];
    if (a)
      return a;
    let c;
    if (s.options.animation !== !1) {
      const u = this.chart.config, h = u.datasetAnimationScopeKeys(this._type, e), f = u.getOptionScopes(this.getDataset(), h);
      c = u.createResolver(f, this.getContext(t, n, e));
    }
    const l = new Ia(s, c && c.animations);
    return c && c._cacheable && (r[o] = Object.freeze(l)), l;
  }
  getSharedOptions(t) {
    if (t.$shared)
      return this._sharedOptions || (this._sharedOptions = Object.assign({}, t));
  }
  includeOptions(t, e) {
    return !e || Vn(t) || this.chart._animationsDisabled;
  }
  _getSharedOptions(t, e) {
    const n = this.resolveDataElementOptions(t, e), s = this._sharedOptions, r = this.getSharedOptions(n), o = this.includeOptions(e, r) || r !== s;
    return this.updateSharedOptions(r, e, n), {
      sharedOptions: r,
      includeOptions: o
    };
  }
  updateElement(t, e, n, s) {
    Vn(s) ? Object.assign(t, n) : this._resolveAnimations(e, s).update(t, n);
  }
  updateSharedOptions(t, e, n) {
    t && !Vn(e) && this._resolveAnimations(void 0, e).update(t, n);
  }
  _setStyle(t, e, n, s) {
    t.active = s;
    const r = this.getStyle(e, s);
    this._resolveAnimations(e, n, s).update(t, {
      options: !s && this.getSharedOptions(r) || r
    });
  }
  removeHoverStyle(t, e, n) {
    this._setStyle(t, n, "active", !1);
  }
  setHoverStyle(t, e, n) {
    this._setStyle(t, n, "active", !0);
  }
  _removeDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !1);
  }
  _setDatasetHoverStyle() {
    const t = this._cachedMeta.dataset;
    t && this._setStyle(t, void 0, "active", !0);
  }
  _resyncElements(t) {
    const e = this._data, n = this._cachedMeta.data;
    for (const [a, c, l] of this._syncList)
      this[a](c, l);
    this._syncList = [];
    const s = n.length, r = e.length, o = Math.min(r, s);
    o && this.parse(0, o), r > s ? this._insertElements(s, r - s, t) : r < s && this._removeElements(r, s - r);
  }
  _insertElements(t, e, n = !0) {
    const s = this._cachedMeta, r = s.data, o = t + e;
    let a;
    const c = (l) => {
      for (l.length += e, a = l.length - 1; a >= o; a--)
        l[a] = l[a - e];
    };
    for (c(r), a = t; a < o; ++a)
      r[a] = new this.dataElementType();
    this._parsing && c(s._parsed), this.parse(t, e), n && this.updateElements(r, t, e, "reset");
  }
  updateElements(t, e, n, s) {
  }
  _removeElements(t, e) {
    const n = this._cachedMeta;
    if (this._parsing) {
      const s = n._parsed.splice(t, e);
      n._stacked && Ke(n, s);
    }
    n.data.splice(t, e);
  }
  _sync(t) {
    if (this._parsing)
      this._syncList.push(t);
    else {
      const [e, n, s] = t;
      this[e](n, s);
    }
    this.chart._dataChanges.push([
      this.index,
      ...t
    ]);
  }
  _onDataPush() {
    const t = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - t,
      t
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(t, e) {
    e && this._sync([
      "_removeElements",
      t,
      e
    ]);
    const n = arguments.length - 2;
    n && this._sync([
      "_insertElements",
      t,
      n
    ]);
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
}
F(ve, "defaults", {}), F(ve, "datasetElementType", null), F(ve, "dataElementType", null);
function $f(i, t) {
  if (!i._cache.$bar) {
    const e = i.getMatchingVisibleMetas(t);
    let n = [];
    for (let s = 0, r = e.length; s < r; s++)
      n = n.concat(e[s].controller.getAllParsedValues(i));
    i._cache.$bar = _a(n.sort((s, r) => s - r));
  }
  return i._cache.$bar;
}
function Vf(i) {
  const t = i.iScale, e = $f(t, i.type);
  let n = t._length, s, r, o, a;
  const c = () => {
    o === 32767 || o === -32768 || (pi(a) && (n = Math.min(n, Math.abs(o - a) || n)), a = o);
  };
  for (s = 0, r = e.length; s < r; ++s)
    o = t.getPixelForValue(e[s]), c();
  for (a = void 0, s = 0, r = t.ticks.length; s < r; ++s)
    o = t.getPixelForTick(s), c();
  return n;
}
function Uf(i, t, e, n) {
  const s = e.barThickness;
  let r, o;
  return U(s) ? (r = t.min * e.categoryPercentage, o = e.barPercentage) : (r = s * n, o = 1), {
    chunk: r / n,
    ratio: o,
    start: t.pixels[i] - r / 2
  };
}
function Yf(i, t, e, n) {
  const s = t.pixels, r = s[i];
  let o = i > 0 ? s[i - 1] : null, a = i < s.length - 1 ? s[i + 1] : null;
  const c = e.categoryPercentage;
  o === null && (o = r - (a === null ? t.end - t.start : a - r)), a === null && (a = r + r - o);
  const l = r - (r - Math.min(o, a)) / 2 * c;
  return {
    chunk: Math.abs(a - o) / 2 * c / n,
    ratio: e.barPercentage,
    start: l
  };
}
function Xf(i, t, e, n) {
  const s = e.parse(i[0], n), r = e.parse(i[1], n), o = Math.min(s, r), a = Math.max(s, r);
  let c = o, l = a;
  Math.abs(o) > Math.abs(a) && (c = a, l = o), t[e.axis] = l, t._custom = {
    barStart: c,
    barEnd: l,
    start: s,
    end: r,
    min: o,
    max: a
  };
}
function za(i, t, e, n) {
  return Z(i) ? Xf(i, t, e, n) : t[e.axis] = e.parse(i, n), t;
}
function Qr(i, t, e, n) {
  const s = i.iScale, r = i.vScale, o = s.getLabels(), a = s === r, c = [];
  let l, u, h, f;
  for (l = e, u = e + n; l < u; ++l)
    f = t[l], h = {}, h[s.axis] = a || s.parse(o[l], l), c.push(za(f, h, r, l));
  return c;
}
function Un(i) {
  return i && i.barStart !== void 0 && i.barEnd !== void 0;
}
function Kf(i, t, e) {
  return i !== 0 ? ee(i) : (t.isHorizontal() ? 1 : -1) * (t.min >= e ? 1 : -1);
}
function qf(i) {
  let t, e, n, s, r;
  return i.horizontal ? (t = i.base > i.x, e = "left", n = "right") : (t = i.base < i.y, e = "bottom", n = "top"), t ? (s = "end", r = "start") : (s = "start", r = "end"), {
    start: e,
    end: n,
    reverse: t,
    top: s,
    bottom: r
  };
}
function Qf(i, t, e, n) {
  let s = t.borderSkipped;
  const r = {};
  if (!s) {
    i.borderSkipped = r;
    return;
  }
  if (s === !0) {
    i.borderSkipped = {
      top: !0,
      right: !0,
      bottom: !0,
      left: !0
    };
    return;
  }
  const { start: o, end: a, reverse: c, top: l, bottom: u } = qf(i);
  s === "middle" && e && (i.enableBorderRadius = !0, (e._top || 0) === n ? s = l : (e._bottom || 0) === n ? s = u : (r[Zr(u, o, a, c)] = !0, s = l)), r[Zr(s, o, a, c)] = !0, i.borderSkipped = r;
}
function Zr(i, t, e, n) {
  return n ? (i = Zf(i, t, e), i = Gr(i, e, t)) : i = Gr(i, t, e), i;
}
function Zf(i, t, e) {
  return i === t ? e : i === e ? t : i;
}
function Gr(i, t, e) {
  return i === "start" ? t : i === "end" ? e : i;
}
function Gf(i, { inflateAmount: t }, e) {
  i.inflateAmount = t === "auto" ? e === 1 ? 0.33 : 0 : t;
}
class rn extends ve {
  parsePrimitiveData(t, e, n, s) {
    return Qr(t, e, n, s);
  }
  parseArrayData(t, e, n, s) {
    return Qr(t, e, n, s);
  }
  parseObjectData(t, e, n, s) {
    const { iScale: r, vScale: o } = t, { xAxisKey: a = "x", yAxisKey: c = "y" } = this._parsing, l = r.axis === "x" ? a : c, u = o.axis === "x" ? a : c, h = [];
    let f, d, p, m;
    for (f = n, d = n + s; f < d; ++f)
      m = e[f], p = {}, p[r.axis] = r.parse(ne(m, l), f), h.push(za(ne(m, u), p, o, f));
    return h;
  }
  updateRangeFromParsed(t, e, n, s) {
    super.updateRangeFromParsed(t, e, n, s);
    const r = n._custom;
    r && e === this._cachedMeta.vScale && (t.min = Math.min(t.min, r.min), t.max = Math.max(t.max, r.max));
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, { iScale: n, vScale: s } = e, r = this.getParsed(t), o = r._custom, a = Un(o) ? "[" + o.start + ", " + o.end + "]" : "" + s.getLabelForValue(r[s.axis]);
    return {
      label: "" + n.getLabelForValue(r[n.axis]),
      value: a
    };
  }
  initialize() {
    this.enableOptionSharing = !0, super.initialize();
    const t = this._cachedMeta;
    t.stack = this.getDataset().stack;
  }
  update(t) {
    const e = this._cachedMeta;
    this.updateElements(e.data, 0, e.data.length, t);
  }
  updateElements(t, e, n, s) {
    const r = s === "reset", { index: o, _cachedMeta: { vScale: a } } = this, c = a.getBasePixel(), l = a.isHorizontal(), u = this._getRuler(), { sharedOptions: h, includeOptions: f } = this._getSharedOptions(e, s);
    for (let d = e; d < e + n; d++) {
      const p = this.getParsed(d), m = r || U(p[a.axis]) ? {
        base: c,
        head: c
      } : this._calculateBarValuePixels(d), b = this._calculateBarIndexPixels(d, u), y = (p._stacks || {})[a.axis], x = {
        horizontal: l,
        base: m.base,
        enableBorderRadius: !y || Un(p._custom) || o === y._top || o === y._bottom,
        x: l ? m.head : b.center,
        y: l ? b.center : m.head,
        height: l ? b.size : Math.abs(m.size),
        width: l ? Math.abs(m.size) : b.size
      };
      f && (x.options = h || this.resolveDataElementOptions(d, t[d].active ? "active" : s));
      const S = x.options || t[d].options;
      Qf(x, S, y, o), Gf(x, S, u.ratio), this.updateElement(t[d], d, x, s);
    }
  }
  _getStacks(t, e) {
    const { iScale: n } = this._cachedMeta, s = n.getMatchingVisibleMetas(this._type).filter((u) => u.controller.options.grouped), r = n.options.stacked, o = [], a = this._cachedMeta.controller.getParsed(e), c = a && a[n.axis], l = (u) => {
      const h = u._parsed.find((d) => d[n.axis] === c), f = h && h[u.vScale.axis];
      if (U(f) || isNaN(f))
        return !0;
    };
    for (const u of s)
      if (!(e !== void 0 && l(u)) && ((r === !1 || o.indexOf(u.stack) === -1 || r === void 0 && u.stack === void 0) && o.push(u.stack), u.index === t))
        break;
    return o.length || o.push(void 0), o;
  }
  _getStackCount(t) {
    return this._getStacks(void 0, t).length;
  }
  _getAxisCount() {
    return this._getAxis().length;
  }
  getFirstScaleIdForIndexAxis() {
    const t = this.chart.scales, e = this.chart.options.indexAxis;
    return Object.keys(t).filter((n) => t[n].axis === e).shift();
  }
  _getAxis() {
    const t = {}, e = this.getFirstScaleIdForIndexAxis();
    for (const n of this.chart.data.datasets)
      t[W(this.chart.options.indexAxis === "x" ? n.xAxisID : n.yAxisID, e)] = !0;
    return Object.keys(t);
  }
  _getStackIndex(t, e, n) {
    const s = this._getStacks(t, n), r = e !== void 0 ? s.indexOf(e) : -1;
    return r === -1 ? s.length - 1 : r;
  }
  _getRuler() {
    const t = this.options, e = this._cachedMeta, n = e.iScale, s = [];
    let r, o;
    for (r = 0, o = e.data.length; r < o; ++r)
      s.push(n.getPixelForValue(this.getParsed(r)[n.axis], r));
    const a = t.barThickness;
    return {
      min: a || Vf(e),
      pixels: s,
      start: n._startPixel,
      end: n._endPixel,
      stackCount: this._getStackCount(),
      scale: n,
      grouped: t.grouped,
      ratio: a ? 1 : t.categoryPercentage * t.barPercentage
    };
  }
  _calculateBarValuePixels(t) {
    const { _cachedMeta: { vScale: e, _stacked: n, index: s }, options: { base: r, minBarLength: o } } = this, a = r || 0, c = this.getParsed(t), l = c._custom, u = Un(l);
    let h = c[e.axis], f = 0, d = n ? this.applyStack(e, c, n) : h, p, m;
    d !== h && (f = d - h, d = h), u && (h = l.barStart, d = l.barEnd - l.barStart, h !== 0 && ee(h) !== ee(l.barEnd) && (f = 0), f += h);
    const b = !U(r) && !u ? r : f;
    let y = e.getPixelForValue(b);
    if (this.chart.getDataVisibility(t) ? p = e.getPixelForValue(f + d) : p = y, m = p - y, Math.abs(m) < o) {
      m = Kf(m, e, a) * o, h === a && (y -= m / 2);
      const x = e.getPixelForDecimal(0), S = e.getPixelForDecimal(1), g = Math.min(x, S), k = Math.max(x, S);
      y = Math.max(Math.min(y, k), g), p = y + m, n && !u && (c._stacks[e.axis]._visualValues[s] = e.getValueForPixel(p) - e.getValueForPixel(y));
    }
    if (y === e.getPixelForValue(a)) {
      const x = ee(m) * e.getLineWidthForValue(a) / 2;
      y += x, m -= x;
    }
    return {
      size: m,
      base: y,
      head: p,
      center: p + m / 2
    };
  }
  _calculateBarIndexPixels(t, e) {
    const n = e.scale, s = this.options, r = s.skipNull, o = W(s.maxBarThickness, 1 / 0);
    let a, c;
    const l = this._getAxisCount();
    if (e.grouped) {
      const u = r ? this._getStackCount(t) : e.stackCount, h = s.barThickness === "flex" ? Yf(t, e, s, u * l) : Uf(t, e, s, u * l), f = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID, d = this._getAxis().indexOf(W(f, this.getFirstScaleIdForIndexAxis())), p = this._getStackIndex(this.index, this._cachedMeta.stack, r ? t : void 0) + d;
      a = h.start + h.chunk * p + h.chunk / 2, c = Math.min(o, h.chunk * h.ratio);
    } else
      a = n.getPixelForValue(this.getParsed(t)[n.axis], t), c = Math.min(o, e.min * e.ratio);
    return {
      base: a - c / 2,
      head: a + c / 2,
      center: a,
      size: c
    };
  }
  draw() {
    const t = this._cachedMeta, e = t.vScale, n = t.data, s = n.length;
    let r = 0;
    for (; r < s; ++r)
      this.getParsed(r)[e.axis] !== null && !n[r].hidden && n[r].draw(this._ctx);
  }
}
F(rn, "id", "bar"), F(rn, "defaults", {
  datasetElementType: !1,
  dataElementType: "bar",
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: !0,
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "base",
        "width",
        "height"
      ]
    }
  }
}), F(rn, "overrides", {
  scales: {
    _index_: {
      type: "category",
      offset: !0,
      grid: {
        offset: !0
      }
    },
    _value_: {
      type: "linear",
      beginAtZero: !0
    }
  }
});
function Jf(i, t, e) {
  let n = 1, s = 1, r = 0, o = 0;
  if (t < pt) {
    const a = i, c = a + t, l = Math.cos(a), u = Math.sin(a), h = Math.cos(c), f = Math.sin(c), d = (S, g, k) => us(S, a, c, !0) ? 1 : Math.max(g, g * e, k, k * e), p = (S, g, k) => us(S, a, c, !0) ? -1 : Math.min(g, g * e, k, k * e), m = d(0, l, h), b = d(gt, u, f), y = p(G, l, h), x = p(G + gt, u, f);
    n = (m - y) / 2, s = (b - x) / 2, r = -(m + y) / 2, o = -(b + x) / 2;
  }
  return {
    ratioX: n,
    ratioY: s,
    offsetX: r,
    offsetY: o
  };
}
class ti extends ve {
  constructor(t, e) {
    super(t, e), this.enableOptionSharing = !0, this.innerRadius = void 0, this.outerRadius = void 0, this.offsetX = void 0, this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(t, e) {
    const n = this.getDataset().data, s = this._cachedMeta;
    if (this._parsing === !1)
      s._parsed = n;
    else {
      let r = (c) => +n[c];
      if (j(n[t])) {
        const { key: c = "value" } = this._parsing;
        r = (l) => +ne(n[l], c);
      }
      let o, a;
      for (o = t, a = t + e; o < a; ++o)
        s._parsed[o] = r(o);
    }
  }
  _getRotation() {
    return Ft(this.options.rotation - 90);
  }
  _getCircumference() {
    return Ft(this.options.circumference);
  }
  _getRotationExtents() {
    let t = pt, e = -pt;
    for (let n = 0; n < this.chart.data.datasets.length; ++n)
      if (this.chart.isDatasetVisible(n) && this.chart.getDatasetMeta(n).type === this._type) {
        const s = this.chart.getDatasetMeta(n).controller, r = s._getRotation(), o = s._getCircumference();
        t = Math.min(t, r), e = Math.max(e, r + o);
      }
    return {
      rotation: t,
      circumference: e - t
    };
  }
  update(t) {
    const e = this.chart, { chartArea: n } = e, s = this._cachedMeta, r = s.data, o = this.getMaxBorderWidth() + this.getMaxOffset(r) + this.options.spacing, a = Math.max((Math.min(n.width, n.height) - o) / 2, 0), c = Math.min(Sh(this.options.cutout, a), 1), l = this._getRingWeight(this.index), { circumference: u, rotation: h } = this._getRotationExtents(), { ratioX: f, ratioY: d, offsetX: p, offsetY: m } = Jf(h, u, c), b = (n.width - o) / f, y = (n.height - o) / d, x = Math.max(Math.min(b, y) / 2, 0), S = ba(this.options.radius, x), g = Math.max(S * c, 0), k = (S - g) / this._getVisibleDatasetWeightTotal();
    this.offsetX = p * S, this.offsetY = m * S, s.total = this.calculateTotal(), this.outerRadius = S - k * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - k * l, 0), this.updateElements(r, 0, r.length, t);
  }
  _circumference(t, e) {
    const n = this.options, s = this._cachedMeta, r = this._getCircumference();
    return e && n.animation.animateRotate || !this.chart.getDataVisibility(t) || s._parsed[t] === null || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * r / pt);
  }
  updateElements(t, e, n, s) {
    const r = s === "reset", o = this.chart, a = o.chartArea, l = o.options.animation, u = (a.left + a.right) / 2, h = (a.top + a.bottom) / 2, f = r && l.animateScale, d = f ? 0 : this.innerRadius, p = f ? 0 : this.outerRadius, { sharedOptions: m, includeOptions: b } = this._getSharedOptions(e, s);
    let y = this._getRotation(), x;
    for (x = 0; x < e; ++x)
      y += this._circumference(x, r);
    for (x = e; x < e + n; ++x) {
      const S = this._circumference(x, r), g = t[x], k = {
        x: u + this.offsetX,
        y: h + this.offsetY,
        startAngle: y,
        endAngle: y + S,
        circumference: S,
        outerRadius: p,
        innerRadius: d
      };
      b && (k.options = m || this.resolveDataElementOptions(x, g.active ? "active" : s)), y += S, this.updateElement(g, x, k, s);
    }
  }
  calculateTotal() {
    const t = this._cachedMeta, e = t.data;
    let n = 0, s;
    for (s = 0; s < e.length; s++) {
      const r = t._parsed[s];
      r !== null && !isNaN(r) && this.chart.getDataVisibility(s) && !e[s].hidden && (n += Math.abs(r));
    }
    return n;
  }
  calculateCircumference(t) {
    const e = this._cachedMeta.total;
    return e > 0 && !isNaN(t) ? pt * (Math.abs(t) / e) : 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, n = this.chart, s = n.data.labels || [], r = Cn(e._parsed[t], n.options.locale);
    return {
      label: s[t] || "",
      value: r
    };
  }
  getMaxBorderWidth(t) {
    let e = 0;
    const n = this.chart;
    let s, r, o, a, c;
    if (!t) {
      for (s = 0, r = n.data.datasets.length; s < r; ++s)
        if (n.isDatasetVisible(s)) {
          o = n.getDatasetMeta(s), t = o.data, a = o.controller;
          break;
        }
    }
    if (!t)
      return 0;
    for (s = 0, r = t.length; s < r; ++s)
      c = a.resolveDataElementOptions(s), c.borderAlign !== "inner" && (e = Math.max(e, c.borderWidth || 0, c.hoverBorderWidth || 0));
    return e;
  }
  getMaxOffset(t) {
    let e = 0;
    for (let n = 0, s = t.length; n < s; ++n) {
      const r = this.resolveDataElementOptions(n);
      e = Math.max(e, r.offset || 0, r.hoverOffset || 0);
    }
    return e;
  }
  _getRingWeightOffset(t) {
    let e = 0;
    for (let n = 0; n < t; ++n)
      this.chart.isDatasetVisible(n) && (e += this._getRingWeight(n));
    return e;
  }
  _getRingWeight(t) {
    return Math.max(W(this.chart.data.datasets[t].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
}
F(ti, "id", "doughnut"), F(ti, "defaults", {
  datasetElementType: !1,
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !1
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "circumference",
        "endAngle",
        "innerRadius",
        "outerRadius",
        "startAngle",
        "x",
        "y",
        "offset",
        "borderWidth",
        "spacing"
      ]
    }
  },
  cutout: "50%",
  rotation: 0,
  circumference: 360,
  radius: "100%",
  spacing: 0,
  indexAxis: "r"
}), F(ti, "descriptors", {
  _scriptable: (t) => t !== "spacing",
  _indexable: (t) => t !== "spacing" && !t.startsWith("borderDash") && !t.startsWith("hoverBorderDash")
}), F(ti, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(t) {
          const e = t.data;
          if (e.labels.length && e.datasets.length) {
            const { labels: { pointStyle: n, color: s } } = t.legend.options;
            return e.labels.map((r, o) => {
              const c = t.getDatasetMeta(0).controller.getStyle(o);
              return {
                text: r,
                fillStyle: c.backgroundColor,
                strokeStyle: c.borderColor,
                fontColor: s,
                lineWidth: c.borderWidth,
                pointStyle: n,
                hidden: !t.getDataVisibility(o),
                index: o
              };
            });
          }
          return [];
        }
      },
      onClick(t, e, n) {
        n.chart.toggleDataVisibility(e.index), n.chart.update();
      }
    }
  }
});
class on extends ve {
  constructor(t, e) {
    super(t, e), this.innerRadius = void 0, this.outerRadius = void 0;
  }
  getLabelAndValue(t) {
    const e = this._cachedMeta, n = this.chart, s = n.data.labels || [], r = Cn(e._parsed[t].r, n.options.locale);
    return {
      label: s[t] || "",
      value: r
    };
  }
  parseObjectData(t, e, n, s) {
    return bf.bind(this)(t, e, n, s);
  }
  update(t) {
    const e = this._cachedMeta.data;
    this._updateRadius(), this.updateElements(e, 0, e.length, t);
  }
  getMinMax() {
    const t = this._cachedMeta, e = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    };
    return t.data.forEach((n, s) => {
      const r = this.getParsed(s).r;
      !isNaN(r) && this.chart.getDataVisibility(s) && (r < e.min && (e.min = r), r > e.max && (e.max = r));
    }), e;
  }
  _updateRadius() {
    const t = this.chart, e = t.chartArea, n = t.options, s = Math.min(e.right - e.left, e.bottom - e.top), r = Math.max(s / 2, 0), o = Math.max(n.cutoutPercentage ? r / 100 * n.cutoutPercentage : 1, 0), a = (r - o) / t.getVisibleDatasetCount();
    this.outerRadius = r - a * this.index, this.innerRadius = this.outerRadius - a;
  }
  updateElements(t, e, n, s) {
    const r = s === "reset", o = this.chart, c = o.options.animation, l = this._cachedMeta.rScale, u = l.xCenter, h = l.yCenter, f = l.getIndexAngle(0) - 0.5 * G;
    let d = f, p;
    const m = 360 / this.countVisibleElements();
    for (p = 0; p < e; ++p)
      d += this._computeAngle(p, s, m);
    for (p = e; p < e + n; p++) {
      const b = t[p];
      let y = d, x = d + this._computeAngle(p, s, m), S = o.getDataVisibility(p) ? l.getDistanceFromCenterForValue(this.getParsed(p).r) : 0;
      d = x, r && (c.animateScale && (S = 0), c.animateRotate && (y = x = f));
      const g = {
        x: u,
        y: h,
        innerRadius: 0,
        outerRadius: S,
        startAngle: y,
        endAngle: x,
        options: this.resolveDataElementOptions(p, b.active ? "active" : s)
      };
      this.updateElement(b, p, g, s);
    }
  }
  countVisibleElements() {
    const t = this._cachedMeta;
    let e = 0;
    return t.data.forEach((n, s) => {
      !isNaN(this.getParsed(s).r) && this.chart.getDataVisibility(s) && e++;
    }), e;
  }
  _computeAngle(t, e, n) {
    return this.chart.getDataVisibility(t) ? Ft(this.resolveDataElementOptions(t, e).angle || n) : 0;
  }
}
F(on, "id", "polarArea"), F(on, "defaults", {
  dataElementType: "arc",
  animation: {
    animateRotate: !0,
    animateScale: !0
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "startAngle",
        "endAngle",
        "innerRadius",
        "outerRadius"
      ]
    }
  },
  indexAxis: "r",
  startAngle: 0
}), F(on, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(t) {
          const e = t.data;
          if (e.labels.length && e.datasets.length) {
            const { labels: { pointStyle: n, color: s } } = t.legend.options;
            return e.labels.map((r, o) => {
              const c = t.getDatasetMeta(0).controller.getStyle(o);
              return {
                text: r,
                fillStyle: c.backgroundColor,
                strokeStyle: c.borderColor,
                fontColor: s,
                lineWidth: c.borderWidth,
                pointStyle: n,
                hidden: !t.getDataVisibility(o),
                index: o
              };
            });
          }
          return [];
        }
      },
      onClick(t, e, n) {
        n.chart.toggleDataVisibility(e.index), n.chart.update();
      }
    }
  },
  scales: {
    r: {
      type: "radialLinear",
      angleLines: {
        display: !1
      },
      beginAtZero: !0,
      grid: {
        circular: !0
      },
      pointLabels: {
        display: !1
      },
      startAngle: 0
    }
  }
});
function fe() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
class Xs {
  constructor(t) {
    F(this, "options");
    this.options = t || {};
  }
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(t) {
    Object.assign(Xs.prototype, t);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return fe();
  }
  parse() {
    return fe();
  }
  format() {
    return fe();
  }
  add() {
    return fe();
  }
  diff() {
    return fe();
  }
  startOf() {
    return fe();
  }
  endOf() {
    return fe();
  }
}
var td = {
  _date: Xs
};
function ed(i, t, e, n) {
  const { controller: s, data: r, _sorted: o } = i, a = s._cachedMeta.iScale, c = i.dataset && i.dataset.options ? i.dataset.options.spanGaps : null;
  if (a && t === a.axis && t !== "r" && o && r.length) {
    const l = a._reversePixels ? zh : hs;
    if (n) {
      if (s._sharedOptions) {
        const u = r[0], h = typeof u.getRange == "function" && u.getRange(t);
        if (h) {
          const f = l(r, t, e - h), d = l(r, t, e + h);
          return {
            lo: f.lo,
            hi: d.hi
          };
        }
      }
    } else {
      const u = l(r, t, e);
      if (c) {
        const { vScale: h } = s._cachedMeta, { _parsed: f } = i, d = f.slice(0, u.lo + 1).reverse().findIndex((m) => !U(m[h.axis]));
        u.lo -= Math.max(0, d);
        const p = f.slice(u.hi).findIndex((m) => !U(m[h.axis]));
        u.hi += Math.max(0, p);
      }
      return u;
    }
  }
  return {
    lo: 0,
    hi: r.length - 1
  };
}
function En(i, t, e, n, s) {
  const r = i.getSortedVisibleDatasetMetas(), o = e[t];
  for (let a = 0, c = r.length; a < c; ++a) {
    const { index: l, data: u } = r[a], { lo: h, hi: f } = ed(r[a], t, o, s);
    for (let d = h; d <= f; ++d) {
      const p = u[d];
      p.skip || n(p, l, d);
    }
  }
}
function id(i) {
  const t = i.indexOf("x") !== -1, e = i.indexOf("y") !== -1;
  return function(n, s) {
    const r = t ? Math.abs(n.x - s.x) : 0, o = e ? Math.abs(n.y - s.y) : 0;
    return Math.sqrt(Math.pow(r, 2) + Math.pow(o, 2));
  };
}
function Yn(i, t, e, n, s) {
  const r = [];
  return !s && !i.isPointInArea(t) || En(i, e, t, function(a, c, l) {
    !s && !Oa(a, i.chartArea, 0) || a.inRange(t.x, t.y, n) && r.push({
      element: a,
      datasetIndex: c,
      index: l
    });
  }, !0), r;
}
function nd(i, t, e, n) {
  let s = [];
  function r(o, a, c) {
    const { startAngle: l, endAngle: u } = o.getProps([
      "startAngle",
      "endAngle"
    ], n), { angle: h } = Fh(o, {
      x: t.x,
      y: t.y
    });
    us(h, l, u) && s.push({
      element: o,
      datasetIndex: a,
      index: c
    });
  }
  return En(i, e, t, r), s;
}
function sd(i, t, e, n, s, r) {
  let o = [];
  const a = id(e);
  let c = Number.POSITIVE_INFINITY;
  function l(u, h, f) {
    const d = u.inRange(t.x, t.y, s);
    if (n && !d)
      return;
    const p = u.getCenterPoint(s);
    if (!(!!r || i.isPointInArea(p)) && !d)
      return;
    const b = a(t, p);
    b < c ? (o = [
      {
        element: u,
        datasetIndex: h,
        index: f
      }
    ], c = b) : b === c && o.push({
      element: u,
      datasetIndex: h,
      index: f
    });
  }
  return En(i, e, t, l), o;
}
function Xn(i, t, e, n, s, r) {
  return !r && !i.isPointInArea(t) ? [] : e === "r" && !n ? nd(i, t, e, s) : sd(i, t, e, n, s, r);
}
function Jr(i, t, e, n, s) {
  const r = [], o = e === "x" ? "inXRange" : "inYRange";
  let a = !1;
  return En(i, e, t, (c, l, u) => {
    c[o] && c[o](t[e], s) && (r.push({
      element: c,
      datasetIndex: l,
      index: u
    }), a = a || c.inRange(t.x, t.y, s));
  }), n && !a ? [] : r;
}
var rd = {
  modes: {
    index(i, t, e, n) {
      const s = pe(t, i), r = e.axis || "x", o = e.includeInvisible || !1, a = e.intersect ? Yn(i, s, r, n, o) : Xn(i, s, r, !1, n, o), c = [];
      return a.length ? (i.getSortedVisibleDatasetMetas().forEach((l) => {
        const u = a[0].index, h = l.data[u];
        h && !h.skip && c.push({
          element: h,
          datasetIndex: l.index,
          index: u
        });
      }), c) : [];
    },
    dataset(i, t, e, n) {
      const s = pe(t, i), r = e.axis || "xy", o = e.includeInvisible || !1;
      let a = e.intersect ? Yn(i, s, r, n, o) : Xn(i, s, r, !1, n, o);
      if (a.length > 0) {
        const c = a[0].datasetIndex, l = i.getDatasetMeta(c).data;
        a = [];
        for (let u = 0; u < l.length; ++u)
          a.push({
            element: l[u],
            datasetIndex: c,
            index: u
          });
      }
      return a;
    },
    point(i, t, e, n) {
      const s = pe(t, i), r = e.axis || "xy", o = e.includeInvisible || !1;
      return Yn(i, s, r, n, o);
    },
    nearest(i, t, e, n) {
      const s = pe(t, i), r = e.axis || "xy", o = e.includeInvisible || !1;
      return Xn(i, s, r, e.intersect, n, o);
    },
    x(i, t, e, n) {
      const s = pe(t, i);
      return Jr(i, s, "x", e.intersect, n);
    },
    y(i, t, e, n) {
      const s = pe(t, i);
      return Jr(i, s, "y", e.intersect, n);
    }
  }
};
const Ha = [
  "left",
  "top",
  "right",
  "bottom"
];
function qe(i, t) {
  return i.filter((e) => e.pos === t);
}
function to(i, t) {
  return i.filter((e) => Ha.indexOf(e.pos) === -1 && e.box.axis === t);
}
function Qe(i, t) {
  return i.sort((e, n) => {
    const s = t ? n : e, r = t ? e : n;
    return s.weight === r.weight ? s.index - r.index : s.weight - r.weight;
  });
}
function od(i) {
  const t = [];
  let e, n, s, r, o, a;
  for (e = 0, n = (i || []).length; e < n; ++e)
    s = i[e], { position: r, options: { stack: o, stackWeight: a = 1 } } = s, t.push({
      index: e,
      box: s,
      pos: r,
      horizontal: s.isHorizontal(),
      weight: s.weight,
      stack: o && r + o,
      stackWeight: a
    });
  return t;
}
function ad(i) {
  const t = {};
  for (const e of i) {
    const { stack: n, pos: s, stackWeight: r } = e;
    if (!n || !Ha.includes(s))
      continue;
    const o = t[n] || (t[n] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    o.count++, o.weight += r;
  }
  return t;
}
function cd(i, t) {
  const e = ad(i), { vBoxMaxWidth: n, hBoxMaxHeight: s } = t;
  let r, o, a;
  for (r = 0, o = i.length; r < o; ++r) {
    a = i[r];
    const { fullSize: c } = a.box, l = e[a.stack], u = l && a.stackWeight / l.weight;
    a.horizontal ? (a.width = u ? u * n : c && t.availableWidth, a.height = s) : (a.width = n, a.height = u ? u * s : c && t.availableHeight);
  }
  return e;
}
function ld(i) {
  const t = od(i), e = Qe(t.filter((l) => l.box.fullSize), !0), n = Qe(qe(t, "left"), !0), s = Qe(qe(t, "right")), r = Qe(qe(t, "top"), !0), o = Qe(qe(t, "bottom")), a = to(t, "x"), c = to(t, "y");
  return {
    fullSize: e,
    leftAndTop: n.concat(r),
    rightAndBottom: s.concat(c).concat(o).concat(a),
    chartArea: qe(t, "chartArea"),
    vertical: n.concat(s).concat(c),
    horizontal: r.concat(o).concat(a)
  };
}
function eo(i, t, e, n) {
  return Math.max(i[e], t[e]) + Math.max(i[n], t[n]);
}
function ja(i, t) {
  i.top = Math.max(i.top, t.top), i.left = Math.max(i.left, t.left), i.bottom = Math.max(i.bottom, t.bottom), i.right = Math.max(i.right, t.right);
}
function ud(i, t, e, n) {
  const { pos: s, box: r } = e, o = i.maxPadding;
  if (!j(s)) {
    e.size && (i[s] -= e.size);
    const h = n[e.stack] || {
      size: 0,
      count: 1
    };
    h.size = Math.max(h.size, e.horizontal ? r.height : r.width), e.size = h.size / h.count, i[s] += e.size;
  }
  r.getPadding && ja(o, r.getPadding());
  const a = Math.max(0, t.outerWidth - eo(o, i, "left", "right")), c = Math.max(0, t.outerHeight - eo(o, i, "top", "bottom")), l = a !== i.w, u = c !== i.h;
  return i.w = a, i.h = c, e.horizontal ? {
    same: l,
    other: u
  } : {
    same: u,
    other: l
  };
}
function hd(i) {
  const t = i.maxPadding;
  function e(n) {
    const s = Math.max(t[n] - i[n], 0);
    return i[n] += s, s;
  }
  i.y += e("top"), i.x += e("left"), e("right"), e("bottom");
}
function fd(i, t) {
  const e = t.maxPadding;
  function n(s) {
    const r = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    return s.forEach((o) => {
      r[o] = Math.max(t[o], e[o]);
    }), r;
  }
  return n(i ? [
    "left",
    "right"
  ] : [
    "top",
    "bottom"
  ]);
}
function ei(i, t, e, n) {
  const s = [];
  let r, o, a, c, l, u;
  for (r = 0, o = i.length, l = 0; r < o; ++r) {
    a = i[r], c = a.box, c.update(a.width || t.w, a.height || t.h, fd(a.horizontal, t));
    const { same: h, other: f } = ud(t, e, a, n);
    l |= h && s.length, u = u || f, c.fullSize || s.push(a);
  }
  return l && ei(s, t, e, n) || u;
}
function Ui(i, t, e, n, s) {
  i.top = e, i.left = t, i.right = t + n, i.bottom = e + s, i.width = n, i.height = s;
}
function io(i, t, e, n) {
  const s = e.padding;
  let { x: r, y: o } = t;
  for (const a of i) {
    const c = a.box, l = n[a.stack] || {
      placed: 0,
      weight: 1
    }, u = a.stackWeight / l.weight || 1;
    if (a.horizontal) {
      const h = t.w * u, f = l.size || c.height;
      pi(l.start) && (o = l.start), c.fullSize ? Ui(c, s.left, o, e.outerWidth - s.right - s.left, f) : Ui(c, t.left + l.placed, o, h, f), l.start = o, l.placed += h, o = c.bottom;
    } else {
      const h = t.h * u, f = l.size || c.width;
      pi(l.start) && (r = l.start), c.fullSize ? Ui(c, r, s.top, f, e.outerHeight - s.bottom - s.top) : Ui(c, r, t.top + l.placed, f, h), l.start = r, l.placed += h, r = c.right;
    }
  }
  t.x = r, t.y = o;
}
var _t = {
  addBox(i, t) {
    i.boxes || (i.boxes = []), t.fullSize = t.fullSize || !1, t.position = t.position || "top", t.weight = t.weight || 0, t._layers = t._layers || function() {
      return [
        {
          z: 0,
          draw(e) {
            t.draw(e);
          }
        }
      ];
    }, i.boxes.push(t);
  },
  removeBox(i, t) {
    const e = i.boxes ? i.boxes.indexOf(t) : -1;
    e !== -1 && i.boxes.splice(e, 1);
  },
  configure(i, t, e) {
    t.fullSize = e.fullSize, t.position = e.position, t.weight = e.weight;
  },
  update(i, t, e, n) {
    if (!i)
      return;
    const s = Ot(i.options.layout.padding), r = Math.max(t - s.width, 0), o = Math.max(e - s.height, 0), a = ld(i.boxes), c = a.vertical, l = a.horizontal;
    V(i.boxes, (m) => {
      typeof m.beforeLayout == "function" && m.beforeLayout();
    });
    const u = c.reduce((m, b) => b.box.options && b.box.options.display === !1 ? m : m + 1, 0) || 1, h = Object.freeze({
      outerWidth: t,
      outerHeight: e,
      padding: s,
      availableWidth: r,
      availableHeight: o,
      vBoxMaxWidth: r / 2 / u,
      hBoxMaxHeight: o / 2
    }), f = Object.assign({}, s);
    ja(f, Ot(n));
    const d = Object.assign({
      maxPadding: f,
      w: r,
      h: o,
      x: s.left,
      y: s.top
    }, s), p = cd(c.concat(l), h);
    ei(a.fullSize, d, h, p), ei(c, d, h, p), ei(l, d, h, p) && ei(c, d, h, p), hd(d), io(a.leftAndTop, d, h, p), d.x += d.w, d.y += d.h, io(a.rightAndBottom, d, h, p), i.chartArea = {
      left: d.left,
      top: d.top,
      right: d.left + d.w,
      bottom: d.top + d.h,
      height: d.h,
      width: d.w
    }, V(a.chartArea, (m) => {
      const b = m.box;
      Object.assign(b, i.chartArea), b.update(d.w, d.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
class Wa {
  acquireContext(t, e) {
  }
  releaseContext(t) {
    return !1;
  }
  addEventListener(t, e, n) {
  }
  removeEventListener(t, e, n) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(t, e, n, s) {
    return e = Math.max(0, e || t.width), n = n || t.height, {
      width: e,
      height: Math.max(0, s ? Math.floor(e / s) : n)
    };
  }
  isAttached(t) {
    return !0;
  }
  updateConfig(t) {
  }
}
class dd extends Wa {
  acquireContext(t) {
    return t && t.getContext && t.getContext("2d") || null;
  }
  updateConfig(t) {
    t.options.animation = !1;
  }
}
const an = "$chartjs", pd = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
}, no = (i) => i === null || i === "";
function gd(i, t) {
  const e = i.style, n = i.getAttribute("height"), s = i.getAttribute("width");
  if (i[an] = {
    initial: {
      height: n,
      width: s,
      style: {
        display: e.display,
        height: e.height,
        width: e.width
      }
    }
  }, e.display = e.display || "block", e.boxSizing = e.boxSizing || "border-box", no(s)) {
    const r = $r(i, "width");
    r !== void 0 && (i.width = r);
  }
  if (no(n))
    if (i.style.height === "")
      i.height = i.width / (t || 2);
    else {
      const r = $r(i, "height");
      r !== void 0 && (i.height = r);
    }
  return i;
}
const Na = kf ? {
  passive: !0
} : !1;
function md(i, t, e) {
  i && i.addEventListener(t, e, Na);
}
function bd(i, t, e) {
  i && i.canvas && i.canvas.removeEventListener(t, e, Na);
}
function vd(i, t) {
  const e = pd[i.type] || i.type, { x: n, y: s } = pe(i, t);
  return {
    type: e,
    chart: t,
    native: i,
    x: n !== void 0 ? n : null,
    y: s !== void 0 ? s : null
  };
}
function xn(i, t) {
  for (const e of i)
    if (e === t || e.contains(t))
      return !0;
}
function yd(i, t, e) {
  const n = i.canvas, s = new MutationObserver((r) => {
    let o = !1;
    for (const a of r)
      o = o || xn(a.addedNodes, n), o = o && !xn(a.removedNodes, n);
    o && e();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
function xd(i, t, e) {
  const n = i.canvas, s = new MutationObserver((r) => {
    let o = !1;
    for (const a of r)
      o = o || xn(a.removedNodes, n), o = o && !xn(a.addedNodes, n);
    o && e();
  });
  return s.observe(document, {
    childList: !0,
    subtree: !0
  }), s;
}
const mi = /* @__PURE__ */ new Map();
let so = 0;
function $a() {
  const i = window.devicePixelRatio;
  i !== so && (so = i, mi.forEach((t, e) => {
    e.currentDevicePixelRatio !== i && t();
  }));
}
function _d(i, t) {
  mi.size || window.addEventListener("resize", $a), mi.set(i, t);
}
function wd(i) {
  mi.delete(i), mi.size || window.removeEventListener("resize", $a);
}
function Sd(i, t, e) {
  const n = i.canvas, s = n && Ys(n);
  if (!s)
    return;
  const r = Sa((a, c) => {
    const l = s.clientWidth;
    e(a, c), l < s.clientWidth && e();
  }, window), o = new ResizeObserver((a) => {
    const c = a[0], l = c.contentRect.width, u = c.contentRect.height;
    l === 0 && u === 0 || r(l, u);
  });
  return o.observe(s), _d(i, r), o;
}
function Kn(i, t, e) {
  e && e.disconnect(), t === "resize" && wd(i);
}
function kd(i, t, e) {
  const n = i.canvas, s = Sa((r) => {
    i.ctx !== null && e(vd(r, i));
  }, i);
  return md(n, t, s), s;
}
class Ad extends Wa {
  acquireContext(t, e) {
    const n = t && t.getContext && t.getContext("2d");
    return n && n.canvas === t ? (gd(t, e), n) : null;
  }
  releaseContext(t) {
    const e = t.canvas;
    if (!e[an])
      return !1;
    const n = e[an].initial;
    [
      "height",
      "width"
    ].forEach((r) => {
      const o = n[r];
      U(o) ? e.removeAttribute(r) : e.setAttribute(r, o);
    });
    const s = n.style || {};
    return Object.keys(s).forEach((r) => {
      e.style[r] = s[r];
    }), e.width = e.width, delete e[an], !0;
  }
  addEventListener(t, e, n) {
    this.removeEventListener(t, e);
    const s = t.$proxies || (t.$proxies = {}), o = {
      attach: yd,
      detach: xd,
      resize: Sd
    }[e] || kd;
    s[e] = o(t, e, n);
  }
  removeEventListener(t, e) {
    const n = t.$proxies || (t.$proxies = {}), s = n[e];
    if (!s)
      return;
    ({
      attach: Kn,
      detach: Kn,
      resize: Kn
    }[e] || bd)(t, e, s), n[e] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(t, e, n, s) {
    return Sf(t, e, n, s);
  }
  isAttached(t) {
    const e = t && Ys(t);
    return !!(e && e.isConnected);
  }
}
function Md(i) {
  return !Us() || typeof OffscreenCanvas < "u" && i instanceof OffscreenCanvas ? dd : Ad;
}
var Ji;
let He = (Ji = class {
  constructor() {
    F(this, "x");
    F(this, "y");
    F(this, "active", !1);
    F(this, "options");
    F(this, "$animations");
  }
  tooltipPosition(t) {
    const { x: e, y: n } = this.getProps([
      "x",
      "y"
    ], t);
    return {
      x: e,
      y: n
    };
  }
  hasValue() {
    return bn(this.x) && bn(this.y);
  }
  getProps(t, e) {
    const n = this.$animations;
    if (!e || !n)
      return this;
    const s = {};
    return t.forEach((r) => {
      s[r] = n[r] && n[r].active() ? n[r]._to : this[r];
    }), s;
  }
}, F(Ji, "defaults", {}), F(Ji, "defaultRoutes"), Ji);
function Od(i, t) {
  const e = i.options.ticks, n = Dd(i), s = Math.min(e.maxTicksLimit || n, n), r = e.major.enabled ? Td(t) : [], o = r.length, a = r[0], c = r[o - 1], l = [];
  if (o > s)
    return Ed(t, l, r, o / s), l;
  const u = Cd(r, t, s);
  if (o > 0) {
    let h, f;
    const d = o > 1 ? Math.round((c - a) / (o - 1)) : null;
    for (Yi(t, l, u, U(d) ? 0 : a - d, a), h = 0, f = o - 1; h < f; h++)
      Yi(t, l, u, r[h], r[h + 1]);
    return Yi(t, l, u, c, U(d) ? t.length : c + d), l;
  }
  return Yi(t, l, u), l;
}
function Dd(i) {
  const t = i.options.offset, e = i._tickSize(), n = i._length / e + (t ? 0 : 1), s = i._maxLength / e;
  return Math.floor(Math.min(n, s));
}
function Cd(i, t, e) {
  const n = Pd(i), s = t.length / e;
  if (!n)
    return Math.max(s, 1);
  const r = Th(n);
  for (let o = 0, a = r.length - 1; o < a; o++) {
    const c = r[o];
    if (c > s)
      return c;
  }
  return Math.max(s, 1);
}
function Td(i) {
  const t = [];
  let e, n;
  for (e = 0, n = i.length; e < n; e++)
    i[e].major && t.push(e);
  return t;
}
function Ed(i, t, e, n) {
  let s = 0, r = e[0], o;
  for (n = Math.ceil(n), o = 0; o < i.length; o++)
    o === r && (t.push(i[o]), s++, r = e[s * n]);
}
function Yi(i, t, e, n, s) {
  const r = W(n, 0), o = Math.min(W(s, i.length), i.length);
  let a = 0, c, l, u;
  for (e = Math.ceil(e), s && (c = s - n, e = c / Math.floor(c / e)), u = r; u < 0; )
    a++, u = Math.round(r + a * e);
  for (l = Math.max(r, 0); l < o; l++)
    l === u && (t.push(i[l]), a++, u = Math.round(r + a * e));
}
function Pd(i) {
  const t = i.length;
  let e, n;
  if (t < 2)
    return !1;
  for (n = i[0], e = 1; e < t; ++e)
    if (i[e] - i[e - 1] !== n)
      return !1;
  return n;
}
const Rd = (i) => i === "left" ? "right" : i === "right" ? "left" : i, ro = (i, t, e) => t === "top" || t === "left" ? i[t] + e : i[t] - e, oo = (i, t) => Math.min(t || i, i);
function ao(i, t) {
  const e = [], n = i.length / t, s = i.length;
  let r = 0;
  for (; r < s; r += n)
    e.push(i[Math.floor(r)]);
  return e;
}
function Ld(i, t, e) {
  const n = i.ticks.length, s = Math.min(t, n - 1), r = i._startPixel, o = i._endPixel, a = 1e-6;
  let c = i.getPixelForTick(s), l;
  if (!(e && (n === 1 ? l = Math.max(c - r, o - c) : t === 0 ? l = (i.getPixelForTick(1) - c) / 2 : l = (c - i.getPixelForTick(s - 1)) / 2, c += s < t ? l : -l, c < r - a || c > o + a)))
    return c;
}
function Fd(i, t) {
  V(i, (e) => {
    const n = e.gc, s = n.length / 2;
    let r;
    if (s > t) {
      for (r = 0; r < s; ++r)
        delete e.data[n[r]];
      n.splice(0, s);
    }
  });
}
function Ze(i) {
  return i.drawTicks ? i.tickLength : 0;
}
function co(i, t) {
  if (!i.display)
    return 0;
  const e = rt(i.font, t), n = Ot(i.padding);
  return (Z(i.text) ? i.text.length : 1) * e.lineHeight + n.height;
}
function Id(i, t) {
  return ze(i, {
    scale: t,
    type: "scale"
  });
}
function Bd(i, t, e) {
  return ze(i, {
    tick: e,
    index: t,
    type: "tick"
  });
}
function zd(i, t, e) {
  let n = Hs(i);
  return (e && t !== "right" || !e && t === "right") && (n = Rd(n)), n;
}
function Hd(i, t, e, n) {
  const { top: s, left: r, bottom: o, right: a, chart: c } = i, { chartArea: l, scales: u } = c;
  let h = 0, f, d, p;
  const m = o - s, b = a - r;
  if (i.isHorizontal()) {
    if (d = st(n, r, a), j(e)) {
      const y = Object.keys(e)[0], x = e[y];
      p = u[y].getPixelForValue(x) + m - t;
    } else e === "center" ? p = (l.bottom + l.top) / 2 + m - t : p = ro(i, e, t);
    f = a - r;
  } else {
    if (j(e)) {
      const y = Object.keys(e)[0], x = e[y];
      d = u[y].getPixelForValue(x) - b + t;
    } else e === "center" ? d = (l.left + l.right) / 2 - b + t : d = ro(i, e, t);
    p = st(n, o, s), h = e === "left" ? -gt : gt;
  }
  return {
    titleX: d,
    titleY: p,
    maxWidth: f,
    rotation: h
  };
}
class je extends He {
  constructor(t) {
    super(), this.id = t.id, this.type = t.type, this.options = void 0, this.ctx = t.ctx, this.chart = t.chart, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, this.maxWidth = void 0, this.maxHeight = void 0, this.paddingTop = void 0, this.paddingBottom = void 0, this.paddingLeft = void 0, this.paddingRight = void 0, this.axis = void 0, this.labelRotation = void 0, this.min = void 0, this.max = void 0, this._range = void 0, this.ticks = [], this._gridLineItems = null, this._labelItems = null, this._labelSizes = null, this._length = 0, this._maxLength = 0, this._longestTextCache = {}, this._startPixel = void 0, this._endPixel = void 0, this._reversePixels = !1, this._userMax = void 0, this._userMin = void 0, this._suggestedMax = void 0, this._suggestedMin = void 0, this._ticksLength = 0, this._borderValue = 0, this._cache = {}, this._dataLimitsCached = !1, this.$context = void 0;
  }
  init(t) {
    this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax);
  }
  parse(t, e) {
    return t;
  }
  getUserBounds() {
    let { _userMin: t, _userMax: e, _suggestedMin: n, _suggestedMax: s } = this;
    return t = Et(t, Number.POSITIVE_INFINITY), e = Et(e, Number.NEGATIVE_INFINITY), n = Et(n, Number.POSITIVE_INFINITY), s = Et(s, Number.NEGATIVE_INFINITY), {
      min: Et(t, n),
      max: Et(e, s),
      minDefined: Mt(t),
      maxDefined: Mt(e)
    };
  }
  getMinMax(t) {
    let { min: e, max: n, minDefined: s, maxDefined: r } = this.getUserBounds(), o;
    if (s && r)
      return {
        min: e,
        max: n
      };
    const a = this.getMatchingVisibleMetas();
    for (let c = 0, l = a.length; c < l; ++c)
      o = a[c].controller.getMinMax(this, t), s || (e = Math.min(e, o.min)), r || (n = Math.max(n, o.max));
    return e = r && e > n ? n : e, n = s && e > n ? e : n, {
      min: Et(e, Et(n, e)),
      max: Et(n, Et(e, n))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const t = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
  }
  getLabelItems(t = this.chart.chartArea) {
    return this._labelItems || (this._labelItems = this._computeLabelItems(t));
  }
  beforeLayout() {
    this._cache = {}, this._dataLimitsCached = !1;
  }
  beforeUpdate() {
    X(this.options.beforeUpdate, [
      this
    ]);
  }
  update(t, e, n) {
    const { beginAtZero: s, grace: r, ticks: o } = this.options, a = o.sampleSize;
    this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this._margins = n = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, n), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + n.left + n.right : this.height + n.top + n.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = af(this, r, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks();
    const c = a < this.ticks.length;
    this._convertTicksToLabels(c ? ao(this.ticks, a) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), o.display && (o.autoSkip || o.source === "auto") && (this.ticks = Od(this, this.ticks), this._labelSizes = null, this.afterAutoSkip()), c && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate();
  }
  configure() {
    let t = this.options.reverse, e, n;
    this.isHorizontal() ? (e = this.left, n = this.right) : (e = this.top, n = this.bottom, t = !t), this._startPixel = e, this._endPixel = n, this._reversePixels = t, this._length = n - e, this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    X(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    X(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0;
  }
  afterSetDimensions() {
    X(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(t) {
    this.chart.notifyPlugins(t, this.getContext()), X(this.options[t], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    X(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(t) {
    const e = this.options.ticks;
    let n, s, r;
    for (n = 0, s = t.length; n < s; n++)
      r = t[n], r.label = X(e.callback, [
        r.value,
        n,
        t
      ], this);
  }
  afterTickToLabelConversion() {
    X(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    X(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const t = this.options, e = t.ticks, n = oo(this.ticks.length, t.ticks.maxTicksLimit), s = e.minRotation || 0, r = e.maxRotation;
    let o = s, a, c, l;
    if (!this._isVisible() || !e.display || s >= r || n <= 1 || !this.isHorizontal()) {
      this.labelRotation = s;
      return;
    }
    const u = this._getLabelSizes(), h = u.widest.width, f = u.highest.height, d = Tt(this.chart.width - h, 0, this.maxWidth);
    a = t.offset ? this.maxWidth / n : d / (n - 1), h + 6 > a && (a = d / (n - (t.offset ? 0.5 : 1)), c = this.maxHeight - Ze(t.grid) - e.padding - co(t.title, this.chart.options.font), l = Math.sqrt(h * h + f * f), o = Lh(Math.min(Math.asin(Tt((u.highest.height + 6) / a, -1, 1)), Math.asin(Tt(c / l, -1, 1)) - Math.asin(Tt(f / l, -1, 1)))), o = Math.max(s, Math.min(r, o))), this.labelRotation = o;
  }
  afterCalculateLabelRotation() {
    X(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    X(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const t = {
      width: 0,
      height: 0
    }, { chart: e, options: { ticks: n, title: s, grid: r } } = this, o = this._isVisible(), a = this.isHorizontal();
    if (o) {
      const c = co(s, e.options.font);
      if (a ? (t.width = this.maxWidth, t.height = Ze(r) + c) : (t.height = this.maxHeight, t.width = Ze(r) + c), n.display && this.ticks.length) {
        const { first: l, last: u, widest: h, highest: f } = this._getLabelSizes(), d = n.padding * 2, p = Ft(this.labelRotation), m = Math.cos(p), b = Math.sin(p);
        if (a) {
          const y = n.mirror ? 0 : b * h.width + m * f.height;
          t.height = Math.min(this.maxHeight, t.height + y + d);
        } else {
          const y = n.mirror ? 0 : m * h.width + b * f.height;
          t.width = Math.min(this.maxWidth, t.width + y + d);
        }
        this._calculatePadding(l, u, b, m);
      }
    }
    this._handleMargins(), a ? (this.width = this._length = e.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = e.height - this._margins.top - this._margins.bottom);
  }
  _calculatePadding(t, e, n, s) {
    const { ticks: { align: r, padding: o }, position: a } = this.options, c = this.labelRotation !== 0, l = a !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const u = this.getPixelForTick(0) - this.left, h = this.right - this.getPixelForTick(this.ticks.length - 1);
      let f = 0, d = 0;
      c ? l ? (f = s * t.width, d = n * e.height) : (f = n * t.height, d = s * e.width) : r === "start" ? d = e.width : r === "end" ? f = t.width : r !== "inner" && (f = t.width / 2, d = e.width / 2), this.paddingLeft = Math.max((f - u + o) * this.width / (this.width - u), 0), this.paddingRight = Math.max((d - h + o) * this.width / (this.width - h), 0);
    } else {
      let u = e.height / 2, h = t.height / 2;
      r === "start" ? (u = 0, h = t.height) : r === "end" && (u = e.height, h = 0), this.paddingTop = u + o, this.paddingBottom = h + o;
    }
  }
  _handleMargins() {
    this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom));
  }
  afterFit() {
    X(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis: t, position: e } = this.options;
    return e === "top" || e === "bottom" || t === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(t) {
    this.beforeTickToLabelConversion(), this.generateTickLabels(t);
    let e, n;
    for (e = 0, n = t.length; e < n; e++)
      U(t[e].label) && (t.splice(e, 1), n--, e--);
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let t = this._labelSizes;
    if (!t) {
      const e = this.options.ticks.sampleSize;
      let n = this.ticks;
      e < n.length && (n = ao(n, e)), this._labelSizes = t = this._computeLabelSizes(n, n.length, this.options.ticks.maxTicksLimit);
    }
    return t;
  }
  _computeLabelSizes(t, e, n) {
    const { ctx: s, _longestTextCache: r } = this, o = [], a = [], c = Math.floor(e / oo(e, n));
    let l = 0, u = 0, h, f, d, p, m, b, y, x, S, g, k;
    for (h = 0; h < e; h += c) {
      if (p = t[h].label, m = this._resolveTickFontOptions(h), s.font = b = m.string, y = r[b] = r[b] || {
        data: {},
        gc: []
      }, x = m.lineHeight, S = g = 0, !U(p) && !Z(p))
        S = Br(s, y.data, y.gc, S, p), g = x;
      else if (Z(p))
        for (f = 0, d = p.length; f < d; ++f)
          k = p[f], !U(k) && !Z(k) && (S = Br(s, y.data, y.gc, S, k), g += x);
      o.push(S), a.push(g), l = Math.max(S, l), u = Math.max(g, u);
    }
    Fd(r, e);
    const w = o.indexOf(l), A = a.indexOf(u), M = (O) => ({
      width: o[O] || 0,
      height: a[O] || 0
    });
    return {
      first: M(0),
      last: M(e - 1),
      widest: M(w),
      highest: M(A),
      widths: o,
      heights: a
    };
  }
  getLabelForValue(t) {
    return t;
  }
  getPixelForValue(t, e) {
    return NaN;
  }
  getValueForPixel(t) {
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getPixelForDecimal(t) {
    this._reversePixels && (t = 1 - t);
    const e = this._startPixel + t * this._length;
    return Bh(this._alignToPixels ? he(this.chart, e, 0) : e);
  }
  getDecimalForPixel(t) {
    const e = (t - this._startPixel) / this._length;
    return this._reversePixels ? 1 - e : e;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min: t, max: e } = this;
    return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
  }
  getContext(t) {
    const e = this.ticks || [];
    if (t >= 0 && t < e.length) {
      const n = e[t];
      return n.$context || (n.$context = Bd(this.getContext(), t, n));
    }
    return this.$context || (this.$context = Id(this.chart.getContext(), this));
  }
  _tickSize() {
    const t = this.options.ticks, e = Ft(this.labelRotation), n = Math.abs(Math.cos(e)), s = Math.abs(Math.sin(e)), r = this._getLabelSizes(), o = t.autoSkipPadding || 0, a = r ? r.widest.width + o : 0, c = r ? r.highest.height + o : 0;
    return this.isHorizontal() ? c * n > a * s ? a / n : c / s : c * s < a * n ? c / n : a / s;
  }
  _isVisible() {
    const t = this.options.display;
    return t !== "auto" ? !!t : this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(t) {
    const e = this.axis, n = this.chart, s = this.options, { grid: r, position: o, border: a } = s, c = r.offset, l = this.isHorizontal(), h = this.ticks.length + (c ? 1 : 0), f = Ze(r), d = [], p = a.setContext(this.getContext()), m = p.display ? p.width : 0, b = m / 2, y = function(B) {
      return he(n, B, m);
    };
    let x, S, g, k, w, A, M, O, E, T, D, I;
    if (o === "top")
      x = y(this.bottom), A = this.bottom - f, O = x - b, T = y(t.top) + b, I = t.bottom;
    else if (o === "bottom")
      x = y(this.top), T = t.top, I = y(t.bottom) - b, A = x + b, O = this.top + f;
    else if (o === "left")
      x = y(this.right), w = this.right - f, M = x - b, E = y(t.left) + b, D = t.right;
    else if (o === "right")
      x = y(this.left), E = t.left, D = y(t.right) - b, w = x + b, M = this.left + f;
    else if (e === "x") {
      if (o === "center")
        x = y((t.top + t.bottom) / 2 + 0.5);
      else if (j(o)) {
        const B = Object.keys(o)[0], N = o[B];
        x = y(this.chart.scales[B].getPixelForValue(N));
      }
      T = t.top, I = t.bottom, A = x + b, O = A + f;
    } else if (e === "y") {
      if (o === "center")
        x = y((t.left + t.right) / 2);
      else if (j(o)) {
        const B = Object.keys(o)[0], N = o[B];
        x = y(this.chart.scales[B].getPixelForValue(N));
      }
      w = x - b, M = w - f, E = t.left, D = t.right;
    }
    const z = W(s.ticks.maxTicksLimit, h), L = Math.max(1, Math.ceil(h / z));
    for (S = 0; S < h; S += L) {
      const B = this.getContext(S), N = r.setContext(B), q = a.setContext(B), ot = N.lineWidth, J = N.color, vt = q.dash || [], tt = q.dashOffset, ft = N.tickWidth, et = N.tickColor, it = N.tickBorderDash || [], nt = N.tickBorderDashOffset;
      g = Ld(this, S, c), g !== void 0 && (k = he(n, g, ot), l ? w = M = E = D = k : A = O = T = I = k, d.push({
        tx1: w,
        ty1: A,
        tx2: M,
        ty2: O,
        x1: E,
        y1: T,
        x2: D,
        y2: I,
        width: ot,
        color: J,
        borderDash: vt,
        borderDashOffset: tt,
        tickWidth: ft,
        tickColor: et,
        tickBorderDash: it,
        tickBorderDashOffset: nt
      }));
    }
    return this._ticksLength = h, this._borderValue = x, d;
  }
  _computeLabelItems(t) {
    const e = this.axis, n = this.options, { position: s, ticks: r } = n, o = this.isHorizontal(), a = this.ticks, { align: c, crossAlign: l, padding: u, mirror: h } = r, f = Ze(n.grid), d = f + u, p = h ? -u : d, m = -Ft(this.labelRotation), b = [];
    let y, x, S, g, k, w, A, M, O, E, T, D, I = "middle";
    if (s === "top")
      w = this.bottom - p, A = this._getXAxisLabelAlignment();
    else if (s === "bottom")
      w = this.top + p, A = this._getXAxisLabelAlignment();
    else if (s === "left") {
      const L = this._getYAxisLabelAlignment(f);
      A = L.textAlign, k = L.x;
    } else if (s === "right") {
      const L = this._getYAxisLabelAlignment(f);
      A = L.textAlign, k = L.x;
    } else if (e === "x") {
      if (s === "center")
        w = (t.top + t.bottom) / 2 + d;
      else if (j(s)) {
        const L = Object.keys(s)[0], B = s[L];
        w = this.chart.scales[L].getPixelForValue(B) + d;
      }
      A = this._getXAxisLabelAlignment();
    } else if (e === "y") {
      if (s === "center")
        k = (t.left + t.right) / 2 - d;
      else if (j(s)) {
        const L = Object.keys(s)[0], B = s[L];
        k = this.chart.scales[L].getPixelForValue(B);
      }
      A = this._getYAxisLabelAlignment(f).textAlign;
    }
    e === "y" && (c === "start" ? I = "top" : c === "end" && (I = "bottom"));
    const z = this._getLabelSizes();
    for (y = 0, x = a.length; y < x; ++y) {
      S = a[y], g = S.label;
      const L = r.setContext(this.getContext(y));
      M = this.getPixelForTick(y) + r.labelOffset, O = this._resolveTickFontOptions(y), E = O.lineHeight, T = Z(g) ? g.length : 1;
      const B = T / 2, N = L.color, q = L.textStrokeColor, ot = L.textStrokeWidth;
      let J = A;
      o ? (k = M, A === "inner" && (y === x - 1 ? J = this.options.reverse ? "left" : "right" : y === 0 ? J = this.options.reverse ? "right" : "left" : J = "center"), s === "top" ? l === "near" || m !== 0 ? D = -T * E + E / 2 : l === "center" ? D = -z.highest.height / 2 - B * E + E : D = -z.highest.height + E / 2 : l === "near" || m !== 0 ? D = E / 2 : l === "center" ? D = z.highest.height / 2 - B * E : D = z.highest.height - T * E, h && (D *= -1), m !== 0 && !L.showLabelBackdrop && (k += E / 2 * Math.sin(m))) : (w = M, D = (1 - T) * E / 2);
      let vt;
      if (L.showLabelBackdrop) {
        const tt = Ot(L.backdropPadding), ft = z.heights[y], et = z.widths[y];
        let it = D - tt.top, nt = 0 - tt.left;
        switch (I) {
          case "middle":
            it -= ft / 2;
            break;
          case "bottom":
            it -= ft;
            break;
        }
        switch (A) {
          case "center":
            nt -= et / 2;
            break;
          case "right":
            nt -= et;
            break;
          case "inner":
            y === x - 1 ? nt -= et : y > 0 && (nt -= et / 2);
            break;
        }
        vt = {
          left: nt,
          top: it,
          width: et + tt.width,
          height: ft + tt.height,
          color: L.backdropColor
        };
      }
      b.push({
        label: g,
        font: O,
        textOffset: D,
        options: {
          rotation: m,
          color: N,
          strokeColor: q,
          strokeWidth: ot,
          textAlign: J,
          textBaseline: I,
          translation: [
            k,
            w
          ],
          backdrop: vt
        }
      });
    }
    return b;
  }
  _getXAxisLabelAlignment() {
    const { position: t, ticks: e } = this.options;
    if (-Ft(this.labelRotation))
      return t === "top" ? "left" : "right";
    let s = "center";
    return e.align === "start" ? s = "left" : e.align === "end" ? s = "right" : e.align === "inner" && (s = "inner"), s;
  }
  _getYAxisLabelAlignment(t) {
    const { position: e, ticks: { crossAlign: n, mirror: s, padding: r } } = this.options, o = this._getLabelSizes(), a = t + r, c = o.widest.width;
    let l, u;
    return e === "left" ? s ? (u = this.right + r, n === "near" ? l = "left" : n === "center" ? (l = "center", u += c / 2) : (l = "right", u += c)) : (u = this.right - a, n === "near" ? l = "right" : n === "center" ? (l = "center", u -= c / 2) : (l = "left", u = this.left)) : e === "right" ? s ? (u = this.left + r, n === "near" ? l = "right" : n === "center" ? (l = "center", u -= c / 2) : (l = "left", u -= c)) : (u = this.left + a, n === "near" ? l = "left" : n === "center" ? (l = "center", u += c / 2) : (l = "right", u = this.right)) : l = "right", {
      textAlign: l,
      x: u
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror)
      return;
    const t = this.chart, e = this.options.position;
    if (e === "left" || e === "right")
      return {
        top: 0,
        left: this.left,
        bottom: t.height,
        right: this.right
      };
    if (e === "top" || e === "bottom")
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: t.width
      };
  }
  drawBackground() {
    const { ctx: t, options: { backgroundColor: e }, left: n, top: s, width: r, height: o } = this;
    e && (t.save(), t.fillStyle = e, t.fillRect(n, s, r, o), t.restore());
  }
  getLineWidthForValue(t) {
    const e = this.options.grid;
    if (!this._isVisible() || !e.display)
      return 0;
    const s = this.ticks.findIndex((r) => r.value === t);
    return s >= 0 ? e.setContext(this.getContext(s)).lineWidth : 0;
  }
  drawGrid(t) {
    const e = this.options.grid, n = this.ctx, s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t));
    let r, o;
    const a = (c, l, u) => {
      !u.width || !u.color || (n.save(), n.lineWidth = u.width, n.strokeStyle = u.color, n.setLineDash(u.borderDash || []), n.lineDashOffset = u.borderDashOffset, n.beginPath(), n.moveTo(c.x, c.y), n.lineTo(l.x, l.y), n.stroke(), n.restore());
    };
    if (e.display)
      for (r = 0, o = s.length; r < o; ++r) {
        const c = s[r];
        e.drawOnChartArea && a({
          x: c.x1,
          y: c.y1
        }, {
          x: c.x2,
          y: c.y2
        }, c), e.drawTicks && a({
          x: c.tx1,
          y: c.ty1
        }, {
          x: c.tx2,
          y: c.ty2
        }, {
          color: c.tickColor,
          width: c.tickWidth,
          borderDash: c.tickBorderDash,
          borderDashOffset: c.tickBorderDashOffset
        });
      }
  }
  drawBorder() {
    const { chart: t, ctx: e, options: { border: n, grid: s } } = this, r = n.setContext(this.getContext()), o = n.display ? r.width : 0;
    if (!o)
      return;
    const a = s.setContext(this.getContext(0)).lineWidth, c = this._borderValue;
    let l, u, h, f;
    this.isHorizontal() ? (l = he(t, this.left, o) - o / 2, u = he(t, this.right, a) + a / 2, h = f = c) : (h = he(t, this.top, o) - o / 2, f = he(t, this.bottom, a) + a / 2, l = u = c), e.save(), e.lineWidth = r.width, e.strokeStyle = r.color, e.beginPath(), e.moveTo(l, h), e.lineTo(u, f), e.stroke(), e.restore();
  }
  drawLabels(t) {
    if (!this.options.ticks.display)
      return;
    const n = this.ctx, s = this._computeLabelArea();
    s && js(n, s);
    const r = this.getLabelItems(t);
    for (const o of r) {
      const a = o.options, c = o.font, l = o.label, u = o.textOffset;
      gi(n, l, 0, u, c, a);
    }
    s && Ws(n);
  }
  drawTitle() {
    const { ctx: t, options: { position: e, title: n, reverse: s } } = this;
    if (!n.display)
      return;
    const r = rt(n.font), o = Ot(n.padding), a = n.align;
    let c = r.lineHeight / 2;
    e === "bottom" || e === "center" || j(e) ? (c += o.bottom, Z(n.text) && (c += r.lineHeight * (n.text.length - 1))) : c += o.top;
    const { titleX: l, titleY: u, maxWidth: h, rotation: f } = Hd(this, c, e, a);
    gi(t, n.text, 0, 0, r, {
      color: n.color,
      maxWidth: h,
      rotation: f,
      textAlign: zd(a, e, s),
      textBaseline: "middle",
      translation: [
        l,
        u
      ]
    });
  }
  draw(t) {
    this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t));
  }
  _layers() {
    const t = this.options, e = t.ticks && t.ticks.z || 0, n = W(t.grid && t.grid.z, -1), s = W(t.border && t.border.z, 0);
    return !this._isVisible() || this.draw !== je.prototype.draw ? [
      {
        z: e,
        draw: (r) => {
          this.draw(r);
        }
      }
    ] : [
      {
        z: n,
        draw: (r) => {
          this.drawBackground(), this.drawGrid(r), this.drawTitle();
        }
      },
      {
        z: s,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: e,
        draw: (r) => {
          this.drawLabels(r);
        }
      }
    ];
  }
  getMatchingVisibleMetas(t) {
    const e = this.chart.getSortedVisibleDatasetMetas(), n = this.axis + "AxisID", s = [];
    let r, o;
    for (r = 0, o = e.length; r < o; ++r) {
      const a = e[r];
      a[n] === this.id && (!t || a.type === t) && s.push(a);
    }
    return s;
  }
  _resolveTickFontOptions(t) {
    const e = this.options.ticks.setContext(this.getContext(t));
    return rt(e.font);
  }
  _maxDigits() {
    const t = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / t;
  }
}
class Xi {
  constructor(t, e, n) {
    this.type = t, this.scope = e, this.override = n, this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(t) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype);
  }
  register(t) {
    const e = Object.getPrototypeOf(t);
    let n;
    Nd(e) && (n = this.register(e));
    const s = this.items, r = t.id, o = this.scope + "." + r;
    if (!r)
      throw new Error("class does not have id: " + t);
    return r in s || (s[r] = t, jd(t, o, n), this.override && K.override(t.id, t.overrides)), o;
  }
  get(t) {
    return this.items[t];
  }
  unregister(t) {
    const e = this.items, n = t.id, s = this.scope;
    n in e && delete e[n], s && n in K[s] && (delete K[s][n], this.override && delete xe[n]);
  }
}
function jd(i, t, e) {
  const n = di(/* @__PURE__ */ Object.create(null), [
    e ? K.get(e) : {},
    K.get(t),
    i.defaults
  ]);
  K.set(t, n), i.defaultRoutes && Wd(t, i.defaultRoutes), i.descriptors && K.describe(t, i.descriptors);
}
function Wd(i, t) {
  Object.keys(t).forEach((e) => {
    const n = e.split("."), s = n.pop(), r = [
      i
    ].concat(n).join("."), o = t[e].split("."), a = o.pop(), c = o.join(".");
    K.route(r, s, c, a);
  });
}
function Nd(i) {
  return "id" in i && "defaults" in i;
}
class $d {
  constructor() {
    this.controllers = new Xi(ve, "datasets", !0), this.elements = new Xi(He, "elements"), this.plugins = new Xi(Object, "plugins"), this.scales = new Xi(je, "scales"), this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...t) {
    this._each("register", t);
  }
  remove(...t) {
    this._each("unregister", t);
  }
  addControllers(...t) {
    this._each("register", t, this.controllers);
  }
  addElements(...t) {
    this._each("register", t, this.elements);
  }
  addPlugins(...t) {
    this._each("register", t, this.plugins);
  }
  addScales(...t) {
    this._each("register", t, this.scales);
  }
  getController(t) {
    return this._get(t, this.controllers, "controller");
  }
  getElement(t) {
    return this._get(t, this.elements, "element");
  }
  getPlugin(t) {
    return this._get(t, this.plugins, "plugin");
  }
  getScale(t) {
    return this._get(t, this.scales, "scale");
  }
  removeControllers(...t) {
    this._each("unregister", t, this.controllers);
  }
  removeElements(...t) {
    this._each("unregister", t, this.elements);
  }
  removePlugins(...t) {
    this._each("unregister", t, this.plugins);
  }
  removeScales(...t) {
    this._each("unregister", t, this.scales);
  }
  _each(t, e, n) {
    [
      ...e
    ].forEach((s) => {
      const r = n || this._getRegistryForType(s);
      n || r.isForType(s) || r === this.plugins && s.id ? this._exec(t, r, s) : V(s, (o) => {
        const a = n || this._getRegistryForType(o);
        this._exec(t, a, o);
      });
    });
  }
  _exec(t, e, n) {
    const s = Bs(t);
    X(n["before" + s], [], n), e[t](n), X(n["after" + s], [], n);
  }
  _getRegistryForType(t) {
    for (let e = 0; e < this._typedRegistries.length; e++) {
      const n = this._typedRegistries[e];
      if (n.isForType(t))
        return n;
    }
    return this.plugins;
  }
  _get(t, e, n) {
    const s = e.get(t);
    if (s === void 0)
      throw new Error('"' + t + '" is not a registered ' + n + ".");
    return s;
  }
}
var Rt = /* @__PURE__ */ new $d();
class Vd {
  constructor() {
    this._init = [];
  }
  notify(t, e, n, s) {
    e === "beforeInit" && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install"));
    const r = s ? this._descriptors(t).filter(s) : this._descriptors(t), o = this._notify(r, t, e, n);
    return e === "afterDestroy" && (this._notify(r, t, "stop"), this._notify(this._init, t, "uninstall")), o;
  }
  _notify(t, e, n, s) {
    s = s || {};
    for (const r of t) {
      const o = r.plugin, a = o[n], c = [
        e,
        s,
        r.options
      ];
      if (X(a, c, o) === !1 && s.cancelable)
        return !1;
    }
    return !0;
  }
  invalidate() {
    U(this._cache) || (this._oldCache = this._cache, this._cache = void 0);
  }
  _descriptors(t) {
    if (this._cache)
      return this._cache;
    const e = this._cache = this._createDescriptors(t);
    return this._notifyStateChanges(t), e;
  }
  _createDescriptors(t, e) {
    const n = t && t.config, s = W(n.options && n.options.plugins, {}), r = Ud(n);
    return s === !1 && !e ? [] : Xd(t, r, s, e);
  }
  _notifyStateChanges(t) {
    const e = this._oldCache || [], n = this._cache, s = (r, o) => r.filter((a) => !o.some((c) => a.plugin.id === c.plugin.id));
    this._notify(s(e, n), t, "stop"), this._notify(s(n, e), t, "start");
  }
}
function Ud(i) {
  const t = {}, e = [], n = Object.keys(Rt.plugins.items);
  for (let r = 0; r < n.length; r++)
    e.push(Rt.getPlugin(n[r]));
  const s = i.plugins || [];
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    e.indexOf(o) === -1 && (e.push(o), t[o.id] = !0);
  }
  return {
    plugins: e,
    localIds: t
  };
}
function Yd(i, t) {
  return !t && i === !1 ? null : i === !0 ? {} : i;
}
function Xd(i, { plugins: t, localIds: e }, n, s) {
  const r = [], o = i.getContext();
  for (const a of t) {
    const c = a.id, l = Yd(n[c], s);
    l !== null && r.push({
      plugin: a,
      options: Kd(i.config, {
        plugin: a,
        local: e[c]
      }, l, o)
    });
  }
  return r;
}
function Kd(i, { plugin: t, local: e }, n, s) {
  const r = i.pluginScopeKeys(t), o = i.getOptionScopes(n, r);
  return e && t.defaults && o.push(t.defaults), i.createResolver(o, s, [
    ""
  ], {
    scriptable: !1,
    indexable: !1,
    allKeys: !0
  });
}
function ds(i, t) {
  const e = K.datasets[i] || {};
  return ((t.datasets || {})[i] || {}).indexAxis || t.indexAxis || e.indexAxis || "x";
}
function qd(i, t) {
  let e = i;
  return i === "_index_" ? e = t : i === "_value_" && (e = t === "x" ? "y" : "x"), e;
}
function Qd(i, t) {
  return i === t ? "_index_" : "_value_";
}
function lo(i) {
  if (i === "x" || i === "y" || i === "r")
    return i;
}
function Zd(i) {
  if (i === "top" || i === "bottom")
    return "x";
  if (i === "left" || i === "right")
    return "y";
}
function ps(i, ...t) {
  if (lo(i))
    return i;
  for (const e of t) {
    const n = e.axis || Zd(e.position) || i.length > 1 && lo(i[0].toLowerCase());
    if (n)
      return n;
  }
  throw new Error(`Cannot determine type of '${i}' axis. Please provide 'axis' or 'position' option.`);
}
function uo(i, t, e) {
  if (e[t + "AxisID"] === i)
    return {
      axis: t
    };
}
function Gd(i, t) {
  if (t.data && t.data.datasets) {
    const e = t.data.datasets.filter((n) => n.xAxisID === i || n.yAxisID === i);
    if (e.length)
      return uo(i, "x", e[0]) || uo(i, "y", e[0]);
  }
  return {};
}
function Jd(i, t) {
  const e = xe[i.type] || {
    scales: {}
  }, n = t.scales || {}, s = ds(i.type, t), r = /* @__PURE__ */ Object.create(null);
  return Object.keys(n).forEach((o) => {
    const a = n[o];
    if (!j(a))
      return console.error(`Invalid scale configuration for scale: ${o}`);
    if (a._proxy)
      return console.warn(`Ignoring resolver passed as options for scale: ${o}`);
    const c = ps(o, a, Gd(o, i), K.scales[a.type]), l = Qd(c, s), u = e.scales || {};
    r[o] = oi(/* @__PURE__ */ Object.create(null), [
      {
        axis: c
      },
      a,
      u[c],
      u[l]
    ]);
  }), i.data.datasets.forEach((o) => {
    const a = o.type || i.type, c = o.indexAxis || ds(a, t), u = (xe[a] || {}).scales || {};
    Object.keys(u).forEach((h) => {
      const f = qd(h, c), d = o[f + "AxisID"] || f;
      r[d] = r[d] || /* @__PURE__ */ Object.create(null), oi(r[d], [
        {
          axis: f
        },
        n[d],
        u[h]
      ]);
    });
  }), Object.keys(r).forEach((o) => {
    const a = r[o];
    oi(a, [
      K.scales[a.type],
      K.scale
    ]);
  }), r;
}
function Va(i) {
  const t = i.options || (i.options = {});
  t.plugins = W(t.plugins, {}), t.scales = Jd(i, t);
}
function Ua(i) {
  return i = i || {}, i.datasets = i.datasets || [], i.labels = i.labels || [], i;
}
function tp(i) {
  return i = i || {}, i.data = Ua(i.data), Va(i), i;
}
const ho = /* @__PURE__ */ new Map(), Ya = /* @__PURE__ */ new Set();
function Ki(i, t) {
  let e = ho.get(i);
  return e || (e = t(), ho.set(i, e), Ya.add(e)), e;
}
const Ge = (i, t, e) => {
  const n = ne(t, e);
  n !== void 0 && i.add(n);
};
let ep = class {
  constructor(t) {
    this._config = tp(t), this._scopeCache = /* @__PURE__ */ new Map(), this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(t) {
    this._config.type = t;
  }
  get data() {
    return this._config.data;
  }
  set data(t) {
    this._config.data = Ua(t);
  }
  get options() {
    return this._config.options;
  }
  set options(t) {
    this._config.options = t;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const t = this._config;
    this.clearCache(), Va(t);
  }
  clearCache() {
    this._scopeCache.clear(), this._resolverCache.clear();
  }
  datasetScopeKeys(t) {
    return Ki(t, () => [
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(t, e) {
    return Ki(`${t}.transition.${e}`, () => [
      [
        `datasets.${t}.transitions.${e}`,
        `transitions.${e}`
      ],
      [
        `datasets.${t}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(t, e) {
    return Ki(`${t}-${e}`, () => [
      [
        `datasets.${t}.elements.${e}`,
        `datasets.${t}`,
        `elements.${e}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(t) {
    const e = t.id, n = this.type;
    return Ki(`${n}-plugin-${e}`, () => [
      [
        `plugins.${e}`,
        ...t.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(t, e) {
    const n = this._scopeCache;
    let s = n.get(t);
    return (!s || e) && (s = /* @__PURE__ */ new Map(), n.set(t, s)), s;
  }
  getOptionScopes(t, e, n) {
    const { options: s, type: r } = this, o = this._cachedScopes(t, n), a = o.get(e);
    if (a)
      return a;
    const c = /* @__PURE__ */ new Set();
    e.forEach((u) => {
      t && (c.add(t), u.forEach((h) => Ge(c, t, h))), u.forEach((h) => Ge(c, s, h)), u.forEach((h) => Ge(c, xe[r] || {}, h)), u.forEach((h) => Ge(c, K, h)), u.forEach((h) => Ge(c, fs, h));
    });
    const l = Array.from(c);
    return l.length === 0 && l.push(/* @__PURE__ */ Object.create(null)), Ya.has(e) && o.set(e, l), l;
  }
  chartOptionScopes() {
    const { options: t, type: e } = this;
    return [
      t,
      xe[e] || {},
      K.datasets[e] || {},
      {
        type: e
      },
      K,
      fs
    ];
  }
  resolveNamedOptions(t, e, n, s = [
    ""
  ]) {
    const r = {
      $shared: !0
    }, { resolver: o, subPrefixes: a } = fo(this._resolverCache, t, s);
    let c = o;
    if (np(o, e)) {
      r.$shared = !1, n = se(n) ? n() : n;
      const l = this.createResolver(t, n, a);
      c = Ie(o, n, l);
    }
    for (const l of e)
      r[l] = c[l];
    return r;
  }
  createResolver(t, e, n = [
    ""
  ], s) {
    const { resolver: r } = fo(this._resolverCache, t, n);
    return j(e) ? Ie(r, e, void 0, s) : r;
  }
};
function fo(i, t, e) {
  let n = i.get(t);
  n || (n = /* @__PURE__ */ new Map(), i.set(t, n));
  const s = e.join();
  let r = n.get(s);
  return r || (r = {
    resolver: Ns(t, e),
    subPrefixes: e.filter((a) => !a.toLowerCase().includes("hover"))
  }, n.set(s, r)), r;
}
const ip = (i) => j(i) && Object.getOwnPropertyNames(i).some((t) => se(i[t]));
function np(i, t) {
  const { isScriptable: e, isIndexable: n } = Ta(i);
  for (const s of t) {
    const r = e(s), o = n(s), a = (o || r) && i[s];
    if (r && (se(a) || ip(a)) || o && Z(a))
      return !0;
  }
  return !1;
}
var sp = "4.5.0";
const rp = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function po(i, t) {
  return i === "top" || i === "bottom" || rp.indexOf(i) === -1 && t === "x";
}
function go(i, t) {
  return function(e, n) {
    return e[i] === n[i] ? e[t] - n[t] : e[i] - n[i];
  };
}
function mo(i) {
  const t = i.chart, e = t.options.animation;
  t.notifyPlugins("afterRender"), X(e && e.onComplete, [
    i
  ], t);
}
function op(i) {
  const t = i.chart, e = t.options.animation;
  X(e && e.onProgress, [
    i
  ], t);
}
function Xa(i) {
  return Us() && typeof i == "string" ? i = document.getElementById(i) : i && i.length && (i = i[0]), i && i.canvas && (i = i.canvas), i;
}
const cn = {}, bo = (i) => {
  const t = Xa(i);
  return Object.values(cn).filter((e) => e.canvas === t).pop();
};
function ap(i, t, e) {
  const n = Object.keys(i);
  for (const s of n) {
    const r = +s;
    if (r >= t) {
      const o = i[s];
      delete i[s], (e > 0 || r > t) && (i[r + e] = o);
    }
  }
}
function cp(i, t, e, n) {
  return !e || i.type === "mouseout" ? null : n ? t : i;
}
var Qt;
let Ks = (Qt = class {
  static register(...t) {
    Rt.add(...t), vo();
  }
  static unregister(...t) {
    Rt.remove(...t), vo();
  }
  constructor(t, e) {
    const n = this.config = new ep(e), s = Xa(t), r = bo(s);
    if (r)
      throw new Error("Canvas is already in use. Chart with ID '" + r.id + "' must be destroyed before the canvas with ID '" + r.canvas.id + "' can be reused.");
    const o = n.createResolver(n.chartOptionScopes(), this.getContext());
    this.platform = new (n.platform || Md(s))(), this.platform.updateConfig(n);
    const a = this.platform.acquireContext(s, o.aspectRatio), c = a && a.canvas, l = c && c.height, u = c && c.width;
    if (this.id = wh(), this.ctx = a, this.canvas = c, this.width = u, this.height = l, this._options = o, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Vd(), this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = Wh((h) => this.update(h), o.resizeDelay || 0), this._dataChanges = [], cn[this.id] = this, !a || !c) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    $t.listen(this, "complete", mo), $t.listen(this, "progress", op), this._initialize(), this.attached && this.update();
  }
  get aspectRatio() {
    const { options: { aspectRatio: t, maintainAspectRatio: e }, width: n, height: s, _aspectRatio: r } = this;
    return U(t) ? e && r ? r : s ? n / s : null : t;
  }
  get data() {
    return this.config.data;
  }
  set data(t) {
    this.config.data = t;
  }
  get options() {
    return this._options;
  }
  set options(t) {
    this.config.options = t;
  }
  get registry() {
    return Rt;
  }
  _initialize() {
    return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : Nr(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this;
  }
  clear() {
    return zr(this.canvas, this.ctx), this;
  }
  stop() {
    return $t.stop(this), this;
  }
  resize(t, e) {
    $t.running(this) ? this._resizeBeforeDraw = {
      width: t,
      height: e
    } : this._resize(t, e);
  }
  _resize(t, e) {
    const n = this.options, s = this.canvas, r = n.maintainAspectRatio && this.aspectRatio, o = this.platform.getMaximumSize(s, t, e, r), a = n.devicePixelRatio || this.platform.getDevicePixelRatio(), c = this.width ? "resize" : "attach";
    this.width = o.width, this.height = o.height, this._aspectRatio = this.aspectRatio, Nr(this, a, !0) && (this.notifyPlugins("resize", {
      size: o
    }), X(n.onResize, [
      this,
      o
    ], this), this.attached && this._doResize(c) && this.render());
  }
  ensureScalesHaveIDs() {
    const e = this.options.scales || {};
    V(e, (n, s) => {
      n.id = s;
    });
  }
  buildOrUpdateScales() {
    const t = this.options, e = t.scales, n = this.scales, s = Object.keys(n).reduce((o, a) => (o[a] = !1, o), {});
    let r = [];
    e && (r = r.concat(Object.keys(e).map((o) => {
      const a = e[o], c = ps(o, a), l = c === "r", u = c === "x";
      return {
        options: a,
        dposition: l ? "chartArea" : u ? "bottom" : "left",
        dtype: l ? "radialLinear" : u ? "category" : "linear"
      };
    }))), V(r, (o) => {
      const a = o.options, c = a.id, l = ps(c, a), u = W(a.type, o.dtype);
      (a.position === void 0 || po(a.position, l) !== po(o.dposition)) && (a.position = o.dposition), s[c] = !0;
      let h = null;
      if (c in n && n[c].type === u)
        h = n[c];
      else {
        const f = Rt.getScale(u);
        h = new f({
          id: c,
          type: u,
          ctx: this.ctx,
          chart: this
        }), n[h.id] = h;
      }
      h.init(a, t);
    }), V(s, (o, a) => {
      o || delete n[a];
    }), V(n, (o) => {
      _t.configure(this, o, o.options), _t.addBox(this, o);
    });
  }
  _updateMetasets() {
    const t = this._metasets, e = this.data.datasets.length, n = t.length;
    if (t.sort((s, r) => s.index - r.index), n > e) {
      for (let s = e; s < n; ++s)
        this._destroyDatasetMeta(s);
      t.splice(e, n - e);
    }
    this._sortedMetasets = t.slice(0).sort(go("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: t, data: { datasets: e } } = this;
    t.length > e.length && delete this._stacks, t.forEach((n, s) => {
      e.filter((r) => r === n._dataset).length === 0 && this._destroyDatasetMeta(s);
    });
  }
  buildOrUpdateControllers() {
    const t = [], e = this.data.datasets;
    let n, s;
    for (this._removeUnreferencedMetasets(), n = 0, s = e.length; n < s; n++) {
      const r = e[n];
      let o = this.getDatasetMeta(n);
      const a = r.type || this.config.type;
      if (o.type && o.type !== a && (this._destroyDatasetMeta(n), o = this.getDatasetMeta(n)), o.type = a, o.indexAxis = r.indexAxis || ds(a, this.options), o.order = r.order || 0, o.index = n, o.label = "" + r.label, o.visible = this.isDatasetVisible(n), o.controller)
        o.controller.updateIndex(n), o.controller.linkScales();
      else {
        const c = Rt.getController(a), { datasetElementType: l, dataElementType: u } = K.datasets[a];
        Object.assign(c, {
          dataElementType: Rt.getElement(u),
          datasetElementType: l && Rt.getElement(l)
        }), o.controller = new c(this, n), t.push(o.controller);
      }
    }
    return this._updateMetasets(), t;
  }
  _resetElements() {
    V(this.data.datasets, (t, e) => {
      this.getDatasetMeta(e).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements(), this.notifyPlugins("reset");
  }
  update(t) {
    const e = this.config;
    e.update();
    const n = this._options = e.createResolver(e.chartOptionScopes(), this.getContext()), s = this._animationsDisabled = !n.animation;
    if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), this.notifyPlugins("beforeUpdate", {
      mode: t,
      cancelable: !0
    }) === !1)
      return;
    const r = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let o = 0;
    for (let l = 0, u = this.data.datasets.length; l < u; l++) {
      const { controller: h } = this.getDatasetMeta(l), f = !s && r.indexOf(h) === -1;
      h.buildOrUpdateElements(f), o = Math.max(+h.getMaxOverflow(), o);
    }
    o = this._minPadding = n.layout.autoPadding ? o : 0, this._updateLayout(o), s || V(r, (l) => {
      l.reset();
    }), this._updateDatasets(t), this.notifyPlugins("afterUpdate", {
      mode: t
    }), this._layers.sort(go("z", "_idx"));
    const { _active: a, _lastEvent: c } = this;
    c ? this._eventHandler(c, !0) : a.length && this._updateHoverStyles(a, a, !0), this.render();
  }
  _updateScales() {
    V(this.scales, (t) => {
      _t.removeBox(this, t);
    }), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const t = this.options, e = new Set(Object.keys(this._listeners)), n = new Set(t.events);
    (!Dr(e, n) || !!this._responsiveListeners !== t.responsive) && (this.unbindEvents(), this.bindEvents());
  }
  _updateHiddenIndices() {
    const { _hiddenIndices: t } = this, e = this._getUniformDataChanges() || [];
    for (const { method: n, start: s, count: r } of e) {
      const o = n === "_removeElements" ? -r : r;
      ap(t, s, o);
    }
  }
  _getUniformDataChanges() {
    const t = this._dataChanges;
    if (!t || !t.length)
      return;
    this._dataChanges = [];
    const e = this.data.datasets.length, n = (r) => new Set(t.filter((o) => o[0] === r).map((o, a) => a + "," + o.splice(1).join(","))), s = n(0);
    for (let r = 1; r < e; r++)
      if (!Dr(s, n(r)))
        return;
    return Array.from(s).map((r) => r.split(",")).map((r) => ({
      method: r[1],
      start: +r[2],
      count: +r[3]
    }));
  }
  _updateLayout(t) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: !0
    }) === !1)
      return;
    _t.update(this, this.width, this.height, t);
    const e = this.chartArea, n = e.width <= 0 || e.height <= 0;
    this._layers = [], V(this.boxes, (s) => {
      n && s.position === "chartArea" || (s.configure && s.configure(), this._layers.push(...s._layers()));
    }, this), this._layers.forEach((s, r) => {
      s._idx = r;
    }), this.notifyPlugins("afterLayout");
  }
  _updateDatasets(t) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode: t,
      cancelable: !0
    }) !== !1) {
      for (let e = 0, n = this.data.datasets.length; e < n; ++e)
        this.getDatasetMeta(e).controller.configure();
      for (let e = 0, n = this.data.datasets.length; e < n; ++e)
        this._updateDataset(e, se(t) ? t({
          datasetIndex: e
        }) : t);
      this.notifyPlugins("afterDatasetsUpdate", {
        mode: t
      });
    }
  }
  _updateDataset(t, e) {
    const n = this.getDatasetMeta(t), s = {
      meta: n,
      index: t,
      mode: e,
      cancelable: !0
    };
    this.notifyPlugins("beforeDatasetUpdate", s) !== !1 && (n.controller._update(e), s.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", s));
  }
  render() {
    this.notifyPlugins("beforeRender", {
      cancelable: !0
    }) !== !1 && ($t.has(this) ? this.attached && !$t.running(this) && $t.start(this) : (this.draw(), mo({
      chart: this
    })));
  }
  draw() {
    let t;
    if (this._resizeBeforeDraw) {
      const { width: n, height: s } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null, this._resize(n, s);
    }
    if (this.clear(), this.width <= 0 || this.height <= 0 || this.notifyPlugins("beforeDraw", {
      cancelable: !0
    }) === !1)
      return;
    const e = this._layers;
    for (t = 0; t < e.length && e[t].z <= 0; ++t)
      e[t].draw(this.chartArea);
    for (this._drawDatasets(); t < e.length; ++t)
      e[t].draw(this.chartArea);
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(t) {
    const e = this._sortedMetasets, n = [];
    let s, r;
    for (s = 0, r = e.length; s < r; ++s) {
      const o = e[s];
      (!t || o.visible) && n.push(o);
    }
    return n;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(!0);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: !0
    }) === !1)
      return;
    const t = this.getSortedVisibleDatasetMetas();
    for (let e = t.length - 1; e >= 0; --e)
      this._drawDataset(t[e]);
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(t) {
    const e = this.ctx, n = {
      meta: t,
      index: t.index,
      cancelable: !0
    }, s = Df(this, t);
    this.notifyPlugins("beforeDatasetDraw", n) !== !1 && (s && js(e, s), t.controller.draw(), s && Ws(e), n.cancelable = !1, this.notifyPlugins("afterDatasetDraw", n));
  }
  isPointInArea(t) {
    return Oa(t, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(t, e, n, s) {
    const r = rd.modes[e];
    return typeof r == "function" ? r(this, t, n, s) : [];
  }
  getDatasetMeta(t) {
    const e = this.data.datasets[t], n = this._metasets;
    let s = n.filter((r) => r && r._dataset === e).pop();
    return s || (s = {
      type: null,
      data: [],
      dataset: null,
      controller: null,
      hidden: null,
      xAxisID: null,
      yAxisID: null,
      order: e && e.order || 0,
      index: t,
      _dataset: e,
      _parsed: [],
      _sorted: !1
    }, n.push(s)), s;
  }
  getContext() {
    return this.$context || (this.$context = ze(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(t) {
    const e = this.data.datasets[t];
    if (!e)
      return !1;
    const n = this.getDatasetMeta(t);
    return typeof n.hidden == "boolean" ? !n.hidden : !e.hidden;
  }
  setDatasetVisibility(t, e) {
    const n = this.getDatasetMeta(t);
    n.hidden = !e;
  }
  toggleDataVisibility(t) {
    this._hiddenIndices[t] = !this._hiddenIndices[t];
  }
  getDataVisibility(t) {
    return !this._hiddenIndices[t];
  }
  _updateVisibility(t, e, n) {
    const s = n ? "show" : "hide", r = this.getDatasetMeta(t), o = r.controller._resolveAnimations(void 0, s);
    pi(e) ? (r.data[e].hidden = !n, this.update()) : (this.setDatasetVisibility(t, n), o.update(r, {
      visible: n
    }), this.update((a) => a.datasetIndex === t ? s : void 0));
  }
  hide(t, e) {
    this._updateVisibility(t, e, !1);
  }
  show(t, e) {
    this._updateVisibility(t, e, !0);
  }
  _destroyDatasetMeta(t) {
    const e = this._metasets[t];
    e && e.controller && e.controller._destroy(), delete this._metasets[t];
  }
  _stop() {
    let t, e;
    for (this.stop(), $t.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t)
      this._destroyDatasetMeta(t);
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas: t, ctx: e } = this;
    this._stop(), this.config.clearCache(), t && (this.unbindEvents(), zr(t, e), this.platform.releaseContext(e), this.canvas = null, this.ctx = null), delete cn[this.id], this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...t) {
    return this.canvas.toDataURL(...t);
  }
  bindEvents() {
    this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0;
  }
  bindUserEvents() {
    const t = this._listeners, e = this.platform, n = (r, o) => {
      e.addEventListener(this, r, o), t[r] = o;
    }, s = (r, o, a) => {
      r.offsetX = o, r.offsetY = a, this._eventHandler(r);
    };
    V(this.options.events, (r) => n(r, s));
  }
  bindResponsiveEvents() {
    this._responsiveListeners || (this._responsiveListeners = {});
    const t = this._responsiveListeners, e = this.platform, n = (c, l) => {
      e.addEventListener(this, c, l), t[c] = l;
    }, s = (c, l) => {
      t[c] && (e.removeEventListener(this, c, l), delete t[c]);
    }, r = (c, l) => {
      this.canvas && this.resize(c, l);
    };
    let o;
    const a = () => {
      s("attach", a), this.attached = !0, this.resize(), n("resize", r), n("detach", o);
    };
    o = () => {
      this.attached = !1, s("resize", r), this._stop(), this._resize(0, 0), n("attach", a);
    }, e.isAttached(this.canvas) ? a() : o();
  }
  unbindEvents() {
    V(this._listeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._listeners = {}, V(this._responsiveListeners, (t, e) => {
      this.platform.removeEventListener(this, e, t);
    }), this._responsiveListeners = void 0;
  }
  updateHoverStyle(t, e, n) {
    const s = n ? "set" : "remove";
    let r, o, a, c;
    for (e === "dataset" && (r = this.getDatasetMeta(t[0].datasetIndex), r.controller["_" + s + "DatasetHoverStyle"]()), a = 0, c = t.length; a < c; ++a) {
      o = t[a];
      const l = o && this.getDatasetMeta(o.datasetIndex).controller;
      l && l[s + "HoverStyle"](o.element, o.datasetIndex, o.index);
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t) {
    const e = this._active || [], n = t.map(({ datasetIndex: r, index: o }) => {
      const a = this.getDatasetMeta(r);
      if (!a)
        throw new Error("No dataset found at index " + r);
      return {
        datasetIndex: r,
        element: a.data[o],
        index: o
      };
    });
    !pn(n, e) && (this._active = n, this._lastEvent = null, this._updateHoverStyles(n, e));
  }
  notifyPlugins(t, e, n) {
    return this._plugins.notify(this, t, e, n);
  }
  isPluginEnabled(t) {
    return this._plugins._cache.filter((e) => e.plugin.id === t).length === 1;
  }
  _updateHoverStyles(t, e, n) {
    const s = this.options.hover, r = (c, l) => c.filter((u) => !l.some((h) => u.datasetIndex === h.datasetIndex && u.index === h.index)), o = r(e, t), a = n ? t : r(t, e);
    o.length && this.updateHoverStyle(o, s.mode, !1), a.length && s.mode && this.updateHoverStyle(a, s.mode, !0);
  }
  _eventHandler(t, e) {
    const n = {
      event: t,
      replay: e,
      cancelable: !0,
      inChartArea: this.isPointInArea(t)
    }, s = (o) => (o.options.events || this.options.events).includes(t.native.type);
    if (this.notifyPlugins("beforeEvent", n, s) === !1)
      return;
    const r = this._handleEvent(t, e, n.inChartArea);
    return n.cancelable = !1, this.notifyPlugins("afterEvent", n, s), (r || n.changed) && this.render(), this;
  }
  _handleEvent(t, e, n) {
    const { _active: s = [], options: r } = this, o = e, a = this._getActiveElements(t, s, n, o), c = Dh(t), l = cp(t, this._lastEvent, n, c);
    n && (this._lastEvent = null, X(r.onHover, [
      t,
      a,
      this
    ], this), c && X(r.onClick, [
      t,
      a,
      this
    ], this));
    const u = !pn(a, s);
    return (u || e) && (this._active = a, this._updateHoverStyles(a, s, e)), this._lastEvent = l, u;
  }
  _getActiveElements(t, e, n, s) {
    if (t.type === "mouseout")
      return [];
    if (!n)
      return e;
    const r = this.options.hover;
    return this.getElementsAtEventForMode(t, r.mode, r, s);
  }
}, F(Qt, "defaults", K), F(Qt, "instances", cn), F(Qt, "overrides", xe), F(Qt, "registry", Rt), F(Qt, "version", sp), F(Qt, "getChart", bo), Qt);
function vo() {
  return V(Ks.instances, (i) => i._plugins.invalidate());
}
function Ka(i, t) {
  const { x: e, y: n, base: s, width: r, height: o } = i.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], t);
  let a, c, l, u, h;
  return i.horizontal ? (h = o / 2, a = Math.min(e, s), c = Math.max(e, s), l = n - h, u = n + h) : (h = r / 2, a = e - h, c = e + h, l = Math.min(n, s), u = Math.max(n, s)), {
    left: a,
    top: l,
    right: c,
    bottom: u
  };
}
function Gt(i, t, e, n) {
  return i ? 0 : Tt(t, e, n);
}
function lp(i, t, e) {
  const n = i.options.borderWidth, s = i.borderSkipped, r = Ca(n);
  return {
    t: Gt(s.top, r.top, 0, e),
    r: Gt(s.right, r.right, 0, t),
    b: Gt(s.bottom, r.bottom, 0, e),
    l: Gt(s.left, r.left, 0, t)
  };
}
function up(i, t, e) {
  const { enableBorderRadius: n } = i.getProps([
    "enableBorderRadius"
  ]), s = i.options.borderRadius, r = Ce(s), o = Math.min(t, e), a = i.borderSkipped, c = n || j(s);
  return {
    topLeft: Gt(!c || a.top || a.left, r.topLeft, 0, o),
    topRight: Gt(!c || a.top || a.right, r.topRight, 0, o),
    bottomLeft: Gt(!c || a.bottom || a.left, r.bottomLeft, 0, o),
    bottomRight: Gt(!c || a.bottom || a.right, r.bottomRight, 0, o)
  };
}
function hp(i) {
  const t = Ka(i), e = t.right - t.left, n = t.bottom - t.top, s = lp(i, e / 2, n / 2), r = up(i, e / 2, n / 2);
  return {
    outer: {
      x: t.left,
      y: t.top,
      w: e,
      h: n,
      radius: r
    },
    inner: {
      x: t.left + s.l,
      y: t.top + s.t,
      w: e - s.l - s.r,
      h: n - s.t - s.b,
      radius: {
        topLeft: Math.max(0, r.topLeft - Math.max(s.t, s.l)),
        topRight: Math.max(0, r.topRight - Math.max(s.t, s.r)),
        bottomLeft: Math.max(0, r.bottomLeft - Math.max(s.b, s.l)),
        bottomRight: Math.max(0, r.bottomRight - Math.max(s.b, s.r))
      }
    }
  };
}
function qn(i, t, e, n) {
  const s = t === null, r = e === null, a = i && !(s && r) && Ka(i, n);
  return a && (s || De(t, a.left, a.right)) && (r || De(e, a.top, a.bottom));
}
function fp(i) {
  return i.topLeft || i.topRight || i.bottomLeft || i.bottomRight;
}
function dp(i, t) {
  i.rect(t.x, t.y, t.w, t.h);
}
function Qn(i, t, e = {}) {
  const n = i.x !== e.x ? -t : 0, s = i.y !== e.y ? -t : 0, r = (i.x + i.w !== e.x + e.w ? t : 0) - n, o = (i.y + i.h !== e.y + e.h ? t : 0) - s;
  return {
    x: i.x + n,
    y: i.y + s,
    w: i.w + r,
    h: i.h + o,
    radius: i.radius
  };
}
class ln extends He {
  constructor(t) {
    super(), this.options = void 0, this.horizontal = void 0, this.base = void 0, this.width = void 0, this.height = void 0, this.inflateAmount = void 0, t && Object.assign(this, t);
  }
  draw(t) {
    const { inflateAmount: e, options: { borderColor: n, backgroundColor: s } } = this, { inner: r, outer: o } = hp(this), a = fp(o.radius) ? vn : dp;
    t.save(), (o.w !== r.w || o.h !== r.h) && (t.beginPath(), a(t, Qn(o, e, r)), t.clip(), a(t, Qn(r, -e, o)), t.fillStyle = n, t.fill("evenodd")), t.beginPath(), a(t, Qn(r, e)), t.fillStyle = s, t.fill(), t.restore();
  }
  inRange(t, e, n) {
    return qn(this, t, e, n);
  }
  inXRange(t, e) {
    return qn(this, t, null, e);
  }
  inYRange(t, e) {
    return qn(this, null, t, e);
  }
  getCenterPoint(t) {
    const { x: e, y: n, base: s, horizontal: r } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], t);
    return {
      x: r ? (e + s) / 2 : e,
      y: r ? n : (n + s) / 2
    };
  }
  getRange(t) {
    return t === "x" ? this.width / 2 : this.height / 2;
  }
}
F(ln, "id", "bar"), F(ln, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
}), F(ln, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
const gs = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
], yo = /* @__PURE__ */ gs.map((i) => i.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function qa(i) {
  return gs[i % gs.length];
}
function Qa(i) {
  return yo[i % yo.length];
}
function pp(i, t) {
  return i.borderColor = qa(t), i.backgroundColor = Qa(t), ++t;
}
function gp(i, t) {
  return i.backgroundColor = i.data.map(() => qa(t++)), t;
}
function mp(i, t) {
  return i.backgroundColor = i.data.map(() => Qa(t++)), t;
}
function bp(i) {
  let t = 0;
  return (e, n) => {
    const s = i.getDatasetMeta(n).controller;
    s instanceof ti ? t = gp(e, t) : s instanceof on ? t = mp(e, t) : s && (t = pp(e, t));
  };
}
function xo(i) {
  let t;
  for (t in i)
    if (i[t].borderColor || i[t].backgroundColor)
      return !0;
  return !1;
}
function vp(i) {
  return i && (i.borderColor || i.backgroundColor);
}
function yp() {
  return K.borderColor !== "rgba(0,0,0,0.1)" || K.backgroundColor !== "rgba(0,0,0,0.1)";
}
var xp = {
  id: "colors",
  defaults: {
    enabled: !0,
    forceOverride: !1
  },
  beforeLayout(i, t, e) {
    if (!e.enabled)
      return;
    const { data: { datasets: n }, options: s } = i.config, { elements: r } = s, o = xo(n) || vp(s) || r && xo(r) || yp();
    if (!e.forceOverride && o)
      return;
    const a = bp(i);
    n.forEach(a);
  }
};
const _o = (i, t) => {
  let { boxHeight: e = t, boxWidth: n = t } = i;
  return i.usePointStyle && (e = Math.min(e, t), n = i.pointStyleWidth || Math.min(n, t)), {
    boxWidth: n,
    boxHeight: e,
    itemHeight: Math.max(t, e)
  };
}, _p = (i, t) => i !== null && t !== null && i.datasetIndex === t.datasetIndex && i.index === t.index;
class wo extends He {
  constructor(t) {
    super(), this._added = !1, this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1, this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this.legendItems = void 0, this.columnSizes = void 0, this.lineWidths = void 0, this.maxHeight = void 0, this.maxWidth = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.height = void 0, this.width = void 0, this._margins = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, e, n) {
    this.maxWidth = t, this.maxHeight = e, this._margins = n, this.setDimensions(), this.buildLabels(), this.fit();
  }
  setDimensions() {
    this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height);
  }
  buildLabels() {
    const t = this.options.labels || {};
    let e = X(t.generateLabels, [
      this.chart
    ], this) || [];
    t.filter && (e = e.filter((n) => t.filter(n, this.chart.data))), t.sort && (e = e.sort((n, s) => t.sort(n, s, this.chart.data))), this.options.reverse && e.reverse(), this.legendItems = e;
  }
  fit() {
    const { options: t, ctx: e } = this;
    if (!t.display) {
      this.width = this.height = 0;
      return;
    }
    const n = t.labels, s = rt(n.font), r = s.size, o = this._computeTitleHeight(), { boxWidth: a, itemHeight: c } = _o(n, r);
    let l, u;
    e.font = s.string, this.isHorizontal() ? (l = this.maxWidth, u = this._fitRows(o, r, a, c) + 10) : (u = this.maxHeight, l = this._fitCols(o, s, a, c) + 10), this.width = Math.min(l, t.maxWidth || this.maxWidth), this.height = Math.min(u, t.maxHeight || this.maxHeight);
  }
  _fitRows(t, e, n, s) {
    const { ctx: r, maxWidth: o, options: { labels: { padding: a } } } = this, c = this.legendHitBoxes = [], l = this.lineWidths = [
      0
    ], u = s + a;
    let h = t;
    r.textAlign = "left", r.textBaseline = "middle";
    let f = -1, d = -u;
    return this.legendItems.forEach((p, m) => {
      const b = n + e / 2 + r.measureText(p.text).width;
      (m === 0 || l[l.length - 1] + b + 2 * a > o) && (h += u, l[l.length - (m > 0 ? 0 : 1)] = 0, d += u, f++), c[m] = {
        left: 0,
        top: d,
        row: f,
        width: b,
        height: s
      }, l[l.length - 1] += b + a;
    }), h;
  }
  _fitCols(t, e, n, s) {
    const { ctx: r, maxHeight: o, options: { labels: { padding: a } } } = this, c = this.legendHitBoxes = [], l = this.columnSizes = [], u = o - t;
    let h = a, f = 0, d = 0, p = 0, m = 0;
    return this.legendItems.forEach((b, y) => {
      const { itemWidth: x, itemHeight: S } = wp(n, e, r, b, s);
      y > 0 && d + S + 2 * a > u && (h += f + a, l.push({
        width: f,
        height: d
      }), p += f + a, m++, f = d = 0), c[y] = {
        left: p,
        top: d,
        col: m,
        width: x,
        height: S
      }, f = Math.max(f, x), d += S + a;
    }), h += f, l.push({
      width: f,
      height: d
    }), h;
  }
  adjustHitBoxes() {
    if (!this.options.display)
      return;
    const t = this._computeTitleHeight(), { legendHitBoxes: e, options: { align: n, labels: { padding: s }, rtl: r } } = this, o = Te(r, this.left, this.width);
    if (this.isHorizontal()) {
      let a = 0, c = st(n, this.left + s, this.right - this.lineWidths[a]);
      for (const l of e)
        a !== l.row && (a = l.row, c = st(n, this.left + s, this.right - this.lineWidths[a])), l.top += this.top + t + s, l.left = o.leftForLtr(o.x(c), l.width), c += l.width + s;
    } else {
      let a = 0, c = st(n, this.top + t + s, this.bottom - this.columnSizes[a].height);
      for (const l of e)
        l.col !== a && (a = l.col, c = st(n, this.top + t + s, this.bottom - this.columnSizes[a].height)), l.top = c, l.left += this.left + s, l.left = o.leftForLtr(o.x(l.left), l.width), c += l.height + s;
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const t = this.ctx;
      js(t, this), this._draw(), Ws(t);
    }
  }
  _draw() {
    const { options: t, columnSizes: e, lineWidths: n, ctx: s } = this, { align: r, labels: o } = t, a = K.color, c = Te(t.rtl, this.left, this.width), l = rt(o.font), { padding: u } = o, h = l.size, f = h / 2;
    let d;
    this.drawTitle(), s.textAlign = c.textAlign("left"), s.textBaseline = "middle", s.lineWidth = 0.5, s.font = l.string;
    const { boxWidth: p, boxHeight: m, itemHeight: b } = _o(o, h), y = function(w, A, M) {
      if (isNaN(p) || p <= 0 || isNaN(m) || m < 0)
        return;
      s.save();
      const O = W(M.lineWidth, 1);
      if (s.fillStyle = W(M.fillStyle, a), s.lineCap = W(M.lineCap, "butt"), s.lineDashOffset = W(M.lineDashOffset, 0), s.lineJoin = W(M.lineJoin, "miter"), s.lineWidth = O, s.strokeStyle = W(M.strokeStyle, a), s.setLineDash(W(M.lineDash, [])), o.usePointStyle) {
        const E = {
          radius: m * Math.SQRT2 / 2,
          pointStyle: M.pointStyle,
          rotation: M.rotation,
          borderWidth: O
        }, T = c.xPlus(w, p / 2), D = A + f;
        Ma(s, E, T, D, o.pointStyleWidth && p);
      } else {
        const E = A + Math.max((h - m) / 2, 0), T = c.leftForLtr(w, p), D = Ce(M.borderRadius);
        s.beginPath(), Object.values(D).some((I) => I !== 0) ? vn(s, {
          x: T,
          y: E,
          w: p,
          h: m,
          radius: D
        }) : s.rect(T, E, p, m), s.fill(), O !== 0 && s.stroke();
      }
      s.restore();
    }, x = function(w, A, M) {
      gi(s, M.text, w, A + b / 2, l, {
        strikethrough: M.hidden,
        textAlign: c.textAlign(M.textAlign)
      });
    }, S = this.isHorizontal(), g = this._computeTitleHeight();
    S ? d = {
      x: st(r, this.left + u, this.right - n[0]),
      y: this.top + u + g,
      line: 0
    } : d = {
      x: this.left + u,
      y: st(r, this.top + g + u, this.bottom - e[0].height),
      line: 0
    }, La(this.ctx, t.textDirection);
    const k = b + u;
    this.legendItems.forEach((w, A) => {
      s.strokeStyle = w.fontColor, s.fillStyle = w.fontColor;
      const M = s.measureText(w.text).width, O = c.textAlign(w.textAlign || (w.textAlign = o.textAlign)), E = p + f + M;
      let T = d.x, D = d.y;
      c.setWidth(this.width), S ? A > 0 && T + E + u > this.right && (D = d.y += k, d.line++, T = d.x = st(r, this.left + u, this.right - n[d.line])) : A > 0 && D + k > this.bottom && (T = d.x = T + e[d.line].width + u, d.line++, D = d.y = st(r, this.top + g + u, this.bottom - e[d.line].height));
      const I = c.x(T);
      if (y(I, D, w), T = Nh(O, T + p + f, S ? T + E : this.right, t.rtl), x(c.x(T), D, w), S)
        d.x += E + u;
      else if (typeof w.text != "string") {
        const z = l.lineHeight;
        d.y += Za(w, z) + u;
      } else
        d.y += k;
    }), Fa(this.ctx, t.textDirection);
  }
  drawTitle() {
    const t = this.options, e = t.title, n = rt(e.font), s = Ot(e.padding);
    if (!e.display)
      return;
    const r = Te(t.rtl, this.left, this.width), o = this.ctx, a = e.position, c = n.size / 2, l = s.top + c;
    let u, h = this.left, f = this.width;
    if (this.isHorizontal())
      f = Math.max(...this.lineWidths), u = this.top + l, h = st(t.align, h, this.right - f);
    else {
      const p = this.columnSizes.reduce((m, b) => Math.max(m, b.height), 0);
      u = l + st(t.align, this.top, this.bottom - p - t.labels.padding - this._computeTitleHeight());
    }
    const d = st(a, h, h + f);
    o.textAlign = r.textAlign(Hs(a)), o.textBaseline = "middle", o.strokeStyle = e.color, o.fillStyle = e.color, o.font = n.string, gi(o, e.text, d, u, n);
  }
  _computeTitleHeight() {
    const t = this.options.title, e = rt(t.font), n = Ot(t.padding);
    return t.display ? e.lineHeight + n.height : 0;
  }
  _getLegendItemAt(t, e) {
    let n, s, r;
    if (De(t, this.left, this.right) && De(e, this.top, this.bottom)) {
      for (r = this.legendHitBoxes, n = 0; n < r.length; ++n)
        if (s = r[n], De(t, s.left, s.left + s.width) && De(e, s.top, s.top + s.height))
          return this.legendItems[n];
    }
    return null;
  }
  handleEvent(t) {
    const e = this.options;
    if (!Ap(t.type, e))
      return;
    const n = this._getLegendItemAt(t.x, t.y);
    if (t.type === "mousemove" || t.type === "mouseout") {
      const s = this._hoveredItem, r = _p(s, n);
      s && !r && X(e.onLeave, [
        t,
        s,
        this
      ], this), this._hoveredItem = n, n && !r && X(e.onHover, [
        t,
        n,
        this
      ], this);
    } else n && X(e.onClick, [
      t,
      n,
      this
    ], this);
  }
}
function wp(i, t, e, n, s) {
  const r = Sp(n, i, t, e), o = kp(s, n, t.lineHeight);
  return {
    itemWidth: r,
    itemHeight: o
  };
}
function Sp(i, t, e, n) {
  let s = i.text;
  return s && typeof s != "string" && (s = s.reduce((r, o) => r.length > o.length ? r : o)), t + e.size / 2 + n.measureText(s).width;
}
function kp(i, t, e) {
  let n = i;
  return typeof t.text != "string" && (n = Za(t, e)), n;
}
function Za(i, t) {
  const e = i.text ? i.text.length : 0;
  return t * e;
}
function Ap(i, t) {
  return !!((i === "mousemove" || i === "mouseout") && (t.onHover || t.onLeave) || t.onClick && (i === "click" || i === "mouseup"));
}
var Mp = {
  id: "legend",
  _element: wo,
  start(i, t, e) {
    const n = i.legend = new wo({
      ctx: i.ctx,
      options: e,
      chart: i
    });
    _t.configure(i, n, e), _t.addBox(i, n);
  },
  stop(i) {
    _t.removeBox(i, i.legend), delete i.legend;
  },
  beforeUpdate(i, t, e) {
    const n = i.legend;
    _t.configure(i, n, e), n.options = e;
  },
  afterUpdate(i) {
    const t = i.legend;
    t.buildLabels(), t.adjustHitBoxes();
  },
  afterEvent(i, t) {
    t.replay || i.legend.handleEvent(t.event);
  },
  defaults: {
    display: !0,
    position: "top",
    align: "center",
    fullSize: !0,
    reverse: !1,
    weight: 1e3,
    onClick(i, t, e) {
      const n = t.datasetIndex, s = e.chart;
      s.isDatasetVisible(n) ? (s.hide(n), t.hidden = !0) : (s.show(n), t.hidden = !1);
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (i) => i.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(i) {
        const t = i.data.datasets, { labels: { usePointStyle: e, pointStyle: n, textAlign: s, color: r, useBorderRadius: o, borderRadius: a } } = i.legend.options;
        return i._getSortedDatasetMetas().map((c) => {
          const l = c.controller.getStyle(e ? 0 : void 0), u = Ot(l.borderWidth);
          return {
            text: t[c.index].label,
            fillStyle: l.backgroundColor,
            fontColor: r,
            hidden: !c.visible,
            lineCap: l.borderCapStyle,
            lineDash: l.borderDash,
            lineDashOffset: l.borderDashOffset,
            lineJoin: l.borderJoinStyle,
            lineWidth: (u.width + u.height) / 4,
            strokeStyle: l.borderColor,
            pointStyle: n || l.pointStyle,
            rotation: l.rotation,
            textAlign: s || l.textAlign,
            borderRadius: o && (a || l.borderRadius),
            datasetIndex: c.index
          };
        }, this);
      }
    },
    title: {
      color: (i) => i.chart.options.color,
      display: !1,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (i) => !i.startsWith("on"),
    labels: {
      _scriptable: (i) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(i)
    }
  }
};
class Ga extends He {
  constructor(t) {
    super(), this.chart = t.chart, this.options = t.options, this.ctx = t.ctx, this._padding = void 0, this.top = void 0, this.bottom = void 0, this.left = void 0, this.right = void 0, this.width = void 0, this.height = void 0, this.position = void 0, this.weight = void 0, this.fullSize = void 0;
  }
  update(t, e) {
    const n = this.options;
    if (this.left = 0, this.top = 0, !n.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = t, this.height = this.bottom = e;
    const s = Z(n.text) ? n.text.length : 1;
    this._padding = Ot(n.padding);
    const r = s * rt(n.font).lineHeight + this._padding.height;
    this.isHorizontal() ? this.height = r : this.width = r;
  }
  isHorizontal() {
    const t = this.options.position;
    return t === "top" || t === "bottom";
  }
  _drawArgs(t) {
    const { top: e, left: n, bottom: s, right: r, options: o } = this, a = o.align;
    let c = 0, l, u, h;
    return this.isHorizontal() ? (u = st(a, n, r), h = e + t, l = r - n) : (o.position === "left" ? (u = n + t, h = st(a, s, e), c = G * -0.5) : (u = r - t, h = st(a, e, s), c = G * 0.5), l = s - e), {
      titleX: u,
      titleY: h,
      maxWidth: l,
      rotation: c
    };
  }
  draw() {
    const t = this.ctx, e = this.options;
    if (!e.display)
      return;
    const n = rt(e.font), r = n.lineHeight / 2 + this._padding.top, { titleX: o, titleY: a, maxWidth: c, rotation: l } = this._drawArgs(r);
    gi(t, e.text, 0, 0, n, {
      color: e.color,
      maxWidth: c,
      rotation: l,
      textAlign: Hs(e.align),
      textBaseline: "middle",
      translation: [
        o,
        a
      ]
    });
  }
}
function Op(i, t) {
  const e = new Ga({
    ctx: i.ctx,
    options: t,
    chart: i
  });
  _t.configure(i, e, t), _t.addBox(i, e), i.titleBlock = e;
}
var Dp = {
  id: "title",
  _element: Ga,
  start(i, t, e) {
    Op(i, e);
  },
  stop(i) {
    const t = i.titleBlock;
    _t.removeBox(i, t), delete i.titleBlock;
  },
  beforeUpdate(i, t, e) {
    const n = i.titleBlock;
    _t.configure(i, n, e), n.options = e;
  },
  defaults: {
    align: "center",
    display: !1,
    font: {
      weight: "bold"
    },
    fullSize: !0,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: !0,
    _indexable: !1
  }
};
const ii = {
  average(i) {
    if (!i.length)
      return !1;
    let t, e, n = /* @__PURE__ */ new Set(), s = 0, r = 0;
    for (t = 0, e = i.length; t < e; ++t) {
      const a = i[t].element;
      if (a && a.hasValue()) {
        const c = a.tooltipPosition();
        n.add(c.x), s += c.y, ++r;
      }
    }
    return r === 0 || n.size === 0 ? !1 : {
      x: [
        ...n
      ].reduce((a, c) => a + c) / n.size,
      y: s / r
    };
  },
  nearest(i, t) {
    if (!i.length)
      return !1;
    let e = t.x, n = t.y, s = Number.POSITIVE_INFINITY, r, o, a;
    for (r = 0, o = i.length; r < o; ++r) {
      const c = i[r].element;
      if (c && c.hasValue()) {
        const l = c.getCenterPoint(), u = Ih(t, l);
        u < s && (s = u, a = c);
      }
    }
    if (a) {
      const c = a.tooltipPosition();
      e = c.x, n = c.y;
    }
    return {
      x: e,
      y: n
    };
  }
};
function Pt(i, t) {
  return t && (Z(t) ? Array.prototype.push.apply(i, t) : i.push(t)), i;
}
function Vt(i) {
  return (typeof i == "string" || i instanceof String) && i.indexOf(`
`) > -1 ? i.split(`
`) : i;
}
function Cp(i, t) {
  const { element: e, datasetIndex: n, index: s } = t, r = i.getDatasetMeta(n).controller, { label: o, value: a } = r.getLabelAndValue(s);
  return {
    chart: i,
    label: o,
    parsed: r.getParsed(s),
    raw: i.data.datasets[n].data[s],
    formattedValue: a,
    dataset: r.getDataset(),
    dataIndex: s,
    datasetIndex: n,
    element: e
  };
}
function So(i, t) {
  const e = i.chart.ctx, { body: n, footer: s, title: r } = i, { boxWidth: o, boxHeight: a } = t, c = rt(t.bodyFont), l = rt(t.titleFont), u = rt(t.footerFont), h = r.length, f = s.length, d = n.length, p = Ot(t.padding);
  let m = p.height, b = 0, y = n.reduce((g, k) => g + k.before.length + k.lines.length + k.after.length, 0);
  if (y += i.beforeBody.length + i.afterBody.length, h && (m += h * l.lineHeight + (h - 1) * t.titleSpacing + t.titleMarginBottom), y) {
    const g = t.displayColors ? Math.max(a, c.lineHeight) : c.lineHeight;
    m += d * g + (y - d) * c.lineHeight + (y - 1) * t.bodySpacing;
  }
  f && (m += t.footerMarginTop + f * u.lineHeight + (f - 1) * t.footerSpacing);
  let x = 0;
  const S = function(g) {
    b = Math.max(b, e.measureText(g).width + x);
  };
  return e.save(), e.font = l.string, V(i.title, S), e.font = c.string, V(i.beforeBody.concat(i.afterBody), S), x = t.displayColors ? o + 2 + t.boxPadding : 0, V(n, (g) => {
    V(g.before, S), V(g.lines, S), V(g.after, S);
  }), x = 0, e.font = u.string, V(i.footer, S), e.restore(), b += p.width, {
    width: b,
    height: m
  };
}
function Tp(i, t) {
  const { y: e, height: n } = t;
  return e < n / 2 ? "top" : e > i.height - n / 2 ? "bottom" : "center";
}
function Ep(i, t, e, n) {
  const { x: s, width: r } = n, o = e.caretSize + e.caretPadding;
  if (i === "left" && s + r + o > t.width || i === "right" && s - r - o < 0)
    return !0;
}
function Pp(i, t, e, n) {
  const { x: s, width: r } = e, { width: o, chartArea: { left: a, right: c } } = i;
  let l = "center";
  return n === "center" ? l = s <= (a + c) / 2 ? "left" : "right" : s <= r / 2 ? l = "left" : s >= o - r / 2 && (l = "right"), Ep(l, i, t, e) && (l = "center"), l;
}
function ko(i, t, e) {
  const n = e.yAlign || t.yAlign || Tp(i, e);
  return {
    xAlign: e.xAlign || t.xAlign || Pp(i, t, e, n),
    yAlign: n
  };
}
function Rp(i, t) {
  let { x: e, width: n } = i;
  return t === "right" ? e -= n : t === "center" && (e -= n / 2), e;
}
function Lp(i, t, e) {
  let { y: n, height: s } = i;
  return t === "top" ? n += e : t === "bottom" ? n -= s + e : n -= s / 2, n;
}
function Ao(i, t, e, n) {
  const { caretSize: s, caretPadding: r, cornerRadius: o } = i, { xAlign: a, yAlign: c } = e, l = s + r, { topLeft: u, topRight: h, bottomLeft: f, bottomRight: d } = Ce(o);
  let p = Rp(t, a);
  const m = Lp(t, c, l);
  return c === "center" ? a === "left" ? p += l : a === "right" && (p -= l) : a === "left" ? p -= Math.max(u, f) + s : a === "right" && (p += Math.max(h, d) + s), {
    x: Tt(p, 0, n.width - t.width),
    y: Tt(m, 0, n.height - t.height)
  };
}
function qi(i, t, e) {
  const n = Ot(e.padding);
  return t === "center" ? i.x + i.width / 2 : t === "right" ? i.x + i.width - n.right : i.x + n.left;
}
function Mo(i) {
  return Pt([], Vt(i));
}
function Fp(i, t, e) {
  return ze(i, {
    tooltip: t,
    tooltipItems: e,
    type: "tooltip"
  });
}
function Oo(i, t) {
  const e = t && t.dataset && t.dataset.tooltip && t.dataset.tooltip.callbacks;
  return e ? i.override(e) : i;
}
const Ja = {
  beforeTitle: Nt,
  title(i) {
    if (i.length > 0) {
      const t = i[0], e = t.chart.data.labels, n = e ? e.length : 0;
      if (this && this.options && this.options.mode === "dataset")
        return t.dataset.label || "";
      if (t.label)
        return t.label;
      if (n > 0 && t.dataIndex < n)
        return e[t.dataIndex];
    }
    return "";
  },
  afterTitle: Nt,
  beforeBody: Nt,
  beforeLabel: Nt,
  label(i) {
    if (this && this.options && this.options.mode === "dataset")
      return i.label + ": " + i.formattedValue || i.formattedValue;
    let t = i.dataset.label || "";
    t && (t += ": ");
    const e = i.formattedValue;
    return U(e) || (t += e), t;
  },
  labelColor(i) {
    const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
    return {
      borderColor: e.borderColor,
      backgroundColor: e.backgroundColor,
      borderWidth: e.borderWidth,
      borderDash: e.borderDash,
      borderDashOffset: e.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(i) {
    const e = i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);
    return {
      pointStyle: e.pointStyle,
      rotation: e.rotation
    };
  },
  afterLabel: Nt,
  afterBody: Nt,
  beforeFooter: Nt,
  footer: Nt,
  afterFooter: Nt
};
function ct(i, t, e, n) {
  const s = i[t].call(e, n);
  return typeof s > "u" ? Ja[t].call(e, n) : s;
}
class ms extends He {
  constructor(t) {
    super(), this.opacity = 0, this._active = [], this._eventPosition = void 0, this._size = void 0, this._cachedAnimations = void 0, this._tooltipItems = [], this.$animations = void 0, this.$context = void 0, this.chart = t.chart, this.options = t.options, this.dataPoints = void 0, this.title = void 0, this.beforeBody = void 0, this.body = void 0, this.afterBody = void 0, this.footer = void 0, this.xAlign = void 0, this.yAlign = void 0, this.x = void 0, this.y = void 0, this.height = void 0, this.width = void 0, this.caretX = void 0, this.caretY = void 0, this.labelColors = void 0, this.labelPointStyles = void 0, this.labelTextColors = void 0;
  }
  initialize(t) {
    this.options = t, this._cachedAnimations = void 0, this.$context = void 0;
  }
  _resolveAnimations() {
    const t = this._cachedAnimations;
    if (t)
      return t;
    const e = this.chart, n = this.options.setContext(this.getContext()), s = n.enabled && e.options.animation && n.animations, r = new Ia(this.chart, s);
    return s._cacheable && (this._cachedAnimations = Object.freeze(r)), r;
  }
  getContext() {
    return this.$context || (this.$context = Fp(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(t, e) {
    const { callbacks: n } = e, s = ct(n, "beforeTitle", this, t), r = ct(n, "title", this, t), o = ct(n, "afterTitle", this, t);
    let a = [];
    return a = Pt(a, Vt(s)), a = Pt(a, Vt(r)), a = Pt(a, Vt(o)), a;
  }
  getBeforeBody(t, e) {
    return Mo(ct(e.callbacks, "beforeBody", this, t));
  }
  getBody(t, e) {
    const { callbacks: n } = e, s = [];
    return V(t, (r) => {
      const o = {
        before: [],
        lines: [],
        after: []
      }, a = Oo(n, r);
      Pt(o.before, Vt(ct(a, "beforeLabel", this, r))), Pt(o.lines, ct(a, "label", this, r)), Pt(o.after, Vt(ct(a, "afterLabel", this, r))), s.push(o);
    }), s;
  }
  getAfterBody(t, e) {
    return Mo(ct(e.callbacks, "afterBody", this, t));
  }
  getFooter(t, e) {
    const { callbacks: n } = e, s = ct(n, "beforeFooter", this, t), r = ct(n, "footer", this, t), o = ct(n, "afterFooter", this, t);
    let a = [];
    return a = Pt(a, Vt(s)), a = Pt(a, Vt(r)), a = Pt(a, Vt(o)), a;
  }
  _createItems(t) {
    const e = this._active, n = this.chart.data, s = [], r = [], o = [];
    let a = [], c, l;
    for (c = 0, l = e.length; c < l; ++c)
      a.push(Cp(this.chart, e[c]));
    return t.filter && (a = a.filter((u, h, f) => t.filter(u, h, f, n))), t.itemSort && (a = a.sort((u, h) => t.itemSort(u, h, n))), V(a, (u) => {
      const h = Oo(t.callbacks, u);
      s.push(ct(h, "labelColor", this, u)), r.push(ct(h, "labelPointStyle", this, u)), o.push(ct(h, "labelTextColor", this, u));
    }), this.labelColors = s, this.labelPointStyles = r, this.labelTextColors = o, this.dataPoints = a, a;
  }
  update(t, e) {
    const n = this.options.setContext(this.getContext()), s = this._active;
    let r, o = [];
    if (!s.length)
      this.opacity !== 0 && (r = {
        opacity: 0
      });
    else {
      const a = ii[n.position].call(this, s, this._eventPosition);
      o = this._createItems(n), this.title = this.getTitle(o, n), this.beforeBody = this.getBeforeBody(o, n), this.body = this.getBody(o, n), this.afterBody = this.getAfterBody(o, n), this.footer = this.getFooter(o, n);
      const c = this._size = So(this, n), l = Object.assign({}, a, c), u = ko(this.chart, n, l), h = Ao(n, l, u, this.chart);
      this.xAlign = u.xAlign, this.yAlign = u.yAlign, r = {
        opacity: 1,
        x: h.x,
        y: h.y,
        width: c.width,
        height: c.height,
        caretX: a.x,
        caretY: a.y
      };
    }
    this._tooltipItems = o, this.$context = void 0, r && this._resolveAnimations().update(this, r), t && n.external && n.external.call(this, {
      chart: this.chart,
      tooltip: this,
      replay: e
    });
  }
  drawCaret(t, e, n, s) {
    const r = this.getCaretPosition(t, n, s);
    e.lineTo(r.x1, r.y1), e.lineTo(r.x2, r.y2), e.lineTo(r.x3, r.y3);
  }
  getCaretPosition(t, e, n) {
    const { xAlign: s, yAlign: r } = this, { caretSize: o, cornerRadius: a } = n, { topLeft: c, topRight: l, bottomLeft: u, bottomRight: h } = Ce(a), { x: f, y: d } = t, { width: p, height: m } = e;
    let b, y, x, S, g, k;
    return r === "center" ? (g = d + m / 2, s === "left" ? (b = f, y = b - o, S = g + o, k = g - o) : (b = f + p, y = b + o, S = g - o, k = g + o), x = b) : (s === "left" ? y = f + Math.max(c, u) + o : s === "right" ? y = f + p - Math.max(l, h) - o : y = this.caretX, r === "top" ? (S = d, g = S - o, b = y - o, x = y + o) : (S = d + m, g = S + o, b = y + o, x = y - o), k = S), {
      x1: b,
      x2: y,
      x3: x,
      y1: S,
      y2: g,
      y3: k
    };
  }
  drawTitle(t, e, n) {
    const s = this.title, r = s.length;
    let o, a, c;
    if (r) {
      const l = Te(n.rtl, this.x, this.width);
      for (t.x = qi(this, n.titleAlign, n), e.textAlign = l.textAlign(n.titleAlign), e.textBaseline = "middle", o = rt(n.titleFont), a = n.titleSpacing, e.fillStyle = n.titleColor, e.font = o.string, c = 0; c < r; ++c)
        e.fillText(s[c], l.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + a, c + 1 === r && (t.y += n.titleMarginBottom - a);
    }
  }
  _drawColorBox(t, e, n, s, r) {
    const o = this.labelColors[n], a = this.labelPointStyles[n], { boxHeight: c, boxWidth: l } = r, u = rt(r.bodyFont), h = qi(this, "left", r), f = s.x(h), d = c < u.lineHeight ? (u.lineHeight - c) / 2 : 0, p = e.y + d;
    if (r.usePointStyle) {
      const m = {
        radius: Math.min(l, c) / 2,
        pointStyle: a.pointStyle,
        rotation: a.rotation,
        borderWidth: 1
      }, b = s.leftForLtr(f, l) + l / 2, y = p + c / 2;
      t.strokeStyle = r.multiKeyBackground, t.fillStyle = r.multiKeyBackground, Hr(t, m, b, y), t.strokeStyle = o.borderColor, t.fillStyle = o.backgroundColor, Hr(t, m, b, y);
    } else {
      t.lineWidth = j(o.borderWidth) ? Math.max(...Object.values(o.borderWidth)) : o.borderWidth || 1, t.strokeStyle = o.borderColor, t.setLineDash(o.borderDash || []), t.lineDashOffset = o.borderDashOffset || 0;
      const m = s.leftForLtr(f, l), b = s.leftForLtr(s.xPlus(f, 1), l - 2), y = Ce(o.borderRadius);
      Object.values(y).some((x) => x !== 0) ? (t.beginPath(), t.fillStyle = r.multiKeyBackground, vn(t, {
        x: m,
        y: p,
        w: l,
        h: c,
        radius: y
      }), t.fill(), t.stroke(), t.fillStyle = o.backgroundColor, t.beginPath(), vn(t, {
        x: b,
        y: p + 1,
        w: l - 2,
        h: c - 2,
        radius: y
      }), t.fill()) : (t.fillStyle = r.multiKeyBackground, t.fillRect(m, p, l, c), t.strokeRect(m, p, l, c), t.fillStyle = o.backgroundColor, t.fillRect(b, p + 1, l - 2, c - 2));
    }
    t.fillStyle = this.labelTextColors[n];
  }
  drawBody(t, e, n) {
    const { body: s } = this, { bodySpacing: r, bodyAlign: o, displayColors: a, boxHeight: c, boxWidth: l, boxPadding: u } = n, h = rt(n.bodyFont);
    let f = h.lineHeight, d = 0;
    const p = Te(n.rtl, this.x, this.width), m = function(M) {
      e.fillText(M, p.x(t.x + d), t.y + f / 2), t.y += f + r;
    }, b = p.textAlign(o);
    let y, x, S, g, k, w, A;
    for (e.textAlign = o, e.textBaseline = "middle", e.font = h.string, t.x = qi(this, b, n), e.fillStyle = n.bodyColor, V(this.beforeBody, m), d = a && b !== "right" ? o === "center" ? l / 2 + u : l + 2 + u : 0, g = 0, w = s.length; g < w; ++g) {
      for (y = s[g], x = this.labelTextColors[g], e.fillStyle = x, V(y.before, m), S = y.lines, a && S.length && (this._drawColorBox(e, t, g, p, n), f = Math.max(h.lineHeight, c)), k = 0, A = S.length; k < A; ++k)
        m(S[k]), f = h.lineHeight;
      V(y.after, m);
    }
    d = 0, f = h.lineHeight, V(this.afterBody, m), t.y -= r;
  }
  drawFooter(t, e, n) {
    const s = this.footer, r = s.length;
    let o, a;
    if (r) {
      const c = Te(n.rtl, this.x, this.width);
      for (t.x = qi(this, n.footerAlign, n), t.y += n.footerMarginTop, e.textAlign = c.textAlign(n.footerAlign), e.textBaseline = "middle", o = rt(n.footerFont), e.fillStyle = n.footerColor, e.font = o.string, a = 0; a < r; ++a)
        e.fillText(s[a], c.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + n.footerSpacing;
    }
  }
  drawBackground(t, e, n, s) {
    const { xAlign: r, yAlign: o } = this, { x: a, y: c } = t, { width: l, height: u } = n, { topLeft: h, topRight: f, bottomLeft: d, bottomRight: p } = Ce(s.cornerRadius);
    e.fillStyle = s.backgroundColor, e.strokeStyle = s.borderColor, e.lineWidth = s.borderWidth, e.beginPath(), e.moveTo(a + h, c), o === "top" && this.drawCaret(t, e, n, s), e.lineTo(a + l - f, c), e.quadraticCurveTo(a + l, c, a + l, c + f), o === "center" && r === "right" && this.drawCaret(t, e, n, s), e.lineTo(a + l, c + u - p), e.quadraticCurveTo(a + l, c + u, a + l - p, c + u), o === "bottom" && this.drawCaret(t, e, n, s), e.lineTo(a + d, c + u), e.quadraticCurveTo(a, c + u, a, c + u - d), o === "center" && r === "left" && this.drawCaret(t, e, n, s), e.lineTo(a, c + h), e.quadraticCurveTo(a, c, a + h, c), e.closePath(), e.fill(), s.borderWidth > 0 && e.stroke();
  }
  _updateAnimationTarget(t) {
    const e = this.chart, n = this.$animations, s = n && n.x, r = n && n.y;
    if (s || r) {
      const o = ii[t.position].call(this, this._active, this._eventPosition);
      if (!o)
        return;
      const a = this._size = So(this, t), c = Object.assign({}, o, this._size), l = ko(e, t, c), u = Ao(t, c, l, e);
      (s._to !== u.x || r._to !== u.y) && (this.xAlign = l.xAlign, this.yAlign = l.yAlign, this.width = a.width, this.height = a.height, this.caretX = o.x, this.caretY = o.y, this._resolveAnimations().update(this, u));
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(t) {
    const e = this.options.setContext(this.getContext());
    let n = this.opacity;
    if (!n)
      return;
    this._updateAnimationTarget(e);
    const s = {
      width: this.width,
      height: this.height
    }, r = {
      x: this.x,
      y: this.y
    };
    n = Math.abs(n) < 1e-3 ? 0 : n;
    const o = Ot(e.padding), a = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    e.enabled && a && (t.save(), t.globalAlpha = n, this.drawBackground(r, t, s, e), La(t, e.textDirection), r.y += o.top, this.drawTitle(r, t, e), this.drawBody(r, t, e), this.drawFooter(r, t, e), Fa(t, e.textDirection), t.restore());
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(t, e) {
    const n = this._active, s = t.map(({ datasetIndex: a, index: c }) => {
      const l = this.chart.getDatasetMeta(a);
      if (!l)
        throw new Error("Cannot find a dataset at index " + a);
      return {
        datasetIndex: a,
        element: l.data[c],
        index: c
      };
    }), r = !pn(n, s), o = this._positionChanged(s, e);
    (r || o) && (this._active = s, this._eventPosition = e, this._ignoreReplayEvents = !0, this.update(!0));
  }
  handleEvent(t, e, n = !0) {
    if (e && this._ignoreReplayEvents)
      return !1;
    this._ignoreReplayEvents = !1;
    const s = this.options, r = this._active || [], o = this._getActiveElements(t, r, e, n), a = this._positionChanged(o, t), c = e || !pn(o, r) || a;
    return c && (this._active = o, (s.enabled || s.external) && (this._eventPosition = {
      x: t.x,
      y: t.y
    }, this.update(!0, e))), c;
  }
  _getActiveElements(t, e, n, s) {
    const r = this.options;
    if (t.type === "mouseout")
      return [];
    if (!s)
      return e.filter((a) => this.chart.data.datasets[a.datasetIndex] && this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index) !== void 0);
    const o = this.chart.getElementsAtEventForMode(t, r.mode, r, n);
    return r.reverse && o.reverse(), o;
  }
  _positionChanged(t, e) {
    const { caretX: n, caretY: s, options: r } = this, o = ii[r.position].call(this, t, e);
    return o !== !1 && (n !== o.x || s !== o.y);
  }
}
F(ms, "positioners", ii);
var Ip = {
  id: "tooltip",
  _element: ms,
  positioners: ii,
  afterInit(i, t, e) {
    e && (i.tooltip = new ms({
      chart: i,
      options: e
    }));
  },
  beforeUpdate(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  reset(i, t, e) {
    i.tooltip && i.tooltip.initialize(e);
  },
  afterDraw(i) {
    const t = i.tooltip;
    if (t && t._willRender()) {
      const e = {
        tooltip: t
      };
      if (i.notifyPlugins("beforeTooltipDraw", {
        ...e,
        cancelable: !0
      }) === !1)
        return;
      t.draw(i.ctx), i.notifyPlugins("afterTooltipDraw", e);
    }
  },
  afterEvent(i, t) {
    if (i.tooltip) {
      const e = t.replay;
      i.tooltip.handleEvent(t.event, e, t.inChartArea) && (t.changed = !0);
    }
  },
  defaults: {
    enabled: !0,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (i, t) => t.bodyFont.size,
    boxWidth: (i, t) => t.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: !0,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: Ja
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (i) => i !== "filter" && i !== "itemSort" && i !== "external",
    _indexable: !1,
    callbacks: {
      _scriptable: !1,
      _indexable: !1
    },
    animation: {
      _fallback: !1
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
};
const Bp = (i, t, e, n) => (typeof t == "string" ? (e = i.push(t) - 1, n.unshift({
  index: e,
  label: t
})) : isNaN(t) && (e = null), e);
function zp(i, t, e, n) {
  const s = i.indexOf(t);
  if (s === -1)
    return Bp(i, t, e, n);
  const r = i.lastIndexOf(t);
  return s !== r ? e : s;
}
const Hp = (i, t) => i === null ? null : Tt(Math.round(i), 0, t);
function Do(i) {
  const t = this.getLabels();
  return i >= 0 && i < t.length ? t[i] : i;
}
class bs extends je {
  constructor(t) {
    super(t), this._startValue = void 0, this._valueRange = 0, this._addedLabels = [];
  }
  init(t) {
    const e = this._addedLabels;
    if (e.length) {
      const n = this.getLabels();
      for (const { index: s, label: r } of e)
        n[s] === r && n.splice(s, 1);
      this._addedLabels = [];
    }
    super.init(t);
  }
  parse(t, e) {
    if (U(t))
      return null;
    const n = this.getLabels();
    return e = isFinite(e) && n[e] === t ? e : zp(n, t, W(e, t), this._addedLabels), Hp(e, n.length - 1);
  }
  determineDataLimits() {
    const { minDefined: t, maxDefined: e } = this.getUserBounds();
    let { min: n, max: s } = this.getMinMax(!0);
    this.options.bounds === "ticks" && (t || (n = 0), e || (s = this.getLabels().length - 1)), this.min = n, this.max = s;
  }
  buildTicks() {
    const t = this.min, e = this.max, n = this.options.offset, s = [];
    let r = this.getLabels();
    r = t === 0 && e === r.length - 1 ? r : r.slice(t, e + 1), this._valueRange = Math.max(r.length - (n ? 0 : 1), 1), this._startValue = this.min - (n ? 0.5 : 0);
    for (let o = t; o <= e; o++)
      s.push({
        value: o
      });
    return s;
  }
  getLabelForValue(t) {
    return Do.call(this, t);
  }
  configure() {
    super.configure(), this.isHorizontal() || (this._reversePixels = !this._reversePixels);
  }
  getPixelForValue(t) {
    return typeof t != "number" && (t = this.parse(t)), t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getPixelForTick(t) {
    const e = this.ticks;
    return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value);
  }
  getValueForPixel(t) {
    return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
}
F(bs, "id", "category"), F(bs, "defaults", {
  ticks: {
    callback: Do
  }
});
function jp(i, t) {
  const e = [], { bounds: s, step: r, min: o, max: a, precision: c, count: l, maxTicks: u, maxDigits: h, includeBounds: f } = i, d = r || 1, p = u - 1, { min: m, max: b } = t, y = !U(o), x = !U(a), S = !U(l), g = (b - m) / (h + 1);
  let k = Tr((b - m) / p / d) * d, w, A, M, O;
  if (k < 1e-14 && !y && !x)
    return [
      {
        value: m
      },
      {
        value: b
      }
    ];
  O = Math.ceil(b / k) - Math.floor(m / k), O > p && (k = Tr(O * k / p / d) * d), U(c) || (w = Math.pow(10, c), k = Math.ceil(k * w) / w), s === "ticks" ? (A = Math.floor(m / k) * k, M = Math.ceil(b / k) * k) : (A = m, M = b), y && x && r && Ph((a - o) / r, k / 1e3) ? (O = Math.round(Math.min((a - o) / k, u)), k = (a - o) / O, A = o, M = a) : S ? (A = y ? o : A, M = x ? a : M, O = l - 1, k = (M - A) / O) : (O = (M - A) / k, sn(O, Math.round(O), k / 1e3) ? O = Math.round(O) : O = Math.ceil(O));
  const E = Math.max(Er(k), Er(A));
  w = Math.pow(10, U(c) ? E : c), A = Math.round(A * w) / w, M = Math.round(M * w) / w;
  let T = 0;
  for (y && (f && A !== o ? (e.push({
    value: o
  }), A < o && T++, sn(Math.round((A + T * k) * w) / w, o, Co(o, g, i)) && T++) : A < o && T++); T < O; ++T) {
    const D = Math.round((A + T * k) * w) / w;
    if (x && D > a)
      break;
    e.push({
      value: D
    });
  }
  return x && f && M !== a ? e.length && sn(e[e.length - 1].value, a, Co(a, g, i)) ? e[e.length - 1].value = a : e.push({
    value: a
  }) : (!x || M === a) && e.push({
    value: M
  }), e;
}
function Co(i, t, { horizontal: e, minRotation: n }) {
  const s = Ft(n), r = (e ? Math.sin(s) : Math.cos(s)) || 1e-3, o = 0.75 * t * ("" + i).length;
  return Math.min(t / r, o);
}
class Wp extends je {
  constructor(t) {
    super(t), this.start = void 0, this.end = void 0, this._startValue = void 0, this._endValue = void 0, this._valueRange = 0;
  }
  parse(t, e) {
    return U(t) || (typeof t == "number" || t instanceof Number) && !isFinite(+t) ? null : +t;
  }
  handleTickRangeOptions() {
    const { beginAtZero: t } = this.options, { minDefined: e, maxDefined: n } = this.getUserBounds();
    let { min: s, max: r } = this;
    const o = (c) => s = e ? s : c, a = (c) => r = n ? r : c;
    if (t) {
      const c = ee(s), l = ee(r);
      c < 0 && l < 0 ? a(0) : c > 0 && l > 0 && o(0);
    }
    if (s === r) {
      let c = r === 0 ? 1 : Math.abs(r * 0.05);
      a(r + c), t || o(s - c);
    }
    this.min = s, this.max = r;
  }
  getTickLimit() {
    const t = this.options.ticks;
    let { maxTicksLimit: e, stepSize: n } = t, s;
    return n ? (s = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1, s > 1e3 && (console.warn(`scales.${this.id}.ticks.stepSize: ${n} would result generating up to ${s} ticks. Limiting to 1000.`), s = 1e3)) : (s = this.computeTickLimit(), e = e || 11), e && (s = Math.min(e, s)), s;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const t = this.options, e = t.ticks;
    let n = this.getTickLimit();
    n = Math.max(2, n);
    const s = {
      maxTicks: n,
      bounds: t.bounds,
      min: t.min,
      max: t.max,
      precision: e.precision,
      step: e.stepSize,
      count: e.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: e.minRotation || 0,
      includeBounds: e.includeBounds !== !1
    }, r = this._range || this, o = jp(s, r);
    return t.bounds === "ticks" && Rh(o, this, "value"), t.reverse ? (o.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), o;
  }
  configure() {
    const t = this.ticks;
    let e = this.min, n = this.max;
    if (super.configure(), this.options.offset && t.length) {
      const s = (n - e) / Math.max(t.length - 1, 1) / 2;
      e -= s, n += s;
    }
    this._startValue = e, this._endValue = n, this._valueRange = n - e;
  }
  getLabelForValue(t) {
    return Cn(t, this.chart.options.locale, this.options.ticks.format);
  }
}
class vs extends Wp {
  determineDataLimits() {
    const { min: t, max: e } = this.getMinMax(!0);
    this.min = Mt(t) ? t : 0, this.max = Mt(e) ? e : 1, this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const t = this.isHorizontal(), e = t ? this.width : this.height, n = Ft(this.options.ticks.minRotation), s = (t ? Math.sin(n) : Math.cos(n)) || 1e-3, r = this._resolveTickFontOptions(0);
    return Math.ceil(e / Math.min(40, r.lineHeight / s));
  }
  getPixelForValue(t) {
    return t === null ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange);
  }
  getValueForPixel(t) {
    return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
  }
}
F(vs, "id", "linear"), F(vs, "defaults", {
  ticks: {
    callback: Aa.formatters.numeric
  }
});
const Pn = {
  millisecond: {
    common: !0,
    size: 1,
    steps: 1e3
  },
  second: {
    common: !0,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: !0,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: !0,
    size: 36e5,
    steps: 24
  },
  day: {
    common: !0,
    size: 864e5,
    steps: 30
  },
  week: {
    common: !1,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: !0,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: !1,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: !0,
    size: 3154e7
  }
}, lt = /* @__PURE__ */ Object.keys(Pn);
function To(i, t) {
  return i - t;
}
function Eo(i, t) {
  if (U(t))
    return null;
  const e = i._adapter, { parser: n, round: s, isoWeekday: r } = i._parseOpts;
  let o = t;
  return typeof n == "function" && (o = n(o)), Mt(o) || (o = typeof n == "string" ? e.parse(o, n) : e.parse(o)), o === null ? null : (s && (o = s === "week" && (bn(r) || r === !0) ? e.startOf(o, "isoWeek", r) : e.startOf(o, s)), +o);
}
function Po(i, t, e, n) {
  const s = lt.length;
  for (let r = lt.indexOf(i); r < s - 1; ++r) {
    const o = Pn[lt[r]], a = o.steps ? o.steps : Number.MAX_SAFE_INTEGER;
    if (o.common && Math.ceil((e - t) / (a * o.size)) <= n)
      return lt[r];
  }
  return lt[s - 1];
}
function Np(i, t, e, n, s) {
  for (let r = lt.length - 1; r >= lt.indexOf(e); r--) {
    const o = lt[r];
    if (Pn[o].common && i._adapter.diff(s, n, o) >= t - 1)
      return o;
  }
  return lt[e ? lt.indexOf(e) : 0];
}
function $p(i) {
  for (let t = lt.indexOf(i) + 1, e = lt.length; t < e; ++t)
    if (Pn[lt[t]].common)
      return lt[t];
}
function Ro(i, t, e) {
  if (!e)
    i[t] = !0;
  else if (e.length) {
    const { lo: n, hi: s } = zs(e, t), r = e[n] >= t ? e[n] : e[s];
    i[r] = !0;
  }
}
function Vp(i, t, e, n) {
  const s = i._adapter, r = +s.startOf(t[0].value, n), o = t[t.length - 1].value;
  let a, c;
  for (a = r; a <= o; a = +s.add(a, 1, n))
    c = e[a], c >= 0 && (t[c].major = !0);
  return t;
}
function Lo(i, t, e) {
  const n = [], s = {}, r = t.length;
  let o, a;
  for (o = 0; o < r; ++o)
    a = t[o], s[a] = o, n.push({
      value: a,
      major: !1
    });
  return r === 0 || !e ? n : Vp(i, n, s, e);
}
class _n extends je {
  constructor(t) {
    super(t), this._cache = {
      data: [],
      labels: [],
      all: []
    }, this._unit = "day", this._majorUnit = void 0, this._offsets = {}, this._normalized = !1, this._parseOpts = void 0;
  }
  init(t, e = {}) {
    const n = t.time || (t.time = {}), s = this._adapter = new td._date(t.adapters.date);
    s.init(e), oi(n.displayFormats, s.formats()), this._parseOpts = {
      parser: n.parser,
      round: n.round,
      isoWeekday: n.isoWeekday
    }, super.init(t), this._normalized = e.normalized;
  }
  parse(t, e) {
    return t === void 0 ? null : Eo(this, t);
  }
  beforeLayout() {
    super.beforeLayout(), this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const t = this.options, e = this._adapter, n = t.time.unit || "day";
    let { min: s, max: r, minDefined: o, maxDefined: a } = this.getUserBounds();
    function c(l) {
      !o && !isNaN(l.min) && (s = Math.min(s, l.min)), !a && !isNaN(l.max) && (r = Math.max(r, l.max));
    }
    (!o || !a) && (c(this._getLabelBounds()), (t.bounds !== "ticks" || t.ticks.source !== "labels") && c(this.getMinMax(!1))), s = Mt(s) && !isNaN(s) ? s : +e.startOf(Date.now(), n), r = Mt(r) && !isNaN(r) ? r : +e.endOf(Date.now(), n) + 1, this.min = Math.min(s, r - 1), this.max = Math.max(s + 1, r);
  }
  _getLabelBounds() {
    const t = this.getLabelTimestamps();
    let e = Number.POSITIVE_INFINITY, n = Number.NEGATIVE_INFINITY;
    return t.length && (e = t[0], n = t[t.length - 1]), {
      min: e,
      max: n
    };
  }
  buildTicks() {
    const t = this.options, e = t.time, n = t.ticks, s = n.source === "labels" ? this.getLabelTimestamps() : this._generate();
    t.bounds === "ticks" && s.length && (this.min = this._userMin || s[0], this.max = this._userMax || s[s.length - 1]);
    const r = this.min, o = this.max, a = Hh(s, r, o);
    return this._unit = e.unit || (n.autoSkip ? Po(e.minUnit, this.min, this.max, this._getLabelCapacity(r)) : Np(this, a.length, e.minUnit, this.min, this.max)), this._majorUnit = !n.major.enabled || this._unit === "year" ? void 0 : $p(this._unit), this.initOffsets(s), t.reverse && a.reverse(), Lo(this, a, this._majorUnit);
  }
  afterAutoSkip() {
    this.options.offsetAfterAutoskip && this.initOffsets(this.ticks.map((t) => +t.value));
  }
  initOffsets(t = []) {
    let e = 0, n = 0, s, r;
    this.options.offset && t.length && (s = this.getDecimalForValue(t[0]), t.length === 1 ? e = 1 - s : e = (this.getDecimalForValue(t[1]) - s) / 2, r = this.getDecimalForValue(t[t.length - 1]), t.length === 1 ? n = r : n = (r - this.getDecimalForValue(t[t.length - 2])) / 2);
    const o = t.length < 3 ? 0.5 : 0.25;
    e = Tt(e, 0, o), n = Tt(n, 0, o), this._offsets = {
      start: e,
      end: n,
      factor: 1 / (e + 1 + n)
    };
  }
  _generate() {
    const t = this._adapter, e = this.min, n = this.max, s = this.options, r = s.time, o = r.unit || Po(r.minUnit, e, n, this._getLabelCapacity(e)), a = W(s.ticks.stepSize, 1), c = o === "week" ? r.isoWeekday : !1, l = bn(c) || c === !0, u = {};
    let h = e, f, d;
    if (l && (h = +t.startOf(h, "isoWeek", c)), h = +t.startOf(h, l ? "day" : o), t.diff(n, e, o) > 1e5 * a)
      throw new Error(e + " and " + n + " are too far apart with stepSize of " + a + " " + o);
    const p = s.ticks.source === "data" && this.getDataTimestamps();
    for (f = h, d = 0; f < n; f = +t.add(f, a, o), d++)
      Ro(u, f, p);
    return (f === n || s.bounds === "ticks" || d === 1) && Ro(u, f, p), Object.keys(u).sort(To).map((m) => +m);
  }
  getLabelForValue(t) {
    const e = this._adapter, n = this.options.time;
    return n.tooltipFormat ? e.format(t, n.tooltipFormat) : e.format(t, n.displayFormats.datetime);
  }
  format(t, e) {
    const s = this.options.time.displayFormats, r = this._unit, o = e || s[r];
    return this._adapter.format(t, o);
  }
  _tickFormatFunction(t, e, n, s) {
    const r = this.options, o = r.ticks.callback;
    if (o)
      return X(o, [
        t,
        e,
        n
      ], this);
    const a = r.time.displayFormats, c = this._unit, l = this._majorUnit, u = c && a[c], h = l && a[l], f = n[e], d = l && h && f && f.major;
    return this._adapter.format(t, s || (d ? h : u));
  }
  generateTickLabels(t) {
    let e, n, s;
    for (e = 0, n = t.length; e < n; ++e)
      s = t[e], s.label = this._tickFormatFunction(s.value, e, t);
  }
  getDecimalForValue(t) {
    return t === null ? NaN : (t - this.min) / (this.max - this.min);
  }
  getPixelForValue(t) {
    const e = this._offsets, n = this.getDecimalForValue(t);
    return this.getPixelForDecimal((e.start + n) * e.factor);
  }
  getValueForPixel(t) {
    const e = this._offsets, n = this.getDecimalForPixel(t) / e.factor - e.end;
    return this.min + n * (this.max - this.min);
  }
  _getLabelSize(t) {
    const e = this.options.ticks, n = this.ctx.measureText(t).width, s = Ft(this.isHorizontal() ? e.maxRotation : e.minRotation), r = Math.cos(s), o = Math.sin(s), a = this._resolveTickFontOptions(0).size;
    return {
      w: n * r + a * o,
      h: n * o + a * r
    };
  }
  _getLabelCapacity(t) {
    const e = this.options.time, n = e.displayFormats, s = n[e.unit] || n.millisecond, r = this._tickFormatFunction(t, 0, Lo(this, [
      t
    ], this._majorUnit), s), o = this._getLabelSize(r), a = Math.floor(this.isHorizontal() ? this.width / o.w : this.height / o.h) - 1;
    return a > 0 ? a : 1;
  }
  getDataTimestamps() {
    let t = this._cache.data || [], e, n;
    if (t.length)
      return t;
    const s = this.getMatchingVisibleMetas();
    if (this._normalized && s.length)
      return this._cache.data = s[0].controller.getAllParsedValues(this);
    for (e = 0, n = s.length; e < n; ++e)
      t = t.concat(s[e].controller.getAllParsedValues(this));
    return this._cache.data = this.normalize(t);
  }
  getLabelTimestamps() {
    const t = this._cache.labels || [];
    let e, n;
    if (t.length)
      return t;
    const s = this.getLabels();
    for (e = 0, n = s.length; e < n; ++e)
      t.push(Eo(this, s[e]));
    return this._cache.labels = this._normalized ? t : this.normalize(t);
  }
  normalize(t) {
    return _a(t.sort(To));
  }
}
F(_n, "id", "time"), F(_n, "defaults", {
  bounds: "data",
  adapters: {},
  time: {
    parser: !1,
    unit: !1,
    round: !1,
    isoWeekday: !1,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    callback: !1,
    major: {
      enabled: !1
    }
  }
});
function Qi(i, t, e) {
  let n = 0, s = i.length - 1, r, o, a, c;
  e ? (t >= i[n].pos && t <= i[s].pos && ({ lo: n, hi: s } = hs(i, "pos", t)), { pos: r, time: a } = i[n], { pos: o, time: c } = i[s]) : (t >= i[n].time && t <= i[s].time && ({ lo: n, hi: s } = hs(i, "time", t)), { time: r, pos: a } = i[n], { time: o, pos: c } = i[s]);
  const l = o - r;
  return l ? a + (c - a) * (t - r) / l : a;
}
class Fo extends _n {
  constructor(t) {
    super(t), this._table = [], this._minPos = void 0, this._tableRange = void 0;
  }
  initOffsets() {
    const t = this._getTimestampsForTable(), e = this._table = this.buildLookupTable(t);
    this._minPos = Qi(e, this.min), this._tableRange = Qi(e, this.max) - this._minPos, super.initOffsets(t);
  }
  buildLookupTable(t) {
    const { min: e, max: n } = this, s = [], r = [];
    let o, a, c, l, u;
    for (o = 0, a = t.length; o < a; ++o)
      l = t[o], l >= e && l <= n && s.push(l);
    if (s.length < 2)
      return [
        {
          time: e,
          pos: 0
        },
        {
          time: n,
          pos: 1
        }
      ];
    for (o = 0, a = s.length; o < a; ++o)
      u = s[o + 1], c = s[o - 1], l = s[o], Math.round((u + c) / 2) !== l && r.push({
        time: l,
        pos: o / (a - 1)
      });
    return r;
  }
  _generate() {
    const t = this.min, e = this.max;
    let n = super.getDataTimestamps();
    return (!n.includes(t) || !n.length) && n.splice(0, 0, t), (!n.includes(e) || n.length === 1) && n.push(e), n.sort((s, r) => s - r);
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length)
      return t;
    const e = this.getDataTimestamps(), n = this.getLabelTimestamps();
    return e.length && n.length ? t = this.normalize(e.concat(n)) : t = e.length ? e : n, t = this._cache.all = t, t;
  }
  getDecimalForValue(t) {
    return (Qi(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const e = this._offsets, n = this.getDecimalForPixel(t) / e.factor - e.end;
    return Qi(this._table, n * this._tableRange + this._minPos, !0);
  }
}
F(Fo, "id", "timeseries"), F(Fo, "defaults", _n.defaults);
Ks.register(
  xp,
  rn,
  ln,
  bs,
  vs,
  Mp,
  Dp,
  Ip
);
function Up({ type: i = "bar", data: t, options: e }) {
  const n = ie(null), s = ie(null);
  return bi(() => {
    s.current && (n.current ? (n.current.options = e, n.current.data = t, n.current.update()) : n.current = new Ks(s.current, {
      type: i,
      data: t,
      options: e
    }));
  }, [i, t, e]), /* @__PURE__ */ v("div", { class: "chart", children: /* @__PURE__ */ v("canvas", { ref: s }) });
}
const Io = [
  "--teal-700",
  "--yellow-400",
  "--teal-400",
  "--orange-400",
  "--green-400",
  "--red-400"
], Zn = [
  "0 - 1s",
  "1 - 30s",
  "30s - 30min",
  "30 - 60min",
  "1 - 5hr",
  "5 - 10hr",
  "10 - 18hr",
  "18+hr"
], Gn = (i, t, e = 0) => `${i.toFixed(e)} ${t}${i == 1 ? "" : "s"}`, Bo = (i) => {
  const t = i / 3600;
  if (t >= 1) return Gn(t, "hour", 1);
  const e = i / 60;
  return e >= 1 ? Gn(e, "minute", 0) : Gn(i, "second", 0);
}, Zi = (i) => i.replace(/ \([^)]+\)/, "");
function Yp({ infoGroupId: i }) {
  const [t, e] = Be("overview"), n = vc(i).filter(
    (l) => l.cider_type == "Compute"
  ), s = mt(
    n.length ? n.map(
      (l) => `https://rest-test.ccr.xdmod.org/rest/v0.1/custom_queries/wait_times/${l.info_resourceid}/`
    ) : null,
    { defaultValue: [] }
  ), r = mt(
    t !== "overview" ? `https://rest-test.ccr.xdmod.org/rest/v0.1/custom_queries/wait_times/${t}/queue/job_walltime` : null
  );
  if (!s.length || !n.length) return;
  const o = s.map((l, u) => l.error ? l : { ...l.data[0], ...n[u] }).filter((l) => !l.error);
  if (!o.length) return;
  const a = [
    /* @__PURE__ */ v("select", { value: t, onChange: (l) => e(l.target.value), children: [
      /* @__PURE__ */ v("option", { value: "overview", children: "Overview" }),
      o.map((l) => /* @__PURE__ */ v("option", { value: l.info_resourceid, children: Zi(l.resource_descriptive_name) }))
    ] })
  ];
  let c = null;
  if (t === "overview")
    c = /* @__PURE__ */ v("div", { class: "cards", children: o.map(
      ({
        info_resourceid: l,
        job_count: u,
        median_expansion_factor: h,
        median_wait_time: f,
        median_wall_time: d,
        resource_descriptive_name: p
      }) => /* @__PURE__ */ v("p", { class: "card metrics-overview", children: [
        /* @__PURE__ */ v("b", { children: [
          Zi(p),
          ":"
        ] }),
        " Users ran",
        " ",
        /* @__PURE__ */ v("strong", { children: [
          /* @__PURE__ */ v(Y, { name: "file-earmark-code" }),
          parseInt(u).toLocaleString("en-us"),
          " jobs"
        ] }),
        " ",
        "during the last 30 days. Waiting in the queue caused an average",
        " ",
        /* @__PURE__ */ v("strong", { children: [
          /* @__PURE__ */ v(Y, { name: "calculator" }),
          ((h - 1) * 100).toLocaleString(
            "en-us",
            {
              maximumFractionDigits: 0
            }
          ),
          "% increase"
        ] }),
        " ",
        "in the total completion time. The average job waited for",
        " ",
        /* @__PURE__ */ v("strong", { children: [
          /* @__PURE__ */ v(Y, { name: "hourglass-split" }),
          " ",
          Bo(f)
        ] }),
        " ",
        "and ran for",
        " ",
        /* @__PURE__ */ v("strong", { children: [
          /* @__PURE__ */ v(Y, { name: "stopwatch" }),
          Bo(d)
        ] }),
        ".",
        " ",
        /* @__PURE__ */ v(
          "a",
          {
            title: `Wait time chart for ${Zi(
              p
            )}`,
            href: "#",
            onClick: (m) => {
              m.preventDefault(), e(l);
            },
            children: "View chart »"
          }
        )
      ] })
    ) });
  else if (r && r.info_resource_id === t) {
    const l = {}, u = Zn;
    for (let p of r.data)
      l[p.queue] = l[p.queue] || {
        label: p.queue,
        data: Array(Zn.length).fill(null)
      }, l[p.queue].data[Zn.indexOf(p.job_walltime)] = p.median_wait_time / 60;
    const h = Object.values(l);
    h.forEach((p, m) => {
      let b = Io[m % (Io.length - 1)];
      p.backgroundColor = getComputedStyle(document.body).getPropertyValue(
        b
      );
    });
    const f = o.find(
      (p) => p.info_resourceid == r.info_resource_id
    ), d = {
      interaction: {
        intersect: !1,
        mode: "index"
      },
      plugins: {
        title: {
          display: !0,
          text: `Median Wait Time by Queue on ${Zi(
            f.resource_descriptive_name
          )}: Last 30 Days`
        }
      },
      scales: {
        x: {
          title: { display: !0, text: "Job Wall Time (Run Time)" }
        },
        y: {
          title: { display: !0, text: "Median Wait Time (Minutes)" }
        }
      }
    };
    c = /* @__PURE__ */ v(wt, { children: [
      /* @__PURE__ */ v(Up, { type: "bar", data: { labels: u, datasets: h }, options: d }),
      /* @__PURE__ */ v("p", { children: /* @__PURE__ */ v(
        "a",
        {
          href: "#",
          onClick: (p) => {
            p.preventDefault(), e("overview");
          },
          children: "« Back to overview"
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ v(
    Bt,
    {
      title: "Wait Time",
      icon: "hourglass-split",
      headerComponents: a,
      children: [
        c,
        /* @__PURE__ */ v("p", { class: "metrics-disclaimer", children: [
          /* @__PURE__ */ v(Y, { name: "info-circle" }),
          "These metrics describe activity from ACCESS projects. Many resources have additional projects that are not part of ACCESS."
        ] })
      ]
    }
  );
}
function Xt(i) {
  return Array.isArray ? Array.isArray(i) : ic(i) === "[object Array]";
}
function Xp(i) {
  if (typeof i == "string")
    return i;
  let t = i + "";
  return t == "0" && 1 / i == -1 / 0 ? "-0" : t;
}
function Kp(i) {
  return i == null ? "" : Xp(i);
}
function It(i) {
  return typeof i == "string";
}
function tc(i) {
  return typeof i == "number";
}
function qp(i) {
  return i === !0 || i === !1 || Qp(i) && ic(i) == "[object Boolean]";
}
function ec(i) {
  return typeof i == "object";
}
function Qp(i) {
  return ec(i) && i !== null;
}
function dt(i) {
  return i != null;
}
function Jn(i) {
  return !i.trim().length;
}
function ic(i) {
  return i == null ? i === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(i);
}
const Zp = "Incorrect 'index' type", Gp = (i) => `Invalid value for key ${i}`, Jp = (i) => `Pattern length exceeds max of ${i}.`, tg = (i) => `Missing ${i} property in key`, eg = (i) => `Property 'weight' in key '${i}' must be a positive integer`, zo = Object.prototype.hasOwnProperty;
class ig {
  constructor(t) {
    this._keys = [], this._keyMap = {};
    let e = 0;
    t.forEach((n) => {
      let s = nc(n);
      this._keys.push(s), this._keyMap[s.id] = s, e += s.weight;
    }), this._keys.forEach((n) => {
      n.weight /= e;
    });
  }
  get(t) {
    return this._keyMap[t];
  }
  keys() {
    return this._keys;
  }
  toJSON() {
    return JSON.stringify(this._keys);
  }
}
function nc(i) {
  let t = null, e = null, n = null, s = 1, r = null;
  if (It(i) || Xt(i))
    n = i, t = Ho(i), e = ys(i);
  else {
    if (!zo.call(i, "name"))
      throw new Error(tg("name"));
    const o = i.name;
    if (n = o, zo.call(i, "weight") && (s = i.weight, s <= 0))
      throw new Error(eg(o));
    t = Ho(o), e = ys(o), r = i.getFn;
  }
  return { path: t, id: e, weight: s, src: n, getFn: r };
}
function Ho(i) {
  return Xt(i) ? i : i.split(".");
}
function ys(i) {
  return Xt(i) ? i.join(".") : i;
}
function ng(i, t) {
  let e = [], n = !1;
  const s = (r, o, a) => {
    if (dt(r))
      if (!o[a])
        e.push(r);
      else {
        let c = o[a];
        const l = r[c];
        if (!dt(l))
          return;
        if (a === o.length - 1 && (It(l) || tc(l) || qp(l)))
          e.push(Kp(l));
        else if (Xt(l)) {
          n = !0;
          for (let u = 0, h = l.length; u < h; u += 1)
            s(l[u], o, a + 1);
        } else o.length && s(l, o, a + 1);
      }
  };
  return s(i, It(t) ? t.split(".") : t, 0), n ? e : e[0];
}
const sg = {
  // Whether the matches should be included in the result set. When `true`, each record in the result
  // set will include the indices of the matched characters.
  // These can consequently be used for highlighting purposes.
  includeMatches: !1,
  // When `true`, the matching function will continue to the end of a search pattern even if
  // a perfect match has already been located in the string.
  findAllMatches: !1,
  // Minimum number of characters that must be matched before a result is considered a match
  minMatchCharLength: 1
}, rg = {
  // When `true`, the algorithm continues searching to the end of the input even if a perfect
  // match is found before the end of the same input.
  isCaseSensitive: !1,
  // When `true`, the algorithm will ignore diacritics (accents) in comparisons
  ignoreDiacritics: !1,
  // When true, the matching function will continue to the end of a search pattern even if
  includeScore: !1,
  // List of properties that will be searched. This also supports nested properties.
  keys: [],
  // Whether to sort the result list, by score
  shouldSort: !0,
  // Default sort function: sort by ascending score, ascending index
  sortFn: (i, t) => i.score === t.score ? i.idx < t.idx ? -1 : 1 : i.score < t.score ? -1 : 1
}, og = {
  // Approximately where in the text is the pattern expected to be found?
  location: 0,
  // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match
  // (of both letters and location), a threshold of '1.0' would match anything.
  threshold: 0.6,
  // Determines how close the match must be to the fuzzy location (specified above).
  // An exact letter match which is 'distance' characters away from the fuzzy location
  // would score as a complete mismatch. A distance of '0' requires the match be at
  // the exact location specified, a threshold of '1000' would require a perfect match
  // to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.
  distance: 100
}, ag = {
  // When `true`, it enables the use of unix-like search commands
  useExtendedSearch: !1,
  // The get function to use when fetching an object's properties.
  // The default will search nested paths *ie foo.bar.baz*
  getFn: ng,
  // When `true`, search will ignore `location` and `distance`, so it won't matter
  // where in the string the pattern appears.
  // More info: https://fusejs.io/concepts/scoring-theory.html#fuzziness-score
  ignoreLocation: !1,
  // When `true`, the calculation for the relevance score (used for sorting) will
  // ignore the field-length norm.
  // More info: https://fusejs.io/concepts/scoring-theory.html#field-length-norm
  ignoreFieldNorm: !1,
  // The weight to determine how much field length norm effects scoring.
  fieldNormWeight: 1
};
var P = {
  ...rg,
  ...sg,
  ...og,
  ...ag
};
const cg = /[^ ]+/g;
function lg(i = 1, t = 3) {
  const e = /* @__PURE__ */ new Map(), n = Math.pow(10, t);
  return {
    get(s) {
      const r = s.match(cg).length;
      if (e.has(r))
        return e.get(r);
      const o = 1 / Math.pow(r, 0.5 * i), a = parseFloat(Math.round(o * n) / n);
      return e.set(r, a), a;
    },
    clear() {
      e.clear();
    }
  };
}
class qs {
  constructor({
    getFn: t = P.getFn,
    fieldNormWeight: e = P.fieldNormWeight
  } = {}) {
    this.norm = lg(e, 3), this.getFn = t, this.isCreated = !1, this.setIndexRecords();
  }
  setSources(t = []) {
    this.docs = t;
  }
  setIndexRecords(t = []) {
    this.records = t;
  }
  setKeys(t = []) {
    this.keys = t, this._keysMap = {}, t.forEach((e, n) => {
      this._keysMap[e.id] = n;
    });
  }
  create() {
    this.isCreated || !this.docs.length || (this.isCreated = !0, It(this.docs[0]) ? this.docs.forEach((t, e) => {
      this._addString(t, e);
    }) : this.docs.forEach((t, e) => {
      this._addObject(t, e);
    }), this.norm.clear());
  }
  // Adds a doc to the end of the index
  add(t) {
    const e = this.size();
    It(t) ? this._addString(t, e) : this._addObject(t, e);
  }
  // Removes the doc at the specified index of the index
  removeAt(t) {
    this.records.splice(t, 1);
    for (let e = t, n = this.size(); e < n; e += 1)
      this.records[e].i -= 1;
  }
  getValueForItemAtKeyId(t, e) {
    return t[this._keysMap[e]];
  }
  size() {
    return this.records.length;
  }
  _addString(t, e) {
    if (!dt(t) || Jn(t))
      return;
    let n = {
      v: t,
      i: e,
      n: this.norm.get(t)
    };
    this.records.push(n);
  }
  _addObject(t, e) {
    let n = { i: e, $: {} };
    this.keys.forEach((s, r) => {
      let o = s.getFn ? s.getFn(t) : this.getFn(t, s.path);
      if (dt(o)) {
        if (Xt(o)) {
          let a = [];
          const c = [{ nestedArrIndex: -1, value: o }];
          for (; c.length; ) {
            const { nestedArrIndex: l, value: u } = c.pop();
            if (dt(u))
              if (It(u) && !Jn(u)) {
                let h = {
                  v: u,
                  i: l,
                  n: this.norm.get(u)
                };
                a.push(h);
              } else Xt(u) && u.forEach((h, f) => {
                c.push({
                  nestedArrIndex: f,
                  value: h
                });
              });
          }
          n.$[r] = a;
        } else if (It(o) && !Jn(o)) {
          let a = {
            v: o,
            n: this.norm.get(o)
          };
          n.$[r] = a;
        }
      }
    }), this.records.push(n);
  }
  toJSON() {
    return {
      keys: this.keys,
      records: this.records
    };
  }
}
function sc(i, t, { getFn: e = P.getFn, fieldNormWeight: n = P.fieldNormWeight } = {}) {
  const s = new qs({ getFn: e, fieldNormWeight: n });
  return s.setKeys(i.map(nc)), s.setSources(t), s.create(), s;
}
function ug(i, { getFn: t = P.getFn, fieldNormWeight: e = P.fieldNormWeight } = {}) {
  const { keys: n, records: s } = i, r = new qs({ getFn: t, fieldNormWeight: e });
  return r.setKeys(n), r.setIndexRecords(s), r;
}
function Gi(i, {
  errors: t = 0,
  currentLocation: e = 0,
  expectedLocation: n = 0,
  distance: s = P.distance,
  ignoreLocation: r = P.ignoreLocation
} = {}) {
  const o = t / i.length;
  if (r)
    return o;
  const a = Math.abs(n - e);
  return s ? o + a / s : a ? 1 : o;
}
function hg(i = [], t = P.minMatchCharLength) {
  let e = [], n = -1, s = -1, r = 0;
  for (let o = i.length; r < o; r += 1) {
    let a = i[r];
    a && n === -1 ? n = r : !a && n !== -1 && (s = r - 1, s - n + 1 >= t && e.push([n, s]), n = -1);
  }
  return i[r - 1] && r - n >= t && e.push([n, r - 1]), e;
}
const ge = 32;
function fg(i, t, e, {
  location: n = P.location,
  distance: s = P.distance,
  threshold: r = P.threshold,
  findAllMatches: o = P.findAllMatches,
  minMatchCharLength: a = P.minMatchCharLength,
  includeMatches: c = P.includeMatches,
  ignoreLocation: l = P.ignoreLocation
} = {}) {
  if (t.length > ge)
    throw new Error(Jp(ge));
  const u = t.length, h = i.length, f = Math.max(0, Math.min(n, h));
  let d = r, p = f;
  const m = a > 1 || c, b = m ? Array(h) : [];
  let y;
  for (; (y = i.indexOf(t, p)) > -1; ) {
    let A = Gi(t, {
      currentLocation: y,
      expectedLocation: f,
      distance: s,
      ignoreLocation: l
    });
    if (d = Math.min(A, d), p = y + u, m) {
      let M = 0;
      for (; M < u; )
        b[y + M] = 1, M += 1;
    }
  }
  p = -1;
  let x = [], S = 1, g = u + h;
  const k = 1 << u - 1;
  for (let A = 0; A < u; A += 1) {
    let M = 0, O = g;
    for (; M < O; )
      Gi(t, {
        errors: A,
        currentLocation: f + O,
        expectedLocation: f,
        distance: s,
        ignoreLocation: l
      }) <= d ? M = O : g = O, O = Math.floor((g - M) / 2 + M);
    g = O;
    let E = Math.max(1, f - O + 1), T = o ? h : Math.min(f + O, h) + u, D = Array(T + 2);
    D[T + 1] = (1 << A) - 1;
    for (let z = T; z >= E; z -= 1) {
      let L = z - 1, B = e[i.charAt(L)];
      if (m && (b[L] = +!!B), D[z] = (D[z + 1] << 1 | 1) & B, A && (D[z] |= (x[z + 1] | x[z]) << 1 | 1 | x[z + 1]), D[z] & k && (S = Gi(t, {
        errors: A,
        currentLocation: L,
        expectedLocation: f,
        distance: s,
        ignoreLocation: l
      }), S <= d)) {
        if (d = S, p = L, p <= f)
          break;
        E = Math.max(1, 2 * f - p);
      }
    }
    if (Gi(t, {
      errors: A + 1,
      currentLocation: f,
      expectedLocation: f,
      distance: s,
      ignoreLocation: l
    }) > d)
      break;
    x = D;
  }
  const w = {
    isMatch: p >= 0,
    // Count exact matches (those with a score of 0) to be "almost" exact
    score: Math.max(1e-3, S)
  };
  if (m) {
    const A = hg(b, a);
    A.length ? c && (w.indices = A) : w.isMatch = !1;
  }
  return w;
}
function dg(i) {
  let t = {};
  for (let e = 0, n = i.length; e < n; e += 1) {
    const s = i.charAt(e);
    t[s] = (t[s] || 0) | 1 << n - e - 1;
  }
  return t;
}
const wn = String.prototype.normalize ? (i) => i.normalize("NFD").replace(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g, "") : (i) => i;
class rc {
  constructor(t, {
    location: e = P.location,
    threshold: n = P.threshold,
    distance: s = P.distance,
    includeMatches: r = P.includeMatches,
    findAllMatches: o = P.findAllMatches,
    minMatchCharLength: a = P.minMatchCharLength,
    isCaseSensitive: c = P.isCaseSensitive,
    ignoreDiacritics: l = P.ignoreDiacritics,
    ignoreLocation: u = P.ignoreLocation
  } = {}) {
    if (this.options = {
      location: e,
      threshold: n,
      distance: s,
      includeMatches: r,
      findAllMatches: o,
      minMatchCharLength: a,
      isCaseSensitive: c,
      ignoreDiacritics: l,
      ignoreLocation: u
    }, t = c ? t : t.toLowerCase(), t = l ? wn(t) : t, this.pattern = t, this.chunks = [], !this.pattern.length)
      return;
    const h = (d, p) => {
      this.chunks.push({
        pattern: d,
        alphabet: dg(d),
        startIndex: p
      });
    }, f = this.pattern.length;
    if (f > ge) {
      let d = 0;
      const p = f % ge, m = f - p;
      for (; d < m; )
        h(this.pattern.substr(d, ge), d), d += ge;
      if (p) {
        const b = f - ge;
        h(this.pattern.substr(b), b);
      }
    } else
      h(this.pattern, 0);
  }
  searchIn(t) {
    const { isCaseSensitive: e, ignoreDiacritics: n, includeMatches: s } = this.options;
    if (t = e ? t : t.toLowerCase(), t = n ? wn(t) : t, this.pattern === t) {
      let m = {
        isMatch: !0,
        score: 0
      };
      return s && (m.indices = [[0, t.length - 1]]), m;
    }
    const {
      location: r,
      distance: o,
      threshold: a,
      findAllMatches: c,
      minMatchCharLength: l,
      ignoreLocation: u
    } = this.options;
    let h = [], f = 0, d = !1;
    this.chunks.forEach(({ pattern: m, alphabet: b, startIndex: y }) => {
      const { isMatch: x, score: S, indices: g } = fg(t, m, b, {
        location: r + y,
        distance: o,
        threshold: a,
        findAllMatches: c,
        minMatchCharLength: l,
        includeMatches: s,
        ignoreLocation: u
      });
      x && (d = !0), f += S, x && g && (h = [...h, ...g]);
    });
    let p = {
      isMatch: d,
      score: d ? f / this.chunks.length : 1
    };
    return d && s && (p.indices = h), p;
  }
}
class oe {
  constructor(t) {
    this.pattern = t;
  }
  static isMultiMatch(t) {
    return jo(t, this.multiRegex);
  }
  static isSingleMatch(t) {
    return jo(t, this.singleRegex);
  }
  search() {
  }
}
function jo(i, t) {
  const e = i.match(t);
  return e ? e[1] : null;
}
class pg extends oe {
  constructor(t) {
    super(t);
  }
  static get type() {
    return "exact";
  }
  static get multiRegex() {
    return /^="(.*)"$/;
  }
  static get singleRegex() {
    return /^=(.*)$/;
  }
  search(t) {
    const e = t === this.pattern;
    return {
      isMatch: e,
      score: e ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class gg extends oe {
  constructor(t) {
    super(t);
  }
  static get type() {
    return "inverse-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"$/;
  }
  static get singleRegex() {
    return /^!(.*)$/;
  }
  search(t) {
    const n = t.indexOf(this.pattern) === -1;
    return {
      isMatch: n,
      score: n ? 0 : 1,
      indices: [0, t.length - 1]
    };
  }
}
class mg extends oe {
  constructor(t) {
    super(t);
  }
  static get type() {
    return "prefix-exact";
  }
  static get multiRegex() {
    return /^\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^\^(.*)$/;
  }
  search(t) {
    const e = t.startsWith(this.pattern);
    return {
      isMatch: e,
      score: e ? 0 : 1,
      indices: [0, this.pattern.length - 1]
    };
  }
}
class bg extends oe {
  constructor(t) {
    super(t);
  }
  static get type() {
    return "inverse-prefix-exact";
  }
  static get multiRegex() {
    return /^!\^"(.*)"$/;
  }
  static get singleRegex() {
    return /^!\^(.*)$/;
  }
  search(t) {
    const e = !t.startsWith(this.pattern);
    return {
      isMatch: e,
      score: e ? 0 : 1,
      indices: [0, t.length - 1]
    };
  }
}
class vg extends oe {
  constructor(t) {
    super(t);
  }
  static get type() {
    return "suffix-exact";
  }
  static get multiRegex() {
    return /^"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^(.*)\$$/;
  }
  search(t) {
    const e = t.endsWith(this.pattern);
    return {
      isMatch: e,
      score: e ? 0 : 1,
      indices: [t.length - this.pattern.length, t.length - 1]
    };
  }
}
class yg extends oe {
  constructor(t) {
    super(t);
  }
  static get type() {
    return "inverse-suffix-exact";
  }
  static get multiRegex() {
    return /^!"(.*)"\$$/;
  }
  static get singleRegex() {
    return /^!(.*)\$$/;
  }
  search(t) {
    const e = !t.endsWith(this.pattern);
    return {
      isMatch: e,
      score: e ? 0 : 1,
      indices: [0, t.length - 1]
    };
  }
}
class oc extends oe {
  constructor(t, {
    location: e = P.location,
    threshold: n = P.threshold,
    distance: s = P.distance,
    includeMatches: r = P.includeMatches,
    findAllMatches: o = P.findAllMatches,
    minMatchCharLength: a = P.minMatchCharLength,
    isCaseSensitive: c = P.isCaseSensitive,
    ignoreDiacritics: l = P.ignoreDiacritics,
    ignoreLocation: u = P.ignoreLocation
  } = {}) {
    super(t), this._bitapSearch = new rc(t, {
      location: e,
      threshold: n,
      distance: s,
      includeMatches: r,
      findAllMatches: o,
      minMatchCharLength: a,
      isCaseSensitive: c,
      ignoreDiacritics: l,
      ignoreLocation: u
    });
  }
  static get type() {
    return "fuzzy";
  }
  static get multiRegex() {
    return /^"(.*)"$/;
  }
  static get singleRegex() {
    return /^(.*)$/;
  }
  search(t) {
    return this._bitapSearch.searchIn(t);
  }
}
class ac extends oe {
  constructor(t) {
    super(t);
  }
  static get type() {
    return "include";
  }
  static get multiRegex() {
    return /^'"(.*)"$/;
  }
  static get singleRegex() {
    return /^'(.*)$/;
  }
  search(t) {
    let e = 0, n;
    const s = [], r = this.pattern.length;
    for (; (n = t.indexOf(this.pattern, e)) > -1; )
      e = n + r, s.push([n, e - 1]);
    const o = !!s.length;
    return {
      isMatch: o,
      score: o ? 0 : 1,
      indices: s
    };
  }
}
const xs = [
  pg,
  ac,
  mg,
  bg,
  yg,
  vg,
  gg,
  oc
], Wo = xs.length, xg = / +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/, _g = "|";
function wg(i, t = {}) {
  return i.split(_g).map((e) => {
    let n = e.trim().split(xg).filter((r) => r && !!r.trim()), s = [];
    for (let r = 0, o = n.length; r < o; r += 1) {
      const a = n[r];
      let c = !1, l = -1;
      for (; !c && ++l < Wo; ) {
        const u = xs[l];
        let h = u.isMultiMatch(a);
        h && (s.push(new u(h, t)), c = !0);
      }
      if (!c)
        for (l = -1; ++l < Wo; ) {
          const u = xs[l];
          let h = u.isSingleMatch(a);
          if (h) {
            s.push(new u(h, t));
            break;
          }
        }
    }
    return s;
  });
}
const Sg = /* @__PURE__ */ new Set([oc.type, ac.type]);
class kg {
  constructor(t, {
    isCaseSensitive: e = P.isCaseSensitive,
    ignoreDiacritics: n = P.ignoreDiacritics,
    includeMatches: s = P.includeMatches,
    minMatchCharLength: r = P.minMatchCharLength,
    ignoreLocation: o = P.ignoreLocation,
    findAllMatches: a = P.findAllMatches,
    location: c = P.location,
    threshold: l = P.threshold,
    distance: u = P.distance
  } = {}) {
    this.query = null, this.options = {
      isCaseSensitive: e,
      ignoreDiacritics: n,
      includeMatches: s,
      minMatchCharLength: r,
      findAllMatches: a,
      ignoreLocation: o,
      location: c,
      threshold: l,
      distance: u
    }, t = e ? t : t.toLowerCase(), t = n ? wn(t) : t, this.pattern = t, this.query = wg(this.pattern, this.options);
  }
  static condition(t, e) {
    return e.useExtendedSearch;
  }
  searchIn(t) {
    const e = this.query;
    if (!e)
      return {
        isMatch: !1,
        score: 1
      };
    const { includeMatches: n, isCaseSensitive: s, ignoreDiacritics: r } = this.options;
    t = s ? t : t.toLowerCase(), t = r ? wn(t) : t;
    let o = 0, a = [], c = 0;
    for (let l = 0, u = e.length; l < u; l += 1) {
      const h = e[l];
      a.length = 0, o = 0;
      for (let f = 0, d = h.length; f < d; f += 1) {
        const p = h[f], { isMatch: m, indices: b, score: y } = p.search(t);
        if (m) {
          if (o += 1, c += y, n) {
            const x = p.constructor.type;
            Sg.has(x) ? a = [...a, ...b] : a.push(b);
          }
        } else {
          c = 0, o = 0, a.length = 0;
          break;
        }
      }
      if (o) {
        let f = {
          isMatch: !0,
          score: c / o
        };
        return n && (f.indices = a), f;
      }
    }
    return {
      isMatch: !1,
      score: 1
    };
  }
}
const _s = [];
function Ag(...i) {
  _s.push(...i);
}
function ws(i, t) {
  for (let e = 0, n = _s.length; e < n; e += 1) {
    let s = _s[e];
    if (s.condition(i, t))
      return new s(i, t);
  }
  return new rc(i, t);
}
const Sn = {
  AND: "$and",
  OR: "$or"
}, Ss = {
  PATH: "$path",
  PATTERN: "$val"
}, ks = (i) => !!(i[Sn.AND] || i[Sn.OR]), Mg = (i) => !!i[Ss.PATH], Og = (i) => !Xt(i) && ec(i) && !ks(i), No = (i) => ({
  [Sn.AND]: Object.keys(i).map((t) => ({
    [t]: i[t]
  }))
});
function cc(i, t, { auto: e = !0 } = {}) {
  const n = (s) => {
    let r = Object.keys(s);
    const o = Mg(s);
    if (!o && r.length > 1 && !ks(s))
      return n(No(s));
    if (Og(s)) {
      const c = o ? s[Ss.PATH] : r[0], l = o ? s[Ss.PATTERN] : s[c];
      if (!It(l))
        throw new Error(Gp(c));
      const u = {
        keyId: ys(c),
        pattern: l
      };
      return e && (u.searcher = ws(l, t)), u;
    }
    let a = {
      children: [],
      operator: r[0]
    };
    return r.forEach((c) => {
      const l = s[c];
      Xt(l) && l.forEach((u) => {
        a.children.push(n(u));
      });
    }), a;
  };
  return ks(i) || (i = No(i)), n(i);
}
function Dg(i, { ignoreFieldNorm: t = P.ignoreFieldNorm }) {
  i.forEach((e) => {
    let n = 1;
    e.matches.forEach(({ key: s, norm: r, score: o }) => {
      const a = s ? s.weight : null;
      n *= Math.pow(
        o === 0 && a ? Number.EPSILON : o,
        (a || 1) * (t ? 1 : r)
      );
    }), e.score = n;
  });
}
function Cg(i, t) {
  const e = i.matches;
  t.matches = [], dt(e) && e.forEach((n) => {
    if (!dt(n.indices) || !n.indices.length)
      return;
    const { indices: s, value: r } = n;
    let o = {
      indices: s,
      value: r
    };
    n.key && (o.key = n.key.src), n.idx > -1 && (o.refIndex = n.idx), t.matches.push(o);
  });
}
function Tg(i, t) {
  t.score = i.score;
}
function Eg(i, t, {
  includeMatches: e = P.includeMatches,
  includeScore: n = P.includeScore
} = {}) {
  const s = [];
  return e && s.push(Cg), n && s.push(Tg), i.map((r) => {
    const { idx: o } = r, a = {
      item: t[o],
      refIndex: o
    };
    return s.length && s.forEach((c) => {
      c(r, a);
    }), a;
  });
}
class We {
  constructor(t, e = {}, n) {
    this.options = { ...P, ...e }, this.options.useExtendedSearch, this._keyStore = new ig(this.options.keys), this.setCollection(t, n);
  }
  setCollection(t, e) {
    if (this._docs = t, e && !(e instanceof qs))
      throw new Error(Zp);
    this._myIndex = e || sc(this.options.keys, this._docs, {
      getFn: this.options.getFn,
      fieldNormWeight: this.options.fieldNormWeight
    });
  }
  add(t) {
    dt(t) && (this._docs.push(t), this._myIndex.add(t));
  }
  remove(t = () => !1) {
    const e = [];
    for (let n = 0, s = this._docs.length; n < s; n += 1) {
      const r = this._docs[n];
      t(r, n) && (this.removeAt(n), n -= 1, s -= 1, e.push(r));
    }
    return e;
  }
  removeAt(t) {
    this._docs.splice(t, 1), this._myIndex.removeAt(t);
  }
  getIndex() {
    return this._myIndex;
  }
  search(t, { limit: e = -1 } = {}) {
    const {
      includeMatches: n,
      includeScore: s,
      shouldSort: r,
      sortFn: o,
      ignoreFieldNorm: a
    } = this.options;
    let c = It(t) ? It(this._docs[0]) ? this._searchStringList(t) : this._searchObjectList(t) : this._searchLogical(t);
    return Dg(c, { ignoreFieldNorm: a }), r && c.sort(o), tc(e) && e > -1 && (c = c.slice(0, e)), Eg(c, this._docs, {
      includeMatches: n,
      includeScore: s
    });
  }
  _searchStringList(t) {
    const e = ws(t, this.options), { records: n } = this._myIndex, s = [];
    return n.forEach(({ v: r, i: o, n: a }) => {
      if (!dt(r))
        return;
      const { isMatch: c, score: l, indices: u } = e.searchIn(r);
      c && s.push({
        item: r,
        idx: o,
        matches: [{ score: l, value: r, norm: a, indices: u }]
      });
    }), s;
  }
  _searchLogical(t) {
    const e = cc(t, this.options), n = (a, c, l) => {
      if (!a.children) {
        const { keyId: h, searcher: f } = a, d = this._findMatches({
          key: this._keyStore.get(h),
          value: this._myIndex.getValueForItemAtKeyId(c, h),
          searcher: f
        });
        return d && d.length ? [
          {
            idx: l,
            item: c,
            matches: d
          }
        ] : [];
      }
      const u = [];
      for (let h = 0, f = a.children.length; h < f; h += 1) {
        const d = a.children[h], p = n(d, c, l);
        if (p.length)
          u.push(...p);
        else if (a.operator === Sn.AND)
          return [];
      }
      return u;
    }, s = this._myIndex.records, r = {}, o = [];
    return s.forEach(({ $: a, i: c }) => {
      if (dt(a)) {
        let l = n(e, a, c);
        l.length && (r[c] || (r[c] = { idx: c, item: a, matches: [] }, o.push(r[c])), l.forEach(({ matches: u }) => {
          r[c].matches.push(...u);
        }));
      }
    }), o;
  }
  _searchObjectList(t) {
    const e = ws(t, this.options), { keys: n, records: s } = this._myIndex, r = [];
    return s.forEach(({ $: o, i: a }) => {
      if (!dt(o))
        return;
      let c = [];
      n.forEach((l, u) => {
        c.push(
          ...this._findMatches({
            key: l,
            value: o[u],
            searcher: e
          })
        );
      }), c.length && r.push({
        idx: a,
        item: o,
        matches: c
      });
    }), r;
  }
  _findMatches({ key: t, value: e, searcher: n }) {
    if (!dt(e))
      return [];
    let s = [];
    if (Xt(e))
      e.forEach(({ v: r, i: o, n: a }) => {
        if (!dt(r))
          return;
        const { isMatch: c, score: l, indices: u } = n.searchIn(r);
        c && s.push({
          score: l,
          key: t,
          value: r,
          idx: o,
          norm: a,
          indices: u
        });
      });
    else {
      const { v: r, n: o } = e, { isMatch: a, score: c, indices: l } = n.searchIn(r);
      a && s.push({ score: c, key: t, value: r, norm: o, indices: l });
    }
    return s;
  }
}
We.version = "7.1.0";
We.createIndex = sc;
We.parseIndex = ug;
We.config = P;
We.parseQuery = cc;
Ag(kg);
function Pg({ highlight: i, text: t }) {
  if (!i || !i.length) return t;
  const e = new RegExp(
    i.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
    "gi"
  ), n = [...t.matchAll(e)];
  if (!n.length) return t;
  const s = [];
  let r = 0;
  for (let o of n)
    o.index > r && s.push(t.substr(r, o.index)), s.push(/* @__PURE__ */ v("span", { class: "highlight", children: o[0] })), r = o.index + o[0].length;
  return s.push(t.substr(r)), s;
}
function Rg({
  delay: i = 300,
  placeholder: t,
  setSearchText: e,
  width: n = "calc(var(--width) / 4)"
}) {
  const s = ie(null), r = ie(null), [o, a] = Be(""), c = () => {
    a(""), e(""), s.current.value = "", s.current.focus();
  };
  return bi(() => {
    s.current && s.current.addEventListener("keyup", () => {
      r.current && clearTimeout(r.current), r.current = setTimeout(() => {
        r.current = null, e(s.current.value), a(s.current.value);
      }, i);
    });
  }, [s.current]), /* @__PURE__ */ v(wt, { children: /* @__PURE__ */ v("div", { class: "search", children: [
    /* @__PURE__ */ v("input", { placeholder: t, style: { width: n }, ref: s }),
    o.length ? /* @__PURE__ */ v(
      "button",
      {
        class: "btn btn-clear",
        title: "Clear search",
        onClick: c,
        children: /* @__PURE__ */ v(Y, { name: "x-lg" })
      }
    ) : null
  ] }) });
}
const Lg = [
  "software_name",
  "software_description",
  "software_web_page",
  "software_documentation",
  "software_use_link"
];
function Fg({ infoGroupId: i }) {
  const t = mt(
    `https://ara-db.ccs.uky.edu/api=API_0/z0CiQbts8t4pnv6fJQD4g9nskbCOl6UD-67akYK68wk/rp=${i}?include=${Lg.join(",")}`
  ), [e, n] = Be(""), s = yc(
    () => t && t.length ? new We(t, {
      keys: [
        { name: "software_name", weight: 0.6 },
        { name: "software_description", weight: 0.4 }
      ]
    }) : null,
    [t]
  );
  if (!t || !t.length) return;
  const r = (f) => /* @__PURE__ */ v(Pg, { text: f, highlight: e }), l = [
    {
      key: "software_name",
      name: "Package",
      format: (f, d) => {
        const p = [], m = r(f), b = d.software_web_page || d.software_documentation;
        return p.push(b ? /* @__PURE__ */ v("a", { href: b, children: m }) : m), d.software_documentation && p.push(
          /* @__PURE__ */ v(wt, { children: " " }),
          /* @__PURE__ */ v(
            "a",
            {
              href: d.software_documentation,
              title: `Documentation for ${f}`,
              children: /* @__PURE__ */ v(Y, { name: "book" })
            }
          )
        ), d.software_use_link && d.software_use_link != d.software_documentation && p.push(
          /* @__PURE__ */ v(wt, { children: " " }),
          /* @__PURE__ */ v(
            "a",
            {
              href: d.software_use_link.split(`
`)[0].trim(),
              title: `Usage example for ${f}`,
              children: /* @__PURE__ */ v(Y, { name: "terminal" })
            }
          )
        ), /* @__PURE__ */ v("span", { style: { lineHeight: 1.3 }, children: p });
      }
    },
    {
      key: "software_versions",
      name: "Versions",
      format: (f, d) => f.map(
        (p) => p.replace(`${d.rp_name}: `, "").split(",").join(", ")
      )
    },
    {
      key: "software_description",
      name: "Description",
      format: (f, d) => {
        const p = /Description Source:[ ]+(http[^ ]+)/, m = f.match(p);
        return /* @__PURE__ */ v(wt, { children: [
          r(f.replace(p, "")),
          " ",
          m ? /* @__PURE__ */ v(
            "a",
            {
              href: m[1],
              title: `Description source for ${d.software_name}`,
              children: /* @__PURE__ */ v(Y, { name: "info-circle" })
            }
          ) : null
        ] });
      }
    }
  ], u = e.length ? s.search(e).map((f) => f.item) : t;
  return /* @__PURE__ */ v(
    Bt,
    {
      title: "Software",
      icon: "terminal",
      headerComponents: [
        /* @__PURE__ */ v(
          Rg,
          {
            placeholder: "Search software packages...",
            setSearchText: n
          }
        )
      ],
      children: /* @__PURE__ */ v(kn, { columns: l, rows: u, scrollResetOnUpdate: !0 })
    }
  );
}
function Ig({ prompt: i = "Jump To:" }) {
  const [t, e] = Be([]), n = ie(null), s = () => {
    const o = [];
    for (let a of n.current.querySelectorAll(
      "[data-section-title]"
    ))
      o.push({
        icon: a.dataset.sectionIcon,
        id: a.id,
        title: a.dataset.sectionTitle
      });
    e(o);
  }, r = (o) => {
    const a = n.current.querySelector(`#${o}`);
    a && a.scrollIntoView();
  };
  return Vo(() => {
    n.current && (s(), document.addEventListener("accessci-update-sections", s));
  }, [n.current]), /* @__PURE__ */ v("div", { ref: (o) => n.current = o == null ? void 0 : o.parentElement, children: t.length >= 2 ? /* @__PURE__ */ v("nav", { class: "section-navigation", children: [
    i ? /* @__PURE__ */ v("h2", { children: i }) : null,
    /* @__PURE__ */ v("ul", { children: t.map(({ icon: o, id: a, title: c }) => /* @__PURE__ */ v("li", { children: /* @__PURE__ */ v(
      "a",
      {
        href: `#${a}`,
        onClick: (l) => {
          l.preventDefault(), r(a);
        },
        children: [
          o ? /* @__PURE__ */ v(wt, { children: [
            /* @__PURE__ */ v(Y, { name: o }),
            " "
          ] }) : null,
          c
        ]
      }
    ) })) })
  ] }) : null });
}
function $g({
  baseUri: i,
  infoGroupId: t,
  showBreadcrumbs: e = !0
}) {
  const n = vi(t), s = [{ name: "Resources", href: i }];
  return n && s.push({ name: n.name }), /* @__PURE__ */ v(wt, { children: [
    e && /* @__PURE__ */ v(
      xc,
      {
        expandWidth: !0,
        items: s,
        topBorder: !0
      }
    ),
    /* @__PURE__ */ v("div", { class: "resource-group-detail", children: [
      /* @__PURE__ */ v(wc, { infoGroupId: t }),
      /* @__PURE__ */ v(Ig, {}),
      /* @__PURE__ */ v(lu, { infoGroupId: t }),
      /* @__PURE__ */ v(iu, { infoGroupId: t }),
      /* @__PURE__ */ v(ou, { infoGroupId: t }),
      /* @__PURE__ */ v(_c, { infoGroupId: t }),
      /* @__PURE__ */ v(Fg, { infoGroupId: t }),
      /* @__PURE__ */ v(Ju, { infoGroupId: t }),
      /* @__PURE__ */ v(Yp, { infoGroupId: t }),
      /* @__PURE__ */ v(Ac, { infoGroupId: t })
    ] })
  ] });
}
export {
  $g as default
};
