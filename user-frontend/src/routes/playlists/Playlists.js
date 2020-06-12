import React, {useState, useEffect } from 'react'
import axios from 'axios'
import PlaylistsCarousel from '../../components/reusables/PlaylistsCarousel'

const Playlists = ({ playlistData}) => {
    if( playlistData.length > 0) {
        return (
            <main className="main">
                <section className="playlists-section">
                    <header className="section-header">
                    <h1>Playlists</h1>
                    <h2>Entdecke die Sammlung der neusten Playlisten</h2>
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