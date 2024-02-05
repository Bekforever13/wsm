import { FC, useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { ColumnsType } from 'antd/es/table'
import { TCategory } from '@/features/queries'
import { UiTable } from '@/components/table/UiTable'
import { CompaniesStore } from '@/app/store/companiesStore'
import { CompaniesTableActions } from './CompaniesTableActions'
import { useGetCompanies } from '@/features/queries/company/companies.api'
import { CompaniesModal } from '@/features/modals/companies/CompaniesModal'

const CompaniesTable: FC = () => {
  const { t } = useTranslation()
  const { data: companiesData, isLoading } = useGetCompanies()
  const inputRef = useRef<HTMLInputElement>(null)
  const { companiesToEdit } = CompaniesStore((s) => s)
  const [newCompanyName, setNewCompanyName] = useState('')
  const [page, setPage] = useState(1)

  const columns: ColumnsType<TCategory> = [
    {
      title: t('companiesTableCol1'),
      dataIndex: 'name',
      render: (el, record) => {
        if (record.id === companiesToEdit?.id) {
          return (
            <input
              style={{ width: '100%', padding: '3px 6px', borderRadius: '5px' }}
              ref={inputRef}
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
              type="text"
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
        <CompaniesTableActions
          newCompanyName={newCompanyName}
          setNewCompanyName={setNewCompanyName}
          rec={rec}
        />
      ),
    },
  ]

  useEffect(() => inputRef.current?.focus(), [companiesToEdit?.id])

  return (
    <>
      <UiTable
        columns={columns}
        dataSource={companiesData?.data}
        loading={isLoading}
        pagination={{
          total: companiesData?.length,
          current: page,
          showSizeChanger: true,
          onChange: (e) => setPage(e),
        }}
        rowKey={(e) => e.id}
        scroll={{ x: true }}
        style={{ width: '100%' }}
        locale={{ emptyText: 'Нет данных' }}
      />
      <CompaniesModal />
    </>
  )
}

export { CompaniesTable }
