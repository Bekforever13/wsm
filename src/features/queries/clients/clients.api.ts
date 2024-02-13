import { message } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { createClient, deleteClient, editClient, fetchClients } from './clients.service'

const useGetClients = () =>
  useQuery({
    queryFn: () => fetchClients(),
    queryKey: ['clients'],
  })

const useCreateClient = () => {
  const client = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: createClient,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['clients'] })
      message.success(t('clientMessageCreateSuccess'))
    },
    onError: () => message.error('Произошла ошибка при создании клиента'),
  })
}
const useEditClient = () => {
  const client = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: editClient,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['clients'] })
      message.success(t('clientMessageEditSuccess'))
    },
    onError: () => message.error('Произошла ошибка при редактировании клиента'),
  })
}
const useDeleteClient = () => {
  const client = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: deleteClient,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['clients'] })
      message.success(t('clientMessageDeleteSuccess'))
    },
    onError: () => message.error('Произошла ошибка при удалении клиента'),
  })
}

export { useGetClients, useCreateClient, useEditClient, useDeleteClient }
