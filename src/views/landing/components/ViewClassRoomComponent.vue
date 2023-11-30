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
                      {{ itemData.building }}-{{ itemData.floorN }}
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
                      @update-date='updateEndDate'
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
                      item-title="timeValue"
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
                      item-title="timeValue"
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
              <VCol cols="3" md="1" lg="1" v-for="n in timeSlots.filter(b=>(b.value>=fromTime&&b.value<=toTime-1))"
                    :key="n.value" class="pa-0">
                <v-sheet height="40" :color="events.filter(b=>b.hour==n.value).length>0?'red':'green'"
                         class="d-flex flex-column  justify-center align-center text-white">
                   {{ n.timeValue }}
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
            reserve
          </VBtn>
          <VBtn
            color="orange"
            variant="outlined"
            type="reset"
            @click="closeViewDialog"
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
import {computed, onMounted, ref} from 'vue'
import useWeb from "@/views/web/useWeb";
import DateInputMenu from "@/components/DateInputMenu.vue";

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


const loading = ref(false)
const msgSnackbarVisible = ref(null)
const isOutlinedSnackbarColor = ref('')
const isOutlinedSnackbarVisible = ref(null)
const closeViewDialog = () => {
  setTimeout(() => {
    emit('update:is-view-class-room-dialog', false)
    loading.value = false
  }, 1000)
}
const {
  fromHours,
  toHours,
  date,
  fromTime,
  toTime,
  reservationMode,
  updateEndDate,
} = useWeb()
const onSubmit = () => {
  loading.value = true
  msgSnackbarVisible.value = "Reservation Successfully"
  isOutlinedSnackbarColor.value = "success"
  isOutlinedSnackbarVisible.value = true
  closeViewDialog()
}

onMounted(() => {
  toTime.value = 20;
  fromTime.value = 8;
  date.value=new Date().toLocaleDateString()
})

const events = ref([
  {
    hour: 11,
    reserved: true
  },
  {
    hour: 14,
    reserved: true
  },
  {
    hour: 10,
    reserved: true
  },
])
const {timeSlots} = useWeb()


const onChangeTime = () => {
  console.log(1)
  let eventsDuration = []
  eventsDuration = events.value.filter(b => (b.hour >= fromTime.value && b.hour <= toTime.value - 1));
  if (toTime.value == null || fromTime.value == null) {
    reservationMode.value = false;
  } else if (eventsDuration.length == 0) {
    reservationMode.value = true;
  } else {
    reservationMode.value = false
  }
}
</script>
