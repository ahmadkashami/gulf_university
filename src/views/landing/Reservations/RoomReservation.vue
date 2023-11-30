<template>
  <div
    v-if='reservation'
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
           {{ reservation.classroom.building }}-{{ reservation.classroom.floorNo }}
          </span>
        </p>
        <p
          class='room-title text-capitalize'
        >
          {{ reservation.classroom.name }}
        </p>
        <VRow class="justify-space-between mt-2 my-2">
          <VCol cols='12'>
            <p>
              <VIcon
                color='#000'
                class='mb-2'
                size='17'
              >
                mdi-clock-time-eleven-outline
              </VIcon>
              <span class='font-weight-bold'>
               From :  {{ reservation.from.label }}
              </span>
              <span class='font-weight-bold'>
               to:  {{ reservation.to.label }}
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
  reservation: {
    type: Object,
  },
})
</script>

<style lang='scss' scoped>
@import "room-reservation";
</style>
