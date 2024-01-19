import * as React from 'react';

export const StateContext = React.createContext();

export const StateProvider = ({ children }) => {
    const [currentScreen, setCurrentScreen] = React.useState('search'); // 'search', 'overview', 'result'
    const [template, setTemplate] = React.useState(null);

    return (
        <StateContext.Provider value={{ currentScreen, setCurrentScreen, template, setTemplate }}>
            {children}
        </StateContext.Provider>
    );
};
