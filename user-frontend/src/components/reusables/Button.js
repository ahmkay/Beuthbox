import React from 'react';

/**
 * A reusable Button component to show a button and hanle click-events
 * 
 * @param {onClick, negative, text} props 
 * 
 * Example:
 * <Button text="Click me!" onClick={() => {console.log('Button clicked)}} negative />
 */

const Button = (props) => {
    return (
        <button onClick={props.onClick} className={props.negative? 'negative' : ''} >{props.text ? props.text : "Button"}</button>
    )
}

export default Button