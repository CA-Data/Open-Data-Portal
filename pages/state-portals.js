import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function preview() {
  return (
    <main id="body-content" className="cagov-main dataset">
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
          <li>State Portals</li>
        </ol>
      </nav>
      <article
        id="post-design"
        className="cagov-article with-sidebar with-page-nav"
      >
        <div
          className="sidebar-container everylayout sidebar-cell"
          style={{ "zIndex": 1 }}
        >
          <sidebar space="0" side="left">
            <nav aria-labelledby="page-navigation-label">
              <div id="page-navigation-label" className="label">
                <strong>On this page</strong>
              </div>
              <ul className="search-filters">
                <li>
                  <a href="#">Heading Link 2</a>
                </li>
              </ul>
            </nav>
          </sidebar>
        </div>

        <div className={styles.container}>
          <h1 className="h3">Datasets</h1>
          <p>This is a placeholder page. More coming soon.</p>
          <h2>Heading 2</h2>
          <p>This is placeholder content.</p>
        </div>
      </article>
    </main>
  );
}
