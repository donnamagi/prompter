import { React, useEffect, useState } from 'react';
import SearchBar from './SearchBar';

export default function Templates({ setResult }) {
  const [templates, setTemplates] = useState({});

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/notion/get_templates');

        if (response.status !== 200) {
          throw data.error || new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();

        setTemplates(data);

      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    fetchTemplates();
  }, []);
  
  return (
    <>
      <SearchBar templates={templates} setResult={setResult}/>
    </>
  )
}
