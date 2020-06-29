import React, { useState } from 'react'
import Night from "@material-ui/icons/NightsStay";
import Light from "@material-ui/icons/WbSunny";

const ThemeSwitcher = () => {

    const [isDarkTheme, setIsDarkTheme] = useState(window.localStorage.getItem("theme") === 'dark')

    const handleSwitch = () => {
        setIsDarkTheme(!isDarkTheme)

        if(isDarkTheme !== true) {
            localStorage.setItem('theme', 'dark')
            document.documentElement.setAttribute('theme', 'dark')
        } else {
            localStorage.setItem('theme', 'light')
            document.documentElement.setAttribute('theme', 'light')
        }
      };

    return (
        <div
            className={`theme-switcher ${!isDarkTheme ? 'theme-switcher--dark' : 'theme-switcher--light'}`}
            onClick={() => handleSwitch()}
        >
            {!isDarkTheme ? <Night className="theme-switcher__icon"/> : <Light className="theme-switcher__icon"/>}
            <small className="theme-switcher__label">{isDarkTheme ? 'Light' : 'Dark'}</small>
        </div>
    )
}

export default ThemeSwitcher