const system_prompt = `You are a senior product manager. You answer in Markdown format.`
  
var conversation_history = [
  { 
    role: "system", 
    content: system_prompt,
  },
]

export default conversation_history;