import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineEdit } from 'react-icons/ai'
import { FaDeleteLeft } from 'react-icons/fa6'
import { UiPopconfirm } from '@/components/popConfirm/UiPopconfirm'
import { UiButton } from '@/components'
import styles from './PurveyorsTable.module.scss'
import { TPurveyors } from '@/features/queries/purveyors/purveyors.types'
import { PurveyorsStore } from '@/app/store/purveyorsStore'
import { useDeletePurveyor } from '@/features/queries/purveyors/purveyors.api'

type Props = {
  rec: TPurveyors
}

const PurveyorsTableActions: FC<Props> = (props) => {
  const { rec } = props
  const { setPurveyorsToEdit, setPurveyorsModal } = PurveyorsStore()
  const { mutate: deleteProduct } = useDeletePurveyor()
  const { t } = useTranslation()

  const handleDelete = (id: number) => {
    deleteProduct(id)
  }

  const handleEdit = () => {
    setPurveyorsToEdit(rec)
    setPurveyorsModal(true)
  }

  return (
    <div className={styles.actions}>
      <UiButton onClick={handleEdit}>
        <AiOutlineEdit size="22" />
        {t('edit')}
      </UiButton>
      <UiPopconfirm title={t('beforeDelete')} onConfirm={() => handleDelete(rec.id)}>
        <UiButton style={{ background: 'red' }}>
          <FaDeleteLeft size="22" />
          {t('delete')}
        </UiButton>
      </UiPopconfirm>
    </div>
  )
}

export { PurveyorsTableActions }
