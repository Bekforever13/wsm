import { FC } from 'react'
import styles from './TitleOfPage.module.scss'
import { UiButton } from '@/components'
import { TTitleOfPage } from './TitleOfPage.types'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BrandStore, CategoriesStore, ProductsStore } from '@/app/store'

const TitleOfPage: FC<TTitleOfPage> = ({ title, route }) => {
	const { t } = useTranslation()
	const { pathname } = useLocation()
	const { setCategoriesModal } = CategoriesStore(s => s)
	const { setBrandsModal } = BrandStore(s => s)
	const { setProductsModal } = ProductsStore(s => s)

	const handleClickButton = () => {
		if (route === 'categories') {
			setCategoriesModal(true)
		} else if (route === 'brands') {
			setBrandsModal(true)
		} else if (route === 'products') {
			setProductsModal(true)
		}
	}

	return (
		<div className={styles.head}>
			<h1>{title}</h1>
			{pathname !== '/' && (
				<UiButton onClick={handleClickButton}>{t('add')}</UiButton>
			)}
		</div>
	)
}

export { TitleOfPage }
