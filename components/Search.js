import {React, useContext} from 'react';
import { FileIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/ui/skeleton";

import { StateContext } from 'app/state-provider';
 
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export default function Search({templates}) {  
  const { setTemplate } = useContext(StateContext);

  const mapTemplates = (templates) => {
    return templates.map((template, index) => (
      <CommandItem key={index} onSelect={() => getResult(index)}>
        <FileIcon className="mr-2 h-4 w-4" />
        <span> {template.title} </span>
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

  return (
    <container className='fixed top-1/3 w-2/3 lg:w-1/3'>
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Search for templates" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Results">
          {templates ? mapTemplates(templates) : renderSkeletons()}
          </CommandGroup>
        </CommandList>
      </Command>
      <div className="flex justify-center mt-4">
        <a className="text-gray-500 text-sm" href="https://www.notion.so/donnamagi/Prompts-API-0578db9a3c3847a795934d65a161ac95?pvs=4" target="_blank">Templates from Notion</a>
      </div>
    </container>
  );
}
