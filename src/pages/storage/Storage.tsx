import { FC } from 'react'
import styles from './Storage.module.scss'
import { TitleOfPage } from '@/widgets'
import { StorageTable } from './table/StorageTable'

const Storage: FC = () => {
	return (
		<div className={styles.container}>
			<TitleOfPage title='Склад' route='storage' />
			<StorageTable />
		</div>
	)
}

export { Storage }
