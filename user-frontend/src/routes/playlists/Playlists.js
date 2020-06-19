import React from 'react'
import PlaylistsCarousel from '../../components/reusables/PlaylistsCarousel'

const Playlists = ({ playlistData}) => {
    if( playlistData.length > 0) {
        return (
            <main className="main">
                <section className="main__section">
                    <header className="section-header">
                        <h1>Playlists</h1>
                    </header>
                    <PlaylistsCarousel playlists={playlistData}/>
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