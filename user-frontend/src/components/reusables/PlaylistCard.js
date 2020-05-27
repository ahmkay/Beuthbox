import React from 'react'
import { Videocam } from '@material-ui/icons';
import PlaylistPlaceholder from '../../assets/img/PlaylistPlaceholder.png'
import { NavLink } from 'react-router-dom'

const PlaylistCard = ({playlistData}) => {
    return (
        <NavLink to={`/playlist/${playlistData._id}`} className="playlist-card-container">
            <div className="playlist-card-container__content">
                <img src={playlistData.imagepath? `http://beuthbox.beuth-hochschule.de/api/category${playlistData.imagepath}` : PlaylistPlaceholder} className="playlist-card-container__thumbnail-img" alt="Paylist Titelbild"/>
                <div className="playlist-card-container__info-box">
                    <h4>{playlistData.name}</h4>
                    <p>{playlistData.description}</p>
                    <div className="info-box__video-count">
                        <Videocam />
                        <h5 className="video-count__number">{playlistData.videoCount ? playlistData.videoCount : '-'}</h5>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default PlaylistCard
