import { FC, useEffect } from 'react'
import { UiButton, UiInput, UiInputNumber } from '@/components'
import { Drawer, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { ClientsStore } from '@/app/store/clientsStore'
import { useCreateClient, useEditClient } from '@/features/queries/clients/clients.api'
import { TClientFormData } from '@/features/queries/clients/clients.types'
import { MaskedInput } from 'antd-mask-input'
import { clearSpaces } from '@/shared/utils/Utils'

const ClientsModal: FC = () => {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { setClientToEdit, setClientsModal, clientToEdit, clientsModal } = ClientsStore()
  const { mutate: createClient } = useCreateClient()
  const { mutate: editClient } = useEditClient()

  const handleClose = () => {
    setClientsModal(false)
    setClientToEdit(null)
    form.resetFields()
  }

  const handleSubmit = (values: TClientFormData) => {
    if (clientToEdit?.id) {
      editClient({ id: clientToEdit.id, ...values, phone: clearSpaces(values.phone) })
      handleClose()
    } else {
      createClient({ ...values, phone: clearSpaces(values.phone) })
      handleClose()
    }
  }

  useEffect(() => {
    if (clientToEdit) {
      form.setFieldValue('name', clientToEdit.name)
      form.setFieldValue('phone', clientToEdit.phone)
      form.setFieldValue('description', clientToEdit.description)
      form.setFieldValue('debt_total_sum', clientToEdit.debt_total_sum)
    }
  }, [clientToEdit])

  return (
    <Drawer placement="right" title={t('newClients')} onClose={handleClose} open={clientsModal}>
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
        <Form.Item
          name="debt_total_sum"
          label={t('clientsTableCol4')}
          rules={[{ required: true, message: t('transactionsMessageRequired4') }]}
        >
          <UiInputNumber type="number" placeholder={t('transactionsTableCol4')} />
        </Form.Item>
        <UiButton>{clientToEdit ? t('save') : t('add')}</UiButton>
      </Form>
    </Drawer>
  )
}

export { ClientsModal }
