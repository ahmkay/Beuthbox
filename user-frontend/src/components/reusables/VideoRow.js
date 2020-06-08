import React from 'react';
import {BASEURL} from '../../api'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Play from '../../assets/img/Play.svg'
import { Link } from 'react-router-dom'
import { calculateVideoDuration } from '../../utils';

const VideoRow = ({videos, amountOfVideos, flexDirection, headline}) => {
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

    const showVideoRow = () => {
        if (Array.isArray(videos)) {
            return videos.map((video, index) => {
                if ( amountOfVideos === undefined) {
                    return (
                        <div className={`last-videos-thumbnail-container ${calculateVideoSize()}`}>
                            <img src={Play} alt="Play Button" className="thumbnail__play-button"/>
                            <div className='last-videos-overlay-default'>
                                <small className='overlay-video-title'>{video.name}</small>
                                <small className='overlay-video-duration'>
                                    <AccessTimeIcon />
                                 {calculateVideoDuration(video.videoDuration)}
                                </small>
                            </div>
                            {video.posterImagePath.indexOf('engage-player') > 1 
                            ?
                            <Link to={video._id} className='video-link'>
                                <img className="video-thumbnail" src={video.posterImagePath}/>        
                            </Link>
        
                            :
                            <Link to={video._id} className='video-link'>
                                <img className="video-thumbnail" src={`${BASEURL}/videos${video.posterImagePath}`}/>        
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
                                     <small className='overlay-video-title'>{video.name}</small>
                                     <small className='overlay-video-duration'>
                                         <AccessTimeIcon />
                                      {calculateVideoDuration(video.videoDuration)}
                                     </small>
                                 </div>
                                 {video.posterImagePath.indexOf('engage-player') > 1 
                            ?
                            <Link to={video._id} className='video-link'>
                                <img className="video-thumbnail" src={video.posterImagePath}/>        
                            </Link>
        
                            :
                            <Link to={video._id} className='video-link'>
                                <img className="video-thumbnail" src={`${BASEURL}/videos${video.posterImagePath}`}/>        
                            </Link>
                             }
                             </div>
                         ) 
                     }
                }
                
            })
        }
        else {
        return Object.keys(videos).map((video, index) => {
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

    }

    }

    
    return (
        <>
        <h3 className='last-videos'>{headline}</h3>
        <div className={`last-videos-container${flexDirection ? '--' + flexDirection: ''}`}>
            {showVideoRow()}
        </div>
        </>
    ) 
}

export default VideoRow