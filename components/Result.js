import {React, useState, useContext, useEffect } from 'react';
import { callAPI } from '@/utils/index';
import { Button } from "@/ui/button";
import ChangeBox from '@/components/ChangeBox';
import { marked } from "marked";
import TurndownService from "turndown";
import conversation_history from "@/api/chat";
import { StateContext } from '@/context/StateContext';

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
  }, [template]);

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
    <div className='fixed px-10 py-10 w-full lg:w-2/3 max-h-screen overflow-y-auto'>
      <ChangeBox result={result} />
      <div className="flex justify-between mt-4">
        <Button variant='outline' onClick={restart}>Restart</Button>
        <Button onClick={copy}>Copy</Button>
      </div>
    </div>
  );
};

export default Result;
