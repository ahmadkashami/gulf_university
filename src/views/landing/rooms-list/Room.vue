<template>
  <div
    v-if='room'
    id='room-div'
  >
    <VCard class='mx-auto'>
      <VImg
        height='200'
        :src='CoverImage'
        class='room-img'
        cover
      />
      <VCardText>
        <p>
          <VIcon
            color='#42A8C3'
            class='mb-2'
          >
            mdi-map-marker
          </VIcon>
          <span class='room-location my-2'>
           {{ room.building }}-{{ room.floorNo }}
          </span>
        </p>
        <p class='room-title text-capitalize'>
          {{ room.name }}
        </p>
        <VRow class="justify-space-between mt-2 my-2" >
          <VCol cols='6'>
            <p>
              <VIcon
                color='#000'
                class='mb-2'
                size='17'
              >
                mdi-chair-school
              </VIcon>
              <span class='font-weight-bold'>
                 {{ room.capacity }}
              </span>
            </p>
          </VCol>
          <VCol cols='6' class='justify-end'>
            <VIcon
              class='mx-auto'
              color='success'
              v-if="room.hasProjector"
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
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions>
        <VBtn
          color='orange'
          variant='outlined'
          v-if="reservationMode==true"
          @click="openReservationDialog"
        >
          reserve
        </VBtn>
        <VBtn
          color='primary'
          variant='outlined'
          @click="viewClassRoomDialog"
          v-else
        >
          View Class
        </VBtn>
      </VCardActions>
    </VCard>

  </div>
</template>


<script setup>

import CoverImage from '@/assets/images/classroom.jpg'
import ReservationComponent from "@/views/landing/components/ReservationComponent.vue";
import {ref} from "vue";
import ViewClassRoomComponent from "@/views/landing/components/ViewClassRoomComponent.vue";

const props = defineProps({
  room: {
    type: Object,
  },
  reservationMode: {
    type: Boolean,
  },
})

const emit = defineEmits(['openReservationDialog','viewClassRoomDialog'])

const openReservationDialog=()=>{
  emit('openReservationDialog',props.room)
}
const viewClassRoomDialog=()=>{
  emit('viewClassRoomDialog',props.room)
}
</script>

<style lang='scss' scoped>
@import "room";
</style>
