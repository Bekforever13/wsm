import { FC } from 'react'
import { TitleOfPage } from '@/widgets'
import { CategoriesTable } from './table/CategoriesTable'
import { useTranslation } from 'react-i18next'

const Categories: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="container">
      <TitleOfPage title={t('categories')} route="categories" />
      <CategoriesTable />
    </div>
  )
}

export { Categories }
