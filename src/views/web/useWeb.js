import {computed, ref, watch} from 'vue'
import {store} from '@/store'
import {useRoute} from 'vue-router'
import formatDate from "@/plugins/custom-date";


export default function useWeb() {
  const route = useRoute()
  const roomsList = ref([])
  const timeSlots = ref([])
  const fetchDataList = () => {
    // let from = timeSlots.value.filter(b => b.value == fromTime.value)[0]?.timeValue
    // let to = timeSlots.value.filter(b => b.value == toTime.value)[0]?.timeValue
    let dateFormat = formatDate(date.value)
    store.dispatch('public/fetchRoomsList', {
      date: date.value ? dateFormat : null,
      from:fromTime.value, //(from && date.value) ? new Date(`${dateFormat},${from}:00`) : null,
      to: toTime.value//(to && date.value) ? new Date(`${dateFormat},${to}:00`) : null,
    })
      .then(response => {
        roomsList.value = response.data.data
        store.commit('public/UPDATE_ROOMS_LIST', roomsList.value)
      }).catch(error => {
      console.log(error)
    })
  }


  const fetchTimeSlots = () => {
    store.dispatch('public/fetchTimeSlots')
      .then(response => {
        timeSlots.value = response.data
        store.commit('public/UPDATE_TIME_SLOTS', timeSlots.value)
      }).catch(error => {
      console.log(error)
    })
  }

  const fromHours = computed(()=>{
    const timeSlotsData=store.state.public.timeSlots;
    return timeSlotsData.splice(0,store.state.public.timeSlots.length-1)
  })

  const toHours = computed(()=>{
    return  store.state.public.timeSlots
  })

  const updateStateValues = () => {
    store.commit('public/UPDATE_DATE', date.value)
    store.commit('public/UPDATE_FROM_TIME', fromTime.value)
    store.commit('public/UPDATE_TO_TIME', toTime.value)
  }
  const date = ref(null)
  const fromTime = ref(null)
  const toTime = ref(null)
  const reservationMode = ref(false)
  const updateEndDate = (val) => {
    date.value = val
  }
  const onSearch = () => {
    updateStateValues()
    fetchDataList();
    reservationMode.value = !reservationMode.value
  }
  const onReset = () => {
    date.value = null
    fromTime.value = null
    toTime.value = null
    updateStateValues()
    reservationMode.value = !reservationMode.value
  }

  watch([fromTime], () => {
    if (fromTime.value == null) {
      toTime.value = null
    }
  })

  const roomsListData = computed(() => {
    return store.state.public.roomsList
  })

  return {
    fetchDataList,
    route,
    fromHours,
    toHours,
    timeSlots,
    date,
    fromTime,
    toTime,
    reservationMode,
    updateEndDate,
    onSearch,
    onReset,
    roomsListData,
    fetchTimeSlots
  }
}
