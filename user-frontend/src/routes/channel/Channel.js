import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASEURL } from "../../api";
import PlaylistsCarousel from "../../components/reusables/PlaylistsCarousel";
import ChannelHeader from "./ChannelHeader";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SpeakerNotes from "@material-ui/icons/SpeakerNotes";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import Videocam from "@material-ui/icons/Videocam";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PostVideo from "./PostVideo";
import NoContent from "../../components/reusables/NoContent";

const Channel = (props) => {
  const [channel, setChannel] = useState([]);
  const [numberOfVideos, setNumberOfVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [video, setVideo] = useState([]);
  const [value, setValue] = useState(0);

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
          `${BASEURL}/graphql?query={videos(filter: {channelid: "${props.match.params.id}"}){_id, name, posterImagePath, created, status, access, views, videoDuration, description, categories{name, description, created, imagepath, iconpath _id}}}`
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
    return video
      .sort((video1, video2) => video1.videoDuration - video2.videoDuration)
      .map((video) => {
        return (
          <PostVideo
            id={video._id}
            img={`${BASEURL}/videos${video.posterImagePath}`}
            title={video.name}
            created={video.created}
            description={video.description}
            duration={video.videoDuration}
          />

          // <div class="item col-md-3 col-xs-12">
          //   <div class="tile">
          //     <a href={`video/${video._id}`}>
          //       {video.posterImagePath.indexOf("engage-player") > 1 ? (
          //         <img class="tile-image" src={video.posterImagePath} />
          //       ) : (
          //         <img
          //           class="tile-image"
          //           src={`${BASEURL}/videos${video.posterImagePath}`}
          //         />
          //       )}
          //     </a>
          //     <div class="tile-info">
          //       <a href={`/video/${video._id}`}>
          //         <div class="title">{video.name}</div>
          //         <div class="details">
          //           <div class="created">
          //             <span class="glyphicon glyphicon-calendar"></span>
          //             {video.created}
          //           </div>
          //           <div class="time">
          //             <span class="glyphicon glyphicon-time"></span>
          //             {video.videoDuration}
          //           </div>
          //         </div>
          //       </a>
          //     </div>
          //   </div>
          // </div>
        );
      });
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography component={"span"} variant={"body2"}>
              {children}
            </Typography>
          </Box>
        )}
      </div>
    );
  }

  const renderTabcontroller = () => {
    const handleChange = (e, newValue) => {
      setValue(newValue);
    };

    return (
      <div className="channel-tabcontroller">
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Chronik" icon={<SpeakerNotes />} />
            <Tab
              label="Playlists"
              icon={<PlaylistPlayIcon />}
              disabled={categories.length <= 0}
            />
            <Tab
              label="Videos"
              icon={<Videocam />}
              disabled={video.length <= 0}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          {video.length <= 0 && <NoContent content="video" />}
          {showVideos()}
        </TabPanel>
      </div>
    );
  };

  if (video && categories && numberOfVideos && channel) {
    return (
      <>
        <ChannelHeader
          title={channel.name}
          description={channel.description}
          img={`${BASEURL}/channel${channel.imagepath}`}
        />
        {renderTabcontroller()}
        <main className="main">
          <div class="container-fluid">
            <div class="row player-container content"></div>
            <div class="row">
              <div class="col-sm-12 channel-info">
                <div class="video-info"></div>
              </div>
            </div>

            <div class="container-fluid">
              {/* {categories.length != 0 && <h3 class="carousel-title">Playlist</h3>} */}
              <PlaylistsCarousel playlists={categories} />
              {/* <div class="row">{showCategories()}</div> */}
            </div>
          </div>
        </main>
      </>
    );
  }
  return <div>Channel</div>;
};

export default Channel;
