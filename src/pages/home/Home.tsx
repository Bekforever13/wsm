import { FC } from 'react'
import styles from './Home.module.scss'
import { TitleOfPage } from '@/widgets'

const Home: FC = () => {
	return (
		<div className={styles.container}>
			<TitleOfPage title='Главная' route='home' />
		</div>
	)
}

export { Home }
