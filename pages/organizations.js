import styles from "../styles/Home.module.css";
import Link from "next/link";

//
export async function getStaticProps() {
  const response = await fetch(
    "https://test-data.technology.ca.gov/api/3/action/organization_list?all_fields=true&include_extras=true", {headers: {'User-Agent': 'NextGenAPI/0.0.1'}}
  ).then((response) => response.json());

  const organizations = []
  for (var organization of response.result) {
    var data = {}
    data.id = organization.name
    data.title = organization.display_name
    data.package_count = organization.package_count
    organizations.push(data)
  }
  return {
    props: {
      org: organizations,
    },
  };
}

export default function render(data) {
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
          <li>Explore datasets</li>
          <li>Organizations</li>
        </ol>
      </nav>
      <article
        id="post-design"
        className="cagov-article with-page-nav"
      >
        <div className="content-container">
          <h1>Organizations</h1>
          <p>
          These organizations contribute datasets to our portal. Select an organization to explore their datasets.
          </p>
          <div className="organization-table">
            <div className="organization-row organization-table-header">
              <div className="organization-column">
                  Organization
              </div>
              <div className="organization-column">
                  Datasets
              </div>
            </div>
            {data.org.map((org, index) => (
              <div key={index} className="organization-row">
                <div className="organization-column">
                  <a href={"/organization/datasets?q=&publisher="+org.id}>{org.title}</a>
                </div>
                <div className="organization-column">
                  {org.package_count}
                </div>
              </div>
            ))}
            </div>
          </div>
      </article>
    </main>
    </>
  );
}
