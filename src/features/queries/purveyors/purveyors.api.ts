import { message } from 'antd'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { createPurveyor, deletePurveyor, editPurveyor, fetchPurveyors } from './purveyors.service'

const useGetPurveyors = () =>
  useQuery({
    queryFn: () => fetchPurveyors(),
    queryKey: ['purveyors'],
  })

const useCreatePurveyor = () => {
  const client = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: createPurveyor,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['purveyors'] })
      message.success(t('clientMessageCreateSuccess'))
    },
    onError: () => message.error('Произошла ошибка при создании поставщика'),
  })
}

const useEditPurveyor = () => {
  const client = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: editPurveyor,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['purveyors'] })
      message.success(t('clientMessageEditSuccess'))
    },
    onError: () => message.error('Произошла ошибка при редактировании поставщика'),
  })
}
const useDeletePurveyor = () => {
  const client = useQueryClient()
  const { t } = useTranslation()
  return useMutation({
    mutationFn: deletePurveyor,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['purveyors'] })
      message.success(t('clientMessageDeleteSuccess'))
    },
    onError: () => message.error('Произошла ошибка при удалении поставщика'),
  })
}

export { useGetPurveyors, useCreatePurveyor, useEditPurveyor, useDeletePurveyor }
