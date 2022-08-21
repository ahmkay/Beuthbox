import React, { useState } from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import SchoolIcon from "@material-ui/icons/School";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import { ReactComponent as MagicIcon } from "../../assets/img/icons/magic.svg";
import { ReactComponent as BookIcon } from "../../assets/img/icons/Icon_Book.svg";

/**
 * A reusable Category Checkbuton component to show a button-like element that can be used as a checkbox
 *
 * @param {category, isActive, value, onChange} props
 *
 *  to set the icon and the labeltext use the category prop
 *  categories are: study, campus, class, research
 *
 *  use the isActive prop to set the start state of the component (if no prop is passed, the state will bei unActive --> not filled)
 *
 * Example:
 * <CategoryCheckbutton category="study" isActive />
 */

const CategoryCheckbutton = ({ category, className, onChange, value }) => {
  const handleChange = onChange && ((e) => {
    onChange(e.target.checked)
})

  return (
    <label
    for={category}
    className={`category-checkbutton category-checkbutton--${category} ${
      value && "category-checkbutton--isActive"
    } ${className && className}`} 
   >

    <input
      id={category}
      type="checkbox"
      value={value}
      onClick={handleChange}
   />
      {category === "study" && (
        <ColorLensIcon className="category-checkbutton__img" />
      )}
      {category === "campus" && (
        <SchoolIcon className="category-checkbutton__img" />
      )}
      {category === "class" && (
        <SvgIcon
          component={BookIcon}
          viewBox="0 -4 24 24"
          className="MuiSvgIcon-root svg-icon category-checkbutton__img"
        />
      )}{" "}
      {/* correct viewBox to center the icon */}
      {category === "research" && (
        <SvgIcon
          component={MagicIcon}
          className="MuiSvgIcon-root svg-icon category-checkbutton__img"
        />
      )}
      <p className="category-checkbutton__label">
        {category === "study" && "Studiprojekt"}
        {category === "campus" && "Campus"}
        {category === "class" && "Vorlesung"}
        {category === "research" && "Forschung"}
      </p>
    </label>
    
  );
}

export default CategoryCheckbutton;
