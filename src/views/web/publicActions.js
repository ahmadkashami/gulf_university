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
      axios.get(`classrooms/timeslots`, {params: queryParams})
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
}
