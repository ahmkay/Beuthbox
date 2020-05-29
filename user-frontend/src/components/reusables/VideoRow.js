import React from 'react';
import {BASEURL} from '../../api'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Play from '../../assets/img/Play.svg'
import { Link } from 'react-router-dom'

const VideoRow = ({videos, amountOfVideos, flexDirection, headline}) => {
    const calculateVideoDuration = duration => {
        let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        
        return hours !== '00' ? hours + ":" + minutes + ":" + seconds : minutes + ":" + seconds
    
    }
    const calculateVideoSize = () => {
        if (flexDirection === 'column') return 'vertical'
        
        switch(amountOfVideos) {
            case 3:
                return 'row--3'
            case 4:
                return 'row--4'

            default:
                return 'row--4'
        }
    }

    console.log(videos, 'received videos in videorow')

    const videosAll =  Object.keys(videos).map((video, index) => {
        if ( amountOfVideos === undefined) {
            return (
                <div className={`last-videos-thumbnail-container ${calculateVideoSize()}`}>
                    <img src={Play} alt="Play Button" className="thumbnail__play-button"/>
                    <div className='last-videos-overlay-default'>
                        <small className='overlay-video-title'>{videos.name}</small>
                        <small className='overlay-video-duration'>
                            <AccessTimeIcon />
                         {calculateVideoDuration(videos.videoDuration)}
                        </small>
                    </div>
                    {videos.posterImagePath.indexOf('engage-player') > 1 
                    ?
                    <Link to={videos._id} className='video-link'>
                        <img className="video-thumbnail" src={videos.posterImagePath}/>        
                    </Link>

                    :
                    <Link to={videos._id} className='video-link'>
                        <img className="video-thumbnail" src={`${BASEURL}/videos${videos.posterImagePath}`}/>        
                    </Link>
                     }
                </div>
            ) 
        }
        else {
            if( index + 1 <= amountOfVideos) {
                return (
                     <div className={`last-videos-thumbnail-container ${calculateVideoSize()}`}>
                         <img src={Play} alt="Play Button" className="thumbnail__play-button"/>
                         <div className='last-videos-overlay-default'>
                             <small className='overlay-video-title'>{videos.name}</small>
                             <small className='overlay-video-duration'>
                                 <AccessTimeIcon />
                              {calculateVideoDuration(videos.videoDuration)}
                             </small>
                         </div>
                         {videos.posterImagePath.indexOf('engage-player') > 1 
                    ?
                    <Link to={videos._id} className='video-link'>
                        <img className="video-thumbnail" src={videos.posterImagePath}/>        
                    </Link>

                    :
                    <Link to={videos._id} className='video-link'>
                        <img className="video-thumbnail" src={`${BASEURL}/videos${videos.posterImagePath}`}/>        
                    </Link>
                     }
                     </div>
                 ) 
             }
        }
        
    })
    return (
        <>
        <h3 className='last-videos'>{headline}</h3>
        <div className={`last-videos-container${flexDirection ? '--' + flexDirection: ''}`}>
            {videosAll}
        </div>
        </>
    ) 
}

export default VideoRow