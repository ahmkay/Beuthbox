import React, { useContext } from 'react';
import Button from './Button'
import { useHistory } from 'react-router-dom'
import liveLayerImg from '../../assets/img/IllustrationLive.svg'
import { DataContext } from '../../api/DataContext';

const LiveInfoLayer = () => {
    const { activeLivestream } = useContext(DataContext)
    const history = useHistory()
    const showLivescreen = () => {
        history.push('/live')
    }
    if (!activeLivestream) {
        return null
    }
    return (
        <section className='main__section'>
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
        </section>
    )
}

export default LiveInfoLayer