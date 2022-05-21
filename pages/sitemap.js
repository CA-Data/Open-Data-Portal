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
          <li>Sitemap</li>
        </ol>
      </nav>
      <article id="post-design" className="cagov-article with-page-nav">
        <div className="content-container">
          <h1>Sitemap</h1>
          <p>
            <Link href="/" passHref>
              <a>Open Data homepage</a>
            </Link>
          </p>
          <h2 className="h4">All datasets</h2>
          <p>
            <Link href="/datasets" passHref>
              <a>All datasets</a>
            </Link>
          </p>
          <h2 className="h4">Explore datasets</h2>
          <p>
            <Link href="/organizations" passHref>
              <a>Organizations</a>
            </Link>
            <br />
            <Link href="/topics" passHref>
              <a>Topics</a>
            </Link>
          </p>
          <h2 className="h4">About</h2>
          <p>
            <Link href="/about" passHref>
              <a>About this data portal</a>
            </Link>
            <br />
            <Link href="/contact-us" passHref>
              <a>Contact us</a>
            </Link>
            <br />
            <Link href="/licenses" passHref>
              <a>Licenses</a>
            </Link>
          </p>
        </div>
      </article>
    </main>
  );
}
