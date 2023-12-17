import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import fillPlaceholders from "../utils/process";
import { getTemplate, templates } from "../utils/get_template";

export default function Home() {
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    const template = await getTemplate(event.target.value);
    const result = await fillPlaceholders(template);

    if (result === null) return; // user cancelled

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
        <title>Prompt templates</title>
      </Head>

      <main className={styles.main}>
        <h3>Test</h3>
        <div className={styles.result}>{result}</div>
        <form onSubmit={onSubmit}>
          {Object.keys(templates).map((key) => (
            <input
              key={key}
              type="button"
              name="template"
              value={key}
              onClick={onSubmit}
            />
          ))}
        </form>
      </main>
    </div>
  );
}

function styleResponse(response) {
  const paragraphs = response.split('\n\n');
  const styledParagraphs = [];

  paragraphs.forEach((content, index) => {
    const paragraph = (
      <p key={index} className={styles.result}>
        {content}
      </p>
    );
    styledParagraphs.push(paragraph);
  });

  return styledParagraphs;
}
