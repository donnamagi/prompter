"use client";

import {React, useState, useContext, useEffect, StrictMode } from 'react';
import { callAPI } from '@/utils/index';
import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";
import ChangeBox from '@/components/ChangeBox';
import { marked, use } from "marked";
// import TurndownService from "turndown";
// import conversation_history from "@/api/chat";
import { StateContext } from 'app/state-provider';
import { ResetIcon, ClipboardIcon, CheckIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Response from '@/components/Response';
import { useChat } from 'ai/react';

const Result = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true); 
  const [copySuccess, setCopySuccess] = useState(false);
  const { template, setTemplate, setCurrentScreen } = useContext(StateContext);

  const getLLM = async (messages) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(messages),
      });
      setLoading(false);
      const reader = res.body.getReader();
      const textDecoder = new TextDecoder('utf-8'); 
      let resText = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) return resText;

        const text = textDecoder.decode(value, { stream: true }); // Decode each chunk
        resText += text;
        setResult(prevResult => prevResult + text);
      }
    } catch (err) {
      console.error(err)
    }
  };

  const getResult = async () => {
    const messages = [{ 'role': 'user', 'content': template.content }]
    const response = await getLLM(messages);
    const html = marked.parse(response);
    setResult(html);
  }

  useEffect(() => {
    if (!template) return;
    getResult();
  }, [template]);

  const renderSkeletons = () => {
    return (
      <>
        <Skeleton className="h-[20px] rounded-full m-2" />
        <Skeleton className="h-[20px] rounded-full m-2" />
        <Skeleton className="h-[20px] rounded-full m-2" />
      </>
    );
  };

  const restart = () => {
    setCurrentScreen('search');
    setTemplate(null);
    // conversation_history.splice(1); // leaving the system prompt only
  };

  const copy = () => {
    if (!result) return;

    // const turndownService = new TurndownService();
    // const markdown = turndownService.turndown(result);
    const markdown = result;
    navigator.clipboard.writeText(markdown)
      .then(() => setCopySuccess(true))
      .catch(error => console.error("Failed to copy to clipboard:", error));
  };

  return (
    <div className='fixed px-10 py-10 w-full lg:w-2/3 max-h-screen overflow-y-auto'>
      {loading ? renderSkeletons() : null}
      <ChangeBox result={result} setResult={setResult} />
      <div className="flex justify-center mt-4">
        <Link href="/">
          <Button variant='outline' className="me-2">
            <ResetIcon/>
          </Button>
        </Link>
        <Button onClick={copy}>
          { copySuccess ? <CheckIcon/> : <ClipboardIcon />}
        </Button>
      </div>
    </div>
  );
};

export default Result;
