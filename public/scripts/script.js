//site navigation
/**
 * Dropdown menu web component
 *
 * @element cagov-site-navigation
 *
 * @cssprop --primary-color - Default value of #064E66, used for background
 * @cssprop --gray-300 - #e1e0e3
 * @cssprop --primary-dark-color - #064e66
 * @cssprop --secondary-color - #fec02f
 * @cssprop --w-lg - '1176px'
 */

class CAGovSiteNavigation extends window.HTMLElement {
  connectedCallback() {
    document
      .querySelector(".cagov-nav.open-menu")
      .addEventListener("click", this.toggleMainMenu.bind(this));

    // Mobile search events
    const mobileSearchBtn = document.querySelector(
      ".cagov-nav.mobile-search .search-btn"
    );


    // reset mobile search on resize
    window.addEventListener("resize", () => {
      if (mobileSearchBtn) {
        document
          .querySelector(".cagov-nav.mobile-search .search-btn")
          .setAttribute("aria-expanded", "false");
      }
      // reset navigation on resize
      this.closeAllMenus();
      this.closeMainMenu();
    });

    this.expansionListeners();
    document.addEventListener("keydown", this.escapeMainMenu.bind(this));
    document.body.addEventListener("click", this.bodyClick.bind(this));
    this.highlightCurrentPage();
  }

  toggleMainMenu() {
    if (
      document
        .querySelector(".cagov-nav.hamburger")
        .classList.contains("is-active")
    ) {
      this.closeMainMenu();
    } else {
      this.openMainMenu();
    }
  }

  highlightCurrentPage() {
    this.querySelectorAll("a.expanded-menu-dropdown-link").forEach((link) => {
      if (link.href === window.location.href) {
        link.classList.add("current-page-highlight");
      }
    });
  }

  openMainMenu() {
    document.querySelector(".mobile-icons").classList.add("display-menu");
    this.classList.add("display-menu");
    document.querySelector(".cagov-nav.hamburger").classList.add("is-active");
    document.querySelector(".cagov-nav.menu-trigger").classList.add("is-fixed");
    document
      .querySelector(".cagov-nav.menu-trigger")
      .setAttribute("aria-expanded", "true");
    const menLabel = document.querySelector(".cagov-nav.menu-trigger-label");
    menLabel.innerHTML = menLabel.getAttribute("data-closelabel");
  }

  closeMainMenu() {
    document.querySelector(".mobile-icons").classList.remove("display-menu");
    this.classList.remove("display-menu");
    document
      .querySelector(".cagov-nav.hamburger")
      .classList.remove("is-active");
    document
      .querySelector(".cagov-nav.menu-trigger")
      .classList.remove("is-fixed");
    document
      .querySelector(".cagov-nav.menu-trigger")
      .setAttribute("aria-expanded", "false");
    const menLabel = document.querySelector(".cagov-nav.menu-trigger-label");
    menLabel.innerHTML = menLabel.getAttribute("data-openlabel");
  }

  escapeMainMenu(event) {
    // Close menus if user presses escape key.
    if (event.keyCode === 27) {
      this.closeAllMenus();
    }
  }

  bodyClick(event) {
    if (!event.target.closest("cagov-site-navigation")) {
      this.closeAllMenus();
    }
  }

  closeAllMenus() {
    const allMenus = this.querySelectorAll(".js-cagov-navoverlay-expandable");
    allMenus.forEach((menu) => {
      const expandedEl = menu.querySelector(".expanded-menu-section");
      expandedEl.classList.remove("expanded");
      menu.setAttribute("aria-expanded", "false");
      const closestDropDown = menu.querySelector(".expanded-menu-dropdown");
      if (closestDropDown) {
        closestDropDown.setAttribute("aria-hidden", "true");
        const allLinks = closestDropDown.querySelectorAll("a");
        allLinks.forEach((link) => {
          link.setAttribute("tabindex", "-1"); // set tabindex to -1 so you cannot tab through these hidden links
        });
      }
    });
  }

  expansionListeners() {
    const allMenus = this.querySelectorAll(".js-cagov-navoverlay-expandable");
    allMenus.forEach((menu) => {
      const nearestMenu = menu.querySelector(".expanded-menu-section");
      if (nearestMenu) {
        const nearestMenuDropDown = nearestMenu.querySelector(
          ".expanded-menu-dropdown"
        );
        if (nearestMenuDropDown) {
          nearestMenuDropDown.setAttribute("aria-hidden", "true");
          menu.setAttribute("aria-expanded", "false");
        }
      }
      const menuComponent = this;
      menu.addEventListener("click", function addingClickListener(event) {
        if (event.target.nodeName !== "A") {
          event.preventDefault();
        }
        const expandedEl = this.querySelector(".expanded-menu-section");
        if (expandedEl) {
          if (expandedEl.classList.contains("expanded")) {
            // closing an open menu
            menuComponent.closeAllMenus();
          } else {
            menuComponent.closeAllMenus();
            expandedEl.classList.add("expanded");
            menu.setAttribute("aria-expanded", "true");
            const closestDropDown = this.querySelector(
              ".expanded-menu-dropdown"
            );
            if (closestDropDown) {
              closestDropDown.setAttribute("aria-hidden", "false");
              const allLinks = closestDropDown.querySelectorAll("a");
              allLinks.forEach((link) => {
                link.removeAttribute("tabindex"); // remove tabindex from all the links
              });
            }
          }
        }
      });
    });
  }
}
window.customElements.define("cagov-site-navigation", CAGovSiteNavigation);

//Page Navigation
var styles =
  "/* PAGE NAVIGATION */\nsidebar cagov-page-navigation .label {\n  font-weight: 700;\n  font-size: 24px;\n  line-height: 28.2px;\n  padding: 0;\n  margin: 0;\n  padding-bottom: 16px;\n}\n\nsidebar cagov-page-navigation ul,\nsidebar cagov-page-navigation ol:not([class*=menu]):not([class*=nav]):not([class*=footer-links]),\nsidebar cagov-page-navigation ul:not([class*=menu]):not([class*=nav]):not([class*=footer-links]) {\n  margin: 0;\n  text-indent: 0;\n  padding: 0;\n}\n\nsidebar cagov-page-navigation ul li {\n  padding-top: 14px;\n  padding-bottom: 18px;\n  margin-left: 0;\n  margin-top: 0px;\n  margin-bottom: 0px;\n  border-bottom: 1px solid var(--gray-300, #e1e0e3);\n  line-height: 28.2px;\n  list-style: none;\n}\nsidebar cagov-page-navigation ul li:first-child {\n  border-top: 1px solid var(--gray-300, #e1e0e3);\n}\nsidebar cagov-page-navigation ul li a {\n  text-decoration: none;\n}\nsidebar cagov-page-navigation ul li a:hover {\n  text-decoration: underline;\n}\n\n@media only screen and (max-width: 992px) {\n  cagov-page-navigation .label {\n    display: none;\n  }\n\n  .sidebar-container {\n    display: block;\n    width: 100%;\n    max-width: 100%;\n  }\n\n  cagov-page-navigation ul li a {\n    font-size: 16px;\n    line-height: 24px;\n  }\n}\n";

/**
 * Page Navigation web component
 *
 * @element cagov-page-navigation
 *
 * @attr {string} [data-selector] - "main";
 * @attr {string} [data-type] - "wordpress";
 * @attr {string} [data-label] - "On this page";
 */

class CAGovPageNavigation extends window.HTMLElement {
  connectedCallback() {
    this.type = "wordpress";

    /* eslint-disable */
    /* https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js */
    /* Smooth scroll polyfill for safari, since it does not support scroll behaviors yet - can be moved to a dependency bundle split out by browser support later or in headless implementation */
    !(function () {
      function o() {
        const o = window;
        const t = document;
        if (
          !(
            "scrollBehavior" in t.documentElement.style &&
            !0 !== o.__forceSmoothScrollPolyfill__
          )
        ) {
          let l;
          const e = o.HTMLElement || o.Element;
          var r = 468;
          var i = {
            scroll: o.scroll || o.scrollTo,
            scrollBy: o.scrollBy,
            elementScroll: e.prototype.scroll || n,
            scrollIntoView: e.prototype.scrollIntoView,
          };
          var s =
            o.performance && o.performance.now
              ? o.performance.now.bind(o.performance)
              : Date.now;
          var c =
            ((l = o.navigator.userAgent),
            new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(l)
              ? 1
              : 0);
          (o.scroll = o.scrollTo =
            function () {
              void 0 !== arguments[0] &&
                (!0 !== f(arguments[0])
                  ? h.call(
                      o,
                      t.body,
                      void 0 !== arguments[0].left
                        ? ~~arguments[0].left
                        : o.scrollX || o.pageXOffset,
                      void 0 !== arguments[0].top
                        ? ~~arguments[0].top
                        : o.scrollY || o.pageYOffset
                    )
                  : i.scroll.call(
                      o,
                      void 0 !== arguments[0].left
                        ? arguments[0].left
                        : typeof arguments[0] !== "object"
                        ? arguments[0]
                        : o.scrollX || o.pageXOffset,
                      void 0 !== arguments[0].top
                        ? arguments[0].top
                        : void 0 !== arguments[1]
                        ? arguments[1]
                        : o.scrollY || o.pageYOffset
                    ));
            }),
            (o.scrollBy = function () {
              void 0 !== arguments[0] &&
                (f(arguments[0])
                  ? i.scrollBy.call(
                      o,
                      void 0 !== arguments[0].left
                        ? arguments[0].left
                        : typeof arguments[0] !== "object"
                        ? arguments[0]
                        : 0,
                      void 0 !== arguments[0].top
                        ? arguments[0].top
                        : void 0 !== arguments[1]
                        ? arguments[1]
                        : 0
                    )
                  : h.call(
                      o,
                      t.body,
                      ~~arguments[0].left + (o.scrollX || o.pageXOffset),
                      ~~arguments[0].top + (o.scrollY || o.pageYOffset)
                    ));
            }),
            (e.prototype.scroll = e.prototype.scrollTo =
              function () {
                if (void 0 !== arguments[0])
                  if (!0 !== f(arguments[0])) {
                    const o = arguments[0].left;
                    const t = arguments[0].top;
                    h.call(
                      this,
                      this,
                      void 0 === o ? this.scrollLeft : ~~o,
                      void 0 === t ? this.scrollTop : ~~t
                    );
                  } else {
                    if (
                      typeof arguments[0] === "number" &&
                      void 0 === arguments[1]
                    )
                      throw new SyntaxError("Value could not be converted");
                    i.elementScroll.call(
                      this,
                      void 0 !== arguments[0].left
                        ? ~~arguments[0].left
                        : typeof arguments[0] !== "object"
                        ? ~~arguments[0]
                        : this.scrollLeft,
                      void 0 !== arguments[0].top
                        ? ~~arguments[0].top
                        : void 0 !== arguments[1]
                        ? ~~arguments[1]
                        : this.scrollTop
                    );
                  }
              }),
            (e.prototype.scrollBy = function () {
              void 0 !== arguments[0] &&
                (!0 !== f(arguments[0])
                  ? this.scroll({
                      left: ~~arguments[0].left + this.scrollLeft,
                      top: ~~arguments[0].top + this.scrollTop,
                      behavior: arguments[0].behavior,
                    })
                  : i.elementScroll.call(
                      this,
                      void 0 !== arguments[0].left
                        ? ~~arguments[0].left + this.scrollLeft
                        : ~~arguments[0] + this.scrollLeft,
                      void 0 !== arguments[0].top
                        ? ~~arguments[0].top + this.scrollTop
                        : ~~arguments[1] + this.scrollTop
                    ));
            }),
            (e.prototype.scrollIntoView = function () {
              if (!0 !== f(arguments[0])) {
                const l = (function (o) {
                  for (
                    ;
                    o !== t.body &&
                    !1 ===
                      ((e = p((l = o), "Y") && a(l, "Y")),
                      (r = p(l, "X") && a(l, "X")),
                      e || r);

                  )
                    o = o.parentNode || o.host;
                  let l;
                  let e;
                  let r;
                  return o;
                })(this);
                const e = l.getBoundingClientRect();
                const r = this.getBoundingClientRect();
                l !== t.body
                  ? (h.call(
                      this,
                      l,
                      l.scrollLeft + r.left - e.left,
                      l.scrollTop + r.top - e.top
                    ),
                    o.getComputedStyle(l).position !== "fixed" &&
                      o.scrollBy({
                        left: e.left,
                        top: e.top,
                        behavior: "smooth",
                      }))
                  : o.scrollBy({
                      left: r.left,
                      top: r.top,
                      behavior: "smooth",
                    });
              } else
                i.scrollIntoView.call(
                  this,
                  void 0 === arguments[0] || arguments[0]
                );
            });
        }
        function n(o, t) {
          (this.scrollLeft = o), (this.scrollTop = t);
        }
        function f(o) {
          if (
            o === null ||
            typeof o !== "object" ||
            void 0 === o.behavior ||
            o.behavior === "auto" ||
            o.behavior === "instant"
          )
            return !0;
          if (typeof o === "object" && o.behavior === "smooth") return !1;
          throw new TypeError(
            `behavior member of ScrollOptions ${o.behavior} is not a valid value for enumeration ScrollBehavior.`
          );
        }
        function p(o, t) {
          return t === "Y"
            ? o.clientHeight + c < o.scrollHeight
            : t === "X"
            ? o.clientWidth + c < o.scrollWidth
            : void 0;
        }
        function a(t, l) {
          const e = o.getComputedStyle(t, null)[`overflow${l}`];
          return e === "auto" || e === "scroll";
        }
        function d(t) {
          let l;
          let e;
          let i;
          let c;
          let n = (s() - t.startTime) / r;
          (c = n = n > 1 ? 1 : n),
            (l = 0.5 * (1 - Math.cos(Math.PI * c))),
            (e = t.startX + (t.x - t.startX) * l),
            (i = t.startY + (t.y - t.startY) * l),
            t.method.call(t.scrollable, e, i),
            (e === t.x && i === t.y) || o.requestAnimationFrame(d.bind(o, t));
        }
        function h(l, e, r) {
          let c;
          let f;
          let p;
          let a;
          const h = s();
          l === t.body
            ? ((c = o),
              (f = o.scrollX || o.pageXOffset),
              (p = o.scrollY || o.pageYOffset),
              (a = i.scroll))
            : ((c = l), (f = l.scrollLeft), (p = l.scrollTop), (a = n)),
            d({
              scrollable: c,
              method: a,
              startTime: h,
              startX: f,
              startY: p,
              x: e,
              y: r,
            });
        }
      }
      typeof exports === "object" && typeof module !== "undefined"
        ? (module.exports = { polyfill: o })
        : o();
    })();
    /* eslint-enable */

    if (this.type === "wordpress") {
      document.addEventListener("DOMContentLoaded", () =>
        this.buildContentNavigation()
      );
    }
    if (
      document.readyState === "complete" ||
      document.readyState === "loaded"
    ) {
      this.buildContentNavigation();
    }
  }

  buildContentNavigation() {
    // Parse header tags
    const markup = this.getHeaderTags();
    let label = null;
    if (markup !== null) {
      label = this.dataset.label || "On this page";
    }
    let content = null;
    if (markup !== null) {
      content = `<nav aria-labelledby="page-navigation-label"> <div id="page-navigation-label" className="label">${label}</div> ${markup}</nav>`;
    }

    this.template({ content }, "wordpress");
  }

  template(data, type) {
    if (data !== undefined && data !== null && data.content !== null) {
      if (type === "wordpress") {
        this.innerHTML = `${data.content}`;
      }
    }

    document.querySelectorAll("a[data-page-navigation]").forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const hashval = decodeURI(anchor.getAttribute("href"));
        try {
          const target = document.querySelector(hashval);
          if (target !== null) {
            const position = target.getBoundingClientRect();

            window.scrollTo({
              // Handle accessible smoothing behavior in CSS
              left: position.left,
              top: position.top - 200,
            });

            target.focus();

            window.history.pushState(null, null, hashval);
          }
        } catch (error) {
          console.error(error);
        }
        e.preventDefault();
      });
    });

    return null;
  }

  renderNoContent() {
    this.innerHTML = "";
  }

  getHeaderTags() {
    const { selector } = this.dataset;
    // const { callback } = this.dataset; // Editor only right now

    const h = ["h2"];
    for (let i = 0; i < h.length; i += 1) {
      // Pull out the header tags, in order & render as links with anchor tags
      // auto convert h tags with tag names
      if (selector !== undefined && selector !== null) {
        {
          const selectorContent = document.querySelector(selector);
          if (selectorContent !== null) {
            const outline = CAGovPageNavigation.outliner(selectorContent);
            return outline;
          }
        }
      }
    }
    return null;
  }

  static outliner(content) {
    const headers = content.querySelectorAll("h2");
    let output = "";
    if (headers !== undefined && headers !== null && headers.length > 0) {
      headers.forEach((tag) => {
        const tagId = tag.getAttribute("id");
        const tagName = tag.getAttribute("name");

        const title = tag.innerHTML;

        let anchorLabel = null;

        // If id not set already, create an id to jump to.
        if (tagId) {
          anchorLabel = tagId;
        } else if (tagName) {
          anchorLabel = tagName;
        } else {
          anchorLabel = tag.innerHTML;
        }

        // Convert anchor label content to remove breaking characters.
        const anchor = anchorLabel
          .toLowerCase()
          .trim()
          .replace(/ /g, "-")
          // Strip out unallowed CSS characters (Selector API is used with the anchor links)
          // !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;,
          // <, =, >, ?, @, [, \, ], ^, `, {, |, }, and ~.
          .replace(
            /\(|\)|!|"|#|\$|%|&|'|\*|\+|,|\.|\/|:|;|<|=|>|\?|@|\[|\]|\\|\^|`|\{|\||\|\}|~/g,
            ""
          )
          // All other characters are encoded and decoded using encodeURI/decodeURI
          // which escapes UTF-8 characters.
          // If we want to do this with allowed characters only
          // .replace(/a-zA-ZÃ€-Ã–Ã™-Ã¶Ã¹-Ã¿Ä€-Å¾á¸€-á»¿0-9/g,"")
          // Alt: [a-zA-Z\u00C0-\u017F]+,\s[a-zA-Z\u00C0-\u017F]+
          .replace(/a-zA-ZÃ€-Ã–Ã™-Ã¶Ã¹-Ã¿Ä€-Å¾á¸€-á»¿0-9\u00A0-\u017F/g, "");

        output += `<li><a data-page-navigation href="#${encodeURI(
          anchor
        )}">${title}</a></li>`;

        tag.setAttribute("id", anchor);
        tag.setAttribute("name", anchor);
      });
      return `<ul>${output}</ul>`;
    }
    return null;
  }
}

if (customElements.get("cagov-page-navigation") === undefined) {
  window.customElements.define("cagov-page-navigation", CAGovPageNavigation);
}

const style = document.createElement("style");
style.textContent = styles;
document.querySelector("head").appendChild(style);

// Alert banner

window.addEventListener('load', (event) => {
  if (document.querySelector("#alert-experimental") && document.querySelector("#hideAlert")) {
    document.querySelector("#hideAlert").onclick = function() {
      document.querySelector("#alert-experimental").style.display = "none";
      createCookie('cookie-experimental', 'hide', 7);
    };
    if (readCookie('cookie-experimental') != 'hide') {
      const styleTag = document.createElement("style");
      styleTag.textContent = "div#alert-experimental { display:block; }";
      document.querySelector("head").appendChild(styleTag);
    }
  }
});

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
function eraseCookie(name) {
  createCookie(name,"",-1);
}
