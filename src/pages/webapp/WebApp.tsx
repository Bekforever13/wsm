import { FC, useEffect, useState } from 'react'
import { UiButton, UiInput, UiInputNumber } from '@/components'
import { Form } from 'antd'
import { UiSelect } from '@/components/select/UiSelect'
import { TTransactionsFormData } from '@/features/queries/transactions/transactions.types'
import { TCompany } from '@/features/queries/company/companies.types'
import styles from './WebApp.module.scss'
import {
  useCreateTelegramTransaction,
  useGetTelegramCompanies,
  useGetTelegramStorage,
} from '@/features/queries/webapp/webapp.api'
import { TStorage } from '@/features/queries'

type TOptions = {
  label: string
  value: number
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tg = window.Telegram.WebApp

const WebApp: FC = () => {
  const [form] = Form.useForm()
  const [productsOptions, setProductsOptions] = useState<TOptions[]>([])
  const [companyOptions, setCompanyOptions] = useState<TOptions[]>([])
  const [userId, setUserId] = useState<number>(0)
  const { data: companyData } = useGetTelegramCompanies(userId)
  const { data: storageData } = useGetTelegramStorage(userId)
  const { mutate: createTransaction } = useCreateTelegramTransaction()
  const [productId, setProductId] = useState(0)
  const [companyId, setCompanyId] = useState(0)
  const [availableProducts, setAvailableProducts] = useState<TStorage[]>()
  const [availableQuantity, setAvailableQuantity] = useState<number>()

  const paymentOptions = [
    { label: 'Наличка', value: 1 },
    { label: 'Пластик карта', value: 2 },
    { label: 'Кредит', value: 3 },
  ]

  useEffect(() => {
    // after user opens web app this code below will take users info and set id to userId state
    if (tg?.initData) {
      const decodedUrl = decodeURIComponent(tg?.initData)
      const paramsArray = decodedUrl.split('&')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = {}
      paramsArray.forEach((param) => {
        const [key, value] = param.split('=')
        data[key] = value
      })
      data.user = JSON.parse(decodeURIComponent(data.user))
      setUserId(data.user.id)
    }
  }, [tg?.initData])

  const handleSubmit = (values: TTransactionsFormData) => {
    createTransaction({ ...values, user_id: userId })
    form.resetFields()
    setProductId(0)
    setCompanyId(0)
    setProductsOptions([])
    setAvailableProducts(undefined)
    setAvailableQuantity(undefined)
  }

  useEffect(() => {
    if (companyData) {
      companyData.data.map((el: TCompany) =>
        setCompanyOptions((prev) => [...prev, { value: el.id, label: el.name }]),
      )
    }
  }, [companyData])

  useEffect(() => {
    setAvailableProducts(storageData?.data.filter((el) => el.company.id === companyId))
    if (availableProducts) {
      availableProducts?.map((el) =>
        setProductsOptions((prev) => [...prev, { value: el.product.id, label: el.product.name }]),
      )
    }
  }, [companyId, availableProducts?.length])

  useEffect(() => {
    const findProduct = availableProducts?.find((el) => el.product.id === productId)
    if (productId) {
      setAvailableQuantity(findProduct?.quantity)
      form.setFieldValue('price', findProduct?.product.selling_price)
    }
  }, [productId])

  return (
    <div className={styles.container}>
      <h2>Добавление продажи</h2>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="company_id"
          label="Филиал"
          rules={[{ required: true, message: 'Выберите филиал!' }]}
        >
          <UiSelect
            value={companyId}
            onSelect={(e) => setCompanyId(e)}
            options={companyOptions}
            placeholder="Филиал"
          />
        </Form.Item>
        <Form.Item
          name="product_id"
          label="Название товара"
          rules={[{ required: true, message: 'Введите название товара!' }]}
        >
          <UiSelect
            value={productId}
            onSelect={(e) => setProductId(e)}
            options={productsOptions}
            placeholder="Название товара"
          />
        </Form.Item>
        <Form.Item
          name="payment_type"
          label="Оплата"
          rules={[{ required: true, message: 'Выберите тип оплаты!' }]}
        >
          <UiSelect options={paymentOptions} placeholder="Оплата" />
        </Form.Item>
        <Form.Item name="price" label="Цена" rules={[{ required: true, message: 'Введите цену' }]}>
          <UiInput type="number" placeholder="Цена" />
        </Form.Item>
        <Form.Item
          name="quantity"
          label={`Количество. ${productId ? `Доступно: ${availableQuantity} штук` : ''}`}
          rules={[
            {
              required: true,
              message: 'Введите количество',
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
          <UiInputNumber min={0} max={availableQuantity} placeholder="Количество" />
        </Form.Item>
        <UiButton>Добавить</UiButton>
      </Form>
    </div>
  )
}

export { WebApp }
