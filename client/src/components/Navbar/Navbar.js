import React, { useContext, useEffect, useState } from 'react'
import './navbar.css'
import { Link, NavLink } from 'react-router-dom'
import { AiOutlineTwitter } from 'react-icons/ai'
import { AuthContext } from '../../context/AuthContext'
export default function Navbar() {
    const { user } = useContext(AuthContext);
    const [colorModeIcon, setColorModeIcon] = useState('🌜');
    const [toggleProfile, setToggleProfile] = useState(false)
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL
    const changeTheClass = () => {
        if (localStorage.getItem('twittercolormode') === 'light') {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
            localStorage.setItem('twittercolormode', 'dark')
            setColorModeIcon('🌞')
        }
        else if (localStorage.getItem('twittercolormode') === 'dark') {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
            localStorage.setItem('twittercolormode', 'light')
            setColorModeIcon('🌜')
        }
    }
    useEffect(() => {
        if (localStorage.getItem('twittercolormode')) {
            const mode = localStorage.getItem('twittercolormode')
            document.body.classList.add(mode);
            if (mode === 'dark') {
                setColorModeIcon('🌞')
            }
        }
    }, [])
    const toggleProfilee = () => {
        setToggleProfile(!toggleProfile)
    }
    return (
        <>
            <div className='navabr_nav'>
                <ul className='navbar_first_content'>
                    <li>{colorModeIcon === '🌜' ? <AiOutlineTwitter style={{ color: "blue", fontSize: "25px" }} /> : <img src="/assests/logo.png" alt="" style={{ width: "30px" }} />}</li>
                    <li>Twitter</li>
                </ul>
                <ul className="navbar_second_nav">
                    {user ? <li><img onClick={toggleProfilee} src={`${REACT_APP_API_URL}/${user?.profilePicture}`} alt="" title='profile' /></li> : <Link to='/login'><button style={{ padding: "3px 10px" }}>Login</button></Link>}
                    <li onClick={changeTheClass} title={colorModeIcon === '🌜' ? "toggle dark" : "toggle light"}>{colorModeIcon}</li>
                </ul>
            </div>
            {toggleProfile && <div className="profile_dropdown">
                <NavLink style={{ color: "var(--text-color)", textDecoration: "none" }} to={`/profile/` + user._id}>
                    <div className="user_information">
                        <img src={`${REACT_APP_API_URL}/${user.profilePicture}`} alt="profile" />
                        <p>{user.name}</p>
                    </div>
                </NavLink>
                <button style={{ color: "var(--bg-color)", width: "100%", marginTop: "10%", border: "1px solid var(--bg-color)", padding: "10px", borderRadius: "20px", cursor: "pointer" }} onClick={() => {
                    if (prompt("Type S, if you want to logout?") === 's') {
                        localStorage.removeItem('twitterdata');
                        window.location.reload();
                    }
                    else {
                        alert("Great choice");
                    }
                }}>Logout</button>
            </div>
            }
        </>
    )
}
