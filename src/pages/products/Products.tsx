import { FC } from 'react'
import styles from './Products.module.scss'
import { TitleOfPage } from '@/widgets'
import { ProductsTable } from './table/ProductsTable'
import { useTranslation } from 'react-i18next'

const Products: FC = () => {
	const { t } = useTranslation()
	return (
		<div className={styles.container}>
			<TitleOfPage title={t('products')} route='products' />
			<ProductsTable />
		</div>
	)
}

export { Products }
