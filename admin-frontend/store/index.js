import axios from '~/plugins/axios'
import moment from 'moment'

export const state = () => ({
  videos: [],
  video: [],
  videoSearchFilter: "",
  categories: [],
  category: [],
  sliders: [],
  slider: [],
  userA: null,
  channels: [],
  channel: [],
  toolbarTitle: "Home",
  drawerOpen: true,
  snackbar: {
    text: '',
    show: false,
    color: ''
  },
  showsnack: false,
  notifications: [],
})

export const mutations = {
  addNotification (state, notification) {
    state.notifications.push(notification)
  },
  removeNotification (state, id) {
    const index = state.notifications.map((x) => {return x.id; }).indexOf(id);
    if(index >= 0) state.notifications.splice(index, 1)
  },
  updateNotification (state, notification) {
    const index = state.notifications.map((x) => {return x.id; }).indexOf(notification.id);
    if(index >= 0) state.notifications[index].uploadProgess = notification.uploadProgess;
  },
  updateNotificationShow (state, notification) {
    const index = state.notifications.map((x) => {return x.id; }).indexOf(notification.id);
    if(index >= 0) state.notifications[index].show = notification.show;
  },
  setSliders(state, sliders) {
    state.sliders = sliders
  },
  setSlider(state, slider) {
    state.slider = slider
  },
  setVideoSearchFilter(state, query){
    state.videoSearchFilter = query
  },
  filterVideos(state, filterData) {
    function comparer(otherArray){
      return function(current){
        return otherArray.filter(function(other){
          return other.name == current.name && other._id == current._id
        }).length == 0;
      }
    }
    
    state.videos = state.videos.filter(comparer(filterData));

  },
  // filterVideos(state, filterData) {

  //   state.videos = state.videos.filter(item => !filterData.includes(item));
  // },
  concatVideos(state, concatData) {
    state.videos = state.videos.concat(concatData);
  },
  setVideos(state, videos) {
    state.videos = videos
  },
  setVideo(state, video) {
    state.video = video
    state.video.formatedCreated = moment(String(state.video.created)).format('YYYY-MM-DD')
  },
  setChannels(state, channels) {
    state.channels = channels
  },
  setChannel(state, channel) {
    state.channel = channel
  },
  setUser(state, user) {
    state.userA = user
  },
  setDrawerOpen(state, { isOpen }) {
    state.drawerOpen = isOpen
  },
  setCategory(state, category) {
    state.category = category
  },

  setCategories(state, categories) {
    state.categories = categories
  },
  settoolbarTitle(state, title) {
    state.toolbarTitle = title
  },
  setSnackbar(state, input) {
    state.snackbar.text = input.text
    state.showsnack = true
    state.snackbar.color = input.color
    console.log(state.snackbar.color)
  },
  unsetSnackbar(state, value) {
    state.showsnack = value;
  },
  setSnackbarProgess(state, input) {
    state.snackbarUploadProgress.text = input.text
    state.showsnackbarUploadProgress = true
    state.snackbarUploadProgress.uploadProgess = input.uploadProgess
   
  },
  unsetSnackbarProgess(state, value) {
    state.showsnackbarUploadProgress = value;
  }
}


export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {

  },
}

