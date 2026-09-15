import React,{createContext, useEffect, useState} from 'react';

export const ThemeContext=createContext();

export const ThemeContextProvider=({children})=>{
 
    const [theme,setTheme]=useState('lightTheme');

    useEffect(()=>{
        const savedTheme=localStorage.getItem('theme');
        if(savedTheme){
            setTheme(savedTheme)
        }

    },[])

    const toggleTheme=()=>{
        const newTheme=theme == 'lightTheme' ? 'dark' : 'lightTheme'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme);
    }


    return(
        <ThemeContext.Provider value={{toggleTheme,theme}}>
            {children}
        </ThemeContext.Provider>
    )
}




