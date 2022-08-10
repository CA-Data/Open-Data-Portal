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
        {props.title ? props.title : "General"}
      </p>
    </>
  );
}

export default DatasetTopic;
