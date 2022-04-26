import { Table } from 'portal' //import Table component
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export async function getServerSideProps(context) {
  

  return {
    props: {
      details: "datasetInfo",
    },
  };

}
export default function preview(dataset) {
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'firstName', headerName: 'First name' },
    { field: 'lastName', headerName: 'Last name' },
    { field: 'age', headerName: 'Age' }
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
          <li><a href="https://ca.gov/">CA.gov</a></li>
          <li>
            <Link href="/" passHref>
              <a>Open Data</a>
            </Link>
          </li>
          <li>
            
          </li>
        </ol>
      </nav>
      <article id="post-design" className="cagov-article with-page-nav">
      <div className={styles.container}>
        <h1 className="h3">
          Name
        </h1>
        <p className="h4 thin">Data preview</p>
        <p className="description">Description: Desc</p>
        <p>Access: <a href="/download">Download file</a> | <a href="/api">API</a></p>

        {/* Use table component */}
        <Table data={rows} columns={columns} height={400}/>

      </div>
      </article>
    </main>
    
  )
}
