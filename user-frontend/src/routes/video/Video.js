import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useContext,
} from "react";
import Moment from "react-moment";
import TodayIcon from "@material-ui/icons/Today";
import ShareIcon from "@material-ui/icons/Share";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import LiveTvIcon from "@material-ui/icons/LiveTv";
import SecondaryButton from "../../components/reusables/SecondaryButton";
import { Link } from "react-router-dom";
import VideoRow from "../../components/reusables/VideoRow";
import CategoryIcon from "../../components/reusables/CategoryIcon";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { DataContext } from "../../api/DataContext";
import Axios from "axios";
import { BASEURL } from "../../api";
import ThumbnailGrid from "../../components/reusables/ThumbnailGrid";

const Video = (props) => {
  const [video, setVideo] = useState([]);
  const [currentPlaylistVideos, setCurrentPlaylistVideos] = useState([]);
  const [height, setHeight] = useState(1000);
  const [copySuccess, setCopySuccess] = useState(false);
  const { id } = props.match.params;
  const videoContainerRef = useRef(null);
  const { allVideos } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentVideo =
          (await allVideos.find((video) => video._id === id)) || {};

        let videoPathString = currentVideo.videoPath.toString();
        let string = videoPathString.replace(
          "http://beuthbox-opencast.beuth-hochschule.de/static/mh_default_org/engage-player/",
          ""
        );
        let n = string.indexOf("/");
        let OCid = string.slice(0, n);
        currentVideo.ocid = OCid;
        setVideo(currentVideo);

        const currentPlaylistVideos = await Axios.get(
          `${BASEURL}/graphql?query={videos(filter: {categoryid: "${currentVideo.categories[0]._id}"}){name, posterImagePath, created, status, access, views, videoDuration _id}}`
        );
        console.log(currentPlaylistVideos, "axios");
        setCurrentPlaylistVideos(currentPlaylistVideos.data.data.videos);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, allVideos]);

  const shareVideo = () => {
    const url = window.location.href;
    let textArea = document.createElement("textarea");
    textArea.value = url;
    document.body.appendChild(textArea);
    textArea.style = "none";
    textArea.select();
    document.execCommand("copy");
    setCopySuccess(true);
    document.body.removeChild(textArea);
  };

  function Alert(props) {
    return <MuiAlert elevation={5} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCopySuccess(false);
  };

  const navigateToPlaylist = (id) => {
    if (id !== "default") return props.history.push(`/playlist/${id}`);
    return;
  };

  const showTags = () =>
    video.tags.map((tag, index) => (
      <Link
        to={{ pathname: `/search/tag=${tag}`, state: { tag } }}
        className={`video--tag ${index === 0 ? "firstchild" : ""}`}
      >
        <h5>#{tag}</h5>
      </Link>
    ));

  const renderPlaylistVideos = () => {
    if (currentPlaylistVideos.length) {
      return (
        <div className="video-playlist--container" style={{ height }}>
          <VideoRow
            videos={currentPlaylistVideos}
            flexDirection="column"
            headline="Mehr aus der Playlist"
          />
        </div>
      );
    }
    return null;
  };
  const getHeight = () => {
    setHeight(videoContainerRef.current.clientHeight - 240 + "px");
  };

  const renderTagLinks = (type) => {
    if (type === "channel") {
      return video.channel.length ? (
        <Link to={`/channel/${video.channel[0]._id}`} className="video--tag">
          {video.channel[0].name}
        </Link>
      ) : (
        <h5 className="video-playlist--name">-</h5>
      );
    } else {
      if (video.categories.length) {
        if (video.categories.length > 2) {
          return (
            <select
              name="playlist-tags"
              id="playlist-tags"
              className="filter-panel-select"
              onChange={(event) => navigateToPlaylist(event.target.value)}
              style={{
                marginLeft: "24px",
                marginRight: "40px",
                minWidth: "200px",
                maxWidth: "350px",
                padding: "5px 0",
              }}
            >
              <option value="default">Playlisten...</option>
              {video.categories.map((playlistTags) => {
                return (
                  <option value={playlistTags._id}>{playlistTags.name}</option>
                );
              })}
            </select>
          );
        } else {
          return video.categories.map((playlistTags, i) => {
            return (
              <Link to={`/playlist/${playlistTags._id}`} className="video--tag">
                {playlistTags.name}
              </Link>
            );
          });
        }
      } else {
        return <h5 className="video-playlist--name">-</h5>;
      }
    }
  };

  useLayoutEffect(() => {
    if (videoContainerRef !== null && videoContainerRef.current !== null) {
      window.addEventListener("resize", getHeight);
    }
    return () => window.removeEventListener("resize", getHeight);
  });

  if (Object.keys(video).length > 0) {
    console.log(currentPlaylistVideos, "current");
    return (
      <>
        <div className="root-container video-container__root">
          <div className="video-content-container">
            <div
              className="container-65-left video-container__inner"
              style={{ display: "inline-block" }}
              ref={videoContainerRef}
            >
              <div className="video-container">
                <iframe
                  allowfullscreen
                  src={`http://beuthbox-opencast.beuth-hochschule.de/paella/ui/embed.html?id=${video.ocid}`}
                  style={{ border: "none", width: "100%" }}
                  name="Paella Player"
                  scrolling="no"
                  frameborder="0"
                  marginheight="0px"
                  marginwidth="0px"
                  className="video__paella-player"
                ></iframe>
              </div>
              <div className="video-info-container">
                <div className="video-category-container">
                  <PlaylistPlayIcon className="video-playlist--icon" />
                  <p className="video-playlist--headline">Playlist:</p>
                  {renderTagLinks()}
                  <LiveTvIcon className="video-livetv--icon" />
                  <p className="video-channel--headline">Channel:</p>
                  {renderTagLinks("channel")}
                </div>
                <div className="video-createdAt-container">
                  <TodayIcon className="today--icon" />
                  <small className="createdAt">
                    <Moment format="DD.MM.YY">{video.created}</Moment>
                  </small>
                </div>
              </div>
              <div className="video-info-container">
                <div className="video-category-container">
                  <CategoryIcon type="label" category="study" isActive />
                  {video.tags && showTags()}
                </div>
              </div>

              <div className="video-info-container video-info-container--hide-desktop">
                <div className="video-category-container">
                  {video.tags && showTags()}
                </div>
                <div className="video-createdAt-container video-createdAt-container--hide-desktop">
                  <TodayIcon className="today--icon" />
                  <small className="createdAt">
                    <Moment format="DD.MM.YY">{video.created}</Moment>
                  </small>
                </div>
              </div>

              <h2 className="video-headline">{video.name}</h2>
              <p className="video-description">{video.description}</p>
              <SecondaryButton
                text={"Teilen"}
                onClick={shareVideo}
                icon={ShareIcon}
                additionalClasses="share-button"
              ></SecondaryButton>

              <div className="video-container__channel-description--hide-desktop">
                <div className="video-container__channel-description-inner">
                  <PlaylistPlayIcon className="video-playlist-icon--dekstop-hide" />
                  {renderTagLinks()}
                </div>
                <div className="video-container__channel-description-inner">
                  <LiveTvIcon className="video-livetv-icon--dekstop-hide" />
                  {renderTagLinks("channel")}
                </div>
              </div>
            </div>
            {renderPlaylistVideos()}
          </div>

          {currentPlaylistVideos.length > 0 && (
            <div className="video-container__further-videos-container">
              <h3 className="video-row__title">Ähnliche Videos</h3>
              <ThumbnailGrid
                elements={currentPlaylistVideos}
                columnNumber={4}
                type="video"
              />
            </div>
          )}
          <Snackbar
            open={copySuccess}
            autoHideDuration={3000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} className="">
              Der Link zu diesem Video wurde in deine Zwischenablage kopiert!
              <br />
              Schicke ihn an deine Freunde, um das Video zu teilen.
            </Alert>
          </Snackbar>
        </div>
      </>
    );
  }
  return <div>Video</div>;
};

export default Video;
