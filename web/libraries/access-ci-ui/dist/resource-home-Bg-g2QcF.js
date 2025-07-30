import { u as e, b as g, h as f, A as C, a as w, o as S, T as k, r as A, n as R, Q as I } from "./index-0rhVaqkH.js";
import { I as h } from "./icon-oSIQXq5R.js";
const T = {
  "ACCESS Pegasus": "https://pegasus.isi.edu/wordpress/wp-content/uploads/2016/01/favicon.ico",
  "ACCESS OnDemand": "https://openondemand.org/themes/fire/theme/assets/media/favicons/favicon.ico",
  "Advance reservations": "calendar-check",
  "Composable hardware fabric": "boxes",
  "Compute Resources": "cpu-fill",
  "CPU Compute": "cpu-fill",
  "GPU Compute": "cpu",
  "Innovative / Novel Compute": "lightbulb",
  "Large Memory Nodes": "arrows-fullscreen",
  Preemption: "clock-history",
  "Science Gateway support": "globe",
  "Service / Other": "stars",
  "Storage Resources": "hdd-fill",
  "Virtual Machines": "pc-display-horizontal",
  Cloud: "cloud",
  Storage: "hdd-fill"
};
function b({ active: s, tagCategory: o, tagId: a, iconUri: n, name: r, toggleTag: t }) {
  const c = n || T[r] || "tag";
  return /* @__PURE__ */ e(
    "li",
    {
      class: `tag tag-category-${o.name.toLowerCase().replace(/[^a-z]+/g, "-")}${s.tagIds.has(a) ? " active" : ""}`,
      children: /* @__PURE__ */ e(
        "button",
        {
          href: "#",
          disabled: s.disabledTagIds.has(a),
          onClick: (i) => {
            i.preventDefault(), t(a);
          },
          children: [
            c.startsWith("http") ? /* @__PURE__ */ e(h, { alt: r, src: c }) : /* @__PURE__ */ e(h, { name: c }),
            r
          ]
        }
      )
    }
  );
}
function v({ children: s }) {
  return /* @__PURE__ */ e("ul", { class: "tags", children: s });
}
function E({
  active: s,
  baseUri: o,
  description: a,
  imageType: n,
  imageUri: r,
  name: t,
  infoGroupId: c,
  tags: i,
  toggleTag: l
}) {
  const u = `${o}/${c}`;
  return /* @__PURE__ */ e("div", { class: "resource-group", children: [
    /* @__PURE__ */ e(
      "a",
      {
        class: `resource-group-image image-type-${n}`,
        href: u,
        children: r ? /* @__PURE__ */ e("img", { src: r }) : /* @__PURE__ */ e(h, { name: "motherboard" })
      }
    ),
    /* @__PURE__ */ e("div", { class: "resource-group-text", children: [
      /* @__PURE__ */ e("h3", { children: /* @__PURE__ */ e("a", { href: u, children: t }) }),
      /* @__PURE__ */ e(v, { children: i.map((p) => /* @__PURE__ */ e(b, { ...p, active: s, toggleTag: l })) }),
      /* @__PURE__ */ e("p", { children: [
        a && a,
        /* @__PURE__ */ e("br", {}),
        /* @__PURE__ */ e("a", { href: u, children: [
          "Learn more about ",
          t,
          " »"
        ] })
      ] })
    ] })
  ] });
}
function G({
  active: s,
  baseUri: o,
  name: a,
  resourceGroups: n,
  toggleTag: r
}) {
  return /* @__PURE__ */ e(g, { children: [
    /* @__PURE__ */ e("h2", { children: a }),
    n.filter(({ infoGroupId: t }) => s.infoGroupIds.has(t)).map((t) => /* @__PURE__ */ e(
      E,
      {
        ...t,
        baseUri: o,
        active: s,
        toggleTag: r
      }
    ))
  ] });
}
function O({
  active: s,
  clearTags: o,
  tagCategories: a,
  toggleTag: n
}) {
  const [r, t] = f(!1), c = C(null);
  return w(() => {
    c.current && (c.current.addEventListener("click", (i) => i.stopPropagation()), document.body.addEventListener("click", () => t(!1)));
  }, [c.current]), /* @__PURE__ */ e("section", { class: "filters-outer", ref: c, children: [
    /* @__PURE__ */ e(
      "button",
      {
        onClick: () => t(!r),
        class: `btn-filters btn ${r ? "active" : ""}`,
        children: [
          /* @__PURE__ */ e(h, { name: "filter" }),
          " Filters",
          s.tagIds.size > 0 ? /* @__PURE__ */ e("span", { class: "active-tag-count", children: s.tagIds.size }) : null
        ]
      }
    ),
    r ? /* @__PURE__ */ e("div", { class: "filters-inner", children: [
      a.map((i) => /* @__PURE__ */ e(g, { children: [
        /* @__PURE__ */ e("h2", { children: i.name }),
        /* @__PURE__ */ e(v, { children: i.tags.map((l) => /* @__PURE__ */ e(b, { ...l, active: s, toggleTag: n })) })
      ] })),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: o,
          disabled: s.tagIds.size == 0,
          class: "btn danger",
          children: [
            /* @__PURE__ */ e(h, { name: "trash" }),
            " Clear Filters"
          ]
        }
      )
    ] }) : null
  ] });
}
function $({ setBotOpen: s }) {
  const o = C(null);
  return /* @__PURE__ */ e("section", { id: "resource-pathways", ref: o, children: [
    /* @__PURE__ */ e("p", { class: "intro", children: [
      "ACCESS provides advanced computing resources ",
      /* @__PURE__ */ e("strong", { children: "at no cost" }),
      " ",
      "to researchers and educators."
    ] }),
    /* @__PURE__ */ e("ul", { class: "resource-pathways", children: [
      {
        title: "Browse resources",
        icon: "filter-square",
        description: "Filter resources to find the best match for your research.",
        onClick: (n) => {
          n.preventDefault(), o.current && o.current.nextSibling.scrollIntoView({ bahavior: "smooth" });
        }
      },
      {
        title: "Ask a question",
        icon: "question-circle",
        onClick: (n) => {
          n.preventDefault(), s(!0);
        },
        description: "You have resource questions. Our Q&A bot has answers!",
        login: !0
      },
      {
        title: "Get suggestions",
        icon: "card-checklist",
        href: "https://access-ara.ccs.uky.edu:8080/",
        description: "Fill out a form to get resource recommendations."
      },
      {
        title: "Read news",
        icon: "newspaper",
        href: "https://access-ci.org/tag/resource-providers/",
        description: "See the latest news from resource providers."
      }
    ].map(
      ({ title: n, icon: r, href: t, description: c, login: i, onClick: l }, u) => /* @__PURE__ */ e("li", { class: `resource-pathway-${u}`, children: /* @__PURE__ */ e("a", { href: t || "#", onClick: l, children: [
        r ? /* @__PURE__ */ e(h, { name: r }) : null,
        " ",
        /* @__PURE__ */ e("span", { class: "detail", children: [
          /* @__PURE__ */ e("span", { class: "title", children: n }),
          /* @__PURE__ */ e("span", { class: "description", children: c }),
          i ? /* @__PURE__ */ e("span", { class: "login", children: [
            /* @__PURE__ */ e(h, { name: "key" }),
            " Requires ACCESS Login"
          ] }) : null
        ] })
      ] }) })
    ) })
  ] });
}
function P({
  baseUri: s,
  title: o,
  showBreadcrumbs: a = !0,
  showTitle: n = !0
}) {
  const [r, t] = f([]), [c, i] = f(!1), l = S(), u = k(
    () => l ? A(l, r) : null,
    [l, r]
  ), p = (d) => t(
    r.includes(d) ? r.filter((y) => y != d) : [...r, d]
  ), m = () => t([]);
  return /* @__PURE__ */ e(g, { children: [
    a && /* @__PURE__ */ e(
      R,
      {
        expandWidth: !0,
        items: [{ name: "Resources" }],
        topBorder: !0
      }
    ),
    o && /* @__PURE__ */ e("h1", { class: n ? "" : "visually-hidden", children: o }),
    /* @__PURE__ */ e($, { setBotOpen: i }),
    /* @__PURE__ */ e("div", { id: "browse-resources", children: [
      u ? /* @__PURE__ */ e(
        O,
        {
          tagCategories: l.tagCategories,
          active: u,
          clearTags: m,
          toggleTag: p
        }
      ) : null,
      l ? l.resourceCategories.filter(
        ({ resourceCategoryId: d }) => u.resourceCategoryIds.has(d)
      ).map((d) => /* @__PURE__ */ e(
        G,
        {
          ...d,
          active: u,
          baseUri: s,
          clearTags: m,
          toggleTag: p
        }
      )) : null
    ] }),
    /* @__PURE__ */ e(
      I,
      {
        embedded: !1,
        open: c,
        onOpenChange: i,
        welcome: "Welcome to the ACCESS Q&A Bot!",
        apiKey: "my-api-key"
      }
    )
  ] });
}
export {
  P as default
};
