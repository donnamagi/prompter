import * as React from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
  
  return (
    <>
      <Dialog defaultOpen onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{template.title}</DialogTitle>
            <DialogDescription>
              Enter variables. 'Next' to see the full prompt.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4" id="form">
            {placeholders.map((placeholder, index) => (
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
            ))}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={setData}>Next</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}