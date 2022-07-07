export async function getServerSideProps(context) {
  var apirequest = "https://test-data.technology.ca.gov/api/3/action/package_search?q="+context.query.q;

  if ('format' in context.query) {
    apirequest = "https://test-data.technology.ca.gov/api/3/action/resource_search?query=format:"+context.query.format
    //apirequest = "https://test-data.technology.ca.gov/api/3/action/package_search?fq=(title:"+context.query.q.replace(/ /g, '-')+"%20AND%20resources:"+context.query.format.replace(/ /g, '-')+")";
  }


  if ('sort' in context.query) {
  apirequest = "https://test-data.technology.ca.gov/api/3/action/package_search?q="+context.query.q.replace(/ /g, '-')+"&sort="+context.query.sort;
  }

   //pagination 
  if ('page' in context.query) {
    qpirequest = 
    page = {}
  }
  const response = await fetch(apirequest,{headers: {'User-Agent': 'NextGenAPI/0.0.1',}}).then((response) => response.json());
  
  //search results
  const resultsArray = []
  for (let index = 0; index < response.result.results.length; index++) {
    const dataset = {}
    dataset.name = response.result.results[index].id
    dataset.title = response.result.results[index].name

    const date_updated = new Date(response.result.results[index].created);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const metadata_modified = date_updated.toLocaleDateString('en-EN', options)

    dataset.updated = metadata_modified
    dataset.notes = response.result.results[index].description.replace(/\<.*?\>/g, '').substring(0, 200)
    resultsArray.push(dataset)
  }
  
  //filter data
  const filter_data = {
    topicArray: [],
    formatArray: [],
    tagArray: []
  }

  return {
    props: {
      res: response,
      allResults: resultsArray,
      parameters: context.query,
    },
  };
}


export default function Help(data) {
  const submit = () => {
    document.getElementById("sortresults").submit();
  };
  const clear = () => {
    document.getElementById("q").value = "";
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
                <nav aria-labelledby="page-navigation-label">
                  
                </nav>
            </div>
          </div>
          <div className="cagov-content content-cell">
            <h1 style={{ marginTop: 0 }}>Search results:</h1>
            <div className="search-container grid-search">
              <form className="site-search" action="/datasets">
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
                    defaultValue = {data.parameters.q}
                    style={{
                      width: "100%",
                      color: "#fff",
                      border: "1px solid var(--primary-color, #046A99)",
                      padding: ".5rem",
                      borderRadius: ".25rem",
                    }}
                  />
                  <button
                    style={{
                      outlineOffset: -2,
                      right: 5,
                      backgroundColor: "var(--primary-color, #046A99)",
                      border: "1px solid var(--primary-color, #046A99)",
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
              <form id="sortresults" method="GET" action="/datasets" name="sort">
                <input type="hidden" name="q" value={data.parameters.q}></input>
                <label htmlFor="sort">Sort by</label>
                <select onChange={submit} name="sort">
                  <option className="select-option" value="best_match">
                    Best match
                  </option>
                  {/*<option className="select-option" value="most_accessed">
                    Most accessed
                  </option>*/}
                  <option className="select-option" value="metadata_modified+asc">
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
                      <strong>Last updated: </strong>
                      {dataset.updated}
                    </li>
                  </ul>
                  <p className="description">
                    {dataset.notes ? dataset.notes : "No Description"}
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
