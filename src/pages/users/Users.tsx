import { FC } from 'react'
import styles from './Users.module.scss'
import { TitleOfPage } from '@/widgets'
import { UsersTable } from './table/UsersTable'
import { useTranslation } from 'react-i18next'

const Users: FC = () => {
	const { t } = useTranslation()
	return (
		<div className={styles.container}>
			<TitleOfPage title={t('users')} route='users' />
			<UsersTable />
		</div>
	)
}

export { Users }
