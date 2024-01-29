import { FC, useEffect, useState } from 'react'
import { UiButton, UiInput } from '@/components'
import { DatePicker, Drawer, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { useGetProducts } from '@/features/queries/products/products.api'
import { UiSelect } from '@/components/select/UiSelect'
import { TransactionsStore } from '@/app/store/transactionsStore'
import { TTransactionsFormData } from '@/features/queries/transactions/transactions.types'
import { formattedDate } from '@/shared/utils/Utils'
import { TProducts } from '@/features/queries/products/products.types'
import { useGetCompanies } from '@/features/queries/company/companies.api'
import { TCompany } from '@/features/queries/company/companies.types'
import { useCreateTransactionsIncome } from '@/features/queries'

type TOptions = {
  label: string
  value: number
}

const TransactionsIncomeModal: FC = () => {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { transactionsModalIncome, setTransactionsModalIncome } = TransactionsStore((s) => s)
  const { mutate: createTransactions } = useCreateTransactionsIncome()
  const { data: productsData } = useGetProducts()
  const { data: companyData } = useGetCompanies()
  const [productsOptions, setProductsOptions] = useState<TOptions[]>([])
  const [companyOptions, setCompanyOptions] = useState<TOptions[]>([])

  const paymentOptions = [
    { label: t('cash'), value: 1 },
    { label: t('plastic_card'), value: 2 },
    { label: t('credit'), value: 3 },
  ]

  const handleClose = () => {
    setTransactionsModalIncome(false)
    form.resetFields()
  }

  const handleSubmit = (values: TTransactionsFormData) => {
    createTransactions({ ...values, date: formattedDate(values?.date), payment_type: 1 })
    handleClose()
  }

  useEffect(() => {
    if (productsData) {
      productsData.data.map((el: TProducts) =>
        setProductsOptions((prev) => [...prev, { value: el.id, label: el.name }]),
      )
    }
  }, [productsData])

  useEffect(() => {
    if (companyData) {
      companyData.data.map((el: TCompany) =>
        setCompanyOptions((prev) => [...prev, { value: el.id, label: el.name }]),
      )
    }
  }, [companyData])

  return (
    <Drawer
      placement="right"
      title={t('newProducts')}
      onClose={handleClose}
      open={transactionsModalIncome}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="product_id"
          label={t('transactionsTableCol1')}
          rules={[{ required: true, message: t('transactionsMessageRequired1') }]}
        >
          <UiSelect options={productsOptions} placeholder={t('transactionsTableCol1')} />
        </Form.Item>
        <Form.Item
          name="payment_type"
          label={t('transactionsTableCol3')}
          rules={[{ required: true, message: t('transactionsMessageRequired2') }]}
        >
          <UiSelect options={paymentOptions} placeholder={t('transactionsTableCol3')} />
        </Form.Item>
        <Form.Item
          name="company_id"
          label={t('transactionsTableCol8')}
          rules={[{ required: true, message: t('transactionsMessageRequired8') }]}
        >
          <UiSelect options={companyOptions} placeholder={t('transactionsTableCol8')} />
        </Form.Item>
        <Form.Item
          name="price"
          label={t('transactionsTableCol4')}
          rules={[{ required: true, message: t('transactionsMessageRequired4') }]}
        >
          <UiInput type="number" placeholder={t('transactionsTableCol4')} />
        </Form.Item>
        <Form.Item
          name="from_whom"
          label={t('transactionsTableCol9')}
          rules={[{ required: true, message: t('transactionsMessageRequired2') }]}
        >
          <UiInput placeholder={t('transactionsTableCol9')} />
        </Form.Item>
        <Form.Item
          name="quantity"
          label={t('transactionsTableCol5')}
          rules={[{ required: true, message: t('transactionsMessageRequired5') }]}
        >
          <UiInput type="number" placeholder={t('transactionsTableCol5')} />
        </Form.Item>
        <Form.Item
          name="date"
          label={t('transactionsTableCol6')}
          rules={[{ required: true, message: t('transactionsMessageRequired6') }]}
        >
          <DatePicker showTime />
        </Form.Item>
        <UiButton>{t('add')}</UiButton>
      </Form>
    </Drawer>
  )
}

export { TransactionsIncomeModal }
