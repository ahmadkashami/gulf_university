<template>
  <VHover
    v-slot="{ isHovering, props }"
    close-delay="200"
  >
    <VCarousel
      v-bind="props"
      v-model="activeSlide"
      height="500"
      class="my-slider"
      :cycle="isHovering ? false : true"
      delimiter-icon="mdi-circle-medium"
      hide-delimiter-background
      :show-arrows="false"
      light
    >
      <VCarouselItem
        v-for="item in sliders"
        :src="item.cover"
        cover
      >
        <VSheet
          class="d-flex align-center justify-center flex-wrap text-center mx-auto mt-5 px-4"
          height="100%"
          max-width="800"
          width="100%"
          color="rgb(0 0 0 / 0%)"
          tile
        >
          <VRow>
            <VCol cols="12">
              <div class="slider-title mt-12">
               {{item.name}}
              </div>
            </VCol>
            <VCol cols="12">
              <div class="slider-decryption">
              {{item.desc}}
              </div>
            </VCol>
          </VRow>
        </VSheet>
      </VCarouselItem>
    </VCarousel>
  </VHover>
</template>

<script setup>
import Background from '@/assets/images/slider.png'
import Background2 from '@/assets/images/gulf.png'
import {ref} from "vue";

const props = defineProps({
  slidersData: {
    type: String,
  },
})

const sliders = [{
  cover: Background,
  name:'Gulf University for Science and Technology',
  desc:'Classroom Reservation System',
}, {
  cover: Background2,
  name:'',
  desc:'',
}];
const activeSlide = ref(0)
</script>



