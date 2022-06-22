//Modal JS
window.addEventListener('load', function (event) {
  if (document.getElementsByTagName('main').length > 0) {
    if (document.getElementsByTagName('main')[0].classList.contains('home-page')) {
      document.querySelectorAll('.site-header')[0].style.border = "0px"
    }
  }
  if (document.getElementsByTagName('main').length > 0) {
    if (document.getElementsByTagName('main')[0].classList.contains('dataset') || document.getElementsByTagName('main')[0].classList.contains('dataset-preview')) {

      //**-- api modal start
      var modal = document.getElementById("myModal");
      var span = document.getElementsByClassName("close")[0];
      span.onclick = function() {
        modal.style.display = "none";
      }

      //add file id to api query inputs
      function addFileId(fileId) {
        document.getElementById("simple-query").value = `https://test-data.technology.ca.gov/api/3/action/datastore_search?resource_id=${fileId}&limit=5`
        document.getElementById("sql-query").value = `https://test-data.technology.ca.gov/api/3/action/datastore_search_sql?sql=select * from "${fileId}" LIMIT 5`
        document.getElementById("odata-query").value = `https://test-data.technology.ca.gov/datastore/odata3.0/${fileId}`
      }

      const apiButtons = document.querySelectorAll('.api-button');
      apiButtons.forEach(el => el.addEventListener('click', event => {
        var file_id = event.target.dataset.fileId;
        var resource_name = event.target.dataset.resourceName;
        addFileId(file_id)
        document.getElementById("resource-name").innerHTML = resource_name
        modal.style.display = "block";
      }));

      //copy inputs to clipboard
      document.querySelectorAll('.copy-button').forEach(el => el.addEventListener('click', event => {
        event.target.classList.add("copied");
        event.target.parentNode.querySelectorAll('input')[0].select();
        document.execCommand("copy");
        setTimeout(() => {
          event.target.classList.remove("copied");
        }, "750")
      }));
      //api modal end --**

      //remove read more button, if no data
      if (document.getElementById("dataset-description").getElementsByTagName('p')[0].offsetHeight === document.getElementById("dataset-description").getElementsByTagName('p')[0].scrollHeight) {
        document.getElementsByClassName('btn-read-more')[0].style.display = "none"
      }
      if (document.getElementById("dataset-description").getElementsByTagName('p')[0].offsetHeight == 28) {
        document.getElementsByClassName('btn-read-more')[0].style.display = "none"
      }

      document.querySelectorAll('.resource-description').forEach(element => {
        if (element.parentNode.querySelectorAll('p')[0].innerHTML == "" || element.parentNode.querySelectorAll('p')[0].innerHTML == "N/A" || element.parentNode.querySelectorAll('p')[0].offsetHeight == 28) {
          element.parentNode.querySelectorAll('.btn-read-more')[0].style.display = "none"
        };
      });

      document.querySelectorAll('.btn-read-more').forEach(el => el.addEventListener('click', event => {
        event.target.parentNode.querySelectorAll('p')[0].classList.toggle('expanded')
        
        if (event.target.parentNode.querySelectorAll('p')[0].classList.contains("expanded")) {
          event.target.innerHTML = `Read less <span className="caret rotate-180"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 12" style="margin-left: 0.5rem;transform: rotate(180deg);"><path fill="#727272" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg></span>`;
        } else {
          event.target.innerHTML = `Read more <span className="caret"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 12" style="margin-left: 0.5rem;"><path fill="#727272" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg></span>`;
        }

      }));
    }
  }

})