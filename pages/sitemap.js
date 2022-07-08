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
      <article id="post-design" className="cagov-article with-page-nav sitemap">
        <div className="content-container">
          <h1>Sitemap</h1>
          <ul className="site-map-ul">
            <li>
            <Link href="/" passHref>
              <a>Open Data homepage</a>
            </Link>
            </li>
          </ul>
          <h2 className="h4 site-map-heading">All datasets</h2>
          <ul className="site-map-ul">
            <li>
            <Link href="/datasets" passHref>
              <a>All datasets</a>
            </Link>
            </li>
          </ul>
          <h2 className="h4 site-map-heading">Explore datasets</h2>
          <ul className="site-map-ul">
          <li>
            <Link href="/organizations" passHref>
              <a>Organizations</a>
            </Link>
            </li>
            <li>
            <Link href="/topics" passHref>
              <a>Topics</a>
            </Link>
          </li>
          </ul>
          <h2 className="h4 site-map-heading">About</h2>
          <ul className="site-map-ul">
           <li> 
            <Link href="/about" passHref>
              <a>About</a>
            </Link>
            </li>
            <li>
            <Link href="/contact-us" passHref>
              <a>Contact us</a>
            </Link>
            </li>
            <li>
            <Link href="/licenses" passHref>
              <a>Licenses</a>
            </Link>
            </li>
          </ul>

        </div>
      </article>
    </main>
  );
}
