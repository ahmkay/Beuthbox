import React, { useContext } from 'react'
import { DataContext } from '../../api/DataContext'


function Discover() {
    const { videos, newestVideos, setVideoData } = useContext(DataContext)
    return (
        <main className="main">
          <h1>
                {videos.map(video => {
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

            <button onClick={() => { setVideoData(newestVideos)}}>Change value</button>
        </main>
    )
}

export default Discover
