import React, { useContext } from 'react'
import './maincontent.css'

import Homepage from '../Home/Homepage'
import Message from '../Messages/Message'
import Profile from '../Profile/Profile'
import Explore from '../Explore/Explore'

import Support from '../Supports/Support'
import Setting from '../Setting/Setting'
import Notifications from '../Notifications/Notifications'
import { AuthContext } from '../../context/AuthContext'
import Singlepost from '../SingalPost/Singlepost'
export default function Maincontent({ profile, explore, notifications, messages, support, setting, singlepost }) {
    const { user } = useContext(AuthContext)
    return (
        <>
            <div className='_main_content_'>
                {profile ?
                    <Profile data={user} />
                    :
                    explore ?
                        <Explore />
                        :
                        notifications ?
                            <Notifications /> :
                            messages ? <Message /> :
                                support ? <Support /> : setting ? <Setting /> : singlepost ? <Singlepost /> : <Homepage user={user} />
                }
            </div>
        </>
    )
}
