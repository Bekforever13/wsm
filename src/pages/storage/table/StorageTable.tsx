import { FC, useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { useTranslation } from 'react-i18next'
import { UiTable } from '@/components/table/UiTable'
import {
	TProducts,
	useGetProducts,
	TBrand,
	TCategory,
	useGetBrands,
	useGetCategories,
	useGetStorage,
	TStorage,
} from '@/features/queries'

const StorageTable: FC = () => {
	const { t } = useTranslation()
	const { data: storageData } = useGetStorage()
	const { data: categoriesData } = useGetCategories()
	const { data: brandsData } = useGetBrands()
	const { data: productsData } = useGetProducts()
	const [page, setPage] = useState(1)

	const columns: ColumnsType<TStorage> = [
		{
			title: t('storageTableCol1'),
			dataIndex: 'name',
			render: (_, rec) => rec.product.name,
			filters: productsData?.data?.map((el: TProducts) => ({
				text: el.name,
				value: el.name,
			})),
			filterMode: 'tree',
			filterSearch: true,
			onFilter: (el: unknown, rec) => rec.product.name.startsWith(el as string),
		},
		{
			title: t('storageTableCol2'),
			dataIndex: 'category',
			render: (_, rec) =>
				categoriesData?.data?.find(
					(el: TCategory) => el.id === rec.product.category_id
				)?.name,
			filters: categoriesData?.data?.map((el: TCategory) => ({
				text: el.name,
				value: el.name,
			})),
			filterMode: 'tree',
			filterSearch: true,
			onFilter: (el: unknown, rec) =>
				categoriesData?.data
					?.find((el: TCategory) => el.id === rec.product.category_id)
					?.name.startsWith(el),
		},
		{
			title: t('storageTableCol3'),
			dataIndex: 'brand',
			render: (_, rec) =>
				brandsData?.data?.find((el: TBrand) => el.id === rec.product.brand_id)
					?.name,
			filters: brandsData?.data?.map((el: TProducts) => ({
				text: el.name,
				value: el.name,
			})),
			filterMode: 'tree',
			filterSearch: true,
			onFilter: (el: unknown, rec) =>
				brandsData?.data
					?.find((el: TBrand) => el.id === rec.product.brand_id)
					?.name.startsWith(el),
		},
		{
			title: t('storageTableCol4'),
			dataIndex: 'purchased',
		},
		{
			title: t('storageTableCol5'),
			dataIndex: 'sales',
		},
		{
			title: t('storageTableCol6'),
			dataIndex: 'quantity',
		},
	]

	return (
		<UiTable
			columns={columns}
			dataSource={storageData?.data}
			pagination={{
				total: 10,
				current: page,
				showSizeChanger: false,
				defaultPageSize: 10,
				onChange: e => setPage(e),
			}}
			rowKey={e => e.id}
		/>
	)
}

export { StorageTable }
