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

  for (let index = 0; index < topicArray.length; index++) {
    const dataset = topicArray[index]
    if (dataset.id == "covid-19") {
      dataset.icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><style>.prefix__f{fill:#046a99}</style></defs><path fill="#fff" id="prefix__b" d="M1 1H49V49H1z" opacity="0"/><g id="prefix__c"><path d="M49 23.2v3.6c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8h-3.7c-.4 3.3-1.7 6.3-3.6 8.8l2.6 2.6a1.8 1.8 0 0 1 2.5 2.5l-2.5 2.5a1.8 1.8 0 0 1-2.6-2.5l-2.6-2.6c-2.4 2-5.4 3.2-8.7 3.6v3.7c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8h-3.6c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8v-3.7c-3.3-.4-6.3-1.7-8.7-3.6l-2.7 2.6a1.8 1.8 0 0 1-2.5 2.5l-2.6-2.5A1.8 1.8 0 0 1 9.3 38l2.6-2.6c-2-2.5-3.3-5.4-3.6-8.7H4.6c0 1-.8 1.8-1.8 1.8S1 27.8 1 26.8v-3.6c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8h3.7a17 17 0 0 1 3.6-8.7l-2.6-2.6c-.7.6-1.9.6-2.6 0s-.7-2 0-2.6l2.6-2.5a1.8 1.8 0 0 1 2.5 2.5l2.6 2.6c2.5-2 5.4-3.2 8.7-3.6V4.6c-1 0-1.7-.8-1.7-1.8S22.2 1 23.2 1h3.6c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8v3.7c3.3.3 6.3 1.7 8.7 3.6l2.6-2.6c-.7-.7-.7-1.8 0-2.5s1.9-.7 2.6 0l2.5 2.5a1.8 1.8 0 0 1-2.5 2.6L38 14.3c2 2.5 3.3 5.5 3.7 8.8h3.7c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8ZM37 25a12 12 0 1 0-24 0 12 12 0 0 0 24 0Z" fill="#046a99" opacity=".5"/><circle className="prefix__f" cx="16.6" cy="25" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="29.2" cy="17.8" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="20.8" cy="17.8" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="20.8" cy="32.2" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="25" cy="25" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="33.4" cy="25" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="29.2" cy="32.2" r="2.4" fill="#046a99"/></g></svg>`
    } else if (dataset.id == "economy-and-demographics") {
      dataset.icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="#fff" d="M1 1H49V49H1z" opacity="0"/><g fill="#046a99"><path opacity=".5" d="M19.4 8.2 2.6 25 5.5 28 19.4 14.1 44.6 39 47.6 36.1 19.4 8.2z"/><path d="M28.5 31.2 19.4 22 2.6 38.8 5.5 41.8 19.4 27.9 28.7 37.3 47.4 16.3 44.3 13.5 28.5 31.2z"/></g></svg>` 
    } else if (dataset.id == "government") {
      dataset.icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><style>.prefix__f{fill:#046a99}</style></defs><path fill="#fff" id="prefix__b" d="M1 1H49V49H1z" opacity="0"/><g id="prefix__c"><path d="M45 41.8H5v4.3h40v-4.3Zm-20-33 11 5.7H14l11-5.8M25 4 5 14.5v4.2h40v-4.2L25 3.9Z" fill="#046a99" opacity=".5"/><path className="prefix__f" d="M10.3 22.9H14.5V37.6H10.3z" fill="#046a99"/><path className="prefix__f" d="M22.9 22.9H27.1V37.6H22.9z" fill="#046a99"/><path className="prefix__f" d="M35.6 22.9H39.8V37.6H35.6z" fill="#046a99"/></g></svg>` 
    } else if (dataset.id == "health-human-services") {
      dataset.icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="#fff" d="M1 1H49V49H1z" opacity="0"/><g fill="#046a99"><path d="M25 1.2 6 8.4v14.4c0 12 8.2 23.2 19 26 11-2.8 19-14 19-26V8.4L25 1.2Zm14.3 21.6c0 9.5-6 18.3-14.2 21a22.2 22.2 0 0 1-14.3-21V11.7l14.3-5.4 14.2 5.4v11.1Z" opacity=".5"/><path d="M22 32.8h6.1v-6h6v-6h-6v-6h-6v6h-6v6h6v6Z"/></g></svg>` 
    } else if (dataset.id == "natural-resources") {
      dataset.icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="#fff" d="M1 1H49V49H1z" opacity="0"/><g fill="#046a99"><path d="M25 6a19 19 0 0 0-14.7 31L6 41l2.8 3 4.2-4.3a19 19 0 0 0 31-14.8V6H25Zm15 19a14.8 14.8 0 0 1-15 15 15 15 0 0 1 0-30h15v15Z" opacity=".5"/><path d="m18.3 26.6 7.9.5-5.5 7a1 1 0 0 0 .1 1.4c.4.4 1 .4 1.5 0l10.5-9.7c.9-.8.3-2.3-.9-2.4l-8-.5 5.5-7c.3-.4.3-1 0-1.4a1 1 0 0 0-1.6 0l-10.5 9.7c-.9.8-.3 2.3 1 2.4Z"/></g></svg>` 
    } else if (dataset.id == "transportation") {
      dataset.icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="#fff" d="M1 1H49V49H1z" opacity="0"/><g fill="#046a99"><path d="M45.2 19.5c-.3-1-1.2-1.6-2.3-1.6H26c-1 0-2 .7-2.3 1.6l-3.3 9.7v13c0 .8.7 1.6 1.6 1.6h1.5c.9 0 1.6-.9 1.6-1.8v-2.9h18.8v3c0 .8.7 1.7 1.6 1.7h1.4c.9 0 1.6-.8 1.6-1.7V29.2l-3.3-9.7Zm-19.2.8h17l2.3 7H23.6l2.4-7Zm-1 14.1c-1.2 0-2.3-1-2.3-2.4s1-2.3 2.4-2.3 2.3 1 2.3 2.3-1 2.4-2.3 2.4Zm18.9 0c-1.3 0-2.4-1-2.4-2.4s1-2.3 2.4-2.3 2.3 1 2.3 2.3-1 2.4-2.3 2.4Z"/><path d="M25 6.2H8.7a7 7 0 0 0-7 7v18.9a7 7 0 0 0 7 7l-2.3 2.3v2.4h2.3l4.7-4.7H18V27.3H6.3V11h21.1v4.7h4.7v-2.4a7 7 0 0 0-7-7ZM8.7 29.7c1.3 0 2.4 1 2.4 2.4s-1.1 2.3-2.4 2.3a2.4 2.4 0 0 1 0-4.7Z" opacity=".5"/></g></svg>` 
    } else if (dataset.id == "water") {
      dataset.icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="#fff" d="M1 1H49V49H1z" opacity="0"/><g fill="#046a99"><path d="M35 35a12 12 0 0 0-5.8 1.6c-1.3.6-2.4 1.2-4.1 1.2s-2.8-.5-4.1-1.2c-1.5-.8-3.2-1.6-6-1.6s-4.3.8-5.8 1.6c-1.3.6-2.4 1.2-4.1 1.2v3.9A12 12 0 0 0 11 40c1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6s4.4-.9 5.9-1.6c1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6v-4c-1.8 0-2.8-.4-4.1-1.1a12 12 0 0 0-6-1.6Zm0-9c-2.6 0-4.3 1-5.8 1.7-1.3.6-2.4 1.2-4.1 1.2s-2.8-.5-4.1-1.2c-1.5-.8-3.2-1.6-6-1.6s-4.3.8-5.8 1.6c-1.3.6-2.4 1.2-4.1 1.2v3.9c2.7 0 4.4-.9 5.9-1.6a7.6 7.6 0 0 1 8.2 0c1.5.7 3.1 1.6 5.9 1.6s4.4-.9 5.9-1.6a7.6 7.6 0 0 1 8.2 0c1.5.7 3.1 1.6 5.9 1.6v-4c-1.8 0-2.8-.4-4.1-1.1a12 12 0 0 0-6-1.6Zm6-16a11.8 11.8 0 0 0-11.8 0c-1.3.6-2.4 1.1-4.1 1.1s-2.8-.5-4.1-1.2c-1.5-.7-3.2-1.6-6-1.6s-4.3.9-5.8 1.6c-1.3.7-2.4 1.2-4.1 1.2V15c2.7 0 4.4-.9 5.9-1.6 1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6s4.4-.9 5.9-1.6c1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6v-4a8 8 0 0 1-4.1-1Z" opacity=".5"/><path d="M35 17.2c-2.6 0-4.3.8-5.8 1.6a7.6 7.6 0 0 1-8.2 0c-1.5-.8-3.2-1.6-6-1.6s-4.3.8-5.8 1.6A7.6 7.6 0 0 1 5 20v3.9c2.7 0 4.4-.9 5.9-1.6 1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6s4.4-.9 5.9-1.6c1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6v-4c-1.8 0-2.8-.4-4.1-1.1a12 12 0 0 0-6-1.6Z"/></g></svg>` 
    }
  }
  
  topicArray.sort((a, b) => a.count < b.count ? -1 : b.count > a.count ? 1 : 0).reverse()
  
  return {
    props: {topics: topicArray},
  }
}
export default function Home(data) {
  return (
    <>
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
          <li>Explore Datasets</li>
          <li>Topics</li>
        </ol>
      </nav>
          <div className="page-container-ds topics-page"> 
          <h1>Topics</h1>
            <div className="two-col">
              {
                data.topics.map((topic, index) => (
                  <a key={index} className="card-block" href={"/topic-results?q=&topic="+topic.id}>
                    <div className="icon-col" dangerouslySetInnerHTML={{ __html: topic.icon }}></div>
                    <div className="content">
                      <h3 className="h4" style={{marginTop:"0.2em"}}>{topic.title}</h3>
                      <p className="topic-desc">{topic.description}</p>
                      <p className="topic-qty">{topic.count} Datasets</p>
                    </div>
                  </a>
                ))
              }
              <div className="card-block card-marketing inverted">
                <div className="icon-col">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><circle cx="90" cy="90" r="90" fill="#4f97b8"/><path d="M42.6 35h40v37.2l51.3 47.3v3.4l4.8 4.4-6.3 5.7v7.7h2.8v4.4h-24.7l-3.3-7-3-1-7.3-6.9h-5.2l-5.9-5.1H77v-6.6l-2-2.4v-1.7l-11-10.3v-2.4l1.2-1.8v-3.5l-3.3.2-2.2-2.8-3.3-6.7-2-3.2-.4-4-7.4-7-.3-10.7-5-5.3v-4.4l2.6-3v-10l-1.1-1.3-.2-3.1Z" fill="#fdb81d"/><path d="M105.6 67a14 14 0 0 0-14 14c0 10.5 14 26 14 26s14-15.5 14-26a14 14 0 0 0-14-14Zm-10 14a10 10 0 0 1 20 0c0 5.6-5.8 14.4-10 19.8-4.2-5.3-10-14-10-19.8Z" fill="#fff"/><circle cx="105.6" cy="81" r="5" fill="#034a6b"/></svg>
                </div>
                <div className="content">
                  <h3 className="h4">California State Geoportal</h3>
                  <p className="topic-desc">Explore, visualize, and download California data. Visit our <a href="https://gis.data.ca.gov/">California State Geoportal</a>.</p>
                </div>
              </div>
            </div>
          </div>
      </main>
    </>
  );
}
