import React, { useContext } from 'react';
import Head from 'next/head';
import { StateContext } from '@/lib/context/StateContext';

import Templates from '@/components/Templates';
import Overview from '@/components/Overview';
import Result from '@/components/Result';

export default function Home() {
  const { currentScreen } = useContext(StateContext);

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

  return (
    <div>
      <Head>
        <title>Prompt templates</title>
      </Head>
      <main className="layout flex justify-center items-center min-h-screen bg-white text-black dark:bg-black dark:text-white">
          {renderScreen()}
      </main>
    </div>
  );
}

