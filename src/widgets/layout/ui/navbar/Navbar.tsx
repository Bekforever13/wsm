import { FC } from 'react'
import { LuListOrdered } from 'react-icons/lu'
import { UiPopconfirm } from '@/shared/ui/popConfirm/UiPopconfirm'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.scss'
import { NavbarMenuItems } from './NavbarMenuItems'

const Navbar: FC = () => {
	const navigate = useNavigate()

	const onConfirmLogout = () => {
		localStorage.removeItem('token')
		navigate('/auth')
	}

	return (
		<div className={styles.container}>
			<Link to='/' className={styles.title}>
				Warehouse system management
			</Link>
			<div className={styles.menuItems}>
				<NavbarMenuItems />
				<UiPopconfirm
					title='Вы действительно хотите выйти?'
					onConfirm={onConfirmLogout}
					className={`${styles.menuItem}`}
				>
					<div>
						<LuListOrdered />
						Выйти
					</div>
				</UiPopconfirm>
			</div>
		</div>
	)
}

export { Navbar }
