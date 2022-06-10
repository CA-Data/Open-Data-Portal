import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'

export async function getServerSideProps(context) {
  if ('publisher' in context.query && context.query.publisher.length>0) {
    var publisherDetails = {}
    publisherDetails.title = ""
    publisherDetails.description = ""
    publisherDetails.website = ""
    publisherDetails.popular = []
    
    const popular_datasets = await fetch(`https://data.ca.gov/api/action/package_search?sort=views_recent%20desc&fq=organization:${context.query.publisher}&rows=3`).then((response) => response.json());
    publisherDetails.title = popular_datasets.result.results[0].organization.title
    publisherDetails.description = popular_datasets.result.results[0].organization.description
    popular_datasets.result.results.forEach(item=>{
      var popularDataset = {}
      popularDataset.title = item.title
      popularDataset.views = item.num_tags
      publisherDetails.popular.push(popularDataset)
    })
    console.log(publisherDetails)
  }
  var apirequest = "https://data.ca.gov/api/3/action/package_search?q="+context.query.q;
  var thereWasAFilter = 0; // flag, did user select any filter?
  
  if ('topic' in context.query && context.query.topic.length>0) {
    let groups = context.query.topic.split(',');
    let formattedGroupString ='';
    for(let i=0; i<groups.length;i++){
      if(groups[i+1]){
        if(groups[i] == "health and human services"){
          formattedGroupString += groups[i].replace(/ and/g,'').replace(/ /g, '-') + "%20AND%20";
        }
        else{
          formattedGroupString += groups[i].replace(/ /g, '-') + "%20AND%20";
        }
      }
      else{
        if(groups[i] == "health and human services"){
          formattedGroupString += groups[i].replace(/ and/g,'').replace(/ /g, '-') + ")";
        }
        else{
          formattedGroupString += groups[i].replace(/ /g, '-') + ")";
        }
      }
    }
    apirequest += thereWasAFilter ? "%20AND%20" : "&fq=";
    apirequest += "groups:(" + formattedGroupString;
    thereWasAFilter = 1;
  }
  if ('publisher' in context.query && context.query.publisher.length>0) {
    let organizations = context.query.publisher.split(',');
    let formattedOrganizationsString ='';
    for(let i=0; i<organizations.length;i++){
      if(organizations[i+1]){
        formattedOrganizationsString += organizations[i].replace(/ /g, '-') + "%20AND%20";
      }
      else{
        formattedOrganizationsString += organizations[i].replace(/ /g, '-') + ")";
      }
    }
    apirequest += thereWasAFilter ? "%20AND%20" : "&fq=";
    apirequest += "organization:("+formattedOrganizationsString;
    thereWasAFilter = 1;
  }

  if ('format' in context.query && context.query.format.length>0) {
    let filters = context.query.format.split(',');
    let formattedFormatString ='';
    for(let i=0; i<filters.length;i++){
      if(filters[i+1]){
        formattedFormatString += filters[i].replace(/ /g, '-').toUpperCase() + "%20AND%20";
      }
      else{
        formattedFormatString += filters[i].replace(/ /g, '-').toUpperCase() + ")";
      }
    }
    apirequest += thereWasAFilter ? "%20AND%20" : "&fq=";
    apirequest += "res_format:("+formattedFormatString;
    thereWasAFilter = 1;
  }

  if ('tag' in context.query && context.query.tag.length>0) {
    let tags = context.query.tag.split(',');
    let formattedTagString ='';
    for(let i=0; i<tags.length;i++){
      if(tags[i+1]){
        formattedTagString += "\""+tags[i] + "\"%20AND%20";
      }
      else{
        formattedTagString += "\""+tags[i] + "\")";
      }
    }
    apirequest += thereWasAFilter ? "%20AND%20" : "&fq=";
    apirequest += "tags:("+formattedTagString;
    thereWasAFilter = 1;
  }

  if ('sort' in context.query) {
    apirequest += "&sort="+context.query.sort;
  }

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


  const response = await fetch(apirequest).then((response) => response.json());
  pageData["total"].value = Math.ceil(parseInt(response.result.count) / 10);

  if (pageData["next"].value >= pageData["total"].value) {
    pageData["next"].display = "none";
  }
  
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
      publisherDetails: publisherDetails,
      matches: response.result.count,
      allResults: resultsArray,
      parameters: context.query,
      pages: pageData
    },
  };
}


const Results =(data)=>{
  const [topicSvg,setTopicSvg] = useState('svg-rotate-up');
  const [publisherSvg,setPublisherSvg] = useState('svg-rotate-down');
  const [formatSvg,setFormatSvg] = useState('svg-rotate-down');
  const [tagSvg,setTagSvg] = useState('svg-rotate-down');
  const [selectedTopics,setSelectedTopics] = useState([]);
  const [selectedPublishers,setSelectedPublishers] = useState([]);
  const [selectedFormats,setSelectedFormats] = useState([]);
  const [selectedtags,setSelectedTags] = useState([]);
  const [reset,setReset] = useState(false);
  const [topicList,setTopicList] = useState([]);
  const [publisherList,setPublisherList] = useState([]);
  const [tagList,setTagList] = useState([]);
  const [formatList,setFormatList] = useState([]);
  const router = useRouter();
  if (typeof window === 'object') {
    // Check if document is finally loaded
    document.addEventListener("DOMContentLoaded", function () {
      if (parseInt(data.pages["next"].value) > parseInt(data.pages["total"].value)) {
        document.querySelectorAll('.page-next')[0].style.display = 'none';
        document.querySelectorAll('.page-next')[1].style.display = 'none';
      }
    });
  }
  const submit = () => {
    document.getElementById("sortresults").submit();
  };
  var urlParamTopic = (data.parameters.topic) ? "&topic=" + data.parameters.topic : "";
  var urlParamPublisher = (data.parameters.publisher) ? "&publisher=" + data.parameters.publisher : "";
  var urlParamFormat = (data.parameters.format) ? "&format=" + data.parameters.format : "";
  var urlParamTag = (data.parameters.tag) ? "&tag=" + data.parameters.tag : "";
  var urlParamSort = (data.parameters.sort) ? "&sort=" + data.parameters.sort : "";
  useEffect(()=>{
    // grab lists on page load
    fetch('https://data.ca.gov/api/3/action/group_list').then(res=>res.json()).then(data=>setTopicList(data.result)).catch(error=>console.error(error))
    fetch('https://data.ca.gov/api/3/action/organization_list').then(res=>res.json()).then(data=>setPublisherList(data.result)).catch(error=>console.error(error))
    fetch('https://data.ca.gov/api/3/action/tag_list').then(res=>res.json()).then(data=>setTagList(data.result)).catch(error=>console.error(error))

    // get formats
    fetch('https://data.ca.gov/api/3/action/package_search?q=&rows=3000')
    .then(res=>res.json())
    .then(data=>{
      const dataSet = new Set();
      const tempArray= [];
      for (let index = 0; index < data.result.results.length; index++) { // loop over all results
        if (data.result.results[index].resources.length > 0) {
          const resource = data.result.results[index].resources
          for (let index = 0; index < resource.length; index++) {        // loop over formats for this record
            var resource_type = resource[index].format;
            if(resource[index].format != ""){
              dataSet.add(resource_type)                                 // Creates a set for unique formats
            }
          }
        }
      }
      dataSet.forEach(item=>{
        tempArray.push(item)              // Puts set into an array
      })
      setFormatList(tempArray.sort());    // puts array into useState to share state with rest of Results component

    })
  },[])


  // UseEffects will fire when its corresponding array is updated. 
  // Arrays can be updated by user input -> (selectedTopics,selectedPublishers,selectedFormats,selectedtags)
  // Each array will append a value to the url
  useEffect(()=>{
    if(!reset){
      if(selectedTopics.length == 0 || router.query.topic?.length == 0 ){
        router.push(router.asPath.split('&topic=')[0])
      }
      if(selectedTopics.length == 1 && !router.query.topic){
          router.push(router.asPath+'&topic='+selectedTopics)
      }
      if(selectedTopics.length>=1 && router.query.topic){
        let newPath = router.asPath.split('&');
        let index = newPath.findIndex(item=> item.includes('topic'));
        newPath.splice(index,1,"topic="+selectedTopics.join(','));
        newPath = newPath.join('&');
        router.push(newPath);
      }
    }
  },[selectedTopics])
  useEffect(()=>{
    if(!reset){
      if(selectedPublishers.length == 0 || router.query.publisher?.length == 0 ){
        router.push(router.asPath.split('&publisher=')[0])
      }
      if(selectedPublishers.length == 1 && !router.query.publisher){
          router.push(router.asPath+'&publisher='+selectedPublishers)
      }
      if(selectedPublishers.length>=1 && router.query.publisher){
        let newPath = router.asPath.split('&');
        let index = newPath.findIndex(item=> item.includes('publisher'));
        newPath.splice(index,1,"publisher="+selectedPublishers.join(','));
        newPath = newPath.join('&');
        router.push(newPath);
      }
    }
  },[selectedPublishers])
  useEffect(()=>{
    if(!reset){
      if(selectedFormats.length == 0 || router.query.format?.length == 0 ){
        router.push(router.asPath.split('&format=')[0])
      }
      if(selectedFormats.length == 1 && !router.query.format){
          router.push(router.asPath+'&format='+selectedFormats)
      }
      if(selectedFormats.length>=1 && router.query.format){
        let newPath = router.asPath.split('&');
        let index = newPath.findIndex(item=> item.includes('format'));
        newPath.splice(index,1,"format="+selectedFormats.join(','));
        newPath = newPath.join('&');
        router.push(newPath);
      }
    }
  },[selectedFormats])
  useEffect(()=>{
    if(!reset){
      if(selectedtags.length == 0 || router.query.tag?.length == 0 ){
        router.push(router.asPath.split('&tag=')[0])
      }
      if(selectedtags.length == 1 && !router.query.tag){
          router.push(router.asPath+'&tag='+selectedtags)
      }
      if(selectedtags.length>=1 && router.query.tag){
        let newPath = router.asPath.split('&');
        let index = newPath.findIndex(item=> item.includes('tag'));
        newPath.splice(index,1,"tag="+selectedtags.join(','));
        newPath = newPath.join('&');
        router.push(newPath);
      }
    }
  },[selectedtags])
// End of UseEffect section **********************************************

// resetSearch resets the page
  const resetSearch =async()=>{
    setFormatSvg('svg-rotate-down');       // resets any dropdowns to default state
    setPublisherSvg('svg-rotate-down');    // *
    setTagSvg('svg-rotate-down');          // *
    setTopicSvg('svg-rotate-up');          // *
    setSelectedTopics([]);                     // resets useState arrays
    setSelectedPublishers([]);                 // *
    setSelectedFormats([]);                    // *
    setSelectedTags([]);                       // *
    router.push('?q=');                    // and resets search results
  }

  return (
    <>
      <main id="body-content" className="cagov-main">
        <article
          id="post-design"
          className="cagov-article with-sidebar with-page-nav with-popular"
        >
          <div
            className="sidebar-container everylayout sidebar-cell"
            style={{ "zIndex": 1, marginTop:'270px'}}
          >
            <div className="sidebar" space="0" side="left">
                <nav aria-labelledby="page-navigation-label">
                  <div id="page-navigation-label" className="label">
                    <strong>Filter by</strong>
                  </div>
                  <ul className="search-filters align">
                    <li style={{color:"#4B4B4B"}}  className="filter-topic">
                      <div onClick={()=>{topicSvg=='svg-rotate-up'?setTopicSvg('svg-rotate-down'):setTopicSvg('svg-rotate-up')}} style={{display:'flex',alignItems:'center', margin:'10px 0px'}}>
                        <svg style={{margin:'9px 21px 9px 4px'}} className={topicSvg} xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 20 12"><path fill="#4B4B4B" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg>
                        <span style={{fontWeight:'bold'}}>Topic</span>
                      </div>
                      <ul hidden={topicSvg!='svg-rotate-up'?true:false} style={{cursor:'default'}}>
                        {topicList.map((topic, index) => (
                          <li key={topic} >
                            <input onChange={(e)=>{
                              if(e.target.checked){
                                setSelectedTopics([...selectedTopics,topic.toLowerCase()])
                              }
                              else{
                                setSelectedTopics(selectedTopics.filter(item=>item!=topic.toLowerCase()))
                              }
                              }} style={{cursor:'pointer', margin:'5px 10px 5px 4px'}} id={topic} className='checkBox' type={'checkbox'}/>
                            <label style={{cursor:'pointer', }} htmlFor={topic}>{topic}</label>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li style={{color:"#4B4B4B"}} className="filter-publisher">
                      <div onClick={()=>{publisherSvg=='svg-rotate-up'?setPublisherSvg('svg-rotate-down'):setPublisherSvg('svg-rotate-up')}} style={{display:'flex',alignItems:'center', margin:'10px 0px'}}>
                        <svg style={{margin:'9px 21px 9px 4px'}} className={publisherSvg} xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 20 12"><path fill="#4B4B4B" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg>
                        <span style={{fontWeight:'bold'}}>Publisher</span>
                      </div>
                      <ul hidden={publisherSvg!='svg-rotate-up'?true:false}>
                        {publisherList.map((publisher, index) => (
                          <li key={publisher} >
                            <input onChange={(e)=>{
                              if(e.target.checked){
                                setSelectedPublishers([...selectedPublishers,publisher.toLowerCase()])
                              }
                              else{
                                setSelectedPublishers(selectedPublishers.filter(item=>item!=publisher.toLowerCase()))
                              }                            
                              }} style={{cursor:'pointer', margin:'5px 10px 5px 4px'}} id={publisher} className='checkBox' type={'checkbox'}/>
                            <label style={{cursor:'pointer' }} htmlFor={publisher}>{publisher}</label>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li style={{color:"#4B4B4B"}} className="filter-format">
                      <div onClick={()=>{formatSvg=='svg-rotate-up'?setFormatSvg('svg-rotate-down'):setFormatSvg('svg-rotate-up')}} style={{display:'flex',alignItems:'center', margin:'10px 0px'}}>
                        <svg style={{margin:'9px 21px 9px 4px'}} className={formatSvg} xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 20 12"><path fill="#4B4B4B" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg>
                        <span style={{fontWeight:'bold'}}>Format</span>
                      </div>
                      <ul hidden={formatSvg!='svg-rotate-up'?true:false}>
                        {formatList.map((format, index) => (
                        <li key={format} >
                          <input onChange={(e)=>{
                             if(e.target.checked){
                              setSelectedFormats([...selectedFormats,format.toLowerCase()])
                            }
                            else{
                              setSelectedFormats(selectedFormats.filter(item=>item!=format.toLowerCase()))
                            } 
                          }}
                             style={{cursor:'pointer', margin:'5px 10px 5px 4px'}} id={format} className='checkBox' type={'checkbox'}/>
                          <label style={{cursor:'pointer'}} htmlFor={format}>{format}</label>
                        </li>
                        ))}
                      </ul>
                    </li>
                    <li style={{color:"#4B4B4B"}} className="filter-tag">
                      <div onClick={()=>{tagSvg=='svg-rotate-up'?setTagSvg('svg-rotate-down'):setTagSvg('svg-rotate-up')}} style={{display:'flex',alignItems:'center', margin:'10px 0px'}}>
                        <svg style={{margin:'9px 21px 9px 4px'}} className={tagSvg} xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 20 12"><path fill="#4B4B4B" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg>
                        <span style={{fontWeight:'bold'}}>Tag</span>
                      </div>
                      <ul hidden={tagSvg!='svg-rotate-up'?true:false}>
                        {tagList.map((tag, index) => (
                        <li key={tag} >
                          <input onChange={(e)=>{
                            if(e.target.checked){
                             setSelectedTags([...selectedtags,tag])
                           }
                           else{
                             setSelectedTags(selectedtags.filter(item=>item!=tag))
                           } 
                         }} style={{cursor:'pointer', margin:'5px 10px 5px 4px'}} id={tag} className='checkBox' type={'checkbox'}/>
                          <label style={{cursor:'pointer' }} htmlFor={tag}>{tag}</label>
                        </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                  <button onClick={async()=>{
                    let checkBoxes = Array.from(document.getElementsByClassName('checkBox'));
                    checkBoxes.forEach(checkBox =>{
                      checkBox.checked = false;
                    })
                    setReset(true);
                    await resetSearch();
                    setReset(false);
                  }} style={{border:'1px solid #4B4B4B',borderRadius:'5px',padding:'10px 15px', cursor:'pointer',}}>Reset</button>
                </nav>
            </div>
          </div>
          <div className="cagov-popular-datasets">
            <div className="organization-info">
              <h1 style={{ marginTop: 0, color:'#034A6B', fontSize:'47px', lineHeight:'58.8px'}}>{data.publisherDetails.title}</h1>
              <p>Organization website: <a href={data.publisherDetails.website}>{data.publisherDetails.title}</a></p>
              <p className="organization-description">{data.publisherDetails.description}</p>
            </div>
            <div className="popular-datasets">
            <h2>Popular datasets</h2>
            <div class="popular-datasets-cards-container">
            {data.publisherDetails.popular.map((details, index) => (
                <div key={index} className="popular-dataset-card">
                <p className="dataset-title">
                  {details.title}
                </p>
                <p>
                  <span className="large-text">
                    {details.views}
                  </span>{" "}
                  recent views
                </p>
              </div>
              ))}
            </div>
            </div>
          </div>
          <div className="cagov-content content-cell">
            <h3>Search organization results</h3>
            <div className="search-container grid-search">
              <form className="site-search" action="/results">
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
                    defaultValue = {data.parameters.q}
                    style={{
                      width: "876px",
                      height:'49px',
                      color: "#fff",
                      border: "1px solid var(--primary-color, #046A99)",
                      padding: ".5rem",
                      borderRadius: ".25rem",
                    }}
                  />
                  <button
                    style={{
                      outlineOffset: -2,
                      right: 5,
                      backgroundColor: "var(--primary-color, #046A99)",
                      border: "1px solid var(--primary-color, #046A99)",
                      borderRadius: "0px 4px 4px 0px",
                      padding: "8px 14px",
                      position: "relative",
                      backgroundColor:'#034A6B',
                      display:'flex',
                      alignItems:'center'
                    }}
                    type="submit"
                    className="search-submit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 17 17"
                      viewBox="0 0 17 17"
                      style={{width: '23.43px',backgroundColor:'#034A6B'}}
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
              <form id="sortresults" method="GET" action="/results" name="sort">
                <input type="hidden" name="q" value={data.parameters.q}></input>
                <input type="hidden" name="topic" value={data.parameters.topic}></input>
                <input type="hidden" name="publisher" value={data.parameters.publisher}></input>
                <input type="hidden" name="tag" value={data.parameters.tag}></input>
                <input type="hidden" name="format" value={data.parameters.format}></input>
                <label htmlFor="sort">Sort by</label>
                <select onChange={submit} name="sort" value={data.parameters.sort}>
                  <option className="select-option" value="best_match desc">
                    Best match
                  </option>
                  {/*<option className="select-option" value="most_accessed">
                    Most accessed
                  </option>*/}
                  <option className="select-option" value="metadata_modified asc">
                    Most recent
                  </option>
                </select>
              </form>
            </div>
            <div>
              <h2>{data.matches > 1 ? data.matches + ' matches': data.matches + ' match'} </h2>
            </div>
            <div className="result-page">
              {data.allResults.map((dataset, index) => (
                <div
                  key={index}
                  style={{ marginBottom: "3rem" }}
                  className="result"
                >
                  <h2 style={{marginBottom:'5px'}} className="h5">
                    <a href={"/dataset?name=" + dataset.name}>
                      <span style={{fontWeight:'700', fontSize:'18px', lineHeight:'32px', color:'#046A99'}}>{dataset.title}</span>
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
                  <p className="description">
                    {dataset.notes.substring(0, 200)}...
                  </p>
                </div>
              ))}
            </div>

            {/*<div className="page-navigation"><a className="page-previous" href={"/results?q=water&tag=regulatory&page="+data.pages.previous}>&lt;</a> <span className="page-current">{data.pages.current}</span> <a className="page-next" href={"/results?q=water&tag=regulatory&page="+data.pages.next}>{data.pages.next}</a> <span className="page-dots">...</span> <a className="page-next" href={"/results?q=water&tag=regulatory&page="+data.pages.total}>{data.pages.total}</a> <a className="page-next" href={"/results?q=water&tag=regulatory&page="+data.pages.next}>&gt;</a></div>*/}
            <div className="page-navigation">
              <a style={{'display':data.pages.previous.display}} className="page-previous" href={"/results?q="+data.parameters.q+urlParamTopic+urlParamPublisher+urlParamTag+urlParamFormat+urlParamSort+"&page="+data.pages.previous.value}><svg className={'rotate-90'} xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 20 12"><text>Previous page arrow</text><path fill="#4B4B4B" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg></a> 

              <a style={{'display':data.pages.previous.display}} className="page-previous" href={"/results?q="+data.parameters.q+urlParamTopic+urlParamPublisher+urlParamTag+urlParamFormat+urlParamSort+"&page="+data.pages.previous.value}>{data.pages.previous.value + 1}</a> 

              <span style={{'display':data.pages.current.display}} className="page-current">{data.pages.current.value + 1}</span> 

              <a style={{'display':data.pages.next.display}} className="page-next" href={"/results?q="+data.parameters.q+urlParamTopic+urlParamPublisher+urlParamTag+urlParamFormat+urlParamSort+"&page="+data.pages.next.value}>{data.pages.next.value + 1}</a> 

              <a style={{'display':data.pages.next.display}} className="page-next" href={"/results?q="+data.parameters.q+urlParamTopic+urlParamPublisher+urlParamTag+urlParamFormat+urlParamSort+"&page="+data.pages.next.value}><svg className={'rotate-270'} xmlns="http://www.w3.org/2000/svg" width="12" viewBox="0 0 20 12"><text>Next page arrow</text><path fill="#4B4B4B" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg></a>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
export default Results;