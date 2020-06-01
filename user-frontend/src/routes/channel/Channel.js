import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../../api";
import PlaylistsCarousel from "../../components/reusables/PlaylistsCarousel";

const Channel = (props) => {
  const [channel, setChannel] = useState([]);
  const [numberOfVideos, setNumberOfVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/graphql?query={channel(id:"${props.match.params.id}"){_id, name,description, iconfilename, imagefilename, iconpath, imagepath, liveenabled, ispublic, users{username, _id}, liveevent{islive, title, subtitle, description, date, time, duration, haspassword, password, key, url}}}`
        );
        const responseCount = await axios.get(
          `${BASEURL}/graphql?query={channelVideoCount(id: "${props.match.params.id}"){_id, total}}`
        );
        const responseVideos = await axios.get(
          `${BASEURL}/graphql?query={videos(filter: {channelid: "${props.match.params.id}"}){_id, name, posterImagePath, created, status, access, views, videoDuration, categories{name, description, created, imagepath, iconpath _id}}}`
        );

        const responsecategories = await axios.get(
          BASEURL +
            "/graphql?query={categories{_id, name, description, created, imagepath, iconpath}}"
        );
        const categoryArray = [];

        const videos = responseVideos.data.data.videos.filter((video) => {
          for (let i = 0; i < video.categories.length; i++) {
            categoryArray.push(String(video.categories[i]._id));
            //console.log("VIDEO PART: " + video.name + " | " + video.categories[i].name + " | " + video.categories[i]._id);
          }
          //categoryArray.push(String(video.categories[0]._id));    //Packe alle IDs der Videos in Array

          if (video.categories == false) {
            console.log("CATEGORY VIDEO:  undefined");
          } else {
            console.log("CATEGORY VIDEO: " + video.categories[0].name);
          }

          //return video.access == "public"  || video.access == "channelonly" && video.status == "finished"
          return (
            (video.access == "public" && video.categories == false) ||
            (video.access == "channelonly" &&
              video.status == "finished" &&
              video.categories == false)
          );
        });

        //&& video.category != undefined

        console.log("NUMBER VIDEOS: " + videos.length);

        //Array aufräumen
        //console.log("Array: " + categoryArray);
        const categoryArrayUnique = [...new Set(categoryArray)];
        //console.log("Array aufgeräumt: " + categoryArrayUnique);
        const checkIfArrIncludes = (_id) => categoryArrayUnique.includes(_id);
        const categoriesFilter = Object.values(
          responsecategories.data.data.categories
        ).filter((cat) => (checkIfArrIncludes(cat._id) ? cat : 0));

        setChannel(response.data.data.channel);
        setNumberOfVideos(responseCount.data.data.channelVideoCount.total);
        setCategories(categoriesFilter);
        setVideo(videos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log(props, "props");
  }, []);

  const showVideos = () => {
    console.log(video, "videos");

    return video.map((video, index) => {
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
  if (video && categories && numberOfVideos && channel) {
    return (
        <main className="main">
            <div class="container-fluid">
                <div class="row player-container content">
                <div class="col-md-8 col-sm-12 col-xs-12">
                    <div class="slide-1">
                    <div class="slider-caption">
                        <img
                        src={`"${BASEURL}/channel${channel.iconpath}`}
                        class="channel-icon"
                        />
                    </div>
                    </div>
                </div>

                <div class="col-md-4 col-sm-12 col-xs-12">
                    <div class="video-info">
                    <div class="video-header">Channel</div>
                    <div class="video-title">{channel.name}</div>

                    {channel.description && (
                        <>
                        <div class="video-header">Beschreibung</div>
                        <p>{channel.description}</p>
                        </>
                    )}
                    </div>
                </div>
                </div>
                <div class="row">
                <div class="col-sm-12 channel-info">
                    <div class="video-info"></div>
                </div>
                </div>

                <div class="container-fluid">
                {/* {categories.length != 0 && <h3 class="carousel-title">Playlist</h3>} */}
                <PlaylistsCarousel playlists={categories} />
                {/* <div class="row">{showCategories()}</div> */}

                {video.length != 0 && (
                    <>
                    <h3>Videos</h3>
                    </>
                )}
                {showVideos()}
                </div>
            </div>
        </main>
    );
  }
  return <div>Channel</div>;
};

export default Channel;
