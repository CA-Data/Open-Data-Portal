function ReadMore() {
  return (
    <>
      <button className="btn-read-more">
        Read more{" "}
        <span className="caret">
          <svg
            className="caret-readmore"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            viewBox="0 0 20 12"
          >
            <path
              fill="#727272"
              d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"
            />
          </svg>
        </span>
      </button>
    </>
  );
}

export default ReadMore;
