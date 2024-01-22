import { FC, Dispatch, SetStateAction, useEffect } from 'react'
import { TCategory } from '@/features/queries/categories/categories.types'
import { useTranslation } from 'react-i18next'
import { FaRegSave } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'
import { Button } from 'antd'
import { AiOutlineEdit } from 'react-icons/ai'
import { FaDeleteLeft } from 'react-icons/fa6'
import { UiPopconfirm } from '@/components/popConfirm/UiPopconfirm'
import { UiButton } from '@/components'
import styles from './CompaniesTable.module.scss'
import { CompaniesStore } from '@/app/store/companiesStore'
import {
	useDeleteCompany,
	useEditCompany,
} from '@/features/queries/company/companies.api'

type Props = {
	rec: TCategory
	newCompanyName: string
	setNewCompanyName: Dispatch<SetStateAction<string>>
}

const CompaniesTableActions: FC<Props> = props => {
	const { rec, newCompanyName, setNewCompanyName } = props
	const { setCompaniesToEdit } = CompaniesStore(s => s)
	const { mutate: deleteCompany } = useDeleteCompany()
	const { mutate: editCompany, isSuccess: editSuccess } = useEditCompany()
	const { t } = useTranslation()

	const handleDelete = (id: number) => {
		deleteCompany(id)
	}

	const handleEdit = () => {
		setCompaniesToEdit(rec)
		setNewCompanyName(rec.name)
	}

	const handleSave = async () => {
		editCompany({ id: rec.id, name: newCompanyName })
	}

	const handleCancel = () => {
		setCompaniesToEdit(null)
		setNewCompanyName('')
	}

	useEffect(() => {
		if (editSuccess) {
			handleCancel()
		}
	}, [editSuccess])

	return (
		<div className={styles.actions}>
			{!newCompanyName && (
				<UiButton onClick={handleEdit}>
					<AiOutlineEdit size='22' />
					{t('edit')}
				</UiButton>
			)}
			{newCompanyName && (
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

export { CompaniesTableActions }
