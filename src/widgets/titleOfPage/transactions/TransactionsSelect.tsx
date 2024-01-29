import { UiSelect } from '@/components/select/UiSelect'
import { FC, useEffect, useState } from 'react'
import { useGetCompanies } from '@/features/queries/company/companies.api'
import { TCompany } from '@/features/queries/company/companies.types'
import { useTranslation } from 'react-i18next'
import { TransactionsStore } from '@/app/store/transactionsStore'
import styles from './TransactionsSelect.module.scss'

type Options = {
  label: string
  value: number
}

const TransactionsSelect: FC = () => {
  const { t } = useTranslation()
  const {
    setTransactionsBranch,
    transactionsBranch,
    transactionsPaymentType,
    setTransactionsPaymentType,
  } = TransactionsStore()
  const [BranchesOptions, setBranchesOptions] = useState<Options[]>([{ label: 'Все', value: 0 }])
  const { data } = useGetCompanies()

  const TransactionsOptions = [
    { value: 1, label: t('purchased') },
    { value: 2, label: t('sales') },
  ]

  useEffect(() => {
    if (data) {
      data.data?.map((el: TCompany) =>
        setBranchesOptions((prev) => [...prev, { label: el.name, value: el.id }]),
      )
    }
  }, [data])

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {t('transactionsTableCol2')}
        <UiSelect
          onSelect={(e) => setTransactionsPaymentType(e)}
          value={transactionsPaymentType}
          options={TransactionsOptions}
        />
      </div>
      <div className={styles.wrapper}>
        {t('companies')}
        <UiSelect
          defaultValue={BranchesOptions[0]}
          value={transactionsBranch}
          onSelect={(e) => setTransactionsBranch(e)}
          options={BranchesOptions}
        />
      </div>
    </div>
  )
}

export { TransactionsSelect }
