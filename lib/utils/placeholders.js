export const extractPlaceholders = (content) => {
  const regex = /\{([^\}]+)\}/g; // finds all {placeholders}
  let placeholders = content.match(regex) || [];
  return placeholders.map(p => p.replace(/[{}]/g, '')); 
}

export const replacePlaceholders = (template, data) => {
  let newState = template.content;

  for (const [key, value] of data.entries()) {
    newState = newState.replace(`{${key}}`, value);
  }

  return newState;
}
