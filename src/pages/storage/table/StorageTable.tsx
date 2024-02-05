import { FC, useState } from 'react'
import type { ColumnsType } from 'antd/es/table'
import { useTranslation } from 'react-i18next'
import { UiTable } from '@/components/table/UiTable'
import {
  TProducts,
  useGetProducts,
  TCategory,
  useGetCategories,
  useGetStorage,
  TStorage,
} from '@/features/queries'
import { useGetCompanies } from '@/features/queries/company/companies.api'
import { TCompany } from '@/features/queries/company/companies.types'
import { ConfigProvider } from 'antd'
import ruRU from 'antd/es/locale/ru_RU'

const StorageTable: FC = () => {
  const { t } = useTranslation()
  const { data: storageData, isLoading } = useGetStorage()
  const { data: categoriesData } = useGetCategories()
  const { data: productsData } = useGetProducts()
  const { data: companiesData } = useGetCompanies()
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
      title: t('companiesTableCol1'),
      dataIndex: 'company',
      render: (_, rec) => rec.company.name,
      filters: companiesData?.data?.map((el: TCompany) => ({
        text: el.name,
        value: el.name,
      })),
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (el: unknown, rec) => rec.company.name.startsWith(el as string),
    },
    {
      title: t('storageTableCol2'),
      dataIndex: 'category',
      render: (_, rec) =>
        categoriesData?.data?.find((el: TCategory) => el.id === rec.product.category_id)?.name,
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
    <ConfigProvider locale={ruRU}>
      <UiTable
        columns={columns}
        dataSource={storageData?.data}
        loading={isLoading}
        pagination={{
          total: 10,
          current: page,
          showSizeChanger: true,
          onChange: (e) => setPage(e),
        }}
        scroll={{ x: true }}
        style={{ width: '100%' }}
        locale={{ emptyText: 'Нет данных' }}
        rowKey={(e) => e.id}
      />
    </ConfigProvider>
  )
}

export { StorageTable }
