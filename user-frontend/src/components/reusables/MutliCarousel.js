import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import VideoThumbnail from "./VideoThumbnail";
import { calculateVideoDuration } from "../../utils";
import { BASEURL } from "../../api";
import PlaylistCard from "./PlaylistCard";
import HeaderCarousel from "../../routes/home/HeaderCarousel";
import { DataContext } from "../../api/DataContext";

const MultiCarousel = ({ videos, headline, isPlaylist, isHeader }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: isPlaylist ? 3 : 4,
      paritialVisibilityGutter: isPlaylist ? 20 : 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30,
    },
  };

  const responsiveHeader = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const { mainslider, playlistData } = useContext(DataContext);

  const renderVideoCarousel = () => (
    <>
      <h4 className="multi-carousel__title">{headline}</h4>
      <Carousel
        ssr
        partialVisbile
        deviceType={"desktop"}
        itemClass="image-item__video"
        responsive={responsive}
        swipeable
      >
        {videos.map((video) => {
          let imgPath = "";
          if (video.posterImagePath.indexOf("engage-player") > 1) {
            imgPath = video.posterImagePath;
          } else {
            imgPath = `${BASEURL}/videos${video.posterImagePath}`;
          }
          return (
            <VideoThumbnail
              title={video.name}
              duration={calculateVideoDuration(video.videoDuration)}
              img={imgPath}
              id={video._id}
              listOrientation={"column"}
              listCount={3}
            />
          );
        })}
      </Carousel>
    </>
  );
  const renderPlaylistCarousel = () => (
    <>
      {headline && <h4 className="multi-carousel__title">{headline}</h4>}
      <Carousel
        ssr
        partialVisbile
        deviceType={"desktop"}
        itemClass="image-item__playlist"
        containerClass={"react-multi-carousel-list__playlist"}
        responsive={responsive}
        swipeable
        slidesToSlide={2}
      >
        {playlistData.map((playlist) => {
          return <PlaylistCard playlistData={playlist} />;
        })}
      </Carousel>
    </>
  );

  const renderHeaderCarousel = () => {
    if (mainslider.length > 0) {
      return (
        <>
          {headline && <h3 className="multi-carousel__title">{headline}</h3>}
          <Carousel
            ssr
            partialVisbile={false}
            deviceType={"desktop"}
            itemClass="image-item__header"
            containerClass={"react-multi-carouse l-list__header"}
            responsive={responsiveHeader}
            keyBoardControl={true}
            arrows={true}
            showDots
          >
            {mainslider.map((video) => {
              return <HeaderCarousel video={video} />;
            })}
          </Carousel>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      {!isPlaylist && !isHeader && renderVideoCarousel()}
      {isPlaylist && renderPlaylistCarousel()}
      {isHeader && renderHeaderCarousel()}
    </>
  );
};

export default MultiCarousel;
