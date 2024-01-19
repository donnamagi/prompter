import * as React from 'react';
import { FileIcon } from "@radix-ui/react-icons";
import Modal from '@/components/Modal';
 
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"

export default function Search({templates}) {  
  const [chosenTemplate, setChosenTemplate] = React.useState(null);

  async function getResult(key) {;
    const template = templates[key];
    setChosenTemplate(template);
  }

  React.useEffect(() => {
    const down = (e) => {
      if ((e.metaKey || e.ctrlKey) && !isNaN(e.key) && e.key.length === 1) {
        e.preventDefault(); 
        const key = parseInt(e.key, 10);
        getResult(key);
      }
    };
 
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Search your templates" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Results">
          {templates.map((template, index) => (
            <CommandItem key= {index} onSelect= {() => getResult(index)}>
              <FileIcon className="mr-2 h-4 w-4" />
              <span> {template.title} </span>
              <CommandShortcut>⌘{index}</CommandShortcut>
            </CommandItem>
          ))}
          </CommandGroup>
        </CommandList>
      </Command>
      <Modal template={chosenTemplate} setTemplate={setChosenTemplate} /> 
    </>
  );
}
