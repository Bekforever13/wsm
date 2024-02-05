import { FC } from 'react'
import { TitleOfPage } from '@/widgets'
import { useTranslation } from 'react-i18next'
import { RefundsTable } from './table/RefundsTable'

const Refunds: FC = () => {
  const { t } = useTranslation()
  return (
    <div className="container">
      <TitleOfPage title={t('refunds')} route="refunds" />
      <RefundsTable />
    </div>
  )
}

export { Refunds }
