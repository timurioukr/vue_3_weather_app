import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/style.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import App from './App.vue'
import router from '@/router'
import i18n from '@/localization/index'
import VueSweetalert2 from 'vue-sweetalert2'

const pinia = createPinia()
const app = createApp(App)

const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = event => { if (!(el == event.target || el.contains(event.target))) binding.value() }
    document.addEventListener("click", el.clickOutsideEvent)
  },
  unmounted: el => { document.removeEventListener("click", el.clickOutsideEvent) }
}

app.directive("click-outside", clickOutside)
app.use(VueSweetalert2)
app.use(pinia)
app.use(router)
app.use(i18n)
app.mount('#app')