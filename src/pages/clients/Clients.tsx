import { FC } from 'react'
import { TitleOfPage } from '@/widgets'
import { useTranslation } from 'react-i18next'
import { ClientsTable } from './table/ClientsTable'

const Clients: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="container">
      <TitleOfPage title={t('clients')} route="clients" />
      <ClientsTable />
    </div>
  )
}

export { Clients }
