import style from "./ApiModal.module.css";

function ApiModal() {
  return (
    <>
      <div
        id="apiModal"
        className={`${style.modal} ${style.apiModal} apiModal`}
        aria-modal="true"
      >
        <div className={style.modal_content}>
          <button id="close" className={`${style.close} close`}>
            &times;
          </button>
          <h2 className={style.h3}>API endpoint</h2>
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
          <ul className={style.input_group}>
            <li>
              <label>Simple query</label>
              <div className={style.group}>
                <input id="simple-query" type="text" value="" readOnly />
                <button className={style.copy_button}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="22"
                    fill="none"
                    viewBox="0 0 19 22"
                  >
                    <g clipPath="url(#clip0_425_18691)">
                      <path
                        fill="#4B4B4B"
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
              </div>
            </li>
            <li>
              <label>SQL query</label>
              <div className={style.group}>
                <input id="sql-query" type="text" value="" readOnly />
                <button className={style.copy_button}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="22"
                    fill="none"
                    viewBox="0 0 19 22"
                  >
                    <g clipPath="url(#clip0_425_18691)">
                      <path
                        fill="#4B4B4B"
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
              </div>
            </li>
            <li>
              <label>OData query</label>
              <div className={style.group}>
                <input id="odata-query" type="text" value="" readOnly />
                <button className={style.copy_button}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="22"
                    fill="none"
                    viewBox="0 0 19 22"
                  >
                    <g clipPath="url(#clip0_425_18691)">
                      <path
                        fill="#4B4B4B"
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
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default ApiModal;
