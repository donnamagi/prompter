import React, { useEffect, useState } from 'react';
import { fillPlaceholders, callAPI } from '../../utils/index';
import { marked } from 'marked';

export default function SearchBar({templates, setResult}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  }

  useEffect(() => {

    const handleSearchChange = () => {
      
      if (templates) {
        let filteredTemplates = Object.keys(templates).filter(
          key => key.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filteredTemplates);
        setSelectedIndex(0);
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        console.log(results[selectedIndex])
      } else if (e.key === 'ArrowDown') {
        setSelectedIndex(selectedIndex + 1);
      } else if (e.key === 'ArrowUp') {
        setSelectedIndex(selectedIndex - 1);
      }
    }

    handleSearchChange();
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }

  }, [query]);

  async function getTemplateContent(key) {

    try {
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
  
      const filled_template = await fillPlaceholders(data);
      if (filled_template === null) return; // user cancelled
  
      const api_response = await callAPI(filled_template);
      const parsed_result = marked.parse(api_response);
      setResult(parsed_result);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }


  return (
    <>
      <form onSubmit={handleSearchChange} className='mt-32 md:mt-48'>
      <label class="relative block">
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search your templates"
        />
      </label>
      </form>
      <div className=''>
      </div>
      <ul role="list" class="divide-y divide-slate-200 border">
        {results.map((result, index) => (
          <li key={index} className={`flex py-4 ${index === selectedIndex ? 'active:divide-slate-300' : ''}`}>
            <div class="ml-3 overflow-hidden">
            <p class="text-sm font-medium text-slate-900" onClick={() => getTemplateContent(result)}>{result}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
