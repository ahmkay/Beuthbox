import React, { useContext } from 'react'
import { DataContext } from '../../api/DataContext'



const VideoServices = () => {
    const {recommendedVideos, newestVideos} = useContext(DataContext)
    return (
        <main className="main">
            <h1>
                {recommendedVideos.map(video => {
                    return (
                        <p>
                            {video.name}
                        </p>
                    )
                })}
            </h1>
            <h2>
            {newestVideos.map(video => {
                    return (
                        <p>
                            {video.name}
                        </p>
                    )
                })}
            </h2>
        </main>
    )
}

export default VideoServices