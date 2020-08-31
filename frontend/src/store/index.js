import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import action from './action'
import mutation from './mutation'

Vue.use(Vuex)

export default new Vuex.Store({
    state: state,
    actions: action,
    mutations: mutation
})