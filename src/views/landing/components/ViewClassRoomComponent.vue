<template>
  <div>
    <VDialog
      v-model="isViewClassRoomDialog"
      persistent
      width="900"
    >
      <VCard height="100%">
        <div class="drawer-header d-flex align-center ma-4">
          <h2>Classroom Information</h2>
          <VSpacer/>
          <VBtn
            icon="mdi-close"
            size="small"
            @click="$emit('update:is-view-class-room-dialog',false)"
          />
        </div>
        <VDivider/>

        <VCardText class="pa-0">
          <VContainer>

            <VRow>
              <VCol cols="12"
                    md="6"
                    sm="6">
                <VList v-if="itemData">
                  <div class="d-flex mb-3">
                    <div class="font-weight-bold">
                      Room Name :
                    </div>
                    <div class="mx-2 rounded pa-1 bg-grey-100">
                      {{ itemData.name }}
                    </div>
                  </div>
                  <div class="mx-10"></div>
                  <div class="d-flex mb-3">
                    <div class="font-weight-bold">
                      Classroom location :
                    </div>
                    <div class="mx-2 rounded pa-1 bg-grey-100">
                      {{ itemData.building }}-{{ itemData.floorNo }}
                    </div>
                  </div>
                  <div class="d-flex mb-3">
                    <div class="font-weight-bold">
                      Projector :
                    </div>
                    <div class="mx-2 rounded pa-1 bg-grey-100">
                      <VIcon
                        class='mx-auto'
                        color='success'
                        v-if="itemData.hasProjector"
                      >
                        mdi-projector
                      </VIcon>
                      <VIcon
                        v-else
                        class='mx-auto'
                        color='error'
                      >
                        mdi-projector-off
                      </VIcon>
                    </div>
                  </div>
                  <div class="mx-10"></div>
                  <div class="d-flex mb-3">
                    <div class="font-weight-bold">
                      Capacity :
                    </div>
                    <div class="mx-2 rounded pa-1 bg-grey-100">
                      <VIcon
                        color='#000'
                        class='mb-2'
                        size='17'
                      >
                        mdi-chair-school
                      </VIcon>
                      <span class='font-weight-bold'>
                      {{ itemData.capacity }}
                    </span>
                    </div>
                  </div>
                </VList>
              </VCol>
              <VCol cols="12"
                    md="6"
                    sm="6">
                <v-row>
                  <v-col cols="12">
                    <date-input-menu
                      :date='date'
                      label='Date'
                      @update-date='updateDate'
                      density="compact"
                    ></date-input-menu>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="fromTime"
                      :counter="10"
                      label="From Time"
                      hide-details
                      required
                      variant="outlined"
                      prepend-inner-icon="mdi-clock-time-eight-outline"
                      color="primary"
                      bg-color="white"
                      :items="fromHours"
                      item-title="label"
                      item-value="value"
                      clearable
                      @update:model-value="onChangeTime"
                      density="compact"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="toTime"
                      :counter="10"
                      label="To Time"
                      hide-details
                      required
                      variant="outlined"
                      prepend-inner-icon="mdi-clock-time-eight-outline"
                      color="primary"
                      bg-color="white"
                      :items="toHours.filter(b=>b.value>fromTime)"
                      item-title="label"
                      item-value="value"
                      clearable
                      @update:model-value="onChangeTime"
                      density="compact"
                    ></v-select>
                  </v-col>
                </v-row>
              </VCol>
            </VRow>
            <VRow class="ma-1  rounded pt-4">
              <VCol cols="3" md="1" lg="1"
                    v-for="n in timeSlots.filter(b=>(b.value>=fromTime&&(b.value<=toTime-slotScaleValue)))"
                    :key="n.value" class="pa-0">
                <v-sheet height="40" :color="events.filter(b=>b.value==n.value)[0]?.reserved?'red':'green'"
                         class="d-flex flex-column  justify-center align-center text-white">
                  {{ n.label }}
                </v-sheet>
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>
        <v-divider></v-divider>
        <VCardActions>
          <VSpacer/>
          <VBtn
            v-if="reservationMode"
            color="primary"
            class="me-3"
            type="submit"
            :loading="loading"
            :disabled="loading"
            variant="outlined"
            @click="onSubmit"
          >
            reserve now
          </VBtn>
          <VBtn
            color="orange"
            variant="outlined"
            type="reset"
            @click="$emit('update:is-view-class-room-dialog',false)"
          >
            Cancel
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <VSnackbar
      v-model="isOutlinedSnackbarVisible"
      :color="isOutlinedSnackbarColor"
      rounded="pill"
      position="absolute"
      vertical
    >
      <p>{{ msgSnackbarVisible }}</p>
    </VSnackbar>
  </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import useWeb from "@/views/web/useWeb";
import DateInputMenu from "@/components/DateInputMenu.vue";
import {store} from "@/store";
import formatDate from "@/plugins/custom-date";

const props = defineProps({
  isViewClassRoomDialog: {
    type: Boolean,
  },
  itemData: {
    required: true,
  },
})

const emit = defineEmits(['update:is-view-class-room-dialog'])

const isViewClassRoomDialog = computed({
  get() {
    return props.isViewClassRoomDialog
  },
  set(value) {
    emit('update:is-view-class-room-dialog', value)
  },
})




const {
  fromHours,
  toHours,
  date,
  fromTime,
  toTime,
  reservationMode,
  updateDate,
  loading,
  msgSnackbarVisible,
  isOutlinedSnackbarColor,
  isOutlinedSnackbarVisible
} = useWeb()


const timeSlots = computed(() => {
  return store.state.public.timeSlots
})


const events = ref([])
const slotScaleValue = computed(() => {
  return store.state.public.slotScaleValue
})
//get classroom data
const getClassRoomSchedule = () => {
  store.dispatch('public/getClassRoomSchedule', {
    id: props.itemData.id,
    date: formatDate(date.value)
  })
    .then(response => {
      events.value = response.data.data.timeSlots
    }).catch(error => {
    console.log(error)
  })
}


const onChangeTime = () => {
  loading.value=true
  store.dispatch('public/getClassRoomAvailability', {
    id: props.itemData.id,
    from: fromTime.value,
    to: toTime.value,
    date: formatDate(date.value),
  }).then((response) => {
    reservationMode.value = response.data.valid
    loading.value=false
  }).catch(() => {
    reservationMode.value = false
    loading.value=false
  })
}


//Reserve Room
const closeViewDialog = () => {
  emit('update:is-view-class-room-dialog', false)
  loading.value = false
}
const onSubmit = () => {
  loading.value = true
  store.dispatch('public/reserveRoom',
    {
      id: props.itemData.id,
      from: fromTime.value,
      to: toTime.value,
      date: formatDate(date.value),
    }).then(() => {
    msgSnackbarVisible.value = "Reservation Successfully"
    isOutlinedSnackbarColor.value = "success"
    isOutlinedSnackbarVisible.value = true
    closeViewDialog()
  }).catch((error) => {
    msgSnackbarVisible.value = error.response.data.message
    isOutlinedSnackbarColor.value = "error"
    isOutlinedSnackbarVisible.value = true
    closeViewDialog()
  })
}


watch(
  () => (props.isViewClassRoomDialog),
  () => {
    if (props.isViewClassRoomDialog) {
      toTime.value = timeSlots.value[timeSlots.value.length - 1]?.value;
      fromTime.value = timeSlots.value[0]?.value;
      date.value = new Date()
      getClassRoomSchedule()
      onChangeTime()
    }
  },
)
</script>
