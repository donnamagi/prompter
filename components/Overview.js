import {useContext, React} from "react"
import { Label } from "@/ui/label"
import { Textarea } from "@/ui/textarea"
import { Button } from "@/ui/button"
import { PaperPlaneIcon, ResetIcon } from "@radix-ui/react-icons"

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
    <container className='fixed top-1/3 w-2/3 lg:w-1/3'>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message-2" className='dark:text-zinc-300'>{template.title}</Label>
        <Textarea placeholder="Type your message here." id="message-2" defaultValue={template.content} className='min-h-[300px]' />
        <p className="text-sm text-muted-foreground">
          This is the prompt you're forwarding to OpenAI.
        </p>
      </div>
      <div className="flex justify-between mt-4">
        <Button variant='outline' onClick={() => back()}>
          <ResetIcon/>
        </Button>
        <Button onClick={() => forward()}>
          <PaperPlaneIcon />
        </Button>
      </div>
    </container>
  )
}
