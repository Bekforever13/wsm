import { FC, useEffect, useState } from 'react'
import { UiButton, UiInput } from '@/components'
import { DatePicker, Drawer, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { useGetProducts } from '@/features/queries/products/products.api'
import { UiSelect } from '@/components/select/UiSelect'
import { TransactionsStore } from '@/app/store/transactionsStore'
// import { useCreateTransactions } from '@/features/queries/transactions/transactions.api'
import { TTransactionsFormData } from '@/features/queries/transactions/transactions.types'
// import { formattedDate } from '@/shared/utils/Utils'
import { TProducts } from '@/features/queries/products/products.types'
import { useGetCompanies } from '@/features/queries/company/companies.api'
import { TCompany } from '@/features/queries/company/companies.types'

type TOptions = {
  label: string
  value: number
}

const TransactionsModal: FC = () => {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { transactionsModal, setTransactionsModal } = TransactionsStore((s) => s)
  // const { mutate: createTransactions } = useCreateTransactions()
  const { data: productsData } = useGetProducts()
  const { data: companyData } = useGetCompanies()
  const [productsOptions, setProductsOptions] = useState<TOptions[]>([])
  const [companyOptions, setCompanyOptions] = useState<TOptions[]>([])

  const paymentOptions = [
    { label: t('cash'), value: 1 },
    { label: t('plastic_card'), value: 2 },
    { label: t('credit'), value: 3 },
  ]

  const transactionsOptions = [
    { label: t('purchased'), value: 1 },
    { label: t('sales'), value: 2 },
  ]

  const handleClose = () => {
    setTransactionsModal(false)
    form.resetFields()
  }

  const handleSubmit = async (values: TTransactionsFormData) => {
    console.log(values)

    // await createTransactions({ ...values, date: formattedDate(values?.date) })
    await handleClose()
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
      open={transactionsModal}
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
          name="transaction_type"
          label={t('transactionsTableCol2')}
          rules={[{ required: true, message: t('transactionsMessageRequired3') }]}
        >
          <UiSelect options={transactionsOptions} placeholder={t('transactionsTableCol2')} />
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

export { TransactionsModal }
