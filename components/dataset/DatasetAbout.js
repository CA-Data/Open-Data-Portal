import Link from "next/link";

function DatasetAbout(props) {
  return (
    <>
      <h3 className="h5">About</h3>
      <ul>
        <li>Organization: {props.title ? props.title : "N/A"}</li>
        <li>
          Contact: <a href={"mailto:" + props.email}>Data steward</a>
        </li>
        {props.url && (
          <li>
            <a href={props.url}>Organization website</a>
          </li>
        )}
        <li>
          License: {props.license_title ? props.license_title : "Public domain"}
          <br />
          Visit <Link href="/licenses">Licenses</Link> for more information.
        </li>
      </ul>
    </>
  );
}

export default DatasetAbout;
