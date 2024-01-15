import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { qq, ru } from '@/features'

const lang = localStorage.getItem('lang_wsm')

i18n.use(initReactI18next)
.init({
	resources: {
		qq,
		ru,
	},
	lng: lang || 'ru',
	fallbackLng: lang || 'ru',
	react: { useSuspense: true },
	interpolation: { escapeValue: false },
})

export default i18n
