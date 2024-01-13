import { FC } from 'react'
import styles from './Navbar.module.scss'
import { FaListUl } from 'react-icons/fa'
import { RiAdminLine } from 'react-icons/ri'
import { GrTransaction } from 'react-icons/gr'
import { AiOutlineHome, AiFillHdd } from 'react-icons/ai'
import { TbBrandSketch, TbCategory2 } from 'react-icons/tb'
import { useLocation, useNavigate } from 'react-router-dom'

const NavbarMenuItems: FC = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const currentRoleId = 1

	const menuItems = [
		{ pathname: '/', icon: <AiOutlineHome />, label: 'Главная' },
		{
			pathname: '/transactions',
			icon: <GrTransaction />,
			label: 'Транзакции',
		},
		{ pathname: '/products', icon: <FaListUl />, label: 'Товары' },
		{
			pathname: '/categories',
			icon: <TbCategory2 />,
			label: 'Категории',
		},
		{ pathname: '/brands', icon: <TbBrandSketch />, label: 'Бренды' },
		{ pathname: '/storage', icon: <AiFillHdd />, label: 'Склад' },
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
					Пользователи
				</div>
			)}
		</>
	)
}

export { NavbarMenuItems }
