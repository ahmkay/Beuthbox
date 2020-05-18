import React, {useState, useEffect } from 'react'
import axios from 'axios'

const Video = (props) => {
    const baseURL = 'http://beuthbox.beuth-hochschule.de/api'
    const [video, setVideo ] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const video = await axios.get( `${baseURL}/graphql?query={video(id:"${props.match.params.id}"){name, description, created, uploaded, playerType, tags, status, source, uploadedByUser, access, videoDuration, dualView, isOpencast, posterImagePath, videoPath, modified, _id, views}}`)

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
    }, [])

    const showVideos = () => {
        console.log(video.tags)
        if(video.tags) {
            return (
                <div>
                    <a href={`/video/${video._id}`}>
                        {video.name}
                    </a>
                    <p>
                        video created: {video.created}
                    </p>
                    <p>
                        video duration: {video.videoDuration}
                    </p>

                    <div>
                        {video.tags.map(tag => {
                            return <a href={`/search?tag=${tag}`}>
                                {tag}
                            </a>
                        })}
                    </div>
                </div>
            )
        }
               
    }
    if(video) {
        console.log(video)

       return (
           <div>
            <iframe allowfullscreen 
            src={`http://beuthbox-opencast.beuth-hochschule.de/paella/ui/embed.html?id=${video.ocid}`}
            style={{border: 'none', width: '100%', height: '70vh'}} 
            name="Paella Player" 
            scrolling="no" 
            frameborder="0" 
            marginheight="0px" 
            marginwidth="0px">
            </iframe>
            {showVideos()}
           </div>
       )
    }
    return (
        <div>
            Video
        </div>
    )
}

export default Video