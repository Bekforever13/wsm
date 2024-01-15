import { FC } from 'react'
import styles from './TitleOfPage.module.scss'
import { UiButton } from '@/shared/ui'
import { TTitleOfPage } from './TitleOfPage.types'
import { useLocation } from 'react-router-dom'

const TitleOfPage: FC<TTitleOfPage> = ({ title, route }) => {
	const { pathname } = useLocation()
	const handleClickButton = () => {
		console.log(route)
	}

	return (
		<div className={styles.head}>
			<h1>{title}</h1>
			{pathname !== '/' && (
				<UiButton onClick={handleClickButton}>Добавить</UiButton>
			)}
		</div>
	)
}

export { TitleOfPage }
