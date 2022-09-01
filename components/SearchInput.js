function Component(props) {
  return (
    <>
      <form className="site-search site-search-homepage" action="/datasets">
        <button
          style={{
            right: "-3px",
            backgroundColor: "#ffffff",
            border: "none",
            borderRadius: "4px 0px 0px 4px",
            padding: "8px 14px 0px 14px",
            position: "relative",
            width: "47px",
            zIndex: 10
          }}
          type="submit"
          className="search-submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 17 17"
            viewBox="0 0 17 17"
            style={{ width: 19 }}
          >
            <path
              fill="#034A6B"
              d="M16.4 15.2l-4-4c2-2.6 1.8-6.5-.6-8.9-1.3-1.3-3-2-4.8-2s-3.5.7-4.8 2c-2.6 2.6-2.6 6.9 0 9.6 1.3 1.3 3 2 4.8 2 1.4 0 2.9-.5 4.1-1.4l4.1 4c.2.2.4.3.7.3.2 0 .5-.1.7-.3.1-.3.1-.9-.2-1.3zM7 12c-1.3 0-2.6-.5-3.5-1.4-1.9-1.9-1.9-5.1 0-7 .9-.9 2.1-1.5 3.5-1.5s2.6.5 3.5 1.4 1.4 2.2 1.4 3.5-.5 2.6-1.4 3.5c-1 1-2.2 1.5-3.5 1.5z"
            ></path>
          </svg>
          <span className="sr-only">
            {props.button_text}
            {/* Submit */}
          </span>
        </button>
        <label id="SearchInput" className="sr-only">
          {props.placeholder_text}
          {/* Dataset search */}
        </label>
        <input
          type="text"
          id="q"
          name="q"
          aria-labelledby="SearchInput"
          placeholder="Search datasets"
          className="search-textfield"
          style={{
            color: "#ffffff",
            padding: "7px",
            borderRadius: ".25rem",
            padding: "5px 0px 9px 53px",
            border: "none",
            position: "relative",
            left: "-43px"
          }}
        />
      </form>
    </>
  );
}

export default Component;
