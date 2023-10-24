import en from './locales/en.json'
import ua from './locales/ua.json'
import { createI18n } from "vue-i18n"

const translations = {
  en: en,
  ua: ua
}

const messages = Object.assign(translations)
let localStorageLang = localStorage.getItem('lang') || 'ua'

const i18n = new createI18n({
  legacy: false,
  locale: localStorageLang,
  messages,
})

export default i18n