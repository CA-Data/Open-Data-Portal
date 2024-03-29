import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BasicSelect from "../components/BasicSelect";
import SearchResultListing from "/components/SearchResultListing";
import Head from "next/head";
export async function getServerSideProps(context) {
  return getFormattedData(context);
}

const getFormattedData = async (context) => {
  if (typeof context.query.q === "undefined") {
    context.query.q = "";
  }
  var apirequest =
    "https://data.ca.gov/api/3/action/package_search?q=" + context.query.q;
  var thereWasAFilter = 0; // flag, did user select any filter?
  if ("topic" in context.query && context.query.topic.length > 0) {
    let groups = context.query.topic.split(",");
    let formattedGroupString = "";
    for (let i = 0; i < groups.length; i++) {
      if (groups[i + 1]) {
        if (groups[i] == "health and human services") {
          formattedGroupString +=
            groups[i].replace(/ and/g, "").replace(/ /g, "-") + "%20AND%20";
        } else {
          formattedGroupString += groups[i].replace(/ /g, "-") + "%20AND%20";
        }
      } else {
        if (groups[i] == "health and human services") {
          formattedGroupString +=
            groups[i].replace(/ and/g, "").replace(/ /g, "-") + ")";
        } else {
          formattedGroupString += groups[i].replace(/ /g, "-") + ")";
        }
      }
    }
    apirequest += thereWasAFilter ? "%20AND%20" : "&fq=";
    apirequest += "groups:(" + formattedGroupString;
    thereWasAFilter = 1;
  }
  if ("publisher" in context.query && context.query.publisher.length > 0) {
    let organizations = context.query.publisher.split(",");
    let formattedOrganizationsString = "";
    for (let i = 0; i < organizations.length; i++) {
      if (organizations[i + 1]) {
        formattedOrganizationsString +=
          organizations[i].replace(/ /g, "-") + "%20AND%20";
      } else {
        formattedOrganizationsString +=
          organizations[i].replace(/ /g, "-") + ")";
      }
    }
    apirequest += thereWasAFilter ? "%20AND%20" : "&fq=";
    apirequest += "organization:(" + formattedOrganizationsString;
    thereWasAFilter = 1;
  }

  if ("format" in context.query && context.query.format.length > 0) {
    let filters = context.query.format.split(",");
    let formattedFormatString = "";
    for (let i = 0; i < filters.length; i++) {
      if (filters[i + 1]) {
        formattedFormatString +=
          filters[i].replace(/ /g, "-").toUpperCase() + "%20AND%20";
      } else {
        formattedFormatString +=
          filters[i].replace(/ /g, "-").toUpperCase() + ")";
      }
    }
    apirequest += thereWasAFilter ? "%20AND%20" : "&fq=";
    apirequest += "res_format:(" + formattedFormatString;
    thereWasAFilter = 1;
  }

  if ("tag" in context.query && context.query.tag.length > 0) {
    let tags = context.query.tag.split(",");
    let formattedTagString = "";
    for (let i = 0; i < tags.length; i++) {
      if (tags[i + 1]) {
        formattedTagString += '"' + tags[i] + '"%20AND%20';
      } else {
        formattedTagString += '"' + tags[i] + '")';
      }
    }
    apirequest += thereWasAFilter ? "%20AND%20" : "&fq=";
    apirequest += "tags:(" + formattedTagString;
    thereWasAFilter = 1;
  }

  if ("sort" in context.query) {
    apirequest += "&sort=" + context.query.sort;
  }

  //pages
  const pageData = {};

  const page = "page" in context.query ? parseInt(context.query.page) : 0;

  pageData["current"] = {};
  pageData["current"].value = page; // these page numbers start at 0
  pageData["current"].display = "inline";

  pageData["next"] = {};
  pageData["next"].value = page + 1;
  pageData["next"].display = "inline";

  pageData["previous"] = {};
  pageData["previous"].value = page - 1;
  pageData["previous"].display = "inline";

  pageData["total"] = {};
  pageData["total"].display = "inline";

  if (pageData["previous"].value < 0) {
    pageData["previous"].display = "none";
  }
  apirequest += "&start=" + page * 10;

  //[0]previous, [1]current, [2]next, [3]total, [4]next
  const response = await fetch(apirequest).then((response) => response.json());

  pageData["total"].value = Math.ceil(parseInt(response.result.count) / 10);

  if (pageData["next"].value >= pageData["total"].value) {
    pageData["next"].display = "none";
  }

  // Getting Filters

  const filters = await fetch(
    `https://data.ca.gov/api/3/action/package_search?${
      apirequest.split("?")[1]
    }&facet.field=["groups","tags","organization","res_format"]&rows=0`
  )
    .then((response) => response.json())
    .catch((error) => console.log(error));

  //search results
  const resultsArray = [];
  const dataset = {};
  if (response.result.results.length > 0) {
    for (let index = 0; index < response.result.results.length; index++) {
      let dataset = {};

      dataset.formats = [];
      dataset.name = response.result.results[index].name;
      dataset.title = response.result.results[index].title;
      dataset.organization = response.result.results[index].organization.title;

      const date_updated = new Date(
        response.result.results[index].metadata_modified
      );
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const metadata_modified = date_updated.toLocaleDateString(
        "en-EN",
        options
      );

      dataset.updated = metadata_modified;

      dataset.notes = response.result.results[index].notes.replace(
        /\<.*?\>|__/g,
        ""
      );

      if (response.result.results[index].resources.length > 0) {
        const resource = response.result.results[index].resources;
        for (let index = 0; index < resource.length; index++) {
          var resource_type = resource[index].format.toUpperCase();
          if (!dataset.formats.includes(resource_type)) {
            if (resource_type.length > 0) {
              dataset.formats.push(resource_type);
            }
          }
        }
      }
      resultsArray.push(dataset);
    }
  }

  return {
    props: {
      matches: response.result.count,
      allResults: resultsArray,
      parameters: context.query,
      pages: pageData,
      filters: filters,
    },
  };
};

const Results = (data) => {
  const [topicSvg, setTopicSvg] = useState("svg-rotate-up");
  const [publisherSvg, setPublisherSvg] = useState("svg-rotate-down");
  const [formatSvg, setFormatSvg] = useState("svg-rotate-down");
  const [tagSvg, setTagSvg] = useState("svg-rotate-down");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [reset, setReset] = useState(false);
  const [topicList, setTopicList] = useState(
    Object.entries(data.filters.result.facets.groups)
  );
  const [publisherList, setPublisherList] = useState(
    Object.entries(data.filters.result.facets.organization)
  );
  const [tagList, setTagList] = useState(
    Object.entries(data.filters.result.facets.tags)
  );
  const [formatList, setFormatList] = useState(
    Object.entries(data.filters.result.facets.res_format)
  );
  const [dataState, setDataState] = useState(data);

  const [topicShowMore, setTopicShowMore] = useState(5);
  const [publisherShowMore, setPublisherShowMore] = useState(5);
  const [tagShowMore, setTagShowMore] = useState(5);
  const [formatShowMore, setFormatShowMore] = useState(5);
  const router = useRouter();
  if (typeof window === "object") {
    // Check if document is finally loaded
    document.addEventListener("DOMContentLoaded", function () {
      if (
        parseInt(dataState.pages["next"].value) >
        parseInt(dataState.pages["total"].value)
      ) {
        document.querySelectorAll(".page-next")[0].style.display = "none";
        document.querySelectorAll(".page-next")[1].style.display = "none";
      }
    });
  }

  const submit = (event) => {
    if (!router.query.sort) {
      router.push(router.asPath + "&sort=" + event, null, { shallow: true });
    } else {
      let newPath = router.asPath.split("&");
      let index = newPath.findIndex((item) => item.includes("sort"));
      newPath.splice(index, 1, "sort=" + event);
      newPath = newPath.join("&");
      router.push(newPath, null, { shallow: true });
    }
  };

  // UseEffects will fire when its corresponding array is updated.
  // Arrays can be updated by user input -> (selectedTopics,selectedPublishers,selectedFormats,selectedTags)
  // Each array will append a value to the url
  useEffect(() => {
    getFormattedData(router).then((response) => setDataState(response.props));
  }, [router]);

  useEffect(() => {
    setTopicList(
      Object.entries(dataState.filters.result.facets.groups).sort((a, b) =>
        a[1] > b[1] ? -1 : 1
      )
    );
    setPublisherList(
      Object.entries(dataState.filters.result.facets.organization).sort(
        (a, b) => (a[1] > b[1] ? -1 : 1)
      )
    );
    setTagList(
      Object.entries(dataState.filters.result.facets.tags).sort((a, b) =>
        a[1] > b[1] ? -1 : 1
      )
    );
    setFormatList(
      Object.entries(dataState.filters.result.facets.res_format).sort((a, b) =>
        a[1] > b[1] ? -1 : 1
      )
    );
  }, [dataState]);

  useEffect(() => {
    if (!reset) {
      const url = new URL(window.location.href);
      if (selectedTopics.length == 0 || !url.searchParams.get("topic")) {
        url.searchParams.delete("topic");
        router.push(url, null, { shallow: true });
      }
      if (selectedTopics.length >= 1) {
        url.searchParams.set("topic", selectedTopics);
        router.push(url, null, { shallow: true });
      }
    }
  }, [selectedTopics]);

  useEffect(() => {
    if (!reset) {
      const url = new URL(window.location.href);
      if (
        selectedPublishers.length == 0 ||
        !url.searchParams.get("publisher")
      ) {
        url.searchParams.delete("publisher");
        router.push(url, null, { shallow: true });
      }
      if (selectedPublishers.length >= 1) {
        url.searchParams.set("publisher", selectedPublishers);
        router.push(url, null, { shallow: true });
      }
    }
  }, [selectedPublishers]);

  useEffect(() => {
    if (!reset) {
      const url = new URL(window.location.href);
      if (selectedFormats.length == 0 || !url.searchParams.get("format")) {
        url.searchParams.delete("format");
        router.push(url, null, { shallow: true });
      }
      if (selectedFormats.length >= 1) {
        url.searchParams.set("format", selectedFormats);
        router.push(url, null, { shallow: true });
      }
    }
  }, [selectedFormats]);

  useEffect(() => {
    if (!reset) {
      const url = new URL(window.location.href);
      if (selectedTags.length == 0 || !url.searchParams.get("tag")) {
        url.searchParams.delete("tag");
        router.push(url, null, { shallow: true });
      }
      if (selectedTags.length >= 1) {
        url.searchParams.set("tag", selectedTags);
        router.push(url, null, { shallow: true });
      }
    }
  }, [selectedTags]);

  // Persist selected checkboxes on page refresh
  useEffect(() => {
    let url = new URL(window.location.href);
    let checkboxes = Array.from(document.getElementsByClassName("checkBox"));

    // Get URL params
    const topicParams = url.searchParams?.get("topic");
    const publisherParams = url.searchParams?.get("publisher");
    const formatParams = url.searchParams?.get("format");
    const tagParams = url.searchParams?.get("tag");
    const toBeChecked = {};
    toBeChecked.topic = topicParams?.split(",");
    toBeChecked.publisher = publisherParams?.split(",");
    toBeChecked.format = formatParams?.split(",");
    toBeChecked.tag = tagParams?.split(",");

    // Set local state from params
    topicParams ? setSelectedTopics(topicParams.split(",")) : null;
    publisherParams ? setSelectedPublishers(publisherParams.split(",")) : null;
    formatParams ? setSelectedFormats(formatParams.split(",")) : null;
    tagParams ? setSelectedTags(tagParams.split(",")) : null;

    // Loop through checkboxes
    checkboxes.forEach((checkbox) => {
      const formatting = checkbox?.id.split("-");
      const filter = formatting.pop();
      const checkboxId = formatting.join("-");
      toBeChecked[filter]?.forEach((item) => {
        switch (filter) {
          case "topic":
            if (topicSvg === "svg-rotate-down") {
              setTopicSvg("svg-rotate-up");
            }
            break;
          case "publisher":
            if (publisherSvg === "svg-rotate-down") {
              setPublisherSvg("svg-rotate-up");
            }
            break;
          case "format":
            if (formatSvg === "svg-rotate-down") {
              setFormatSvg("svg-rotate-up");
            }
            break;
          case "tag":
            if (tagSvg === "svg-rotate-down") {
              setTagSvg("svg-rotate-up");
            }
            break;
          default:
            return null;
        }
        if (item === checkboxId.toLowerCase()) {
          checkbox.checked = true;
        }
      });
    });
  }, []);

  // End of UseEffect section **********************************************

  // resetSearch resets the page
  const resetSearch = async () => {
    setFormatSvg("svg-rotate-down"); // resets any dropdowns to default state
    setPublisherSvg("svg-rotate-down"); // *
    setTagSvg("svg-rotate-down"); // *
    setTopicSvg("svg-rotate-up"); // *
    setSelectedTopics([]); // resets useState arrays
    setSelectedPublishers([]); // *
    setSelectedFormats([]); // *
    setSelectedTags([]); // *
    setTopicShowMore(5); // *
    setPublisherShowMore(5); // *
    setTagShowMore(5); // *
    setFormatShowMore(5); // *
    router.push("?q=", null, { shallow: true }); // and resets search results
  };

  const formatSentenceCase = (str) => {
    if (str.includes("covid")) {
      return "COVID-19";
    }

    let tempStr = str
      .charAt(0)
      .toUpperCase()
      .concat(str.substring(1))
      .replace(/-/g, " ");
    return tempStr;
  };

  const formatTitleCase = (str) => {
    const tempStr = str
      .charAt(0)
      .toUpperCase()
      .concat(str.substring(1))
      .replace(/-/g, " ");
    const words = tempStr.split(" ");

    for (let i = 0; i < words.length; i++) {
      if (words[i] !== "of" && words[i] !== "and") {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
    }
    return words.join(" ");
  };

  const areObjectKeysEmpty = (obj) => {
    for (var key in obj) {
      if (obj[key] !== null && obj[key] != "") return false;
    }
    return true;
  };
  return (
    <>
      <Head>
        <title>Datasets | CA Open Data</title>
        <meta
          name="description"
          content="Search all datasets from State of California Open Data."
        ></meta>
      </Head>
      <main id="body-content" className="cagov-main">
        <article
          id="post-design"
          className="cagov-article with-sidebar with-page-nav results-page"
        >
          <div className="cagov-content desktop-content">
            <h1
              style={{
                marginTop: 0,
                color: "#034A6B",
                fontSize: "47px",
                lineHeight: "58.8px",
              }}
            >
              {areObjectKeysEmpty(dataState.parameters)
                ? "All datasets"
                : "Search results"}
            </h1>
            <div className="search-container grid-search">
              <form className="site-search" action="/datasets">
                <span className="sr-only" id="SearchInput">
                  Dataset search
                </span>
                <span style={{ display: "flex" }}>
                  <input
                    type="text"
                    id="q"
                    name="q"
                    aria-labelledby="SearchInput"
                    placeholder="Search datasets"
                    className="search-textfield"
                    defaultValue={dataState.parameters.q}
                  />
                  <button
                    type={"submit"}
                    style={{
                      outlineOffset: -2,
                      right: "53px",
                      backgroundColor: "var(--primary-color, #046A99)",
                      border: "1px solid var(--primary-color, #046A99)",
                      borderRadius: "0px 4px 4px 0px",
                      padding: "8px 14px",
                      position: "relative",
                      backgroundColor: "#034A6B",
                      display: "flex",
                      alignItems: "center",
                      width: "55px",
                    }}
                    className="search-submit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 17 17"
                      viewBox="0 0 17 17"
                      style={{ width: "23.43px", backgroundColor: "#034A6B" }}
                    >
                      <path
                        fill="#fff"
                        d="M16.4 15.2l-4-4c2-2.6 1.8-6.5-.6-8.9-1.3-1.3-3-2-4.8-2s-3.5.7-4.8 2c-2.6 2.6-2.6 6.9 0 9.6 1.3 1.3 3 2 4.8 2 1.4 0 2.9-.5 4.1-1.4l4.1 4c.2.2.4.3.7.3.2 0 .5-.1.7-.3.1-.3.1-.9-.2-1.3zM7 12c-1.3 0-2.6-.5-3.5-1.4-1.9-1.9-1.9-5.1 0-7 .9-.9 2.1-1.5 3.5-1.5s2.6.5 3.5 1.4 1.4 2.2 1.4 3.5-.5 2.6-1.4 3.5c-1 1-2.2 1.5-3.5 1.5z"
                      ></path>
                    </svg>
                    <span className="sr-only">Submit</span>
                  </button>
                </span>
              </form>
            </div>
          </div>
          <div
            className="sidebar-container everylayout sidebar-cell"
            style={{ marginTop: "130px" }}
          >
            <div className="sidebar" space="0" side="left">
              <nav aria-labelledby="page-navigation-label">
                <div id="page-navigation-label" className="label">
                  <strong style={{ fontSize: "24px" }}>Filter by</strong>
                </div>
                <ul className="search-filters align">
                  <li
                    style={{ color: "#4B4B4B" }}
                    className={"filter-topic"}
                    tabIndex={"0"}
                    onKeyDown={(e) => {
                      if (e.which === 13 && e.target.tagName === "LI") {
                        if (topicSvg === "svg-rotate-up") {
                          setTopicSvg("svg-rotate-down");
                        }
                        if (topicSvg === "svg-rotate-down") {
                          setTopicSvg("svg-rotate-up");
                        }
                      }
                    }}
                  >
                    <div
                      onClick={() => {
                        topicSvg == "svg-rotate-up"
                          ? setTopicSvg("svg-rotate-down")
                          : setTopicSvg("svg-rotate-up");
                        setTopicShowMore(5);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "10px 0px",
                      }}
                    >
                      <svg
                        style={{ margin: "9px 21px 9px 4px" }}
                        className={topicSvg}
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        viewBox="0 0 20 12"
                      >
                        <path
                          fill="#4B4B4B"
                          d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"
                        />
                      </svg>
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          lineHeight: "32px",
                        }}
                      >
                        Topic
                      </span>
                    </div>
                    <ul
                      hidden={topicSvg != "svg-rotate-up" ? true : false}
                      style={{ cursor: "default" }}
                    >
                      {topicList
                        .slice(0, topicShowMore)
                        .filter((item) => item[0] !== "javiertest")
                        .map((topic, index) => (
                          <li
                            key={topic[0]}
                            style={{ display: "flex", gap: "10px" }}
                          >
                            <input
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedTopics([
                                    ...selectedTopics,
                                    topic[0].toLowerCase(),
                                  ]);
                                } else {
                                  setSelectedTopics(
                                    selectedTopics.filter(
                                      (item) => item != topic[0].toLowerCase()
                                    )
                                  );
                                }
                              }}
                              style={{
                                cursor: "pointer",
                                margin: "5px 0 0 4px",
                              }}
                              id={`${topic[0]}-topic`}
                              className="checkBox"
                              type={"checkbox"}
                              tabIndex={"0"}
                            />
                            <label
                              style={{
                                cursor: "pointer",
                                lineHeight: "28px",
                                width: "149px",
                                flexGrow: "1",
                              }}
                              htmlFor={topic[0] + "-topic"}
                            >
                              {formatSentenceCase(topic[0])}
                            </label>
                            <span
                              className={"topic-count"}
                              style={{
                                color: "#727272",
                                marginLeft: "auto",
                                textAlign: "right",
                              }}
                            >
                              ({topic[1]})
                            </span>
                          </li>
                        ))}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          hidden={topicList.length <= topicShowMore}
                          onClick={() =>
                            topicShowMore > topicList.length
                              ? ""
                              : setTopicShowMore(topicShowMore + 5)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "16px",
                              lineHeight: "28px",
                            }}
                          >
                            <svg
                              style={{ paddingRight: "5px" }}
                              width="15"
                              height="12"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.45799 8.58301H6.99999V14.125C6.99999 14.562 7.35499 14.917 7.79199 14.917C8.22898 14.917 8.58398 14.562 8.58398 14.125V8.58301H14.126C14.563 8.58301 14.918 8.22801 14.918 7.79101C14.918 7.35401 14.563 6.99901 14.126 6.99901H8.58398V1.45701C8.58398 1.02001 8.22898 0.665009 7.79199 0.665009C7.35499 0.665009 6.99999 1.02001 6.99999 1.45701V6.99901H1.45799C1.02099 6.99901 0.665985 7.35401 0.665985 7.79101C0.665985 8.22801 1.02099 8.58301 1.45799 8.58301Z"
                                fill="black"
                              ></path>
                            </svg>
                            More
                          </div>
                        </button>
                        <button
                          hidden={!(topicShowMore > 5)}
                          onClick={() => setTopicShowMore(5)}
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "16px",
                              lineHeight: "28px",
                            }}
                          >
                            <svg
                              style={{ paddingRight: "5px" }}
                              width="12"
                              height="2"
                              viewBox="0 0 18 2"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43702 1.87499H16.438C16.956 1.87499 17.376 1.45499 17.376 0.936994C17.376 0.418994 16.956 -0.00100708 16.438 -0.00100708H1.43702C0.919023 -0.00100708 0.499023 0.418994 0.499023 0.936994C0.499023 1.45499 0.919023 1.87499 1.43702 1.87499V1.87499Z"
                                fill="black"
                              ></path>
                            </svg>
                            Show less
                          </div>
                        </button>
                      </div>
                    </ul>
                  </li>
                  <li
                    style={{ color: "#4B4B4B" }}
                    className="filter-publisher"
                    tabIndex={"0"}
                    onKeyDown={(e) => {
                      if (e.which === 13 && e.target.tagName === "LI") {
                        if (publisherSvg === "svg-rotate-up") {
                          setPublisherSvg("svg-rotate-down");
                        }
                        if (publisherSvg === "svg-rotate-down") {
                          setPublisherSvg("svg-rotate-up");
                        }
                      }
                    }}
                  >
                    <div
                      onClick={() => {
                        publisherSvg == "svg-rotate-up"
                          ? setPublisherSvg("svg-rotate-down")
                          : setPublisherSvg("svg-rotate-up");
                        setPublisherShowMore(5);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "10px 0px",
                      }}
                    >
                      <svg
                        style={{ margin: "9px 21px 9px 4px" }}
                        className={publisherSvg}
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        viewBox="0 0 20 12"
                      >
                        <path
                          fill="#4B4B4B"
                          d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"
                        />
                      </svg>
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          lineHeight: "32px",
                        }}
                      >
                        Publisher
                      </span>
                    </div>
                    <ul
                      hidden={publisherSvg != "svg-rotate-up" ? true : false}
                      style={{ cursor: "default" }}
                    >
                      {publisherList
                        .slice(0, publisherShowMore)
                        .map((publisher, index) => (
                          <li
                            key={publisher[0]}
                            style={{ display: "flex", gap: "10px" }}
                          >
                            <input
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedPublishers([
                                    ...selectedPublishers,
                                    publisher[0].toLowerCase(),
                                  ]);
                                } else {
                                  setSelectedPublishers(
                                    selectedPublishers.filter(
                                      (item) =>
                                        item != publisher[0].toLowerCase()
                                    )
                                  );
                                }
                              }}
                              style={{
                                cursor: "pointer",
                                margin: "5px 0 0 4px",
                              }}
                              id={`${publisher[0]}-publisher`}
                              className="checkBox"
                              type={"checkbox"}
                            />
                            <label
                              style={{
                                cursor: "pointer",
                                lineHeight: "28px",
                                width: "149px",
                                flexGrow: "1",
                              }}
                              htmlFor={publisher[0] + "-publisher"}
                            >
                              {formatTitleCase(publisher[0])}{" "}
                            </label>
                            <span
                              style={{
                                color: "#727272",
                                marginLeft: "auto",
                                textAlign: "right",
                              }}
                            >
                              ({publisher[1]})
                            </span>
                          </li>
                        ))}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          hidden={publisherList.length <= publisherShowMore}
                          onClick={() =>
                            publisherShowMore > publisherList.length
                              ? ""
                              : setPublisherShowMore(publisherShowMore + 5)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "16px",
                              lineHeight: "28px",
                            }}
                          >
                            <svg
                              style={{ paddingRight: "5px" }}
                              width="15"
                              height="12"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.45799 8.58301H6.99999V14.125C6.99999 14.562 7.35499 14.917 7.79199 14.917C8.22898 14.917 8.58398 14.562 8.58398 14.125V8.58301H14.126C14.563 8.58301 14.918 8.22801 14.918 7.79101C14.918 7.35401 14.563 6.99901 14.126 6.99901H8.58398V1.45701C8.58398 1.02001 8.22898 0.665009 7.79199 0.665009C7.35499 0.665009 6.99999 1.02001 6.99999 1.45701V6.99901H1.45799C1.02099 6.99901 0.665985 7.35401 0.665985 7.79101C0.665985 8.22801 1.02099 8.58301 1.45799 8.58301Z"
                                fill="black"
                              ></path>
                            </svg>
                            More
                          </div>
                        </button>
                        <button
                          hidden={!(publisherShowMore > 5)}
                          onClick={() => setPublisherShowMore(5)}
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "16px",
                              lineHeight: "28px",
                            }}
                          >
                            <svg
                              style={{ paddingRight: "5px" }}
                              width="12"
                              height="2"
                              viewBox="0 0 18 2"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43702 1.87499H16.438C16.956 1.87499 17.376 1.45499 17.376 0.936994C17.376 0.418994 16.956 -0.00100708 16.438 -0.00100708H1.43702C0.919023 -0.00100708 0.499023 0.418994 0.499023 0.936994C0.499023 1.45499 0.919023 1.87499 1.43702 1.87499V1.87499Z"
                                fill="black"
                              ></path>
                            </svg>
                            Show less
                          </div>
                        </button>
                      </div>
                    </ul>
                  </li>
                  <li
                    style={{ color: "#4B4B4B" }}
                    className="filter-format"
                    tabIndex={"0"}
                    onKeyDown={(e) => {
                      if (e.which === 13 && e.target.tagName === "LI") {
                        if (formatSvg === "svg-rotate-up") {
                          setFormatSvg("svg-rotate-down");
                        }
                        if (formatSvg === "svg-rotate-down") {
                          setFormatSvg("svg-rotate-up");
                        }
                      }
                    }}
                  >
                    <div
                      onClick={() => {
                        formatSvg == "svg-rotate-up"
                          ? setFormatSvg("svg-rotate-down")
                          : setFormatSvg("svg-rotate-up");
                        setFormatShowMore(5);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "10px 0px",
                      }}
                    >
                      <svg
                        style={{ margin: "9px 21px 9px 4px" }}
                        className={formatSvg}
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        viewBox="0 0 20 12"
                      >
                        <path
                          fill="#4B4B4B"
                          d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"
                        />
                      </svg>
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          lineHeight: "32px",
                        }}
                      >
                        Format
                      </span>
                    </div>
                    <ul hidden={formatSvg != "svg-rotate-up" ? true : false}>
                      {formatList
                        .slice(0, formatShowMore)
                        .map((format, index) => (
                          <li
                            key={format[0]}
                            style={{ display: "flex", gap: "10px" }}
                          >
                            <input
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedFormats([
                                    ...selectedFormats,
                                    format[0].toLowerCase(),
                                  ]);
                                } else {
                                  setSelectedFormats(
                                    selectedFormats.filter(
                                      (item) => item != format[0].toLowerCase()
                                    )
                                  );
                                }
                              }}
                              style={{
                                cursor: "pointer",
                                margin: "5px 0 0 4px",
                              }}
                              id={`${format[0]}-format`}
                              className="checkBox"
                              type={"checkbox"}
                            />
                            <label
                              style={{
                                cursor: "pointer",
                                lineHeight: "28px",
                                width: "149px",
                                flexGrow: "1",
                              }}
                              htmlFor={format[0] + "-format"}
                            >
                              {formatSentenceCase(format[0])}{" "}
                            </label>
                            <span
                              style={{
                                color: "#727272",
                                marginLeft: "auto",
                                textAlign: "right",
                              }}
                            >
                              ({format[1]})
                            </span>
                          </li>
                        ))}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          hidden={formatList.length <= formatShowMore}
                          onClick={() =>
                            formatShowMore > formatList.length
                              ? ""
                              : setFormatShowMore(formatShowMore + 5)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "16px",
                              lineHeight: "28px",
                            }}
                          >
                            <svg
                              style={{ paddingRight: "5px" }}
                              width="15"
                              height="12"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.45799 8.58301H6.99999V14.125C6.99999 14.562 7.35499 14.917 7.79199 14.917C8.22898 14.917 8.58398 14.562 8.58398 14.125V8.58301H14.126C14.563 8.58301 14.918 8.22801 14.918 7.79101C14.918 7.35401 14.563 6.99901 14.126 6.99901H8.58398V1.45701C8.58398 1.02001 8.22898 0.665009 7.79199 0.665009C7.35499 0.665009 6.99999 1.02001 6.99999 1.45701V6.99901H1.45799C1.02099 6.99901 0.665985 7.35401 0.665985 7.79101C0.665985 8.22801 1.02099 8.58301 1.45799 8.58301Z"
                                fill="black"
                              ></path>
                            </svg>
                            More
                          </div>
                        </button>
                        <button
                          hidden={!(formatShowMore > 5)}
                          onClick={() => setFormatShowMore(5)}
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "16px",
                              lineHeight: "28px",
                            }}
                          >
                            <svg
                              style={{ paddingRight: "5px" }}
                              width="12"
                              height="2"
                              viewBox="0 0 18 2"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43702 1.87499H16.438C16.956 1.87499 17.376 1.45499 17.376 0.936994C17.376 0.418994 16.956 -0.00100708 16.438 -0.00100708H1.43702C0.919023 -0.00100708 0.499023 0.418994 0.499023 0.936994C0.499023 1.45499 0.919023 1.87499 1.43702 1.87499V1.87499Z"
                                fill="black"
                              ></path>
                            </svg>
                            Show less
                          </div>
                        </button>
                      </div>
                    </ul>
                  </li>
                  <li
                    style={{ color: "#4B4B4B" }}
                    className="filter-tag"
                    tabIndex={"0"}
                    onKeyDown={(e) => {
                      if (e.which === 13 && e.target.tagName === "LI") {
                        if (tagSvg === "svg-rotate-up") {
                          setTagSvg("svg-rotate-down");
                        }
                        if (tagSvg === "svg-rotate-down") {
                          setTagSvg("svg-rotate-up");
                        }
                      }
                    }}
                  >
                    <div
                      onClick={() => {
                        tagSvg == "svg-rotate-up"
                          ? setTagSvg("svg-rotate-down")
                          : setTagSvg("svg-rotate-up");
                        setTagShowMore(5);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        margin: "10px 0px",
                      }}
                    >
                      <svg
                        style={{ margin: "9px 21px 9px 4px" }}
                        className={tagSvg}
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        viewBox="0 0 20 12"
                      >
                        <path
                          fill="#4B4B4B"
                          d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"
                        />
                      </svg>
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "bold",
                          lineHeight: "32px",
                        }}
                      >
                        Tag
                      </span>
                    </div>
                    <ul hidden={tagSvg != "svg-rotate-up" ? true : false}>
                      {tagList.slice(0, tagShowMore).map((tag, index) => (
                        <li
                          key={tag[0]}
                          style={{ display: "flex", gap: "10px" }}
                        >
                          <input
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedTags([...selectedTags, tag[0]]);
                              } else {
                                setSelectedTags(
                                  selectedTags.filter((item) => item != tag[0])
                                );
                              }
                            }}
                            style={{
                              cursor: "pointer",
                              margin: "5px 10px 5px 4px",
                            }}
                            id={`${tag[0]}-tag`}
                            className="checkBox"
                            type={"checkbox"}
                          />
                          <label
                            style={{
                              cursor: "pointer",
                              lineHeight: "28px",
                              width: "149px",
                              flexGrow: "1",
                            }}
                            htmlFor={tag[0] + "-tag"}
                          >
                            {formatSentenceCase(tag[0])}{" "}
                          </label>
                          <span
                            style={{
                              color: "#727272",
                              marginLeft: "auto",
                              textAlign: "right",
                            }}
                          >
                            ({tag[1]})
                          </span>
                        </li>
                      ))}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          hidden={tagList.length <= tagShowMore}
                          onClick={() =>
                            tagShowMore > tagList.length
                              ? ""
                              : setTagShowMore(tagShowMore + 5)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "16px",
                              lineHeight: "28px",
                            }}
                          >
                            <svg
                              style={{ paddingRight: "5px" }}
                              width="15"
                              height="12"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.45799 8.58301H6.99999V14.125C6.99999 14.562 7.35499 14.917 7.79199 14.917C8.22898 14.917 8.58398 14.562 8.58398 14.125V8.58301H14.126C14.563 8.58301 14.918 8.22801 14.918 7.79101C14.918 7.35401 14.563 6.99901 14.126 6.99901H8.58398V1.45701C8.58398 1.02001 8.22898 0.665009 7.79199 0.665009C7.35499 0.665009 6.99999 1.02001 6.99999 1.45701V6.99901H1.45799C1.02099 6.99901 0.665985 7.35401 0.665985 7.79101C0.665985 8.22801 1.02099 8.58301 1.45799 8.58301Z"
                                fill="black"
                              ></path>
                            </svg>
                            More
                          </div>
                        </button>
                        <button
                          hidden={!(tagShowMore > 5)}
                          onClick={() => setTagShowMore(5)}
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "16px",
                              lineHeight: "28px",
                            }}
                          >
                            <svg
                              style={{ paddingRight: "5px" }}
                              width="12"
                              height="2"
                              viewBox="0 0 18 2"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.43702 1.87499H16.438C16.956 1.87499 17.376 1.45499 17.376 0.936994C17.376 0.418994 16.956 -0.00100708 16.438 -0.00100708H1.43702C0.919023 -0.00100708 0.499023 0.418994 0.499023 0.936994C0.499023 1.45499 0.919023 1.87499 1.43702 1.87499V1.87499Z"
                                fill="black"
                              ></path>
                            </svg>
                            Show less
                          </div>
                        </button>
                      </div>
                    </ul>
                  </li>
                </ul>
                <button
                  onClick={async () => {
                    let checkBoxes = Array.from(
                      document.getElementsByClassName("checkBox")
                    );
                    checkBoxes.forEach((checkBox) => {
                      checkBox.checked = false;
                    });
                    setReset(true);
                    await resetSearch();
                    setReset(false);
                  }}
                  style={{
                    border: "1px solid #727272",
                    borderRadius: "4px",
                    height: "48px",
                    padding: "8px 16px",
                    cursor: "pointer",
                    width: "82px",
                  }}
                >
                  Reset
                </button>
              </nav>
            </div>
          </div>
          <div className="cagov-content content-cell">
            <div className={"mobile-content"}>
              <h1
                style={{
                  marginTop: 0,
                  color: "#034A6B",
                  fontSize: "47px",
                  lineHeight: "58.8px",
                }}
              >
                {areObjectKeysEmpty(dataState.parameters)
                  ? "All datasets"
                  : "Search results"}
              </h1>
              <div className="search-container grid-search">
                <form className="site-search" action="/datasets">
                  <span className="sr-only" id="SearchInputMobile">
                    Dataset search
                  </span>
                  <span style={{ display: "flex" }}>
                    <input
                      type="text"
                      id="qMobile"
                      name="qMobile"
                      aria-labelledby="SearchInputMobile"
                      placeholder="Search datasets"
                      className="search-textfield"
                      defaultValue={dataState.parameters.q}
                    />
                    <button
                      style={{
                        outlineOffset: -2,
                        right: "53px",
                        backgroundColor: "var(--primary-color, #046A99)",
                        border: "1px solid var(--primary-color, #046A99)",
                        borderRadius: "0px 4px 4px 0px",
                        padding: "8px 14px",
                        position: "relative",
                        backgroundColor: "#034A6B",
                        display: "flex",
                        alignItems: "center",
                        width: "55px",
                      }}
                      className="search-submit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 17 17"
                        viewBox="0 0 17 17"
                        style={{ width: "23.43px", backgroundColor: "#034A6B" }}
                      >
                        <path
                          fill="#fff"
                          d="M16.4 15.2l-4-4c2-2.6 1.8-6.5-.6-8.9-1.3-1.3-3-2-4.8-2s-3.5.7-4.8 2c-2.6 2.6-2.6 6.9 0 9.6 1.3 1.3 3 2 4.8 2 1.4 0 2.9-.5 4.1-1.4l4.1 4c.2.2.4.3.7.3.2 0 .5-.1.7-.3.1-.3.1-.9-.2-1.3zM7 12c-1.3 0-2.6-.5-3.5-1.4-1.9-1.9-1.9-5.1 0-7 .9-.9 2.1-1.5 3.5-1.5s2.6.5 3.5 1.4 1.4 2.2 1.4 3.5-.5 2.6-1.4 3.5c-1 1-2.2 1.5-3.5 1.5z"
                        ></path>
                      </svg>
                      <span className="sr-only">Submit</span>
                    </button>
                  </span>
                </form>
              </div>
            </div>
            <div className="filter-sort">
              <form
                id="sortresults"
                method="GET"
                action="/datasets"
                name="sort"
              >
                <input
                  type="hidden"
                  name="q"
                  value={dataState.parameters.q}
                ></input>
                <input
                  type="hidden"
                  name="topic"
                  value={dataState.parameters.topic}
                ></input>
                <input
                  type="hidden"
                  name="publisher"
                  value={dataState.parameters.publisher}
                ></input>
                <input
                  type="hidden"
                  name="tag"
                  value={dataState.parameters.tag}
                ></input>
                <input
                  type="hidden"
                  name="format"
                  value={dataState.parameters.format}
                ></input>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label
                    htmlFor="sortresults"
                    style={{ fontSize: "18px", lineHeight: "32px" }}
                  >
                    Sort by
                  </label>
                  <BasicSelect submit={submit} />
                </div>
              </form>
            </div>
            <div>
              <h2>
                {dataState.matches > 1
                  ? dataState.matches + " datasets"
                  : dataState.matches + " dataset"}{" "}
              </h2>
            </div>
            <SearchResultListing dataState={dataState} />
          </div>
        </article>
      </main>
    </>
  );
};
export default Results;
