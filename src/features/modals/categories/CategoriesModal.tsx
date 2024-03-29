import { FC } from 'react'
import { CategoriesStore } from '@/app/store'
import { UiButton, UiInput } from '@/components'
import { useCreateCategory } from '@/features/queries/categories/categories.api'
import { Drawer, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { TCategoryFormData } from '@/features/queries/categories/categories.types'

const CategoriesModal: FC = () => {
	const [form] = Form.useForm()
	const { t } = useTranslation()
	const { categoriesModal, setCategoriesModal } = CategoriesStore(s => s)
	const { mutate } = useCreateCategory()

	const handleClose = () => {
		setCategoriesModal(false)
		form.resetFields()
	}

	const handleSubmit = async (values: TCategoryFormData) => {
		await mutate(values)
		await handleClose()
	}

	return (
		<Drawer
			placement='right'
			title={t('newCategory')}
			onClose={handleClose}
			open={categoriesModal}
		>
			<Form layout='vertical' form={form} onFinish={handleSubmit}>
				<Form.Item
					name='name'
					label={t('categoriesTableCol1')}
					rules={[{ required: true, message: t('categoryMessageRequired') }]}
				>
					<UiInput />
				</Form.Item>
				<UiButton>{t('add')}</UiButton>
			</Form>
		</Drawer>
	)
}

export { CategoriesModal }
