import { Select } from 'antd'
import { FC, useEffect, useState } from 'react'
import styles from './Header.module.scss'
import { useTranslation } from 'react-i18next'

const HeaderLanguage: FC = () => {
  const lang = localStorage.getItem('lang_wsm')
  const { t, i18n } = useTranslation()
  const [currentLang, setCurrentLang] = useState(lang ?? 'ru')

  const onSelectLang = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('lang_wsm', lang)
    setCurrentLang(lang)
  }

  useEffect(() => {
    if (lang) {
      setCurrentLang(lang)
    }
  }, [])

  return (
    <label className={styles.language}>
      {t('language')}
      <Select
        value={currentLang}
        onSelect={(e) => onSelectLang(e)}
        style={{ width: '170px' }}
        options={[
          { value: 'ru', label: 'Русский' },
          { value: 'qq', label: 'Каракалпакский' },
        ]}
      />
    </label>
  )
}

export { HeaderLanguage }
