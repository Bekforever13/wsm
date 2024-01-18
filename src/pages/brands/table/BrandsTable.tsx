import { FC, useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { ColumnsType } from 'antd/es/table'
import { UiTable } from '@/components/table/UiTable'
import { BrandStore } from '@/app/store'
import { useGetBrands, TBrand } from '@/features/queries'
import { BrandsModal } from '@/features/modals'
import { BrandsTableActions } from './BrandsTableActions'

const BrandsTable: FC = () => {
	const { t } = useTranslation()
	const { data: brandsData, isLoading } = useGetBrands()
	const inputRef = useRef<HTMLInputElement>(null)
	const { brandsToEdit } = BrandStore(s => s)
	const [newBrandName, setNewBrandName] = useState('')
	const [page, setPage] = useState(1)

	const columns: ColumnsType<TBrand> = [
		{
			title: t('categoriesTableCol1'),
			dataIndex: 'name',
			render: (el, record) => {
				if (record.id === brandsToEdit?.id) {
					return (
						<input
							style={{ width: '100%', padding: '3px 6px', borderRadius: '5px' }}
							ref={inputRef}
							value={newBrandName}
							onChange={e => setNewBrandName(e.target.value)}
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
				<BrandsTableActions
					newBrandName={newBrandName}
					setNewBrandName={setNewBrandName}
					rec={rec}
				/>
			),
		},
	]

	useEffect(() => inputRef.current?.focus(), [brandsToEdit?.id])

	return (
		<>
			<UiTable
				columns={columns}
				dataSource={brandsData?.data}
				loading={isLoading}
				pagination={{
					total: brandsData?.length,
					current: page,
					showSizeChanger: false,
					defaultPageSize: 10,
					onChange: e => setPage(e),
				}}
				rowKey={e => e.id}
			/>
			<BrandsModal />
		</>
	)
}

export { BrandsTable }
