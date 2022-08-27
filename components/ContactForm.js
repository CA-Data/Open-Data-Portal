function Component(props) {
  return (
    <>
      <div id="error-banner" className="contact-form-alert">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
        >
          <path
            fill="#B91B37"
            d="M12 .7a11.3 11.3 0 100 22.6A11.3 11.3 0 0012 .7zM12 19a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm1.3-5.6c0 .8-.5 1.4-1.1 1.4h-.4c-.6 0-1-.6-1-1.4l-.5-7.2c0-.8.6-1.5 1.4-1.5h.5c.8 0 1.5.7 1.5 1.5l-.4 7.2z"
          ></path>
        </svg>
        <p>Correct the errors to continue</p>
      </div>
      <form
        id="contact-form"
        className="contact-form"
        method="post"
        encType="text/plain"
        noValidate="novalidate"
      >
        <label className="requiredField">
          Name
          <input type="text" name="name" required />
          <span className="input-error-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
            >
              <path
                fill="#B91B37"
                d="M12 .7a11.3 11.3 0 100 22.6A11.3 11.3 0 0012 .7zM12 19a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm1.3-5.6c0 .8-.5 1.4-1.1 1.4h-.4c-.6 0-1-.6-1-1.4l-.5-7.2c0-.8.6-1.5 1.4-1.5h.5c.8 0 1.5.7 1.5 1.5l-.4 7.2z"
              ></path>
            </svg>
          </span>
          <span className="input-error-text">Enter your name</span>
        </label>
        <label className="requiredField">
          Email
          <input type="text" name="email" required />
          <span className="input-error-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
            >
              <path
                fill="#B91B37"
                d="M12 .7a11.3 11.3 0 100 22.6A11.3 11.3 0 0012 .7zM12 19a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm1.3-5.6c0 .8-.5 1.4-1.1 1.4h-.4c-.6 0-1-.6-1-1.4l-.5-7.2c0-.8.6-1.5 1.4-1.5h.5c.8 0 1.5.7 1.5 1.5l-.4 7.2z"
              ></path>
            </svg>
          </span>
          <span className="input-error-text">Enter your email</span>
        </label>
        <label className="requiredField">
          Topic
          <span className="form-select">
            <select name="subject" defaultValue={""} required>
              <option value="" disabled>
                Select an option
              </option>
              <option value="Dataset / technical help">
                Dataset / technical help
              </option>
              <option value="Report an issue with the site">
                Report an issue with the site
              </option>
              <option value="Share feedback">Share feedback</option>
              <option value="Something else">Something else</option>
            </select>
            <span className="input-error-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
              >
                <path
                  fill="#B91B37"
                  d="M12 .7a11.3 11.3 0 100 22.6A11.3 11.3 0 0012 .7zM12 19a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm1.3-5.6c0 .8-.5 1.4-1.1 1.4h-.4c-.6 0-1-.6-1-1.4l-.5-7.2c0-.8.6-1.5 1.4-1.5h.5c.8 0 1.5.7 1.5 1.5l-.4 7.2z"
                ></path>
              </svg>
            </span>
            <span className="input-error-text">Select a topic</span>
          </span>
        </label>
        <label>
          Page link <span className="thin">(optional)</span>
          <input type="text" name="Page link" />
          <span className="input-error-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
            >
              <path
                fill="#B91B37"
                d="M12 .7a11.3 11.3 0 100 22.6A11.3 11.3 0 0012 .7zM12 19a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm1.3-5.6c0 .8-.5 1.4-1.1 1.4h-.4c-.6 0-1-.6-1-1.4l-.5-7.2c0-.8.6-1.5 1.4-1.5h.5c.8 0 1.5.7 1.5 1.5l-.4 7.2z"
              ></path>
            </svg>
          </span>
        </label>
        <label className="requiredField">
          Comment
          <textarea
            name="body"
            rows="4"
            cols="50"
            placeholder="Be sure to include links, if needed."
            required
          ></textarea>
          <span className="input-error-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
            >
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
        <input className="contact-button g-recaptcha" type="submit" value="Submit" data-sitekey="6LdsVoAhAAAAAMVLBexkuC9rOFAh0gLIZBECUpX_" data-callback='onSubmit' data-action='submit' />
      </form>
      <div
        id="confirmationMessage"
        style={{ display: "none" }}
        className="lead-text"
      >
        Thanks for contacting us! We will be in touch with you shortly.
      </div>
    </>
  );
}

export default Component;
