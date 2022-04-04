import Link from 'next/link'

export default function linkGrid() {
  return (
    <div className="cagov-grid page-container-ds">
        <a href="/card-link" className="no-deco cagov-card">
        <span className="card-text">card title here</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M6.23 20.23L8 22 18 12 8 2 6.23 3.77 14.46 12z"></path>
        </svg>
        </a>
        <a href="/card-link" className="no-deco cagov-card">
        <span className="card-text"
          >this is an example of a very long text string card title here</span
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M6.23 20.23L8 22 18 12 8 2 6.23 3.77 14.46 12z"></path>
        </svg>
        </a>
        <a href="/card-link" className="no-deco cagov-card">
          <span className="card-text">card title 3 here</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M6.23 20.23L8 22 18 12 8 2 6.23 3.77 14.46 12z"></path>
          </svg>
        </a>
    </div>
  )
}