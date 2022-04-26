import { Table } from 'portal' //import Table component
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export async function getServerSideProps(context) {
  const datasetResponse = await fetch("https://data.ca.gov/api/3/action/package_show?name_or_id="+context.query.name).then((response) => response.json());
  
  const datasetInfo = {
    title: datasetResponse.result.title,
  }

  for (let index = 0; index < datasetResponse.result.resources.length; index++) {
    if (context.query.id === datasetResponse.result.resources[index].id) {
      datasetInfo.description = datasetResponse.result.resources[index].description
      datasetInfo.download = datasetResponse.result.resources[index].url
    }
  }

  const response = await fetch('https://data.ca.gov/api/3/action/datastore_search?resource_id='+context.query.id).then(response => response.json());

  const columns = []
  for (const key in response.result.fields) {
    if (key > 0) {
      const data = { field: response.result.fields[key].id, headerName: response.result.fields[key].id}
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
  const columns = dataset.columns;
  const rows = dataset.rows;

  return (
    <main id="body-content" className="cagov-main">
      <nav className="nav-breadcrumb">
        <ol>
          <li><a href="https://ca.gov/">CA.gov</a></li>
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
          <li>{dataset.parameters.rname}</li>
        </ol>
      </nav>
      <article id="post-design" className="cagov-article with-page-nav">
      <div className={styles.container}>
        <h1 className="h3">
          {dataset.parameters.rname}
        </h1>
        <p className="h4 thin">Data preview</p>
        <p className="description">Description: {dataset.details.description}</p>
        <p>Access: <a href={dataset.details.download}>Download file</a> | <a href="/api">API</a></p>

        {/* Use table component */}
        <Table data={rows} columns={columns} height={400}/>

      </div>
      </article>
    </main>
    
  )
}
