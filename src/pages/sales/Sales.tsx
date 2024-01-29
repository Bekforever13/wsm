import { FC } from 'react'
import { TitleOfPage } from '@/widgets'
import { useTranslation } from 'react-i18next'
import { SalesTable } from './table/SalesTable'

const Sales: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="container">
      <TitleOfPage title={t('sells')} route="sales" />
      <SalesTable />
    </div>
  )
}

export { Sales }
