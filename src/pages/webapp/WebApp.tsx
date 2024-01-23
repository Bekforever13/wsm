import { FC, useEffect, useState } from 'react'
import { UiButton, UiInput } from '@/components'
import { DatePicker, Form } from 'antd'
import { UiSelect } from '@/components/select/UiSelect'
import { TTransactionsFormData } from '@/features/queries/transactions/transactions.types'
import { TProducts } from '@/features/queries/products/products.types'
import { TCompany } from '@/features/queries/company/companies.types'
import styles from './WebApp.module.scss'
import {
  useGetTelegramCompanies,
  useGetTelegramProducts,
} from '@/features/queries/webapp/webapp.api'
import { WebappStore } from '@/app/store/webappStore'

type TOptions = {
  label: string
  value: number
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const tg = window.Telegram.WebApp

const WebApp: FC = () => {
  const [form] = Form.useForm()
  const { data: productsData } = useGetTelegramProducts()
  const { data: companyData } = useGetTelegramCompanies()
  const [productsOptions, setProductsOptions] = useState<TOptions[]>([])
  const [companyOptions, setCompanyOptions] = useState<TOptions[]>([])
  const { setWebappUserID, webappUserId } = WebappStore((s) => s)

  const paymentOptions = [
    { label: 'Наличка', value: 1 },
    { label: 'Пластик карта', value: 2 },
    { label: 'Кредит', value: 3 },
  ]

  useEffect(() => {
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
      setWebappUserID(data.user.id)
    }
  }, [tg?.initData])

  const handleSubmit = (values: TTransactionsFormData) => {
    alert(values)
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
    <div className={styles.container}>
      <h2>Добавление продажи</h2>
      <button onClick={() => alert(webappUserId)}>alert</button>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item name="product_id" label="Продукт" rules={[{ required: true, message: '' }]}>
          <UiSelect options={productsOptions} placeholder="Выберите продукт" />
        </Form.Item>
        <Form.Item
          name="payment_type"
          label="Тип оплаты"
          rules={[{ required: true, message: 'Выберите тип оплаты' }]}
        >
          <UiSelect options={paymentOptions} placeholder="Тип оплаты" />
        </Form.Item>
        <Form.Item
          name="company_id"
          label="Компания"
          rules={[{ required: true, message: 'Выберите компанию' }]}
        >
          <UiSelect options={companyOptions} placeholder="Выберите компанию" />
        </Form.Item>
        <Form.Item name="price" label="Цена" rules={[{ required: true, message: 'Введите цену' }]}>
          <UiInput type="number" disabled placeholder="" />
        </Form.Item>
        <Form.Item name="quantity" label="Количество" rules={[{ required: true, message: '' }]}>
          <UiInput type="number" placeholder="Введите количество" />
        </Form.Item>
        <Form.Item name="date" label="Дата" rules={[{ required: true, message: 'Выберите дату' }]}>
          <DatePicker style={{ width: '100%' }} showTime />
        </Form.Item>
        <UiButton>Добавить</UiButton>
      </Form>
    </div>
  )
}

export { WebApp }
