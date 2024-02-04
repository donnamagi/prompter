"use client"

import { Label } from "@/ui/label"
import { Textarea } from "@/ui/textarea"
import { Button } from "@/ui/button"
import { PaperPlaneIcon, ResetIcon } from "@radix-ui/react-icons"
import Link from 'next/link'

export default function Overview(props) {
  return (
    <div className='fixed top-1/3 w-2/3 lg:w-1/3'>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message-2" className='dark:text-zinc-300'>{props.template.title}</Label>
        <Textarea placeholder="Type your message here." id="message-2" defaultValue={props.template.content} className='min-h-[300px]' />
        <p className="text-sm text-muted-foreground">
          This is the prompt you're forwarding to OpenAI.
        </p>
      </div>
      <div className="flex justify-between mt-4">
        <Link href="/">
          <Button variant='outline'>
            <ResetIcon/>
          </Button>
        </Link>
        <Link href="/result">
          <Button>
            <PaperPlaneIcon />
          </Button>
        </Link>
      </div>
    </div>
  )
}
