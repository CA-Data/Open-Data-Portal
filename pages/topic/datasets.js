import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import BasicSelect from '../../components/BasicSelect';
export async function getServerSideProps(context) {
  return getFormattedData(context);
}

const getFormattedData = async (context) => {
  var apirequest = "https://test-data.technology.ca.gov/api/3/action/package_search?q=" + context.query.q;
  var thereWasAFilter = 0; // flag, did user select any filter?
  if ('topic' in context.query && context.query.topic.length > 0) {
    let groups = context.query.topic.split(',');
    let formattedGroupString = '';
    for (let i = 0; i < groups.length; i++) {
      if (groups[i + 1]) {
        if (groups[i] == "health and human services") {
          formattedGroupString += groups[i].replace(/ and/g, '').replace(/ /g, '-') + "%20AND%20";
        }
        else {
          formattedGroupString += groups[i].replace(/ /g, '-') + "%20AND%20";
        }
      }
      else {
        if (groups[i] == "health and human services") {
          formattedGroupString += groups[i].replace(/ and/g, '').replace(/ /g, '-') + ")";
        }
        else {
          formattedGroupString += groups[i].replace(/ /g, '-') + ")";
        }
      }
    }
    apirequest += thereWasAFilter ? "%20AND%20" : "&fq=";
    apirequest += "groups:(" + formattedGroupString;
    thereWasAFilter = 1;
  }
  if ('publisher' in context.query && context.query.publisher.length > 0) {
    let organizations = context.query.publisher.split(',');
    let formattedOrganizationsString = '';
    for (let i = 0; i < organizations.length; i++) {
      if (organizations[i + 1]) {
        formattedOrganizationsString += organizations[i].replace(/ /g, '-') + "%20AND%20";
      }
      else {
        formattedOrganizationsString += organizations[i].replace(/ /g, '-') + ")";
      }
    }
    apirequest += thereWasAFilter ? "%20AND%20" : "&fq=";
    apirequest += "organization:(" + formattedOrganizationsString;
    thereWasAFilter = 1;
  }

  if ('format' in context.query && context.query.format.length > 0) {
    let filters = context.query.format.split(',');
    let formattedFormatString = '';
    for (let i = 0; i < filters.length; i++) {
      if (filters[i + 1]) {
        formattedFormatString += filters[i].replace(/ /g, '-').toUpperCase() + "%20AND%20";
      }
      else {
        formattedFormatString += filters[i].replace(/ /g, '-').toUpperCase() + ")";
      }
    }
    apirequest += thereWasAFilter ? "%20AND%20" : "&fq=";
    apirequest += "res_format:(" + formattedFormatString;
    thereWasAFilter = 1;
  }

  if ('tag' in context.query && context.query.tag.length > 0) {
    let tags = context.query.tag.split(',');
    let formattedTagString = '';
    for (let i = 0; i < tags.length; i++) {
      if (tags[i + 1]) {
        formattedTagString += "\"" + tags[i] + "\"%20AND%20";
      }
      else {
        formattedTagString += "\"" + tags[i] + "\")";
      }
    }
    apirequest += thereWasAFilter ? "%20AND%20" : "&fq=";
    apirequest += "tags:(" + formattedTagString;
    thereWasAFilter = 1;
  }

  if ('sort' in context.query) {
    apirequest += "&sort=" + context.query.sort;
  }

  /* Topic ------------------------------------------------------------------------------------------------------------------------ */
  const popularDatasets = [];
  var topicDisplayName = "";
  var topicDescription = "";
  var topicIcn = "";
  const topicIconArray = {
    "covid-19": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><style>.prefix__f{fill:#046a99}</style></defs><path fill="#fff" id="prefix__b" d="M1 1H49V49H1z"/><g id="prefix__c"><path d="M49 23.2v3.6c0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8h-3.7c-.4 3.3-1.7 6.3-3.6 8.8l2.6 2.6a1.8 1.8 0 0 1 2.5 2.5l-2.5 2.5a1.8 1.8 0 0 1-2.6-2.5l-2.6-2.6c-2.4 2-5.4 3.2-8.7 3.6v3.7c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8h-3.6c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8v-3.7c-3.3-.4-6.3-1.7-8.7-3.6l-2.7 2.6a1.8 1.8 0 0 1-2.5 2.5l-2.6-2.5A1.8 1.8 0 0 1 9.3 38l2.6-2.6c-2-2.5-3.3-5.4-3.6-8.7H4.6c0 1-.8 1.8-1.8 1.8S1 27.8 1 26.8v-3.6c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8h3.7a17 17 0 0 1 3.6-8.7l-2.6-2.6c-.7.6-1.9.6-2.6 0s-.7-2 0-2.6l2.6-2.5a1.8 1.8 0 0 1 2.5 2.5l2.6 2.6c2.5-2 5.4-3.2 8.7-3.6V4.6c-1 0-1.7-.8-1.7-1.8S22.2 1 23.2 1h3.6c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8v3.7c3.3.3 6.3 1.7 8.7 3.6l2.6-2.6c-.7-.7-.7-1.8 0-2.5s1.9-.7 2.6 0l2.5 2.5a1.8 1.8 0 0 1-2.5 2.6L38 14.3c2 2.5 3.3 5.5 3.7 8.8h3.7c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8ZM37 25a12 12 0 1 0-24 0 12 12 0 0 0 24 0Z" fill="#046a99" opacity=".5"/><circle className="prefix__f" cx="16.6" cy="25" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="29.2" cy="17.8" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="20.8" cy="17.8" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="20.8" cy="32.2" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="25" cy="25" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="33.4" cy="25" r="2.4" fill="#046a99"/><circle className="prefix__f" cx="29.2" cy="32.2" r="2.4" fill="#046a99"/></g></svg>`,
    "economy-and-demographics": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="#fff" d="M1 1H49V49H1z"/><g fill="#046a99"><path opacity=".5" d="M19.4 8.2 2.6 25 5.5 28 19.4 14.1 44.6 39 47.6 36.1 19.4 8.2z"/><path d="M28.5 31.2 19.4 22 2.6 38.8 5.5 41.8 19.4 27.9 28.7 37.3 47.4 16.3 44.3 13.5 28.5 31.2z"/></g></svg>`,
    "government": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><defs><style>.prefix__f{fill:#046a99}</style></defs><path fill="#fff" id="prefix__b" d="M1 1H49V49H1z"/><g id="prefix__c"><path d="M45 41.8H5v4.3h40v-4.3Zm-20-33 11 5.7H14l11-5.8M25 4 5 14.5v4.2h40v-4.2L25 3.9Z" fill="#046a99" opacity=".5"/><path className="prefix__f" d="M10.3 22.9H14.5V37.6H10.3z" fill="#046a99"/><path className="prefix__f" d="M22.9 22.9H27.1V37.6H22.9z" fill="#046a99"/><path className="prefix__f" d="M35.6 22.9H39.8V37.6H35.6z" fill="#046a99"/></g></svg>`,
    "health-human-services": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="#fff" d="M1 1H49V49H1z"/><g fill="#046a99"><path d="M25 1.2 6 8.4v14.4c0 12 8.2 23.2 19 26 11-2.8 19-14 19-26V8.4L25 1.2Zm14.3 21.6c0 9.5-6 18.3-14.2 21a22.2 22.2 0 0 1-14.3-21V11.7l14.3-5.4 14.2 5.4v11.1Z" opacity=".5"/><path d="M22 32.8h6.1v-6h6v-6h-6v-6h-6v6h-6v6h6v6Z"/></g></svg>`,
    "natural-resources": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="#fff" d="M1 1H49V49H1z"/><g fill="#046a99"><path d="M25 6a19 19 0 0 0-14.7 31L6 41l2.8 3 4.2-4.3a19 19 0 0 0 31-14.8V6H25Zm15 19a14.8 14.8 0 0 1-15 15 15 15 0 0 1 0-30h15v15Z" opacity=".5"/><path d="m18.3 26.6 7.9.5-5.5 7a1 1 0 0 0 .1 1.4c.4.4 1 .4 1.5 0l10.5-9.7c.9-.8.3-2.3-.9-2.4l-8-.5 5.5-7c.3-.4.3-1 0-1.4a1 1 0 0 0-1.6 0l-10.5 9.7c-.9.8-.3 2.3 1 2.4Z"/></g></svg>`,
    "transportation": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="#fff" d="M1 1H49V49H1z"/><g fill="#046a99"><path d="M45.2 19.5c-.3-1-1.2-1.6-2.3-1.6H26c-1 0-2 .7-2.3 1.6l-3.3 9.7v13c0 .8.7 1.6 1.6 1.6h1.5c.9 0 1.6-.9 1.6-1.8v-2.9h18.8v3c0 .8.7 1.7 1.6 1.7h1.4c.9 0 1.6-.8 1.6-1.7V29.2l-3.3-9.7Zm-19.2.8h17l2.3 7H23.6l2.4-7Zm-1 14.1c-1.2 0-2.3-1-2.3-2.4s1-2.3 2.4-2.3 2.3 1 2.3 2.3-1 2.4-2.3 2.4Zm18.9 0c-1.3 0-2.4-1-2.4-2.4s1-2.3 2.4-2.3 2.3 1 2.3 2.3-1 2.4-2.3 2.4Z"/><path d="M25 6.2H8.7a7 7 0 0 0-7 7v18.9a7 7 0 0 0 7 7l-2.3 2.3v2.4h2.3l4.7-4.7H18V27.3H6.3V11h21.1v4.7h4.7v-2.4a7 7 0 0 0-7-7ZM8.7 29.7c1.3 0 2.4 1 2.4 2.4s-1.1 2.3-2.4 2.3a2.4 2.4 0 0 1 0-4.7Z" opacity=".5"/></g></svg>`,
    "water": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><path fill="#fff" d="M1 1H49V49H1z"/><g fill="#046a99"><path d="M35 35a12 12 0 0 0-5.8 1.6c-1.3.6-2.4 1.2-4.1 1.2s-2.8-.5-4.1-1.2c-1.5-.8-3.2-1.6-6-1.6s-4.3.8-5.8 1.6c-1.3.6-2.4 1.2-4.1 1.2v3.9A12 12 0 0 0 11 40c1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6s4.4-.9 5.9-1.6c1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6v-4c-1.8 0-2.8-.4-4.1-1.1a12 12 0 0 0-6-1.6Zm0-9c-2.6 0-4.3 1-5.8 1.7-1.3.6-2.4 1.2-4.1 1.2s-2.8-.5-4.1-1.2c-1.5-.8-3.2-1.6-6-1.6s-4.3.8-5.8 1.6c-1.3.6-2.4 1.2-4.1 1.2v3.9c2.7 0 4.4-.9 5.9-1.6a7.6 7.6 0 0 1 8.2 0c1.5.7 3.1 1.6 5.9 1.6s4.4-.9 5.9-1.6a7.6 7.6 0 0 1 8.2 0c1.5.7 3.1 1.6 5.9 1.6v-4c-1.8 0-2.8-.4-4.1-1.1a12 12 0 0 0-6-1.6Zm6-16a11.8 11.8 0 0 0-11.8 0c-1.3.6-2.4 1.1-4.1 1.1s-2.8-.5-4.1-1.2c-1.5-.7-3.2-1.6-6-1.6s-4.3.9-5.8 1.6c-1.3.7-2.4 1.2-4.1 1.2V15c2.7 0 4.4-.9 5.9-1.6 1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6s4.4-.9 5.9-1.6c1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6v-4a8 8 0 0 1-4.1-1Z" opacity=".5"/><path d="M35 17.2c-2.6 0-4.3.8-5.8 1.6a7.6 7.6 0 0 1-8.2 0c-1.5-.8-3.2-1.6-6-1.6s-4.3.8-5.8 1.6A7.6 7.6 0 0 1 5 20v3.9c2.7 0 4.4-.9 5.9-1.6 1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6s4.4-.9 5.9-1.6c1.3-.7 2.3-1.2 4-1.2s2.9.5 4.2 1.2c1.5.7 3.1 1.6 5.9 1.6v-4c-1.8 0-2.8-.4-4.1-1.1a12 12 0 0 0-6-1.6Z"/></g></svg>`
  };

  if (context.query.topic && topicIconArray[context.query.topic]) {
    var apireqtopic = "https://test-data.technology.ca.gov/api/3/action/package_search?rows=3&fq=groups:(" + context.query.topic + ")&sort=views_recent desc";
    const responsetopic = await fetch(apireqtopic, { headers: { 'User-Agent': 'NextGenAPI/0.0.1', } }).then((responsetopic) => responsetopic.json());
    //console.log(apireqtopic);
    //console.log(responsetopic);
    for (let index = 0; index < responsetopic.result.results.length; index++) {
      const dataset = {};
      dataset.name = responsetopic.result.results[index].name;
      dataset.title = responsetopic.result.results[index].title;
      dataset.organization = responsetopic.result.results[index].organization.title;
      var apireqdataset = "https://test-data.technology.ca.gov/api/3/action/package_show?name_or_id=" + dataset.name + "&include_tracking=true";
      const responseDataset = await fetch(apireqdataset, { headers: { 'User-Agent': 'NextGenAPI/0.0.1', } }).then((responseDataset) => responseDataset.json());
      dataset.views = responseDataset.result.tracking_summary.recent;
      popularDatasets.push(dataset);
    }
    // get display name and description
    for (let index = 0; index < responsetopic.result.results[0].groups.length; index++) {
      if (context.query.topic == responsetopic.result.results[0].groups[index].name) {
        topicDisplayName = responsetopic.result.results[0].groups[index].display_name;
        topicDescription = responsetopic.result.results[0].groups[index].description;
      }
    }

    topicIcn = topicIconArray[context.query.topic];
  }

  /* Topic End ------------------------------------------------------------------------------------------------------------------------ */


  //pages
  const pageData = {}

  const page = ('page' in context.query) ? parseInt(context.query.page) : 0;

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
  apirequest += "&start=" + (page * 10);

  //[0]previous, [1]current, [2]next, [3]total, [4]next 

  const response = await fetch(apirequest, { headers: { 'User-Agent': 'NextGenAPI/0.0.1', } }).then((response) => response.json());

  pageData["total"].value = Math.ceil(parseInt(response.result.count) / 10);

  if (pageData["next"].value >= pageData["total"].value) {
    pageData["next"].display = "none";
  }

  // Getting Filters

  const filters = await fetch(`https://test-data.technology.ca.gov/api/3/action/package_search?${apirequest.split('?')[1]}&facet.field=["groups","tags","organization","res_format"]&rows=0`, { headers: { 'User-Agent': 'NextGenAPI/0.0.1', } }).then(response => response.json()).catch(error => console.log(error))

  //search results
  const resultsArray = []
  if (response.result.results.length > 0) {
    for (let index = 0; index < response.result.results.length; index++) {
      const dataset = {}
      dataset.formats = []
      dataset.name = response.result.results[index].name
      dataset.title = response.result.results[index].title

      dataset.organization = response.result.results[index].organization.title


      const date_updated = new Date(response.result.results[index].metadata_modified);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const metadata_modified = date_updated.toLocaleDateString('en-EN', options)

      dataset.updated = metadata_modified

      dataset.notes = response.result.results[index].notes.replace(/\<.*?\>|__/g, '')

      if (response.result.results[index].resources.length > 0) {
        const resource = response.result.results[index].resources
        for (let index = 0; index < resource.length; index++) {

          var resource_type = resource[index].format.toUpperCase()
          if (!dataset.formats.includes(resource_type)) {
            if (resource_type.length > 0) {
              dataset.formats.push(resource_type)
            }
          }
        }
      }
      resultsArray.push(dataset)
    }
  }


  return {
    props: {
      matches: response.result.count,
      allResults: resultsArray,
      parameters: context.query,
      pages: pageData,
      filters: filters,
      /* Topic ------------------------------------------------------------------------------------------------------------------------ */
      popularDatasets: popularDatasets,
      topicDisplayName: topicDisplayName,
      topicDescription: topicDescription,
      topicIcn: topicIcn
    },
  };
}


const Results = (data) => {
  const [topicSvg, setTopicSvg] = useState('svg-rotate-up');
  const [publisherSvg, setPublisherSvg] = useState('svg-rotate-down');
  const [formatSvg, setFormatSvg] = useState('svg-rotate-down');
  const [tagSvg, setTagSvg] = useState('svg-rotate-down');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedPublishers, setSelectedPublishers] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [selectedtags, setSelectedTags] = useState([]);
  const [reset, setReset] = useState(false);
  const [topicList, setTopicList] = useState(Object.entries(data.filters.result.facets.groups).sort((a, b) => a[1] > b[1] ? -1 : 1));
  const [publisherList, setPublisherList] = useState(Object.entries(data.filters.result.facets.organization).sort((a, b) => a[1] > b[1] ? -1 : 1));
  const [tagList, setTagList] = useState(Object.entries(data.filters.result.facets.tags).sort((a, b) => a[1] > b[1] ? -1 : 1));
  const [formatList, setFormatList] = useState(Object.entries(data.filters.result.facets.res_format).sort((a, b) => a[1] > b[1] ? -1 : 1));
  const [dataState, setDataState] = useState(data);
  const [topicShowMore, setTopicShowMore] = useState(5);
  const [publisherShowMore, setPublisherShowMore] = useState(5);
  const [tagShowMore, setTagShowMore] = useState(5);
  const [formatShowMore, setFormatShowMore] = useState(5);
  const router = useRouter();
  if (typeof window === 'object') {
    // Check if document is finally loaded
    document.addEventListener("DOMContentLoaded", function () {
      if (parseInt(dataState.pages["next"].value) > parseInt(dataState.pages["total"].value)) {
        document.querySelectorAll('.page-next')[0].style.display = 'none';
        document.querySelectorAll('.page-next')[1].style.display = 'none';
      }
    });
  }

  const submit = (event) => {
    if (!router.query.sort) {
      router.push(router.asPath + "&sort=" + event, null, { shallow: true })
    }
    else {
      let newPath = router.asPath.split('&');
      let index = newPath.findIndex(item => item.includes('sort'));
      newPath.splice(index, 1, "sort=" + event);
      newPath = newPath.join('&');
      router.push(newPath, null, { shallow: true });
    }
  };
  var urlParamTopic = (dataState.parameters.topic) ? "&topic=" + dataState.parameters.topic : "";
  var urlParamPublisher = (dataState.parameters.publisher) ? "&publisher=" + dataState.parameters.publisher : "";
  var urlParamFormat = (dataState.parameters.format) ? "&format=" + dataState.parameters.format : "";
  var urlParamTag = (dataState.parameters.tag) ? "&tag=" + dataState.parameters.tag : "";
  var urlParamSort = (dataState.parameters.sort) ? "&sort=" + dataState.parameters.sort : "";

  // UseEffects will fire when its corresponding array is updated. 
  // Arrays can be updated by user input -> (selectedTopics,selectedPublishers,selectedFormats,selectedtags)
  // Each array will append a value to the url
  useEffect(() => {
    getFormattedData(router).then(response => setDataState(response.props));
  }, [router])

  useEffect(() => {
    setTopicList(Object.entries(dataState.filters.result.facets.groups).sort((a, b) => a[1] > b[1] ? -1 : 1))
    setPublisherList(Object.entries(dataState.filters.result.facets.organization).sort((a, b) => a[1] > b[1] ? -1 : 1))
    setTagList(Object.entries(dataState.filters.result.facets.tags).sort((a, b) => a[1] > b[1] ? -1 : 1))
    setFormatList(Object.entries(dataState.filters.result.facets.res_format).sort((a, b) => a[1] > b[1] ? -1 : 1))
  }, [dataState])

  useEffect(() => {
    if (!reset) {

      const url = new URL(window.location.href);
      if (selectedTopics.length == 0 || !url.searchParams.get('topic')) {
        url.searchParams.delete('topic')
        router.push(url, null, { shallow: true });
      }
      if (selectedTopics.length >= 1) {
        url.searchParams.set('topic', selectedTopics)
        router.push(url, null, { shallow: true });
      }
    }
  }, [selectedTopics])

  useEffect(() => {
    if (!reset) {
      const url = new URL(window.location.href);
      if (selectedPublishers.length == 0 || !url.searchParams.get('publisher')) {
        url.searchParams.delete('publisher')
        router.push(url, null, { shallow: true });
      }
      if (selectedPublishers.length >= 1) {
        url.searchParams.set('publisher', selectedPublishers)
        router.push(url, null, { shallow: true });
      }
    }
  }, [selectedPublishers])

  useEffect(() => {
    if (!reset) {
      const url = new URL(window.location.href);
      if (selectedFormats.length == 0 || !url.searchParams.get('format')) {
        url.searchParams.delete('format')
        router.push(url, null, { shallow: true });
      }
      if (selectedFormats.length >= 1) {
        url.searchParams.set('format', selectedFormats)
        router.push(url, null, { shallow: true });
      }
    }
  }, [selectedFormats])

  useEffect(() => {
    if (!reset) {
      const url = new URL(window.location.href);
      if (selectedtags.length == 0 || !url.searchParams.get('tag')) {
        url.searchParams.delete('tag')
        router.push(url, null, { shallow: true });
      }
      if (selectedtags.length >= 1) {
        url.searchParams.set('tag', selectedtags)
        router.push(url, null, { shallow: true });
      }
    }
  }, [selectedtags])

  // Persist selected checkboxes on page refresh
  useEffect(() => {
    let url = new URL(window.location.href);
    let checkboxes = Array.from(document.getElementsByClassName('checkBox'));

    // Get URL params
    const topicParams = url.searchParams?.get('topic');
    const publisherParams = url.searchParams?.get('publisher');
    const formatParams = url.searchParams?.get('format');
    const tagParams = url.searchParams?.get('tag');
    const toBeChecked = {};
    toBeChecked.topic = topicParams?.split(',');
    toBeChecked.publisher = publisherParams?.split(',');
    toBeChecked.format = formatParams?.split(',');
    toBeChecked.tag = tagParams?.split(',');

    // Set local state from params
    topicParams ? setSelectedTopics(topicParams.split(',')) : null;
    publisherParams ? setSelectedPublishers(publisherParams.split(',')) : null;
    formatParams ? setSelectedFormats(formatParams.split(',')) : null;
    tagParams ? setSelectedTags(tagParams.split(',')) : null;

    // Loop through checkboxes 
    checkboxes.forEach(checkbox => {
      const formatting = checkbox?.id.split('-');
      const filter = formatting.pop();
      const checkboxId = formatting.join('-');
      toBeChecked[filter]?.forEach(item => {
        switch (filter) {
          case 'topic':
            if (topicSvg === 'svg-rotate-down') {
              setTopicSvg('svg-rotate-up');
            }
            break;
          case 'publisher':
            if (publisherSvg === 'svg-rotate-down') {
              setPublisherSvg('svg-rotate-up');
            }
            break;
          case 'format':
            if (formatSvg === 'svg-rotate-down') {
              setFormatSvg('svg-rotate-up');
            }
            break;
          case 'tag':
            if (tagSvg === 'svg-rotate-down') {
              setTagSvg('svg-rotate-up');
            }
            break;
          default:
            return null;
        }
        if (item === checkboxId.toLowerCase()) {
          checkbox.checked = true;
        }
      })
    });
  }, []);

  // End of UseEffect section **********************************************

  const areObjectKeysEmpty = (obj) => {
    for (var key in obj) {
      if (obj[key] !== null && obj[key] != "")
        return false;
    }
    return true;
  }

  // resetSearch resets the page
  const resetSearch = async () => {
    setFormatSvg('svg-rotate-down');       // resets any dropdowns to default state
    setPublisherSvg('svg-rotate-down');    // *
    setTagSvg('svg-rotate-down');          // *
    setTopicSvg('svg-rotate-up');          // *
    setSelectedTopics([]);                 // resets useState arrays
    setSelectedPublishers([]);             // *
    setSelectedFormats([]);                // *
    setSelectedTags([]);                   // *
    setTopicShowMore(5);                   // *
    setPublisherShowMore(5);               // *
    setTagShowMore(5);                     // *
    setFormatShowMore(5);                  // *
    router.push('?q=', null, { shallow: true });                    // and resets search results
  }

  const formatSentenceCase = (str) => {
    if (str.includes('covid')) {
      return 'COVID-19';
    }

    let tempStr = str.charAt(0).toUpperCase().concat(str.substring(1)).replace(/-/g, ' ');
    return tempStr;
  }

  const formatTitleCase = (str) => {
    const tempStr = str.charAt(0).toUpperCase().concat(str.substring(1)).replace(/-/g, ' ');
    const words = tempStr.split(" ");

    for (let i = 0; i < words.length; i++) {
      if (words[i] !== 'of' && words[i] !== 'and') {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
    }
    return words.join(" ");
  }

  return (
    <>
      <main id="body-content" className="cagov-main">
        <article
          id="post-design"
          className="cagov-article with-sidebar with-page-nav results-page"
        >
          <div
            className="sidebar-container everylayout sidebar-cell"
            style={{ marginTop: '130px' }}
          >
            <div className="sidebar" space="0" side="left">
              <nav aria-labelledby="page-navigation-label">
                <div id="page-navigation-label" className="label">
                  <strong style={{ fontSize: '24px' }}>Filter by</strong>
                </div>
                <ul className="search-filters align">
                  <li style={{ color: "#4B4B4B" }} className="filter-topic">
                    <div onClick={() => { topicSvg == 'svg-rotate-up' ? setTopicSvg('svg-rotate-down') : setTopicSvg('svg-rotate-up'); setTopicShowMore(5) }} style={{ display: 'flex', alignItems: 'center', margin: '10px 0px' }}>
                      <svg style={{ margin: '9px 21px 9px 4px' }} className={topicSvg} xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 20 12"><path fill="#4B4B4B" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z" /></svg>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: '32px' }}>Topic</span>
                    </div>
                    <ul hidden={topicSvg != 'svg-rotate-up' ? true : false} style={{ cursor: 'default' }}>
                      {topicList.slice(0, topicShowMore).map((topic, index) => (
                        <li key={topic[0]} style={{ display: 'flex', gap: '10px' }}>
                          <input onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTopics([...selectedTopics, topic[0].toLowerCase()])
                            }
                            else {
                              setSelectedTopics(selectedTopics.filter(item => item != topic[0].toLowerCase()))
                            }
                          }} style={{ cursor: 'pointer', margin: '5px 10px 5px 4px' }} id={`${topic[0]}-topic`} className='checkBox' type={'checkbox'} />
                          <label style={{ cursor: 'pointer', lineHeight: '28px', width: '149px', flexGrow: '1' }} htmlFor={topic[0]}>{formatSentenceCase(topic[0])}</label><span className={'topic-count'} style={{ color: '#727272', flexGrow: '1', textAlign: 'right' }}>({topic[1]})</span>
                        </li>
                      ))}
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button hidden={topicList.length <= topicShowMore} onClick={() => topicShowMore > topicList.length ? '' : setTopicShowMore(topicShowMore + 5)} style={{ cursor: 'pointer' }}>
                          <div style={{ display: 'flex', alignItems: 'center', lineHeight: '28px' }}>
                            <svg style={{ paddingRight: '5px' }} width="15" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.45799 8.58301H6.99999V14.125C6.99999 14.562 7.35499 14.917 7.79199 14.917C8.22898 14.917 8.58398 14.562 8.58398 14.125V8.58301H14.126C14.563 8.58301 14.918 8.22801 14.918 7.79101C14.918 7.35401 14.563 6.99901 14.126 6.99901H8.58398V1.45701C8.58398 1.02001 8.22898 0.665009 7.79199 0.665009C7.35499 0.665009 6.99999 1.02001 6.99999 1.45701V6.99901H1.45799C1.02099 6.99901 0.665985 7.35401 0.665985 7.79101C0.665985 8.22801 1.02099 8.58301 1.45799 8.58301Z" fill="black"></path></svg>
                            More
                          </div>
                        </button>
                        <button hidden={!(topicShowMore > 5)} onClick={() => setTopicShowMore(5)} style={{ cursor: 'pointer' }}>
                          <div style={{ display: 'flex', alignItems: 'center', lineHeight: '28px' }}>
                            <svg style={{ paddingRight: '5px' }} width="12" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.43702 1.87499H16.438C16.956 1.87499 17.376 1.45499 17.376 0.936994C17.376 0.418994 16.956 -0.00100708 16.438 -0.00100708H1.43702C0.919023 -0.00100708 0.499023 0.418994 0.499023 0.936994C0.499023 1.45499 0.919023 1.87499 1.43702 1.87499V1.87499Z" fill="black"></path></svg>
                            Show less
                          </div>
                        </button>
                      </div>
                    </ul>
                  </li>
                  <li style={{ color: "#4B4B4B" }} className="filter-publisher">
                    <div onClick={() => { publisherSvg == 'svg-rotate-up' ? setPublisherSvg('svg-rotate-down') : setPublisherSvg('svg-rotate-up'); setPublisherShowMore(5) }} style={{ display: 'flex', alignItems: 'center', margin: '10px 0px' }}>
                      <svg style={{ margin: '9px 21px 9px 4px' }} className={publisherSvg} xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 20 12"><path fill="#4B4B4B" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z" /></svg>
                      <span style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: '32px', }}>Publisher</span>
                    </div>
                    <ul hidden={publisherSvg != 'svg-rotate-up' ? true : false}>
                      {publisherList.slice(0, publisherShowMore).map((publisher, index) => (
                        <li key={publisher[0]} style={{ display: 'flex', gap: '10px' }}>
                          <input onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPublishers([...selectedPublishers, publisher[0].toLowerCase()])
                            }
                            else {
                              setSelectedPublishers(selectedPublishers.filter(item => item != publisher[0].toLowerCase()))
                            }
                          }} style={{ cursor: 'pointer', margin: '5px 10px 5px 4px' }} id={`${publisher[0]}-publisher`} className='checkBox' type={'checkbox'} />
                          <label style={{ cursor: 'pointer', lineHeight: '28px', width: '149px', flexGrow: '1' }} htmlFor={publisher[0]}>{formatTitleCase(publisher[0])} </label><span style={{ color: '#727272', flexGrow: '1', textAlign: 'right' }}>({publisher[1]})</span>
                        </li>
                      ))}
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button hidden={publisherList.length <= publisherShowMore} onClick={() => publisherShowMore > publisherList.length ? '' : setPublisherShowMore(publisherShowMore + 5)} style={{ cursor: 'pointer' }}>
                          <div style={{ display: 'flex', alignItems: 'center', lineHeight: '28px' }}>
                            <svg style={{ paddingRight: '5px' }} width="15" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.45799 8.58301H6.99999V14.125C6.99999 14.562 7.35499 14.917 7.79199 14.917C8.22898 14.917 8.58398 14.562 8.58398 14.125V8.58301H14.126C14.563 8.58301 14.918 8.22801 14.918 7.79101C14.918 7.35401 14.563 6.99901 14.126 6.99901H8.58398V1.45701C8.58398 1.02001 8.22898 0.665009 7.79199 0.665009C7.35499 0.665009 6.99999 1.02001 6.99999 1.45701V6.99901H1.45799C1.02099 6.99901 0.665985 7.35401 0.665985 7.79101C0.665985 8.22801 1.02099 8.58301 1.45799 8.58301Z" fill="black"></path></svg>
                            More
                          </div>
                        </button>
                        <button hidden={!(publisherShowMore > 5)} onClick={() => setPublisherShowMore(5)} style={{ cursor: 'pointer' }}>
                          <div style={{ display: 'flex', alignItems: 'center', lineHeight: '28px' }}>
                            <svg style={{ paddingRight: '5px' }} width="12" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.43702 1.87499H16.438C16.956 1.87499 17.376 1.45499 17.376 0.936994C17.376 0.418994 16.956 -0.00100708 16.438 -0.00100708H1.43702C0.919023 -0.00100708 0.499023 0.418994 0.499023 0.936994C0.499023 1.45499 0.919023 1.87499 1.43702 1.87499V1.87499Z" fill="black"></path></svg>
                            Show less
                          </div>
                        </button>
                      </div>
                    </ul>
                  </li>
                  <li style={{ color: "#4B4B4B" }} className="filter-format">
                    <div onClick={() => { formatSvg == 'svg-rotate-up' ? setFormatSvg('svg-rotate-down') : setFormatSvg('svg-rotate-up'); setFormatShowMore(5) }} style={{ display: 'flex', alignItems: 'center', margin: '10px 0px' }}>
                      <svg style={{ margin: '9px 21px 9px 4px' }} className={formatSvg} xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 20 12"><path fill="#4B4B4B" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z" /></svg>
                      <span style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: '32px', }}>Format</span>
                    </div>
                    <ul hidden={formatSvg != 'svg-rotate-up' ? true : false}>
                      {formatList.slice(0, formatShowMore).map((format, index) => (
                        <li key={format[0]} style={{ display: 'flex', gap: '10px' }}>
                          <input onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedFormats([...selectedFormats, format[0].toLowerCase()])
                            }
                            else {
                              setSelectedFormats(selectedFormats.filter(item => item != format[0].toLowerCase()))
                            }
                          }}
                            style={{ cursor: 'pointer', margin: '5px 10px 5px 4px' }} id={`${format[0]}-format`} className='checkBox' type={'checkbox'} />
                          <label style={{ cursor: 'pointer', width: '149px', flexGrow: '1', lineHeight: '28px' }} htmlFor={format[0]}>{formatSentenceCase(format[0])} </label><span style={{ color: '#727272', flexGrow: '1', textAlign: 'right' }}>({format[1]})</span>
                        </li>
                      ))}
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button hidden={formatList.length <= formatShowMore} onClick={() => formatShowMore > formatList.length ? '' : setFormatShowMore(formatShowMore + 5)} style={{ cursor: 'pointer' }}>
                          <div style={{ display: 'flex', alignItems: 'center', lineHeight: '28px' }}>
                            <svg style={{ paddingRight: '5px' }} width="15" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.45799 8.58301H6.99999V14.125C6.99999 14.562 7.35499 14.917 7.79199 14.917C8.22898 14.917 8.58398 14.562 8.58398 14.125V8.58301H14.126C14.563 8.58301 14.918 8.22801 14.918 7.79101C14.918 7.35401 14.563 6.99901 14.126 6.99901H8.58398V1.45701C8.58398 1.02001 8.22898 0.665009 7.79199 0.665009C7.35499 0.665009 6.99999 1.02001 6.99999 1.45701V6.99901H1.45799C1.02099 6.99901 0.665985 7.35401 0.665985 7.79101C0.665985 8.22801 1.02099 8.58301 1.45799 8.58301Z" fill="black"></path></svg>
                            More
                          </div>
                        </button>
                        <button hidden={!(formatShowMore > 5)} onClick={() => setFormatShowMore(5)} style={{ cursor: 'pointer' }}>
                          <div style={{ display: 'flex', alignItems: 'center', lineHeight: '28px' }}>
                            <svg style={{ paddingRight: '5px' }} width="12" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.43702 1.87499H16.438C16.956 1.87499 17.376 1.45499 17.376 0.936994C17.376 0.418994 16.956 -0.00100708 16.438 -0.00100708H1.43702C0.919023 -0.00100708 0.499023 0.418994 0.499023 0.936994C0.499023 1.45499 0.919023 1.87499 1.43702 1.87499V1.87499Z" fill="black"></path></svg>
                            Show less
                          </div>
                        </button>
                      </div>
                    </ul>
                  </li>
                  <li style={{ color: "#4B4B4B" }} className="filter-tag">
                    <div onClick={() => { tagSvg == 'svg-rotate-up' ? setTagSvg('svg-rotate-down') : setTagSvg('svg-rotate-up'); setTagShowMore(5) }} style={{ display: 'flex', alignItems: 'center', margin: '10px 0px' }}>
                      <svg style={{ margin: '9px 21px 9px 4px' }} className={tagSvg} xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 20 12"><path fill="#4B4B4B" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z" /></svg>
                      <span style={{ fontWeight: 'bold', fontSize: '18px', lineHeight: '32px' }}>Tag</span>
                    </div>
                    <ul hidden={tagSvg != 'svg-rotate-up' ? true : false}>
                      {tagList.slice(0, tagShowMore).map((tag, index) => (
                        <li key={tag[0]} style={{ display: 'flex', gap: '10px' }}>
                          <input onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTags([...selectedtags, tag[0]])
                            }
                            else {
                              setSelectedTags(selectedtags.filter(item => item != tag[0]))
                            }
                          }} style={{ cursor: 'pointer', margin: '5px 10px 5px 4px' }} id={`${tag[0]}-tag`} className='checkBox' type={'checkbox'} />
                          <label style={{ cursor: 'pointer', width: '149px', flexGrow: '1', lineHeight: '28px' }} htmlFor={tag[0]}>{formatSentenceCase(tag[0])} </label><span style={{ color: '#727272', flexGrow: '1', textAlign: 'right' }}>({tag[1]})</span>
                        </li>
                      ))}
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button hidden={tagList.length <= tagShowMore} onClick={() => tagShowMore > tagList.length ? '' : setTagShowMore(tagShowMore + 5)} style={{ cursor: 'pointer' }}>
                          <div style={{ display: 'flex', alignItems: 'center', lineHeight: '28px' }}>
                            <svg style={{ paddingRight: '5px' }} width="15" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.45799 8.58301H6.99999V14.125C6.99999 14.562 7.35499 14.917 7.79199 14.917C8.22898 14.917 8.58398 14.562 8.58398 14.125V8.58301H14.126C14.563 8.58301 14.918 8.22801 14.918 7.79101C14.918 7.35401 14.563 6.99901 14.126 6.99901H8.58398V1.45701C8.58398 1.02001 8.22898 0.665009 7.79199 0.665009C7.35499 0.665009 6.99999 1.02001 6.99999 1.45701V6.99901H1.45799C1.02099 6.99901 0.665985 7.35401 0.665985 7.79101C0.665985 8.22801 1.02099 8.58301 1.45799 8.58301Z" fill="black"></path></svg>
                            More
                          </div>
                        </button>
                        <button hidden={!(tagShowMore > 5)} onClick={() => setTagShowMore(5)} style={{ cursor: 'pointer' }}>
                          <div style={{ display: 'flex', alignItems: 'center', lineHeight: '28px' }}>
                            <svg style={{ paddingRight: '5px' }} width="12" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.43702 1.87499H16.438C16.956 1.87499 17.376 1.45499 17.376 0.936994C17.376 0.418994 16.956 -0.00100708 16.438 -0.00100708H1.43702C0.919023 -0.00100708 0.499023 0.418994 0.499023 0.936994C0.499023 1.45499 0.919023 1.87499 1.43702 1.87499V1.87499Z" fill="black"></path></svg>
                            Show less
                          </div>
                        </button>
                      </div>
                    </ul>
                  </li>
                </ul>
                <button onClick={async () => {
                  let checkBoxes = Array.from(document.getElementsByClassName('checkBox'));
                  checkBoxes.forEach(checkBox => {
                    checkBox.checked = false;
                  })
                  setReset(true);
                  await resetSearch();
                  setReset(false);
                }} style={{ border: '1px solid #727272', borderRadius: '4px', height: '48px', padding: '8px 16px', cursor: 'pointer', width: '82px' }}>Reset</button>
              </nav>
            </div>
          </div>
          <div className="cagov-content content-cell">

            {/* Topic ------------------------------------------------------------------------------------------------------------------------ */}

            {data.topicDisplayName &&

              <div className="topic-popular-container">
                <h1>{data.topicDisplayName}</h1>
                <span className="dataset-icon" style={{}} dangerouslySetInnerHTML={{ __html: data.topicIcn }}></span>
                {data.topicDescription}
                <h2 style={{ fontSize: '37px' }}>Popular datasets</h2>
                <div className="topic-popular-cards-container" style={{}}>

                  {data.popularDatasets.map((dataset, index) => (
                    <a
                      href={"/dataset?name=" + dataset.name}
                      key={index}
                      style={{}}
                      className="topic-popular-dataset"
                    >
                      <h2 style={{ marginBottom: '5px' }} className="h5">
                        <span style={{ fontWeight: '700', fontSize: '23px', lineHeight: '37.4px' }}>{dataset.title}</span>
                      </h2>
                      <div className="topic-organization" style={{ fontSize: '18px', lineHeight: '32px' }}>
                        {dataset.organization}
                      </div>
                      <div className="topic-recentviews">
                        <span style={{ fontSize: '37px', lineHeight: '32px' }}>{dataset.views}</span>
                        <span style={{ color: '#4b4b4b', fontSize: '18px', fontWeight: '700', lineHeight: '32px' }}>{' '}recent views</span>
                      </div>
                    </a>
                  ))}

                </div>
              </div>

            }

            {data.topicDisplayName
              ? <h1 className="h3" style={{ marginTop: 0, color: '#034A6B' }}>Search {data.topicDisplayName} datasets</h1>
              : <h1 style={{ marginTop: 0, color: '#034A6B', fontSize: '47px', lineHeight: '58.8px' }}>{areObjectKeysEmpty(dataState.parameters) ? 'All datasets' : 'Search results'}</h1>
            }

            {/* Topic ------------------------------------------------------------------------------------------------------------------------ */}

            <div className="search-container grid-search">
              <form className="site-search" action={`/topic/datasets`}>
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
                  <input type="hidden" name="topic" value={dataState.parameters.topic} />
                  <button
                    style={{
                      outlineOffset: -2,
                      right: 5,
                      backgroundColor: "var(--primary-color, #046A99)",
                      border: "1px solid var(--primary-color, #046A99)",
                      borderRadius: "0px 4px 4px 0px",
                      padding: "8px 14px",
                      position: "relative",
                      backgroundColor: '#034A6B',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    type="submit"
                    className="search-submit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 17 17"
                      viewBox="0 0 17 17"
                      style={{ width: '23.43px', backgroundColor: '#034A6B' }}
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
            <div className="filter-sort">
              <form id="sortresults" method="GET" action="/datasets" name="sort">
                <input type="hidden" name="q" value={dataState.parameters.q}></input>
                <input type="hidden" name="topic" value={dataState.parameters.topic}></input>
                <input type="hidden" name="publisher" value={dataState.parameters.publisher}></input>
                <input type="hidden" name="tag" value={dataState.parameters.tag}></input>
                <input type="hidden" name="format" value={dataState.parameters.format}></input>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor="sort" style={{ fontSize: '18px', lineHeight: '32px', }}>Sort by</label>
                  <BasicSelect submit={submit} />
                </div>
              </form>
            </div>
            <div>
              <h2>{dataState.matches > 1 ? dataState.matches + ' datasets' : dataState.matches + ' dataset'} </h2>
            </div>
            <div className="result-page">
              {dataState.allResults.map((dataset, index) => (
                <div
                  key={index}
                  style={{ marginBottom: "3rem" }}
                  className="result"
                >
                  <h2 style={{ marginBottom: '5px' }} className="h5">
                    <a href={"/dataset?name=" + dataset.name}>
                      <span style={{ fontWeight: '700', fontSize: '18px', lineHeight: '32px', color: '#046A99' }}>{dataset.title}</span>
                    </a>
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
                      {dataset.formats.join(', ')}
                    </li>
                  </ul>
                  <p className="description" style={{ marginTop: '12px' }}>
                    {dataset.notes.substring(0, 150)}...
                  </p>
                </div>
              ))}
            </div>

            {/*<div className="page-navigation"><a className="page-previous" href={"datasets?q=water&tag=regulatory&page="+data.pages.previous}>&lt;</a> <span className="page-current">{data.pages.current}</span> <a className="page-next" href={"datasets?q=water&tag=regulatory&page="+data.pages.next}>{data.pages.next}</a> <span className="page-dots">...</span> <a className="page-next" href={"datasets?q=water&tag=regulatory&page="+data.pages.total}>{data.pages.total}</a> <a className="page-next" href={"datasets?q=water&tag=regulatory&page="+data.pages.next}>&gt;</a></div>*/}
            <div className="page-navigation">
              <a style={{ 'display': dataState.pages.previous.display }} className="page-previous" href={"datasets?q=" + dataState.parameters.q + urlParamTopic + urlParamPublisher + urlParamTag + urlParamFormat + urlParamSort + "&page=" + dataState.pages.previous.value}><svg className={'rotate-90'} xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 20 12"><text>Previous page arrow</text><path fill="#4B4B4B" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z" /></svg></a>

              <a style={{ 'display': dataState.pages.previous.display }} className="page-previous" href={"datasets?q=" + dataState.parameters.q + urlParamTopic + urlParamPublisher + urlParamTag + urlParamFormat + urlParamSort + "&page=" + dataState.pages.previous.value}>{dataState.pages.previous.value + 1}</a>

              <span style={{ 'display': dataState.pages.current.display }} className="page-current">{dataState.pages.current.value + 1}</span>

              <a style={{ 'display': dataState.pages.next.display }} className="page-next" href={"datasets?q=" + dataState.parameters.q + urlParamTopic + urlParamPublisher + urlParamTag + urlParamFormat + urlParamSort + "&page=" + dataState.pages.next.value}>{dataState.pages.next.value + 1}</a>

              <a style={{ 'display': dataState.pages.next.display }} className="page-next" href={"datasets?q=" + dataState.parameters.q + urlParamTopic + urlParamPublisher + urlParamTag + urlParamFormat + urlParamSort + "&page=" + dataState.pages.next.value}><svg className={'rotate-270'} xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 20 12"><text>Next page arrow</text><path fill="#4B4B4B" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z" /></svg></a>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
export default Results;