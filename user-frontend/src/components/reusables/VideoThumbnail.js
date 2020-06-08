import React from 'react'
import { Link } from 'react-router-dom'
import Play from '../../assets/img/Play.svg'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Placeholder from '../../assets/img/Placeholder_Video.svg'

const VideoThumbnail = ({title, duration, img, id, listOrientation, listCount}) => {
    return (
        <div className={`video-thumbnail-container${listOrientation && listOrientation !== 'row' ? '--column' : '--row'}${listOrientation === 'row' && listCount && listCount === 3 ? '-3' : ''}${listOrientation === 'row' && listCount == undefined || listCount === 4 ? '-4' : ''}`}>
            <Link to={'/video/'+id} className="video-thumbnail-container__content">
                <img src={img ? img : Placeholder} className="video-thumbnail-container__thumbnail-img" alt="Video Thumbnail"/>
                <img src={Play} alt="Play Button" className="video-thumbnail-container__play-button"/>
                <div className="video-thumbnail-container__overlay">
                    <p className="video-thumbnail-container__video-title">{title ? title : 'Kein Titel'}</p>
                    <small className="video-thumbnail-container__video-duration">
                        <AccessTimeIcon /> {duration ? duration : '0:00'}
                    </small>
                </div>
            </Link>
        </div>
    )
}

export default VideoThumbnail
