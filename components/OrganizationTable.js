import Link from "next/link";
import style from "./OrganizationTable.module.css";

function Component(props) {
  return (
    <>
      <div className={style.table}>
        <div className={`${style.row} ${style.header}`}>
          <div className={style.column}>Organization</div>
          <div className={style.column}>Datasets</div>
        </div>
        {props.organizations.map((organization, index) => (
          organization.package_count > 0 &&
          <div key={index} className={style.row}>
            <div className={style.column}>
              <Link
                href={"/organization/datasets?q=&publisher=" + organization.id}
                passHref
              >
                <a>{organization.title}</a>
              </Link>
            </div>
            <div className={style.column}>{organization.package_count}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Component;
