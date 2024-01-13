import { Popconfirm, PopconfirmProps } from 'antd'
import React from 'react'

const UiPopconfirm: React.FC<PopconfirmProps> = _props => {
	return (
		<Popconfirm
			cancelButtonProps={{
				style: { background: 'transparent' },
			}}
			cancelText='Отмена'
			{..._props}
		/>
	)
}

export { UiPopconfirm }
