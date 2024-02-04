'use client';

import { useChat } from 'ai/react';
import Result from '@/components/Result';

export default function Response() {
  const { messages } = useChat();

  return (
    <div className='flex flex-col pt-20'>
      <ul>
        {messages.map((message, index) => {
          if (message.role === 'assistant') {
            return <Result key= {index} template= {message.content} />;
          }
          return null;
        })}
      </ul>
    </div>
  );
}
