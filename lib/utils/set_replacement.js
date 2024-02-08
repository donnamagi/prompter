import { marked } from 'marked';
import { callAPI } from './index';

export async function replaceSelection(target) {
  const structuredPrompt = getStructuredPrompt(target);
  if (structuredPrompt === null) return; 

  const { id, comment } = structuredPrompt;
  document.querySelector(`#${id}`).innerHTML = 'one sec :)';
  console.log(comment);
  const api_response = await callAPI(comment);
  const res = checkApiResponse(api_response);
  setHTML(id, res);
}

function checkApiResponse(response) {
  if (response.startsWith('"') && response.endsWith('"')) {
    return response.slice(1, -1);
  }
  return response;
}

function getStructuredPrompt(target) {
  const userComment = prompt('What would you change?');
  if (userComment === null) return null;

  const id = target.id;
  const content = target.textContent;
  const answer_in = getMarkdownExplanation(target.tagName.toLowerCase());
  
  const comment = `
    "${content}"
    change - ${userComment}. 
    Do not generate or change anything else, only make the changes requested to the part above.
  `;

  return {id, comment};
}

async function setHTML(key, result) {
  const html = marked.parse(result);
  document.querySelector(`#${key}`).innerHTML = html;
}

function getMarkdownExplanation(type) {
  switch (type) {
    case 'p':
      return 'Answer with a paragraph';
    case 'ul':
      return 'Answer with bulleted points';
    case 'ol':
      return 'Answer with numbered points';
    case 'tr':
      return 'Answer with a table row';
    default:
      return 'Answer with the appropriate Markdown syntax, like in the original';
  }
}


