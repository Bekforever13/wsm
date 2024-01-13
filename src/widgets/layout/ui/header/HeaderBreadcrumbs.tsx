import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { capatilize } from '@/shared/utils/Utils'

const HeaderBreadCrumbs: React.FC = () => {
	const location = useLocation()

	const { pathname } = location
	const pathnames = pathname.split('/').filter(item => item)

	return (
		<Breadcrumb
			items={[
				{
					title: <Link to='/'>Главная</Link>,
				},
				...pathnames.map((name, index) => {
					const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
					const kiril = () => {
						switch (capatilize(name)) {
							case 'Transactions':
								return 'Транзакции'
							case 'Products':
								return 'Товары'
							case 'Categories':
								return 'Категории'
							case 'Brands':
								return 'Бренды	'
							case 'Storage':
								return 'Склад'
							case 'Users':
								return 'Пользователи'
							default:
								return capatilize(name)
						}
					}
					return {
						title: <Link to={routeTo}>{kiril()}</Link>,
					}
				}),
			]}
		/>
	)
}

export { HeaderBreadCrumbs }
