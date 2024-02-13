import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineEdit } from 'react-icons/ai'
import { FaDeleteLeft } from 'react-icons/fa6'
import { UiPopconfirm } from '@/components/popConfirm/UiPopconfirm'
import { UiButton } from '@/components'
import styles from './ClientsTable.module.scss'
import { TClient } from '@/features/queries/clients/clients.types'
import { ClientsStore } from '@/app/store/clientsStore'
import { useDeleteClient } from '@/features/queries/clients/clients.api'

type Props = {
  rec: TClient
}

const ClientsTableActions: FC<Props> = (props) => {
  const { rec } = props
  const { setClientToEdit, setClientsModal } = ClientsStore()
  const { mutate: deleteProduct } = useDeleteClient()
  const { t } = useTranslation()

  const handleDelete = (id: number) => {
    deleteProduct(id)
  }

  const handleEdit = () => {
    setClientToEdit(rec)
    setClientsModal(true)
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

export { ClientsTableActions }
