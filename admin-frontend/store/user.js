import axios from '~/plugins/axios'

export const state = () => ({
  userData: null,
  allUsers: [],
  currentChannel: null,
  showWarn: true,
})

export const mutations = {
  SET_USER: function (state, user) {
    state.userData = user
  },
  SET_USERS(state, users) {
    state.allUsers = users
  },
  SET_CHANNEL: function (state, channel) {
    state.currentChannel = channel
    state.showWarn = state.currentChannel.imagefilename == "default-image.png" || state.currentChannel.iconfilename == "default-image.png";
  },
  SET_WARN: function (state, {warn}) {
    state.showWarn = warn
  },
}

export const getters = {
  isAuthenticated(state) {
    return !!state.userData
  },
  isChannel(state) {
    return state.userData.group == "channel"
  },
  loggedUser(state) {
    return state.userData
  },
  getWarn(state) {
    return state.showWarn
  }
}

export const actions = {
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {

      axios.post('/user/login', { username, password }, { withCredentials: true }).then(response => {
        commit('SET_USER', response.data)
        resolve(response.data);
      }, error => {
        if (error.response && error.response.status === 401) {
          reject(new Error('Bad credentials'))
        }
        reject(error)

      })
    })
    // try {
    //   const { data } = await axios.post('/user/login', { username, password }, { withCredentials: true })
    //   commit('SET_USER', data)
    //   return data
    // } catch (error) {
    //   if (error.response && error.response.status === 401) {
    //     throw new Error('Bad credentials')
    //   }
    //   throw error
    // }
  },

  async logout({ commit }) {
    await axios.get('/user/logout', { withCredentials: true })
    commit('SET_USER', null)
  }

}