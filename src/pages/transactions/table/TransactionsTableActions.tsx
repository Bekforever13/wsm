import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineEdit } from 'react-icons/ai'
import { FaDeleteLeft } from 'react-icons/fa6'
import { UiPopconfirm } from '@/components/popConfirm/UiPopconfirm'
import { UiButton } from '@/components'
import styles from './TransactionsTable.module.scss'
import { useDeleteTransactions } from '@/features/queries/transactions/transactions.api'
import { TransactionsStore } from '@/app/store/transactionsStore'
import { TTransactions } from '@/features/queries/transactions/transactions.types'

type Props = {
	rec: TTransactions
}

const TransactionsTableActions: FC<Props> = props => {
	const { rec } = props
	const { setTransactionsModal, setTransactionsToEdit } = TransactionsStore(
		s => s
	)
	const { mutate: deleteTransactions } = useDeleteTransactions()
	const { t } = useTranslation()

	const handleDelete = (id: number) => {
		deleteTransactions(id)
	}

	const handleEdit = () => {
		setTransactionsToEdit({
			id: rec.id,
			product_id: rec.product.id,
			payment_type: rec.payment_type.id,
			transaction_type: rec.transaction_type.id,
			price: rec.price,
			quantity: rec.quantity,
		})
		setTransactionsModal(true)
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

export { TransactionsTableActions }
