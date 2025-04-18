import React from 'react'
import Navbar from './components/Navbar'
import {Routes,Route} from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import HomePage from './pages/HomePage'
import { useAuthStore } from './store/useAuthStore'
import {useEffect} from "react"
import {Loader} from "lucide-react";
import { Navigate } from 'react-router-dom';
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'
import VerifyEmail from './pages/VerifyEmail'



const App = () => {
  const {authUser,checkAuth,ischeckingAuth,onlineUsers}=useAuthStore();

  const {theme}= useThemeStore();

  console.log({onlineUsers})

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  console.log({authUser})

  if(ischeckingAuth && !authUser)return(
    <div className="flex justify-center items-center h-screen">
      <Loader className='size-10 animate-spin' />
    </div>
  )
  

  return (
    
    
    <div data-theme={theme}>
      <Navbar/>

      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login" /> }  />
        <Route path="/signup" element={!authUser ? <SignUpPage/> : <Navigate to="/" />}  />
        {/* <Route path="/signup" element= <SignUpPage/>  /> */}
        <Route path="/verifyEmail" element={!authUser ? <VerifyEmail/> : <Navigate to="/" />}  />
        <Route path="/login" element={!authUser ? <LoginPage/>: <Navigate to="/" />}  />
        <Route path="/settings" element={<SettingsPage/>}  />
        <Route path="/profile" element={authUser ? <ProfilePage/>: <Navigate to="/login" />}  />
      </Routes>

      <Toaster/>

    </div>
  )
}

export default App
