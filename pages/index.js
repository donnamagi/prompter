import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import fillPlaceholders from "../utils/process";
import { getTemplate, templates } from "../utils/get_template";
import { marked } from 'marked';
import { renderer } from '../utils/set_render';

marked.use({ renderer });

export default function Home() {
  const [result, setResult] = useState();

  async function callAPI(input) {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });
  
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
  
      const api_response = data.result[data.result.length - 1];
      return api_response.content;
      
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  async function onSubmit(event) {
    event.preventDefault();

    const template = await getTemplate(event.target.value);
    const result = await fillPlaceholders(template);

    if (result === null) return; // user cancelled

    const api_response = await callAPI(result);
    const html = marked.parse(api_response);

    setResult(html);
  }

  return (
    <div>
      <Head>
        <title>Prompt templates</title>
      </Head>

      <main className={styles.main}>
        <h3>Test</h3>
        <div  
            className={styles.result} 
            dangerouslySetInnerHTML={{ __html: result }} 
        />
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
