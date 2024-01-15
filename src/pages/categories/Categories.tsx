import { FC } from 'react'
import styles from './Categories.module.scss'
import { TitleOfPage } from '@/widgets'
import { CategoriesTable } from './table/CategoriesTable'

const Categories: FC = () => {
	return (
		<div className={styles.container}>
			<TitleOfPage title='Категории' route='categories' />
			<CategoriesTable />
		</div>
	)
}

export { Categories }
