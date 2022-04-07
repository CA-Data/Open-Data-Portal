//Modal JS
if (document.getElementsByTagName('main')[0].classList.contains('dataset')) {
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
    var file_id = event.target.dataset.fileId;
    var resource_name = event.target.dataset.resourceName;
    addFileId(file_id)
    addResourceName(resource_name)
    modal.style.display = "block";
  }));

  //copy inputs to clipboard
  document.querySelectorAll('.copy-button').forEach(el => el.addEventListener('click', event => {
    event.target.parentNode.querySelectorAll('input')[0].select();
    document.execCommand("copy");
  }));
}
