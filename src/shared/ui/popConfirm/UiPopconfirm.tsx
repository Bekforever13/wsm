import { Popconfirm, PopconfirmProps } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

const UiPopconfirm: React.FC<PopconfirmProps> = _props => {
	const { t } = useTranslation()
	return (
		<Popconfirm
			cancelButtonProps={{
				style: { background: 'transparent' },
			}}
			cancelText={t('cancel')}
			{..._props}
		/>
	)
}

export { UiPopconfirm }
