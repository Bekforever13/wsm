import { FC } from 'react'
import styles from './TitleOfPage.module.scss'
import { UiButton } from '@/components'
import { TTitleOfPage } from './TitleOfPage.types'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { adminStore } from '@/app/store'

const TitleOfPage: FC<TTitleOfPage> = ({ title, route }) => {
	const { t } = useTranslation()
	const { pathname } = useLocation()
	const { setCategoriesModal } = adminStore(s => s)

	const handleClickButton = () => {
		if (route === 'categories') {
			setCategoriesModal(true)
		}
	}

	return (
		<div className={styles.head}>
			<h1>{title}</h1>
			{pathname !== '/' && (
				<UiButton onClick={handleClickButton}>{t('add')}</UiButton>
			)}
		</div>
	)
}

export { TitleOfPage }
