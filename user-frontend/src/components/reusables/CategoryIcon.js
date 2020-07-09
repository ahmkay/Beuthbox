import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import SchoolIcon from "@material-ui/icons/School";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import { ReactComponent as MagicIcon } from "../../assets/img/icons/magic.svg";
import { ReactComponent as BookIcon } from "../../assets/img/icons/Icon_Book.svg";

/**
 * A reusable component to show an icon for the specific category
 *
 * @param {String} category  !Required Categories to choose from are: 'study', 'campus', 'class', 'research'
 * @param {Boolean} isActive set to either show the specific colors or set all colors to grey (disabled-style)
 * @param {String} type set the type to configure the appearance: 'label', 'labeled'
 * @param {Boolean} hasBackground set to either show white background or make it transparent
 *
 * @example
 * <CategoryIcon
 *  category='study'
 *  isActive
 *  type='labeled'
 * />
 */

function CategoryIcon({ category, isActive, type, hasBackground }) {
  let showLabel = type === "label" || type === "labeled";

  return (
    <div
      className={`category-icon category-icon--${category} category-icon category-icon--${type}`}
    >
      <div
        className={`category-icon__icon-container category-icon__icon-container--${category} 
        ${isActive && "category-icon__icon-container--isActive"} ${
          hasBackground && "category-icon__icon-container--hasBackground"
        }`}
      >
        {category === "study" && (
          <ColorLensIcon className="category-icon__img" />
        )}
        {category === "campus" && <SchoolIcon className="category-icon__img" />}
        {category === "class" && (
          <SvgIcon
            component={BookIcon}
            viewBox="0 -4 24 24"
            className="MuiSvgIcon-root svg-icon category-icon__img"
          />
        )}{" "}
        {/* correct viewBox to center the icon */}
        {category === "research" && (
          <SvgIcon
            component={MagicIcon}
            className="MuiSvgIcon-root svg-icon category-icon__img"
          />
        )}
      </div>
      {showLabel && (
        <span
          className={`category-icon__label category-icon__label--${category}`}
        >
          {category === "study" && "Studiprojekt"}
          {category === "campus" && "Campus"}
          {category === "class" && "Vorlesung"}
          {category === "research" && "Forschung"}
        </span>
      )}
    </div>
  );
}

export default CategoryIcon;
