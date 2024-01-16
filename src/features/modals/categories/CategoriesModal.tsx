import { FC } from 'react'
import { adminStore } from '@/app/store'
import { UiButton, UiInput } from '@/components'
import { useCreateCategory } from '@/features/queries/categories/categories.api'
import { Drawer, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { TCategoryFormData } from '@/features/queries/categories/categories.types'

const CategoriesModal: FC = () => {
	const [form] = Form.useForm()
	const { t } = useTranslation()
	const { categoriesModal, setCategoriesModal } = adminStore(s => s)
	const { mutate } = useCreateCategory()

	const handleClose = () => {
		setCategoriesModal(false)
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
				<Form.Item label={t('categoriesTableCol1')}>
					<Form.Item
						name='name'
						rules={[{ required: true, message: t('categoryMessageRequired') }]}
					>
						<UiInput />
					</Form.Item>
					<UiButton>{t('add')}</UiButton>
				</Form.Item>
			</Form>
		</Drawer>
	)
}

export { CategoriesModal }
