import { React, useEffect, useState } from 'react';
import Search from '@/components/Search';
import Modal from '@/components/Modal';
import { Toaster, toast } from "sonner"

export default function Templates() {
  const [templates, setTemplates] = useState(null);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/notion/get_templates');

      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      return data

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const getTemplateContent = async () => {
    let templates = await fetchTemplates();
    
    for (const key in templates) {
      const id = templates[key].id;
      const response = await fetch('/api/notion/get_content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      templates[key].content = data;
    }
    setTemplates(templates);
  }

  useEffect(() => {
    toast.promise(
      getTemplateContent(),
      {
          loading: 'Fetching templates...',
          success: 'Templates loaded successfully!',
          error: 'Error while loading templates',
      }
    );
  }, []);
  
  return (
    <>
    <Search templates= {templates} /> 
    <Modal /> 
    <Toaster richColors />
    </>
  )
}
