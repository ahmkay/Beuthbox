import React from "react";

/**
 * A reusable Button component to show a button and hanle click-events
 *
 * @param {onClick, negative, type} props
 *
 * Example:
 * <Button onClick={() => {console.log('Button clicked)}} negative >Click me!</Button>
 */

const Button = ({ onClick, negative, type, icon, children }) => {
  return (
    <button
      onClick={onClick}
      className={`${negative ? "negative " : ""} button--${type ? type : ""}`}
    >
      {type === "icon" && <img src={icon} />}
      {children}
    </button>
  );
};

export default Button;
