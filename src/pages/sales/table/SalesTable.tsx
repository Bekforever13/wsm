import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ColumnsType } from 'antd/es/table'
import { UiTable } from '@/components/table/UiTable'
import { TransactionsSellingModal } from '@/features/modals'
import { TTransactionsSelling, useGetTransactionsSelling } from '@/features/queries'
import { formatPrice } from '@/shared/utils/Utils'
import { TransactionsStore } from '@/app/store/transactionsStore'

const SalesTable: FC = () => {
  const { t } = useTranslation()
  const { transactionsBranch } = TransactionsStore()
  const { data: sellingData, isLoading: loadingSelling } =
    useGetTransactionsSelling(transactionsBranch)
  const [page, setPage] = useState(1)

  const sellingColumns: ColumnsType<TTransactionsSelling> = [
    {
      title: t('transactionsTableCol1'),
      dataIndex: 'product',
      render: (_, rec) => rec.product.name,
    },
    {
      title: t('transactionsTableCol3'),
      dataIndex: 'payment_type',
      render: (_, rec) => {
        if (rec.payment_type.name === 'cash') {
          return t('cash')
        } else if (rec.payment_type.name === 'plastic_card') {
          return t('plastic_card')
        }
        return t('credit')
      },
    },
    {
      title: t('companiesTableCol1'),
      dataIndex: 'company',
      render: (_, rec) => rec.company.name,
    },
    {
      title: t('transactionsTableCol4'),
      dataIndex: 'price',
      render: (_, rec) => formatPrice(rec.price),
    },
    {
      title: t('transactionsTableCol5'),
      dataIndex: 'quantity',
    },
    {
      title: t('transactionsTableCol7'),
      dataIndex: 'total',
      render: (_, rec) => formatPrice(rec.total),
    },
  ]

  return (
    <>
      <UiTable
        columns={sellingColumns}
        dataSource={sellingData?.data}
        loading={loadingSelling}
        pagination={{
          total: 1,
          current: page,
          showSizeChanger: false,
          defaultPageSize: 10,
          onChange: (e) => setPage(e),
        }}
        scroll={{ x: true }}
        style={{ width: '100%' }}
        locale={{ emptyText: 'Нет данных' }}
        rowKey={(e) => e.id}
      />
      <TransactionsSellingModal />
    </>
  )
}

export { SalesTable }