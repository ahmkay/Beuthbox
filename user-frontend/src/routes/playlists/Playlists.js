import React from 'react'
import MultiCarousel from '../../components/reusables/MutliCarousel'

const Playlists = ({ playlistData}) => {
    if( playlistData.length > 0) {
        return (
            <main className="main">
                <section className="main__section">
                    <header className="section-header">
                        <h1>Playlists</h1>
                    </header>
                    <MultiCarousel videos={playlistData} isPlaylist />
                </section>
            </main>
        )
    }
    return (
        <main className="main">
            <div>
                Playlists werden geladen...
            </div>
        </main>
    )
}

export default Playlists