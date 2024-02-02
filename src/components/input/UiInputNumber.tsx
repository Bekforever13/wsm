import { InputNumber, InputNumberProps } from 'antd'
import { FC } from 'react'

const UiInputNumber: FC<InputNumberProps> = (props) => {
  return <InputNumber {...props} style={{ width: '100%' }} />
}

export { UiInputNumber }
