import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <main id="body-content" className="cagov-main">
        <article id="post-design" className="cagov-article">
          <div className="page-container-centered">
            <h1>Page not found</h1>
            <p>
              We’re sorry, that link didn’t work. To find what you need, you
              can:
            </p>
            <ul>
              <li>
                Browse our{" "}
                <Link href="/">
                  <a>homepage</a>
                </Link>
              </li>
              <li>Make sure the link is correct</li>
              <li>
                Use{" "}
                <Link href="/datasets">
                  <a>search</a>
                </Link>{" "}
                or the{" "}
                <Link href="/site-map">
                  <a>site map</a>
                </Link>
              </li>
              <li>
                Check out these popular links
                <ul className="list-reset">
                  <li>
                    <Link href="/dataset/covid-19-hospital-data1">
                      <a>COVID-19 hospital data</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dataset/ca-geographic-boundaries">
                      <a>California geographic boundaries</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dataset/covid-19-vaccine-progress-dashboard-data">
                      <a>COVID-19 vaccine progress</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dataset/dwc-medical-provider-network-mpn">
                      <a>List of Approved Medical Provider Network</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dataset/county-and-zip-code-references">
                      <a>County and ZIP code</a>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <p>
              Did you get here from a link on our website?{" "}
              <Link href="/contact-us">
                <a>Let us know</a>
              </Link>{" "}
              so we can fix it.
            </p>
            <div className="svg-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#046a99"
                viewBox="0 0 245 247.9"
              >
                <path d="M91.7 143.8H67l-61.9 62a17.4 17.4 0 000 24.6l12.4 12.4a17.4 17.4 0 0024.7 0l62-62v-24.6L167.4 93l15.4 15.4 18.5-18.6 24.7 24.7a35 35 0 000-49.5l-43.2-43.2-13 13V8.5L161.3 0 118 43.4l8.5 8.6h26.1l-13 12.9L155 80.3l-63.3 63.5zM30 230.4L17.5 218l55.7-55.7 12.4 12.5L30 230.4z"></path>
                <path
                  d="M122.5 113L78.9 69.6l2.7-22L41.3 7 4.1 44.3l40.4 40.4 22-2.6 43.6 43.3 12.4-12.4zm117.4 92.7l-62-61.9h-24.6l-6-6-12.4 12.5 6 6v24.6l61.9 62a17.4 17.4 0 0024.7 0l12.4-12.5a17.4 17.4 0 000-24.7zM215 230.4l-55.6-55.6 12.4-12.5 55.7 55.7-12.5 12.4z"
                  opacity="0.5"
                ></path>
              </svg>
            </div>
            <p className="small-text">Error: Page not found (404)</p>
          </div>
        </article>
      </main>
    </>
  );
}
