import { FC } from 'react'
import { Table } from 'antd/lib'
import { UiButton } from '@/components'
import { AiOutlineEdit } from 'react-icons/ai'
import { FaDeleteLeft } from 'react-icons/fa6'
import { UiPopconfirm } from '@/components/popConfirm/UiPopconfirm'
import styles from './TransactionsTable.module.scss'
import type { ColumnsType } from 'antd/es/table'
import { useTranslation } from 'react-i18next'

const TransactionsTable: FC = () => {
	const { t } = useTranslation()
	const handleDelete = () => {
		console.log('deleted')
	}
	const columns: ColumnsType<any> = [
		{
			title: t('transactionsTableCol1'),
			dataIndex: 'name',
		},
		{
			title: t('transactionsTableCol2'),
			dataIndex: 'name',
		},
		{
			title: t('transactionsTableCol3'),
			dataIndex: 'name',
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
			title: t('transactionsTableCol6'),
			dataIndex: 'name',
		},
		{
			title: t('actions'),
			dataIndex: 'actions',
			render: () => (
				<div className={styles.actions}>
					<UiButton>
						<AiOutlineEdit size='22' />
						{t('edit')}
					</UiButton>
					<UiPopconfirm title={t('beforeDelete')} onConfirm={handleDelete}>
						<UiButton style={{ background: 'red' }}>
							<FaDeleteLeft size='22' />
							{t('delete')}
							{/* <Delete route='courses' id={rec.id} /> */}
						</UiButton>
					</UiPopconfirm>
				</div>
			),
		},
	]

	return (
		<Table
			columns={columns}
			dataSource={[{}]}
			pagination={{
				total: 10,
				current: 1,
				showSizeChanger: false,
				defaultPageSize: 10,
				// onChange: e => setPage(e),
			}}
			rowKey={e => e.id}
			scroll={{ x: true }}
			size='small'
			bordered
		/>
	)
}

export { TransactionsTable }
