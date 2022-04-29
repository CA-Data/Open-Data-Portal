import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link'

export async function getServerSideProps(context) {
  const datasetResponse = await fetch("https://data.ca.gov/api/3/action/package_show?name_or_id="+context.query.name).then((response) => response.json());
  //const datasetResponse = await fetch("https://data.ca.gov/api/3/action/package_show?name_or_id=ground-water-water-quality-results").then((response) => response.json());

  
  const datasetInfo = {
    title: datasetResponse.result.title,
  }

  for (let index = 0; index < datasetResponse.result.resources.length; index++) {
    if (context.query.id === datasetResponse.result.resources[index].id) {
      datasetInfo.name = datasetResponse.result.resources[index].name
      datasetInfo.description = datasetResponse.result.resources[index].description
      datasetInfo.download = datasetResponse.result.resources[index].url
    }
  }

  const response = await fetch('https://data.ca.gov/api/3/action/datastore_search?resource_id='+context.query.id).then(response => response.json());
  //const response = await fetch('https://data.ca.gov/api/3/action/datastore_search?resource_id=a0d400c0-fa18-4f2d-adbd-cbe2e552bca2').then(response => response.json());
  ///https://data.ca.gov/api/3/action/datastore_search?resource_id=a0d400c0-fa18-4f2d-adbd-cbe2e552bca2
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
  return {
    props: {
      details: datasetInfo,
      response: response,
      parameters: context.query,
      columns: columns,
      rows: rows,
    },
  };

}

export default function preview(dataset) {
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'age', headerName: 'Age', width: 150 }
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

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
          <li>
            <Link href={"/dataset?name="+dataset.parameters.name} passHref>
              <a>{dataset.parameters.name.replace(/-/g, ' ').replace('covid 19', 'covid-19')}</a>
            </Link>
          </li>
          <li>{dataset.details.name}</li>
        </ol>
      </nav>
      <article id="post-design" className="cagov-article with-page-nav">
      <div>
        <h1 className="h3">
          {dataset.details.name}
        </h1>
        <p className="description">Description: {dataset.details.description}</p>
        <p>Access: <a href={dataset.details.download}>Download file</a> | <a href="/api">API</a></p>

        <p className="h4 thin">Data preview</p>
        {/* Use table component */}
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid rows={dataset.rows} columns={dataset.columns} />
        </div>

      </div>
      </article>
    </main>
    
  )
}