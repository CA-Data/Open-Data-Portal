import Link from "next/link";

export default function Custom404() {
  return (
    <>
    <main id="body-content" className="cagov-main">
        <article
          id="post-design"
          className="cagov-article"
        >
        <h1>Page not found</h1>
        <p>We’re sorry, that link didn’t work. To find what you need, you can:</p>
        <ul>
          <li>Browse our <Link href="/"><a>homepage</a></Link></li>
          <li>Make sure the link is correct</li>
          <li>Use <Link href="/results"><a>search</a></Link> or the <Link href="/site-map"><a>site map</a></Link></li>
          <li>Check out these popular links
            <ul>
              <li><Link href="/"><a>Topics</a></Link></li>
              <li><Link href="/"><a>COVID-19 data</a></Link></li>
              <li><Link href="/"><a>California geographic boundaries</a></Link></li>
              <li><Link href="/"><a>County and ZIP code</a></Link></li>
            </ul>
          </li>
          <li>Did you get here from a link on our website? <Link href="/contact-us"><a>Let us know</a></Link> so we can fix it.</li>
        </ul>
        <p className="">Error: Page not found (404)</p>
        </article>
        </main>
    </>
  )
}
