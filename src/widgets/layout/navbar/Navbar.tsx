import { FC, useEffect, useState } from 'react'
import { LuListOrdered } from 'react-icons/lu'
import { UiPopconfirm } from '@/components/popConfirm/UiPopconfirm'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import { NavbarMenuItems } from './NavbarMenuItems'
import { useTranslation } from 'react-i18next'
import { useAuthLogoutMutation } from '@/features/queries/auth/auth.api'

const Navbar: FC = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { t } = useTranslation()
  const { mutate } = useAuthLogoutMutation()

  const onConfirmLogout = () => mutate()

  useEffect(() => {
    if (!isMounted) setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.title}>
        Warehouse system management
      </Link>
      <div className={styles.menuItems}>
        <NavbarMenuItems />
        <UiPopconfirm
          title={t('beforeExit')}
          onConfirm={onConfirmLogout}
          className={`${styles.menuItem}`}
        >
          <div>
            <LuListOrdered />
            {t('exit')}
          </div>
        </UiPopconfirm>
      </div>
    </div>
  )
}

export { Navbar }
