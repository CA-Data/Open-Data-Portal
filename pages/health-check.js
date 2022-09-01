import Head from "next/head";

export default function Preview() {
  return (
    <>
      <Head>
        <title>Health check | CA Open Data</title>
        <meta
          name="description"
          content="Check the status of the State of California Open Data website."
        ></meta>
      </Head>
      <main id="body-content" className="cagov-main">
        <h1>Health check: Ok</h1>
      </main>
    </>
  );
}
