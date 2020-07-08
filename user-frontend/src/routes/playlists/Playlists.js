import React, { useContext } from 'react'
import MultiCarousel from '../../components/reusables/MutliCarousel'
import { DataContext } from '../../api/DataContext'
import ActivityIndicator from '../../components/reusables/ActivityIndicator'

const Playlists = () => {
    const { playlistData } = useContext(DataContext)
    if( playlistData.length) {
        return (
            <main className="main">
                <section className="main__section">
                    <header className="section-header">
                        <h1>Playlists</h1>
                    </header>
                    <MultiCarousel isPlaylist />
                </section>
            </main>
        )
    }
    return (
        <main className="main">
            <div>
              <ActivityIndicator />
            </div>
        </main>
    )
}

export default Playlists