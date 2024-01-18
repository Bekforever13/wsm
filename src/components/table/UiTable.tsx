import { Table, TableProps } from 'antd'
import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UiTable: FC<TableProps<any>> = props => {
	return <Table {...props} scroll={{ x: 'auto' }} bordered size='small' />
}

export { UiTable }
