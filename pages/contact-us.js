
import Link from "next/link";

export default function preview(dataset) {
  return (
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
          <li>
            <Link href="/about" passHref>
              <a>About</a>
            </Link>
          </li>
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
          <form id="contact-form" className="contact-form" action="mailto:opendata@state.ca.gov" method="post" encType="text/plain">
            <label>
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
            <label>
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
            <label>
              Topic
              <div class="form-select">
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
            <label>
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
            <input className="contact-button" type="submit" value="Submit" />
          </form>
        </div>
      </article>
    </main>
  );
}