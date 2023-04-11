import React, { useState, useEffect } from 'react'
import Posts from '../Posts/Posts';
import axios from 'axios'
import { useParams } from 'react-router-dom';
export default function Profile({ data }) {
    const [profilePicture, setProfilePicture] = useState('')
    const [allTweets, setAllTweets] = useState([])
    const [userDoesntExistData, setUserDoesntExistData] = useState(false)
    const [user, setUser] = useState([])
    const { id } = useParams();
    console.log(id)

    const REACT_APP_API_URL = process.env.REACT_APP_API_URL
    const handleUserProfileUpdate = () => {
        try {
            if (profilePicture) {
                const fd = new FormData();
                fd.append('profilePicture', profilePicture)

                axios.post(`${REACT_APP_API_URL}/api/user/updateprofile/${user._id}`, fd)
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

                axios.post(`${REACT_APP_API_URL}/api/user/updatecover/${user._id}`, fd)
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

    const fetchAllTweets = async () => {
        try {
            axios.get(`${REACT_APP_API_URL}/api/tweet/alltweet`)
                .then((data) => {
                    const tweets = data.data.tweets;
                    setAllTweets(tweets.sort(function (a, b) {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    }))
                })
                .catch((err) => {
                    console.log("Err")
                }
                )
        } catch (error) {
            console.log(error)
        }
    }
    const getUser = (id) => {
        try {
            axios.get(`${REACT_APP_API_URL}/api/user/${id}`)
                .then((data) => {
                    if (data.data.status === "1") {
                        setUser(data.data.msg)
                        setUserDoesntExistData(false)
                    }
                    else if (data.data.status === "0") {
                        setUserDoesntExistData(true)
                    }
                })
                .catch((err) => {
                    console.log("ERR")
                })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser(id);
        fetchAllTweets();
    }, [id])
    if (userDoesntExistData) {
        return (
            <div style={{ fontSize: "20px", fontWeight: "700", marginTop: "10vh", textAlign: "center" }}>
                User doesn't exist
            </div>

        )
    }
    return (
        <>
            <div className="profile_of_user">
                <div className="cover_profile">
                    <img style={{ objectFit: "cover" }} src={user?.coverProfile ? `${REACT_APP_API_URL}/${user?.coverProfile}` : '/assests/cover.jpeg'} alt="" />
                    {
                        data?._id === id && <div className="update_cover_profile_pic">
                            <input type="file" onChange={(e) => { setProfilePicture(e.target.files[0]) }} />
                            <button onClick={handleUserProfileUpdate} className='upload_cover_photo'>
                                Change profile photo
                            </button>
                            <button onClick={handleUserCoverUpdate} className='upload_cover_photo'>
                                Change cover photo
                            </button>
                        </div>
                    }
                </div>
                <div className="profile_picture_user">
                    <img style={{ objectFit: "cover" }} src={`${REACT_APP_API_URL}/${user?.profilePicture}`} alt="" />
                </div>
                <div className="user_profile_credentials">
                    <p>{user?.name}</p>
                    <p>Hello Everyone!</p>
                </div>

                <div className="user_all_credentials">
                    <p className="status">
                        {user?.status}
                    </p>
                    <p>
                        Email: {user?.email}
                    </p>
                    <p>
                        Contact Number: {user?.contact}
                    </p>
                    <p>
                        Location: {user?.from} {user?.city}
                    </p>
                    <p>
                        Status: Married
                    </p>
                    <p>
                        Website: <a target='_blank' rel="noreferrer" style={{ color: "var(--text-color)" }} href="https://nirajchaurasiya.com">{user?.website}</a>
                    </p>
                    <p>
                        Followers: {user?.followers?.length}
                    </p>
                    <p>
                        Following: {user?.followings?.length}
                    </p>
                </div>
            </div>

            {
                allTweets.length !== 0 ? allTweets.map(e => (<Posts key={e?._id} data={e} />)) : "No tweets found"
            }

        </>
    )
}
