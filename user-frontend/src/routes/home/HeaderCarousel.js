import React from "react";
import Searchbar from "../../components/reusables/Searchbar";
import { BASEURL } from "../../api";
import beuthBOXIllustration from "../../assets/img/beuthbox-logo.svg";
import playButtonIllustration from "../../assets/img/Button_Play.svg";
import { Link, useLocation, useHistory } from "react-router-dom";

const HeaderCarousel = ({ video, getQuery }) => {
  const { imagepath, name, description } = video;
  const { pathname } = useLocation();
  const history = useHistory();

  const videoURL = video.buttonlink.split("video/").pop();

  const showSearchResult = (query) => {
    history.push(`/search/name=${query}`);
  };

  const evaluateSearch = async (event, value) => {
    const { key, type } = event;

    let trimmedValue = value.trim();

    if (key === "Enter") {
      if (!trimmedValue && trimmedValue === "") {
        history.push("/");
        return;
      }

      getQuery(trimmedValue);
      showSearchResult(trimmedValue);
    } else if (type === "click") {
      if (!trimmedValue && trimmedValue === "") {
        history.push("/");
        return;
      }
      getQuery(trimmedValue);
      showSearchResult(trimmedValue);
    }
  };
  
  return (
    <>
      {pathname === "/" ? (
        <div className="header-carousel">
          <div className="header-carousel__overlay">
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
            <div className="header-carousel__info-container">
              <Link to={`/video/${videoURL}`}>
                <img
                  src={playButtonIllustration}
                  alt="Video Carousel Play Button"
                  className="header-carousel__playbutton"
                />
              </Link>
              <div className="header-carousel__video-infos">
                <h4 className="header-carousel__info-title">{name}</h4>
                <p className="header-carousel__info-description">
                  {" "}
                  {description}
                </p>
              </div>
            </div>
          </div>
          <img
            src={`${BASEURL}/slider${imagepath}`}
            alt="imagePath"
            className="header-carousel__main-image"
          />
        </div>
      ) : null}
    </>
  );
};
export default HeaderCarousel;
