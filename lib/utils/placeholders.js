export const extractPlaceholders = (content) => {
  const regex = /\{([^\}]+)\}/g; // finds all {placeholders}
  const placeholders = content.match(regex) || [];
  const uniques = [...new Set(placeholders)];
  const clean_placeholders = uniques.map(p => p.replace(/[{}]/g, ''));
  return clean_placeholders; 
}

export const replacePlaceholders = (template, data) => {
  let newState = template.content;

  for (const [key, value] of data.entries()) {
    const regex = new RegExp(`{${key}}`, 'g'); 
    newState = newState.replace(regex, value);
  }

  return newState;
}
