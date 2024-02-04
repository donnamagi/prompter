import {React, useContext} from 'react';
import { Button } from "@/ui/button"
import { TitledTextArea, TitledInput, DateRange, Picker } from '@/components/Fields';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog"
import { FileTextIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { StateContext } from 'app/state-provider'
import { extractPlaceholders, replacePlaceholders } from '@/utils/index';

export default function Modal() {
  const { template, setTemplate } = useContext(StateContext);
  if (!template) return null;
  const placeholders = extractPlaceholders(template.content);

  const setData = () => {
    const inputs = document.getElementById('form').querySelectorAll(placeholders.map(p => `#${p}`));
    const data = new FormData();
    inputs.forEach(input => {
      if (!input.value && input.dataset.value) {
        return data.append(input.id, input.dataset.value);
      }
      data.append(input.id, input.value);
    });

    const finalTemplate = replacePlaceholders(template, data);
    setTemplate({ ...template, content: finalTemplate });
  }

  const handleOpenChange = (open) => {
    if (!open) {
      setTemplate(null);
    }
  }

  const renderFields = () => {
    return placeholders.map((placeholder, index) => {
      if (placeholder === 'platform') {
        return <Picker placeholder={placeholder} />;
      }
      if (placeholder === 'description') {
        return <TitledTextArea key={index} placeholder={placeholder} title={placeholder} className='dark:text-white' />;
      }
      if (placeholder.endsWith('-description')) {
        const title = placeholder.slice(0, -12).split('-').join(' '); // turns 'about-you-description' to 'about you'
        return <TitledTextArea key={index} placeholder={placeholder} title={title} className='dark:text-white' />;
      }
      if (placeholder === 'date') {
        return <DateRange key={index} placeholder={placeholder} className='dark:text-white' />;
      }
      const title = placeholder.split('-').join(' ');
      return <TitledInput key={index} placeholder={placeholder} title={title} className='dark:text-white' />;
    });
  }

  return (
    <>
      <Dialog defaultOpen onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className='dark:text-zinc-300'>{template.title}</DialogTitle>
            <DialogDescription>
              Enter variables. 'Next' to send to OpenAI.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4" id="form">
            {renderFields()}
          </div>
          <DialogFooter>
            <Button asChild variant='outline'> 
              <Link href="/overview" onClick={() => setData()}>
                <FileTextIcon /> 
              </Link>
            </Button>
            <Button asChild> 
              <Link href="/result" onClick={() => setData()}>
                <PaperPlaneIcon /> 
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}