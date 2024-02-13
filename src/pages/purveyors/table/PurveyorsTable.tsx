import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ColumnsType } from 'antd/es/table'
import { PurveyorsTableActions } from './PurveyorsTableActions'
import { UiTable } from '@/components/table/UiTable'
import { PurveyorsModal } from '@/features/modals'
import { useGetPurveyors } from '@/features/queries/purveyors/purveyors.api'
import { TPurveyors } from '@/features/queries/purveyors/purveyors.types'

const PurveyorsTable: FC = () => {
  const { t } = useTranslation()
  const { data: categoriesData, isLoading } = useGetPurveyors()
  const [page, setPage] = useState(1)

  const columns: ColumnsType<TPurveyors> = [
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
      title: t('actions'),
      dataIndex: 'actions',
      render: (_, rec) => <PurveyorsTableActions rec={rec} />,
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
      <PurveyorsModal />
    </>
  )
}

export { PurveyorsTable }
