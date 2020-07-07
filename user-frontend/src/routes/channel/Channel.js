import React, { useState, useEffect } from "react";
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

const Channel = (props) => {
  const [channel, setChannel] = useState([]);
  const [numberOfVideos, setNumberOfVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [video, setVideo] = useState([]);
  const [value, setValue] = useState(0);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/graphql?query={channel(id:"${props.match.params.id}"){_id, name,description, imagepath, ispublic, users{username, _id}}}`
        );
        const responseVideos = await axios.get(
          `${BASEURL}/graphql?query={videos(filter: {channelid: "${props.match.params.id}"}){_id, name, posterImagePath, created, status, access, views, videoDuration, description, posterImageFilename, categories{name, description, created, imagepath, iconpath _id}}}`
        );
        const responseCategories = await axios.get(
          `${BASEURL}/graphql?query={categories{_id, name, description, created, imagepath}}`
        );

        const categoryArray = [];

        const videos = responseVideos.data.data.videos.filter((video) => {
          video.categories.forEach((category) => {
            categoryArray.push(String(category._id));
          });

          return (
            (video.access == "public" && video.categories == false) ||
            (video.access == "channelonly" &&
              video.status == "finished" &&
              video.categories == false)
          );
        });

        //Array aufräumen
        const categoryArrayUnique = [...new Set(categoryArray)];

        const checkIfArrIncludes = (_id) => categoryArrayUnique.includes(_id);

        const categoriesFilter = Object.values(
          responseCategories.data.data.categories
        ).filter((cat) => (checkIfArrIncludes(cat._id) ? cat : 0));

        setChannel(response.data.data.channel);
        setCategories(categoriesFilter);
        setVideo(videos);
        setIsPending(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    sortVideos();
    sortPlaylists();
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
    const sortedPlaylists = [...categories].sort((playlist1, playlist2) => {
      return (
        // Use moment to compate dates in milisec
        moment(playlist2.created).valueOf() -
        moment(playlist1.created).valueOf()
      );
    });

    setCategories(sortedPlaylists);
  };

  const showChronik = () => {};

  const renderPlaylists = () => {
    return categories.map((playlist) => {
      return (
        <PostPlaylist
          id={playlist._id}
          img={`http://beuthbox.beuth-hochschule.de/api/category${playlist.imagepath}`}
          created={playlist.created}
          title={playlist.name}
          description={playlist.description}
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
              disabled={categories.length <= 0}
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
            {categories.length <= 0 || (video.length <= 0 && <NoContent />)}
            {showChronik()}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {categories.length <= 0 && <NoContent content="playlist" />}
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

  if (video && categories && numberOfVideos && channel) {
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
  return <div>Channel</div>;
};

export default Channel;
