import publicActions from '@/views/web/publicActions'

export default {
  namespaced: true,
  state: {
    roomsList: null,
    date: null,
    fromTime: null,
    toTime: null,
    timeSlots:[],
    fromTimeSlots:[],
    toTimeSlots:[],
    slotScaleValue:1

  },
  getters: {},
  mutations: {
    UPDATE_ROOMS_LIST(state, value) {
      state.roomsList = value
    },
    UPDATE_DATE(state, value) {
      state.date = value
    },
    UPDATE_FROM_TIME(state, value) {
      state.fromTime = value
    },
    UPDATE_TO_TIME(state, value) {
      state.toTime = value
    },
    UPDATE_TIME_SLOTS(state, value) {
      state.timeSlots = value
    },
    UPDATE_FROM_TIME_SLOTS(state, value) {
      state.fromTimeSlots = value
    },
    UPDATE_TO_TIME_SLOTS(state, value) {
      state.toTimeSlots = value
    },
    UPDATE_SLOT_SCALE_VALUE(state, value) {
      state.slotScaleValue = value
    },
  },
  actions: {
    ...publicActions,
  },
}
