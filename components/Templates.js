import { React, useEffect, useState } from 'react';
import Search from './Search';

export default function Templates({ setResult }) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/notion/get_templates');

        if (response.status !== 200) {
          throw data.error || new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        return data

      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    async function getTemplateContent() {
      let templates = await fetchTemplates();
      setTemplates(templates);
      
      for (const key in templates) {
        const id = templates[key].id;
        const response = await fetch('/api/notion/get_content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        const data = await response.json();
        if (response.status !== 200) {
          throw data.error || new Error(`Request failed with status ${response.status}`);
        }
        templates[key].content = data;
      }
      setTemplates(templates);
      console.log('done with template fetch :)');
    }

    getTemplateContent();
  }, []);
  
  return (
    <>
    { (templates.length !== 0) ?
      <Search templates={templates} setResult={setResult}/> : 'Loading...'
    }
    </>
  )
}
