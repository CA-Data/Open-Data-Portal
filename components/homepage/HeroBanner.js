import SearchInput from "../../components/SearchInput.js";

function Component(props) {
  return (
    <>
      <div className="wp-block-ca-design-system-hero cagov-with-sidebar cagov-no-reverse cagov-with-sidebar-left cagov-featured-section cagov-bkgrd-primary-gradient cagov-block wp-block-cagov-hero">
        <div className="page-container-ds margin-right-clear">
          <div className="cagov-stack cagov-p-2 cagov-featured-sidebar ">
            <h1>{props.heading}</h1>
            <div className="cagov-hero-body-content">
              <p className="lead-text">{props.lead_text}</p>
              <div className="search-container grid-search"></div>
              <SearchInput
                button_text={"Submit"}
                placeholder_text={"Dataset search"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Component;
