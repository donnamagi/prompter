import { React, useEffect } from 'react';
import { replaceSelection } from '../../utils/index';
import styles from '../index.module.css';

export default function Result({ result }) {

  const handleMouseEnter = (event) => {
    if (event.target.classList.contains(`${styles.childHoverActive}`)) return; // if the parent is already hidden, do nothing
    if (event.target.classList.contains(`${styles.target}`)) {
      const target_below = event.target.parentElement.closest(`.${styles.target}`);
      if (target_below) {
        target_below.classList.add(`${styles.childHoverActive}`); //hides the parent's hover effect
      }
    }
  }

  const handleMouseLeave = (event) => {
    const target_below = event.target.parentElement.closest(`.${styles.childHoverActive}`);
    if (target_below) {
      target_below.classList.remove(`${styles.childHoverActive}`); // unhides the parent's hover effect
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
