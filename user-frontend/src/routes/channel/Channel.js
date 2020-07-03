import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BASEURL } from "../../api";
import PlaylistsCarousel from "../../components/reusables/PlaylistsCarousel";
import ChannelHeader from "./ChannelHeader";
import { DataContext } from "../../api/DataContext";
import ActivityIndicator from "../../components/reusables/ActivityIndicator";

const Channel = (props) => {
  const [channel, setChannel] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [video, setVideo] = useState([]);

  const { channelData, playlistData } = useContext(DataContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentChannel =
          (await channelData.find(
            (channel) => channel._id === props.match.params.id
          )) || {};

        // show all videos the channel is containing
        const responseVideos = await axios.get(
          `${BASEURL}/graphql?query={videos(filter: {channelid: "${props.match.params.id}"}){_id, name, posterImagePath, created, status, access, views, 
            videoDuration, categories{name, description, created, imagepath, iconpath _id}}}`
        );

        const playlistArray = [];

        const videos = responseVideos.data.data.videos.filter((video) => {
          video.categories.forEach((category) =>
            playlistArray.push(category._id)
          );

          return (
            (video.access == "public" && video.categories == false) ||
            (video.access == "channelonly" &&
              video.status == "finished" &&
              video.categories == false)
          );
        });

    
        // filter unique playlist ID´s
        const playlistArrayUniqueIDs = [...new Set(playlistArray)];
        const checkIfArrIncludes = (_id) =>
          playlistArrayUniqueIDs.includes(_id);
        const playlistFilter = Object.values(playlistData).filter((cat) =>
          checkIfArrIncludes(cat._id) ? cat : 0
        );

        setChannel(currentChannel);
        setPlaylists(playlistFilter);
        setVideo(videos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [channelData, playlistData]);

  const showVideos = () => {
    return video.map((video) => {
      return (
        <div class="item col-md-3 col-xs-12">
          <div class="tile">
            <a href={`video/${video._id}`}>
              {video.posterImagePath.indexOf("engage-player") > 1 ? (
                <img class="tile-image" src={video.posterImagePath} />
              ) : (
                <img
                  class="tile-image"
                  src={`${BASEURL}/videos${video.posterImagePath}`}
                />
              )}
            </a>
            <div class="tile-info">
              <a href={`/video/${video._id}`}>
                <div class="title">{video.name}</div>
                <div class="details">
                  <div class="created">
                    <span class="glyphicon glyphicon-calendar"></span>
                    {video.created}
                  </div>
                  <div class="time">
                    <span class="glyphicon glyphicon-time"></span>
                    {video.videoDuration}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      );
    });
  };
  if (video.length > 0 || playlists.length > 0 || channel.length > 0) {
    return (
      <>
        <ChannelHeader
          title={channel.name}
          description={channel.description}
          img={`${BASEURL}/channel${channel.imagepath}`}
        />
        <main className="main">
          <div class="container-fluid">
            <div class="row player-container content"></div>
            <div class="row">
              <div class="col-sm-12 channel-info">
                <div class="video-info"></div>
              </div>
            </div>

            <div class="container-fluid">
              <PlaylistsCarousel playlists={playlists} />

              {video.length != 0 && (
                <>
                  <h3>Videos</h3>
                </>
              )}
              {showVideos()}
            </div>
          </div>
        </main>
      </>
    );
  }
  return (
    <div>
      <ActivityIndicator position="inline" />
    </div>
  );
};

export default Channel;
