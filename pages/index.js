import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps() {
  // Saving for later.. current process will be manual..
  // data.recent.map((dataset, index) => (
  //              <a key={index} href={"/dataset?name=" + dataset.data.package.name} className="no-deco cagov-card">
  //                <span className="card-text">{dataset.data.package.title}</span>
  //                <svg
  //                  xmlns="http://www.w3.org/2000/svg"
  //                  width="24"
  //                  height="24"
  //                  viewBox="0 0 24 24"
  //                >
  //                  <path fill="none" d="M0 0h24v24H0V0z"></path>
  //                  <path d="M6.23 20.23L8 22 18 12 8 2 6.23 3.77 14.46 12z"></path>
  //                </svg>
  //              </a> 
  async function recentDatasets() {
    const response = await fetch('https://data.ca.gov/api/3/action/recently_changed_packages_activity_list').then(response => response.json());
    return response.result
  }
  async function buildTopics() {
    const topicArray = []
    const response = await fetch('https://data.ca.gov/api/3/action/group_list').then(response => response.json());
    const group_array = await response.result
    
    for (let index = 0; index < group_array.length; index++) {
      const topics = {}
      const groupName = group_array[index]
      const res =  await fetch('https://data.ca.gov/api/3/action/group_show?id='+groupName)
      const data =  await res.json();
      const groupTitle =  data.result.title
      const groupCount =  data.result.package_count
      const groupDescription =  data.result.description
      topics["id"] = groupName
      topics["title"] = groupTitle
      topics["count"] = groupCount
      topics["description"] = groupDescription
      topicArray.push(topics)
    }
    return topicArray
  };

  async function archive() {
    const response = await fetch('https://data.ca.gov/api/action/package_search?qf=water&facet.field=[%22groups%22]&facet.limit=10&rows=0').then(response => response.json());
    return response.result.search_facets.groups.items
  }
  const topicArray = await buildTopics()
  //const recentData = await recentDatasets()

  return {
    props: {topics: topicArray},
  }
}
export default function Home(data) {
  return (
    <>
      <main>
        <div className="wp-block-ca-design-system-hero cagov-with-sidebar cagov-with-sidebar-left cagov-featured-section cagov-bkgrd-gry cagov-block wp-block-cagov-hero">
          <div className="page-container-ds">
            <div className="cagov-stack cagov-p-2 cagov-featured-sidebar">
              <h1>Promoting progress and engagement</h1>
              <div className="cagov-hero-body-content">
                <p>
                  Open data increases transparency, informs decision making, and
                  creates opportunities.
                </p>
                <div className="search-container grid-search">
                  <form className="site-search" action="/results/">
                    <span className="sr-only" id="SearchInput">
                      Custom Google Search
                    </span>
                    <input
                      type="text"
                      id="q"
                      name="q"
                      aria-labelledby="SearchInput"
                      placeholder="Search data"
                      className="search-textfield"
                      style={{
                        width: "auto",
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
                    <button className="search-close">Close</button>
                  </form>
                </div>
              </div>
            </div>
            <div>
              <Image
                className="cagov-featured-image"
                src="/images/vector_two.png"
                alt=""
                width={1024}
                height={683}
              />
            </div>
          </div>
        </div>
        <div className="page-container-ds">
          <h2 className="h3">Popular datasets</h2>
          <div className="cagov-grid">
            <Link href="/dataset?name=covid-19-vaccine-progress-dashboard-data" passHref>
            <a className="no-deco cagov-card">
              <span className="card-text">COVID-19 vaccine progress</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M6.23 20.23L8 22 18 12 8 2 6.23 3.77 14.46 12z"></path>
              </svg>
            </a>
            </Link>
            <Link href="/dataset?name=dir-electrician-certification-unit-ecu" passHref>
            <a className="no-deco cagov-card">
              <span className="card-text">Electrician certification unit</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M6.23 20.23L8 22 18 12 8 2 6.23 3.77 14.46 12z"></path>
              </svg>
            </a>
            </Link>
            <Link href="/dataset?name=covid-19-hospital-data1" passHref>
            <a className="no-deco cagov-card">
              <span className="card-text">COVID-19 hospital data</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M6.23 20.23L8 22 18 12 8 2 6.23 3.77 14.46 12z"></path>
              </svg>
            </a>
            </Link>
            <Link href="/dataset?name=ca-geographic-boundaries" passHref>
            <a className="no-deco cagov-card">
              <span className="card-text">CA geographic boundaries</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M6.23 20.23L8 22 18 12 8 2 6.23 3.77 14.46 12z"></path>
              </svg>
            </a>
            </Link>
            <Link href="/dataset?name=county-and-zip-code-references" passHref>
            <a className="no-deco cagov-card">
              <span className="card-text">Counties and ZIP codes</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M6.23 20.23L8 22 18 12 8 2 6.23 3.77 14.46 12z"></path>
              </svg>
            </a>
            </Link>
            <Link href="/dataset?name=covid-19-probable-cases"  passHref>
            <a className="no-deco cagov-card">
              <span className="card-text">COVID-19 cases</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M6.23 20.23L8 22 18 12 8 2 6.23 3.77 14.46 12z"></path>
              </svg>
            </a>
            </Link>
          </div>
        </div>
        <div className="page-container-ds">
          <h2 className="h3">Topics</h2>
          <div className="three-col">
            {
              data.topics.map((topic, index) => (
                <div key={index} className="card-block">
                  <a href={"/results?q=groups:"+topic.id}>{topic.title}</a>
                  <p className="topic-desc">{topic.description}</p>
                  <p className="topic-qty">{topic.count} Datasets</p>
                </div>
                ))
            }
          </div>
        </div>
      </main>
    </>
  );
}
