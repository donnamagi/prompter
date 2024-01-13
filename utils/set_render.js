import { marked } from 'marked';

function generateIdAttribute() {
  var id = Math.random().toString(36).substring(4, 10);
  if (!isNaN(id.charAt(0))) {
    // If it's a digit, replace the first character
    id = 'd' + id.substring(1);
  }
  return id ? ` id="${id}"` : '';
}
  
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