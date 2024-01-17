import { FC, Dispatch, SetStateAction, useEffect } from 'react'
import { TCategory } from '@/features/queries/categories/categories.types'
import { useTranslation } from 'react-i18next'
import { FaRegSave } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import { Button } from 'antd'
import { AiOutlineEdit } from 'react-icons/ai'
import { FaDeleteLeft } from 'react-icons/fa6'
import { UiPopconfirm } from '@/components/popConfirm/UiPopconfirm'
import { BrandStore } from '@/app/store'
import { UiButton } from '@/components'
import styles from './BrandsTable.module.scss'
import {
	useDeleteBrand,
	useEditBrand,
} from '@/features/queries/brands/brands.api'

type Props = {
	rec: TCategory
	newBrandName: string
	setNewBrandName: Dispatch<SetStateAction<string>>
}

const BrandsTableActions: FC<Props> = props => {
	const { rec, newBrandName, setNewBrandName } = props
	const { setBrandsToEdit } = BrandStore(s => s)
	const { mutate: deleteBrand } = useDeleteBrand()
	const { mutate: editBrand, isSuccess: editSuccess } = useEditBrand()
	const { t } = useTranslation()

	const handleDelete = (id: number) => {
		deleteBrand(id)
	}

	const handleEdit = () => {
		setBrandsToEdit(rec)
		setNewBrandName(rec.name)
	}

	const handleSave = async () => {
		editBrand({ id: rec.id, name: newBrandName })
	}

	const handleCancel = () => {
		setBrandsToEdit(null)
		setNewBrandName('')
	}

	useEffect(() => {
		if (editSuccess) {
			handleCancel()
		}
	}, [editSuccess])

	return (
		<div className={styles.actions}>
			{!newBrandName && (
				<UiButton onClick={handleEdit}>
					<AiOutlineEdit size='22' />
					{t('edit')}
				</UiButton>
			)}
			{newBrandName && (
				<>
					<UiButton onClick={handleSave}>
						<FaRegSave />
						{t('save')}
					</UiButton>
					<Button onClick={handleCancel} type='default'>
						<MdCancel />
						{t('cancel')}
					</Button>
				</>
			)}
			<UiPopconfirm
				title={t('beforeDelete')}
				onConfirm={() => handleDelete(rec.id)}
			>
				<UiButton style={{ background: 'red' }}>
					<FaDeleteLeft size='22' />
					{t('delete')}
				</UiButton>
			</UiPopconfirm>
		</div>
	)
}

export { BrandsTableActions }
