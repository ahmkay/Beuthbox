import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {FormControlLabel, Slider} from '@material-ui/core';
import CategoryCheckbutton from './CategoryCheckbutton';

const DiscoverQuestionCard = ({headline, checkboxLabel, hasCategories, hasSlider, result, fullSize, hasRadiobuttonGroup }) => {
    const [checked, setChecked] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState('');

    const handleChange = (event) => {
        setChecked(event.target.checked);
      };
    const onValueChange = (event) => {
        setSelectedOption(event.target.value)
        console.log(selectedOption)
    }
    const renderSlider = () => {
          const marks = [
            {
              value: 0,
              label: 'max 5min',
            },
            {
              value: 10,
              label: 'max 10min',
            },
            {
              value: 20,
              label: 'max 20min',
            },
            {
              value: 30,
              label: 'max 30min',
            },
            {
                value: 45,
                label: 'max 45min',
              },
              {
                value: 60,
                label: 'über 1h',
              },
          ];
          
          function valuetext(value) {
            return `${value}°C`;
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
    }

    const renderRadioButtonGroup = () => {
        return (
            fullSize ? 
<div className="discover-question-card__radiogroup-container">
   <label className={`radio-button-secondary ${selectedOption === 'rare' ? '--checked' : ''}`}>
        <input
    type="radio"
    value="rare"
    checked={selectedOption === 'rare'}
    onChange={onValueChange}
    />
    Zeige mir eher selten geschaute Inhate
    </label>

    <label className={`radio-button-secondary ${selectedOption === 'frequently' ? '--checked' : ''}`}>
        <input
    type="radio"
    value="frequently"
    checked={selectedOption === 'frequently'}
    onChange={onValueChange}
    />
    Zeige mir eher selten geschaute Inhate
    </label>
    <label className={`radio-button-secondary ${selectedOption === 'irrelevant' ? '--checked' : ''}`}>
        <input
    type="radio"
    value="irrelevant"
    checked={selectedOption === 'irrelevant'}
    onChange={onValueChange}
    />
    Zeige mir eher selten geschaute Inhate
    </label>  
</div>
:
<div className="discover-question-card__radiogroup-container">
    <div className="discover-question-card__radiogroup-inner-container">
    <h5 className="discover-question-card__radiogroup-headline">Kürzeste Videos</h5>
   <label className={`radio-button-secondary ${selectedOption === 'rare' ? '--checked' : ''}`}>
        <input
    type="radio"
    value="rare"
    checked={selectedOption === 'rare'}
    onChange={onValueChange}
    />
    zuerst
    </label>

    <label className={`radio-button-secondary ${selectedOption === 'frequently' ? '--checked' : ''}`}>
        <input
    type="radio"
    value="frequently"
    checked={selectedOption === 'frequently'}
    onChange={onValueChange}
    />
    zuletzt
    </label>
    </div>
    <div className="discover-question-card__radiogroup-inner-container">
    <h5 className="discover-question-card__radiogroup-headline"> Neuste Videos</h5>
    <label className={`radio-button-secondary ${selectedOption === 'irrelevant' ? '--checked' : ''}`}>
        <input
    type="radio"
    value="irrelevant"
    checked={selectedOption === 'irrelevant'}
    onChange={onValueChange}
    />
    zuerst
    </label>
    <label className={`radio-button-secondary ${selectedOption === 'irrelevant' ? '--checked' : ''}`}>
        <input
    type="radio"
    value="irrelevant"
    checked={selectedOption === 'irrelevant'}
    onChange={onValueChange}
    />
    zuletzt
    </label>  
    </div>
</div>
        )
    }

    return (
        <div className="discover-question-card">
            <h4 className="discover-question-card__headline">{headline}</h4>
            {checkboxLabel &&
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
            }
            {hasCategories &&
                <div className="discover-question-card__category-container">
                <div className="discover-question-card__category-row">
                    <CategoryCheckbutton category="study" />
                    <p className="discover-question-card__category-description">
                        Ergebnisse aus Semesterprojekten oder Abschlussarbeiten
                    </p>
                </div>
                <div className="discover-question-card__category-row">
                    <CategoryCheckbutton category="class" />
                    <p className="discover-question-card__category-description">
                        Ergebnisse aus Semesterprojekten oder Abschlussarbeiten
                    </p>
                </div>
                <div className="discover-question-card__category-row">
                    <CategoryCheckbutton category="campus" />
                    <p className="discover-question-card__category-description">
                        Ergebnisse aus Semesterprojekten oder Abschlussarbeiten
                    </p>
                </div>
                <div className="discover-question-card__category-row">
                    <CategoryCheckbutton category="research" />
                    <p className="discover-question-card__category-description">
                        Ergebnisse aus Semesterprojekten oder Abschlussarbeiten
                    </p>
                </div>
            </div>
            }
            {hasSlider &&
            renderSlider()
            }
            {
            hasRadiobuttonGroup &&
            renderRadioButtonGroup()}
        </div>

    );
}

export default DiscoverQuestionCard