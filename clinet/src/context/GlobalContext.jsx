import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

export const ThemeContext = createContext();

export const GlobalContext = ({ children }) => {
    const [lang, setLang] = useState('uz')
    useEffect(() => {
        let ws_l = localStorage.getItem("ws_l");
        if (ws_l != null) {
            setLang(ws_l);
        }
    }, [])
    return (
        <ThemeContext.Provider value={{ lang, setLang }}>
            {children}
        </ThemeContext.Provider>
    );
};