import React, { createContext } from 'react';
import func from '../userlogincheck';

export const LoggedUserContext = createContext({
    watchlist: () => {}
});

export const LoggedUserProvider = ({ children }) => {

    const watchlist = () => {
      return func;
    };

    return (
        <LoggedUserContext.Provider value={{ watchlist }}>
            {children}
        </LoggedUserContext.Provider>
    );
};