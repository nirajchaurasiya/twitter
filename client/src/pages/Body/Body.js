import React from 'react'
import './body.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Maincontent from '../../components/Maincontent/Maincontent';
import Rightbar from '../../components/Rightbar/Rightbar';
export default function Body({ profile, explore, notifications, messages, support, setting }) {
    return (
        <div className='_body_'>
            <Sidebar profile={profile} explore={explore} notifications={notifications} messages={messages} support={support} setting={setting} />
            <Maincontent profile={profile} explore={explore} notifications={notifications} messages={messages} support={support} setting={setting} />
            <Rightbar profile={profile} explore={explore} notifications={notifications} messages={messages} support={support} setting={setting} />
        </div>
    )
}
