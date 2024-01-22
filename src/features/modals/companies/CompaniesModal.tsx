import { FC } from 'react'
import { UiButton, UiInput } from '@/components'
import { Drawer, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { CompaniesStore } from '@/app/store/companiesStore'
import { useCreateCompany } from '@/features/queries/company/companies.api'
import { TCompanyFormData } from '@/features/queries/company/companies.types'

const CompaniesModal: FC = () => {
	const [form] = Form.useForm()
	const { t } = useTranslation()
	const { companiesModal, setCompaniesModal } = CompaniesStore(s => s)
	const { mutate } = useCreateCompany()

	const handleClose = () => {
		setCompaniesModal(false)
		form.resetFields()
	}

	const handleSubmit = async (values: TCompanyFormData) => {
		await mutate(values)
		await handleClose()
	}

	return (
		<Drawer
			placement='right'
			title={t('companiesTableCol1')}
			onClose={handleClose}
			open={companiesModal}
		>
			<Form layout='vertical' form={form} onFinish={handleSubmit}>
				<Form.Item
					name='name'
					label={t('companiesTableCol1')}
					rules={[{ required: true, message: t('categoryMessageRequired') }]}
				>
					<UiInput />
				</Form.Item>
				<UiButton>{t('add')}</UiButton>
			</Form>
		</Drawer>
	)
}

export { CompaniesModal }
