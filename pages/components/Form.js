import React from "react";


export default function Form({values, state}) {

  function replacePlaceholders(state, data) {
    let newState = state;

    for (const [key, value] of data.entries()) {
      newState = newState.replace(`{${key}}`, value);
    }
  
    return newState;
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    const finalTemplate = replacePlaceholders(state, data);
    console.log(finalTemplate);
  }

  return (
    <form onSubmit= {onSubmit} className="w-full max-w-sm">
      {values.map((value, index) => (
        <div key={index + values.length} className="md:flex md:items-center md:justify-center mb-6">
          <textarea className="bg-white appearance-none border-2 border-slate-300 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-sky-500 focus:ring-sky-500" id={`inline-value-${index}`} name={value} placeholder={value}/>
        </div>
      ))}
      <div className="md:flex md:items-center md:justify-center">
        <button className="shadow bg-slate-500 hover:bg-slate-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
          See full prompt
        </button>
      </div>
    </form>
  );
}