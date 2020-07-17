import React, { useState, useContext } from "react";
import Moment from "react-moment";
import TodayIcon from "@material-ui/icons/Today";
import ShareIcon from "@material-ui/icons/Share";
import SecondaryButton from "../../components/reusables/SecondaryButton";
import ReactFlowPlayer from "react-flow-player";
import LiveOffline from "./LiveOffline";
import CategoryIcon from '../../components/reusables/CategoryIcon'
import { DataContext } from "../../api/DataContext";
import ThumbnailGrid from "../../components/reusables/ThumbnailGrid";
import { Link } from "react-router-dom";

const Live = () => {
  const [showPlayer, setShowPlayer] = useState(true);
  const { allVideos, recommendedVideos } = useContext(DataContext)

  const shareVideo = () =>
    navigator.clipboard.writeText("Copy this text to clipboard");

    const showTags = () =>
    allVideos[0].tags.map((tag, index) => (
      <Link
        to={{ pathname: `/search/tag=${tag}`, state: { tag } }}
        className={`video--tag ${index === 0 ? "firstchild" : ""}`}
      >
        <h5>#{tag}</h5>
      </Link>
    ));

    return (
      <>
        {!showPlayer ? (
          <>
            <div className="container-60 live-container__root">
              <div className="video-container">
                <>
                  <ReactFlowPlayer
                    live
                    autoplay
                    aspectRatio="16:9"
                    licenceKey="$863732616083910, $168467931371094"
                    hlsQualities
                    hlsjs={{
                      // catch otherwise non-fatal levelLoadTimeout
                      listeners: ["hlsError"],
                    }}
                    adaptiveRatio
                    onError={(obj, flow, error) => {
                      var container = document.getElementById(
                        "reactFlowPlayer"
                      );
                      container.style.display = "none";
                      setShowPlayer(false);
                      console.log('ONRESUME')
                    }}
                    onResume={() => {
                      setShowPlayer(true);
                      var container = document.getElementById(
                        "reactFlowPlayer"
                      );
                     
                      container.style.display = "block";
                    }}
                    playerInitScript="http://releases.flowplayer.org/7.2.1/flowplayer.min.js"
                    playerId="reactFlowPlayer"
                    sources={[
                      {
                        type: "application/x-mpegurl",
                        src:
                          "http://141.64.64.18:1935/live/ngrp:beuthbox_all/playlist.m3u8",
                      },
                    ]}
                  />
                </>
              </div>
              <div className="video-info-container">
                <div className="video-category-container">
                  <CategoryIcon 
                    isActive
                    category='study'
                    type='label'
                  />
                </div>
                <div className="video-createdAt-container">
                  <TodayIcon className="today--icon" />
                  <small className="createdAt">
                    <Moment format="DD.MM.YY">{Date.now()}</Moment>
                  </small>
                </div>
              </div>
              <div className="video-info-container video-info-container--hide-desktop">
                <div className="video-category-container">
                  {allVideos.length > 0 && allVideos[0].tags && showTags()}
                </div>
                <div className="video-createdAt-container video-createdAt-container--hide-desktop">
                  <TodayIcon className="today--icon" />
                  <small className="createdAt">
                    <Moment format="DD.MM.YY">{Date.now()}</Moment>
                  </small>
                </div>
              </div>
              <h2 className="video-headline">Titel des Videos</h2>
              <p className="video-description">Videobeschreibung: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
              <SecondaryButton
                text={"Teilen"}
                onClick={shareVideo}
                icon={ShareIcon}
                additionalClasses="share-button"
              ></SecondaryButton>
            </div>
            <div className="container-80 last-livesteams-container">
            <h3 className="last-livestreams-container__title">Vergangene Livestreams</h3>
            <ThumbnailGrid elements={recommendedVideos.slice(0,3)} columnNumber={3} type='video' />
            </div>
          </>
        ): 
          <LiveOffline />
        }
      </>
    );
};

export default Live;
