"use client";

import {React, useState, useContext, useEffect } from 'react';
import { callAPI } from '@/utils/index';
import { Button } from "@/ui/button";
import { Skeleton } from "@/ui/skeleton";
import ChangeBox from '@/components/ChangeBox';
import { marked } from "marked";
// import TurndownService from "turndown";
// import conversation_history from "@/api/chat";
import { StateContext } from '@/context/StateContext';
import { ResetIcon, ClipboardIcon, CheckIcon } from '@radix-ui/react-icons';

const Result = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [copySuccess, setCopySuccess] = useState(false);
  const { template, setTemplate, setCurrentScreen } = useContext(StateContext);

  useEffect(() => {
    if (!template) return;
    
    const getResult = async () => {
      const response = await callAPI(template.content);
      const html = marked.parse(response);
      setResult(html);
      setLoading(false);
    }

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
        <Button variant='outline' className="me-2" onClick={restart}> 
          <ResetIcon/>
        </Button>
        <Button onClick={copy}>
          { copySuccess ? <CheckIcon/> : <ClipboardIcon />}
        </Button>
      </div>
    </div>
  );
};

export default Result;
