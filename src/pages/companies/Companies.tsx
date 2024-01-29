import { FC } from 'react'
import { TitleOfPage } from '@/widgets'
import { useTranslation } from 'react-i18next'
import { CompaniesTable } from './table/CompaniesTable'

const Companies: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="container">
      <TitleOfPage title={t('companies')} route="companies" />
      <CompaniesTable />
    </div>
  )
}

export { Companies }
