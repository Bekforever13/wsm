import { FC, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Header } from './header/Header'
import { Navbar } from './navbar/Navbar'
import styles from './Layout.module.scss'

const Layout: FC = () => {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const token = localStorage.getItem('access_token_wsm')

	useEffect(() => {
		if (!token) {
			localStorage.removeItem('access_token_wsm')
			navigate('/login')
		}
	}, [pathname])

	return (
		<div className={styles.container}>
			<Navbar />
			<div className={styles.wrapper}>
				<Header />
				<Outlet />
			</div>
		</div>
	)
}

export { Layout }
