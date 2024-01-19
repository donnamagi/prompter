import {useContext, React} from "react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import { StateContext } from '@/lib/context/StateContext';

export default function Overview() {
  const { template, setCurrentScreen, setTemplate } = useContext(StateContext);

  const back = () => {
    setCurrentScreen('search');
    setTemplate(null);
  }

  const forward = () => {
    setCurrentScreen('result');
  }

  return (
    <>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message-2">{template.title}</Label>
        <Textarea placeholder="Type your message here." id="message-2" defaultValue={template.content} className='min-h-[300px]' />
        <p className="text-sm text-muted-foreground">
          This is the prompt you're forwarding to OpenAI.
        </p>
      </div>
      <div className="flex justify-between mt-4">
        <Button variant='outline' onClick={() => back()}>Back</Button>
        <Button onClick={() => forward()}>Next</Button>
      </div>
    </>
  )
}
