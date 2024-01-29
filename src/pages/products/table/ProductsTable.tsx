import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { ColumnsType } from 'antd/es/table'
import { ProductsTableActions } from './ProductsTableActions'
import { UiTable } from '@/components/table/UiTable'
import { ProductsModal } from '@/features/modals'
import {
  TProducts,
  TBrand,
  TCategory,
  useGetCategories,
  useGetBrands,
  useGetProducts,
} from '@/features/queries'
import { formatPrice } from '@/shared/utils/Utils'

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
        categoriesData?.data.map((cat: TCategory) => (cat.id === rec.category_id ? cat.name : '')),
    },
    {
      title: t('productsTableCol3'),
      dataIndex: 'brand_id',
      render: (_, rec) =>
        brandsData?.data.map((brand: TBrand) => (brand.id === rec.brand_id ? brand.name : '')),
    },
    {
      title: t('productsTableCol3'),
      dataIndex: 'selling_price',
      render: (_, rec) => formatPrice(rec.selling_price) + ' сум',
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
          onChange: (e) => setPage(e),
        }}
        rowKey={(e) => e.id}
        scroll={{ x: true }}
        style={{ width: '100%' }}
        locale={{ emptyText: 'Нет данных' }}
      />
      <ProductsModal />
    </>
  )
}

export { ProductsTable }
