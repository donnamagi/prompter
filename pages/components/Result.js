import { React, useEffect, useState } from 'react';
import { replaceSelection } from '../../utils/index';
import styles from '../index.module.css';

export default function Result({ result }) {
  const [hoverTarget, setHoverTarget] = useState(null);

  const handleClick = (event) => {
    event.stopPropagation();
    console.log(hoverTarget)
    replaceSelection(hoverTarget); // api call, replaces the target with the result
  };

  const handleMouseEnter = (event) => {
    const target = event.target;
    const parent = event.target.parentElement;
    const grandparent = parent.parentElement;

    if (target && target.matches(`.${styles.target}`)) {
      if (parent.matches(`.${styles.target}`)) {
        parent.classList.add(`${styles.childHoverActive}`);
      } else if (grandparent.matches(`.${styles.target}`)) {
        grandparent.classList.add(`${styles.childHoverActive}`);
      }
    }

    setHoverTarget(target);
    event.target.addEventListener('click', handleClick);
  };

  const handleMouseLeave = (event) => {
    const parent = event.target.parentElement;

    if (parent.matches(`.${styles.childHoverActive}`)) {
      parent.classList.remove(`${styles.childHoverActive}`);
    }

    event.target.removeEventListener('click', handleClick);
    setHoverTarget(null);
  };

  useEffect(() => {
    const container = document.getElementById('resultContainer');
    container.addEventListener('mouseenter', handleMouseEnter, true); // listening during the capture phase
    container.addEventListener('mouseleave', handleMouseLeave, true);

    // cleanup 
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter, true);
      container.removeEventListener('mouseleave', handleMouseLeave, true);
      if (hoverTarget) {
        hoverTarget.removeEventListener('click', handleClick);
      }
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