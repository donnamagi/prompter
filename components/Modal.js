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

export default function Modal({template, setTemplate}) {
  if (!template) return null;

  let placeholders = [];
  if (template) {
    placeholders = extractPlaceholders(template.content);
  }

  function extractPlaceholders(template) {
    const regex = /\{([^\}]+)\}/g; // finds all {placeholders}
    let placeholders = template.match(regex) || [];
    return placeholders.map(p => p.replace(/[{}]/g, '')); 
  }

  const setData = () => {
    const inputs = document.getElementById('form').querySelectorAll('input');
    const data = new FormData();
    inputs.forEach(input => {
      data.append(input.id, input.value);
    });

    const finalTemplate = replacePlaceholders(template, data);
    console.log(finalTemplate);
  }

  function replacePlaceholders(template, data) {
    let newState = template.content;

    for (const [key, value] of data.entries()) {
      newState = newState.replace(`{${key}}`, value);
    }
  
    return newState;
  }

  function handleOpenChange(open) {
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