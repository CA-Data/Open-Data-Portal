import Link from "next/link";

export default function SearchResultListing({ dataState }) {
  var urlParamTopic = dataState.parameters.topic
    ? "&topic=" + dataState.parameters.topic
    : "";
  var urlParamPublisher = dataState.parameters.publisher
    ? "&publisher=" + dataState.parameters.publisher
    : "";
  var urlParamFormat = dataState.parameters.format
    ? "&format=" + dataState.parameters.format
    : "";
  var urlParamTag = dataState.parameters.tag
    ? "&tag=" + dataState.parameters.tag
    : "";
  var urlParamSort = dataState.parameters.sort
    ? "&sort=" + dataState.parameters.sort
    : "";

  return (
    <div>
      <div className="result-page">
        {dataState.allResults.map((dataset, index) => (
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
          style={{ display: dataState.pages.previous.display }}
          className="page-previous"
          href={
            "datasets?q=" +
            dataState.parameters.q +
            urlParamTopic +
            urlParamPublisher +
            urlParamTag +
            urlParamFormat +
            urlParamSort +
            "&page=" +
            dataState.pages.previous.value
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
          style={{ display: dataState.pages.previous.display }}
          className="page-previous"
          href={
            "datasets?q=" +
            dataState.parameters.q +
            urlParamTopic +
            urlParamPublisher +
            urlParamTag +
            urlParamFormat +
            urlParamSort +
            "&page=" +
            dataState.pages.previous.value
          }
        >
          {dataState.pages.previous.value + 1}
        </a>

        <span
          style={{ display: dataState.pages.current.display }}
          className="page-current"
        >
          {dataState.pages.current.value + 1}
        </span>

        <a
          style={{ display: dataState.pages.next.display }}
          className="page-next"
          href={
            "datasets?q=" +
            dataState.parameters.q +
            urlParamTopic +
            urlParamPublisher +
            urlParamTag +
            urlParamFormat +
            urlParamSort +
            "&page=" +
            dataState.pages.next.value
          }
        >
          {dataState.pages.next.value + 1}
        </a>

        <a
          style={{ display: dataState.pages.next.display }}
          className="page-next"
          href={
            "datasets?q=" +
            dataState.parameters.q +
            urlParamTopic +
            urlParamPublisher +
            urlParamTag +
            urlParamFormat +
            urlParamSort +
            "&page=" +
            dataState.pages.next.value
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
