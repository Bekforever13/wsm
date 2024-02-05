import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ColumnsType } from 'antd/es/table'
import { UiTable } from '@/components/table/UiTable'
import { TransactionsIncomeModal } from '@/features/modals'
import { TTransactionsIncome, useGetTransactionsIncome } from '@/features/queries'
import { formatPrice } from '@/shared/utils/Utils'
import { TransactionsStore } from '@/app/store/transactionsStore'

const IncomesTable: FC = () => {
  const { t } = useTranslation()
  const { transactionsBranch } = TransactionsStore()
  const { data: incomeData, isLoading: loadingIncome } =
    useGetTransactionsIncome(transactionsBranch)

  const [page, setPage] = useState(1)

  const incomeColumns: ColumnsType<TTransactionsIncome> = [
    {
      title: t('transactionsTableCol1'),
      dataIndex: 'product',
      render: (_, rec) => rec.product.name,
      filters: incomeData?.data?.map((el: TTransactionsIncome) => ({
        text: el.product.name,
        value: el.product.name,
      })),
      filterSearch: true,
      onFilter: (el, rec) => rec.product.name.startsWith(el as string),
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
      filters: [
        { text: 'Наличка', value: 'cash' },
        { text: 'Пластик карта', value: 'plastic_card' },
        { text: 'Кредит', value: 'credit' },
      ],
      filterSearch: true,
      onFilter: (el, rec) => rec.payment_type.name.startsWith(el as string),
    },
    {
      title: t('transactionsTableCol9'),
      dataIndex: 'from_whom',
      filterSearch: false,
      filters: incomeData?.data.map((el: TTransactionsIncome) => ({
        text: el.from_whom,
        value: el.from_whom,
      })),
      onFilter: (el, rec) => rec.from_whom.startsWith(el as string),
    },
    {
      title: t('transactionsTableCol4'),
      dataIndex: 'price',
      render: (_, rec) => `${formatPrice(rec.price)} сум`,
    },
    {
      title: t('transactionsTableCol5'),
      dataIndex: 'quantity',
    },
    {
      title: t('transactionsTableCol6'),
      dataIndex: 'date',
    },
    {
      title: t('transactionsTableCol7'),
      dataIndex: 'total',
      render: (_, rec) => `${formatPrice(rec.total)} сум`,
    },
  ]

  return (
    <>
      <UiTable
        columns={incomeColumns}
        dataSource={incomeData?.data}
        loading={loadingIncome}
        pagination={{
          total: incomeData?.data.length,
          current: page,
          showSizeChanger: true,
          onChange: (e) => setPage(e),
        }}
        scroll={{ x: true }}
        style={{ width: '100%' }}
        locale={{ emptyText: 'Нет данных' }}
        rowKey={(e) => e.id}
      />
      <TransactionsIncomeModal />
    </>
  )
}

export { IncomesTable }
