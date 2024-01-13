import React from 'react';

const Button = ({ title, onClick }) => {
  return (
  <button onClick={onClick} className="bg-slate-100 hover:bg-slate-200 p-2 my-3 space-y-4">
    {title}
  </button>
  );
};

export default Button;
