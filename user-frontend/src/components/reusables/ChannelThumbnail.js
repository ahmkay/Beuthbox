import React from "react";
import { Link } from "react-router-dom";
import Channel from "../../assets/img/Button_Channel.svg";
import Placeholder from "../../assets/img/Placeholder_Channel.svg";
import CategoryIcon from "./CategoryIcon";

/**
 * A reusable component to display a thumbnail for a channel
 *
 * @param {String} title to display the title of the video
 * @param {String} img the path to the thumbnail-img
 * @param {String} id the id of the video
 * @param {String[]} categories an array of all categories of videos in this channel
 *
 * @example
 *  <ChannelThumbnail
 *     title={channel.name}
 *     img = {`${BASEURL}/channel${channel.imagepath}`}
 *     categories = {['study', 'campus']}
 *     id = {video._id}
 * />
 */

const ChannelThumbnail = ({ title, categories, img, id }) => {
  const renderCategories = () => {
    let hasStudy = false;
    let hasCampus = false;
    let hasClass = false;
    let hasResearch = false;

    for (let category of categories) {
      if (
        hasStudy == true &&
        hasCampus == true &&
        hasClass == true &&
        hasResearch == true
      )
        break;

      switch (category) {
        case "study":
          hasStudy = true;
          break;
        case "campus":
          hasCampus = true;
          break;
        case "class":
          hasClass = true;
          break;
        case "research":
          hasResearch = true;
          break;
        default:
          break;
      }
    }

    return (
      <div className="channel-thumbnail-container__categories-list">
        {hasStudy && <CategoryIcon category="study" isActive hasBackground />}
        {hasCampus && <CategoryIcon category="campus" isActive hasBackground />}
        {hasClass && <CategoryIcon category="class" isActive hasBackground />}
        {hasResearch && (
          <CategoryIcon category="research" isActive hasBackground />
        )}
      </div>
    );
  };

  return (
    <div className="channel-thumbnail-container">
      <Link
        to={"/channel/" + id}
        className="channel-thumbnail-container__content"
      >
        <img
          src={img ? img : Placeholder}
          className="channel-thumbnail-container__thumbnail-img"
          alt="channel Thumbnail"
        />
        {renderCategories()}
        <img
          src={Channel}
          alt="Channel Icon"
          className="channel-thumbnail-container__channel-button"
        />
        <div className="channel-thumbnail-container__overlay">
          <p className="channel-thumbnail-container__channel-title">
            {title ? title : "Kein Titel"}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ChannelThumbnail;
