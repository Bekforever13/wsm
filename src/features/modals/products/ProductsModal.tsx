import { FC, useEffect, useState } from 'react'
import { ProductsStore } from '@/app/store'
import { UiButton, UiInput } from '@/components'
import { Drawer, Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { useCreateProduct, useEditProduct } from '@/features/queries/products/products.api'
import { TProductsFormData } from '@/features/queries/products/products.types'
import { UiSelect } from '@/components/select/UiSelect'
import { useGetCategories } from '@/features/queries/categories/categories.api'
import { TCategory } from '@/features/queries/categories/categories.types'

type Options = {
  label: string
  value: number
}

const ProductsModal: FC = () => {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const { productsModal, setProductsModal, productsToEdit, setProductsToEdit } = ProductsStore()
  const { mutate: createProduct } = useCreateProduct()
  const { mutate: editProduct } = useEditProduct()
  const { data: categoriesData } = useGetCategories()
  const [categoriesOptions, setCategoriesOptions] = useState<Options[]>([])

  const handleClose = () => {
    setProductsModal(false)
    setProductsToEdit(null)
    form.resetFields()
  }

  const handleSubmit = (values: TProductsFormData) => {
    if (productsToEdit?.id) {
      editProduct({ id: productsToEdit.id, ...values })
      handleClose()
    } else {
      createProduct(values)
      handleClose()
    }
  }

  useEffect(() => {
    if (productsToEdit) {
      form.setFieldValue('name', productsToEdit.name)
      form.setFieldValue('category_id', productsToEdit.category_id)
      form.setFieldValue('brand_id', productsToEdit.brand_id)
      form.setFieldValue('selling_price', productsToEdit.selling_price)
    }
  }, [productsToEdit])

  useEffect(() => {
    if (categoriesData) {
      categoriesData.data.map((el: TCategory) =>
        setCategoriesOptions((prev) => [...prev, { value: el.id, label: el.name }]),
      )
    }
  }, [categoriesData])

  return (
    <Drawer placement="right" title={t('newProducts')} onClose={handleClose} open={productsModal}>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label={t('productsTableCol1')}
          rules={[{ required: true, message: t('productsMessageRequired1') }]}
        >
          <UiInput placeholder={t('name')} />
        </Form.Item>
        <Form.Item
          name="category_id"
          label={t('productsTableCol2')}
          rules={[{ required: true, message: t('productsMessageRequired2') }]}
        >
          <UiSelect placeholder={t('select')} options={categoriesOptions} />
        </Form.Item>
        <Form.Item
          name="selling_price"
          label={t('transactionsTableCol4')}
          rules={[{ required: true, message: t('transactionsMessageRequired4') }]}
        >
          <UiInput type="number" placeholder={t('transactionsTableCol4')} />
        </Form.Item>
        <UiButton>{productsToEdit ? t('save') : t('add')}</UiButton>
      </Form>
    </Drawer>
  )
}

export { ProductsModal }
