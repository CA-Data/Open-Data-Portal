export async function getServerSideProps(context) {
  const query = context.query.q;
  const response = await fetch(
    "https://data.ca.gov/api/3/action/package_search?q=" + query
  ).then((response) => response.json());

  return {
    props: { res: response, allResults: response.result.results },
  };
}

export default function Help(data) {
  //&sort=title_string+asc
  const submit = () => {
    document.getElementById("sortresults").submit();
  };
  return (
    <>
      <main id="body-content" className="cagov-main">
        <article
          id="post-design"
          className="cagov-article with-sidebar with-page-nav"
        >
          <div
            className="sidebar-container everylayout sidebar-cell"
            style={{ "zIndex": 1 }}
          >
            <div className="sidebar" space="0" side="left">
              <cagov-page-navigation
                data-selector="main"
                data-type="wordpress"
                data-label="On this page"
              >
                <nav aria-labelledby="page-navigation-label">
                  <div id="page-navigation-label" className="label">
                    Filter by
                  </div>
                  <ul>
                    <li>
                      <a href="/filter-link">
                        <a>Topic</a>
                      </a>
                    </li>
                    <li>
                      <a href="/filter-link">
                        <a>Publisher</a>
                      </a>
                    </li>
                    <li>
                      <a href="/filter-link">
                        <a>Format</a>
                      </a>
                    </li>
                    <li>
                      <a href="/filter-link">
                        <a>Tag</a>
                      </a>
                    </li>
                  </ul>
                </nav>
              </cagov-page-navigation>
            </div>
          </div>
          <div className="cagov-content content-cell">
            <h1 style={{ "margin-top": 0 }}>Search Results</h1>
            <div className="search-container grid-search">
              <form className="site-search" action="/results">
                <span className="sr-only" id="SearchInput">
                  Dataset search
                </span>
                <span style={{ display: "flex" }}>
                  <input
                    type="text"
                    id="q"
                    name="q"
                    aria-labelledby="SearchInput"
                    placeholder="Search datasets"
                    className="search-textfield"
                    style={{
                      width: "100%",
                      color: "#fff",
                      border: "1px solid blue",
                      padding: ".5rem",
                      borderRadius: ".25rem",
                    }}
                  />
                  <button
                    style={{
                      outlineOffset: -2,
                      right: 5,
                      backgroundColor: "var(--primary-color, #004abc)",
                      border: "1px solid var(--primary-color, #004abc)",
                      borderRadius: "0px 4px 4px 0px",
                      padding: "8px 14px",
                      position: "relative",
                    }}
                    type="submit"
                    className="search-submit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 17 17"
                      viewBox="0 0 17 17"
                      style={{width: 17}}
                    >
                      <path
                        fill="#fff"
                        d="M16.4 15.2l-4-4c2-2.6 1.8-6.5-.6-8.9-1.3-1.3-3-2-4.8-2s-3.5.7-4.8 2c-2.6 2.6-2.6 6.9 0 9.6 1.3 1.3 3 2 4.8 2 1.4 0 2.9-.5 4.1-1.4l4.1 4c.2.2.4.3.7.3.2 0 .5-.1.7-.3.1-.3.1-.9-.2-1.3zM7 12c-1.3 0-2.6-.5-3.5-1.4-1.9-1.9-1.9-5.1 0-7 .9-.9 2.1-1.5 3.5-1.5s2.6.5 3.5 1.4 1.4 2.2 1.4 3.5-.5 2.6-1.4 3.5c-1 1-2.2 1.5-3.5 1.5z"
                      ></path>
                    </svg>
                    <span className="sr-only">Submit</span>
                  </button>
                </span>
              </form>
            </div>
            <div className="filter-sort">
              <form id="sortresults" method="GET" action="/results" name="sort">
                <label htmlFor="sort">Sort by</label>
                <select onChange={submit} name="sort">
                  <option className="select-option" value="best_match">
                    Best match
                  </option>
                  <option className="select-option" value="most_accessed">
                    Most accessed
                  </option>
                  <option className="select-option" value="most_recent">
                    Most recent
                  </option>
                </select>
              </form>
            </div>
            <div>
              <h2>{data.res.result.count} matches</h2>
            </div>
            <div className="result-page">
              {data.allResults.map((dataset, index) => (
                <div
                  key={index}
                  style={{ marginBottom: "3rem" }}
                  className="result"
                >
                  <h2 className="h4">
                    <a href={"/dataset?name=" + dataset.name}>
                      {dataset.title}
                    </a>
                  </h2>
                  <ul>
                    <li>
                      <strong>Published by: </strong>
                      {dataset.organization.title}
                    </li>
                    <li>
                      <strong>Last updated: </strong>
                      {dataset.metadata_modified}
                    </li>
                  </ul>
                  <p className="description">
                    {dataset.notes.substring(0, 200)}...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
