import React from "react";
import { BASEURL } from "../../api";
import playButtonIllustration from "../../assets/img/Button_Play.svg";
import { Link } from "react-router-dom";

const HeaderCarousel = ({ video }) => {
  const { imagepath, name, description } = video;
  const videoURL = video.buttonlink.split("video/").pop();

  return (
    <div className="header-carousel">
      <div className="header-carousel__overlay">
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
            <p className="header-carousel__info-description"> {description}</p>
          </div>
        </div>
      </div>
      <img
        src={`${BASEURL}/slider${imagepath}`}
        alt="imagePath"
        className="header-carousel__main-image"
      />
    </div>
  );
};
export default HeaderCarousel;
