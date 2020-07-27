import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import VideoThumbnail from "./VideoThumbnail";
import { calculateVideoDuration } from "../../utils";
import { BASEURL } from "../../api";
import PlaylistCard from "./PlaylistCard";
import HeaderCarousel from "../../routes/home/HeaderCarousel";
import { DataContext } from "../../api/DataContext";
import Searchbar from "../../components/reusables/Searchbar";
import { useLocation, useHistory } from "react-router-dom";
import beuthBOXIllustration from "../../assets/img/beuthbox-logo.svg";

const MultiCarousel = ({ headline, type, elements }) => {
  const { setQuery } = useContext(DataContext);
  const history = useHistory();
  const { pathname } = useLocation();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: type === "playlist" ? 3 : 4,
      paritialVisibilityGutter: type === "playlist" ? 20 : 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 576 },
      items: 2,
      paritialVisibilityGutter: 50,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
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
      breakpoint: { max: 1024, min: 576 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
    },
  };

  const evaluateSearch = async (event, value) => {
    const { key, type } = event;

    let trimmedValue = value.trim();

    if (key === "Enter") {
      if (!trimmedValue && trimmedValue === "") {
        history.push("/");
        return;
      }

      setQuery(trimmedValue);
      showSearchResult(trimmedValue);
    } else if (type === "click") {
      if (!trimmedValue && trimmedValue === "") {
        history.push("/");
        return;
      }
      setQuery(trimmedValue);
      showSearchResult(trimmedValue);
    }
  };

  const showSearchResult = (query) => {
    history.push(`/search/name=${query}`);
  };

  const { mainslider } = useContext(DataContext);

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
        {elements.map((video) => {
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
        {elements.map((playlist) => {
          return <PlaylistCard playlistData={playlist} />;
        })}
      </Carousel>
    </>
  );

  const renderHeaderCarousel = () => {
    if (mainslider.length > 0) {
      return (
        <>
          {pathname === "/" ? (
            <header className="header-carousel">
              <Carousel
                ssr
                partialVisbile={false}
                deviceType={"desktop"}
                itemClass="image-item__header"
                containerClass={"react-multi-carousel-list__header"}
                responsive={responsiveHeader}
                keyBoardControl={true}
                arrows={true}
                showDots
              >
                {mainslider.map((video) => {
                  return <HeaderCarousel video={video} />;
                })}
              </Carousel>
              <div className="header-carousel__content">
                {headline && (
                  <h3 className="multi-carousel__title">{headline}</h3>
                )}
                <img
                  src={beuthBOXIllustration}
                  alt="beuthBOX Logo"
                  className="header-carousel__logo"
                />
                <div className="header-carousel__searchbar-container">
                  <Searchbar
                    className="header-carousel__searchbar-input"
                    type={"white"}
                    eventHandler={evaluateSearch}
                  />
                </div>
              </div>
            </header>
          ) : (
            <></>
          )}
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      {type === "video" && renderVideoCarousel()}
      {type === "playlist" && renderPlaylistCarousel()}
      {type === "header" && renderHeaderCarousel()}
    </>
  );
};

export default MultiCarousel;
