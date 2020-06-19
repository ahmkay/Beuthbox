import React from 'react'
import { Link } from 'react-router-dom'
import Play from '../../assets/img/Play.svg'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Placeholder from '../../assets/img/Placeholder_Video.svg'

/**
 * 
 * A reusable component to display a thumbnail for a video
 * 
 * @param {String} title to display the title of the video
 * @param {String} duration to display the duration of the video. The duration has to be parsed to a String!
 * @param {String} img the path to the thumbnail-img
 * @param {String} id the id of the video
 * @param {String} listOrientation the orientation of the layout in which the thumbnail is used. Note: if the orientation is 'column' a video thumbnail will take 100% width of its parent container.
 * @param {String} listCount the number of videos to show in a row. This is for the calculation of the width of the container
 * 
 * @example
 * import { calculateVideoDuration } from '../../utils'
 *  <VideoThumbnail 
 *     title={video.name}
 *     listOrientation='column' 
 *     duration={calculateVideoDuration(video.videoDuration)}
 *     img = {imgPath}
 *     id = {video._id}
 * />
 */

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
