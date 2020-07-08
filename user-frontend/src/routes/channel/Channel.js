import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BASEURL } from "../../api";
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
import PostPlaylist from "./PostPlaylist";
import NoContent from "../../components/reusables/NoContent";
import moment from "moment";
import { DataContext } from "../../api/DataContext";
import ActivityIndicator from "../../components/reusables/ActivityIndicator";

const Channel = (props) => {
  const [channel, setChannel] = useState({});
  const [playlists, setPlaylists] = useState([]);
  const [video, setVideo] = useState([]);
  const [value, setValue] = useState(0);
  const [isPending, setIsPending] = useState(true);
  const [chronik, setChronik] = useState([]);

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
          `${BASEURL}/graphql?query={videos(filter: {channelid: "${props.match.params.id}"}){_id, name, posterImagePath, created, status, access, views, videoDuration, description, posterImageFilename, categories{name, description, created, imagepath, iconpath _id}}}`
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
        setIsPending(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [channelData, playlistData]);

  useEffect(() => {
    sortVideos();
    sortPlaylists();
    makeChronik();
  }, [!isPending]);

  const sortVideos = () => {
    const sortedVideos = [...video].sort((video1, video2) => {
      return (
        // Use moment to compate dates in milisec
        moment(video2.created).valueOf() - moment(video1.created).valueOf()
      );
    });

    setVideo(sortedVideos);
  };
  const sortPlaylists = () => {
    const sortedPlaylists = [...playlists].sort((playlist1, playlist2) => {
      return (
        // Use moment to compate dates in milisec
        moment(playlist2.created).valueOf() -
        moment(playlist1.created).valueOf()
      );
    });

    setPlaylists(sortedPlaylists);
  };

  const makeChronik = () => {
    const rawChronik = video.concat(playlists);

    setChronik(
      rawChronik.sort((medium1, medium2) => {
        return (
          moment(medium1.created).valueOf() - moment(medium2.created).valueOf()
        );
      })
    );
  };

  const showChronik = () => {
    return chronik.map((element) => {
      // check if element is video --> else: its a playlist
      if (element.videoDuration !== undefined) {
        let imgPath = "";
        if (element.posterImagePath.indexOf("engage-player") > 1) {
          imgPath = element.posterImagePath;
        } else {
          imgPath = `${BASEURL}/videos${element.posterImagePath}`;
        }
        return (
          <PostVideo
            id={element._id}
            img={imgPath}
            title={element.name}
            created={element.created}
            description={element.description}
            duration={element.videoDuration}
            key={"vidpost-" + element._id}
          />
        );
      } else {
        return (
          <PostPlaylist
            id={element._id}
            img={`http://beuthbox.beuth-hochschule.de/api/category${element.imagepath}`}
            created={element.created}
            title={element.name}
            description={element.description}
            key={"playlistpost-" + element._id}
          />
        );
      }
    });
  };

  const renderPlaylists = () => {
    return playlists.map((playlist) => {
      return (
        <PostPlaylist
          id={playlist._id}
          img={`http://beuthbox.beuth-hochschule.de/api/category${playlist.imagepath}`}
          created={playlist.created}
          title={playlist.name}
          description={playlist.description}
          key={"playlistpost-" + playlist._id}
        />
      );
    });
  };

  const renderVideos = () => {
    return video.map((video) => {
      let imgPath = "";
      if (video.posterImagePath.indexOf("engage-player") > 1) {
        imgPath = video.posterImagePath;
      } else {
        imgPath = `${BASEURL}/videos${video.posterImagePath}`;
      }
      return (
        <PostVideo
          id={video._id}
          img={imgPath}
          title={video.name}
          created={video.created}
          description={video.description}
          duration={video.videoDuration}
          key={"vidpost-" + video._id}
        />
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
        <main className="main">
          <TabPanel value={value} index={0}>
            {playlists.length <= 0 && video.length <= 0 && <NoContent />}
            {showChronik()}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {playlists.length <= 0 && <NoContent content="playlist" />}
            {renderPlaylists()}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {video.length <= 0 && <NoContent content="video" />}
            {renderVideos()}
          </TabPanel>
        </main>
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
