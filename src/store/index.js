import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import modules from './modules'

Vue.use(Vuex)

const SET_DATA = 'SET_DATA'
const SET_ROOT_ROUTES = 'SET_ROOT_ROUTES'

const state = {
  random: null,
  rootRoutes: []
}

const mutations = {
  [SET_DATA] (state, d) {
    state.random = d
  },
  [SET_ROOT_ROUTES] (state, routes = []) {
    state.rootRoutes = routes
  }
}

const actions = {
  setData ({commit}, random) {
    commit(SET_DATA, random)
  },
  setRootRoutes ({commit}, routes) {
    commit(SET_ROOT_ROUTES, routes)
  }
}

const getters = {
  random: () => state.random,
  rootRoutes: () => state.rootRoutes
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
