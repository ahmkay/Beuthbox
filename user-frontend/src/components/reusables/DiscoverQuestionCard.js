import React, {useState, useLayoutEffect, useEffect} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import {FormControlLabel, Slider} from "@material-ui/core";
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
  const [isWindowMobileSize, setIsWindowMobileSize] = useState(
    window.innerWidth < 576
  );
  const [checked, setChecked] = useState(false);
  const [selectedFame, setSelectedFame] = useState("");
  const [sortedByLength, setSortedByLength] = useState("");
  const [sortedByCreationdate, setsortedByCreationdate] = useState("");
  const [sliderValue, setSliderValue] = useState(0)
  const [value, setValue] = useState({})

  const categoryButtonOptions = [
    {category: 'study', text: 'Ergebnisse aus Semesterprojekten oder Abschlussarbeiten'},
    {category: 'class', text: 'Kurzlehrfilme, Vorträge/Präsentationen, Best of Vorlesungen'},
    {category: 'campus', text: 'Ergebnisse aus Semesterprojekten oder Abschlussarbeiten'},
    {category: 'research', text: 'Neuste Inhalte rund um das Leben am und um den Campus'}
  ]

  const mapCategories = (index) => {
    const category = {
      test: 'study',
      1: 'class',
      2: 'campus',
      3: 'research'
    }[index]

    return category
  }

  useLayoutEffect(() => {
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
    const resultDependingOnType = () => {
      if (hasCategories) {
        result({topics: event.target.checked ? ['study', 'class', 'campus', 'research'] : []})
      }
      else if (hasSlider) {
        result({videoDuration: 0})
        setSliderValue(0)
      }
      else if (hasRadiobuttonGroup) {
        result({videoLength: null});
        result({videoCreationDate: null});
        setSortedByLength('');
        setsortedByCreationdate('');
      }
    }
    setChecked(event.target.checked);
    resultDependingOnType()

  };
  const handleFameChange = (event) => {
    setSelectedFame(event.target.value);
    result({viewFrequency: event.target.value});
  };
  const handleSortedLengthChange = (event) => {
    setSortedByLength(event.target.value);
    setChecked(false)
    result({videoLength: event.target.value});
  };
  const handlesortedCreationdateChange = (event) => {
    setsortedByCreationdate(event.target.value);
    setChecked(false)
    result({videoCreationDate: event.target.value});
  };


  const handleCategoryChange = (input, index) => {
    setValue(prevValue => ({...prevValue, [index]: input}))
  }

  const renderCategorieButtons = () => {
    return (
      <div className="discover-question-card__category-grid">
        {categoryButtonOptions.map(({category, text}, index) => {
          return (
            <>
              {!isWindowMobileSize ?
                <CategoryCheckbutton
                  category={category}
                  className="discover-question-card__category"
                  value={value[index]}
                  onChange={(event) => handleCategoryChange(event, index)}
                />
                :
                <CategoryIcon
                  category={category}
                  isActive // TODO: change on click
                  type="labeled"
                  className="discover-question-card__category"
                />
              }
              <p className="discover-question-card__category-description">
                {text}
              </p>
            </>
          )
        })}
      </div>
    );
  };

  const renderSlider = () => {
    const marks = [
      {
        value: 0,
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

    function handleSliderValue(event, value) {
      setSliderValue(value)
      setChecked(false)
      result({videoDuration: value});
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
          value={sliderValue}
          onChange={() => { }}
          onChangeCommitted={handleSliderValue}
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
            className={`category-checkbutton category-checkbutton--campus radio-button radio-button${selectedFame === "rare" ? "--checked" : ""
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
            className={`category-checkbutton category-checkbutton--campus radio-button radio-button${selectedFame === "frequently" ? "--checked" : ""
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
            className={`category-checkbutton category-checkbutton--campus radio-button radio-button${selectedFame === "irrelevant" ? "--checked" : ""
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
              className={`category-checkbutton category-checkbutton--campus radio-button radio-button${sortedByLength === "shortestFirst" ? "--checked" : ""
                }`}
            >
              zuerst {!isWindowMobileSize && <KeyboardArrowUp />}
            </span>
          </label>

          <label className="discover-question-card__radio-button">
            <span
              className={`category-checkbutton category-checkbutton--campus radio-button radio-button${sortedByLength === "shortestLast" ? "--checked" : ""
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
              className={`category-checkbutton category-checkbutton--campus radio-button radio-button${sortedByCreationdate === "newestFirst" ? "--checked" : ""
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
              className={`category-checkbutton category-checkbutton--campus radio-button radio-button${sortedByCreationdate === "newestLast" ? "--checked" : ""
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
