import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { BASEURL } from '../../api'

const Playlist = (props) => {
    const [category, setCategory ] = useState([])
    const [video, setVideo ] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const singleCategory = await axios.get(`${BASEURL}/graphql?query={category(id:"${props.match.params.id}"){name,description, iconfilename, imagefilename, iconpath, imagepath}}`)
                const responseVideos = await axios.get(`${BASEURL}/graphql?query={videos(filter: {categoryid: "${props.match.params.id}"}){name, posterImagePath, created, status, access, views, videoDuration _id}}`);
        
                const videos = responseVideos.data.data.videos.filter(video => {
                    return video.access == "public" && video.status == "finished"
                });

                setCategory(singleCategory.data.data.category)
                setVideo(videos)
            }
            catch(error) { console.log(error)}
        }
        fetchData()
        console.log(props, 'props')
    }, [])

    const showVideos = () => {
        console.log(video)
        return (
            video.map(video => {
                return (
                    <div>
                        <a href={`/video/${video._id}`}>
                        {video.posterImagePath.indexOf('engage-player') > 1 ?
                            <img class="tile-image" src={video.posterImagePath}/> :
                            <img class="tile-image" src={`${BASEURL}/videos${video.posterImagePath}`}/>
                    }
                        </a>
                        <p>
                            video created: {video.created}
                        </p>
                        <p>
                            video duration: {video.videoDuration}
                        </p>
                    </div>
                )
            })
        )
    }
    if( category && video) {
       return (
           <div>
               <div style={{backgroundImage: `url(http://beuthbox.beuth-hochschule.de/api/category${category.imagepath})`, height: 100}}>
                
               </div>
               <p>
                   {category.name}
               </p>
               <p>
                   {category.description}
               </p>


               <h2>
                   Videos
               </h2>
        {showVideos()}
           </div>
       )
    }
    return (
        <div>
            Playlist
        </div>
    )
}

export default Playlist