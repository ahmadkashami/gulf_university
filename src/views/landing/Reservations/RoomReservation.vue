<template>
  <div
    v-if='room'
    id='room-div'
  >
    <VCard class='mx-auto'>
      <VCardText>
        <p>
          <VIcon
            color='#42A8C3'
            class='mb-2'
          >
            mdi-map-marker
          </VIcon>
          <span class='room-location my-2'>
           {{ room.building }}-{{ room.floorN }}
          </span>
        </p>
        <p
          class='room-title'
        >
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
                mdi-clock-time-eleven-outline
              </VIcon>
              <span class='font-weight-bold'>
                 {{ room.time }}
              </span>
            </p>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </div>
</template>


<script setup>
const props = defineProps({
  room: {
    type: Object,
  },
})
</script>

<style lang='scss' scoped>
@import "room-reservation";
</style>
