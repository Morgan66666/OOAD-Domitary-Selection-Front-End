import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ws: null,
  },
  getters: {
  },
  mutations: {
    setWebSocket(state, ws) {
      state.ws = ws;
    },
  },
  actions: {
  },
  modules: {
  }
})
