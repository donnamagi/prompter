import Head from "next/head";
import { useState, useRef } from "react";
import Templates from "@/components/Templates";
import Result from "@/components/Result";

export default function Home() {
  const [result, setResult] = useState();
  const resultRef = useRef(null);

  return (
    <div>
      <Head>
        <title>Prompt templates</title>
      </Head>
      <main className="flex justify-center items-center min-h-screen bg-white text-black dark:bg-black dark:text-white">
        {result ? 
          <>
            <div ref={resultRef}>
              <Result result={result} setResult={setResult}/>
            </div>
          </>
          :
          <container className='fixed top-1/3 w-2/3 md:w-1/3'>
            <Templates setResult={setResult} />
          </container>
        }
      </main>
    </div>
  );
}
