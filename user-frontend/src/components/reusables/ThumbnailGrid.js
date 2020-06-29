import React from 'react'
import VideoThumbnail from './VideoThumbnail'
import PlaylistThumbnail from './PlaylistThumbnail';
import { BASEURL } from "../../api";
import { calculateVideoDuration } from '../../utils'

/**
 * A reusable component to display an array of videos in a grid-layout
 * 
 * @param {String} type The type of the content to display
 * @param {Video[]} videos An Array of Videos to display in the grid-layout
 * @param {number} columnNumber The number of Videos to display per row
 * 
 * @example
 * <ThumbnailGrid
 *  videos={videos}
 *  columnNumber={3}
 * />
 *  
 */

const ThumbnailGrid = ({type, elements, columnNumber}) =>  {

    let columns = 'repeat(4, 1fr)'

    if (typeof columnNumber === 'number') {
        columns = `repeat(${columnNumber}, 1fr)`
    }

    const gridStyles = {
        gridTemplateColumns: columns
    }

    const renderVideos = () => {
        return elements.map((video) => {
            let imgPath = "";
            if (video.posterImagePath.indexOf("engage-player") > 1) {
              imgPath = video.posterImagePath;
            } else {
              imgPath = `${BASEURL}/videos${video.posterImagePath}`;
            }

            return (
                <div className="grid__cell">
                    <VideoThumbnail 
                        title={video.name}
                        listOrientation='column' 
                        duration={calculateVideoDuration(video.videoDuration)}
                        img = {imgPath}
                        id = {video._id}
                    />
                </div>
            )
        })
    }

    const renderPlaylist = () => {        

        return elements.map((playlist) => {
            return (
                <div className="grid__cell">
                    <PlaylistThumbnail 
                        playlistData={playlist}
                        videoCount={0} // TODO
                    />
                </div>
            )
        })
    }

    return (
        <div className="thumbnail-grid" style={gridStyles}>
           {type === "video" && renderVideos()}
           {type === "playlist" && renderPlaylist()}
           {type === "channel" && renderVideos()}
        </div>
    )
}

export default ThumbnailGrid