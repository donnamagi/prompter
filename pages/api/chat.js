const system_prompt = `You ALWAYS answer in Markdown format - no code blocks.
If the user responds and asks for modifications, only reply with a modification of what is presented in the 'to be replaced' section.
If the user asks you to delete something, you answer with ' '. 
Do not make changes unless the user asks you to.
`
  
var conversation_history = [
  { 
    role: "system", 
    content: system_prompt,
  },
]

export default conversation_history;