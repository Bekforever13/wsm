import { FC } from 'react'
import styles from './Brands.module.scss'
import { TitleOfPage } from '@/widgets'
import { BrandsTable } from './table/BrandsTable'

const Brands: FC = () => {
	return (
		<div className={styles.container}>
			<TitleOfPage title='Бренды' route='brands' />
			<BrandsTable />
		</div>
	)
}

export { Brands }
