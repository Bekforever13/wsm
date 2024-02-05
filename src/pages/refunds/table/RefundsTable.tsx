import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ColumnsType } from 'antd/es/table'
import { UiTable } from '@/components/table/UiTable'
import { useGetRefunds } from '@/features/queries/refunds/refunds.api'
import { TRefund } from '@/features/queries/refunds/refunds.types'

const RefundsTable: FC = () => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const { data: refundsData, isLoading } = useGetRefunds()

  const columns: ColumnsType<TRefund> = [
    {
      title: t('companiesTableCol1'),
      dataIndex: 'product',
      render: (_, rec) => rec.company.name,
    },
    {
      title: t('productsTableCol1'),
      dataIndex: 'product',
      render: (_, rec) => rec.product.name,
    },
    {
      title: t('transactionsTableCol6'),
      dataIndex: 'date',
    },
  ]

  return (
    <UiTable
      columns={columns}
      dataSource={refundsData?.data}
      loading={isLoading}
      pagination={{
        total: 10,
        current: page,
        showSizeChanger: true,
        onChange: (e) => setPage(e),
      }}
      rowKey={(e) => e.id}
      scroll={{ x: true }}
      style={{ width: '100%' }}
      locale={{ emptyText: 'Нет данных' }}
    />
  )
}

export { RefundsTable }
