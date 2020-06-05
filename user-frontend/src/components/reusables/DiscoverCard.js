import React from 'react'
import Illustration from '../../assets/img/Illustration_Discover.svg'
import Button from '../reusables/Button'

function DiscoverCard() {
    return (
        <div className="discover-card">
            <img src={Illustration} alt="Illustration Discover" className="discover-card__illustration"/>
            <div className="discover-card__text-container">
                <h2 className="discover-card__title">Du hast schon alles gesehen?</h2>
                <h4 className="discover-card__description">
                    Lass uns Dir helfen ein Video zu finden,<br />
                    das dich wirklich interessiert.
                </h4>
                <Button className="discover-card__Button">Inhalte Entdecken</Button>
            </div>
        </div>
    )
}

export default DiscoverCard
