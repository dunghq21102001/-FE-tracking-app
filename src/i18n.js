import { createI18n } from "vue-i18n";
import vi from './lang/vi.json'
import en from './lang/en.json'

const messages = {
    vi: vi,
    en: en,
}

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE || 'vi',
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    globalInjection: true,
    messages
})