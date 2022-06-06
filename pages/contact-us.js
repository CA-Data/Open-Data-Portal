import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function preview(dataset) {
  return (
    <main id="body-content" className="cagov-main">
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
            <Link href="/" passHref>
              <a>about</a>
            </Link>
          </li>
          <li>Contact us</li>
        </ol>
      </nav>
      <article
        id="post-design"
        className="cagov-article with-page-nav"
      >

        <div className={styles.container}>
          <h1>Contact Us</h1>
          <p className="lead-text">Have questions or need to report an issue? We’re here to help.</p>
          <ul>
          <li>If you have a question about a specific dataset, contact the data steward from the dataset.</li>
          <li>If you have a technical issue about a dataset, be sure to include the name and link of the dataset.</li>
          </ul>
          <form className="contact-form">
            <label>
              Name
              <input type="text" name="name" />
            </label>
            <label>
              Email
              <input type="text" name="email" />
            </label>
            <label>
              Topic
            <select>
              <option value="Dataset / technical help">Dataset / technical help</option>
              <option value="Report an issue with the site">Report an issue with the site</option>
              <option value="Share feedback">Share feedback</option>
              <option value="Upload">Upload</option>
              <option value="Search">Search</option>
              <option value="Something else">Something else</option>
            </select>
          </label>
          <label>
              Page link
              <input type="text" name="Page link" />
            </label>
            <label>
              Comment
              <textarea type="text" name="comment" rows="4" cols="50"placeholder="Be sure to include links, if needed."></textarea>
            </label>
            <input className="contact-button" type="submit" value="Submit" />
          </form>
        </div>
      </article>
    </main>
  );
}
