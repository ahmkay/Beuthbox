import React, { useState, useEffect, useContext } from "react";
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
import { DataContext } from "../../api/DataContext";
import ActivityIndicator from "../../components/reusables/ActivityIndicator";

const Channel = (props) => {
  const [channel, setChannel] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [video, setVideo] = useState([]);
  const [value, setValue] = useState(0);

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
          `${BASEURL}/graphql?query={videos(filter: {channelid: "${props.match.params.id}"}){_id, name, posterImagePath, created, status, access, views, videoDuration, description, categories{name, description, created, imagepath, iconpath _id}}}`
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
              disabled={playlists.length <= 0}
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

 
  if (video.length > 0 || playlists.length > 0 || channel.length > 0) {
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
              <PlaylistsCarousel playlists={playlists} />
              {/* <div class="row">{showCategories()}</div> */}
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
