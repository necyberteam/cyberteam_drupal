import { l as le, _ as ne, k as oe, d as J, A as ie, h as Go, T as ke, a as An, F as or, g as Yo, y as ee, P as Wo, x as He, q as G, b as ft, c as Pa, Q as qe, H as et, K as Ba, G as Jt, J as Da, u as E } from "./index-DlPAvYaq.js";
var Dr = /[\s\n\\/='"\0<>]/, Cr = /^(xlink|xmlns|xml)([A-Z])/, Ca = /^(?:accessK|auto[A-Z]|cell|ch|col|cont|cross|dateT|encT|form[A-Z]|frame|hrefL|inputM|maxL|minL|noV|playsI|popoverT|readO|rowS|src[A-Z]|tabI|useM|item[A-Z])/, Sa = /^ac|^ali|arabic|basel|cap|clipPath$|clipRule$|color|dominant|enable|fill|flood|font|glyph[^R]|horiz|image|letter|lighting|marker[^WUH]|overline|panose|pointe|paint|rendering|shape|stop|strikethrough|stroke|text[^L]|transform|underline|unicode|units|^v[^i]|^w|^xH/, Ia = /* @__PURE__ */ new Set(["draggable", "spellcheck"]), Ta = /["&<]/;
function Ht(e) {
  if (e.length === 0 || Ta.test(e) === !1) return e;
  for (var t = 0, n = 0, r = "", o = ""; n < e.length; n++) {
    switch (e.charCodeAt(n)) {
      case 34:
        o = "&quot;";
        break;
      case 38:
        o = "&amp;";
        break;
      case 60:
        o = "&lt;";
        break;
      default:
        continue;
    }
    n !== t && (r += e.slice(t, n)), r += o, t = n + 1;
  }
  return n !== t && (r += e.slice(t, n)), r;
}
var Sr = {}, Qa = /* @__PURE__ */ new Set(["animation-iteration-count", "border-image-outset", "border-image-slice", "border-image-width", "box-flex", "box-flex-group", "box-ordinal-group", "column-count", "fill-opacity", "flex", "flex-grow", "flex-negative", "flex-order", "flex-positive", "flex-shrink", "flood-opacity", "font-weight", "grid-column", "grid-row", "line-clamp", "line-height", "opacity", "order", "orphans", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-miterlimit", "stroke-opacity", "stroke-width", "tab-size", "widows", "z-index", "zoom"]), _a = /[A-Z]/g;
function Ma(e) {
  var t = "";
  for (var n in e) {
    var r = e[n];
    if (r != null && r !== "") {
      var o = n[0] == "-" ? n : Sr[n] || (Sr[n] = n.replace(_a, "-$&").toLowerCase()), i = ";";
      typeof r != "number" || o.startsWith("--") || Qa.has(o) || (i = "px;"), t = t + o + ":" + r + i;
    }
  }
  return t || void 0;
}
function Ir() {
  this.__d = !0;
}
function Oa(e, t) {
  return { __v: e, context: t, props: e.props, setState: Ir, forceUpdate: Ir, __d: !0, __h: new Array(0) };
}
var Hn, it, Ot, Ct, ir = {}, Tr = [], St = Array.isArray, Fn = Object.assign, Ee = "";
function Qr(e, t, n) {
  var r = le.__s;
  le.__s = !0, Hn = le.__b, it = le.diffed, Ot = le.__r, Ct = le.unmount;
  var o = ne(oe, null);
  o.__k = [e];
  try {
    var i = Ze(e, t || ir, !1, void 0, o, !1, n);
    return St(i) ? i.join(Ee) : i;
  } catch (a) {
    throw a.then ? new Error('Use "renderToStringAsync" for suspenseful rendering.') : a;
  } finally {
    le.__c && le.__c(e, Tr), le.__s = r, Tr.length = 0;
  }
}
function _r(e, t) {
  var n, r = e.type, o = !0;
  return e.__c ? (o = !1, (n = e.__c).state = n.__s) : n = new r(e.props, t), e.__c = n, n.__v = e, n.props = e.props, n.context = t, n.__d = !0, n.state == null && (n.state = ir), n.__s == null && (n.__s = n.state), r.getDerivedStateFromProps ? n.state = Fn({}, n.state, r.getDerivedStateFromProps(n.props, n.state)) : o && n.componentWillMount ? (n.componentWillMount(), n.state = n.__s !== n.state ? n.__s : n.state) : !o && n.componentWillUpdate && n.componentWillUpdate(), Ot && Ot(e), n.render(n.props, n.state, t);
}
function Ze(e, t, n, r, o, i, a) {
  if (e == null || e === !0 || e === !1 || e === Ee) return Ee;
  var A = typeof e;
  if (A != "object") return A == "function" ? Ee : A == "string" ? Ht(e) : e + Ee;
  if (St(e)) {
    var s, d = Ee;
    o.__k = e;
    for (var u = e.length, c = 0; c < u; c++) {
      var l = e[c];
      if (l != null && typeof l != "boolean") {
        var p, f = Ze(l, t, n, r, o, i, a);
        typeof f == "string" ? d += f : (s || (s = new Array(u)), d && s.push(d), d = Ee, St(f) ? (p = s).push.apply(p, f) : s.push(f));
      }
    }
    return s ? (d && s.push(d), s) : d;
  }
  if (e.constructor !== void 0) return Ee;
  e.__ = o, Hn && Hn(e);
  var m = e.type, h = e.props;
  if (typeof m == "function") {
    var b, w, g, x = t;
    if (m === oe) {
      if ("tpl" in h) {
        for (var k = Ee, P = 0; P < h.tpl.length; P++) if (k += h.tpl[P], h.exprs && P < h.exprs.length) {
          var S = h.exprs[P];
          if (S == null) continue;
          typeof S != "object" || S.constructor !== void 0 && !St(S) ? k += S : k += Ze(S, t, n, r, e, i, a);
        }
        return k;
      }
      if ("UNSTABLE_comment" in h) return "<!--" + Ht(h.UNSTABLE_comment) + "-->";
      w = h.children;
    } else {
      if ((b = m.contextType) != null) {
        var I = t[b.__c];
        x = I ? I.props.value : b.__;
      }
      var D = m.prototype && typeof m.prototype.render == "function";
      if (D) w = _r(e, x), g = e.__c;
      else {
        e.__c = g = Oa(e, x);
        for (var B = 0; g.__d && B++ < 25; ) g.__d = !1, Ot && Ot(e), w = m.call(g, h, x);
        g.__d = !0;
      }
      if (g.getChildContext != null && (t = Fn({}, t, g.getChildContext())), D && le.errorBoundaries && (m.getDerivedStateFromError || g.componentDidCatch)) {
        w = w != null && w.type === oe && w.key == null && w.props.tpl == null ? w.props.children : w;
        try {
          return Ze(w, t, n, r, e, i, a);
        } catch (v) {
          return m.getDerivedStateFromError && (g.__s = m.getDerivedStateFromError(v)), g.componentDidCatch && g.componentDidCatch(v, ir), g.__d ? (w = _r(e, t), (g = e.__c).getChildContext != null && (t = Fn({}, t, g.getChildContext())), Ze(w = w != null && w.type === oe && w.key == null && w.props.tpl == null ? w.props.children : w, t, n, r, e, i, a)) : Ee;
        } finally {
          it && it(e), Ct && Ct(e);
        }
      }
    }
    w = w != null && w.type === oe && w.key == null && w.props.tpl == null ? w.props.children : w;
    try {
      var Q = Ze(w, t, n, r, e, i, a);
      return it && it(e), le.unmount && le.unmount(e), Q;
    } catch (v) {
      if (a && a.onError) {
        var C = a.onError(v, e, function(j, q) {
          return Ze(j, t, n, r, q, i, a);
        });
        if (C !== void 0) return C;
        var M = le.__e;
        return M && M(v, e), Ee;
      }
      throw v;
    }
  }
  var L, H = "<" + m, F = Ee;
  for (var R in h) {
    var _ = h[R];
    if (typeof _ != "function" || R === "class" || R === "className") {
      switch (R) {
        case "children":
          L = _;
          continue;
        case "key":
        case "ref":
        case "__self":
        case "__source":
          continue;
        case "htmlFor":
          if ("for" in h) continue;
          R = "for";
          break;
        case "className":
          if ("class" in h) continue;
          R = "class";
          break;
        case "defaultChecked":
          R = "checked";
          break;
        case "defaultSelected":
          R = "selected";
          break;
        case "defaultValue":
        case "value":
          switch (R = "value", m) {
            case "textarea":
              L = _;
              continue;
            case "select":
              r = _;
              continue;
            case "option":
              r != _ || "selected" in h || (H += " selected");
          }
          break;
        case "dangerouslySetInnerHTML":
          F = _ && _.__html;
          continue;
        case "style":
          typeof _ == "object" && (_ = Ma(_));
          break;
        case "acceptCharset":
          R = "accept-charset";
          break;
        case "httpEquiv":
          R = "http-equiv";
          break;
        default:
          if (Cr.test(R)) R = R.replace(Cr, "$1:$2").toLowerCase();
          else {
            if (Dr.test(R)) continue;
            R[4] !== "-" && !Ia.has(R) || _ == null ? n ? Sa.test(R) && (R = R === "panose1" ? "panose-1" : R.replace(/([A-Z])/g, "-$1").toLowerCase()) : Ca.test(R) && (R = R.toLowerCase()) : _ += Ee;
          }
      }
      _ != null && _ !== !1 && (H = _ === !0 || _ === Ee ? H + " " + R : H + " " + R + '="' + (typeof _ == "string" ? Ht(_) : _ + Ee) + '"');
    }
  }
  if (Dr.test(m)) throw new Error(m + " is not a valid HTML tag name in " + H + ">");
  if (F || (typeof L == "string" ? F = Ht(L) : L != null && L !== !1 && L !== !0 && (F = Ze(L, t, m === "svg" || m !== "foreignObject" && n, r, e, i, a))), it && it(e), Ct && Ct(e), !F && La.has(m)) return H + "/>";
  var y = "</" + m + ">", Y = H + ">";
  return St(F) ? [Y].concat(F, [y]) : typeof F != "string" ? [Y, F, y] : Y + F + y;
}
var La = /* @__PURE__ */ new Set(["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"]);
function qo(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function Un(e, t) {
  for (var n in e) if (n !== "__source" && !(n in t)) return !0;
  for (var r in t) if (r !== "__source" && e[r] !== t[r]) return !0;
  return !1;
}
function Vo(e, t) {
  var n = t(), r = J({ t: { __: n, u: t } }), o = r[0].t, i = r[1];
  return An(function() {
    o.__ = n, o.u = t, pn(o) && i({ t: o });
  }, [e, n, t]), ee(function() {
    return pn(o) && i({ t: o }), e(function() {
      pn(o) && i({ t: o });
    });
  }, [e]), n;
}
function pn(e) {
  var t, n, r = e.u, o = e.__;
  try {
    var i = r();
    return !((t = o) === (n = i) && (t !== 0 || 1 / t == 1 / n) || t != t && n != n);
  } catch {
    return !0;
  }
}
function Xo(e) {
  e();
}
function Ko(e) {
  return e;
}
function Jo() {
  return [!1, Xo];
}
var Zo = An;
function zn(e, t) {
  this.props = e, this.context = t;
}
function Na(e, t) {
  function n(o) {
    var i = this.props.ref, a = i == o.ref;
    return !a && i && (i.call ? i(null) : i.current = null), t ? !t(this.props, o) || !a : Un(this.props, o);
  }
  function r(o) {
    return this.shouldComponentUpdate = n, ne(e, o);
  }
  return r.displayName = "Memo(" + (e.displayName || e.name) + ")", r.prototype.isReactComponent = !0, r.__f = !0, r;
}
(zn.prototype = new ft()).isPureReactComponent = !0, zn.prototype.shouldComponentUpdate = function(e, t) {
  return Un(this.props, e) || Un(this.state, t);
};
var Mr = le.__b;
le.__b = function(e) {
  e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), Mr && Mr(e);
};
var Ra = typeof Symbol < "u" && Symbol.for && Symbol.for("react.forward_ref") || 3911;
function Me(e) {
  function t(n) {
    var r = qo({}, n);
    return delete r.ref, e(r, n.ref || null);
  }
  return t.$$typeof = Ra, t.render = t, t.prototype.isReactComponent = t.__f = !0, t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
}
var Or = function(e, t) {
  return e == null ? null : et(et(e).map(t));
}, Ha = { map: Or, forEach: Or, count: function(e) {
  return e ? et(e).length : 0;
}, only: function(e) {
  var t = et(e);
  if (t.length !== 1) throw "Children.only";
  return t[0];
}, toArray: et }, Fa = le.__e;
le.__e = function(e, t, n, r) {
  if (e.then) {
    for (var o, i = t; i = i.__; ) if ((o = i.__c) && o.__c) return t.__e == null && (t.__e = n.__e, t.__k = n.__k), o.__c(e, t);
  }
  Fa(e, t, n, r);
};
var Lr = le.unmount;
function $o(e, t, n) {
  return e && (e.__c && e.__c.__H && (e.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), e.__c.__H = null), (e = qo({}, e)).__c != null && (e.__c.__P === n && (e.__c.__P = t), e.__c.__e = !0, e.__c = null), e.__k = e.__k && e.__k.map(function(r) {
    return $o(r, t, n);
  })), e;
}
function ei(e, t, n) {
  return e && n && (e.__v = null, e.__k = e.__k && e.__k.map(function(r) {
    return ei(r, t, n);
  }), e.__c && e.__c.__P === t && (e.__e && n.appendChild(e.__e), e.__c.__e = !0, e.__c.__P = n)), e;
}
function Yt() {
  this.__u = 0, this.o = null, this.__b = null;
}
function ti(e) {
  var t = e.__.__c;
  return t && t.__a && t.__a(e);
}
function Ua(e) {
  var t, n, r;
  function o(i) {
    if (t || (t = e()).then(function(a) {
      n = a.default || a;
    }, function(a) {
      r = a;
    }), r) throw r;
    if (!n) throw t;
    return ne(n, i);
  }
  return o.displayName = "Lazy", o.__f = !0, o;
}
function It() {
  this.i = null, this.l = null;
}
le.unmount = function(e) {
  var t = e.__c;
  t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), Lr && Lr(e);
}, (Yt.prototype = new ft()).__c = function(e, t) {
  var n = t.__c, r = this;
  r.o == null && (r.o = []), r.o.push(n);
  var o = ti(r.__v), i = !1, a = function() {
    i || (i = !0, n.__R = null, o ? o(A) : A());
  };
  n.__R = a;
  var A = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var s = r.state.__a;
        r.__v.__k[0] = ei(s, s.__c.__P, s.__c.__O);
      }
      var d;
      for (r.setState({ __a: r.__b = null }); d = r.o.pop(); ) d.forceUpdate();
    }
  };
  r.__u++ || 32 & t.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), e.then(a, a);
}, Yt.prototype.componentWillUnmount = function() {
  this.o = [];
}, Yt.prototype.render = function(e, t) {
  if (this.__b) {
    if (this.__v.__k) {
      var n = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = $o(this.__b, n, r.__O = r.__P);
    }
    this.__b = null;
  }
  var o = t.__a && ne(oe, null, e.fallback);
  return o && (o.__u &= -33), [ne(oe, null, t.__a ? null : e.children), o];
};
var Nr = function(e, t, n) {
  if (++n[1] === n[0] && e.l.delete(t), e.props.revealOrder && (e.props.revealOrder[0] !== "t" || !e.l.size)) for (n = e.i; n; ) {
    for (; n.length > 3; ) n.pop()();
    if (n[1] < n[0]) break;
    e.i = n = n[2];
  }
};
function za(e) {
  return this.getChildContext = function() {
    return e.context;
  }, e.children;
}
function ja(e) {
  var t = this, n = e.h;
  if (t.componentWillUnmount = function() {
    Jt(null, t.v), t.v = null, t.h = null;
  }, t.h && t.h !== n && t.componentWillUnmount(), !t.v) {
    for (var r = t.__v; r !== null && !r.__m && r.__ !== null; ) r = r.__;
    t.h = n, t.v = { nodeType: 1, parentNode: n, childNodes: [], __k: { __m: r.__m }, contains: function() {
      return !0;
    }, insertBefore: function(o, i) {
      this.childNodes.push(o), t.h.insertBefore(o, i);
    }, removeChild: function(o) {
      this.childNodes.splice(this.childNodes.indexOf(o) >>> 1, 1), t.h.removeChild(o);
    } };
  }
  Jt(ne(za, { context: t.context }, e.__v), t.v);
}
function Ga(e, t) {
  var n = ne(ja, { __v: e, h: t });
  return n.containerInfo = t, n;
}
(It.prototype = new ft()).__a = function(e) {
  var t = this, n = ti(t.__v), r = t.l.get(e);
  return r[0]++, function(o) {
    var i = function() {
      t.props.revealOrder ? (r.push(o), Nr(t, e, r)) : o();
    };
    n ? n(i) : i();
  };
}, It.prototype.render = function(e) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t = et(e.children);
  e.revealOrder && e.revealOrder[0] === "b" && t.reverse();
  for (var n = t.length; n--; ) this.l.set(t[n], this.i = [1, 0, this.i]);
  return e.children;
}, It.prototype.componentDidUpdate = It.prototype.componentDidMount = function() {
  var e = this;
  this.l.forEach(function(t, n) {
    Nr(e, n, t);
  });
};
var ni = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Ya = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Wa = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, qa = /[A-Z0-9]/g, Va = typeof document < "u", Xa = function(e) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(e);
};
function Ka(e, t, n) {
  return t.__k == null && (t.textContent = ""), Jt(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
function Ja(e, t, n) {
  return Da(e, t), typeof n == "function" && n(), e ? e.__c : null;
}
ft.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(e) {
  Object.defineProperty(ft.prototype, e, { configurable: !0, get: function() {
    return this["UNSAFE_" + e];
  }, set: function(t) {
    Object.defineProperty(this, e, { configurable: !0, writable: !0, value: t });
  } });
});
var Rr = le.event;
function Za() {
}
function $a() {
  return this.cancelBubble;
}
function eA() {
  return this.defaultPrevented;
}
le.event = function(e) {
  return Rr && (e = Rr(e)), e.persist = Za, e.isPropagationStopped = $a, e.isDefaultPrevented = eA, e.nativeEvent = e;
};
var ar, tA = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, Hr = le.vnode;
le.vnode = function(e) {
  typeof e.type == "string" && function(t) {
    var n = t.props, r = t.type, o = {}, i = r.indexOf("-") === -1;
    for (var a in n) {
      var A = n[a];
      if (!(a === "value" && "defaultValue" in n && A == null || Va && a === "children" && r === "noscript" || a === "class" || a === "className")) {
        var s = a.toLowerCase();
        a === "defaultValue" && "value" in n && n.value == null ? a = "value" : a === "download" && A === !0 ? A = "" : s === "translate" && A === "no" ? A = !1 : s[0] === "o" && s[1] === "n" ? s === "ondoubleclick" ? a = "ondblclick" : s !== "onchange" || r !== "input" && r !== "textarea" || Xa(n.type) ? s === "onfocus" ? a = "onfocusin" : s === "onblur" ? a = "onfocusout" : Wa.test(a) && (a = s) : s = a = "oninput" : i && Ya.test(a) ? a = a.replace(qa, "-$&").toLowerCase() : A === null && (A = void 0), s === "oninput" && o[a = s] && (a = "oninputCapture"), o[a] = A;
      }
    }
    r == "select" && o.multiple && Array.isArray(o.value) && (o.value = et(n.children).forEach(function(d) {
      d.props.selected = o.value.indexOf(d.props.value) != -1;
    })), r == "select" && o.defaultValue != null && (o.value = et(n.children).forEach(function(d) {
      d.props.selected = o.multiple ? o.defaultValue.indexOf(d.props.value) != -1 : o.defaultValue == d.props.value;
    })), n.class && !n.className ? (o.class = n.class, Object.defineProperty(o, "className", tA)) : (n.className && !n.class || n.class && n.className) && (o.class = o.className = n.className), t.props = o;
  }(e), e.$$typeof = ni, Hr && Hr(e);
};
var Fr = le.__r;
le.__r = function(e) {
  Fr && Fr(e), ar = e.__c;
};
var Ur = le.diffed;
le.diffed = function(e) {
  Ur && Ur(e);
  var t = e.props, n = e.__e;
  n != null && e.type === "textarea" && "value" in t && t.value !== n.value && (n.value = t.value == null ? "" : t.value), ar = null;
};
var nA = { ReactCurrentDispatcher: { current: { readContext: function(e) {
  return ar.__n[e.__c].props.value;
}, useCallback: G, useContext: He, useDebugValue: Wo, useDeferredValue: Ko, useEffect: ee, useId: Yo, useImperativeHandle: or, useInsertionEffect: Zo, useLayoutEffect: An, useMemo: ke, useReducer: Go, useRef: ie, useState: J, useSyncExternalStore: Vo, useTransition: Jo } } };
function rA(e) {
  return ne.bind(null, e);
}
function ht(e) {
  return !!e && e.$$typeof === ni;
}
function oA(e) {
  return ht(e) && e.type === oe;
}
function iA(e) {
  return !!e && !!e.displayName && (typeof e.displayName == "string" || e.displayName instanceof String) && e.displayName.startsWith("Memo(");
}
function aA(e) {
  return ht(e) ? Ba.apply(null, arguments) : e;
}
function AA(e) {
  return !!e.__k && (Jt(null, e), !0);
}
function sA(e) {
  return e && (e.base || e.nodeType === 1 && e) || null;
}
var lA = function(e, t) {
  return e(t);
}, cA = function(e, t) {
  return e(t);
}, uA = oe, dA = ht, N = { useState: J, useId: Yo, useReducer: Go, useEffect: ee, useLayoutEffect: An, useInsertionEffect: Zo, useTransition: Jo, useDeferredValue: Ko, useSyncExternalStore: Vo, startTransition: Xo, useRef: ie, useImperativeHandle: or, useMemo: ke, useCallback: G, useContext: He, useDebugValue: Wo, version: "18.3.1", Children: Ha, render: Ka, hydrate: Ja, unmountComponentAtNode: AA, createPortal: Ga, createElement: ne, createContext: qe, createFactory: rA, cloneElement: aA, createRef: Pa, Fragment: oe, isValidElement: ht, isElement: dA, isFragment: oA, isMemo: iA, findDOMNode: sA, Component: ft, PureComponent: zn, memo: Na, forwardRef: Me, flushSync: cA, unstable_batchedUpdates: lA, StrictMode: uA, Suspense: Yt, SuspenseList: It, lazy: Ua, __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: nA };
const pA = {
  renderToString: Qr,
  renderToStaticMarkup: Qr
};
function Zt() {
  return Zt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Zt.apply(null, arguments);
}
function ri(e, t) {
  t === void 0 && (t = {});
  var n = t.insertAt;
  if (e && typeof document < "u") {
    var r = document.head || document.getElementsByTagName("head")[0], o = document.createElement("style");
    o.type = "text/css", n === "top" && r.firstChild ? r.insertBefore(o, r.firstChild) : r.appendChild(o), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(document.createTextNode(e));
  }
}
ri('.rcb-chat-header-container{border-bottom:1px solid #ccc;color:#fff;display:flex;justify-content:space-between;max-height:55px;padding:12px}.rcb-chat-header{display:flex;flex-direction:row}.rcb-bot-avatar{background-size:cover;border-radius:50%;height:30px;margin-right:12px;width:30px}.rcb-message-prompt-container.visible{align-items:center;animation:rcb-animation-pop-in .3s ease-in-out;bottom:0;display:flex;justify-content:center;margin:auto;opacity:1;pointer-events:auto;position:sticky}.rcb-message-prompt-container.hidden{height:0;opacity:0;pointer-events:none;visibility:hidden}.rcb-message-prompt-text{background-color:#fff;border:.5px solid #adadad;border-radius:20px;color:#adadad;cursor:pointer;font-size:12px;padding:6px 12px;transition:color .3s ease,border-color .3s ease;z-index:9999}.rcb-message-prompt-container.hidden .rcb-message-prompt-text{padding:0}.rcb-user-message-container{display:flex;flex-direction:row;justify-content:right}.rcb-user-message{border-radius:22px;font-size:15px;height:fit-content;margin-right:16px;margin-top:8px;min-height:20px;overflow:auto;overflow-wrap:anywhere;padding:12px 16px;text-align:right;white-space:pre-wrap;width:fit-content}.rcb-user-message-offset{margin-right:50px}.rcb-user-message-entry{animation:rcb-animation-user-message-entry .3s ease-in backwards}.rcb-message-user-avatar{background-size:cover;border-radius:50%;height:40px;margin-left:-10px;margin-right:6px;margin-top:9px;width:40px}.rcb-bot-message-container{display:flex;flex-direction:row}.rcb-bot-message{border-radius:22px;font-size:15px;height:fit-content;margin-left:16px;margin-top:8px;min-height:20px;overflow:auto;overflow-wrap:anywhere;padding:12px 16px;text-align:left;white-space:pre-wrap;width:fit-content}.rcb-bot-message-offset{margin-left:50px}.rcb-bot-message-entry{animation:rcb-animation-bot-message-entry .3s ease-in backwards}.rcb-message-bot-avatar{background-size:cover;border-radius:50%;height:40px;margin-left:6px;margin-right:-10px;margin-top:9px;width:40px}.rcb-typing-indicator{align-items:center;display:flex}.rcb-dot{animation:rcb-animation-bot-typing 1s infinite;background-color:#ccc;border-radius:50%;height:8px;margin-right:4px;width:8px}.rcb-dot:nth-child(2){animation-delay:.2s}.rcb-dot:nth-child(3){animation-delay:.4s}.rcb-chat-body-container{height:100%;overflow-x:hidden;overflow-y:scroll;padding-bottom:16px;position:relative;touch-action:pan-y;width:100%}.rcb-chat-body-container::-webkit-scrollbar-track{background-color:#f1f1f1}.rcb-chat-body-container::-webkit-scrollbar-thumb{background-color:#ddd;border-radius:4px}.rcb-chat-body-container::-webkit-scrollbar-thumb:hover{background-color:#cfcfcf}.rcb-chat-body-container::-webkit-scrollbar-corner{background-color:#f1f1f1}.rcb-checkbox-container{display:flex;flex-wrap:wrap;gap:10px;margin-left:16px;padding-top:12px}.rcb-checkbox-offset{margin-left:50px!important}.rcb-checkbox-row-container{align-items:center;animation:rcb-animations-checkboxes-entry .5s ease-out;background-color:#fff;border-radius:10px;border-style:solid;border-width:.5px;cursor:pointer;display:flex;gap:5px;max-height:32px;min-height:30px;overflow:hidden;width:80%}.rcb-checkbox-row-container:hover{box-shadow:0 0 5px #0003}.rcb-checkbox-row{align-items:center;cursor:pointer;display:inline-flex;margin-left:10px}.rcb-checkbox-mark{align-items:center;background-color:#f2f2f2;border:none;border-radius:50%;cursor:pointer;display:flex;height:20px;justify-content:center;margin-right:10px;transition:all .3s ease;width:20px}.rcb-checkbox-mark:hover{background-color:#c2c2c2}.rcb-checkbox-mark:before{content:"✓";transition:all .3s ease}.rcb-checkbox-label{font-size:14px}.rcb-checkbox-next-button{align-items:center;animation:rcb-animations-checkboxes-entry .5s ease-out;background-color:#fff;border-radius:10px;border-style:solid;border-width:.5px;cursor:pointer;display:inline-block;font-size:24px;max-height:32px;min-height:30px;text-align:center;width:80%}.rcb-checkbox-next-button:before{content:"→"}.rcb-checkbox-next-button:hover{box-shadow:0 0 5px #0003}.rcb-options-container{display:flex;flex-wrap:wrap;gap:10px;margin-left:16px;max-width:70%;padding-top:12px}.rcb-options-offset{margin-left:50px!important}.rcb-options{align-items:center;animation:rcb-animation-options-entry .5s ease-out;border-radius:20px;border-style:solid;border-width:.5px;cursor:pointer;display:inline-flex;font-size:14px;justify-content:center;overflow:hidden;padding:10px 20px;transition:background-color .3s ease}.rcb-options:hover{box-shadow:0 0 5px #0003}.rcb-line-break-container{align-items:center;display:flex;justify-content:center;max-height:45px;padding-bottom:5px;padding-top:10px}.rcb-line-break-text{color:#adadad;font-size:12px;padding:6px 12px}.rcb-spinner-container{align-items:center;display:flex;justify-content:center;max-height:45px;min-height:35px;padding-bottom:5px;padding-top:10px}.rcb-spinner{animation:rcb-animation-spin 1s linear infinite;border:4px solid #f3f3f3;border-radius:50%;height:22px;width:22px}.rcb-chat-input{align-items:center;background-color:#fff;border-top:1px solid #ccc;display:flex;padding:8px 16px}.rcb-chat-input::placeholder{color:#999}.rcb-chat-input-textarea{background-color:#fff;border:none;border-radius:4px;color:#000;flex:1;font-family:inherit;font-size:16px;height:auto;min-height:38px;outline:none;overflow-y:scroll;padding:8px;resize:none;touch-action:none}.rcb-chat-input-textarea::-webkit-scrollbar,.rcb-chat-input-textarea::-webkit-scrollbar-thumb{background-color:initial}.rcb-chat-input-textarea::-webkit-scrollbar-thumb:hover{background-color:initial}.rcb-chat-input-char-counter{font-size:14px;margin-left:8px;margin-top:3px}.rcb-chat-footer-container{align-items:flex-end;background-color:#f2f2f2;border-top:1px solid #ccc;color:#000;display:flex;font-size:12px;justify-content:space-between;max-height:55px;padding:12px 16px 8px 10px}.rcb-chat-footer,.rcb-toggle-button{display:flex;flex-direction:row}.rcb-toggle-button{border:none;border-radius:50%;bottom:20px;box-shadow:0 2px 4px #0003;cursor:pointer;height:75px;position:fixed;right:20px;width:75px;z-index:9999}.rcb-toggle-button.rcb-button-hide{animation:rcb-animation-collapse .3s ease-in-out forwards;opacity:0;visibility:hidden}.rcb-toggle-button.rcb-button-show{animation:rcb-animation-expand .3s ease-in-out forwards;opacity:1;visibility:visible}.rcb-toggle-icon{background-position:50%;background-repeat:no-repeat;background-size:cover;border-radius:inherit;height:100%;margin:auto;width:100%}.rcb-badge,.rcb-toggle-icon{align-items:center;display:flex;justify-content:center}.rcb-badge{background-color:red;border-radius:50%;color:#fff;height:25px;position:absolute;right:-6px;top:-6px;width:25px}.rcb-chat-tooltip{border-radius:20px;box-shadow:0 2px 6px #0003;cursor:pointer;font-size:20px;padding:16px;position:fixed;transition:transform .3s ease;white-space:nowrap;z-index:9999}.rcb-chat-tooltip-tail{border-style:solid;border-width:10px 0 10px 10px;content:"";margin-top:-10px;position:absolute;right:-10px;top:50%}.rcb-chat-tooltip.rcb-tooltip-hide{animation:rcb-animation-tooltip-out .5s ease-in-out;opacity:0;visibility:hidden}.rcb-chat-tooltip.rcb-tooltip-show{animation:rcb-animation-tooltip-in .5s ease-in-out;opacity:1;visibility:visible}.rcb-toast-prompt{animation:rcb-animation-pop-in .3s ease-in-out;background-color:#fff;border:.5px solid #7a7a7a;border-radius:5px;color:#7a7a7a;cursor:pointer;font-size:12px;margin-top:6px;padding:6px 12px;text-align:center;transition:color .3s ease,border-color .3s ease;width:100%;z-index:9999}.rcb-toast-prompt-container{align-items:center;animation:popIn .3s ease-in-out;bottom:0;display:flex;flex-direction:column;justify-content:flex-end;left:50%;margin:200 auto auto;opacity:1;pointer-events:auto;position:absolute;transform:translate(-50%)}.rcb-media-display-image-container,.rcb-media-display-video-container{border-radius:22px;margin-right:16px;margin-top:8px;padding:16px;width:fit-content}.rcb-media-display-offset{margin-right:50px!important}.rcb-media-display-image{border-radius:22px;height:auto;object-fit:cover;width:100%}.rcb-media-display-video{background-color:#000;border-radius:22px;height:auto;width:100%}.rcb-media-display-audio{border-radius:22px;height:auto;margin-right:16px;margin-top:8px;width:100%}.rcb-media-entry{animation:rcb-animation-user-message-entry .3s ease-in backwards}.rcb-attach-button-disabled,.rcb-attach-button-enabled{background-size:cover;border-radius:6px;display:inline-block;height:30px;position:relative;text-align:center;width:30px}.rcb-attach-button-disabled input[type=file],.rcb-attach-button-enabled input[type=file]{display:none;height:100%;position:absolute;width:100%}.rcb-attach-button-enabled{cursor:pointer}.rcb-attach-button-disabled{opacity:.5}.rcb-attach-button-enabled:after{background-color:#0000001a;border-radius:50%;content:"";height:0;left:50%;opacity:0;position:absolute;top:50%;transform:translate(-50%,-50%);transition:width .2s ease-out,height .2s ease-out,opacity .2s ease-out;width:0}.rcb-attach-button-enabled:hover:after{height:130%;opacity:1;width:130%}.rcb-attach-icon-disabled,.rcb-attach-icon-enabled{background-repeat:no-repeat;background-size:cover;display:inline-block;height:24px;margin-top:2px;transition:background-image .3s ease;width:24px}.rcb-attach-icon-enabled{cursor:pointer}.rcb-emoji-button-disabled,.rcb-emoji-button-enabled{background-size:cover;border-radius:6px;cursor:pointer;display:inline-block;height:30px;position:relative;text-align:center;width:30px}.rcb-emoji-icon-disabled,.rcb-emoji-icon-enabled{background-repeat:no-repeat;background-size:cover;display:inline-block;font-size:20px;height:24px;margin-top:2px;position:relative;width:24px}.rcb-emoji-icon-enabled{cursor:pointer}.rcb-emoji-icon-disabled{opacity:.5}.rcb-emoji-button-enabled:after{background-color:#0000001a;border-radius:50%;content:"";height:0;left:50%;opacity:0;position:absolute;top:50%;transform:translate(-50%,-50%);transition:width .2s ease-out,height .2s ease-out,opacity .2s ease-out;width:0}.rcb-emoji-button-enabled:hover:after{height:130%;opacity:1;width:130%}.rcb-emoji-button-popup{background-color:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 2px 4px #0003;max-height:200px;overflow-y:auto;padding:8px;position:absolute;transform:translateY(calc(-100% - 30px));width:158px}.rcb-emoji{cursor:pointer;font-size:24px;padding:3px;transition:transform .2s ease-in-out}.rcb-emoji:hover{transform:scale(1.2)}.rcb-audio-icon{background-size:cover;border:none;cursor:pointer;display:inline-block;height:30px;margin-left:5px;position:relative;width:30px}.rcb-audio-icon:after{background-color:#0000001a;border-radius:50%;content:"";height:0;left:50%;opacity:0;position:absolute;top:50%;transform:translate(-50%,-50%);transition:width .2s ease-out,height .2s ease-out,opacity .2s ease-out;width:0}.rcb-audio-icon:hover:after{height:130%;opacity:1;width:130%}.rcb-close-chat-icon{background-size:cover;border:none;cursor:pointer;display:inline-block;height:30px;margin-left:5px;position:relative;width:30px}.rcb-close-chat-icon:after{background-color:#0000001a;border-radius:50%;content:"";height:0;left:50%;opacity:0;position:absolute;top:50%;transform:translate(-50%,-50%);transition:width .2s ease-out,height .2s ease-out,opacity .2s ease-out;width:0}.rcb-close-chat-icon:hover:after{height:130%;opacity:1;width:130%}.rcb-notification-icon{background-size:cover;border:none;cursor:pointer;display:inline-block;height:30px;margin-left:5px;position:relative;width:30px}.rcb-notification-icon:after{background-color:#0000001a;border-radius:50%;content:"";height:0;left:50%;opacity:0;position:absolute;top:50%;transform:translate(-50%,-50%);transition:width .2s ease-out,height .2s ease-out,opacity .2s ease-out;width:0}.rcb-notification-icon:hover:after{height:130%;opacity:1;width:130%}.rcb-voice-button-disabled,.rcb-voice-button-enabled{align-items:center;background-color:#fff;border-radius:4px;box-shadow:0 0 3px #0000004d;cursor:pointer;display:inline-flex;height:32px;justify-content:center;margin-left:8px;text-transform:uppercase;transition:all .3s ease;width:32px}.rcb-voice-button-enabled{border:1px solid red;box-shadow:0 0 3px #ff000080}.rcb-voice-button-enabled:hover{border:1px solid #3d0000}.rcb-voice-button-disabled{border:1px;border-color:#0003;border-style:solid}.rcb-voice-button-disabled:hover{box-shadow:0 0 3px #8a0000}.rcb-voice-icon{background-position:50%;background-repeat:no-repeat;background-size:cover;background-size:contain;height:60%;object-fit:cover;width:60%}.rcb-voice-icon.on{animation:rcb-animation-ping 1s infinite}.rcb-send-button{border:none;border-radius:4px;box-shadow:0 0 3px #0000004d;cursor:pointer;display:inline-flex;height:32px;justify-content:center;margin-left:8px;text-transform:uppercase;transition:background-color .3s ease;width:51px}.rcb-send-icon{background-position:50%;background-repeat:no-repeat;background-size:cover;background-size:contain;height:50%;object-fit:cover;transform:translateY(20%);width:50%}.rcb-view-history-container{align-items:center;display:flex;justify-content:center;max-height:45px;min-height:35px;padding-bottom:5px;padding-top:10px}.rcb-view-history-button{align-items:center;background-color:#fff;border:.5px solid #adadad;border-radius:20px;color:#adadad;cursor:pointer;display:inline-flex;font-size:12px;justify-content:center;max-width:60%;padding:6px 12px;transition:color .3s ease,border-color .3s ease}.rcb-view-history-button>p{margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rcb-chatbot-global{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;line-height:1.5;z-index:9999}.rcb-chat-window{background-color:#fff;border-radius:10px;bottom:20px;box-shadow:0 2px 4px #0003;display:flex;flex-direction:column;height:550px;overflow:hidden;position:fixed;right:20px;transition:all .3s ease;width:375px}.rcb-window-embedded .rcb-chat-window{bottom:auto;opacity:1;position:relative;right:auto;visibility:visible}.rcb-window-open .rcb-chat-window{animation:rcb-animation-expand .3s ease-in-out forwards;opacity:1;visibility:visible}.rcb-window-close .rcb-chat-window{animation:rcb-animation-collapse .3s ease-in-out forwards;opacity:0;visibility:hidden}@keyframes rcb-animation-expand{0%{opacity:0;transform:translate(100%,100%) scale(0)}to{opacity:1;transform:translate(0) scale(1)}}@keyframes rcb-animation-collapse{0%{opacity:1;transform:translate(0) scale(1)}to{opacity:0;transform:translate(100%,100%) scale(0)}}@keyframes rcb-animation-ping{0%{filter:brightness(100%);opacity:1}50%{filter:brightness(50%);opacity:.8}}@keyframes rcb-animation-bot-message-entry{0%{opacity:0;transform:translate(-100%,50%) scale(0)}to{opacity:1;transform:translate(0) scale(1)}}@keyframes rcb-animation-user-message-entry{0%{opacity:0;transform:translate(100%,50%) scale(0)}to{opacity:1;transform:translate(0) scale(1)}}@keyframes rcb-animation-bot-typing{0%{opacity:.4}50%{opacity:1}to{opacity:.4}}@keyframes rcb-animation-pop-in{0%{opacity:0;transform:scale(.8)}70%{opacity:1;transform:scale(1.1)}to{transform:scale(1)}}@keyframes rcb-animations-checkboxes-entry{0%{opacity:0;transform:translate(-100%)}to{opacity:1;transform:translate(0)}}@keyframes rcb-animation-options-entry{0%{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}@keyframes rcb-animation-tooltip-in{0%{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}@keyframes rcb-animation-tooltip-out{0%{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-5px)}}@keyframes rcb-animation-spin{0%{transform:rotate(0)}to{transform:rotate(1turn)}}', { insertAt: "top" });
const de = { AUDIO_BUTTON: "audio-button", NOTIFICATION_BUTTON: "notification-button", CLOSE_CHAT_BUTTON: "close-chat-button", SEND_MESSAGE_BUTTON: "send-button", VOICE_MESSAGE_BUTTON: "voice-button", FILE_ATTACHMENT_BUTTON: "file-attachment-button", EMOJI_PICKER_BUTTON: "emoji-button" }, zr = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xml:space='preserve'%20viewBox='0%200%201000%201000'%3e%3crect%20width='100%25'%20height='100%25'%20fill='%23fff'/%3e%3cg%3e%3crect%20width='45'%20height='30'%20x='-22.5'%20y='-15'%20rx='1.5'%20ry='1.5'%20style='stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%2337547a;fill-rule:nonzero;opacity:1'%20transform='rotate(90%20-99%20362)%20scale(3.4003)'/%3e%3cpath%20d='M0%2075q14%200%2014%2017%200%2016-14%2016Z'%20style='stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%2398b0ca;fill-rule:nonzero;opacity:1'%20transform='rotate(180%20106%20386)%20scale(3.4003)'/%3e%3crect%20width='25'%20height='4'%20x='-12.5'%20y='-2'%20rx='.2'%20ry='.2'%20style='stroke:%2346648c;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%2346648c;fill-rule:nonzero;opacity:1'%20transform='rotate(90%20-46%20282)%20scale(3.4003)'/%3e%3cpath%20d='M19%2065h4l5%204v1H14v-1Z'%20style='stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%2346648c;fill-rule:nonzero;opacity:1'%20transform='translate(165%20150)%20scale(3.4003)'/%3e%3crect%20width='25'%20height='2'%20x='-12.5'%20y='-1'%20rx='.1'%20ry='.1'%20style='stroke:%2398b0ca;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%2398b0ca;fill-rule:nonzero;opacity:1'%20transform='rotate(90%20-3%20240)%20scale(3.4003)'/%3e%3ccircle%20r='7.5'%20style='stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%23a478fc;fill-rule:nonzero;opacity:1'%20transform='translate(236%20175)%20scale(3.4003)'/%3e%3crect%20width='45'%20height='30'%20x='-22.5'%20y='-15'%20rx='1.5'%20ry='1.5'%20style='stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%2337547a;fill-rule:nonzero;opacity:1'%20transform='rotate(90%20139%20600)%20scale(3.4003)'/%3e%3cpath%20d='M184%2075q14%200%2014%2017%200%2016-14%2016Z'%20style='stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%2398b0ca;fill-rule:nonzero;opacity:1'%20transform='translate(165%20150)%20scale(3.4003)'/%3e%3crect%20width='25'%20height='4'%20x='-12.5'%20y='-2'%20rx='.2'%20ry='.2'%20style='stroke:%2346648c;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%2346648c;fill-rule:nonzero;opacity:1'%20transform='rotate(90%20219%20548)%20scale(3.4003)'/%3e%3cpath%20d='M175%2065h4l5%204v1h-14v-1Z'%20style='stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%2346648c;fill-rule:nonzero;opacity:1'%20transform='translate(165%20150)%20scale(3.4003)'/%3e%3crect%20width='25'%20height='2'%20x='-12.5'%20y='-1'%20rx='.1'%20ry='.1'%20style='stroke:%2398b0ca;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%2398b0ca;fill-rule:nonzero;opacity:1'%20transform='rotate(90%20262%20505)%20scale(3.4003)'/%3e%3ccircle%20r='7.5'%20style='stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%23a478fc;fill-rule:nonzero;opacity:1'%20transform='translate(767%20175)%20scale(3.4003)'/%3e%3crect%20width='116.7'%20height='70'%20x='-58.4'%20y='-35'%20rx='31.5'%20ry='31.5'%20style='stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%2371c9fc;fill-rule:nonzero;opacity:1'%20transform='translate(502%20877)%20scale(3.4003)'/%3e%3crect%20width='60'%20height='20'%20x='-30'%20y='-10'%20rx='3'%20ry='3'%20style='stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%2337547a;fill-rule:nonzero;opacity:1'%20transform='translate(502%20728)%20scale(3.4003)'/%3e%3ccircle%20r='75'%20style='stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%2371c9fc;fill-rule:nonzero;opacity:1'%20transform='translate(502%20473)%20scale(3.4003)'/%3e%3crect%20width='129.4'%20height='82.3'%20x='-64.7'%20y='-41.1'%20rx='37'%20ry='37'%20style='stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%23fff;fill-rule:nonzero;opacity:1'%20transform='translate(502%20464)%20scale(3.4003)'/%3e%3crect%20width='108'%20height='68.6'%20x='-54'%20y='-34.3'%20rx='30.9'%20ry='30.9'%20style='stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%23162334;fill-rule:nonzero;opacity:1'%20transform='translate(502%20464)%20scale(3.4003)'/%3e%3ccircle%20r='19.4'%20style='stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%23a478fc;fill-rule:nonzero;opacity:1'%20transform='translate(415%20464)%20scale(3.4003)'/%3e%3ccircle%20r='19.4'%20style='stroke:none;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%23a478fc;fill-rule:nonzero;opacity:1'%20transform='translate(591%20464)%20scale(3.4003)'/%3e%3crect%20width='96'%20height='53.2'%20x='-48'%20y='-26.6'%20rx='23.9'%20ry='23.9'%20style='stroke:%23162334;stroke-width:1;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:4;is-custom-font:none;font-file-url:none;fill:%23162334;fill-rule:nonzero;opacity:1'%20transform='translate(503%20875)%20scale(3.4003)'/%3e%3cpath%20stroke-linecap='round'%20d='m68%20215%207-15M81%20222l-7-22M81%20222l7-14M101%20208H87M114%20219l-7-24M113%20219l13-22M131%20214l-5-17M148%20214h-18M69%20214H51M100%20209l7-15'%20style='stroke:%23a478fc;stroke-width:3;stroke-dasharray:none;stroke-linecap:butt;stroke-dashoffset:0;stroke-linejoin:miter;stroke-miterlimit:10;is-custom-font:none;font-file-url:none;fill:none;fill-rule:nonzero;opacity:1'%20transform='translate(165%20150)%20scale(3.4003)'/%3e%3c/g%3e%3c/svg%3e", jr = Me((e, t) => ne("svg", { viewBox: "0 0 637 637", ref: t, ...e }, ne("path", { d: "m478 113-13 2-4 1h4l14-2c10-2 35-2 42-1l6 3 3 1c3 0-4-3-8-5-7-1-34-1-44 1m56 6 8 6c7 5 20 17 20 19s7 12 8 12l-3-6-4-6c0-3-15-17-25-24-5-3-8-4-4-1m-198 16-9 1a512 512 0 0 1 9-1m-180 30a412 412 0 0 0-23 4 167 167 0 0 0-32 8 439 439 0 0 1 46-9 304 304 0 0 1 11-2l6-1h-8m369 8 4 3-7-6c-1 0 0 2 3 3m-439 9c-7 3-18 13-18 15l6-5c5-5 9-8 14-10l6-4-8 4m442 12-10 11-7 6 7-6c7-5 14-14 13-16l-3 5M65 205l-1 11c0 9 0 10 4 17 5 10 7 12 22 11 10 0 15 0 38-5l5-1-6 1-16 2-21 2c-13 1-16-1-21-10-3-5-4-6-4-15l1-12c1-4 1-5-1-1m335 1c3 0 3 1 3 3l-2 6c-2 5-35 39-76 80-53 51-120 117-138 137-21 24-22 25-22 27 0 3 6 9 9 9 4 0 14-8 38-27a5073 5073 0 0 1 15-16 1421 1421 0 0 0-17 15l-31 25-6 2-4-3c-3-3-3-4-2-6 3-8 79-85 160-163 57-57 79-80 79-86 0-2-3-4-7-4-2 0-2 0 1 1m165 18c-9 17-25 32-57 53l-10 8 16-11 12-8c15-10 27-22 39-39 5-7 6-8 4-8l-4 5m-221 2a199 199 0 0 0-19 10 183 183 0 0 1 27-12c0-1-1-1-8 2m-34 16c-3 3-2 3 2 0l1-2-3 2m151 3-1 2 2-2c3-3 2-3-1 0m-16 12-11 10a281 281 0 0 0 11-10m-24 18-7 5-7 5-42 31c-10 7-24 19-22 19l7-6 16-12a343 343 0 0 0 35-25 573 573 0 0 0 20-17m-187 0-2 2 4-2 3-2-5 2m-14 6-3 2 4-1 4-3-5 2m-7 3-8 4-18 8 18-7 7-3 3-1c1-2 0-2-2-1m254 24a2672 2672 0 0 1-71 54 601 601 0 0 0 39-29 1352 1352 0 0 1 32-25m-291-8-2 2 4-2 3-2-5 2m-13 5-2 2h3c5-3 4-4-1-2m-19 9-7 3-13 6c-10 5-13 7-14 10-3 4-2 5 1 0 2-3 5-5 14-9l13-6 12-6-6 2m178 36c-17 12-21 16-21 17a390 390 0 0 1 20-17m-206 34 1 4 1 3 1 5 2 8 1 5v-6l-1-8-2-5-1-4-1-2c-1-2-1-2-1 0m222 23-9 7a683 683 0 0 0-56 44 261 261 0 0 0-26 20 1345 1345 0 0 0-46 34c-6 3-7 3-19 3-11 0-12 0-18-3-8-4-10-8-17-20l-5-10 4 10c5 10 12 18 19 22 4 2 6 2 17 2 13 0 14 0 21-3l26-19 42-33a2183 2183 0 0 0 43-34 643 643 0 0 1 24-20", fill: "#fff", fillRule: "evenodd" }), ne("path", { d: "M478 114a620 620 0 0 1-39 6l-21 3a5481 5481 0 0 0-19 3 870 870 0 0 1-54 8l-1 1-6 1-12 2-13 2a992 992 0 0 0-76 12 400 400 0 0 1-45 8l-6 1-5 1h-3l-3 1-2 1-26 4-13 2-17 3c-23 5-33 9-43 19-7 8-9 13-9 27 0 8 1 9 4 14 5 9 8 11 21 10l21-2a1133 1133 0 0 1 23-4 659 659 0 0 0 74-14l3-1h3l3-1h3l2-1 2-1h3l2-1h2l24-5 38-7a2100 2100 0 0 1 93-18l3-1 10-1a2082 2082 0 0 1 120-17l2 1c2 0 8 5 8 7l1 2 1 6c0 4 0 6-3 10-2 4-16 16-18 16l-7 5-10 8a1070 1070 0 0 0-11 7 113 113 0 0 1-20 14l-2 2-3 2-2 2h-1a154 154 0 0 1-28 21l-5 4-5 4a573 573 0 0 1-50 37 175 175 0 0 0-24 18l-1 2-2 1-2 1-2 1-1 1-12 10a396 396 0 0 0-32 25l-8 6-6 5-9 7a326 326 0 0 1-25 20l-13 12a5073 5073 0 0 0-17 15c-24 20-34 27-39 27-2 0-8-6-8-9 0-2 1-3 22-27 18-20 85-86 138-137 41-41 74-75 76-80l2-6c0-2 0-3-2-3l-7 1a233 233 0 0 1-26 9l-1 1-1 1h-1l-1 1h-2l-3 2-1 1h-2l-3 2h-1l-5 2-22 10-9 4-4 2-5 2-10 4-2 1-2 1-2 1-13 6a334 334 0 0 1-38 17 75 75 0 0 0-14 6l-5 2-4 1-2 1-3 2-7 3-16 6a247 247 0 0 0-32 14l-1 1h-2l-1 1h-2l-1 1-12 6a103 103 0 0 0-27 15l-2 5-1 1v11l1 5 1 5 1 4c0 3 0 4 2 4v3l1 3 1 2 2 10 1 4 1 5 2 10 2 8 1 4 1 4c3 3 9 25 11 38l1 7v2l1 4v1l1 1v2l1 2 1 3v1l5 10c7 13 9 16 17 20 6 3 7 3 18 3 12 0 13 0 19-3 8-4 11-6 26-18a1345 1345 0 0 1 85-67 683 683 0 0 1 50-39l12-9a513 513 0 0 1 44-33 201 201 0 0 0 22-17 2270 2270 0 0 0 73-54 158 158 0 0 0 58-59c2 0 3-9 4-27l-1-19-1-4-1-6-1-3-4-6-4-6c0-2-6-8-13-14a77 77 0 0 0-28-18c-6-1-34-1-43 1" }))), Gr = Me((e, t) => ne("svg", { viewBox: "0 -960 960 960", ref: t, ...e }, ne("path", { d: "M765-321q0 117-84 196-83 80-200 80-118 0-200-80t-83-196v-392q0-85 61-144 61-58 146-58 86 0 147 58 61 59 61 144v374q0 54-39 92-39 37-93 37-55 0-93-37-38-38-38-92v-372h110v372q0 9 6 14t15 5q8 0 15-5t7-14v-374q0-39-29-66t-68-27q-40 0-69 27t-29 66v392q0 71 51 119t122 48q71 0 122-48t51-119v-426h111v426Z" }))), fA = Me((e, t) => ne("svg", { viewBox: "0 -960 960 960", ref: t, ...e }, ne("path", { d: "M125-165v-113h77v-273q0-93 55-167 56-75 146-100v-19q0-32 22-55 23-23 55-23t55 23q22 23 22 55v19q90 25 146 99 56 73 56 168v273h77v113H125ZM480-32q-38 0-66-27-27-27-27-66h186q0 39-27 66t-66 27Z" }))), hA = Me((e, t) => ne("svg", { viewBox: "0 -960 960 960", ref: t, ...e }, ne("path", { d: "M137-190v-113h78v-253q0-41 11-79 11-39 35-71l-9 150h10L17-802l74-74L873-92l-74 74-175-172H137Zm609-149L319-769q20-15 41-25t44-16v-28q0-32 22-54t54-22q32 0 55 22t22 54v28q85 23 137 94t52 160v217ZM481-47q-38 0-65-27t-27-65h184q0 38-27 65t-65 27Z" }))), gA = Me((e, t) => ne("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 100 100", ref: t, ...e }, ne("g", { strokeLinecap: "round", strokeWidth: 10 }, ne("path", { d: "m19 19 61 61M80 19 19 80" })))), mA = Me((e, t) => ne("svg", { viewBox: "0 -960 960 960", ref: t, ...e }, ne("path", { d: "M94-136v-255l351-93-351-92v-253l816 346L94-136Z" }))), yA = Me((e, t) => ne("svg", { viewBox: "0 -960 960 960", ref: t, ...e }, ne("path", { d: "M480-372q-61 0-105-43-43-43-43-105v-240q0-61 43-105 43-43 105-43 61 0 105 43 43 44 43 105v240q0 62-43 105t-105 43ZM425-76v-122q-121-16-197-108t-76-214h109q0 91 64 154t155 63q91 0 155-63t64-154h109q0 122-77 214T534-198v122H425Z" }))), vA = Me((e, t) => ne("svg", { viewBox: "0 -960 960 960", ref: t, ...e }, ne("path", { d: "m763-343-80-79q8-20 13-44 5-23 5-54h109q0 49-11 95t-36 82ZM625-482 336-770v-2q3-56 45-96t101-40q62 0 105 43t43 105v249l-1 17q-1 7-4 12ZM427-76v-122q-120-16-196-108-77-92-77-214h109q0 91 64 154t155 63q43 0 80-14 37-15 67-41l78 79q-35 32-78 53t-93 28v122H427Zm362 27L41-796l75-75 748 748-75 74Z" }))), Yr = Me((e, t) => ne("svg", { viewBox: "0 -960 960 960", ref: t, ...e }, ne("path", { d: "M625-511q29 0 50-21t20-50q0-29-20-50-21-20-50-20t-50 20-20 50q0 29 20 50 21 21 50 21Zm-290 0q29 0 50-21t20-49q0-30-20-50t-50-21q-29 0-50 20-20 21-20 50 0 30 20 50 21 21 50 21Zm145 268q75 0 137-43t85-115H258q24 72 85 115 62 43 137 43Zm0 198q-90 0-170-34-79-34-138-93T79-310q-34-80-34-170t34-170q34-79 93-138t138-93q80-34 170-34t170 34q79 34 138 93t93 138q34 80 34 170t-34 170q-34 79-93 138T650-79q-80 34-170 34Zm0-435Zm0 322q134 0 228-94t94-228q0-134-94-228t-228-94q-134 0-228 94t-94 228q0 134 94 228t228 94Z" }))), bA = Me((e, t) => ne("svg", { viewBox: "0 -960 960 960", ref: t, ...e }, ne("path", { d: "M553-64v-108q107-27 173-113 67-87 67-197 0-109-67-195T553-789v-108q152 26 249 144 97 117 97 271 0 155-97 273T553-64ZM61-335v-290h176l236-237v764L237-335H61Zm492 28v-346q51 23 82 70t31 103-31 103q-31 47-82 70Z" }))), wA = Me((e, t) => ne("svg", { viewBox: "0 -960 960 960", ref: t, ...e }, ne("path", { d: "M807-15 700-123q-33 21-71 37-38 15-80 22v-108q20-4 38-12l35-17-153-154v257L234-335H57v-290h144L10-818l74-75L882-90l-75 75Zm37-264-80-79q13-30 19-60 7-31 7-64 0-109-68-195-67-86-173-112v-108q152 26 249 144 98 117 98 271 0 55-14 107-13 51-38 96ZM661-462 549-575v-78q51 23 83 70 31 47 31 103l-1 9-1 9ZM469-655 366-759l103-103v207Z" }))), oi = { general: { primaryColor: "#42b0c5", secondaryColor: "#491d8d", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", showHeader: !0, showFooter: !0, showInputRow: !0, actionDisabledIcon: "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='32'%20height='32'%20viewBox='0%200%2042%2042'%3e%3cpath%20style='fill:none;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke:%23b00000;stroke-opacity:1;stroke-miterlimit:4'%20d='M17%209a8%208%200%200%201-8%208%208%208%200%200%201-8-8%208%208%200%200%201%208-8%208%208%200%200%201%208%208Zm0%200'%20transform='rotate(.086)%20scale(1.77778)'/%3e%3cpath%20style='fill:none;stroke-width:2;stroke-linecap:butt;stroke-linejoin:miter;stroke:%23b00000;stroke-opacity:1;stroke-miterlimit:10'%20d='M14.66%2014.66%203.34%203.34'%20transform='rotate(.086)%20scale(1.77778)'/%3e%3c/svg%3e", embedded: !1, flowStartTrigger: "ON_LOAD" }, tooltip: { mode: "CLOSE", text: "Talk to me! 😊" }, chatButton: { icon: jr }, header: { title: E("div", { style: { cursor: "pointer", margin: 0, fontSize: 20, fontWeight: "bold" }, onClick: () => window.open("https://github.com/tjtanjin/"), children: "Tan Jin" }), showAvatar: !0, avatar: zr, buttons: [de.NOTIFICATION_BUTTON, de.AUDIO_BUTTON, de.CLOSE_CHAT_BUTTON], closeChatIcon: gA }, notification: { disabled: !1, defaultToggledOn: !0, volume: 0.2, icon: fA, iconDisabled: hA, sound: "data:audio/wav;base64,UklGRmaIAABXQVZFZm10IBAAAAABAAIAQB8AAAB9AAAEABAATElTVBoAAABJTkZPSVNGVA4AAABMYXZmNjAuMTYuMTAwAGRhdGEgiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAA//////7/////////AAABAAAAAgABAAEAAQAAAAIAAQABAP//AAD+////AAD+//7////+////AAD//wAA/v8AAAAA/v8AAP//AAAAAAAAAgD////////+////AAABAAEAAgD/////AQABAAAA//8CAP//AAAAAAAA/v8AAAAA//8AAAEA//8EAAAAAAAAAAAA//8BAP//AQABAAEA/////wEA/v///wAAAAACAAAAAAABAAAA//8AAP//AAACAP//////////AAAAAAEAAAAAAAEA//8AAAEAAQADAAIAAgAAAAAA/v///wEAAAAAAAEAAAAAAAEA//8AAAEAAQD//wAA//8AAAEAAAABAAEAAAABAP//AAD//wAAAgAAAP//AQD/////AAAAAP7/AgAAAAIAAAAAAAAAAAABAAAAAQABAP//AAABAP///v8AAP////8AAP//AAD//wAA//8BAP//AAD///7///8BAP7///8AAAIAAgABAAEA/v8AAP//AQADAAEAAAACAAEA/////////v///wEA/v////7/AAD+////AAAAAAAAAgAAAAAAAAD//wEAAAAAAAAAAQABAAIA/v8AAAAA//8AAAEAAAAAAP//AgD//wEA/////wAAAQACAAAAAAAAAP//AQD/////AQAAAAEA/v8AAAEAAQABAAEA///+////AQD//wEAAgD+//7/AAAAAAAAAQAAAAAAAQAAAAAAAAAAAP//AAD//wEAAQD//wAAAQABAP7///8AAP7/AAABAP7/AQABAAEAAAABAAEAAAD+/wIAAAABAAAAAQD/////AQACAP////8AAP//AQD//wEA/v8CAAEAAAAAAAAAAQAAAAIAAQAAAAEAAgD//wEAAAAAAP7///8BAP//AgAAAP///v8CAAAAAgD///////////7/AAACAAEAAgD//wAAAAABAP//AwAAAAMA//8AAAAAAQD+/wAAAAD//wAAAQD//wEA//8BAP7/AAABAAAA//8BAAAA//8AAP//AQADAP3////+////AgD+/////v8BAAEAAQACAAAAAAAAAAAA//8AAP//AAD+/wEA/v8AAP7/AAD//wAAAQACAAAAAQAAAP//AQAAAAAAAAABAAAAAAD+//////8AAAAAAAD//wAAAAABAAEA//8AAAEA//8AAP//AgD+/wAA///+/wAA/v///wAAAQABAAAAAQD//wAA//8AAAEA//8BAAAAAgABAP//AAACAAIAAQABAP//AAAAAAAA//8BAAIAAAABAAAA//8CAAEA/v//////AAAAAAEA////////AQAAAP//AAD//wAAAAAAAP3/AAAAAAEAAAACAAAAAAAAAP//AAD//wAAAAAAAAAAAAAAAP///v///wAAAAABAAAAAAD//wEAAAABAAEAAQD//wAAAAACAAAAAQD+/wAA//8BAAEAAAD+/wAA/////wAAAAABAAAAAAD//////v8AAAAA//8AAAAAAAAAAAIAAAABAAEAAAABAP7/AAD9//////////7///8BAP//AAD///3/AQABAP//AAD//wAAAAABAAAA//8AAP//AAD/////AQABAAEA//8AAAAA//8BAAMA//8AAAAA//8AAP7/AAD//wAAAAAAAP7/AQAAAAAA/v8CAP//AAABAAIAAQABAAAA//8BAAEAAQD///7/AQD//wAAAQABAP//AAD//wEAAAAAAAAAAQAAAAIA//8AAP////8AAP//AQD//////v///wEA/v8AAAIAAgACAAEAAAAAAAEAAAAAAAAAAAAAAAAAAQD//wAA/////wAAAQACAP////8AAAAAAAD//wAAAQD+/wEA//8AAAEAAwD//wEAAQAAAAAAAAABAP////8AAAAAAQAAAAAAAAAAAAEAAQAAAP////////7/AQABAAEAAQD///////8BAAAA//8AAAAAAgABAAEA/v8BAP7///8BAP3/AQABAAIAAAD//wEAAAAAAP//AAABAAIA//8CAAAAAQAAAAEA//8BAAAA/////wAAAAD//wEAAQD//wAAAAAAAP//AAAAAAAAAQABAAAAAQAAAP//AQD//////v8AAAEAAAAAAAAA//8AAAAAAAACAAEAAQAAAP//AAABAAEA/////wAAAgABAAAAAAAAAAEAAAABAP//AQABAP7////+/wEAAAAAAP//AAABAAAAAAABAAEAAAAAAAAA//8BAP///f/+/wEAAQD///7///8AAAAAAQAAAP////8AAAAAAAABAAAAAQD/////AAD//wEA//8AAAIA//8CAAAA//8AAAAAAAD+/wEAAAD+/wAA/////wAA////////AAAAAAAA//8BAAAAAAD//wAAAAD//wEA//8AAP//AQD+/wAAAAAAAP7/AAD+/wEAAQABAP//AAABAAEAAQD//wAA/////wEA//8AAAAAAgAAAAAA//8BAAAAAgAAAAAAAAAAAP7/AQD//wAAAAD+/wAAAAADAAIA/////wAAAQD//wIA//8BAAEA/v8AAAIAAAAAAP3///8AAAAAAAAAAAAAAAABAP///////wAA//8AAAEAAQABAAEAAQABAAAAAQAAAAAAAQABAP7/AQD//wAAAQABAAEA//8BAAAAAgAAAAEAAAABAP//AAD/////AAD//wIA/////wIAAAD///7/AAAAAAAAAAACAP//AAABAP////8AAAAAAAABAAAAAgAAAAAAAQD+/wEA/////wAA/////wAAAAAAAAAA/v//////AAAAAP//AAABAAAAAQAAAAIAAAACAAAA//8AAAAA//8AAP7/AAAAAP//AAACAP//AQABAP//AQABAAAA/////////v8AAP//AQAAAAAA///+/wAAAQD+/wEAAQAAAAEA/////wAAAQD//wAA//8AAAAA/v8BAAEA//8AAP7//v8BAAAAAAAAAAEA//8AAAEA/////wAAAAD//////////wEAAAABAAEA//8CAAEA/f8AAAAA//8BAAAABAABAAEAAQAAAAAAAAAAAP7///8AAAAA/v8BAAAA//8AAAIA//8AAP////8BAP//AAAAAAAAAAD/////AQD///7/////////AQD8////AgABAAIA////////AAD//wAAAAABAAAAAAAAAAEAAgAAAP//AQD//wAAAAAAAP/////+/wAAAAABAAAAAwABAP///////wEAAAADAP//AQACAAAA//8CAAEAAAAAAP///////wIAAAAAAAAAAQAAAAAAAgD//wEAAAABAAAA/v8AAAAAAAAAAAAAAAAAAAEA/v8AAP//AQD//wAA//////7///8AAAAAAAAAAP7/AQD//wAA//8AAAEAAAABAAEAAQD/////AAD//wEAAAD/////AQAAAAEAAAD//wEAAAD/////AgD//wAAAQD//////////wAAAAD//wAAAAABAAAAAAD//wAAAQD///7/AQD//wEAAAD/////AAD//wEA//8AAAEA//8CAAAAAQD//wEAAgAAAAEAAwAAAAAA/v8BAAEAAgD//wEAAAAAAAAAAAD//wEA//8AAAAAAQACAP///////wAAAQABAAEAAAAAAAEAAQD+/wEA/f////////8AAAAA//8AAAEA//8BAAAA/v///wEAAAAAAAEA/////wAAAAAAAP//AAAAAAIAAAABAAAA/////wAAAAD//wAA/v8AAAMAAQD+/wEAAAABAAEA//8BAP//AgAAAAAAAAD//wAA/////wEA/v8CAP3/AAACAP3/AQABAAAAAQACAAEA/v8AAAAA//8BAAAAAgAAAAAAAgACAAEA/v/9/wAAAQABAP7///8AAP//AgD+/////v8CAP////8BAP//AQACAAEAAQABAP//AAD///7/AAABAAEAAgD//wEA//8CAAEAAQABAAEAAAABAAAA/v8AAAEA/v8AAP//AAABAP//AQAAAAEAAgAAAAAA/v///wEAAQAAAAIAAAD/////AgAAAAEA/v8AAP7/AQAAAAAAAQAAAAEAAAACAAEA//8BAP////8AAAIAAAAAAP//AAAAAAIAAAAAAAAAAwABAP///v8BAAAAAAAAAP3/AAABAAEA/v////////////3//v8AAAAAAQABAAIAAAD+/////v8AAAAAAQABAAEAAQAAAP//AAAAAP//AQAAAP//AAABAAAAAAAAAAAA////////AAAAAP//AQD/////AAABAAEA//8CAP7///8AAP7//v8BAAEAAAD+/////////wEAAAAAAAAAAgD//wAAAQAAAP7/AQABAP//AQAAAAAAAAD/////AAACAP////8BAAAAAAD//wAA//8AAAEAAQABAAAAAAABAAAAAQD+/wEA/v8AAAEAAQD/////AAD//wAAAQABAP7//v//////AAACAAAAAAAAAAAAAAACAAAAAQAAAAAA//8BAP//AQD//wAA///+/wIAAQD//wAAAAD//wAA/v8AAP3///8AAAAAAAAAAAAA/f8AAAAA//8CAP7/AAD///7/AAAAAAAAAAD//wEAAAAAAAEAAAAAAAAA//8BAP////8BAP7///8CAAEA//8BAP3///////////8BAAAAAAAAAAEAAgD+//////8BAAMAAQADAAEAAAACAAAAAQD/////AAABAAMAAQAAAP//AQD//wAA//8AAAAA//8CAP7//////wAAAAAAAAIA/v8AAP//AAACAP//AwD//wAA//8AAP//AwD//wEAAQABAAEAAQACAAEAAAD//wAA//8AAAIAAAAAAP///////wAAAQD//wIA//8BAP7/AAD///////8AAAAAAAAAAAEAAAD//wAAAQD//wEA//8BAAAAAAD/////AgABAAIAAAABAAAAAAAAAP//AAAAAAAA//8AAAAAAAD/////AQAAAAAAAQD//wAA///+////AAAAAAEAAgABAAEAAAAAAP//AQAAAAAAAQD+/wAAAAABAAEAAAD/////AQABAP7///8AAAIAAAACAAAA//8AAP//AgACAAAA///+/wAAAAABAAAAAQAAAAEA/v8BAAEA//8CAP//AQD+/////v8AAAAAAAACAP//AAD+/wIA/v8BAAAAAAD/////AAAAAP7///8AAP7//////wEAAAABAAAAAAD//wAAAAAAAAAAAgACAAAAAAABAAAA/f8AAP7/AgAAAAEA//8BAAAAAAD///7/AQD//wAAAAAAAAEAAAAAAAEAAAAAAAAAAQAAAAAA//8AAAAAAAABAP///////wAAAgABAAEA//8AAP//AAACAP//AQABAAEA//8BAAAAAAABAAAA//8AAAEAAAAAAAIA/v8BAP//AQD//wEAAAABAAEAAQACAAEAAAAAAAEAAAABAAAAAAD/////AAABAAEA//8AAAAAAQABAP//AAAAAP//AAD/////AQD//wAAAAABAAEA//8BAAAA//8AAP///f/+/wAA/////wAAAQAAAAIAAAAAAAAAAAD+/wEA/f8CAAAA//8AAAEAAgAAAAMAAAABAAAAAAAAAP//AQAAAAAAAQABAAAAAQAAAP//AAAAAAAA//8AAAAAAAABAAAAAQAAAAAAAAABAAIAAAAAAP7/AQD//wAAAAD+////AAAAAAAAAAABAAAA/////wAA//8AAAAAAAD/////AgD//wAA//8CAP//AQACAAEA/f////////8BAAIAAQABAP//AAD//wAA///+////AAD+/wAAAQD/////AAAAAAAA/////wAAAAABAAAAAQAAAAAA//8AAAIAAAABAP//AQABAAEA//8AAAAAAAADAAEAAAABAP//AgD//wMA//8AAAAAAAD//wAAAAD9/wEA///+/wAA//8BAAEA//8BAAAA//8AAP///v8BAP///////////v8BAAAAAQABAAAAAAAAAAAA//8AAP7/AQAAAAAAAAAAAP7/AQAAAAAAAgABAAEAAAABAAEAAAAAAAAAAAD+/wAAAAD//wEAAAAAAAAAAAAAAP//AgABAAAAAAABAAEAAAD/////AAAAAP//AAABAP////8BAAAAAQABAP7//v/+////AQAAAAAAAQAAAAEAAgAAAAAAAQAAAAEAAAD+/////v8BAP//AAABAP//AQABAAAAAAD//wAA//8CAP//AAAAAAEAAAABAAAAAAAAAP//AAD+////AwAAAAAAAQD//wEAAAACAAEAAAADAAAAAAD/////AAAAAAEAAAABAAAA//8AAAEA//8BAP///v8AAP//AAD//wAAAQABAP//AQAAAAAA/////wEAAQAAAP////8AAAEA//8BAAAAAQAAAP////8AAAAAAQAAAAIAAQAAAAEAAAAAAAEAAAD//wEAAAAAAP////8AAAAA//8BAAEAAAAAAAIA///+/wIA/v8BAAAAAQACAAAAAQAAAP7///8AAP//AAAAAAEAAAAAAP7/AAD+////AAAAAAAAAAD//wAA/v8BAAMAAAABAAIAAgD//wAA//8BAAEA//8BAP7/AAAAAP7///8BAAAAAQAAAP7/AQD/////AAAAAAEAAAABAP//AQABAAAAAgABAAAAAAAAAP///////wEA//8AAAEA//8AAAAAAQAAAAIAAAABAP7//////wAAAQABAAAAAAABAAEA///+/wAA//8BAP///v8AAP///v8BAAAA//8CAAAAAQAAAAEAAQABAAAAAAD+/wAAAAD+/wAAAAAAAAAA/f////////8AAAAAAQABAP///////wEA//8BAAEAAAAAAAAA/////wEA/v//////AAAAAP//AAABAAAAAAD+/wAAAAD9////AQAAAAEAAwD//wEAAQAAAP//AgAAAAAAAAD+/wIAAAAAAAAAAAAAAAIA//8AAAEAAQACAAAAAQD//wAAAAD//wIAAQABAAAAAAD//wEA//8BAAEAAQAAAAAAAQABAP7/AAD//wEAAAACAP7/AQAAAAAAAAD//wIAAQACAAIAAQAAAAAAAAAAAP3///8BAAAAAQACAP//AgD9/wAAAAD//wEA/v////////8AAAAAAAD//wEAAQD//wMAAQAAAAEA//8AAAEA//8AAAAAAAACAAAAAAD//wAAAQD///////8AAAAA//8BAAIA/v8BAAEA/f8AAAAAAAAAAAAAAgD/////AAD+/wAAAAD//wAAAAAAAP//////////AgABAP///v8AAAIAAQAAAP//AAABAAAA/////wAAAAAAAAEAAAABAP///v///wIA//8BAAEAAQAAAAAA///+/wEAAAAAAAAA/////////v8BAP3/AAAAAAAAAAAAAAAA//8AAP//AAAAAP//AAABAAIAAAACAP////8DAAAAAAABAAAAAwABAP//AAABAP//AAAAAP////8BAAAAAgD//wAA///+/wAAAQD//wAA//8AAP7///8AAAAA/v8AAAAAAQD//wEA/v////////8AAAAAAQAAAP//AQACAAAAAAAAAP//AAD//wAAAAD//wAAAAD+/wAAAAAAAP//AQD//wAAAgAAAAAAAQABAAAAAwD+/wAAAAD///7/AQD//wIAAQAAAP//AAD//wAA//8CAAEAAAAAAAAA/////wAAAAD//wEAAQD///////8BAAAA//8BAAEAAAAAAAAA/v///wEAAAAAAAAAAAADAAAAAAAAAAAAAQABAAEAAAD+//7//v8AAP//AQAAAAAAAAABAAEAAgAAAAAAAQD//wAA/f8AAAAAAAABAAAAAQAAAAAAAAAAAAIA//8BAP///////wIA/////wAAAAABAAEA//8BAAAAAAD//wAAAQD//wEAAAAAAAIA/v8BAP//AAAAAAEAAAABAP//AAAAAAAAAQABAP7/AAABAAAAAQD//wIAAAAAAAEA///+/wAA//8AAP//AAAAAAAAAAABAP///////wIAAQAAAAEAAQAAAP7/AQAAAAAAAQAAAAAAAQD/////AQAAAAAA///+//7/AAD+/wEA//8AAAAA///+/wEAAAABAAIAAQABAAAA//8AAP//AAD//wAAAAD//wAAAAAAAP//AQAAAAAA////////AQAAAAAAAQD+////AQABAP7/AAD///7/AgD//wAAAAAAAP//AAAAAAEA//8BAAEAAgAAAAIAAAD//wEA/////wAAAQD///7/AQD//wEAAQD/////AAAAAAEAAgAAAAAAAQD//wEA//8AAP7//////wAA//8BAAEA//8BAAAAAQD/////AAABAP//AAACAP//AQAAAP//AAABAP////8AAAAAAAABAAEAAwABAAAAAgD//wAAAAD//wEAAAABAAAAAAABAAEA/////wAA//8AAAIAAAAAAAEAAQABAAEAAQABAP//AgAAAAAA//8BAP3//v///wAA//8AAAAAAQAAAP//AQD//wEAAAACAAIAAAABAAAA//8BAAEA//8BAP//AAAAAP//AQAAAAIAAAD//wAAAAAAAAEA////////AQAAAP//AQD//wAAAQD+/wEAAAABAP///v///wAAAAAAAP//AAAAAAIAAQD//wAAAgD+/wAAAAD//wAAAAABAP///P//////AAACAP////8AAAIAAAABAAAAAAAAAAAA//8AAAAAAQADAP//AQAAAAAAAAABAAEAAQAAAAAA/v8AAAAAAAD//wAAAQD//wAAAAD//wAA/v////////8CAAEA/v8BAP7/AAAAAAAA//8AAAEAAAD//wIAAQAAAAIAAQAAAAAAAAD///7/AQABAP//AAAAAP//AAACAAEA//8BAAAAAwAAAAAAAAD//wEAAAD//wAA///////////+/wAAAQABAAIAAAABAAEAAAD//wEAAAD/////AAD+/wIAAwABAAEA/v8BAAEAAAD//wAA//8AAP//AAAAAAEAAAAAAP//AAAAAAEAAQABAAEA/v///wAAAAD//wEAAAACAAAA/f/+/wAA/v///wAA//8AAAEAAQD///7/AAAAAAAAAAABAAAAAAACAAAAAAABAAAAAAABAP//AQD//wAA//8BAP7/AgABAAEAAQAAAAAAAQD//wEA/v8AAP////8AAP///////wIAAQD//wAAAAD//wAA/v///wAAAQD//wIA/////wEAAAAAAAIAAAABAAAAAAD//wEA//8AAAAA/////wAAAQAAAAAAAAD//wEAAQAAAAAAAAACAP///////wAAAgD//wAA/v8AAAIAAAAAAAEAAAABAP//AQABAAEAAQAAAP///v8BAAEAAAAAAP////8AAAAAAQD//wIAAQAAAAEAAAAAAAAA//8BAP//AAAAAP7//v///wEAAAAAAAIAAAAAAP//AAD//wEA//8BAAAAAAABAAEAAAABAP7///8AAAIAAAABAP//AAD//wEAAAAAAP//AAAAAAEAAAAAAAAAAAAAAP7/AQD//wAAAQD+/wEA/v8BAP7/AAABAAEAAAACAAIAAAADAAAA//8AAAEAAAABAP//AQD//wIA/////wEA//8AAAEA//8AAAEAAAAAAAAAAQABAAAAAAAAAAAAAAD//////////wAA//8AAP7/AAD+/wAAAQAAAAAA/////wAABAAAAAAA//8AAAEAAAAAAAAA/v8AAP//AAAAAAAAAAD//wAAAAD///////8BAAEAAAD/////AgABAAEA/v/+/wAAAQACAAEAAAD//wAAAwABAP//AgD+/wAA/v8AAAAAAAAAAAEA//8AAAEAAAD+/wEAAAAAAAEAAgAAAAEAAAABAP//AQD+/wIA/////wAAAQD//wAAAQD+/wAAAQABAAAA////////AAACAAAAAQAAAAIA//8BAP///v///wEA//8BAAEAAQD+/wAAAQD9/wAAAQAAAAEAAAABAAAAAgAAAP//AAD+/wAA/f8AAAAA////////AgAAAAcAAQD7/wEA/f8AAAIA//8GAP7//v/+//b/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+P/F//z/rv/i/7r/6v/Z/wYABwAoADAAKQBOABkATAD0/zQA1P8PANv/0//v/6//FwCi/ywAxP8oAPn//v82APT/WwD4/00A+/8yAPv//f/8/83/+v+w/+T/sf/j/9b/AQACACoAIgAtAEIAHwBPAAEAQADe/xcA0v/k/+X/t/8IAKv/IgC//yEA6/8EACMA9/9PAPf/VAD+/zcA+/8JAPn/1P8AALf/6f+w/+P/zf////j/HAAdAC0APgAfAEsABwBCAOP/IADV/+//2v/B//3/rP8PALv/GADd/xEAFgABAEMABABaAP//QgACABcA+//n/wAAwP/w/67/4v+///3/6f8WABcAKQA0ACIARgAQAEcA8f8pANn/9f/U/87/7f+v/wgAtP8RANP/FgANAAIAOQACAFQA/f9HAAAAIAABAO3//P/E/wEAs//q/7n/9P/i/wYAEQAZADEAJABBABMASAAAADEA3/8CANL/1v/g/7H/AACy/w8Axf8ZAPv/CQAzAAIAVQD//1AAAAAsAAIA9v/7/8r/AwC2//P/tf/m/+H/AwADABEAKQApADoAHgBHAAgAPADr/wkA1//f/93/vP/6/7L/CgDA/x4A7/8hACkAAgBPAPz/UgD1/zIABAAEAPz/0v/5/7f/AACy//H/2f/+/wEAAAAkABUAMwAdADoAEQA9APD/EADU//L/1P/H/+z/tf8LALv/HADk/ygAGgADAEMA//9TAPn/QAAAABAAAQDc//z/wf8DALD/7P/Q//z/9/8HABoAFgA3ACMAMAAOADwA+P8ZANv/+P/Y/9H/5v+8/wUAu/8WANf/HgAMAAoAPQABAFMA/f9HAP7/HwAEAN//+v/H/wMAs//2/8r/8//y/wMADgAQAC4AIwAyABMAJwD8/xcA3v8LANP/5v/f/8j/AgC4/w4A1P8eAAQACgAxAAEAUgD+/0gA/v8nAAIA8f/5/8r/BAC6/+3/wP/l/+b/AQAIABkAIwArAC4AIAAoAAkAGADj/w0A0f/r/9//0P8DAL3/CgDN/xkA//8IACUAAgBJAAAATwD+/ysAAQD7//3/z/8DAMT/+f/K/+L/5P/1////EgAcACYALgApAC4ACwAcAPL/EADZ//L/1f/U//f/uv8KAMX/DwDu/wcAHwADAEUABgBNAAEANQAAAAYAAQDf////xf/+/9P/4f/b//X/9v8LAA4AGAAlACoAMAAQABkA9v8TAOL/+f/W/9r/8f/I/wcAxP8MAOr/BwATAAQAOAAGAEcAAABCAAEADwAEAOP//v/F/wIAzf/o/93/8P/s/w4ACwAZACEAKgAyABMAIQD5/xgA6v8DANb/4P/y/9H/AQDJ/wkA4/8DAAoA/f8wAAQAQwABAEAA//8VAAIA7P/+/8r/BADP/+v/2v/s/+n/CwAIAA0AHAAjADQAHAAkAP//GQDy/wQA5v/i//b/0P/7/8f/AADh/wMAAAD+/yUAAAA7AAEAOAAAABwAAAD6/wAA1/8CAMr/AADb/+3/5f8BAAIACAAVABcALwAfACgA+/8XAPn/DgDe/+//7v/Q/wMAz/8JAOP/CwDx////EAAHADEAAQArAAIAHQAEAAcAAADr/wEAzv8CANj//f/k/wEA+f/+/xQABwAqAB4ALAD+/x4A8P8SAOb/8//f/9j//f/N/wEA3v8LAO7/AgAMAAQALAAEAC0AAQAdAAQADwABAPP/BADV/wMA0/8AAOH/AQD1/wAAEAADACQAGwAwAAQAHwD0/xUA8f/4/+L/2//7/8z/AwDc/woA6f8AAAQAAwAoAAcANAAAACcAAgAUAAEA+P8CANv/AgDR/wEA4v8BAOz/AgAIAPv/JAAVADMAFAAhAPP/GQDz//7/3P/l/+3/z/8BANf/CgDn/wkA/P///xoABwAwAAIAJwACABcAAwABAAIA4f8BAND/AgDd//3/6P8CAAYA/f8YAAwALwAZACUA9v8bAPj/AwDq/+r/7P/S//7/1/8EAOX/CQD6//7/GQAFAC8AAQApAAEAGQACAAMAAgDm/wEAzv8BANv//v/p/wIA//8BABMABQArACAALAABAB4A8f8NAOv/7v/m/9n/+P/R/wMA4f8OAPT/AQATAAMAKwAHACoAAwAbAAMABQADAO7/AQDU/wEA2f8AAOL////3////EgAAACUAGgAvAAUAHQD2/xIA9f/0//T/3P/4/8///f/h/wIA7f8AAAoAAQApAAQALQADACAAAgAPAP//9P///9r//f/T/wAA3f/9//D/AQAQAP//HAAHAC8ACQAfAPv/GAD+//f/+P/j/wEA0v/+/9n/AADq/wIABgD//x0AAQAuAAEAIwAAABQAAwD8/wEA3/8AAM//AADe////7f8BAAwA//8ZAAMALwAAACEA//8dAP3//v/9/+n////U//z/1v8BAOT/AAD+/wAAGwD+/ywA/v8kAAIAGAD///3////q/wEA0P///97/AADk/wAABAAAABUAAQAqAAEAKQAAABwAAAAFAP//6f8AANr////X/wAA4/8AAPj/AgAUAAAAKgD//ywAAAAcAP7/AQAAAOv/AADU/wAA2v8CAOP/AAABAAAAFgABABsAAAAqAAEAHwAAABQAAgDv/wEA3v///9H////f////7/8BAAoAAQApAAAALgD//yEAAQAIAAAA8P8BANr//v/V////4f8AAPf//v8UAAAAFAAAACYAAQAhAP7/GwD+//T/AADo/wIA1v8CANr/AgDp/wEABgAAAB8AAQAsAAEAJAAAAAwA///z/wEA3/8AANT/AADh/wEA9P///xQAAgASAAAAJQAAACEAAAAaAP//+v8BAOj////W////2P8BAOf///8DAAAAHwAAAC4AAAAlAAAAEgAAAPL/AQDm////0f8CAN3/AADr//7/EQD//xAAAQAhAAIAJQAAAB8AAAABAP//6v8CAN//AQDX/wAA4/8AAPr/AAAXAAAAKgABACgAAAAbAP///f8AAOj/AADU/wAA2v///+f/AQANAAMAEQD+/xwA/v8kAP7/IQABAAgA/v/p////5/8AANf/AQDd/wEA8v8BABMAAQAjAAAALgAAACAAAQADAAEA7f8BANn/AgDY//7/4P/+/wEAAAAXAAIAFAAFACUA/P8jAP//EgAAAO//AQDo////1/8AAN3/AADx//7/DgAAAB0AAQAoAAAAIwAAAAoAAQDv/wMA4f8AANn/AQDi/wEA+v///xgAAAAQAP3/IwD//yUA/v8XAAAA7/8AAOv/AADc/wAA3P/+/+v/AQALAAEAGgACACkAAAAkAP7/EAABAO/////q//7/1/8AANz/AgDw/wEAEgD//w8AAAAcAAIAJQAAAB0AAAD2////7P8AAOP/AgDa/wAA5P8BAAQAAQAWAAAAIgAAACMAAAAaAP//+P///+v/AQDZ/wAA2////+7/AAARAAAADgAAABYAAAAhAAAAIAABAPz/AQDt/wAA5P8AANr/AQDg/wEA/P8BABcAAAAhAP//KQD//xwAAAD8/wEA7v8AAN3////Z/wAA6f8BAA0AAAARAAEAEQAAACMAAAAgAAEA/f8CAO3/AADv/wAA3v8BANv////1////EgAAABkA//8nAAAAIgAAAAMAAADu/wAA6P8CANn/AQDg////BQD//xMAAQAOAP//IAABACYAAAAGAAAA6f////H/AADg/wEA2f8AAO3///8PAAAAFQACACQAAAAkAAEADQABAO//AADp/wAA2////9z/AQD7/wEAFgAAAAwAAQAXAP7/JQD9/xMAAADx/wAA8f8AAOr/AADc/wEA4/8BAAkAAAAVAAAAIQD//yYA//8UAAEA9P8BAOz/AADf/wAA3P8AAPP/AAAQAAAADQABAA0AAAAlAAEAGAD///H//v/0/wEA7v8CAN//AADg//3/BAACABUAAQAfAAAAJwABABgAAQD0//7/7f///+L/AADa/wIA8P///w4A//8SAAMACQAAACAAAQAgAP//+v////P////y/wEA4/8BANr/AQD9/wAAEwD//xkAAQAjAAAAIgABAPz////s/wAA6v8BANX/AQDr//7/BwABABMAAAAHAP//FwAAACYAAAD//wEA9P8BAPb/AQDu////2v8BAPn/AAATAP//FwD//yEAAAAjAAAAAgAAAOn/AQDr//7/2P8CAOT/AAABAP//FgABAAUAAQATAP//IwAAAAEAAgDy/wEA9/8AAPb/AADb/wAA6/8BABAAAAATAP7/IQAAACYA//8UAP//7/8AAPD/AADd/wEA3P/+//7///8OAAAACgAAAAgAAAAhAP//CQACAPT/AQD2/wAA9v///97////m/wIADgABABMAAQAfAP//JwAAABMAAADw/wAA8P///+r/AQDb/wAA9f8AAA8AAAARAAIABAD//wYA/v8HAAAAAQD//wMAAgAGAAAA7f8AAOz/AAALAP//DwACABQA//8bAAAAHgD///f/AADq/wEA6/8BANj//v/t/wAACAD+/xAAAgAEAAAABAABAAcAAQADAAAA//8AAAUA///1/wAA5f///wIAAAAOAAAAEAAAABsAAAAhAAAA/v8BAOj////y////3f8AAOf/AQAGAAEADAAAAAcA//8BAP//CQABAAMA//8BAP//BQAAAAAAAADo/wAA+/8AAAoAAAALAAAAFAAAACAAAQAGAAIA7f8BAPH/AADm/wMA3P8CAP7/AgASAP//CgD//wAAAAAIAP//BQD//wEAAAACAP7/BAAAAPz/AwD8////BAAAAAEA//8HAAAAHQAAAAgA/v/x//7/8f///+f/AQDg/////P///woAAAAMAP//AAABAAYA//8EAAAAAgAAAAUAAAACAAAAAwAAAAIAAAABAAAAAQABAAAAAgAcAP//DgD///T/AQDx/wAA9P8CAOH/AAD3/wAACQAAAAoAAQABAP//AwAAAAcAAAD+/wAAAgACAAEAAAD+////AwD+/wAAAAABAP//+v8BABEAAQATAAAA9f/+//L//f/z/wIA6f8AAPb/AQAFAP//DAAAAAAAAAAFAP//BQD//wEA//8DAAEAAQAAAP7///8AAAAA//8BAAIAAAD+/wAAEAABABYAAgD6/wEA8v8BAPX/AwDp/wAA8////wMA//8JAAEABAABAAEA//8FAAEA//8AAAMAAQACAP//AQAAAAEAAgAFAP//AQABAAAAAQAAAP//EQABAAAAAAD5/wEA+P8AAPr////6/wAA+/8BAAIA//8BAAAA//8CAAUA//8BAP7/AAABAAEAAgAAAAAAAwAAAAEA/v8DAAIAAAACAAQA//8TAAAA/P8BAPr////3//////8AAPz/AQD7/wEAAgD/////AAABAAEABAAAAP//////////AAAAAAAAAAADAAAAAwAAAAAA//8EAP///v/+/xAA//8HAAAA+/////j/AQD8////AAD///n///8AAAAA//8AAP////8DAP//AgAAAAAAAAACAAIAAAD+/wAAAQD//wAA/////wIAAgD9////CQACAAYA///9////+f8BAPr/AQAAAAIA/v///wAA//8AAAAAAAAAAAEAAAABAAAAAgAAAAEAAAAAAAEAAQABAAAAAgABAP//AAD//wEAAAD///////8BAAIAAQAAAAAA/v/+//////8BAAAAAQABAP//AAD///////8BAAAAAQABAP////8CAAEAAQD//wEA/v//////AQAAAAAAAAAAAAAAAAD9/wMA/////wAAAQD+/wEA/v/+//7/AQD//wMAAAAAAAAAAAABAAEA//////7/AAACAP3/AAD//wAAAQAAAP//AQD//wAAAAAAAAEA//8CAP//AAAAAAAA/v8AAAAA//8BAP//AAABAP//AAAAAP//AQD//wAAAQABAAAAAAABAAEA/v///wAAAAD//////////wAAAAAAAP//AAD////////8/wIAAAADAAEA/////wEA/v8BAP7/AgAAAAEAAgAAAP//AgD/////AQD//wEA//////7/AQD//wMAAAAAAAAA//8CAP//AQAAAP//AAACAAAAAAABAP//AQD+/wAA/////wAA/f///wAAAAAAAP7/AAAAAAAAAgD//wEAAQACAP//AAAAAAEAAQD//wAAAAAAAAAA//8BAAMA/v8AAP7/AQAAAAAAAQAAAAAA///+//7/AAAAAAAA//8BAP7/AQAAAP//AQABAAAAAQAAAP//AAD//wIA/v///wAAAQABAP//AAD//wEA//8BAP//AgAAAP///////wAAAQABAP//AwABAAAAAAAAAAAA/////wIAAwACAAAA/v8BAAAAAAAAAAAA//8AAP////8AAAAA/////wAA/////wEA/v8CAAEAAQD//wAAAAABAAAAAAD//wEAAQABAAAA//8CAAAAAAAAAP7/AAABAAAAAQABAAAAAgABAAAAAQD//wEAAwD+/wAA/v8AAAEAAAAAAAAAAAAAAAEAAAD//wMA/v///wAAAAACAAEAAAAAAP7///8DAAEAAQD//wEA/f8BAAEAAQD//wEAAQABAAMAAgAAAAEA//8AAP//BAAAAAIA/v//////AQABAAAAAAD//wEAAAACAAIAAQAAAAAAAgAAAAAAAAABAAIAAAABAAIAAQAAAP////8AAAAAAAD//wAAAQACAP//AAAAAAAAAQAAAAEA//8AAAAAAAD/////AQD//wAAAQD9////AQAAAAAA//8BAAAA///+/////v8BAAAAAQAAAAAAAAAAAAIA//8BAAAAAAACAP//AQD//wAAAAD/////AAD9/wAAAAACAAAAAgAAAAEAAQABAAEAAAAAAAEA//8AAAEAAQACAAAAAQAAAAEA//8BAAIAAAACAP//AAABAAAAAAAAAAAAAAD//wAAAQD/////AAAAAP////8AAAEAAAAAAP7///8BAAIAAQD//wEAAQAAAP//AgAAAAAAAAD//wAA//8CAP7/AQAAAP7/AAD+////AAAAAAAAAQABAAAA//8AAAEAAAABAP7/AAAAAP7/AAD+/wAAAQABAAEA/////////v8BAP///v///wIAAAAAAAAAAQAAAAIAAQAAAAAAAAABAAEAAAAAAAAAAAD//wEAAQD//wAAAQABAAAA/v/+/////////wAAAAD//wAAAAD/////AAAAAP7/AAD//wIA//8CAP//AQAAAP////8AAAAAAQABAP////8AAP//AQACAAAAAQAAAAAAAAAAAAAA//8BAAAAAAD+/wAA/v///wEAAAD+//7///8CAP7/AAABAP3/AwAAAAAAAAABAAIAAAABAAAAAQABAAIAAAAAAP//AAAAAAEAAAACAAEAAAACAAAAAAABAAAAAwAAAAAAAAD+/wAAAQD9//////8BAAAA/v8AAAAAAAAAAAAAAAD//wMA/v8BAAEAAQACAAAA/v8BAP//AwABAAIAAQABAP//AQAAAAEAAAAAAAEA//8AAAAAAAD/////AAABAAEAAAAAAP////8AAAAAAAAAAAAA/v8AAP//AQAAAP//AAABAAIAAQAAAAAAAgABAAAA/////wAAAQABAP//AQABAAEA/////wAAAAAAAAAAAAABAAEAAQAAAAAAAAAAAAAA//8AAP7/AQD9/wAAAgD//wEAAQABAAEA/v8AAAEA/////wAAAAAAAP//AAABAAAAAAAAAAAA//8CAP//AAABAAEAAQABAAAA//8BAAIAAgD//wAA/v8AAAEAAAD///7/AAAAAAEAAAABAAAAAQABAAAAAQACAAAA///+/wAAAQABAP7////+/wAA//8AAAAAAgAAAP//AQD9/wAAAAD//wAA//8AAAAAAQAAAAAAAQD//wAAAAAAAP//AQABAAAA/v8CAP//AAD///////8AAAAAAAACAAEA//8BAP7/AAAAAAEA//8BAAAAAQD//wAAAQD+/wAA/////wAAAAD//wAAAQABAAAA//8AAAEA/////wAA//8AAAAA/v/+/wEAAgABAP//AgD//wIA/////wAA//8AAAEAAQAAAAAAAQAAAAMAAAACAP//", showCount: !0 }, audio: { disabled: !0, defaultToggledOn: !1, language: "en-US", voiceNames: ["Microsoft David - English (United States)", "Alex (English - United States)"], rate: 1, volume: 1, icon: bA, iconDisabled: wA }, chatHistory: { disabled: !1, maxEntries: 30, storageKey: "rcb-history", storageType: "LOCAL_STORAGE", viewChatHistoryButtonText: "Load Chat History ⟳", chatHistoryLineBreakText: "----- Previous Chat History -----", autoLoad: !1 }, chatInput: { disabled: !1, allowNewline: !1, enabledPlaceholderText: "Type your message...", disabledPlaceholderText: "", showCharacterCount: !1, characterLimit: -1, botDelay: 1e3, sendButtonIcon: mA, blockSpam: !0, sendOptionOutput: !0, sendCheckboxOutput: !0, buttons: [de.VOICE_MESSAGE_BUTTON, de.SEND_MESSAGE_BUTTON] }, chatWindow: { showScrollbar: !1, showTypingIndicator: !0, autoJumpToBottom: !1, showMessagePrompt: !0, messagePromptText: "New Messages ↓", messagePromptOffset: 30, defaultOpen: !1 }, sensitiveInput: { maskInTextArea: !0, maskInUserBubble: !0, asterisksCount: 10, hideInUserBubble: !1 }, userBubble: { animate: !0, showAvatar: !1, avatar: "data:image/svg+xml,%3csvg%20width='140'%20height='140'%20xmlns='http://www.w3.org/2000/svg'%3e%3ccircle%20cy='60.044'%20cx='70'%20fill='%235c5c5c'%20r='29'/%3e%3cpath%20d='m16.36%20156.186-.01-30.5c-.005-16.844%2024.168-30.507%2053.991-30.516%2029.823-.009%2054.004%2013.64%2054.01%2030.484l.008%2030.5-108%20.032z'%20fill='%235c5c5c'/%3e%3c/svg%3e", simulateStream: !1, streamSpeed: 30 }, botBubble: { animate: !0, showAvatar: !1, avatar: zr, simulateStream: !1, streamSpeed: 30 }, voice: { disabled: !0, defaultToggledOn: !1, language: "en-US", timeoutPeriod: 1e4, autoSendDisabled: !1, autoSendPeriod: 1e3, sendAsAudio: !1, icon: yA, iconDisabled: vA }, footer: { text: E("div", { style: { cursor: "pointer", display: "flex", flexDirection: "row", alignItems: "center", columnGap: 3 }, onClick: () => window.open("https://react-chatbotify.com"), children: [E("span", { children: "Powered By " }, 0), E("div", { style: { borderRadius: "50%", width: 14, height: 14, display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(to right, #42b0c5, #491d8d)" }, children: E(jr, { style: { width: "80%", height: "80%", fill: "#fff" } }) }, 1), E("span", { style: { fontWeight: "bold" }, children: " React ChatBotify" }, 2)] }), buttons: [de.FILE_ATTACHMENT_BUTTON, de.EMOJI_PICKER_BUTTON] }, fileAttachment: { disabled: !1, multiple: !0, accept: ".png", icon: Gr, iconDisabled: Gr, sendFileName: !0, showMediaDisplay: !1 }, emoji: { disabled: !1, icon: Yr, iconDisabled: Yr, list: ["😀", "😃", "😄", "😅", "😊", "😌", "😇", "🙃", "🤣", "😍", "🥰", "🥳", "🎉", "🎈", "🚀", "⭐️"] }, toast: { maxCount: 3, forbidOnMax: !1, dismissOnClick: !0 }, event: { rcbPreInjectMessage: !1, rcbPostInjectMessage: !1, rcbStartSimulateStreamMessage: !1, rcbStopSimulateStreamMessage: !1, rcbStartStreamMessage: !1, rcbChunkStreamMessage: !1, rcbStopStreamMessage: !1, rcbRemoveMessage: !1, rcbLoadChatHistory: !1, rcbToggleChatWindow: !1, rcbStartSpeakAudio: !1, rcbToggleAudio: !1, rcbToggleNotifications: !1, rcbToggleVoice: !1, rcbChangePath: !1, rcbShowToast: !1, rcbDismissToast: !1, rcbUserSubmitText: !1, rcbUserUploadFile: !1, rcbTextAreaChangeValue: !1, rcbPreLoadChatBot: !1, rcbPostLoadChatBot: !1, rcbPreProcessBlock: !1, rcbPostProcessBlock: !1 }, ariaLabel: { chatButton: "open chat", audioButton: "toggle audio", closeChatButton: "close chat", emojiButton: "emoji picker", fileAttachmentButton: "upload file", notificationButton: "toggle notifications", sendButton: "send message", voiceButton: "toggle voice", inputTextArea: "input text area" }, device: { desktopEnabled: !0, mobileEnabled: !0, applyMobileOptimizations: !0 } }, ii = qe({ settings: {}, setSettings: () => null }), $ = () => He(ii), xA = ({ children: e, settings: t = oi, setSettings: n }) => E(ii.Provider, { value: { settings: t, setSettings: n }, children: e }), ai = { tooltipStyle: {}, notificationBadgeStyle: {}, chatWindowStyle: {}, headerStyle: {}, bodyStyle: {}, chatInputContainerStyle: {}, chatInputAreaStyle: {}, chatInputAreaFocusedStyle: {}, chatInputAreaDisabledStyle: {}, userBubbleStyle: {}, botBubbleStyle: {}, botOptionStyle: {}, botOptionHoveredStyle: {}, botCheckboxRowStyle: {}, botCheckboxNextStyle: {}, botCheckMarkStyle: {}, botCheckMarkSelectedStyle: {}, characterLimitStyle: {}, characterLimitReachedStyle: {}, chatHistoryLineBreakStyle: {}, chatMessagePromptStyle: {}, chatMessagePromptHoveredStyle: {}, footerStyle: {}, loadingSpinnerStyle: {}, mediaDisplayContainerStyle: {}, chatButtonStyle: {}, chatHistoryButtonStyle: {}, chatHistoryButtonHoveredStyle: {}, sendButtonStyle: {}, sendButtonHoveredStyle: {}, sendButtonDisabledStyle: {}, audioButtonStyle: {}, audioButtonDisabledStyle: {}, closeChatButtonStyle: {}, emojiButtonStyle: {}, emojiButtonDisabledStyle: {}, fileAttachmentButtonStyle: {}, fileAttachmentButtonDisabledStyle: {}, notificationButtonStyle: {}, notificationButtonDisabledStyle: {}, voiceButtonStyle: {}, voiceButtonDisabledStyle: {}, chatIconStyle: {}, audioIconStyle: {}, audioIconDisabledStyle: {}, closeChatIconStyle: {}, emojiIconStyle: {}, emojiIconDisabledStyle: {}, fileAttachmentIconStyle: {}, fileAttachmentIconDisabledStyle: {}, notificationIconStyle: {}, notificationIconDisabledStyle: {}, voiceIconStyle: {}, voiceIconDisabledStyle: {}, sendIconStyle: {}, sendIconDisabledStyle: {}, sendIconHoveredStyle: {}, rcbTypingIndicatorContainerStyle: {}, rcbTypingIndicatorDotStyle: {}, toastPromptContainerStyle: {}, toastPromptStyle: {}, toastPromptHoveredStyle: {} }, Ai = qe({ styles: {}, setStyles: () => null }), ae = () => He(Ai), EA = ({ children: e, styles: t = ai, setStyles: n }) => E(Ai.Provider, { value: { styles: t, setStyles: n }, children: e }), kA = ({ buttons: e }) => {
  var t, n, r, o, i;
  const { settings: a } = $(), { styles: A } = ae(), s = { backgroundImage: `linear-gradient(to right, ${(t = a.general) == null ? void 0 : t.secondaryColor},
			${(n = a.general) == null ? void 0 : n.primaryColor})`, ...A.headerStyle };
  return E("div", { style: s, className: "rcb-chat-header-container", children: [E("div", { className: "rcb-chat-header", children: [((r = a.header) == null ? void 0 : r.showAvatar) && E("div", { style: { backgroundImage: `url("${(o = a.header) == null ? void 0 : o.avatar}")` }, className: "rcb-bot-avatar" }), (i = a.header) == null ? void 0 : i.title] }), E("div", { className: "rcb-chat-header", children: e == null ? void 0 : e.map((d, u) => E(oe, { children: d }, u)) })] });
}, si = qe({}), me = () => He(si), PA = ({ children: e, botIdRef: t, flowRef: n }) => {
  const r = ie(null), o = ie(""), i = ie(null), a = ie(/* @__PURE__ */ new Map()), A = ie(null), s = ie(""), d = ie(!1), u = ie(null), c = ie(null), l = ie(null);
  return E(si.Provider, { value: { botIdRef: t, flowRef: n, inputRef: r, timeoutIdRef: i, streamMessageMap: a, chatBodyRef: A, paramsInputRef: s, keepVoiceOnRef: d, audioContextRef: u, audioBufferRef: c, gainNodeRef: l, prevInputRef: o }, children: e });
}, Re = (e) => {
  const [t, n] = J(e), r = ie(e);
  return [t, (o) => {
    const i = typeof o == "function" ? o(r.current) : o;
    r.current = i, n(i);
  }, r];
}, li = qe({}), ye = () => He(li), BA = ({ children: e, settings: t }) => {
  var n, r, o, i, a, A;
  const [s, d, u] = Re(!1), [c, l, p] = Re(((n = t == null ? void 0 : t.chatWindow) == null ? void 0 : n.defaultOpen) ?? !1), [f, m, h] = Re(((r = t == null ? void 0 : t.audio) == null ? void 0 : r.defaultToggledOn) ?? !1), [b, w, g] = Re(((o = t == null ? void 0 : t.voice) == null ? void 0 : o.defaultToggledOn) ?? !1), [x, k, P] = Re(((i = t == null ? void 0 : t.notification) == null ? void 0 : i.defaultToggledOn) ?? !0), [S, I] = J(!1), [D, B] = J(!1), [Q, C, M] = Re(!1), [L, H, F] = Re(!0), [R, _, y] = Re(!1), [Y, v] = J(!1), [j, q] = J(!1), [X, te] = J(0), [pe, fe] = J(0), [Oe, we] = J(!1), [Le, bt] = J(((a = window.visualViewport) == null ? void 0 : a.height) ?? window.innerHeight), [wt, xt] = J(((A = window.visualViewport) == null ? void 0 : A.width) ?? window.innerWidth);
  return E(li.Provider, { value: { isBotTyping: s, setSyncedIsBotTyping: d, syncedIsBotTypingRef: u, isChatWindowOpen: c, setSyncedIsChatWindowOpen: l, syncedIsChatWindowOpenRef: p, audioToggledOn: f, setSyncedAudioToggledOn: m, syncedAudioToggledOnRef: h, voiceToggledOn: b, setSyncedVoiceToggledOn: w, syncedVoiceToggledOnRef: g, notificationsToggledOn: x, setSyncedNotificationsToggledOn: k, syncedNotificationsToggledOnRef: P, isLoadingChatHistory: S, setIsLoadingChatHistory: I, hasChatHistoryLoaded: D, setHasChatHistoryLoaded: B, isScrolling: Q, setSyncedIsScrolling: C, syncedIsScrollingRef: M, textAreaDisabled: L, setSyncedTextAreaDisabled: H, syncedTextAreaDisabledRef: F, textAreaSensitiveMode: R, setSyncedTextAreaSensitiveMode: _, syncedTextAreaSensitiveModeRef: y, hasInteractedPage: Y, setHasInteractedPage: v, hasFlowStarted: j, setHasFlowStarted: q, unreadCount: X, setUnreadCount: te, inputLength: pe, setInputLength: fe, blockAllowsAttachment: Oe, setBlockAllowsAttachment: we, viewportHeight: Le, setViewportHeight: bt, viewportWidth: wt, setViewportWidth: xt }, children: e });
};
var U = ((e) => (e.START_SPEAK_AUDIO = "rcb-start-speak-audio", e.TOGGLE_AUDIO = "rcb-toggle-audio", e.TOGGLE_NOTIFICATIONS = "rcb-toggle-notifications", e.TOGGLE_VOICE = "rcb-toggle-voice", e.TOGGLE_CHAT_WINDOW = "rcb-toggle-chat-window", e.PRE_INJECT_MESSAGE = "rcb-pre-inject-message", e.POST_INJECT_MESSAGE = "rcb-post-inject-message", e.START_SIMULATE_STREAM_MESSAGE = "rcb-start-simulate-stream-message", e.STOP_SIMULATE_STREAM_MESSAGE = "rcb-stop-simulate-stream-message", e.START_STREAM_MESSAGE = "rcb-start-stream-message", e.CHUNK_STREAM_MESSAGE = "rcb-chunk-stream-message", e.STOP_STREAM_MESSAGE = "rcb-stop-stream-message", e.REMOVE_MESSAGE = "rcb-remove-message", e.LOAD_CHAT_HISTORY = "rcb-load-chat-history", e.CHANGE_PATH = "rcb-change-path", e.SHOW_TOAST = "rcb-show-toast", e.DISMISS_TOAST = "rcb-dismiss-toast", e.USER_SUBMIT_TEXT = "rcb-user-submit-text", e.USER_UPLOAD_FILE = "rcb-user-upload-file", e.TEXT_AREA_CHANGE_VALUE = "rcb-text-area-change-value", e.PRE_LOAD_CHATBOT = "rcb-pre-load-chatbot", e.POST_LOAD_CHATBOT = "rcb-post-load-chatbot", e.PRE_PROCESS_BLOCK = "rcb-pre-process-block", e.POST_PROCESS_BLOCK = "rcb-post-process-block", e))(U || {});
const DA = { [U.START_SPEAK_AUDIO]: !0, [U.TOGGLE_AUDIO]: !0, [U.TOGGLE_VOICE]: !0, [U.TOGGLE_NOTIFICATIONS]: !0, [U.TOGGLE_CHAT_WINDOW]: !0, [U.PRE_INJECT_MESSAGE]: !0, [U.POST_INJECT_MESSAGE]: !1, [U.PRE_LOAD_CHATBOT]: !0, [U.POST_LOAD_CHATBOT]: !1, [U.START_SIMULATE_STREAM_MESSAGE]: !0, [U.STOP_SIMULATE_STREAM_MESSAGE]: !1, [U.START_STREAM_MESSAGE]: !0, [U.CHUNK_STREAM_MESSAGE]: !0, [U.STOP_STREAM_MESSAGE]: !0, [U.REMOVE_MESSAGE]: !0, [U.LOAD_CHAT_HISTORY]: !0, [U.CHANGE_PATH]: !0, [U.SHOW_TOAST]: !0, [U.DISMISS_TOAST]: !0, [U.USER_SUBMIT_TEXT]: !0, [U.USER_UPLOAD_FILE]: !0, [U.TEXT_AREA_CHANGE_VALUE]: !0, [U.PRE_PROCESS_BLOCK]: !0, [U.POST_PROCESS_BLOCK]: !0 }, jn = async (e, t, n) => {
  const r = new CustomEvent(e, { detail: t, cancelable: DA[e] });
  return r.data = n, r.promises = [], window.dispatchEvent(r), await Promise.all(r.promises), r;
}, ci = qe({ paths: [], setSyncedPaths: () => {
}, syncedPathsRef: { current: [] } }), Nt = () => He(ci), CA = ({ children: e }) => {
  const [t, n, r] = Re([]);
  return E(ci.Provider, { value: { paths: t, setSyncedPaths: n, syncedPathsRef: r }, children: e });
}, Fe = () => {
  const { botIdRef: e } = me(), { syncedPathsRef: t } = Nt(), n = G(() => t.current.length > 0 ? t.current.at(-1) ?? null : null, []), r = G(() => t.current.length > 1 ? t.current.at(-2) ?? null : null, []);
  return { dispatchRcbEvent: G(async (o, i) => {
    const a = { botId: e.current, currPath: n(), prevPath: r() };
    return await jn(o, a, i);
  }, [e]) };
}, Ie = () => {
  const { settings: e } = $(), { isChatWindowOpen: t, setSyncedIsChatWindowOpen: n, viewportHeight: r, setViewportHeight: o, viewportWidth: i, setViewportWidth: a, setUnreadCount: A, setSyncedIsBotTyping: s, setSyncedIsScrolling: d, syncedIsBotTypingRef: u, syncedIsChatWindowOpenRef: c } = ye(), { chatBodyRef: l } = me(), { dispatchRcbEvent: p } = Fe(), f = G(() => {
    if (!l.current) return !1;
    const g = l.current.getBoundingClientRect(), x = window.innerHeight ?? document.documentElement.clientHeight, k = window.innerWidth ?? document.documentElement.clientWidth;
    return g.top >= 0 && g.left >= 0 && g.bottom <= x && g.right <= k;
  }, [l]), m = G(async (g) => {
    var x;
    g !== c.current && ((x = e.event) != null && x.rcbToggleChatWindow && (await p(U.TOGGLE_CHAT_WINDOW, { currState: c.current, newState: !c.current })).defaultPrevented || n((k) => (k || A(0), !k)));
  }, [c]), h = G(async (g) => {
    g !== u.current && s((x) => !x);
  }, [u]), b = G((g, x, k, P) => (g /= P / 2) < 1 ? k / 2 * g * g + x : -k / 2 * (--g * (g - 2) - 1) + x, []), w = G((g = 0) => {
    if (!l.current) return;
    const x = l.current.scrollHeight - l.current.clientHeight;
    if (g <= 0) return l.current.scrollTop = x, void d(!1);
    const k = l.current.scrollTop, P = x - k;
    let S = 0;
    const I = () => {
      if (!l.current) return;
      S += 20;
      const D = b(S, k, P, g);
      l.current.scrollTop = D, S < g ? requestAnimationFrame(I) : d(!1);
    };
    I();
  }, [l]);
  return { isChatWindowOpen: t, setSyncedIsChatWindowOpen: n, toggleChatWindow: m, viewportHeight: r, setViewportHeight: o, viewportWidth: i, setViewportWidth: a, toggleIsBotTyping: h, scrollToBottom: w, getIsChatBotVisible: f };
}, SA = () => {
  var e, t, n;
  const { settings: r } = $(), { styles: o } = ae(), { unreadCount: i, isScrolling: a } = ye(), { chatBodyRef: A } = me(), { scrollToBottom: s } = Ie(), [d, u] = J(!1), c = { color: (e = r.general) == null ? void 0 : e.primaryColor, borderColor: (t = r.general) == null ? void 0 : t.primaryColor, ...o.chatMessagePromptHoveredStyle };
  return E("div", { className: "rcb-message-prompt-container " + (A.current && ((l = r.chatWindow) != null && l.showMessagePrompt) && a && i > 0 ? "visible" : "hidden"), children: E("div", { onMouseEnter: () => {
    u(!0);
  }, onMouseLeave: () => {
    u(!1);
  }, style: d ? c : { ...o.chatMessagePromptStyle }, onMouseDown: (p) => {
    p.preventDefault(), s(600);
  }, className: "rcb-message-prompt-text", children: (n = r.chatWindow) == null ? void 0 : n.messagePromptText }) });
  var l;
}, ui = qe({ messages: [], setSyncedMessages: () => {
}, syncedMessagesRef: { current: [] } }), Ar = () => He(ui), IA = ({ children: e }) => {
  const [t, n, r] = Re([]);
  return E(ui.Provider, { value: { messages: t, setSyncedMessages: n, syncedMessagesRef: r }, children: e });
}, TA = ({ message: e, isNewSender: t }) => {
  var n, r, o, i, a, A;
  const { settings: s } = $(), { styles: d } = ae(), u = typeof e.content == "string", c = e.content, l = e.contentWrapper ? E(e.contentWrapper, { children: c }) : c, p = { backgroundColor: (n = s.general) == null ? void 0 : n.primaryColor, color: "#fff", maxWidth: (r = s.userBubble) != null && r.showAvatar ? "65%" : "70%", ...d.userBubbleStyle }, f = (o = s.userBubble) != null && o.animate ? "rcb-user-message-entry" : "", m = ((i = s.userBubble) == null ? void 0 : i.showAvatar) && t, h = "rcb-user-message" + (!t && (a = s.userBubble) != null && a.showAvatar ? " rcb-user-message-offset" : "");
  return E("div", { className: "rcb-user-message-container", children: [u ? E("div", { style: p, className: `${h} ${f}`, children: l }) : E(oe, { children: l }), m && E("div", { style: { backgroundImage: `url("${(A = s.userBubble) == null ? void 0 : A.avatar}")` }, className: "rcb-message-user-avatar" })] });
}, QA = ({ message: e, isNewSender: t }) => {
  var n, r, o, i, a, A;
  const { settings: s } = $(), { styles: d } = ae(), u = typeof e.content == "string", c = e.content, l = e.contentWrapper ? E(e.contentWrapper, { children: c }) : c, p = { backgroundColor: (n = s.general) == null ? void 0 : n.secondaryColor, color: "#fff", maxWidth: (r = s.botBubble) != null && r.showAvatar ? "65%" : "70%", ...d.botBubbleStyle }, f = (o = s.botBubble) != null && o.animate ? "rcb-bot-message-entry" : "", m = ((i = s.botBubble) == null ? void 0 : i.showAvatar) && t, h = "rcb-bot-message" + (!t && (a = s.botBubble) != null && a.showAvatar ? " rcb-bot-message-offset" : "");
  return E("div", { className: "rcb-bot-message-container", children: [m && E("div", { style: { backgroundImage: `url("${(A = s.botBubble) == null ? void 0 : A.avatar}")` }, className: "rcb-message-bot-avatar" }), u ? E("div", { style: p, className: `${h} ${f}`, children: l }) : E(oe, { children: l })] });
}, _A = () => {
  var e, t, n;
  const { settings: r } = $(), { styles: o } = ae(), i = (e = r.botBubble) != null && e.animate ? "rcb-bot-message-entry" : "";
  return E("div", { className: "rcb-bot-message-container", children: [((t = r.botBubble) == null ? void 0 : t.showAvatar) && E("div", { style: { backgroundImage: `url("${(n = r.botBubble) == null ? void 0 : n.avatar}")` }, className: "rcb-message-bot-avatar" }), E("div", { onMouseDown: (a) => {
    a.preventDefault();
  }, className: `rcb-bot-message ${i}`, children: E("div", { className: "rcb-typing-indicator", style: { ...o == null ? void 0 : o.rcbTypingIndicatorContainerStyle }, children: [E("span", { className: "rcb-dot", style: { ...o == null ? void 0 : o.rcbTypingIndicatorDotStyle } }), E("span", { className: "rcb-dot", style: { ...o == null ? void 0 : o.rcbTypingIndicatorDotStyle } }), E("span", { className: "rcb-dot", style: { ...o == null ? void 0 : o.rcbTypingIndicatorDotStyle } })] }) })] });
}, MA = () => {
  var e, t, n;
  const { settings: r } = $(), { styles: o } = ae(), { messages: i } = Ar(), { scrollToBottom: a } = Ie(), { isBotTyping: A, syncedIsScrollingRef: s } = ye(), { chatBodyRef: d } = me(), u = { ...o == null ? void 0 : o.bodyStyle, scrollbarWidth: (e = r.chatWindow) != null && e.showScrollbar ? "auto" : "none" };
  return ee(() => {
    s.current || a();
  }, [(t = d.current) == null ? void 0 : t.scrollHeight]), E("div", { style: u, className: "rcb-chat-body-container", ref: d, children: [i.map((c, l) => {
    const p = ((f) => f === 0 || i[f].sender !== i[f - 1].sender)(l);
    return c.sender.toUpperCase() === "USER" ? E(TA, { message: c, isNewSender: p }, l) : c.sender.toUpperCase() === "BOT" ? E(QA, { message: c, isNewSender: p }, l) : E("div", { children: c.content }, l);
  }), A && ((n = r.chatWindow) == null ? void 0 : n.showTypingIndicator) && E(_A, {}), E(SA, {})] });
}, OA = ({ checkboxes: e, checkedItems: t, path: n }) => {
  var r, o, i, a, A, s, d, u, c, l, p;
  const { settings: f } = $(), { styles: m } = ae(), { paths: h } = Nt(), { handleSubmitText: b } = yt(), [w, g] = J(/* @__PURE__ */ new Set()), [x, k] = J(!1), P = { cursor: x ? `url("${(r = f.general) == null ? void 0 : r.actionDisabledIcon}"), auto` : "pointer", color: (o = f.general) == null ? void 0 : o.primaryColor, borderColor: (i = f.general) == null ? void 0 : i.primaryColor, ...m.botCheckboxRowStyle }, S = { cursor: x || w.size < e.min ? `url("${(a = f.general) == null ? void 0 : a.actionDisabledIcon}"), auto` : "pointer", color: (A = f.general) == null ? void 0 : A.primaryColor, borderColor: (s = f.general) == null ? void 0 : s.primaryColor, ...m.botCheckboxNextStyle }, I = { cursor: x ? `url("${(d = f.general) == null ? void 0 : d.actionDisabledIcon}"), auto` : "pointer", color: "transparent", ...m.botCheckMarkStyle }, D = { cursor: x ? `url("${(u = f.general) == null ? void 0 : u.actionDisabledIcon}"), auto` : "pointer", color: "#fff", borderColor: (c = f.general) == null ? void 0 : c.primaryColor, backgroundColor: (l = f.general) == null ? void 0 : l.primaryColor, ...m.botCheckMarkSelectedStyle };
  return ee(() => {
    h.length > 0 && h[h.length - 1] !== n && k(!e.reusable);
  }, [h]), E("div", { className: "rcb-checkbox-container " + ((p = f.botBubble) != null && p.showAvatar ? "rcb-checkbox-offset" : ""), children: [e.items.map((B) => E("div", { onMouseDown: (Q) => {
    Q.preventDefault(), ((C) => {
      x || g((M) => {
        const L = new Set(M);
        if (L.has(C)) t.delete(C), L.delete(C);
        else {
          if (w.size == e.max) return M;
          t.add(C), L.add(C);
        }
        return L;
      });
    })(B);
  }, style: P, className: "rcb-checkbox-row-container", children: E("div", { className: "rcb-checkbox-row", children: [E("div", { style: w.has(B) ? D : I, className: "rcb-checkbox-mark" }), E("div", { className: "rcb-checkbox-label", children: B })] }) }, B)), E("div", { style: S, className: "rcb-checkbox-next-button", onMouseDown: (B) => {
    var Q;
    if (B.preventDefault(), x || w.size < e.min) return;
    const C = Array.from(t).join(", ");
    let M;
    k(!e.reusable), M = e.sendOutput != null ? e.sendOutput : ((Q = f.chatInput) == null ? void 0 : Q.sendCheckboxOutput) ?? !0, b(C, M);
  } })] });
}, LA = async (e, t) => {
  const n = e.checkboxes;
  if (!n) return;
  let r;
  if (typeof n == "function" ? (r = n(t), r instanceof Promise && (r = await r)) : r = n, Array.isArray(r) && (r = { items: r }), !("items" in r) || r.items.length == 0) return;
  r.min == null && (r.min = 1), r.max == null && (r.max = r.items.length), r.min > r.max && (r.min = r.max), r.reusable == null && (r.reusable = !1);
  const o = /* @__PURE__ */ new Set(), i = t.currPath, a = E(OA, { checkboxes: r, checkedItems: o, path: i });
  await t.injectMessage(a);
}, NA = async (e, t) => {
  const n = e.function;
  if (!n) return;
  const r = n(t);
  return r instanceof Promise ? await r : r;
}, RA = async (e, t, n) => {
  const r = e.message;
  if (!r) return;
  if (typeof r == "string") return void (r.trim() !== "" && (n ? await t.simulateStreamMessage(r) : await t.injectMessage(r)));
  let o = r(t);
  o instanceof Promise && (o = await o), typeof o == "string" && o.trim() !== "" && (n ? await t.simulateStreamMessage(o) : await t.injectMessage(o));
}, HA = ({ options: e, path: t }) => {
  var n, r, o, i, a, A;
  const { settings: s } = $(), { styles: d } = ae(), { paths: u } = Nt(), { handleSubmitText: c } = yt(), [l, p] = J([]), [f, m] = J(!1), h = { cursor: f ? `url("${(n = s.general) == null ? void 0 : n.actionDisabledIcon}"), auto` : "pointer", color: (r = s.general) == null ? void 0 : r.primaryColor, borderColor: (o = s.general) == null ? void 0 : o.primaryColor, backgroundColor: "#fff", ...d.botOptionStyle }, b = { color: "#fff", borderColor: (i = s.general) == null ? void 0 : i.primaryColor, backgroundColor: (a = s.general) == null ? void 0 : a.primaryColor, ...d.botOptionHoveredStyle };
  return ee(() => {
    u.length > 0 && u[u.length - 1] !== t && m(!e.reusable);
  }, [u]), E("div", { className: "rcb-options-container " + ((A = s.botBubble) != null && A.showAvatar ? "rcb-options-offset" : ""), children: e.items.map((w, g) => {
    const x = l[g] && !f;
    return E("div", { className: "rcb-options", style: x ? b : h, onMouseEnter: () => ((k) => {
      p((P) => {
        const S = [...P];
        return S[k] = !0, S;
      });
    })(g), onMouseLeave: () => ((k) => {
      p((P) => {
        const S = [...P];
        return S[k] = !1, S;
      });
    })(g), onMouseDown: (k) => {
      var P;
      if (k.preventDefault(), f) return;
      let S;
      m(!e.reusable), S = e.sendOutput != null ? e.sendOutput : ((P = s.chatInput) == null ? void 0 : P.sendOptionOutput) ?? !0, c(w, S);
    }, children: w }, w);
  }) });
}, FA = async (e, t) => {
  const n = e.options;
  if (!n) return;
  let r;
  if (typeof n == "function" ? (r = n(t), r instanceof Promise && (r = await r)) : r = n, Array.isArray(r) && (r = { items: r }), !("items" in r) || r.items.length == 0) return;
  r.reusable == null && (r.reusable = !1);
  const o = t.currPath, i = E(HA, { options: r, path: o });
  await t.injectMessage(i);
}, UA = async (e, t) => {
  const n = e.component;
  if (n) {
    if (typeof n == "function") {
      let r = n(t);
      return r instanceof Promise && (r = await r), r ? void await t.injectMessage(r) : void 0;
    }
    await t.injectMessage(n);
  }
}, zA = async (e, t, n, r) => {
  const o = e.transition;
  let i;
  if (typeof o == "function" ? (i = o(t), i instanceof Promise && (i = await i)) : i = o, typeof i == "number" && (i = { duration: i }), !i || i instanceof Promise || i.duration == null || typeof i.duration != "number") return;
  i.interruptable == null && (i.interruptable = !1);
  const a = setTimeout(async () => {
    const A = await r(e);
    A && await pi(A, t);
  }, i.duration);
  i.interruptable && (n.current = a);
}, jA = async (e, t, n) => {
  const r = e.chatDisabled;
  if (r == null) return;
  let o;
  typeof r == "function" ? (o = r(t), o instanceof Promise && (o = await o)) : o = r, n(o);
}, di = async (e, t, n) => {
  const r = e.isSensitive;
  if (!r) return void n(!1);
  let o;
  typeof r == "function" ? (o = r(t), o instanceof Promise && (o = await o)) : o = r, n(o);
}, pi = async (e, t) => {
  if (!e) throw new Error("Block is not valid.");
  const n = Object.keys(e);
  for (const r of n) r === "function" && await NA(e, t);
  n.includes("path") && await (async (r, o) => {
    const i = r.path;
    if (!i) return !1;
    if (typeof i == "string") return await o.goToPath(i), !0;
    let a = i(o);
    if (a instanceof Promise && (a = await a), !a) return !1;
    const A = a;
    return await o.goToPath(A), !0;
  })(e, t);
}, GA = () => {
  var e;
  const { settings: t } = $(), { styles: n } = ae();
  return E("div", { className: "rcb-line-break-container", children: E("div", { style: { ...n.chatHistoryLineBreakStyle }, className: "rcb-line-break-text", "data-testid": "chat-history-line-break-text", children: (e = t.chatHistory) == null ? void 0 : e.chatHistoryLineBreakText }) });
}, YA = () => {
  var e;
  const { settings: t } = $(), { styles: n } = ae(), r = { borderTop: `4px solid ${(e = t.general) == null ? void 0 : e.primaryColor}`, ...n.loadingSpinnerStyle };
  return E("div", { className: "rcb-spinner-container", children: E("div", { style: r, className: "rcb-spinner" }) });
}, $t = () => {
  try {
    if (typeof crypto < "u" && typeof crypto.randomUUID == "function") return crypto.randomUUID();
    throw new Error("crypto.randomUUID not available");
  } catch (e) {
    if (typeof crypto < "u" && typeof crypto.getRandomValues == "function") return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
      const n = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
      return (t === "x" ? n : 3 & n | 8).toString(16);
    });
    throw console.error(e), new Error("crypto.getRandomValues is also not available");
  }
}, $e = (e, t) => ({ id: $t(), content: e, sender: t, type: typeof e == "string" ? "string" : "object", timestamp: (/* @__PURE__ */ new Date()).toUTCString(), tags: [] });
let nt, fi = !1, en = "rcb-history", Wt = 30, hi = !1, Lt = [];
const fn = async (e) => {
  if (hi || !nt) return;
  const t = [], n = fi ? Lt.length : 0;
  for (let o = e.length - 1; o >= n; o--) {
    const i = e[o];
    if (i.sender.toUpperCase() !== "SYSTEM" && (i.content !== "" && t.unshift(i), t.length === Wt)) break;
  }
  let r = t.map(qA);
  if (r.length < Wt) {
    const o = Wt - r.length;
    r = [...Lt.slice(-o), ...r];
  }
  gi(r);
}, sr = () => Lt, WA = (e) => {
  gi(e), Lt = e;
}, gi = (e) => {
  nt && nt.setItem(en, JSON.stringify(e));
}, Gn = (e) => {
  var t, n, r, o, i;
  nt = ((n = (t = e.chatHistory) == null ? void 0 : t.storageType) == null ? void 0 : n.toUpperCase()) === "SESSION_STORAGE" ? sessionStorage : localStorage, en = (r = e.chatHistory) == null ? void 0 : r.storageKey, Wt = (o = e.chatHistory) == null ? void 0 : o.maxEntries, hi = (i = e.chatHistory) == null ? void 0 : i.disabled, Lt = ((a) => {
    if (a != null) try {
      return JSON.parse(a);
    } catch {
      return [];
    }
    return [];
  })(nt.getItem(en));
}, qA = (e) => ht(e.content) ? structuredClone({ id: e.id, content: pA.renderToString(e.content), type: e.type, sender: e.sender.toUpperCase(), timestamp: e.timestamp, tags: e.tags }) : e, mi = (e, t, n) => {
  const r = new DOMParser().parseFromString(e, "text/html");
  return Array.from(r.body.childNodes).map((o, i) => {
    var a;
    if (o.nodeType === Node.TEXT_NODE) return o.textContent;
    {
      const A = o.tagName.toLowerCase();
      let s = Array.from(o.attributes).reduce((d, u) => {
        const c = u.name.toLowerCase();
        if (c === "style") {
          const l = u.value.split(";").filter((f) => f.trim() !== ""), p = {};
          l.forEach((f) => {
            const [m, h] = f.split(":").map((w) => w.trim()), b = m.replace(/-([a-z])/g, (w, g) => g.toUpperCase());
            p[b] = h;
          }), d[c] = p;
        } else A !== "audio" && A !== "video" || c !== "controls" || u.value !== "" ? d[c] = u.value : d[c] = "true";
        return d;
      }, {});
      if (Object.prototype.hasOwnProperty.call(s, "class")) {
        const d = o.classList;
        s.className = d.toString(), delete s.class, (a = t.botBubble) != null && a.showAvatar && (s = VA(d, s)), s = XA(d, s, t, n), s = KA(d, s, t, n), s = JA(d, s, t, n), s = ZA(d, s, t, n);
      }
      if (["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"].includes(A)) return ne(A, { key: i, ...s });
      {
        const d = mi(o.innerHTML, t, n);
        return ne(A, { key: i, ...s }, ...d);
      }
    }
  });
}, VA = (e, t) => ((e.contains("rcb-options-container") || e.contains("rcb-checkbox-container")) && (t.className = `${e.toString()} rcb-options-offset`), t), XA = (e, t, n, r) => {
  var o, i, a, A, s;
  return e.contains("rcb-options") && (t.style = { ...t.style, color: ((o = r.botOptionStyle) == null ? void 0 : o.color) ?? ((i = n.general) == null ? void 0 : i.primaryColor), borderColor: ((a = r.botOptionStyle) == null ? void 0 : a.color) ?? ((A = n.general) == null ? void 0 : A.primaryColor), cursor: `url("${(s = n.general) == null ? void 0 : s.actionDisabledIcon}"), auto`, ...r.botOptionStyle }), t;
}, KA = (e, t, n, r) => {
  var o, i, a, A, s;
  return e.contains("rcb-checkbox-row-container") && (t.style = { ...t.style, color: ((o = r.botCheckboxRowStyle) == null ? void 0 : o.color) ?? ((i = n.general) == null ? void 0 : i.primaryColor), borderColor: ((a = r.botCheckboxRowStyle) == null ? void 0 : a.color) ?? ((A = n.general) == null ? void 0 : A.primaryColor), cursor: `url("${(s = n.general) == null ? void 0 : s.actionDisabledIcon}"), auto`, ...r.botCheckboxRowStyle }), t;
}, JA = (e, t, n, r) => {
  var o, i, a, A, s;
  return e.contains("rcb-checkbox-next-button") && (t.style = { ...t.style, color: ((o = r.botCheckboxNextStyle) == null ? void 0 : o.color) ?? ((i = n.general) == null ? void 0 : i.primaryColor), borderColor: ((a = r.botCheckboxNextStyle) == null ? void 0 : a.color) ?? ((A = n.general) == null ? void 0 : A.primaryColor), cursor: `url("${(s = n.general) == null ? void 0 : s.actionDisabledIcon}"), auto`, ...r.botCheckboxNextStyle }), t;
}, ZA = (e, t, n, r) => {
  var o, i;
  return (e.contains("rcb-media-display-image-container") || e.contains("rcb-media-display-video-container")) && (t.style = { ...t.style, backgroundColor: (o = n.general) == null ? void 0 : o.primaryColor, maxWidth: (i = n.userBubble) != null && i.showAvatar ? "65%" : "70%", ...r.mediaDisplayContainerStyle }), t;
}, lr = () => {
  const { settings: e } = $(), { notificationsToggledOn: t, setSyncedNotificationsToggledOn: n, hasInteractedPage: r, unreadCount: o, setUnreadCount: i, syncedNotificationsToggledOnRef: a } = ye(), { audioBufferRef: A, audioContextRef: s, gainNodeRef: d } = me(), { dispatchRcbEvent: u } = Fe(), c = G(async () => {
    var p, f;
    const m = (p = e.notification) == null ? void 0 : p.sound;
    s.current = new AudioContext();
    const h = s.current.createGain();
    let b;
    if (h.gain.value = ((f = e.notification) == null ? void 0 : f.volume) ?? 0.2, d.current = h, m != null && m.startsWith("data:audio")) {
      const w = atob(m.split(",")[1]), g = new ArrayBuffer(w.length), x = new Uint8Array(g);
      for (let k = 0; k < w.length; k++) x[k] = w.charCodeAt(k);
      b = g;
    } else b = await (await fetch(m)).arrayBuffer();
    A.current = await s.current.decodeAudioData(b);
  }, [e.notification]), l = G(() => {
    var p;
    if ((p = e.notification) != null && p.disabled || !a.current || !r || !s.current || !A.current) return;
    const f = s.current.createBufferSource();
    f.buffer = A.current, f.connect(d.current).connect(s.current.destination), f.start();
  }, [e.notification, a, r, s, A, d]);
  return { unreadCount: o, setUnreadCount: i, notificationsToggledOn: t, toggleNotifications: G(async (p) => {
    var f;
    p !== a.current && ((f = e.event) != null && f.rcbToggleNotifications && (await u(U.TOGGLE_NOTIFICATIONS, { currState: a.current, newState: !a.current })).defaultPrevented || n((m) => !m));
  }, [a]), playNotificationSound: l, setUpNotifications: c };
}, $A = (e, t) => {
  var n, r, o, i;
  ((a, A, s, d, u) => {
    if (!window.SpeechSynthesisUtterance) return void console.info("Speech Synthesis API is not supported in this environment.");
    const c = new window.SpeechSynthesisUtterance();
    c.text = a, c.lang = A, c.rate = d, c.volume = u;
    let l = !1;
    for (const p of s) if (window.speechSynthesis.getVoices().find((f) => {
      if (f.name === p) return c.voice = f, window.speechSynthesis.speak(c), void (l = !0);
    }), l) break;
    l || window.speechSynthesis.speak(c);
  })(t, (n = e.audio) == null ? void 0 : n.language, (r = e.audio) == null ? void 0 : r.voiceNames, (o = e.audio) == null ? void 0 : o.rate, (i = e.audio) == null ? void 0 : i.volume);
}, yi = () => {
  const { settings: e } = $(), { audioToggledOn: t, setSyncedAudioToggledOn: n, syncedAudioToggledOnRef: r } = ye(), { dispatchRcbEvent: o } = Fe(), i = G(async (A) => {
    var s;
    A !== r.current && ((s = e.event) != null && s.rcbToggleAudio && (await o(U.TOGGLE_AUDIO, { currState: r.current, newState: !r.current })).defaultPrevented || n((d) => !d));
  }, [r]), a = G(async (A) => {
    var s, d;
    if ((s = e.audio) != null && s.disabled || !r.current) return;
    let u = A;
    if ((d = e.event) != null && d.rcbStartSpeakAudio) {
      const c = await o(U.START_SPEAK_AUDIO, { textToRead: u });
      if (c.defaultPrevented) return;
      u = c.data.textToRead;
    }
    $A(e, u);
  }, [e, r]);
  return { audioToggledOn: t, speakAudio: a, toggleAudio: i };
}, at = () => {
  var e, t;
  const { settings: n } = $(), { messages: r, setSyncedMessages: o, syncedMessagesRef: i } = Ar(), { setSyncedIsBotTyping: a, setUnreadCount: A, syncedIsScrollingRef: s, syncedIsChatWindowOpenRef: d } = ye(), { streamMessageMap: u, chatBodyRef: c, paramsInputRef: l } = me(), { scrollToBottom: p, getIsChatBotVisible: f } = Ie(), { dispatchRcbEvent: m } = Fe(), { speakAudio: h } = yi(), { playNotificationSound: b } = lr(), w = G((I, D = !1) => {
    var B, Q;
    fn(I);
    let C = !0;
    const M = I[I.length - 1];
    if (!M) return;
    const L = M.sender.toUpperCase();
    L === "USER" && (C = !1), (B = n.general) != null && B.embedded && f() && (C = !1), (d.current && !s.current || D) && (C = !1), C && b(), !D && (L !== "USER" && (Q = n.chatWindow) != null && Q.autoJumpToBottom || L === "USER" || !s.current) && setTimeout(() => p(), 1);
  }, [n, c, d, s, b, p, f]), g = G(async (I, D = "BOT", B = null) => {
    var Q, C, M, L, H;
    if (typeof I != "string") throw new Error("Content must be of type string to simulate stream.");
    D = D.toUpperCase();
    let F = $e(I, D);
    if ((Q = n.event) != null && Q.rcbStartSimulateStreamMessage) {
      const q = await m(U.START_SIMULATE_STREAM_MESSAGE, { message: F });
      if (q.defaultPrevented) return null;
      B = q.data.simulateStreamChunker || B, F = q.data.message;
    }
    a(!1);
    let R = 30;
    R = D === "BOT" ? (C = n.botBubble) == null ? void 0 : C.streamSpeed : (M = n.userBubble) == null ? void 0 : M.streamSpeed;
    const _ = { ...F, content: "" };
    o((q) => [...q, _]), w(i.current);
    let y = F.content;
    B && (y = B(y));
    let Y = 0;
    const v = y.length;
    F.sender.toUpperCase() === "BOT" && (d.current || (L = n.general) != null && L.embedded) && typeof F.content == "string" && F.content.trim() !== "" && h(F.content);
    const j = new Promise((q) => {
      const X = setInterval(() => {
        if (Y >= v) return clearInterval(X), void q();
        o((te) => {
          const pe = [...te];
          for (let fe = pe.length - 1; fe >= 0; fe--) if (pe[fe].id === _.id) {
            const Oe = y[Y];
            Oe && (_.content += Oe, pe[fe] = _), Y++;
            break;
          }
          return pe;
        });
      }, R);
    });
    return (s.current || !d.current) && A((q) => q + 1), await j, fn(i.current), (H = n.event) != null && H.rcbStopSimulateStreamMessage && await m(U.STOP_SIMULATE_STREAM_MESSAGE, { message: F }), D === "USER" && (l.current = I), F;
  }, [n, m, w, i, l, a, A, d, h]), x = G(async (I, D = "BOT") => {
    var B, Q, C;
    D = D.toUpperCase();
    let M = $e(I, D);
    if ((B = n.event) != null && B.rcbPreInjectMessage) {
      const L = await m(U.PRE_INJECT_MESSAGE, { message: M });
      if (L.defaultPrevented) return null;
      M = L.data.message;
    }
    return M.sender.toUpperCase() === "BOT" && (d.current || (Q = n.general) != null && Q.embedded) && typeof M.content == "string" && M.content.trim() !== "" && h(M.content), (s.current || !d.current) && A((L) => L + 1), (C = n.event) != null && C.rcbPostInjectMessage && await m(U.POST_INJECT_MESSAGE, { message: M }), o((L) => [...L, M]), w(i.current), D === "USER" && typeof I == "string" && (l.current = I), M;
  }, [n, m, w, l, i, d, h, A]), k = G(async (I) => {
    var D;
    const B = i.current.find((Q) => Q.id === I);
    return !B || (D = n.event) != null && D.rcbRemoveMessage && (await m(U.REMOVE_MESSAGE, { message: B })).defaultPrevented ? null : (o((Q) => Q.filter((C) => C.id !== I)), w(i.current), A((Q) => Math.max(Q - 1, 0)), B);
  }, [m, (e = n.event) == null ? void 0 : e.rcbRemoveMessage, w, i, A]), P = G(async (I, D = "BOT") => {
    var B, Q;
    if (D = D.toUpperCase(), !u.current.has(D)) {
      const M = $e(I, D);
      return (B = n.event) != null && B.rcbStartStreamMessage && (await m(U.START_STREAM_MESSAGE, { message: M })).defaultPrevented ? null : (a(!1), o((L) => [...L, M]), w(i.current), u.current.set(D, M.id), (s.current || !d.current) && A((L) => L + 1), M);
    }
    const C = { ...$e(I, D), id: u.current.get(D) };
    return (Q = n.event) != null && Q.rcbChunkStreamMessage && (await m(U.CHUNK_STREAM_MESSAGE, { message: C })).defaultPrevented ? null : (o((M) => M.map((L) => L.id === C.id ? C : L)), w(i.current, !0), C);
  }, [m, n.event, w, i, a, A, u]), S = G(async (I = "BOT") => {
    var D;
    if (I = I.toUpperCase(), !u.current.has(I)) return !0;
    const B = u.current.get(I);
    let Q;
    for (let C = 0; C < 3; C++) {
      const M = i.current.find((L) => L.id === B);
      M && (Q = M), await new Promise((L) => setTimeout(L, 20));
    }
    return ((D = n.event) == null || !D.rcbStopStreamMessage || !(await m(U.STOP_STREAM_MESSAGE, { message: Q })).defaultPrevented) && (u.current.delete(I), fn(i.current), I === "USER" && typeof (Q == null ? void 0 : Q.content) == "string" && (l.current = Q.content), !0);
  }, [m, (t = n.event) == null ? void 0 : t.rcbStopStreamMessage, u, l]);
  return { simulateStreamMessage: g, injectMessage: x, removeMessage: k, streamMessage: P, endStreamMessage: S, replaceMessages: G((I) => {
    o(I), w(I);
  }, [w]), messages: r };
};
let hn, Ue, qt, tt = !1, Ye = null;
const cr = () => {
  if (!hn) {
    const e = window.SpeechRecognition || window.webkitSpeechRecognition;
    hn = e != null ? new e() : null;
  }
  return hn;
}, es = (e, t, n, r, o, i) => {
  var a, A, s;
  const d = cr();
  if (!d) return;
  if (!tt) try {
    tt = !0, d.lang = (a = e.voice) == null ? void 0 : a.language, d.start();
  } catch {
  }
  const u = (A = e.voice) == null ? void 0 : A.timeoutPeriod, c = (s = e.voice) == null ? void 0 : s.autoSendPeriod;
  d.onresult = (l) => {
    var p, f;
    clearTimeout(Ue), Ue = null, clearTimeout(qt);
    const m = l.results[l.results.length - 1][0].transcript;
    if (i.current) {
      const h = (p = e.chatInput) == null ? void 0 : p.characterLimit, b = i.current.value + m;
      h != null && h >= 0 && b.length > h ? r(b.slice(0, h)) : r(b), o(i.current.value.length);
    }
    u && (Ue = setTimeout(async () => await gn(t, i), u)), (f = e.voice) != null && f.autoSendDisabled || (qt = setTimeout(n, c));
  }, d.onend = () => {
    tt ? (d.start(), !Ue && u && (Ue = setTimeout(async () => await gn(t, i), u))) : (clearTimeout(Ue), Ue = null, clearTimeout(qt));
  }, u && (Ue = setTimeout(async () => await gn(t, i), u));
}, ts = (e, t) => {
  navigator.mediaDevices.getUserMedia({ audio: !0 }).then((n) => {
    if (Ye = new MediaRecorder(n), !tt) try {
      tt = !0, Ye.start();
    } catch {
    }
    Ye.ondataavailable = (r) => {
      t.current && t.current.push(r.data);
    }, Ye.onstop = () => {
      e(), n.getTracks().forEach((r) => r.stop());
    };
  }).catch((n) => {
    console.error("Unable to use microphone:", n);
  });
}, ur = () => {
  const e = cr();
  e && (tt = !1, e && e.stop(), Ye && Ye.state !== "inactive" && (Ye.stop(), Ye = null), clearTimeout(Ue), Ue = null, clearTimeout(qt));
}, gn = async (e, t) => {
  var n;
  (n = t.current) != null && n.disabled || await e(), ur();
}, dr = () => {
  const { settings: e } = $(), { voiceToggledOn: t, setSyncedVoiceToggledOn: n, syncedVoiceToggledOnRef: r } = ye(), { dispatchRcbEvent: o } = Fe(), i = G(async (A) => {
    var s;
    A !== r.current && ((s = e.event) != null && s.rcbToggleVoice && (await o(U.TOGGLE_VOICE, { currState: r.current, newState: !r.current })).defaultPrevented || n((d) => !d));
  }, [r]), a = G((A) => {
    ((s, d) => {
      var u, c, l;
      const p = cr();
      (u = d.voice) != null && u.disabled || (c = d.chatInput) == null || !c.blockSpam || !p || (s && !tt ? (tt = !0, (l = d.voice) != null && l.sendAsAudio ? Ye == null || Ye.start() : p.start()) : s || ur());
    })(A, e);
  }, [e]);
  return { voiceToggledOn: t, toggleVoice: i, syncVoice: a };
}, gt = () => {
  var e;
  const { settings: t } = $(), { inputLength: n, setInputLength: r, textAreaDisabled: o, setSyncedTextAreaDisabled: i, textAreaSensitiveMode: a, setSyncedTextAreaSensitiveMode: A, syncedTextAreaDisabledRef: s, syncedTextAreaSensitiveModeRef: d } = ye(), { inputRef: u, chatBodyRef: c, prevInputRef: l } = me(), { dispatchRcbEvent: p } = Fe(), { getIsChatBotVisible: f } = Ie(), m = G(async (P) => {
    var S, I, D;
    if (s.current && u.current) u.current.value = "";
    else if (u.current && l.current !== null) {
      const B = (S = t.chatInput) == null ? void 0 : S.characterLimit, Q = (I = t.chatInput) != null && I.allowNewline ? P : P.replace(/\n/g, " ");
      if (B != null && B >= 0 && Q.length > B ? u.current.value = Q.slice(0, B) : u.current.value = Q, (D = t.event) != null && D.rcbTextAreaChangeValue && (await p(U.TEXT_AREA_CHANGE_VALUE, { currValue: u.current.value, prevValue: l.current })).defaultPrevented) return void (u.current.value = l.current);
      l.current = u.current.value;
    }
  }, [s, u, l, t, p]), h = G((P) => {
    var S;
    (S = u.current) != null && S.disabled || setTimeout(() => {
      var I, D, B;
      (I = t.general) != null && I.embedded ? f() && ((D = u.current) == null || D.focus()) : P !== "start" && ((B = u.current) == null || B.focus());
    }, 100);
  }, [u, (e = t.general) == null ? void 0 : e.embedded, c, f]), b = G(() => {
    u.current && u.current.focus();
  }, []), w = G(() => {
    u.current && u.current.blur();
  }, []), g = G(() => u && u.current ? u.current.value : "", []), x = G((P) => {
    P !== s.current && i((S) => !S);
  }, [s]), k = G((P) => {
    P !== d.current && A((S) => !S);
  }, [d]);
  return { textAreaDisabled: o, setSyncedTextAreaDisabled: i, textAreaSensitiveMode: a, setSyncedTextAreaSensitiveMode: A, inputLength: n, setInputLength: r, getTextAreaValue: g, setTextAreaValue: m, updateTextAreaFocus: h, focusTextArea: b, blurTextArea: w, toggleTextAreaDisabled: x, toggleTextAreaSensitiveMode: k };
}, vi = qe({ toasts: [], setSyncedToasts: () => {
}, syncedToastsRef: { current: [] } }), bi = () => He(vi), ns = ({ children: e }) => {
  const [t, n, r] = Re([]);
  return E(vi.Provider, { value: { toasts: t, setSyncedToasts: n, syncedToastsRef: r }, children: e });
}, mt = () => {
  const { settings: e } = $(), { toasts: t, setSyncedToasts: n, syncedToastsRef: r } = bi(), { dispatchRcbEvent: o } = Fe(), i = G(async (A, s) => {
    var d, u, c, l;
    let p = null;
    if (r.current.length >= (((d = e.toast) == null ? void 0 : d.maxCount) ?? 3)) {
      if ((u = e.toast) != null && u.forbidOnMax) return null;
      p = $t();
      let m = { id: p, content: A, timeout: s };
      if ((c = e.event) != null && c.rcbShowToast) {
        const h = await o(U.SHOW_TOAST, { toast: m });
        if (h.defaultPrevented) return null;
        m = h.data.toast;
      }
      return n((h) => [...h.slice(1), m]), p;
    }
    p = $t();
    let f = { id: p, content: A, timeout: s };
    if ((l = e.event) != null && l.rcbShowToast) {
      const m = await o(U.SHOW_TOAST, { toast: f });
      if (m.defaultPrevented) return null;
      f = m.data.toast;
    }
    return n((m) => [...m, f]), p;
  }, [e, o]), a = G(async (A) => {
    var s;
    const d = r.current.find((u) => u.id === A);
    return !d || (s = e.event) != null && s.rcbDismissToast && (await o(U.DISMISS_TOAST, { toast: d })).defaultPrevented ? null : (n((u) => u.filter((c) => c.id !== A)), A);
  }, [o]);
  return { showToast: i, dismissToast: a, toasts: t, replaceToasts: G((A) => {
    n(A);
  }, []) };
}, sn = () => {
  var e, t, n, r, o;
  const { settings: i } = $(), { paths: a, setSyncedPaths: A, syncedPathsRef: s } = Nt(), { flowRef: d, streamMessageMap: u, paramsInputRef: c, keepVoiceOnRef: l, timeoutIdRef: p } = me(), { setSyncedIsBotTyping: f, setSyncedTextAreaDisabled: m, setSyncedTextAreaSensitiveMode: h, blockAllowsAttachment: b, setBlockAllowsAttachment: w } = ye(), { dispatchRcbEvent: g } = Fe(), { endStreamMessage: x, injectMessage: k, removeMessage: P, simulateStreamMessage: S, streamMessage: I } = at(), { showToast: D, dismissToast: B } = mt(), { toggleChatWindow: Q } = Ie(), { updateTextAreaFocus: C, setTextAreaValue: M } = gt(), { syncVoice: L } = dr(), H = G(async (v) => {
    var j;
    if ((j = i.event) != null && j.rcbPostProcessBlock) {
      const q = await g(U.POST_PROCESS_BLOCK, { block: v });
      if (q.defaultPrevented) return null;
      v = q.data.block;
    }
    return v;
  }, [(e = i.event) == null ? void 0 : e.rcbPostProcessBlock, g]), F = G(async (v, j) => {
    var q, X, te, pe;
    if (!v) return;
    let fe = d.current[v];
    if (!fe) return void f(!1);
    if ((q = i.event) != null && q.rcbPreProcessBlock) {
      const we = await g(U.PRE_PROCESS_BLOCK, { block: fe });
      if (we.defaultPrevented) return;
      fe = we.data.block;
    }
    f(!0), (X = i.chatInput) != null && X.blockSpam && m(!0), h(!1);
    const Oe = { prevPath: j, currPath: v, goToPath: y, setTextAreaValue: M, userInput: c.current, endStreamMessage: x, injectMessage: k, removeMessage: P, simulateStreamMessage: S, streamMessage: I, toggleChatWindow: Q, showToast: D, dismissToast: B };
    await (async (we, Le, bt, wt, xt, Rt, un) => {
      if (!we) throw new Error("Block is not valid.");
      for (const dn of Object.keys(we)) switch (dn) {
        case "message":
          await RA(we, Le, bt);
          break;
        case "options":
          await FA(we, Le);
          break;
        case "checkboxes":
          await LA(we, Le);
          break;
        case "component":
          await UA(we, Le);
          break;
        case "chatDisabled":
          await jA(we, Le, xt);
          break;
        case "isSensitive":
          await di(we, Le, Rt);
          break;
        case "transition":
          await zA(we, Le, wt, un);
      }
    })(fe, Oe, ((te = i.botBubble) == null ? void 0 : te.simulateStream) ?? !1, p, m, h, H), f(!1), "chatDisabled" in fe || m((pe = i.chatInput) == null ? void 0 : pe.disabled), "isSensitive" in fe || h(!1), w(typeof fe.file == "function"), C(v), L(l.current && !fe.chatDisabled), v !== j && u.current.clear();
  }, [d, C, L, (t = i.botBubble) == null ? void 0 : t.simulateStream, (n = i.chatInput) == null ? void 0 : n.disabled, c, x, k, P, S, I, Q, D, B, l, u]), R = G(() => s.current.length > 0 ? s.current.at(-1) ?? null : null, []), _ = G(() => s.current.length > 1 ? s.current.at(-2) ?? null : null, []), y = G(async (v) => {
    var j;
    const q = R(), X = _();
    return ((j = i.event) == null || !j.rcbChangePath || !(await g(U.CHANGE_PATH, { currPath: q, prevPath: X, nextPath: v })).defaultPrevented) && (A((te) => [...te, v]), await F(v, q), !0);
  }, [(r = i.chatInput) == null ? void 0 : r.blockSpam, (o = i.event) == null ? void 0 : o.rcbChangePath, F, g]), Y = G((v) => {
    A(v);
  }, []);
  return { getCurrPath: R, getPrevPath: _, goToPath: y, blockAllowsAttachment: b, setBlockAllowsAttachment: w, paths: a, replacePaths: Y, firePostProcessBlockEvent: H };
}, yt = () => {
  var e, t, n, r;
  const { settings: o } = $(), { endStreamMessage: i, injectMessage: a, removeMessage: A, simulateStreamMessage: s, streamMessage: d } = at(), { syncedPathsRef: u } = Nt(), { getCurrPath: c, getPrevPath: l, goToPath: p, firePostProcessBlockEvent: f } = sn(), { setSyncedTextAreaSensitiveMode: m, setSyncedTextAreaDisabled: h, setSyncedIsBotTyping: b, setBlockAllowsAttachment: w, setInputLength: g, syncedVoiceToggledOnRef: x, syncedTextAreaSensitiveModeRef: k } = ye(), { flowRef: P, inputRef: S, keepVoiceOnRef: I, paramsInputRef: D, timeoutIdRef: B } = me(), { showToast: Q, dismissToast: C } = mt(), { dispatchRcbEvent: M } = Fe(), { syncVoice: L } = dr(), { setTextAreaValue: H } = gt(), { toggleChatWindow: F } = Ie(), R = G(async (y) => {
    var Y, v, j, q, X, te;
    const pe = c();
    if (pe && P.current[pe]) {
      if (k.current) {
        if ((Y = o == null ? void 0 : o.sensitiveInput) != null && Y.hideInUserBubble) return;
        if ((v = o == null ? void 0 : o.sensitiveInput) != null && v.maskInUserBubble) return void ((j = o.userBubble) != null && j.simulateStream ? await s("*".repeat(((q = o.sensitiveInput) == null ? void 0 : q.asterisksCount) ?? 10), "USER") : await a("*".repeat(((X = o.sensitiveInput) == null ? void 0 : X.asterisksCount) ?? 10), "USER"));
      }
      (te = o.userBubble) != null && te.simulateStream ? await s(y, "USER") : await a(y, "USER");
    }
  }, [P, c, o, a, s, k]), _ = G(async (y, Y = !0) => {
    var v, j;
    if ((y = y.trim()) === "") return;
    Y && await R(y), B.current && clearTimeout(B.current), S.current && (H(""), g(0));
    const q = c();
    if (!q) return;
    let X = P.current[q];
    const te = await f(X);
    te && ((v = o.chatInput) != null && v.blockSpam && h(!0), I.current = x.current, L(!1), setTimeout(() => {
      b(!0);
    }, 400), m(!1), setTimeout(async () => {
      var pe;
      const fe = { prevPath: l(), currPath: c(), goToPath: p, setTextAreaValue: H, userInput: D.current, injectMessage: a, simulateStreamMessage: s, streamMessage: d, removeMessage: A, endStreamMessage: i, toggleChatWindow: F, showToast: Q, dismissToast: C }, Oe = u.current.length;
      await pi(te, fe), u.current.length === Oe && (h("chatDisabled" in X ? !!X.chatDisabled : !((pe = o.chatInput) == null || !pe.disabled)), di(X, fe, m), w(typeof X.file == "function"), L(I.current), b(!1));
    }, (j = o.chatInput) == null ? void 0 : j.botDelay));
  }, [B, (e = o.chatInput) == null ? void 0 : e.blockSpam, (t = o.chatInput) == null ? void 0 : t.botDelay, (n = o.chatInput) == null ? void 0 : n.disabled, I, x, L, R, l, c, p, a, s, d, A, i, F, Q, C, P]);
  return { handleSubmitText: G(async (y, Y = !0) => {
    var v, j;
    y = y ?? ((v = S.current) == null ? void 0 : v.value), !((j = o.event) != null && j.rcbUserSubmitText && (await M(U.USER_SUBMIT_TEXT, { inputText: y, sendInChat: Y })).defaultPrevented || !c()) && _(y, Y);
  }, [M, c, _, S, (r = o.event) == null ? void 0 : r.rcbUserSubmitText]) };
}, ln = () => {
  var e;
  const { settings: t } = $();
  return ke(() => {
    var n;
    if (typeof window > "u" || !window.navigator) return !1;
    if ((n = t.device) == null || !n.applyMobileOptimizations) return !0;
    const r = navigator.userAgent, o = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(r), i = window.innerWidth >= 768;
    return o && i;
  }, [(e = t.device) == null ? void 0 : e.applyMobileOptimizations]);
}, rs = ({ buttons: e }) => {
  var t, n, r, o, i, a, A, s, d, u, c;
  const l = ln(), { settings: p } = $(), { styles: f } = ae(), { textAreaDisabled: m, textAreaSensitiveMode: h, inputLength: b, hasFlowStarted: w, setHasFlowStarted: g, setInputLength: x } = ye(), { inputRef: k } = me(), [P, S] = J(!1), [I, D] = J(!1), { handleSubmitText: B } = yt(), { setTextAreaValue: Q } = gt(), C = { boxSizing: l ? "content-box" : "border-box", ...f.chatInputAreaStyle }, M = { outline: m ? "" : "none", boxShadow: m ? "" : `0 0 5px ${(t = p.general) == null ? void 0 : t.primaryColor}`, boxSizing: l ? "content-box" : "border-box", ...f.chatInputAreaStyle, ...f.chatInputAreaFocusedStyle }, L = { cursor: `url("${(n = p.general) == null ? void 0 : n.actionDisabledIcon}"), auto`, caretColor: "transparent", boxSizing: l ? "content-box" : "border-box", ...f.chatInputAreaStyle, ...f.chatInputAreaDisabledStyle }, H = { color: "#989898", ...f.characterLimitStyle }, F = { color: "#ff0000", ...f.characterLimitReachedStyle }, R = m ? (r = p.chatInput) == null ? void 0 : r.disabledPlaceholderText : (o = p.chatInput) == null ? void 0 : o.enabledPlaceholderText, _ = () => {
    m || S(!0);
  }, y = () => {
    S(!1);
  }, Y = () => {
    D(!0);
  }, v = () => {
    D(!1);
  }, j = async (X) => {
    var te;
    if (!I && X.key === "Enter") {
      if (X.shiftKey) return void ((te = p.chatInput) != null && te.allowNewline || X.preventDefault());
      X.preventDefault(), await B();
    }
  }, q = (X) => {
    k.current && (Q(X.target.value), x(k.current.value.length));
  };
  return E("div", { "aria-label": ((i = p.ariaLabel) == null ? void 0 : i.inputTextArea) ?? "input text area", role: "textbox", onMouseDown: (X) => {
    var te;
    X.stopPropagation(), !w && ((te = p.general) == null ? void 0 : te.flowStartTrigger) === "ON_CHATBOT_INTERACT" && g(!0);
  }, style: { ...f.chatInputContainerStyle }, className: "rcb-chat-input", children: [h && (a = p.sensitiveInput) != null && a.maskInTextArea ? E("input", { ref: k, type: "password", className: "rcb-chat-input-textarea", style: m ? L : P ? M : C, placeholder: R, onChange: q, onKeyDown: j, onFocus: _, onBlur: y, onCompositionStart: Y, onCompositionEnd: v }) : E("textarea", { ref: k, style: m ? L : P ? M : C, rows: 1, className: "rcb-chat-input-textarea", placeholder: R, onChange: q, onKeyDown: j, onFocus: _, onBlur: y, onCompositionStart: Y, onCompositionEnd: v }), E(oe, { children: [e == null ? void 0 : e.map((X, te) => E(oe, { children: X }, te)), ((A = p.chatInput) == null ? void 0 : A.showCharacterCount) && ((s = p.chatInput) == null ? void 0 : s.characterLimit) != null && ((d = p.chatInput) == null ? void 0 : d.characterLimit) > 0 && E("div", { className: "rcb-chat-input-char-counter", style: b >= ((u = p.chatInput) == null ? void 0 : u.characterLimit) ? F : H, children: [b, "/", (c = p.chatInput) == null ? void 0 : c.characterLimit] })] })] });
}, os = ({ buttons: e }) => {
  var t;
  const { settings: n } = $(), { styles: r } = ae();
  return E("div", { "data-testid": "chatbot-footer-container", style: { ...r.footerStyle }, className: "rcb-chat-footer-container", children: [E("div", { className: "rcb-chat-footer", children: e == null ? void 0 : e.map((o, i) => E(oe, { children: o }, i)) }), E("span", { children: (t = n.footer) == null ? void 0 : t.text })] });
}, is = () => {
  var e, t, n, r, o, i, a;
  const { settings: A } = $(), { styles: s } = ae(), { unreadCount: d } = ye(), { isChatWindowOpen: u, toggleChatWindow: c } = Ie(), l = { backgroundImage: `linear-gradient(to right, ${(e = A.general) == null ? void 0 : e.secondaryColor},
			${(t = A.general) == null ? void 0 : t.primaryColor})`, ...s.chatButtonStyle }, p = { backgroundImage: `url(${(n = A.chatButton) == null ? void 0 : n.icon})`, fill: "#fff", width: 75, height: 75, ...s.chatIconStyle };
  return E(oe, { children: !((r = A.general) != null && r.embedded) && E("div", { "aria-label": ((o = A.ariaLabel) == null ? void 0 : o.chatButton) ?? "open chat", role: "button", style: l, className: "rcb-toggle-button " + (u ? "rcb-button-hide" : "rcb-button-show"), onClick: () => c(!0), children: [(() => {
    var f;
    const m = (f = A.chatButton) == null ? void 0 : f.icon;
    return m && typeof m != "string" ? m && E("span", { className: "rcb-toggle-icon", children: E(m, { style: p }) }) : E("span", { className: "rcb-toggle-icon", style: p });
  })(), !((i = A.notification) != null && i.disabled) && ((a = A.notification) == null ? void 0 : a.showCount) && E("span", { style: { ...s.notificationBadgeStyle }, className: "rcb-badge", children: d })] }) });
}, as = () => {
  var e, t, n, r;
  const o = ln(), { settings: i } = $(), { styles: a } = ae(), { chatBodyRef: A } = me(), { isChatWindowOpen: s, toggleChatWindow: d } = Ie(), [u, c] = J(!1), [l, p] = J(!1), [f, m] = J(0);
  ee(() => {
    var w, g, x;
    const k = (w = i.tooltip) == null ? void 0 : w.mode;
    if (k === "ALWAYS") if (o) {
      let P;
      P = s ? (((g = A.current) == null ? void 0 : g.offsetWidth) ?? 375) - (typeof ((x = a.chatButtonStyle) == null ? void 0 : x.width) == "number" ? a.chatButtonStyle.width : 75) : 0, m(P), c(!0);
    } else c(!s);
    else k === "NEVER" ? c(!1) : k === "START" ? l ? c(!1) : (p(!0), c(!0)) : k === "CLOSE" && c(!s);
  }, [s]);
  const h = { transform: `translateX(-${f}px)`, right: (((e = a.chatButtonStyle) == null ? void 0 : e.width) ?? 75) + 40, bottom: 30, backgroundColor: (t = i.general) == null ? void 0 : t.secondaryColor, color: "#fff", ...a.tooltipStyle }, b = { borderColor: `transparent transparent transparent ${h.backgroundColor}` };
  return E(oe, { children: !((n = i.general) != null && n.embedded) && E("div", { "data-testid": "chat-tooltip", style: h, className: "rcb-chat-tooltip " + (u ? "rcb-tooltip-show" : "rcb-tooltip-hide"), onClick: () => d(!0), children: [E("span", { children: (r = i.tooltip) == null ? void 0 : r.text }), E("span", { className: "rcb-chat-tooltip-tail", style: b })] }) });
}, As = ({ id: e, content: t, timeout: n }) => {
  var r, o;
  const { settings: i } = $(), { styles: a } = ae(), [A] = J({ toastPromptStyle: { ...a.toastPromptStyle }, toastPromptHoveredStyle: { ...a.toastPromptHoveredStyle } }), { dismissToast: s } = mt(), [d, u] = J(!1), c = { color: (r = i.general) == null ? void 0 : r.primaryColor, borderColor: (o = i.general) == null ? void 0 : o.primaryColor, ...A.toastPromptHoveredStyle };
  return ee(() => {
    if (n) {
      const l = setTimeout(() => {
        s(e);
      }, n);
      return () => clearTimeout(l);
    }
  }, [e, s, n]), typeof t == "string" ? E("div", { onMouseEnter: () => {
    u(!0);
  }, onMouseLeave: () => {
    u(!1);
  }, style: d ? c : A.toastPromptStyle, onMouseDown: async (l) => {
    var p;
    (p = i.toast) != null && p.dismissOnClick && (l.preventDefault(), await s(e));
  }, className: "rcb-toast-prompt", children: t }) : E(oe, { children: t });
}, ss = () => {
  var e, t, n, r, o, i, a, A, s, d, u, c;
  const { styles: l } = ae(), { toasts: p } = bi(), f = { bottom: `calc(${typeof ((e = l.footerStyle) == null ? void 0 : e.height) == "number" ? `${(t = l.footerStyle) == null ? void 0 : t.height}px` : ((n = l.footerStyle) == null ? void 0 : n.height) ?? "50px"} + ${typeof ((r = l.chatInputContainerStyle) == null ? void 0 : r.height) == "number" ? `${(o = l.chatInputContainerStyle) == null ? void 0 : o.height}px` : ((i = l.chatInputContainerStyle) == null ? void 0 : i.height) ?? "70px"} + 20px)`, width: 300, minWidth: `calc(${typeof ((a = l.chatWindowStyle) == null ? void 0 : a.width) == "number" ? `${(A = l.chatWindowStyle) == null ? void 0 : A.width}px` : ((s = l.chatWindowStyle) == null ? void 0 : s.width) ?? "375px"} / 2)`, maxWidth: `calc(${typeof ((d = l.chatWindowStyle) == null ? void 0 : d.width) == "number" ? `${(u = l.chatWindowStyle) == null ? void 0 : u.width}px` : ((c = l.chatWindowStyle) == null ? void 0 : c.width) ?? "375px"} - 50px)`, ...l.toastPromptContainerStyle };
  return E("div", { className: "rcb-toast-prompt-container", style: f, children: p.map((m) => E(As, { id: m.id, content: m.content, timeout: m.timeout }, m.id)) });
}, wi = ({ file: e, fileType: t, fileUrl: n }) => {
  var r, o, i;
  const { settings: a } = $(), { styles: A } = ae(), s = { backgroundColor: (r = a.general) == null ? void 0 : r.primaryColor, maxWidth: (o = a.userBubble) != null && o.showAvatar ? "65%" : "70%", ...A.mediaDisplayContainerStyle };
  return E(oe, { children: n ? E(oe, { children: [t === "image" && n && E("div", { style: s, className: "rcb-media-display-image-container rcb-media-entry", "data-testid": "media-display-image-container", children: E("img", { src: n, alt: "Image Display", className: "rcb-media-display-image" }) }), t === "video" && n && E("div", { style: s, className: "rcb-media-display-video-container rcb-media-entry", "data-testid": "media-display-video-container", children: E("video", { controls: !0, className: "rcb-media-display-video", children: [E("source", { src: n, type: e.type }), "Your browser does not support the video tag."] }) }), t === "audio" && n && E("audio", { "data-testid": "media-display-audio-container", style: { maxWidth: (i = a.userBubble) != null && i.showAvatar ? "65%" : "70%" }, controls: !0, className: "rcb-media-display-audio rcb-media-entry", children: [E("source", { src: n, type: e.type }), "Your browser does not support the audio tag."] })] }) : E(oe, {}) });
}, xi = async (e) => {
  if (!e) return { fileType: null, fileUrl: null };
  const t = e.type.split("/")[0];
  if (!["image", "video", "audio"].includes(t)) return { fileType: null, fileUrl: null };
  try {
    return { fileType: t, fileUrl: await new Promise((n, r) => {
      const o = new FileReader();
      o.onload = () => n(o.result), o.onerror = () => r(new Error("File reading failed")), o.readAsDataURL(e);
    }) };
  } catch (n) {
    return console.error(n), { fileType: null, fileUrl: null };
  }
}, ls = () => {
  var e, t, n, r, o, i;
  const { settings: a } = $(), { styles: A } = ae(), { injectMessage: s, simulateStreamMessage: d, streamMessage: u, removeMessage: c, endStreamMessage: l } = at(), { getCurrPath: p, getPrevPath: f, goToPath: m, blockAllowsAttachment: h } = sn(), { flowRef: b, inputRef: w } = me(), g = b.current, { showToast: x, dismissToast: k } = mt(), { dispatchRcbEvent: P } = Fe(), { toggleChatWindow: S } = Ie(), { setTextAreaValue: I } = gt(), { handleSubmitText: D } = yt(), B = { cursor: `url("${(e = a.general) == null ? void 0 : e.actionDisabledIcon}"), auto`, ...A.fileAttachmentButtonStyle, ...A.fileAttachmentButtonDisabledStyle }, Q = { backgroundImage: `url(${(t = a.fileAttachment) == null ? void 0 : t.icon})`, fill: "#a6a6a6", ...A.fileAttachmentIconStyle }, C = { backgroundImage: `url(${(n = a.fileAttachment) == null ? void 0 : n.icon})`, fill: "#a6a6a6", ...A.fileAttachmentIconStyle, ...A.fileAttachmentIconDisabledStyle };
  return E("label", { "aria-label": ((r = a.ariaLabel) == null ? void 0 : r.fileAttachmentButton) ?? "upload file", role: "button", className: h ? "rcb-attach-button-enabled" : "rcb-attach-button-disabled", style: h ? { ...A.fileAttachmentButtonStyle } : B, children: [E("input", { className: "rcb-attach-input", role: "file", type: "file", onChange: async (M) => {
    var L, H, F, R;
    const _ = M.target.files;
    if (!_) return;
    const y = Array.from(_);
    if (M.target.value = "", (L = a.event) != null && L.rcbUserUploadFile && (await P(U.USER_UPLOAD_FILE, { files: y })).defaultPrevented) return;
    const Y = p();
    if (!Y) return;
    const v = g[Y];
    if (!v) return;
    const j = v.file;
    if (j != null) {
      const q = [];
      for (let X = 0; X < y.length; X++) {
        if (q.push(y[X].name), (H = a.fileAttachment) == null || !H.showMediaDisplay) continue;
        const te = await xi(y[X]);
        !te.fileType || !te.fileUrl || await s(E(wi, { file: y[X], fileType: te.fileType, fileUrl: te.fileUrl }), "USER");
      }
      await D("📄 " + q.join(", "), (F = a.fileAttachment) == null ? void 0 : F.sendFileName), await j({ userInput: (R = w.current) == null ? void 0 : R.value, prevPath: f(), currPath: p(), goToPath: m, setTextAreaValue: I, injectMessage: s, simulateStreamMessage: d, streamMessage: u, removeMessage: c, endStreamMessage: l, toggleChatWindow: S, showToast: x, dismissToast: k, files: y });
    }
  }, multiple: (o = a.fileAttachment) == null ? void 0 : o.multiple, accept: (i = a.fileAttachment) == null ? void 0 : i.accept, disabled: !h }), (() => {
    var M, L;
    const H = h ? (M = a.fileAttachment) == null ? void 0 : M.icon : (L = a.fileAttachment) == null ? void 0 : L.iconDisabled;
    return H && typeof H != "string" ? H && E("span", { className: h ? "rcb-attach-icon-enabled" : "rcb-attach-icon-disabled", children: E(H, { style: h ? Q : C }) }) : E("span", { className: h ? "rcb-attach-icon-enabled" : "rcb-attach-icon-disabled", style: h ? Q : C });
  })()] });
}, cs = () => {
  var e, t, n, r, o, i;
  const { settings: a } = $(), { styles: A } = ae(), { syncedTextAreaDisabledRef: s } = ye(), { inputRef: d } = me(), { textAreaDisabled: u, setTextAreaValue: c } = gt(), l = ie(null), p = ie(null), [f, m] = J(!1), h = { cursor: `url("${(e = a.general) == null ? void 0 : e.actionDisabledIcon}"), auto`, ...A.emojiButtonStyle, ...A.emojiButtonDisabledStyle }, b = { backgroundImage: `url(${(t = a.emoji) == null ? void 0 : t.icon})`, fill: "#a6a6a6", ...A.emojiIconStyle }, w = { backgroundImage: `url(${(n = a.emoji) == null ? void 0 : n.icon})`, fill: "#a6a6a6", ...A.emojiIconStyle, ...A.emojiIconDisabledStyle };
  return ee(() => {
    const g = (k) => {
      const P = k.composedPath();
      l.current && !P.includes(l.current) && p.current && !P.includes(p.current) && m(!1);
    }, x = () => {
      (() => {
        if (l.current && p.current) {
          const k = p.current.getBoundingClientRect(), P = l.current.offsetHeight, S = k.top - P - 8;
          l.current.style.left = `${k.left}px`, l.current.style.top = `${S}px`;
        }
      })();
    };
    return document.addEventListener("mousedown", g), window.addEventListener("resize", x), () => {
      document.removeEventListener("mousedown", g), window.removeEventListener("resize", x);
    };
  }, []), E(oe, { children: [E("div", { "aria-label": ((r = a.ariaLabel) == null ? void 0 : r.emojiButton) ?? "emoji picker", role: "button", ref: p, className: u ? "rcb-emoji-button-disabled" : "rcb-emoji-button-enabled", style: u ? h : { ...A.emojiButtonStyle }, onMouseDown: (g) => {
    g.preventDefault(), s.current ? m(!1) : m((x) => !x);
  }, children: (() => {
    var g, x;
    const k = u ? (g = a.emoji) == null ? void 0 : g.iconDisabled : (x = a.emoji) == null ? void 0 : x.icon;
    return k && typeof k != "string" ? k && E("span", { className: u ? "rcb-emoji-icon-disabled" : "rcb-emoji-icon-enabled", children: E(k, { style: u ? w : b }) }) : E("span", { className: u ? "rcb-emoji-icon-disabled" : "rcb-emoji-icon-enabled", style: u ? w : b });
  })() }), f && E("div", { className: "rcb-emoji-button-popup", ref: l, children: (i = (o = a.emoji) == null ? void 0 : o.list) == null ? void 0 : i.map((g, x) => E("span", { className: "rcb-emoji", onMouseDown: (k) => ((P, S) => {
    P.preventDefault(), d.current && (c(d.current.value + S), setTimeout(() => {
      const I = d.current;
      if (I) {
        I.focus();
        const D = I.value.length;
        I.setSelectionRange(D, D);
      }
    }, 50)), m(!1);
  })(k, g), children: g }, x)) })] });
}, us = () => {
  var e, t, n;
  const { settings: r } = $(), { styles: o } = ae(), { audioToggledOn: i, toggleAudio: a } = yi(), A = { backgroundImage: `url(${(e = r.audio) == null ? void 0 : e.icon})`, fill: "#fcec3d", ...o.audioIconStyle }, s = { backgroundImage: `url(${(t = r.audio) == null ? void 0 : t.iconDisabled})`, fill: "#e8eaed", ...o.audioIconStyle, ...o.audioIconDisabledStyle };
  return E("div", { "aria-label": ((n = r.ariaLabel) == null ? void 0 : n.audioButton) ?? "toggle audio", role: "button", onMouseDown: async (d) => {
    d.preventDefault(), await a();
  }, style: i ? { ...o.audioButtonStyle } : { ...o.audioButtonStyle, ...o.audioButtonDisabledStyle }, children: (() => {
    var d, u;
    const c = i ? (d = r.audio) == null ? void 0 : d.icon : (u = r.audio) == null ? void 0 : u.iconDisabled;
    return c && typeof c != "string" ? c && E("span", { className: "rcb-audio-icon", "data-testid": "rcb-audio-icon", children: E(c, { style: i ? A : s, "data-testid": "rcb-audio-icon-svg" }) }) : E("span", { className: "rcb-audio-icon", "data-testid": "rcb-audio-icon", style: i ? A : s });
  })() });
}, ds = () => {
  var e, t;
  const { settings: n } = $(), { styles: r } = ae(), { toggleChatWindow: o } = Ie(), i = { backgroundImage: `url(${(e = n.header) == null ? void 0 : e.closeChatIcon})`, fill: "#e8eaed", stroke: "#e8eaed", ...r.closeChatIconStyle };
  return E("div", { "aria-label": ((t = n.ariaLabel) == null ? void 0 : t.closeChatButton) ?? "close chat", role: "button", onMouseDown: (a) => {
    a.stopPropagation(), o(!1);
  }, style: { ...r.closeChatButtonStyle }, children: (() => {
    var a;
    const A = (a = n.header) == null ? void 0 : a.closeChatIcon;
    return A && typeof A != "string" ? A && E("span", { className: "rcb-close-chat-icon", "data-testid": "rcb-close-chat-icon", children: E(A, { style: i }) }) : E("span", { className: "rcb-close-chat-icon", "data-testid": "rcb-close-chat-icon", style: i });
  })() });
}, ps = () => {
  var e, t, n;
  const { settings: r } = $(), { styles: o } = ae(), { notificationsToggledOn: i, toggleNotifications: a } = (() => {
    const { notificationsToggledOn: d, toggleNotifications: u, playNotificationSound: c } = lr();
    return { notificationsToggledOn: d, toggleNotifications: u, playNotificationSound: c };
  })(), A = { backgroundImage: `url(${(e = r.notification) == null ? void 0 : e.icon})`, fill: "#fcec3d", ...o.notificationIconStyle }, s = { backgroundImage: `url(${(t = r.notification) == null ? void 0 : t.iconDisabled})`, fill: "#e8eaed", ...o.notificationIconStyle, ...o.notificationIconDisabledStyle };
  return E("div", { "aria-label": ((n = r.ariaLabel) == null ? void 0 : n.notificationButton) ?? "toggle notifications", role: "button", onMouseDown: async (d) => {
    d.preventDefault(), await a();
  }, style: i ? { ...o.notificationButtonStyle } : { ...o.notificationButtonStyle, ...o.notificationButtonDisabledStyle }, children: (() => {
    var d, u;
    const c = i ? (d = r.notification) == null ? void 0 : d.icon : (u = r.notification) == null ? void 0 : u.iconDisabled;
    return c && typeof c != "string" ? c && E("span", { className: "rcb-notification-icon", "data-testid": "rcb-notification-icon", children: E(c, { style: i ? A : s, "data-testid": "rcb-notification-icon-svg" }) }) : E("span", { className: "rcb-notification-icon", "data-testid": "rcb-notification-icon", style: i ? A : s });
  })() });
}, fs = () => {
  var e, t, n;
  const { settings: r } = $(), { styles: o } = ae(), { injectMessage: i } = at(), { inputRef: a } = me(), { voiceToggledOn: A, toggleVoice: s } = dr(), { setInputLength: d, setTextAreaValue: u, textAreaDisabled: c } = gt(), { handleSubmitText: l } = yt(), p = ie([]), [f, m] = J(!1);
  ee(() => {
    var x;
    (x = r.voice) != null && x.sendAsAudio ? (g(), p.current = []) : l();
  }, [f]), ee(() => {
    A ? ((x, k, P, S, I, D, B) => {
      var Q;
      (Q = x.voice) != null && Q.sendAsAudio ? ts(P, D) : es(x, k, P, S, I, B);
    })(r, s, w, u, d, p, a) : ur();
  }, [A]);
  const h = { backgroundImage: `url(${(e = r.voice) == null ? void 0 : e.icon})`, fill: "#9aa0a6", ...o.voiceIconStyle }, b = { backgroundImage: `url(${(t = r.voice) == null ? void 0 : t.iconDisabled})`, fill: "#9aa0a6", ...o.voiceIconStyle, ...o.voiceIconDisabledStyle }, w = () => {
    m((x) => !x);
  }, g = async () => {
    const x = new Blob(p.current, { type: "audio/wav" }), k = new File([x], "voice-input.wav", { type: "audio/wav" }), P = await xi(k);
    !P.fileType || !P.fileUrl || await i(E(wi, { file: k, fileType: P.fileType, fileUrl: P.fileUrl }), "USER");
  };
  return E("div", { "aria-label": ((n = r.ariaLabel) == null ? void 0 : n.voiceButton) ?? "toggle voice", role: "button", onMouseDown: async (x) => {
    x.preventDefault(), !c && await s();
  }, style: A && !c ? { ...o.voiceButtonStyle } : { ...o.voiceButtonStyle, ...o.voiceButtonDisabledStyle }, className: A && !c ? "rcb-voice-button-enabled" : "rcb-voice-button-disabled", children: (() => {
    var x, k;
    const P = A ? (x = r.voice) == null ? void 0 : x.icon : (k = r.voice) == null ? void 0 : k.iconDisabled;
    return P && typeof P != "string" ? P && E("span", { className: "rcb-voice-icon " + (A && !c ? "on" : ""), children: E(P, { style: A && !c ? h : b }) }) : E("span", { className: "rcb-voice-icon" + (A && !c ? "-on" : ""), "data-testid": "rcb-voice-icon", style: A && !c ? h : b });
  })() });
}, hs = () => {
  var e, t, n, r, o, i, a, A;
  const { settings: s } = $(), { styles: d } = ae(), { textAreaDisabled: u } = ye(), [c, l] = J(!1), { handleSubmitText: p } = yt(), f = { backgroundColor: (e = s.general) == null ? void 0 : e.primaryColor, ...d.sendButtonStyle }, m = { cursor: `url("${(t = s.general) == null ? void 0 : t.actionDisabledIcon}"), auto`, backgroundColor: (n = s.general) == null ? void 0 : n.primaryColor, ...d.sendButtonStyle, ...d.sendButtonDisabledStyle }, h = { backgroundColor: (r = s.general) == null ? void 0 : r.secondaryColor, ...d.sendButtonStyle, ...d.sendButtonHoveredStyle }, b = { backgroundImage: `url(${(o = s.chatInput) == null ? void 0 : o.sendButtonIcon})`, fill: "#fff", ...d.sendIconStyle }, w = { backgroundImage: `url(${(i = s.chatInput) == null ? void 0 : i.sendButtonIcon})`, fill: "#fff", ...d.sendIconStyle, ...d.sendIconDisabledStyle }, g = { backgroundImage: `url(${(a = s.chatInput) == null ? void 0 : a.sendButtonIcon})`, fill: "#fff", ...d.sendIconStyle, ...d.sendIconHoveredStyle };
  return E("div", { "aria-label": ((A = s.ariaLabel) == null ? void 0 : A.sendButton) ?? "send message", role: "button", onMouseEnter: () => {
    l(!0);
  }, onMouseLeave: () => {
    l(!1);
  }, onMouseDown: async (x) => {
    x == null || x.preventDefault(), !u && await p();
  }, style: u ? m : c ? h : f, className: "rcb-send-button", children: (() => {
    var x;
    const k = (x = s.chatInput) == null ? void 0 : x.sendButtonIcon;
    return k && typeof k != "string" ? k && E("span", { className: "rcb-send-icon", "data-testid": "rcb-send-icon", children: E(k, { style: u ? w : c ? g : b }) }) : E("span", { className: "rcb-send-icon", "data-testid": "rcb-send-icon", style: u ? w : c ? g : b });
  })() });
}, gs = (e, t) => {
  var n, r, o, i, a, A, s, d, u;
  const c = { [de.AUDIO_BUTTON]: (n = e.audio) == null ? void 0 : n.disabled, [de.CLOSE_CHAT_BUTTON]: (r = e.general) == null ? void 0 : r.embedded, [de.EMOJI_PICKER_BUTTON]: (o = e.emoji) == null ? void 0 : o.disabled, [de.FILE_ATTACHMENT_BUTTON]: (i = e.fileAttachment) == null ? void 0 : i.disabled, [de.NOTIFICATION_BUTTON]: (a = e.notification) == null ? void 0 : a.disabled, [de.SEND_MESSAGE_BUTTON]: !1, [de.VOICE_MESSAGE_BUTTON]: (A = e.voice) == null ? void 0 : A.disabled }, l = {}, p = (f) => f ? f.map((m) => {
    if (typeof m == "string") {
      if (((h) => Object.values(de).includes(h))(m) && !c[m]) {
        if (l[m]) return l[m];
        const h = t[m];
        if (typeof h == "function") {
          const b = h();
          return l[m] = b, b;
        }
        return null;
      }
      return null;
    }
    return m;
  }).filter((m) => m !== null) : [];
  return { header: p((s = e.header) == null ? void 0 : s.buttons), chatInput: p((d = e.chatInput) == null ? void 0 : d.buttons), footer: p((u = e.footer) == null ? void 0 : u.buttons) };
}, ms = () => {
  const { settings: e } = $(), t = ke(() => ({ [de.CLOSE_CHAT_BUTTON]: () => E(ds, {}), [de.AUDIO_BUTTON]: () => E(us, {}), [de.NOTIFICATION_BUTTON]: () => E(ps, {}), [de.EMOJI_PICKER_BUTTON]: () => E(cs, {}), [de.FILE_ATTACHMENT_BUTTON]: () => E(ls, {}), [de.SEND_MESSAGE_BUTTON]: () => E(hs, {}), [de.VOICE_MESSAGE_BUTTON]: () => E(fs, {}) }), []), { header: n, chatInput: r, footer: o } = ke(() => gs(e, t), [e, t]);
  return { headerButtons: ke(() => n, [n]), chatInputButtons: ke(() => r, [r]), footerButtons: ke(() => o, [o]) };
}, pr = () => {
  const { settings: e } = $(), { styles: t } = ae(), { setSyncedMessages: n, syncedMessagesRef: r } = Ar(), { isLoadingChatHistory: o, setIsLoadingChatHistory: i, hasChatHistoryLoaded: a, setHasChatHistoryLoaded: A } = ye(), { chatBodyRef: s } = me(), { dispatchRcbEvent: d } = Fe(), u = G(async () => {
    var c, l;
    const p = sr();
    if (!p || (c = e.event) != null && c.rcbLoadChatHistory && (await d(U.LOAD_CHAT_HISTORY, {})).defaultPrevented) return;
    i(!0);
    const f = ((l = s.current) == null ? void 0 : l.scrollHeight) ?? 0;
    ((m, h, b, w, g, x, k, P, S) => {
      var I;
      if (fi = !0, b != null) try {
        const D = $e(E(YA, {}), "SYSTEM"), B = g.current.slice(1);
        w([D, ...B]);
        const Q = b.map((C) => {
          if (C.type === "object") {
            const M = mi(C.content, m, h);
            return { ...C, content: M };
          }
          return C;
        });
        setTimeout(() => {
          var C;
          const M = g.current.slice(1);
          let L = (C = m.chatHistory) != null && C.autoLoad ? $e(E(oe, {}), "SYSTEM") : $e(E(GA, {}), "SYSTEM");
          w([...Q, L, ...M]), S(!0);
        }, 500), setTimeout(() => {
          if (!x.current) return;
          const { scrollHeight: C } = x.current, M = C - k;
          x.current.scrollTop += M, P(!1);
        }, 510);
      } catch {
        nt.removeItem((I = m.chatHistory) == null ? void 0 : I.storageKey);
      }
    })(e, t, p, n, r, s, f, i, A);
  }, [e, t, d, r, s, i, A]);
  return { isLoadingChatHistory: o, setIsLoadingChatHistory: i, hasChatHistoryLoaded: a, showChatHistory: u };
}, ys = () => {
  var e, t, n;
  const { settings: r } = $(), { styles: o } = ae(), { showChatHistory: i } = pr(), [a, A] = J(!1), s = { color: (e = r.general) == null ? void 0 : e.primaryColor, borderColor: (t = r.general) == null ? void 0 : t.primaryColor, ...o.chatHistoryButtonStyle, ...o.chatHistoryButtonHoveredStyle };
  return E("div", { className: "rcb-view-history-container", children: E("div", { onMouseEnter: () => {
    A(!0);
  }, onMouseLeave: () => {
    A(!1);
  }, style: a ? s : { ...o.chatHistoryButtonStyle }, onMouseDown: (d) => {
    d.preventDefault(), i();
  }, className: "rcb-view-history-button", role: "button", tabIndex: 0, children: E("p", { children: (n = r.chatHistory) == null ? void 0 : n.viewChatHistoryButtonText }) }) });
}, vs = () => {
  var e, t, n, r;
  const o = ln(), { settings: i } = $(), { replaceMessages: a } = at(), { isBotTyping: A, isChatWindowOpen: s, setUnreadCount: d, setSyncedIsChatWindowOpen: u, setSyncedTextAreaDisabled: c, setSyncedAudioToggledOn: l, setSyncedVoiceToggledOn: p, setSyncedIsScrolling: f, syncedIsScrollingRef: m, syncedIsChatWindowOpenRef: h } = ye(), { chatBodyRef: b } = me(), { viewportHeight: w, setViewportHeight: g, setViewportWidth: x, scrollToBottom: k } = Ie(), { setUpNotifications: P } = lr(), { handleFirstInteraction: S } = (() => {
    var Q;
    const { settings: C } = $(), { hasInteractedPage: M, setHasInteractedPage: L, hasFlowStarted: H, setHasFlowStarted: F } = ye(), R = G(() => {
      var _;
      if (L(!0), !H && ((_ = C.general) == null ? void 0 : _.flowStartTrigger) === "ON_PAGE_INTERACT" && F(!0), !window.SpeechSynthesisUtterance) return void console.info("Speech Synthesis API is not supported in this environment.");
      const y = new window.SpeechSynthesisUtterance();
      y.text = "", y.onend = () => {
        window.removeEventListener("click", R), window.removeEventListener("keydown", R), window.removeEventListener("touchstart", R);
      }, window.speechSynthesis.speak(y);
    }, [H, (Q = C.general) == null ? void 0 : Q.flowStartTrigger]);
    return { hasInteractedPage: M, handleFirstInteraction: R };
  })(), { showChatHistory: I } = pr(), D = ie(0), B = ie(!1);
  ee(() => (window.addEventListener("click", S), window.addEventListener("keydown", S), window.addEventListener("touchstart", S), () => {
    window.removeEventListener("click", S), window.removeEventListener("keydown", S), window.removeEventListener("touchstart", S);
  }), []), ee(() => {
    const Q = b.current;
    if (!Q) return;
    const C = () => {
      B.current || (B.current = !0, requestAnimationFrame(() => {
        var M, L;
        if (!Q) return;
        const { scrollTop: H, clientHeight: F, scrollHeight: R } = Q, _ = H + F < R - (((M = i.chatWindow) == null ? void 0 : M.messagePromptOffset) ?? 30);
        f(_), m.current = _, _ || (H + F >= R - 1 && (Q.scrollTop = R - F - 1), (h.current || (L = i.general) != null && L.embedded) && d(0)), B.current = !1;
      }));
    };
    return Q.addEventListener("wheel", C, { passive: !0 }), Q.addEventListener("touchmove", C, { passive: !0 }), () => {
      Q.removeEventListener("wheel", C), Q.removeEventListener("touchmove", C);
    };
  }, []), ee(() => {
    var Q, C, M;
    c((Q = i.chatInput) == null ? void 0 : Q.disabled), u((C = i.chatWindow) == null ? void 0 : C.defaultOpen), l((M = i.audio) == null ? void 0 : M.defaultToggledOn), setTimeout(() => {
      var L;
      p((L = i.voice) == null ? void 0 : L.defaultToggledOn);
    }, 1);
  }, []), ee(() => {
    var Q;
    (Q = i.notification) != null && Q.disabled || P();
  }, [(e = i.notification) == null ? void 0 : e.disabled]), ee(() => {
    !m.current && b != null && b.current && k();
  }, [A]), ee(() => {
    var Q, C;
    if ((Q = i.chatHistory) != null && Q.disabled) nt && nt.removeItem(en);
    else if (Gn(i), sr().length > 0) {
      const M = $e(E(ys, {}), "SYSTEM");
      a([M]), (C = i.chatHistory) != null && C.autoLoad && I();
    }
  }, [(t = i.chatHistory) == null ? void 0 : t.storageKey, (n = i.chatHistory) == null ? void 0 : n.maxEntries, (r = i.chatHistory) == null ? void 0 : r.disabled]), ee(() => {
    var Q;
    o || (Q = i.general) != null && Q.embedded || !navigator.virtualKeyboard || (navigator.virtualKeyboard.overlaysContent = !0, navigator.virtualKeyboard.addEventListener("geometrychange", (C) => {
      if (!C.target) return;
      const { x: M, y: L, width: H, height: F } = C.target.boundingRect;
      M == 0 && L == 0 && H == 0 && F == 0 ? (setTimeout(() => {
        var R;
        g((R = window.visualViewport) == null ? void 0 : R.height);
      }, 101), setTimeout(() => {
        var R, _;
        w != ((R = window.visualViewport) == null ? void 0 : R.height) && g((_ = window.visualViewport) == null ? void 0 : _.height);
      }, 1001)) : setTimeout(() => {
        var R;
        g(((R = window.visualViewport) == null ? void 0 : R.height) - F);
      }, 101);
    }));
  }, [o]), ee(() => {
    var Q, C, M, L;
    if (o) return;
    s && (g((Q = window.visualViewport) == null ? void 0 : Q.height), x((C = window.visualViewport) == null ? void 0 : C.width));
    const H = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" }), F = () => D.current = window.scrollY, R = () => {
      var y, Y;
      g((y = window.visualViewport) == null ? void 0 : y.height), x((Y = window.visualViewport) == null ? void 0 : Y.width);
    }, _ = () => {
      var y;
      window.removeEventListener("scroll", H), window.removeEventListener("scroll", F), (y = window.visualViewport) == null || y.removeEventListener("resize", R);
    };
    return s ? (_(), document.body.style.position = "fixed", window.addEventListener("scroll", H), (M = window.visualViewport) == null || M.addEventListener("resize", R)) : (document.body.style.position = "static", _(), window.scrollTo({ top: D.current, left: 0, behavior: "auto" }), window.addEventListener("scroll", F), (L = window.visualViewport) == null || L.removeEventListener("resize", R)), _;
  }, [s, o]);
}, bs = "https://cdn.jsdelivr.net/gh/react-chatbotify/community-themes/themes", ws = "2592000", Wr = "RCB_THEME_CACHE_DATA", qr = async (e, t) => {
  const { id: n, version: r, baseUrl: o = bs, cacheDuration: i = ws } = t, a = r || await (async (b, w) => {
    const g = `${w}/${b}/meta.json`;
    try {
      const x = await fetch(g);
      return x.ok ? (await x.json()).version : (console.error(`Failed to fetch meta.json from ${g}`), null);
    } catch (x) {
      return console.error(`Failed to fetch meta.json from ${g}`, x), null;
    }
  })(n, o);
  if (!a) return console.error(`Unable to find version for theme: ${n}`), { settings: {}, inlineStyles: {}, cssStylesText: "" };
  const A = ((b, w, g) => {
    const x = localStorage.getItem(`${Wr}_${b}_${w}`);
    if (!x) return null;
    try {
      const k = JSON.parse(x), P = (/* @__PURE__ */ new Date()).getTime(), S = Math.floor(P / 1e3);
      return k.cacheDate + g >= S ? k : null;
    } catch (k) {
      return console.error(`Unable to fetch cache for ${b}`, k), null;
    }
  })(n, a, i);
  if (A) {
    const b = Vr(e, A.cssStylesText);
    return { settings: A.settings, inlineStyles: A.inlineStyles, cssStylesText: b };
  }
  const s = `${o}/${n}/${a}/styles.css`, d = `${o}/${n}/${a}/settings.json`, u = `${o}/${n}/${a}/styles.json`;
  let c = "";
  const l = await fetch(s);
  l.ok ? c = await l.text() : console.info(`Could not fetch styles.css from ${s}`);
  const p = await fetch(d);
  let f = {};
  p.ok ? f = await p.json() : console.info(`Could not fetch settings.json from ${d}`);
  const m = await fetch(u);
  let h = {};
  return m.ok ? h = await m.json() : console.info(`Could not fetch styles.json from ${u}`), ((b, w, g, x, k) => {
    const P = (/* @__PURE__ */ new Date()).getTime(), S = { settings: g, inlineStyles: x, cssStylesText: k, cacheDate: Math.floor(P / 1e3) };
    localStorage.setItem(`${Wr}_${b}_${w}`, JSON.stringify(S));
  })(n, a, f, h, c), { settings: f, inlineStyles: h, cssStylesText: Vr(e, c) };
}, Vr = (e, t) => t.split(new RegExp("(?<=})")).map((n) => {
  const r = n.trim();
  return r.startsWith("@import") || r.startsWith("@keyframes") || r.startsWith("@media") ? r : r ? `#${e} ${r}` : "";
}).join(`
`), xs = async (e, t, n, r) => {
  var o, i;
  let a = tn(oi), A = tn(ai), s = "";
  if (r != null) if (Array.isArray(r)) for (const d of r) {
    const u = await qr(e, d);
    a = je(u.settings, a), A = je(u.inlineStyles, A), s += u.cssStylesText;
  }
  else {
    const d = await qr(e, r);
    a = je(d.settings, a), A = je(d.inlineStyles, A), s += d.cssStylesText;
  }
  return t != null && (a = je(t, a)), n != null && (A = je(n, A)), ((o = a.chatInput) == null ? void 0 : o.botDelay) != null && ((i = a.chatInput) == null ? void 0 : i.botDelay) < 500 && (a.chatInput.botDelay = 500), { settings: a, inlineStyles: A, cssStylesText: s };
}, je = (e, t) => {
  const n = [{ source: e, target: t }];
  for (; n.length; ) {
    const r = n.pop();
    if (r == null) continue;
    const { source: o, target: i } = r;
    for (const a of Object.keys(o)) {
      const A = a;
      if (ht(o[A])) i[A] = o[A];
      else if (typeof o[A] != "object" || o[A] === null || Array.isArray(o[A])) try {
        i[A] = o[A];
      } catch {
      }
      else (typeof i[A] != "object" || i[A] === null) && (i[A] = {}), n.push({ source: o[A], target: i[A] });
    }
  }
  return t;
}, tn = (e) => {
  if (e === null || typeof e != "object") return e;
  const t = Array.isArray(e) ? [] : {}, n = [{ source: e, target: t }], r = /* @__PURE__ */ new WeakMap();
  for (r.set(e, t); n.length; ) {
    const o = n.pop();
    if (o == null) continue;
    const { source: i, target: a } = o;
    for (const A in i) if (Object.prototype.hasOwnProperty.call(i, A)) {
      const s = i[A];
      if (s && typeof s == "object") if (r.has(s)) a[A] = r.get(s);
      else {
        const d = Array.isArray(s) ? [] : {};
        r.set(s, d), a[A] = d, n.push({ source: s, target: d });
      }
      else a[A] = s;
    }
  }
  return t;
}, Ei = () => {
  const { settings: e, setSettings: t } = $(), n = G((o) => {
    !o || Object.keys(o).length === 0 || t(tn(je(o, e)));
  }, [e]), r = G((o) => {
    t(o);
  }, []);
  return { settings: e, replaceSettings: r, updateSettings: n };
}, ki = () => {
  const { styles: e, setStyles: t } = ae(), n = G((o) => {
    !o || Object.keys(o).length === 0 || t(tn(je(o, e)));
  }, [e]), r = G((o) => {
    t(o);
  }, []);
  return { styles: e, replaceStyles: r, updateStyles: n };
}, Es = ({ plugins: e }) => {
  var t, n, r, o, i;
  const a = ln(), { settings: A } = $(), { styles: s } = ae(), { hasFlowStarted: d, setHasFlowStarted: u } = ye(), { inputRef: c } = me(), { viewportHeight: l, viewportWidth: p, isChatWindowOpen: f } = Ie(), { goToPath: m } = sn(), { headerButtons: h, chatInputButtons: b, footerButtons: w } = ms();
  vs(), ((P) => {
    const { updateSettings: S } = Ei(), { updateStyles: I } = ki(), D = P == null ? void 0 : P.map((B) => B());
    ee(() => {
      let B = {}, Q = {};
      D == null || D.forEach((C) => {
        C != null && C.settings && Object.keys(C == null ? void 0 : C.settings).length !== 0 && (B = je(C.settings, B)), C != null && C.styles && Object.keys(C == null ? void 0 : C.styles).length !== 0 && (Q = je(C.styles, Q));
      }), S(B), I(Q);
    }, []);
  })(e), ee(() => {
    var P;
    (d || ((P = A.general) == null ? void 0 : P.flowStartTrigger) === "ON_LOAD") && m("start");
  }, [d, (t = A.general) == null ? void 0 : t.flowStartTrigger]);
  const g = ke(() => {
    var P;
    const S = "rcb-chatbot-global ";
    return (P = A.general) != null && P.embedded ? S + "rcb-window-embedded" : f ? S + "rcb-window-open" : S + "rcb-window-close";
  }, [A, f]);
  return E(oe, { children: (a && ((x = A.device) == null ? void 0 : x.desktopEnabled) || !a && ((k = A.device) == null ? void 0 : k.mobileEnabled)) && E("div", { onMouseDown: (P) => {
    var S, I;
    !d && ((S = A.general) == null ? void 0 : S.flowStartTrigger) === "ON_CHATBOT_INTERACT" && u(!0), a ? (I = c.current) == null || I.blur() : P == null || P.preventDefault();
  }, className: g, children: [E(as, {}), E(is, {}), f && !a && !((n = A.general) != null && n.embedded) && E(oe, { children: [E("style", { children: `
									html {
										overflow: hidden !important;
										touch-action: none !important;
										scroll-behavior: auto !important;
									}
								` }), E("div", { style: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "#fff", zIndex: 9999 } })] }), E("div", { style: (() => {
    var P, S;
    return a || (P = A.general) != null && P.embedded ? (S = A.general) != null && S.embedded ? { ...s.chatWindowStyle } : { ...s.chatWindowStyle, zIndex: 1e4 } : { ...s.chatWindowStyle, borderRadius: "0px", left: "0px", right: "auto", top: "0px", bottom: "auto", width: `${p}px`, height: `${l}px`, zIndex: 1e4 };
  })(), className: "rcb-chat-window", children: [((r = A.general) == null ? void 0 : r.showHeader) && E(kA, { buttons: h }), E(MA, {}), E(ss, {}), ((o = A.general) == null ? void 0 : o.showInputRow) && E(rs, { buttons: b }), ((i = A.general) == null ? void 0 : i.showFooter) && E(os, { buttons: w })] })] }) });
  var x, k;
}, Pi = qe(void 0), Bi = () => He(Pi), Di = ({ children: e }) => {
  var t;
  const n = ie(""), r = ie({}), [o, i] = J({}), [a, A] = J({}), [s, d] = J(!1);
  return ee(() => {
    d(!0);
  }, []), s ? E("div", { style: { fontFamily: (t = o.general) == null ? void 0 : t.fontFamily }, children: E(Pi.Provider, { value: { loadConfig: async (u, c, l, p, f, m) => {
    n.current = u, r.current = c;
    const h = await xs(u, l, p, f);
    m.current && (m.current.textContent = h.cssStylesText), i(h.settings), A(h.inlineStyles);
  } }, children: E(xA, { settings: o, setSettings: i, children: E(EA, { styles: a, setStyles: A, children: E(ns, { children: E(PA, { botIdRef: n, flowRef: r, children: E(CA, { children: E(BA, { settings: o, children: E(IA, { children: e }) }) }) }) }) }) }) }) }) : null;
}, ks = ({ id: e, flow: t, settings: n, styles: r, themes: o, plugins: i, setConfigLoaded: a, styleRootRef: A }) => {
  const s = ke(() => e, []), d = Bi(), { flowRef: u } = me();
  return u && u.current !== t && (u.current = t), ee(() => {
    (async () => {
      var c, l;
      (c = n.event) != null && c.rcbPreLoadChatBot && (await jn(U.PRE_LOAD_CHATBOT, { botId: s, currPath: null, prevPath: null }, { flow: t, settings: n, styles: r, themes: o, plugins: i })).defaultPrevented || (d != null && d.loadConfig && (await d.loadConfig(s, t, n, r, o, A), a(!0)), (l = n.event) != null && l.rcbPostLoadChatBot && jn(U.POST_LOAD_CHATBOT, { botId: s, currPath: null, prevPath: null }, { flow: t, settings: n, styles: r, themes: o, plugins: i }));
    })();
  }, [o]), null;
}, mn = ["Quickstart", "API Docs", "Examples", "Github", "Discord"], Ps = { start: { message: "Hello, I am Tan Jin 👋! Welcome to React ChatBotify, I'm excited that you are using our chatbot 😊!", transition: { duration: 1e3 }, chatDisabled: !0, path: "show_options" }, show_options: { message: "It looks like you have not set up a conversation flow yet. No worries! Here are a few helpful things you can check out to get started:", options: mn, path: "process_options" }, prompt_again: { message: "Do you need any other help?", options: mn, path: "process_options" }, unknown_input: { message: "Sorry, I do not understand your message 😢! If you require further assistance, you may click on the Github option and open an issue there or visit our discord.", options: mn, path: "process_options" }, process_options: { transition: { duration: 0 }, path: (e) => {
  let t = "";
  switch (e.userInput) {
    case "Quickstart":
      t = "https://react-chatbotify.com/docs/introduction/quickstart/";
      break;
    case "API Docs":
      t = "https://react-chatbotify.com/docs/api/bot_options";
      break;
    case "Examples":
      t = "https://react-chatbotify.com/docs/examples/basic_form";
      break;
    case "Github":
      t = "https://github.com/react-chatbotify/react-chatbotify/";
      break;
    case "Discord":
      t = "https://discord.gg/6R4DK4G5Zh";
      break;
    default:
      return "unknown_input";
  }
  return e.injectMessage("Sit tight! I'll send you right there!"), setTimeout(() => {
    window.open(t);
  }, 1e3), "repeat";
} }, repeat: { transition: { duration: 3e3 }, path: "prompt_again" } }, Bs = ({ id: e, flow: t, settings: n, styles: r, themes: o, plugins: i }) => {
  const a = ke(() => e || "rcb-" + $t(), []), A = t && Object.keys(t).length !== 0 ? t : Ps, s = n || {}, d = r || {}, u = i || [], [c, l] = J(!1), p = Bi(), f = ie(null), [m, h] = J(o || []);
  ee(() => {
    o && h(o);
  }, [o]);
  const b = () => E(oe, { children: [E(ks, { styleRootRef: f, id: a, flow: A, settings: s, styles: d, themes: m, plugins: u, setConfigLoaded: l }), c && E(Es, { plugins: i })] });
  return E(p == null ? Di : oe, { children: [E("style", { ref: f }), E("div", { id: a, children: b() })] });
}, Ds = () => {
  const { getBotId: e } = (() => {
    const { botIdRef: t } = me();
    return { getBotId: G(() => t.current, [t]) };
  })();
  return { getBotId: e };
}, cn = () => {
  const { hasFlowStarted: e, restartFlow: t, getFlow: n } = (() => {
    const { replaceMessages: r } = at(), { replacePaths: o, goToPath: i } = sn(), { replaceToasts: a } = mt(), { hasFlowStarted: A } = ye(), { flowRef: s, timeoutIdRef: d } = me(), { settings: u } = $();
    return { hasFlowStarted: A, restartFlow: G(async () => {
      Gn(u), d.current && clearTimeout(d.current), r([]), a([]), o([]), await i("start");
    }, [d, u, r, a, o, Gn, i]), getFlow: G(() => (s == null ? void 0 : s.current) ?? {}, [s]) };
  })();
  return { hasFlowStarted: e, restartFlow: t, getFlow: n };
}, nn = () => {
  const { endStreamMessage: e, injectMessage: t, removeMessage: n, simulateStreamMessage: r, streamMessage: o, messages: i, replaceMessages: a } = at();
  return { endStreamMessage: e, injectMessage: t, removeMessage: n, simulateStreamMessage: r, streamMessage: o, messages: i, replaceMessages: a };
}, _e = (e, t) => {
  const { getBotId: n } = Ds();
  ee(() => {
    const r = (o) => {
      o.detail.botId === n() && t(o);
    };
    return window.addEventListener(e, r), () => {
      window.removeEventListener(e, r);
    };
  }, [n, e, t]);
}, Ci = () => {
  const { settings: e, replaceSettings: t, updateSettings: n } = Ei();
  return { settings: e, replaceSettings: t, updateSettings: n };
}, Si = () => {
  const { showChatHistory: e, hasChatHistoryLoaded: t } = pr();
  return { showChatHistory: e, getHistoryMessages: sr, setHistoryMessages: WA, hasChatHistoryLoaded: t };
}, Yn = { a: { content: 9, self: !1, type: 105 }, address: { invalid: ["h1", "h2", "h3", "h4", "h5", "h6", "address", "article", "aside", "section", "div", "header", "footer"], self: !1 }, audio: { children: ["track", "source"] }, br: { type: 9, void: !0 }, body: { content: 127 }, button: { content: 8, type: 105 }, caption: { content: 1, parent: ["table"] }, col: { parent: ["colgroup"], void: !0 }, colgroup: { children: ["col"], parent: ["table"] }, details: { children: ["summary"], type: 97 }, dd: { content: 1, parent: ["dl"] }, dl: { children: ["dt", "dd"], type: 1 }, dt: { content: 1, invalid: ["footer", "header"], parent: ["dl"] }, figcaption: { content: 1, parent: ["figure"] }, footer: { invalid: ["footer", "header"] }, header: { invalid: ["footer", "header"] }, hr: { type: 1, void: !0 }, img: { void: !0 }, li: { content: 1, parent: ["ul", "ol", "menu"] }, main: { self: !1 }, ol: { children: ["li"], type: 1 }, picture: { children: ["source", "img"], type: 25 }, rb: { parent: ["ruby", "rtc"] }, rp: { parent: ["ruby", "rtc"] }, rt: { content: 8, parent: ["ruby", "rtc"] }, rtc: { content: 8, parent: ["ruby"] }, ruby: { children: ["rb", "rp", "rt", "rtc"] }, source: { parent: ["audio", "video", "picture"], void: !0 }, summary: { content: 8, parent: ["details"] }, table: { children: ["caption", "colgroup", "thead", "tbody", "tfoot", "tr"], type: 1 }, tbody: { parent: ["table"], children: ["tr"] }, td: { content: 1, parent: ["tr"] }, tfoot: { parent: ["table"], children: ["tr"] }, th: { content: 1, parent: ["tr"] }, thead: { parent: ["table"], children: ["tr"] }, tr: { parent: ["table", "tbody", "thead", "tfoot"], children: ["th", "td"] }, track: { parent: ["audio", "video"], void: !0 }, ul: { children: ["li"], type: 1 }, video: { children: ["track", "source"] }, wbr: { type: 9, void: !0 } };
function ot(e) {
  return (t) => {
    Yn[t] = { ...e, ...Yn[t] };
  };
}
["address", "main", "div", "figure", "p", "pre"].forEach(ot({ content: 1, type: 65 })), ["abbr", "b", "bdi", "bdo", "cite", "code", "data", "dfn", "em", "i", "kbd", "mark", "q", "ruby", "samp", "strong", "sub", "sup", "time", "u", "var"].forEach(ot({ content: 8, type: 73 })), ["p", "pre"].forEach(ot({ content: 8, type: 65 })), ["s", "small", "span", "del", "ins"].forEach(ot({ content: 8, type: 9 })), ["article", "aside", "footer", "header", "nav", "section", "blockquote"].forEach(ot({ content: 1, type: 67 })), ["h1", "h2", "h3", "h4", "h5", "h6"].forEach(ot({ content: 8, type: 69 })), ["audio", "canvas", "iframe", "img", "video"].forEach(ot({ type: 89 }));
const Wn = Object.freeze(Yn), Cs = ["applet", "base", "body", "command", "embed", "frame", "frameset", "head", "html", "link", "meta", "noscript", "object", "script", "style", "title"], Ss = Object.keys(Wn).filter((e) => e !== "canvas" && e !== "iframe"), Xr = Object.freeze({ alt: 1, cite: 1, class: 1, colspan: 3, controls: 4, datetime: 1, default: 4, disabled: 4, dir: 1, height: 1, href: 1, id: 1, kind: 1, label: 1, lang: 1, loading: 1, loop: 4, media: 1, muted: 4, poster: 1, rel: 1, role: 1, rowspan: 3, scope: 1, sizes: 1, span: 3, start: 3, style: 5, src: 1, srclang: 1, srcset: 1, tabindex: 1, target: 1, title: 1, type: 1, width: 1 }), Is = Object.freeze({ class: "className", colspan: "colSpan", datetime: "dateTime", rowspan: "rowSpan", srclang: "srcLang", srcset: "srcSet", tabindex: "tabIndex" });
function rn() {
  return rn = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, rn.apply(this, arguments);
}
function Ii({ attributes: e = {}, className: t, children: n = null, selfClose: r = !1, tagName: o }) {
  const i = o;
  return r ? N.createElement(i, rn({ className: t }, e)) : N.createElement(i, rn({ className: t }, e), n);
}
class Ts {
  attribute(t, n) {
    return n;
  }
  node(t, n) {
    return n;
  }
}
function Qs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */
var Kr, Jr;
const _s = Qs(function() {
  if (Jr) return Kr;
  Jr = 1;
  var e = /["'&<>]/;
  return Kr = function(t) {
    var n = "" + t, r = e.exec(n);
    if (!r) return n;
    var o, i = "", a = 0, A = 0;
    for (a = r.index; a < n.length; a++) {
      switch (n.charCodeAt(a)) {
        case 34:
          o = "&quot;";
          break;
        case 38:
          o = "&amp;";
          break;
        case 39:
          o = "&#39;";
          break;
        case 60:
          o = "&lt;";
          break;
        case 62:
          o = "&gt;";
          break;
        default:
          continue;
      }
      A !== a && (i += n.substring(A, a)), A = a + 1, i += o;
    }
    return A !== a ? i + n.substring(A, a) : i;
  };
}());
function Xe(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
const Ms = /(url|image|image-set)\(/i;
class Os extends Ts {
  attribute(t, n) {
    return t === "style" && Object.keys(n).forEach((r) => {
      String(n[r]).match(Ms) && delete n[r];
    }), n;
  }
}
const Ls = /^<(!doctype|(html|head|body)(\s|>))/i, Ns = /^(aria-|data-|\w+:)/iu, Rs = /{{{(\w+)\/?}}}/;
function Hs() {
  if (!(typeof window > "u" || typeof document > "u")) return document.implementation.createHTMLDocument("Interweave");
}
class Ti {
  constructor(t, n = {}, r = [], o = []) {
    var i;
    Xe(this, "allowed", void 0), Xe(this, "banned", void 0), Xe(this, "blocked", void 0), Xe(this, "container", void 0), Xe(this, "content", []), Xe(this, "props", void 0), Xe(this, "matchers", void 0), Xe(this, "filters", void 0), Xe(this, "keyIndex", void 0), this.props = n, this.matchers = r, this.filters = [...o, new Os()], this.keyIndex = -1, this.container = this.createContainer(t || ""), this.allowed = new Set((i = n.allowList) !== null && i !== void 0 ? i : Ss), this.banned = new Set(Cs), this.blocked = new Set(n.blockList);
  }
  applyAttributeFilters(t, n) {
    return this.filters.reduce((r, o) => r !== null && typeof o.attribute == "function" ? o.attribute(t, r) : r, n);
  }
  applyNodeFilters(t, n) {
    return this.filters.reduce((r, o) => r !== null && typeof o.node == "function" ? o.node(t, r) : r, n);
  }
  applyMatchers(t, n) {
    const r = {}, { props: o } = this;
    let i = t, a = 0, A = null;
    return this.matchers.forEach((s) => {
      const d = s.asTag().toLowerCase(), u = this.getTagConfig(d);
      if (o[s.inverseName] || !this.isTagAllowed(d) || !this.canRenderChild(n, u)) return;
      let c = "";
      for (; i && (A = s.match(i)); ) {
        const { index: l, length: p, match: f, valid: m, void: h, ...b } = A, w = s.propName + String(a);
        l > 0 && (c += i.slice(0, l)), m ? (c += h ? `{{{${w}/}}}` : `{{{${w}}}}${f}{{{/${w}}}}`, this.keyIndex += 1, a += 1, r[w] = { children: f, matcher: s, props: { ...o, ...b, key: this.keyIndex } }) : c += f, s.greedy ? (i = c + i.slice(l + p), c = "") : i = i.slice(l + (p || f.length));
      }
      s.greedy || (i = c + i);
    }), a === 0 ? t : this.replaceTokens(i, r);
  }
  canRenderChild(t, n) {
    return !(!t.tagName || !n.tagName || t.void) && (t.children.length > 0 ? t.children.includes(n.tagName) : !(t.invalid.length > 0 && t.invalid.includes(n.tagName)) && (n.parent.length > 0 ? n.parent.includes(t.tagName) : !(!t.self && t.tagName === n.tagName) && !!(t && t.content & n.type)));
  }
  convertLineBreaks(t) {
    const { noHtml: n, disableLineBreaks: r } = this.props;
    if (n || r || t.match(/<((?:\/[ a-z]+)|(?:[ a-z]+\/))>/gi)) return t;
    let o = t.replace(/\r\n/g, `
`);
    return o = o.replace(/\n{3,}/g, `


`), o = o.replace(/\n/g, "<br/>"), o;
  }
  createContainer(t) {
    var n;
    const r = (typeof global < "u" && global.INTERWEAVE_SSR_POLYFILL || Hs)();
    if (!r) return;
    const o = (n = this.props.containerTagName) !== null && n !== void 0 ? n : "body", i = o === "body" || o === "fragment" ? r.body : r.createElement(o);
    return t.match(Ls) || (i.innerHTML = this.convertLineBreaks(this.props.escapeHtml ? _s(t) : t)), i;
  }
  extractAttributes(t) {
    const { allowAttributes: n } = this.props, r = {};
    let o = 0;
    return t.nodeType === 1 && t.attributes && ([...t.attributes].forEach((i) => {
      const { name: a, value: A } = i, s = a.toLowerCase(), d = Xr[s] || Xr[a];
      if (!this.isSafe(t) || !s.match(Ns) && (!n && (!d || d === 2) || s.startsWith("on") || A.replace(/(\s|\0|&#x0([9AD]);)/, "").match(/(javascript|vbscript|livescript|xss):/i))) return;
      let u = s === "style" ? this.extractStyleAttribute(t) : A;
      d === 4 ? u = !0 : d === 3 ? u = Number.parseFloat(String(u)) : d !== 5 && (u = String(u)), r[Is[s] || s] = this.applyAttributeFilters(s, u), o += 1;
    }), o !== 0) ? r : null;
  }
  extractStyleAttribute(t) {
    const n = {};
    return Array.from(t.style).forEach((r) => {
      const o = t.style[r];
      (typeof o == "string" || typeof o == "number") && (n[r.replace(/-([a-z])/g, (i, a) => String(a).toUpperCase())] = o);
    }), n;
  }
  getTagConfig(t) {
    const n = { children: [], content: 0, invalid: [], parent: [], self: !0, tagName: "", type: 0, void: !1 };
    return Wn[t] ? { ...n, ...Wn[t], tagName: t } : n;
  }
  isSafe(t) {
    if (typeof HTMLAnchorElement < "u" && t instanceof HTMLAnchorElement) {
      const n = t.getAttribute("href");
      if (n != null && n.startsWith("#")) return !0;
      const r = t.protocol.toLowerCase();
      return r === ":" || r === "http:" || r === "https:" || r === "mailto:" || r === "tel:";
    }
    return !0;
  }
  isTagAllowed(t) {
    return !this.banned.has(t) && !this.blocked.has(t) && (this.props.allowElements || this.allowed.has(t));
  }
  parse() {
    return this.container ? this.parseNode(this.container, this.getTagConfig(this.container.nodeName.toLowerCase())) : [];
  }
  parseNode(t, n) {
    const { noHtml: r, noHtmlExceptMatchers: o, allowElements: i, transform: a, transformOnlyAllowList: A } = this.props;
    let s = [], d = "";
    return [...t.childNodes].forEach((u) => {
      if (u.nodeType === 1) {
        const l = u.nodeName.toLowerCase(), p = this.getTagConfig(l);
        d && (s.push(d), d = "");
        const f = this.applyNodeFilters(l, u);
        if (!f) return;
        let m;
        if (a && (!A || this.isTagAllowed(l))) {
          this.keyIndex += 1;
          const h = this.keyIndex;
          m = this.parseNode(f, p);
          const b = a(f, m, p);
          if (b === null) return;
          if (typeof b < "u") return void s.push(N.cloneElement(b, { key: h }));
          this.keyIndex = h - 1;
        }
        if (this.banned.has(l)) return;
        if (r || o && l !== "br" || !this.isTagAllowed(l) || !i && !this.canRenderChild(n, p)) s = [...s, ...this.parseNode(f, p.tagName ? p : n)];
        else {
          var c;
          this.keyIndex += 1;
          const h = this.extractAttributes(f), b = { tagName: l };
          h && (b.attributes = h), p.void && (b.selfClose = p.void), s.push(N.createElement(Ii, { ...b, key: this.keyIndex }, (c = m) !== null && c !== void 0 ? c : this.parseNode(f, p)));
        }
      } else if (u.nodeType === 3) {
        const l = r && !o ? u.textContent : this.applyMatchers(u.textContent || "", n);
        Array.isArray(l) ? s = [...s, ...l] : d += l;
      }
    }), d && s.push(d), s;
  }
  replaceTokens(t, n) {
    if (!t.includes("{{{")) return t;
    const r = [];
    let o = t, i = null;
    for (; i = o.match(Rs); ) {
      const [a, A] = i, s = i.index, d = a.includes("/");
      s > 0 && (r.push(o.slice(0, s)), o = o.slice(s));
      const { children: u, matcher: c, props: l } = n[A];
      let p;
      if (d) p = a.length, r.push(c.createElement(u, l));
      else {
        const f = o.match(new RegExp(`{{{/${A}}}}`));
        p = f.index + f[0].length, r.push(c.createElement(this.replaceTokens(o.slice(a.length, f.index), n), l));
      }
      o = o.slice(p);
    }
    return o.length > 0 && r.push(o), r.length === 0 ? "" : r.length === 1 && typeof r[0] == "string" ? r[0] : r;
  }
}
function Fs(e) {
  var t;
  const { attributes: n, className: r, containerTagName: o, content: i, emptyContent: a, parsedContent: A, tagName: s, noWrap: d } = e, u = (t = o ?? s) !== null && t !== void 0 ? t : "span", c = u === "fragment" || d;
  let l;
  if (A) l = A;
  else {
    const p = new Ti(i ?? "", e).parse();
    p.length > 0 && (l = p);
  }
  return l || (l = a), c ? N.createElement(N.Fragment, null, l) : N.createElement(Ii, { attributes: n, className: r, tagName: u }, l);
}
function Us(e) {
  const { attributes: t, className: n, content: r = "", disableFilters: o = !1, disableMatchers: i = !1, emptyContent: a = null, filters: A = [], matchers: s = [], onAfterParse: d = null, onBeforeParse: u = null, tagName: c = "span", noWrap: l = !1, ...p } = e, f = i ? [] : s, m = o ? [] : A, h = u ? [u] : [], b = d ? [d] : [];
  f.forEach((k) => {
    k.onBeforeParse && h.push(k.onBeforeParse.bind(k)), k.onAfterParse && b.push(k.onAfterParse.bind(k));
  });
  const w = h.reduce((k, P) => P(k, e), r ?? ""), g = new Ti(w, p, f, m), x = b.reduce((k, P) => P(k, e), g.parse());
  return N.createElement(Fs, { attributes: t, className: n, containerTagName: e.containerTagName, emptyContent: a, noWrap: l, parsedContent: x.length === 0 ? void 0 : x, tagName: c });
}
const zs = ({ children: e }) => E(Us, { content: typeof e == "string" ? e : "" }), js = { autoConfig: !0 }, Zr = (e, t, n) => {
  var r;
  if (!e.detail.currPath) return !1;
  const o = t[e.detail.currPath];
  return !!o && (((r = o.renderHtml) == null ? void 0 : r.map((i) => i.toUpperCase()).includes(n)) ?? !1);
}, Gs = (e) => {
  const t = [];
  let n = "", r = !1;
  for (let o = 0; o < e.length; o++) {
    const i = e[o];
    i === "<" ? r ? (t.push(n), n = i) : (r = !0, n = i) : i === ">" ? (n += i, t.push(n), n = "", r = !1) : r ? n += i : t.push(i);
  }
  return n !== "" && t.push(n), t;
}, Ys = (e) => {
  const { getFlow: t } = cn(), { messages: n, replaceMessages: r } = nn(), { settings: o } = Ci(), { hasChatHistoryLoaded: i } = Si(), a = { ...e, ...js }, A = a.htmlComponent ? a.htmlComponent : zs;
  ee(() => {
    var u, c;
    if (i) {
      const l = [...n];
      for (let p = 0; p < l.length && p < (((u = o.chatHistory) == null ? void 0 : u.maxEntries) ?? 30); p++) {
        const f = l[p];
        (c = f.tags) != null && c.includes("rcb-html-renderer-plugin:parsed") && (f.contentWrapper = A);
      }
      r(l);
    }
  }, [i]);
  const s = async (u) => {
    var c;
    const l = (c = u.data.message) == null ? void 0 : c.sender.toUpperCase();
    typeof u.data.message.content == "string" && Zr(u, t(), l) && (u.type === "rcb-start-simulate-stream-message" && (u.data.simulateStreamChunker = Gs), u.data.message.contentWrapper = A, u.data.message.tags || (u.data.message.tags = []), u.data.message.tags.push("rcb-html-renderer-plugin:parsed"));
  };
  _e(U.PRE_INJECT_MESSAGE, s), _e(U.CHUNK_STREAM_MESSAGE, s), _e(U.START_STREAM_MESSAGE, s), _e(U.START_SIMULATE_STREAM_MESSAGE, s), _e(U.START_SPEAK_AUDIO, async (u) => {
    Zr(u, t(), "BOT") && (u.data.textToRead = ((c) => typeof window.DOMParser < "u" ? new DOMParser().parseFromString(c, "text/html").body.textContent || "" : c.replace(/<\/?[^>]+(>|$)/g, ""))(u.data.textToRead));
  });
  const d = { name: "@rcb-plugins/html-renderer" };
  return a != null && a.autoConfig && (d.settings = { event: { rcbPreInjectMessage: !0, rcbChunkStreamMessage: !0, rcbStartSimulateStreamMessage: !0, rcbStartStreamMessage: !0, rcbStartSpeakAudio: !0 } }), d;
}, Ws = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, qs = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, Vs = {};
function $r(e, t) {
  return (Vs.jsx ? qs : Ws).test(e);
}
const Xs = /[ \t\n\f\r]/g;
function eo(e) {
  return e.replace(Xs, "") === "";
}
class Qt {
  constructor(t, n, r) {
    this.property = t, this.normal = n, r && (this.space = r);
  }
}
function Qi(e, t) {
  const n = {}, r = {};
  let o = -1;
  for (; ++o < e.length; ) Object.assign(n, e[o].property), Object.assign(r, e[o].normal);
  return new Qt(n, r, t);
}
function qn(e) {
  return e.toLowerCase();
}
Qt.prototype.property = {}, Qt.prototype.normal = {}, Qt.prototype.space = null;
class Te {
  constructor(t, n) {
    this.property = t, this.attribute = n;
  }
}
Te.prototype.space = null, Te.prototype.boolean = !1, Te.prototype.booleanish = !1, Te.prototype.overloadedBoolean = !1, Te.prototype.number = !1, Te.prototype.commaSeparated = !1, Te.prototype.spaceSeparated = !1, Te.prototype.commaOrSpaceSeparated = !1, Te.prototype.mustUseProperty = !1, Te.prototype.defined = !1;
let Ks = 0;
const Z = At(), he = At(), _i = At(), O = At(), ce = At(), dt = At(), Ce = At();
function At() {
  return 2 ** ++Ks;
}
const Vn = Object.freeze(Object.defineProperty({ __proto__: null, boolean: Z, booleanish: he, commaOrSpaceSeparated: Ce, commaSeparated: dt, number: O, overloadedBoolean: _i, spaceSeparated: ce }, Symbol.toStringTag, { value: "Module" })), yn = Object.keys(Vn);
class fr extends Te {
  constructor(t, n, r, o) {
    let i = -1;
    if (super(t, n), to(this, "space", o), typeof r == "number") for (; ++i < yn.length; ) {
      const a = yn[i];
      to(this, yn[i], (r & Vn[a]) === Vn[a]);
    }
  }
}
function to(e, t, n) {
  n && (e[t] = n);
}
fr.prototype.defined = !0;
const Js = {}.hasOwnProperty;
function vt(e) {
  const t = {}, n = {};
  let r;
  for (r in e.properties) if (Js.call(e.properties, r)) {
    const o = e.properties[r], i = new fr(r, e.transform(e.attributes || {}, r), o, e.space);
    e.mustUseProperty && e.mustUseProperty.includes(r) && (i.mustUseProperty = !0), t[r] = i, n[qn(r)] = r, n[qn(i.attribute)] = r;
  }
  return new Qt(t, n, e.space);
}
const Mi = vt({ space: "xlink", transform: (e, t) => "xlink:" + t.slice(5).toLowerCase(), properties: { xLinkActuate: null, xLinkArcRole: null, xLinkHref: null, xLinkRole: null, xLinkShow: null, xLinkTitle: null, xLinkType: null } }), Oi = vt({ space: "xml", transform: (e, t) => "xml:" + t.slice(3).toLowerCase(), properties: { xmlLang: null, xmlBase: null, xmlSpace: null } });
function Li(e, t) {
  return t in e ? e[t] : t;
}
function Ni(e, t) {
  return Li(e, t.toLowerCase());
}
const Ri = vt({ space: "xmlns", attributes: { xmlnsxlink: "xmlns:xlink" }, transform: Ni, properties: { xmlns: null, xmlnsXLink: null } }), Hi = vt({ transform: (e, t) => t === "role" ? t : "aria-" + t.slice(4).toLowerCase(), properties: { ariaActiveDescendant: null, ariaAtomic: he, ariaAutoComplete: null, ariaBusy: he, ariaChecked: he, ariaColCount: O, ariaColIndex: O, ariaColSpan: O, ariaControls: ce, ariaCurrent: null, ariaDescribedBy: ce, ariaDetails: null, ariaDisabled: he, ariaDropEffect: ce, ariaErrorMessage: null, ariaExpanded: he, ariaFlowTo: ce, ariaGrabbed: he, ariaHasPopup: null, ariaHidden: he, ariaInvalid: null, ariaKeyShortcuts: null, ariaLabel: null, ariaLabelledBy: ce, ariaLevel: O, ariaLive: null, ariaModal: he, ariaMultiLine: he, ariaMultiSelectable: he, ariaOrientation: null, ariaOwns: ce, ariaPlaceholder: null, ariaPosInSet: O, ariaPressed: he, ariaReadOnly: he, ariaRelevant: null, ariaRequired: he, ariaRoleDescription: ce, ariaRowCount: O, ariaRowIndex: O, ariaRowSpan: O, ariaSelected: he, ariaSetSize: O, ariaSort: null, ariaValueMax: O, ariaValueMin: O, ariaValueNow: O, ariaValueText: null, role: null } }), Zs = vt({ space: "html", attributes: { acceptcharset: "accept-charset", classname: "class", htmlfor: "for", httpequiv: "http-equiv" }, transform: Ni, mustUseProperty: ["checked", "multiple", "muted", "selected"], properties: { abbr: null, accept: dt, acceptCharset: ce, accessKey: ce, action: null, allow: null, allowFullScreen: Z, allowPaymentRequest: Z, allowUserMedia: Z, alt: null, as: null, async: Z, autoCapitalize: null, autoComplete: ce, autoFocus: Z, autoPlay: Z, blocking: ce, capture: null, charSet: null, checked: Z, cite: null, className: ce, cols: O, colSpan: null, content: null, contentEditable: he, controls: Z, controlsList: ce, coords: O | dt, crossOrigin: null, data: null, dateTime: null, decoding: null, default: Z, defer: Z, dir: null, dirName: null, disabled: Z, download: _i, draggable: he, encType: null, enterKeyHint: null, fetchPriority: null, form: null, formAction: null, formEncType: null, formMethod: null, formNoValidate: Z, formTarget: null, headers: ce, height: O, hidden: Z, high: O, href: null, hrefLang: null, htmlFor: ce, httpEquiv: ce, id: null, imageSizes: null, imageSrcSet: null, inert: Z, inputMode: null, integrity: null, is: null, isMap: Z, itemId: null, itemProp: ce, itemRef: ce, itemScope: Z, itemType: ce, kind: null, label: null, lang: null, language: null, list: null, loading: null, loop: Z, low: O, manifest: null, max: null, maxLength: O, media: null, method: null, min: null, minLength: O, multiple: Z, muted: Z, name: null, nonce: null, noModule: Z, noValidate: Z, onAbort: null, onAfterPrint: null, onAuxClick: null, onBeforeMatch: null, onBeforePrint: null, onBeforeToggle: null, onBeforeUnload: null, onBlur: null, onCancel: null, onCanPlay: null, onCanPlayThrough: null, onChange: null, onClick: null, onClose: null, onContextLost: null, onContextMenu: null, onContextRestored: null, onCopy: null, onCueChange: null, onCut: null, onDblClick: null, onDrag: null, onDragEnd: null, onDragEnter: null, onDragExit: null, onDragLeave: null, onDragOver: null, onDragStart: null, onDrop: null, onDurationChange: null, onEmptied: null, onEnded: null, onError: null, onFocus: null, onFormData: null, onHashChange: null, onInput: null, onInvalid: null, onKeyDown: null, onKeyPress: null, onKeyUp: null, onLanguageChange: null, onLoad: null, onLoadedData: null, onLoadedMetadata: null, onLoadEnd: null, onLoadStart: null, onMessage: null, onMessageError: null, onMouseDown: null, onMouseEnter: null, onMouseLeave: null, onMouseMove: null, onMouseOut: null, onMouseOver: null, onMouseUp: null, onOffline: null, onOnline: null, onPageHide: null, onPageShow: null, onPaste: null, onPause: null, onPlay: null, onPlaying: null, onPopState: null, onProgress: null, onRateChange: null, onRejectionHandled: null, onReset: null, onResize: null, onScroll: null, onScrollEnd: null, onSecurityPolicyViolation: null, onSeeked: null, onSeeking: null, onSelect: null, onSlotChange: null, onStalled: null, onStorage: null, onSubmit: null, onSuspend: null, onTimeUpdate: null, onToggle: null, onUnhandledRejection: null, onUnload: null, onVolumeChange: null, onWaiting: null, onWheel: null, open: Z, optimum: O, pattern: null, ping: ce, placeholder: null, playsInline: Z, popover: null, popoverTarget: null, popoverTargetAction: null, poster: null, preload: null, readOnly: Z, referrerPolicy: null, rel: ce, required: Z, reversed: Z, rows: O, rowSpan: O, sandbox: ce, scope: null, scoped: Z, seamless: Z, selected: Z, shadowRootClonable: Z, shadowRootDelegatesFocus: Z, shadowRootMode: null, shape: null, size: O, sizes: null, slot: null, span: O, spellCheck: he, src: null, srcDoc: null, srcLang: null, srcSet: null, start: O, step: null, style: null, tabIndex: O, target: null, title: null, translate: null, type: null, typeMustMatch: Z, useMap: null, value: he, width: O, wrap: null, writingSuggestions: null, align: null, aLink: null, archive: ce, axis: null, background: null, bgColor: null, border: O, borderColor: null, bottomMargin: O, cellPadding: null, cellSpacing: null, char: null, charOff: null, classId: null, clear: null, code: null, codeBase: null, codeType: null, color: null, compact: Z, declare: Z, event: null, face: null, frame: null, frameBorder: null, hSpace: O, leftMargin: O, link: null, longDesc: null, lowSrc: null, marginHeight: O, marginWidth: O, noResize: Z, noHref: Z, noShade: Z, noWrap: Z, object: null, profile: null, prompt: null, rev: null, rightMargin: O, rules: null, scheme: null, scrolling: he, standby: null, summary: null, text: null, topMargin: O, valueType: null, version: null, vAlign: null, vLink: null, vSpace: O, allowTransparency: null, autoCorrect: null, autoSave: null, disablePictureInPicture: Z, disableRemotePlayback: Z, prefix: null, property: null, results: O, security: null, unselectable: null } }), $s = vt({ space: "svg", attributes: { accentHeight: "accent-height", alignmentBaseline: "alignment-baseline", arabicForm: "arabic-form", baselineShift: "baseline-shift", capHeight: "cap-height", className: "class", clipPath: "clip-path", clipRule: "clip-rule", colorInterpolation: "color-interpolation", colorInterpolationFilters: "color-interpolation-filters", colorProfile: "color-profile", colorRendering: "color-rendering", crossOrigin: "crossorigin", dataType: "datatype", dominantBaseline: "dominant-baseline", enableBackground: "enable-background", fillOpacity: "fill-opacity", fillRule: "fill-rule", floodColor: "flood-color", floodOpacity: "flood-opacity", fontFamily: "font-family", fontSize: "font-size", fontSizeAdjust: "font-size-adjust", fontStretch: "font-stretch", fontStyle: "font-style", fontVariant: "font-variant", fontWeight: "font-weight", glyphName: "glyph-name", glyphOrientationHorizontal: "glyph-orientation-horizontal", glyphOrientationVertical: "glyph-orientation-vertical", hrefLang: "hreflang", horizAdvX: "horiz-adv-x", horizOriginX: "horiz-origin-x", horizOriginY: "horiz-origin-y", imageRendering: "image-rendering", letterSpacing: "letter-spacing", lightingColor: "lighting-color", markerEnd: "marker-end", markerMid: "marker-mid", markerStart: "marker-start", navDown: "nav-down", navDownLeft: "nav-down-left", navDownRight: "nav-down-right", navLeft: "nav-left", navNext: "nav-next", navPrev: "nav-prev", navRight: "nav-right", navUp: "nav-up", navUpLeft: "nav-up-left", navUpRight: "nav-up-right", onAbort: "onabort", onActivate: "onactivate", onAfterPrint: "onafterprint", onBeforePrint: "onbeforeprint", onBegin: "onbegin", onCancel: "oncancel", onCanPlay: "oncanplay", onCanPlayThrough: "oncanplaythrough", onChange: "onchange", onClick: "onclick", onClose: "onclose", onCopy: "oncopy", onCueChange: "oncuechange", onCut: "oncut", onDblClick: "ondblclick", onDrag: "ondrag", onDragEnd: "ondragend", onDragEnter: "ondragenter", onDragExit: "ondragexit", onDragLeave: "ondragleave", onDragOver: "ondragover", onDragStart: "ondragstart", onDrop: "ondrop", onDurationChange: "ondurationchange", onEmptied: "onemptied", onEnd: "onend", onEnded: "onended", onError: "onerror", onFocus: "onfocus", onFocusIn: "onfocusin", onFocusOut: "onfocusout", onHashChange: "onhashchange", onInput: "oninput", onInvalid: "oninvalid", onKeyDown: "onkeydown", onKeyPress: "onkeypress", onKeyUp: "onkeyup", onLoad: "onload", onLoadedData: "onloadeddata", onLoadedMetadata: "onloadedmetadata", onLoadStart: "onloadstart", onMessage: "onmessage", onMouseDown: "onmousedown", onMouseEnter: "onmouseenter", onMouseLeave: "onmouseleave", onMouseMove: "onmousemove", onMouseOut: "onmouseout", onMouseOver: "onmouseover", onMouseUp: "onmouseup", onMouseWheel: "onmousewheel", onOffline: "onoffline", onOnline: "ononline", onPageHide: "onpagehide", onPageShow: "onpageshow", onPaste: "onpaste", onPause: "onpause", onPlay: "onplay", onPlaying: "onplaying", onPopState: "onpopstate", onProgress: "onprogress", onRateChange: "onratechange", onRepeat: "onrepeat", onReset: "onreset", onResize: "onresize", onScroll: "onscroll", onSeeked: "onseeked", onSeeking: "onseeking", onSelect: "onselect", onShow: "onshow", onStalled: "onstalled", onStorage: "onstorage", onSubmit: "onsubmit", onSuspend: "onsuspend", onTimeUpdate: "ontimeupdate", onToggle: "ontoggle", onUnload: "onunload", onVolumeChange: "onvolumechange", onWaiting: "onwaiting", onZoom: "onzoom", overlinePosition: "overline-position", overlineThickness: "overline-thickness", paintOrder: "paint-order", panose1: "panose-1", pointerEvents: "pointer-events", referrerPolicy: "referrerpolicy", renderingIntent: "rendering-intent", shapeRendering: "shape-rendering", stopColor: "stop-color", stopOpacity: "stop-opacity", strikethroughPosition: "strikethrough-position", strikethroughThickness: "strikethrough-thickness", strokeDashArray: "stroke-dasharray", strokeDashOffset: "stroke-dashoffset", strokeLineCap: "stroke-linecap", strokeLineJoin: "stroke-linejoin", strokeMiterLimit: "stroke-miterlimit", strokeOpacity: "stroke-opacity", strokeWidth: "stroke-width", tabIndex: "tabindex", textAnchor: "text-anchor", textDecoration: "text-decoration", textRendering: "text-rendering", transformOrigin: "transform-origin", typeOf: "typeof", underlinePosition: "underline-position", underlineThickness: "underline-thickness", unicodeBidi: "unicode-bidi", unicodeRange: "unicode-range", unitsPerEm: "units-per-em", vAlphabetic: "v-alphabetic", vHanging: "v-hanging", vIdeographic: "v-ideographic", vMathematical: "v-mathematical", vectorEffect: "vector-effect", vertAdvY: "vert-adv-y", vertOriginX: "vert-origin-x", vertOriginY: "vert-origin-y", wordSpacing: "word-spacing", writingMode: "writing-mode", xHeight: "x-height", playbackOrder: "playbackorder", timelineBegin: "timelinebegin" }, transform: Li, properties: { about: Ce, accentHeight: O, accumulate: null, additive: null, alignmentBaseline: null, alphabetic: O, amplitude: O, arabicForm: null, ascent: O, attributeName: null, attributeType: null, azimuth: O, bandwidth: null, baselineShift: null, baseFrequency: null, baseProfile: null, bbox: null, begin: null, bias: O, by: null, calcMode: null, capHeight: O, className: ce, clip: null, clipPath: null, clipPathUnits: null, clipRule: null, color: null, colorInterpolation: null, colorInterpolationFilters: null, colorProfile: null, colorRendering: null, content: null, contentScriptType: null, contentStyleType: null, crossOrigin: null, cursor: null, cx: null, cy: null, d: null, dataType: null, defaultAction: null, descent: O, diffuseConstant: O, direction: null, display: null, dur: null, divisor: O, dominantBaseline: null, download: Z, dx: null, dy: null, edgeMode: null, editable: null, elevation: O, enableBackground: null, end: null, event: null, exponent: O, externalResourcesRequired: null, fill: null, fillOpacity: O, fillRule: null, filter: null, filterRes: null, filterUnits: null, floodColor: null, floodOpacity: null, focusable: null, focusHighlight: null, fontFamily: null, fontSize: null, fontSizeAdjust: null, fontStretch: null, fontStyle: null, fontVariant: null, fontWeight: null, format: null, fr: null, from: null, fx: null, fy: null, g1: dt, g2: dt, glyphName: dt, glyphOrientationHorizontal: null, glyphOrientationVertical: null, glyphRef: null, gradientTransform: null, gradientUnits: null, handler: null, hanging: O, hatchContentUnits: null, hatchUnits: null, height: null, href: null, hrefLang: null, horizAdvX: O, horizOriginX: O, horizOriginY: O, id: null, ideographic: O, imageRendering: null, initialVisibility: null, in: null, in2: null, intercept: O, k: O, k1: O, k2: O, k3: O, k4: O, kernelMatrix: Ce, kernelUnitLength: null, keyPoints: null, keySplines: null, keyTimes: null, kerning: null, lang: null, lengthAdjust: null, letterSpacing: null, lightingColor: null, limitingConeAngle: O, local: null, markerEnd: null, markerMid: null, markerStart: null, markerHeight: null, markerUnits: null, markerWidth: null, mask: null, maskContentUnits: null, maskUnits: null, mathematical: null, max: null, media: null, mediaCharacterEncoding: null, mediaContentEncodings: null, mediaSize: O, mediaTime: null, method: null, min: null, mode: null, name: null, navDown: null, navDownLeft: null, navDownRight: null, navLeft: null, navNext: null, navPrev: null, navRight: null, navUp: null, navUpLeft: null, navUpRight: null, numOctaves: null, observer: null, offset: null, onAbort: null, onActivate: null, onAfterPrint: null, onBeforePrint: null, onBegin: null, onCancel: null, onCanPlay: null, onCanPlayThrough: null, onChange: null, onClick: null, onClose: null, onCopy: null, onCueChange: null, onCut: null, onDblClick: null, onDrag: null, onDragEnd: null, onDragEnter: null, onDragExit: null, onDragLeave: null, onDragOver: null, onDragStart: null, onDrop: null, onDurationChange: null, onEmptied: null, onEnd: null, onEnded: null, onError: null, onFocus: null, onFocusIn: null, onFocusOut: null, onHashChange: null, onInput: null, onInvalid: null, onKeyDown: null, onKeyPress: null, onKeyUp: null, onLoad: null, onLoadedData: null, onLoadedMetadata: null, onLoadStart: null, onMessage: null, onMouseDown: null, onMouseEnter: null, onMouseLeave: null, onMouseMove: null, onMouseOut: null, onMouseOver: null, onMouseUp: null, onMouseWheel: null, onOffline: null, onOnline: null, onPageHide: null, onPageShow: null, onPaste: null, onPause: null, onPlay: null, onPlaying: null, onPopState: null, onProgress: null, onRateChange: null, onRepeat: null, onReset: null, onResize: null, onScroll: null, onSeeked: null, onSeeking: null, onSelect: null, onShow: null, onStalled: null, onStorage: null, onSubmit: null, onSuspend: null, onTimeUpdate: null, onToggle: null, onUnload: null, onVolumeChange: null, onWaiting: null, onZoom: null, opacity: null, operator: null, order: null, orient: null, orientation: null, origin: null, overflow: null, overlay: null, overlinePosition: O, overlineThickness: O, paintOrder: null, panose1: null, path: null, pathLength: O, patternContentUnits: null, patternTransform: null, patternUnits: null, phase: null, ping: ce, pitch: null, playbackOrder: null, pointerEvents: null, points: null, pointsAtX: O, pointsAtY: O, pointsAtZ: O, preserveAlpha: null, preserveAspectRatio: null, primitiveUnits: null, propagate: null, property: Ce, r: null, radius: null, referrerPolicy: null, refX: null, refY: null, rel: Ce, rev: Ce, renderingIntent: null, repeatCount: null, repeatDur: null, requiredExtensions: Ce, requiredFeatures: Ce, requiredFonts: Ce, requiredFormats: Ce, resource: null, restart: null, result: null, rotate: null, rx: null, ry: null, scale: null, seed: null, shapeRendering: null, side: null, slope: null, snapshotTime: null, specularConstant: O, specularExponent: O, spreadMethod: null, spacing: null, startOffset: null, stdDeviation: null, stemh: null, stemv: null, stitchTiles: null, stopColor: null, stopOpacity: null, strikethroughPosition: O, strikethroughThickness: O, string: null, stroke: null, strokeDashArray: Ce, strokeDashOffset: null, strokeLineCap: null, strokeLineJoin: null, strokeMiterLimit: O, strokeOpacity: O, strokeWidth: null, style: null, surfaceScale: O, syncBehavior: null, syncBehaviorDefault: null, syncMaster: null, syncTolerance: null, syncToleranceDefault: null, systemLanguage: Ce, tabIndex: O, tableValues: null, target: null, targetX: O, targetY: O, textAnchor: null, textDecoration: null, textRendering: null, textLength: null, timelineBegin: null, title: null, transformBehavior: null, type: null, typeOf: Ce, to: null, transform: null, transformOrigin: null, u1: null, u2: null, underlinePosition: O, underlineThickness: O, unicode: null, unicodeBidi: null, unicodeRange: null, unitsPerEm: O, values: null, vAlphabetic: O, vMathematical: O, vectorEffect: null, vHanging: O, vIdeographic: O, version: null, vertAdvY: O, vertOriginX: O, vertOriginY: O, viewBox: null, viewTarget: null, visibility: null, width: null, widths: null, wordSpacing: null, writingMode: null, x: null, x1: null, x2: null, xChannelSelector: null, xHeight: O, y: null, y1: null, y2: null, yChannelSelector: null, z: null, zoomAndPan: null } }), el = /^data[-\w.:]+$/i, no = /-[a-z]/g, tl = /[A-Z]/g;
function nl(e) {
  return "-" + e.toLowerCase();
}
function rl(e) {
  return e.charAt(1).toUpperCase();
}
const ol = { classId: "classID", dataType: "datatype", itemId: "itemID", strokeDashArray: "strokeDasharray", strokeDashOffset: "strokeDashoffset", strokeLineCap: "strokeLinecap", strokeLineJoin: "strokeLinejoin", strokeMiterLimit: "strokeMiterlimit", typeOf: "typeof", xLinkActuate: "xlinkActuate", xLinkArcRole: "xlinkArcrole", xLinkHref: "xlinkHref", xLinkRole: "xlinkRole", xLinkShow: "xlinkShow", xLinkTitle: "xlinkTitle", xLinkType: "xlinkType", xmlnsXLink: "xmlnsXlink" }, il = Qi([Oi, Mi, Ri, Hi, Zs], "html"), Xn = Qi([Oi, Mi, Ri, Hi, $s], "svg");
function Fi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var vn, ro, oo, lt = {}, al = function() {
  if (oo) return lt;
  oo = 1;
  var e = lt && lt.__importDefault || function(n) {
    return n && n.__esModule ? n : { default: n };
  };
  Object.defineProperty(lt, "__esModule", { value: !0 }), lt.default = function(n, r) {
    var o = null;
    if (!n || typeof n != "string") return o;
    var i = (0, t.default)(n), a = typeof r == "function";
    return i.forEach(function(A) {
      if (A.type === "declaration") {
        var s = A.property, d = A.value;
        a ? r(s, d, A) : d && ((o = o || {})[s] = d);
      }
    }), o;
  };
  var t = e(function() {
    if (ro) return vn;
    ro = 1;
    var n = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, r = /\n/g, o = /^\s*/, i = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, a = /^:\s*/, A = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, s = /^[;\s]*/, d = /^\s+|\s+$/g, u = "";
    function c(l) {
      return l ? l.replace(d, u) : u;
    }
    return vn = function(l, p) {
      if (typeof l != "string") throw new TypeError("First argument must be a string");
      if (!l) return [];
      p = p || {};
      var f = 1, m = 1;
      function h(D) {
        var B = D.match(r);
        B && (f += B.length);
        var Q = D.lastIndexOf(`
`);
        m = ~Q ? D.length - Q : m + D.length;
      }
      function b() {
        var D = { line: f, column: m };
        return function(B) {
          return B.position = new w(D), k(), B;
        };
      }
      function w(D) {
        this.start = D, this.end = { line: f, column: m }, this.source = p.source;
      }
      function g(D) {
        var B = new Error(p.source + ":" + f + ":" + m + ": " + D);
        if (B.reason = D, B.filename = p.source, B.line = f, B.column = m, B.source = l, !p.silent) throw B;
      }
      function x(D) {
        var B = D.exec(l);
        if (B) {
          var Q = B[0];
          return h(Q), l = l.slice(Q.length), B;
        }
      }
      function k() {
        x(o);
      }
      function P(D) {
        var B;
        for (D = D || []; B = S(); ) B !== !1 && D.push(B);
        return D;
      }
      function S() {
        var D = b();
        if (l.charAt(0) == "/" && l.charAt(1) == "*") {
          for (var B = 2; u != l.charAt(B) && (l.charAt(B) != "*" || l.charAt(B + 1) != "/"); ) ++B;
          if (B += 2, u === l.charAt(B - 1)) return g("End of comment missing");
          var Q = l.slice(2, B - 2);
          return m += 2, h(Q), l = l.slice(B), m += 2, D({ type: "comment", comment: Q });
        }
      }
      function I() {
        var D = b(), B = x(i);
        if (B) {
          if (S(), !x(a)) return g("property missing ':'");
          var Q = x(A), C = D({ type: "declaration", property: c(B[0].replace(n, u)), value: Q ? c(Q[0].replace(n, u)) : u });
          return x(s), C;
        }
      }
      return w.prototype.content = l, k(), function() {
        var D, B = [];
        for (P(B); D = I(); ) D !== !1 && (B.push(D), P(B));
        return B;
      }();
    }, vn;
  }());
  return lt;
}();
const io = Fi(al), Al = io.default || io, Ui = zi("end"), hr = zi("start");
function zi(e) {
  return function(t) {
    const n = t && t.position && t.position[e] || {};
    if (typeof n.line == "number" && n.line > 0 && typeof n.column == "number" && n.column > 0) return { line: n.line, column: n.column, offset: typeof n.offset == "number" && n.offset > -1 ? n.offset : void 0 };
  };
}
function _t(e) {
  return e && typeof e == "object" ? "position" in e || "type" in e ? ao(e.position) : "start" in e || "end" in e ? ao(e) : "line" in e || "column" in e ? Kn(e) : "" : "";
}
function Kn(e) {
  return Ao(e && e.line) + ":" + Ao(e && e.column);
}
function ao(e) {
  return Kn(e && e.start) + "-" + Kn(e && e.end);
}
function Ao(e) {
  return e && typeof e == "number" ? e : 1;
}
class xe extends Error {
  constructor(t, n, r) {
    super(), typeof n == "string" && (r = n, n = void 0);
    let o = "", i = {}, a = !1;
    if (n && (i = "line" in n && "column" in n || "start" in n && "end" in n ? { place: n } : "type" in n ? { ancestors: [n], place: n.position } : { ...n }), typeof t == "string" ? o = t : !i.cause && t && (a = !0, o = t.message, i.cause = t), !i.ruleId && !i.source && typeof r == "string") {
      const s = r.indexOf(":");
      s === -1 ? i.ruleId = r : (i.source = r.slice(0, s), i.ruleId = r.slice(s + 1));
    }
    if (!i.place && i.ancestors && i.ancestors) {
      const s = i.ancestors[i.ancestors.length - 1];
      s && (i.place = s.position);
    }
    const A = i.place && "start" in i.place ? i.place.start : i.place;
    this.ancestors = i.ancestors || void 0, this.cause = i.cause || void 0, this.column = A ? A.column : void 0, this.fatal = void 0, this.file, this.message = o, this.line = A ? A.line : void 0, this.name = _t(i.place) || "1:1", this.place = i.place || void 0, this.reason = this.message, this.ruleId = i.ruleId || void 0, this.source = i.source || void 0, this.stack = a && i.cause && typeof i.cause.stack == "string" ? i.cause.stack : "", this.actual, this.expected, this.note, this.url;
  }
}
xe.prototype.file = "", xe.prototype.name = "", xe.prototype.reason = "", xe.prototype.message = "", xe.prototype.stack = "", xe.prototype.column = void 0, xe.prototype.line = void 0, xe.prototype.ancestors = void 0, xe.prototype.cause = void 0, xe.prototype.fatal = void 0, xe.prototype.place = void 0, xe.prototype.ruleId = void 0, xe.prototype.source = void 0;
const gr = {}.hasOwnProperty, sl = /* @__PURE__ */ new Map(), ll = /[A-Z]/g, cl = /-([a-z])/g, ul = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), dl = /* @__PURE__ */ new Set(["td", "th"]), ji = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function pl(e, t) {
  if (!t || t.Fragment === void 0) throw new TypeError("Expected `Fragment` in options");
  const n = t.filePath || void 0;
  let r;
  if (t.development) {
    if (typeof t.jsxDEV != "function") throw new TypeError("Expected `jsxDEV` in options when `development: true`");
    r = /* @__PURE__ */ function(a, A) {
      return s;
      function s(d, u, c, l) {
        const p = Array.isArray(c.children), f = hr(d);
        return A(u, c, l, p, { columnNumber: f ? f.column - 1 : void 0, fileName: a, lineNumber: f ? f.line : void 0 }, void 0);
      }
    }(n, t.jsxDEV);
  } else {
    if (typeof t.jsx != "function") throw new TypeError("Expected `jsx` in production options");
    if (typeof t.jsxs != "function") throw new TypeError("Expected `jsxs` in production options");
    r = /* @__PURE__ */ function(a, A, s) {
      return d;
      function d(u, c, l, p) {
        const f = Array.isArray(l.children) ? s : A;
        return p ? f(c, l, p) : f(c, l);
      }
    }(0, t.jsx, t.jsxs);
  }
  const o = { Fragment: t.Fragment, ancestors: [], components: t.components || {}, create: r, elementAttributeNameCase: t.elementAttributeNameCase || "react", evaluater: t.createEvaluater ? t.createEvaluater() : void 0, filePath: n, ignoreInvalidStyle: t.ignoreInvalidStyle || !1, passKeys: t.passKeys !== !1, passNode: t.passNode || !1, schema: t.space === "svg" ? Xn : il, stylePropertyNameCase: t.stylePropertyNameCase || "dom", tableCellAlignToStyle: t.tableCellAlignToStyle !== !1 }, i = Gi(o, e, void 0);
  return i && typeof i != "string" ? i : o.create(e, o.Fragment, { children: i || void 0 }, void 0);
}
function Gi(e, t, n) {
  return t.type === "element" ? function(r, o, i) {
    const a = r.schema;
    let A = a;
    o.tagName.toLowerCase() === "svg" && a.space === "html" && (A = Xn, r.schema = A), r.ancestors.push(o);
    const s = lo(r, o.tagName, !1), d = function(c, l) {
      const p = {};
      let f, m;
      for (m in l.properties) if (m !== "children" && gr.call(l.properties, m)) {
        const h = fl(c, m, l.properties[m]);
        if (h) {
          const [b, w] = h;
          c.tableCellAlignToStyle && b === "align" && typeof w == "string" && dl.has(l.tagName) ? f = w : p[b] = w;
        }
      }
      return f && ((p.style || (p.style = {}))[c.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = f), p;
    }(r, o);
    let u = wn(r, o);
    return ul.has(o.tagName) && (u = u.filter(function(c) {
      return typeof c != "string" || !function(l) {
        return typeof l == "object" ? l.type === "text" && eo(l.value) : eo(l);
      }(c);
    })), so(r, d, s, o), bn(d, u), r.ancestors.pop(), r.schema = a, r.create(o, s, d, i);
  }(e, t, n) : t.type === "mdxFlowExpression" || t.type === "mdxTextExpression" ? function(r, o) {
    if (o.data && o.data.estree && r.evaluater) {
      const i = o.data.estree.body[0];
      return i.type, r.evaluater.evaluateExpression(i.expression);
    }
    Tt(r, o.position);
  }(e, t) : t.type === "mdxJsxFlowElement" || t.type === "mdxJsxTextElement" ? function(r, o, i) {
    const a = r.schema;
    let A = a;
    o.name === "svg" && a.space === "html" && (A = Xn, r.schema = A), r.ancestors.push(o);
    const s = o.name === null ? r.Fragment : lo(r, o.name, !0), d = function(c, l) {
      const p = {};
      for (const f of l.attributes) if (f.type === "mdxJsxExpressionAttribute") if (f.data && f.data.estree && c.evaluater) {
        const m = f.data.estree.body[0];
        m.type;
        const h = m.expression;
        h.type;
        const b = h.properties[0];
        b.type, Object.assign(p, c.evaluater.evaluateExpression(b.argument));
      } else Tt(c, l.position);
      else {
        const m = f.name;
        let h;
        if (f.value && typeof f.value == "object") if (f.value.data && f.value.data.estree && c.evaluater) {
          const b = f.value.data.estree.body[0];
          b.type, h = c.evaluater.evaluateExpression(b.expression);
        } else Tt(c, l.position);
        else h = f.value === null || f.value;
        p[m] = h;
      }
      return p;
    }(r, o), u = wn(r, o);
    return so(r, d, s, o), bn(d, u), r.ancestors.pop(), r.schema = a, r.create(o, s, d, i);
  }(e, t, n) : t.type === "mdxjsEsm" ? function(r, o) {
    if (o.data && o.data.estree && r.evaluater) return r.evaluater.evaluateProgram(o.data.estree);
    Tt(r, o.position);
  }(e, t) : t.type === "root" ? function(r, o, i) {
    const a = {};
    return bn(a, wn(r, o)), r.create(o, r.Fragment, a, i);
  }(e, t, n) : t.type === "text" ? function(r, o) {
    return o.value;
  }(0, t) : void 0;
}
function so(e, t, n, r) {
  typeof n != "string" && n !== e.Fragment && e.passNode && (t.node = r);
}
function bn(e, t) {
  if (t.length > 0) {
    const n = t.length > 1 ? t : t[0];
    n && (e.children = n);
  }
}
function wn(e, t) {
  const n = [];
  let r = -1;
  const o = e.passKeys ? /* @__PURE__ */ new Map() : sl;
  for (; ++r < t.children.length; ) {
    const i = t.children[r];
    let a;
    if (e.passKeys) {
      const s = i.type === "element" ? i.tagName : i.type === "mdxJsxFlowElement" || i.type === "mdxJsxTextElement" ? i.name : void 0;
      if (s) {
        const d = o.get(s) || 0;
        a = s + "-" + d, o.set(s, d + 1);
      }
    }
    const A = Gi(e, i, a);
    A !== void 0 && n.push(A);
  }
  return n;
}
function fl(e, t, n) {
  const r = function(o, i) {
    const a = qn(i);
    let A = i, s = Te;
    if (a in o.normal) return o.property[o.normal[a]];
    if (a.length > 4 && a.slice(0, 4) === "data" && el.test(i)) {
      if (i.charAt(4) === "-") {
        const d = i.slice(5).replace(no, rl);
        A = "data" + d.charAt(0).toUpperCase() + d.slice(1);
      } else {
        const d = i.slice(4);
        if (!no.test(d)) {
          let u = d.replace(tl, nl);
          u.charAt(0) !== "-" && (u = "-" + u), i = "data" + u;
        }
      }
      s = fr;
    }
    return new s(A, i);
  }(e.schema, t);
  if (!(n == null || typeof n == "number" && Number.isNaN(n))) {
    if (Array.isArray(n) && (n = r.commaSeparated ? function(o) {
      const i = {};
      return (o[o.length - 1] === "" ? [...o, ""] : o).join((i.padRight ? " " : "") + "," + (i.padLeft === !1 ? "" : " ")).trim();
    }(n) : function(o) {
      return o.join(" ").trim();
    }(n)), r.property === "style") {
      let o = typeof n == "object" ? n : function(i, a) {
        const A = {};
        try {
          Al(a, s);
        } catch (d) {
          if (!i.ignoreInvalidStyle) {
            const u = d, c = new xe("Cannot parse `style` attribute", { ancestors: i.ancestors, cause: u, ruleId: "style", source: "hast-util-to-jsx-runtime" });
            throw c.file = i.filePath || void 0, c.url = ji + "#cannot-parse-style-attribute", c;
          }
        }
        return A;
        function s(d, u) {
          let c = d;
          c.slice(0, 2) !== "--" && (c.slice(0, 4) === "-ms-" && (c = "ms-" + c.slice(4)), c = c.replace(cl, gl)), A[c] = u;
        }
      }(e, String(n));
      return e.stylePropertyNameCase === "css" && (o = function(i) {
        const a = {};
        let A;
        for (A in i) gr.call(i, A) && (a[hl(A)] = i[A]);
        return a;
      }(o)), ["style", o];
    }
    return [e.elementAttributeNameCase === "react" && r.space ? ol[r.property] || r.property : r.attribute, n];
  }
}
function lo(e, t, n) {
  let r;
  if (n) if (t.includes(".")) {
    const o = t.split(".");
    let i, a = -1;
    for (; ++a < o.length; ) {
      const A = $r(o[a]) ? { type: "Identifier", name: o[a] } : { type: "Literal", value: o[a] };
      i = i ? { type: "MemberExpression", object: i, property: A, computed: !(!a || A.type !== "Literal"), optional: !1 } : A;
    }
    r = i;
  } else r = $r(t) && !/^[a-z]/.test(t) ? { type: "Identifier", name: t } : { type: "Literal", value: t };
  else r = { type: "Literal", value: t };
  if (r.type === "Literal") {
    const o = r.value;
    return gr.call(e.components, o) ? e.components[o] : o;
  }
  if (e.evaluater) return e.evaluater.evaluateExpression(r);
  Tt(e);
}
function Tt(e, t) {
  const n = new xe("Cannot handle MDX estrees without `createEvaluater`", { ancestors: e.ancestors, place: t, ruleId: "mdx-estree", source: "hast-util-to-jsx-runtime" });
  throw n.file = e.filePath || void 0, n.url = ji + "#cannot-handle-mdx-estrees-without-createevaluater", n;
}
function hl(e) {
  let t = e.replace(ll, ml);
  return t.slice(0, 3) === "ms-" && (t = "-" + t), t;
}
function gl(e, t) {
  return t.toUpperCase();
}
function ml(e) {
  return "-" + e.toLowerCase();
}
const xn = { action: ["form"], cite: ["blockquote", "del", "ins", "q"], data: ["object"], formAction: ["button", "input"], href: ["a", "area", "base", "link"], icon: ["menuitem"], itemId: null, manifest: ["html"], ping: ["a", "area"], poster: ["video"], src: ["audio", "embed", "iframe", "img", "input", "script", "source", "track", "video"] }, yl = {};
function Yi(e, t, n) {
  if (/* @__PURE__ */ function(r) {
    return !(!r || typeof r != "object");
  }(e)) {
    if ("value" in e) return e.type !== "html" || n ? e.value : "";
    if (t && "alt" in e && e.alt) return e.alt;
    if ("children" in e) return co(e.children, t, n);
  }
  return Array.isArray(e) ? co(e, t, n) : "";
}
function co(e, t, n) {
  const r = [];
  let o = -1;
  for (; ++o < e.length; ) r[o] = Yi(e[o], t, n);
  return r.join("");
}
const uo = document.createElement("i");
function mr(e) {
  const t = "&" + e + ";";
  uo.innerHTML = t;
  const n = uo.textContent;
  return (n.charCodeAt(n.length - 1) !== 59 || e === "semi") && n !== t && n;
}
function We(e, t, n, r) {
  const o = e.length;
  let i, a = 0;
  if (t = t < 0 ? -t > o ? 0 : o + t : t > o ? o : t, n = n > 0 ? n : 0, r.length < 1e4) i = Array.from(r), i.unshift(t, n), e.splice(...i);
  else for (n && e.splice(t, n); a < r.length; ) i = r.slice(a, a + 1e4), i.unshift(t, 0), e.splice(...i), a += 1e4, t += 1e4;
}
function Qe(e, t) {
  return e.length > 0 ? (We(e, e.length, 0, t), e) : t;
}
const po = {}.hasOwnProperty;
function vl(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; ) bl(t, e[n]);
  return t;
}
function bl(e, t) {
  let n;
  for (n in t) {
    const r = (po.call(e, n) ? e[n] : void 0) || (e[n] = {}), o = t[n];
    let i;
    if (o) for (i in o) {
      po.call(r, i) || (r[i] = []);
      const a = o[i];
      wl(r[i], Array.isArray(a) ? a : a ? [a] : []);
    }
  }
}
function wl(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; ) (t[n].add === "after" ? e : r).push(t[n]);
  We(e, 0, 0, r);
}
function Wi(e, t) {
  const n = Number.parseInt(e, t);
  return n < 9 || n === 11 || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || !(65535 & ~n) || (65535 & n) == 65534 || n > 1114111 ? "�" : String.fromCodePoint(n);
}
function pt(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Ge = rt(/[A-Za-z]/), Se = rt(/[\dA-Za-z]/), xl = rt(/[#-'*+\--9=?A-Z^-~]/);
function Jn(e) {
  return e !== null && (e < 32 || e === 127);
}
const Zn = rt(/\d/), El = rt(/[\dA-Fa-f]/), kl = rt(/[!-/:-@[-`{-~]/);
function V(e) {
  return e !== null && e < -2;
}
function Be(e) {
  return e !== null && (e < 0 || e === 32);
}
function re(e) {
  return e === -2 || e === -1 || e === 32;
}
const Pl = rt(new RegExp("\\p{P}|\\p{S}", "u")), Bl = rt(/\s/);
function rt(e) {
  return function(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  };
}
function ut(e) {
  const t = [];
  let n = -1, r = 0, o = 0;
  for (; ++n < e.length; ) {
    const i = e.charCodeAt(n);
    let a = "";
    if (i === 37 && Se(e.charCodeAt(n + 1)) && Se(e.charCodeAt(n + 2))) o = 2;
    else if (i < 128) /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(i)) || (a = String.fromCharCode(i));
    else if (i > 55295 && i < 57344) {
      const A = e.charCodeAt(n + 1);
      i < 56320 && A > 56319 && A < 57344 ? (a = String.fromCharCode(i, A), o = 1) : a = "�";
    } else a = String.fromCharCode(i);
    a && (t.push(e.slice(r, n), encodeURIComponent(a)), r = n + o + 1, a = ""), o && (n += o, o = 0);
  }
  return t.join("") + e.slice(r);
}
function ue(e, t, n, r) {
  const o = r ? r - 1 : Number.POSITIVE_INFINITY;
  let i = 0;
  return function(A) {
    return re(A) ? (e.enter(n), a(A)) : t(A);
  };
  function a(A) {
    return re(A) && i++ < o ? (e.consume(A), a) : (e.exit(n), t(A));
  }
}
const Dl = { tokenize: function(e) {
  const t = e.attempt(this.parser.constructs.contentInitial, function(i) {
    return i === null ? void e.consume(i) : (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), ue(e, t, "linePrefix"));
  }, function(i) {
    return e.enter("paragraph"), r(i);
  });
  let n;
  return t;
  function r(i) {
    const a = e.enter("chunkText", { contentType: "text", previous: n });
    return n && (n.next = a), n = a, o(i);
  }
  function o(i) {
    return i === null ? (e.exit("chunkText"), e.exit("paragraph"), void e.consume(i)) : V(i) ? (e.consume(i), e.exit("chunkText"), r) : (e.consume(i), o);
  }
} }, Cl = { tokenize: function(e) {
  const t = this, n = [];
  let r, o, i, a = 0;
  return A;
  function A(g) {
    if (a < n.length) {
      const x = n[a];
      return t.containerState = x[1], e.attempt(x[0].continuation, s, d)(g);
    }
    return d(g);
  }
  function s(g) {
    if (a++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, r && w();
      const x = t.events.length;
      let k, P = x;
      for (; P--; ) if (t.events[P][0] === "exit" && t.events[P][1].type === "chunkFlow") {
        k = t.events[P][1].end;
        break;
      }
      b(a);
      let S = x;
      for (; S < t.events.length; ) t.events[S][1].end = { ...k }, S++;
      return We(t.events, P + 1, 0, t.events.slice(x)), t.events.length = S, d(g);
    }
    return A(g);
  }
  function d(g) {
    if (a === n.length) {
      if (!r) return l(g);
      if (r.currentConstruct && r.currentConstruct.concrete) return f(g);
      t.interrupt = !(!r.currentConstruct || r._gfmTableDynamicInterruptHack);
    }
    return t.containerState = {}, e.check(fo, u, c)(g);
  }
  function u(g) {
    return r && w(), b(a), l(g);
  }
  function c(g) {
    return t.parser.lazy[t.now().line] = a !== n.length, i = t.now().offset, f(g);
  }
  function l(g) {
    return t.containerState = {}, e.attempt(fo, p, f)(g);
  }
  function p(g) {
    return a++, n.push([t.currentConstruct, t.containerState]), l(g);
  }
  function f(g) {
    return g === null ? (r && w(), b(0), void e.consume(g)) : (r = r || t.parser.flow(t.now()), e.enter("chunkFlow", { _tokenizer: r, contentType: "flow", previous: o }), m(g));
  }
  function m(g) {
    return g === null ? (h(e.exit("chunkFlow"), !0), b(0), void e.consume(g)) : V(g) ? (e.consume(g), h(e.exit("chunkFlow")), a = 0, t.interrupt = void 0, A) : (e.consume(g), m);
  }
  function h(g, x) {
    const k = t.sliceStream(g);
    if (x && k.push(null), g.previous = o, o && (o.next = g), o = g, r.defineSkip(g.start), r.write(k), t.parser.lazy[g.start.line]) {
      let P = r.events.length;
      for (; P--; ) if (r.events[P][1].start.offset < i && (!r.events[P][1].end || r.events[P][1].end.offset > i)) return;
      const S = t.events.length;
      let I, D, B = S;
      for (; B--; ) if (t.events[B][0] === "exit" && t.events[B][1].type === "chunkFlow") {
        if (I) {
          D = t.events[B][1].end;
          break;
        }
        I = !0;
      }
      for (b(a), P = S; P < t.events.length; ) t.events[P][1].end = { ...D }, P++;
      We(t.events, B + 1, 0, t.events.slice(S)), t.events.length = P;
    }
  }
  function b(g) {
    let x = n.length;
    for (; x-- > g; ) {
      const k = n[x];
      t.containerState = k[1], k[0].exit.call(t, e);
    }
    n.length = g;
  }
  function w() {
    r.write([null]), o = void 0, r = void 0, t.containerState._closeFlow = void 0;
  }
} }, fo = { tokenize: function(e, t, n) {
  return ue(e, e.attempt(this.parser.constructs.document, t, n), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
} };
function ho(e) {
  return e === null || Be(e) || Bl(e) ? 1 : Pl(e) ? 2 : void 0;
}
function yr(e, t, n) {
  const r = [];
  let o = -1;
  for (; ++o < e.length; ) {
    const i = e[o].resolveAll;
    i && !r.includes(i) && (t = i(t, n), r.push(i));
  }
  return t;
}
const $n = { name: "attention", resolveAll: function(e, t) {
  let n, r, o, i, a, A, s, d, u = -1;
  for (; ++u < e.length; ) if (e[u][0] === "enter" && e[u][1].type === "attentionSequence" && e[u][1]._close) {
    for (n = u; n--; ) if (e[n][0] === "exit" && e[n][1].type === "attentionSequence" && e[n][1]._open && t.sliceSerialize(e[n][1]).charCodeAt(0) === t.sliceSerialize(e[u][1]).charCodeAt(0)) {
      if ((e[n][1]._close || e[u][1]._open) && (e[u][1].end.offset - e[u][1].start.offset) % 3 && !((e[n][1].end.offset - e[n][1].start.offset + e[u][1].end.offset - e[u][1].start.offset) % 3)) continue;
      A = e[n][1].end.offset - e[n][1].start.offset > 1 && e[u][1].end.offset - e[u][1].start.offset > 1 ? 2 : 1;
      const c = { ...e[n][1].end }, l = { ...e[u][1].start };
      go(c, -A), go(l, A), i = { type: A > 1 ? "strongSequence" : "emphasisSequence", start: c, end: { ...e[n][1].end } }, a = { type: A > 1 ? "strongSequence" : "emphasisSequence", start: { ...e[u][1].start }, end: l }, o = { type: A > 1 ? "strongText" : "emphasisText", start: { ...e[n][1].end }, end: { ...e[u][1].start } }, r = { type: A > 1 ? "strong" : "emphasis", start: { ...i.start }, end: { ...a.end } }, e[n][1].end = { ...i.start }, e[u][1].start = { ...a.end }, s = [], e[n][1].end.offset - e[n][1].start.offset && (s = Qe(s, [["enter", e[n][1], t], ["exit", e[n][1], t]])), s = Qe(s, [["enter", r, t], ["enter", i, t], ["exit", i, t], ["enter", o, t]]), s = Qe(s, yr(t.parser.constructs.insideSpan.null, e.slice(n + 1, u), t)), s = Qe(s, [["exit", o, t], ["enter", a, t], ["exit", a, t], ["exit", r, t]]), e[u][1].end.offset - e[u][1].start.offset ? (d = 2, s = Qe(s, [["enter", e[u][1], t], ["exit", e[u][1], t]])) : d = 0, We(e, n - 1, u - n + 3, s), u = n + s.length - d - 2;
      break;
    }
  }
  for (u = -1; ++u < e.length; ) e[u][1].type === "attentionSequence" && (e[u][1].type = "data");
  return e;
}, tokenize: function(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, o = ho(r);
  let i;
  return function(A) {
    return i = A, e.enter("attentionSequence"), a(A);
  };
  function a(A) {
    if (A === i) return e.consume(A), a;
    const s = e.exit("attentionSequence"), d = ho(A), u = !d || d === 2 && o || n.includes(A), c = !o || o === 2 && d || n.includes(r);
    return s._open = !!(i === 42 ? u : u && (o || !c)), s._close = !!(i === 42 ? c : c && (d || !u)), t(A);
  }
} };
function go(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const Sl = { name: "autolink", tokenize: function(e, t, n) {
  let r = 0;
  return function(l) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(l), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), o;
  };
  function o(l) {
    return Ge(l) ? (e.consume(l), i) : l === 64 ? n(l) : s(l);
  }
  function i(l) {
    return l === 43 || l === 45 || l === 46 || Se(l) ? (r = 1, a(l)) : s(l);
  }
  function a(l) {
    return l === 58 ? (e.consume(l), r = 0, A) : (l === 43 || l === 45 || l === 46 || Se(l)) && r++ < 32 ? (e.consume(l), a) : (r = 0, s(l));
  }
  function A(l) {
    return l === 62 ? (e.exit("autolinkProtocol"), e.enter("autolinkMarker"), e.consume(l), e.exit("autolinkMarker"), e.exit("autolink"), t) : l === null || l === 32 || l === 60 || Jn(l) ? n(l) : (e.consume(l), A);
  }
  function s(l) {
    return l === 64 ? (e.consume(l), d) : xl(l) ? (e.consume(l), s) : n(l);
  }
  function d(l) {
    return Se(l) ? u(l) : n(l);
  }
  function u(l) {
    return l === 46 ? (e.consume(l), r = 0, d) : l === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", e.enter("autolinkMarker"), e.consume(l), e.exit("autolinkMarker"), e.exit("autolink"), t) : c(l);
  }
  function c(l) {
    if ((l === 45 || Se(l)) && r++ < 63) {
      const p = l === 45 ? c : u;
      return e.consume(l), p;
    }
    return n(l);
  }
} }, on = { partial: !0, tokenize: function(e, t, n) {
  return function(o) {
    return re(o) ? ue(e, r, "linePrefix")(o) : r(o);
  };
  function r(o) {
    return o === null || V(o) ? t(o) : n(o);
  }
} }, qi = { continuation: { tokenize: function(e, t, n) {
  const r = this;
  return function(i) {
    return re(i) ? ue(e, o, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i) : o(i);
  };
  function o(i) {
    return e.attempt(qi, t, n)(i);
  }
} }, exit: function(e) {
  e.exit("blockQuote");
}, name: "blockQuote", tokenize: function(e, t, n) {
  const r = this;
  return function(i) {
    if (i === 62) {
      const a = r.containerState;
      return a.open || (e.enter("blockQuote", { _container: !0 }), a.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(i), e.exit("blockQuoteMarker"), o;
    }
    return n(i);
  };
  function o(i) {
    return re(i) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(i), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(i));
  }
} }, Vi = { name: "characterEscape", tokenize: function(e, t, n) {
  return function(o) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(o), e.exit("escapeMarker"), r;
  };
  function r(o) {
    return kl(o) ? (e.enter("characterEscapeValue"), e.consume(o), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(o);
  }
} }, Xi = { name: "characterReference", tokenize: function(e, t, n) {
  const r = this;
  let o, i, a = 0;
  return function(u) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(u), e.exit("characterReferenceMarker"), A;
  };
  function A(u) {
    return u === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(u), e.exit("characterReferenceMarkerNumeric"), s) : (e.enter("characterReferenceValue"), o = 31, i = Se, d(u));
  }
  function s(u) {
    return u === 88 || u === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(u), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), o = 6, i = El, d) : (e.enter("characterReferenceValue"), o = 7, i = Zn, d(u));
  }
  function d(u) {
    if (u === 59 && a) {
      const c = e.exit("characterReferenceValue");
      return i !== Se || mr(r.sliceSerialize(c)) ? (e.enter("characterReferenceMarker"), e.consume(u), e.exit("characterReferenceMarker"), e.exit("characterReference"), t) : n(u);
    }
    return i(u) && a++ < o ? (e.consume(u), d) : n(u);
  }
} }, mo = { partial: !0, tokenize: function(e, t, n) {
  const r = this;
  return function(i) {
    return i === null ? n(i) : (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), o);
  };
  function o(i) {
    return r.parser.lazy[r.now().line] ? n(i) : t(i);
  }
} }, yo = { concrete: !0, name: "codeFenced", tokenize: function(e, t, n) {
  const r = this, o = { partial: !0, tokenize: function(g, x, k) {
    let P = 0;
    return S;
    function S(C) {
      return g.enter("lineEnding"), g.consume(C), g.exit("lineEnding"), I;
    }
    function I(C) {
      return g.enter("codeFencedFence"), re(C) ? ue(g, D, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(C) : D(C);
    }
    function D(C) {
      return C === i ? (g.enter("codeFencedFenceSequence"), B(C)) : k(C);
    }
    function B(C) {
      return C === i ? (P++, g.consume(C), B) : P >= A ? (g.exit("codeFencedFenceSequence"), re(C) ? ue(g, Q, "whitespace")(C) : Q(C)) : k(C);
    }
    function Q(C) {
      return C === null || V(C) ? (g.exit("codeFencedFence"), x(C)) : k(C);
    }
  } };
  let i, a = 0, A = 0;
  return function(g) {
    return function(x) {
      const k = r.events[r.events.length - 1];
      return a = k && k[1].type === "linePrefix" ? k[2].sliceSerialize(k[1], !0).length : 0, i = x, e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), s(x);
    }(g);
  };
  function s(g) {
    return g === i ? (A++, e.consume(g), s) : A < 3 ? n(g) : (e.exit("codeFencedFenceSequence"), re(g) ? ue(e, d, "whitespace")(g) : d(g));
  }
  function d(g) {
    return g === null || V(g) ? (e.exit("codeFencedFence"), r.interrupt ? t(g) : e.check(mo, p, w)(g)) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", { contentType: "string" }), u(g));
  }
  function u(g) {
    return g === null || V(g) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), d(g)) : re(g) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), ue(e, c, "whitespace")(g)) : g === 96 && g === i ? n(g) : (e.consume(g), u);
  }
  function c(g) {
    return g === null || V(g) ? d(g) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", { contentType: "string" }), l(g));
  }
  function l(g) {
    return g === null || V(g) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), d(g)) : g === 96 && g === i ? n(g) : (e.consume(g), l);
  }
  function p(g) {
    return e.attempt(o, w, f)(g);
  }
  function f(g) {
    return e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), m;
  }
  function m(g) {
    return a > 0 && re(g) ? ue(e, h, "linePrefix", a + 1)(g) : h(g);
  }
  function h(g) {
    return g === null || V(g) ? e.check(mo, p, w)(g) : (e.enter("codeFlowValue"), b(g));
  }
  function b(g) {
    return g === null || V(g) ? (e.exit("codeFlowValue"), h(g)) : (e.consume(g), b);
  }
  function w(g) {
    return e.exit("codeFenced"), t(g);
  }
} }, En = { name: "codeIndented", tokenize: function(e, t, n) {
  const r = this;
  return function(s) {
    return e.enter("codeIndented"), ue(e, o, "linePrefix", 5)(s);
  };
  function o(s) {
    const d = r.events[r.events.length - 1];
    return d && d[1].type === "linePrefix" && d[2].sliceSerialize(d[1], !0).length >= 4 ? i(s) : n(s);
  }
  function i(s) {
    return s === null ? A(s) : V(s) ? e.attempt(Il, i, A)(s) : (e.enter("codeFlowValue"), a(s));
  }
  function a(s) {
    return s === null || V(s) ? (e.exit("codeFlowValue"), i(s)) : (e.consume(s), a);
  }
  function A(s) {
    return e.exit("codeIndented"), t(s);
  }
} }, Il = { partial: !0, tokenize: function(e, t, n) {
  const r = this;
  return o;
  function o(a) {
    return r.parser.lazy[r.now().line] ? n(a) : V(a) ? (e.enter("lineEnding"), e.consume(a), e.exit("lineEnding"), o) : ue(e, i, "linePrefix", 5)(a);
  }
  function i(a) {
    const A = r.events[r.events.length - 1];
    return A && A[1].type === "linePrefix" && A[2].sliceSerialize(A[1], !0).length >= 4 ? t(a) : V(a) ? o(a) : n(a);
  }
} }, Tl = { name: "codeText", previous: function(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}, resolve: function(e) {
  let t, n, r = e.length - 4, o = 3;
  if (!(e[o][1].type !== "lineEnding" && e[o][1].type !== "space" || e[r][1].type !== "lineEnding" && e[r][1].type !== "space")) {
    for (t = o; ++t < r; ) if (e[t][1].type === "codeTextData") {
      e[o][1].type = "codeTextPadding", e[r][1].type = "codeTextPadding", o += 2, r -= 2;
      break;
    }
  }
  for (t = o - 1, r++; ++t <= r; ) n === void 0 ? t !== r && e[t][1].type !== "lineEnding" && (n = t) : (t === r || e[t][1].type === "lineEnding") && (e[n][1].type = "codeTextData", t !== n + 2 && (e[n][1].end = e[t - 1][1].end, e.splice(n + 2, t - n - 2), r -= t - n - 2, t = n + 2), n = void 0);
  return e;
}, tokenize: function(e, t, n) {
  let r, o, i = 0;
  return function(u) {
    return e.enter("codeText"), e.enter("codeTextSequence"), a(u);
  };
  function a(u) {
    return u === 96 ? (e.consume(u), i++, a) : (e.exit("codeTextSequence"), A(u));
  }
  function A(u) {
    return u === null ? n(u) : u === 32 ? (e.enter("space"), e.consume(u), e.exit("space"), A) : u === 96 ? (o = e.enter("codeTextSequence"), r = 0, d(u)) : V(u) ? (e.enter("lineEnding"), e.consume(u), e.exit("lineEnding"), A) : (e.enter("codeTextData"), s(u));
  }
  function s(u) {
    return u === null || u === 32 || u === 96 || V(u) ? (e.exit("codeTextData"), A(u)) : (e.consume(u), s);
  }
  function d(u) {
    return u === 96 ? (e.consume(u), r++, d) : r === i ? (e.exit("codeTextSequence"), e.exit("codeText"), t(u)) : (o.type = "codeTextData", s(u));
  }
} };
class Ql {
  constructor(t) {
    this.left = t ? [...t] : [], this.right = [];
  }
  get(t) {
    if (t < 0 || t >= this.left.length + this.right.length) throw new RangeError("Cannot access index `" + t + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return t < this.left.length ? this.left[t] : this.right[this.right.length - t + this.left.length - 1];
  }
  get length() {
    return this.left.length + this.right.length;
  }
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  slice(t, n) {
    const r = n ?? Number.POSITIVE_INFINITY;
    return r < this.left.length ? this.left.slice(t, r) : t > this.left.length ? this.right.slice(this.right.length - r + this.left.length, this.right.length - t + this.left.length).reverse() : this.left.slice(t).concat(this.right.slice(this.right.length - r + this.left.length).reverse());
  }
  splice(t, n, r) {
    const o = n || 0;
    this.setCursor(Math.trunc(t));
    const i = this.right.splice(this.right.length - o, Number.POSITIVE_INFINITY);
    return r && Pt(this.left, r), i.reverse();
  }
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  push(t) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(t);
  }
  pushMany(t) {
    this.setCursor(Number.POSITIVE_INFINITY), Pt(this.left, t);
  }
  unshift(t) {
    this.setCursor(0), this.right.push(t);
  }
  unshiftMany(t) {
    this.setCursor(0), Pt(this.right, t.reverse());
  }
  setCursor(t) {
    if (!(t === this.left.length || t > this.left.length && this.right.length === 0 || t < 0 && this.left.length === 0)) if (t < this.left.length) {
      const n = this.left.splice(t, Number.POSITIVE_INFINITY);
      Pt(this.right, n.reverse());
    } else {
      const n = this.right.splice(this.left.length + this.right.length - t, Number.POSITIVE_INFINITY);
      Pt(this.left, n.reverse());
    }
  }
}
function Pt(e, t) {
  let n = 0;
  if (t.length < 1e4) e.push(...t);
  else for (; n < t.length; ) e.push(...t.slice(n, n + 1e4)), n += 1e4;
}
function Ki(e) {
  const t = {};
  let n, r, o, i, a, A, s, d = -1;
  const u = new Ql(e);
  for (; ++d < u.length; ) {
    for (; d in t; ) d = t[d];
    if (n = u.get(d), d && n[1].type === "chunkFlow" && u.get(d - 1)[1].type === "listItemPrefix" && (A = n[1]._tokenizer.events, o = 0, o < A.length && A[o][1].type === "lineEndingBlank" && (o += 2), o < A.length && A[o][1].type === "content")) for (; ++o < A.length && A[o][1].type !== "content"; ) A[o][1].type === "chunkText" && (A[o][1]._isInFirstContentOfListItem = !0, o++);
    if (n[0] === "enter") n[1].contentType && (Object.assign(t, _l(u, d)), d = t[d], s = !0);
    else if (n[1]._container) {
      for (o = d, r = void 0; o--; ) if (i = u.get(o), i[1].type === "lineEnding" || i[1].type === "lineEndingBlank") i[0] === "enter" && (r && (u.get(r)[1].type = "lineEndingBlank"), i[1].type = "lineEnding", r = o);
      else if (i[1].type !== "linePrefix") break;
      r && (n[1].end = { ...u.get(r)[1].start }, a = u.slice(r, d), a.unshift(n), u.splice(r, d - r + 1, a));
    }
  }
  return We(e, 0, Number.POSITIVE_INFINITY, u.slice(0)), !s;
}
function _l(e, t) {
  const n = e.get(t)[1], r = e.get(t)[2];
  let o = t - 1;
  const i = [], a = n._tokenizer || r.parser[n.contentType](n.start), A = a.events, s = [], d = {};
  let u, c, l = -1, p = n, f = 0, m = 0;
  const h = [m];
  for (; p; ) {
    for (; e.get(++o)[1] !== p; ) ;
    i.push(o), p._tokenizer || (u = r.sliceStream(p), p.next || u.push(null), c && a.defineSkip(p.start), p._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = !0), a.write(u), p._isInFirstContentOfListItem && (a._gfmTasklistFirstContentOfListItem = void 0)), c = p, p = p.next;
  }
  for (p = n; ++l < A.length; ) A[l][0] === "exit" && A[l - 1][0] === "enter" && A[l][1].type === A[l - 1][1].type && A[l][1].start.line !== A[l][1].end.line && (m = l + 1, h.push(m), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (a.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : h.pop(), l = h.length; l--; ) {
    const b = A.slice(h[l], h[l + 1]), w = i.pop();
    s.push([w, w + b.length - 1]), e.splice(w, 2, b);
  }
  for (s.reverse(), l = -1; ++l < s.length; ) d[f + s[l][0]] = f + s[l][1], f += s[l][1] - s[l][0] - 1;
  return d;
}
const Ml = { resolve: function(e) {
  return Ki(e), e;
}, tokenize: function(e, t) {
  let n;
  return function(a) {
    return e.enter("content"), n = e.enter("chunkContent", { contentType: "content" }), r(a);
  };
  function r(a) {
    return a === null ? o(a) : V(a) ? e.check(Ol, i, o)(a) : (e.consume(a), r);
  }
  function o(a) {
    return e.exit("chunkContent"), e.exit("content"), t(a);
  }
  function i(a) {
    return e.consume(a), e.exit("chunkContent"), n.next = e.enter("chunkContent", { contentType: "content", previous: n }), n = n.next, r;
  }
} }, Ol = { partial: !0, tokenize: function(e, t, n) {
  const r = this;
  return function(i) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), ue(e, o, "linePrefix");
  };
  function o(i) {
    if (i === null || V(i)) return n(i);
    const a = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && a && a[1].type === "linePrefix" && a[2].sliceSerialize(a[1], !0).length >= 4 ? t(i) : e.interrupt(r.parser.constructs.flow, n, t)(i);
  }
} };
function Ji(e, t, n, r, o, i, a, A, s) {
  const d = s || Number.POSITIVE_INFINITY;
  let u = 0;
  return function(h) {
    return h === 60 ? (e.enter(r), e.enter(o), e.enter(i), e.consume(h), e.exit(i), c) : h === null || h === 32 || h === 41 || Jn(h) ? n(h) : (e.enter(r), e.enter(a), e.enter(A), e.enter("chunkString", { contentType: "string" }), f(h));
  };
  function c(h) {
    return h === 62 ? (e.enter(i), e.consume(h), e.exit(i), e.exit(o), e.exit(r), t) : (e.enter(A), e.enter("chunkString", { contentType: "string" }), l(h));
  }
  function l(h) {
    return h === 62 ? (e.exit("chunkString"), e.exit(A), c(h)) : h === null || h === 60 || V(h) ? n(h) : (e.consume(h), h === 92 ? p : l);
  }
  function p(h) {
    return h === 60 || h === 62 || h === 92 ? (e.consume(h), l) : l(h);
  }
  function f(h) {
    return u || h !== null && h !== 41 && !Be(h) ? u < d && h === 40 ? (e.consume(h), u++, f) : h === 41 ? (e.consume(h), u--, f) : h === null || h === 32 || h === 40 || Jn(h) ? n(h) : (e.consume(h), h === 92 ? m : f) : (e.exit("chunkString"), e.exit(A), e.exit(a), e.exit(r), t(h));
  }
  function m(h) {
    return h === 40 || h === 41 || h === 92 ? (e.consume(h), f) : f(h);
  }
}
function Zi(e, t, n, r, o, i) {
  const a = this;
  let A, s = 0;
  return function(l) {
    return e.enter(r), e.enter(o), e.consume(l), e.exit(o), e.enter(i), d;
  };
  function d(l) {
    return s > 999 || l === null || l === 91 || l === 93 && !A || l === 94 && !s && "_hiddenFootnoteSupport" in a.parser.constructs ? n(l) : l === 93 ? (e.exit(i), e.enter(o), e.consume(l), e.exit(o), e.exit(r), t) : V(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), d) : (e.enter("chunkString", { contentType: "string" }), u(l));
  }
  function u(l) {
    return l === null || l === 91 || l === 93 || V(l) || s++ > 999 ? (e.exit("chunkString"), d(l)) : (e.consume(l), A || (A = !re(l)), l === 92 ? c : u);
  }
  function c(l) {
    return l === 91 || l === 92 || l === 93 ? (e.consume(l), s++, u) : u(l);
  }
}
function $i(e, t, n, r, o, i) {
  let a;
  return function(c) {
    return c === 34 || c === 39 || c === 40 ? (e.enter(r), e.enter(o), e.consume(c), e.exit(o), a = c === 40 ? 41 : c, A) : n(c);
  };
  function A(c) {
    return c === a ? (e.enter(o), e.consume(c), e.exit(o), e.exit(r), t) : (e.enter(i), s(c));
  }
  function s(c) {
    return c === a ? (e.exit(i), A(a)) : c === null ? n(c) : V(c) ? (e.enter("lineEnding"), e.consume(c), e.exit("lineEnding"), ue(e, s, "linePrefix")) : (e.enter("chunkString", { contentType: "string" }), d(c));
  }
  function d(c) {
    return c === a || c === null || V(c) ? (e.exit("chunkString"), s(c)) : (e.consume(c), c === 92 ? u : d);
  }
  function u(c) {
    return c === a || c === 92 ? (e.consume(c), d) : d(c);
  }
}
function Mt(e, t) {
  let n;
  return function r(o) {
    return V(o) ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), n = !0, r) : re(o) ? ue(e, r, n ? "linePrefix" : "lineSuffix")(o) : t(o);
  };
}
const Ll = { name: "definition", tokenize: function(e, t, n) {
  const r = this;
  let o;
  return function(c) {
    return e.enter("definition"), function(l) {
      return Zi.call(r, e, i, n, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(l);
    }(c);
  };
  function i(c) {
    return o = pt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)), c === 58 ? (e.enter("definitionMarker"), e.consume(c), e.exit("definitionMarker"), a) : n(c);
  }
  function a(c) {
    return Be(c) ? Mt(e, A)(c) : A(c);
  }
  function A(c) {
    return Ji(e, s, n, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(c);
  }
  function s(c) {
    return e.attempt(Nl, d, d)(c);
  }
  function d(c) {
    return re(c) ? ue(e, u, "whitespace")(c) : u(c);
  }
  function u(c) {
    return c === null || V(c) ? (e.exit("definition"), r.parser.defined.push(o), t(c)) : n(c);
  }
} }, Nl = { partial: !0, tokenize: function(e, t, n) {
  return function(a) {
    return Be(a) ? Mt(e, r)(a) : n(a);
  };
  function r(a) {
    return $i(e, o, n, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(a);
  }
  function o(a) {
    return re(a) ? ue(e, i, "whitespace")(a) : i(a);
  }
  function i(a) {
    return a === null || V(a) ? t(a) : n(a);
  }
} }, Rl = { name: "hardBreakEscape", tokenize: function(e, t, n) {
  return function(o) {
    return e.enter("hardBreakEscape"), e.consume(o), r;
  };
  function r(o) {
    return V(o) ? (e.exit("hardBreakEscape"), t(o)) : n(o);
  }
} }, Hl = { name: "headingAtx", resolve: function(e, t) {
  let n, r, o = e.length - 2, i = 3;
  return e[i][1].type === "whitespace" && (i += 2), o - 2 > i && e[o][1].type === "whitespace" && (o -= 2), e[o][1].type === "atxHeadingSequence" && (i === o - 1 || o - 4 > i && e[o - 2][1].type === "whitespace") && (o -= i + 1 === o ? 2 : 4), o > i && (n = { type: "atxHeadingText", start: e[i][1].start, end: e[o][1].end }, r = { type: "chunkText", start: e[i][1].start, end: e[o][1].end, contentType: "text" }, We(e, i, o - i + 1, [["enter", n, t], ["enter", r, t], ["exit", r, t], ["exit", n, t]])), e;
}, tokenize: function(e, t, n) {
  let r = 0;
  return function(s) {
    return e.enter("atxHeading"), function(d) {
      return e.enter("atxHeadingSequence"), o(d);
    }(s);
  };
  function o(s) {
    return s === 35 && r++ < 6 ? (e.consume(s), o) : s === null || Be(s) ? (e.exit("atxHeadingSequence"), i(s)) : n(s);
  }
  function i(s) {
    return s === 35 ? (e.enter("atxHeadingSequence"), a(s)) : s === null || V(s) ? (e.exit("atxHeading"), t(s)) : re(s) ? ue(e, i, "whitespace")(s) : (e.enter("atxHeadingText"), A(s));
  }
  function a(s) {
    return s === 35 ? (e.consume(s), a) : (e.exit("atxHeadingSequence"), i(s));
  }
  function A(s) {
    return s === null || s === 35 || Be(s) ? (e.exit("atxHeadingText"), i(s)) : (e.consume(s), A);
  }
} }, Fl = ["address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "search", "section", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul"], vo = ["pre", "script", "style", "textarea"], Ul = { concrete: !0, name: "htmlFlow", resolveTo: function(e) {
  let t = e.length;
  for (; t-- && (e[t][0] !== "enter" || e[t][1].type !== "htmlFlow"); ) ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}, tokenize: function(e, t, n) {
  const r = this;
  let o, i, a, A, s;
  return function(v) {
    return function(j) {
      return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(j), d;
    }(v);
  };
  function d(v) {
    return v === 33 ? (e.consume(v), u) : v === 47 ? (e.consume(v), i = !0, p) : v === 63 ? (e.consume(v), o = 3, r.interrupt ? t : _) : Ge(v) ? (e.consume(v), a = String.fromCharCode(v), f) : n(v);
  }
  function u(v) {
    return v === 45 ? (e.consume(v), o = 2, c) : v === 91 ? (e.consume(v), o = 5, A = 0, l) : Ge(v) ? (e.consume(v), o = 4, r.interrupt ? t : _) : n(v);
  }
  function c(v) {
    return v === 45 ? (e.consume(v), r.interrupt ? t : _) : n(v);
  }
  function l(v) {
    return v === "CDATA[".charCodeAt(A++) ? (e.consume(v), A === 6 ? r.interrupt ? t : B : l) : n(v);
  }
  function p(v) {
    return Ge(v) ? (e.consume(v), a = String.fromCharCode(v), f) : n(v);
  }
  function f(v) {
    if (v === null || v === 47 || v === 62 || Be(v)) {
      const j = v === 47, q = a.toLowerCase();
      return j || i || !vo.includes(q) ? Fl.includes(a.toLowerCase()) ? (o = 6, j ? (e.consume(v), m) : r.interrupt ? t(v) : B(v)) : (o = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(v) : i ? h(v) : b(v)) : (o = 1, r.interrupt ? t(v) : B(v));
    }
    return v === 45 || Se(v) ? (e.consume(v), a += String.fromCharCode(v), f) : n(v);
  }
  function m(v) {
    return v === 62 ? (e.consume(v), r.interrupt ? t : B) : n(v);
  }
  function h(v) {
    return re(v) ? (e.consume(v), h) : I(v);
  }
  function b(v) {
    return v === 47 ? (e.consume(v), I) : v === 58 || v === 95 || Ge(v) ? (e.consume(v), w) : re(v) ? (e.consume(v), b) : I(v);
  }
  function w(v) {
    return v === 45 || v === 46 || v === 58 || v === 95 || Se(v) ? (e.consume(v), w) : g(v);
  }
  function g(v) {
    return v === 61 ? (e.consume(v), x) : re(v) ? (e.consume(v), g) : b(v);
  }
  function x(v) {
    return v === null || v === 60 || v === 61 || v === 62 || v === 96 ? n(v) : v === 34 || v === 39 ? (e.consume(v), s = v, k) : re(v) ? (e.consume(v), x) : P(v);
  }
  function k(v) {
    return v === s ? (e.consume(v), s = null, S) : v === null || V(v) ? n(v) : (e.consume(v), k);
  }
  function P(v) {
    return v === null || v === 34 || v === 39 || v === 47 || v === 60 || v === 61 || v === 62 || v === 96 || Be(v) ? g(v) : (e.consume(v), P);
  }
  function S(v) {
    return v === 47 || v === 62 || re(v) ? b(v) : n(v);
  }
  function I(v) {
    return v === 62 ? (e.consume(v), D) : n(v);
  }
  function D(v) {
    return v === null || V(v) ? B(v) : re(v) ? (e.consume(v), D) : n(v);
  }
  function B(v) {
    return v === 45 && o === 2 ? (e.consume(v), L) : v === 60 && o === 1 ? (e.consume(v), H) : v === 62 && o === 4 ? (e.consume(v), y) : v === 63 && o === 3 ? (e.consume(v), _) : v === 93 && o === 5 ? (e.consume(v), R) : !V(v) || o !== 6 && o !== 7 ? v === null || V(v) ? (e.exit("htmlFlowData"), Q(v)) : (e.consume(v), B) : (e.exit("htmlFlowData"), e.check(zl, Y, Q)(v));
  }
  function Q(v) {
    return e.check(jl, C, Y)(v);
  }
  function C(v) {
    return e.enter("lineEnding"), e.consume(v), e.exit("lineEnding"), M;
  }
  function M(v) {
    return v === null || V(v) ? Q(v) : (e.enter("htmlFlowData"), B(v));
  }
  function L(v) {
    return v === 45 ? (e.consume(v), _) : B(v);
  }
  function H(v) {
    return v === 47 ? (e.consume(v), a = "", F) : B(v);
  }
  function F(v) {
    if (v === 62) {
      const j = a.toLowerCase();
      return vo.includes(j) ? (e.consume(v), y) : B(v);
    }
    return Ge(v) && a.length < 8 ? (e.consume(v), a += String.fromCharCode(v), F) : B(v);
  }
  function R(v) {
    return v === 93 ? (e.consume(v), _) : B(v);
  }
  function _(v) {
    return v === 62 ? (e.consume(v), y) : v === 45 && o === 2 ? (e.consume(v), _) : B(v);
  }
  function y(v) {
    return v === null || V(v) ? (e.exit("htmlFlowData"), Y(v)) : (e.consume(v), y);
  }
  function Y(v) {
    return e.exit("htmlFlow"), t(v);
  }
} }, zl = { partial: !0, tokenize: function(e, t, n) {
  return function(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), e.attempt(on, t, n);
  };
} }, jl = { partial: !0, tokenize: function(e, t, n) {
  const r = this;
  return function(i) {
    return V(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), o) : n(i);
  };
  function o(i) {
    return r.parser.lazy[r.now().line] ? n(i) : t(i);
  }
} }, Gl = { name: "htmlText", tokenize: function(e, t, n) {
  const r = this;
  let o, i, a;
  return function(y) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(y), A;
  };
  function A(y) {
    return y === 33 ? (e.consume(y), s) : y === 47 ? (e.consume(y), x) : y === 63 ? (e.consume(y), w) : Ge(y) ? (e.consume(y), S) : n(y);
  }
  function s(y) {
    return y === 45 ? (e.consume(y), d) : y === 91 ? (e.consume(y), i = 0, p) : Ge(y) ? (e.consume(y), b) : n(y);
  }
  function d(y) {
    return y === 45 ? (e.consume(y), l) : n(y);
  }
  function u(y) {
    return y === null ? n(y) : y === 45 ? (e.consume(y), c) : V(y) ? (a = u, F(y)) : (e.consume(y), u);
  }
  function c(y) {
    return y === 45 ? (e.consume(y), l) : u(y);
  }
  function l(y) {
    return y === 62 ? H(y) : y === 45 ? c(y) : u(y);
  }
  function p(y) {
    return y === "CDATA[".charCodeAt(i++) ? (e.consume(y), i === 6 ? f : p) : n(y);
  }
  function f(y) {
    return y === null ? n(y) : y === 93 ? (e.consume(y), m) : V(y) ? (a = f, F(y)) : (e.consume(y), f);
  }
  function m(y) {
    return y === 93 ? (e.consume(y), h) : f(y);
  }
  function h(y) {
    return y === 62 ? H(y) : y === 93 ? (e.consume(y), h) : f(y);
  }
  function b(y) {
    return y === null || y === 62 ? H(y) : V(y) ? (a = b, F(y)) : (e.consume(y), b);
  }
  function w(y) {
    return y === null ? n(y) : y === 63 ? (e.consume(y), g) : V(y) ? (a = w, F(y)) : (e.consume(y), w);
  }
  function g(y) {
    return y === 62 ? H(y) : w(y);
  }
  function x(y) {
    return Ge(y) ? (e.consume(y), k) : n(y);
  }
  function k(y) {
    return y === 45 || Se(y) ? (e.consume(y), k) : P(y);
  }
  function P(y) {
    return V(y) ? (a = P, F(y)) : re(y) ? (e.consume(y), P) : H(y);
  }
  function S(y) {
    return y === 45 || Se(y) ? (e.consume(y), S) : y === 47 || y === 62 || Be(y) ? I(y) : n(y);
  }
  function I(y) {
    return y === 47 ? (e.consume(y), H) : y === 58 || y === 95 || Ge(y) ? (e.consume(y), D) : V(y) ? (a = I, F(y)) : re(y) ? (e.consume(y), I) : H(y);
  }
  function D(y) {
    return y === 45 || y === 46 || y === 58 || y === 95 || Se(y) ? (e.consume(y), D) : B(y);
  }
  function B(y) {
    return y === 61 ? (e.consume(y), Q) : V(y) ? (a = B, F(y)) : re(y) ? (e.consume(y), B) : I(y);
  }
  function Q(y) {
    return y === null || y === 60 || y === 61 || y === 62 || y === 96 ? n(y) : y === 34 || y === 39 ? (e.consume(y), o = y, C) : V(y) ? (a = Q, F(y)) : re(y) ? (e.consume(y), Q) : (e.consume(y), M);
  }
  function C(y) {
    return y === o ? (e.consume(y), o = void 0, L) : y === null ? n(y) : V(y) ? (a = C, F(y)) : (e.consume(y), C);
  }
  function M(y) {
    return y === null || y === 34 || y === 39 || y === 60 || y === 61 || y === 96 ? n(y) : y === 47 || y === 62 || Be(y) ? I(y) : (e.consume(y), M);
  }
  function L(y) {
    return y === 47 || y === 62 || Be(y) ? I(y) : n(y);
  }
  function H(y) {
    return y === 62 ? (e.consume(y), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(y);
  }
  function F(y) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(y), e.exit("lineEnding"), R;
  }
  function R(y) {
    return re(y) ? ue(e, _, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(y) : _(y);
  }
  function _(y) {
    return e.enter("htmlTextData"), a(y);
  }
} }, vr = { name: "labelEnd", resolveAll: function(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.length; ) {
    const r = e[t][1];
    if (n.push(e[t]), r.type === "labelImage" || r.type === "labelLink" || r.type === "labelEnd") {
      const o = r.type === "labelImage" ? 4 : 2;
      r.type = "data", t += o;
    }
  }
  return e.length !== n.length && We(e, 0, e.length, n), e;
}, resolveTo: function(e, t) {
  let n, r, o, i, a = e.length, A = 0;
  for (; a--; ) if (n = e[a][1], r) {
    if (n.type === "link" || n.type === "labelLink" && n._inactive) break;
    e[a][0] === "enter" && n.type === "labelLink" && (n._inactive = !0);
  } else if (o) {
    if (e[a][0] === "enter" && (n.type === "labelImage" || n.type === "labelLink") && !n._balanced && (r = a, n.type !== "labelLink")) {
      A = 2;
      break;
    }
  } else n.type === "labelEnd" && (o = a);
  const s = { type: e[r][1].type === "labelLink" ? "link" : "image", start: { ...e[r][1].start }, end: { ...e[e.length - 1][1].end } }, d = { type: "label", start: { ...e[r][1].start }, end: { ...e[o][1].end } }, u = { type: "labelText", start: { ...e[r + A + 2][1].end }, end: { ...e[o - 2][1].start } };
  return i = [["enter", s, t], ["enter", d, t]], i = Qe(i, e.slice(r + 1, r + A + 3)), i = Qe(i, [["enter", u, t]]), i = Qe(i, yr(t.parser.constructs.insideSpan.null, e.slice(r + A + 4, o - 3), t)), i = Qe(i, [["exit", u, t], e[o - 2], e[o - 1], ["exit", d, t]]), i = Qe(i, e.slice(o + 1)), i = Qe(i, [["exit", s, t]]), We(e, r, e.length, i), e;
}, tokenize: function(e, t, n) {
  const r = this;
  let o, i, a = r.events.length;
  for (; a--; ) if ((r.events[a][1].type === "labelImage" || r.events[a][1].type === "labelLink") && !r.events[a][1]._balanced) {
    o = r.events[a][1];
    break;
  }
  return function(c) {
    return o ? o._inactive ? u(c) : (i = r.parser.defined.includes(pt(r.sliceSerialize({ start: o.end, end: r.now() }))), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(c), e.exit("labelMarker"), e.exit("labelEnd"), A) : n(c);
  };
  function A(c) {
    return c === 40 ? e.attempt(Yl, d, i ? d : u)(c) : c === 91 ? e.attempt(Wl, d, i ? s : u)(c) : i ? d(c) : u(c);
  }
  function s(c) {
    return e.attempt(ql, d, u)(c);
  }
  function d(c) {
    return t(c);
  }
  function u(c) {
    return o._balanced = !0, n(c);
  }
} }, Yl = { tokenize: function(e, t, n) {
  return function(u) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(u), e.exit("resourceMarker"), r;
  };
  function r(u) {
    return Be(u) ? Mt(e, o)(u) : o(u);
  }
  function o(u) {
    return u === 41 ? d(u) : Ji(e, i, a, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(u);
  }
  function i(u) {
    return Be(u) ? Mt(e, A)(u) : d(u);
  }
  function a(u) {
    return n(u);
  }
  function A(u) {
    return u === 34 || u === 39 || u === 40 ? $i(e, s, n, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(u) : d(u);
  }
  function s(u) {
    return Be(u) ? Mt(e, d)(u) : d(u);
  }
  function d(u) {
    return u === 41 ? (e.enter("resourceMarker"), e.consume(u), e.exit("resourceMarker"), e.exit("resource"), t) : n(u);
  }
} }, Wl = { tokenize: function(e, t, n) {
  const r = this;
  return function(a) {
    return Zi.call(r, e, o, i, "reference", "referenceMarker", "referenceString")(a);
  };
  function o(a) {
    return r.parser.defined.includes(pt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))) ? t(a) : n(a);
  }
  function i(a) {
    return n(a);
  }
} }, ql = { tokenize: function(e, t, n) {
  return function(o) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), r;
  };
  function r(o) {
    return o === 93 ? (e.enter("referenceMarker"), e.consume(o), e.exit("referenceMarker"), e.exit("reference"), t) : n(o);
  }
} }, Vl = { name: "labelStartImage", resolveAll: vr.resolveAll, tokenize: function(e, t, n) {
  const r = this;
  return function(a) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(a), e.exit("labelImageMarker"), o;
  };
  function o(a) {
    return a === 91 ? (e.enter("labelMarker"), e.consume(a), e.exit("labelMarker"), e.exit("labelImage"), i) : n(a);
  }
  function i(a) {
    return a === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(a) : t(a);
  }
} }, Xl = { name: "labelStartLink", resolveAll: vr.resolveAll, tokenize: function(e, t, n) {
  const r = this;
  return function(i) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(i), e.exit("labelMarker"), e.exit("labelLink"), o;
  };
  function o(i) {
    return i === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(i) : t(i);
  }
} }, kn = { name: "lineEnding", tokenize: function(e, t) {
  return function(n) {
    return e.enter("lineEnding"), e.consume(n), e.exit("lineEnding"), ue(e, t, "linePrefix");
  };
} }, Vt = { name: "thematicBreak", tokenize: function(e, t, n) {
  let r, o = 0;
  return function(A) {
    return e.enter("thematicBreak"), function(s) {
      return r = s, i(s);
    }(A);
  };
  function i(A) {
    return A === r ? (e.enter("thematicBreakSequence"), a(A)) : o >= 3 && (A === null || V(A)) ? (e.exit("thematicBreak"), t(A)) : n(A);
  }
  function a(A) {
    return A === r ? (e.consume(A), o++, a) : (e.exit("thematicBreakSequence"), re(A) ? ue(e, i, "whitespace")(A) : i(A));
  }
} }, Pe = { continuation: { tokenize: function(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(on, function(i) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, ue(e, t, "listItemIndent", r.containerState.size + 1)(i);
  }, function(i) {
    return r.containerState.furtherBlankLines || !re(i) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, o(i)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(Jl, t, o)(i));
  });
  function o(i) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, ue(e, e.attempt(Pe, t, n), "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(i);
  }
} }, exit: function(e) {
  e.exit(this.containerState.type);
}, name: "list", tokenize: function(e, t, n) {
  const r = this, o = r.events[r.events.length - 1];
  let i = o && o[1].type === "linePrefix" ? o[2].sliceSerialize(o[1], !0).length : 0, a = 0;
  return function(l) {
    const p = r.containerState.type || (l === 42 || l === 43 || l === 45 ? "listUnordered" : "listOrdered");
    if (p === "listUnordered" ? !r.containerState.marker || l === r.containerState.marker : Zn(l)) {
      if (r.containerState.type || (r.containerState.type = p, e.enter(p, { _container: !0 })), p === "listUnordered") return e.enter("listItemPrefix"), l === 42 || l === 45 ? e.check(Vt, n, s)(l) : s(l);
      if (!r.interrupt || l === 49) return e.enter("listItemPrefix"), e.enter("listItemValue"), A(l);
    }
    return n(l);
  };
  function A(l) {
    return Zn(l) && ++a < 10 ? (e.consume(l), A) : (!r.interrupt || a < 2) && (r.containerState.marker ? l === r.containerState.marker : l === 41 || l === 46) ? (e.exit("listItemValue"), s(l)) : n(l);
  }
  function s(l) {
    return e.enter("listItemMarker"), e.consume(l), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || l, e.check(on, r.interrupt ? n : d, e.attempt(Kl, c, u));
  }
  function d(l) {
    return r.containerState.initialBlankLine = !0, i++, c(l);
  }
  function u(l) {
    return re(l) ? (e.enter("listItemPrefixWhitespace"), e.consume(l), e.exit("listItemPrefixWhitespace"), c) : n(l);
  }
  function c(l) {
    return r.containerState.size = i + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(l);
  }
} }, Kl = { partial: !0, tokenize: function(e, t, n) {
  const r = this;
  return ue(e, function(o) {
    const i = r.events[r.events.length - 1];
    return !re(o) && i && i[1].type === "listItemPrefixWhitespace" ? t(o) : n(o);
  }, "listItemPrefixWhitespace", r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
} }, Jl = { partial: !0, tokenize: function(e, t, n) {
  const r = this;
  return ue(e, function(o) {
    const i = r.events[r.events.length - 1];
    return i && i[1].type === "listItemIndent" && i[2].sliceSerialize(i[1], !0).length === r.containerState.size ? t(o) : n(o);
  }, "listItemIndent", r.containerState.size + 1);
} }, bo = { name: "setextUnderline", resolveTo: function(e, t) {
  let n, r, o, i = e.length;
  for (; i--; ) if (e[i][0] === "enter") {
    if (e[i][1].type === "content") {
      n = i;
      break;
    }
    e[i][1].type === "paragraph" && (r = i);
  } else e[i][1].type === "content" && e.splice(i, 1), !o && e[i][1].type === "definition" && (o = i);
  const a = { type: "setextHeading", start: { ...e[r][1].start }, end: { ...e[e.length - 1][1].end } };
  return e[r][1].type = "setextHeadingText", o ? (e.splice(r, 0, ["enter", a, t]), e.splice(o + 1, 0, ["exit", e[n][1], t]), e[n][1].end = { ...e[o][1].end }) : e[n][1] = a, e.push(["exit", a, t]), e;
}, tokenize: function(e, t, n) {
  const r = this;
  let o;
  return function(A) {
    let s, d = r.events.length;
    for (; d--; ) if (r.events[d][1].type !== "lineEnding" && r.events[d][1].type !== "linePrefix" && r.events[d][1].type !== "content") {
      s = r.events[d][1].type === "paragraph";
      break;
    }
    return r.parser.lazy[r.now().line] || !r.interrupt && !s ? n(A) : (e.enter("setextHeadingLine"), o = A, function(u) {
      return e.enter("setextHeadingLineSequence"), i(u);
    }(A));
  };
  function i(A) {
    return A === o ? (e.consume(A), i) : (e.exit("setextHeadingLineSequence"), re(A) ? ue(e, a, "lineSuffix")(A) : a(A));
  }
  function a(A) {
    return A === null || V(A) ? (e.exit("setextHeadingLine"), t(A)) : n(A);
  }
} }, Zl = { tokenize: function(e) {
  const t = this, n = e.attempt(on, function(o) {
    return o === null ? void e.consume(o) : (e.enter("lineEndingBlank"), e.consume(o), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n);
  }, e.attempt(this.parser.constructs.flowInitial, r, ue(e, e.attempt(this.parser.constructs.flow, r, e.attempt(Ml, r)), "linePrefix")));
  return n;
  function r(o) {
    if (o !== null) return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), t.currentConstruct = void 0, n;
    e.consume(o);
  }
} }, $l = { resolveAll: ta() }, ec = ea("string"), tc = ea("text");
function ea(e) {
  return { resolveAll: ta(e === "text" ? nc : void 0), tokenize: function(t) {
    const n = this, r = this.parser.constructs[e], o = t.attempt(r, i, a);
    return i;
    function i(d) {
      return s(d) ? o(d) : a(d);
    }
    function a(d) {
      if (d !== null) return t.enter("data"), t.consume(d), A;
      t.consume(d);
    }
    function A(d) {
      return s(d) ? (t.exit("data"), o(d)) : (t.consume(d), A);
    }
    function s(d) {
      if (d === null) return !0;
      const u = r[d];
      let c = -1;
      if (u) for (; ++c < u.length; ) {
        const l = u[c];
        if (!l.previous || l.previous.call(n, n.previous)) return !0;
      }
      return !1;
    }
  } };
}
function ta(e) {
  return function(t, n) {
    let r, o = -1;
    for (; ++o <= t.length; ) r === void 0 ? t[o] && t[o][1].type === "data" && (r = o, o++) : (!t[o] || t[o][1].type !== "data") && (o !== r + 2 && (t[r][1].end = t[o - 1][1].end, t.splice(r + 2, o - r - 2), o = r + 2), r = void 0);
    return e ? e(t, n) : t;
  };
}
function nc(e, t) {
  let n = 0;
  for (; ++n <= e.length; ) if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
    const r = e[n - 1][1], o = t.sliceStream(r);
    let i, a = o.length, A = -1, s = 0;
    for (; a--; ) {
      const d = o[a];
      if (typeof d == "string") {
        for (A = d.length; d.charCodeAt(A - 1) === 32; ) s++, A--;
        if (A) break;
        A = -1;
      } else if (d === -2) i = !0, s++;
      else if (d !== -1) {
        a++;
        break;
      }
    }
    if (s) {
      const d = { type: n === e.length || i || s < 2 ? "lineSuffix" : "hardBreakTrailing", start: { _bufferIndex: a ? A : r.start._bufferIndex + A, _index: r.start._index + a, line: r.end.line, column: r.end.column - s, offset: r.end.offset - s }, end: { ...r.end } };
      r.end = { ...d.start }, r.start.offset === r.end.offset ? Object.assign(r, d) : (e.splice(n, 0, ["enter", d, t], ["exit", d, t]), n += 2);
    }
    n++;
  }
  return e;
}
const rc = { 42: Pe, 43: Pe, 45: Pe, 48: Pe, 49: Pe, 50: Pe, 51: Pe, 52: Pe, 53: Pe, 54: Pe, 55: Pe, 56: Pe, 57: Pe, 62: qi }, oc = { 91: Ll }, ic = { [-2]: En, [-1]: En, 32: En }, ac = { 35: Hl, 42: Vt, 45: [bo, Vt], 60: Ul, 61: bo, 95: Vt, 96: yo, 126: yo }, Ac = { 38: Xi, 92: Vi }, sc = { [-5]: kn, [-4]: kn, [-3]: kn, 33: Vl, 38: Xi, 42: $n, 60: [Sl, Gl], 91: Xl, 92: [Rl, Vi], 93: vr, 95: $n, 96: Tl }, lc = { null: [$n, $l] }, cc = Object.freeze(Object.defineProperty({ __proto__: null, attentionMarkers: { null: [42, 95] }, contentInitial: oc, disable: { null: [] }, document: rc, flow: ac, flowInitial: ic, insideSpan: lc, string: Ac, text: sc }, Symbol.toStringTag, { value: "Module" }));
function uc(e, t, n) {
  let r = { _bufferIndex: -1, _index: 0, line: n && n.line || 1, column: n && n.column || 1, offset: n && n.offset || 0 };
  const o = {}, i = [];
  let a = [], A = [];
  const s = { attempt: m(function(w, g) {
    h(w, g.from);
  }), check: m(f), consume: function(w) {
    V(w) ? (r.line++, r.column = 1, r.offset += w === -3 ? 2 : 1, b()) : w !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === a[r._index].length && (r._bufferIndex = -1, r._index++)), d.previous = w;
  }, enter: function(w, g) {
    const x = g || {};
    return x.type = w, x.start = l(), d.events.push(["enter", x, d]), A.push(x), x;
  }, exit: function(w) {
    const g = A.pop();
    return g.end = l(), d.events.push(["exit", g, d]), g;
  }, interrupt: m(f, { interrupt: !0 }) }, d = { code: null, containerState: {}, defineSkip: function(w) {
    o[w.line] = w.column, b();
  }, events: [], now: l, parser: e, previous: null, sliceSerialize: function(w, g) {
    return function(x, k) {
      let P = -1;
      const S = [];
      let I;
      for (; ++P < x.length; ) {
        const D = x[P];
        let B;
        if (typeof D == "string") B = D;
        else switch (D) {
          case -5:
            B = "\r";
            break;
          case -4:
            B = `
`;
            break;
          case -3:
            B = `\r
`;
            break;
          case -2:
            B = k ? " " : "	";
            break;
          case -1:
            if (!k && I) continue;
            B = " ";
            break;
          default:
            B = String.fromCharCode(D);
        }
        I = D === -2, S.push(B);
      }
      return S.join("");
    }(c(w), g);
  }, sliceStream: c, write: function(w) {
    return a = Qe(a, w), function() {
      let g;
      for (; r._index < a.length; ) {
        const x = a[r._index];
        if (typeof x == "string") for (g = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === g && r._bufferIndex < x.length; ) p(x.charCodeAt(r._bufferIndex));
        else p(x);
      }
    }(), a[a.length - 1] !== null ? [] : (h(t, 0), d.events = yr(i, d.events, d), d.events);
  } };
  let u = t.tokenize.call(d, s);
  return t.resolveAll && i.push(t), d;
  function c(w) {
    return function(g, x) {
      const k = x.start._index, P = x.start._bufferIndex, S = x.end._index, I = x.end._bufferIndex;
      let D;
      if (k === S) D = [g[k].slice(P, I)];
      else {
        if (D = g.slice(k, S), P > -1) {
          const B = D[0];
          typeof B == "string" ? D[0] = B.slice(P) : D.shift();
        }
        I > 0 && D.push(g[S].slice(0, I));
      }
      return D;
    }(a, w);
  }
  function l() {
    const { _bufferIndex: w, _index: g, line: x, column: k, offset: P } = r;
    return { _bufferIndex: w, _index: g, line: x, column: k, offset: P };
  }
  function p(w) {
    u = u(w);
  }
  function f(w, g) {
    g.restore();
  }
  function m(w, g) {
    return function(x, k, P) {
      let S, I, D, B;
      return Array.isArray(x) ? Q(x) : "tokenize" in x ? Q([x]) : /* @__PURE__ */ function(H) {
        return F;
        function F(R) {
          const _ = R !== null && H[R], y = R !== null && H.null;
          return Q([...Array.isArray(_) ? _ : _ ? [_] : [], ...Array.isArray(y) ? y : y ? [y] : []])(R);
        }
      }(x);
      function Q(H) {
        return S = H, I = 0, H.length === 0 ? P : C(H[I]);
      }
      function C(H) {
        return function(F) {
          return B = function() {
            const R = l(), _ = d.previous, y = d.currentConstruct, Y = d.events.length, v = Array.from(A);
            return { from: Y, restore: j };
            function j() {
              r = R, d.previous = _, d.currentConstruct = y, d.events.length = Y, A = v, b();
            }
          }(), D = H, H.partial || (d.currentConstruct = H), H.name && d.parser.constructs.disable.null.includes(H.name) ? L() : H.tokenize.call(g ? Object.assign(Object.create(d), g) : d, s, M, L)(F);
        };
      }
      function M(H) {
        return w(D, B), k;
      }
      function L(H) {
        return B.restore(), ++I < S.length ? C(S[I]) : P;
      }
    };
  }
  function h(w, g) {
    w.resolveAll && !i.includes(w) && i.push(w), w.resolve && We(d.events, g, d.events.length - g, w.resolve(d.events.slice(g), d)), w.resolveTo && (d.events = w.resolveTo(d.events, d));
  }
  function b() {
    r.line in o && r.column < 2 && (r.column = o[r.line], r.offset += o[r.line] - 1);
  }
}
const wo = /[\0\t\n\r]/g, dc = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function pc(e, t, n) {
  if (t) return t;
  if (n.charCodeAt(0) === 35) {
    const r = n.charCodeAt(1), o = r === 120 || r === 88;
    return Wi(n.slice(o ? 2 : 1), o ? 16 : 10);
  }
  return mr(n) || e;
}
const na = {}.hasOwnProperty;
function fc(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), function(r) {
    const o = { transforms: [], canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"], enter: { autolink: s(kr), autolinkProtocol: C, autolinkEmail: C, atxHeading: s(wr), blockQuote: s(xt), characterEscape: C, characterReference: C, codeFenced: s(Rt), codeFencedFenceInfo: d, codeFencedFenceMeta: d, codeIndented: s(Rt, d), codeText: s(un, d), codeTextData: C, data: C, codeFlowValue: C, definition: s(dn), definitionDestinationString: d, definitionLabelString: d, definitionTitleString: d, emphasis: s(ya), hardBreakEscape: s(xr), hardBreakTrailing: s(xr), htmlFlow: s(Er, d), htmlFlowData: C, htmlText: s(Er, d), htmlTextData: C, image: s(va), label: d, link: s(kr), listItem: s(ba), listItemValue: m, listOrdered: s(Pr, f), listUnordered: s(Pr), paragraph: s(wa), reference: pe, referenceString: d, resourceDestinationString: d, resourceTitleString: d, setextHeading: s(wr), strong: s(xa), thematicBreak: s(ka) }, exit: { atxHeading: c(), atxHeadingSequence: I, autolink: c(), autolinkEmail: wt, autolinkProtocol: bt, blockQuote: c(), characterEscapeValue: M, characterReferenceMarkerHexadecimal: Oe, characterReferenceMarkerNumeric: Oe, characterReferenceValue: we, characterReference: Le, codeFenced: c(g), codeFencedFence: w, codeFencedFenceInfo: h, codeFencedFenceMeta: b, codeFlowValue: M, codeIndented: c(x), codeText: c(_), codeTextData: M, data: M, definition: c(), definitionDestinationString: S, definitionLabelString: k, definitionTitleString: P, emphasis: c(), hardBreakEscape: c(H), hardBreakTrailing: c(H), htmlFlow: c(F), htmlFlowData: M, htmlText: c(R), htmlTextData: M, image: c(Y), label: j, labelText: v, lineEnding: L, link: c(y), listItem: c(), listOrdered: c(), listUnordered: c(), paragraph: c(), referenceString: fe, resourceDestinationString: q, resourceTitleString: X, resource: te, setextHeading: c(Q), setextHeadingLineSequence: B, setextHeadingText: D, strong: c(), thematicBreak: c() } };
    ra(o, (r || {}).mdastExtensions || []);
    const i = {};
    return a;
    function a(T) {
      let z = { type: "root", children: [] };
      const K = { stack: [z], tokenStack: [], config: o, enter: u, exit: l, buffer: d, resume: p, data: i }, Ae = [];
      let se = -1;
      for (; ++se < T.length; ) (T[se][1].type === "listOrdered" || T[se][1].type === "listUnordered") && (T[se][0] === "enter" ? Ae.push(se) : se = A(T, Ae.pop(), se));
      for (se = -1; ++se < T.length; ) {
        const Ne = o[T[se][0]];
        na.call(Ne, T[se][1].type) && Ne[T[se][1].type].call(Object.assign({ sliceSerialize: T[se][2].sliceSerialize }, K), T[se][1]);
      }
      if (K.tokenStack.length > 0) {
        const Ne = K.tokenStack[K.tokenStack.length - 1];
        (Ne[1] || xo).call(K, void 0, Ne[0]);
      }
      for (z.position = { start: Je(T.length > 0 ? T[0][1].start : { line: 1, column: 1, offset: 0 }), end: Je(T.length > 0 ? T[T.length - 2][1].end : { line: 1, column: 1, offset: 0 }) }, se = -1; ++se < o.transforms.length; ) z = o.transforms[se](z) || z;
      return z;
    }
    function A(T, z, K) {
      let Ae, se, Ne, Et, Ke = z - 1, kt = -1, Br = !1;
      for (; ++Ke <= K; ) {
        const De = T[Ke];
        switch (De[1].type) {
          case "listUnordered":
          case "listOrdered":
          case "blockQuote":
            De[0] === "enter" ? kt++ : kt--, Et = void 0;
            break;
          case "lineEndingBlank":
            De[0] === "enter" && (Ae && !Et && !kt && !Ne && (Ne = Ke), Et = void 0);
            break;
          case "linePrefix":
          case "listItemValue":
          case "listItemMarker":
          case "listItemPrefix":
          case "listItemPrefixWhitespace":
            break;
          default:
            Et = void 0;
        }
        if (!kt && De[0] === "enter" && De[1].type === "listItemPrefix" || kt === -1 && De[0] === "exit" && (De[1].type === "listUnordered" || De[1].type === "listOrdered")) {
          if (Ae) {
            let st = Ke;
            for (se = void 0; st--; ) {
              const Ve = T[st];
              if (Ve[1].type === "lineEnding" || Ve[1].type === "lineEndingBlank") {
                if (Ve[0] === "exit") continue;
                se && (T[se][1].type = "lineEndingBlank", Br = !0), Ve[1].type = "lineEnding", se = st;
              } else if (Ve[1].type !== "linePrefix" && Ve[1].type !== "blockQuotePrefix" && Ve[1].type !== "blockQuotePrefixWhitespace" && Ve[1].type !== "blockQuoteMarker" && Ve[1].type !== "listItemIndent") break;
            }
            Ne && (!se || Ne < se) && (Ae._spread = !0), Ae.end = Object.assign({}, se ? T[se][1].start : De[1].end), T.splice(se || Ke, 0, ["exit", Ae, De[2]]), Ke++, K++;
          }
          if (De[1].type === "listItemPrefix") {
            const st = { type: "listItem", _spread: !1, start: Object.assign({}, De[1].start), end: void 0 };
            Ae = st, T.splice(Ke, 0, ["enter", st, De[2]]), Ke++, K++, Ne = void 0, Et = !0;
          }
        }
      }
      return T[z][1]._spread = Br, K;
    }
    function s(T, z) {
      return K;
      function K(Ae) {
        u.call(this, T(Ae), Ae), z && z.call(this, Ae);
      }
    }
    function d() {
      this.stack.push({ type: "fragment", children: [] });
    }
    function u(T, z, K) {
      this.stack[this.stack.length - 1].children.push(T), this.stack.push(T), this.tokenStack.push([z, K || void 0]), T.position = { start: Je(z.start), end: void 0 };
    }
    function c(T) {
      return z;
      function z(K) {
        T && T.call(this, K), l.call(this, K);
      }
    }
    function l(T, z) {
      const K = this.stack.pop(), Ae = this.tokenStack.pop();
      if (!Ae) throw new Error("Cannot close `" + T.type + "` (" + _t({ start: T.start, end: T.end }) + "): it’s not open");
      Ae[0].type !== T.type && (z ? z.call(this, T, Ae[0]) : (Ae[1] || xo).call(this, T, Ae[0])), K.position.end = Je(T.end);
    }
    function p() {
      return function(T) {
        const z = yl;
        return Yi(T, typeof z.includeImageAlt != "boolean" || z.includeImageAlt, typeof z.includeHtml != "boolean" || z.includeHtml);
      }(this.stack.pop());
    }
    function f() {
      this.data.expectingFirstListItemValue = !0;
    }
    function m(T) {
      this.data.expectingFirstListItemValue && (this.stack[this.stack.length - 2].start = Number.parseInt(this.sliceSerialize(T), 10), this.data.expectingFirstListItemValue = void 0);
    }
    function h() {
      const T = this.resume();
      this.stack[this.stack.length - 1].lang = T;
    }
    function b() {
      const T = this.resume();
      this.stack[this.stack.length - 1].meta = T;
    }
    function w() {
      this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = !0);
    }
    function g() {
      const T = this.resume();
      this.stack[this.stack.length - 1].value = T.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
    }
    function x() {
      const T = this.resume();
      this.stack[this.stack.length - 1].value = T.replace(/(\r?\n|\r)$/g, "");
    }
    function k(T) {
      const z = this.resume(), K = this.stack[this.stack.length - 1];
      K.label = z, K.identifier = pt(this.sliceSerialize(T)).toLowerCase();
    }
    function P() {
      const T = this.resume();
      this.stack[this.stack.length - 1].title = T;
    }
    function S() {
      const T = this.resume();
      this.stack[this.stack.length - 1].url = T;
    }
    function I(T) {
      const z = this.stack[this.stack.length - 1];
      if (!z.depth) {
        const K = this.sliceSerialize(T).length;
        z.depth = K;
      }
    }
    function D() {
      this.data.setextHeadingSlurpLineEnding = !0;
    }
    function B(T) {
      this.stack[this.stack.length - 1].depth = this.sliceSerialize(T).codePointAt(0) === 61 ? 1 : 2;
    }
    function Q() {
      this.data.setextHeadingSlurpLineEnding = void 0;
    }
    function C(T) {
      const z = this.stack[this.stack.length - 1].children;
      let K = z[z.length - 1];
      (!K || K.type !== "text") && (K = Ea(), K.position = { start: Je(T.start), end: void 0 }, z.push(K)), this.stack.push(K);
    }
    function M(T) {
      const z = this.stack.pop();
      z.value += this.sliceSerialize(T), z.position.end = Je(T.end);
    }
    function L(T) {
      const z = this.stack[this.stack.length - 1];
      if (this.data.atHardBreak)
        return z.children[z.children.length - 1].position.end = Je(T.end), void (this.data.atHardBreak = void 0);
      !this.data.setextHeadingSlurpLineEnding && o.canContainEols.includes(z.type) && (C.call(this, T), M.call(this, T));
    }
    function H() {
      this.data.atHardBreak = !0;
    }
    function F() {
      const T = this.resume();
      this.stack[this.stack.length - 1].value = T;
    }
    function R() {
      const T = this.resume();
      this.stack[this.stack.length - 1].value = T;
    }
    function _() {
      const T = this.resume();
      this.stack[this.stack.length - 1].value = T;
    }
    function y() {
      const T = this.stack[this.stack.length - 1];
      if (this.data.inReference) {
        const z = this.data.referenceType || "shortcut";
        T.type += "Reference", T.referenceType = z, delete T.url, delete T.title;
      } else delete T.identifier, delete T.label;
      this.data.referenceType = void 0;
    }
    function Y() {
      const T = this.stack[this.stack.length - 1];
      if (this.data.inReference) {
        const z = this.data.referenceType || "shortcut";
        T.type += "Reference", T.referenceType = z, delete T.url, delete T.title;
      } else delete T.identifier, delete T.label;
      this.data.referenceType = void 0;
    }
    function v(T) {
      const z = this.sliceSerialize(T), K = this.stack[this.stack.length - 2];
      K.label = function(Ae) {
        return Ae.replace(dc, pc);
      }(z), K.identifier = pt(z).toLowerCase();
    }
    function j() {
      const T = this.stack[this.stack.length - 1], z = this.resume(), K = this.stack[this.stack.length - 1];
      if (this.data.inReference = !0, K.type === "link") {
        const Ae = T.children;
        K.children = Ae;
      } else K.alt = z;
    }
    function q() {
      const T = this.resume();
      this.stack[this.stack.length - 1].url = T;
    }
    function X() {
      const T = this.resume();
      this.stack[this.stack.length - 1].title = T;
    }
    function te() {
      this.data.inReference = void 0;
    }
    function pe() {
      this.data.referenceType = "collapsed";
    }
    function fe(T) {
      const z = this.resume(), K = this.stack[this.stack.length - 1];
      K.label = z, K.identifier = pt(this.sliceSerialize(T)).toLowerCase(), this.data.referenceType = "full";
    }
    function Oe(T) {
      this.data.characterReferenceType = T.type;
    }
    function we(T) {
      const z = this.sliceSerialize(T), K = this.data.characterReferenceType;
      let Ae;
      K ? (Ae = Wi(z, K === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : Ae = mr(z), this.stack[this.stack.length - 1].value += Ae;
    }
    function Le(T) {
      this.stack.pop().position.end = Je(T.end);
    }
    function bt(T) {
      M.call(this, T), this.stack[this.stack.length - 1].url = this.sliceSerialize(T);
    }
    function wt(T) {
      M.call(this, T), this.stack[this.stack.length - 1].url = "mailto:" + this.sliceSerialize(T);
    }
    function xt() {
      return { type: "blockquote", children: [] };
    }
    function Rt() {
      return { type: "code", lang: null, meta: null, value: "" };
    }
    function un() {
      return { type: "inlineCode", value: "" };
    }
    function dn() {
      return { type: "definition", identifier: "", label: null, title: null, url: "" };
    }
    function ya() {
      return { type: "emphasis", children: [] };
    }
    function wr() {
      return { type: "heading", depth: 0, children: [] };
    }
    function xr() {
      return { type: "break" };
    }
    function Er() {
      return { type: "html", value: "" };
    }
    function va() {
      return { type: "image", title: null, url: "", alt: null };
    }
    function kr() {
      return { type: "link", title: null, url: "", children: [] };
    }
    function Pr(T) {
      return { type: "list", ordered: T.type === "listOrdered", start: null, spread: T._spread, children: [] };
    }
    function ba(T) {
      return { type: "listItem", spread: T._spread, checked: null, children: [] };
    }
    function wa() {
      return { type: "paragraph", children: [] };
    }
    function xa() {
      return { type: "strong", children: [] };
    }
    function Ea() {
      return { type: "text", value: "" };
    }
    function ka() {
      return { type: "thematicBreak" };
    }
  }(n)(function(r) {
    for (; !Ki(r); ) ;
    return r;
  }(function(r) {
    const o = { constructs: vl([cc, ...(r || {}).extensions || []]), content: i(Dl), defined: [], document: i(Cl), flow: i(Zl), lazy: {}, string: i(ec), text: i(tc) };
    return o;
    function i(a) {
      return function(A) {
        return uc(o, a, A);
      };
    }
  }(n).document().write((/* @__PURE__ */ function() {
    let r, o = 1, i = "", a = !0;
    return function(A, s, d) {
      const u = [];
      let c, l, p, f, m;
      for (A = i + (typeof A == "string" ? A.toString() : new TextDecoder(s || void 0).decode(A)), p = 0, i = "", a && (A.charCodeAt(0) === 65279 && p++, a = void 0); p < A.length; ) {
        if (wo.lastIndex = p, c = wo.exec(A), f = c && c.index !== void 0 ? c.index : A.length, m = A.charCodeAt(f), !c) {
          i = A.slice(p);
          break;
        }
        if (m === 10 && p === f && r) u.push(-3), r = void 0;
        else switch (r && (u.push(-5), r = void 0), p < f && (u.push(A.slice(p, f)), o += f - p), m) {
          case 0:
            u.push(65533), o++;
            break;
          case 9:
            for (l = 4 * Math.ceil(o / 4), u.push(-2); o++ < l; ) u.push(-1);
            break;
          case 10:
            u.push(-4), o = 1;
            break;
          default:
            r = !0, o = 1;
        }
        p = f + 1;
      }
      return d && (r && u.push(-5), i && u.push(i), u.push(null)), u;
    };
  }())(e, t, !0))));
}
function Je(e) {
  return { line: e.line, column: e.column, offset: e.offset };
}
function ra(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? ra(e, r) : hc(e, r);
  }
}
function hc(e, t) {
  let n;
  for (n in t) if (na.call(t, n)) switch (n) {
    case "canContainEols": {
      const r = t[n];
      r && e[n].push(...r);
      break;
    }
    case "transforms": {
      const r = t[n];
      r && e[n].push(...r);
      break;
    }
    case "enter":
    case "exit": {
      const r = t[n];
      r && Object.assign(e[n], r);
      break;
    }
  }
}
function xo(e, t) {
  throw e ? new Error("Cannot close `" + e.type + "` (" + _t({ start: e.start, end: e.end }) + "): a different token (`" + t.type + "`, " + _t({ start: t.start, end: t.end }) + ") is open") : new Error("Cannot close document, a token (`" + t.type + "`, " + _t({ start: t.start, end: t.end }) + ") is still open");
}
function gc(e) {
  const t = this;
  t.parser = function(n) {
    return fc(n, { ...t.data("settings"), ...e, extensions: t.data("micromarkExtensions") || [], mdastExtensions: t.data("fromMarkdownExtensions") || [] });
  };
}
function Eo(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference") return [{ type: "text", value: "![" + t.alt + r }];
  const o = e.all(t), i = o[0];
  i && i.type === "text" ? i.value = "[" + i.value : o.unshift({ type: "text", value: "[" });
  const a = o[o.length - 1];
  return a && a.type === "text" ? a.value += r : o.push({ type: "text", value: r }), o;
}
function ko(e) {
  return e.spread ?? e.children.length > 1;
}
const Po = 9, Bo = 32;
function mc(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), o = 0;
  const i = [];
  for (; r; ) i.push(Do(t.slice(o, r.index), o > 0, !0), r[0]), o = r.index + r[0].length, r = n.exec(t);
  return i.push(Do(t.slice(o), o > 0, !1)), i.join("");
}
function Do(e, t, n) {
  let r = 0, o = e.length;
  if (t) {
    let i = e.codePointAt(r);
    for (; i === Po || i === Bo; ) r++, i = e.codePointAt(r);
  }
  if (n) {
    let i = e.codePointAt(o - 1);
    for (; i === Po || i === Bo; ) o--, i = e.codePointAt(o - 1);
  }
  return o > r ? e.slice(r, o) : "";
}
const yc = { blockquote: function(e, t) {
  const n = { type: "element", tagName: "blockquote", properties: {}, children: e.wrap(e.all(t), !0) };
  return e.patch(t, n), e.applyData(t, n);
}, break: function(e, t) {
  const n = { type: "element", tagName: "br", properties: {}, children: [] };
  return e.patch(t, n), [e.applyData(t, n), { type: "text", value: `
` }];
}, code: function(e, t) {
  const n = t.value ? t.value + `
` : "", r = {};
  t.lang && (r.className = ["language-" + t.lang]);
  let o = { type: "element", tagName: "code", properties: r, children: [{ type: "text", value: n }] };
  return t.meta && (o.data = { meta: t.meta }), e.patch(t, o), o = e.applyData(t, o), o = { type: "element", tagName: "pre", properties: {}, children: [o] }, e.patch(t, o), o;
}, delete: function(e, t) {
  const n = { type: "element", tagName: "del", properties: {}, children: e.all(t) };
  return e.patch(t, n), e.applyData(t, n);
}, emphasis: function(e, t) {
  const n = { type: "element", tagName: "em", properties: {}, children: e.all(t) };
  return e.patch(t, n), e.applyData(t, n);
}, footnoteReference: function(e, t) {
  const n = typeof e.options.clobberPrefix == "string" ? e.options.clobberPrefix : "user-content-", r = String(t.identifier).toUpperCase(), o = ut(r.toLowerCase()), i = e.footnoteOrder.indexOf(r);
  let a, A = e.footnoteCounts.get(r);
  A === void 0 ? (A = 0, e.footnoteOrder.push(r), a = e.footnoteOrder.length) : a = i + 1, A += 1, e.footnoteCounts.set(r, A);
  const s = { type: "element", tagName: "a", properties: { href: "#" + n + "fn-" + o, id: n + "fnref-" + o + (A > 1 ? "-" + A : ""), dataFootnoteRef: !0, ariaDescribedBy: ["footnote-label"] }, children: [{ type: "text", value: String(a) }] };
  e.patch(t, s);
  const d = { type: "element", tagName: "sup", properties: {}, children: [s] };
  return e.patch(t, d), e.applyData(t, d);
}, heading: function(e, t) {
  const n = { type: "element", tagName: "h" + t.depth, properties: {}, children: e.all(t) };
  return e.patch(t, n), e.applyData(t, n);
}, html: function(e, t) {
  if (e.options.allowDangerousHtml) {
    const n = { type: "raw", value: t.value };
    return e.patch(t, n), e.applyData(t, n);
  }
}, imageReference: function(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r) return Eo(e, t);
  const o = { src: ut(r.url || ""), alt: t.alt };
  r.title !== null && r.title !== void 0 && (o.title = r.title);
  const i = { type: "element", tagName: "img", properties: o, children: [] };
  return e.patch(t, i), e.applyData(t, i);
}, image: function(e, t) {
  const n = { src: ut(t.url) };
  t.alt !== null && t.alt !== void 0 && (n.alt = t.alt), t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "img", properties: n, children: [] };
  return e.patch(t, r), e.applyData(t, r);
}, inlineCode: function(e, t) {
  const n = { type: "text", value: t.value.replace(/\r?\n|\r/g, " ") };
  e.patch(t, n);
  const r = { type: "element", tagName: "code", properties: {}, children: [n] };
  return e.patch(t, r), e.applyData(t, r);
}, linkReference: function(e, t) {
  const n = String(t.identifier).toUpperCase(), r = e.definitionById.get(n);
  if (!r) return Eo(e, t);
  const o = { href: ut(r.url || "") };
  r.title !== null && r.title !== void 0 && (o.title = r.title);
  const i = { type: "element", tagName: "a", properties: o, children: e.all(t) };
  return e.patch(t, i), e.applyData(t, i);
}, link: function(e, t) {
  const n = { href: ut(t.url) };
  t.title !== null && t.title !== void 0 && (n.title = t.title);
  const r = { type: "element", tagName: "a", properties: n, children: e.all(t) };
  return e.patch(t, r), e.applyData(t, r);
}, listItem: function(e, t, n) {
  const r = e.all(t), o = n ? function(u) {
    let c = !1;
    if (u.type === "list") {
      c = u.spread || !1;
      const l = u.children;
      let p = -1;
      for (; !c && ++p < l.length; ) c = ko(l[p]);
    }
    return c;
  }(n) : ko(t), i = {}, a = [];
  if (typeof t.checked == "boolean") {
    const u = r[0];
    let c;
    u && u.type === "element" && u.tagName === "p" ? c = u : (c = { type: "element", tagName: "p", properties: {}, children: [] }, r.unshift(c)), c.children.length > 0 && c.children.unshift({ type: "text", value: " " }), c.children.unshift({ type: "element", tagName: "input", properties: { type: "checkbox", checked: t.checked, disabled: !0 }, children: [] }), i.className = ["task-list-item"];
  }
  let A = -1;
  for (; ++A < r.length; ) {
    const u = r[A];
    (o || A !== 0 || u.type !== "element" || u.tagName !== "p") && a.push({ type: "text", value: `
` }), u.type !== "element" || u.tagName !== "p" || o ? a.push(u) : a.push(...u.children);
  }
  const s = r[r.length - 1];
  s && (o || s.type !== "element" || s.tagName !== "p") && a.push({ type: "text", value: `
` });
  const d = { type: "element", tagName: "li", properties: i, children: a };
  return e.patch(t, d), e.applyData(t, d);
}, list: function(e, t) {
  const n = {}, r = e.all(t);
  let o = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++o < r.length; ) {
    const a = r[o];
    if (a.type === "element" && a.tagName === "li" && a.properties && Array.isArray(a.properties.className) && a.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  const i = { type: "element", tagName: t.ordered ? "ol" : "ul", properties: n, children: e.wrap(r, !0) };
  return e.patch(t, i), e.applyData(t, i);
}, paragraph: function(e, t) {
  const n = { type: "element", tagName: "p", properties: {}, children: e.all(t) };
  return e.patch(t, n), e.applyData(t, n);
}, root: function(e, t) {
  const n = { type: "root", children: e.wrap(e.all(t)) };
  return e.patch(t, n), e.applyData(t, n);
}, strong: function(e, t) {
  const n = { type: "element", tagName: "strong", properties: {}, children: e.all(t) };
  return e.patch(t, n), e.applyData(t, n);
}, table: function(e, t) {
  const n = e.all(t), r = n.shift(), o = [];
  if (r) {
    const a = { type: "element", tagName: "thead", properties: {}, children: e.wrap([r], !0) };
    e.patch(t.children[0], a), o.push(a);
  }
  if (n.length > 0) {
    const a = { type: "element", tagName: "tbody", properties: {}, children: e.wrap(n, !0) }, A = hr(t.children[1]), s = Ui(t.children[t.children.length - 1]);
    A && s && (a.position = { start: A, end: s }), o.push(a);
  }
  const i = { type: "element", tagName: "table", properties: {}, children: e.wrap(o, !0) };
  return e.patch(t, i), e.applyData(t, i);
}, tableCell: function(e, t) {
  const n = { type: "element", tagName: "td", properties: {}, children: e.all(t) };
  return e.patch(t, n), e.applyData(t, n);
}, tableRow: function(e, t, n) {
  const r = n ? n.children : void 0, o = (r ? r.indexOf(t) : 1) === 0 ? "th" : "td", i = n && n.type === "table" ? n.align : void 0, a = i ? i.length : t.children.length;
  let A = -1;
  const s = [];
  for (; ++A < a; ) {
    const u = t.children[A], c = {}, l = i ? i[A] : void 0;
    l && (c.align = l);
    let p = { type: "element", tagName: o, properties: c, children: [] };
    u && (p.children = e.all(u), e.patch(u, p), p = e.applyData(u, p)), s.push(p);
  }
  const d = { type: "element", tagName: "tr", properties: {}, children: e.wrap(s, !0) };
  return e.patch(t, d), e.applyData(t, d);
}, text: function(e, t) {
  const n = { type: "text", value: mc(String(t.value)) };
  return e.patch(t, n), e.applyData(t, n);
}, thematicBreak: function(e, t) {
  const n = { type: "element", tagName: "hr", properties: {}, children: [] };
  return e.patch(t, n), e.applyData(t, n);
}, toml: Ft, yaml: Ft, definition: Ft, footnoteDefinition: Ft };
function Ft() {
}
const Co = typeof self == "object" ? self : globalThis, So = (e) => (/* @__PURE__ */ ((t, n) => {
  const r = (i, a) => (t.set(a, i), i), o = (i) => {
    if (t.has(i)) return t.get(i);
    const [a, A] = n[i];
    switch (a) {
      case 0:
      case -1:
        return r(A, i);
      case 1: {
        const s = r([], i);
        for (const d of A) s.push(o(d));
        return s;
      }
      case 2: {
        const s = r({}, i);
        for (const [d, u] of A) s[o(d)] = o(u);
        return s;
      }
      case 3:
        return r(new Date(A), i);
      case 4: {
        const { source: s, flags: d } = A;
        return r(new RegExp(s, d), i);
      }
      case 5: {
        const s = r(/* @__PURE__ */ new Map(), i);
        for (const [d, u] of A) s.set(o(d), o(u));
        return s;
      }
      case 6: {
        const s = r(/* @__PURE__ */ new Set(), i);
        for (const d of A) s.add(o(d));
        return s;
      }
      case 7: {
        const { name: s, message: d } = A;
        return r(new Co[s](d), i);
      }
      case 8:
        return r(BigInt(A), i);
      case "BigInt":
        return r(Object(BigInt(A)), i);
      case "ArrayBuffer":
        return r(new Uint8Array(A).buffer, A);
      case "DataView": {
        const { buffer: s } = new Uint8Array(A);
        return r(new DataView(s), A);
      }
    }
    return r(new Co[a](A), i);
  };
  return o;
})(/* @__PURE__ */ new Map(), e))(0), ct = "", { toString: vc } = {}, { keys: bc } = Object, Bt = (e) => {
  const t = typeof e;
  if (t !== "object" || !e) return [0, t];
  const n = vc.call(e).slice(8, -1);
  switch (n) {
    case "Array":
      return [1, ct];
    case "Object":
      return [2, ct];
    case "Date":
      return [3, ct];
    case "RegExp":
      return [4, ct];
    case "Map":
      return [5, ct];
    case "Set":
      return [6, ct];
    case "DataView":
      return [1, n];
  }
  return n.includes("Array") ? [1, n] : n.includes("Error") ? [7, n] : [2, n];
}, Ut = ([e, t]) => e === 0 && (t === "function" || t === "symbol"), Io = (e, { json: t, lossy: n } = {}) => {
  const r = [];
  return (/* @__PURE__ */ ((o, i, a, A) => {
    const s = (u, c) => {
      const l = A.push(u) - 1;
      return a.set(c, l), l;
    }, d = (u) => {
      if (a.has(u)) return a.get(u);
      let [c, l] = Bt(u);
      switch (c) {
        case 0: {
          let f = u;
          switch (l) {
            case "bigint":
              c = 8, f = u.toString();
              break;
            case "function":
            case "symbol":
              if (o) throw new TypeError("unable to serialize " + l);
              f = null;
              break;
            case "undefined":
              return s([-1], u);
          }
          return s([c, f], u);
        }
        case 1: {
          if (l) {
            let h = u;
            return l === "DataView" ? h = new Uint8Array(u.buffer) : l === "ArrayBuffer" && (h = new Uint8Array(u)), s([l, [...h]], u);
          }
          const f = [], m = s([c, f], u);
          for (const h of u) f.push(d(h));
          return m;
        }
        case 2: {
          if (l) switch (l) {
            case "BigInt":
              return s([l, u.toString()], u);
            case "Boolean":
            case "Number":
            case "String":
              return s([l, u.valueOf()], u);
          }
          if (i && "toJSON" in u) return d(u.toJSON());
          const f = [], m = s([c, f], u);
          for (const h of bc(u)) (o || !Ut(Bt(u[h]))) && f.push([d(h), d(u[h])]);
          return m;
        }
        case 3:
          return s([c, u.toISOString()], u);
        case 4: {
          const { source: f, flags: m } = u;
          return s([c, { source: f, flags: m }], u);
        }
        case 5: {
          const f = [], m = s([c, f], u);
          for (const [h, b] of u) (o || !Ut(Bt(h)) && !Ut(Bt(b))) && f.push([d(h), d(b)]);
          return m;
        }
        case 6: {
          const f = [], m = s([c, f], u);
          for (const h of u) (o || !Ut(Bt(h))) && f.push(d(h));
          return m;
        }
      }
      const { message: p } = u;
      return s([c, { name: l, message: p }], u);
    };
    return d;
  })(!(t || n), !!t, /* @__PURE__ */ new Map(), r))(e), r;
}, an = typeof structuredClone == "function" ? (e, t) => t && ("json" in t || "lossy" in t) ? So(Io(e, t)) : structuredClone(e) : (e, t) => So(Io(e, t));
function wc(e, t) {
  const n = [{ type: "text", value: "↩" }];
  return t > 1 && n.push({ type: "element", tagName: "sup", properties: {}, children: [{ type: "text", value: String(t) }] }), n;
}
function xc(e, t) {
  return "Back to reference " + (e + 1) + (t > 1 ? "-" + t : "");
}
const oa = function(e) {
  if (e == null) return Ec;
  if (typeof e == "function") return zt(e);
  if (typeof e == "object") return Array.isArray(e) ? function(t) {
    const n = [];
    let r = -1;
    for (; ++r < t.length; ) n[r] = oa(t[r]);
    return zt(o);
    function o(...i) {
      let a = -1;
      for (; ++a < n.length; ) if (n[a].apply(this, i)) return !0;
      return !1;
    }
  }(e) : function(t) {
    const n = t;
    return zt(r);
    function r(o) {
      const i = o;
      let a;
      for (a in t) if (i[a] !== n[a]) return !1;
      return !0;
    }
  }(e);
  if (typeof e == "string") return function(t) {
    return zt(n);
    function n(r) {
      return r && r.type === t;
    }
  }(e);
  throw new Error("Expected function, string, or object as test");
};
function zt(e) {
  return function(t, n, r) {
    return !(!function(o) {
      return o !== null && typeof o == "object" && "type" in o;
    }(t) || !e.call(this, t, typeof n == "number" ? n : void 0, r || void 0));
  };
}
function Ec() {
  return !0;
}
const To = [], kc = !0, Qo = !1, Pc = "skip";
function Bc(e, t, n, r) {
  let o;
  typeof t == "function" && typeof n != "function" ? (r = n, n = t) : o = t;
  const i = oa(o), a = r ? -1 : 1;
  (function A(s, d, u) {
    const c = s && typeof s == "object" ? s : {};
    if (typeof c.type == "string") {
      const p = typeof c.tagName == "string" ? c.tagName : typeof c.name == "string" ? c.name : void 0;
      Object.defineProperty(l, "name", { value: "node (" + s.type + (p ? "<" + p + ">" : "") + ")" });
    }
    return l;
    function l() {
      let p, f, m, h = To;
      if ((!t || i(s, d, u[u.length - 1] || void 0)) && (h = function(b) {
        return Array.isArray(b) ? b : typeof b == "number" ? [kc, b] : b == null ? To : [b];
      }(n(s, u)), h[0] === Qo)) return h;
      if ("children" in s && s.children) {
        const b = s;
        if (b.children && h[0] !== Pc) for (f = (r ? b.children.length : -1) + a, m = u.concat(b); f > -1 && f < b.children.length; ) {
          const w = b.children[f];
          if (p = A(w, f, m)(), p[0] === Qo) return p;
          f = typeof p[1] == "number" ? p[1] : f + a;
        }
      }
      return h;
    }
  })(e, void 0, [])();
}
function ia(e, t, n, r) {
  let o, i, a;
  typeof t == "function" ? (i = void 0, a = t, o = n) : (i = t, a = n, o = r), Bc(e, i, function(A, s) {
    const d = s[s.length - 1], u = d ? d.children.indexOf(A) : void 0;
    return a(A, u, d);
  }, o);
}
const er = {}.hasOwnProperty, Dc = {};
function Cc(e, t) {
  const n = t || Dc, r = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = { ...yc, ...n.handlers }, A = { all: function(s) {
    const d = [];
    if ("children" in s) {
      const u = s.children;
      let c = -1;
      for (; ++c < u.length; ) {
        const l = A.one(u[c], s);
        if (l) {
          if (c && u[c - 1].type === "break" && (!Array.isArray(l) && l.type === "text" && (l.value = _o(l.value)), !Array.isArray(l) && l.type === "element")) {
            const p = l.children[0];
            p && p.type === "text" && (p.value = _o(p.value));
          }
          Array.isArray(l) ? d.push(...l) : d.push(l);
        }
      }
    }
    return d;
  }, applyData: Ic, definitionById: r, footnoteById: o, footnoteCounts: i, footnoteOrder: [], handlers: a, one: function(s, d) {
    const u = s.type, c = A.handlers[u];
    if (er.call(A.handlers, u) && c) return c(A, s, d);
    if (A.options.passThrough && A.options.passThrough.includes(u)) {
      if ("children" in s) {
        const { children: l, ...p } = s, f = an(p);
        return f.children = A.all(s), f;
      }
      return an(s);
    }
    return (A.options.unknownHandler || Tc)(A, s, d);
  }, options: n, patch: Sc, wrap: Qc };
  return ia(e, function(s) {
    if (s.type === "definition" || s.type === "footnoteDefinition") {
      const d = s.type === "definition" ? r : o, u = String(s.identifier).toUpperCase();
      d.has(u) || d.set(u, s);
    }
  }), A;
}
function Sc(e, t) {
  e.position && (t.position = function(n) {
    const r = hr(n), o = Ui(n);
    if (r && o) return { start: r, end: o };
  }(e));
}
function Ic(e, t) {
  let n = t;
  if (e && e.data) {
    const r = e.data.hName, o = e.data.hChildren, i = e.data.hProperties;
    typeof r == "string" && (n.type === "element" ? n.tagName = r : n = { type: "element", tagName: r, properties: {}, children: "children" in n ? n.children : [n] }), n.type === "element" && i && Object.assign(n.properties, an(i)), "children" in n && n.children && o != null && (n.children = o);
  }
  return n;
}
function Tc(e, t) {
  const n = t.data || {}, r = !("value" in t) || er.call(n, "hProperties") || er.call(n, "hChildren") ? { type: "element", tagName: "div", properties: {}, children: e.all(t) } : { type: "text", value: t.value };
  return e.patch(t, r), e.applyData(t, r);
}
function Qc(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push({ type: "text", value: `
` }); ++r < e.length; ) r && n.push({ type: "text", value: `
` }), n.push(e[r]);
  return t && e.length > 0 && n.push({ type: "text", value: `
` }), n;
}
function _o(e) {
  let t = 0, n = e.charCodeAt(t);
  for (; n === 9 || n === 32; ) t++, n = e.charCodeAt(t);
  return e.slice(t);
}
function Mo(e, t) {
  const n = Cc(e, t), r = n.one(e, void 0), o = function(a) {
    const A = typeof a.options.clobberPrefix == "string" ? a.options.clobberPrefix : "user-content-", s = a.options.footnoteBackContent || wc, d = a.options.footnoteBackLabel || xc, u = a.options.footnoteLabel || "Footnotes", c = a.options.footnoteLabelTagName || "h2", l = a.options.footnoteLabelProperties || { className: ["sr-only"] }, p = [];
    let f = -1;
    for (; ++f < a.footnoteOrder.length; ) {
      const m = a.footnoteById.get(a.footnoteOrder[f]);
      if (!m) continue;
      const h = a.all(m), b = String(m.identifier).toUpperCase(), w = ut(b.toLowerCase());
      let g = 0;
      const x = [], k = a.footnoteCounts.get(b);
      for (; k !== void 0 && ++g <= k; ) {
        x.length > 0 && x.push({ type: "text", value: " " });
        let I = typeof s == "string" ? s : s(f, g);
        typeof I == "string" && (I = { type: "text", value: I }), x.push({ type: "element", tagName: "a", properties: { href: "#" + A + "fnref-" + w + (g > 1 ? "-" + g : ""), dataFootnoteBackref: "", ariaLabel: typeof d == "string" ? d : d(f, g), className: ["data-footnote-backref"] }, children: Array.isArray(I) ? I : [I] });
      }
      const P = h[h.length - 1];
      if (P && P.type === "element" && P.tagName === "p") {
        const I = P.children[P.children.length - 1];
        I && I.type === "text" ? I.value += " " : P.children.push({ type: "text", value: " " }), P.children.push(...x);
      } else h.push(...x);
      const S = { type: "element", tagName: "li", properties: { id: A + "fn-" + w }, children: a.wrap(h, !0) };
      a.patch(m, S), p.push(S);
    }
    if (p.length !== 0) return { type: "element", tagName: "section", properties: { dataFootnotes: !0, className: ["footnotes"] }, children: [{ type: "element", tagName: c, properties: { ...an(l), id: "footnote-label" }, children: [{ type: "text", value: u }] }, { type: "text", value: `
` }, { type: "element", tagName: "ol", properties: {}, children: a.wrap(p, !0) }, { type: "text", value: `
` }] };
  }(n), i = Array.isArray(r) ? { type: "root", children: r } : r || { type: "root", children: [] };
  return o && i.children.push({ type: "text", value: `
` }, o), i;
}
function _c(e, t) {
  return e && "run" in e ? async function(n, r) {
    const o = Mo(n, { file: r, ...t });
    await e.run(o, r);
  } : function(n, r) {
    return Mo(n, { file: r, ...e || t });
  };
}
function Oo(e) {
  if (e) throw e;
}
var Pn, Lo, Mc = function() {
  if (Lo) return Pn;
  Lo = 1;
  var e = Object.prototype.hasOwnProperty, t = Object.prototype.toString, n = Object.defineProperty, r = Object.getOwnPropertyDescriptor, o = function(s) {
    return typeof Array.isArray == "function" ? Array.isArray(s) : t.call(s) === "[object Array]";
  }, i = function(s) {
    if (!s || t.call(s) !== "[object Object]") return !1;
    var d, u = e.call(s, "constructor"), c = s.constructor && s.constructor.prototype && e.call(s.constructor.prototype, "isPrototypeOf");
    if (s.constructor && !u && !c) return !1;
    for (d in s) ;
    return typeof d > "u" || e.call(s, d);
  }, a = function(s, d) {
    n && d.name === "__proto__" ? n(s, d.name, { enumerable: !0, configurable: !0, value: d.newValue, writable: !0 }) : s[d.name] = d.newValue;
  }, A = function(s, d) {
    if (d === "__proto__") {
      if (!e.call(s, d)) return;
      if (r) return r(s, d).value;
    }
    return s[d];
  };
  return Pn = function s() {
    var d, u, c, l, p, f, m = arguments[0], h = 1, b = arguments.length, w = !1;
    for (typeof m == "boolean" && (w = m, m = arguments[1] || {}, h = 2), (m == null || typeof m != "object" && typeof m != "function") && (m = {}); h < b; ++h) if ((d = arguments[h]) != null) for (u in d) c = A(m, u), m !== (l = A(d, u)) && (w && l && (i(l) || (p = o(l))) ? (p ? (p = !1, f = c && o(c) ? c : []) : f = c && i(c) ? c : {}, a(m, { name: u, newValue: s(w, f, l) })) : typeof l < "u" && a(m, { name: u, newValue: l }));
    return m;
  }, Pn;
}();
const Bn = Fi(Mc);
function tr(e) {
  if (typeof e != "object" || e === null) return !1;
  const t = Object.getPrototypeOf(e);
  return !(t !== null && t !== Object.prototype && Object.getPrototypeOf(t) !== null || Symbol.toStringTag in e || Symbol.iterator in e);
}
function Oc() {
  const e = [], t = { run: function(...n) {
    let r = -1;
    const o = n.pop();
    if (typeof o != "function") throw new TypeError("Expected function as last argument, not " + o);
    (function i(a, ...A) {
      const s = e[++r];
      let d = -1;
      if (a) o(a);
      else {
        for (; ++d < n.length; ) (A[d] === null || A[d] === void 0) && (A[d] = n[d]);
        n = A, s ? (/* @__PURE__ */ function(u, c) {
          let l;
          return p;
          function p(...h) {
            const b = u.length > h.length;
            let w;
            b && h.push(f);
            try {
              w = u.apply(this, h);
            } catch (g) {
              if (b && l) throw g;
              return f(g);
            }
            b || (w && w.then && typeof w.then == "function" ? w.then(m, f) : w instanceof Error ? f(w) : m(w));
          }
          function f(h, ...b) {
            l || (l = !0, c(h, ...b));
          }
          function m(h) {
            f(null, h);
          }
        }(s, i))(...A) : o(null, ...A);
      }
    })(null, ...n);
  }, use: function(n) {
    if (typeof n != "function") throw new TypeError("Expected `middelware` to be a function, not " + n);
    return e.push(n), t;
  } };
  return t;
}
const ze = { basename: function(e, t) {
  if (t !== void 0 && typeof t != "string") throw new TypeError('"ext" argument must be a string');
  Dt(e);
  let n, r = 0, o = -1, i = e.length;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; i--; ) if (e.codePointAt(i) === 47) {
      if (n) {
        r = i + 1;
        break;
      }
    } else o < 0 && (n = !0, o = i + 1);
    return o < 0 ? "" : e.slice(r, o);
  }
  if (t === e) return "";
  let a = -1, A = t.length - 1;
  for (; i--; ) if (e.codePointAt(i) === 47) {
    if (n) {
      r = i + 1;
      break;
    }
  } else a < 0 && (n = !0, a = i + 1), A > -1 && (e.codePointAt(i) === t.codePointAt(A--) ? A < 0 && (o = i) : (A = -1, o = a));
  return r === o ? o = a : o < 0 && (o = e.length), e.slice(r, o);
}, dirname: function(e) {
  if (Dt(e), e.length === 0) return ".";
  let t, n = -1, r = e.length;
  for (; --r; ) if (e.codePointAt(r) === 47) {
    if (t) {
      n = r;
      break;
    }
  } else t || (t = !0);
  return n < 0 ? e.codePointAt(0) === 47 ? "/" : "." : n === 1 && e.codePointAt(0) === 47 ? "//" : e.slice(0, n);
}, extname: function(e) {
  Dt(e);
  let t, n = e.length, r = -1, o = 0, i = -1, a = 0;
  for (; n--; ) {
    const A = e.codePointAt(n);
    if (A !== 47) r < 0 && (t = !0, r = n + 1), A === 46 ? i < 0 ? i = n : a !== 1 && (a = 1) : i > -1 && (a = -1);
    else if (t) {
      o = n + 1;
      break;
    }
  }
  return i < 0 || r < 0 || a === 0 || a === 1 && i === r - 1 && i === o + 1 ? "" : e.slice(i, r);
}, join: function(...e) {
  let t, n = -1;
  for (; ++n < e.length; ) Dt(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : function(r) {
    Dt(r);
    const o = r.codePointAt(0) === 47;
    let i = function(a, A) {
      let s, d, u = "", c = 0, l = -1, p = 0, f = -1;
      for (; ++f <= a.length; ) {
        if (f < a.length) s = a.codePointAt(f);
        else {
          if (s === 47) break;
          s = 47;
        }
        if (s === 47) {
          if (l !== f - 1 && p !== 1) if (l !== f - 1 && p === 2) {
            if (u.length < 2 || c !== 2 || u.codePointAt(u.length - 1) !== 46 || u.codePointAt(u.length - 2) !== 46) {
              if (u.length > 2) {
                if (d = u.lastIndexOf("/"), d !== u.length - 1) {
                  d < 0 ? (u = "", c = 0) : (u = u.slice(0, d), c = u.length - 1 - u.lastIndexOf("/")), l = f, p = 0;
                  continue;
                }
              } else if (u.length > 0) {
                u = "", c = 0, l = f, p = 0;
                continue;
              }
            }
            A && (u = u.length > 0 ? u + "/.." : "..", c = 2);
          } else u.length > 0 ? u += "/" + a.slice(l + 1, f) : u = a.slice(l + 1, f), c = f - l - 1;
          l = f, p = 0;
        } else s === 46 && p > -1 ? p++ : p = -1;
      }
      return u;
    }(r, !o);
    return i.length === 0 && !o && (i = "."), i.length > 0 && r.codePointAt(r.length - 1) === 47 && (i += "/"), o ? "/" + i : i;
  }(t);
}, sep: "/" };
function Dt(e) {
  if (typeof e != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
}
const Lc = { cwd: function() {
  return "/";
} };
function nr(e) {
  return !!(e !== null && typeof e == "object" && "href" in e && e.href && "protocol" in e && e.protocol && e.auth === void 0);
}
function Nc(e) {
  if (typeof e == "string") e = new URL(e);
  else if (!nr(e)) {
    const t = new TypeError('The "path" argument must be of type string or an instance of URL. Received `' + e + "`");
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return function(t) {
    if (t.hostname !== "") {
      const o = new TypeError('File URL host must be "localhost" or empty on darwin');
      throw o.code = "ERR_INVALID_FILE_URL_HOST", o;
    }
    const n = t.pathname;
    let r = -1;
    for (; ++r < n.length; ) if (n.codePointAt(r) === 37 && n.codePointAt(r + 1) === 50) {
      const o = n.codePointAt(r + 2);
      if (o === 70 || o === 102) {
        const i = new TypeError("File URL path must not include encoded / characters");
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
    return decodeURIComponent(n);
  }(e);
}
const Dn = ["history", "path", "basename", "stem", "extname", "dirname"];
class aa {
  constructor(t) {
    let n;
    var r;
    n = t ? nr(t) ? { path: t } : typeof t == "string" || (r = t) && typeof r == "object" && "byteLength" in r && "byteOffset" in r ? { value: t } : t : {}, this.cwd = "cwd" in n ? "" : Lc.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let o, i = -1;
    for (; ++i < Dn.length; ) {
      const a = Dn[i];
      a in n && n[a] !== void 0 && n[a] !== null && (this[a] = a === "history" ? [...n[a]] : n[a]);
    }
    for (o in n) Dn.includes(o) || (this[o] = n[o]);
  }
  get basename() {
    return typeof this.path == "string" ? ze.basename(this.path) : void 0;
  }
  set basename(t) {
    Sn(t, "basename"), Cn(t, "basename"), this.path = ze.join(this.dirname || "", t);
  }
  get dirname() {
    return typeof this.path == "string" ? ze.dirname(this.path) : void 0;
  }
  set dirname(t) {
    No(this.basename, "dirname"), this.path = ze.join(t || "", this.basename);
  }
  get extname() {
    return typeof this.path == "string" ? ze.extname(this.path) : void 0;
  }
  set extname(t) {
    if (Cn(t, "extname"), No(this.dirname, "extname"), t) {
      if (t.codePointAt(0) !== 46) throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1)) throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = ze.join(this.dirname, this.stem + (t || ""));
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(t) {
    nr(t) && (t = Nc(t)), Sn(t, "path"), this.path !== t && this.history.push(t);
  }
  get stem() {
    return typeof this.path == "string" ? ze.basename(this.path, this.extname) : void 0;
  }
  set stem(t) {
    Sn(t, "stem"), Cn(t, "stem"), this.path = ze.join(this.dirname || "", t + (this.extname || ""));
  }
  fail(t, n, r) {
    const o = this.message(t, n, r);
    throw o.fatal = !0, o;
  }
  info(t, n, r) {
    const o = this.message(t, n, r);
    return o.fatal = void 0, o;
  }
  message(t, n, r) {
    const o = new xe(t, n, r);
    return this.path && (o.name = this.path + ":" + o.name, o.file = this.path), o.fatal = !1, this.messages.push(o), o;
  }
  toString(t) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(t || void 0).decode(this.value);
  }
}
function Cn(e, t) {
  if (e && e.includes(ze.sep)) throw new Error("`" + t + "` cannot be a path: did not expect `" + ze.sep + "`");
}
function Sn(e, t) {
  if (!e) throw new Error("`" + t + "` cannot be empty");
}
function No(e, t) {
  if (!e) throw new Error("Setting `" + t + "` requires `path` to be set too");
}
const Rc = function(e) {
  const t = this.constructor.prototype, n = t[e], r = function() {
    return n.apply(r, arguments);
  };
  return Object.setPrototypeOf(r, t), r;
}, Hc = {}.hasOwnProperty;
class br extends Rc {
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = Oc();
  }
  copy() {
    const t = new br();
    let n = -1;
    for (; ++n < this.attachers.length; ) {
      const r = this.attachers[n];
      t.use(...r);
    }
    return t.data(Bn(!0, {}, this.namespace)), t;
  }
  data(t, n) {
    return typeof t == "string" ? arguments.length === 2 ? (Qn("data", this.frozen), this.namespace[t] = n, this) : Hc.call(this.namespace, t) && this.namespace[t] || void 0 : t ? (Qn("data", this.frozen), this.namespace = t, this) : this.namespace;
  }
  freeze() {
    if (this.frozen) return this;
    const t = this;
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [n, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1) continue;
      r[0] === !0 && (r[0] = void 0);
      const o = n.call(t, ...r);
      typeof o == "function" && this.transformers.use(o);
    }
    return this.frozen = !0, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  parse(t) {
    this.freeze();
    const n = jt(t), r = this.parser || this.Parser;
    return In("parse", r), r(String(n), n);
  }
  process(t, n) {
    const r = this;
    return this.freeze(), In("process", this.parser || this.Parser), Tn("process", this.compiler || this.Compiler), n ? o(void 0, n) : new Promise(o);
    function o(i, a) {
      const A = jt(t), s = r.parse(A);
      function d(u, c) {
        u || !c ? a(u) : i ? i(c) : n(void 0, c);
      }
      r.run(s, A, function(u, c, l) {
        if (u || !c || !l) return d(u);
        const p = c, f = r.stringify(p, l);
        var m;
        typeof (m = f) == "string" || function(h) {
          return !!(h && typeof h == "object" && "byteLength" in h && "byteOffset" in h);
        }(m) ? l.value = f : l.result = f, d(u, l);
      });
    }
  }
  processSync(t) {
    let n, r = !1;
    return this.freeze(), In("processSync", this.parser || this.Parser), Tn("processSync", this.compiler || this.Compiler), this.process(t, function(o, i) {
      r = !0, Oo(o), n = i;
    }), Ho("processSync", "process", r), n;
  }
  run(t, n, r) {
    Ro(t), this.freeze();
    const o = this.transformers;
    return !r && typeof n == "function" && (r = n, n = void 0), r ? i(void 0, r) : new Promise(i);
    function i(a, A) {
      const s = jt(n);
      o.run(t, s, function(d, u, c) {
        const l = u || t;
        d ? A(d) : a ? a(l) : r(void 0, l, c);
      });
    }
  }
  runSync(t, n) {
    let r, o = !1;
    return this.run(t, n, function(i, a) {
      Oo(i), r = a, o = !0;
    }), Ho("runSync", "run", o), r;
  }
  stringify(t, n) {
    this.freeze();
    const r = jt(n), o = this.compiler || this.Compiler;
    return Tn("stringify", o), Ro(t), o(t, r);
  }
  use(t, ...n) {
    const r = this.attachers, o = this.namespace;
    if (Qn("use", this.frozen), t != null) if (typeof t == "function") s(t, n);
    else {
      if (typeof t != "object") throw new TypeError("Expected usable value, not `" + t + "`");
      Array.isArray(t) ? A(t) : a(t);
    }
    return this;
    function i(d) {
      if (typeof d == "function") s(d, []);
      else {
        if (typeof d != "object") throw new TypeError("Expected usable value, not `" + d + "`");
        if (Array.isArray(d)) {
          const [u, ...c] = d;
          s(u, c);
        } else a(d);
      }
    }
    function a(d) {
      if (!("plugins" in d) && !("settings" in d)) throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
      A(d.plugins), d.settings && (o.settings = Bn(!0, o.settings, d.settings));
    }
    function A(d) {
      let u = -1;
      if (d != null) {
        if (!Array.isArray(d)) throw new TypeError("Expected a list of plugins, not `" + d + "`");
        for (; ++u < d.length; )
          i(d[u]);
      }
    }
    function s(d, u) {
      let c = -1, l = -1;
      for (; ++c < r.length; ) if (r[c][0] === d) {
        l = c;
        break;
      }
      if (l === -1) r.push([d, ...u]);
      else if (u.length > 0) {
        let [p, ...f] = u;
        const m = r[l][1];
        tr(m) && tr(p) && (p = Bn(!0, m, p)), r[l] = [d, p, ...f];
      }
    }
  }
}
const Fc = new br().freeze();
function In(e, t) {
  if (typeof t != "function") throw new TypeError("Cannot `" + e + "` without `parser`");
}
function Tn(e, t) {
  if (typeof t != "function") throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function Qn(e, t) {
  if (t) throw new Error("Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
function Ro(e) {
  if (!tr(e) || typeof e.type != "string") throw new TypeError("Expected node, got `" + e + "`");
}
function Ho(e, t, n) {
  if (!n) throw new Error("`" + e + "` finished async. Use `" + t + "` instead");
}
function jt(e) {
  return function(t) {
    return !!(t && typeof t == "object" && "message" in t && "messages" in t);
  }(e) ? e : new aa(e);
}
const Fo = [], Uo = { allowDangerousHtml: !0 }, Uc = /^(https?|ircs?|mailto|xmpp)$/i, zc = [{ from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" }, { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" }, { from: "allowNode", id: "replace-allownode-allowedtypes-and-disallowedtypes", to: "allowElement" }, { from: "allowedTypes", id: "replace-allownode-allowedtypes-and-disallowedtypes", to: "allowedElements" }, { from: "disallowedTypes", id: "replace-allownode-allowedtypes-and-disallowedtypes", to: "disallowedElements" }, { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" }, { from: "includeElementIndex", id: "#remove-includeelementindex" }, { from: "includeNodeIndex", id: "change-includenodeindex-to-includeelementindex" }, { from: "linkTarget", id: "remove-linktarget" }, { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" }, { from: "rawSourcePos", id: "#remove-rawsourcepos" }, { from: "renderers", id: "change-renderers-to-components", to: "components" }, { from: "source", id: "change-source-to-children", to: "children" }, { from: "sourcePos", id: "#remove-sourcepos" }, { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" }, { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }];
function jc(e) {
  const t = e.allowedElements, n = e.allowElement, r = e.children || "", o = e.className, i = e.components, a = e.disallowedElements, A = e.rehypePlugins || Fo, s = e.remarkPlugins || Fo, d = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Uo } : Uo, u = e.skipHtml, c = e.unwrapDisallowed, l = e.urlTransform || Gc, p = Fc().use(gc).use(s).use(_c, d).use(A), f = new aa();
  typeof r == "string" && (f.value = r);
  for (const b of zc) Object.hasOwn(e, b.from) && (b.from, b.to && b.to, b.id);
  const m = p.parse(f);
  let h = p.runSync(m, f);
  return o && (h = { type: "element", tagName: "div", properties: { className: o }, children: h.type === "root" ? h.children : [h] }), ia(h, function(b, w, g) {
    if (b.type === "raw" && g && typeof w == "number") return u ? g.children.splice(w, 1) : g.children[w] = { type: "text", value: b.value }, w;
    if (b.type === "element") {
      let x;
      for (x in xn) if (Object.hasOwn(xn, x) && Object.hasOwn(b.properties, x)) {
        const k = b.properties[x], P = xn[x];
        (P === null || P.includes(b.tagName)) && (b.properties[x] = l(String(k || ""), x, b));
      }
    }
    if (b.type === "element") {
      let x = t ? !t.includes(b.tagName) : !!a && a.includes(b.tagName);
      if (!x && n && typeof w == "number" && (x = !n(b, w, g)), x && g && typeof w == "number") return c && b.children ? g.children.splice(w, 1, ...b.children) : g.children.splice(w, 1), w;
    }
  }), pl(h, { Fragment: oe, components: i, ignoreInvalidStyle: !0, jsx: E, jsxs: E, passKeys: !0, passNode: !0 });
}
function Gc(e) {
  const t = e.indexOf(":"), n = e.indexOf("?"), r = e.indexOf("#"), o = e.indexOf("/");
  return t === -1 || o !== -1 && t > o || n !== -1 && t > n || r !== -1 && t > r || Uc.test(e.slice(0, t)) ? e : "";
}
const Yc = ({ children: e }) => E("div", { style: { whiteSpace: "normal" }, children: E(jc, { components: { p: ({ ...t }) => E("p", { style: { margin: 0, marginBottom: "0.5em", lineHeight: 1.4, textAlign: "left" }, children: t.children }), ul: ({ ...t }) => E("ul", { style: { paddingLeft: "clamp(8px, 3.5vw, 16px)", margin: 0, listStylePosition: "inside" }, children: t.children }), ol: ({ ...t }) => E("ol", { style: { paddingLeft: "clamp(8px, 3.5vw, 16px)", margin: 0, listStylePosition: "inside" }, children: t.children }), li: ({ ...t }) => E("li", { style: { marginBottom: "1px", lineHeight: 1.4 }, children: t.children }), code: ({ inline: t, children: n }) => t ? E("code", { style: { backgroundColor: "rgba(0, 0, 0, 0.3)", padding: "2px 4px", borderRadius: "4px", fontFamily: "inherit", fontSize: "0.95em" }, children: n }) : E("pre", { style: { backgroundColor: "rgba(0, 0, 0, 0.3)", padding: "8px", borderRadius: "4px", overflowX: "auto", margin: "0.5em 0", whiteSpace: "pre-wrap" }, children: E("code", { children: n }) }), blockquote: ({ ...t }) => E("blockquote", { style: { margin: 0, paddingLeft: "10px", borderLeft: "2px solid #ccc", color: "#666", fontStyle: "italic" }, children: t.children }) }, children: typeof e == "string" ? e : "" }) }), Wc = { autoConfig: !0 }, qc = (e) => () => ((t) => {
  const { getFlow: n } = cn(), { messages: r, replaceMessages: o } = nn(), { settings: i } = Ci(), { hasChatHistoryLoaded: a } = Si(), A = { ...t, ...Wc }, s = A.markdownComponent ? A.markdownComponent : Yc;
  ee(() => {
    var c, l;
    if (a) {
      const p = [...r];
      for (let f = 0; f < p.length && f < (((c = i.chatHistory) == null ? void 0 : c.maxEntries) ?? 30); f++) {
        const m = p[f];
        (l = m.tags) != null && l.includes("rcb-markdown-renderer-plugin:parsed") && (m.contentWrapper = s);
      }
      o(p);
    }
  }, [a]);
  const d = async (c) => {
    var l;
    const p = (l = c.data.message) == null ? void 0 : l.sender.toUpperCase();
    ((f, m, h) => {
      var b;
      if (typeof f.data.message.content != "string" || !f.detail.currPath) return !1;
      const w = m[f.detail.currPath];
      return !!w && (((b = w.renderMarkdown) == null ? void 0 : b.map((g) => g.toUpperCase()).includes(h)) ?? !1);
    })(c, n(), p) && (c.data.message.contentWrapper = s, c.data.message.tags || (c.data.message.tags = []), c.data.message.tags.push("rcb-markdown-renderer-plugin:parsed"));
  };
  _e(U.PRE_INJECT_MESSAGE, d), _e(U.CHUNK_STREAM_MESSAGE, d), _e(U.START_STREAM_MESSAGE, d), _e(U.START_SIMULATE_STREAM_MESSAGE, d);
  const u = { name: "@rcb-plugins/markdown-renderer" };
  return A != null && A.autoConfig && (u.settings = { event: { rcbPreInjectMessage: !0, rcbChunkStreamMessage: !0, rcbStartSimulateStreamMessage: !0, rcbStartStreamMessage: !0 } }), u;
})(e), Gt = { autoConfig: !0, promptBaseColors: { info: "#007bff", warning: "#ffc107", error: "#dc3545", success: "#28a745" }, promptHoveredColors: { info: "#0056b3", warning: "#d39e00", error: "#c82333", success: "#218838" }, textAreaHighlightColors: { info: "#007bff", warning: "#ffc107", error: "#dc3545", success: "#28a745" } }, zo = (e, t, n = "validateTextInput") => {
  var r;
  if ((r = e.detail) == null || !r.currPath) return;
  const o = t[e.detail.currPath];
  if (!o) return;
  const i = o[n];
  return typeof i == "function" ? i : void 0;
}, Vc = (e) => {
  const { showToast: t } = (() => {
    const { showToast: c, dismissToast: l, toasts: p, replaceToasts: f } = mt();
    return { showToast: c, dismissToast: l, toasts: p, replaceToasts: f };
  })(), { getFlow: n } = cn(), { styles: r, updateStyles: o, replaceStyles: i } = (() => {
    const { styles: c, replaceStyles: l, updateStyles: p } = ki();
    return { styles: c, replaceStyles: l, updateStyles: p };
  })(), a = ((c) => ({ ...Gt, ...c, promptBaseColors: { ...Gt.promptBaseColors }, promptHoveredColors: { ...Gt.promptHoveredColors }, textAreaHighlightColors: { ...Gt.textAreaHighlightColors } }))(e), [A, s] = J(0), d = ie({});
  _e(U.USER_SUBMIT_TEXT, (c) => {
    const l = c, p = zo(l, n(), "validateTextInput");
    if (!p) return;
    const f = p(l.data.inputText);
    if (f != null && f.success || c.preventDefault(), !f.promptContent) return;
    A === 0 && (d.current = structuredClone(r));
    const m = ((h, b) => {
      const w = h.promptType ?? "info";
      let g = {};
      return b.advancedStyles && (g = b.advancedStyles[w]), b.promptBaseColors && (g.toastPromptStyle = { color: b.promptBaseColors[w], borderColor: b.promptBaseColors[w] }), b.promptHoveredColors && (g.toastPromptHoveredStyle = { color: b.promptHoveredColors[w], borderColor: b.promptHoveredColors[w] }), b.textAreaHighlightColors && (h.highlightTextArea ?? !0) && (g.chatInputAreaStyle = { boxShadow: `${b.textAreaHighlightColors[w]} 0px 0px 5px` }), g;
    })(f, a);
    o(m), t(f.promptContent, f.promptDuration ?? 3e3), s((h) => h + 1);
  }), _e(U.USER_UPLOAD_FILE, (c) => {
    var l, p;
    const f = c, m = (p = (l = f.data) == null ? void 0 : l.files) == null ? void 0 : p[0];
    if (!m) return console.error("No file uploaded."), void c.preventDefault();
    const h = zo(f, n(), "validateFileInput");
    if (!h) return void console.error("Validator not found for file input.");
    const b = h(m);
    if (!b.success) return console.error("Validation failed:", b), b.promptContent && t(b.promptContent, b.promptDuration ?? 3e3), void c.preventDefault();
    console.log("Validation successful:", b);
  }), _e(U.DISMISS_TOAST, () => {
    s((c) => c - 1);
  }), ee(() => {
    A === 0 && setTimeout(() => {
      i(d.current);
    });
  }, [A, i]);
  const u = { name: "@rcb-plugins/input-validator" };
  return a.autoConfig && (u.settings = { event: { rcbUserSubmitText: !0, rcbUserUploadFile: !0, rcbDismissToast: !0 } }), u;
}, be = [];
for (let e = 0; e < 256; ++e) be.push((e + 256).toString(16).slice(1));
let _n;
const Xc = new Uint8Array(16);
var jo = { randomUUID: typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto) };
function Kc(e, t, n) {
  var o;
  if (jo.randomUUID && !e) return jo.randomUUID();
  const r = (e = e || {}).random ?? ((o = e.rng) == null ? void 0 : o.call(e)) ?? function() {
    if (!_n) {
      if (typeof crypto > "u" || !crypto.getRandomValues) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      _n = crypto.getRandomValues.bind(crypto);
    }
    return _n(Xc);
  }();
  if (r.length < 16) throw new Error("Random bytes length must be >= 16");
  return r[6] = 15 & r[6] | 64, r[8] = 63 & r[8] | 128, function(i, a = 0) {
    return (be[i[a + 0]] + be[i[a + 1]] + be[i[a + 2]] + be[i[a + 3]] + "-" + be[i[a + 4]] + be[i[a + 5]] + "-" + be[i[a + 6]] + be[i[a + 7]] + "-" + be[i[a + 8]] + be[i[a + 9]] + "-" + be[i[a + 10]] + be[i[a + 11]] + be[i[a + 12]] + be[i[a + 13]] + be[i[a + 14]] + be[i[a + 15]]).toLowerCase();
  }(r);
}
const ve = { LOGIN_URL: "/login", WELCOME_MESSAGE: "Hello! What can I help you with?", WELCOME_MESSAGE_LOGGED_OUT: "To ask questions, please log in.", WELCOME_MESSAGE_LOGIN_TRANSITION: "Welcome! You are now logged in. What can I help you with?", WELCOME_MESSAGE_LOGOUT_TRANSITION: "You have been logged out.", API_ENDPOINT: "https://access-ai.ccs.uky.edu/api/query", netlifyBaseUrl: (typeof process < "u" && process.env, "https://access-jsm-api.netlify.app"), ERRORS: { API_UNAVAILABLE: "Unable to contact the Q&A Bot. Please try again later." }, BEHAVIOR: { SHOW_RATING_AFTER_FAILED_QUERY: !0 }, THEME: { PRIMARY_COLOR: "#1a5b6e", SECONDARY_COLOR: "#107180", FONT_FAMILY: "Arial, sans-serif" }, CHATBOT: { TITLE: "ACCESS Q&A", AVATAR_URL: "https://support.access-ci.org/themes/contrib/asp-theme/images/icons/ACCESS-arrrow.svg", TOOLTIP_TEXT: "Ask me about ACCESS! 😊" } }, Aa = (e, t) => t || ve.WELCOME_MESSAGE, sa = N.forwardRef(({ embedded: e, isBotLoggedIn: t, currentOpen: n }, r) => {
  const o = nn(), i = (() => {
    const { isChatWindowOpen: s, toggleChatWindow: d, toggleIsBotTyping: u, scrollToBottom: c, getIsChatBotVisible: l } = Ie();
    return { isChatWindowOpen: s, toggleChatWindow: d, toggleIsBotTyping: u, scrollToBottom: c, getIsChatBotVisible: l };
  })(), a = ie(n), A = ie(!1);
  return ((s) => {
    const d = ie(s), { injectMessage: u } = nn();
    ee(() => {
      const c = d.current !== s, l = !d.current && s;
      c && u(l ? ve.WELCOME_MESSAGE_LOGIN_TRANSITION : ve.WELCOME_MESSAGE_LOGOUT_TRANSITION, "bot"), d.current = s;
    }, [s, u]);
  })(t), ee(() => {
    !e && i && i.toggleChatWindow && (a.current === n || A.current || i && i.toggleChatWindow && (i.toggleChatWindow(n), a.current = n), A.current = !1);
  }, [n, e, i]), ee(() => {
    const s = () => {
      A.current = !0;
    };
    r && (r.current || (r.current = {}), r.current._markAsUserInteraction = s);
  }), or(r, () => ({ addMessage: (s) => {
    o && o.injectMessage && o.injectMessage(s);
  } }), [o]), null;
});
sa.displayName = "BotController";
const la = qe(), Jc = ({ children: e }) => {
  const [t, n] = J({}), [r, o] = J({}), i = { ticketForm: t, feedbackForm: r, updateTicketForm: (a) => {
    n((A) => ({ ...A, ...a }));
  }, updateFeedbackForm: (a) => {
    o((A) => ({ ...A, ...a }));
  }, resetTicketForm: () => {
    n({});
  }, resetFeedbackForm: () => {
    o({});
  }, setTicketForm: n, setFeedbackForm: o };
  return N.createElement(la.Provider, { value: i }, e);
}, ca = () => {
  const e = He(la);
  if (!e) throw new Error("useFormContext must be used within a FormProvider");
  return e;
}, ua = ({ width: e = 24, height: t = 24, color: n = "currentColor", children: r, ...o }) => N.createElement("svg", Zt({ xmlns: "http://www.w3.org/2000/svg", width: e, height: t, viewBox: "0 0 24 24", fill: "none", stroke: n, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false" }, o), r), Zc = (e) => N.createElement(ua, e, N.createElement("path", { d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" })), $c = () => {
  const { restartFlow: e } = cn(), { resetTicketForm: t, resetFeedbackForm: n } = ca();
  return N.createElement("button", { onClick: () => {
    t(), n(), e();
  }, tabIndex: 0, "aria-label": "New chat conversation", style: { backgroundColor: "#107180", border: "none", color: "#ffffff", fontSize: "14px", cursor: "pointer", padding: "8px 12px", borderRadius: "4px", transition: "all 0.2s ease", display: "flex", alignItems: "center", gap: "6px", fontWeight: "500" }, onMouseEnter: (r) => {
    r.target.style.backgroundColor = "#0d5f6b";
  }, onMouseLeave: (r) => {
    r.target.style.backgroundColor = "#107180";
  } }, N.createElement(Zc, { width: 16, height: 16 }), "New Chat");
}, eu = () => N.createElement("div", { className: "user-login-icon", style: { alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "50%", backgroundColor: "#1a5b6e", marginRight: "5px" }, role: "img", "aria-label": "User logged in", title: "User logged in" }, N.createElement("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false" }, N.createElement("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), N.createElement("circle", { cx: "12", cy: "7", r: "4" }))), da = ({ loginUrl: e, className: t = "", style: n, isHeaderButton: r = !1 }) => {
  const o = r ? { display: "inline-block", padding: "6px 12px", backgroundColor: "transparent", border: "1px solid #ccc", color: "white", textDecoration: "none", borderRadius: "4px", fontWeight: "normal", textAlign: "center", margin: "8px", fontSize: "12px", opacity: "0.8", transition: "all 0.2s ease" } : { display: "inline-block", padding: "10px 20px", backgroundColor: "white", border: "1px solid #107180", color: "#107180", textDecoration: "none", borderRadius: "4px", fontWeight: "bold", textAlign: "center", margin: "18px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" };
  return N.createElement(N.Fragment, null, r && N.createElement("style", null, `
            .rcb-chat-header-container .qa-bot-header-login-button:hover {
              background-color: #0000001a !important;
              opacity: 1 !important;
            }
          `), N.createElement("a", { href: e, target: "_blank", rel: "noopener noreferrer", className: `qa-bot-login-button ${r ? "qa-bot-header-login-button" : ""} ${t}`, style: { ...o, ...n } }, "Log In"));
}, tu = (e, t, n) => {
  const r = () => {
    try {
      const o = localStorage.getItem("rcb-history");
      if (!o) return null;
      const i = JSON.parse(o);
      if (!Array.isArray(i)) return null;
      let a = null, A = null;
      for (const s of i) if (s.sender === "USER") {
        const d = new Date(s.timestamp).getTime();
        (!A || d > A) && (A = d, a = s);
      }
      return a ? a.id : null;
    } catch (o) {
      return console.warn("Error parsing chat history:", o), null;
    }
  };
  return G(async (o) => {
    const { userInput: i } = o, a = r();
    a && n(a);
    const A = { "Content-Type": "application/json", "X-Origin": "access", "X-API-KEY": e, "X-Session-ID": t, "X-Query-ID": a };
    try {
      const s = { method: "POST", headers: A, body: JSON.stringify({ query: i }) }, d = await fetch(ve.API_ENDPOINT, s), u = (await d.json()).response;
      return await o.streamMessage(u), !0;
    } catch {
      return await o.injectMessage(ve.ERRORS.API_UNAVAILABLE), !1;
    }
  }, [e, n, r, t]);
}, nu = () => (ee(() => {
  const e = (a) => {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Enter", " ", "Home", "End"].includes(a.key)) return;
    const A = document.activeElement;
    if (A && (A.tagName === "INPUT" || A.tagName === "TEXTAREA" || A.contentEditable === "true" || A.classList.contains("rcb-chat-input-textarea"))) return;
    const s = document.querySelector(".rcb-chat-window");
    if (!s) return;
    const d = Array.from(s.querySelectorAll(".rcb-message-container, .rcb-bot-message-container, .rcb-user-message-container")).filter((l) => l.offsetParent !== null);
    if (d.length > 0) {
      const l = d[d.length - 1].querySelector(".rcb-checkbox-container");
      if (l && l.offsetParent !== null) {
        const p = Array.from(l.querySelectorAll(".rcb-checkbox-row-container")), f = l.querySelector(".rcb-checkbox-next-button");
        if (p.length > 0) {
          const m = [...p];
          return f && m.push(f), void ((h, b) => {
            h.preventDefault();
            let w = -1;
            for (let x = 0; x < b.length; x++) if (b[x] === document.activeElement || b[x].contains(document.activeElement)) {
              w = x;
              break;
            }
            w === -1 && (w = 0);
            let g = w;
            switch (h.key) {
              case "ArrowDown":
              case "ArrowRight":
                g = w < b.length - 1 ? w + 1 : 0;
                break;
              case "ArrowUp":
              case "ArrowLeft":
                g = w > 0 ? w - 1 : b.length - 1;
                break;
              case "Home":
                g = 0;
                break;
              case "End":
                g = b.length - 1;
                break;
              case "Enter":
              case " ": {
                const x = b[w], k = new MouseEvent("mousedown", { bubbles: !0, cancelable: !0, view: window });
                return void x.dispatchEvent(k);
              }
              default:
                return;
            }
            b[g].focus(), b[g].setAttribute("tabindex", "0"), b[g].classList.add("keyboard-focused"), b.forEach((x, k) => {
              k !== g && (x.setAttribute("tabindex", "-1"), x.classList.remove("keyboard-focused"));
            });
          })(a, m);
        }
      }
    }
    let u = [];
    if (d.length > 0) {
      const l = d[d.length - 1], p = Array.from(l.querySelectorAll(".rcb-options-container")).filter((f) => f.offsetParent !== null);
      if (p.length > 0) {
        const f = p[p.length - 1];
        u = Array.from(f.querySelectorAll(".rcb-options"));
      }
    }
    if (u.length === 0) return;
    const c = u.findIndex((l) => l === document.activeElement);
    switch (a.key) {
      case "ArrowDown":
      case "ArrowRight": {
        let l;
        a.preventDefault(), l = c < u.length - 1 ? c + 1 : 0, u[l].setAttribute("tabindex", "0"), u.forEach((p, f) => {
          f !== l && (p.setAttribute("tabindex", "-1"), p.classList.remove("keyboard-focused"));
        }), u[l].classList.add("keyboard-focused"), u[l].focus();
        break;
      }
      case "ArrowUp":
      case "ArrowLeft": {
        let l;
        a.preventDefault(), l = c > 0 ? c - 1 : u.length - 1, u[l].setAttribute("tabindex", "0"), u.forEach((p, f) => {
          f !== l && (p.setAttribute("tabindex", "-1"), p.classList.remove("keyboard-focused"));
        }), u[l].classList.add("keyboard-focused"), u[l].focus();
        break;
      }
      case "Enter":
      case " ":
        if (a.preventDefault(), document.activeElement && u.includes(document.activeElement)) {
          const l = document.activeElement;
          if (l.classList.contains("rcb-checkbox-row-container") || l.closest(".rcb-checkbox-row-container")) {
            const p = new MouseEvent("mousedown", { bubbles: !0, cancelable: !0, view: window });
            l.dispatchEvent(p);
            const f = l.querySelector(".rcb-checkbox-label"), m = f ? f.textContent : l.textContent || "checkbox", h = l.querySelector(".rcb-checkbox-mark"), b = h && h.style.backgroundColor ? "checked" : "unchecked";
            t(`${m} ${b}`);
          } else {
            const p = new MouseEvent("mousedown", { bubbles: !0, cancelable: !0, view: window });
            l.dispatchEvent(p);
            const f = l.textContent || l.innerText;
            t(`Selected: ${f}`);
          }
        }
        break;
      case "Home":
        a.preventDefault(), u.length > 0 && (u[0].setAttribute("tabindex", "0"), u.forEach((l, p) => {
          p !== 0 && (l.setAttribute("tabindex", "-1"), l.classList.remove("keyboard-focused"));
        }), u[0].classList.add("keyboard-focused"), u[0].focus());
        break;
      case "End":
        if (a.preventDefault(), u.length > 0) {
          const l = u.length - 1;
          u[l].setAttribute("tabindex", "0"), u.forEach((p, f) => {
            f !== l && (p.setAttribute("tabindex", "-1"), p.classList.remove("keyboard-focused"));
          }), u[l].classList.add("keyboard-focused"), u[l].focus();
        }
    }
  }, t = (a) => {
    const A = document.createElement("div");
    A.setAttribute("aria-live", "assertive"), A.setAttribute("aria-atomic", "true"), A.className = "sr-only", A.textContent = a, document.body.appendChild(A), setTimeout(() => {
      document.body.contains(A) && document.body.removeChild(A);
    }, 1e3);
  }, n = () => {
    let a = document.querySelector(".rcb-chat-window");
    if (a || (a = document.querySelector('[class*="rcb-chat"]')), a || (a = document.querySelector(".qa-bot")), !a) return;
    const A = Array.from(a.querySelectorAll(".rcb-message-container, .rcb-bot-message-container, .rcb-user-message-container")).filter((c) => c.offsetParent !== null);
    if (A.length === 0) return;
    const s = A[A.length - 1], d = Array.from(s.querySelectorAll(".rcb-options-container")).filter((c) => c.offsetParent !== null);
    let u = [];
    if (d.length > 0) {
      const c = d[d.length - 1];
      u = Array.from(c.querySelectorAll(".rcb-options"));
    }
    if (u.length === 0) {
      let c = s.querySelector(".rcb-checkbox-container");
      if (!c && a && (c = a.querySelector(".rcb-checkbox-container")), c && c.offsetParent !== null) {
        const l = Array.from(c.querySelectorAll(".rcb-checkbox-row-container")).filter((p) => p.offsetParent !== null && p.style.display !== "none");
        if (l.length > 0) {
          const p = c.querySelector(".rcb-checkbox-next-button"), f = [...l];
          if (p && p.offsetParent !== null && f.push(p), f.forEach((m, h) => {
            m.setAttribute("tabindex", h === 0 ? "0" : "-1"), h === 0 ? m.classList.add("keyboard-focused") : m.classList.remove("keyboard-focused");
          }), l.length > 1) {
            c.querySelectorAll(".keyboard-nav-hint").forEach((h) => h.remove());
            const m = document.createElement("div");
            m.className = "keyboard-nav-hint", m.textContent = "Use arrow keys ↕ to navigate, Enter to select/deselect, or click any option", m.style.cssText = "font-size: 12px !important; color: #666 !important; margin-bottom: 8px !important; font-style: italic !important; display: block !important;", c.insertBefore(m, c.firstChild);
          }
          return void setTimeout(() => {
            f[0] && f[0].offsetParent !== null && f[0].focus();
          }, 150);
        }
      }
    }
    if (u.length > 0) {
      if (u.forEach((c, l) => {
        const p = l === 0 ? "0" : "-1";
        c.setAttribute("tabindex", p), c.setAttribute("role", "option"), c.setAttribute("aria-posinset", l + 1), c.setAttribute("aria-setsize", u.length), l === 0 ? c.classList.add("keyboard-focused") : c.classList.remove("keyboard-focused");
      }), u.length > 1) {
        const c = d.length > 0 ? d[d.length - 1] : null;
        if (c) {
          c.querySelectorAll(".keyboard-nav-hint").forEach((p) => p.remove());
          const l = document.createElement("div");
          l.className = "keyboard-nav-hint", l.textContent = "Use arrow keys ↕ to navigate, Enter to select, or click any option", l.style.cssText = "font-size: 12px !important; color: #666 !important; margin-bottom: 8px !important; font-style: italic !important; display: block !important;", c.insertBefore(l, c.firstChild);
        }
      } else {
        const c = d.length > 0 ? d[d.length - 1] : null;
        c && c.querySelectorAll(".keyboard-nav-hint").forEach((l) => l.remove());
      }
      setTimeout(() => {
        u[0] && u[0].offsetParent !== null && (u[0].focus(), u.length > 1 && t(`${u.length} options available. Use arrow keys to navigate.`));
      }, 200);
    }
  }, r = new MutationObserver((a) => {
    a.forEach((A) => {
      if (A.type === "childList") {
        const s = Array.from(A.addedNodes), d = s.some((c) => {
          var l, p, f, m;
          return c.nodeType === Node.ELEMENT_NODE && (((l = c.classList) == null ? void 0 : l.contains("rcb-options-container")) || ((p = c.classList) == null ? void 0 : p.contains("rcb-options")) || ((f = c.querySelector) == null ? void 0 : f.call(c, ".rcb-options-container")) || ((m = c.querySelector) == null ? void 0 : m.call(c, ".rcb-options")));
        }), u = s.some((c) => {
          var l, p;
          return c.nodeType === Node.ELEMENT_NODE && (((l = c.classList) == null ? void 0 : l.contains("rcb-checkbox-container")) || ((p = c.querySelector) == null ? void 0 : p.call(c, ".rcb-checkbox-container")));
        });
        (d || u) && (document.querySelectorAll(".rcb-options[tabindex], .rcb-checkbox-row-container[tabindex], .rcb-checkbox-next-button[tabindex]").forEach((c) => {
          c.setAttribute("tabindex", "-1"), c.classList.remove("keyboard-focused");
        }), setTimeout(n, 100));
      }
    });
  }), o = document.querySelector(".rcb-chat-window");
  o && r.observe(o, { childList: !0, subtree: !0 }), document.addEventListener("keydown", e), n();
  const i = setInterval(() => {
    const a = document.querySelectorAll(".rcb-options-container .rcb-options").length > 0, A = document.querySelectorAll(".rcb-checkbox-row-container").length > 0;
    if (a) {
      const s = document.querySelectorAll(".rcb-options[tabindex]").length;
      document.querySelectorAll(".rcb-options").length > s && n();
    }
    if (A) {
      const s = document.querySelectorAll(".rcb-checkbox-row-container[tabindex]").length;
      document.querySelectorAll(".rcb-checkbox-row-container").length > s && n();
    }
  }, 1e3);
  return () => {
    document.removeEventListener("keydown", e), r.disconnect(), clearInterval(i);
  };
}, []), null), ru = ({ fetchAndStreamResponse: e, sessionId: t, currentQueryId: n, apiKey: r }) => ({ go_ahead_and_ask: { message: "Please type your question.", path: "qa_loop" }, qa_loop: { message: async (o) => {
  try {
    return await e(o), "Was this helpful?";
  } catch (i) {
    return console.error("Error in bot flow:", i), ((a) => (console.error("Bot error:", a), a && a.error, ve.ERRORS.API_UNAVAILABLE))(i);
  }
}, renderMarkdown: ["BOT"], options: ["👍 Yes", "👎 No"], chatDisabled: !1, function: async (o) => {
  if ((o.userInput === "👍 Yes" || o.userInput === "👎 No") && r && t) {
    const i = o.userInput === "👍 Yes", a = { "Content-Type": "application/json", "X-Origin": "access", "X-API-KEY": r, "X-Session-ID": t, "X-Query-ID": n, "X-Feedback": i ? 1 : 0 };
    try {
      await fetch(`${ve.API_ENDPOINT}/rating`, { method: "POST", headers: a });
    } catch (A) {
      console.error("Error sending feedback:", A);
    }
  }
}, path: (o) => o.userInput === "👍 Yes" ? "qa_positive_feedback" : o.userInput === "👎 No" ? "qa_negative_feedback" : "qa_loop" }, qa_positive_feedback: { message: "Thank you for your feedback! It helps us improve this tool.", transition: { duration: 1e3 }, path: "go_ahead_and_ask" }, qa_negative_feedback: { message: "Sorry that wasn't useful. Would you like to open a help ticket for assistance?", options: ["Open a help ticket", "Ask another question"], chatDisabled: !0, path: (o) => o.userInput === "Open a help ticket" ? "help_ticket" : "qa_continue" }, qa_continue: { message: "Ask another question, but remember that each question must stand alone.", path: "qa_loop" } }), ou = (e) => N.createElement(ua, e, N.createElement("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }), N.createElement("polyline", { points: "17 8 12 3 7 8" }), N.createElement("line", { x1: "12", y1: "3", x2: "12", y2: "15" })), pa = ({ onFileUpload: e }) => {
  console.log("LOG-000: FileUploadComponent initialized with onFileUpload:", typeof e);
  const [t, n] = J(!1), [r, o] = J([]), [i, a] = J(null), A = ie(null), { captureScreenshot: s, isCapturing: d, isScreenCaptureAvailable: u } = (() => {
    const [h, b] = J(!1), w = () => typeof navigator < "u" && navigator.mediaDevices && typeof navigator.mediaDevices.getDisplayMedia == "function";
    return { captureScreenshot: async () => {
      if (!w()) throw new Error("Screen capture is not available in this environment");
      try {
        b(!0);
        const g = await navigator.mediaDevices.getDisplayMedia({ video: { displaySurface: "browser", cursor: "always", logicalSurface: !0, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: !1 }), x = document.createElement("video");
        x.srcObject = g, await new Promise((D) => {
          x.onloadedmetadata = () => {
            x.play(), D();
          };
        });
        const k = document.createElement("canvas");
        k.width = x.videoWidth, k.height = x.videoHeight, k.getContext("2d").drawImage(x, 0, 0, k.width, k.height);
        const P = await new Promise((D) => k.toBlob(D, "image/png")), S = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-"), I = new File([P], `screenshot-${S}.png`, { type: "image/png" });
        return g.getTracks().forEach((D) => D.stop()), b(!1), I;
      } catch (g) {
        throw console.error("Error capturing screenshot:", g), b(!1), g;
      }
    }, isCapturing: h, isScreenCaptureAvailable: w() };
  })();
  console.log("LOG-000a: Initial selectedFiles state:", r);
  const c = (h) => {
    const b = document.createElement("div");
    b.setAttribute("aria-live", "assertive"), b.setAttribute("aria-atomic", "true"), b.className = "sr-only", b.textContent = h, document.body.appendChild(b), setTimeout(() => document.body.removeChild(b), 1e3);
  }, l = (h) => {
    var k;
    if (console.log("LOG-001: FileUploadComponent: handleFiles called with:", h), console.log("LOG-002: files type:", typeof h), console.log("LOG-003: files constructor:", (k = h == null ? void 0 : h.constructor) == null ? void 0 : k.name), console.log("LOG-004: files is array:", Array.isArray(h)), console.log("LOG-005: files has length property:", "length" in (h || {})), !h) return void console.warn("LOG-006: files is falsy");
    if (!("length" in h)) return void console.warn("LOG-007: files has no length property");
    if (h.length === 0) return void console.warn("LOG-008: files.length is 0");
    let b;
    try {
      console.log("LOG-009: About to call Array.from(files)"), b = Array.from(h), console.log("LOG-010: Array.from successful, result:", b), console.log("LOG-011: newFileArray.length:", b.length);
    } catch (P) {
      return console.error("LOG-012: Error converting files to array:", P), void c("Error processing selected files. Please try again.");
    }
    console.log("LOG-013: selectedFiles before update:", r), console.log("LOG-014: selectedFiles.length:", r == null ? void 0 : r.length);
    const w = [...r || [], ...b];
    console.log("LOG-015: updatedFiles:", w), o(w);
    const g = b.length;
    console.log("LOG-016: fileCount:", g);
    const x = b.map((P) => P.name).join(", ");
    console.log("LOG-017: fileNames:", x), c(`${g} file${g > 1 ? "s" : ""} selected: ${x}`), setTimeout(() => {
      const P = document.querySelector(".rcb-chat-content");
      P && (P.scrollTop = P.scrollHeight);
    }, 100), e && e(w);
  }, p = (h) => {
    h.preventDefault(), h.stopPropagation(), h.type === "dragenter" || h.type === "dragover" ? n(!0) : h.type === "dragleave" && n(!1);
  }, f = () => {
    try {
      A.current && A.current.click();
    } catch (h) {
      console.error("FileUploadComponent: Error in handleButtonClick:", h), c("Error opening file selection dialog. Please try again.");
    }
  }, m = () => {
    a(null);
  };
  return console.log("LOG-048: FileUploadComponent render called"), console.log("LOG-049: Current selectedFiles state in render:", r), N.createElement("div", { className: "file-upload-container", style: { padding: "16px", margin: "8px 0" } }, u && N.createElement("div", { style: { display: "flex", justifyContent: "center", marginBottom: "10px" } }, N.createElement("button", { onClick: (h) => {
    h.preventDefault(), (async () => {
      try {
        console.log("LOG-038: handleScreenshotCapture called");
        const b = await s();
        console.log("LOG-039: Screenshot captured, file:", b), console.log("LOG-040: About to call handleFiles with screenshot file array"), l([b]), c("Screenshot captured successfully");
      } catch (b) {
        console.error("LOG-041: Error in handleScreenshotCapture:", b), c("Error capturing screenshot. Please try again.");
      }
    })();
  }, disabled: d, "aria-describedby": "screenshot-help", "aria-label": d ? "Taking screenshot, please wait" : "Take a screenshot to attach", style: { display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#107180", color: "white", border: "none", borderRadius: "5px", padding: "8px 12px", cursor: d ? "not-allowed" : "pointer", fontSize: "14px", fontWeight: "500", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" } }, N.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, N.createElement("path", { d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" }), N.createElement("circle", { cx: "12", cy: "13", r: "4" })), d ? "Taking screenshot..." : "Take screenshot..."), N.createElement("span", { id: "screenshot-help", className: "sr-only" }, "Captures the current screen and adds it as an attachment")), N.createElement("div", { className: "file-upload-dropzone " + (t ? "active" : ""), onDragEnter: p, onDragLeave: p, onDragOver: p, onDrop: (h) => {
    var b, w, g;
    h.preventDefault(), h.stopPropagation(), n(!1);
    try {
      console.log("LOG-018: handleDrop called with event:", h), console.log("LOG-019: e.dataTransfer:", h.dataTransfer), console.log("LOG-020: e.dataTransfer.files:", (b = h.dataTransfer) == null ? void 0 : b.files), console.log("LOG-021: e.dataTransfer.files type:", typeof ((w = h.dataTransfer) == null ? void 0 : w.files)), console.log("LOG-022: e.dataTransfer.files length property exists:", "length" in (((g = h.dataTransfer) == null ? void 0 : g.files) || {})), h.dataTransfer && h.dataTransfer.files ? (console.log("LOG-023: About to check e.dataTransfer.files.length"), h.dataTransfer.files.length > 0 ? (console.log("LOG-024: Calling handleFiles with e.dataTransfer.files"), l(h.dataTransfer.files)) : console.log("LOG-025: e.dataTransfer.files.length is 0")) : console.log("LOG-026: e.dataTransfer or e.dataTransfer.files is falsy");
    } catch (x) {
      console.error("LOG-027: Error in handleDrop:", x), c("Error processing dropped files. Please try again.");
    }
  }, role: "button", tabIndex: 0, "aria-label": "File upload area. Click to select files or drag and drop files here.", "aria-describedby": "upload-instructions", onKeyDown: (h) => {
    h.key !== "Enter" && h.key !== " " || (h.preventDefault(), f());
  }, style: { padding: "20px", border: "2px dashed #ccc", borderRadius: "8px", backgroundColor: t ? "#f0f8ff" : "#fafafa", transition: "all 0.3s ease" } }, N.createElement("input", { ref: A, type: "file", className: "file-input", onChange: (h) => {
    var b, w, g;
    try {
      console.log("LOG-028: handleFileSelect called with event:", h), console.log("LOG-029: e.target:", h.target), console.log("LOG-030: e.target.files:", (b = h.target) == null ? void 0 : b.files), console.log("LOG-031: e.target.files type:", typeof ((w = h.target) == null ? void 0 : w.files)), console.log("LOG-032: e.target.files length property exists:", "length" in (((g = h.target) == null ? void 0 : g.files) || {})), h.target && h.target.files ? (console.log("LOG-033: About to check e.target.files.length"), h.target.files.length > 0 ? (console.log("LOG-034: Calling handleFiles with e.target.files"), l(h.target.files)) : console.log("LOG-035: e.target.files.length is 0")) : console.log("LOG-036: e.target or e.target.files is falsy");
    } catch (x) {
      console.error("LOG-037: Error in handleFileSelect:", x), c("Error processing selected files. Please try again.");
    }
  }, multiple: !0, style: { display: "none" }, "aria-label": "Select files to upload", accept: "image/*,application/pdf,text/*,.doc,.docx" }), N.createElement("div", { className: "upload-content", onClick: f, style: { cursor: "pointer", flexDirection: "column", alignItems: "center", display: "flex", textAlign: "center", padding: "12px" } }, N.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" } }, N.createElement("div", { style: { display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" } }, N.createElement(ou, null), N.createElement("p", { style: { margin: 0, fontWeight: "bold" } }, "Upload Files")), N.createElement("p", { id: "upload-instructions", style: { margin: 0, fontSize: "14px", color: "#666" } }, "Drag and drop files here or click to select. Accepted: Images, PDFs, Text files (Max 10MB each)")), (console.log("LOG-042: Render - checking selectedFiles.length"), console.log("LOG-043: selectedFiles:", r), console.log("LOG-044: selectedFiles.length:", r == null ? void 0 : r.length), console.log("LOG-045: selectedFiles.length > 0:", (r == null ? void 0 : r.length) > 0), (r == null ? void 0 : r.length) > 0 && N.createElement("div", { className: "selected-files", style: { display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px", alignItems: "center" } }, N.createElement("span", { style: { fontWeight: 400, color: "#888", fontSize: "13px", marginRight: "8px", alignSelf: "center" } }, "Selected files:"), (console.log("LOG-046: About to map selectedFiles"), (r || []).map((h, b) => (console.log(`LOG-047: Mapping file ${b}:`, h), N.createElement("span", { key: b, style: { background: "#fff", color: "#107180", borderRadius: "5px", padding: "4px 12px", fontSize: "14px", marginRight: "4px", marginBottom: "4px", border: "1px solid #ccc", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }, onClick: (w) => {
    w.stopPropagation(), ((g) => {
      a(g);
    })(h);
  } }, N.createElement("span", { onClick: (w) => {
    w.stopPropagation(), ((g) => {
      const x = (r || []).filter((k, P) => P !== g);
      o(x), e && e(x);
    })(b);
  }, style: { cursor: "pointer", color: "#888", fontWeight: "bold", fontSize: "15px", marginRight: "4px", userSelect: "none", lineHeight: 1 }, title: "Remove file", "aria-label": `Remove ${h.name}` }, "×"), h.name, " (", (h.size / 1024).toFixed(1), " KB)")))))))), (() => {
    if (!i) return null;
    const h = i.type.startsWith("image/"), b = i.type.startsWith("text/"), w = i.type === "application/pdf";
    return N.createElement("div", { style: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1e3 }, onClick: m }, N.createElement("div", { style: { backgroundColor: "white", padding: "20px", borderRadius: "8px", maxWidth: "90%", maxHeight: "90%", overflow: "auto", position: "relative" }, onClick: (g) => g.stopPropagation() }, N.createElement("button", { onClick: m, style: { position: "absolute", top: "10px", right: "10px", background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#666" } }, "×"), N.createElement("h3", { style: { marginTop: 0, marginBottom: "16px" } }, i.name), h && N.createElement("img", { src: URL.createObjectURL(i), alt: i.name, style: { maxWidth: "100%", maxHeight: "70vh" } }), b && N.createElement("pre", { style: { whiteSpace: "pre-wrap", wordWrap: "break-word", maxHeight: "70vh", overflow: "auto", padding: "16px", backgroundColor: "#f5f5f5", borderRadius: "4px" } }, URL.createObjectURL(i)), w && N.createElement("iframe", { src: URL.createObjectURL(i), style: { width: "100%", height: "70vh", border: "none" }, title: i.name }), !h && !b && !w && N.createElement("div", { style: { padding: "20px", textAlign: "center" } }, "Preview not available for this file type")));
  })());
}, fa = async (e, t = "support", n = []) => {
  const o = { support: 17, general_help: 17, feedback: 17, loginAccess: 30, loginProvider: 31, security: 26 }, i = { serviceDeskId: t === "security" ? 3 : 2, requestTypeId: o[t] || o.support, requestFieldValues: { ...e } };
  if (n && n.length > 0) {
    const a = await Promise.all(n.map(async (A) => new Promise((s, d) => {
      const u = new FileReader();
      u.onload = () => {
        const c = u.result.split(",")[1];
        s({ fileName: A.name, contentType: A.type, size: A.size, fileData: c });
      }, u.onerror = () => d(new Error(`Failed to read file ${A.name}`)), u.readAsDataURL(A);
    })));
    i.attachments = a;
  }
  return i;
}, ha = async (e, t) => {
  const n = ve.netlifyBaseUrl.replace("/.netlify/functions/", "").replace("/.netlify/functions", "");
  let r;
  r = t === "create-support-ticket" ? `${n}/api/v1/tickets` : t === "create-security-incident" ? `${n}/api/v1/security-incidents` : `${ve.netlifyBaseUrl}/${t}`;
  try {
    const o = await fetch(r, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(e) });
    if (!o.ok) {
      let i = "";
      try {
        const a = await o.text();
        console.error("| ❌ Post data to proxy failed:", o.status, a);
        try {
          const A = JSON.parse(a);
          i = A.message || A.error || a;
        } catch {
          i = a;
        }
      } catch {
        i = `HTTP ${o.status} ${o.statusText}`;
      }
      return o.status === 403 ? i = "The ticket service is temporarily unavailable. Please try again later or contact support directly." : o.status === 404 ? i = "Ticket service not found. Please try again later." : o.status === 500 ? i = "Server error. Please try again later." : o.status === 401 && (i = "Authentication error with the ticket service. Please contact support."), { success: !1, status: o.status, error: i };
    }
    return { success: !0, data: await o.json() };
  } catch (o) {
    return console.error("| ❌ Post data to proxy exception:", o), { success: !1, error: o.message };
  }
}, Mn = (e, t) => N.createElement(pa, { onFileUpload: (n) => e({ ...t || {}, uploadedFiles: n }) }), On = (e) => {
  let t = null;
  return { submitTicket: async (n, r, o = []) => {
    try {
      const i = await fa(n, r, o), a = await ha(i, "create-support-ticket");
      a.success ? (t = { success: !0, ticketKey: a.data.data.ticketKey, ticketUrl: a.data.data.ticketUrl }, e((A) => ({ ...A, ticketKey: a.data.data.ticketKey, ticketUrl: a.data.data.ticketUrl }))) : (console.error(`| ❌ ${r} ticket creation failed:`, a), t = { success: !1, error: a.error || "Unknown error" }, e((A) => ({ ...A, submissionError: a.error || "Unknown error" })));
    } catch (i) {
      console.error(`| ❌ Error sending ${r} data to proxy:`, i), t = { success: !1, error: i.message }, e((a) => ({ ...a, submissionError: i.message }));
    }
  }, getSubmissionResult: () => t };
}, Ln = (e, t = "ticket") => e ? e.success ? e.ticketUrl && e.ticketKey ? `Your ${t} has been submitted successfully.

Ticket: <a href="${e.ticketUrl}" target="_blank">${e.ticketKey}</a>

Our support team will review your request and respond accordingly. Thank you for contacting ACCESS.` : `Your ${t} has been submitted successfully.

Our support team will review your request and respond accordingly. Thank you for contacting ACCESS.` : `We apologize, but there was an error submitting your ${t}: ${e.error || "Unknown error"}

Please try again or contact our support team directly.` : `We apologize, but there was an error submitting your ${t}.

Please try again or contact our support team directly.`, Nn = (e) => e && e.length > 0 ? `
Attachments: ${e.length} file(s) attached` : "";
let rr = null;
const W = () => {
  if (!rr) return console.warn("Form context not available, returning empty form"), {};
  const e = rr.ticketForm;
  return e && typeof e == "object" ? e : {};
}, ge = (e = {}) => {
  const t = W() || {}, n = e && typeof e == "object" ? e : {};
  return { ...t, email: n.email || t.email, name: n.name || t.name, accessId: n.accessId || t.accessId };
}, Xt = () => (e) => (e && e.trim() !== "" || setTimeout(() => {
  const t = document.querySelector(".rcb-chat-input-textarea");
  if (t) {
    t.value = "Not provided";
    const n = new Event("input", { bubbles: !0 });
    t.dispatchEvent(n), setTimeout(() => {
      const r = document.querySelector('.rcb-send-button, .rcb-chat-send-button, [aria-label*="send"], button[type="submit"]');
      if (r) {
        const o = new MouseEvent("mousedown", { bubbles: !0, cancelable: !0, view: window });
        r.dispatchEvent(o);
      }
    }, 200);
  }
}, 100), { success: !0 }), Kt = (e) => e && e.trim() !== "" ? e : "Not provided", Rn = (e) => {
  const t = (e == null ? void 0 : e.trim()) || "";
  return t ? ((n) => !(!n || typeof n != "string") && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(n.trim()))(t) ? { success: !0 } : { success: !1, promptContent: "Please enter a valid email address (e.g., user@example.com).", promptDuration: 3e3, promptType: "error", highlightTextArea: !0 } : { success: !1, promptContent: "Please enter an email address.", promptDuration: 3e3, promptType: "error", highlightTextArea: !0 };
}, iu = ({ ticketForm: e = {}, setTicketForm: t = () => {
}, userInfo: n = {} }) => {
  const r = (({ ticketForm: a = {}, setTicketForm: A = () => {
  }, userInfo: s = {} }) => {
    const { submitTicket: d, getSubmissionResult: u } = On(A);
    return { access_help: { message: `If you're having trouble logging into the ACCESS website, here are some common issues:

• Make sure you're using a supported browser (Chrome, Firefox, Safari)
• Clear your browser cookies and cache
• Check if you're using the correct identity provider

Would you like to submit a help ticket for ACCESS login issues?`, options: ["Yes, let's create a ticket", "Back to Main Menu"], chatDisabled: !0, path: (c) => c.userInput === "Yes, let's create a ticket" ? "access_login_description" : "start" }, access_login_description: { message: "Describe your login issue.", function: (c) => {
      const l = W(), p = { ...l, description: c.userInput, email: s.email || l.email, name: s.name || l.name, accessId: s.accessId || l.accessId };
      A(p);
    }, path: "access_login_identity" }, access_login_identity: { message: "Which identity provider were you using?", options: ["ACCESS", "Github", "Google", "Institution", "Microsoft", "ORCID", "Other"], chatDisabled: !0, function: (c) => {
      const l = W();
      A({ ...l, identityProvider: c.userInput });
    }, path: "access_login_browser" }, access_login_browser: { message: "Which browser were you using?", options: ["Chrome", "Firefox", "Edge", "Safari", "Other"], chatDisabled: !0, function: (c) => {
      const l = W();
      A({ ...l, browser: c.userInput });
    }, path: "access_login_attachment" }, access_login_attachment: { message: "Would you like to attach a screenshot?", options: ["Yes", "No"], chatDisabled: !0, function: (c) => {
      const l = W();
      A({ ...l, wantsAttachment: c.userInput });
    }, path: (c) => c.userInput === "Yes" ? "access_login_upload" : (() => {
      const l = ge(s);
      return l.email ? l.name ? l.accessId ? "access_login_summary" : "access_login_accessid" : "access_login_name" : "access_login_email";
    })() }, access_login_upload: { message: "Please upload your screenshot.", component: Mn(A, a), options: ["Continue"], chatDisabled: !0, function: () => {
      const c = W();
      A({ ...c, uploadConfirmed: !0 });
    }, path: () => {
      const c = ge(s);
      return c.email ? c.name ? c.accessId ? "access_login_summary" : "access_login_accessid" : "access_login_name" : "access_login_email";
    } }, access_login_email: { message: "What is your email?", validateTextInput: (c) => Rn(c), function: (c) => {
      const l = W();
      A({ ...l, email: c.userInput });
    }, path: () => {
      const c = ge(s);
      return c.name ? c.accessId ? "access_login_summary" : "access_login_accessid" : "access_login_name";
    } }, access_login_name: { message: "What is your name?", function: (c) => {
      const l = W();
      A({ ...l, name: c.userInput });
    }, path: () => ge(s).accessId ? "access_login_summary" : "access_login_accessid" }, access_login_accessid: { message: "What is your ACCESS ID? (Optional - press Enter to skip)", validateTextInput: Xt(), function: (c) => {
      const l = W();
      A({ ...l, accessId: Kt(c.userInput) });
    }, path: "access_login_summary" }, access_login_summary: { message: (c) => {
      const l = W(), p = ge(s), f = Nn(l.uploadedFiles);
      let m = p.accessId;
      return c.prevPath === "access_login_accessid" && c.userInput ? m = c.userInput : m || c.prevPath !== "access_login_accessid" || (m = c.userInput), `Thank you for providing your ACCESS login issue details. Here's a summary:

Name: ${p.name || "Not provided"}
Email: ${p.email || "Not provided"}
ACCESS ID: ${m || "Not provided"}
Identity Provider: ${l.identityProvider || "Not provided"}
Browser: ${l.browser || "Not provided"}
Issue Description: ${l.description || "Not provided"}${f}

Would you like to submit this ticket?`;
    }, options: ["Submit Ticket", "Back to Main Menu"], chatDisabled: !0, renderHtml: ["BOT", "USER"], function: async (c) => {
      if (c.userInput === "Submit Ticket") {
        const l = W(), p = ge(s), f = { email: p.email || "", name: p.name || "", accessId: p.accessId || "", description: l.description || "", identityProvider: l.identityProvider || "", browser: l.browser || "" };
        await d(f, "loginAccess", l.uploadedFiles || []);
      }
    }, path: (c) => c.userInput === "Submit Ticket" ? "access_login_success" : "start" }, access_login_success: { message: () => Ln(u(), "ACCESS login ticket"), options: ["Back to Main Menu"], chatDisabled: !0, renderHtml: ["BOT"], path: "start" } };
  })({ ticketForm: e, setTicketForm: t, userInfo: n }), o = (({ ticketForm: a = {}, setTicketForm: A = () => {
  }, userInfo: s = {} }) => {
    const { submitTicket: d, getSubmissionResult: u } = On(A);
    return { affiliated_help: { message: `If you're having trouble logging into an affiliated infrastructure or resource provider, here are some common issues:

• Ensure your allocation is active
• Confirm you have the correct username for that resource
• Check <a href="https://operations.access-ci.org/infrastructure_news_view">System Status News</a> to see if the resource is undergoing maintenance

Would you like to submit a help ticket for resource provider login issues?`, options: ["Yes, let's create a ticket", "Back to Main Menu"], chatDisabled: !0, renderHtml: ["BOT"], path: (c) => c.userInput === "Yes, let's create a ticket" ? "affiliated_login_resource" : "start" }, affiliated_login_resource: { message: "Which ACCESS Resource are you trying to access?", options: ["ACES", "Anvil", "Bridges-2", "DARWIN", "Delta", "DeltaAI", "Derecho", "Expanse", "FASTER", "Granite", "Jetstream2", "KyRIC", "Launch", "Neocortex", "Ookami", "Open Science Grid", "Open Storage Network", "Ranch", "Stampede3"], chatDisabled: !0, function: (c) => {
      const l = W();
      A({ ...l, resource: c.userInput });
    }, path: "affiliated_login_userid" }, affiliated_login_userid: { message: "What is your user ID at the resource?", function: (c) => {
      const l = W();
      A({ ...l, userIdResource: c.userInput });
    }, path: "affiliated_login_description" }, affiliated_login_description: { message: "Please describe the issue you're having logging in.", function: (c) => {
      const l = W(), p = { ...l, description: c.userInput, email: s.email || l.email, name: s.name || l.name, accessId: s.accessId || l.accessId };
      A(p);
    }, path: "affiliated_login_attachment" }, affiliated_login_attachment: { message: "Would you like to attach a screenshot?", options: ["Yes", "No"], chatDisabled: !0, function: (c) => {
      const l = W();
      A({ ...l, wantsAttachment: c.userInput });
    }, path: (c) => c.userInput === "Yes" ? "affiliated_login_upload" : (() => {
      const l = ge(s);
      return l.email ? l.name ? l.accessId ? "affiliated_login_summary" : "affiliated_login_accessid" : "affiliated_login_name" : "affiliated_login_email";
    })() }, affiliated_login_upload: { message: "Please upload your screenshot.", component: Mn(A, a), options: ["Continue"], chatDisabled: !0, function: () => {
      const c = W();
      A({ ...c, uploadConfirmed: !0 });
    }, path: () => {
      const c = ge(s);
      return c.email ? c.name ? c.accessId ? "affiliated_login_summary" : "affiliated_login_accessid" : "affiliated_login_name" : "affiliated_login_email";
    } }, affiliated_login_email: { message: "What is your email?", validateTextInput: (c) => Rn(c), function: (c) => {
      const l = W();
      A({ ...l, email: c.userInput });
    }, path: () => {
      const c = ge(s);
      return c.name ? c.accessId ? "affiliated_login_summary" : "affiliated_login_accessid" : "affiliated_login_name";
    } }, affiliated_login_name: { message: "What is your name?", function: (c) => {
      const l = W();
      A({ ...l, name: c.userInput });
    }, path: () => ge(s).accessId ? "affiliated_login_summary" : "affiliated_login_accessid" }, affiliated_login_accessid: { message: "What is your ACCESS ID? (Optional - press Enter to skip)", validateTextInput: Xt(), function: (c) => {
      const l = W();
      A({ ...l, accessId: Kt(c.userInput) });
    }, path: "affiliated_login_summary" }, affiliated_login_summary: { message: (c) => {
      const l = W(), p = ge(s), f = Nn(l.uploadedFiles);
      let m = p.accessId;
      return c.prevPath === "affiliated_login_accessid" && c.userInput ? m = c.userInput : m || c.prevPath !== "affiliated_login_accessid" || (m = c.userInput), `Thank you for providing your resource login issue details. Here's a summary:

Name: ${p.name || "Not provided"}
Email: ${p.email || "Not provided"}
ACCESS ID: ${m || "Not provided"}
Resource: ${l.resource || "Not provided"}
Resource User ID: ${l.userIdResource || "Not provided"}
Issue Description: ${l.description || "Not provided"}${f}

Would you like to submit this ticket?`;
    }, options: ["Submit Ticket", "Back to Main Menu"], chatDisabled: !0, function: async (c) => {
      if (c.userInput === "Submit Ticket") {
        const l = W(), p = ge(s), f = { email: p.email || "", name: p.name || "", accessId: p.accessId || "", accessResource: l.resource || "", description: l.description || "", userIdAtResource: l.userIdResource || "" };
        await d(f, "loginProvider", l.uploadedFiles || []);
      }
    }, path: (c) => c.userInput === "Submit Ticket" ? "affiliated_login_success" : "start" }, affiliated_login_success: { message: () => Ln(u(), "resource login ticket"), options: ["Back to Main Menu"], chatDisabled: !0, renderHtml: ["BOT"], path: "start" } };
  })({ ticketForm: e, setTicketForm: t, userInfo: n }), i = (({ ticketForm: a = {}, setTicketForm: A = () => {
  }, userInfo: s = {} }) => {
    const { submitTicket: d, getSubmissionResult: u } = On(A);
    return { general_help_summary_subject: { message: "Provide a short title for your ticket.", function: (c) => {
      const l = W(), p = { ...l, summary: c.userInput, email: s.email || l.email, name: s.name || l.name, accessId: s.accessId || l.accessId };
      A(p);
    }, path: "general_help_category" }, general_help_category: { message: "What type of issue are you experiencing?", options: ["User Account Question", "Allocation Question", "User Support Question", "CSSN/CCEP Question", "Training Question", "Metrics Question", "OnDemand Question", "Pegasus Question", "XDMoD Question", "Some Other Question"], chatDisabled: !0, function: (c) => {
      const l = W();
      A({ ...l, category: c.userInput });
    }, path: "general_help_description" }, general_help_description: { message: "Please describe your issue.", function: (c) => {
      const l = W();
      A({ ...l, description: c.userInput });
    }, path: "general_help_attachment" }, general_help_attachment: { message: "Would you like to attach a file to your ticket?", options: ["Yes", "No"], chatDisabled: !0, function: (c) => {
      const l = W();
      A({ ...l, wantsAttachment: c.userInput });
    }, path: (c) => c.userInput === "Yes" ? "general_help_upload" : "general_help_resource" }, general_help_upload: { message: "Please upload your file.", component: Mn(A, a), options: ["Continue"], chatDisabled: !0, function: () => {
      const c = W();
      A({ ...c, uploadConfirmed: !0 });
    }, path: "general_help_resource" }, general_help_resource: { message: "Does your problem involve an ACCESS Resource?", options: ["Yes", "No"], chatDisabled: !0, function: (c) => {
      const l = W();
      A({ ...l, involvesResource: c.userInput.toLowerCase() });
    }, path: (c) => c.userInput === "Yes" ? "general_help_resource_details" : "general_help_keywords" }, general_help_resource_details: { message: "Please select the ACCESS Resource involved with your issue:", options: ["ACES", "Anvil", "Bridges-2", "DARWIN", "Delta", "DeltaAI", "Derecho", "Expanse", "FASTER", "Granite", "Jetstream2", "KyRIC", "Launch", "Neocortex", "Ookami", "Open Science Grid", "Open Storage Network", "Ranch", "Stampede3"], chatDisabled: !0, function: (c) => {
      const l = W();
      A({ ...l, resourceDetails: c.userInput });
    }, path: "general_help_user_id_at_resource" }, general_help_user_id_at_resource: { message: "What is your User ID at the selected resource(s)? (Optional - press Enter to skip)", validateTextInput: Xt(), function: (c) => {
      const l = W();
      A({ ...l, userIdAtResource: Kt(c.userInput) });
    }, path: "general_help_keywords" }, general_help_keywords: { message: "Please add up to 5 keywords to help route your ticket.", checkboxes: { items: [" C, C++", "Abaqus", "ACCESS", "ACCESS-credits", "ACCESS-website", "Accounts", "ACLS", "Adding users", "Affiliations", "Affinity Groups", "AI", "Algorithms", "Allocation extension", "Allocation Management", "Allocation proposal", "Allocation Time", "Allocation users", "AMBER", "AMIE", "Anaconda", "Analysis", "API", "Application Status", "ARCGIS", "Architecture", "Archiving", "Astrophysics", "ATLAS", "Authentication", "AWS", "AZURE", "Backup", "BASH", "Batch Jobs", "Benchmarking", "Big Data", "Bioinformatics", "Biology", "Ceph", "CFD", "cgroups", "CHARMM", "Checkpoint", "cilogon", "citation", "Cloud", "Cloud Computing", "Cloud Lab", "Cloud Storage", "Cluster Management", "Cluster Support", "CMMC", "Community Outreach", "Compiling", "Composible Systems", "Computataional Chemistry", "COMSOL", "Conda", "Condo", "Containers", "Core dump", "Core hours", "CP2K", "CPU architecture", "CPU bound", "CUDA", "Cybersecurity", "CYVERSE", "Data", "Data Storage", "Data-access-protocols", "Data-analysis", "Data-compliance", "Data-lifecycle", "Data-management", "Data-management-software", "Data-provenance", "Data-reproducibility", "Data-retention", "Data-science", "Data-sharing", "Data-transfer", "Data-wrangling", "Database-update", "Debugging", "Debugging, Optimizatio and Profiling", "Deep-learning", "Dependencies", "Deployment", "DFT", "Distributed-computing", "DNS", "Docker", "Documentation", "DOI", "DTN", "Easybuild", "Email", "Encryption", "Environment-modules", "Errors", "Extension", "FastX", "Federated-authentication", "File transfers", "File-formats", "File-limits", "File-systems", "File-transfer", "Finite-element-analysis", "Firewall", "Fortran", "Frameworks and IDE's", "GAMESS", "Gateways", "GATK", "Gaussian", "GCC", "Genomics", "GIS", "Git", "Globus", "GPFS", "GPU", "Gravitational-waves", "Gridengine", "GROMACS", "Hadoop", "Hardware", "Image-processing", "Infiniband", "Interactive-mode", "Interconnect", "IO-Issue", "ISILON", "Java", "Jekyll", "Jetstream", "Job-accounting", "Job-array", "Job-charging", "Job-failure", "Job-sizing", "Job-submission", "Julia", "Jupyterhub", "Key-management", "Kubernetes", "KyRIC", "LAMMPS", "Library-paths", "License", "Linear-programming", "Linux", "LMOD", "login", "LSF", "Lustre", "Machine-learning", "Management", "Materials-science", "Mathematica", "MATLAB", "Memory", "Metadata", "Modules", "Molecular-dynamics", "Monte-carlo", "MPI", "NAMD", "NetCDF", "Networking", "Neural-networks", "NFS", "NLP", "NoMachine", "Nvidia", "Oceanography", "OnDemnad", "Open-science-grid", "Open-storage-network", "OpenCV", "Openfoam", "OpenMP", "OpenMPI", "OpenSHIFT", "Openstack", "Optimization", "OS", "OSG", "Parallelization", "Parameter-sweeps", "Paraview", "Particle-physics", "password", "PBS", "Pegasus", "Pending-jobs", "Performance-tuning", "Permissions", "Physiology", "PIP", "PODMAN", "Portals", "Pre-emption", "Professional and Workforce Development", "Professional-development", "Profile", "Profiling", "Programming", "Programming Languages", "Programming-best-practices", "Project-management", "Project-renewal", "Provisioning", "Pthreads", "Publication-database", "Putty", "Python", "Pytorch", "Quantum-computing", "Quantum-mechanics", "Quota", "R", "RDP", "React", "Reporting", "Research-facilitation", "Research-grants", "Resources", "Rstudio-server", "S3", "Samba", "SAS", "Scaling", "Schedulers", "Scheduling", "Science DMZ", "Science Gateways", "Scikit-learn", "Scratch", "screen", "scripting", "SDN", "Secure Computing and Data", "Secure-data-architecture", "Serverless-hpc", "setup", "sftp", "SGE", "Shell Scripting", "Shifter", "Singularity", "SLURM", "SMB", "Smrtanalysis", "Software Installations", "Software-carpentry", "SPACK", "SPARK", "Spectrum-scale", "SPSS", "SQL", "SSH", "Stampede2", "STATA", "Storage", "Supplement", "Support", "TCP", "Technical-training-for-hpc", "Tensorflow", "Terminal-emulation-and-window-management", "Tickets", "Timing-issue", "TMUX", "Tools", "Training", "Transfer SUs", "Trinity", "Tuning", "Unix-environment", "Upgrading", "Vectorization", "Version-control", "vim", "VNC", "VPN", "Workflow", "Workforce-development", "X11", "Xalt", "XDMoD", "XML", "XSEDE", "I don't see a relevant keyword"], min: 0, max: 5 }, chatDisabled: !0, function: (c) => {
      const l = W();
      A({ ...l, keywords: c.userInput });
    }, path: (c) => c.userInput && c.userInput.includes("I don't see a relevant keyword") ? "general_help_additional_keywords" : "general_help_priority" }, general_help_additional_keywords: { message: "Please enter additional keywords, separated by commas:", function: (c) => {
      const l = W(), p = l.keywords || [], f = c.userInput, m = Array.isArray(p) ? [...p] : p.split(",").map((w) => w.trim()), h = m.filter((w) => w !== "I don't see a relevant keyword"), b = Array.isArray(h) && h.length > 0 ? [...h, f].join(", ") : f;
      A({ ...l, keywords: b, suggestedKeyword: f });
    }, path: "general_help_priority" }, general_help_priority: { message: "Please select a priority for your issue:", options: ["Lowest", "Low", "Medium", "High", "Highest"], chatDisabled: !0, function: (c) => {
      const l = W();
      A({ ...l, priority: c.userInput.toLowerCase() });
    }, path: () => s.email ? s.name ? s.accessId ? "general_help_ticket_summary" : "general_help_accessid" : "general_help_name" : "general_help_email" }, general_help_email: { message: "What is your email address?", validateTextInput: (c) => Rn(c), function: (c) => {
      const l = W();
      A({ ...l, email: c.userInput });
    }, path: () => s.name ? s.accessId ? "general_help_ticket_summary" : "general_help_accessid" : "general_help_name" }, general_help_name: { message: "What is your name?", function: (c) => {
      const l = W();
      A({ ...l, name: c.userInput });
    }, path: () => s.accessId ? "general_help_ticket_summary" : "general_help_accessid" }, general_help_accessid: { message: "What is your ACCESS ID? (Optional - press Enter to skip)", required: !1, function: (c) => {
      const l = W();
      A({ ...l, accessId: c.userInput || "" });
    }, path: "general_help_ticket_summary" }, general_help_ticket_summary: { message: (c) => {
      const l = W(), p = ge(s), f = Nn(l.uploadedFiles);
      let m = p.accessId;
      c.prevPath === "general_help_accessid" && c.userInput ? m = c.userInput : m || c.prevPath !== "general_help_accessid" || (m = c.userInput);
      let h = "";
      return l.involvesResource === "yes" && (h = `
Resource: ${l.resourceDetails || "Not specified"}`, l.userIdAtResource && (h += `
User ID at Resource: ${l.userIdAtResource}`)), `Thank you for providing your issue details. Here's a summary:

Name: ${p.name || "Not provided"}
Email: ${p.email || "Not provided"}
ACCESS ID: ${m || "Not provided"}
Issue Summary: ${l.summary || "Not provided"}
Category: ${l.category || "Not provided"}
Priority: ${l.priority || "Not provided"}
Keywords: ${l.keywords || "Not provided"}
Issue Description: ${l.description || "Not provided"}${h}${f}

Would you like to submit this ticket?`;
    }, options: ["Submit Ticket", "Back to Main Menu"], chatDisabled: !0, function: async (c) => {
      if (c.userInput === "Submit Ticket") {
        const l = W(), p = ge(s), f = { email: p.email || "", summary: l.summary || "General Support Ticket", description: l.description || "", priority: l.priority || "medium", accessId: p.accessId || "", name: p.name || "", issueType: l.category || "", hasResourceProblem: l.involvesResource === "yes" ? "Yes" : "No", userIdAtResource: l.userIdAtResource || "", resourceName: l.resourceDetails || "", keywords: l.keywords || "", noRelevantKeyword: l.suggestedKeyword ? "checked" : "", suggestedKeyword: l.suggestedKeyword || "" };
        await d(f, "support", l.uploadedFiles || []);
      }
    }, path: (c) => c.userInput === "Submit Ticket" ? "general_help_success" : "start" }, general_help_success: { message: () => Ln(u(), "support ticket"), options: ["Back to Main Menu"], chatDisabled: !0, renderHtml: ["BOT"], path: "start" } };
  })({ ticketForm: e, setTicketForm: t, userInfo: n });
  return { help_ticket: { message: "What is your help ticket related to?", options: ["Logging into ACCESS website", "Logging into a resource", "Another question"], chatDisabled: !0, function: (a) => {
    t({ ...e || {}, ticketType: a.userInput });
  }, path: (a) => a.userInput === "Logging into ACCESS website" ? "access_help" : a.userInput === "Logging into a resource" ? "affiliated_help" : a.userInput === "Another question" ? "general_help_summary_subject" : "help_ticket" }, ...r, ...o, ...i };
}, au = ({ setTicketForm: e = () => {
}, userInfo: t = {} }) => {
  let n = null, r = null;
  return { security_incident: { message: "You're reporting a security incident. Please provide a brief summary of the security concern.", function: (o) => {
    const i = W() || {}, a = { ...i, summary: o.userInput, email: t.email || i.email, name: t.name || i.name, accessId: t.accessId || i.accessId };
    e(a);
  }, path: "security_priority" }, security_priority: { message: "What is the priority level of this security incident?", options: ["Critical", "High", "Medium", "Low"], chatDisabled: !0, function: (o) => {
    const i = W() || {};
    e({ ...i, priority: o.userInput });
  }, path: "security_description" }, security_description: { message: "Please provide a detailed description of the security incident or concern.", function: (o) => {
    const i = W() || {};
    e({ ...i, description: o.userInput });
  }, path: "security_attachment" }, security_attachment: { message: "Do you have any files (screenshots, logs, etc.) that would help with this security incident?", options: ["Yes", "No"], chatDisabled: !0, function: (o) => {
    const i = W() || {};
    e({ ...i, wantsAttachment: o.userInput });
  }, path: (o) => o.userInput === "Yes" ? "security_upload" : "security_contact_info" }, security_upload: { message: "Please upload your files.", component: N.createElement(pa, { onFileUpload: (o) => {
    const i = W() || {};
    e({ ...i, uploadedFiles: o });
  } }), options: ["Continue"], chatDisabled: !0, function: () => {
    const o = W() || {};
    e({ ...o, uploadConfirmed: !0 });
  }, path: "security_contact_info" }, security_contact_info: { message: () => {
    const o = ge(t);
    return o.name && o.email && o.accessId ? `I have your contact information:

Name: ${o.name}
Email: ${o.email}
ACCESS ID: ${o.accessId}

Is this correct?` : "I need your contact information. What is your name?";
  }, options: (o) => {
    if (!o) return [];
    const i = ge(t);
    return i.name && i.email && i.accessId ? ["Yes, that's correct", "Let me update it"] : [];
  }, chatDisabled: (o) => {
    if (!o) return !1;
    const i = ge(t);
    return i.name && i.email && i.accessId;
  }, function: (o) => {
    if (!o) return;
    const i = W() || {};
    if (!i.name) {
      const a = { ...i, name: o.userInput };
      e(a);
    }
  }, path: (o) => {
    if (!o) return "security_summary";
    const i = ge(t);
    return o.userInput === "Yes, that's correct" ? "security_summary" : o.userInput === "Let me update it" ? "security_name" : i.name && i.email ? i.accessId ? "security_summary" : "security_accessid" : "security_email";
  } }, security_name: { message: "What is your name?", function: (o) => {
    const i = W() || {};
    e({ ...i, name: o.userInput });
  }, path: "security_email" }, security_email: { message: "What is your email address?", function: (o) => {
    const i = W() || {};
    e({ ...i, email: o.userInput });
  }, path: "security_accessid" }, security_accessid: { message: "What is your ACCESS ID? (Optional - press Enter to skip)", validateTextInput: Xt(), function: (o) => {
    const i = Kt(o.userInput);
    n = i;
    const a = W() || {};
    e({ ...a, accessId: i });
  }, path: "security_summary" }, security_summary: { message: () => {
    const o = W() || {}, i = ge(t), a = { ...o, name: i.name || o.name, email: i.email || o.email, accessId: n || i.accessId || o.accessId };
    let A = "";
    o.uploadedFiles && o.uploadedFiles.length > 0 && (A = `
Attachments: ${o.uploadedFiles.length} file(s) attached`);
    const s = a.accessId || "Not provided";
    return `Here's a summary of your security incident report:

Summary: ${a.summary || "Not provided"}
Priority: ${a.priority || "Not provided"}
Name: ${a.name || "Not provided"}
Email: ${a.email || "Not provided"}
ACCESS ID: ${s}
Description: ${a.description || "Not provided"}${A}

Would you like to submit this security incident report?`;
  }, options: ["Submit Security Report", "Back to Main Menu"], chatDisabled: !0, function: async (o) => {
    var i, a, A, s;
    if (o.userInput === "Submit Security Report") {
      const d = W() || {}, u = ge(t), c = { ...d, name: u.name || d.name, email: u.email || d.email, accessId: n || u.accessId || d.accessId }, l = { summary: c.summary || "", priority: c.priority || "", description: c.description || "", name: c.name || "", email: c.email || "", accessId: c.accessId || "" };
      try {
        const p = await (async (f, m = []) => {
          try {
            const h = await fa(f, "security", m);
            return await ha(h, "create-security-incident");
          } catch (h) {
            return console.error("| ❌ Security incident submission failed:", h), { success: !1, error: h.message };
          }
        })(l, d.uploadedFiles || []);
        p.success ? (r = { success: !0, ticketKey: (a = (i = p.data) == null ? void 0 : i.data) == null ? void 0 : a.ticketKey, ticketUrl: (s = (A = p.data) == null ? void 0 : A.data) == null ? void 0 : s.ticketUrl }, e((f) => {
          var m, h, b, w;
          return { ...f, ticketKey: (h = (m = p.data) == null ? void 0 : m.data) == null ? void 0 : h.ticketKey, ticketUrl: (w = (b = p.data) == null ? void 0 : b.data) == null ? void 0 : w.ticketUrl, submissionResult: r };
        })) : (r = { success: !1, error: p.error }, e((f) => ({ ...f, submissionError: p.error })));
      } catch (p) {
        r = { success: !1, error: p.message }, e((f) => ({ ...f, submissionError: p.message }));
      }
    }
  }, path: (o) => o.userInput === "Submit Security Report" ? "security_success" : "start" }, security_success: { message: () => ((o) => o && !o.success ? `We apologize, but there was an error submitting your security incident report: ${o.error}

Please try again or contact our cybersecurity team directly.` : o && o.success && o.ticketUrl && o.ticketKey ? `Your security incident report has been submitted successfully.

Ticket: <a href="${o.ticketUrl}" target="_blank">${o.ticketKey}</a>

Our cybersecurity team will review your report and respond accordingly. Thank you for helping keep ACCESS secure.` : (o && o.success, `Your security incident report has been submitted successfully.

Our cybersecurity team will review your report and respond accordingly. Thank you for helping keep ACCESS secure.`))((W() || {}).submissionResult || r), options: ["Back to Main Menu"], chatDisabled: !0, renderHtml: ["BOT"], path: "start" } };
};
function Au({ welcomeMessage: e, isBotLoggedIn: t, loginUrl: n, handleQuery: r, hasQueryError: o, sessionId: i, currentQueryId: a, ticketForm: A = {}, setTicketForm: s = () => {
}, formContext: d, apiKey: u, userInfo: c = {} }) {
  return d && ((p) => {
    rr = p;
  })(d), { ...(({ welcome: p, setTicketForm: f = () => {
  }, setFeedbackForm: m = () => {
  } }) => ({ start: { message: p, options: ["Ask a question about ACCESS", "Open a Help Ticket", "Report a security issue"], chatDisabled: !0, path: (h) => h.userInput === "Ask a question about ACCESS" ? "go_ahead_and_ask" : h.userInput === "Open a Help Ticket" ? (f({}), "help_ticket") : h.userInput === "Report a security issue" ? (f({}), "security_incident") : "start" } }))({ welcome: Aa(0, e), setTicketForm: s }) || {}, ...(t ? ru({ fetchAndStreamResponse: r, sessionId: i, currentQueryId: a, apiKey: u }) : { go_ahead_and_ask: { message: "To ask questions, you need to log in first.", component: N.createElement(da, { loginUrl: n }), options: ["Back to Main Menu"], chatDisabled: !0, path: (p) => p.userInput === "Back to Main Menu" ? "start" : "go_ahead_and_ask" } }) || {}, ...iu({ ticketForm: A, setTicketForm: s, userInfo: c }) || {}, ...au({ ticketForm: A, setTicketForm: s, userInfo: c }) || {}, ...t && { loop: { message: async (p) => {
    await r(p);
  }, renderMarkdown: ["BOT"], path: () => o ? "start" : "loop" } } };
}
const su = () => {
  for (let t = 0; t < localStorage.length; t++) {
    const n = localStorage.key(t);
    if (n && n.startsWith("qa_bot_session_")) {
      const r = localStorage.getItem(n);
      if (r) return r;
    }
  }
  const e = `qa_bot_session_${Kc()}`;
  return localStorage.setItem(e, e), e;
}, ga = N.forwardRef((e, t) => {
  const { apiKey: n, open: r = !1, onOpenChange: o, embedded: i = !1, isLoggedIn: a, loginUrl: A = ve.LOGIN_URL, ringEffect: s = !1, welcome: d, userEmail: u, userName: c, accessId: l } = e, p = n || (typeof process < "u" && process.env ? process.env.REACT_APP_API_KEY : null), [f, m] = J(a !== void 0 && a), h = ie(su()).current, [b, w] = J(null), { ticketForm: g, feedbackForm: x, updateTicketForm: k, updateFeedbackForm: P, resetTicketForm: S, resetFeedbackForm: I } = ca();
  ee(() => {
    a !== void 0 && m(a);
  }, [a]), ee(() => {
    if (!i && o) {
      const _ = (y) => {
        t && t.current && t.current._markAsUserInteraction && t.current._markAsUserInteraction();
        const Y = y.data.newState;
        o(Y);
      };
      return window.addEventListener("rcb-toggle-chat-window", _), () => {
        window.removeEventListener("rcb-toggle-chat-window", _);
      };
    }
  }, [i, o, t]);
  const D = Aa(0, d), B = ie(null), Q = ((_, y = {}) => ke(() => {
    const Y = (v, j) => {
      if (_.current) {
        const q = getComputedStyle(_.current).getPropertyValue(v);
        if (q && q.trim() !== "") return q.trim();
        if (_.current.parentElement) {
          const X = getComputedStyle(_.current.parentElement).getPropertyValue(v);
          if (X && X.trim() !== "") return X.trim();
        }
      }
      return j;
    };
    return { primaryColor: Y("--primary-color", y.primaryColor || ve.THEME.PRIMARY_COLOR), secondaryColor: Y("--secondary-color", y.secondaryColor || ve.THEME.SECONDARY_COLOR), fontFamily: Y("--font-family", y.fontFamily || ve.THEME.FONT_FAMILY) };
  }, [_, y]))(B), C = (({ themeColors: _, embedded: y, defaultOpen: Y, isLoggedIn: v, loginUrl: j }) => {
    const q = v, X = sessionStorage.getItem("qa_bot_tooltip_shown") ? "NEVER" : "START";
    return ke(() => ({ general: { ..._, embedded: y, primaryColor: _.primaryColor, fontFamily: "Arial, sans-serif", secondaryColor: _.secondaryColor }, header: { title: N.createElement("div", { key: "header-title" }, N.createElement("h1", { className: "sr-only" }, ve.CHATBOT.TITLE), N.createElement("span", { "aria-hidden": "true" }, ve.CHATBOT.TITLE)), avatar: ve.CHATBOT.AVATAR_URL, buttons: [q ? N.createElement(eu, { key: "user-icon" }) : N.createElement(da, { key: "login-button", loginUrl: j, isHeaderButton: !0 }), de.CLOSE_CHAT_BUTTON] }, chatWindow: { defaultOpen: !!y || Y }, chatInput: { enabledPlaceholderText: "Type your question here...", disabledPlaceholderText: "", disabled: !1, allowNewline: !0, sendButtonStyle: { display: "flex" }, characterLimit: 1e3, sendButtonAriaLabel: "Send message", showCharacterCount: !1, ariaLabel: "Chat input area", ariaDescribedBy: "chat-input-help" }, chatHistory: { disabled: !1 }, botBubble: { simulateStream: !0, streamSpeed: 10, allowNewline: !0, dangerouslySetInnerHTML: !0, renderHtml: !0, ariaLabel: "Bot response", role: "log" }, chatButton: { icon: ve.CHATBOT.AVATAR_URL }, tooltip: { text: ve.CHATBOT.TOOLTIP_TEXT, mode: X }, audio: { disabled: !0 }, emoji: { disabled: !0 }, fileAttachment: { disabled: !0 }, notification: { disabled: !0 }, footer: { text: N.createElement("div", { key: "footer-text" }, N.createElement("a", { href: "https://support.access-ci.org/tools/access-qa-tool" }, "About this tool"), "."), buttons: [N.createElement($c, { key: "new-chat-button" })] }, event: { rcbToggleChatWindow: !0 } }), [_, y, Y, q, X, j]);
  })({ themeColors: Q, embedded: i, defaultOpen: r, isLoggedIn: f, loginUrl: A }), M = tu(p, h, w), L = ke(() => ({ ticketForm: g || {}, feedbackForm: x || {}, updateTicketForm: k, updateFeedbackForm: P, resetTicketForm: S, resetFeedbackForm: I }), [g, x, k, P, S, I]), H = ke(() => Au({ welcomeMessage: D, isBotLoggedIn: f, loginUrl: A, handleQuery: M, sessionId: h, currentQueryId: b, ticketForm: g, setTicketForm: k, formContext: L, apiKey: p, userInfo: { email: u || null, name: c || null, accessId: l || null } }), [D, f, A, M, h, b, g, x, k, P, L, p, u, c, l]);
  return ((_, y) => {
    ee(() => {
      y.current && (_ ? y.current.classList.add("bot-logged-in") : y.current.classList.remove("bot-logged-in"));
    }, [_, y]);
  })(f, B), ((_, y) => {
    ee(() => {
      if (!_ || !y.current) return;
      const Y = setTimeout(() => {
        var j;
        const v = (j = y.current) == null ? void 0 : j.querySelector(".rcb-tooltip-show");
        v && v.classList.add("phone-ring");
      }, 500);
      return () => {
        clearTimeout(Y);
      };
    }, [_, y]);
  })(s, B), ee(() => {
    const _ = () => {
      const Y = document.querySelector(".rcb-chat-window");
      if (!Y) return;
      const v = Y.querySelector(".rcb-send-button");
      v && (v.hasAttribute("tabindex") || v.setAttribute("tabindex", "0"), v.hasAttribute("data-keyboard-enabled") || (v.setAttribute("data-keyboard-enabled", "true"), v.addEventListener("keydown", (j) => {
        if (j.key === "Enter" || j.key === " ") {
          j.preventDefault();
          const q = v && Object.keys(v).find((te) => te.startsWith("__reactProps"));
          if (q) {
            const te = v[q], pe = te == null ? void 0 : te.onMouseDown;
            if (pe && typeof pe == "function") return void pe(j);
          }
          const X = new MouseEvent("mousedown", { bubbles: !0, cancelable: !0, view: window });
          v.dispatchEvent(X);
        }
      })));
    }, y = setInterval(_, 1e3);
    return _(), () => clearInterval(y);
  }, []), nu(), ee(() => {
    const _ = () => {
      sessionStorage.setItem("qa_bot_tooltip_shown", "true");
    };
    return window.addEventListener("rcb-toggle-chat-window", _), () => {
      window.removeEventListener("rcb-toggle-chat-window", _);
    };
  }, []), N.createElement("div", { className: "qa-bot " + (i ? "embedded-qa-bot" : ""), ref: B, role: "region", "aria-label": "Ask ACCESS tool" }, N.createElement(Di, null, N.createElement("main", { role: "main", "aria-label": "Chat interface" }, N.createElement(sa, { ref: t, embedded: i, isBotLoggedIn: f, currentOpen: r }), N.createElement(Bs, { key: `chatbot-${h}-${f}`, settings: C, flow: H, plugins: [() => Ys(R), qc(), () => Vc(F)] }), N.createElement("div", { "aria-live": "polite", "aria-label": "Bot response updates", className: "sr-only", id: "bot-live-region" }), N.createElement("div", { id: "chat-input-help", className: "sr-only" }, "Type your message and press Enter to send. Use arrow keys to navigate through response options. Press Enter or Space to select an option."), N.createElement("div", { id: "keyboard-help", className: "sr-only" }, "Available keyboard shortcuts: Arrow keys to navigate options, Enter or Space to select, Tab to move between interactive elements, Escape to close dialogs."))));
  var F, R;
});
ga.displayName = "QABotInternal";
const ma = N.forwardRef((e, t) => N.createElement(Jc, null, N.createElement(ga, Zt({}, e, { ref: t }))));
ma.displayName = "QABot";
ri('.rcb-toggle-icon{background-color:initial!important;background-position:calc(50% - 1px) calc(50% + 2px);background-repeat:no-repeat;background-size:62%!important}.rcb-chat-window{max-height:600px;max-width:100%;width:550px!important}.rcb-chat-window .rcb-bot-avatar{background-position:50%;background-repeat:no-repeat;background-size:contain;border-radius:0}.rcb-chat-window .rcb-chat-header{align-items:center;display:flex;flex-direction:row;font-weight:700}.rcb-chat-window a{color:#000;font-weight:700;text-decoration:underline}.rcb-chat-window a:hover{color:#107180}.rcb-chat-window .rcb-bot-message a{color:#fff;text-decoration:none}.rcb-chat-window .rcb-bot-message a:hover{text-decoration:underline}.rcb-chat-window .rcb-chat-input-textarea{overflow-y:auto}.rcb-chat-window .rcb-chat-footer-container{font-size:10px}.qa-bot .user-login-icon{display:none!important}.qa-bot.bot-logged-in .user-login-icon{display:flex!important;transform:scale(1.3) translateY(-2px)}.embedded-qa-bot .rcb-chat-window{max-width:100%;width:100%!important}.qa-bot.hidden{display:none}.embedded-qa-bot .rcb-bot-message,.embedded-qa-bot .rcb-user-message{max-width:90%!important;word-break:break-word}.embedded-qa-bot .rcb-chat-input-textarea{width:100%!important}.qa-bot-container{max-width:100%;width:100%}.rcb-tooltip-show.phone-ring{animation:phone-ring 3s ease-out!important;z-index:10000!important}@keyframes phone-ring{0%{transform:translateX(0) translateY(0) rotate(0deg)}2%{transform:translateX(0) translateY(-8px) rotate(-2deg)}4%{transform:translateX(0) translateY(-6px) rotate(2deg)}6%{transform:translateX(0) translateY(-8px) rotate(-1deg)}8%{transform:translateX(0) translateY(-6px) rotate(1deg)}10%{transform:translateX(0) translateY(-8px) rotate(-2deg)}12%{transform:translateX(0) translateY(-6px) rotate(2deg)}20%{transform:translateX(0) translateY(0) rotate(0deg)}30%{transform:translateX(0) translateY(0) rotate(0deg)}40%{transform:translateX(0) translateY(0) rotate(0deg)}49%{transform:translateX(0) translateY(0) rotate(0deg)}50%{transform:translateX(0) translateY(-8px) rotate(-2deg)}52%{transform:translateX(0) translateY(-6px) rotate(2deg)}54%{transform:translateX(0) translateY(-8px) rotate(-1deg)}56%{transform:translateX(0) translateY(-6px) rotate(1deg)}58%{transform:translateX(0) translateY(-8px) rotate(-2deg)}60%{transform:translateX(0) translateY(-6px) rotate(2deg)}70%{transform:translateX(0) translateY(0) rotate(0deg)}to{transform:translateX(0) translateY(0) rotate(0deg)}}@media (max-width:768px){.rcb-chat-window{max-height:calc(100vh - 100px)!important;max-width:calc(100vw - 40px)!important;width:550px!important}.embedded-chat-container.open{height:400px}.embedded-chat-closed{font-size:14px;height:40px}.embedded-chat-open-btn{font-size:12px;padding:3px 10px}.rcb-bot-message,.rcb-user-message{max-width:85%!important}.rcb-chat-input-textarea{font-size:16px!important;min-height:44px!important}.rcb-chat-header{padding:12px 16px!important}}@media (max-width:480px){.rcb-chat-window{bottom:10px!important;left:10px!important;max-height:calc(100vh - 80px)!important;max-width:calc(100vw - 20px)!important;right:10px!important;width:calc(100vw - 20px)!important}.embedded-chat-container.open{height:350px}.rcb-bot-message,.rcb-user-message{margin-bottom:8px!important;max-width:90%!important}.rcb-chat-header{font-size:14px!important;padding:8px 12px!important}.rcb-chat-button{bottom:20px!important;height:50px!important;right:20px!important;width:50px!important}.rcb-chat-footer-container{font-size:9px!important;padding:8px 12px!important}}@media (max-width:360px){.rcb-chat-window{left:5px!important;max-width:calc(100vw - 10px)!important;right:5px!important;width:calc(100vw - 10px)!important}.rcb-chat-header{font-size:13px!important;padding:6px 8px!important}}.rcb-checkbox-container{display:flex!important;flex-wrap:wrap!important;gap:8px!important;margin-left:16px!important;max-width:100%!important;padding-top:12px!important}.rcb-checkbox-row-container{align-items:center!important;background-color:#fff!important;border:1px solid #d0d0d0!important;border-radius:6px!important;box-sizing:border-box!important;color:#107180!important;cursor:pointer!important;display:flex!important;flex:0 0 auto!important;font-size:14px!important;font-weight:400!important;margin:0!important;max-height:auto!important;min-height:auto!important;padding:8px 12px!important;text-align:center!important;transition:all .2s ease!important;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:auto!important}.rcb-checkbox-row-container:hover{background-color:#e8f4f8!important;border-color:#107180!important;box-shadow:0 2px 4px #10718033!important;transform:translateY(-1px)!important}.rcb-checkbox-row-container[data-checked=true]{background-color:#107180!important;border-color:#107180!important;color:#fff!important}.rcb-checkbox-row{margin-left:0!important}.rcb-checkbox-mark{height:14px!important;margin-right:6px!important;width:14px!important}.rcb-checkbox-label{font-size:13px!important;margin:0!important;white-space:nowrap!important}.rcb-checkbox-next-button{align-items:center!important;background-color:#fff!important;border:1px solid #d0d0d0!important;border-radius:6px!important;box-sizing:border-box!important;color:#107180!important;cursor:pointer!important;display:flex!important;flex:0 0 auto!important;font-size:14px!important;font-weight:400!important;justify-content:center!important;line-height:24px!important;margin:0!important;max-height:auto!important;min-height:auto!important;padding:8px 12px!important;text-align:center!important;transition:all .2s ease!important;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:auto!important}.rcb-checkbox-next-button:hover{background-color:#e8f4f8!important;border-color:#107180!important;box-shadow:0 2px 4px #10718033!important;transform:translateY(-1px)!important}.sr-only{clip:rect(0,0,0,0)!important;border:0!important;height:1px!important;margin:-1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;white-space:nowrap!important;width:1px!important}.rcb-chat-input-send-button:focus,.rcb-chat-input-textarea:focus{outline:2px solid #107180!important;outline-offset:2px!important}.rcb-user-message{word-wrap:break-word!important;overflow:hidden!important;word-break:break-word!important}:focus-visible{outline:2px solid #107180!important;outline-offset:2px!important}.rcb-options-container{display:flex!important;flex-direction:row!important;flex-wrap:wrap!important;gap:8px!important;margin:16px!important;padding:0!important}.rcb-options{background-color:#fff!important;border:1px solid #d0d0d0!important;border-radius:6px!important;box-sizing:border-box!important;color:#107180!important;cursor:pointer!important;flex:0 0 auto!important;font-size:14px!important;font-weight:400!important;outline:none!important;padding:8px 12px!important;text-align:center!important;transition:all .2s ease!important;-webkit-user-select:none;-moz-user-select:none;user-select:none;width:auto!important}.rcb-options:hover{background-color:#e8f4f8!important;border-color:#107180!important;box-shadow:0 2px 4px #10718033!important;transform:translateY(-1px)!important}.rcb-checkbox-next-button.keyboard-focused,.rcb-checkbox-next-button:focus,.rcb-checkbox-next-button:focus-visible,.rcb-checkbox-row-container.keyboard-focused,.rcb-checkbox-row-container:focus,.rcb-checkbox-row-container:focus-visible,.rcb-options.keyboard-focused,.rcb-options:focus,.rcb-options:focus-visible{background-color:#e8f4f8!important;border-color:#107180!important;outline:none!important}.rcb-options:active{background-color:#107180!important;border-color:#107180!important;color:#fff!important;transform:translateY(0)!important}.keyboard-nav-hint{color:#666!important;font-size:12px!important;font-style:italic!important;margin-bottom:8px!important}@media (prefers-reduced-motion:reduce){.keyboard-nav-hint{display:none!important}}.rcb-options-container [role=button][tabindex="0"],.rcb-options-container button[tabindex="0"]{position:relative!important}.rcb-options-container [role=button][tabindex="0"]:after,.rcb-options-container button[tabindex="0"]:after{color:#107180!important;content:"←"!important;font-size:16px!important;opacity:0!important;position:absolute!important;right:12px!important;top:50%!important;transform:translateY(-50%)!important;transition:opacity .2s ease!important}.rcb-options-container [role=button][tabindex="0"]:focus:after,.rcb-options-container button[tabindex="0"]:focus:after{opacity:1!important}.rcb-chat-input-send-button{cursor:pointer!important;opacity:1!important;pointer-events:auto!important;visibility:visible!important}.rcb-chat-input-send-button:not([tabindex]){-webkit-user-select:none;-moz-user-select:none;user-select:none}.rcb-chat-input-container [onclick],.rcb-chat-input-container [role=button],.rcb-chat-input-container div[style*=cursor],.rcb-chat-input-container svg:last-child,.rcb-chat-input-container>div:last-child{tabindex:0!important;cursor:pointer!important}.rcb-chat-footer{margin-top:4px!important;padding-top:0!important}.rcb-chat-footer-container{align-items:center!important;display:flex!important;margin-top:4px!important;padding-top:4px!important}.rcb-chat-footer-container button{order:1!important}.rcb-chat-footer-container a[href*=access-qa-tool]{tab-index:0!important;order:2!important}.rcb-chat-footer-container a[href*=feedback]{tab-index:0!important;order:3!important}@media (prefers-contrast:high){.rcb-chat-window a{background-color:#fff!important;border:1px solid #000!important;color:#000!important}}@media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}', { insertAt: "top" });
const lu = N.forwardRef((e, t) => {
  const [n, r] = N.useState(e.isLoggedIn || !1), [o, i] = N.useState(e.defaultOpen || !1), a = N.useRef();
  return N.useImperativeHandle(t, () => ({ addMessage: (A) => {
    a.current && a.current.addMessage(A);
  }, setBotIsLoggedIn: (A) => {
    r(A);
  }, openChat: () => {
    !e.embedded && a.current && i(!0);
  }, closeChat: () => {
    !e.embedded && a.current && i(!1);
  }, toggleChat: () => {
    !e.embedded && a.current && i((A) => !A);
  } }), [e.embedded]), N.createElement(ma, { ref: a, apiKey: e.apiKey, embedded: e.embedded, isLoggedIn: n, open: !!e.embedded || o, onOpenChange: e.embedded ? void 0 : i, loginUrl: e.loginUrl, ringEffect: e.ringEffect, welcome: e.welcome, userEmail: e.userEmail, userName: e.userName, accessId: e.accessId });
});
lu.displayName = "ProgrammaticQABot";
export {
  ma as QABot
};
