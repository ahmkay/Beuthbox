import React from 'react'
import { Link } from 'react-router-dom'
import { Videocam } from '@material-ui/icons';
import CategoryIcon from '../reusables/CategoryIcon'
import ButtonPlaylist from '../../assets/img/Button_Playlist.svg'
import PlaylistPlaceholder from '../../assets/img/PlaylistPlaceholder.png'

/**
 * a reusable component to display a thumbnail for a playlist
 * 
 * @param {Object} playlistData an object of a playlist
 * @param {Number} videoCount the number of videos of this playlist
 * 
 * @example
 * <PlaylistThumbnail
 *  playlistData={playlist}
 *  videoCount={videoCount}
 * />
 * 
 */

const PlaylistThumbnail = ({playlistData, videoCount}) => {

    return (
        <div className="playlist-thumbnail-container">
            <Link to={`/playlist/${playlistData._id}`} className="playlist-thumbnail-container__content">
                <img src={playlistData.imagepath? `http://beuthbox.beuth-hochschule.de/api/category${playlistData.imagepath}` : PlaylistPlaceholder} className="playlist-thumbnail-container__thumbnail-img" alt="playlist thumbnail"/>
                <img src={ButtonPlaylist} className="playlist-thumbnail-container__playlist-button" alt="playlist button" />
                <div className="playlist-thumbnail-container__overlay">
                    <h5 className="playlist-thumbnail-container__playlist-title">{playlistData.name ? playlistData.name : 'Kein Titel'}</h5>
                    <div className="playlist-thumbnail-container__details">
                        <small className="playlist-thumbnail-container__playlist-description">
                            {playlistData.description ? playlistData.description : 'Keine Beschreibung'}
                        </small>
                        <div className="playlist-container__attributes-row">
                            <h5 className="playlist-thumbnail-container__videocount">
                                <Videocam /> { videoCount ? videoCount : '0'}
                            </h5>
                            <CategoryIcon 
                                isActive
                                category="study"    
                            />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default PlaylistThumbnail