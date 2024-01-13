import { FC } from 'react'
import styles from './Transactions.module.scss'
import { TransactionsTable } from './table/TransactionsTable'
import { UiButton } from '@/shared/ui'

const Transactions: FC = () => {
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h1>Транзакции</h1>
				<UiButton>Добавить</UiButton>
			</div>
			<TransactionsTable />
		</div>
	)
}

export { Transactions }
