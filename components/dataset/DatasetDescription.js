import ReadMore from "../common/ReadMore";

function DatasetDescription(props) {
  return (
    <>
      <p>
        {props.description
          .replace(/<br>/g, "\n")
          .replace(/\<.*?\>/g, "")
          .replace(/^"|^ /g, "")
          .replace(/ $|"$/g, "")
          .replace(/"+/g, '"')
          .replace(/__/g, "")}
      </p>
      {props.description.length > props.text_length && <ReadMore />}
    </>
  );
}

export default DatasetDescription;
