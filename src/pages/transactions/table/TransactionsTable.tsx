import { FC, useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { useTranslation } from 'react-i18next'
import { UiTable } from '@/components/table/UiTable'
import { useGetTransactions } from '@/features/queries/transactions/transactions.api'
import { TransactionsTableActions } from './TransactionsTableActions'
import { TransactionsModal } from '@/features/modals/transactions/TransactionsModal'
import { TTransactions } from '@/features/queries/transactions/transactions.types'

const TransactionsTable: FC = () => {
	const { t } = useTranslation()
	const { data: transactionsData } = useGetTransactions()
	const [page, setPage] = useState(1)

	const columns: ColumnsType<TTransactions> = [
		{
			title: t('transactionsTableCol1'),
			dataIndex: 'product',
			render: (_, rec) => rec.product.name,
		},
		{
			title: t('transactionsTableCol2'),
			dataIndex: 'transactions_type',
			render: (_, rec) =>
				rec.transaction_type.name === 'purchased' ? t('purchased') : t('sales'),
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
			title: t('transactionsTableCol4'),
			dataIndex: 'price',
		},
		{
			title: t('transactionsTableCol5'),
			dataIndex: 'quantity',
		},
		{
			title: t('actions'),
			dataIndex: 'actions',
			render: (_, rec) => <TransactionsTableActions rec={rec} />,
		},
	]

	return (
		<>
			<UiTable
				columns={columns}
				dataSource={transactionsData?.data}
				pagination={{
					total: transactionsData?.data.length,
					current: page,
					showSizeChanger: false,
					defaultPageSize: 10,
					onChange: e => setPage(e),
				}}
				rowKey={e => e.id}
			/>
			<TransactionsModal />
		</>
	)
}

export { TransactionsTable }
