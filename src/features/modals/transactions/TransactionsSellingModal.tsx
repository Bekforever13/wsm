import { FC, useEffect, useState } from 'react'
import { UiButton, UiInput, UiInputNumber } from '@/components'
import { Drawer, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { UiSelect } from '@/components/select/UiSelect'
import { TransactionsStore } from '@/app/store/transactionsStore'
import { TTransactionsFormData } from '@/features/queries/transactions/transactions.types'
import { useGetCompanies } from '@/features/queries/company/companies.api'
import { TCompany } from '@/features/queries/company/companies.types'
import { useCreateTransactionsSelling, useGetStorage } from '@/features/queries'

type TOptions = {
  label: string
  value: number
}

const TransactionsSellingModal: FC = () => {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { transactionsModalSelling, setTransactionsModalSelling } = TransactionsStore()
  const { mutate: createTransactions } = useCreateTransactionsSelling()
  const { data: companyData, isSuccess: companyDataSuccess } = useGetCompanies()
  const { data: storageData } = useGetStorage()
  const [productsOptions, setProductsOptions] = useState<TOptions[]>([])
  const [companyOptions, setCompanyOptions] = useState<TOptions[]>([])
  const [productId, setProductId] = useState<number | null>(null)
  const [companyId, setCompanyId] = useState<number | null>(null)
  const [availableQuantity, setAvailableQuantity] = useState<number>()

  const paymentOptions = [
    { label: t('cash'), value: 1 },
    { label: t('plastic_card'), value: 2 },
    { label: t('credit'), value: 3 },
  ]

  const handleClose = () => {
    setTransactionsModalSelling(false)
    form.resetFields()
    setProductId(0)
    setCompanyId(0)
    setProductsOptions([])
    setAvailableQuantity(undefined)
  }

  const handleSelectCompany = (e: number) => {
    setCompanyId(e)
    setProductId(null)
    form.setFieldValue('product_id', null)
    form.setFieldValue('price', null)
    form.setFieldValue('payment_type', null)
    form.setFieldValue('quantity', null)
  }

  const handleSubmit = (values: TTransactionsFormData) => {
    createTransactions(values)
    handleClose()
  }

  useEffect(() => {
    if (companyData) {
      companyData.data.map((el: TCompany) =>
        setCompanyOptions((prev) => [...prev, { value: el.id, label: el.name }]),
      )
    }
  }, [companyDataSuccess])

  // need to fix this code, because it renders a lot
  useEffect(() => {
    const availableProducts = storageData?.data.filter((el) => el.company.id === companyId)
    if (!productId) {
      availableProducts?.map((el) =>
        setProductsOptions((prev) => [...prev, { value: el.product.id, label: el.product.name }]),
      )
    }
    if (productId) {
      const findProduct = availableProducts?.find((el) => el.product.id === productId)
      setAvailableQuantity(findProduct?.quantity)
      form.setFieldValue('price', findProduct?.product.selling_price)
    }
    return () => {
      setProductsOptions([])
      setAvailableQuantity(0)
    }
  }, [companyId, productId])

  return (
    <Drawer
      placement="right"
      title={t('newTransactions')}
      onClose={handleClose}
      open={transactionsModalSelling}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="company_id"
          label={t('transactionsTableCol8')}
          rules={[{ required: true, message: t('transactionsMessageRequired8') }]}
        >
          <UiSelect
            value={companyId}
            onSelect={(e) => handleSelectCompany(e)}
            options={companyOptions}
            placeholder={t('transactionsTableCol8')}
          />
        </Form.Item>
        <Form.Item
          name="product_id"
          label={t('transactionsTableCol1')}
          rules={[{ required: true, message: t('transactionsMessageRequired1') }]}
        >
          <UiSelect
            value={productId}
            onSelect={(e) => setProductId(e)}
            options={productsOptions}
            placeholder={t('transactionsTableCol1')}
          />
        </Form.Item>
        <Form.Item
          name="payment_type"
          label={t('transactionsTableCol3')}
          rules={[{ required: true, message: t('transactionsMessageRequired2') }]}
        >
          <UiSelect options={paymentOptions} placeholder={t('transactionsTableCol3')} />
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
          label={`${t('transactionsTableCol5')}. ${
            productId ? `Доступно: ${availableQuantity ?? 0} штук` : ''
          }`}
          rules={[
            {
              required: true,
              message: t('transactionsMessageRequired5'),
            },
            () => ({
              validator(_, value) {
                if (value >= 1 && value <= availableQuantity!) {
                  return Promise.resolve()
                }
                return Promise.reject('Неверное количество.')
              },
            }),
          ]}
        >
          <UiInputNumber min={0} max={availableQuantity} placeholder={t('transactionsTableCol5')} />
        </Form.Item>
        <UiButton>{t('add')}</UiButton>
      </Form>
    </Drawer>
  )
}

export { TransactionsSellingModal }
