import React from "react";

export default function ServiceCard({ imgName, title, description }) {
  let image = null;

  // get img
  try {
    image = require("../../assets/img/video-services/" + imgName + ".svg");
  } catch (error) {}

  return (
    <article className="service-card paper--elevation-1">
      {image && (
        <img src={image} alt={`${title}-img`} className="service-card__img" />
      )}
      <h4 className="service-card__title">{title}</h4>
      <h6 className="service-card__description">{description}</h6>
    </article>
  );
}
