import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";
import fillPlaceholders from "../utils/process";
import { getTemplate, templates } from "../utils/get_template";
import { marked } from 'marked';
import { renderer } from '../utils/set_render';

marked.use({ renderer });

export default function Home() {
  const [result, setResult] = useState();
  const containerRef = useRef(null);

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

  async function setModifications(key, comment) {
    const api_response = await callAPI(comment);
    const html = marked.parse(api_response);
    document.querySelector(`#${key}`).outerHTML = html;
  }

  useEffect(() => {
    const container = containerRef.current;
    let hoverTarget = null;

    const handleClick = (event) => {
      event.stopPropagation();

      const userComment = prompt('What would you change?');
      if (userComment === null) return null;

      const id = hoverTarget.id;
      const content = hoverTarget.textContent;
      const comment = `"${content}" ${userComment}`;

      setModifications(id, comment);
    }

    const handleMouseEnter = (event) => {
      hoverTarget = event.target.closest(`.${styles.target}`);
      const parent = event.target.parentElement;
      const grandparent = parent.parentElement;

      if (event.target.matches(`.${styles.target}`)) {
        if (parent.matches(`.${styles.target}`)) {
          parent.classList.add(`${styles.childHoverActive}`);
        } else if (grandparent.matches(`.${styles.target}`)) {
          grandparent.classList.add(`${styles.childHoverActive}`);
        }
      }

      event.target.addEventListener('click', handleClick);
    };

    const handleMouseLeave = (event) => {
      const parent = event.target.parentElement;

      if (parent.matches(`.${styles.childHoverActive}`)) {
        parent.classList.remove(`${styles.childHoverActive}`);
      }

      event.target.removeEventListener('click', handleClick);
      hoverTarget = null;
    };

    container.addEventListener('mouseenter', handleMouseEnter, true); // listening during the capture phase
    container.addEventListener('mouseleave', handleMouseLeave, true);

    // cleanup function 
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter, true);
      container.removeEventListener('mouseleave', handleMouseLeave, true);
      if (hoverTarget) {
        hoverTarget.removeEventListener('click', handleClick);
      }
    };
  }, [result]); 


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
            ref= {containerRef} 
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
