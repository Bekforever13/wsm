import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { capatilize } from '@/shared/utils/Utils'
import { useTranslation } from 'react-i18next'

const HeaderBreadCrumbs: React.FC = () => {
	const { t } = useTranslation()
	const location = useLocation()

	const { pathname } = location
	const pathnames = pathname.split('/').filter(item => item)

	return (
		<Breadcrumb
			items={[
				{
					title: <Link to='/'>{t('home')}</Link>,
				},
				...pathnames.map((name, index) => {
					const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
					const kiril = () => {
						switch (capatilize(name)) {
							case 'Transactions':
								return t('transactions')
							case 'Products':
								return t('products')
							case 'Categories':
								return t('categories')
							case 'Brands':
								return t('brands')
							case 'Storage':
								return t('storage')
							case 'Users':
								return t('users')
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
