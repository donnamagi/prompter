import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format, set } from "date-fns"
import { cn } from "@/lib/utils"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea';
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TitledInput ({ placeholder, index }) {
  return (
    <>
      <div className="grid grid-cols-4 items-center">
        <Label htmlFor={placeholder} className="text-left text-black dark:text-white">
          {placeholder} 
        </Label>
      </div>
      <div className="grid items-center gap-4">
        <Input key={index} id={placeholder} className="col-span-3 text-black dark:text-white" />
      </div>
    </>
  )
}

export function TitledTextArea ({ placeholder, index }) {
  return (
    <>
      <div className="grid grid-cols-4 items-center">
        <Label htmlFor={placeholder} className="text-left text-black dark:text-white">
          {placeholder} 
        </Label>
      </div>
      <div className="grid items-center gap-4">
        <Textarea key={index} id={placeholder} className="col-span-3 text-black dark:text-white" />
      </div>
    </>
  )
}

export function DateRange({index, placeholder, className}) {
  const [date, setDate] = React.useState({
    from: new Date(),
    to: addDays(new Date(), 20),
  })

  return (
    <div key={index} className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id= {placeholder}
            value={format(date.from, "LLL dd, y") + " - " + format(date.to, "LLL dd, y")}
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function ProjectPicker({placeholder}) {
  const [project, setProject] = React.useState();

  const magicads = `
  MagicAds is a web application that provides a simple solution to the complex and costly process of creating 
  UGC ads - by generating AI avatar-based, human-like UGC ads with just an URL for App store, Play store or 
  Websites, we offer unlimited, high-performing UGC ads at your fingertips. Generating a video ad takes between 
  5 and 60 minutes. Every video exists out of 4 scenes: Hook, Build-up, Outcome, and Call to Action. The web-application 
  has following screens (besides our landing page): Sign-up, Onboarding, Dashboard, Video create screen, Paywall, Profile. 
  The user can automatically download the video in the dashboard. We use Stripe for Payment progressing.`

  const link = `
  Link is a web application that provides a simple solution to the complex and costly process of creating
  UGC ads - by generating AI avatar-based, human-like UGC ads with just an URL for App store, Play store or
  Websites, we offer unlimited, high-performing UGC ads at your fingertips. Generating a video ad takes between
  5 and 60 minutes. Every video exists out of 4 scenes: Hook, Build-up, Outcome, and Call to Action. The web-application
  has following screens (besides our landing page): Sign-up, Onboarding, Dashboard, Video create screen, Paywall, Profile.
  The user can automatically download the video in the dashboard. We use Stripe for Payment progressing.`

  const projects = Object.entries({
    'MagicAds': magicads,
    'Link': link
  });

  return (
    <div className="grid gap-2">
      <Select className="w-full" onValueChange={(value) => setProject(value)} >
        <SelectTrigger className="w-full dark:text-white truncate">
          <SelectValue placeholder='Select your project' id={placeholder} data-value={project}/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {projects.map(([project, description], index) => (
              <SelectItem key={index} value={description} >
                {project}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}