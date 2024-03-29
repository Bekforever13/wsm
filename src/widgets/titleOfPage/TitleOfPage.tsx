import { FC } from 'react'
import styles from './TitleOfPage.module.scss'
import { UiButton } from '@/components'
import { TTitleOfPage } from './TitleOfPage.types'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CategoriesStore, ProductsStore } from '@/app/store'
import { TransactionsStore } from '@/app/store/transactionsStore'
import { CompaniesStore } from '@/app/store/companiesStore'
import { TransactionsSelect } from './transactions/TransactionsSelect'
import { ClientsStore } from '@/app/store/clientsStore'
import { PurveyorsStore } from '@/app/store/purveyorsStore'

const TitleOfPage: FC<TTitleOfPage> = ({ title, route }) => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const { setCategoriesModal } = CategoriesStore()
  const { setProductsModal } = ProductsStore()
  const { setTransactionsModalSelling, setTransactionsModalIncome } = TransactionsStore()
  const { setCompaniesModal } = CompaniesStore()
  const { setClientsModal } = ClientsStore()
  const { setPurveyorsModal } = PurveyorsStore()

  const handleClickButton = () => {
    switch (route) {
      case 'categories':
        setCategoriesModal(true)
        break
      case 'products':
        setProductsModal(true)
        break
      case 'incomes':
        setTransactionsModalIncome(true)
        break
      case 'sales':
        setTransactionsModalSelling(true)
        break
      case 'companies':
        setCompaniesModal(true)
        break
      case 'clients':
        setClientsModal(true)
        break
      case 'purveyors':
        setPurveyorsModal(true)
        break
    }
  }

  return (
    <div className={styles.head}>
      <h1>{title}</h1>
      <div className={styles.wrapper}>
        {(pathname === '/incomes' || pathname === '/sales') && <TransactionsSelect />}
        {pathname !== '/' && pathname !== '/storage' && pathname !== '/refunds' && (
          <UiButton onClick={handleClickButton}>{t('add')}</UiButton>
        )}
      </div>
    </div>
  )
}

export { TitleOfPage }
