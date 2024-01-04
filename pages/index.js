import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { marked } from 'marked';
import styles from "./index.module.css";
import { fillPlaceholders, getTemplate, templates, replaceSelection, callAPI, renderer } from '../utils';

marked.use({ renderer });

export default function Home() {
  const [result, setResult] = useState();
  const containerRef = useRef(null);

  async function onSubmit(event) {
    event.preventDefault();

    const template = await getTemplate(event.target.value);
    const filled_template = await fillPlaceholders(template);

    if (filled_template === null) return; // user cancelled

    const api_response = await callAPI(filled_template);
    const html = marked.parse(api_response);

    setResult(html);
  }

  useEffect(() => {
    const container = containerRef.current;
    let hoverTarget = null;

    const handleClick = (event) => {
      event.stopPropagation();
      replaceSelection(hoverTarget)
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
