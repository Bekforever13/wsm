import { FC } from 'react'
import styles from './Navbar.module.scss'
import { FaListUl } from 'react-icons/fa'
import { RiAdminLine } from 'react-icons/ri'
import { GrTransaction } from 'react-icons/gr'
import { AiOutlineHome, AiFillHdd } from 'react-icons/ai'
import { TbBrandSketch, TbCategory2 } from 'react-icons/tb'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaRegObjectUngroup } from 'react-icons/fa6'

const NavbarMenuItems: FC = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const currentRoleId = 1

	const menuItems = [
		{ pathname: '/', icon: <AiOutlineHome />, label: t('home') },
		{
			pathname: '/transactions',
			icon: <GrTransaction />,
			label: t('transactions'),
		},
		{ pathname: '/products', icon: <FaListUl />, label: t('products') },
		{
			pathname: '/companies',
			icon: <FaRegObjectUngroup />,
			label: t('companies'),
		},
		{
			pathname: '/categories',
			icon: <TbCategory2 />,
			label: t('categories'),
		},
		{ pathname: '/brands', icon: <TbBrandSketch />, label: t('brands') },
		{ pathname: '/storage', icon: <AiFillHdd />, label: t('storage') },
	]

	const handleClickRoute = (pathname: string) => {
		navigate(pathname, { replace: true })
	}
	return (
		<>
			{menuItems.map(item => (
				<div
					onClick={() => handleClickRoute(item.pathname)}
					key={item.pathname}
					className={`${styles.menuItem} ${
						pathname === item.pathname && styles.active
					}`}
				>
					{item.icon}
					{item.label}
				</div>
			))}
			{currentRoleId === 1 && (
				<div
					onClick={() => handleClickRoute('/users')}
					className={`${styles.menuItem} ${
						pathname === '/users' && styles.active
					}`}
				>
					<RiAdminLine />
					{t('users')}
				</div>
			)}
		</>
	)
}

export { NavbarMenuItems }
