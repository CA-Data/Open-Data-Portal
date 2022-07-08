import Link from "next/link";

export default function preview(dataset) {
  return (
    <main id="body-content" className="cagov-main">
      <nav className="nav-breadcrumb">
        <ol>
          <li>
            <a href="https://ca.gov/">CA.gov</a>
          </li>
          <li>
            <Link href="/" passHref>
              <a>Open Data</a>
            </Link>
          </li>
          <li>About</li>
          <li>Licenses</li>
        </ol>
      </nav>
      <article
        id="post-design"
        className="cagov-article about-page"
      >
        <div className="content-container">
          <h1>Licenses</h1>
          <p><strong>Public domain</strong>: Most datasets are released into the public domain. This means the dataset can be used freely without restriction under copyright law.</p>
          <h2>Other licenses</h2>
          <p>Find out more about these licenses on <a href="http://opendefinition.org">Open Data Commons</a>:</p>
          <ul>
            <li><a href="https://opendefinition.org/licenses/cc-zero/">Creative Commons CC Zero</a></li>
            <li><a href="https://opendefinition.org/licenses/cc-by/">Creative Commons Attribution</a></li>
            <li><a href="https://opendefinition.org/licenses/odc-by/">Open Data Commons Attribution License</a></li>
          </ul>
        </div>
      </article>
    </main>
  );
}
