import * as React from 'react';
import { callAPI, replaceSelection } from '../utils/index';
import { Button } from "@/components/ui/button"
import {marked} from "marked"; // convert markdown to html
import TurndownService from "turndown"; // convert html to markdown
import conversation_history from "../pages/api/chat";

import { StateContext } from '@/lib/context/StateContext';

export default function Result() {
  const [result, setResult] = React.useState(null);
  const { template, setTemplate, setCurrentScreen } = React.useContext(StateContext);

  const getResult = async (template) => {
    const response = await callAPI(template.content);
    const html = marked.parse(response);
    setResult(html);
  }

  React.useEffect(() => {
    if (!template) return;
    getResult(template);
  }, []); 

  const handleMouseEnter = (event) => {
    let target = event.target;
    while (target) {
      // update only if youre on a valid target
      if (target.classList.contains('target')) {
        // hide the hovered div(s) below
        let parent = target.parentElement.closest('target');
        if (parent) {
          parent.classList.add('no-hover'); 
        }

      }
      target = target.parentElement;
    }
  }

  const handleMouseLeave = (event) => {
    let target = event.target;
    while (target) {
      // update only if youre on a valid target
      if (target.classList.contains('target')) {
        let parent = target.parentElement.closest('target');
        if (parent) {
          parent.classList.remove('no-hover'); 
          break // only show the one closest to the mouse
        }
      }
      // check next parent
      target = target.parentElement;
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
    const target = event.target.closest('target');
    if (target) {
      replaceSelection(target); // API call with the closest matching element
    }  
  }

  // React.useEffect(() => {
  //   const container = document.getElementById('resultContainer');
  //   container.addEventListener('mouseenter', handleMouseEnter, true); // listening during the capture phase
  //   container.addEventListener('mouseleave', handleMouseLeave, true);
  //   container.addEventListener('click', handleClick, true);

  //   // cleanup 
  //   return () => {
  //     container.removeEventListener('mouseenter', handleMouseEnter, true);
  //     container.removeEventListener('mouseleave', handleMouseLeave, true);
  //     container.removeEventListener('click', handleClick, true);
  //   };
  // }, [result]);

  const restart = () => {
    setCurrentScreen('search');
    setTemplate(null);
    conversation_history.splice(1); // leaving the system prompt only
  }

  const copy = () => {
    var turndownService = new TurndownService()
    const html = result.innerHTML;
    var markdown = turndownService.turndown(html);
    navigator.clipboard.writeText(markdown)
      .then(() => {
        console.log("Copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard:", error);
      });
  };

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: result }}
        id="resultContainer"
      />
      <div className="flex justify-between mt-4">
        <Button variant='outline' onClick={restart}>Restart</Button>
        <Button onClick={copy}>Copy</Button>
      </div>
    </>
  );
}
