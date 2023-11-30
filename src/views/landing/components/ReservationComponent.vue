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
                      Room Name :
                    </div>
                    <div class="mx-2 rounded pa-1 bg-grey-100">
                      {{ itemData.name }}
                    </div>
                  </div>

                  <div class="d-flex mb-3">
                    <div class="font-weight-bold mt-1">
                      Room location :
                    </div>
                    <div class="mx-2 rounded pa-1 bg-grey-100">
                      {{ itemData.building }}-{{ itemData.floorN }}
                    </div>
                  </div>
                  <div class="d-flex mb-3">
                    <div class="font-weight-bold mt-1">
                      Date :
                    </div>
                    <div class="mx-2 rounded pa-1 bg-grey-100">
                      {{ date }}
                    </div>
                  </div>
                  <div class="d-flex flex-row">
                    <div class="d-flex mb-3">
                      <div class="font-weight-bold mt-1">
                        From Time :
                      </div>
                      <div class="mx-2 rounded pa-1 bg-grey-100">
                        {{ fromTime }}
                      </div>
                    </div>
                    <div class="mx-10"></div>
                    <div class="d-flex mb-3 mt-1">
                      <div class="font-weight-bold">
                        To time :
                      </div>
                      <div class="mx-2 rounded pa-1 bg-grey-100">
                        {{ toTime }}
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
            reserve
          </VBtn>
          <VBtn
            color="orange"
            variant="outlined"
            type="reset"
            @click="closeReservationDialog"
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
import {computed, ref} from 'vue'
import {store} from '@/store'

const props = defineProps({
  isOpenReservationDialog: {
    type: Boolean,
  },
  itemData: {
    required: true,
  },
})

const emit = defineEmits(['update:is-open-reservation-dialog'])

const isOpenReservationDialog = computed({
  get() {
    return props.isOpenReservationDialog
  },
  set(value) {
    emit('update:is-open-reservation-dialog', value)
  },
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


const loading = ref(false)
const msgSnackbarVisible = ref(null)
const isOutlinedSnackbarColor = ref('')
const isOutlinedSnackbarVisible = ref(null)
const closeReservationDialog = () => {
  setTimeout(() => {
    emit('update:is-open-reservation-dialog', false)
    loading.value = false
  }, 1000)
}
const onSubmit = () => {
  loading.value = true
  msgSnackbarVisible.value = "Reservation Successfully"
  isOutlinedSnackbarColor.value = "success"
  isOutlinedSnackbarVisible.value = true
  closeReservationDialog()
}

</script>
