import React, { useState, useContext } from "react";
import Moment from "react-moment";
import TodayIcon from "@material-ui/icons/Today";
import ShareIcon from "@material-ui/icons/Share";
import SecondaryButton from "../../components/reusables/SecondaryButton";
import VideoRow from "../../components/reusables/VideoRow";
import ReactFlowPlayer from "react-flow-player";
import LiveOffline from "./LiveOffline";
import CategoryIcon from '../../components/reusables/CategoryIcon'
import { DataContext } from "../../api/DataContext";

const Live = () => {
  const [showPlayer, setShowPlayer] = useState(true);
  const { recommendedVideos } = useContext(DataContext)

  const shareVideo = () =>
    navigator.clipboard.writeText("Copy this text to clipboard");

    return (
      <>
        {showPlayer ? (
          <>
            <div className="container-60">
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
                    {/* <Moment format="DD.MM.YY">{video.created}</Moment> */}
                  </small>
                </div>
              </div>
              {/* <h2 className="video-headline">{video.name}</h2>
              <p className="video-description">{video.description}</p> */}
              <SecondaryButton
                text={"Teilen"}
                onClick={shareVideo}
                icon={ShareIcon}
                additionalClasses="share-button"
              ></SecondaryButton>
            </div>
            <div className="container-80">
              <VideoRow
                headline="Vergangene Livestreams"
                amountOfVideos={3}
                videos={{}}
              />
            </div>
          </>
        ) : (
          <LiveOffline />
        )}
      </>
    );
};

export default Live;
