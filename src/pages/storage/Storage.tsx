import { FC } from 'react'
import styles from './Storage.module.scss'
import { TitleOfPage } from '@/widgets'
import { StorageTable } from './table/StorageTable'
import { useTranslation } from 'react-i18next'

const Storage: FC = () => {
	const { t } = useTranslation()
	return (
		<div className={styles.container}>
			<TitleOfPage title={t('storage')} route='storage' />
			<StorageTable />
		</div>
	)
}

export { Storage }
