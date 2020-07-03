import React, { useState, useEffect, useLayoutEffect, useRef, useContext } from "react";
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

const Video = (props) => {
  const [video, setVideo] = useState([]);
  const [height, setHeight] = useState(1000);
  const [copySuccess, setCopySuccess] = useState(false);
  const { id } = props.match.params;
  const videoContainerRef = useRef(null);
  const { allVideos } = useContext(DataContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentVideo =
          (await allVideos.find(
            (video) => video._id === id
          )) || {};

        let videoPathString = currentVideo.videoPath.toString();
        let string = videoPathString.replace(
          "http://beuthbox-opencast.beuth-hochschule.de/static/mh_default_org/engage-player/",
          ""
        );
        let n = string.indexOf("/");
        let OCid = string.slice(0, n);
       currentVideo.ocid = OCid;
        setVideo(currentVideo);
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
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCopySuccess(false);
  };

  const showTags = () =>
    video.tags.map((tag, index) => (
      <Link
        to={{ pathname:`/search/tag=${tag}`, state:{tag}}}
        className={`video--tag ${index === 0 ? "firstchild" : ""}`}
      >
        <h5>#{tag}</h5>
      </Link>
    ));

  const getHeight = () => {
    setHeight(videoContainerRef.current.clientHeight - 240 + "px");
  };

  useLayoutEffect(() => {
    if (videoContainerRef !== null && videoContainerRef.current !== null) {
      window.addEventListener("resize", getHeight);
    }
    return () => window.removeEventListener("resize", getHeight);
  });

  if (Object.keys(video).length > 0) {
    return (
      <>
        <div className="root-container">
          <div className="video-content-container">
            <div
              className="container-65-left"
              style={{ display: "inline-block" }}
              ref={videoContainerRef}
            >
              <div className="video-container">
                <iframe
                  allowfullscreen
                  src={`http://beuthbox-opencast.beuth-hochschule.de/paella/ui/embed.html?id=${video.ocid}`}
                  style={{ border: "none", width: "100%", height: "70vh" }}
                  name="Paella Player"
                  scrolling="no"
                  frameborder="0"
                  marginheight="0px"
                  marginwidth="0px"
                ></iframe>
              </div>
              <div className="video-info-container">
                <div className="video-category-container">
                  <PlaylistPlayIcon className="video-playlist--icon" />
                  <p className="video-playlist--headline">Playlist:</p>
                  <Link to="/" className="video--tag">
                    <h4 className="video-playlist--name">PlaylistName</h4>
                  </Link>

                  <LiveTvIcon className="video-livetv--icon" />
                  <p className="video-channel--headline">Channel:</p>
                  <Link to="/" className="video--tag">
                    <h4 className="video-channel--name">ChannelName</h4>
                  </Link>
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
              <h2 className="video-headline">{video.name}</h2>
              <p className="video-description">{video.description}</p>
              <SecondaryButton
                text={"Teilen"}
                onClick={shareVideo}
                icon={ShareIcon}
                additionalClasses="share-button"
              ></SecondaryButton>
            </div>
            <div className="video-playlist--container" style={{ height }}>
              <VideoRow
                videos={video}
                flexDirection="column"
                headline="Mehr aus der Playlist"
              />
            </div>
          </div>

          <VideoRow
            videos={video}
            amountOfVideos={4}
            headline="Ähnliche Videos"
            flexDirection="row"
          />
          <Snackbar
            open={copySuccess}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              Das Video befindert sich in der Zwischenablage.
            </Alert>
          </Snackbar>
        </div>
      </>
    );
  }
  return <div>Video</div>;
};

export default Video;
