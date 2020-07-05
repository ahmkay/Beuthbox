import { BASEURL } from "../api";
import Axios from "axios";

// this functions returns a readable string with calculated hours, minutes and seconds of given miliseconds
export const calculateVideoDuration = (duration) => {
  duration = Number(duration);
  let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours !== "00"
    ? hours + ":" + minutes + ":" + seconds
    : minutes + ":" + seconds;
};

export const compareDates = (a, b) => {
  if (a.created < b.created) return -1;
  if (a.created > b.created) return 1;
  return 0;
};

export const compareDuration = (a, b) => {
  if (a.videoDuration < b.videoDuration) return -1;
  if (a.videoDuration > b.videoDuration) return 1;
  return 0;
};

export const compareNames = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

//TODO in ein Custom Hook umwandeln
export const doSearch = async (result, channels, playlists) => {
  let videos = await Axios.get(
    `${BASEURL}/graphql?query={videos(filter: {name: "${result}"}){name, source, videoDuration, created, status, access, posterImagePath, _id}}`
  );
  const query = `${result}`;
  let filteredvideos = videos.data.data.videos.filter((video) => {
    return video.access == "public" && video.status == "finished";
  });
  filteredvideos = filteredvideos.sort(compareDates);
  const filteredChannels = channels.filter(
    (channel) =>
      channel.ispublic &&
      channel.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(query.toLowerCase())
  );

  const extractSpaces = query.split("%20");
  const formattedQuery = extractSpaces.join(" ");

  return [formattedQuery, filteredvideos, filteredChannels, filteredPlaylists];
};

/**
 * Adds a class to the body element to prevent from scrolling the background when a modal is active
 * @param {Boolean} active the state of the modal
 */
export const preventBackgroundScroll = (active) => {
  document.body.classList.toggle("body--modal-open", active);
};
