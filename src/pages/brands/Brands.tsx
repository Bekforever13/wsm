import { FC } from 'react'
import styles from './Brands.module.scss'
import { TitleOfPage } from '@/widgets'
import { BrandsTable } from './table/BrandsTable'
import { useTranslation } from 'react-i18next'

const Brands: FC = () => {
	const { t } = useTranslation()
	return (
		<div className={styles.container}>
			<TitleOfPage title={t('brands')} route='brands' />
			<BrandsTable />
		</div>
	)
}

export { Brands }
