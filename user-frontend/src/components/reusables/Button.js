import React from "react";

/**
 * A reusable Button component to show a button and hanle click-events
 *
 * @param {onClick, negative, type} props
 *
 * Example:
 * <Button onClick={() => {console.log('Button clicked)}} negative >Click me!</Button>
 */

const Button = ({
  onClick,
  negative,
  type,
  filled,
  icon,
  children,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${negative ? "negative " : ""} button--${type ? type : ""} ${
        filled ? "button--filled" : ""
      } ${className ? className : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
