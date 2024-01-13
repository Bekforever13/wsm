import { Select } from 'antd'
import { FC, useState } from 'react'
import styles from './Header.module.scss'

const HeaderLanguage: FC = () => {
	const [currentLang, setCurrentLang] = useState(
		localStorage.getItem('lang') || 'ru'
	)
	const onSelectLang = (lang: string) => {
		localStorage.setItem('lang', lang)
		setCurrentLang(lang)
	}

	return (
		<label className={styles.language}>
			Язык
			<Select
				value={currentLang}
				onSelect={e => onSelectLang(e)}
				style={{ width: '170px' }}
				options={[
					{ value: 'ru', label: 'Русский' },
					{ value: 'kar', label: 'Каракалпакский' },
				]}
			/>
		</label>
	)
}

export { HeaderLanguage }
