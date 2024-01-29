import { FC } from 'react'
import { TitleOfPage } from '@/widgets'
import { useTranslation } from 'react-i18next'
import { IncomesTable } from './table/IncomesTable'

const Incomes: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="container">
      <TitleOfPage title={t('incomes')} route="incomes" />
      <IncomesTable />
    </div>
  )
}

export { Incomes }
