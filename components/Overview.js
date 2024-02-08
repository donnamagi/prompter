"use client"

import { Textarea } from "@/ui/textarea"
import { useContext, useEffect } from 'react'
import { StateContext } from 'app/state-provider'

export default function Overview() {
  const {template} = useContext(StateContext);
  if (!template) return null;

  useEffect(() => {
    template.content = document.getElementById('message-2').value;
  }, [template.content]);

  return (
    <div className='bg-black'>
      <div className="grid w-full gap-1.5">
        <Textarea id="message-2" defaultValue={template.content} className='min-h-[300px]' />
        <p className="text-sm text-muted-foreground">
          This is the prompt you're forwarding to OpenAI.
        </p>
      </div>
    </div>
  )
}
