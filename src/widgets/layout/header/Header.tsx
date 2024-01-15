import { HeaderBreadCrumbs } from '@/widgets/layout/header/HeaderBreadcrumbs'
import { FC } from 'react'
import { HeaderLanguage } from './HeaderLanguage'
import styles from './Header.module.scss'

const Header: FC = () => {
	return (
		<div className={styles.container}>
			<HeaderBreadCrumbs />
			<HeaderLanguage />
		</div>
	)
}

export { Header }
