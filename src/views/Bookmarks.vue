<template>
  <Spinner v-if="!isLoad"/>
  <h3 class="text-center" v-else-if="!locationsBookmarksWeather.length">{{ $t('empty') }}</h3>
  <template v-else>
    <Wrapper 
      v-for="(location, index) in locationsBookmarksWeather"
      :key="index+location.lat"
      :index="index+location.lat"
      :currentLocation="location"
      @deleteLocation="deleteLocation(index)" />
  </template>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import Wrapper from '@/components/Card/Wrapper.vue'
import Spinner from '@/components/Spinner.vue'
import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// Store
const { getLocationWeather, changeAppComponentState } = useAppStore()
const { locationsBookmarksWeather, isLoad } = storeToRefs(useAppStore())

// Hooks
onMounted(() => getBookmarks())

// Methods
const getBookmarks = () => {
  changeAppComponentState('locationsBookmarksWeather', [])
  const storedValue = JSON.parse(localStorage.getItem('myWeather'))
  if (storedValue !== null) {
    storedValue.forEach(item => {
      const params = { ...item, forBookmarks: true }
      getLocationWeather(params)
    })
  }
}

const deleteLocation = async (index) => {
  const { isConfirmed } = await Swal.fire({
    showCancelButton: true,
    text: t('youWantContinue'),
    buttons: [t('btn.not'), t('btn.ok')]
  })
  if (isConfirmed) {
    if (index >= 0 && index < locationsBookmarksWeather.value.length) {
      const newList = locationsBookmarksWeather.value.toSpliced(index, 1)
      changeAppComponentState('locationsBookmarksWeather', newList)
      localStorage.setItem('myWeather', JSON.stringify(newList))
    } else Swal.fire({ text: t('invalidIndex') })
  }
}
</script>