//Modal JS
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

//add file id to api query inputs
function addFileId(fileId) {
  document.getElementById("simple-query").value = `https://data.ca.gov/api/3/action/datastore_search?resource_id=${fileId}&limit=5`
  document.getElementById("sql-query").value = `https://data.ca.gov/api/3/action/datastore_search_sql?sql=SELECT * from ${fileId} LIMIT 5`
  document.getElementById("odata-query").value = `https://data.ca.gov/datastore/odata3.0/${fileId}`
}
function addResourceName(name) {
  document.getElementById("resource-name").innerHTML = name
}

const apiButtons = document.querySelectorAll('.api-button');
apiButtons.forEach(el => el.addEventListener('click', event => {
  console.log(event.target.dataset.fileId);
  console.log(event.target.dataset.resourceName);
  var file_id = event.target.dataset.fileId;
  var resource_name = event.target.dataset.resourceName;
  addFileId(file_id)
  addResourceName(resource_name)
  modal.style.display = "block";
}));




//Copy query to clip-board
function copyToClipboard(file) {
  console.log(file)
  //console.log(e.target.parentNode)
  //this.in.select();
  //document.execCommand('copy');
  // This is just personal preference.
  // I prefer to not show the whole text area selected.
  //e.target.focus();
  //this.setState({ copySuccess: 'Copied!' });
};
const divs = document.querySelectorAll('.copy-button');

divs.forEach(el => el.addEventListener('click', event => {
  console.log(event.target);
}));



