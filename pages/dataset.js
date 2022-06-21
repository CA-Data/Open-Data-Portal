import Link from "next/link";

export async function getServerSideProps(context) {
  function ValidateSize(FileSize) {
    var marker = 1024;
    var decimal = 2;
    var kiloBytes = marker;
    var megaBytes = marker * marker;
    var gigaBytes = marker * marker * marker;
    var teraBytes = marker * marker * marker * marker;

    if (FileSize == null) {
      return "";
    } else if (FileSize < kiloBytes) {
      return FileSize + " Bytes";
    } else if (FileSize < megaBytes) {
      return (FileSize / kiloBytes).toFixed(decimal) + " KB";
    } else if (FileSize < gigaBytes) {
      return (FileSize / megaBytes).toFixed(decimal) + " MB";
    } else if (FileSize < teraBytes) {
      return (FileSize / gigaBytes).toFixed(decimal) + " GB";
    } else {
      return (FileSize / teraBytes).toFixed(decimal) + " TB";
    }
  }

  const name = context.query.name;
  const response = await fetch(
    "https://test-data.technology.ca.gov/api/3/action/package_show?name_or_id=" + name
  ).then((response) => response.json());
  console.log("https://test-data.technology.ca.gov/api/3/action/package_show?name_or_id=" + name);
  //  console.log(response);

  var groups = response.result.groups;
  if (groups.length == 0) {
    groups = [
      {
        display_name: "",
        description: "",
        image_display_url: "",
        title: "N/A",
        id: "",
        name: ""
      }
    ]
  }  
  const tags = response.result.tags;

  const dataFiles = [];
  const supportingFiles = [];
  for (let index = 0; index < response.result.resources.length; index++) {
    const date = new Date(response.result.resources[index].created);
    const options = { year: "2-digit", month: "2-digit", day: "2-digit" };
    const dateFromat = date.toLocaleDateString("en-EN", options);
    //console.log(response.result.resources[index].description)
    const resource = {};
    resource["id"] = response.result.resources[index].id;
    resource["name"] = response.result.resources[index].name;
    resource["description"] = response.result.resources[index].description;
    resource["url"] = response.result.resources[index].url;
    resource["format"] = response.result.resources[index].format.toUpperCase();
    resource["created"] = dateFromat;
    resource["size"] = ValidateSize(response.result.resources[index].size);
    const dataTypes = [
      "csv",
      "kml",
      "geojson",
      "xml",
      "shapefile",
      "json",
      "zip",
      "ogc wms",
      "ogc wfs",
      "rdf",
      "wms",
      "txt",
      "shp",
      "gzip",
      "tar",
    ];
    if (dataTypes.includes(resource["format"].toLowerCase())) {
      dataFiles.push(resource);
    } else supportingFiles.push(resource);
  }

  const previewableDataTypes = ["CSV","PDF","XLSX","DOCX"];

  const arrayUpdateFreq = {
    "R/P10Y":"Decennial",
    "R/P4Y":"Quadrennial",
    "R/P1Y":"Annual",
    "R/P2M":"Bimonthly",
    "R/P0.5M":"Bimonthly",
    "R/P3.5D":"Semiweekly",
    "R/P1D":"Daily",
    "R/P2W":"Biweekly",
    "R/P0.5W":"Biweekly",
    "R/P6M":"Semiannual",
    "R/P2Y":"Biennial",
    "R/P3Y":"Triennial",
    "R/P0.33W":"Three times a week",
    "R/P0.33M":"Three times a month",
    "R/PT1S":"Continuously updated",
    "R/P1M":"Monthly",
    "R/P3M":"Quarterly",
    "R/P0.5M":"Semimonthly",
    "R/P4M":"Three times a year",
    "R/P1W":"Weekly",
    "R/PT1H":"Hourly"
  };
  var updateFrequency = arrayUpdateFreq[response.result.accrualPeriodicity];
  //console.log(updateFrequency);
  if (updateFrequency) {
    updateFrequency = arrayUpdateFreq[updateFrequency] ? arrayUpdateFreq[updateFrequency] : updateFrequency;
  } else {
    updateFrequency = "N/A";
  }

  const topicIconArray = {
    "covid-19":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><style>.prefix__f{fill:#046a99}</style></defs><path fill="#fff" id="prefix__b" d="M1 1H49V49H1z"/><g id="prefix__c"><path d="M49 23.2v3.6c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8h-3.7c-.4 3.3-1.7 6.3-3.6 8.8l2.6 2.6a1.8 1.8 0 0 1 2.5 2.5l-2.5 2.5a1.8 1.8 0 0 1-2.6-2.5l-2.6-2.6c-2.4 2-5.4 3.2-8.7 3.6v3.7c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8h-3.6c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8v-3.7c-3.3-.4-6.3-1.7-8.7-3.6l-2.7 2.6a1.8 1.8 0 0 1-2.5 2.5l-2.6-2.5A1.8 1.8 0 0 1 9.3 38l2.6-2.6c-2-2.5-3.3-5.4-3.6-8.7H4.6c0 1-.8 1.8-1.8 1.8S1 27.8 1 26.8v-3.6c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8h3.7a17 17 0 0 1 3.6-8.7l-2.6-2.6c-.7.6-1.9.6-2.6 0s-.7-2 0-2.6l2.6-2.5a1.8 1.8 0 0 1 2.5 2.5l2.6 2.6c2.5-2 5.4-3.2 8.7-3.6V4.6c-1 0-1.7-.8-1.7-1.8S22.2 1 23.2 1h3.6c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8v3.7c3.3.3 6.3 1.7 8.7 3.6l2.6-2.6c-.7-.7-.7-1.8 0-2.5s1.9-.7 2.6 0l2.5 2.5a1.8 1.8 0 0 1-2.5 2.6L38 14.3c2 2.5 3.3 5.5 3.7 8.8h3.7c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8ZM37 25a12 12 0 1 0-24 0 12 12 0 0 0 24 0Z" fill="#046a99" opacity=".5"/><circle className="prefix__f" cx="16.6" cy="25" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="29.2" cy="17.8" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="20.8" cy="17.8" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="20.8" cy="32.2" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="25" cy="25" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="33.4" cy="25" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="29.2" cy="32.2" r="2.4" fill="#046a99"/></g></svg>`,
    "economy-and-demographics":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="#fff" d="M1 1H49V49H1z"/><g fill="#046a99"><path opacity=".5" d="M19.4 8.2 2.6 25 5.5 28 19.4 14.1 44.6 39 47.6 36.1 19.4 8.2z"/><path d="M28.5 31.2 19.4 22 2.6 38.8 5.5 41.8 19.4 27.9 28.7 37.3 47.4 16.3 44.3 13.5 28.5 31.2z"/></g></svg>` ,
    "government":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><style>.prefix__f{fill:#046a99}</style></defs><path fill="#fff" id="prefix__b" d="M1 1H49V49H1z"/><g id="prefix__c"><path d="M45 41.8H5v4.3h40v-4.3Zm-20-33 11 5.7H14l11-5.8M25 4 5 14.5v4.2h40v-4.2L25 3.9Z" fill="#046a99" opacity=".5"/><path className="prefix__f" d="M10.3 22.9H14.5V37.6H10.3z" fill="#046a99"/><path className="prefix__f" d="M22.9 22.9H27.1V37.6H22.9z" fill="#046a99"/><path className="prefix__f" d="M35.6 22.9H39.8V37.6H35.6z" fill="#046a99"/></g></svg>` ,
    "health-human-services":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="#fff" d="M1 1H49V49H1z"/><g fill="#046a99"><path d="M25 1.2 6 8.4v14.4c0 12 8.2 23.2 19 26 11-2.8 19-14 19-26V8.4L25 1.2Zm14.3 21.6c0 9.5-6 18.3-14.2 21a22.2 22.2 0 0 1-14.3-21V11.7l14.3-5.4 14.2 5.4v11.1Z" opacity=".5"/><path d="M22 32.8h6.1v-6h6v-6h-6v-6h-6v6h-6v6h6v6Z"/></g></svg>` ,
    "natural-resources":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="#fff" d="M1 1H49V49H1z"/><g fill="#046a99"><path d="M25 6a19 19 0 0 0-14.7 31L6 41l2.8 3 4.2-4.3a19 19 0 0 0 31-14.8V6H25Zm15 19a14.8 14.8 0 0 1-15 15 15 15 0 0 1 0-30h15v15Z" opacity=".5"/><path d="m18.3 26.6 7.9.5-5.5 7a1 1 0 0 0 .1 1.4c.4.4 1 .4 1.5 0l10.5-9.7c.9-.8.3-2.3-.9-2.4l-8-.5 5.5-7c.3-.4.3-1 0-1.4a1 1 0 0 0-1.6 0l-10.5 9.7c-.9.8-.3 2.3 1 2.4Z"/></g></svg>` ,
    "transportation":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="#fff" d="M1 1H49V49H1z"/><g fill="#046a99"><path d="M45.2 19.5c-.3-1-1.2-1.6-2.3-1.6H26c-1 0-2 .7-2.3 1.6l-3.3 9.7v13c0 .8.7 1.6 1.6 1.6h1.5c.9 0 1.6-.9 1.6-1.8v-2.9h18.8v3c0 .8.7 1.7 1.6 1.7h1.4c.9 0 1.6-.8 1.6-1.7V29.2l-3.3-9.7Zm-19.2.8h17l2.3 7H23.6l2.4-7Zm-1 14.1c-1.2 0-2.3-1-2.3-2.4s1-2.3 2.4-2.3 2.3 1 2.3 2.3-1 2.4-2.3 2.4Zm18.9 0c-1.3 0-2.4-1-2.4-2.4s1-2.3 2.4-2.3 2.3 1 2.3 2.3-1 2.4-2.3 2.4Z"/><path d="M25 6.2H8.7a7 7 0 0 0-7 7v18.9a7 7 0 0 0 7 7l-2.3 2.3v2.4h2.3l4.7-4.7H18V27.3H6.3V11h21.1v4.7h4.7v-2.4a7 7 0 0 0-7-7ZM8.7 29.7c1.3 0 2.4 1 2.4 2.4s-1.1 2.3-2.4 2.3a2.4 2.4 0 0 1 0-4.7Z" opacity=".5"/></g></svg>` ,
    "water":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="#fff" d="M1 1H49V49H1z"/><g fill="#046a99"><path d="M35 35a12 12 0 0 0-5.8 1.6c-1.3.6-2.4 1.2-4.1 1.2s-2.8-.5-4.1-1.2c-1.5-.8-3.2-1.6-6-1.6s-4.3.8-5.8 1.6c-1.3.6-2.4 1.2-4.1 1.2v3.9A12 12 0 0 0 11 40c1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6s4.4-.9 5.9-1.6c1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6v-4c-1.8 0-2.8-.4-4.1-1.1a12 12 0 0 0-6-1.6Zm0-9c-2.6 0-4.3 1-5.8 1.7-1.3.6-2.4 1.2-4.1 1.2s-2.8-.5-4.1-1.2c-1.5-.8-3.2-1.6-6-1.6s-4.3.8-5.8 1.6c-1.3.6-2.4 1.2-4.1 1.2v3.9c2.7 0 4.4-.9 5.9-1.6a7.6 7.6 0 0 1 8.2 0c1.5.7 3.1 1.6 5.9 1.6s4.4-.9 5.9-1.6a7.6 7.6 0 0 1 8.2 0c1.5.7 3.1 1.6 5.9 1.6v-4c-1.8 0-2.8-.4-4.1-1.1a12 12 0 0 0-6-1.6Zm6-16a11.8 11.8 0 0 0-11.8 0c-1.3.6-2.4 1.1-4.1 1.1s-2.8-.5-4.1-1.2c-1.5-.7-3.2-1.6-6-1.6s-4.3.9-5.8 1.6c-1.3.7-2.4 1.2-4.1 1.2V15c2.7 0 4.4-.9 5.9-1.6 1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6s4.4-.9 5.9-1.6c1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6v-4a8 8 0 0 1-4.1-1Z" opacity=".5"/><path d="M35 17.2c-2.6 0-4.3.8-5.8 1.6a7.6 7.6 0 0 1-8.2 0c-1.5-.8-3.2-1.6-6-1.6s-4.3.8-5.8 1.6A7.6 7.6 0 0 1 5 20v3.9c2.7 0 4.4-.9 5.9-1.6 1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6s4.4-.9 5.9-1.6c1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6v-4c-1.8 0-2.8-.4-4.1-1.1a12 12 0 0 0-6-1.6Z"/></g></svg>` 
  };
  var topicIcn = (response.result.groups[0] && response.result.groups[0].name && topicIconArray[response.result.groups[0].name]) ? topicIconArray[response.result.groups[0].name] : "";

  return {
    props: {
      data_object: response,
      group_object: groups,
      tag_object: tags,
      supportingFiles: supportingFiles,
      dataFiles: dataFiles,
      parameters: context.query,
      updateFrequency: updateFrequency,
      topicIcn: topicIcn,
      previewableDataTypes:previewableDataTypes
    },
  };
}

export default function dataSet(data) {
  const date_created = new Date(data.data_object.result.metadata_created);
  const date_modified = new Date(data.data_object.result.metadata_modified);
  const options = {
    //weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const metadata_created = date_created.toLocaleDateString("en-EN", options);
  const metadata_modified = date_modified.toLocaleDateString("en-EN", options);

/*  const readMore = () => {
    if (
      document.getElementById("dataset-description").getElementsByTagName('p')[0].classList.contains("expanded")
    ) {
      document.getElementById("dataset-description").getElementsByTagName('p')[0].classList.remove("expanded")
      document.querySelectorAll(".btn-read-more")[0].innerHTML = "Read more ";
    } else {
      document.getElementById("dataset-description").getElementsByTagName('p')[0].classList.add("expanded")
      document.querySelectorAll(".btn-read-more")[0].innerHTML = "Read less ";
    }
  };
*/
  return (
    <>
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
            <li>
              <Link href="/datasets?q=" passHref>
                <a>Datasets</a>
              </Link>
            </li>
            <li>{data.data_object.result.title}</li>
          </ol>
        </nav>
        <article
          id="post-design"
          className="cagov-article with-sidebar with-page-nav"
        >
          <div
            className="sidebar-container everylayout sidebar-cell"
            style={{ zIndex: 1 }}
          >
            <div className="sidebar" space="0" side="left">
              <div className="dataset-info">
                <h2 className="h4">About this dataset</h2>
                <p className="dataset-info-label">
                  {/*data.group_object.map((e) => e.title).join(", ")*/}
                  <span className="dataset-icon" style={{}} dangerouslySetInnerHTML={{ __html:data.topicIcn}}></span>
                  {data.group_object[0].title ? data.group_object[0].title: ""}
                </p>
                <h3 className="h5">About</h3>
                <ul>
                  <li>Organization: {data.data_object.result.organization.title? data.data_object.result.organization.title: "N/A"}</li>
                  <li>Contact: <a href={"mailto:" + data.data_object.result.contact_email}>{data.data_object.result.contact_name}</a></li>
                  <li><a href={data.data_object.result.landingPage}>Organization website</a></li>
                  <li>License: {data.data_object.result.license_title? data.data_object.result.license_title: "Public domain"}<br/>
                  Visit <Link href="/licenses">Licenses</Link> for more information.</li>
                </ul>
                <h3 className="h5">Timeframe</h3>
                <ul>
                  <li>Updated: {data.updateFrequency}</li>
                  <li>Last updated: {metadata_modified}</li>
                  <li>Created: {metadata_created}</li>
                  <li>Temporal coverage: {data.data_object.result.temporal? data.data_object.result.temporal: "N/A"}</li>
                </ul>
                {data.data_object.result.related_resources &&
                  <h3 className="h5">Related</h3>
                }
                {data.data_object.result.related_resources &&
                  <ul>
                    <li>{data.data_object.result.related_resources}</li>
                  </ul>
                }
              </div>
            </div>
          </div>
          <div className="cagov-content content-cell">
            <h1 className="h2" style={{ marginTop: 0 }}>
              {data.data_object.result.title}
            </h1>
            <div id="dataset-description" className="description line-clamp-5">
              <p>
                {data.data_object.result.notes
                  .replace(/<br>/g, "\n")
                  .replace(/\<.*?\>/g, "")
                  .replace(/^"|^ /g, "")
                  .replace(/ $|"$/g, "")
                  .replace(/"+/g, "\"")
                  .replace(/__/g, "")
                }
              </p>
            </div>
            <button className="btn-read-more">
              Read more <span className="caret"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 12"><path fill="#727272" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg></span>
            </button>
            <div className="data-files">
              <h2 className="h3">Data files</h2>
              <table className="data-files-table">
                <thead>
                  <tr>
                    <th>Data title and description</th>
                    <th>Access data</th>
                    <th>File details</th>
                    <th>Last updated</th>
                  </tr>
                </thead>
                <tbody>
                  {data.dataFiles.map((dataset, index) => (
                    <tr key={index}>
                      <td>
                        <p>{dataset.name}</p>
                        <div className="resource-description line-clamp-1" style={{maxWidth: "400px"}}>
                          <p>{dataset.description}</p>
                          <button className="btn-read-more">
                            Read more <span className="caret"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 12"><path fill="#727272" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg></span>
                          </button>
                        </div>
                      </td>
                      <td>
                        {
                          data.previewableDataTypes.includes(dataset.format) &&
                            <div><Link
                              href={
                                "/preview?name=" +
                                data.parameters.name +
                                "&id=" +
                                dataset.id +
                                "&rname=" +
                                dataset.name
                              }
                              passHref
                            >
                            <a>Preview</a>
                          </Link></div>
                        }
                      
                      <button
                        className="api-button"
                        data-resource-name={dataset.name}
                        data-file-id={dataset.id}
                      >
                      API
                      </button>
                      <br />
                      <a href={dataset.url}>Download</a>
                      </td>
                      <td>
                        {dataset.format}<br />
                        {dataset.size}
                      </td>
                      <td>{dataset.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="supporting-files">
              <h2 className="h3">Supporting files</h2>
              <table className="supporting-files-table">
                <thead>
                  <tr>
                    <th>Data title and description</th>
                    <th>Access data</th>
                    <th>File details</th>
                    <th>Last updated</th>
                  </tr>
                </thead>
                <tbody>
                  {data.supportingFiles.map((dataset, index) => (
                    <tr key={index}>
                      <td>
                        {
                          data.previewableDataTypes.includes(dataset.format)
                          ?
                          <Link
                            href={
                              "/preview?name=" +
                              data.parameters.name +
                              "&id=" +
                              dataset.id +
                              "&rname=" +
                              dataset.name +
                              "&state=" +
                              dataset.active
                            }
                            passHref
                          >
                          <a><strong>{dataset.name}</strong></a>
                          </Link>
                          :
                          <div>{dataset.name}</div>
                        }

                        <div className="resource-description line-clamp-1">
                          <p>{dataset.description}</p>
                          <button className="btn-read-more">
                            Read more <span className="caret"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 12"><path fill="#727272" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg></span>
                          </button>
                        </div>
                      </td>
                      <td>
                        {
                          data.previewableDataTypes.includes(dataset.format) &&
                            <div><Link
                              href={
                                "/preview?name=" +
                                data.parameters.name +
                                "&id=" +
                                dataset.id +
                                "&rname=" +
                                dataset.name +
                                "&state=" +
                                dataset.active
                              }
                              passHref
                            >
                            <a>Preview</a>
                          </Link></div>
                        }

                      <button
                        className="api-button"
                        data-resource-name={dataset.name}
                        data-file-id={dataset.id}
                      >
                      API
                      </button>
                      <br />
                      <a href={dataset.url}>Download</a>
                      </td>
                      <td>
                        {dataset.format}<br />
                        {dataset.size}
                      </td>
                      <td>{dataset.created}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="additional-info">
              <h2 className="h4">More details</h2>
              <div className="additional-info-table">
                <div className="row">
                    <div className="column">
                    <strong>Additional information</strong>
                    </div>
                    <div className="column">
                      <div className="resource-description line-clamp-1">
                        <p>{data.data_object.result.additional_information ? data.data_object.result.additional_information: "N/A"}</p>
                        <button className="btn-read-more">
                          Read more <span className="caret"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 12"><path fill="#727272" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg></span>
                        </button>
                      </div>
                    </div>
                </div>

                <div className="row">
                    <div className="column">
                    <strong>Geographic coverage location</strong>
                    </div>
                    <div className="column">
                      <p>{data.data_object.result.geo_coverage ? data.data_object.result.geo_coverage: "N/A"}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                    <strong>Granularity</strong>
                    </div>
                    <div className="column">
                      <p>{data.data_object.result.granularity ? data.data_object.result.granularity: "N/A"}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                    <strong>Language</strong>
                    </div>
                    <div className="column">
                      <p>{data.data_object.result.language ? data.data_object.result.language: "N/A"}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                    <strong>Data standard</strong>
                    </div>
                    <div className="column">
                      <p>{data.data_object.result.conformsTo ? data.data_object.result.conformsTo: "N/A"}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                    <strong>Tags</strong>
                    </div>
                    <div className="column">
                    {data.data_object.result.tags.map((tag, index) => (
                        <li className="tag" key={tag.id}>
                          <a href={"/datasets?q=" + tag.name + "&tag=" + tag.name}>
                            {tag.name}
                          </a>
                        </li>
                      ))}
                    </div>
                </div>
              </div>
              {/*<table className="additional-info-table">
                <tbody>
                  <tr className="border-bottom">
                    <td><strong>Additional information</strong></td>
                    <td>{data.data_object.result.additional_information}</td>
                  </tr>
                  <tr className="border-bottom">
                    <td><strong>Geographic coverage location</strong></td>
                    <td>{data.data_object.result.geo_coverage}</td>
                  </tr>
                  <tr className="border-bottom">
                    <td><strong>Granularity</strong></td>
                    <td>{data.data_object.result.granularity}</td>
                  </tr>
                  <tr className="border-bottom">
                    <td><strong>Language</strong></td>
                    <td>{data.data_object.result.language}</td>
                  </tr>
                  <tr className="border-bottom">
                    <td><strong>Data standard</strong></td>
                    <td>{data.data_object.result.conformsTo}</td>
                  </tr>
                  <tr className="border-bottom">
                    <td><strong>Tags:</strong></td>
                    <td>
                      {data.data_object.result.tags.map((tag, index) => (
                        <li className="tag" key={tag.id}>
                          <a href={"/datasets?q=" + tag.name + "&tag=" + tag.name}>
                            {tag.name}
                          </a>
                        </li>
                      ))}
                    </td>
                  </tr>

                </tbody>
                      </table>*/}
            </div>
          </div>
        </article>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
            <h2 className="h3">API endpoint</h2>
            <h3 id="resource-name" className="h4 thin">
              Dataset Name
            </h3>
            <p>
              Use the query web API to retrieve data with a set of basic
              parameters. Copy the API endpoint you need to start.
            </p>
            <p>
              <a href="https://docs.ckan.org/en/latest/maintaining/datastore.html#ckanext.datastore.logic.action.datastore_search">
                Usage documentation
              </a>
            </p>
            <ul className="input-group">
              <li>
                <label>Simple query</label>
                <input id="simple-query" type="text" value="" readOnly />
                <button className="copy-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="22"
                    fill="none"
                    viewBox="0 0 19 22"
                  >
                    <g clipPath="url(#clip0_425_18691)">
                      <path
                        fill="#000"
                        d="M14 0H2a2 2 0 00-2 2v14h2V2h12V0zm3 4H6a2 2 0 00-2 2v14a2 2 0 002 2h11a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H6V6h11v14z"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_425_18691">
                        <path fill="#fff" d="M0 0H19V22H0z"></path>
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </li>
              <li>
                <label>SQL query</label>
                <input id="sql-query" type="text" value="" readOnly />
                <button className="copy-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="22"
                    fill="none"
                    viewBox="0 0 19 22"
                  >
                    <g clipPath="url(#clip0_425_18691)">
                      <path
                        fill="#000"
                        d="M14 0H2a2 2 0 00-2 2v14h2V2h12V0zm3 4H6a2 2 0 00-2 2v14a2 2 0 002 2h11a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H6V6h11v14z"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_425_18691">
                        <path fill="#fff" d="M0 0H19V22H0z"></path>
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </li>
              <li>
                <label>Odata query</label>
                <input id="odata-query" type="text" value="" readOnly />
                <button className="copy-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="22"
                    fill="none"
                    viewBox="0 0 19 22"
                  >
                    <g clipPath="url(#clip0_425_18691)">
                      <path
                        fill="#000"
                        d="M14 0H2a2 2 0 00-2 2v14h2V2h12V0zm3 4H6a2 2 0 00-2 2v14a2 2 0 002 2h11a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H6V6h11v14z"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_425_18691">
                        <path fill="#fff" d="M0 0H19V22H0z"></path>
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
