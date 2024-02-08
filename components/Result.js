"use client";

import {React, useState, useContext, useEffect } from 'react';
import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";
import ChangeBox from '@/components/ChangeBox';
import { marked } from "marked";
import TurndownService from "turndown";
import { StateContext } from 'app/state-provider';
import { ResetIcon, ClipboardIcon, CheckIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const Result = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(true); 
  const [copySuccess, setCopySuccess] = useState(false);
  const { template, setTemplate } = useContext(StateContext);

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
      let unparsed = '';

      while (true) {
        const { done, value } = await reader.read();
        const chunk = textDecoder.decode(value, { stream: true }); 
        unparsed += chunk;

        if (done) {
          const html = marked.parse(unparsed); 
          setResult(prevResult => prevResult + html);
          break;
        }

        if (unparsed.includes('\n')) {
          const lines = unparsed.split('\n');
          const line = lines.shift();
          const html = marked.parse(line); 
          setResult(prevResult => prevResult + html);
          unparsed = lines.slice(1).join('\n'); 
        }
      }
    } catch (err) {
      console.error(err)
    }
  };

  const getResult = async () => {
    const messages = [{ 'role': 'user', 'content': template.content }]
    await getLLM(messages);
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

  const copy = () => {
    if (!result) return;
    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(result);
    navigator.clipboard.writeText(markdown)
      .then(() => setCopySuccess(true))
      .catch(error => console.error("Failed to copy to clipboard:", error));
  };

  return (
    <div className='fixed px-10 py-10 w-full lg:w-2/3 max-h-screen overflow-y-auto'>
      {loading ? renderSkeletons() : null}
      <ChangeBox result={result} setResult={setResult} />
      <div className="flex justify-center mt-4">
        <Link href="/" onClick={() => setTemplate(null)}>
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
