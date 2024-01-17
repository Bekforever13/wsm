import { FC, useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { useTranslation } from 'react-i18next'
import { UiTable } from '@/components/table/UiTable'
import { ProductsTableActions } from './ProductsTableActions'
import { useGetProducts } from '@/features/queries/products/products.api'
import { useGetBrands } from '@/features/queries/brands/brands.api'
import { useGetCategories } from '@/features/queries/categories/categories.api'
import { TCategory } from '@/features/queries/categories/categories.types'
import { TProducts } from '@/features/queries/products/products.types'
import { TBrand } from '@/features/queries/brands/brands.types'
import { ProductsModal } from '@/features/modals/products/ProductsModal'

const ProductsTable: FC = () => {
	const { t } = useTranslation()
	const [page, setPage] = useState(1)
	const { data: productsData, isLoading } = useGetProducts()
	const { data: brandsData } = useGetBrands()
	const { data: categoriesData } = useGetCategories()

	const columns: ColumnsType<TProducts> = [
		{
			title: t('productsTableCol1'),
			dataIndex: 'name',
		},
		{
			title: t('productsTableCol2'),
			dataIndex: 'category_id',
			render: (_, rec) =>
				categoriesData?.data.map((cat: TCategory) =>
					cat.id === rec.category_id ? cat.name : ''
				),
		},
		{
			title: t('productsTableCol3'),
			dataIndex: 'brand_id',
			render: (_, rec) =>
				brandsData?.data.map((brand: TBrand) =>
					brand.id === rec.brand_id ? brand.name : ''
				),
		},
		{
			title: t('actions'),
			dataIndex: 'actions',
			render: (_, rec) => <ProductsTableActions rec={rec} />,
		},
	]

	return (
		<>
			<UiTable
				columns={columns}
				dataSource={productsData?.data}
				loading={isLoading}
				pagination={{
					total: productsData?.length,
					current: page,
					showSizeChanger: false,
					defaultPageSize: 10,
					onChange: e => setPage(e),
				}}
				rowKey={e => e.id}
			/>
			<ProductsModal />
		</>
	)
}

export { ProductsTable }
