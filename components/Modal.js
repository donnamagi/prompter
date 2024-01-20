import * as React from 'react';
import { Button } from "@/components/ui/button"
import { TitledTextArea, TitledInput, DateRange, ProjectPicker } from '@/components/Fields';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { StateContext } from '@/lib/context/StateContext';

export default function Modal() {
  const { setCurrentScreen, template, setTemplate } = React.useContext(StateContext);
  if (!template) return null;
  
  const extractPlaceholders = (content) => {
    const regex = /\{([^\}]+)\}/g; // finds all {placeholders}
    let placeholders = content.match(regex) || [];
    return placeholders.map(p => p.replace(/[{}]/g, '')); 
  }

  if (!template.content) return null;
  const placeholders = extractPlaceholders(template.content);

  const setData = () => {
    const inputs = document.getElementById('form').querySelectorAll('input');
    const data = new FormData();
    inputs.forEach(input => {
      data.append(input.id, input.value);
    });

    const finalTemplate = replacePlaceholders(template, data);
    setCurrentScreen('overview');
    setTemplate({ ...template, content: finalTemplate });
  }

  const replacePlaceholders = (template, data) => {
    let newState = template.content;

    for (const [key, value] of data.entries()) {
      newState = newState.replace(`{${key}}`, value);
    }
  
    return newState;
  }

  const handleOpenChange = (open) => {
    if (!open) {
      setTemplate(null);
    }
  }

  const renderPlaceholders = () => {
    return placeholders.map((placeholder, index) => {
      if (placeholder === 'project') {
        return <ProjectPicker key={index} placeholder={placeholder} id='input' />;
      }
      if (placeholder === 'description') {
        return <TitledTextArea key={index} placeholder={placeholder} id='input' className='dark:text-white'/>;
      }
      if (placeholder === 'date') {
        return <DateRange key={index} placeholder={placeholder} id='input' className='dark:text-white'/>
      }
      return <TitledInput key={index} placeholder={placeholder} className='dark:text-white'/>;
    });
  }
  
  return (
    <>
      <Dialog defaultOpen onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className='dark:text-white'>{template.title}</DialogTitle>
            <DialogDescription>
              Enter variables. 'Next' to see the full prompt.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4" id="form">
            {renderPlaceholders()}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={setData}>Next</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}