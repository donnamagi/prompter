import * as React from 'react';
import { callAPI } from '../utils/index';
import { Button } from "@/components/ui/button"
import ChangeBox from '@/components/ChangeBox';
import {marked} from "marked"; // convert markdown to html
import TurndownService from "turndown"; // convert html to markdown
import conversation_history from "../pages/api/chat";

import { StateContext } from '@/lib/context/StateContext';

export default function Result() {
  const [result, setResult] = React.useState(null);
  const { template, setTemplate, setCurrentScreen } = React.useContext(StateContext);

  const getResult = async (template) => {
    const response = await callAPI(template.content);
    const html = marked.parse(response);
    setResult(html);
  }

  React.useEffect(() => {
    if (!template) return;
    getResult(template);
  }, []); 

  const restart = () => {
    setCurrentScreen('search');
    setTemplate(null);
    conversation_history.splice(1); // leaving the system prompt only
  }

  const copy = () => {
    var turndownService = new TurndownService()
    const html = result.innerHTML;
    var markdown = turndownService.turndown(html);
    navigator.clipboard.writeText(markdown)
      .then(() => {
        console.log("Copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy to clipboard:", error);
      });
  };

  return (
    <container className='fixed pt-30 px-10 w-full lg:w-2/3'>
      <ChangeBox result={result} />
      <div className="flex justify-between mt-4">
        <Button variant='outline' onClick={restart}>Restart</Button>
        <Button onClick={copy}>Copy</Button>
      </div>
    </container>
  );
}
