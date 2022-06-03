import "../styles/styles.css";
import "../styles/custom.css";
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  const fullYear = new Date().getFullYear();
  return (
    <>
      <div>
        <div className="official-header">
          <div className="container">
            <div className="official-logo">
              <a
                className="cagov-logo"
                href="https://ca.gov"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 20 14.6"
                  viewBox="0 0 20 14.6"
                  width="33"
                  height="24"
                >
                  <path
                    fill="#E69024"
                    d="M12.4 6.1c.1-.2.2-.7.4-1.5.1-.2.2-.6.4-1.3.2-.6.4-1.2.6-1.5-.4.3-.8.6-1.2 1.1-1.5 1.6-3.2 3.6-3.8 4.6.2-.1.6-.6 2.1-1.1 1-.3 1.5-.3 1.5-.3zm-.3 1c-4.7 0-6.7 7.5-10 7.5-.7 0-1.3-.3-1.7-1-.3-.4-.4-.9-.4-1.4C0 10.8.6 9.1 1.9 7 3 5.2 4.2 3.8 5.4 2.7c1.1-.9 2-1.4 2.7-1.4.4 0 .7.2 1 .5.2.2.3.5.3.8 0 .6-.2 1.3-.6 2.1-.4.7-.8 1.3-1.4 1.9-.3.3-.6.5-.8.5-.1 0-.3-.1-.4-.2-.1-.1-.1-.2-.1-.3 0-.2.2-.5.6-.8.5-.4 1-.9 1.3-1.3.5-.7.7-1.3.7-1.8 0-.2 0-.3-.1-.4-.1-.2-.3-.2-.4-.2-.3 0-.8.3-1.5.8S5.2 4.2 4.4 5.2C3.4 6.4 2.6 7.7 2 8.9c-.6 1.3-.8 2.3-.8 3.2 0 .4.1.8.4 1.1s.6.5 1 .5c1.5-.1 3.3-3.5 3.9-4.3 5.7-7.9 6.1-7.9 7-8.7.5-.5.8-.7 1.1-.7.2 0 .3.1.4.2.1.1.2.3.2.4 0 .2-.1.5-.3.9-.3.8-.6 1.7-.9 2.5-.2.8-.4 1.4-.5 1.8h.7c.4 0 .5.1.5.4 0 .1 0 .2-.1.4-.1.1-.2.2-.3.2H14c-.4 0-.6 0-.8.1-.1.2-.2 1.9-.5 2-.7.7-.6-1.6-.6-1.8z"
                  ></path>
                  <path
                    fill="#FAFAFA"
                    d="M7.5 12.3c.2 0 .4.1.5.2.1.1.2.3.2.5s-.1.4-.2.5c-.1.1-.3.2-.5.2s-.4-.1-.5-.2c-.1-.1-.2-.3-.2-.5s.1-.4.2-.5c.1-.2.2-.2.5-.2zm4.5-2l-.5.5c-.3-.4-.7-.5-1.2-.5-.4 0-.7.1-1 .4-.2.2-.3.5-.3.9s.1.7.4 1c.3.3.6.4 1 .4.3 0 .5-.1.7-.2.2-.1.3-.3.4-.5h-1.1v-.7h2v.2c0 .3-.1.7-.3 1s-.4.5-.7.7-.6.2-1 .2-.8-.1-1.1-.3c-.3-.2-.6-.4-.8-.8-.2-.3-.3-.7-.3-1.1 0-.5.2-1 .5-1.4.4-.5.9-.7 1.6-.7.3 0 .7.1 1 .2.2.2.5.4.7.7zm2.6-.8c.6 0 1 .2 1.4.6.4.4.6.9.6 1.5s-.2 1.1-.6 1.5-.9.6-1.4.6c-.6 0-1.1-.2-1.5-.6-.4-.4-.6-.9-.6-1.5 0-.4.1-.7.3-1s.4-.6.7-.8c.4-.2.7-.3 1.1-.3zm0 .8c-.4 0-.7.1-.9.4-.2.3-.4.6-.4 1s.2.8.5 1c.2.2.5.3.8.3.4 0 .7-.1.9-.4.2-.3.4-.6.4-1s-.1-.7-.4-1c-.3-.2-.6-.3-.9-.3zm1.9-.7h.7l1 2.8 1-2.8h.8l-1.4 4h-.7z"
                  ></path>
                </svg>
              </a>

              <p className="official-tag">
                Official website of the State of California
              </p>
            </div>
          </div>
        </div>
        <div className="site-header">
          <div className="container">
            {/*<Link href="/" passHref>
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
            </Link>*/}
            <Link href="/" passHref>
              <a className="grid-org-name">
                <span className="org-name-state"> State of California </span>
                <span className="org-name-dept">Open Data</span>
              </a>
            </Link>
            <div className="cagov-nav mobile-icons grid-mobile-icons">
              <div className="cagov-nav mobile-search">
                <button className="search-btn" aria-expanded="false">
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

            {/*
            <div className="search-container grid-search">
              <form className="site-search" action="/results">
                <span className="sr-only" id="SearchInput">
                  Dataset search
                </span>
                <input
                  type="text"
                  id="q-top"
                  name="q"
                  aria-labelledby="SearchInput"
                  placeholder="Search data"
                  className="search-textfield"
                  autoCorrect="off"
                  autoComplete="off"
                />
                <button id="nav-search" type="" className="search-submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 17 17"
                    viewBox="0 0 17 17"
                    style={{ width: 18 }}
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
          */}
          </div>
        </div>

        <cagov-site-navigation>
          <div className="container">
            <div className="search-container search-container--small hidden-search">
              <form className="site-search" action="/results">
                <span className="sr-only" id="SearchInput2">
                  Search datasets
                </span>
                <input
                  type="text"
                  id="q-top-mobile"
                  name="q-top"
                  aria-labelledby="SearchInput"
                  placeholder="Search datasets"
                  className="search-textfield"
                />
                <button type="submit" className="search-submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 17 17"
                    viewBox="0 0 17 17"
                    style={{ width: 17 }}
                  >
                    <path
                      fill="#fff"
                      d="M16.4 15.2l-4-4c2-2.6 1.8-6.5-.6-8.9-1.3-1.3-3-2-4.8-2s-3.5.7-4.8 2c-2.6 2.6-2.6 6.9 0 9.6 1.3 1.3 3 2 4.8 2 1.4 0 2.9-.5 4.1-1.4l4.1 4c.2.2.4.3.7.3.2 0 .5-.1.7-.3.1-.3.1-.9-.2-1.3zM7 12c-1.3 0-2.6-.5-3.5-1.4-1.9-1.9-1.9-5.1 0-7 .9-.9 2.1-1.5 3.5-1.5s2.6.5 3.5 1.4 1.4 2.2 1.4 3.5-.5 2.6-1.4 3.5c-1 1-2.2 1.5-3.5 1.5z"
                    ></path>
                  </svg>
                  <span className="sr-only">Submit</span>
                </button>
              </form>
            </div>
            <nav
              className="expanded-menu"
              role="navigation"
              aria-label="Site Navigation"
              aria-hidden="false"
              id="main-menu"
            >
              <div className="expanded-menu-grid">
                <div
                  className="expanded-menu-col js-cagov-navoverlay-expandable"
                  aria-expanded="false"
                >
                  <div className="expanded-menu-section">
                    <strong className="expanded-menu-section-header">
                      <Link href="/datasets?q=" passHref>
                        <a className="expanded-menu-section-header-link js-event-hm-menu">
                          All datasets
                        </a>
                      </Link>
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
                        <span>Explore datasets</span>
                        <span className="expanded-menu-section-header-arrow">
                          <svg
                            aria-hidden="true"
                            width="11"
                            height="7"
                            className="expanded-menu-section-header-arrow-svg"
                            viewBox="0 0 11 7"
                            fill="#046A99"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.15596 0.204797L5.49336 5.06317L9.8545 0.204797C10.4293 -0.452129 11.4124 0.625368 10.813 1.28143L5.90083 6.82273C5.68519 7.05909 5.32606 7.05909 5.1342 6.82273L0.174341 1.28143C-0.400433 0.6245 0.581838 -0.452151 1.15661 0.204797H1.15596Z"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </strong>
                    <div className="expanded-menu-dropdown" aria-hidden="true">
                      <Link href="/topics" passHref>
                        <a
                          className="expanded-menu-dropdown-link js-event-hm-menu"
                          tabIndex="-1"
                        >
                          Topics
                        </a>
                      </Link>
                      <Link href="/organizations" passHref>
                        <a
                          className="expanded-menu-dropdown-link js-event-hm-menu"
                          tabIndex="-1"
                        >
                          Organizations
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>

                <div
                  className="expanded-menu-col js-cagov-navoverlay-expandable"
                  aria-expanded="false"
                >
                  <div className="expanded-menu-section">
                    <strong className="expanded-menu-section-header">
                      <button className="expanded-menu-section-header-link js-event-hm-menu">
                        <span>About</span>
                        <span className="expanded-menu-section-header-arrow">
                          <svg
                            aria-hidden="true"
                            width="11"
                            height="7"
                            className="expanded-menu-section-header-arrow-svg"
                            viewBox="0 0 11 7"
                            fill="#046A99"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.15596 0.204797L5.49336 5.06317L9.8545 0.204797C10.4293 -0.452129 11.4124 0.625368 10.813 1.28143L5.90083 6.82273C5.68519 7.05909 5.32606 7.05909 5.1342 6.82273L0.174341 1.28143C-0.400433 0.6245 0.581838 -0.452151 1.15661 0.204797H1.15596Z"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </strong>
                    <div className="expanded-menu-dropdown" aria-hidden="true">
                      <Link href="/about" passHref>
                        <a
                          className="expanded-menu-dropdown-link js-event-hm-menu"
                          tabIndex="-1"
                        >
                          About
                        </a>
                      </Link>
                      <Link href="/contact-us" passHref>
                        <a
                          className="expanded-menu-dropdown-link js-event-hm-menu"
                          tabIndex="-1"
                        >
                          Contact us
                        </a>
                      </Link>
                      <Link href="/licenses" passHref>
                        <a
                          className="expanded-menu-dropdown-link js-event-hm-menu"
                          tabIndex="-1"
                        >
                          Licenses
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </cagov-site-navigation>
      </div>
      <Component {...pageProps} />

      {/*}
      <section aria-label="Site footer" className="site-footer">
        <div className="container">
          <div className="footer-logo">
            <Link href="/" passHref>
              <a>
                <Image
                  className="logo-img"
                  src="/images/circle-logo.png"
                  alt="Organization logo"
                  width={70}
                  height={70}
                />
              </a>
            </Link>
          </div>
          <div className="footer-secondary-links">
            <Link href="/contact-us" passHref>
              <a>Contact us</a>
            </Link>
            <a href="#">Sitemap</a>
          </div>
          <div className="footer-social-links">
            <a href="footer-link">
              <span className="sr-only">Facebook</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                x="0"
                y="0"
                aria-hidden="true"
                enableBackground="new 0 0 24 24"
              >
                <path d="M14 12.7h3.2l.5-3.7H14V6.7c0-1 .3-1.9 1.9-1.9H18V1.5c-.3 0-1.6-.2-2.9-.2-2.9 0-4.9 1.7-4.9 5.1v2.9H6.9V13h3.2v9.5H14v-9.8z"></path>
              </svg>
            </a>
            <a href="footer-link">
              <span className="sr-only">GitHub</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                x="0"
                y="0"
                aria-hidden="true"
                enableBackground="new 0 0 24 24"
              >
                <path d="M23.3 12.8c0 .3-.1.7-.1 1-.2 1.5-.7 3-1.5 4.3-.9 1.5-2.1 2.7-3.5 3.6-.8.5-1.6.9-2.4 1.2-.5.2-.8-.1-.8-.6v-2.9c0-.6-.1-1.2-.4-1.7-.1-.2-.2-.3-.3-.4.4-.1.9-.1 1.3-.2 1.1-.3 2.2-.8 2.9-1.8.5-.7.7-1.6.9-2.5.1-.7.1-1.4 0-2.1s-.4-1.3-.9-1.8c-.1-.1-.1-.2-.1-.4.3-.9.2-1.8-.2-2.7 0-.1-.1-.1-.2-.1-.4-.1-.8.1-1.1.2-.8.1-1.4.4-1.9.7-.1 0-.2.1-.3.1-1.8-.4-3.5-.4-5.3 0-.1 0-.2 0-.3-.1-.7-.5-1.5-.8-2.3-1-.6-.1-.7-.1-.9.4-.2.8-.3 1.6 0 2.4v.2C5 9.7 4.7 11 4.8 12.3c.1.8.3 1.6.6 2.3.5 1 1.4 1.6 2.4 2 .7.2 1.3.3 2 .5-.4.4-.5.8-.6 1.3 0 .1-.1.2-.1.2-.8.3-1.6.4-2.3 0-.4-.2-.6-.5-.8-.9-.3-.6-.8-1-1.4-1.1-.2-.1-.5 0-.7 0s-.2.1-.1.3l.3.3c.6.3.9.9 1.2 1.5.2.4.3.7.6 1 .5.4 1.1.6 1.7.6h1.6V22.2c0 .6-.3.8-.9.6-2.9-1-5-2.9-6.4-5.5-1.1-2-1.4-4.1-1.1-6.4.3-2.4 1.2-4.4 2.7-6.2 1.6-1.8 3.6-3.1 6-3.6 3.5-.7 6.7 0 9.5 2.3 2.1 1.7 3.4 3.9 4 6.6.1.4.1.8.2 1.2v.2c.1.5.1.9.1 1.4z"></path>
              </svg>
            </a>
            <a href="footer-link">
              <span className="sr-only">Twitter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                x="0"
                y="0"
                aria-hidden="true"
                enableBackground="new 0 0 24 24"
              >
                <path d="M21.2 8v.6c0 6-4.6 12.9-12.9 12.9-2.6 0-4.9-.7-7-2 .3 0 .7.1 1 .1 2.2 0 4.1-.7 5.7-1.9-2 0-3.6-1.4-4.2-3.1.3.1.6.1.9.1.4 0 .9-.1 1.2-.1-2-.4-3.6-2.2-3.6-4.5V10c.6.3 1.3.6 2 .6-1.2-.9-2-2.2-2-3.8 0-.9.2-1.6.6-2.2 2.2 2.8 5.5 4.6 9.3 4.7-.2-.3-.2-.7-.2-1.1 0-2.5 2-4.5 4.5-4.5 1.3 0 2.5.6 3.3 1.4 1-.2 2-.6 2.9-1-.2 1.1-1 1.9-2 2.5 1-.1 1.8-.3 2.6-.7-.4.6-1.1 1.5-2.1 2.1z"></path>
              </svg>
            </a>
            <a href="footer-link">
              <span className="sr-only">Email</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                x="0"
                y="0"
                aria-hidden="true"
                enableBackground="new 0 0 24 24"
              >
                <path d="M22.9 6.4c-.1-1-.8-1.8-1.8-1.8H3h-.1c-1 0-1.8.8-1.9 1.8v13h21.9V6.6v-.1-.1zm-3.6.1L12 12.7 4.6 6.5h14.7zM3 8.4s0 .1 0 0v-.8l4.8 4.1L3 16.3V8.4zm1 9l4.9-4.8 3.1 2.7 3.2-2.8 4.8 4.9H4zm17-1.1l-4.8-4.6L21 7.6V16.3z"></path>
              </svg>
            </a>
            <a href="footer-link">
              <span className="sr-only">YouTube</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                x="0"
                y="0"
                aria-hidden="true"
                enableBackground="new 0 0 24 24"
              >
                <path d="M23 6.6s-.3-1.6-.9-2.2c-.9-.8-1.8-.8-2.2-.9-3.2-.3-7.9-.3-7.9-.3s-4.7 0-7.9.3c-.4 0-1.4 0-2.2.9-.7.7-.9 2.2-.9 2.2s-.3 2-.3 3.7V12c0 2 .3 3.7.3 3.7s.3 1.6.9 2.2c.8.9 2 .9 2.5.9 1.8.1 7.6.3 7.6.3s4.7 0 7.9-.3c.4 0 1.4 0 2.2-.9.7-.7.9-2.2.9-2.2s.3-1.8.3-3.7v-1.7c-.1-1.9-.3-3.7-.3-3.7zM8.7 15.9V6.6l8.8 4.6-8.8 4.7z"></path>
              </svg>
            </a>
            <a href="footer-link">
              <span className="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                x="0"
                y="0"
                aria-hidden="true"
                enableBackground="new 0 0 24 24"
              >
                <path d="M16.4 1.5H7.7c-3.4 0-6.2 2.7-6.2 6.2v8.8c0 3.4 2.8 6.1 6.2 6.1h8.8c3.4 0 6.1-2.8 6.1-6.1V7.6c-.1-3.4-2.8-6.1-6.2-6.1zm4 14.9c0 2.2-1.8 4.1-4.1 4.1H7.6c-2.2 0-4.1-1.8-4.1-4V7.7c0-2.2 1.8-4.1 4.1-4.1h8.8c2.2 0 4 1.8 4 4.1v8.7z"></path>
                <path d="M12 7.1c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9 4.9-2.2 4.9-4.9-2.2-4.9-4.9-4.9zm0 7.8c-1.6 0-2.9-1.3-2.9-2.9s1.3-2.9 2.9-2.9 2.9 1.3 2.9 2.9-1.3 2.9-2.9 2.9zM18.5 6.9c0 .7-.6 1.3-1.3 1.3S16 7.6 16 6.9s.6-1.3 1.3-1.3 1.2.6 1.2 1.3z"></path>
              </svg>
            </a>
              </div>
        </div>
        </section>*/}
      <footer>
        <div className="bg-light-grey">
          <div className="container">
            <a
              href="https://ca.gov"
              className="cagov-logo"
              title="ca.gov"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 20 14.6"
                viewBox="0 0 20 14.6"
                width="33"
                height="24"
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
            <div className="footer-secondary-links">
              <a href="https://www.ca.gov">CA.gov home</a>
              <a href="https://www.ca.gov/use/">Conditions of Use</a>
              <a href="https://www.ca.gov/privacy-policy/">Privacy Policy</a>
              <a href="https://www.ca.gov/accessibility/">Accessibility</a>
              <Link href="/sitemap" passHref>
                <a>Sitemap</a>
              </Link>
            </div>
            <p className="copyright">
              Copyright &copy; {fullYear} State of California
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default MyApp;
