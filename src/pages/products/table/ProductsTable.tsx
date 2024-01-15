import { FC } from 'react'
import { Table } from 'antd/lib'
import { UiButton } from '@/shared/ui'
import { AiOutlineEdit } from 'react-icons/ai'
import { FaDeleteLeft } from 'react-icons/fa6'
import { UiPopconfirm } from '@/shared/ui/popConfirm/UiPopconfirm'
import styles from './ProductsTable.module.scss'
import type { ColumnsType } from 'antd/es/table'

const ProductsTable: FC = () => {
	const handleDelete = () => {
		console.log('deleted')
	}
	const columns: ColumnsType<any> = [
		{
			title: 'Название товара',
			dataIndex: 'name',
		},
		{
			title: 'Тип транзакции',
			dataIndex: 'name',
		},
		{
			title: 'Оплата',
			dataIndex: 'name',
		},
		{
			title: 'Цена',
			dataIndex: 'price',
		},
		{
			title: 'Количество',
			dataIndex: 'quantity',
		},
		{
			title: 'Участник',
			dataIndex: 'name',
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			render: () => (
				<div className={styles.actions}>
					<UiButton>
						<AiOutlineEdit size='22' />
						Изменить
					</UiButton>
					<UiPopconfirm
						title='Вы действительно хотите удалить?'
						onConfirm={handleDelete}
					>
						<UiButton style={{ background: 'red' }}>
							<FaDeleteLeft size='22' />
							Удалить
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

export { ProductsTable }
