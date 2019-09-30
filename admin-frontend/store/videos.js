
export const state = () => ({
  videoSearchFilter: "test",
})

export const mutations = {
  SET_VIDEO_SEARCH_FILTER: function (state, query) {
    state.videoSearchFilter = query
    console.log(state.videoSearchFilter)
  },
}

export const getters = {
  getVideoSeachFilter (state) {
    return state.videoSearchFilter
  },
}