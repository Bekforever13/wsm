import { FC } from 'react'
import styles from './Companies.module.scss'
import { TitleOfPage } from '@/widgets'
import { useTranslation } from 'react-i18next'
import { CompaniesTable } from './table/CompaniesTable'

const Companies: FC = () => {
	const { t } = useTranslation()

	return (
		<div className={styles.container}>
			<TitleOfPage title={t('companies')} route='companies' />
			<CompaniesTable />
		</div>
	)
}

export { Companies }
