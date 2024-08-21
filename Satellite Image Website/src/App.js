import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import About from './Pages/About'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Contact from './Pages/Contact'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import TermsAndConditions from './Pages/TermsAndConditions'
import LandCoverClassificationPage from './Pages/LandCoverClassificationPage'
import ChangeDetection from './Pages/ChangeDetection'
import VegetationMonitoring from './Pages/VegetationMonitoring'
import UserProfile from './Pages/UserProfile'

function App () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')

  const handleLogin = user => {
    setIsLoggedIn(true)
    setUsername(user.username)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
  }

  return (
    <BrowserRouter>
      <Navbar
        isLoggedIn={isLoggedIn}
        username={username}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/landcover'
          element={
            isLoggedIn ? (
              <LandCoverClassificationPage />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />

        <Route
          path='/changedetection'
          element={
            isLoggedIn ? <ChangeDetection /> : <Navigate to='/login' replace />
          }
        />

<Route
          path="/vegetationmonitoring"
          element={
            isLoggedIn ? (
              <VegetationMonitoring />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path='/about' element={<About />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login handleLogin={handleLogin} />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/terms' element={<TermsAndConditions />} />
        {/* <Route path='/landcover' element={<LandCoverClassificationPage />} /> */}
        {/* <Route path='/changedetection' element={<ChangeDetection />} /> */}
        <Route
          path='/vegetationmonitoring'
          element={<VegetationMonitoring />}
        />
        <Route path='/profile' element={<UserProfile />} />
        {/* Conditionally render the LandCoverClassificationPage route based on login status */}
        {/* <Route
          path="/LandCoverClassificationPage"
          element={
            isLoggedIn ? (
              <LandCoverClassificationPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
