import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import fillPlaceholders from "../utils/process";
import { getTemplate, templates } from "../utils/get_template";

export default function Home() {
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    console.log('we here??')

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

      var api_response = data.result[data.result.length - 1];
      setResult(styleResponse(api_response.content));

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
      <div key={index} id={index} className={styles.result} onClick={() => onSpecify(index, content)}>
        <p>{content}</p>
      </div>
    );
    styledParagraphs.push(paragraph);
  });

  return styledParagraphs;
}

function getComment(key, input) {
  const userComment = prompt('What would you change?');
  return `${key} --- "${input}" ${userComment}`;
}

async function onSpecify(key, input) {

  const comment = getComment(key, input);

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: comment }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }

    var api_response = data.result[data.result.length - 1];

    const { id, content } = getKey(api_response.content);
    replaceContent(id, content);
    
  } catch(error) {
    console.error(error);
    alert(error.message);
  }
}

function getKey(syntax) {
  const res = syntax.split('---');
  if (res.length != 2) {
    throw new Error(`Invalid syntax ${syntax}`);
  }
  const id = res[0].trim();
  const content = res[1].trim();
  return { id, content };
}

function replaceContent(id, content) {
  try {
    const div = document.getElementById(id);
    div.firstChild.textContent = content;
  } catch {
    throw new Error(`Invalid id ${id}`);
  }
}
