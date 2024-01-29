import { FC } from 'react'
import { TitleOfPage } from '@/widgets'

const Home: FC = () => {
  return (
    <div className="container">
      <TitleOfPage title="Главная" route="home" />
    </div>
  )
}

export { Home }
