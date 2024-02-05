"use client";

import {React, createContext, useState} from 'react';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [template, setTemplate] = useState({ title: '', content: ''});
    const [templates, setTemplates] = useState(null);

    return (
        <StateContext.Provider value={{ templates, setTemplates, template, setTemplate }}>
            {children}
        </StateContext.Provider>
    );
};
