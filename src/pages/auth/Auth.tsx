import { Form, Input } from 'antd'
import { MaskedInput } from 'antd-mask-input'
import { FC, useEffect } from 'react'
import styles from './Auth.module.scss'
import { useNavigate } from 'react-router-dom'
import { UiButton } from '@/components'
import { clearSpaces } from '@/shared/utils/Utils'
import { TLogin, useAuthLoginMutation } from '@/features/queries'

const Auth: FC = () => {
	const token = localStorage.getItem('access_token_wsm')
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const { mutate } = useAuthLoginMutation()

	const onFinish = (values: TLogin) => {
		mutate({ ...values, phone: clearSpaces(values.phone) })
	}

	useEffect(() => {
		if (token) {
			navigate('/')
		}
	}, [token?.length])

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				<h1>WSM</h1>
				<Form form={form} onFinish={onFinish} layout='vertical'>
					<Form.Item
						label='Телефон'
						name='phone'
						rules={[
							{ required: true, message: 'Пожалуйста, введите телефон.' },
						]}
					>
						<MaskedInput mask={'+{998}00 000 00 00'} />
					</Form.Item>
					<Form.Item
						label='Пароль'
						name='password'
						rules={[{ required: true, message: 'Пожалуйста, введите пароль.' }]}
					>
						<Input.Password />
					</Form.Item>
					<UiButton>Войти</UiButton>
				</Form>
			</div>
		</div>
	)
}

export { Auth }
