import { Form, Input } from 'antd'
import { MaskedInput } from 'antd-mask-input'
import { FC, useEffect } from 'react'
import styles from './Auth.module.scss'
import { useNavigate } from 'react-router-dom'
import { UiButton } from '@/components'
import { clearSpaces } from '@/shared/utils/Utils'
import { useAuthLoginMutation } from '@/features/queries/auth/auth.api'

const Auth: FC = () => {
	const token = localStorage.getItem('access_token_wsm')
	const [form] = Form.useForm()
	const navigate = useNavigate()
	const { mutate } = useAuthLoginMutation()

	const onFinish = (values: any) => {
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
						rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
					>
						<MaskedInput mask={'+{998}00 000 00 00'} />
					</Form.Item>
					<Form.Item
						label='Пароль'
						name='password'
						rules={[{ required: true, message: 'Пожалуйста, заполните поле.' }]}
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
