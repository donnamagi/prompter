import { React, useEffect } from 'react';
import { replaceSelection } from '../utils/index';
import { Button } from "@/components/ui/button"
import TurndownService from "turndown"; // convert html to markdown
import conversation_history from "../pages/api/chat";

export default function Result({ result, setResult }) {

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

  useEffect(() => {
    const container = document.getElementById('resultContainer');
    container.addEventListener('mouseenter', handleMouseEnter, true); // listening during the capture phase
    container.addEventListener('mouseleave', handleMouseLeave, true);
    container.addEventListener('click', handleClick, true);

    // cleanup 
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter, true);
      container.removeEventListener('mouseleave', handleMouseLeave, true);
      container.removeEventListener('click', handleClick, true);
    };
  }, [result]);

  const restart = () => {
    setResult(null);
    conversation_history.splice(1); // delete the conversation history, system prompt only
  }

  const handleCopy = () => {
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
      <div className="fixed left-44">
        <Button onClick={restart}>Restart</Button>
        <Button onClick={handleCopy}>Copy</Button>
      </div>
    </>
  );
}
