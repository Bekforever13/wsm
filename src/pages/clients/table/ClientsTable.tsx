import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ColumnsType } from 'antd/es/table'
import { ClientsTableActions } from './ClientsTableActions'
import { UiTable } from '@/components/table/UiTable'
import { useGetClients } from '@/features/queries/clients/clients.api'
import { TClient } from '@/features/queries/clients/clients.types'
import { ClientsModal } from '@/features/modals/clients/ClientsModal'

const ClientsTable: FC = () => {
  const { t } = useTranslation()
  const { data: categoriesData, isLoading } = useGetClients()
  const [page, setPage] = useState(1)

  const columns: ColumnsType<TClient> = [
    {
      title: t('clientsTableCol1'),
      dataIndex: 'name',
    },
    {
      title: t('clientsTableCol2'),
      dataIndex: 'phone',
    },
    {
      title: t('clientsTableCol3'),
      dataIndex: 'description',
    },
    {
      title: t('clientsTableCol4'),
      dataIndex: 'debt_total_sum',
    },
    {
      title: t('actions'),
      dataIndex: 'actions',
      render: (_, rec) => <ClientsTableActions rec={rec} />,
    },
  ]

  return (
    <>
      <UiTable
        columns={columns}
        dataSource={categoriesData?.data}
        loading={isLoading}
        pagination={{
          total: categoriesData?.length,
          current: page,
          showSizeChanger: true,
          onChange: (e) => setPage(e),
        }}
        rowKey={(e) => e.id}
        scroll={{ x: true }}
        style={{ width: '100%' }}
        locale={{ emptyText: 'Нет данных' }}
      />
      <ClientsModal />
    </>
  )
}

export { ClientsTable }
