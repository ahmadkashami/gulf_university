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
        :src="Background"
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
                Gulf University for Science and Technology
              </div>
            </VCol>
            <VCol cols="12">
              <div class="slider-decryption">
                Classroom  Reservation System
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
import {ref} from "vue";
const props = defineProps({
  slidersData: {
    type: String,
  },
})

const activeSlide = ref(0)
</script>



