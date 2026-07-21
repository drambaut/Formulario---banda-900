import { Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import FormularioComunidad from './pages/FormularioComunidad.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FormularioComunidad />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/panel" element={<AdminPanel />} />
    </Routes>
  )
}