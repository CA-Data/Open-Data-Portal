import React, { useEffect } from 'react';
import Link from "next/link";
import Head from 'next/head';

export default function Preview(dataset) {
  useEffect(() => {
    function showBanner() {
      const banner = document.getElementById('error-banner')
      if (document.getElementById('contact-form').getElementsByClassName('input-error').length > 0) {
          banner.style.display = "grid";
        } else {
          banner.style.display = "none";
        }
    }
    function validate(field) {
      var label = field.parentElement
      if (label.innerText != 'Page link (optional)') {
        label.classList.add("input-error");
        label.getElementsByClassName('input-error-icon')[0].style.display = "block"
        if (label.getElementsByClassName('input-error-text').length > 0) {
          label.getElementsByClassName('input-error-text')[0].style.display = "block"
        }
      }
    }
    if (document.getElementsByTagName('main')[0].classList.contains('contact-us')) {
      const form = document.getElementById('contact-form')
      form.addEventListener('focusout', (event) => {
        if (event.target.value == "") {
          validate(event.target)
        }
        else {
          event.target.parentElement.classList.remove('input-error')
          event.target.parentElement.getElementsByClassName('input-error-icon')[0].style.display = "none"
          if (event.target.parentElement.getElementsByClassName('input-error-text').length > 0) {
            event.target.parentElement.getElementsByClassName('input-error-text')[0].style.display = "none"
          }
        }
        showBanner()
      }, true);
    }
  }, []);
    
  return (
    <>
    <Head>
        <title>Contact us | CA Open Data</title>
        <meta name="description" content="Contact us at State of California Open Data"></meta>
    </Head>
    <main id="body-content" className="cagov-main contact-us">
      <nav className="nav-breadcrumb">
        <ol>
          <li>
            <a href="https://ca.gov/">CA.gov</a>
          </li>
          <li>
            <Link href="/" passHref>
              <a>Open Data</a>
            </Link>
          </li>
          <li>About</li>
          <li>Contact us</li>
        </ol>
      </nav>
      <article
        id="post-design"
        className="cagov-article with-page-nav"
      >

      <div className="content-container">
          <h1>Contact us</h1>
          <p className="lead-text">Have questions or need to report an issue? We’re here to help.</p>
          <ul>
          <li>If you have a question about a specific dataset, contact the data steward from the dataset.</li>
          <li>If you have a technical issue about a dataset, be sure to include the name and link of the dataset.</li>
          </ul>
          <div id="error-banner" className="contact-form-alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
            <path
              fill="#B91B37"
              d="M12 .7a11.3 11.3 0 100 22.6A11.3 11.3 0 0012 .7zM12 19a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm1.3-5.6c0 .8-.5 1.4-1.1 1.4h-.4c-.6 0-1-.6-1-1.4l-.5-7.2c0-.8.6-1.5 1.4-1.5h.5c.8 0 1.5.7 1.5 1.5l-.4 7.2z"
            ></path>
          </svg>
          <p>Correct the errors to continue</p>
          </div>
          <form id="contact-form" className="contact-form" method="post" encType="text/plain" novalidate="novalidate">
            <label class="requiredField">
              Name
              <input type="text" name="name" required/>
              <span className="input-error-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                  <path
                    fill="#B91B37"
                    d="M12 .7a11.3 11.3 0 100 22.6A11.3 11.3 0 0012 .7zM12 19a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm1.3-5.6c0 .8-.5 1.4-1.1 1.4h-.4c-.6 0-1-.6-1-1.4l-.5-7.2c0-.8.6-1.5 1.4-1.5h.5c.8 0 1.5.7 1.5 1.5l-.4 7.2z"
                  ></path>
                </svg>
              </span>
              <span className="input-error-text">
                Enter your name
              </span>
            </label>
            <label class="requiredField">
              Email
              <input type="text" name="email" required/>
              <span className="input-error-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                  <path
                    fill="#B91B37"
                    d="M12 .7a11.3 11.3 0 100 22.6A11.3 11.3 0 0012 .7zM12 19a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm1.3-5.6c0 .8-.5 1.4-1.1 1.4h-.4c-.6 0-1-.6-1-1.4l-.5-7.2c0-.8.6-1.5 1.4-1.5h.5c.8 0 1.5.7 1.5 1.5l-.4 7.2z"
                  ></path>
                </svg>
              </span>
              <span className="input-error-text">
                Enter your email
              </span>
            </label>
            <label class="requiredField">
              Topic
              <div className="form-select">
              <select name="subject" defaultValue={''} required>
                <option value="" disabled>Select an option</option>
                <option value="Dataset / technical help">Dataset / technical help</option>
                <option value="Report an issue with the site">Report an issue with the site</option>
                <option value="Share feedback">Share feedback</option>
                <option value="Upload">Upload</option>
                <option value="Search">Search</option>
                <option value="Something else">Something else</option>
              </select>
              <span className="input-error-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                  <path
                    fill="#B91B37"
                    d="M12 .7a11.3 11.3 0 100 22.6A11.3 11.3 0 0012 .7zM12 19a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm1.3-5.6c0 .8-.5 1.4-1.1 1.4h-.4c-.6 0-1-.6-1-1.4l-.5-7.2c0-.8.6-1.5 1.4-1.5h.5c.8 0 1.5.7 1.5 1.5l-.4 7.2z"
                  ></path>
                </svg>
              </span>
              <span className="input-error-text">
                Select a topic
              </span>
            </div>
            </label>
            <label>
              Page link <span className="thin">(optional)</span>
              <input type="text" name="Page link"/>
              <span className="input-error-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                  <path
                    fill="#B91B37"
                    d="M12 .7a11.3 11.3 0 100 22.6A11.3 11.3 0 0012 .7zM12 19a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm1.3-5.6c0 .8-.5 1.4-1.1 1.4h-.4c-.6 0-1-.6-1-1.4l-.5-7.2c0-.8.6-1.5 1.4-1.5h.5c.8 0 1.5.7 1.5 1.5l-.4 7.2z"
                  ></path>
                </svg>
              </span>
              
            </label>
            <label class="requiredField">
              Comment
              <textarea type="text" name="body" rows="4" cols="50" placeholder="Be sure to include links, if needed." required></textarea>
              <span className="input-error-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                  <path
                    fill="#B91B37"
                    d="M12 .7a11.3 11.3 0 100 22.6A11.3 11.3 0 0012 .7zM12 19a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm1.3-5.6c0 .8-.5 1.4-1.1 1.4h-.4c-.6 0-1-.6-1-1.4l-.5-7.2c0-.8.6-1.5 1.4-1.5h.5c.8 0 1.5.7 1.5 1.5l-.4 7.2z"
                  ></path>
                </svg>
              </span>
              <span className="input-error-text">
                Provide information about why you’re contacting us.
              </span>
            </label>
            <input className="contact-button" type="submit" value="Submit" class="g-recaptcha" data-sitekey="6LdsVoAhAAAAAMVLBexkuC9rOFAh0gLIZBECUpX_" data-callback='onSubmit' data-action='submit' />
          </form>
          <div id="confirmationMessage" style={{display:"none"}} className="lead-text">Thanks for contacting us! We will be in touch with you shortly.</div>
        </div>
      </article>
    </main>

    <script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js">
    </script>

    <script
      dangerouslySetInnerHTML={{
        __html: `
        (function(){
          emailjs.init("Dpb9-WXGtDMJ1SL9v")
        })();
        `,
      }}
    />

    <script
      dangerouslySetInnerHTML={{
        __html: `
          window.onload = function() {
            document.getElementById('contact-form').addEventListener('submit', function(event) {
              event.preventDefault();

              var formLabels = document.querySelectorAll('.requiredField'), i;
              var thereWasAnError = 0;

              for (i = 0; i < formLabels.length; ++i) {
                if (formLabels[i].querySelector("textarea, input, select").value == "") {
                  formLabels[i].classList.add("input-error");
                  formLabels[i].getElementsByClassName('input-error-icon')[0].style.display = "block";
                  formLabels[i].getElementsByClassName('input-error-text')[0].style.display = "block";
                  document.getElementById('error-banner').style.display = "grid";
                  thereWasAnError = 1;
                }
              }

              if (!thereWasAnError) {
                emailjs.sendForm('service_c900y85', 'template_hqd9w0v', this)
                  .then(function() {
                      console.log('SUCCESS!');
                  }, function(error) {
                      console.log('FAILED...', error);
                  });

                document.querySelector("#error-banner").style.display = "none";
                document.querySelector("#error-banner").style.visibility = "hidden";
                document.querySelector("#contact-form").style.display = "none";
                document.querySelector("#confirmationMessage").style.display = "block";
              }

            });
          }
        `,
      }}
    />

    <script src="https://www.google.com/recaptcha/api.js"></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `
        function onSubmit(token) {
          document.getElementById("demo-form").submit();
        }
        `,
      }}
    />

    </>
  );
}