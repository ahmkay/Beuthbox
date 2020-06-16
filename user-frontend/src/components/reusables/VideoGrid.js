import React from 'react'
import VideoThumbnail from './VideoThumbnail'
import { BASEURL } from "../../api";

/**
 * A reusable component to display an array of videos in a grid-layout
 * 
 * @param {Video[]} videos An Array of Videos to display in the grid-layout
 * @param {number} columnNumber The number of Videos to display per row
 * 
 * @example
 * <VideoGrid
 *  videos={videos}
 *  columnNumber={3}
 * />
 *  
 */

const VideoGrid = ({videos, columnNumber}) =>  {

    let columns = 'repeat(4, 1fr)'

    if (typeof columnNumber === 'number') {
        columns = `repeat(${columnNumber}, 1fr)`
    }

    const gridStyles = {
        gridTemplateColumns: columns
    }

    const renderVideos = () => {
        return videos.map((video) => {
            let imgPath = "";
            if (video.posterImagePath.indexOf("engage-player") > 1) {
              imgPath = video.posterImagePath;
            } else {
              imgPath = `${BASEURL}/videos${video.posterImagePath}`;
            }

            return (
                <div classname="video-grid__cell">
                    <VideoThumbnail 
                        title={video.name}
                        listOrientation='column' 
                        duration={video.duration}
                        img = {imgPath}
                        id = {video._id}
                    />
                </div>
            )
        })
    }

    return (
        <div className="video-grid" style={gridStyles}>
           {renderVideos()}
        </div>
    )
}

export default VideoGrid