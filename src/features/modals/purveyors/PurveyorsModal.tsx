import { FC, useEffect } from 'react'
import { UiButton, UiInput } from '@/components'
import { Drawer, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { MaskedInput } from 'antd-mask-input'
import { clearSpaces } from '@/shared/utils/Utils'
import { useCreatePurveyor, useEditPurveyor } from '@/features/queries/purveyors/purveyors.api'
import { PurveyorsStore } from '@/app/store/purveyorsStore'
import { TPurveyorsFormData } from '@/features/queries/purveyors/purveyors.types'

const PurveyorsModal: FC = () => {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { setPurveyorsToEdit, setPurveyorsModal, purveyorsModal, purveyorsToEdit } =
    PurveyorsStore()
  const { mutate: createClient } = useCreatePurveyor()
  const { mutate: editClient } = useEditPurveyor()

  const handleClose = () => {
    setPurveyorsModal(false)
    setPurveyorsToEdit(null)
    form.resetFields()
  }

  const handleSubmit = (values: TPurveyorsFormData) => {
    if (purveyorsToEdit?.id) {
      editClient({ id: purveyorsToEdit.id, ...values, phone: clearSpaces(values.phone) })
      handleClose()
    } else {
      createClient({ ...values, phone: clearSpaces(values.phone) })
      handleClose()
    }
  }

  useEffect(() => {
    if (purveyorsToEdit) {
      form.setFieldValue('name', purveyorsToEdit.name)
      form.setFieldValue('phone', purveyorsToEdit.phone)
      form.setFieldValue('description', purveyorsToEdit.description)
    }
  }, [purveyorsToEdit])

  return (
    <Drawer placement="right" title={t('newClients')} onClose={handleClose} open={purveyorsModal}>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label={t('clientsTableCol1')}
          rules={[{ required: true, message: t('productsMessageRequired1') }]}
        >
          <UiInput placeholder={t('name')} />
        </Form.Item>
        <Form.Item
          name="phone"
          label={t('clientsTableCol2')}
          rules={[{ required: true, message: t('productsMessageRequired2') }]}
        >
          <MaskedInput mask={'+{998}00 000 00 00'} />
        </Form.Item>
        <Form.Item
          name="description"
          label={t('clientsTableCol3')}
          rules={[{ required: true, message: t('transactionsMessageRequired4') }]}
        >
          <UiInput placeholder={t('transactionsTableCol4')} />
        </Form.Item>
        <UiButton>{purveyorsToEdit ? t('save') : t('add')}</UiButton>
      </Form>
    </Drawer>
  )
}

export { PurveyorsModal }
