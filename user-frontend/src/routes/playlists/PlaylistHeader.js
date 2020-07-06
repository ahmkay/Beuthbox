import React from "react";
import { Videocam, Timelapse, LiveTv } from "@material-ui/icons";
import TagIcon from "../../assets/img/icons/Tag.svg";
import { Link } from "react-router-dom";

const PlaylistHeader = (props) => {
  return (
    <header className="playlist-header main-container">
      <img className="playlist-header__title-img" src={props.titleImg} />
      <div className="playlist-header__infosection">
        <div className="playlist-header__text-box">
          <h2>{props.title}</h2>
          <h4 className="text-box__description">
            {props.description
              ? props.description
              : "Beschreibungstext der die Playlist, ihren Inhalt und so weiter beschreibt"}
          </h4>
        </div>
        <div className="playlist-header__stats">
          <div className="stats-box__stat stats-box__stat--video">
            <Videocam />
            <small>Videos</small>
            <h5 className="stats-box__stat-value">
              {props.totalVideos ? props.totalVideos : "-"}
            </h5>
          </div>
          <div className="stats-box__stat stats-box__stat--duration">
            <Timelapse />
            <small>Gesamtlänge</small>
            <h5 className="stats-box__stat-value">
              {props.totalDuration ? props.totalDuration : "-"}
            </h5>
          </div>
          <div className="stats-box__stat stats-box__stat--top-tags">
            <img src={TagIcon} className="stats-box__stat-icon--top-tags" />
            <small>Top Tags</small>
            <h5 className="stats-box__stat-value">
              {props.TopTags ? props.TopTags : "-"}
            </h5>
          </div>
          <div className="stats-box__stat stats-box__stat--channel">
            <LiveTv />
            <small>Channel</small>
            {props.channelLink ? (
              <Link
                className="button-text stats-box__stat-value"
                to={props.channelLink}
              >
                {props.Channel ? props.Channel : "Test Text"}
              </Link>
            ) : (
              <h5 className="stats-box__stat-value">-</h5>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PlaylistHeader;
