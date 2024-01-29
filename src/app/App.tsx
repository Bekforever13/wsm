import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from '@/widgets'
import {
  Home,
  Transactions,
  Products,
  Categories,
  Brands,
  Storage,
  Auth,
  Companies,
  WebApp,
} from '@/pages'
import './App.scss'

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/storage" element={<Storage />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
      <Route path="/webapp" element={<WebApp />} />
    </Routes>
  )
}

export { App }
