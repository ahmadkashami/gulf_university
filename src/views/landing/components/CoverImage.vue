<template>
  <VImg
    height='500'
    :src='background'
    class='my-slider'
    cover
  >
    <VSheet
      class="d-flex align-center justify-center flex-wrap text-center mt-6"
      height="100%"
      width="100%"
      color="rgb(0 0 0 / 0%)"
      tile
    >
     <slot></slot>
    </VSheet>
  </VImg>

</template>

<script setup>

const props = defineProps({
  background: {
    type: String,
  },
})
</script>



