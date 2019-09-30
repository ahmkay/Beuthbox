const axios = require('axios');
const VideoApi = `http://localhost:8092/videos`;
const SliderApi = `http://localhost:8092/carousel`;

const resolvers = {
  Query: {
    videos: (_, { filter }) => {
      let queries = '';

      if (filter) {
        queries = formatParams(filter);
      }

      return axios.get(`${VideoApi}${queries}`).then((res) => res.data)
    },
    video: (_, { id }) => axios.get(`${VideoApi}/${id}`).then((res) => res.data),
    channelVideoCount: (_, { id }) => axios.get(`${VideoApi}/count/${id}`).then((res) => res.data),
    channelVideoViewCount: (_, { id }) => axios.get(`${VideoApi}/views/${id}`).then((res) => res.data),
    sliders: () => axios.get(`${SliderApi}?populate=true`).then((res) => res.data),
    slidersLight: () => axios.get(`${SliderApi}`).then((res) => res.data),
    slider: (_, { id }) => axios.get(`${SliderApi}/${id}?populate=true`).then((res) => res.data),
    sliderLight: (_, { id }) => axios.get(`${SliderApi}/${id}`).then((res) => res.data),
  },


};

const formatParams = (params) => {
  return "?" + Object
    .keys(params)
    .map(function (key) {
      if (key == "channelid") {
        return "channel" + "=" + params[key]
      }
      if (key == "categoryid") {
        return "categories" + "=" + params[key]
      }
      else {
        return key + "=" + params[key]
      }
    })
    .join("&")
};

module.exports = resolvers;