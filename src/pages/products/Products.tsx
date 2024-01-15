import { FC } from 'react'
import styles from './Products.module.scss'
import { TitleOfPage } from '@/widgets'
import { ProductsTable } from './table/ProductsTable'

const Products: FC = () => {
	return (
		<div className={styles.container}>
			<TitleOfPage title='Товары' route='products' />
			<ProductsTable />
		</div>
	)
}

export { Products }
