<template>
  <section id='body-section'>
    <MainHeader />
    <Slider />
    <RoomsList :roomsListData='roomsListData' />
  </section>
</template>

<script setup>


import useWeb from '@/views/web/useWeb'
import {onMounted} from 'vue'
import RoomsList from "@/views/landing/rooms-list/RoomsList.vue";
import Slider from "@/views/landing/slider/Slider.vue";
import MainHeader from "@/views/landing/header/MainHeader.vue";
const {
  fetchDataList,
  roomsListData,
} = useWeb()

onMounted(() => {
  fetchDataList()
})


</script>

<style lang='sass'></style>
