import { useRouter } from "next/router";
import Script from "next/script";
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
      return ", " + FileSize + " Bytes";
    } else if (FileSize < megaBytes) {
      return ", " + (FileSize / kiloBytes).toFixed(decimal) + " KB";
    } else if (FileSize < gigaBytes) {
      return ", " + (FileSize / megaBytes).toFixed(decimal) + " MB";
    } else if (FileSize < teraBytes) {
      return ", " + (FileSize / gigaBytes).toFixed(decimal) + " GB";
    } else {
      return ", " + (FileSize / teraBytes).toFixed(decimal) + " TB";
    }
  }

  const name = context.query.name;
  const response = await fetch(
    "https://data.ca.gov/api/3/action/package_show?name_or_id=" + name
  ).then((response) => response.json());
  const groups = response.result.groups;
  const tags = response.result.tags;

  const dataFiles = [];
  const supportingFiles = [];
  for (let index = 0; index < response.result.resources.length; index++) {
    const date = new Date(response.result.resources[index].created);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const dateFromat = date.toLocaleDateString("en-EN", options);
    const resource = {};
    resource["id"] = response.result.resources[index].id;
    resource["name"] = response.result.resources[index].name;
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

  for (let index = 0; index < response.result.resources.length; index++) {}
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

  const readMore = () => {
    if (
      document
        .getElementById("dataset-description")
        .classList.contains("expanded")
    ) {
      document
        .getElementById("dataset-description")
        .classList.remove("expanded");
      document.querySelectorAll(".btn-read-more")[0].innerHTML = "Read more";
    } else {
      document.getElementById("dataset-description").classList.add("expanded");
      document.querySelectorAll(".btn-read-more")[0].innerHTML = "Read less";
    }
  };

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
            <sidebar space="0" side="left">
              <div className="dataset-info">
                <h2 className="h4">About this dataset</h2>
                <p>
                  <span className="dataset-info-label">Topic: </span>
                  {data.group_object.map((e) => e.title).join(", ")}
                </p>
                <ul>
                  <li>Updated: Weekly</li>
                  <li>Last updated: {metadata_modified}</li>
                  <li>Created: {metadata_created}</li>
                  <li>
                    Contact:{" "}
                    <a href={"mailto:" + data.data_object.result.contact_email}>
                      {data.data_object.result.contact_name}
                    </a>
                  </li>
                  <li>
                    Licensed:{" "}
                    {data.data_object.result.license_title
                      ? data.data_object.result.license_title
                      : "N/A"}
                  </li>
                  <li>
                    Author:{" "}
                    {data.data_object.result.author
                      ? data.data_object.result.author
                      : "N/A"}
                  </li>
                </ul>
              </div>
            </sidebar>
          </div>
          <div className="cagov-content content-cell">
            <h1 className="h2" style={{ marginTop: 0 }}>
              {data.data_object.result.title}
            </h1>
            <div className="published-by">
              <h2 className="h4 thin">
                Published by {data.data_object.result.organization.title}
              </h2>
            </div>
            <div id="dataset-description" className="description">
              <p>
                {data.data_object.result.notes
                  .replace(/<br>/g, "\n")
                  .replace(/\<.*?\>/g, "")}
              </p>
            </div>
            <button className="btn-read-more" onClick={readMore}>
              Read more
            </button>
            <div className="data-files">
              <h2 className="h3">Data files</h2>
              <table className="data-files-table">
                <thead>
                  <tr>
                    <th>Download data</th>
                    <th>Access data</th>
                    <th>File details</th>
                    <th>Last updated</th>
                  </tr>
                </thead>
                <tbody>
                  {data.dataFiles.map((dataset, index) => (
                    <tr key={index}>
                      <td>
                        <a href={dataset.url}>{dataset.name}</a>
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
                        </Link>{" "}
                        |{" "}
                        <button
                          className="api-button"
                          data-resource-name={dataset.name}
                          data-file-id={dataset.id}
                        >
                          API
                        </button>
                      </td>
                      <td>
                        {dataset.format}
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
                    <th>Download file</th>
                    <th>Access data</th>
                    <th>File details</th>
                    <th>Last updated</th>
                  </tr>
                </thead>
                <tbody>
                  {data.supportingFiles.map((dataset, index) => (
                    <tr key={index}>
                      <td>
                        <a href={dataset.url}>{dataset.name}</a>
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
                        </Link>{" "}
                        |{" "}
                        <button
                          className="api-button"
                          data-resource-name={dataset.name}
                          data-file-id={dataset.id}
                        >
                          API
                        </button>
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
            <div className="tags">
              <ul className="data-tags">
                <li>Tags: </li>
                {data.data_object.result.tags.map((tag, index) => (
                  <li className="tag" key={tag.id}>
                    <a href={"/results?q=" + tag.name + "&tag=" + tag.name}>
                      {tag.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
            <h2 className="h3">API endpoint</h2>
            <h3 id="resource-name" className="h4 thin">
              Resource name
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
