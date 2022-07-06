window.addEventListener('load', function (event) {
  if (document.getElementsByTagName('main').length > 0) {
    if (document.getElementsByTagName('main')[0].classList.contains('home-page')) {
      document.querySelectorAll('.site-header')[0].style.border = "0px"
    }
  }
  if (document.getElementsByTagName('main').length > 0) {
    if (document.getElementsByTagName('main')[0].classList.contains('dataset') || document.getElementsByTagName('main')[0].classList.contains('dataset-preview')) {
      
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

      
    }
  }
})

/* remove yellow border from homepage site header //
if (document.getElementsByTagName('main')[0].classList.contains('home-page')) {
  const header = document.getElementsByClassName('site-header')[0]
  header.style.border = "3px solid white"
}*/
document.querySelectorAll('.btn-read-more').forEach(el => el.addEventListener('click', event => {
  console.log('click')
  event.target.parentNode.querySelectorAll('p')[0].classList.toggle('expanded')
  
  if (event.target.parentNode.querySelectorAll('p')[0].classList.contains("expanded")) {
    event.target.innerHTML = `Read less <span class="caret rotate-180"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 12" style="margin-left: 0.5rem;transform: rotate(180deg);"><path fill="#727272" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg></span>`;
  } else {
    event.target.innerHTML = `Read more <span class="caret"><svg xmlns="http://www.w3.org/2000/svg" width="16" viewBox="0 0 20 12" style="margin-left: 0.5rem;"><path fill="#727272" d="m17.8.4-7.7 8.2L2.2.4C1.7-.1.9-.1.4.4s-.5 1.4 0 1.9l8.8 9.3c.3.3.7.4 1.1.4.3 0 .7-.1.9-.4l8.4-9.3c.5-.5.5-1.4 0-1.9s-1.3-.5-1.8 0z"/></svg></span>`;
  }
}));