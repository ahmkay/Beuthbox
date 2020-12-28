import React, { useState, useEffect } from "react";
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

  const [loadingTime, setloadingTime] = useState(0);

  // increment loadingTime
  useEffect(() => {
    const timeout = setTimeout(() => {
      setloadingTime(loadingTime + 1);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [loadingTime]);

  // render Text depending on loadingTime
  const renderLoadingInfo = () => {
    if (loadingTime > 5) {
      if (loadingTime > 5 && loadingTime <= 10) {
        return (
          <>
            <h5>Laden...</h5>
          </>
        );
      }
      if (loadingTime > 10 && loadingTime <= 15) {
        return (
          <>
            <h5>Das dauert wohl ein bisschen länger...</h5>
          </>
        );
      }
      if (loadingTime > 15) {
        return (
          <h5>
            Irgendwas konnte hier nicht gefunden werden :(
            <br />
            Probiere es nochmal!
          </h5>
        );
      }
    }
  };

  return (
    <div
      className={`activity-indicator-container--${
        position ? position : "center"
      }`}
    >
      {renderLoadingInfo()}
      {loadingTime <= 15 && (
        <Loader
          type="ThreeDots"
          color={color || "#BDE2E2"}
          height={HEIGHT || height}
          width={WIDTH || width}
        />
      )}
    </div>
  );
};

export default ActivityIndicator;
