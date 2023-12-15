import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import milestone_template from "./prompts/milestone_template";
import fillPlaceholders from "./api/process";

export default function Home() {
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    const result = await fillPlaceholders(milestone_template);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: result }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      var last_response = data.result[data.result.length - 1];
      setResult(prevResult => {
        const previous = Array.isArray(prevResult) ? prevResult : [];
        const newContent = Array.isArray(styleResponse(last_response.content)) ? styleResponse(last_response.content) : [];
      
        return [...previous, ...newContent];
      });
      
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>test</title>
      </Head>

      <main className={styles.main}>
        <h3>Test</h3>
        <div className={styles.result}>{result}</div>
        <form onSubmit={onSubmit}>
          <input type="submit" value="Milestone Template" />
        </form>
      </main>
    </div>
  );
}

function styleResponse(response) {
  const paragraphs = response.split('\n\n');
  const styledParagraphs = [];

  paragraphs.forEach((content) => {
    const paragraph = (
      <p className={styles.result}>
        {content}
      </p>
    );
    styledParagraphs.push(paragraph);
  });

  return styledParagraphs;
}
