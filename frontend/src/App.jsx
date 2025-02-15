import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/LoginComponent'
import LoadingSpinner from './components/LoadingSpinner'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingShape from './components/FloatingShape'
import SignUp from './pages/SignUp'
import LoginComponent from './pages/LoginComponent'
import EmailVerification from './pages/EmailVerification'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore';
import ResetPasswordPage from './pages/ResetPasswordPage'
//protect routes that requires authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user,  } = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  
  if(!user.isVerified){
    return <Navigate to="/verify-email" replace/>
  }
  
 

  return children;
}

//redirect the authenticated user to home page 
const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated, user} =useAuthStore();

  if(isAuthenticated && user.isVerified){
    return <Navigate to="/" replace />
  }
  return children;
}


const App = () => {

  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
 // fetch aunthintecation status on app load
  useEffect(() => {
    checkAuth()
  }, [checkAuth])


  if(isCheckingAuth) return <LoadingSpinner />;

  const location = useLocation(); // Detect the current route
  
  // List of routes where floating shapes should appear
  // const floatingShapeRoutes = ['/login', '/signup', '/forgot-password', '/reset-password'];

  return (
    <div className='mx-4 sm:mx-[10%] relative'>
      <Navbar />
      
      {/* Conditionally render Floating Shapes */}
      {/* {floatingShapeRoutes.includes(location.pathname) && (
        <>
          <FloatingShape color='bg-purple-700' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			     <FloatingShape color='bg-purple-700' size='w-48 h-48' top='70%' left='80%' delay={5} />
			<FloatingShape color='bg-purple-700' size='w-32 h-32' top='40%' left='-10%' delay={2} />
        </>
      )} */}

      <Routes>
        <Route path='/' element={
          <ProtectedRoute>

          <Home />
          
          </ProtectedRoute>
           } />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={
           <RedirectAuthenticatedUser>
           <LoginComponent />
         </RedirectAuthenticatedUser>
        } />
        <Route path='/Signup' element={
          <RedirectAuthenticatedUser>
            <SignUp />
          </RedirectAuthenticatedUser>
        } />
        <Route path='/verify-email' element={<EmailVerification/>}/>

        <Route path='/forgot-password' element={<RedirectAuthenticatedUser>
          <ForgotPasswordPage/>
        </RedirectAuthenticatedUser>}/>

        <Route
        path='/reset-password/:token'

        element={
          <RedirectAuthenticatedUser>
            <ResetPasswordPage/>
          </RedirectAuthenticatedUser>
        }
        />
        
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId'
         element={
          <ProtectedRoute>
            <Appointment />

          </ProtectedRoute>
         } />
      </Routes>
    <Toaster />
      <Footer />
    </div>
  )
}

export default App
