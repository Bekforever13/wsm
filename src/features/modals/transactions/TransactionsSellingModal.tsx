import { FC, useEffect, useState } from 'react'
import { UiButton, UiInput } from '@/components'
import { Drawer, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { useGetProducts } from '@/features/queries/products/products.api'
import { UiSelect } from '@/components/select/UiSelect'
import { TransactionsStore } from '@/app/store/transactionsStore'
import { TTransactionsFormData } from '@/features/queries/transactions/transactions.types'
import { TProducts } from '@/features/queries/products/products.types'
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
  const { data: productsData } = useGetProducts()
  const { data: companyData } = useGetCompanies()
  const { data: storageData } = useGetStorage()
  const [productsOptions, setProductsOptions] = useState<TOptions[]>([])
  const [companyOptions, setCompanyOptions] = useState<TOptions[]>([])
  const [productId, setProductId] = useState(0)
  const [availableProducts, setAvailableProducts] = useState(0)

  const paymentOptions = [
    { label: t('cash'), value: 1 },
    { label: t('plastic_card'), value: 2 },
    { label: t('credit'), value: 3 },
  ]

  const handleClose = () => {
    setTransactionsModalSelling(false)
    form.resetFields()
  }

  const handleSubmit = (values: TTransactionsFormData) => {
    createTransactions({ ...values, payment_type: 2 })
    handleClose()
  }

  useEffect(() => {
    if (storageData) {
      storageData?.data?.map((el) =>
        setProductsOptions((prev) => [...prev, { value: el.product.id, label: el.product.name }]),
      )
    }
  }, [storageData])

  useEffect(() => {
    if (companyData) {
      companyData.data.map((el: TCompany) =>
        setCompanyOptions((prev) => [...prev, { value: el.id, label: el.name }]),
      )
    }
  }, [companyData])

  useEffect(() => {
    const findProduct: TProducts = productsData?.data?.find((el: TProducts) => el.id === productId)
    const findAvailable = storageData?.data?.find((el) => el.product.id === productId)

    if (findAvailable) {
      setAvailableProducts(findAvailable.quantity)
    }

    if (findProduct && transactionsModalSelling) {
      form.setFieldValue('price', findProduct.selling_price)
    }
  }, [productId])

  return (
    <Drawer
      placement="right"
      title={t('newTransactions')}
      onClose={handleClose}
      open={transactionsModalSelling}
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
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
          label={`${t('transactionsTableCol5')}. Доступно: ${availableProducts} штук`}
          rules={[{ required: true, message: t('transactionsMessageRequired5') }]}
        >
          <UiInput type="number" placeholder={t('transactionsTableCol5')} />
        </Form.Item>
        <UiButton>{t('add')}</UiButton>
      </Form>
    </Drawer>
  )
}

export { TransactionsSellingModal }
