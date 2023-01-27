'use client';

import { createContext, useContext, PropsWithChildren, useState } from 'react';

export declare type ThemeValue = 'dark' | 'light';

export interface ThemeContextValue<T extends string> {
  theme: T;
  setTheme: (val : T)=>void
}

interface ThemeProviderProps<T> {
  defaultTheme?: T;
  
}

export const ThemeContext = createContext<ThemeContextValue<ThemeValue>>({
  theme: 'light',
  setTheme: ()=>{}
});

export const ThemeProvider = ({ children, defaultTheme }: PropsWithChildren<ThemeProviderProps<ThemeValue>>) => {
  const [theme,setTheme ] = useState<ThemeValue>(defaultTheme || 'light')
  return (
    <ThemeContext.Provider
      value={{
        // @todo: handle this with a state, that can toggle between dark and light
        setTheme,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
