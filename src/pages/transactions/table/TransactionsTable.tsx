import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ColumnsType } from 'antd/es/table'
import { UiTable } from '@/components/table/UiTable'
import { TransactionsModal } from '@/features/modals'
import { TTransactions, useGetTransactions } from '@/features/queries'
import { formatPrice } from '@/shared/utils/Utils'

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
			render: (_, rec) => formatPrice(rec.price),
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
