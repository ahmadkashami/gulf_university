<template>
  <div>
    <VDialog
      v-model="isOpenReservationDialog"
      persistent
      width="500"
    >
      <VCard height="100%">
        <div class="drawer-header d-flex align-center ma-4">
          <h2>Reservation Information</h2>
          <VSpacer/>
          <VBtn
            icon="mdi-close"
            size="small"
            @click="$emit('update:is-open-reservation-dialog',false)"
          />
        </div>
        <VDivider/>

        <VCardText class="pa-0">
          <VContainer>
            <VRow>
              <VCol
                cols="12"
              >
                <VList
                  v-if="itemData"
                  density="compact"
                >
                  <div class="d-flex mb-3">
                    <div class="font-weight-bold mt-1">
                        Name :
                    </div>
                    <div class="mx-2 rounded pa-1 bg-grey-100">
                      {{ itemData.name }}
                    </div>
                  </div>

                  <div class="d-flex mb-3">
                    <div class="font-weight-bold mt-1">
                       Location :
                    </div>
                    <div class="mx-2 rounded pa-1 bg-grey-100">
                      {{ itemData.building }}-{{ itemData.floorNo }}
                    </div>
                  </div>
                  <div class="d-flex mb-3">
                    <div class="font-weight-bold mt-1">
                      Date :
                    </div>
                    <div class="mx-2 rounded pa-1 bg-grey-100">
                      {{ formatDate(date) }}
                    </div>
                  </div>
                  <div class="d-flex flex-row">
                    <div class="d-flex mb-3">
                      <div class="font-weight-bold mt-1">
                        From Time :
                      </div>
                      <div class="mx-2 rounded pa-1 bg-grey-100">
                        {{ formTimeLabel }}
                      </div>
                    </div>
                    <div class="mx-10"></div>
                    <div class="d-flex mb-3 mt-1">
                      <div class="font-weight-bold">
                        To time :
                      </div>
                      <div class="mx-2 rounded pa-1 bg-grey-100">
                        {{ toTimeLabel }}
                      </div>
                    </div>
                  </div>
                </VList>
              </VCol>
            </VRow>
          </VContainer>
        </VCardText>
        <v-divider></v-divider>
        <VCardActions>
          <VSpacer/>
          <VBtn
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
            @click="$emit('update:is-open-reservation-dialog',false)"
          >
            Cancel
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    <VSnackbar
      v-model="isOutlinedSnackbarVisible"
      :color="isOutlinedSnackbarColor"
      position="absolute"
      vertical
      rounded="pill"
    >
      <p> {{ msgSnackbarVisible }}</p>
    </VSnackbar>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import {store} from '@/store'
import formatDate from "@/plugins/custom-date";
import useWeb from "@/views/web/useWeb";

const props = defineProps({
  isOpenReservationDialog: {
    type: Boolean,
  },
  itemData: {
    required: true,
  },
})

const emit = defineEmits(['update:is-open-reservation-dialog','updateData'])

const isOpenReservationDialog = computed({
  get() {
    return props.isOpenReservationDialog
  },
  set(value) {
    emit('update:is-open-reservation-dialog', value)
  },
})

const {
  loading,
  msgSnackbarVisible,
  isOutlinedSnackbarColor,
  isOutlinedSnackbarVisible
} = useWeb()

const timeSlots = computed(() => {
  return store.state.public.timeSlots
})
const fromTime = computed(() => {
  return store.state.public.fromTime
})
const toTime = computed(() => {
  return store.state.public.toTime
})
const date = computed(() => {
  return new Date(store.state.public.date).toLocaleDateString()
})

const formTimeLabel = ref(null)
const toTimeLabel = ref(null)

onMounted(() => {

})


//Reserve Room
const closeReservationDialog = () => {
  emit('update:is-open-reservation-dialog', false)
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
    msgSnackbarVisible.value = "Reservation Successfully, We will send the reservation to your email"
    isOutlinedSnackbarColor.value = "success"
    isOutlinedSnackbarVisible.value = true
    closeReservationDialog()
    emit('updateData')
  }).catch((error) => {
    console.log(error)
    msgSnackbarVisible.value = error.response.data.message
    isOutlinedSnackbarColor.value = "error"
    isOutlinedSnackbarVisible.value = true
    closeReservationDialog()
  })
}

watch(
  () => (props.isOpenReservationDialog),
  () => {
    if (props.isOpenReservationDialog) {
      formTimeLabel.value = timeSlots.value.filter(b => b.value == fromTime.value)[0]?.label
      toTimeLabel.value = timeSlots.value.filter(b => b.value == toTime.value)[0]?.label
    }
  },
)


</script>
