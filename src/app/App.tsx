import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/widgets'
import {
  Home,
  Products,
  Categories,
  Storage,
  Auth,
  Companies,
  WebApp,
  Sales,
  Incomes,
  Refunds,
} from '@/pages'
import './App.scss'

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/incomes" element={<Incomes />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/refunds" element={<Refunds />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
      <Route path="/webapp" element={<WebApp />} />
    </Routes>
  )
}

export { App }
