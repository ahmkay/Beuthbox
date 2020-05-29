import React, {useState, useEffect } from 'react'
import axios from 'axios'
import {BASEURL} from '../../api'
import Moment from 'react-moment';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import TodayIcon from '@material-ui/icons/Today';
import ShareIcon from '@material-ui/icons/Share';
import SecondaryButton from '../../components/reusables/SecondaryButton';
import { Link } from 'react-router-dom'
import VideoRow from '../../components/reusables/VideoRow';

const Live = (props) => {
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
                await setVideo(video.data.data.video)

            }
            catch(error) { console.log(error)}
        }
        fetchData()
        console.log(props, 'props')
    }, [id])

    const shareVideo = () => navigator.clipboard.writeText('Copy this text to clipboard');
    const showTags = () =>  video.tags.map((tag, index) => <Link to={`/search?tag=${tag}`} className={`video--tag ${index === 0 ? 'firstchild' : '' }`} ><h5>#{tag}</h5></Link>)


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
                        <Moment format="DD.MM.YY">{video.created}</Moment>
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
           <VideoRow headline='Vergangene Livestreams' amountOfVideos={3} videos={video} />
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

export default Live