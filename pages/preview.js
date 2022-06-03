import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link'

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

  async function buildTable(resourceId) {
    const response = await fetch('https://data.ca.gov/api/3/action/datastore_search?resource_id='+resourceId).then(response => response.json());
    const columns = []
    for (const key in response.result.fields) {
      if (key > 0) {
        const data = { field: response.result.fields[key].id, headerName: response.result.fields[key].id, width: 150 }
        columns.push(data)
      }
    }
    const rows = []
    for (const key in response.result.records) {
      if (key > 0) {
        response.result.records[key].id = parseInt(key)
        const data = response.result.records[key]
        rows.push(data)
      }
    }
    return {columns, rows}
  }

  const datasetResponse = await fetch("https://data.ca.gov/api/3/action/package_show?name_or_id="+context.query.name).then((response) => response.json());
  //https://data.ca.gov/api/3/action/package_show?name_or_id=ground-water-water-quality-results


  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const datasetInfo = {
    title: datasetResponse.result.title,
    author: datasetResponse.result.organization.title,
    metadata_modified: new Date(datasetResponse.result.metadata_modified).toLocaleDateString("en-EN", options)
  }

  var dictionaryData = {
    columns: [],
    rows: []
  }
  const date_updated = new Date(datasetResponse.result.metadata_modified);
  datasetInfo.metadata_modified = date_updated.toLocaleDateString('en-EN', options)

  datasetInfo.organization = datasetResponse.result.organization.title

  for (let index = 0; index < datasetResponse.result.resources.length; index++) {
    if (context.query.id === datasetResponse.result.resources[index].id) {
      datasetInfo.name = datasetResponse.result.resources[index].name
      datasetInfo.description = datasetResponse.result.resources[index].description
      datasetInfo.download = datasetResponse.result.resources[index].url
      datasetInfo.size = ValidateSize(datasetResponse.result.resources[index].size)
    }
    
    if (['CSV', 'XLSX'].includes(datasetResponse.result.resources[index].format)) {
      if (datasetResponse.result.resources[index].name.includes('data dictionary')) {
        dictionaryData = await buildTable(datasetResponse.result.resources[index].id)
      }
    }
  }


  const response = await fetch('https://data.ca.gov/api/3/action/datastore_search?resource_id='+context.query.id).then(response => response.json());
  tableData = {
    columns: [],
    rows: []
  }
  if (response.success) {
    var tableData = await buildTable(context.query.id)
  }
  
  return {
    props: {
      details: datasetInfo,
      response: response,
      parameters: context.query,
      table: tableData,
      dictionary: dictionaryData,
    },
  };
}

export default function preview(dataset) {
  console.log("HERE", dataset)
  return (
    <main id="body-content" className="cagov-main dataset-preview">
      <nav className="nav-breadcrumb">
        <ol>
          <li>
          <svg xmlns="http://www.w3.org/2000/svg" width="6" viewBox="0 0 9.6 16"><path fill="#046a99" d="M9.3 14.2L2.7 8.1l6.6-6.3c.4-.4.4-1 0-1.4a1 1 0 00-1.5 0l-7.4 7a1 1 0 00-.4.8c0 .2.1.6.3.7l7.4 6.7a1 1 0 001.5 0c.5-.3.5-1 .1-1.4z"></path></svg>{" "}
          <Link href={"/dataset?name="+dataset.parameters.name} passHref>
              <a>Back to dataset</a>
            </Link>
          </li>
        </ol>
      </nav>
      <article id="post-design" className="cagov-article with-page-nav">
      <div>
        <h1>
          {dataset.details.name}
        </h1>
        <h2 className="h3">
          Preview
        </h2>
        <div className="dataset-description">
          <div className="dataset-label">Published by:</div>
          <div className="dataset-value">{dataset.details.author}</div>
          <div className="dataset-label">Last updated:</div>
          <div className="dataset-value">{dataset.details.metadata_modified}</div>
          <div className="dataset-label">File details:</div>
          <div className="dataset-value">{dataset.details.size? dataset.details.size: "NA"}</div>
          <div className="dataset-label">Access data:</div>
          <div className="dataset-value">
            <a href={dataset.details.download}>Download File</a> | <a href="">API</a>
          </div>
          <div className="dataset-label">Description:</div>
          <div className="resource-description">
            <p>{dataset.description? dataset.description: "N/A"}</p>
            <button className="btn-read-more">
              Read more <span className="caret"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 12"><path fill="#727272" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg></span>
            </button>
          </div>
          {/*<div className="dataset-value">{dataset.details.description}</div>*/}

        </div>
        
        <div className="data-table-section">
          <h3 className="h4">Data preview</h3>
          <p>You’re previewing the first 50 rows of this file.</p>
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid rows={dataset.table.rows} columns={dataset.table.columns} />
          </div>
        </div>
        
        <div id="data-dictionary-section">
          <h3 className="h4">Data dictionary</h3>
          <p>You’re previewing the first 50 rows of this file.</p>
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid rows={dataset.dictionary.rows} columns={dataset.dictionary.columns} />
          </div>
        </div>
      </div>
      </article>
    </main>
    
  )
}