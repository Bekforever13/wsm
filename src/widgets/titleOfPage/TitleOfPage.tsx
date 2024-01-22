import { FC } from 'react'
import styles from './TitleOfPage.module.scss'
import { UiButton } from '@/components'
import { TTitleOfPage } from './TitleOfPage.types'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BrandStore, CategoriesStore, ProductsStore } from '@/app/store'
import { TransactionsStore } from '@/app/store/transactionsStore'
import { CompaniesStore } from '@/app/store/companiesStore'

const TitleOfPage: FC<TTitleOfPage> = ({ title, route }) => {
	const { t } = useTranslation()
	const { pathname } = useLocation()
	const { setCategoriesModal } = CategoriesStore(s => s)
	const { setBrandsModal } = BrandStore(s => s)
	const { setProductsModal } = ProductsStore(s => s)
	const { setTransactionsModal } = TransactionsStore(s => s)
	const { setCompaniesModal } = CompaniesStore(s => s)

	const handleClickButton = () => {
		switch (route) {
			case 'categories':
				setCategoriesModal(true)
				break
			case 'brands':
				setBrandsModal(true)
				break
			case 'products':
				setProductsModal(true)
				break
			case 'transactions':
				setTransactionsModal(true)
				break
			case 'companies':
				setCompaniesModal(true)
				break
		}
	}

	return (
		<div className={styles.head}>
			<h1>{title}</h1>
			{pathname !== '/' && pathname !== '/storage' && (
				<UiButton onClick={handleClickButton}>{t('add')}</UiButton>
			)}
		</div>
	)
}

export { TitleOfPage }
