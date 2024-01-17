import { Select, SelectProps } from 'antd'
import { FC } from 'react'

const UiSelect: FC<SelectProps> = _props => {
	return <Select {..._props} style={{ width: '100%' }} />
}

export { UiSelect }
