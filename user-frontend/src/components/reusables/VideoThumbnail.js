import React from 'react'
import { Link } from 'react-router-dom'
import Play from '../../assets/img/Play.svg'
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const VideoThumbnail = ({title, duration, img, id}) => {
    return (
        <div className="video-thumbnail-container">
            <Link to={'/video/'+id} className="video-thumbnail-container__content">
                <img src={img} className="video-thumbnail-container__thumbnail-img" alt="Video Thumbnail"/>
                <img src={Play} alt="Play Button" className="video-thumbnail-container__play-button"/>
                <div className="video-thumbnail-container__overlay">
                    <p className="video-thumbnail-container__video-title">{title}</p>
                    <small className="video-thumbnail-container__video-duration">
                        <AccessTimeIcon /> {duration}
                    </small>
                </div>
            </Link>
        </div>
    )
}

export default VideoThumbnail
