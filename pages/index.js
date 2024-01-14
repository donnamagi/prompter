import Head from "next/head";
import { useState, useRef } from "react";
import Templates from "./components/Templates";
import Button from "./components/Button";
import Result from "./components/Result";
import TurndownService from "turndown";
import conversation_history from "./api/chat";

export default function Home() {
  const [result, setResult] = useState();
  const resultRef = useRef(null);

  
  const handleCopy = () => {
    var turndownService = new TurndownService()
    const html = resultRef.current.innerHTML;
    var markdown = turndownService.turndown(html);
    navigator.clipboard.writeText(markdown)
      .then(() => {
        console.log("Copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard:", error);
      });
  };

  const restart = () => {
    setResult(null);
    conversation_history.splice(1); // delete the conversation history, system prompt only
  }


  return (
    <div>
      <Head>
        <title>Prompt templates</title>
      </Head>
      <main className="flex justify-center min-h-screen">
        {result ? 
          <>
            <div ref={resultRef}>
              <Result result={result} />
            </div>
          </>
          :
          <container className='w-2/3 md:w-1/3'>
            <Templates setResult={setResult} />
          </container>
        }
      </main>
    </div>
  );
}
