import Link from "next/link";

export default function SearchResultListing({ parameters, allResults, pages }) {
  var urlParamTopic = parameters.topic ? "&topic=" + parameters.topic : "";
  var urlParamPublisher = parameters.publisher
    ? "&publisher=" + parameters.publisher
    : "";
  var urlParamFormat = parameters.format ? "&format=" + parameters.format : "";
  var urlParamTag = parameters.tag ? "&tag=" + parameters.tag : "";
  var urlParamSort = parameters.sort ? "&sort=" + parameters.sort : "";

  return (
    <div>
      <div className="result-page">
        {allResults.map((dataset, index) => (
          <div key={index} style={{ marginBottom: "3rem" }} className="result">
            <h2 style={{ marginBottom: "5px" }} className="h5">
              <Link href={"/dataset/" + dataset.name} passHref>
                <a
                  style={{
                    fontWeight: "700",
                    fontSize: "18px",
                    lineHeight: "32px",
                    color: "#046A99",
                  }}
                >
                  {dataset.title}
                </a>
              </Link>
            </h2>
            <ul className="result-dataset-info">
              <li>
                <strong>Published by: </strong>
                {dataset.organization}
              </li>
              <li>
                <strong>Last updated: </strong>
                {dataset.updated}
              </li>
              <li>
                <strong>File types: </strong>
                {dataset.formats.join(", ")}
              </li>
            </ul>
            <p className="description" style={{ marginTop: "12px" }}>
              {dataset.notes.substring(0, 150)}...
            </p>
          </div>
        ))}
      </div>

      <div className="page-navigation">
        <a
          style={{ display: pages.previous.display }}
          className="page-previous"
          href={
            "datasets?q=" +
            parameters.q +
            urlParamTopic +
            urlParamPublisher +
            urlParamTag +
            urlParamFormat +
            urlParamSort +
            "&page=" +
            pages.previous.value
          }
        >
          <svg
            className={"rotate-90"}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            viewBox="0 0 20 12"
          >
            <title>Previous page arrow</title>
            <path
              fill="#4B4B4B"
              d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"
            />
          </svg>
        </a>

        <a
          style={{ display: pages.previous.display }}
          className="page-previous"
          href={
            "datasets?q=" +
            parameters.q +
            urlParamTopic +
            urlParamPublisher +
            urlParamTag +
            urlParamFormat +
            urlParamSort +
            "&page=" +
            pages.previous.value
          }
        >
          {pages.previous.value + 1}
        </a>

        <span
          style={{ display: pages.current.display }}
          className="page-current"
        >
          {pages.current.value + 1}
        </span>

        <a
          style={{ display: pages.next.display }}
          className="page-next"
          href={
            "datasets?q=" +
            parameters.q +
            urlParamTopic +
            urlParamPublisher +
            urlParamTag +
            urlParamFormat +
            urlParamSort +
            "&page=" +
            pages.next.value
          }
        >
          {pages.next.value + 1}
        </a>

        <a
          style={{ display: pages.next.display }}
          className="page-next"
          href={
            "datasets?q=" +
            parameters.q +
            urlParamTopic +
            urlParamPublisher +
            urlParamTag +
            urlParamFormat +
            urlParamSort +
            "&page=" +
            pages.next.value
          }
        >
          <svg
            className={"rotate-270"}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            viewBox="0 0 20 12"
          >
            <title>Next page arrow</title>
            <path
              fill="#4B4B4B"
              d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
