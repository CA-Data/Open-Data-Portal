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
    "https://data.ca.gov/api/3/action/package_show?name_or_id=" + name
  ).then((response) => response.json());
  console.log("https://data.ca.gov/api/3/action/package_show?name_or_id=" + name);
  //  console.log(response);

  var groups = response.result.groups;
  if (groups.length == 0) {
    groups = [
      {
        display_name: "",
        description: "",
        image_display_url: "",
        title: "NA",
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
    const options = { year: "numeric", month: "numeric", day: "numeric" };
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
  return {
    props: {
      data_object: response,
      group_object: groups,
      tag_object: tags,
      supportingFiles: supportingFiles,
      dataFiles: dataFiles,
      parameters: context.query,
    },
  };
}

export default function dataSet(data) {
  const date_created = new Date(data.data_object.result.metadata_created);
  const date_modified = new Date(data.data_object.result.metadata_modified);
  const options = {
    weekday: "long",
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
                  {data.group_object[0].title ? data.group_object[0].title: ""}
                </p>
                <p><strong>About</strong></p>
                <ul>
                  <li>Organization: {data.data_object.result.organization.title? data.data_object.result.organization.title: "N/A"}</li>
                  <li>Contact: <a href={"mailto:" + data.data_object.result.contact_email}>{data.data_object.result.contact_name}</a></li>
                  <li><a href={data.data_object.result.landingPage}>Organization website</a></li>
                  <li>License:d {data.data_object.result.license_title? data.data_object.result.license_title: "N/A"}</li>
                </ul>
                <p><strong>Timeframe</strong></p>
                <ul>
                  <li>Updated: </li>
                  <li>Last updated: {metadata_modified}</li>
                  <li>Created: {metadata_created}</li>
                  <li>Temporal coverage: {data.data_object.result.temporal? data.data_object.result.temporal: "N/A"}</li>
                </ul>
                <p><strong>Related links</strong></p>
                <ul>
                  <li>{data.data_object.result.related_resources? data.data_object.result.related_resources: "N/A"}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="cagov-content content-cell">
            <h1 className="h2" style={{ marginTop: 0 }}>
              {data.data_object.result.title}
            </h1>
            <div id="dataset-description" className="description">
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
                          <a>{dataset.name}</a>
                        </Link>
                        <div className="resource-description no-limit">
                          <p>{dataset.description}</p>
                          <button className="btn-read-more">
                            Read more <span className="caret"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 12"><path fill="#727272" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg></span>
                          </button>
                        </div>
                      </td>
                      <td>
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
                      <a>Preview</a>
                      </Link>
                      <br />
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
                          <a>{dataset.name}</a>
                        </Link>
                        <div className="resource-description no-limit">
                          <p>{dataset.description}</p>
                          <button className="btn-read-more">
                            Read more <span className="caret"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 12"><path fill="#727272" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg></span>
                          </button>
                        </div>
                      </td>
                      <td>
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
                      <a>Preview</a>
                      </Link>
                      <br />
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
                        {dataset.format} {dataset.size}
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
                      <div className="resource-description no-limit">
                        <p>{data.data_object.result.additional_information ? data.data_object.result.additional_information: "NA"}</p>
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
                      <p>{data.data_object.result.geo_coverage ? data.data_object.result.geo_coverage: "NA"}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                    <strong>Granularity</strong>
                    </div>
                    <div className="column">
                      <p>{data.data_object.result.granularity ? data.data_object.result.granularity: "NA"}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                    <strong>Language</strong>
                    </div>
                    <div className="column">
                      <p>{data.data_object.result.language ? data.data_object.result.language: "NA"}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                    <strong>Data standard</strong>
                    </div>
                    <div className="column">
                      <p>{data.data_object.result.conformsTo ? data.data_object.result.conformsTo: "NA"}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                    <strong>Tags</strong>
                    </div>
                    <div className="column">
                    {data.data_object.result.tags.map((tag, index) => (
                        <li className="tag" key={tag.id}>
                          <a href={"/results?q=" + tag.name + "&tag=" + tag.name}>
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
                          <a href={"/results?q=" + tag.name + "&tag=" + tag.name}>
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
