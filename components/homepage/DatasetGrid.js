import Link from "next/link";

function Component(props) {
  return (
    <>
      <div className="cagov-grid">
        {props.datasets.map((topic, index) => (
          <Link key={index} href={"/dataset?name=" + topic.url} passHref>
            <a className="no-deco cagov-card">
              <span className="card-text">{topic.title}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6.23 20.23L8 22 18 12 8 2 6.23 3.77 14.46 12z"
                ></path>
              </svg>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Component;
