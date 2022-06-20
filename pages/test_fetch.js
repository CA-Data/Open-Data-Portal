import { margin } from "@mui/system";
import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps() {
    const topicArray = []
    const response = await fetch('https://test-data.technology.ca.gov/api/3/action/organization_list')
    .then(async response => {
        if (!response.ok) {
            const text = await response.text();
          throw new Error(`Request rejected with status ${response.status} and message ${text}`);
        }
        else {
            return response.json()
        }
    })
    .then(data => {
        console.log(`OK: ${data}`);
    })
    .catch(error =>
        console.log(`Catch 3: ${error}`)
    );
    
  
  return {
    props: {topics: topicArray},
  }
}
export default function Home(data) {
  return (
    <>
      <main className="home-page">
        <h1>testing</h1>
      </main>
    </>
  );
}
