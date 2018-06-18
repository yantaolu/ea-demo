import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import modules from './modules'

Vue.use(Vuex)

const SET_DATA = 'SET_DATA'

const state = {
  random: null
}

const mutations = {
  [SET_DATA] (state, d) {
    state.random = d
  }
}

const actions = {
  setData ({commit}, {random}) {
    commit(SET_DATA, random)
  }
}

const getters = {
  random: () => state.random
}

const plugins = process.env.NODE_ENV !== 'production' ? [createLogger()] : []

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: modules,
  plugins: plugins,
  strict: process.env.NODE_ENV !== 'production'
})

export default store
