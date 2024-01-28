import { FC } from 'react'
import styles from './Transactions.module.scss'
import { TransactionsTable } from './table/TransactionsTable'
import { TitleOfPage } from '@/widgets'
import { useTranslation } from 'react-i18next'

const Transactions: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <TitleOfPage title={t('transactions')} route="transactions" />
      <TransactionsTable />
    </div>
  )
}

export { Transactions }
