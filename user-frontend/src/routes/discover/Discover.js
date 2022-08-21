import React, {useContext, useState, useEffect, useCallback} from "react";
import Illustration from "../../assets/img/Illustration_Discover.svg";
import {DataContext} from "../../api/DataContext";
import DiscoverQuestionCard from "../../components/reusables/DiscoverQuestionCard";
import Button from "../../components/reusables/Button";
import {Link} from "react-router-dom";

const Discover = () => {
  const initialResult = {
    topics: [],
    videoDuration: 0,
    viewFrequency: null,
    videoCreationDate: null,
    videoLength: null
  };

  const data = useContext(DataContext);
  const [result, setResult] = useState(initialResult);

  const getResult = useCallback((input) => {
    setResult((prevResult) => {
      const objKey = Object.keys(input)
      const objValue = input[objKey[0]]
      return {...prevResult, [objKey]: objValue}
    });
  },
    [result],
  );

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    data && (
      <div className="discover main">
        <header className="discover__header page-headline">
          <img
            src={Illustration}
            alt="Illustration Discover"
            className="discover__illustration"
          />

          <div className="discover__header-title">
            <h1>Entdecken</h1>
            <h3 className="discover__header-subtitle">
              Bitte beantworte uns einige Fragen und wir werden dir eine Auswahl
              an interessanten Inhalten zusammenstellen.
            </h3>
          </div>
        </header>

        <main className="container-80 discover__main">
          <DiscoverQuestionCard
            subject="Kategorie"
            headline="Welche Themen interessieren dich am meisten?"
            checkboxLabel="Ich bin für alle Themen offen"
            hasCategories
            result={getResult}
          />
          <DiscoverQuestionCard
            subject="Spiellänge"
            headline="Wie lang sollte das Video dauern?"
            checkboxLabel="Die Spiellänge ist mir nicht wichtig"
            hasSlider
            result={getResult}
          />
          <DiscoverQuestionCard
            subject="Abspielhäufigkeit"
            headline="Wie bekannt sollen die Inhalte sein?"
            hasRadiobuttonGroup
            fullSize
            result={getResult}
          />
          <DiscoverQuestionCard
            subject="Sortierung"
            headline="In welcher Reihenfolge sollen die Videos gelistet werden?"
            checkboxLabel="Die Reihenfolge der Anzeige ist mir nicht wichtig"
            hasRadiobuttonGroup
            result={getResult}
          />
          <Link to={"/discover/recommendations"}>
            <Button>Ergebsnisse Anzeigen</Button>
          </Link>

        </main>
      </div>
    )
  );
};

export default Discover;
