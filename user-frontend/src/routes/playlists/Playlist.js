import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BASEURL } from "../../api";
import PlaylistHeader from "./PlaylistHeader";
import { calculateVideoDuration, compareDates } from "../../utils";
import PlaylistFilterPanel from "./PlaylistFilterPanel";
import { DataContext } from "../../api/DataContext";
import ActivityIndicator from "../../components/reusables/ActivityIndicator";

const Playlist = (props) => {
  const [playlist, setPlaylist] = useState([]);
  const [video, setVideo] = useState([]);

  const { playlistData } = useContext(DataContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentPlaylist =
        (await playlistData.find(
          (playlist) => playlist._id === props.match.params.id
        )) || {};

        const responseVideos = await axios.get(
          `${BASEURL}/graphql?query={videos(filter: {categoryid: "${props.match.params.id}"}){name, posterImagePath, created, status, access, views, videoDuration _id}}`
        );

        let videos = responseVideos.data.data.videos.filter((video) => (
           video.access == "public" && video.status == "finished")
        ).sort(compareDates)

        setPlaylist(currentPlaylist);
        setVideo(videos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [playlistData]);

  if (video.length && playlistData.length) {
    return (
      <main className="main">
        <PlaylistHeader
          titleImg={`http://beuthbox.beuth-hochschule.de/api/category${playlist.imagepath}`}
          title={playlist.name}
          description={playlist.description}
          channelText=""
          channelLink={""}
          totalVideos={video.length}
          totalDuration={calculateVideoDuration(
            video.reduce(
              (totlaDuration, video) => totlaDuration + video.videoDuration,
              []
            )
          )}
        />
        <PlaylistFilterPanel videoResult={video} />
      </main>
    );
  }
  return <div><ActivityIndicator position='inline' /></div>;
};

export default Playlist;
