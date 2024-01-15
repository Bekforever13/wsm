import { FC } from 'react'
import styles from './Transactions.module.scss'
import { TransactionsTable } from './table/TransactionsTable'
import { TitleOfPage } from '@/widgets'

const Transactions: FC = () => {
	return (
		<div className={styles.container}>
			<TitleOfPage title='Транзакции' route='transactions' />
			<TransactionsTable />
		</div>
	)
}

export { Transactions }
