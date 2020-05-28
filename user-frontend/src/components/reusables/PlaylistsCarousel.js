import React from 'react'
import PlaylistCard from './PlaylistCard'

function PlaylistsCarousel({playlists}) {
    return (
        <div className="playlists-carousel">
        {playlists.map((playlist) => {
            return (<PlaylistCard playlistData={playlist}/>)
        }
        )}
        </div>
    )
}

export default PlaylistsCarousel
