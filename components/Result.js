import React, { useState, useContext, useEffect } from 'react';
import { callAPI } from '../utils';
import { Button } from "@/components/ui/button";
import ChangeBox from '@/components/ChangeBox';
import { marked } from "marked";
import TurndownService from "turndown";
import conversation_history from "../pages/api/chat";
import { StateContext } from '@/lib/context/StateContext';

const Result = () => {
  const [result, setResult] = useState(null);
  const { template, setTemplate, setCurrentScreen } = useContext(StateContext);

  useEffect(() => {
    if (!template) return;
    
    const getResult = async () => {
      const response = await callAPI(template.content);
      const html = marked.parse(response);
      setResult(html);
    }

    getResult();
  }, [template]); // added template as a dependency

  const restart = () => {
    setCurrentScreen('search');
    setTemplate(null);
    conversation_history.splice(1); // leaving the system prompt only
  };

  const copy = () => {
    if (!result) return;

    const turndownService = new TurndownService();
    const markdown = turndownService.turndown(result);

    navigator.clipboard.writeText(markdown)
      .then(() => console.log("Copied to clipboard"))
      .catch(error => console.error("Failed to copy to clipboard:", error));
  };

  return (
    <div className='fixed pt-30 px-10 w-full lg:w-2/3'>
      <ChangeBox result={result} />
      <div className="flex justify-between mt-4">
        <Button variant='outline' onClick={restart}>Restart</Button>
        <Button onClick={copy}>Copy</Button>
      </div>
    </div>
  );
};

export default Result;
