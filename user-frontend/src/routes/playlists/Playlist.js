import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../../api";
import PlaylistHeader from "./PlaylistHeader";
import { calculateVideoDuration, compareDates } from "../../utils";
import PlaylistFilterPanel from "./PlaylistFilterPanel";

const Playlist = (props) => {
  const [category, setCategory] = useState([]);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const singleCategory = await axios.get(
          `${BASEURL}/graphql?query={category(id:"${props.match.params.id}"){name,description, iconfilename, imagefilename, iconpath, imagepath}}`
        );
        const responseVideos = await axios.get(
          `${BASEURL}/graphql?query={videos(filter: {categoryid: "${props.match.params.id}"}){name, posterImagePath, created, status, access, views, videoDuration _id}}`
        );

        let videos = responseVideos.data.data.videos.filter((video) => {
          return video.access == "public" && video.status == "finished";
        });

        let filteredVideos = videos.sort(compareDates);
        setCategory(singleCategory.data.data.category);
        setVideo(filteredVideos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (video.length > 0) {
    return (
      <main className="main">
        <PlaylistHeader
          titleImg={`http://beuthbox.beuth-hochschule.de/api/category${category.imagepath}`}
          title={category.name}
          description={category.description}
          channelText=""
          channelLink={""}
          totalVideos={video.length}
          totalDuration={calculateVideoDuration(
            video.reduce(
              (totalDuration, video) => totalDuration + video.videoDuration,
              []
            )
          )}
        />
        <PlaylistFilterPanel videoResult={video} />
      </main>
    );
  }
  return <div>Playlist</div>;
};

export default Playlist;
