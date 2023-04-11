import React from 'react'
import './sidebar.css'
import { AiOutlineMenu, AiOutlineSetting } from 'react-icons/ai'
import { BiCode, BiHash, BiHome, BiMessage, BiNotification, BiSupport } from 'react-icons/bi'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
export default function Sidebar() {
    const { user } = useContext(AuthContext);
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL
    return (
        <div className='_side_bar_'>
            <div className="sidebar_content">
                <div style={{ display: "grid", gap: "1rem" }}>
                    <NavLink to={`/profile/${user._id}`} style={{ color: "var(--text-color)", textDecoration: "none" }}>
                        <div className="profile">
                            <img src={`${REACT_APP_API_URL}/` + user.profilePicture} alt="" />
                            <p>{user.name}</p>

                        </div>
                    </NavLink>
                    <div className='_sideBar_hr_' ></div>
                </div>

                <div className='all_settings_required'>
                    <NavLink to='/' style={{ color: "var(--text-color)", textDecoration: "none" }}>
                        <div className="profile">
                            <h2><BiHome /></h2>
                            <span>Home</span>
                        </div>
                    </NavLink>
                    <NavLink to='/explore' style={{ color: "var(--text-color)", textDecoration: "none" }}>

                        <div className="profile">
                            <h2><BiHash /></h2>
                            <span>Explore</span>
                        </div>
                    </NavLink>


                    <div className="profile">
                        <h2><BiNotification /></h2>
                        <span>Notifications</span>
                    </div>


                    <div className="profile">
                        <h2><BiMessage /></h2>
                        <span>Messages</span>
                    </div>

                    <div className="profile">
                        <h2><BiSupport /></h2>
                        <span>Support</span>
                    </div>

                    <div className="profile">
                        <h2><AiOutlineSetting /></h2>
                        <span>Setting</span>
                    </div>

                    <div className="profile">
                        <h2><BiCode /></h2>
                        <span>Code</span>
                    </div>

                    <div className="profile">
                        <h2><AiOutlineMenu /></h2>
                        <span>More</span>
                    </div>

                    <div className="btn_show_more">
                        <button>Tweet</button>
                    </div>

                </div>

            </div>
        </div>
    )
}
