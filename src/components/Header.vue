<template>
  <div class="header">
    <router-link to="/" class="logo">The Weather</router-link>
    <div class="header-center">
      <router-link to="/">{{ $t('btn.main') }}</router-link>
      <router-link to="/bookmarks">{{ $t('btn.bookmarks') }}</router-link>
    </div>
    <div class="header-left">
      <details>
        <summary class="radios">
          <input
            v-for="params in languagesParams" 
            :key="params.id"
            :id="params.id"
            :title="params.title"
            :checked="params.id === lang"
            type="radio" 
            name="item">
        </summary>
        <div class="custom-lang-select">
          <div
            v-for="params in languagesParams"
            class="custom-lang-select_items"
            :key="params.id"
            :for="params.id"
            @click="changeLanguage(params.id)">{{ params.title }}</div>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

// Data
const lang = ref(localStorage.getItem('lang') || 'ua')
const languagesParams = ref([ { id: 'ua', title: 'UA' }, { id: 'en', title: 'EN' } ])

// Methods
const changeLanguage = (newLang) => {
  lang.value = newLang
  localStorage.setItem('lang', newLang)
  router.go()
}
</script>