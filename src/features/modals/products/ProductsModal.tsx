import { FC, useEffect, useState } from 'react'
import { ProductsStore } from '@/app/store'
import { UiButton, UiInput } from '@/components'
import { Drawer, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import {
	useCreateProduct,
	useEditProduct,
} from '@/features/queries/products/products.api'
import { TProductsFormData } from '@/features/queries/products/products.types'
import { UiSelect } from '@/components/select/UiSelect'
import { useGetCategories } from '@/features/queries/categories/categories.api'
import { useGetBrands } from '@/features/queries/brands/brands.api'
import { TCategory } from '@/features/queries/categories/categories.types'

type Options = {
	label: string
	value: number
}

const ProductsModal: FC = () => {
	const [form] = Form.useForm()
	const { t } = useTranslation()
	const { productsModal, setProductsModal, productsToEdit, setProductsToEdit } =
		ProductsStore(s => s)
	const { mutate: createProduct } = useCreateProduct()
	const { mutate: editProduct } = useEditProduct()
	const { data: categoriesData } = useGetCategories()
	const { data: brandsData } = useGetBrands()
	const [brandsOptions, setBrandsOptions] = useState<Options[]>([])
	const [categoriesOptions, setCategoriesOptions] = useState<Options[]>([])

	const handleClose = () => {
		setProductsModal(false)
		setProductsToEdit(null)
		form.resetFields()
	}

	const handleSubmit = async (values: TProductsFormData) => {
		if (productsToEdit?.id) {
			await editProduct({ id: productsToEdit?.id, ...values })
			await handleClose()
		} else {
			await createProduct(values)
			await handleClose()
		}
	}

	useEffect(() => {
		if (productsToEdit) {
			form.setFieldValue('name', productsToEdit.name)
			form.setFieldValue('category_id', productsToEdit.category_id)
			form.setFieldValue('brand_id', productsToEdit.brand_id)
		}
	}, [productsToEdit])

	useEffect(() => {
		if (categoriesData) {
			categoriesData.data.map((el: TCategory) =>
				setCategoriesOptions(prev => [
					...prev,
					{ value: el.id, label: el.name },
				])
			)
		}
	}, [categoriesData])

	useEffect(() => {
		if (brandsData) {
			brandsData.data.map((el: TCategory) =>
				setBrandsOptions(prev => [...prev, { value: el.id, label: el.name }])
			)
		}
	}, [brandsData])

	return (
		<Drawer
			placement='right'
			title={t('newProducts')}
			onClose={handleClose}
			open={productsModal}
		>
			<Form layout='vertical' form={form} onFinish={handleSubmit}>
				<Form.Item
					name='name'
					label={t('productsTableCol1')}
					rules={[{ required: true, message: t('productsMessageRequired1') }]}
				>
					<UiInput placeholder={t('name')} />
				</Form.Item>
				<Form.Item
					name='category_id'
					label={t('productsTableCol2')}
					rules={[{ required: true, message: t('productsMessageRequired2') }]}
				>
					<UiSelect placeholder={t('select')} options={categoriesOptions} />
				</Form.Item>
				<Form.Item
					name='brand_id'
					label={t('productsTableCol3')}
					rules={[{ required: true, message: t('productsMessageRequired3') }]}
				>
					<UiSelect placeholder={t('select')} options={brandsOptions} />
				</Form.Item>
				<UiButton>{productsToEdit ? t('save') : t('add')}</UiButton>
			</Form>
		</Drawer>
	)
}

export { ProductsModal }
