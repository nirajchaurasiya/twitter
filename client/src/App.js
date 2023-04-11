import React, { useContext, useEffect } from 'react'
import Body from './pages/Body/Body'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import { AuthContext } from './context/AuthContext'
export default function App() {
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (localStorage.getItem('twittercolormode')) {
    } else {
      document.body.classList.add('dark');
      localStorage.setItem('twittercolormode', 'dark')
    }


  }, [])


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' key="main_body" element={user ? <Body /> : <Login />} />
        <Route path='/profile/:id' key="profile" element={user ? <Body profile={true} /> : <Login />} />
        <Route path='/explore' key="explore" element={user ? <Body explore={true} /> : <Login />} />
        <Route path='/notifications' key="notifications" element={user ? <Body notifications={true} /> : <Login />} />
        <Route path='/messages' key="messages" element={user ? <Body messages={true} /> : <Login />} />
        <Route path='/support' key="support" element={user ? <Body support={true} /> : <Login />} />
        <Route path='/setting' key="setting" element={user ? <Body setting={true} /> : <Login />} />
        <Route path='/login' key="login" element={<Login />} />
        <Route path='/register' key="register" element={<Register />} />
      </Routes>
    </Router>
  )
}
