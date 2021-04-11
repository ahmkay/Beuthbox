import React from "react";

/**
 * An Service Card component to render a styled card with an image, title and description.
 *
 * @param {String} imgName
 * @param {String} title
 * @param {String} description
 *
 * Note: Any image has to be placed in /src/assets/img/video-services/
 *
 * Example:
 * <ServiceCard
 *   imgName={service.img}
 *   title={service.title}
 *   description={service.description}
 *  />
 */

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
