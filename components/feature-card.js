import Image from 'next/image'
import Link from 'next/link'

export default function featureCard() {
  return (
    <div className="wp-block-ca-design-system-hero cagov-with-sidebar cagov-with-sidebar-left cagov-featured-section cagov-bkgrd-gry cagov-block wp-block-cagov-hero">
      <div className="page-container-ds">
        <div className="cagov-stack cagov-p-2 cagov-featured-sidebar">
          <h1>Promoting progress and engagement</h1>
          <div className="cagov-hero-body-content">
            <p>
            Open data increases transparency, informs decision making, and creates opportunities.
            </p>
            <div className="search-container grid-search">
            <form className="site-search" action="/results/">
              <span className="sr-only" id="SearchInput">Custom Google Search</span>
              <input
                type="text"
                id="q"
                name="q"
                aria-labelledby="SearchInput"
                placeholder="Search datasets"
                className="search-textfield"
                style={{width: 'auto', color: '#fff', border: '1px solid var(--primary-color, #046A99)', padding: '.5rem', borderRadius: '.25rem'}}
              />
              <button
                style={{outlineOffset: -2, right: 5, backgroundColor: 'var(--primary-color, #046A99)', border: '1px solid var(--primary-color, #046A99)', borderRadius: '0px 4px 4px 0px', padding: '8px 14px', position: 'relative'}}
                type="submit"
                className="search-submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 17 17"
                  viewBox="0 0 17 17"
                >
                  <path
                    fill="#fff"
                    d="M16.4 15.2l-4-4c2-2.6 1.8-6.5-.6-8.9-1.3-1.3-3-2-4.8-2s-3.5.7-4.8 2c-2.6 2.6-2.6 6.9 0 9.6 1.3 1.3 3 2 4.8 2 1.4 0 2.9-.5 4.1-1.4l4.1 4c.2.2.4.3.7.3.2 0 .5-.1.7-.3.1-.3.1-.9-.2-1.3zM7 12c-1.3 0-2.6-.5-3.5-1.4-1.9-1.9-1.9-5.1 0-7 .9-.9 2.1-1.5 3.5-1.5s2.6.5 3.5 1.4 1.4 2.2 1.4 3.5-.5 2.6-1.4 3.5c-1 1-2.2 1.5-3.5 1.5z"
                  ></path>
                </svg>
                <span className="sr-only">Submit</span>
              </button>
              <button className="search-close">Close</button>
            </form>
          </div>
            
          </div>
        </div>
        <div>
          <Image
            className="cagov-featured-image"
            src="../images/feature-card-placeholder.jpeg"
            alt=""
          />
          
        </div>
      </div>
    </div>
  )
}