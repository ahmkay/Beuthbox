import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../../api";
import { Link } from "react-router-dom";
import { Videocam, Timelapse } from "@material-ui/icons";
import TodayIcon from "@material-ui/icons/Today";
import Moment from "react-moment";
import CategoryIcon from "../../components/reusables/CategoryIcon";
import { calculateVideoDuration } from "../../utils";

const PostPlaylist = ({ id, created, img, title, description }) => {
  const [totalVideos, setTotalVideos] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(() => {
    const fetchData = async (baseurl) => {
      try {
        const { data } = await axios.get(
          `${baseurl}/graphql?query={videos(filter: {categoryid: "${id}"}){videoDuration}}`
        );
        const videos = data["data"].videos;
        setTotalVideos(videos.length);

        videos.forEach((video) => {
          setTotalDuration(totalDuration + video.videoDuration);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData(BASEURL);
  }, [BASEURL]);

  return (
    <Link
      to={`/playlist/${id}`}
      className="post-playlist link-elem paper--elevation-1"
    >
      <div className="post-playlist__created icon-label--grey">
        <TodayIcon className="post-playlist__icon" />{" "}
        <small>
          <Moment format="DD.MM.YY">{created}</Moment>
        </small>
      </div>
      <div className="post-playlist__body">
        <div className="post-playlist__thumbnail-container">
          <img
            src={img}
            alt="playlist thumbnail"
            className="post-playlist__thumbnail"
          />
        </div>
        <div className="post-playlist__details">
          <div className="post-playlist__text">
            <h4 className="post-playlist__title">{title}</h4>
            <p className="post-playlist__description">{description}</p>
          </div>
          <div className="post-playlist__meta">
            <div className="post-playlist__stat">
              <div className="icon-label">
                <Videocam />
                <h6>Videos</h6>
              </div>
              <h5>{totalVideos}</h5>
            </div>
            <div className="post-playlist__stat">
              <div className="icon-label">
                <Timelapse />
                <h6>Gesamtlänge</h6>
              </div>
              <h5>{calculateVideoDuration(totalDuration)}min</h5>
            </div>
            <div className="post-playlist__stat post-playlist__stat-category">
              <CategoryIcon isActive category="campus" />
              <CategoryIcon isActive category="study" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostPlaylist;
