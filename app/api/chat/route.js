import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from "next/server";

export const runtime = 'edge';
export const dynamic = 'force-dynamic'; 

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function OPTIONS() {
  return NextResponse.json({status: 200});
}

export async function POST(req, res) {
  const messages = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      stream: true,
      messages: messages,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);

  } catch(error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return new NextResponse.json({ status: 400}, {statusText: "Bad Request"});
    }
  }
}
