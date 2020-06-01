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
    const {onClick, children, negative} = props
    return (
        <button onClick={onClick} className={negative? 'negative' : ''} >{children }</button>
    )
}

export default Button