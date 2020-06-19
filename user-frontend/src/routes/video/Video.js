import React, {useState, useEffect, useLayoutEffect, useRef } from 'react'
import axios from 'axios'
import {BASEURL} from '../../api'
import Moment from 'react-moment';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import TodayIcon from '@material-ui/icons/Today';
import ShareIcon from '@material-ui/icons/Share';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import SecondaryButton from '../../components/reusables/SecondaryButton';
import { Link } from 'react-router-dom'
import VideoRow from '../../components/reusables/VideoRow';
import CategoryIcon from '../../components/reusables/CategoryIcon'


const Video = (props) => {
    const [video, setVideo ] = useState([])
    const [height, setHeight] = useState(1000)
    const { id } = props.match.params
    const videoContainerRef = useRef(null)

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

    console.log(video, 'video Object')
    
    const getHeight = () => {
        setHeight(videoContainerRef.current.clientHeight - 240 + 'px')
        console.log(height)
    }

    useLayoutEffect(() => {
        if ( videoContainerRef !== null && videoContainerRef.current !== null) {
       window.addEventListener('resize', getHeight)
        }
        return () => window.removeEventListener('resize', getHeight)
    })
    console.log(video, 'videoData')

    if(video) {
       return (
           <>
           <div className='root-container'>
            <div className='video-content-container'>
           <div className='container-65-left' style={{display: 'inline-block'}} ref={videoContainerRef}>
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
                    <PlaylistPlayIcon className='video-playlist--icon'/>
                    <p className='video-playlist--headline'>
                        Playlist:
                    </p>
                    <Link to='/' className='video--tag'>
                        <h4 className='video-playlist--name'>
                            PlaylistName
                        </h4>
                    </Link>


                    <LiveTvIcon className='video-livetv--icon'/>
                    <p className='video-channel--headline'>
                        Channel:
                    </p>
                    <Link to='/' className='video--tag'>
                        <h4 className='video-channel--name'>
                            ChannelName
                        </h4>
                    </Link>
                    </div>
                    <div className='video-createdAt-container'>
                    <TodayIcon className='today--icon' />
                    <small className='createdAt'>
                        <Moment format="DD.MM.YY">{video.created}</Moment>
                    </small>
                </div>
               </div>
               <div className='video-info-container'>
                <div className='video-category-container'>
                    <CategoryIcon 
                        type = 'label'
                        category = 'study'
                        isActive
                    />
                    {video.tags && showTags()}
                </div>
                
               </div>
               <h2 className='video-headline'>{video.name}</h2>
               <p className='video-description'>
                   {video.description}
               </p>
               <SecondaryButton text={'Teilen'} onClick={shareVideo} icon={ShareIcon} additionalClasses='share-button'></SecondaryButton>
           </div>
           <div className='video-playlist--container' style={{height}}>
           <VideoRow videos={video} flexDirection="column" headline="Mehr aus der Playlist" />
           </div>
           </div>
           
           <VideoRow videos={video} amountOfVideos={4}  headline='Ähnliche Videos' flexDirection="row" />
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