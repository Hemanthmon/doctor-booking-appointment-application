import { useContext, useState } from 'react'
import './App.css'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import Dashboard from './pages/Admin/Dashboard';
import AllApointments from './pages/Admin/AllApointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorList from './pages/Admin/DoctorList';
import {Routes, Route} from 'react-router-dom'
import { DoctorContext } from './context/DoctorContest';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';
function App() {
  const [count, setCount] = useState(0)
  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <SideBar/>
        <Routes>
          {/* Admin route */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard />}/>
          <Route path='/all-appointments' element={<AllApointments />}/>
          <Route path='/add-doctor' element={<AddDoctor />}/>
          <Route path='/doctor-list' element={<DoctorList/>}/>
          {/* Doctor route  */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
          <Route path='/doctor-appointments' element={<DoctorAppointment/>}/>
          <Route path='/doctor-profile' element={<DoctorProfile/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <>
     <Login />
     <ToastContainer/>
    </>
  )
}

export default App
