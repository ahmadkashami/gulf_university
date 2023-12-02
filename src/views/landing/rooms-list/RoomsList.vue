<template>
  <section id='rooms-sec'>
    <VContainer>
      <v-card class="filter v-card-filter">
        <v-row>
          <v-col cols="12" class="paragraph-bold-title text-black text-center">
            <p> Search Available Classrooms</p>
          </v-col>
          <v-col cols="12"
                 md="4"
          >
            <date-input-menu
              :date='date'
              label='Date'
              @update-date='updateDate'
              :disabled="reservationMode"
              :min="minDate"
            ></date-input-menu>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >

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
              :disabled="reservationMode"
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
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
              :disabled="fromTime==null||reservationMode"
              clearable
            ></v-select>
          </v-col>
        </v-row>
        <div class="justify-center text-center mt-5">
          <v-btn color="primary" variant="outlined" v-if="!reservationMode&&(date&&toTime&&fromTime)" @click="onSearch">
            Search
          </v-btn>

          <v-btn @click="onReset" color="orange" variant="outlined" v-if="reservationMode">
            reset Filter
          </v-btn>
        </div>
      </v-card>
      <VRow class="mt-4">
        <VCol cols='12'>
          <p class='paragraph-bold-title'>
            {{ !reservationMode ? 'Discover' : 'Available' }} Classroom
          </p>
        </VCol>
      </VRow>
      <VRow v-if="roomsListData?.length==0">
        <v-col cols="12" class="paragraph-bold-title text-primary text-center">
          <p>{{loading?"Loading...":" Not found Available Classes"}}</p>
        </v-col>
      </VRow>
      <VRow v-else>
        <VCol
          cols='12' xl='3' lg='3' md='4' sm='6' class='text-center'
          v-for='(item,i) in roomsListData' :key="i"
        >
          <Room :room='item' :reservationMode="reservationMode"
                @openReservationDialog="openReservationDialog"
                @viewClassRoomDialog="viewClassRoomDialog"></Room>
        </VCol>
      </VRow>
    </VContainer>

    <ReservationComponent :item-data="room"
                          v-model:isOpenReservationDialog="isOpenReservationDialog"
                          @updateData="onSearch"


    ></ReservationComponent>
    <ViewClassRoomComponent :item-data="room"
                            v-model:isViewClassRoomDialog="isViewClassRoomDialog"

    />
  </section>
</template>

<script setup>
import Room from "@/views/landing/rooms-list/Room.vue";
import {onMounted, ref} from "vue";
import DateInputMenu from "@/components/DateInputMenu.vue";
import useWeb from "@/views/web/useWeb";
import ReservationComponent from "@/views/landing/components/ReservationComponent.vue";
import ViewClassRoomComponent from "@/views/landing/components/ViewClassRoomComponent.vue";
import formatDate from "@/plugins/custom-date";

const props = defineProps({
  roomsListData: {
    type: Object,
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
  onSearch,
  onReset,
  fetchTimeSlots,
  minDate,
  getMinDate,
  loading
} = useWeb()





onMounted(() => {
  date.value = null;
  fetchTimeSlots();
  minDate.value=getMinDate()
})

const isOpenReservationDialog = ref(false)
const isViewClassRoomDialog = ref(false)
const room = ref([]);

const openReservationDialog = (val) => {
  room.value = val
  isOpenReservationDialog.value = true;
}
const viewClassRoomDialog = (val) => {
  room.value = val
  isViewClassRoomDialog.value = true
}

</script>

<style scoped lang='scss'>
#rooms-sec {
  background: white !important;
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


