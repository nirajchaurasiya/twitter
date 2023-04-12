import React, { useContext } from 'react'
import './body.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Maincontent from '../../components/Maincontent/Maincontent';
import Rightbar from '../../components/Rightbar/Rightbar';
import { AuthContext } from '../../context/AuthContext';
export default function Body({ profile, explore, notifications, messages, support, setting, singlepost }) {
    const { user } = useContext(AuthContext);
    return (
        <div className='_body_'>
            <Sidebar profile={profile} explore={explore} notifications={notifications} messages={messages} support={support} setting={setting} />
            <Maincontent singlepost={singlepost} user={user} profile={profile} explore={explore} notifications={notifications} messages={messages} support={support} setting={setting} />
            <Rightbar profile={profile} explore={explore} notifications={notifications} messages={messages} support={support} setting={setting} />
        </div>
    )
}
