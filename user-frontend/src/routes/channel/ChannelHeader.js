import React from "react";

function ChannelHeader({ title, img, description }) {
  return (
    <header className="channel-header">
      <div className="channel-header__header-img">
        <img src={img} alt="Header Image" className="channel-header__img" />
        <span className="channel-header__overlay"></span>
        <div className="channel-header__title-box">
          <h1 className="channel-header__title">{title}</h1>
        </div>
      </div>
      <h4 className="channel-header__description">{description}</h4>
    </header>
  );
}

export default ChannelHeader;
