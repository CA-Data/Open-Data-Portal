function DatasetTimeframe(props) {
  return (
    <>
      <h3 className="h5">Timeframe</h3>
      <ul>
        {props.updateFrequency && <li>Updated: {props.updateFrequency}</li>}
        {props.metadata_modified && (
          <li>Last updated: {props.metadata_modified}</li>
        )}
        {props.metadata_created && <li>Created: {props.metadata_created}</li>}
        {props.temporal && (
          <li>Temporal coverage: {props.temporal ? props.temporal : "N/A"}</li>
        )}
      </ul>
    </>
  );
}

export default DatasetTimeframe;
