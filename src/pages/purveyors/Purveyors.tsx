import { FC } from 'react'
import { TitleOfPage } from '@/widgets'
import { useTranslation } from 'react-i18next'
import { PurveyorsTable } from './table/PurveyorsTable'

const Purveyors: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="container">
      <TitleOfPage title={t('purveyors')} route="purveyors" />
      <PurveyorsTable />
    </div>
  )
}

export { Purveyors }
