<template>
  <div class="select-wrapper" v-click-outside="closeListItems">
    <input
      class="custom-input"
      placeholder="Type your city..."
      type="text"
      :value="modelValue"
      @focus="isShowLocationsList = true"
      @input="$emit('update:modelValue', $event.target.value)">
    <div class="custom-input_list">
      <div class="custom-input_list-item" v-if="!locations.length && isShowLocationsList && modelValue">Empty...</div>
      <template v-else-if="locations.length && modelValue && isShowLocationsList">
        <div class="custom-input_list-item" v-for="location in locations" :key="location.id"
          @click="changeLocation(location)">
          {{ location.place_name }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// Data
const isShowLocationsList = ref(false)

// Props
const props = defineProps({ 
  modelValue: { type: String },
})

// Emits
const emit = defineEmits(['selectLocation', 'update:modelValue'])

// Store
const { locations } = storeToRefs(useAppStore())

// Mehods
const changeLocation = (location) => {
  emit('selectLocation', location)
  isShowLocationsList.value = false
}

const closeListItems = () => {
  isShowLocationsList.value = false
}
</script>