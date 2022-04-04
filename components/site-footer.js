import Image from 'next/image'
import Link from 'next/link'

export default function SiteFooter() {
  return (
  <section aria-label="Site footer" className="site-footer page-container-ds">
    <div className="container">
      <div className="footer-logo">
        <Link href="/">
          <a>
            <Image
              className="logo-img"
              src="https://files.covid19.ca.gov/img/circle-logo.png"
              alt="Organization logo"
            />
          </a>
        </Link>
      </div>
      <div className="footer-secondary-links">
        <a href="/link-1">Secondary link 1</a>
        <a href="/link-2">Secondary link 2</a>
        <a href="/link-3">Secondary link 3</a>
        <a href="/link-4">Secondary link 4</a>
      </div>
      <div className="footer-social-links">
        <a href="/social-link">
          <span className="sr-only">Facebook</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            x="0"
            y="0"
            ariaHidden="true"
            enableBackground="new 0 0 24 24"
          >
            <path d="M14 12.7h3.2l.5-3.7H14V6.7c0-1 .3-1.9 1.9-1.9H18V1.5c-.3 0-1.6-.2-2.9-.2-2.9 0-4.9 1.7-4.9 5.1v2.9H6.9V13h3.2v9.5H14v-9.8z"></path>
          </svg>
        </a>
        <a href="/social-link">
          <span className="sr-only">GitHub</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            x="0"
            y="0"
            ariaHidden="true"
            enableBackground="new 0 0 24 24"
          >
            <path d="M23.3 12.8c0 .3-.1.7-.1 1-.2 1.5-.7 3-1.5 4.3-.9 1.5-2.1 2.7-3.5 3.6-.8.5-1.6.9-2.4 1.2-.5.2-.8-.1-.8-.6v-2.9c0-.6-.1-1.2-.4-1.7-.1-.2-.2-.3-.3-.4.4-.1.9-.1 1.3-.2 1.1-.3 2.2-.8 2.9-1.8.5-.7.7-1.6.9-2.5.1-.7.1-1.4 0-2.1s-.4-1.3-.9-1.8c-.1-.1-.1-.2-.1-.4.3-.9.2-1.8-.2-2.7 0-.1-.1-.1-.2-.1-.4-.1-.8.1-1.1.2-.8.1-1.4.4-1.9.7-.1 0-.2.1-.3.1-1.8-.4-3.5-.4-5.3 0-.1 0-.2 0-.3-.1-.7-.5-1.5-.8-2.3-1-.6-.1-.7-.1-.9.4-.2.8-.3 1.6 0 2.4v.2C5 9.7 4.7 11 4.8 12.3c.1.8.3 1.6.6 2.3.5 1 1.4 1.6 2.4 2 .7.2 1.3.3 2 .5-.4.4-.5.8-.6 1.3 0 .1-.1.2-.1.2-.8.3-1.6.4-2.3 0-.4-.2-.6-.5-.8-.9-.3-.6-.8-1-1.4-1.1-.2-.1-.5 0-.7 0s-.2.1-.1.3l.3.3c.6.3.9.9 1.2 1.5.2.4.3.7.6 1 .5.4 1.1.6 1.7.6h1.6V22.2c0 .6-.3.8-.9.6-2.9-1-5-2.9-6.4-5.5-1.1-2-1.4-4.1-1.1-6.4.3-2.4 1.2-4.4 2.7-6.2 1.6-1.8 3.6-3.1 6-3.6 3.5-.7 6.7 0 9.5 2.3 2.1 1.7 3.4 3.9 4 6.6.1.4.1.8.2 1.2v.2c.1.5.1.9.1 1.4z"></path>
          </svg>
        </a>
        <a href="/social-link">
          <span className="sr-only">Twitter</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            x="0"
            y="0"
            ariaHidden="true"
            enableBackground="new 0 0 24 24"
          >
            <path d="M21.2 8v.6c0 6-4.6 12.9-12.9 12.9-2.6 0-4.9-.7-7-2 .3 0 .7.1 1 .1 2.2 0 4.1-.7 5.7-1.9-2 0-3.6-1.4-4.2-3.1.3.1.6.1.9.1.4 0 .9-.1 1.2-.1-2-.4-3.6-2.2-3.6-4.5V10c.6.3 1.3.6 2 .6-1.2-.9-2-2.2-2-3.8 0-.9.2-1.6.6-2.2 2.2 2.8 5.5 4.6 9.3 4.7-.2-.3-.2-.7-.2-1.1 0-2.5 2-4.5 4.5-4.5 1.3 0 2.5.6 3.3 1.4 1-.2 2-.6 2.9-1-.2 1.1-1 1.9-2 2.5 1-.1 1.8-.3 2.6-.7-.4.6-1.1 1.5-2.1 2.1z"></path>
          </svg>
        </a>
        <a href="/social-link">
          <span className="sr-only">Email</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            x="0"
            y="0"
            ariaHidden="true"
            enableBackground="new 0 0 24 24"
          >
            <path d="M22.9 6.4c-.1-1-.8-1.8-1.8-1.8H3h-.1c-1 0-1.8.8-1.9 1.8v13h21.9V6.6v-.1-.1zm-3.6.1L12 12.7 4.6 6.5h14.7zM3 8.4s0 .1 0 0v-.8l4.8 4.1L3 16.3V8.4zm1 9l4.9-4.8 3.1 2.7 3.2-2.8 4.8 4.9H4zm17-1.1l-4.8-4.6L21 7.6V16.3z"></path>
          </svg>
        </a>
        <a href="/social-link">
          <span className="sr-only">YouTube</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            x="0"
            y="0"
            ariaHidden="true"
            enableBackground="new 0 0 24 24"
          >
            <path d="M23 6.6s-.3-1.6-.9-2.2c-.9-.8-1.8-.8-2.2-.9-3.2-.3-7.9-.3-7.9-.3s-4.7 0-7.9.3c-.4 0-1.4 0-2.2.9-.7.7-.9 2.2-.9 2.2s-.3 2-.3 3.7V12c0 2 .3 3.7.3 3.7s.3 1.6.9 2.2c.8.9 2 .9 2.5.9 1.8.1 7.6.3 7.6.3s4.7 0 7.9-.3c.4 0 1.4 0 2.2-.9.7-.7.9-2.2.9-2.2s.3-1.8.3-3.7v-1.7c-.1-1.9-.3-3.7-.3-3.7zM8.7 15.9V6.6l8.8 4.6-8.8 4.7z"></path>
          </svg>
        </a>
        <a href="/social-link">
          <span className="sr-only">Instagram</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            x="0"
            y="0"
            ariaHidden="true"
            enableBackground="new 0 0 24 24"
          >
            <path d="M16.4 1.5H7.7c-3.4 0-6.2 2.7-6.2 6.2v8.8c0 3.4 2.8 6.1 6.2 6.1h8.8c3.4 0 6.1-2.8 6.1-6.1V7.6c-.1-3.4-2.8-6.1-6.2-6.1zm4 14.9c0 2.2-1.8 4.1-4.1 4.1H7.6c-2.2 0-4.1-1.8-4.1-4V7.7c0-2.2 1.8-4.1 4.1-4.1h8.8c2.2 0 4 1.8 4 4.1v8.7z"></path>
            <path d="M12 7.1c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9 4.9-2.2 4.9-4.9-2.2-4.9-4.9-4.9zm0 7.8c-1.6 0-2.9-1.3-2.9-2.9s1.3-2.9 2.9-2.9 2.9 1.3 2.9 2.9-1.3 2.9-2.9 2.9zM18.5 6.9c0 .7-.6 1.3-1.3 1.3S16 7.6 16 6.9s.6-1.3 1.3-1.3 1.2.6 1.2 1.3z"></path>
          </svg>
        </a>
      </div>
    </div>
  </section>
  )
}