import { FC } from 'react'
import { BrandStore } from '@/app/store'
import { UiButton, UiInput } from '@/components'
import { Drawer, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { TCategoryFormData } from '@/features/queries/categories/categories.types'
import { useCreateBrand } from '@/features/queries/brands/brands.api'

const BrandsModal: FC = () => {
	const [form] = Form.useForm()
	const { t } = useTranslation()
	const { brandsModal, setBrandsModal } = BrandStore(s => s)
	const { mutate } = useCreateBrand()

	const handleClose = () => {
		setBrandsModal(false)
		form.resetFields()
	}

	const handleSubmit = async (values: TCategoryFormData) => {
		await mutate(values)
		await handleClose()
	}

	return (
		<Drawer
			placement='right'
			title={t('newBrands')}
			onClose={handleClose}
			open={brandsModal}
		>
			<Form layout='vertical' form={form} onFinish={handleSubmit}>
				<Form.Item
					name='name'
					label={t('brandsTableCol1')}
					rules={[{ required: true, message: t('brandsMessageRequired') }]}
				>
					<UiInput />
				</Form.Item>
				<UiButton>{t('add')}</UiButton>
			</Form>
		</Drawer>
	)
}

export { BrandsModal }
