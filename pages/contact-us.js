import React, { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import ContactForm from "../components/ContactForm";

export default function Preview(dataset) {
  useEffect(() => {
    function showBanner() {
      const banner = document.getElementById("error-banner");
      if (
        document
          .getElementById("contact-form")
          .getElementsByClassName("input-error").length > 0
      ) {
        banner.style.display = "grid";
      } else {
        banner.style.display = "none";
      }
    }
    function validate(field) {
      var label = field.parentElement;
      if (label.innerText != "Page link (optional)") {
        label.classList.add("input-error");
        label.getElementsByClassName("input-error-icon")[0].style.display =
          "block";
        if (label.getElementsByClassName("input-error-text").length > 0) {
          label.getElementsByClassName("input-error-text")[0].style.display =
            "block";
        }
      }
    }
    if (
      document.getElementsByTagName("main")[0].classList.contains("contact-us")
    ) {
      const form = document.getElementById("contact-form");
      form.addEventListener(
        "focusout",
        (event) => {
          if (event.target.value == "") {
            validate(event.target);
          } else {
            event.target.parentElement.classList.remove("input-error");
            event.target.parentElement.getElementsByClassName(
              "input-error-icon"
            )[0].style.display = "none";
            if (
              event.target.parentElement.getElementsByClassName(
                "input-error-text"
              ).length > 0
            ) {
              event.target.parentElement.getElementsByClassName(
                "input-error-text"
              )[0].style.display = "none";
            }
          }
          showBanner();
        },
        true
      );
    }
  }, []);

  return (
    <>
      <Head>
        <title>Contact us | CA Open Data</title>
        <meta
          name="description"
          content="Contact us at State of California Open Data"
        ></meta>
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
        <article id="post-design" className="cagov-article with-page-nav">
          <div className="content-container">
            <h1>Contact us</h1>
            <p className="lead-text">
              Have questions or need to report an issue? We’re here to help.
            </p>
            <ul>
              <li>
                If you have a question about a specific dataset, contact the
                data steward from the dataset.
              </li>
              <li>
                If you have a technical issue about a dataset, be sure to
                include the name and link of the dataset.
              </li>
            </ul>
            <ContactForm />
          </div>
        </article>
      </main>
      {/*
      BUILD ERROR: 107:7  Error: External synchronous scripts are forbidden. See: https://nextjs.org/docs/messages/no-sync-scripts  @next/next/no-sync-scripts
      Uncomment and run "yarn build" to check for additional errors.
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
      ></script>

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

      */}
    </>
  );
}
