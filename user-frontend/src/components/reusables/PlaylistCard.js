import React, { useState } from "react";
import { Videocam } from "@material-ui/icons";
import PlaylistPlaceholder from "../../assets/img/PlaylistPlaceholder.png";
import { Link } from "react-router-dom";
import { getTotalVideos } from "../../routes/playlists/PlaylistHelper";

const PlaylistCard = ({ playlistData }) => {
  const [videoCount, setVideoCount] = useState(0);

  (async () => {
    setVideoCount(await getTotalVideos(playlistData._id));
  })();

  return (
    <Link
      to={`/playlist/${playlistData._id}`}
      className="playlist-card-container"
    >
      <div className="playlist-card-container__content">
        <img
          src={
            playlistData.imagepath
              ? `http://beuthbox.beuth-hochschule.de/api/category${playlistData.imagepath}`
              : PlaylistPlaceholder
          }
          className="playlist-card-container__thumbnail-img"
          alt="Paylist Titelbild"
        />
        <div className="playlist-card-container__info-box">
          <h4 className="playlist-card-container__title">
            {playlistData.name}
          </h4>
          <p className="playlist-card-container__description">
            {playlistData.description}
          </p>
          <div className="playlist-card-container__video-count">
            <Videocam />
            <h5 className="video-count__number">
              {videoCount > 0 ? videoCount : "-"}
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistCard;
