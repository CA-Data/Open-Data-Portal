function DatasetRelated(props) {
  return (
    <>
      {props.related_resources && (
        <>
          <h3 className="h5">Related</h3>
          <ul>
            <li>{props.related_resources}</li>
          </ul>
        </>
      )}
    </>
  );
}

export default DatasetRelated;
