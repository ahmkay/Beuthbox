import React from "react";
import { Link } from "react-router-dom";
import Play from "../../assets/img/Button_Play.svg";
import TodayIcon from "@material-ui/icons/Today";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Placeholder from "../../assets/img/Placeholder_Video.svg";
import Moment from "react-moment";
import { calculateVideoDuration } from "../../utils";
import CategoryIcon from "../../components/reusables/CategoryIcon";

const PostVideo = ({ id, title, img, duration, description, created }) => {
  return (
    <Link
      to={`/video/${id}`}
      className="post-video link-elem paper--elevation-1"
    >
      <div className="post-video__created icon-label--grey">
        <TodayIcon className="post-video__icon" />{" "}
        <small>
          <Moment format="DD.MM.YY">{created}</Moment>
        </small>
      </div>
      <div className="post-video__thumbnail-container">
        <img
          src={img ? img : Placeholder}
          className="post-video__thumbnail"
          alt="Video Thumbnail"
        />
        <img src={Play} alt="Play Button" className="post-video__play-button" />
        <div className="post-video__categories">
          <CategoryIcon isActive category="campus" hasBackground />
          <CategoryIcon isActive category="study" hasBackground />
        </div>
      </div>
      <div className="post-video__details">
        <h4 className="post-video__title">{title ? title : "Kein Titel"}</h4>
        <small className="post-video__video-duration icon-label--grey video-meta">
          <AccessTimeIcon />{" "}
          {duration ? calculateVideoDuration(duration) : "0:00"}
        </small>
      </div>
      <p>{description ? description : ""}</p>
    </Link>
  );
};

export default PostVideo;
