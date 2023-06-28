import { Route, Routes } from 'react-router-dom'
import './assets/styles/app.css'
import './assets/styles/app.scss'
import HomePage from './pages/HomePage/HomePage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
}

export default AppRoutes
