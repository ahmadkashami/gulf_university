import { createStore } from 'vuex'
import logo from '@/assets/images/logo.png'

export const store = createStore({
  state: {
    userData: localStorage.getItem('userData'),
    logo:logo,
  },
  mutations: {
    UPDATE_USER_USER_DATA(state, value) {
      state.userData = value
    },
  },
  actions: {},
  modules: {},
})

