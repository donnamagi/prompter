import { marked } from 'marked';
import { callAPI } from './index';

export async function replaceSelection(target) {
  const structuredPrompt = getStructuredPrompt(target);
  if (structuredPrompt === null) return; 

  const { id, comment } = structuredPrompt;
  document.querySelector(`#${id}`).innerHTML = 'one sec :)';
  const api_response = await callAPI(comment);
  setHTML(id, api_response);
}

function getStructuredPrompt(target) {
  const userComment = prompt('What would you change?');
  if (userComment === null) return null;

  const id = target.id;
  const content = target.textContent;
  const answer_in = getMarkdownExplanation(target.tagName.toLowerCase());
  
  const comment = `Replace this and ONLY this section: "${content}"
  If not otherwise specified, ${answer_in} 
  Feedback: ${userComment}`;

  return {id, comment};
}

async function setHTML(key, result) {
  const html = marked.parse(result);
  document.querySelector(`#${key}`).outerHTML = html;
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


