import { React, useState } from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { cn } from "@/utils/index"

import { Input } from "@/components/ui/input"
import { Label } from "@/ui/label"
import { Textarea } from '@/ui/textarea';
import { Button } from "@/ui/button"
import { Calendar } from "@/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/ui/select"

export function TitledInput ({ placeholder, title, index }) {
  return (
    <>
      <div className="grid grid-cols-4 items-center">
        <Label htmlFor={placeholder} className="text-left text-black dark:text-white">
          {title} 
        </Label>
      </div>
      <div className="grid items-center gap-4">
        <Input key={index} id={placeholder} className="col-span-3 text-black dark:text-white" />
      </div>
    </>
  )
}

export function TitledTextArea ({ placeholder, title, index }) {
  return (
    <>
      <div className="grid grid-cols-4 items-center">
        <Label htmlFor={placeholder} className="text-left text-black dark:text-white">
          {title} 
        </Label>
      </div>
      <div className="grid items-center gap-4">
        <Textarea key={index} id={placeholder} className="col-span-3 text-black dark:text-white" />
      </div>
    </>
  )
}

export function DateRange({ index, placeholder, className }) {
  const [date, setDate] = useState({
    from: new Date(),
    to: addDays(new Date(), 20),
  });

  const formatDate = (date) => format(date, "MMM d, yyyy");

  return (
    <div key={index} className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={placeholder}
            value={(date?.from ? formatDate(date.from) : '') + " - " + (date?.to ? formatDate(date.to) : '')}
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !(date && date.from) && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {formatDate(date.from)} - {formatDate(date.to)}
                </>
              ) : (
                formatDate(date.from)
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

export function Picker({placeholder}) {
  const [platform, setPlatform] = useState();

  const platforms = ['Linkedin', 'Email', 'Twitter', 'Instagram', 'TikTok', 'Youtube']

  return (
    <div className="grid gap-2">
      <Select className="w-full" onValueChange={(value) => setPlatform(value)} >
        <SelectTrigger className="w-full dark:text-white truncate">
          <SelectValue placeholder='Where are you planning to reach out?' id={placeholder} data-value={platform}/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {platforms.map((platform, index) => (
              <SelectItem key={index} value={platform} >
                {platform}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}