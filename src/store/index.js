import Vue from 'vue'
import Vuex from 'vuex'

import posts from './modules/posts'
import meetups from './modules/meetups'
import threads from './modules/threads'
import categories from './modules/categories'
import auth from './modules/auth'
import stats from './modules/stats'
import meta from './modules/meta'
import brands from './modules/brands'
import prices from './modules/prices'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    meetups,
    categories,
    brands,
    prices,
    threads,
    posts,
    auth,
    stats,
    meta
  },
  mutations: {
    setItems (state, {resource, items}) {
      state[resource].items = items
    },
    setItem (state, {resource, item}) {
      state[resource].item = item
    },
    addItemToArray (state, {item, index, resource}) {
      Vue.set(state[resource].items, index, item)
    }
  }
})