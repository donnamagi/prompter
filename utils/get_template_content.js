import { fillPlaceholders, callAPI } from './index';
import { marked } from 'marked';

export async function getTemplateContent(key, templates) {
  console.log(templates);
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

    const api_response = await callAPI(filled_template);
    const parsed_result = marked.parse(api_response);
    return parsed_result;

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}
