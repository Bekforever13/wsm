import { FC } from 'react'
import styles from './Users.module.scss'
import { TitleOfPage } from '@/widgets'
import { UsersTable } from './table/UsersTable'

const Users: FC = () => {
	return (
		<div className={styles.container}>
			<TitleOfPage title='Пользователи' route='users' />
			<UsersTable />
		</div>
	)
}

export { Users }
