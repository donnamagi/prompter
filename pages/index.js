import React, { useContext } from 'react';
import Head from 'next/head';
import { StateContext } from '@/lib/context/StateContext';

import Templates from '@/components/Templates';
import Overview from '@/components/Overview';
import Result from '@/components/Result';

export default function Home() {
  const { currentScreen, template } = useContext(StateContext);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'search':
        return <Templates />;
      case 'overview':
        return <Overview template = {template} />;
      case 'result':
        return  <Result />;
      default:
        return <div>Invalid state</div>;
    }
  };

  return (
    <div>
      <Head>
        <title>Prompt templates</title>
      </Head>
      <main className="flex justify-center items-center min-h-screen bg-white text-black dark:bg-black dark:text-white">
        <container className='fixed top-1/3 w-2/3 lg:w-1/3'>
          {renderScreen()}
        </container>
      </main>
    </div>
  );
}

