import OpenAI from "openai";
import conversation_history from "./chat.js";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function (req, res) {
  const input = req.body.input || '';
  conversation_history.push({ role: "user", content: input });
  try {
    const completion = await openai.chat.completions.create({
      messages: [ ...conversation_history ],
      // model: "gpt-4",
      model: "gpt-3.5-turbo-0613",
      temperature: 1,
      max_tokens: 1000,
      // stream: true, later :)
    });

    const assistant_reply = completion.choices[0].message.content;
    conversation_history.push({ role: "assistant", content: assistant_reply });
    
    res.status(200).json({ result: conversation_history });
  } catch(error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

