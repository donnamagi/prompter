import {React, useEffect} from "react"
import { replaceSelection } from '@/utils/index';

export default function ChangeBox({result}) {

  const handleMouseEnter = (event) => {
    let target = event.target;
    while (target) {
      if (target.classList.contains('target')) {
        // in case of nested targets, only hover on the most specific one 
        let parent = target.parentElement.closest('.target');
        if (parent) {
          parent.classList.add('no-hover'); 
        }

      }
      target = target.parentElement;
    }
  }

  const handleMouseLeave = (event) => {
    let target = event.target.parentElement;
    let changeMade = false; 
  
    while (target && !changeMade) {
      if (target.classList.contains('target')) {
        let parent = target.closest('.target');
        if (parent) {
          parent.classList.remove('no-hover');
          changeMade = true;
        }
      }
      target = target.parentElement;
    }
  };
  

  const handleClick = (event) => {
    event.stopPropagation();
    const target = event.target.closest('.target');
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

  return (
    <div
    dangerouslySetInnerHTML={{ __html: result }}
    id="resultContainer"
  />
  )
}