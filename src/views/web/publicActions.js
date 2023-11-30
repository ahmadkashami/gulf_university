import axios from "@/plugins/axios";

export default {

  fetchRoomsList({state}, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`classrooms`, {params: queryParams})
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  fetchTimeSlots({state}, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`time-slots`, {params: queryParams})
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  reserveRoom({state}, queryParams) {
    return new Promise((resolve, reject) => {
      axios.post(`classrooms/${queryParams.id}/reservations`, queryParams)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getClassRoomSchedule({state}, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`classrooms/${queryParams.id}/schedule`, {params: queryParams})
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  fetchReservationsList({state}, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`reservations`, {params: queryParams})
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  getClassRoomAvailability({state}, queryParams) {
    return new Promise((resolve, reject) => {
      axios.get(`classrooms/${queryParams.id}/availability`, {params: queryParams})
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
