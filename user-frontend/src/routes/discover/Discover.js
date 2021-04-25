import React, { useContext, useState, useEffect } from 'react'
import Illustration from '../../assets/img/Illustration_Discover.svg'
import { DataContext } from '../../api/DataContext'
import DiscoverQuestionCard from '../../components/reusables/DiscoverQuestionCard'


const Discover = () => {
    const daten = useContext(DataContext)
    const [result, setResult] = useState([])

    const getResult = (input) => {
        setResult(( result) => [...result, input])
        console.log(result)
    }

    useEffect(() => {
        console.log(result)
    }, [result])
    
          return daten && (
              <>
           <div className="discover-card">
            <img src={Illustration} alt="Illustration Discover" className="discover-card__illustration"/>
            <h1>Entdecken</h1>
            <h3>
                Bitte beantworte uns einige Fragen und wir werden dir eine Auswahl an interessanten Inhalten zusammenstellen.
            </h3>
           </div>
           <div className="container-70 discover-card__background-container">
            <div className="container-80 discover-card__inner-container">
               <DiscoverQuestionCard headline="Welche Themen interessieren dich am meisten?" checkboxLabel="Ich bin für alle Themen offen" hasCategories result={getResult} />
               <DiscoverQuestionCard headline="Wie lang sollte das Video sein?" checkboxLabel="Die Länge ist mir nicht wichtig" hasSlider/>
               <DiscoverQuestionCard headline="Bist du mutig?" hasRadiobuttonGroup fullSize />
               <DiscoverQuestionCard headline="Was ist dir am wichtigsten?" checkboxLabel="Die Reihenfolge der Anzeige ist mir nicht wichtig" hasRadiobuttonGroup />
            </div>
           </div>
            </>
            )
           
}

export default Discover
