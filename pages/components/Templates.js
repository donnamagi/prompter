import { React, useEffect, useState } from 'react';
import { fillPlaceholders, callAPI } from '../../utils/index';
import Button from './Button';
import { marked } from 'marked';

export default function Templates({ setResult }) {
  const [templates, setTemplates] = useState({});
  const [isLoading, setIsLoading] = useState('Loading templates');

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/notion/get_templates');

        if (response.status !== 200) {
          throw data.error || new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();

        setTemplates(data);
        setIsLoading('');

      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    fetchTemplates();
  }, []);

  async function getTemplateContent(key) {

    try {
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
  
      const filled_template = await fillPlaceholders(data);
      if (filled_template === null) return; // user cancelled

      setIsLoading('Loading AI response');
  
      const api_response = await callAPI(filled_template);
      const parsed_result = marked.parse(api_response);
      setResult(parsed_result);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }
  
  return (
    <>
      <h1>Templates</h1>
      <p>Choose a template to get started.</p>
      {Object.keys(templates).length > 0 && Object.keys(templates).map((key) => (
        <Button onClick={() => getTemplateContent(key)} title={key} />
      ))}
      <p> {isLoading} </p> 
    </>
  )
}
