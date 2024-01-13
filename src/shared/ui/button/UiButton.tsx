import { Button, ButtonProps } from 'antd'

const UiButton: React.FC<ButtonProps> = _props => {
	return <Button {..._props} htmlType='submit' type='primary' />
}
export { UiButton }
