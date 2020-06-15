import React from "react";
import Loader from "react-loader-spinner";

/**
 * A reusable ActivityIndicator component to show a loading spinner
 *
 * @param {position, height, width, color} props
 *
 * Example:
 * <ActivityIndicator width={50} height={50} position={'inline' or 'center'} />
 */

const ActivityIndicator = ({ position, height, width, color }) => {
  const WIDTH = 100;
  const HEIGHT = 100;

  return (
    <div
      className={`activity-indicator__container--${
        position ? position : "center"
      }`}
    >
      <Loader
        type="ThreeDots"
        color={color || "#BDE2E2"}
        height={HEIGHT || height}
        width={WIDTH || width}
      />
    </div>
  );
};

export default ActivityIndicator;
