import { FC, useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { ColumnsType } from 'antd/es/table'
import { CategoriesTableActions } from './CategoriesTableActions'
import { TCategory, useGetCategories } from '@/features/queries'
import { UiTable } from '@/components/table/UiTable'
import { CategoriesStore } from '@/app/store'
import { CategoriesModal } from '@/features/modals'

const CategoriesTable: FC = () => {
	const { t } = useTranslation()
	const { data: categoriesData, isLoading } = useGetCategories()
	const inputRef = useRef<HTMLInputElement>(null)
	const { categoriesToEdit } = CategoriesStore(s => s)
	const [newCategoryName, setNewCategoryName] = useState('')
	const [page, setPage] = useState(1)

	const columns: ColumnsType<TCategory> = [
		{
			title: t('categoriesTableCol1'),
			dataIndex: 'name',
			render: (el, record) => {
				if (record.id === categoriesToEdit?.id) {
					return (
						<input
							style={{ width: '100%', padding: '3px 6px', borderRadius: '5px' }}
							ref={inputRef}
							value={newCategoryName}
							onChange={e => setNewCategoryName(e.target.value)}
							type='text'
						/>
					)
				} else {
					return el
				}
			},
		},
		{
			title: t('actions'),
			dataIndex: 'actions',
			render: (_, rec) => (
				<CategoriesTableActions
					newCategoryName={newCategoryName}
					setNewCategoryName={setNewCategoryName}
					rec={rec}
				/>
			),
		},
	]

	useEffect(() => inputRef.current?.focus(), [categoriesToEdit?.id])

	return (
		<>
			<UiTable
				columns={columns}
				dataSource={categoriesData?.data}
				loading={isLoading}
				pagination={{
					total: categoriesData?.length,
					current: page,
					showSizeChanger: false,
					defaultPageSize: 10,
					onChange: e => setPage(e),
				}}
				rowKey={e => e.id}
			/>
			<CategoriesModal />
		</>
	)
}

export { CategoriesTable }
