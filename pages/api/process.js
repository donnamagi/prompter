
function extractPlaceholders(text) {
  const regex = /\{([^\}]+)\}/g; // finds all {placeholders}
  let placeholders = text.match(regex) || [];
  return placeholders.map(p => p.replace(/[{}]/g, '')); 
}

export default async function fillPlaceholders(text) {
  let placeholders = extractPlaceholders(text);
  let filledText = text;

  for (let placeholder of placeholders) {
      let userInput = prompt(`Please enter a value for ${placeholder}:`);
      filledText = filledText.replace(`{${placeholder}}`, userInput);
  }
  
  return filledText;
}
