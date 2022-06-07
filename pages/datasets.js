export async function getServerSideProps(context) {
  var apirequest = "https://data.ca.gov/api/3/action/package_search?q="+context.query.q;
  
  var thereWasAFilter = 0; // flag, did user select any filter?

  if ('topic' in context.query && context.query.topic.length>0) {
    apirequest += "&fq=(groups:" + context.query.topic.replace(/ /g, '-');
    thereWasAFilter = 1;
  }

  if ('publisher' in context.query && context.query.format.length>0) {
    apirequest += thereWasAFilter ? "%20AND%20" : "&fq=(";
    apirequest += "organization:"+context.query.publisher.replace(/ /g, '-');
    thereWasAFilter = 1;
  }

  if ('format' in context.query && context.query.format.length>0) {
    apirequest += thereWasAFilter ? "%20AND%20" : "&fq=(";
    apirequest += "res_format:"+context.query.format.toUpperCase().replace(/ /g, '-');
    thereWasAFilter = 1;
  }

  if ('tag' in context.query && context.query.tag.length>0) {
    apirequest += thereWasAFilter ? "%20AND%20" : "&fq=(";
    apirequest += "tags:" + context.query.tag.replace(/ /g, '-');
    thereWasAFilter = 1;
  }

  if (thereWasAFilter) {
    apirequest += ")";
  }

  if ('sort' in context.query) {
    apirequest += "&sort="+context.query.sort;
  }

  //pages
  const pageData = {}

  const page = ('page' in context.query) ? parseInt(context.query.page) : 0;

  pageData["current"] = {};
  pageData["current"].value = page; // these page numbers start at 0
  pageData["current"].display = "inline";

  pageData["next"] = {};
  pageData["next"].value = page + 1;
  pageData["next"].display = "inline";

  pageData["previous"] = {};
  pageData["previous"].value = page - 1;
  pageData["previous"].display = "inline";

  pageData["total"] = {};
  pageData["total"].display = "inline";

  if (pageData["previous"].value < 0) {
    pageData["previous"].display = "none";
  }
  apirequest += "&start=" + (page * 10);
  
  //[0]previous, [1]current, [2]next, [3]total, [4]next 

  console.log(apirequest);

  const response = await fetch(apirequest).then((response) => response.json());

  pageData["total"].value = Math.ceil(parseInt(response.result.count) / 10);

  if (pageData["next"].value >= pageData["total"].value) {
    pageData["next"].display = "none";
  }
  
  //search results
  const resultsArray = []
  if (response.result.results.length > 0) {
    for (let index = 0; index < response.result.results.length; index++) {
      const dataset = {}
      dataset.formats = []
      dataset.name = response.result.results[index].name
      dataset.title = response.result.results[index].title
      
      
      dataset.organization = response.result.results[index].organization.title
      
  
      const date_updated = new Date(response.result.results[index].metadata_modified);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const metadata_modified = date_updated.toLocaleDateString('en-EN', options)
  
      dataset.updated = metadata_modified
      
      dataset.notes = response.result.results[index].notes.replace(/\<.*?\>|__/g, '')

      if (response.result.results[index].resources.length > 0) {
        const resource = response.result.results[index].resources
        for (let index = 0; index < resource.length; index++) {
          
          var resource_type = resource[index].format.toUpperCase()
          if (!dataset.formats.includes(resource_type)) {
            if (resource_type.length > 0) {
            dataset.formats.push(resource_type)
            }
          }
        }
      }
      //console.log(response.result.results[index])
      resultsArray.push(dataset)
    }
  }

  //filter data
  const filter_data = {
    topicArray: [],
    publisherArray: [],
    formatArray: [],
    tagArray: [],
  }

  //get topics
  const topicObject = {}
  for (let index = 0; index < response.result.results.length; index++) {
    if (response.result.results[index].groups.length > 0) {
      const topic = response.result.results[index].groups
      for (let index = 0; index < topic.length; index++) {
        topicObject[topic[index].display_name] = {"name": topic[index].display_name}
      }
    }    
  }
  for (const key in topicObject) {
    filter_data.topicArray.push(topicObject[key])
  }

  //get Publisher
  const publisherObject = {}
  for (let index = 0; index < response.result.results.length; index++) {
    if (response.result.results[index].groups.length > 0) {
      const publisher = response.result.results[index].organization.title
      publisherObject[publisher] = {"name": publisher}
    }    
  }
  for (const key in publisherObject) {
    filter_data.publisherArray.push(publisherObject[key])
  }

  //get formats
  const resourceObject = {}
  for (let index = 0; index < response.result.results.length; index++) {
    if (response.result.results[index].resources.length > 0) {
      const resource = response.result.results[index].resources
      for (let index = 0; index < resource.length; index++) {
        var resource_type = resource[index].format.toUpperCase()
        resourceObject[resource_type] = {"name": resource_type}
      }
    }
  }
  for (const key in resourceObject) {
    filter_data.formatArray.push(resourceObject[key])
  }

  //get tags
  const tagObject = {}
  for (let index = 0; index < response.result.results.length; index++) {
    if (response.result.results[index].tags.length > 0) {
      const tag = response.result.results[index].tags
      for (let index = 0; index < tag.length; index++) {
        var tag_name = tag[index].display_name
        tagObject[tag_name] = {"name": tag_name}
      }
    }
  }
  for (const key in tagObject) {
    filter_data.tagArray.push(tagObject[key])
  }

  return {
    props: {
      matches: response.result.count,
      allResults: resultsArray,
      parameters: context.query,
      filterData: filter_data,
      pages: pageData
    },
  };
}


export default function Results(data) {
  if (typeof window === 'object') {
    // Check if document is finally loaded
       document.addEventListener("DOMContentLoaded", function () {
          if (parseInt(data.pages["next"].value) > parseInt(data.pages["total"].value)) {
            document.querySelectorAll('.page-next')[0].style.display = 'none';
            document.querySelectorAll('.page-next')[1].style.display = 'none';
          }
        });
      }
  
  const submit = () => {
    document.getElementById("sortresults").submit();
  };
  const clear = () => {
    document.getElementById("q").value = "";
  };
  const expand = (e) => {
    console.log(e.target)
    //e.target.style.height = '100%'
    if (e.target.classList.contains('filter-expanded')) {
      e.target.classList.remove('filter-expanded')
    } 
    else {
      e.target.classList.add('filter-expanded')
    }
    //document.querySelectorAll('.filter-topic')[0].style.height = '100%'
  }
  var urlParamTopic = (data.parameters.topic) ? "&topic=" + data.parameters.topic : "";
  var urlParamPublisher = (data.parameters.publisher) ? "&publisher=" + data.parameters.publisher : "";
  var urlParamFormat = (data.parameters.format) ? "&format=" + data.parameters.format : "";
  var urlParamTag = (data.parameters.tag) ? "&tag=" + data.parameters.tag : "";
  var urlParamSort = (data.parameters.sort) ? "&sort=" + data.parameters.sort : "";

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
                  <div id="page-navigation-label" className="label">
                    <strong>Filter by</strong>
                  </div>
                  <ul className="search-filters">
                    <li onClick={expand} className="filter-topic">
                        Topic
                      <ul className="sublist">
                        {data.filterData.topicArray.map((dataset, index) => (
                          <li key={index}><a href={"/results?q="+data.parameters.q+urlParamPublisher+urlParamTag+urlParamFormat+urlParamSort+"&topic="+dataset.name.toLowerCase()}>{dataset.name}</a></li>
                        ))}
                      </ul>
                    </li>
                    <li onClick={expand} className="filter-publisher">
                        Publisher
                      <ul className="sublist">
                        {data.filterData.publisherArray.map((dataset, index) => (
                          <li key={index}><a href={"/results?q="+data.parameters.q+urlParamTopic+urlParamFormat+urlParamTag+urlParamSort+"&publisher="+dataset.name.toLowerCase()}>{dataset.name}</a></li>
                        ))}
                      </ul>
                    </li>
                    <li onClick={expand} className="filter-format">
                        Format
                      <ul className="sublist">
                      {data.filterData.formatArray.map((dataset, index) => (
                        <li key={index}><a href={"/results?q="+data.parameters.q+urlParamTopic+urlParamPublisher+urlParamTag+urlParamSort+"&format="+dataset.name.toLowerCase()}>{dataset.name}</a></li>
                      ))}
                      </ul>
                    </li>
                    <li onClick={expand} className="filter-tag">
                        Tag
                      <ul className="sublist">
                        {data.filterData.tagArray.map((dataset, index) => (
                          <li key={index}><a href={"/results?q="+data.parameters.q+urlParamTopic+urlParamPublisher+urlParamFormat+urlParamSort+"&tag="+dataset.name.toLowerCase()}>{dataset.name}</a></li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
            </div>
          </div>
          <div className="cagov-content content-cell">
            <h1 style={{ marginTop: 0 }}>Search results</h1>
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
              <form id="sortresults" method="GET" action="/results" name="sort">
                <input type="hidden" name="q" value={data.parameters.q}></input>
                <input type="hidden" name="topic" value={data.parameters.topic}></input>
                <input type="hidden" name="publisher" value={data.parameters.publisher}></input>
                <input type="hidden" name="tag" value={data.parameters.tag}></input>
                <input type="hidden" name="format" value={data.parameters.format}></input>
                <label htmlFor="sort">Sort by</label>
                <select onChange={submit} name="sort" value={data.parameters.sort}>
                  <option className="select-option" value="best_match desc">
                    Best match
                  </option>
                  {/*<option className="select-option" value="most_accessed">
                    Most accessed
                  </option>*/}
                  <option className="select-option" value="metadata_modified asc">
                    Most recent
                  </option>
                </select>
              </form>
            </div>
            <div>
              <h2>{data.matches} matches</h2>
            </div>
            <div className="result-page">
              {data.allResults.map((dataset, index) => (
                <div
                  key={index}
                  style={{ marginBottom: "3rem" }}
                  className="result"
                >
                  <h2 className="h5">
                    <a href={"/dataset?name=" + dataset.name}>
                      {dataset.title}
                    </a>
                  </h2>
                  <ul className="result-dataset-info">
                    <li>
                      <strong>Published by: </strong>
                      {dataset.organization}
                    </li>
                    <li>
                      <strong>Last updated: </strong>
                      {dataset.updated}
                    </li>
                    <li>
                      <strong>File types: </strong>
                      {dataset.formats.join(', ')}
                    </li>
                  </ul>
                  <p className="description">
                    {dataset.notes.substring(0, 200)}...
                  </p>
                </div>
              ))}
            </div>

            {/*<div className="page-navigation"><a className="page-previous" href={"/results?q=water&tag=regulatory&page="+data.pages.previous}>&lt;</a> <span className="page-current">{data.pages.current}</span> <a className="page-next" href={"/results?q=water&tag=regulatory&page="+data.pages.next}>{data.pages.next}</a> <span className="page-dots">...</span> <a className="page-next" href={"/results?q=water&tag=regulatory&page="+data.pages.total}>{data.pages.total}</a> <a className="page-next" href={"/results?q=water&tag=regulatory&page="+data.pages.next}>&gt;</a></div>*/}
            <div className="page-navigation">
              <a style={{'display':data.pages.previous.display}} className="page-previous" href={"/results?q="+data.parameters.q+urlParamTopic+urlParamPublisher+urlParamTag+urlParamFormat+urlParamSort+"&page="+data.pages.previous.value}>&lt;</a> 

              <a style={{'display':data.pages.previous.display}} className="page-previous" href={"/results?q="+data.parameters.q+urlParamTopic+urlParamPublisher+urlParamTag+urlParamFormat+urlParamSort+"&page="+data.pages.previous.value}>{data.pages.previous.value + 1}</a> 

              <span style={{'display':data.pages.current.display}} className="page-current">{data.pages.current.value + 1}</span> 

              <a style={{'display':data.pages.next.display}} className="page-next" href={"/results?q="+data.parameters.q+urlParamTopic+urlParamPublisher+urlParamTag+urlParamFormat+urlParamSort+"&page="+data.pages.next.value}>{data.pages.next.value + 1}</a> 

              <a style={{'display':data.pages.next.display}} className="page-next" href={"/results?q="+data.parameters.q+urlParamTopic+urlParamPublisher+urlParamTag+urlParamFormat+urlParamSort+"&page="+data.pages.next.value}>&gt;</a>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
