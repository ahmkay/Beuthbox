import React from "react";
import { BASEURL } from "../../api";
import VideoThumbnail from "./VideoThumbnail";

const VideoRow = ({ videos, amountOfVideos, flexDirection, headline }) => {
  const calculateVideoDuration = (duration) => {
    let seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours !== "00"
      ? hours + ":" + minutes + ":" + seconds
      : minutes + ":" + seconds;
  };
  const calculateVideoSize = () => {
    if (flexDirection === "column") return "vertical";

    switch (amountOfVideos) {
      case 3:
        return "row--3";
      case 4:
        return "row--4";

      default:
        return "row--4";
    }
  };

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
              title={video.name}
              duration={calculateVideoDuration(video.videoDuration)}
              img={imgPath}
              id={video._id}
            />
          );
        } else {
          if (index + 1 <= amountOfVideos) {
            return (
              <VideoThumbnail
                title={video.name}
                duration={calculateVideoDuration(video.videoDuration)}
                img={imgPath}
                id={video._id}
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
              title={videos.name}
              duration={calculateVideoDuration(videos.videoDuration)}
              img={imgPath}
              id={videos._id}
            />
          );
        } else {
          if (index + 1 <= amountOfVideos) {
            return (
              <VideoThumbnail
                title={videos.name}
                duration={calculateVideoDuration(videos.videoDuration)}
                img={imgPath}
                id={videos._id}
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
