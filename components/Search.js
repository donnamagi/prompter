import {React, useContext, useEffect} from 'react';
import { FileIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";

import { StateContext } from '@/lib/context/StateContext';
 
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
  const { setTemplate } = useContext(StateContext);

  const mapTemplates = (templates) => {
    return templates.map((template, index) => (
      <CommandItem key={index} onSelect={() => getResult(index)}>
        <FileIcon className="mr-2 h-4 w-4" />
        <span> {template.title} </span>
        <CommandShortcut>⌘{index}</CommandShortcut>
      </CommandItem>
    ));
  };

  const renderSkeletons = () => {
    return (
      <>
        <Skeleton className="h-[20px] rounded-full m-2" />
        <Skeleton className="h-[20px] rounded-full m-2" />
        <Skeleton className="h-[20px] rounded-full m-2" />
      </>
    );
  };

  const getResult = (key) => {;
    setTemplate(templates[key]);
  }

  useEffect(() => {
    const down = (e) => {
      if ((e.metaKey || e.ctrlKey) && !isNaN(e.key) && e.key.length === 1) {
        e.preventDefault(); 
        const key = parseInt(e.key, 10);
        getResult(key);
      }
    };
 
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [templates])

  return (
    <container className='fixed top-1/3 w-2/3 lg:w-1/3'>
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Search your templates" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Results">
          {templates ? mapTemplates(templates) : renderSkeletons()}
          </CommandGroup>
        </CommandList>
      </Command>
    </container>
  );
}
