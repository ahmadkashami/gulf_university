<template>
  <VRow>
    <VCol cols="12">
      <VMenu
        v-model="modal"
        :close-on-content-click="false"
        min-width="auto"
      >
        <template v-slot:activator="{ props }">
          <VTextField
            v-model="computedDateFormatted"
            readonly
            v-bind="props"
            :label="label"
            outlined
            hide-details="auto"
            :rules="rules?rules:[]"
            :error-messages="errorMessages"
            required
            variant="outlined"
            prepend-inner-icon="mdi-calendar-range"
            color="primary"
            bg-color="white"
            :disabled="disabled"
            :density="density"
          />
        </template>
        <VDatePicker
          ref="picker"
          v-model="initData"
          scrollabel
          color="primary"
          :allowed-dates="allowedDates"
          :readonly="readonly"
          :disabled="readonly"
          @update:model-value='updateDate'
          :min="min"
          :max="max"
        />
      </VMenu>
    </VCol>
    <VSpacer/>
  </VRow>
</template>

<script>
import {computed, ref, watch} from 'vue'
import formatDate from "@/plugins/custom-date";

export default {
  props: {
    date: {
      required: true,
    },
    label: {
      type: String,
      required: true,
      default: 'Date',
    },
    rules: {
      type: Array,
      default: null,
    },
    allowedDates: {
      required: false,
    },
    readonly: {
      required: false,
    },
    min: {
      required: false,
    },
    max: {
      required: false,
    },
    errorMessages: {
      required: false,
    },
    disabled: {
      required: false,
    },
    density: {
      required: false,
    },
  },
  setup(props, context) {
    const picker = ref(null)
    const modal = ref(false)
    const initData = ref(props.date)

    const updateDate = () => {
      computedDateFormatted.value = initData.value
      modal.value = false
      context.emit('updateDate', initData.value)
    }

    watch(() => props.date,
      () => {
        initData.value = props.date
      })

    const computedDateFormatted = computed({
      // getter
      get() {
        if(props.date==null)return null
        return  formatDate(props.date)
      },

      // setter
      set(newValue) {
        context.emit('updateDate', newValue)
      },
    })

    return {
      updateDate,
      picker,
      modal,
      initData,
      computedDateFormatted,
    }
  },
}
</script>
