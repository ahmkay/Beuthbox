import React, {useState, useEffect } from 'react'
import axios from 'axios'
import {BASEURL} from '../../api'
import Moment from 'react-moment';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import TodayIcon from '@material-ui/icons/Today';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ShareIcon from '@material-ui/icons/Share';
import SecondaryButton from '../../components/reusables/SecondaryButton';
import Play from '../../assets/img/Play.svg'
import { Link } from 'react-router-dom'

const Video = (props) => {
    const [video, setVideo ] = useState([])
    const { id } = props.match.params

    useEffect(() => {
        const fetchData = async () => {
            try {
                const video = await axios.get( `${BASEURL}/graphql?query={video(id:"${id}"){name, description, created, uploaded, playerType, tags, status, source, uploadedByUser, access, videoDuration, dualView, isOpencast, posterImagePath, videoPath, modified, _id, views}}`)

                let videoPathString = video.data.data.video.videoPath.toString();
                let string = videoPathString.replace("http://beuthbox-opencast.beuth-hochschule.de/static/mh_default_org/engage-player/", "");
                let n = string.indexOf("/");
                let OCid = string.slice(0, n);
                video.data.data.video.ocid = OCid;
                setVideo(video.data.data.video)
            }
            catch(error) { console.log(error)}
        }
        fetchData()
        console.log(props, 'props')
    }, [id])

    const shareVideo = () => document.execCommand('copy');
    
    const showTags = () =>  video.tags.map((tag, index) => <Link to={`/search?tag=${tag}`} className={`video--tag ${index === 0 ? 'firstchild' : '' }`} ><h5>#{tag}</h5></Link>)

   
    const calculateVideoDuration = duration => {
        let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
        
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        
        return hours !== '00' ? hours + ":" + minutes + ":" + seconds : minutes + ":" + seconds
    
    }
    

    const showLastLivestreams = () => {
       return (
        <div className='last-livestreams-container'>
            <div className='last-livestream-thumbnail-container'>
                <img src={Play} alt="Play Button" className="thumbnail__play-button"/>
                <div className='last-livestream-overlay-default'>
                    <small className='overlay-title'>{video.name}</small>
                    <small className='overlay-duration'>
                        <AccessTimeIcon />
                     {calculateVideoDuration(video.videoDuration)}
                    </small>
                </div>
                <Link to={`/video/5c4641dfcf3c87061cbb43f6`} className='video-link'>
                    <img className="video-thumbnail" src={`${BASEURL}/videos${video.posterImagePath}`}/>        
                </Link>
            </div>

            <div className='last-livestream-thumbnail-container'>
            <img src={Play} alt="Play Button" className="thumbnail__play-button"/>
                <div className='last-livestream-overlay-default'> 
                <small className='overlay-title'>{video.name}</small>
                <small className='overlay-duration'>
                    <AccessTimeIcon />
                    {calculateVideoDuration(video.videoDuration)}
                </small>
                </div>
                <Link to={`/video/5c4641dfcf3c87061cbb43f6`} className='video-link'>
                    <img className="video-thumbnail" src={`${BASEURL}/videos${video.posterImagePath}`}/>        
                </Link>
            </div>

            <div className='last-livestream-thumbnail-container'>
            <img src={Play} alt="Play Button" className="thumbnail__play-button"/>
                <div className='last-livestream-overlay-default'> 
                <small className='overlay-title'>{video.name}</small>
                <small className='overlay-duration'>
                    <AccessTimeIcon />
                    {calculateVideoDuration(video.videoDuration)}
                    </small>
                </div>
                <Link to={`/video/5c4641dfcf3c87061cbb43f6`} className='video-link'>
                    <img className="video-thumbnail" src={`${BASEURL}/videos${video.posterImagePath}`}/>        
                </Link>
            </div>
     </div>
       )

    }

    console.log(video)

    if(video) {
       return (
           <>
           <div className='container-60'>
               <div className='video-container'>
                    <iframe allowfullscreen 
                        src={`http://beuthbox-opencast.beuth-hochschule.de/paella/ui/embed.html?id=${video.ocid}`}
                        style={{border: 'none', width: '100%', height: '70vh'}} 
                        name="Paella Player" 
                        scrolling="no" 
                        frameborder="0" 
                        marginheight="0px" 
                        marginwidth="0px">
                    </iframe>
               </div>
               <div className='video-info-container'>
                <div className='video-category-container'>
                    <span className='container__icon container__icon--student'>
                    <ColorLensIcon className='container-icon__category-icon container-icon__category-icon--students'/>
                    </span>
                    Studiprojekt
                    {video.tags && showTags()}
                </div>
                <div className='video-createdAt-container'>
                    <TodayIcon className='today--icon' />
                    <small className='createdAt'>
                        <Moment format="MM.DD.YY">{video.created}</Moment>
                    </small>
                </div>
               </div>
               <h2 className='video-headline'>{video.name}</h2>
               <p className='video-description'>
                   {video.description}
               </p>
               <SecondaryButton text={'Teilen'} onClick={shareVideo} icon={ShareIcon} additionalClasses='share-button'></SecondaryButton>
           </div>
           <div className='container-80'>
           <h3 className='last-livestreams'>Vergangene Livestreams</h3>
           {showLastLivestreams()}
           </div>
           </>
       )
    }
    return (
        <div>
            Video
        </div>
    )
}

export default Video