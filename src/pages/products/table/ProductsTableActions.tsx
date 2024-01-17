import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineEdit } from 'react-icons/ai'
import { FaDeleteLeft } from 'react-icons/fa6'
import { UiPopconfirm } from '@/components/popConfirm/UiPopconfirm'
import { ProductsStore } from '@/app/store'
import { UiButton } from '@/components'
import styles from './ProductsTable.module.scss'
import { TProducts } from '@/features/queries/products/products.types'
import { useDeleteProduct } from '@/features/queries/products/products.api'

type Props = {
	rec: TProducts
}

const ProductsTableActions: FC<Props> = props => {
	const { rec } = props
	const { setProductsToEdit, setProductsModal } = ProductsStore(s => s)
	const { mutate: deleteProduct } = useDeleteProduct()
	const { t } = useTranslation()

	const handleDelete = (id: number) => {
		deleteProduct(id)
	}

	const handleEdit = () => {
		setProductsToEdit(rec)
		setProductsModal(true)
	}

	return (
		<div className={styles.actions}>
			<UiButton onClick={handleEdit}>
				<AiOutlineEdit size='22' />
				{t('edit')}
			</UiButton>
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

export { ProductsTableActions }
