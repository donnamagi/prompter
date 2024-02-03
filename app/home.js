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
        const promises = Object.keys(templates).map(async key => {
          const id = templates[key].id;
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/notion/get_content`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id }),
            });
            const data = await response.json();
            return ({ key, data });
          } catch (error) {
            return ({ key, error });
          }
        });
    
        const results = await Promise.all(promises);
    
        const validTemplatesList = results.map(({ key, data, error }) => {
          if (error) {
            console.error(`Error fetching template ${templates[key].title}:`, error);
            return null; 
          }
          const { title, id } = templates[key];
          return {
            title,
            id,
            content: data
          };
        }).filter(Boolean); // Remove null values (errors)

        return validTemplatesList;
      } catch (err) {
        console.error(err);
      }
    }

    const fetchTitles = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/notion/get_templates`);

        if (response.status !== 200) {
          console.log(response)
          throw data.error || new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();

        return data
      } catch (err) {
        console.error(err);
      }
    }

    const fetchTemplates = async () => {
      try {
        const templatesObject = await fetchTitles();
        const templates = await fetchContent(templatesObject.templates);
        setTemplates(templates);
        return templates;
      } catch (err) {
        console.error(err)
      }
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

