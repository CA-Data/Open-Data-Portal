function Component(props) {
  return (
    <>
      <div className="two-col">
        {props.topics.map((topic, index) => (
          <a
            key={index}
            className="card-block"
            href={"/topic/datasets?q=&topic=" + topic.id}
          >
            <div
              className="icon-col"
              dangerouslySetInnerHTML={{ __html: topic.icon }}
            ></div>
            <div className="content">
              <h3 className="h4" style={{ marginTop: "0.2em" }}>
                {topic.title}
              </h3>
              <p className="topic-desc">{topic.description}</p>
              <p className="topic-qty">{topic.count} Datasets</p>
            </div>
          </a>
        ))}
        <div className="card-block card-marketing inverted">
          <div className="icon-col">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180">
              <circle cx="90" cy="90" r="90" fill="#4f97b8" />
              <path
                d="M42.6 35h40v37.2l51.3 47.3v3.4l4.8 4.4-6.3 5.7v7.7h2.8v4.4h-24.7l-3.3-7-3-1-7.3-6.9h-5.2l-5.9-5.1H77v-6.6l-2-2.4v-1.7l-11-10.3v-2.4l1.2-1.8v-3.5l-3.3.2-2.2-2.8-3.3-6.7-2-3.2-.4-4-7.4-7-.3-10.7-5-5.3v-4.4l2.6-3v-10l-1.1-1.3-.2-3.1Z"
                fill="#fdb81d"
              />
              <path
                d="M105.6 67a14 14 0 0 0-14 14c0 10.5 14 26 14 26s14-15.5 14-26a14 14 0 0 0-14-14Zm-10 14a10 10 0 0 1 20 0c0 5.6-5.8 14.4-10 19.8-4.2-5.3-10-14-10-19.8Z"
                fill="#fff"
              />
              <circle cx="105.6" cy="81" r="5" fill="#034a6b" />
            </svg>
          </div>
          <div className="content">
            <h3 className="h4">California State Geoportal</h3>
            <p className="topic-desc">
              Explore, visualize, and download California data. Visit our{" "}
              <a href="https://gis.data.ca.gov/">California State Geoportal</a>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Component;
