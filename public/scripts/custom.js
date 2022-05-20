//Modal JS
window.addEventListener('load', function (event) {
  if (document.getElementsByTagName('main').length > 0) {
    if (document.getElementsByTagName('main')[0].classList.contains('dataset')) {
      
      var modal = document.getElementById("myModal");
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
        event.target.classList.add("copied");
        event.target.parentNode.querySelectorAll('input')[0].select();
        document.execCommand("copy");
        setTimeout(() => {
          event.target.classList.remove("copied");
        }, "750")
      }));

      if (document.getElementById("dataset-description").getElementsByTagName('p')[0].offsetHeight === document.getElementById("dataset-description").getElementsByTagName('p')[0].scrollHeight) {
        document.getElementsByClassName('btn-read-more')[0].style.display = "none"
      }

      document.querySelectorAll('.resource-description').forEach(element => {
        if (element.parentNode.querySelectorAll('p')[0].innerHTML == "") {
          element.parentNode.querySelectorAll('.btn-read-more')[0].style.display = "none"
        };
      });

      document.querySelectorAll('.btn-read-more').forEach(el => el.addEventListener('click', event => {
        console.log("clicked", event)
        event.target.parentNode.querySelectorAll('p')[0].classList.toggle('expanded')
        
        if (event.target.parentNode.querySelectorAll('p')[0].classList.contains("expanded")) {
          console.log('Has class', event.target.innerHTML)
          event.target.innerHTML = "Read less" + `<span className="caret rotate-180"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 12"><path fill="#727272" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg></span>`;
        } else {
          console.log('Does not have class', event.target.innerHTML)
          event.target.innerHTML = "Read more" + `<span className="caret"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 12"><path fill="#727272" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg></span>`;
        }

      }));
    }
  }
})