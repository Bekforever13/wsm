import { FC, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TCategory } from '@/features/queries/categories/categories.types'
import { useTranslation } from 'react-i18next'
import { FaRegSave } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import { Button } from 'antd'
import { AiOutlineEdit } from 'react-icons/ai'
import { FaDeleteLeft } from 'react-icons/fa6'
import { UiPopconfirm } from '@/components/popConfirm/UiPopconfirm'
import { CategoriesStore } from '@/app/store'
import { UiButton } from '@/components'
import styles from './CategoriesTable.module.scss'
import { useDeleteCategory, useEditCategory } from '@/features/queries/categories/categories.api'

type Props = {
  rec: TCategory
  newCategoryName: string
  setNewCategoryName: Dispatch<SetStateAction<string>>
}

const CategoriesTableActions: FC<Props> = (props) => {
  const [clickedCategory, setClickedCategory] = useState(false)
  const { rec, newCategoryName, setNewCategoryName } = props
  const { setCategoryToEdit } = CategoriesStore((s) => s)
  const { mutate: deleteCategory } = useDeleteCategory()
  const { mutate: editCategory, isSuccess: editSuccess } = useEditCategory()
  const { t } = useTranslation()

  const handleDelete = (id: number) => {
    deleteCategory(id)
  }

  const handleEdit = () => {
    setClickedCategory(true)
    setCategoryToEdit(rec)
    setNewCategoryName(rec.name)
  }

  const handleSave = () => {
    editCategory({ id: rec.id, name: newCategoryName })
    setClickedCategory(false)
  }

  const handleCancel = () => {
    setCategoryToEdit(null)
    setClickedCategory(false)
    setNewCategoryName('')
  }

  useEffect(() => {
    if (editSuccess) {
      handleCancel()
    }
  }, [editSuccess])

  return (
    <div className={styles.actions}>
      {(!newCategoryName && (
        <UiButton onClick={handleEdit}>
          <AiOutlineEdit size="22" />
          {t('edit')}
        </UiButton>
      )) ||
        (!clickedCategory && (
          <UiButton onClick={handleEdit}>
            <AiOutlineEdit size="22" />
            {t('edit')}
          </UiButton>
        ))}

      {newCategoryName && clickedCategory && (
        <>
          <UiButton onClick={handleSave}>
            <FaRegSave />
            {t('save')}
          </UiButton>
          <Button onClick={handleCancel} type="default">
            <MdCancel />
            {t('cancel')}
          </Button>
        </>
      )}
      <UiPopconfirm title={t('beforeDelete')} onConfirm={() => handleDelete(rec.id)}>
        <UiButton style={{ background: 'red' }}>
          <FaDeleteLeft size="22" />
          {t('delete')}
        </UiButton>
      </UiPopconfirm>
    </div>
  )
}

export { CategoriesTableActions }
