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
          <li>Contact us</li>
        </ol>
      </nav>
      <article
        id="post-design"
        className="cagov-article with-page-nav"
      >

        <div className={styles.container}>
          <h1>Contact Us</h1>
          <p>Have questions or need to report and issue? We&apos;re here to help.</p>
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
              Comment
              <textarea type="text" name="comment" rows="4" cols="50"></textarea>
            </label>
            <input className="contact-button" type="submit" value="Submit" />
          </form>
        </div>
      </article>
    </main>
  );
}
