
import Link from "next/link";

export default function preview() {
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
          <div className="sidebar" space="0" side="left">
            <nav aria-labelledby="page-navigation-label">
              <div id="page-navigation-label" className="label">
                <strong>On this page</strong>
              </div>
              <ul className="side-navigation">
                <li><a href="#new-alpha-site">New alpha site for the California Open Data Portal</a></li>
                <li><a href="#how-we-got-here">How we got here</a></li>
                <li><a href="#where-the-data-comes-from">Where the data comes from</a></li>
                <li><a href="#about-the-data">About the data on this portal</a></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="content-container">
          <h1>About</h1>
          <p className="lead-text">Open data is data that can be freely used, shared and built-on by anyone, anywhere, for any purpose.</p>
          <p>The California Open Data Portal provides public data collected by the state. We publish the data in a format that is easy to search, download, and combine with other data sets from other sources.</p>
          
          <h2 id="new-alpha-site">New alpha site for the California Open Data Portal</h2>
          <p>This site makes it easier for you to find and use California’s data</p>
          <p>CalData and the Department of Technology are working together on this new site for open data. We developed this prototype based on research, user feedback, and testing. We do this to learn and make sure we build the right site based on user needs.</p>
          <p>You can get involved:</p>
          <ul>
            <li>Sign up to <a href="https://airtable.com/shrv4KWAKgny1lxyD">participate in research</a></li>
            <li><a href="/contact-us">Provide feedback</a></li>
          </ul>


          <p>Since this is a prototype, there will be things that don’t work. Your feedback helps us improve. You can still access the <a href="https://data.ca.gov/">original California open data site</a> if you need to.</p>

          <h2 id="how-we-got-here">How we got here</h2>
          <p>Our users have told us about their frustrations when using the open data site. These include:</p>

          <ul>
            <li>Difficulty searching for data</li>  
            <li>Don’t know how to use the data</li>  
            <li>Confusing interface</li>  
          </ul>


          <p>We knew we could do better. We saw an opportunity to develop a user-friendly site by working directly with our users.</p>
          <p>We’re at the beginning of this journey. It’ll take more than improving the site to make open data work better for Californians. We also have to invest in standards, process improvements, and program development. </p>
          
          <h2 id="where-the-data-comes-from">Where the data comes from </h2>
          <p>It takes a village to share open data. The Statewide Open Data Portal pulls together data published by agencies and departments to provide a single searchable site. Review Organizations for a list of participating agencies and departments.</p>
          
          <h2 id="about-the-data">About the data on this portal</h2>
          <ul>
            <li>It is public domain. Anyone can use the data.</li>
            <li>Data can be downloaded or accessed through application programming interfaces (API). </li>
            <li>You can perform research, do an analysis, or develop products using open data.</li>
            <li>The data does not include private or confidential data about individuals.</li>
          </ul>

        </div>
      </article>
    </main>
  );
}
