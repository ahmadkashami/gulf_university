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
            Filter Reservations
          </h4>
        </VCol>
      </VRow>
    </CoverImage>
    <VContainer id="reservation-classes">
      <v-card class="filter v-card-filter pa-5">
        <v-row>
          <v-col cols="12" class="paragraph-bold-title text-black text-center">
            <p> Filter Reservation Classes</p>
          </v-col>
          <v-col cols="12"
                 md="4"
          ></v-col>
          <v-col cols="12"
                 md="4"
          >
            <date-input-menu
              :date='date'
              label='Date'
              @update-date='updateDate'
            ></date-input-menu>
          </v-col>
          <v-col cols="12"
                 md="4"
          ></v-col>
        </v-row>
        <div class="justify-center text-center mt-5">
          <v-btn color="primary" variant="outlined"  @click="fetchReservationsList">
            filter
          </v-btn>
        </div>
      </v-card>
      <VRow v-if="roomsListData?.length==0">
        <v-col cols="12" class="paragraph-bold-title text-primary text-center">
          <p> Not Found Reservation Classes</p>
        </v-col>
      </VRow>
      <VRow v-else>
        <VCol cols='12'>
          <p class='paragraph-bold-title mt-5'>
            Reservation Classes
          </p>
        </VCol>
      </VRow>
      <VRow>
        <VCol
          cols='12' xl='4' lg='4' md='4' sm='6' class='text-center'
          v-for='(item,i) in roomsListData' :key="i"
        >
          <RoomReservation :reservation='item'></RoomReservation>
        </VCol>
      </VRow>
    </VContainer>

  </section>
</template>

<script setup>
import MainHeader from "@/views/landing/header/MainHeader.vue";
import CoverImage from "@/views/landing/components/CoverImage.vue";
import ClassRoom from '@/assets/images/classroom.jpg'
import {onMounted, ref} from "vue";
import RoomReservation from "@/views/landing/Reservations/RoomReservation.vue";
import formatDate from "@/plugins/custom-date";
import {store} from "@/store";
import DateInputMenu from "@/components/DateInputMenu.vue";
import useWeb from "@/views/web/useWeb";


//gel list of  classes
const roomsListData = ref([])


const {
  date,
  updateDate,
  fetchTimeSlots
} = useWeb()
const fetchReservationsList = () => {
  let dateFormat = formatDate(date.value)
  store.dispatch('public/fetchReservationsList', {
    date: date.value ? dateFormat : null,
  })
    .then(response => {
      roomsListData.value = response.data.data
    }).catch(error => {
    console.log(error)
  })
}

onMounted(() => {
  date.value=new Date()
  fetchTimeSlots();
  fetchReservationsList()
})

</script>
<style scoped>
#reservation-classes {
  margin-top: -100px;
}
.filter {
  margin-top: -100px;
  padding: 30px !important;
  z-index: 1 !important;
}

.v-card-filter {
  box-shadow: none !important;
  background: #001df508 !important;
  border-radius: 16px !important;;
  border: 1px white solid !important;;
  backdrop-filter: blur(4px) !important;;
  text-align: start !important;
}
</style>
