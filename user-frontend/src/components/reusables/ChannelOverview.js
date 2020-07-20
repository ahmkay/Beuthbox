import React from "react";
import { Link } from "react-router-dom";
import Button from "../reusables/Button";
import { BASEURL } from "../../api";
import { NavLink } from "react-router-dom";
import CategoryIcon from "./CategoryIcon";
import ActivityIndicator from "../../components/reusables/ActivityIndicator";

const ChannelOverview = ({ channelData, channelInfo }) => {
  const renderChannelOverview = (channelData, channelInfo) => {
    return (
      <section className="channels-section">
        {channelInfo && (
          <header className="section-header">
            <h2 className="channel-header__info">{channelInfo}</h2>
          </header>
        )}
        {!channelData.length ? (
          <ActivityIndicator position="inline" height={50} width={100} />
        ) : (
          channelData.map((channel, index) => {
            return (
              <NavLink
                to={`/channel/${channel._id}`}
                className={`channel-container ${
                  index % 2 === 0
                    ? "channel-container--left"
                    : "channel-container--right"
                }`}
              >
                <div className="channel-thumbnail-box">
                  <div className="channel-thumbnail-box__content">
                    <img
                      src={`${BASEURL}/channel${channel.imagepath}`}
                      className="channel-thumbnail-box__image"
                    />
                  </div>
                </div>
                <div
                  className={`channel-info-box ${
                    index % 2 === 0
                      ? "channel-info-box--left"
                      : "channel-info-box--right"
                  }`}
                >
                  <h3 className="channel-info-box__channel-name">
                    {channel.name}
                  </h3>
                  <h5 className="channel-description">{channel.description}</h5>
                  <div className="channel-container-categories">
                    <CategoryIcon category="study" isActive type="labeled" />
                    <CategoryIcon category="campus" isActive type="labeled" />
                  </div>
                </div>
              </NavLink>
            );
          })
        )}
        {/*  <div className="all-media-link--channel">
          <Link to={"/channel"}>
            <Button>Alle Channels</Button>{" "}
          </Link>
        </div> */}
      </section>
    );
  };

  return <>{renderChannelOverview(channelData, channelInfo)}</>;
};

export default ChannelOverview;
