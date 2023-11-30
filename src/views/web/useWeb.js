import {computed, ref, watch} from 'vue'
import {store} from '@/store'
import {useRoute} from 'vue-router'
import formatDate from "@/plugins/custom-date";


export default function useWeb() {
  const route = useRoute()
  const roomsList = ref([])
  const timeSlots = ref([])
  const fromTimeSlots = ref([])
  const toTimeSlots = ref([])
  const slotScaleValue = ref(1)


  //gel list of  classes
  const fetchDataList = () => {
    let dateFormat = formatDate(date.value)
    store.dispatch('public/fetchRoomsList', {
      date: date.value ? dateFormat : null,
      from: fromTime.value,
      to: toTime.value
    })
      .then(response => {
        roomsList.value = response.data.data
        store.commit('public/UPDATE_ROOMS_LIST', roomsList.value)
      }).catch(error => {
      console.log(error)
    })
  }

  //get time slots in system
  const fetchTimeSlots = () => {
    store.dispatch('public/fetchTimeSlots')
      .then(response => {
        timeSlots.value = response.data.data
        fromTimeSlots.value = [...response.data.data]
        toTimeSlots.value = [...response.data.data]
        slotScaleValue.value = response.data.slotScaleValue

        store.commit('public/UPDATE_TIME_SLOTS', timeSlots.value)
        store.commit('public/UPDATE_SLOT_SCALE_VALUE', slotScaleValue.value)
        store.commit('public/UPDATE_FROM_TIME_SLOTS', fromTimeSlots.value.splice(0, timeSlots.value.length - 1))
        store.commit('public/UPDATE_TO_TIME_SLOTS', toTimeSlots.value.splice(1, timeSlots.value.length))
      }).catch(error => {
      console.log(error)
    })
  }
  //setup  hours
  const fromHours = computed(() => {
    return store.state.public.fromTimeSlots
  })
  const toHours = computed(() => {
    return store.state.public.toTimeSlots
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
  const updateDate = (val) => {
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
    updateDate,
    onSearch,
    onReset,
    roomsListData,
    fetchTimeSlots
  }
}
