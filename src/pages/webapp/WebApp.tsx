import { FC, useEffect, useState } from 'react'
import { UiButton, UiInput } from '@/components'
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
  const [availableProducts, setAvailableProducts] = useState(0)

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
    if (storageData && productId) {
      const findProduct: any = storageData?.data?.find((el) => el.product.id === productId)

      if (findProduct) {
        alert(JSON.stringify(findProduct))
        setAvailableProducts(findProduct.quantity)
        form.setFieldValue('price', findProduct?.selling_price)
      }
    }
    // if (productId && productsData) {
    //   const findProduct: TProducts = productsData.data.find(
    //     (el: TProducts) => el.id === productId,
    //   ) as TProducts

    //   if (findProduct && userId) {
    //     form.setFieldValue('price', findProduct.selling_price)
    //   }
    // }
  }, [productId])

  return (
    <div className={styles.container}>
      <h2>Добавление продажи</h2>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
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
        <Form.Item
          name="company_id"
          label="Филиал"
          rules={[{ required: true, message: 'Выберите филиал!' }]}
        >
          <UiSelect options={companyOptions} placeholder="Филиал" />
        </Form.Item>
        <Form.Item name="price" label="Цена" rules={[{ required: true, message: 'Введите цену' }]}>
          <UiInput type="number" placeholder="Цена" />
        </Form.Item>
        <Form.Item
          name="quantity"
          label={`Количество. Доступно: ${availableProducts} штук`}
          rules={[{ required: true, message: 'Введите количество' }]}
        >
          <UiInput type="number" placeholder="Количество" />
        </Form.Item>
        <UiButton>Добавить</UiButton>
      </Form>
    </div>
  )
}

export { WebApp }
