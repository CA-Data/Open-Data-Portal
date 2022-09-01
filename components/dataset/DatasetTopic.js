import style from "../../components/dataset/DatasetTopic.module.css";

function DatasetTopic(props) {
  return (
    <>
      <h2 className="h4">About this dataset</h2>
      <p className={`${style.dataset_info_label}`}>
        <span
          className={`${style.dataset_icon}`}
          dangerouslySetInnerHTML={{ __html: props.icon }}
        ></span>
        {props.group_object[0].title ? (
          <span style={{ display: "block" }}>
            {props.group_object.map((topic, index) => (
              <span key={topic.id}>
                {topic.title}
                <br />
              </span>
            ))}
          </span>
        ) : (
          "General"
        )}
      </p>
    </>
  );
}

export default DatasetTopic;
