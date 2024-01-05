import { React, useEffect } from 'react';
import { replaceSelection } from '../../utils/index';
import styles from '../index.module.css';

export default function Result({ result }) {

  const handleMouseEnter = (event) => {
    let target = event.target;
    while (target) {
      // update only if youre on a valid target
      if (target.classList.contains(`${styles.target}`)) {
        // hide the hovered div(s) below
        let parent = target.parentElement.closest(`.${styles.target}`);
        if (parent) {
          parent.classList.add(`${styles.childHoverActive}`); 
        }

      }
      target = target.parentElement;
    }
  }

  const handleMouseLeave = (event) => {
    let target = event.target;
    while (target) {
      // update only if youre on a valid target
      if (target.classList.contains(`${styles.target}`)) {
        let parent = target.parentElement.closest(`.${styles.target}`);
        if (parent) {
          parent.classList.remove(`${styles.childHoverActive}`); 
          break // only show the one closest to the mouse
        }
      }
      // check next parent
      target = target.parentElement;
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
    const target = event.target.closest(`.${styles.target}`);
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
      className={styles.result}
      dangerouslySetInnerHTML={{ __html: result }}
      id="resultContainer"
    />
  );
}
