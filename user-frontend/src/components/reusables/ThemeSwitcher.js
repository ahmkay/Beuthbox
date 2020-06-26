import React, { useState } from 'react'
import Night from "@material-ui/icons/NightsStay";
import Light from "@material-ui/icons/WbSunny";

const ThemeSwitcher = () => {

    const [checked, setChecked] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches)

    const handleSwitch = () => {
        setChecked(!checked)

        if(checked !== true) {
            localStorage.setItem('theme', 'dark')
            document.documentElement.setAttribute('theme', 'dark')
        } else {
            localStorage.setItem('theme', 'light')
            document.documentElement.setAttribute('theme', 'light')
        }
      };

    const setIcon = () => {
        if(checked) return {Night}
        return {Light}
    }
    return (
        <div
            className={`theme-switcher ${!checked ? 'theme-switcher--dark' : 'theme-switcher--light'}`}
            onClick={() => handleSwitch()}
        >
            {!checked ? <Night className="theme-switcher__icon"/> : <Light className="theme-switcher__icon"/>}
            <p className="theme-switcher__label">{!checked ? 'Dark Mode' : 'Light Mode'}</p>
        </div>
    )
}

export default ThemeSwitcher