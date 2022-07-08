import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="site-header">
        <div className="container with-logo">
          <Link href="/" passHref>
            <a className="grid-logo" aria-label="DCC logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 20 14.6"
                viewBox="0 0 20 14.6"
              >
                <path
                  fill="#e69024"
                  d="M12.4 6.1c.1-.2.2-.7.4-1.5.1-.2.2-.6.4-1.3.2-.6.4-1.2.6-1.5-.4.3-.8.6-1.2 1.1-1.5 1.6-3.2 3.6-3.8 4.6.2-.1.6-.6 2.1-1.1 1-.3 1.5-.3 1.5-.3zm-.3 1c-4.7 0-6.7 7.5-10 7.5-.7 0-1.3-.3-1.7-1-.3-.4-.4-.9-.4-1.4C0 10.8.6 9.1 1.9 7 3 5.2 4.2 3.8 5.4 2.7c1.1-.9 2-1.4 2.7-1.4.4 0 .7.2 1 .5.2.2.3.5.3.8 0 .6-.2 1.3-.6 2.1-.4.7-.8 1.3-1.4 1.9-.3.3-.6.5-.8.5-.1 0-.3-.1-.4-.2-.1-.1-.1-.2-.1-.3 0-.2.2-.5.6-.8.5-.4 1-.9 1.3-1.3.5-.7.7-1.3.7-1.8 0-.2 0-.3-.1-.4-.1-.2-.3-.2-.4-.2-.3 0-.8.3-1.5.8S5.2 4.2 4.4 5.2C3.4 6.4 2.6 7.7 2 8.9c-.6 1.3-.8 2.3-.8 3.2 0 .4.1.8.4 1.1s.6.5 1 .5c1.5-.1 3.3-3.5 3.9-4.3 5.7-7.9 6.1-7.9 7-8.7.5-.5.8-.7 1.1-.7.2 0 .3.1.4.2.1.1.2.3.2.4 0 .2-.1.5-.3.9-.3.8-.6 1.7-.9 2.5-.2.8-.4 1.4-.5 1.8h.7c.4 0 .5.1.5.4 0 .1 0 .2-.1.4-.1.1-.2.2-.3.2H14c-.4 0-.6 0-.8.1-.1.2-.2 1.9-.5 2-.7.7-.6-1.6-.6-1.8z"
                ></path>
                <path
                  fill="#005e8a"
                  d="M7.5 12.3c.2 0 .4.1.5.2.1.1.2.3.2.5s-.1.4-.2.5c-.1.1-.3.2-.5.2s-.4-.1-.5-.2c-.1-.1-.2-.3-.2-.5s.1-.4.2-.5c.1-.2.2-.2.5-.2zm4.5-2l-.5.5c-.3-.4-.7-.5-1.2-.5-.4 0-.7.1-1 .4-.2.2-.3.5-.3.9s.1.7.4 1c.3.3.6.4 1 .4.3 0 .5-.1.7-.2.2-.1.3-.3.4-.5h-1.1v-.7h2v.2c0 .3-.1.7-.3 1s-.4.5-.7.7-.6.2-1 .2-.8-.1-1.1-.3c-.3-.2-.6-.4-.8-.8-.2-.3-.3-.7-.3-1.1 0-.5.2-1 .5-1.4.4-.5.9-.7 1.6-.7.3 0 .7.1 1 .2.2.2.5.4.7.7zm2.6-.8c.6 0 1 .2 1.4.6.4.4.6.9.6 1.5s-.2 1.1-.6 1.5-.9.6-1.4.6c-.6 0-1.1-.2-1.5-.6-.4-.4-.6-.9-.6-1.5 0-.4.1-.7.3-1s.4-.6.7-.8c.4-.2.7-.3 1.1-.3zm0 .8c-.4 0-.7.1-.9.4-.2.3-.4.6-.4 1s.2.8.5 1c.2.2.5.3.8.3.4 0 .7-.1.9-.4.2-.3.4-.6.4-1s-.1-.7-.4-1c-.3-.2-.6-.3-.9-.3zm1.9-.7h.7l1 2.8 1-2.8h.8l-1.4 4h-.7z"
                ></path>
              </svg>
            </a>
          </Link>

          <Link href="/" passHref>
            <a className="grid-org-name">
              <span className="org-name-dept">
                Department of <br />
                Open Data
              </span>
              <span className="org-name-state"> California </span>
            </a>
          </Link>

          <div className="cagov-nav mobile-icons grid-mobile-icons">
            <div className="cagov-nav mobile-search">
              <button className="search-btn" aria-expanded="true">
                <span>Search</span>
              </button>
            </div>
            <button
              className="menu-trigger cagov-nav open-menu"
              aria-label="Navigation menu"
              aria-haspopup="true"
              aria-expanded="false"
              aria-owns="mainMenu"
              aria-controls="mainMenu"
            >
              <div className="cagov-nav hamburger">
                <div className="hamburger-box">
                  <div className="hamburger-inner"></div>
                </div>
              </div>
              <div
                className="cagov-nav menu-trigger-label menu-label"
                data-openlabel="Menu"
                data-closelabel="Close"
              >
                Menu
              </div>
            </button>
          </div>

          <div className="search-container grid-search">
            <form className="site-search">
              <span className="sr-only" id="SearchInput">
                Custom Google Search
              </span>
              <input
                type="text"
                id="q"
                name="q"
                aria-labelledby="SearchInput"
                placeholder="Search this website"
                className="search-textfield"
              />
              <button className="search-submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 17 17"
                  viewBox="0 0 17 17"
                >
                  <path
                    fill="#fff"
                    d="M16.4 15.2l-4-4c2-2.6 1.8-6.5-.6-8.9-1.3-1.3-3-2-4.8-2s-3.5.7-4.8 2c-2.6 2.6-2.6 6.9 0 9.6 1.3 1.3 3 2 4.8 2 1.4 0 2.9-.5 4.1-1.4l4.1 4c.2.2.4.3.7.3.2 0 .5-.1.7-.3.1-.3.1-.9-.2-1.3zM7 12c-1.3 0-2.6-.5-3.5-1.4-1.9-1.9-1.9-5.1 0-7 .9-.9 2.1-1.5 3.5-1.5s2.6.5 3.5 1.4 1.4 2.2 1.4 3.5-.5 2.6-1.4 3.5c-1 1-2.2 1.5-3.5 1.5z"
                  ></path>
                </svg>
                <span className="sr-only">Submit</span>
              </button>
              <button className="search-close">Close</button>
            </form>
          </div>
        </div>
      </div>
      <nav
        className="expanded-menu"
        role="navigation"
        aria-label="Site Navigation"
        aria-hidden="false"
        id="main-menu"
      >
        <cagov-site-navigation>
          <div className="expanded-menu-grid">
            <div className="expanded-menu-section mobile-only">
              <strong className="expanded-menu-section-header">
                  <a href="/nav-link" className="expanded-menu-section-header-link js-event-hm-menu">
                    Datasets
                  </a>
              </strong>
            </div>
            <div
              className="expanded-menu-col js-cagov-navoverlay-expandable"
              aria-expanded="false"
            >
              <div className="expanded-menu-section">
                <strong className="expanded-menu-section-header">
                    <a href="/nav-link" className="expanded-menu-section-header-link js-event-hm-menu">
                      Organizations
                    </a>
                </strong>
              </div>
            </div>
            <div
              className="expanded-menu-col js-cagov-navoverlay-expandable"
              aria-expanded="false"
            >
              <div className="expanded-menu-section">
                <strong className="expanded-menu-section-header">
                    <a href="/nav-link" className="expanded-menu-section-header-link js-event-hm-menu">
                      Topics
                    </a>
                </strong>
              </div>
            </div>
            <div
              className="expanded-menu-col js-cagov-navoverlay-expandable"
              aria-expanded="false"
            >
              <div className="expanded-menu-section">
                <strong className="expanded-menu-section-header">
                  <button className="expanded-menu-section-header-link js-event-hm-menu">
                    <span>Style guides</span>
                  </button>
                </strong>
                <div className="expanded-menu-dropdown" aria-hidden="true">
                    <a href="/nav-link" className="expanded-menu-dropdown-link js-event-hm-menu">
                      State portals
                    </a>
                    <a href="/nav-link" className="expanded-menu-dropdown-link js-event-hm-menu">
                      Documentation
                    </a>
                </div>
              </div>
            </div>
            <div
              className="expanded-menu-col js-cagov-navoverlay-expandable"
              aria-expanded="false"
            >
              <div className="expanded-menu-section">
                <strong className="expanded-menu-section-header">
                    <a href="/nav-link" className="expanded-menu-dropdown-link js-event-hm-menu">
                      Caldata
                    </a>
                </strong>
              </div>
            </div>
            <div
              className="expanded-menu-col js-cagov-navoverlay-expandable"
              aria-expanded="false"
            >
              <div className="expanded-menu-section">
                <strong className="expanded-menu-section-header">
                    <a href="/nav-link" className="expanded-menu-dropdown-link js-event-hm-menu">
                      CA state geoportal
                    </a>
                </strong>
              </div>
            </div>
            <div
              className="expanded-menu-col js-cagov-navoverlay-expandable"
              aria-expanded="false"
            >
              <div className="expanded-menu-section">
                <strong className="expanded-menu-section-header">
                    <a href="/nav-link" className="expanded-menu-dropdown-link js-event-hm-menu">
                      About
                    </a>
                </strong>
              </div>
            </div>
          </div>
        </cagov-site-navigation>
      </nav>
    </>
  );
}
