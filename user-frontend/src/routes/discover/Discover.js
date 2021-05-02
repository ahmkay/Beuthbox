import React, { useContext, useState, useEffect } from "react";
import Illustration from "../../assets/img/Illustration_Discover.svg";
import { DataContext } from "../../api/DataContext";
import DiscoverQuestionCard from "../../components/reusables/DiscoverQuestionCard";
import Button from "../../components/reusables/Button";

const Discover = () => {
  const daten = useContext(DataContext);
  const [result, setResult] = useState([]);

  const getResult = (input) => {
    setResult((result) => [...result, input]);
    console.log(result);
  };

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    daten && (
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
          />
          <DiscoverQuestionCard
            subject="Abspielhäufigkeit"
            headline="Wie bekannt sollen die Inhalte sein?"
            hasRadiobuttonGroup
            fullSize
          />
          <DiscoverQuestionCard
            subject="Sortierung"
            headline="In welcher Reihenfolge sollen die Videos gelistet werden?"
            checkboxLabel="Die Reihenfolge der Anzeige ist mir nicht wichtig"
            hasRadiobuttonGroup
          />
          <Button>Ergebsnisse Anzeigen</Button>
        </main>
      </div>
    )
  );
};

export default Discover;
