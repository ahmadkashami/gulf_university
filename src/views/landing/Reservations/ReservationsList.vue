<template>
  <section id='body-section'>
    <MainHeader/>
    <CoverImage :background="ClassRoom">
      <VRow class="position-absolute mx-auto">
        <VCol cols="12">
          <h1 class='text-banner-1  mx-auto'>
            Gulf University for Science and Technology
          </h1>
        </VCol>
        <VCol cols="12">
          <h4 class='text-banner-2 mx-auto'>
            Classroom  Reservation System
          </h4>
        </VCol>
      </VRow>
    </CoverImage>
    <VContainer id="reservation-classes">
      <VRow>
        <VCol cols='12'>
          <p class='paragraph-bold-title'>
            Reservation Classes
          </p>
        </VCol>
      </VRow>
      <VRow>
        <VCol
          cols='12' xl='3' lg='3' md='4' sm='6' class='text-center'
          v-for='(item,i) in roomsListData' :key="i"
        >
          <RoomReservation :room='item'></RoomReservation>
        </VCol>
      </VRow>
    </VContainer>

  </section>
</template>

<script setup>
import MainHeader from "@/views/landing/header/MainHeader.vue";
import CoverImage from "@/views/landing/components/CoverImage.vue";
import ClassRoom from '@/assets/images/classroom.jpg'
import {ref} from "vue";
import Background from "@/assets/images/slider.png";
import RoomReservation from "@/views/landing/Reservations/RoomReservation.vue";


const roomsListData = ref([
  {
    name: "Classroom 2",
    location: " Building 0 - IT",
    chair: 10,
    projector: false,
    cover_image: Background,
    time:"12:00PM"
  },
  {
    name: "Classroom 3",
    location: " Building 9 - IT",
    chair: 12,
    projector: false,
    cover_image: Background,
    time:"12:00PM"
  },
  {
    name: "Classroom 5",
    location: " Building 8 - IT",
    chair: 12,
    projector: true,
    cover_image: Background,
    time:"12:00PM"
  },
  {
    name: "Classroom 5",
    location: " Building 6 - IT",
    chair: 20,
    projector: false,
    cover_image: Background,
    time:"12:00PM"
  },
  {
    name: "Classroom 6",
    location: " Building 6 - IT",
    chair: 15,
    cover_image: Background,
    projector: true,
    time:"12:00PM"
  },
  {
    name: "Classroom 7",
    location: " Building 4 - IT",
    chair: 18,
    cover_image: Background,
    projector: false,
    time:"12:00PM"
  },
  {
    name: "Classroom 8",
    location: " Building 2 - IT",
    chair: 10,
    cover_image: Background,
    projector: true,
    time:"12:00PM"
  },
])

</script>
<style scoped>
#reservation-classes{
  margin-top: -100px;
}
</style>
