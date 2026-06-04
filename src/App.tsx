import { Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
import Store from './pages/Store/Store'
import Services from './pages/Services/Services'
import Orders from './pages/Orders/Orders'
import Cart from './pages/Cart/Cart'
import Inventory from './pages/Inventory/Inventory'
import Tasks from './pages/Tasks/Tasks'
import Social from './pages/Social/Social'

function App() {
  return (
    <Routes>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/home/profile' element={<Profile />}></Route>
      <Route path='/home/store' element={<Store />}></Route>
      <Route path='/home/inventory' element={<Inventory />}></Route>
      <Route path='/home/services' element={<Services />}></Route>
      <Route path='/home/orders' element={<Orders />}></Route>
      <Route path='/home/cart' element={<Cart />}></Route>
      <Route path='/home' element={<Home />} />
      <Route path='/home/tasks' element={<Tasks />}></Route>
      <Route path='/home/social' element={<Social />}></Route>
    </Routes>
  )
}

export default App
