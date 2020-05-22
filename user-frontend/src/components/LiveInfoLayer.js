import React from 'react';
import Button from './reusables/Button'
import { useHistory } from 'react-router-dom'
import liveLayerImg from '../assets/img/IllustrationLive.svg'

const LiveInfoLayer = () => {
    const history = useHistory()
    const showLivescreen = () => {
        history.push('/live')
    }
    return (
        <div className='root-container'>
            <div className='liveinfo-container'>
                <div className='liveinfo-container-image'>
                    <img src={liveLayerImg} className='liveinfo-image'/>
                </div>
                <div className='liveinfo-container-content'>
                    <h2 className='liveinfo-headline'>
                        Wir sind live!
                    </h2>
                    <h3 className='liveinfo-description'>
                        Schau dir den aktuellen Livestream zu "Platzhalter Titel" an.
                    </h3>
                    <Button onClick={showLivescreen}> Zum Livestream</Button>
                </div>
            </div>
        </div>
    )
}

export default LiveInfoLayer