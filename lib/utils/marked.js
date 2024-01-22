import { marked } from 'marked';

/**
 * Generates a random ID attribute value that is used to identify target elements in the result preview.
 * @returns {string} - The ID attribute value.
 */

function generateIdAttribute() {
  var id = Math.random().toString(36).substring(4, 10);
  if (!isNaN(id.charAt(0))) {
    // If it's a digit, replace the first character
    id = 'd' + id.substring(1);
  }
  return id ? ` id="${id}"` : '';
}

/**
 * Marked is a library for turning the LLMs markdown response to HTML
 * I overwrite the default renderer to add an ID attribute to certain elements
 * This is used to identify target elements in the result preview
 * @see https://marked.js.org/using_pro#renderer
 */

export const renderer = {
  list(body, ordered) {
    const type = ordered ? 'ol' : 'ul';
    const id_att = generateIdAttribute();

    return `<${type}${id_att} class='target'>\n${body}</${type}>\n`;
  },

  // tablerow(content) {
  //   const id_att = generateIdAttribute();
  //   return `<tr${id_att} class='target'>\n${content}</tr>\n`;
  // },

  paragraph(text) {
    const id_att = generateIdAttribute();
    return `<p${id_att} class='target'>${text}</p>\n`;
  }
};

marked.use({ renderer });
