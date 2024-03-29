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
      <CommandItem key={index} onSelect={() => setTemplate(templates[index])}>
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

  return (
    <div className='fixed top-1/3 w-2/3 lg:w-1/3'>
      <Command className="rounded-lg border shadow-md">
        <CommandInput placeholder="Search for templates" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Results">
          {templates ? mapTemplates(templates) : renderSkeletons()}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}
