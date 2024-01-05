import React from 'react'
import { templates, getTemplate, fillPlaceholders, callAPI } from '../../utils/index';
import { marked } from 'marked';

export default function Templates({ setResult }) {
  async function onSubmit(event) {
    event.preventDefault();

    const template = await getTemplate(event.target.value);
    const filled_template = await fillPlaceholders(template);

    if (filled_template === null) return; // user cancelled

    const api_response = await callAPI(filled_template);
    const parsed_result = marked.parse(api_response);    
    setResult(parsed_result);
    
  }
  return (
    <div>
      <h1>Templates</h1>
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
    </div>
  )
}
