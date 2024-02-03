"use client";

import {React, useContext, useEffect } from 'react';
import { StateContext } from '../lib/context/StateContext';

import Templates from '@/components/Templates';
import Overview from '@/components/Overview';
import Result from '@/components/Result';
import { Toaster, toast } from "sonner"
import { set } from 'date-fns';

export default function Home() {
  const { currentScreen, setTemplates } = useContext(StateContext);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'search':
        return <Templates />;
      case 'overview':
        return <Overview />;
      case 'result':
        return  <Result />;
      default:
        return <div>Invalid state</div>;
    }
  };


  useEffect(() => {
    const fetchContent = async (templates) => {
      try {
        for (const key in templates) {
          const id = templates[key].id;
          const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/notion/get_content`, {
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
        return templates;
      } catch (err) {
        console.error(err);
      }
    }

    const fetchTitles = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/notion/get_templates`);

      if (response.status !== 200) {
        console.log(response)
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();

      return data
    }

    const fetchTemplates = async () => {
      const templatesObject = await fetchTitles();
      const templates = await fetchContent(templatesObject.templates);
      setTemplates(templates);
      return templates;
    }

    toast.promise(
      fetchTemplates(),
      {
        loading: 'Fetching templates...',
        success: 'Templates loaded successfully',
        error: 'Error while loading templates',
      }
    );

  }, []);

  return (
    <div>
      <main className="flex justify-center items-center min-h-screen">
          {renderScreen()}
          <Toaster richColors />
      </main>
    </div>
  );
}

