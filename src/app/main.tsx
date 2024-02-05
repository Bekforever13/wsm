import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/reset.css'
import '@/app/i18next.ts'
import { QueryProvider } from '@/app/_providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryProvider>,
)
