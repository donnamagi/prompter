import * as React from 'react';

export const StateContext = React.createContext();

export const StateProvider = ({ children }) => {
    const [currentScreen, setCurrentScreen] = React.useState('search'); // 'search', 'overview', 'result'

    return (
        <StateContext.Provider value={{ currentScreen, setCurrentScreen }}>
            {children}
        </StateContext.Provider>
    );
};
