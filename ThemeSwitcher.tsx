import React, { useContext, useEffect } from 'react'
import { ThemeContext } from './ThemeContext'

function ThemeSwitcher() {
    const {theme,toggleTheme}=useContext(ThemeContext);

    useEffect(()=>{
       document.body.className=theme
    },[theme])


    // if we want for particular div then we can do <div className={`App ${theme}`} in css do App App.dark

  return (
    <> 
    
    <div>
        Theme Switcher
    </div>

    <input type="checkbox" id="toggle" onChange={()=>toggleTheme()}   />
    <label for="toggle" class="switch"></label>
    </>
  )
}

export default ThemeSwitcher
