var L, x, Ot, P, At, Dt, pt, mt, dt, ht, qt, G = {}, Ht = [], he = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, ct = Array.isArray;
function z(t, e) {
  for (var o in e) t[o] = e[o];
  return t;
}
function Jt(t) {
  t && t.parentNode && t.parentNode.removeChild(t);
}
function Y(t, e, o) {
  var r, i, n, s = {};
  for (n in e) n == "key" ? r = e[n] : n == "ref" ? i = e[n] : s[n] = e[n];
  if (arguments.length > 2 && (s.children = arguments.length > 3 ? L.call(arguments, 2) : o), typeof t == "function" && t.defaultProps != null) for (n in t.defaultProps) s[n] === void 0 && (s[n] = t.defaultProps[n]);
  return N(t, s, r, i, null);
}
function N(t, e, o, r, i) {
  var n = { type: t, props: e, key: o, ref: r, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: i ?? ++Ot, __i: -1, __u: 0 };
  return i == null && x.vnode != null && x.vnode(n), n;
}
function no() {
  return { current: null };
}
function Q(t) {
  return t.children;
}
function W(t, e) {
  this.props = t, this.context = e;
}
function D(t, e) {
  if (e == null) return t.__ ? D(t.__, t.__i + 1) : null;
  for (var o; e < t.__k.length; e++) if ((o = t.__k[e]) != null && o.__e != null) return o.__e;
  return typeof t.type == "function" ? D(t) : null;
}
function Rt(t) {
  var e, o;
  if ((t = t.__) != null && t.__c != null) {
    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++) if ((o = t.__k[e]) != null && o.__e != null) {
      t.__e = t.__c.base = o.__e;
      break;
    }
    return Rt(t);
  }
}
function ut(t) {
  (!t.__d && (t.__d = !0) && P.push(t) && !at.__r++ || At !== x.debounceRendering) && ((At = x.debounceRendering) || Dt)(at);
}
function at() {
  var t, e, o, r, i, n, s, a;
  for (P.sort(pt); t = P.shift(); ) t.__d && (e = P.length, r = void 0, n = (i = (o = t).__v).__e, s = [], a = [], o.__P && ((r = z({}, i)).__v = i.__v + 1, x.vnode && x.vnode(r), bt(o.__P, r, i, o.__n, o.__P.namespaceURI, 32 & i.__u ? [n] : null, s, n ?? D(i), !!(32 & i.__u), a), r.__v = i.__v, r.__.__k[r.__i] = r, Gt(s, r, a), r.__e != n && Rt(r)), P.length > e && P.sort(pt));
  at.__r = 0;
}
function Tt(t, e, o, r, i, n, s, a, l, d, g) {
  var c, f, u, h, m, y = r && r.__k || Ht, b = e.length;
  for (o.__d = l, ue(o, e, y), l = o.__d, c = 0; c < b; c++) (u = o.__k[c]) != null && (f = u.__i === -1 ? G : y[u.__i] || G, u.__i = c, bt(t, u, f, i, n, s, a, l, d, g), h = u.__e, u.ref && f.ref != u.ref && (f.ref && xt(f.ref, null, u), g.push(u.ref, u.__c || h, u)), m == null && h != null && (m = h), 65536 & u.__u || f.__k === u.__k ? l = Nt(u, l, t) : typeof u.type == "function" && u.__d !== void 0 ? l = u.__d : h && (l = h.nextSibling), u.__d = void 0, u.__u &= -196609);
  o.__d = l, o.__e = m;
}
function ue(t, e, o) {
  var r, i, n, s, a, l = e.length, d = o.length, g = d, c = 0;
  for (t.__k = [], r = 0; r < l; r++) (i = e[r]) != null && typeof i != "boolean" && typeof i != "function" ? (s = r + c, (i = t.__k[r] = typeof i == "string" || typeof i == "number" || typeof i == "bigint" || i.constructor == String ? N(null, i, null, null, null) : ct(i) ? N(Q, { children: i }, null, null, null) : i.constructor === void 0 && i.__b > 0 ? N(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i).__ = t, i.__b = t.__b + 1, n = null, (a = i.__i = ge(i, o, s, g)) !== -1 && (g--, (n = o[a]) && (n.__u |= 131072)), n == null || n.__v === null ? (a == -1 && c--, typeof i.type != "function" && (i.__u |= 65536)) : a !== s && (a == s - 1 ? c-- : a == s + 1 ? c++ : (a > s ? c-- : c++, i.__u |= 65536))) : i = t.__k[r] = null;
  if (g) for (r = 0; r < d; r++) (n = o[r]) != null && !(131072 & n.__u) && (n.__e == t.__d && (t.__d = D(n)), Lt(n, n));
}
function Nt(t, e, o) {
  var r, i;
  if (typeof t.type == "function") {
    for (r = t.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = t, e = Nt(r[i], e, o));
    return e;
  }
  t.__e != e && (e && t.type && !o.contains(e) && (e = D(t)), o.insertBefore(t.__e, e || null), e = t.__e);
  do
    e = e && e.nextSibling;
  while (e != null && e.nodeType === 8);
  return e;
}
function Wt(t, e) {
  return e = e || [], t == null || typeof t == "boolean" || (ct(t) ? t.some(function(o) {
    Wt(o, e);
  }) : e.push(t)), e;
}
function ge(t, e, o, r) {
  var i = t.key, n = t.type, s = o - 1, a = o + 1, l = e[o];
  if (l === null || l && i == l.key && n === l.type && !(131072 & l.__u)) return o;
  if (r > (l != null && !(131072 & l.__u) ? 1 : 0)) for (; s >= 0 || a < e.length; ) {
    if (s >= 0) {
      if ((l = e[s]) && !(131072 & l.__u) && i == l.key && n === l.type) return s;
      s--;
    }
    if (a < e.length) {
      if ((l = e[a]) && !(131072 & l.__u) && i == l.key && n === l.type) return a;
      a++;
    }
  }
  return -1;
}
function Ct(t, e, o) {
  e[0] === "-" ? t.setProperty(e, o ?? "") : t[e] = o == null ? "" : typeof o != "number" || he.test(e) ? o : o + "px";
}
function tt(t, e, o, r, i) {
  var n;
  t: if (e === "style") if (typeof o == "string") t.style.cssText = o;
  else {
    if (typeof r == "string" && (t.style.cssText = r = ""), r) for (e in r) o && e in o || Ct(t.style, e, "");
    if (o) for (e in o) r && o[e] === r[e] || Ct(t.style, e, o[e]);
  }
  else if (e[0] === "o" && e[1] === "n") n = e !== (e = e.replace(/(PointerCapture)$|Capture$/i, "$1")), e = e.toLowerCase() in t || e === "onFocusOut" || e === "onFocusIn" ? e.toLowerCase().slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + n] = o, o ? r ? o.u = r.u : (o.u = mt, t.addEventListener(e, n ? ht : dt, n)) : t.removeEventListener(e, n ? ht : dt, n);
  else {
    if (i == "http://www.w3.org/2000/svg") e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in t) try {
      t[e] = o ?? "";
      break t;
    } catch {
    }
    typeof o == "function" || (o == null || o === !1 && e[4] !== "-" ? t.removeAttribute(e) : t.setAttribute(e, e == "popover" && o == 1 ? "" : o));
  }
}
function St(t) {
  return function(e) {
    if (this.l) {
      var o = this.l[e.type + t];
      if (e.t == null) e.t = mt++;
      else if (e.t < o.u) return;
      return o(x.event ? x.event(e) : e);
    }
  };
}
function bt(t, e, o, r, i, n, s, a, l, d) {
  var g, c, f, u, h, m, y, b, w, S, C, B, I, $, K, _, A = e.type;
  if (e.constructor !== void 0) return null;
  128 & o.__u && (l = !!(32 & o.__u), n = [a = e.__e = o.__e]), (g = x.__b) && g(e);
  t: if (typeof A == "function") try {
    if (b = e.props, w = "prototype" in A && A.prototype.render, S = (g = A.contextType) && r[g.__c], C = g ? S ? S.props.value : g.__ : r, o.__c ? y = (c = e.__c = o.__c).__ = c.__E : (w ? e.__c = c = new A(b, C) : (e.__c = c = new W(b, C), c.constructor = A, c.render = me), S && S.sub(c), c.props = b, c.state || (c.state = {}), c.context = C, c.__n = r, f = c.__d = !0, c.__h = [], c._sb = []), w && c.__s == null && (c.__s = c.state), w && A.getDerivedStateFromProps != null && (c.__s == c.state && (c.__s = z({}, c.__s)), z(c.__s, A.getDerivedStateFromProps(b, c.__s))), u = c.props, h = c.state, c.__v = e, f) w && A.getDerivedStateFromProps == null && c.componentWillMount != null && c.componentWillMount(), w && c.componentDidMount != null && c.__h.push(c.componentDidMount);
    else {
      if (w && A.getDerivedStateFromProps == null && b !== u && c.componentWillReceiveProps != null && c.componentWillReceiveProps(b, C), !c.__e && (c.shouldComponentUpdate != null && c.shouldComponentUpdate(b, c.__s, C) === !1 || e.__v === o.__v)) {
        for (e.__v !== o.__v && (c.props = b, c.state = c.__s, c.__d = !1), e.__e = o.__e, e.__k = o.__k, e.__k.some(function(O) {
          O && (O.__ = e);
        }), B = 0; B < c._sb.length; B++) c.__h.push(c._sb[B]);
        c._sb = [], c.__h.length && s.push(c);
        break t;
      }
      c.componentWillUpdate != null && c.componentWillUpdate(b, c.__s, C), w && c.componentDidUpdate != null && c.__h.push(function() {
        c.componentDidUpdate(u, h, m);
      });
    }
    if (c.context = C, c.props = b, c.__P = t, c.__e = !1, I = x.__r, $ = 0, w) {
      for (c.state = c.__s, c.__d = !1, I && I(e), g = c.render(c.props, c.state, c.context), K = 0; K < c._sb.length; K++) c.__h.push(c._sb[K]);
      c._sb = [];
    } else do
      c.__d = !1, I && I(e), g = c.render(c.props, c.state, c.context), c.state = c.__s;
    while (c.__d && ++$ < 25);
    c.state = c.__s, c.getChildContext != null && (r = z(z({}, r), c.getChildContext())), w && !f && c.getSnapshotBeforeUpdate != null && (m = c.getSnapshotBeforeUpdate(u, h)), Tt(t, ct(_ = g != null && g.type === Q && g.key == null ? g.props.children : g) ? _ : [_], e, o, r, i, n, s, a, l, d), c.base = e.__e, e.__u &= -161, c.__h.length && s.push(c), y && (c.__E = c.__ = null);
  } catch (O) {
    if (e.__v = null, l || n != null) {
      for (e.__u |= l ? 160 : 128; a && a.nodeType === 8 && a.nextSibling; ) a = a.nextSibling;
      n[n.indexOf(a)] = null, e.__e = a;
    } else e.__e = o.__e, e.__k = o.__k;
    x.__e(O, e, o);
  }
  else n == null && e.__v === o.__v ? (e.__k = o.__k, e.__e = o.__e) : e.__e = fe(o.__e, e, o, r, i, n, s, l, d);
  (g = x.diffed) && g(e);
}
function Gt(t, e, o) {
  e.__d = void 0;
  for (var r = 0; r < o.length; r++) xt(o[r], o[++r], o[++r]);
  x.__c && x.__c(e, t), t.some(function(i) {
    try {
      t = i.__h, i.__h = [], t.some(function(n) {
        n.call(i);
      });
    } catch (n) {
      x.__e(n, i.__v);
    }
  });
}
function fe(t, e, o, r, i, n, s, a, l) {
  var d, g, c, f, u, h, m, y = o.props, b = e.props, w = e.type;
  if (w === "svg" ? i = "http://www.w3.org/2000/svg" : w === "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), n != null) {
    for (d = 0; d < n.length; d++) if ((u = n[d]) && "setAttribute" in u == !!w && (w ? u.localName === w : u.nodeType === 3)) {
      t = u, n[d] = null;
      break;
    }
  }
  if (t == null) {
    if (w === null) return document.createTextNode(b);
    t = document.createElementNS(i, w, b.is && b), a && (x.__m && x.__m(e, n), a = !1), n = null;
  }
  if (w === null) y === b || a && t.data === b || (t.data = b);
  else {
    if (n = n && L.call(t.childNodes), y = o.props || G, !a && n != null) for (y = {}, d = 0; d < t.attributes.length; d++) y[(u = t.attributes[d]).name] = u.value;
    for (d in y) if (u = y[d], d != "children") {
      if (d == "dangerouslySetInnerHTML") c = u;
      else if (!(d in b)) {
        if (d == "value" && "defaultValue" in b || d == "checked" && "defaultChecked" in b) continue;
        tt(t, d, null, u, i);
      }
    }
    for (d in b) u = b[d], d == "children" ? f = u : d == "dangerouslySetInnerHTML" ? g = u : d == "value" ? h = u : d == "checked" ? m = u : a && typeof u != "function" || y[d] === u || tt(t, d, u, y[d], i);
    if (g) a || c && (g.__html === c.__html || g.__html === t.innerHTML) || (t.innerHTML = g.__html), e.__k = [];
    else if (c && (t.innerHTML = ""), Tt(t, ct(f) ? f : [f], e, o, r, w === "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, n, s, n ? n[0] : o.__k && D(o, 0), a, l), n != null) for (d = n.length; d--; ) Jt(n[d]);
    a || (d = "value", w === "progress" && h == null ? t.removeAttribute("value") : h !== void 0 && (h !== t[d] || w === "progress" && !h || w === "option" && h !== y[d]) && tt(t, d, h, y[d], i), d = "checked", m !== void 0 && m !== t[d] && tt(t, d, m, y[d], i));
  }
  return t;
}
function xt(t, e, o) {
  try {
    if (typeof t == "function") {
      var r = typeof t.__u == "function";
      r && t.__u(), r && e == null || (t.__u = t(e));
    } else t.current = e;
  } catch (i) {
    x.__e(i, o);
  }
}
function Lt(t, e, o) {
  var r, i;
  if (x.unmount && x.unmount(t), (r = t.ref) && (r.current && r.current !== t.__e || xt(r, null, e)), (r = t.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (n) {
      x.__e(n, e);
    }
    r.base = r.__P = null;
  }
  if (r = t.__k) for (i = 0; i < r.length; i++) r[i] && Lt(r[i], e, o || typeof t.type != "function");
  o || Jt(t.__e), t.__c = t.__ = t.__e = t.__d = void 0;
}
function me(t, e, o) {
  return this.constructor(t, o);
}
function Xt(t, e, o) {
  var r, i, n, s;
  x.__ && x.__(t, e), i = (r = typeof o == "function") ? null : o && o.__k || e.__k, n = [], s = [], bt(e, t = (!r && o || e).__k = Y(Q, null, [t]), i || G, G, e.namespaceURI, !r && o ? [o] : i ? null : e.firstChild ? L.call(e.childNodes) : null, n, !r && o ? o : i ? i.__e : e.firstChild, r, s), Gt(n, t, s);
}
function be(t, e) {
  Xt(t, e, be);
}
function Et(t, e, o) {
  var r, i, n, s, a = z({}, t.props);
  for (n in t.type && t.type.defaultProps && (s = t.type.defaultProps), e) n == "key" ? r = e[n] : n == "ref" ? i = e[n] : a[n] = e[n] === void 0 && s !== void 0 ? s[n] : e[n];
  return arguments.length > 2 && (a.children = arguments.length > 3 ? L.call(arguments, 2) : o), N(t.type, a, r || t.key, i || t.ref, null);
}
function Zt(t, e) {
  var o = { __c: e = "__cC" + qt++, __: t, Consumer: function(r, i) {
    return r.children(i);
  }, Provider: function(r) {
    var i, n;
    return this.getChildContext || (i = /* @__PURE__ */ new Set(), (n = {})[e] = this, this.getChildContext = function() {
      return n;
    }, this.componentWillUnmount = function() {
      i = null;
    }, this.shouldComponentUpdate = function(s) {
      this.props.value !== s.value && i.forEach(function(a) {
        a.__e = !0, ut(a);
      });
    }, this.sub = function(s) {
      i.add(s);
      var a = s.componentWillUnmount;
      s.componentWillUnmount = function() {
        i && i.delete(s), a && a.call(s);
      };
    }), r.children;
  } };
  return o.Provider.__ = o.Consumer.contextType = o;
}
L = Ht.slice, x = { __e: function(t, e, o, r) {
  for (var i, n, s; e = e.__; ) if ((i = e.__c) && !i.__) try {
    if ((n = i.constructor) && n.getDerivedStateFromError != null && (i.setState(n.getDerivedStateFromError(t)), s = i.__d), i.componentDidCatch != null && (i.componentDidCatch(t, r || {}), s = i.__d), s) return i.__E = i;
  } catch (a) {
    t = a;
  }
  throw t;
} }, Ot = 0, W.prototype.setState = function(t, e) {
  var o;
  o = this.__s != null && this.__s !== this.state ? this.__s : this.__s = z({}, this.state), typeof t == "function" && (t = t(z({}, o), this.props)), t && z(o, t), t != null && this.__v && (e && this._sb.push(e), ut(this));
}, W.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), ut(this));
}, W.prototype.render = Q, P = [], Dt = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, pt = function(t, e) {
  return t.__v.__b - e.__v.__b;
}, at.__r = 0, mt = 0, dt = St(!1), ht = St(!0), qt = 0;
var xe = 0;
function p(t, e, o, r, i, n) {
  e || (e = {});
  var s, a, l = e;
  "ref" in e && (s = e.ref, delete e.ref);
  var d = { type: t, props: l, key: o, ref: s, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --xe, __i: -1, __u: 0, __source: i, __self: n };
  if (typeof t == "function" && (s = t.defaultProps)) for (a in s) l[a] === void 0 && (l[a] = s[a]);
  return x.vnode && x.vnode(d), d;
}
const we = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='%231a5b6e'%20class='bi%20bi-house-door-fill'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M6.5%2014.5v-3.505c0-.245.25-.495.5-.495h2c.25%200%20.5.25.5.5v3.5a.5.5%200%200%200%20.5.5h4a.5.5%200%200%200%20.5-.5v-7a.5.5%200%200%200-.146-.354L13%205.793V2.5a.5.5%200%200%200-.5-.5h-1a.5.5%200%200%200-.5.5v1.293L8.354%201.146a.5.5%200%200%200-.708%200l-6%206A.5.5%200%200%200%201.5%207.5v7a.5.5%200%200%200%20.5.5h4a.5.5%200%200%200%20.5-.5'/%3e%3c/svg%3e";
function ve({
  expandWidth: t = !1,
  homeTitle: e = "ACCESS Home",
  homeUrl: o = "https://access-ci.org/",
  items: r = [],
  topBorder: i = !1
}) {
  if (!(!r || !r.length))
    return /* @__PURE__ */ p(
      "ul",
      {
        class: `breadcrumbs ${t ? "expand" : ""} ${i ? "top-border" : ""}`,
        children: [
          /* @__PURE__ */ p("li", { class: "home", children: /* @__PURE__ */ p("a", { href: o, title: e, children: /* @__PURE__ */ p("img", { src: we, alt: e, height: "14" }) }) }),
          r.map((n) => /* @__PURE__ */ p("li", { class: n.classes || "", children: n.href ? /* @__PURE__ */ p("a", { href: n.href, children: n.name }) : n.name }))
        ]
      }
    );
}
var F, v, st, Bt, q = 0, jt = [], k = x, zt = k.__b, Ut = k.__r, Vt = k.diffed, Ft = k.__c, It = k.unmount, Mt = k.__;
function H(t, e) {
  k.__h && k.__h(v, t, q || e), q = 0;
  var o = v.__H || (v.__H = { __: [], __h: [] });
  return t >= o.__.length && o.__.push({}), o.__[t];
}
function J(t) {
  return q = 1, wt(te, t);
}
function wt(t, e, o) {
  var r = H(F++, 2);
  if (r.t = t, !r.__c && (r.__ = [o ? o(e) : te(void 0, e), function(a) {
    var l = r.__N ? r.__N[0] : r.__[0], d = r.t(l, a);
    l !== d && (r.__N = [d, r.__[1]], r.__c.setState({}));
  }], r.__c = v, !v.u)) {
    var i = function(a, l, d) {
      if (!r.__c.__H) return !0;
      var g = r.__c.__H.__.filter(function(f) {
        return !!f.__c;
      });
      if (g.every(function(f) {
        return !f.__N;
      })) return !n || n.call(this, a, l, d);
      var c = !1;
      return g.forEach(function(f) {
        if (f.__N) {
          var u = f.__[0];
          f.__ = f.__N, f.__N = void 0, u !== f.__[0] && (c = !0);
        }
      }), !(!c && r.__c.props === a) && (!n || n.call(this, a, l, d));
    };
    v.u = !0;
    var n = v.shouldComponentUpdate, s = v.componentWillUpdate;
    v.componentWillUpdate = function(a, l, d) {
      if (this.__e) {
        var g = n;
        n = void 0, i(a, l, d), n = g;
      }
      s && s.call(this, a, l, d);
    }, v.shouldComponentUpdate = i;
  }
  return r.__N || r.__;
}
function X(t, e) {
  var o = H(F++, 3);
  !k.__s && yt(o.__H, e) && (o.__ = t, o.i = e, v.__H.__h.push(o));
}
function vt(t, e) {
  var o = H(F++, 4);
  !k.__s && yt(o.__H, e) && (o.__ = t, o.i = e, v.__h.push(o));
}
function E(t) {
  return q = 5, Z(function() {
    return { current: t };
  }, []);
}
function ao(t, e, o) {
  q = 6, vt(function() {
    return typeof t == "function" ? (t(e()), function() {
      return t(null);
    }) : t ? (t.current = e(), function() {
      return t.current = null;
    }) : void 0;
  }, o == null ? o : o.concat(t));
}
function Z(t, e) {
  var o = H(F++, 7);
  return yt(o.__H, e) && (o.__ = t(), o.__H = e, o.__h = t), o.__;
}
function co(t, e) {
  return q = 8, Z(function() {
    return t;
  }, e);
}
function $t(t) {
  var e = v.context[t.__c], o = H(F++, 9);
  return o.c = t, e ? (o.__ == null && (o.__ = !0, e.sub(v)), e.props.value) : t.__;
}
function so(t, e) {
  k.useDebugValue && k.useDebugValue(e ? e(t) : t);
}
function ye() {
  var t = H(F++, 11);
  if (!t.__) {
    for (var e = v.__v; e !== null && !e.__m && e.__ !== null; ) e = e.__;
    var o = e.__m || (e.__m = [0, 0]);
    t.__ = "P" + o[0] + "-" + o[1]++;
  }
  return t.__;
}
function ke() {
  for (var t; t = jt.shift(); ) if (t.__P && t.__H) try {
    t.__H.__h.forEach(it), t.__H.__h.forEach(gt), t.__H.__h = [];
  } catch (e) {
    t.__H.__h = [], k.__e(e, t.__v);
  }
}
k.__b = function(t) {
  v = null, zt && zt(t);
}, k.__ = function(t, e) {
  t && e.__k && e.__k.__m && (t.__m = e.__k.__m), Mt && Mt(t, e);
}, k.__r = function(t) {
  Ut && Ut(t), F = 0;
  var e = (v = t.__c).__H;
  e && (st === v ? (e.__h = [], v.__h = [], e.__.forEach(function(o) {
    o.__N && (o.__ = o.__N), o.i = o.__N = void 0;
  })) : (e.__h.forEach(it), e.__h.forEach(gt), e.__h = [], F = 0)), st = v;
}, k.diffed = function(t) {
  Vt && Vt(t);
  var e = t.__c;
  e && e.__H && (e.__H.__h.length && (jt.push(e) !== 1 && Bt === k.requestAnimationFrame || ((Bt = k.requestAnimationFrame) || _e)(ke)), e.__H.__.forEach(function(o) {
    o.i && (o.__H = o.i), o.i = void 0;
  })), st = v = null;
}, k.__c = function(t, e) {
  e.some(function(o) {
    try {
      o.__h.forEach(it), o.__h = o.__h.filter(function(r) {
        return !r.__ || gt(r);
      });
    } catch (r) {
      e.some(function(i) {
        i.__h && (i.__h = []);
      }), e = [], k.__e(r, o.__v);
    }
  }), Ft && Ft(t, e);
}, k.unmount = function(t) {
  It && It(t);
  var e, o = t.__c;
  o && o.__H && (o.__H.__.forEach(function(r) {
    try {
      it(r);
    } catch (i) {
      e = i;
    }
  }), o.__H = void 0, e && k.__e(e, o.__v));
};
var Pt = typeof requestAnimationFrame == "function";
function _e(t) {
  var e, o = function() {
    clearTimeout(r), Pt && cancelAnimationFrame(e), setTimeout(t);
  }, r = setTimeout(o, 100);
  Pt && (e = requestAnimationFrame(o));
}
function it(t) {
  var e = v, o = t.__c;
  typeof o == "function" && (t.__c = void 0, o()), v = e;
}
function gt(t) {
  var e = v;
  t.__c = t.__(), v = e;
}
function yt(t, e) {
  return !t || t.length !== e.length || e.some(function(o, r) {
    return o !== t[r];
  });
}
function te(t, e) {
  return typeof e == "function" ? e(t) : e;
}
let M, T;
const Ae = (t, e) => {
  if (M = void 0, e && e.type === "click") {
    if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0)
      return t;
    const o = e.target.closest("a[href]"), r = o && o.getAttribute("href");
    if (!o || o.origin != location.origin || /^#/.test(r) || !/^(_?self)?$/i.test(o.target) || T && (typeof T == "string" ? !r.startsWith(T) : !T.test(r)))
      return t;
    M = !0, e.preventDefault(), e = o.href.replace(location.origin, "");
  } else typeof e == "string" ? M = !0 : e && e.url ? (M = !e.replace, e = e.url) : e = location.pathname + location.search;
  return M === !0 ? history.pushState(null, "", e) : M === !1 && history.replaceState(null, "", e), e;
}, Ce = (t, e, o) => {
  t = t.split("/").filter(Boolean), e = (e || "").split("/").filter(Boolean);
  for (let r = 0, i, n; r < Math.max(t.length, e.length); r++) {
    let [, s, a, l] = (e[r] || "").match(/^(:?)(.*?)([+*?]?)$/);
    if (i = t[r], !(!s && a == i)) {
      if (!s && i && l == "*") {
        o.rest = "/" + t.slice(r).map(decodeURIComponent).join("/");
        break;
      }
      if (!s || !i && l != "?" && l != "*") return;
      if (n = l == "+" || l == "*", n ? i = t.slice(r).map(decodeURIComponent).join("/") || void 0 : i && (i = decodeURIComponent(i)), o.params[a] = i, a in o || (o[a] = i), n) break;
    }
  }
  return o;
};
function j(t) {
  const [e, o] = wt(Ae, t.url || location.pathname + location.search);
  t.scope && (T = t.scope);
  const r = M === !0, i = Z(() => {
    const n = new URL(e, location.origin), s = n.pathname.replace(/\/+$/g, "") || "/";
    return {
      url: e,
      path: s,
      query: Object.fromEntries(n.searchParams),
      route: (a, l) => o({ url: a, replace: l }),
      wasPush: r
    };
  }, [e]);
  return vt(() => (addEventListener("click", o), addEventListener("popstate", o), () => {
    removeEventListener("click", o), removeEventListener("popstate", o);
  }), []), Y(j.ctx.Provider, { value: i }, t.children);
}
const Se = Promise.resolve();
function ee(t) {
  const [e, o] = wt((_) => _ + 1, 0), { url: r, query: i, wasPush: n, path: s } = Ee(), { rest: a = s, params: l = {} } = $t(Yt), d = E(!1), g = E(s), c = E(0), f = (
    /** @type {RefObject<VNode<any>>} */
    E()
  ), u = (
    /** @type {RefObject<VNode<any>>} */
    E()
  ), h = (
    /** @type {RefObject<Element | Text>} */
    E()
  ), m = E(!1), y = (
    /** @type {RefObject<boolean>} */
    E()
  );
  y.current = !1;
  const b = E(!1);
  let w, S, C;
  Wt(t.children).some((_) => {
    if (Ce(a, _.props.path, C = { ..._.props, path: a, query: i, params: l, rest: "" })) return w = Et(_, C);
    _.props.default && (S = Et(_, C));
  });
  let B = w || S;
  Z(() => {
    u.current = f.current;
    const _ = u.current && u.current.props.children;
    !_ || !B || B.type !== _.type || B.props.component !== _.props.component ? (this.__v && this.__v.__k && this.__v.__k.reverse(), c.current++, b.current = !0) : b.current = !1;
  }, [r]);
  const I = f.current && f.current.__u & et && f.current.__u & ot, $ = f.current && f.current.__h;
  f.current = /** @type {VNode<any>} */
  Y(Yt.Provider, { value: C }, B), I ? (f.current.__u |= et, f.current.__u |= ot) : $ && (f.current.__h = !0);
  const K = u.current;
  return u.current = null, this.__c = (_, A) => {
    y.current = !0, u.current = K, t.onLoadStart && t.onLoadStart(r), d.current = !0;
    let O = c.current;
    _.then(() => {
      O === c.current && (u.current = null, f.current && (A.__h && (f.current.__h = A.__h), A.__u & ot && (f.current.__u |= ot), A.__u & et && (f.current.__u |= et)), Se.then(o));
    });
  }, vt(() => {
    const _ = this.__v && this.__v.__e;
    if (y.current) {
      !m.current && !h.current && (h.current = _);
      return;
    }
    !m.current && h.current && (h.current !== _ && h.current.remove(), h.current = null), m.current = !0, g.current !== s && (n && scrollTo(0, 0), t.onRouteChange && t.onRouteChange(r), g.current = s), t.onLoadEnd && d.current && t.onLoadEnd(r), d.current = !1;
  }, [s, n, e]), b.current ? [Y(lt, { r: f }), Y(lt, { r: u })] : Y(lt, { r: f });
}
const et = 32, ot = 128, lt = ({ r: t }) => t.current;
ee.Provider = j;
j.ctx = Zt(
  /** @type {import('./router.d.ts').LocationHook & { wasPush: boolean }} */
  {}
);
const Yt = Zt(
  /** @type {import('./router.d.ts').RouteHook & { rest: string }} */
  {}
), Ee = () => $t(j.ctx);
function kt(t) {
  let e, o;
  const r = () => t().then((n) => o = n && n.default || n), i = (n) => {
    const [, s] = J(0), a = E(o);
    if (e || (e = r()), o !== void 0) return Y(o, n);
    throw a.current || (a.current = e.then(() => s(1))), e;
  };
  return i.preload = () => (e || (e = r()), e), i;
}
const Qt = x.__e;
x.__e = (t, e, o) => {
  if (t && t.then) {
    let r = e;
    for (; r = r.__; )
      if (r.__c && r.__c.__c)
        return e.__e == null && (e.__e = o.__e, e.__k = o.__k), e.__k || (e.__k = []), r.__c.__c(t, e);
  }
  Qt && Qt(t, e, o);
};
function oe(t) {
  return this.__c = Be, this.componentDidCatch = t.onError, t.children;
}
function Be(t) {
  t.then(() => this.forceUpdate());
}
const ze = kt(
  () => import("./access-qa-bot-B_eb7iUo.js").then((t) => ({
    default: t.QABot
  }))
);
class Ue extends W {
  render() {
    const {
      welcome: e,
      isLoggedIn: o,
      open: r,
      onOpenChange: i,
      apiKey: n,
      embedded: s,
      loginUrl: a
    } = this.props, l = n || void 0 || null;
    if (!l)
      return console.error("QA Bot: No valid API key provided"), null;
    const d = o !== void 0 ? o : document.cookie.split("; ").includes("SESSaccesscisso=1");
    return /* @__PURE__ */ p(oe, { children: /* @__PURE__ */ p(
      ze,
      {
        welcome: e || "Welcome to ACCESS Q&A Bot!",
        isLoggedIn: d,
        open: r,
        onOpenChange: i,
        embedded: s === !0,
        apiKey: l,
        loginUrl: a
      }
    ) });
  }
}
const re = [
  {
    name: "Researchers",
    href: "https://access-ci.org/get-started/for-researchers/"
  },
  {
    name: "Educators",
    href: "https://access-ci.org/get-started/for-educators/"
  },
  {
    name: "Graduate Students",
    href: "https://access-ci.org/get-started/for-graduate-students/"
  },
  {
    name: "Resource Providers",
    href: "https://access-ci.org/get-started/for-resource-providers/"
  },
  {
    name: "CI Community",
    href: "https://access-ci.org/get-started/for-programs-organizations/"
  }
], Ve = [
  {
    name: "ACCESS Home",
    href: "https://access-ci.org/",
    classes: "icon icon-home"
  },
  {
    name: "Allocations",
    href: "https://allocations.access-ci.org/",
    classes: "track"
  },
  {
    name: "Resources",
    href: "https://allocations.access-ci.org/resources",
    classes: "track"
  },
  {
    name: "Events & Trainings",
    href: "https://support.access-ci.org/events",
    classes: "track"
  },
  {
    name: "Support",
    href: "https://support.access-ci.org/",
    classes: "track"
  },
  {
    name: "News",
    href: "https://access-ci.org/news/",
    classes: "track"
  },
  {
    name: "About",
    href: "https://access-ci.org/about/",
    classes: "track grow"
  },
  {
    name: "Find info for you",
    classes: "highlight",
    items: re
  },
  {
    name: "Search",
    href: "https://support.access-ci.org/find",
    classes: "icon icon-search"
  }
], Fe = {
  name: "My ACCESS",
  items: [
    {
      name: "Allocations",
      href: "https://allocations.access-ci.org/requests"
    },
    {
      name: "Community Persona",
      href: "https://support.access-ci.org/community-persona"
    },
    {
      name: "Edit Profile",
      href: "https://allocations.access-ci.org/profile"
    },
    {
      name: "Publications",
      href: "https://allocations.access-ci.org/publications"
    },
    {
      name: "Share with ORCID",
      href: "https://allocations.access-ci.org/orcid"
    },
    {
      name: "Log out",
      href: "https://cilogon.org/logout/?skin=access"
    }
  ]
}, Ie = {
  name: "Login",
  items: [
    {
      name: "Login",
      href: "https://cilogon.org/?skin=access"
    },
    {
      name: "Questions",
      href: "https://identity.access-ci.org/"
    },
    {
      name: "Register",
      href: "https://identity.access-ci.org/new-user"
    },
    {
      name: "Reset Password",
      href: "https://identity.access-ci.org/password-reset"
    }
  ]
}, Me = [
  {
    className: "x",
    href: "https://twitter.com/ACCESSforCI",
    name: "X"
  },
  {
    className: "youtube",
    href: "https://www.youtube.com/c/ACCESSforCI",
    name: "YouTube"
  },
  {
    className: "facebook",
    href: "https://www.facebook.com/ACCESSforCI",
    name: "Facebook"
  },
  {
    className: "linkedin",
    href: "https://www.linkedin.com/company/accessforci/",
    name: "LinkedIn"
  }
], Pe = [
  {
    href: "https://access-ci.org/acceptable-use/",
    name: "Acceptable Use"
  },
  {
    href: "https://access-ci.org/about/acknowledging-access/",
    name: "Acknowledging ACCESS"
  },
  {
    href: "https://access-ci.org/code-of-conduct/",
    name: "Code of Conduct"
  },
  {
    href: "https://access-ci.org/glossary/",
    name: "Glossary"
  },
  {
    href: "https://access-ci.org/privacy-policy",
    name: "Privacy Policy"
  },
  {
    href: "https://operations.access-ci.org/report-security-incident",
    name: "Report a Security Incident"
  },
  {
    href: "https://access-ci.org/site-map/",
    name: "Site Map"
  }
], Ye = "https://www.nsf.gov/awardsearch/showAward", R = ({ number: t }) => /* @__PURE__ */ p("a", { href: `${Ye}?AWD_ID=${t}&HistoricalAwards=false`, children: [
  "#",
  t
] }), nt = ({ className: t = null, items: e }) => /* @__PURE__ */ p("ul", { class: t, children: e.map(({ className: o, name: r, href: i }) => /* @__PURE__ */ p("li", { children: /* @__PURE__ */ p("a", { className: o, href: i, children: r }) })) }), Qe = "data:image/png;base64,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", Ke = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20id='Layer_1'%20viewBox='0%200%20269.14%2041.37'%3e%3cdefs%3e%3clinearGradient%20id='linear-gradient'%20x1='14.99'%20y1='25.59'%20x2='42.38'%20y2='-1.8'%20gradientTransform='matrix(1,%200,%200,%201,%200,%200)'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23e47637'%3e%3c/stop%3e%3cstop%20offset='.88'%20stop-color='%23ffcc52'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-2'%20x1='87.72'%20y1='26.66'%20x2='112.87'%20y2='1.51'%20gradientTransform='matrix(1,%200,%200,%201,%200,%200)'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='0'%20stop-color='%23008597'%3e%3c/stop%3e%3cstop%20offset='1'%20stop-color='%2348c0b9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-3'%20x1='233.69'%20y1='10.21'%20x2='195.89'%20y2='32.03'%20gradientTransform='matrix(1,%200,%200,%201,%200,%200)'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='.2'%20stop-color='%23008597'%3e%3c/stop%3e%3cstop%20offset='1'%20stop-color='%2348c0b9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-4'%20x1='45.84'%20y1='29.07'%20x2='82.09'%20y2='29.07'%20gradientTransform='matrix(1,%200,%200,%201,%200,%200)'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='.18'%20stop-color='%2348c0b9'%3e%3c/stop%3e%3cstop%20offset='.81'%20stop-color='%23008597'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-5'%20x1='43.22'%20y1='20.68'%20x2='68.03'%20y2='20.68'%20gradientTransform='matrix(1,%200,%200,%201,%200,%200)'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='.22'%20stop-color='%2348c0b9'%3e%3c/stop%3e%3cstop%20offset='1'%20stop-color='%23008597'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-6'%20x1='165.05'%20y1='35.98'%20x2='194.21'%20y2='35.98'%20gradientTransform='matrix(1,%200,%200,%201,%200,%200)'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='.03'%20stop-color='%23008597'%3e%3c/stop%3e%3cstop%20offset='1'%20stop-color='%2348c0b9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-7'%20x1='123.91'%20y1='11.68'%20x2='160.35'%20y2='11.68'%20xlink:href='%23linear-gradient-2'%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-8'%20x1='269.14'%20y1='20.69'%20x2='234.79'%20y2='20.69'%20gradientTransform='matrix(1,%200,%200,%201,%200,%200)'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='.03'%20stop-color='%23038596'%3e%3c/stop%3e%3cstop%20offset='.82'%20stop-color='%2366d6d6'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-9'%20x1='271.07'%20y1='10.21'%20x2='233.26'%20y2='32.03'%20gradientTransform='matrix(1,%200,%200,%201,%200,%200)'%20gradientUnits='userSpaceOnUse'%3e%3cstop%20offset='.2'%20stop-color='%23008597'%3e%3c/stop%3e%3cstop%20offset='1'%20stop-color='%2348c0b9'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-10'%20y1='20.36'%20x2='191.15'%20y2='20.36'%20xlink:href='%23linear-gradient-6'%3e%3c/linearGradient%3e%3clinearGradient%20id='linear-gradient-11'%20y1='5.3'%20y2='5.3'%20xlink:href='%23linear-gradient-6'%3e%3c/linearGradient%3e%3c/defs%3e%3cg%3e%3cpolygon%20points='44.62%20.43%202.5%207.94%2030.06%2040.66%2044.62%20.43'%20style='fill:url(%23linear-gradient);'%3e%3c/polygon%3e%3crect%20x='15.25'%20y='17.07'%20width='8.79'%20height='8.79'%20transform='translate(23.41%20-7.39)%20rotate(49.9)'%20style='fill:%23fff;'%3e%3c/rect%3e%3crect%20x='8.52'%20y='22.74'%20width='8.79'%20height='8.79'%20transform='translate(25.35%20-.23)%20rotate(49.9)'%20style='fill:%231a5b6e;'%3e%3c/rect%3e%3crect%20x='1.8'%20y='28.4'%20width='8.79'%20height='8.79'%20transform='translate(27.29%206.93)%20rotate(49.9)'%20style='fill:%23f07537;'%3e%3c/rect%3e%3crect%20x='2.86'%20y='16.01'%20width='8.79'%20height='8.79'%20transform='translate(18.19%201.71)%20rotate(49.9)'%20style='fill:%2348c0b9;'%3e%3c/rect%3e%3crect%20x='14.19'%20y='29.46'%20width='8.79'%20height='8.79'%20transform='translate(32.51%20-2.17)%20rotate(49.9)'%20style='fill:%23008597;'%3e%3c/rect%3e%3c/g%3e%3cg%3e%3cg%3e%3cpath%20d='M70.26,.67l14.44,40.03h-11.09l-2.57-7.25h-14.5l-2.51,7.25h-10.82L57.66,.67h12.6Zm-10.65,24.03h8.37l-4.18-11.93-4.18,11.93Z'%3e%3c/path%3e%3cpath%20d='M103.46,31.89c3.68,0,6.3-2.45,7.02-6.41l10.26,3.4c-2.45,7.53-8.25,12.49-17.23,12.49-11.26,0-19.24-8.64-19.24-20.69S92.25,0,103.52,0c8.98,0,14.77,4.96,17.23,12.49l-10.26,3.4c-.72-3.96-3.34-6.41-7.02-6.41-4.85,0-8.25,4.35-8.25,11.21s3.4,11.21,8.25,11.21Z'%20style='fill:%23008597;'%3e%3c/path%3e%3cpath%20d='M84.42,23.37c-1.27-14.31,7.83-23.37,19.09-23.37,8.98,0,14.77,4.96,17.23,12.49l-10.26,3.4c-.72-3.96-3.34-6.41-7.02-6.41-4.85,0-8.25,4.35-8.25,11.21l-10.79,2.68Z'%20style='fill:url(%23linear-gradient-2);'%3e%3c/path%3e%3cpath%20d='M143.01,31.89c3.68,0,6.3-2.45,7.02-6.41l10.26,3.4c-2.45,7.53-8.25,12.49-17.23,12.49-11.26,0-19.24-8.64-19.24-20.69S131.8,0,143.07,0c8.98,0,14.77,4.96,17.23,12.49l-10.26,3.4c-.72-3.96-3.34-6.41-7.02-6.41-4.85,0-8.25,4.35-8.25,11.21s3.4,11.21,8.25,11.21Z'%20style='fill:%23008597;'%3e%3c/path%3e%3cpath%20d='M203.38,26.76c3.4,3.85,7.92,5.63,11.99,5.63,3.35,0,5.58-1.23,5.58-3.51,0-2.57-2.84-2.9-8.98-4.13-5.85-1.17-12.26-3.34-12.26-11.49s7.08-13.27,15.95-13.27c7.02,0,12.54,2.73,15.72,6.19l-5.91,7.36c-2.62-2.9-6.13-4.57-10.09-4.57-2.95,0-4.96,1.12-4.96,3.18,0,2.29,2.45,2.67,7.3,3.68,6.25,1.28,14.05,3.01,14.05,11.93s-7.58,13.61-16.83,13.61c-6.53,0-14.16-2.57-17.51-6.69l5.97-7.92Z'%20style='fill:url(%23linear-gradient-3);'%3e%3c/path%3e%3cpath%20d='M211.97,24.76c-5.85-1.17-12.26-3.34-12.26-11.49s7.08-13.27,15.95-13.27c7.02,0,12.54,2.73,15.72,6.19l-5.91,7.36c-2.62-2.9-6.13-4.57-10.09-4.57-2.95,0-4.96,1.12-4.96,3.18,0,2.29,2.45,2.67,7.3,3.68l-5.74,8.92Z'%20style='fill:%23008597;'%3e%3c/path%3e%3cpath%20d='M70.26,.67l14.44,40.03h-11.09l-2.57-7.25L59.62,.67h10.65Zm-2.29,24.03'%20style='fill:%23008597;'%3e%3c/path%3e%3cpath%20d='M194.21,.67V9.92h-18.46v5.97h15.28v9.03h-15.28v6.52h18.46v9.26h-29.16V.67h29.16Z'%20style='fill:%23008597;'%3e%3c/path%3e%3c/g%3e%3cpolygon%20points='82.09%2033.45%2078.93%2024.7%2067.98%2024.7%2059.61%2024.7%2048.99%2024.7%2045.84%2033.45%2082.09%2033.45'%20style='fill:url(%23linear-gradient-4);'%3e%3c/polygon%3e%3cpath%20d='M68.03,.67l-13.99,40.03h-10.82L57.66,.67h10.37Zm-8.42,24.03l4.18-11.93-4.18,11.93Z'%20style='fill:url(%23linear-gradient-5);'%3e%3c/path%3e%3cpolygon%20points='165.05%2031.35%20165.05%2040.61%20175.76%2040.61%20176.66%2040.61%20194.21%2040.61%20194.21%2031.35%20165.05%2031.35'%20style='fill:url(%23linear-gradient-6);'%3e%3c/polygon%3e%3cpolygon%20points='175.75%2015.39%20165.05%2015.39%20165.05%20.74%20175.75%20.67%20175.75%2015.39'%20style='fill:%23008597;'%3e%3c/polygon%3e%3cpath%20d='M124.03,23.37c-1.27-14.31,7.83-23.37,19.09-23.37,8.98,0,14.77,4.96,17.23,12.49l-10.26,3.4c-.72-3.96-3.34-6.41-7.02-6.41-4.85,0-8.25,4.35-8.25,11.21l-10.79,2.68Z'%20style='fill:url(%23linear-gradient-7);'%3e%3c/path%3e%3cpath%20d='M240.76,26.76c3.4,3.85,7.92,5.63,11.99,5.63,3.35,0,5.58-1.23,5.58-3.51,0-2.57-2.84-2.9-8.98-4.13-5.85-1.17-12.26-3.34-12.26-11.49s7.08-13.27,15.95-13.27c7.02,0,12.54,2.73,15.72,6.19l-5.91,7.36c-2.62-2.9-6.13-4.57-10.09-4.57-2.95,0-4.96,1.12-4.96,3.18,0,2.29,2.45,2.67,7.3,3.68,6.25,1.28,14.05,3.01,14.05,11.93s-7.58,13.61-16.83,13.61c-6.53,0-14.16-2.57-17.51-6.69l5.97-7.92Z'%20style='fill:url(%23linear-gradient-8);'%3e%3c/path%3e%3cpath%20d='M240.76,26.76c3.4,3.85,7.92,5.63,11.99,5.63,3.35,0,5.58-1.23,5.58-3.51,0-2.57-2.84-2.9-8.98-4.13-5.85-1.17-12.26-3.34-12.26-11.49s7.08-13.27,15.95-13.27c7.02,0,12.54,2.73,15.72,6.19l-5.91,7.36c-2.62-2.9-6.13-4.57-10.09-4.57-2.95,0-4.96,1.12-4.96,3.18,0,2.29,2.45,2.67,7.3,3.68,6.25,1.28,14.05,3.01,14.05,11.93s-7.58,13.61-16.83,13.61c-6.53,0-14.16-2.57-17.51-6.69l5.97-7.92Z'%20style='fill:url(%23linear-gradient-9);'%3e%3c/path%3e%3cpolygon%20points='165.05%2015.73%20165.05%2024.99%20175.76%2024.99%20176.66%2024.99%20191.15%2024.99%20191.15%2015.73%20165.05%2015.73'%20style='fill:url(%23linear-gradient-10);'%3e%3c/polygon%3e%3cpath%20d='M249.34,24.76c-5.85-1.17-12.26-3.34-12.26-11.49s7.08-13.27,15.95-13.27c7.02,0,12.54,2.73,15.72,6.19l-5.91,7.36c-2.62-2.9-6.13-4.57-10.09-4.57-2.95,0-4.96,1.12-4.96,3.18,0,2.29,2.45,2.67,7.3,3.68l-5.74,8.92Z'%20style='fill:%23008597;'%3e%3c/path%3e%3cpolygon%20points='165.05%20.67%20165.05%209.92%20175.76%209.92%20176.66%209.92%20194.21%209.92%20194.21%20.67%20165.05%20.67'%20style='fill:url(%23linear-gradient-11);'%3e%3c/polygon%3e%3c/g%3e%3c/svg%3e", ie = ({
  nsfUrl: t = "https://www.nsf.gov",
  placement: e = "header",
  siteName: o = "",
  siteUrl: r = "/"
}) => /* @__PURE__ */ p("div", { class: `logo logo-${e}`, children: [
  /* @__PURE__ */ p("a", { class: "nsf", href: t, children: /* @__PURE__ */ p(
    "img",
    {
      class: "nsf-logo",
      src: Qe,
      alt: "National Science Foundation"
    }
  ) }),
  /* @__PURE__ */ p("div", { class: "divider" }),
  /* @__PURE__ */ p("a", { class: "access", href: r, children: [
    /* @__PURE__ */ p("img", { class: "access-logo", src: Ke, alt: "ACCESS" }),
    o && e == "header" ? /* @__PURE__ */ p(
      "span",
      {
        class: `name name-${o.toLocaleLowerCase().replace(" ", "-")}`,
        children: o
      }
    ) : null
  ] })
] }), ft = (t = 900) => document.body.clientWidth >= t ? "desktop" : "mobile", ne = (t = 900) => {
  const [e, o] = J(ft(t));
  return X(() => {
    window.addEventListener("resize", () => o(ft(t)));
  }, []), e;
}, U = (t, e, o = []) => {
  const r = e.attachShadow({ mode: "open" });
  Xt(
    /* @__PURE__ */ p(Q, { children: [
      t,
      o.map((i) => /* @__PURE__ */ p("style", { children: i }))
    ] }),
    r
  );
}, ae = () => window.pageYOffset !== void 0 ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop, Kt = {}, rt = {}, Oe = (t, { cache: e = !0, corsProxy: o = !1 } = { cache: !0, corsProxy: !1 }) => {
  if (e && t in Kt) return Kt[t];
  if (t in rt) return rt[t];
  const r = fetch(
    o ? `https://corsproxy.io/?${encodeURIComponent(t)}` : t
  ).then((i) => {
    if (delete rt[t], i.status < 200 || i.status > 299)
      return { error: { status: i.status } };
    try {
      return i.json();
    } catch (n) {
      return { error: { message: n } };
    }
  });
  return rt[t] = r, r;
}, ce = (t, { cache: e = !0, corsProxy: o = !1, defaultValue: r = null } = {
  cache: !0,
  corsProxy: !1,
  defaultValue: null
}) => {
  const [i, n] = J(r);
  let s = !1;
  return Array.isArray(t) || (t = t ? [t] : [], s = !0), X(() => {
    t.length && (async () => {
      const a = await Promise.all(
        t.map((d) => Oe(d, { cache: e, corsProxy: o }))
      ), l = s ? a[0] : a;
      n(l);
    })();
  }, [...t]), i;
}, De = () => {
  const t = ce(
    "https://operations-api.access-ci.org/wh2/cider/v1/access-active-groups/type/resource-catalog.access-ci.org/"
  );
  return qe([t], ({ results: e }) => {
    const {
      active_groups: o,
      feature_categories: r,
      features: i,
      organizations: n,
      resources: s
    } = e, a = [
      {
        tagCategoryId: -1,
        name: "Resource Provider",
        tags: []
      }
    ], l = [-1];
    for (let h of r)
      [100, 102, 103].includes(h.feature_category_id) && (a.push({
        tagCategoryId: h.feature_category_id,
        name: h.feature_category_name,
        tags: []
      }), l.push(h.feature_category_id));
    a.sort((h, m) => h.name.localeCompare(m.name));
    const d = i.filter((h) => l.includes(h.feature_category_id)).map((h) => ({
      tagId: h.feature_id,
      name: h.feature_name,
      tagCategoryId: h.feature_category_id
    })), g = {};
    for (let h of n)
      d.push({
        tagId: h.organization_id * -1,
        name: h.organization_name,
        tagCategoryId: -1,
        iconUri: h.organization_favicon_url || null
      }), g[h.organization_id] = h;
    d.sort((h, m) => h.name.localeCompare(m.name));
    const c = d.map((h) => h.tagId), f = [
      {
        resourceCategoryId: 1,
        name: "Compute & Storage Resources",
        resourceGroups: [],
        resourceGroupIds: []
      },
      {
        resourceCategoryId: 2,
        name: "Program & Other Resources",
        resourceGroups: [],
        resourceGroupIds: []
      }
    ], u = o.filter((h) => h.rollup_info_resourceids).map((h) => ({
      infoGroupId: h.info_groupid,
      name: h.group_descriptive_name,
      description: h.group_description,
      infoResourceIds: h.rollup_info_resourceids,
      imageUri: h.group_logo_url ? `https://cider.access-ci.org/public/groups/${h.group_logo_url.match(/[0-9]+/)[0]}/logo` : null,
      tagIds: [
        ...h.rollup_organization_ids.map((m) => m * -1).filter((m) => c.includes(m)),
        ...h.rollup_feature_ids.filter(
          (m) => c.includes(m)
        )
      ],
      resourceCategoryId: h.rollup_feature_ids.includes(137) ? 2 : 1,
      accessAllocated: h.rollup_feature_ids.includes(139),
      organizations: h.rollup_organization_ids.map((m) => g[m]).filter((m) => m),
      resources: s.filter(
        (m) => h.rollup_info_resourceids.includes(m.info_resourceid)
      )
    })).sort((h, m) => h.name.localeCompare(m.name));
    return He({
      resourceCategories: f,
      resourceGroups: u,
      tags: d,
      tagCategories: a
    });
  });
}, lo = (t, e = null) => {
  const o = De();
  return o && o.resourceGroups.find((r) => r.infoGroupId == t) || e;
}, po = (t, e = []) => {
  const o = ce(
    `https://operations-api.access-ci.org/wh2/cider/v1/access-active/info_groupid/${t}/?format=json`
  );
  return o && !o.error ? o.results : e;
}, qe = (t, e, o = null) => Z(() => {
  if (!t.length) return o;
  for (let r of t)
    if (!r || r.error) return o;
  return e.apply(null, t);
}, t), He = ({
  resourceCategories: t,
  resourceGroups: e,
  tags: o,
  tagCategories: r
}) => {
  const i = {};
  for (let a of r)
    a.tags = [], i[a.tagCategoryId] = a;
  const n = {};
  for (let a of o)
    a.tagCategory = i[a.tagCategoryId], a.tagCategory.tags.push(a), a.resources = [], n[a.tagId] = a;
  const s = {};
  for (let a of t)
    a.resourceGroups = [], s[a.resourceCategoryId] = a;
  for (let a of e)
    a.resourceCategory = s[a.resourceCategoryId], a.resourceCategory.resourceGroups.push(a), a.tags = a.tagIds.map((l) => n[l]);
  return { resourceCategories: t, resourceGroups: e, tags: o, tagCategories: r };
}, ho = ({ resourceGroups: t, tags: e, tagCategories: o }, r) => {
  const i = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new Set(), a = new Set(r);
  for (let g of e)
    a.has(g.tagId) && s.add(g.tagCategoryId);
  const l = o.filter(
    ({ tagCategoryId: g }) => s.has(g)
  ), d = new Set(
    e.filter((g) => !s.has(g.tagCategoryId)).map((g) => g.tagId)
  );
  for (let g of t) {
    let c = !0;
    for (let f of l) {
      let u = !1;
      for (let h of f.tags)
        if (a.has(h.tagId) && g.tags.includes(h)) {
          u = !0;
          break;
        }
      if (!u) {
        c = !1;
        break;
      }
    }
    if (c) {
      n.add(g.infoGroupId), i.add(g.resourceCategoryId);
      for (let f of g.tagIds) d.delete(f);
    }
  }
  return {
    disabledTagIds: d,
    resourceCategoryIds: i,
    infoGroupIds: n,
    tagCategoryIds: s,
    tagIds: a
  };
}, Je = (t) => {
  let e = t.match(/href="([^"]+)"/);
  return e ? e[1] : null;
}, Re = (t) => t.replace(/(<[^>]+>)/g, "").replace(/&nbsp;/g, " "), uo = (t) => {
  const e = [];
  for (let o of t.split(/(\<\/p\>)|[\n\r]+/g)) {
    if (!o) continue;
    const r = Array.from(o.matchAll(/<a([^>]+)>([^<]+)<\/a>/g)), i = o.split(/<a[^<]+<\/a>/g), n = [];
    for (; i.length > 0; ) {
      n.push(Re(i.shift()));
      let s = r.shift();
      if (s) {
        let a = Je(s[1]);
        a && n.push(/* @__PURE__ */ p("a", { href: a, children: s[2] }));
      }
    }
    e.push(/* @__PURE__ */ p("p", { children: n }));
  }
  return e;
}, Te = ({ showAfterScroll: t = 300 }) => {
  const [e, o] = J(!1);
  return X(() => {
    window.addEventListener(
      "scroll",
      () => o(ae() >= t)
    );
  }, []), /* @__PURE__ */ p(
    "button",
    {
      class: `scroll-to-top ${e ? "visible" : ""}`,
      title: "Return to Top",
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      children: "Return to Top"
    }
  );
}, Ne = (t = {}) => /* @__PURE__ */ p(Q, { children: [
  /* @__PURE__ */ p("div", { class: "container", children: [
    /* @__PURE__ */ p("div", { class: "upper", children: [
      /* @__PURE__ */ p("div", { class: "about", children: [
        /* @__PURE__ */ p("p", { class: "awards", children: [
          "ACCESS is an advanced computing and data resource program supported by the U.S. National Science Foundation (NSF) under the Office of Advanced Cyberinfrastructure awards",
          " ",
          /* @__PURE__ */ p(R, { number: 2138259 }),
          ", ",
          /* @__PURE__ */ p(R, { number: 2138286 }),
          ",",
          " ",
          /* @__PURE__ */ p(R, { number: 2138307 }),
          ", ",
          /* @__PURE__ */ p(R, { number: 2137603 }),
          " and",
          " ",
          /* @__PURE__ */ p(R, { number: 2138296 }),
          "."
        ] }),
        /* @__PURE__ */ p("p", { class: "disclaimer", children: "Any opinions, findings, conclusions or recommendations expressed in this material are those of the authors and do not necessarily reflect the views of NSF." }),
        /* @__PURE__ */ p("a", { class: "contact", href: "https://access-ci.org/contact/", children: "Contact ACCESS" }),
        /* @__PURE__ */ p(nt, { className: "social", items: Me })
      ] }),
      /* @__PURE__ */ p("div", { class: "personas", children: [
        /* @__PURE__ */ p("p", { children: "For:" }),
        /* @__PURE__ */ p(nt, { items: re })
      ] })
    ] }),
    /* @__PURE__ */ p("div", { class: "lower", children: [
      /* @__PURE__ */ p(
        ie,
        {
          siteName: "ACCESS",
          siteUrl: "https://access-ci.org",
          placement: "footer"
        }
      ),
      /* @__PURE__ */ p(nt, { className: "links", items: Pe })
    ] })
  ] }),
  /* @__PURE__ */ p(Te, { ...t })
] }), We = (t = {}) => /* @__PURE__ */ p("div", { class: "container", children: /* @__PURE__ */ p(ie, { ...t }) }), se = ({
  autoOpenMode: t,
  classes: e = "",
  href: o = "",
  html: r = "",
  items: i,
  mode: n,
  name: s,
  open: a,
  parentId: l = "root",
  setOpen: d
}) => {
  const g = ye(), c = a[l] == g, f = c || t == n, u = () => d({ ...a, [l]: c ? null : g });
  if (r) return /* @__PURE__ */ p("div", { dangerouslySetInnerHTML: { __html: r } });
  if (o)
    return /* @__PURE__ */ p("a", { href: o, class: `item ${e || ""}`, children: s });
  if (i)
    return /* @__PURE__ */ p(Q, { children: [
      s && /* @__PURE__ */ p(
        "button",
        {
          "aria-expanded": f,
          "aria-controls": g,
          class: `item ${f ? "expanded" : "collapsed"}`,
          onClick: u,
          children: s
        }
      ),
      /* @__PURE__ */ p("ul", { class: e, id: g, hidden: !f, "aria-hidden": !f, children: i.map(({ autoOpenMode: h, classes: m, href: y, html: b, items: w, name: S }) => /* @__PURE__ */ p("li", { class: m || "", children: /* @__PURE__ */ p(
        se,
        {
          autoOpenMode: h,
          href: y,
          html: b,
          items: w,
          mode: n,
          name: S,
          open: a,
          parentId: g,
          setOpen: d
        }
      ) })) })
    ] });
}, le = ({ classes: t, items: e, name: o, target: r }) => {
  const i = ne(1280), [n, s] = J({});
  return X(() => {
    document.body.addEventListener("click", (a) => {
      a.target != r && ft() == "desktop" && s({});
    }), r.addEventListener("keydown", ({ key: a }) => {
      a == "Escape" && s({});
    });
  }, []), /* @__PURE__ */ p("nav", { class: `menu ${t || ""}`, children: /* @__PURE__ */ p(
    se,
    {
      autoOpenMode: "desktop",
      items: e,
      mode: i,
      name: o,
      open: n,
      setOpen: s
    }
  ) });
}, Ge = ({ items: t, siteName: e = "" }) => {
  const o = ne(768), r = t.map(({ name: i, href: n, items: s }) => {
    if (o == "mobile")
      for (; !n; )
        n = s[0].href, s = s[0];
    return n ? /* @__PURE__ */ p("div", { class: "column", children: /* @__PURE__ */ p("h3", { children: /* @__PURE__ */ p("a", { href: n, children: i }) }) }) : /* @__PURE__ */ p("div", { class: "column", children: [
      /* @__PURE__ */ p("h3", { children: i }),
      /* @__PURE__ */ p(nt, { items: s })
    ] });
  });
  return /* @__PURE__ */ p("nav", { class: "footer", children: [
    /* @__PURE__ */ p("h2", { children: [
      "ACCESS ",
      e
    ] }),
    /* @__PURE__ */ p("div", { class: "columns", children: r })
  ] });
}, Le = kt(() => import("./resource-group-detail-BrLgSVVf.js")), Xe = kt(() => import("./resource-home-Ds7PtqDs.js"));
function Ze({
  title: t = "Resources",
  showTitle: e = !0,
  baseUri: o = "/resources"
}) {
  return /* @__PURE__ */ p(j, { children: /* @__PURE__ */ p(oe, { children: /* @__PURE__ */ p(ee, { children: [
    /* @__PURE__ */ p(
      Xe,
      {
        path: o,
        baseUri: o,
        title: t,
        showTitle: e
      }
    ),
    /* @__PURE__ */ p(
      Le,
      {
        path: `${o}/:infoGroupId`,
        baseUri: o
      }
    )
  ] }) }) });
}
const je = ({
  headings: t = [],
  idPrefix: e = "",
  smoothScroll: o = !0
}) => {
  const [r, i] = J(-1);
  let n;
  const s = [];
  if (t.forEach((a) => {
    a.tagName == "H1" ? n = a : a.tagName == "H2" && (s.push(a), a.id || (a.id = e + a.textContent.replace(/[^A-Za-z0-9]+/g, "-").toLowerCase()));
  }), X(() => {
    s.length && window.addEventListener("scroll", function() {
      const a = ae() + window.innerHeight * 0.1;
      let l = -1;
      s.forEach((d, g) => {
        if (d.offsetTop < a)
          return l = g, !1;
      }), i(l);
    });
  }, []), !!s.length)
    return /* @__PURE__ */ p("div", { class: "toc", children: [
      n && /* @__PURE__ */ p("h2", { children: n.textContent }),
      s.length > 0 && /* @__PURE__ */ p("ul", { children: s.map((a, l) => /* @__PURE__ */ p("li", { children: /* @__PURE__ */ p(
        "a",
        {
          href: `#${a.id}`,
          class: l == r ? "active" : "",
          onClick: (d) => {
            o && (d.preventDefault(), window.scrollTo({
              top: a.offsetTop,
              behavior: "smooth"
            }), history.pushState(null, null, `#${a.id}`));
          },
          children: a.textContent
        }
      ) })) })
    ] });
}, V = ":host,:root{--contrast: #232323;--contrast-2: #3f3f3f;--contrast-3: #707070;--contrast-6: #999999;--contrast-7: #d9d9d9;--contrast-8: #dfdfdf;--contrast-9: #e5e5e5;--green-400: #288654;--red-400: #a70000;--orange-200: #f6d8ca;--orange-400: #f07537;--teal-050: #ecf9f8;--teal-100: #cee8e9;--teal-200: #b0dadb;--teal-400: #48c0b9;--teal-600: #107180;--teal-700: #1a5b6e;--yellow-200: #fce5ab;--yellow-400: #ffc42d;--color: white;--padding: 30px;--offset: 0px;--outline: white;color:var(--contrast)}:host,:host button,:root,:root button{font-family:Archivo,sans-serif}.container{margin:0 auto;padding:0 var(--padding);width:var(--width)}.visually-hidden{border:0!important;clip:rect(0,0,0,0)!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:1px!important}@media (min-width: 600px){:host,:root{--padding: calc((100% - var(--width)) / 2);--offset: 7px;--width: 540px}}@media (min-width: 768px){:host,:root{--width: 712px}}@media (min-width: 900px){:host,:root{--width: 840px}}@media (min-width: 1024px){:host,:root{--width: 940px}}@media (min-width: 1280px){:host,:root{--padding: 10px;--offset: 0px;--width: 1180px}}", $e = 'ul.breadcrumbs{--offset: calc((100vw - var(--width)) / 2);border-bottom:1px solid var(--contrast-7);box-sizing:border-box;font-size:14px;font-stretch:70%;font-weight:600;line-height:20px;list-style-type:none;margin:0;padding:0 30px;width:100vw}ul.breadcrumbs.top-border{border-top:1px solid var(--contrast-7)}ul.breadcrumbs.expand{margin-left:-30px;margin-right:-30px}ul.breadcrumbs li{display:inline-block;margin:0;padding:11px 0 6px;text-transform:uppercase;vertical-align:middle}ul.breadcrumbs li:not(.home):before{content:"/";margin:0 12px}ul.breadcrumbs li a{color:var(--teal-700);text-decoration:none}ul.breadcrumbs li:not(.home) a:active,ul.breadcrumbs li:not(.home) a:focus,ul.breadcrumbs li:not(.home) a:hover{text-decoration:underline}@media (min-width: 600px){ul.breadcrumbs{padding-left:var(--offset);padding-right:var(--offset)}ul.breadcrumbs.expand{margin-left:calc(var(--offset) * -1);margin-right:calc(var(--offset) * -1)}}', to = `:root{color:#232323;font-family:Archivo,sans-serif;font-size:16px}h1{font-size:36px;font-stretch:70%;font-weight:500;margin-top:60px}h2{font-size:22px;font-weight:800;margin-top:36px}h3{color:var(--teal-700);font-size:18px;font-weight:800}a{color:var(--contrast);font-weight:800;text-decoration:underline}a:active,a:focus,a:hover{color:var(--teal-600);text-decoration:none}ol,p,ul{font-size:1.125rem;line-height:1.875rem;margin:0 0 1.25rem}li{margin-bottom:.5rem}.btn{background-color:var(--teal-700);border:4px solid var(--teal-700);color:#fff;display:inline-block;font-family:Archivo,sans-serif;font-size:16px;font-weight:600;line-height:24px;padding:6px 12px;text-decoration:none;text-transform:uppercase}.secondary{background-color:var(--yellow-400);border-color:var(--yellow-400);color:var(--contrast)}.danger{background-color:var(--red-400);border-color:var(--red-400)}.lg{font-size:20px;line-height:30px;padding:8px 16px}.btn.active,.btn:active,.btn:focus,.btn:hover{background-color:#fff;border-color:var(--contrast);color:var(--contrast);cursor:pointer}.btn-clear,.btn-clear.active,.btn-clear:active,.btn-clear:focus,.btn-clear:hover{background-color:transparent;border-color:transparent;color:var(--contrast)}.btn:disabled{background-color:var(--contrast-8);border-color:var(--contrast-8);color:var(--contrast-3)}.btn .bi{vertical-align:middle}.btn+.btn{margin-left:10px}.table{border-top:1px solid var(--contrast);border-collapse:collapse;width:100%}.table td,.table th{border-bottom:1px solid var(--contrast);padding:16px}.table thead th{text-align:left}.table tbody th{text-align:right}input,select{border:1px solid var(--contrast-8);border-radius:0;color:var(--contrast);font-size:1rem;padding:6px 12px}select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;background-image:url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708'/></svg>");background-position:right 12px center;background-repeat:no-repeat;padding:6px 36px 6px 12px}.intro{font-size:24px}`, eo = `:host{background-color:#fbfbfb}.container{color:var(--contrast)}a{color:var(--teal-600);font-weight:800;text-decoration:none}a:active,a:focus,a:hover{text-decoration:underline}.about{padding-top:25px}.awards{font-size:15px;line-height:21px;margin:0 0 20px}.disclaimer{font-size:12px;line-height:18px;margin:0 0 15px}.contact{font-size:16px;font-stretch:70%;text-transform:uppercase}.social{align-items:center;display:flex;flex-direction:row;justify-content:flex-start;list-style-type:none;margin:0;padding:20px 0 10px}.social li{margin:0 35px 0 0;padding:0}.social li:last-child{margin:-10px}.social a{background-size:contain;background-repeat:no-repeat;display:block;height:25px;text-indent:-999999px;width:25px}.x{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23232323' class='bi bi-twitter-x' viewBox='0 0 16 16'><path d='M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z'/></svg>")}.youtube{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23232323' viewBox='0 0 16 16'><path d='M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z'/></svg>")}.facebook{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23232323' viewBox='0 0 16 16'><path d='M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951'/></svg>")}a.linkedin{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23232323' viewBox='0 0 16 16'><path d='M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z'/></svg>")}.lower{border-top:1px solid var(--contrast-9);padding:10px 0 60px}.links{display:flex;flex-direction:row;flex-wrap:wrap;list-style-type:none;margin:20px 0 0;padding:0}.links li{padding:0 20px 10px 0}.links li:last-child{padding-right:0}.links a{font-size:12px;font-weight:600}.scroll-to-top{background-color:#00000080;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' stroke='white' stroke-width='1' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z'/></svg>");background-position:center;background-repeat:no-repeat;background-size:13px;border:0 none transparent;bottom:30px;cursor:pointer;display:block;height:40px;opacity:0;position:fixed;right:30px;text-indent:-999999px;transition:opacity .25s ease-out;width:40px;z-index:100}.scroll-to-top.visible{opacity:1}.personas{box-sizing:border-box;font-size:15px;padding:20px 0}.personas p{margin:0}.personas ul{list-style-type:none;margin:5px 0;padding:0}.personas li{padding:3px 0}@media (min-width: 1024px){.lower{align-items:start;display:flex;flex-direction:row;justify-content:space-between}.links{margin-top:0}}@media (min-width: 900px){.upper{display:flex;flex-direction:row;justify-content:space-between}.upper>*{width:calc((var(--width) - 20px) / 2)}.about{padding:40px 0 30px}.awards{font-size:18px;line-height:24px}.personas{font-size:18px;padding:40px calc(((var(--width) - 140px) / 8) + 20px) 30px}}`, oo = ".container{box-sizing:content-box;height:84px;padding-top:20px}@media (min-width: 900px){.container{height:144px;padding-top:52px}}", pe = `.logo{align-items:start;display:flex;flex-direction:row}.nsf-logo{height:49px}.access-logo{height:23px;margin-top:12px}.access,.nsf{display:block;text-decoration:none}.divider{border-right:2px solid #bbbbbb;height:40px;margin:4px 15px 0 12px;width:0}.name{color:var(--teal-700);display:block;font-size:17.5px;font-stretch:80%;font-weight:200;line-height:1;margin:3px 0 0;text-align:right}.name:before{content:"";display:inline-block;height:0;margin:0 5px 0 0;width:0}.name-allocations:before{border-bottom:12px solid var(--orange-400);border-left:12px solid transparent}.name-coordination-office:before{background-color:var(--teal-400);border-radius:6px;height:12px;margin:0 6px 0 0;width:12px}.name-metrics:before{background-image:url("data:image/svg+xml;utf8,<svg viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg' width='12'><circle cx='12' cy='0' r='12' fill='%23008496' /></svg>");background-size:cover;height:12px;margin:0 2px 0 0;width:12px}.name-operations:before{border-top:12px solid var(--yellow-400);border-right:12px solid transparent}.name-support:before{background-color:var(--teal-700);height:12px;margin:0 6px 0 0;width:12px}.logo-footer .nsf-logo{height:40px}.logo-footer .divider{height:34px;margin:3px 11px 0 9px}.logo-footer .access-logo{margin-top:10px;height:21px;width:auto}@media (min-width: 900px){.nsf-logo{height:82px}.divider{height:70px;margin:6px 23px 0 20px}.access-logo{height:auto;margin-top:22px;width:253px}.name{font-size:30px}.name-allocations:before{border-bottom:20px solid var(--orange-400);border-left:20px solid transparent}.name-metrics:before{height:20px;margin:0 4px 0 0;width:20px}.name-operations:before{border-top:20px solid var(--yellow-400);border-right:20px solid transparent}.name-coordination-office:before{border-radius:9.5px;height:19px;width:19px}.name-support:before{height:19px;margin:0 7px 0 0;width:19px}}`, _t = `.menu{--icon-caret-down-dark: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23232323' viewBox='0 0 16 16'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>");--icon-caret-down-light: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' viewBox='0 0 16 16'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>");--icon-caret-down-teal: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23107180' viewBox='0 0 16 16'><path d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/></svg>")}.universal{--background: var(--teal-700);--border: rgba(19, 133, 151, .35)}.site{--background: var(--teal-600);--border: #157688}.site ul ul{--border: rgba(19, 133, 151, .35)}.menu ul,.menu li{list-style-type:none;margin:0;padding:0}.menu a{text-decoration:none}.item{background:transparent;border:0 none transparent;border-radius:0;box-sizing:border-box;cursor:pointer;display:block;text-align:left;width:100%}.item{font-size:14px;font-weight:600;line-height:21px;padding:13.5px var(--padding) 13.5px}.menu>ul>li>.item{font-weight:800}.item,.menu li:last-child li:last-child>.item{border-bottom:1px solid var(--border)}.menu li.highlight button,.menu li:last-child>.item,.menu>.collapsed{border-bottom:0 none transparent}.expanded{border-bottom-width:2px}.menu button{position:relative}.menu>button{font-weight:500;padding:13.5px var(--padding) 13.5px;text-transform:uppercase}.menu button:after{background-image:var(--icon-caret-down-light);background-repeat:no-repeat;background-size:18px;content:"";display:block;height:18px;right:calc(var(--padding) + var(--offset));position:absolute;top:15px;width:18px}.menu button.expanded:after{transform:rotate(180deg)}.menu .highlight button:after{background-image:var(--icon-caret-down-dark)}.menu button,.menu ul li{background-color:var(--background)}.menu button,.menu ul li a{color:var(--color)}.menu ul li li{background-color:#fff}.menu ul li li a{color:#138597}.icon>.item{background-position:calc(var(--padding) + var(--offset)) center;background-repeat:no-repeat;background-size:14px 14px;text-indent:-99999px}.icon-home>.item{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' viewBox='0 0 16 16'><path d='M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5'/></svg>")}.icon-search>.item{background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' viewBox='0 0 16 16'><path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0'/></svg>")}.track .item{text-transform:uppercase;padding-top:4px;padding-bottom:4px}.track:first-child .item{padding-top:17px}.track.grow .item{padding-bottom:21px}.track .item{border-bottom:0 none transparent}.highlight button{background-color:var(--yellow-400);color:var(--contrast)}.footer{background-color:var(--teal-700);padding:50px var(--padding) 36px;color:#fff}.footer h2{font-size:14px;font-weight:600;margin:0 auto 20px;text-transform:uppercase;width:var(--width)}.columns{margin:0 auto;width:var(--width)}.column{padding-bottom:14px}.footer a,.footer a:visited{color:#fff;text-decoration:none}.footer a:active,.footer a:focus,.footer a:hover{color:var(--teal-100);text-decoration:underline}.footer h3{font-size:14px;font-weight:800;margin:0}.footer ul{margin:0;padding:0}.footer li{font-size:14px;font-weight:600;list-style-type:none;padding:14px 0 0}@media (min-width: 768px){.columns{display:flex;flex-direction:row;flex-wrap:wrap;padding:10px 0}.column{padding-bottom:40px;padding-right:20px;width:calc((var(--width) - 60px) / 4)}.column:nth-child(4),.column:last-child{padding-right:0}}@media (min-width: 1280px){.site{--background: white;--color: var(--teal-600);--outline: var(--teal-700);--padding: 20px;border-bottom:1px solid #d9d9d9;border-top:3px solid var(--teal-700)}.site>ul{justify-content:end}.menu>button{display:none}.menu>ul{display:flex;flex-direction:row;margin:0 auto;width:calc(var(--width) + (2 * var(--padding)))}.item,.track .item,.track:first-child .item,.track.grow .item{border-bottom:0 none transparent;padding-top:12px;padding-bottom:12px}.site .item{font-size:16px}.grow{flex:1 0 auto}.universal{background-color:var(--teal-700)}.universal>ul>li:first-child{margin-left:-10px}.universal>ul>li:last-child{margin-right:-10px}.universal li button{--padding: 20px}.icon>.item{background-position:center center;width:56px}.menu button:after,.menu button.expanded:after,.menu .highlight button:after,.menu .highlight button.expanded:after{display:inline-block;margin-left:5px;position:static;vertical-align:middle}.menu button:after{background-image:var(--icon-caret-down-teal)}.universal button:after{background-image:var(--icon-caret-down-light)}.menu button.expanded:after,.menu button.item:active:after,.menu button.item:focus:after,.menu button.item:hover:after{background-image:var(--icon-caret-down-light)}.menu>ul>li{display:flex;flex-direction:row;justify-content:start;position:relative}.menu>ul>li.grow>.item{flex:0 1 0}.menu>ul>li.active>.item,.menu>ul>li>.expanded,.menu>ul>li>.item:active,.menu>ul>li>.item:focus,.menu>ul>li>.item:hover{background-color:var(--teal-600);color:#fff;outline:0 none transparent}.menu>ul>li>.item:focus-visible{outline:3px solid var(--outline);outline-offset:-3px;z-index:1000}.menu>ul ul{background-color:var(--teal-600);padding:10px 0;position:absolute;right:0;top:48px;z-index:9999}.menu>ul ul li{background-color:var(--teal-600)}.menu>ul ul .item{color:#fff;white-space:nowrap;padding:5px 20px}.menu>ul ul .item:active,.menu>ul ul .item:focus,.menu>ul ul .item:hover{color:#cee8e9;outline:0 none transparent;text-decoration:underline}.menu>ul ul .item:focus-visible{outline:3px solid white;outline-offset:-3px;z-index:1000}.menu>ul>li>.item{line-height:24px}}@media (min-width: 1280px){.columns{flex-wrap:nowrap;padding:10px 0 0}.column{padding-bottom:72px;width:calc((var(--width) - 120px) / 7)}.column:nth-child(4){padding-right:20px}}`, ro = '@import"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css";.glide{position:relative;width:100%;box-sizing:border-box}.glide *{box-sizing:inherit}.glide__track{overflow:hidden}.glide__slides{position:relative;width:100%;list-style:none;backface-visibility:hidden;transform-style:preserve-3d;touch-action:pan-Y;overflow:hidden;margin:0;padding:0;white-space:nowrap;display:flex;flex-wrap:nowrap;will-change:transform}.glide__slides--dragging{-webkit-user-select:none;user-select:none}.glide__slide{width:100%;height:100%;flex-shrink:0;white-space:normal;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}.glide__slide a{-webkit-user-select:none;user-select:none;-webkit-user-drag:none;-moz-user-select:none;-ms-user-select:none}.glide__arrows,.glide__bullets{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}.glide--rtl{direction:rtl}.glide__arrow{position:absolute;display:block;top:50%;z-index:2;color:#fff;text-transform:uppercase;padding:9px 12px;background-color:transparent;border:2px solid rgba(255,255,255,.5);border-radius:4px;box-shadow:0 .25em .5em #0000001a;text-shadow:0 .25em .5em rgba(0,0,0,.1);opacity:1;cursor:pointer;transition:opacity .15s ease,border .3s ease-in-out;transform:translateY(-50%);line-height:1}.glide__arrow:focus{outline:none}.glide__arrow:hover{border-color:#fff}.glide__arrow--left{left:2em}.glide__arrow--right{right:2em}.glide__arrow--disabled{opacity:.33}.glide__bullets{position:absolute;z-index:2;bottom:2em;left:50%;display:inline-flex;list-style:none;transform:translate(-50%)}.glide__bullet{background-color:#ffffff80;width:9px;height:9px;padding:0;border-radius:50%;border:2px solid transparent;transition:all .3s ease-in-out;cursor:pointer;line-height:0;box-shadow:0 .25em .5em #0000001a;margin:0 .25em}.glide__bullet:focus{outline:none}.glide__bullet:hover,.glide__bullet:focus{border:2px solid #fff;background-color:#ffffff80}.glide__bullet--active{background-color:#fff}.glide--swipeable{cursor:grab;cursor:-moz-grab;cursor:-webkit-grab}.glide--dragging{cursor:grabbing;cursor:-moz-grabbing;cursor:-webkit-grabbing}.tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:"";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}.accordion{margin:0 0 16px}.accordion-heading{margin:0}.accordion-heading button{background-color:var(--teal-050);border:0 none transparent;color:var(--teal-700);cursor:pointer;display:block;font-size:16px;font-weight:800;padding:16px 40px 16px 20px;position:relative;text-align:left;width:100%}.accordion-heading button .icon{position:absolute;right:20px;top:16px}.accordion-content{padding:16px 20px 0}.alert{align-items:center;background-color:var(--yellow-200);border-radius:10px;display:flex;flex-direction:row;margin-bottom:20px;padding:20px}.alert i{margin-right:20px}ul.breadcrumbs{--offset: calc((100vw - var(--width)) / 2);border-bottom:1px solid var(--contrast-7);box-sizing:border-box;font-size:14px;font-stretch:70%;font-weight:600;line-height:20px;list-style-type:none;margin:0;padding:0 30px;width:100vw}ul.breadcrumbs.top-border{border-top:1px solid var(--contrast-7)}ul.breadcrumbs.expand{margin-left:-30px;margin-right:-30px}ul.breadcrumbs li{display:inline-block;margin:0;padding:11px 0 6px;text-transform:uppercase;vertical-align:middle}ul.breadcrumbs li:not(.home):before{content:"/";margin:0 12px}ul.breadcrumbs li a{color:var(--teal-700);text-decoration:none}ul.breadcrumbs li:not(.home) a:active,ul.breadcrumbs li:not(.home) a:focus,ul.breadcrumbs li:not(.home) a:hover{text-decoration:underline}@media (min-width: 600px){ul.breadcrumbs{padding-left:var(--offset);padding-right:var(--offset)}ul.breadcrumbs.expand{margin-left:calc(var(--offset) * -1);margin-right:calc(var(--offset) * -1)}}.carousel{margin-bottom:1rem;width:var(--width)}.slide-inner{background-color:var(--contrast-9);display:flex;flex-direction:column}.slide-image img{display:block;width:100%}.slide-text{box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;padding:20px}.slide-text h2{font-size:16px;line-height:1.1;margin:0 0 .25rem}.slide-text a{font-size:14px;line-height:1.1}.slide-text p{font-size:14px;line-height:1.2;margin-bottom:.5rem}.glide__arrow{align-items:center;background-color:var(--contrast-3);border:0 none transparent;border-radius:15px;display:flex;justify-content:center;height:30px;padding:8px;width:30px}.glide__arrow:active,.glide__arrow:hover{background-color:var(--teal-700)}.glide__arrow svg{fill:#fff}.glide__arrow--left{margin-left:-66px}.glide__arrow--right{margin-right:-66px}@media (min-width: 768px){.slide-inner{flex-direction:row}.slide-image img{width:calc((var(--width) - 20px) / 2)}}@media (min-width: 1024px){.slide-image img{width:calc((var(--width) - 40px) / 3)}}@media (min-width: 1280px){.slide-text h2{font-size:18px}.slide-text a{font-size:16px}.slide-text p{font-size:16px;line-height:1.2;margin-bottom:.5rem}}.highlight{background-color:var(--yellow-200);padding:2px 0}.header-components{margin-bottom:2rem}.button-group .btn{display:block;margin:0 0 10px}.card{border:5px solid var(--contrast);padding:20px}@media (min-width: 768px){.flex-header{align-items:center;display:flex;justify-content:space-between}.header-components{margin-bottom:0}.button-group{display:flex}.button-group .btn{display:flex;margin:0 10px 0 0}}@media (min-width: 1024px){.cards{display:flex;flex-direction:row;flex-wrap:wrap;gap:20px}.card{flex:1 0 20%;margin:0}}.donut-chart svg path{cursor:pointer}.donut-chart .center-text{align-items:center;display:flex;flex-direction:column;height:100%;justify-content:center;line-height:1.2}.donut-chart .center-text *{cursor:default;display:block;margin-bottom:.25rem;text-align:center}.donut-chart .center-text .percent{color:var(--contrast-2);font-size:.7rem}.donut-chart .top-items{list-style-type:none;margin:0;padding:0}.donut-chart .top-items li{align-items:center;display:flex;flex-direction:row;font-size:1rem;line-height:1.2;margin-bottom:5px}.donut-chart .symbol{border-radius:8px;display:inline-block;height:16px;margin-right:5px;vertical-align:text-top;width:16px}.expand-text{margin-bottom:1rem;position:relative}.expand-text.contracted{max-height:5.3rem;overflow:hidden}.expand-text button{background-color:#fff;border:0 none transparent;color:var(--teal-700);cursor:pointer;font-size:1rem;font-weight:700}.expand-text.contracted button{background:linear-gradient(to right,#fff0,#fff 50%,#fff);position:absolute;right:0;text-align:right;bottom:0;width:12rem}.grid{border-top:1px solid var(--contrast);max-width:100%;margin-bottom:1rem;overflow:scroll;position:relative}.grid table{border-collapse:separate;border-spacing:0;border-top:0 none transparent;margin-bottom:0;position:relative}.grid th{position:sticky;top:0;z-index:10}.grid th,.grid td{background-color:#fff}.grid th:last-child,.grid td:last-child{border-right:0 none transparent}.grid th.important,.grid td.important{background-color:#f8f9fa}.grid th.input,.grid td.input{background-color:var(--teal-200)}.grid .edited td,.grid .edited select{background-color:#faf1d7}.grid .edited td.important,.grid .edited select.important{background-color:#fbeeca}.grid .disabled td,.grid .disabled select{background-color:#ddd}.grid .disabled td.important,.grid .disabled select.important{background-color:#ccc}.grid tbody tr:last-child th,.grid tbody tr:last-child td{border-bottom:0 none transparent}.icon{height:1em;margin-right:5px;vertical-align:text-bottom}.info-tip{background-color:transparent;border:0 none transparent}.tippy-box[data-theme~=access]{background-color:var(--teal-700);border-radius:0;color:#fff;font-weight:400;padding:5px}.tippy-box[data-theme~=access][data-placement^=top]>.tippy-arrow:before{border-top-color:var(--teal-700)}.tippy-box[data-theme~=access][data-placement^=bottom]>.tippy-arrow:before{border-bottom-color:var(--teal-700)}.tippy-box[data-theme~=access][data-placement^=left]>.tippy-arrow:before{border-left-color:var(--teal-700)}.tippy-box[data-theme~=access][data-placement^=right]>.tippy-arrow:before{border-right-color:var(--teal-700)}.mini-bar{flex:0 0 auto;position:relative;width:100px}.mini-bar .bar{background-color:#ddd;height:1em}.filters-outer{float:right;position:relative}.filters-inner{background-color:#fff;border:4px solid var(--contrast);padding:20px;position:absolute;right:0;top:41px;width:calc(var(--width) * .4)}.filters-inner h2{font-size:16px;margin:0 0 1rem}.filters-inner ul.tags{margin-bottom:1rem}.btn-filters{position:relative}.btn-filters .active-tag-count{background-color:var(--orange-400);border-radius:10px;color:#fff;display:block;font-size:12px;height:20px;line-height:20px;top:-10px;position:absolute;text-align:center;right:-10px;width:20px}.btn-filters.active{z-index:100}.btn-filters.active:after{background-color:#fff;bottom:-4px;content:"";display:block;height:4px;left:0;position:absolute;width:100%}.event:not(:last-child){margin-bottom:1.5rem}.event-icon,.event-icon:active,.event-icon:focus,.event-icon:hover{align-items:center;background-color:var(--teal-700);color:#fff;display:none;flex:0 0 auto;flex-direction:column;font-weight:800;justify-content:center;height:calc((var(--width) - 140px) / 8);text-decoration:none;width:calc((var(--width) - 140px) / 8)}.event-icon span{display:block}.event-icon span:nth-child(2){font-size:2rem}.event-metadata{margin-bottom:1rem}.event-metadata i:not(:first-child){margin-left:1rem}@media (min-width: 768px){.event{display:flex;flex-direction:row}.event-icon,.event-icon:active,.event-icon:focus,.event-icon:hover{display:flex;margin-right:20px}.event h3{margin-top:0}}@media (min-width: 900px){.event-icon span:nth-child(2){font-size:3rem}}.carousel-projects .glide__slide{font-size:16px}.carousel-projects h3{margin:0 0 .25rem}.carousel-projects .project-metadata{margin-bottom:.5rem}.carousel-projects .project-meta{display:inline-block;font-weight:700;line-height:1.1;margin-right:1rem;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.carousel-projects .project-meta .bi{vertical-align:middle}.metrics-overview strong{background-color:var(--yellow-200);font-size:1.2rem;padding:2px;white-space:nowrap}.metrics-overview .bi{vertical-align:middle}.metrics-overview .btn{font-size:1rem}.metrics-disclaimer{font-size:.9rem;line-height:1.2;margin:.5rem 0}.metrics-disclaimer .bi{vertical-align:middle}.resource-group{align-items:flex-start;clear:both;display:flex;flex-direction:column;margin-bottom:20px}.resource-group-image{--image-width: 100%;align-items:center;background-color:var(--contrast-9);border:1px solid var(--contrast);color:var(--contrast-8);display:flex;flex:0 0 auto;flex-direction:column;font-size:5rem;justify-content:center;margin:20px 0;min-height:calc(var(--image-width) / 3 * 2);position:relative;width:var(--image-width)}.resource-group-image:active,.resource-group-image:focus,.resource-group-image:hover{color:var(--contrast-8)}.resource-group-image>img{display:block;width:100%}.image-type-logo{display:flex;flex-direction:column;justify-content:center;min-height:120px}.image-type-logo>*{margin:10px;width:calc(100% - 20px)}.resource-group-text *:first-child{margin-top:0}.resource-group-detail{margin-bottom:70px;width:var(--width)}.resource-group-feature-image{margin-top:60px;width:100%}.resource-group-description:after{clear:both;content:"";display:block}@media (min-width: 768px){.resource-group{flex-direction:row;margin-bottom:40px}.resource-group-image{--image-width: calc((var(--width) - 140px) / 4 + 20px);margin:0 20px 0 0}}@media (min-width: 900px){.resource-group-feature-image{float:right;margin:0 0 0 20px;width:calc(((var(--width) - 140px) / 8) * 3 + 40px)}}#resource-navigation{display:flex;flex-direction:column;gap:10px}@media (min-width: 1024px){#resource-navigation{flex-direction:row;gap:20px}}#resource-news{background-color:var(--teal-100);padding:20px}#resource-news h2{font-size:1.2rem;font-weight:200;margin:0 0 .5rem}#resource-news ul{list-style-type:none;margin:0;padding:0}#resource-news li{font-size:1rem;line-height:1.3;margin:0 0 .5rem;padding:0}@media (min-width: 1024px){#resource-news{box-sizing:border-box;width:calc((var(--width) - 60px) / 4)}}ul.resource-pathways{display:flex;flex-direction:column;gap:10px;list-style-type:none;margin:0;padding:0;width:100%}ul.resource-pathways li{margin:0;width:100%}ul.resource-pathways li a{align-items:flex-start;border:5px solid transparent;box-sizing:border-box;display:flex;height:100%;flex-direction:row;justify-content:flex-start;line-height:1.3;padding:20px;text-decoration:none}ul.resource-pathways a>.bi{font-size:2rem;margin-bottom:1rem}ul.resource-pathways li a>.detail{display:flex;flex-direction:column;margin-left:20px}ul.resource-pathways .title{font-size:1.2rem}ul.resource-pathways .description{font-size:1rem;font-weight:400}ul.resource-pathways .login{font-size:.9rem;font-style:italic;font-weight:400;margin-top:.25rem}ul.resource-pathways .login .bi{vertical-align:middle}.resource-pathway-0{background-color:var(--yellow-400)}.resource-pathway-1{background-color:var(--teal-600)}.resource-pathway-1 a{color:#fff}.resource-pathway-2{background-color:var(--orange-400)}.resource-pathway-3{background-color:var(--teal-200)}ul.resource-pathways li a:active,ul.resource-pathways li a:focus,ul.resource-pathways li a:hover{background-color:#fff;border:5px solid var(--contrast);color:var(--contrast)}@media (min-width: 1024px){ul.resource-pathways{flex-direction:row;gap:20px}ul.resource-pathways li{box-sizing:border-box;width:calc((var(--width) - 60px) / 4)}ul.resource-pathways li a{flex-direction:column}ul.resource-pathways li a>.detail{margin-left:0}}.scroll-text{position:relative}.scroll-text:after{background-color:red;background:linear-gradient(to bottom,#fff0,#fff 50%,#fff);bottom:0;content:"";display:block;height:2rem;left:0;position:absolute;width:100%;z-index:99999}.scroll-text-inner{padding-bottom:2rem;overflow-y:scroll}.search{position:relative}.search input{padding-right:35px}.search .btn-clear{position:absolute;right:-5px;top:-6px}.section-navigation{border-bottom:1px solid var(--contrast-8);border-top:1px solid var(--contrast-8);display:flex;flex-direction:row;margin:20px 0}.section-navigation h2{flex:0 0 auto;font-size:1rem;font-weight:400;margin:20px 0}.section-navigation ul{display:flex;flex-direction:row;flex-wrap:wrap;margin:0;padding:10px 0}.section-navigation li{line-height:1;list-style-type:none;flex:0 0 auto;font-size:1rem;margin:10px 0 10px 20px;padding:0}ul.tags{margin:0;padding:0}li.tag{display:inline-block;list-style-type:none;margin:0 5px 5px 0;max-width:100%}.tag button{background-color:var(--teal-100);border:1px solid var(--teal-400);border-radius:8px;color:var(--contrast);cursor:pointer;display:inline-block;font-size:16px;font-weight:500;line-height:18px;max-width:100%;overflow:hidden;padding:3px 7px;text-align:left;text-decoration:none;text-overflow:ellipsis;text-wrap:nowrap}.tag button:hover{background-color:var(--teal-200);color:var(--contrast)}.tag button:disabled{background-color:var(--contrast-9);border-color:var(--contrast-6);color:var(--contrast-3)}.tag.active button{border-color:var(--orange-400);background-color:var(--orange-200)}', io = ".toc{background-color:var(--teal-600);color:#fff;padding:20px;position:sticky;top:50px}h2{font-size:16px;font-weight:800;margin:0 0 16px}ul{margin:0;padding:0 0 0 20px}li{line-height:1.125;list-style-type:none;margin:0;padding:9px 0}a{color:#fff;font-size:16px;font-weight:600;text-decoration:underline;text-decoration-color:transparent}a :active,a:focus,a:hover{color:var(--teal-100);text-decoration-color:var(--teal-100)}@media (min-width: 768px){a.active{color:var(--teal-100)}}@media (min-width: 900px){.toc{padding:32px}}", de = '.rcb-toggle-icon{background-color:initial!important;background-position:calc(50% - 1px) calc(50% + 2px);background-size:62%!important}.rcb-chat-window{max-height:600px;max-width:100%;width:550px!important}.rcb-chat-window .rcb-bot-avatar{background-position:50%;background-repeat:no-repeat;background-size:contain;border-radius:0}.rcb-chat-window .rcb-chat-header{align-items:center;display:flex;flex-direction:row;font-weight:700}.rcb-chat-window a{color:#000;font-weight:700;text-decoration:underline}.rcb-chat-window a:hover{color:#107180}.rcb-chat-window .rcb-bot-message a{color:#fff;text-decoration:none}.rcb-chat-window .rcb-bot-message a:hover{text-decoration:underline}.rcb-chat-window .rcb-chat-input-textarea{overflow-y:auto}.rcb-chat-window .rcb-chat-footer-container{font-size:10px}.qa-bot .user-login-icon{display:none!important}.qa-bot.bot-logged-in .user-login-icon{display:flex!important;transform:scale(1.3) translateY(-2px)}.embedded-qa-bot .rcb-chat-window{max-width:100%;width:100%!important}.qa-bot.hidden{display:none}.embedded-qa-bot .rcb-bot-message,.embedded-qa-bot .rcb-user-message{max-width:90%!important;word-break:break-word}.embedded-qa-bot .rcb-chat-input-textarea{width:100%!important}.qa-bot-container{max-width:100%;width:100%}.rcb-tooltip-show.phone-ring{animation:phone-ring 3s ease-out!important;z-index:10000!important}@keyframes phone-ring{0%{transform:translate(0) translateY(0) rotate(0)}2%{transform:translate(0) translateY(-8px) rotate(-2deg)}4%{transform:translate(0) translateY(-6px) rotate(2deg)}6%{transform:translate(0) translateY(-8px) rotate(-1deg)}8%{transform:translate(0) translateY(-6px) rotate(1deg)}10%{transform:translate(0) translateY(-8px) rotate(-2deg)}12%{transform:translate(0) translateY(-6px) rotate(2deg)}20%{transform:translate(0) translateY(0) rotate(0)}30%{transform:translate(0) translateY(0) rotate(0)}40%{transform:translate(0) translateY(0) rotate(0)}49%{transform:translate(0) translateY(0) rotate(0)}50%{transform:translate(0) translateY(-8px) rotate(-2deg)}52%{transform:translate(0) translateY(-6px) rotate(2deg)}54%{transform:translate(0) translateY(-8px) rotate(-1deg)}56%{transform:translate(0) translateY(-6px) rotate(1deg)}58%{transform:translate(0) translateY(-8px) rotate(-2deg)}60%{transform:translate(0) translateY(-6px) rotate(2deg)}70%{transform:translate(0) translateY(0) rotate(0)}to{transform:translate(0) translateY(0) rotate(0)}}@media (max-width:768px){.rcb-chat-window{max-height:calc(100vh - 100px)!important;max-width:calc(100vw - 40px)!important;width:550px!important}.embedded-chat-container.open{height:400px}.embedded-chat-closed{font-size:14px;height:40px}.embedded-chat-open-btn{font-size:12px;padding:3px 10px}.rcb-bot-message,.rcb-user-message{max-width:85%!important}.rcb-chat-input-textarea{font-size:16px!important;min-height:44px!important}.rcb-chat-header{padding:12px 16px!important}}@media (max-width:480px){.rcb-chat-window{bottom:10px!important;left:10px!important;max-height:calc(100vh - 80px)!important;max-width:calc(100vw - 20px)!important;right:10px!important;width:calc(100vw - 20px)!important}.embedded-chat-container.open{height:350px}.rcb-bot-message,.rcb-user-message{margin-bottom:8px!important;max-width:90%!important}.rcb-chat-header{font-size:14px!important;padding:8px 12px!important}.rcb-chat-button{bottom:20px!important;height:50px!important;right:20px!important;width:50px!important}.rcb-chat-footer-container{font-size:9px!important;padding:8px 12px!important}}@media (max-width:360px){.rcb-chat-window{left:5px!important;max-width:calc(100vw - 10px)!important;right:5px!important;width:calc(100vw - 10px)!important}.rcb-chat-header{font-size:13px!important;padding:6px 8px!important}}.rcb-checkbox-container{display:flex!important;flex-wrap:wrap!important;gap:8px!important;margin-left:16px!important;max-width:100%!important;padding-top:12px!important}.rcb-checkbox-row-container{align-items:center!important;background-color:#fff!important;border:1px solid #d0d0d0!important;border-radius:6px!important;box-sizing:border-box!important;color:#107180!important;cursor:pointer!important;display:flex!important;flex:0 0 auto!important;font-size:14px!important;font-weight:400!important;margin:0!important;max-height:auto!important;min-height:auto!important;padding:8px 12px!important;text-align:center!important;transition:all .2s ease!important;-webkit-user-select:none;user-select:none;width:auto!important}.rcb-checkbox-row-container:hover{background-color:#e8f4f8!important;border-color:#107180!important;box-shadow:0 2px 4px #10718033!important;transform:translateY(-1px)!important}.rcb-checkbox-row-container[data-checked=true]{background-color:#107180!important;border-color:#107180!important;color:#fff!important}.rcb-checkbox-row{margin-left:0!important}.rcb-checkbox-mark{height:14px!important;margin-right:6px!important;width:14px!important}.rcb-checkbox-label{font-size:13px!important;margin:0!important;white-space:nowrap!important}.rcb-checkbox-next-button{align-items:center!important;background-color:#fff!important;border:1px solid #d0d0d0!important;border-radius:6px!important;box-sizing:border-box!important;color:#107180!important;cursor:pointer!important;display:flex!important;flex:0 0 auto!important;font-size:14px!important;font-weight:400!important;justify-content:center!important;line-height:24px!important;margin:0!important;max-height:auto!important;min-height:auto!important;padding:8px 12px!important;text-align:center!important;transition:all .2s ease!important;-webkit-user-select:none;user-select:none;width:auto!important}.rcb-checkbox-next-button:hover{background-color:#e8f4f8!important;border-color:#107180!important;box-shadow:0 2px 4px #10718033!important;transform:translateY(-1px)!important}.sr-only{clip:rect(0,0,0,0)!important;border:0!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:1px!important}.rcb-chat-input-send-button:focus,.rcb-chat-input-textarea:focus{outline:2px solid #107180!important;outline-offset:2px!important}.rcb-user-message{word-wrap:break-word!important;overflow:hidden!important;word-break:break-word!important}:focus-visible{outline:2px solid #107180!important;outline-offset:2px!important}.rcb-options-container{display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;gap:8px!important;margin:16px!important;padding:0!important}.rcb-options{background-color:#fff!important;border:1px solid #d0d0d0!important;border-radius:6px!important;box-sizing:border-box!important;color:#107180!important;cursor:pointer!important;flex:0 0 auto!important;font-size:14px!important;font-weight:400!important;outline:none!important;padding:8px 12px!important;text-align:center!important;transition:all .2s ease!important;-webkit-user-select:none;user-select:none;width:auto!important}.rcb-options:hover{background-color:#e8f4f8!important;border-color:#107180!important;box-shadow:0 2px 4px #10718033!important;transform:translateY(-1px)!important}.rcb-checkbox-next-button.keyboard-focused,.rcb-checkbox-next-button:focus,.rcb-checkbox-next-button:focus-visible,.rcb-checkbox-row-container.keyboard-focused,.rcb-checkbox-row-container:focus,.rcb-checkbox-row-container:focus-visible,.rcb-options.keyboard-focused,.rcb-options:focus,.rcb-options:focus-visible{background-color:#e8f4f8!important;border-color:#107180!important;outline:none!important}.rcb-options:active{background-color:#107180!important;border-color:#107180!important;color:#fff!important;transform:translateY(0)!important}.keyboard-nav-hint{color:#666!important;font-size:12px!important;font-style:italic!important;margin-bottom:8px!important}@media (prefers-reduced-motion:reduce){.keyboard-nav-hint{display:none!important}}.rcb-options-container [role=button][tabindex="0"],.rcb-options-container button[tabindex="0"]{position:relative!important}.rcb-options-container [role=button][tabindex="0"]:after,.rcb-options-container button[tabindex="0"]:after{color:#107180!important;content:"←"!important;font-size:16px!important;opacity:0!important;position:absolute!important;right:12px!important;top:50%!important;transform:translateY(-50%)!important;transition:opacity .2s ease!important}.rcb-options-container [role=button][tabindex="0"]:focus:after,.rcb-options-container button[tabindex="0"]:focus:after{opacity:1!important}.rcb-chat-input-send-button{cursor:pointer!important;opacity:1!important;pointer-events:auto!important;visibility:visible!important}.rcb-chat-input-send-button:not([tabindex]){-webkit-user-select:none;user-select:none}.rcb-chat-input-container [onclick],.rcb-chat-input-container [role=button],.rcb-chat-input-container div[style*=cursor],.rcb-chat-input-container svg:last-child,.rcb-chat-input-container>div:last-child{tabindex:0!important;cursor:pointer!important}.rcb-chat-footer{margin-top:4px!important;padding-top:0!important}.rcb-chat-footer-container{align-items:center!important;display:flex!important;margin-top:4px!important;padding-top:4px!important}.rcb-chat-footer-container button{order:1!important}.rcb-chat-footer-container a[href*=access-qa-tool]{tab-index:0!important;order:2!important}.rcb-chat-footer-container a[href*=feedback]{tab-index:0!important;order:3!important}@media (prefers-contrast:high){.rcb-chat-window a{background-color:#fff!important;border:1px solid #000!important;color:#000!important}}@media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}body{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;margin:0}code{font-family:source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace}.demo-container{background-color:#f5f5f5;border-bottom:1px solid #ddd;margin-bottom:20px;padding:20px}.demo-title{font-size:1.2em;font-weight:700;margin-bottom:20px}.demo-controls{align-items:flex-start;display:flex;flex-wrap:wrap;gap:20px}.demo-section{flex:1 1;min-width:200px}.demo-section h3{font-size:1em;margin:0 0 10px}.demo-checkbox{display:block;font-size:.95em;margin-bottom:15px}.demo-checkbox:last-child{margin-bottom:10px}.demo-checkbox input{margin-right:8px}.demo-message-section{flex:1 1;min-width:250px}.demo-send-button{background-color:#1a5b6e;border:none;border-radius:4px;color:#fff;cursor:pointer;font-size:.9em;padding:8px 16px}.demo-info{background-color:#e8f4f8;border-radius:4px;color:#555;font-size:.85em;margin-top:15px;padding:12px}.demo-field{margin-bottom:15px}.demo-field label{color:#333;display:block;font-size:.9em;font-weight:500;margin-bottom:5px}.demo-input{border:1px solid #ccc;border-radius:4px;box-sizing:border-box;font-size:.9em;max-width:250px;padding:6px 10px;width:100%}.demo-input:focus{border-color:#1a5b6e;box-shadow:0 0 0 2px #1a5b6e1a;outline:none}.demo-help{color:#666;font-size:.85em;font-style:italic;margin:0 0 15px}.rcb-chat-header-container{border-bottom:1px solid #ccc;color:#fff;display:flex;justify-content:space-between;max-height:55px;padding:12px}.rcb-chat-header{display:flex;flex-direction:row}.rcb-bot-avatar{background-size:cover;border-radius:50%;height:30px;margin-right:12px;width:30px}.rcb-message-prompt-container.visible{align-items:center;animation:rcb-animation-pop-in .3s ease-in-out;bottom:0;display:flex;justify-content:center;margin:auto;opacity:1;pointer-events:auto;position:-webkit-sticky;position:sticky}.rcb-message-prompt-container.hidden{height:0;opacity:0;pointer-events:none;visibility:hidden}.rcb-message-prompt-text{background-color:#fff;border:.5px solid #adadad;border-radius:20px;color:#adadad;cursor:pointer;font-size:12px;padding:6px 12px;transition:color .3s ease,border-color .3s ease;z-index:9999}.rcb-message-prompt-container.hidden .rcb-message-prompt-text{padding:0}.rcb-user-message-container{display:flex;flex-direction:row;justify-content:right}.rcb-user-message{border-radius:22px;font-size:15px;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;margin-right:16px;margin-top:8px;min-height:20px;overflow:auto;overflow-wrap:anywhere;padding:12px 16px;text-align:right;white-space:pre-wrap;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.rcb-user-message-offset{margin-right:50px}.rcb-user-message-entry{animation:rcb-animation-user-message-entry .3s ease-in backwards}.rcb-message-user-avatar{background-size:cover;border-radius:50%;height:40px;margin-left:-10px;margin-right:6px;margin-top:9px;width:40px}.rcb-bot-message-container{display:flex;flex-direction:row}.rcb-bot-message{border-radius:22px;font-size:15px;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;margin-left:16px;margin-top:8px;min-height:20px;overflow:auto;overflow-wrap:anywhere;padding:12px 16px;text-align:left;white-space:pre-wrap;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.rcb-bot-message-offset{margin-left:50px}.rcb-bot-message-entry{animation:rcb-animation-bot-message-entry .3s ease-in backwards}.rcb-message-bot-avatar{background-size:cover;border-radius:50%;height:40px;margin-left:6px;margin-right:-10px;margin-top:9px;width:40px}.rcb-typing-indicator{align-items:center;display:flex}.rcb-dot{animation:rcb-animation-bot-typing 1s infinite;background-color:#ccc;border-radius:50%;height:8px;margin-right:4px;width:8px}.rcb-dot:nth-child(2){animation-delay:.2s}.rcb-dot:nth-child(3){animation-delay:.4s}.rcb-chat-body-container{height:100%;overflow-x:hidden;overflow-y:scroll;padding-bottom:16px;position:relative;touch-action:pan-y;width:100%}.rcb-chat-body-container::-webkit-scrollbar-track{background-color:#f1f1f1}.rcb-chat-body-container::-webkit-scrollbar-thumb{background-color:#ddd;border-radius:4px}.rcb-chat-body-container::-webkit-scrollbar-thumb:hover{background-color:#cfcfcf}.rcb-chat-body-container::-webkit-scrollbar-corner{background-color:#f1f1f1}.rcb-checkbox-container{display:flex;flex-wrap:wrap;gap:10px;margin-left:16px;padding-top:12px}.rcb-checkbox-offset{margin-left:50px!important}.rcb-checkbox-row-container{align-items:center;animation:rcb-animations-checkboxes-entry .5s ease-out;background-color:#fff;border-radius:10px;border-style:solid;border-width:.5px;cursor:pointer;display:flex;gap:5px;max-height:32px;min-height:30px;overflow:hidden;width:80%}.rcb-checkbox-row-container:hover{box-shadow:0 0 5px #0003}.rcb-checkbox-row{align-items:center;cursor:pointer;display:inline-flex;margin-left:10px}.rcb-checkbox-mark{align-items:center;background-color:#f2f2f2;border:none;border-radius:50%;cursor:pointer;display:flex;height:20px;justify-content:center;margin-right:10px;transition:all .3s ease;width:20px}.rcb-checkbox-mark:hover{background-color:#c2c2c2}.rcb-checkbox-mark:before{content:"✓";transition:all .3s ease}.rcb-checkbox-label{font-size:14px}.rcb-checkbox-next-button{align-items:center;animation:rcb-animations-checkboxes-entry .5s ease-out;background-color:#fff;border-radius:10px;border-style:solid;border-width:.5px;cursor:pointer;display:inline-block;font-size:24px;max-height:32px;min-height:30px;text-align:center;width:80%}.rcb-checkbox-next-button:before{content:"→"}.rcb-checkbox-next-button:hover{box-shadow:0 0 5px #0003}.rcb-options-container{display:flex;flex-wrap:wrap;gap:10px;margin-left:16px;max-width:70%;padding-top:12px}.rcb-options-offset{margin-left:50px!important}.rcb-options{align-items:center;animation:rcb-animation-options-entry .5s ease-out;border-radius:20px;border-style:solid;border-width:.5px;cursor:pointer;display:inline-flex;font-size:14px;justify-content:center;overflow:hidden;padding:10px 20px;transition:background-color .3s ease}.rcb-options:hover{box-shadow:0 0 5px #0003}.rcb-line-break-container{align-items:center;display:flex;justify-content:center;max-height:45px;padding-bottom:5px;padding-top:10px}.rcb-line-break-text{color:#adadad;font-size:12px;padding:6px 12px}.rcb-spinner-container{align-items:center;display:flex;justify-content:center;max-height:45px;min-height:35px;padding-bottom:5px;padding-top:10px}.rcb-spinner{animation:rcb-animation-spin 1s linear infinite;border:4px solid #f3f3f3;border-radius:50%;height:22px;width:22px}.rcb-chat-input{align-items:center;background-color:#fff;border-top:1px solid #ccc;display:flex;padding:8px 16px}.rcb-chat-input::placeholder{color:#999}.rcb-chat-input-textarea{background-color:#fff;border:none;border-radius:4px;color:#000;flex:1 1;font-family:inherit;font-size:16px;height:auto;min-height:38px;outline:none;overflow-y:scroll;padding:8px;resize:none;touch-action:none}.rcb-chat-input-textarea::-webkit-scrollbar,.rcb-chat-input-textarea::-webkit-scrollbar-thumb{background-color:initial}.rcb-chat-input-textarea::-webkit-scrollbar-thumb:hover{background-color:initial}.rcb-chat-input-char-counter{font-size:14px;margin-left:8px;margin-top:3px}.rcb-chat-footer-container{align-items:flex-end;background-color:#f2f2f2;border-top:1px solid #ccc;color:#000;display:flex;font-size:12px;justify-content:space-between;max-height:55px;padding:12px 16px 8px 10px}.rcb-chat-footer,.rcb-toggle-button{display:flex;flex-direction:row}.rcb-toggle-button{border:none;border-radius:50%;bottom:20px;box-shadow:0 2px 4px #0003;cursor:pointer;height:75px;position:fixed;right:20px;width:75px;z-index:9999}.rcb-toggle-button.rcb-button-hide{animation:rcb-animation-collapse .3s ease-in-out forwards;opacity:0;visibility:hidden}.rcb-toggle-button.rcb-button-show{animation:rcb-animation-expand .3s ease-in-out forwards;opacity:1;visibility:visible}.rcb-toggle-icon{background-position:50%;background-repeat:no-repeat;background-size:cover;border-radius:inherit;height:100%;margin:auto;width:100%}.rcb-badge,.rcb-toggle-icon{align-items:center;display:flex;justify-content:center}.rcb-badge{background-color:red;border-radius:50%;color:#fff;height:25px;position:absolute;right:-6px;top:-6px;width:25px}.rcb-chat-tooltip{border-radius:20px;box-shadow:0 2px 6px #0003;cursor:pointer;font-size:20px;padding:16px;position:fixed;transition:transform .3s ease;white-space:nowrap;z-index:9999}.rcb-chat-tooltip-tail{border-style:solid;border-width:10px 0 10px 10px;content:"";margin-top:-10px;position:absolute;right:-10px;top:50%}.rcb-chat-tooltip.rcb-tooltip-hide{animation:rcb-animation-tooltip-out .5s ease-in-out;opacity:0;visibility:hidden}.rcb-chat-tooltip.rcb-tooltip-show{animation:rcb-animation-tooltip-in .5s ease-in-out;opacity:1;visibility:visible}.rcb-toast-prompt{animation:rcb-animation-pop-in .3s ease-in-out;background-color:#fff;border:.5px solid #7a7a7a;border-radius:5px;color:#7a7a7a;cursor:pointer;font-size:12px;margin-top:6px;padding:6px 12px;text-align:center;transition:color .3s ease,border-color .3s ease;width:100%;z-index:9999}.rcb-toast-prompt-container{align-items:center;animation:popIn .3s ease-in-out;bottom:0;display:flex;flex-direction:column;justify-content:flex-end;left:50%;margin:200 auto auto;opacity:1;pointer-events:auto;position:absolute;transform:translate(-50%)}.rcb-media-display-image-container,.rcb-media-display-video-container{border-radius:22px;margin-right:16px;margin-top:8px;padding:16px;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.rcb-media-display-offset{margin-right:50px!important}.rcb-media-display-image{border-radius:22px;height:auto;object-fit:cover;width:100%}.rcb-media-display-video{background-color:#000;border-radius:22px;height:auto;width:100%}.rcb-media-display-audio{border-radius:22px;height:auto;margin-right:16px;margin-top:8px;width:100%}.rcb-media-entry{animation:rcb-animation-user-message-entry .3s ease-in backwards}.rcb-attach-button-disabled,.rcb-attach-button-enabled{background-size:cover;border-radius:6px;display:inline-block;height:30px;position:relative;text-align:center;width:30px}.rcb-attach-button-disabled input[type=file],.rcb-attach-button-enabled input[type=file]{display:none;height:100%;position:absolute;width:100%}.rcb-attach-button-enabled{cursor:pointer}.rcb-attach-button-disabled{opacity:.5}.rcb-attach-button-enabled:after{background-color:#0000001a;border-radius:50%;content:"";height:0;left:50%;opacity:0;position:absolute;top:50%;transform:translate(-50%,-50%);transition:width .2s ease-out,height .2s ease-out,opacity .2s ease-out;width:0}.rcb-attach-button-enabled:hover:after{height:130%;opacity:1;width:130%}.rcb-attach-icon-disabled,.rcb-attach-icon-enabled{background-repeat:no-repeat;background-size:cover;display:inline-block;height:24px;margin-top:2px;transition:background-image .3s ease;width:24px}.rcb-attach-icon-enabled{cursor:pointer}.rcb-emoji-button-disabled,.rcb-emoji-button-enabled{background-size:cover;border-radius:6px;cursor:pointer;display:inline-block;height:30px;position:relative;text-align:center;width:30px}.rcb-emoji-icon-disabled,.rcb-emoji-icon-enabled{background-repeat:no-repeat;background-size:cover;display:inline-block;font-size:20px;height:24px;margin-top:2px;position:relative;width:24px}.rcb-emoji-icon-enabled{cursor:pointer}.rcb-emoji-icon-disabled{opacity:.5}.rcb-emoji-button-enabled:after{background-color:#0000001a;border-radius:50%;content:"";height:0;left:50%;opacity:0;position:absolute;top:50%;transform:translate(-50%,-50%);transition:width .2s ease-out,height .2s ease-out,opacity .2s ease-out;width:0}.rcb-emoji-button-enabled:hover:after{height:130%;opacity:1;width:130%}.rcb-emoji-button-popup{background-color:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 2px 4px #0003;max-height:200px;overflow-y:auto;padding:8px;position:absolute;transform:translateY(calc(-100% - 30px));width:158px}.rcb-emoji{cursor:pointer;font-size:24px;padding:3px;transition:transform .2s ease-in-out}.rcb-emoji:hover{transform:scale(1.2)}.rcb-audio-icon{background-size:cover;border:none;cursor:pointer;display:inline-block;height:30px;margin-left:5px;position:relative;width:30px}.rcb-audio-icon:after{background-color:#0000001a;border-radius:50%;content:"";height:0;left:50%;opacity:0;position:absolute;top:50%;transform:translate(-50%,-50%);transition:width .2s ease-out,height .2s ease-out,opacity .2s ease-out;width:0}.rcb-audio-icon:hover:after{height:130%;opacity:1;width:130%}.rcb-close-chat-icon{background-size:cover;border:none;cursor:pointer;display:inline-block;height:30px;margin-left:5px;position:relative;width:30px}.rcb-close-chat-icon:after{background-color:#0000001a;border-radius:50%;content:"";height:0;left:50%;opacity:0;position:absolute;top:50%;transform:translate(-50%,-50%);transition:width .2s ease-out,height .2s ease-out,opacity .2s ease-out;width:0}.rcb-close-chat-icon:hover:after{height:130%;opacity:1;width:130%}.rcb-notification-icon{background-size:cover;border:none;cursor:pointer;display:inline-block;height:30px;margin-left:5px;position:relative;width:30px}.rcb-notification-icon:after{background-color:#0000001a;border-radius:50%;content:"";height:0;left:50%;opacity:0;position:absolute;top:50%;transform:translate(-50%,-50%);transition:width .2s ease-out,height .2s ease-out,opacity .2s ease-out;width:0}.rcb-notification-icon:hover:after{height:130%;opacity:1;width:130%}.rcb-voice-button-disabled,.rcb-voice-button-enabled{align-items:center;background-color:#fff;border-radius:4px;box-shadow:0 0 3px #0000004d;cursor:pointer;display:inline-flex;height:32px;justify-content:center;margin-left:8px;text-transform:uppercase;transition:all .3s ease;width:32px}.rcb-voice-button-enabled{border:1px solid red;box-shadow:0 0 3px #ff000080}.rcb-voice-button-enabled:hover{border:1px solid #3d0000}.rcb-voice-button-disabled{border:1px;border-color:#0003;border-style:solid}.rcb-voice-button-disabled:hover{box-shadow:0 0 3px #8a0000}.rcb-voice-icon{background-position:50%;background-repeat:no-repeat;background-size:cover;background-size:contain;height:60%;object-fit:cover;width:60%}.rcb-voice-icon.on{animation:rcb-animation-ping 1s infinite}.rcb-send-button{border:none;border-radius:4px;box-shadow:0 0 3px #0000004d;cursor:pointer;display:inline-flex;height:32px;justify-content:center;margin-left:8px;text-transform:uppercase;transition:background-color .3s ease;width:51px}.rcb-send-icon{background-position:50%;background-repeat:no-repeat;background-size:cover;background-size:contain;height:50%;object-fit:cover;transform:translateY(20%);width:50%}.rcb-view-history-container{align-items:center;display:flex;justify-content:center;max-height:45px;min-height:35px;padding-bottom:5px;padding-top:10px}.rcb-view-history-button{align-items:center;background-color:#fff;border:.5px solid #adadad;border-radius:20px;color:#adadad;cursor:pointer;display:inline-flex;font-size:12px;justify-content:center;max-width:60%;padding:6px 12px;transition:color .3s ease,border-color .3s ease}.rcb-view-history-button>p{margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rcb-chatbot-global{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;line-height:1.5;z-index:9999}.rcb-chat-window{background-color:#fff;border-radius:10px;bottom:20px;box-shadow:0 2px 4px #0003;display:flex;flex-direction:column;height:550px;overflow:hidden;position:fixed;right:20px;transition:all .3s ease;width:375px}.rcb-window-embedded .rcb-chat-window{bottom:auto;opacity:1;position:relative;right:auto;visibility:visible}.rcb-window-open .rcb-chat-window{animation:rcb-animation-expand .3s ease-in-out forwards;opacity:1;visibility:visible}.rcb-window-close .rcb-chat-window{animation:rcb-animation-collapse .3s ease-in-out forwards;opacity:0;visibility:hidden}@keyframes rcb-animation-expand{0%{opacity:0;transform:translate(100%,100%) scale(0)}to{opacity:1;transform:translate(0) scale(1)}}@keyframes rcb-animation-collapse{0%{opacity:1;transform:translate(0) scale(1)}to{opacity:0;transform:translate(100%,100%) scale(0)}}@keyframes rcb-animation-ping{0%{filter:brightness(100%);opacity:1}50%{filter:brightness(50%);opacity:.8}}@keyframes rcb-animation-bot-message-entry{0%{opacity:0;transform:translate(-100%,50%) scale(0)}to{opacity:1;transform:translate(0) scale(1)}}@keyframes rcb-animation-user-message-entry{0%{opacity:0;transform:translate(100%,50%) scale(0)}to{opacity:1;transform:translate(0) scale(1)}}@keyframes rcb-animation-bot-typing{0%{opacity:.4}50%{opacity:1}to{opacity:.4}}@keyframes rcb-animation-pop-in{0%{opacity:0;transform:scale(.8)}70%{opacity:1;transform:scale(1.1)}to{transform:scale(1)}}@keyframes rcb-animations-checkboxes-entry{0%{opacity:0;transform:translate(-100%)}to{opacity:1;transform:translate(0)}}@keyframes rcb-animation-options-entry{0%{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}@keyframes rcb-animation-tooltip-in{0%{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}@keyframes rcb-animation-tooltip-out{0%{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-5px)}}@keyframes rcb-animation-spin{0%{transform:rotate(0)}to{transform:rotate(1turn)}}', go = (t = {}) => {
  U(/* @__PURE__ */ p(ve, { ...t }), t.target, [
    V,
    $e
  ]);
}, fo = (t = {}) => {
  U(/* @__PURE__ */ p(Ne, { ...t }), t.target, [
    V,
    eo,
    pe
  ]);
}, mo = (t = {}) => {
  U(/* @__PURE__ */ p(We, { ...t }), t.target, [
    V,
    pe,
    oo
  ]);
}, bo = ({
  isLoggedIn: t,
  target: e,
  ...o
} = {}) => {
  t === void 0 && (t = document.cookie.split("; ").includes("SESSaccesscisso=1")), U(
    /* @__PURE__ */ p(Ue, { isLoggedIn: t, target: e, ...o }),
    e,
    [V, de]
  );
}, xo = ({
  items: t,
  isLoggedIn: e,
  loginUrl: o,
  logoutUrl: r,
  siteName: i,
  target: n
} = {}) => {
  if (e === void 0 && (e = document.cookie.split("; ").includes("SESSaccesscisso=1")), t === void 0) {
    const s = { ...e ? Fe : Ie };
    s.items = s.items.map((l) => ({
      ...l,
      href: l.name == "Login" && o || l.name == "Log out" && r || l.href
    })), t = [...Ve, s];
    let a = t.find(
      (l) => (l.href || "").replace(/\/$/, "") == document.location.href.replace(/\/$/, "")
    );
    i && !a && (a = t.find((l) => l.name == i)), a && (a.classes += " active");
  }
  U(
    /* @__PURE__ */ p(
      le,
      {
        classes: "universal",
        items: t,
        name: "ACCESS Menu",
        target: n
      }
    ),
    n,
    [V, _t]
  );
}, wo = ({ items: t, siteName: e, target: o }) => U(
  /* @__PURE__ */ p(
    le,
    {
      classes: "site",
      items: t,
      name: `${e} Menu`,
      target: o
    }
  ),
  o,
  [V, _t]
), vo = ({ items: t, siteName: e, target: o }) => U(/* @__PURE__ */ p(Ge, { items: t, siteName: e }), o, [
  V,
  _t
]), yo = ({ headings: t = [], target: e }) => U(/* @__PURE__ */ p(je, { headings: t }), e, [
  V,
  io
]), ko = ({ baseUri: t, showTitle: e, target: o, title: r }) => U(
  /* @__PURE__ */ p(Ze, { baseUri: t, showTitle: e, title: r }),
  o,
  [V, to, ro, de]
);
export {
  E as A,
  Xt as B,
  vo as C,
  be as D,
  Et as E,
  ao as F,
  Zt as G,
  Wt as H,
  Ie as I,
  Fe as J,
  ko as K,
  wo as L,
  yo as M,
  Ve as N,
  xo as O,
  so as P,
  Ue as Q,
  Z as T,
  Y as _,
  vt as a,
  Q as b,
  ce as c,
  lo as d,
  Je as e,
  uo as f,
  ye as g,
  J as h,
  qe as i,
  po as j,
  W as k,
  x as l,
  no as m,
  ve as n,
  De as o,
  wt as p,
  co as q,
  ho as r,
  Re as s,
  bo as t,
  p as u,
  go as v,
  fo as w,
  $t as x,
  X as y,
  mo as z
};
