import { FC } from 'react'
import { TitleOfPage } from '@/widgets'
import { StorageTable } from './table/StorageTable'
import { useTranslation } from 'react-i18next'

const Storage: FC = () => {
  const { t } = useTranslation()
  return (
    <div className="container">
      <TitleOfPage title={t('storage')} route="storage" />
      <StorageTable />
    </div>
  )
}

export { Storage }
