import axios from "axios";
import { BASEURL } from "../../api";

/**
 * Returns the total number of videos of a playlist
 * @param {String} id the ID of the Playlist
 *
 * @example
 * (async () => {
 *  videoCount = await responseVideo(id)
 * })()
 */
export const getTotalVideos = async (id) => {
  let totalVideos = 0;

  try {
    const responseVideos = await axios.get(
      `${BASEURL}/graphql?query={videos(filter: {categoryid: "${id}"}){name, status, access, videoDuration _id}}`
    );
    let videos = responseVideos.data.data.videos.filter(
      (video) => video.access == "public" && video.status == "finished"
    );

    totalVideos = videos.length;
  } catch (error) {
    console.error(error);
  }

  return totalVideos;
};
