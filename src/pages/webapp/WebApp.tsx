import { FC, useEffect, useState } from 'react'
import { UiButton, UiInput } from '@/components'
import { DatePicker, Form } from 'antd'
import { useGetProducts } from '@/features/queries/products/products.api'
import { UiSelect } from '@/components/select/UiSelect'
import { TTransactionsFormData } from '@/features/queries/transactions/transactions.types'
import { formattedDate } from '@/shared/utils/Utils'
import { TProducts } from '@/features/queries/products/products.types'
import { useGetCompanies } from '@/features/queries/company/companies.api'
import { TCompany } from '@/features/queries/company/companies.types'
import styles from './WebApp.module.scss'

type TOptions = {
	label: string
	value: number
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const tg = window.Telegram.WebApp

const WebApp: FC = () => {
	const [form] = Form.useForm()
	const { data: productsData } = useGetProducts()
	const { data: companyData } = useGetCompanies()
	const [productsOptions, setProductsOptions] = useState<TOptions[]>([])
	const [companyOptions, setCompanyOptions] = useState<TOptions[]>([])
	// const [userId, setUserId] = useState<number | undefined>()

	const paymentOptions = [
		{ label: 'Наличка', value: 1 },
		{ label: 'Пластик карта', value: 2 },
		{ label: 'Кредит', value: 3 },
	]

	// useEffect(() => {
	// 	if (tg?.initData?.user?.id) {
	// 		setUserId(tg.initData.user.id)
	// 	}
	// }, [tg?.initData?.user?.id])

	const handleSubmit = (values: TTransactionsFormData) => {
		try {
			fetch('https://stockroom.karsoft.uz/api/transactions', {
				method: 'POST',
				headers: {
					Authorization:
						'Basic ' +
						btoa(
							tg?.initData?.user?.id +
								':' +
								'$2y$12$wBEIuKHscBbBcAbjuW5S2.6yp30krTRrzdikJ30vgLHw6Hzj7nD5y'
						),
				},
				body: JSON.stringify({
					...values,
					date: formattedDate(values?.date),
					transaction_type: 2,
				}),
			})
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (productsData) {
			productsData.data.map((el: TProducts) =>
				setProductsOptions(prev => [...prev, { value: el.id, label: el.name }])
			)
		}
	}, [productsData])

	useEffect(() => {
		if (companyData) {
			companyData.data.map((el: TCompany) =>
				setCompanyOptions(prev => [...prev, { value: el.id, label: el.name }])
			)
		}
	}, [companyData])
	return (
		<div className={styles.container}>
			<h2>Добавление продажи</h2>
			<button onClick={() => alert(tg?.initData?.user?.id)}>alert</button>
			{/* <p>{userId}</p> */}
			<Form layout='vertical' form={form} onFinish={handleSubmit}>
				<Form.Item
					name='product_id'
					label='Продукт'
					rules={[{ required: true, message: '' }]}
				>
					<UiSelect options={productsOptions} placeholder='Выберите продукт' />
				</Form.Item>
				<Form.Item
					name='payment_type'
					label='Тип оплаты'
					rules={[{ required: true, message: 'Выберите тип оплаты' }]}
				>
					<UiSelect options={paymentOptions} placeholder='Тип оплаты' />
				</Form.Item>
				<Form.Item
					name='company_id'
					label='Компания'
					rules={[{ required: true, message: 'Выберите компанию' }]}
				>
					<UiSelect options={companyOptions} placeholder='Выберите компанию' />
				</Form.Item>
				<Form.Item
					name='price'
					label='Цена'
					rules={[{ required: true, message: 'Введите цену' }]}
				>
					<UiInput type='number' disabled placeholder='' />
				</Form.Item>
				<Form.Item
					name='quantity'
					label='Количество'
					rules={[{ required: true, message: '' }]}
				>
					<UiInput type='number' placeholder='Введите количество' />
				</Form.Item>
				<Form.Item
					name='date'
					label='Дата'
					rules={[{ required: true, message: 'Выберите дату' }]}
				>
					<DatePicker style={{ width: '100%' }} showTime />
				</Form.Item>
				<UiButton>Добавить</UiButton>
			</Form>
		</div>
	)
}

export { WebApp }
