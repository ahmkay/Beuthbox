import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { FormControlLabel, Slider } from "@material-ui/core";
import CategoryCheckbutton from "./CategoryCheckbutton";
import FavoriteOutlined from "@material-ui/icons/FavoriteOutlined";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import HelpOutlineOutlined from "@material-ui/icons/HelpOutlineOutlined";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUp from "@material-ui/icons/KeyboardArrowUp";
import CategoryIcon from "./CategoryIcon";

const DiscoverQuestionCard = ({
  subject,
  headline,
  checkboxLabel,
  hasCategories,
  hasSlider,
  result,
  fullSize,
  hasRadiobuttonGroup,
}) => {
  const [isWindowMobileSize, setIsWindowMobileSize] = React.useState(
    window.innerWidth < 576
  );
  const [checked, setChecked] = React.useState(false);
  const [selectedFame, setSelectedFame] = React.useState("");
  const [sortedByLength, setSortedByLength] = React.useState("");
  const [sortedByCreationdate, setsortedByCreationdate] = React.useState("");

  React.useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setMobileSize();
    });
    return () => {
      window.removeEventListener("resize", () => {
        setMobileSize();
      });
    };
  });

  const setMobileSize = () => {
    setIsWindowMobileSize(window.innerWidth < 576);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleFameChange = (event) => {
    setSelectedFame(event.target.value);
  };
  const handleSortedLengthChange = (event) => {
    setSortedByLength(event.target.value);
  };
  const handlesortedCreationdateChange = (event) => {
    setsortedByCreationdate(event.target.value);
  };

  const renderCategorieButtons = () => {
    return (
      <div className="discover-question-card__category-grid">
        {!isWindowMobileSize ? (
          <CategoryCheckbutton
            category="study"
            className="discover-question-card__category"
          />
        ) : (
          <CategoryIcon
            category="study"
            isActive // TODO: change on click
            type="labeled"
            className="discover-question-card__category"
          />
        )}
        <p className="discover-question-card__category-description">
          Ergebnisse aus Semesterprojekten oder Abschlussarbeiten
        </p>

        {!isWindowMobileSize ? (
          <CategoryCheckbutton
            category="class"
            className="discover-question-card__category"
          />
        ) : (
          <CategoryIcon
            category="class"
            isActive // TODO: change on click
            type="labeled"
            className="discover-question-card__category"
          />
        )}
        <p className="discover-question-card__category-description">
          Kurzlehrfilme, Vorträge/Präsentationen, Best of Vorlesungen
        </p>

        {!isWindowMobileSize ? (
          <CategoryCheckbutton
            category="campus"
            className="discover-question-card__category"
          />
        ) : (
          <CategoryIcon
            category="campus"
            isActive // TODO: change on click
            type="labeled"
            className="discover-question-card__category"
          />
        )}
        <p className="discover-question-card__category-description">
          Ergebnisse aus Semesterprojekten oder Abschlussarbeiten
        </p>

        {!isWindowMobileSize ? (
          <CategoryCheckbutton
            category="research"
            className="discover-question-card__category"
          />
        ) : (
          <CategoryIcon
            category="research"
            isActive // TODO: change on click
            type="labeled"
            className="discover-question-card__category"
          />
        )}
        <p className="discover-question-card__category-description">
          Neuste Inhalte rund um das Leben am und um den Campus
        </p>
      </div>
    );
  };

  const renderSlider = () => {
    const marks = [
      {
        value: 5,
        label: "max 5min",
      },
      {
        value: 10,
        label: "max 10min",
      },
      {
        value: 20,
        label: "max 20min",
      },
      {
        value: 30,
        label: "max 30min",
      },
      {
        value: 45,
        label: "max 45min",
      },
      {
        value: 60,
        label: "über 1h",
      },
    ];

    function valuetext(value) {
      return `${value}min`;
    }

    function valueLabelFormat(value) {
      return marks.findIndex((mark) => mark.value === value) + 1;
    }

    return (
      <div className="discover-question-card__slider-container">
        <Slider
          defaultValue={0}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-restrict"
          step={null}
          valueLabelDisplay="auto"
          marks={marks}
          max={60}
          onChange={(e, v) => console.log(e.target, v)}
        />
      </div>
    );
  };

  const renderRadioButtonGroup = () => {
    return fullSize ? (
      <div className="discover-question-card__radiogroup-container">
        <label className="discover-question-card__radio-button">
          <input
            type="radio"
            value="rare"
            checked={selectedFame === "rare"}
            onChange={handleFameChange}
          />
          <span
            className={`category-checkbutton category-checkbutton--campus radio-button radio-button${
              selectedFame === "rare" ? "--checked" : ""
            }`}
          >
            <FavoriteBorder /> <FavoriteBorder />
          </span>{" "}
          Zeige mir eher selten geschaute Inhate
        </label>

        <label className="discover-question-card__radio-button">
          <input
            type="radio"
            value="frequently"
            checked={selectedFame === "frequently"}
            onChange={handleFameChange}
          />
          <span
            className={`category-checkbutton category-checkbutton--campus radio-button radio-button${
              selectedFame === "frequently" ? "--checked" : ""
            }`}
          >
            <FavoriteOutlined /> <FavoriteOutlined />
          </span>{" "}
          Zeige mir häufig gesehene Inhalte
        </label>

        <label className="discover-question-card__radio-button">
          <input
            type="radio"
            value="irrelevant"
            checked={selectedFame === "irrelevant"}
            onChange={handleFameChange}
          />
          <span
            className={`category-checkbutton category-checkbutton--campus radio-button radio-button${
              selectedFame === "irrelevant" ? "--checked" : ""
            }`}
          >
            <HelpOutlineOutlined />
          </span>{" "}
          Ich habe hier keine Präferenz
        </label>
      </div>
    ) : (
      <div className="discover-question-card__radiogroup-container">
        <div className="discover-question-card__radiogroup-inner-container">
          <label className="discover-question-card__radio-button">
            <input
              type="radio"
              value="shortestFirst"
              checked={sortedByLength === "shortestFirst"}
              onChange={handleSortedLengthChange}
            />
            <span
              className={`category-checkbutton category-checkbutton--campus radio-button radio-button${
                sortedByLength === "shortestFirst" ? "--checked" : ""
              }`}
            >
              zuerst {!isWindowMobileSize && <KeyboardArrowUp />}
            </span>
          </label>

          <label className="discover-question-card__radio-button">
            <span
              className={`category-checkbutton category-checkbutton--campus radio-button radio-button${
                sortedByLength === "shortestLast" ? "--checked" : ""
              }`}
            >
              zuletzt {!isWindowMobileSize && <KeyboardArrowDown />}
            </span>
            <input
              type="radio"
              value="shortestLast"
              checked={sortedByLength === "shortestLast"}
              onChange={handleSortedLengthChange}
            />
          </label>
          <p className="discover-question-card__radiogroup-headline">
            Kürzeste Videos
          </p>
        </div>

        <div className="discover-question-card__radiogroup-inner-container">
          <label className="discover-question-card__radio-button">
            <input
              type="radio"
              value="newestFirst"
              checked={sortedByCreationdate === "newestFirst"}
              onChange={handlesortedCreationdateChange}
            />
            <span
              className={`category-checkbutton category-checkbutton--campus radio-button radio-button${
                sortedByCreationdate === "newestFirst" ? "--checked" : ""
              }`}
            >
              zuerst {!isWindowMobileSize && <KeyboardArrowUp />}
            </span>
          </label>

          <label className="discover-question-card__radio-button">
            <input
              type="radio"
              value="newestLast"
              checked={sortedByCreationdate === "newestLast"}
              onChange={handlesortedCreationdateChange}
            />
            <span
              className={`category-checkbutton category-checkbutton--campus radio-button radio-button${
                sortedByCreationdate === "newestLast" ? "--checked" : ""
              }`}
            >
              zuletzt {!isWindowMobileSize && <KeyboardArrowDown />}
            </span>
          </label>
          <p className="discover-question-card__radiogroup-headline">
            {" "}
            Neuste Videos
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="discover-question-card paper--elevation-1">
      <h6 className="discover-question-card__subject">{subject}</h6>
      <h4 className="discover-question-card__headline">{headline}</h4>

      {hasCategories && renderCategorieButtons()}

      {hasSlider && renderSlider()}

      {hasRadiobuttonGroup && renderRadioButtonGroup()}

      {checkboxLabel && (
        <div className="discover-question-card--opt-out">
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label={checkboxLabel}
          />
        </div>
      )}
    </div>
  );
};

export default DiscoverQuestionCard;
