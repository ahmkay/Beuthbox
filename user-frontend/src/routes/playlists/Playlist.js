import React, {useState, useEffect } from 'react'
import axios from 'axios'
import { BASEURL } from '../../api'
import PlaylistHeader from './PlaylistHeader'
import { calculateVideoDuration } from '../../utils'

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
                            <img className="tile-image" src={video.posterImagePath}/> :
                            <img className="tile-image" src={`${BASEURL}/videos${video.posterImagePath}`}/>
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

        console.log(video, 'Playlist Video')

       return (
           <>
                <PlaylistHeader 
                    titleImg={`http://beuthbox.beuth-hochschule.de/api/category${category.imagepath}`} 
                    title={category.name} 
                    description={category.description}
                    channelText=""
                    channelLink={''}
                    totalVideos={video.length}
                    totalDuration={calculateVideoDuration(video.reduce((totlaDuration, video) => totlaDuration + video.videoDuration, []))}
                />
                <main className="main-container">
                    {showVideos()}
                </main>
           </>
       )
    }
    return (
        <div>
            Playlist
        </div>
    )
}

export default Playlist