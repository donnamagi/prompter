import React, { useEffect, useState, useRef } from 'react';
import { getTemplateContent } from '../../utils/index.js';

export default function Search({templates, setResult}) {  
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const resultsRef = useRef(searchResults); 
  const inputRef = useRef(null); 
  resultsRef.current = searchResults; // Updates whenever results changes

  async function handleSearchChange(event) {
    setQuery(event.target.value);
  }

  async function getResult(key) {
    const content = await getTemplateContent(key, templates);
    setResult(content);
  }

  useEffect(() => {
    const handleSearchChange = () => {
      
      if (templates) {
        let filteredTemplates = Object.keys(templates).filter(
          key => key.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(filteredTemplates);
        setSelectedIndex(0);
      }
    }

    const handleKeyDown = (e) => {

      if (e.key === 'Enter') {
        getResult(resultsRef.current[selectedIndex])
      } else if (e.key === 'ArrowDown') {
        inputRef.current.blur();
        setSelectedIndex(selectedIndex => {
          if (selectedIndex === resultsRef.current.length - 1) return selectedIndex;
          const newIndex = selectedIndex + 1;
          return newIndex;
        });
      } else if (e.key === 'ArrowUp') {
        setSelectedIndex(selectedIndex => {
          if (selectedIndex === 0) return 0;
          const newIndex = selectedIndex - 1; 
          return newIndex;
        });
      }
    }

    handleSearchChange();
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }

  }, [query]);

  return (
    <>
      <form onSubmit={handleSearchChange} className='mt-32 md:mt-48'>
      <label className="relative block">
        <input
          ref={inputRef}
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search your templates"
        />
      </label>
      </form>
      <ul role="list" className="divide-y divide-slate-200 border">
        {resultsRef.current.map((result, index) => (
          <li key={index} className={`flex py-4 ${index === selectedIndex ? 'bg-slate-300' : ''}`}>
            <div className="ml-3">
            <p className="text-sm font-medium text-slate-900" onClick={() => getResult(result)}>{result}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
