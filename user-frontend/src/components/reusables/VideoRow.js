import React from "react";
import { BASEURL } from "../../api";
import VideoThumbnail from "./VideoThumbnail";
import { calculateVideoDuration } from '../../utils'

const VideoRow = ({ videos, amountOfVideos, flexDirection, headline }) => {

  const showVideoRow = () => {
    if (Array.isArray(videos)) {
      return videos.map((video, index) => {
        let imgPath = "";
        if (video.posterImagePath.indexOf("engage-player") > 1) {
          imgPath = video.posterImagePath;
        } else {
          imgPath = `${BASEURL}/videos${video.posterImagePath}`;
        }

        if (amountOfVideos === undefined) {
          return (
            <VideoThumbnail
              title = {video.name}
              duration = {calculateVideoDuration(video.videoDuration)}
              img = {imgPath}
              id = {video._id}
              listOrientation = {flexDirection}
              listCount = {parseInt(amountOfVideos)}
            />
          );
        } else {
          if (index + 1 <= amountOfVideos) {
            return (
              <VideoThumbnail
                title = {video.name}
                duration = {calculateVideoDuration(video.videoDuration)}
                img = {imgPath}
                id = {video._id}
                listOrientation = {flexDirection}
                listCount = {parseInt(amountOfVideos)}
              />
            );
          }
        }
      });
    } else {
      return Object.keys(videos).map((video, index) => {
        let imgPath = "";
        if (videos.posterImagePath.indexOf("engage-player") > 1) {
          imgPath = videos.posterImagePath;
        } else {
          imgPath = `${BASEURL}/videos${videos.posterImagePath}`;
        }
        if (amountOfVideos === undefined) {
          return (
            <VideoThumbnail
              title = {videos.name}
              duration = {calculateVideoDuration(videos.videoDuration)}
              img = {imgPath}
              id = {videos._id}
              listOrientation = {flexDirection}
              listCount = {parseInt(amountOfVideos)}
            />
          );
        } else {
          if (index + 1 <= amountOfVideos) {
            return (
              <VideoThumbnail
                title = {videos.name}
                duration = {calculateVideoDuration(videos.videoDuration)}
                img = {imgPath}
                id = {videos._id}
                listOrientation = {flexDirection}
                listCount = {parseInt(amountOfVideos)}
              />
            );
          }
        }
      });
    }
  };

  return (
    <>
      <h3 className="video-row_title">{headline}</h3>
      <div
        className={`video-row_container${
          flexDirection ? "--" + flexDirection : ""
        }`}
      >
        {showVideoRow()}
      </div>
    </>
  );
};

export default VideoRow;
