import Link from "next/link";
import Head from "next/head";
import OrganizationTable from "../components/OrganizationTable";

export async function getStaticProps() {
  const response = await fetch(
    "https://data.ca.gov/api/3/action/organization_list?all_fields=true&include_extras=true"
  ).then((response) => response.json());

  const organizations = [];
  for (var organization of response.result) {
    var data = {};
    data.id = organization.name;
    data.title = organization.display_name;
    data.package_count = organization.package_count;
    organizations.push(data);
  }
  return {
    props: {
      org: organizations,
    },
    revalidate: 60, // In seconds
  };
}

export default function render(data) {
  return (
    <>
      <Head>
        <title>Organizations | CA Open Data</title>
        <meta
          name="description"
          content="Find all organizations inluded in State of California Open Data."
        ></meta>
      </Head>
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
        <article id="post-design" className="cagov-article with-page-nav">
          <div className="content-container">
            <h1>Organizations</h1>
            <p>
              These organizations contribute datasets to our portal. Select an
              organization to explore their datasets.
            </p>
            <OrganizationTable organizations={data.org} />
          </div>
        </article>
      </main>
    </>
  );
}
