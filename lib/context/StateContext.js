import {React, createContext, useState} from 'react';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [currentScreen, setCurrentScreen] = useState('search'); // 'search', 'overview', 'result'
    const [template, setTemplate] = useState(null);
    const [templates, setTemplates] = useState(null);

    return (
        <StateContext.Provider value={{ currentScreen, setCurrentScreen, templates, setTemplates, template, setTemplate }}>
            {children}
        </StateContext.Provider>
    );
};
