import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Posts from '../Posts/Posts';
import axios from 'axios'
export default function Profile() {
    const [profilePicture, setProfilePicture] = useState('')
    const { user } = useContext(AuthContext);
    const handleUserProfileUpdate = () => {
        try {
            if (profilePicture) {
                const fd = new FormData();
                fd.append('profilePicture', profilePicture)

                axios.post(`/api/user/updateprofile/${user._id}`, fd)
                    .then((data) => {
                        if (data.data.status === 1) {
                            localStorage.setItem('twitterdata', JSON.stringify(data.data.data))
                            window.location.reload();
                        }
                        else {
                            alert("Profile userId doesn't exists");
                        }
                    })
                    .catch((Err) => {
                        console.log(Err)
                    })
            } else {
                alert("Please select an image")
            }
        } catch (error) {

        }
    }

    const handleUserCoverUpdate = () => {
        try {
            if (profilePicture) {
                const fd = new FormData();
                fd.append('coverProfile', profilePicture)

                axios.post(`/api/user/updatecover/${user._id}`, fd)
                    .then((data) => {
                        if (data.data.status === 1) {
                            localStorage.setItem('twitterdata', JSON.stringify(data.data.data))
                            window.location.reload();
                        }
                        else {
                            alert("Profile userId doesn't exists");
                        }
                    })
                    .catch((Err) => {
                        console.log(Err)
                    })
            } else {
                alert("Please select an image")
            }
        } catch (error) {

        }
    }

    return (
        <>
            <div className="profile_of_user">
                <div className="cover_profile">
                    <img src={`/` + user.coverProfile} alt="" />
                    <div className="update_cover_profile_pic">
                        <input type="file" onChange={(e) => { setProfilePicture(e.target.files[0]) }} />
                        <button onClick={handleUserProfileUpdate} className='upload_cover_photo'>
                            Change profile photo
                        </button>
                        <button onClick={handleUserCoverUpdate} className='upload_cover_photo'>
                            Change cover photo
                        </button>
                    </div>
                </div>
                <div className="profile_picture_user">
                    <img style={{ objectFit: "cover" }} src={`/` + user.profilePicture} alt="" />
                </div>
                <div className="user_profile_credentials">
                    <p>{user.name}</p>
                    <p>Hello Everyone!</p>
                </div>

                <div className="user_all_credentials">
                    <p className="status">
                        {user.status}
                    </p>
                    <p>
                        Email: {user.email}
                    </p>
                    <p>
                        Contact Number: {user.contact}
                    </p>
                    <p>
                        Location: {user.from} {user.city}
                    </p>
                    <p>
                        Status: Married
                    </p>
                    <p>
                        Website: <a target='_blank' rel="noreferrer" style={{ color: "var(--text-color)" }} href="https://nirajchaurasiya.com">{user.website}</a>
                    </p>
                    <p>
                        Followers: {user?.followers.length}
                    </p>
                    <p>
                        Following: {user?.followings.length}
                    </p>
                </div>
            </div>

            <Posts />

        </>
    )
}
