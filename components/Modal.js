import {React, useContext} from 'react';
import { Button } from "@/ui/button"
import { TitledTextArea, TitledInput, DateRange, ProjectPicker } from '@/components/Fields';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog"
import { FileTextIcon, PaperPlaneIcon } from '@radix-ui/react-icons';

import { StateContext } from '@/context/StateContext';
import { extractPlaceholders, replacePlaceholders } from '@/utils/index';

export default function Modal() {
  const { setCurrentScreen, template, setTemplate } = useContext(StateContext);
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

  const showFullPrompt = () => {
    setData();
    setCurrentScreen('overview');
  }

  const sendDirect = () => {
    setData();
    setCurrentScreen('result');
  }

  const handleOpenChange = (open) => {
    if (!open) {
      setTemplate(null);
    }
  }

  const renderFields = () => {
    return placeholders.map((placeholder, index) => {
      if (placeholder === 'project') {
        return <ProjectPicker placeholder= {placeholder} />;
      }
      if (placeholder === 'description') {
        return <TitledTextArea key={index} placeholder={placeholder} className='dark:text-white'/>;
      }
      if (placeholder === 'date') {
        return <DateRange key={index} placeholder={placeholder} className='dark:text-white'/>
      }
      return <TitledInput key={index} placeholder={placeholder} className='dark:text-white'/>;
    });
  }
  
  return (
    <>
      <Dialog defaultOpen onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className='dark:text-zinc-300'>{template.title}</DialogTitle>
            <DialogDescription>
              Enter variables. 'Next' to see the full prompt.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4" id="form">
            {renderFields()}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={showFullPrompt}> <FileTextIcon /> </Button>
            <Button onClick={sendDirect}> <PaperPlaneIcon /> </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}