import React, { useState, useEffect, useCallback } from 'react'
import Posts from '../Posts/Posts';
import axios from 'axios'
import { useParams } from 'react-router-dom';
export default function Profile({ data }) {
    const [profilePicture, setProfilePicture] = useState('')
    const [allTweets, setAllTweets] = useState([])
    const [userDoesntExistData, setUserDoesntExistData] = useState(false)
    const [loader, setLoader] = useState(true)
    const [user, setUser] = useState([])
    const { id } = useParams();

    const REACT_APP_API_URL = process.env.REACT_APP_API_URL
    const handleUserProfileUpdate = useCallback(() => {
        try {
            setLoader(true)
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
    }, [profilePicture, user._id, REACT_APP_API_URL])

    const handleUserCoverUpdate = useCallback(() => {
        try {
            setLoader(true)
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
    }, [profilePicture, user._id, REACT_APP_API_URL])


    const fetchAllTweets = useCallback(() => {
        try {
            axios.get(`${REACT_APP_API_URL}/api/tweet/alltweet/${user._id}`)
                .then((data) => {
                    const tweets = data.data.tweets;
                    setAllTweets(tweets.sort(function (a, b) {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    }))
                    setLoader(false)
                })
                .catch((err) => {
                    console.log("Err")
                }
                )
        } catch (error) {
            console.log(error)
        }

    }, [setAllTweets, REACT_APP_API_URL, user._id])


    const getUser = useCallback((id) => {
        try {
            axios.get(`${REACT_APP_API_URL}/api/user/${id}`)
                .then((data) => {
                    if (data.data.status === "1") {
                        setUser(data.data.msg)
                        setUserDoesntExistData(false)
                        setLoader(false)
                    }
                    else if (data.data.status === "0") {
                        setUserDoesntExistData(true)
                        setLoader(false)
                    }
                })
                .catch((err) => {
                    console.log("ERR")
                })
        } catch (error) {
            console.log(error)
        }
    }, [setUser, setUserDoesntExistData, REACT_APP_API_URL])

    useEffect(() => {
        const fetchTweetsAndUser = async () => {
            await fetchAllTweets();
            await getUser(id);
        };
        setLoader(true);
        fetchTweetsAndUser();

        document.title = `Twitter / ${user.name}`
    }, [fetchAllTweets, getUser, id, user.name]);


    if (userDoesntExistData) {
        return (
            <div style={{ fontSize: "20px", fontWeight: "700", textAlign: "center" }}>
                <img src="/assests/usernotfound.jpeg" alt="" style={{ width: "80%" }} />
                <p>User doesn't exist</p>
            </div>

        )
    }
    if (loader) {
        return (
            <div>
                <div className='spinner'></div>
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
                        Website: <a target='_blank' rel="noreferrer" style={{ color: "var(--text-color)" }} href={user?.website}>{user?.website}</a>
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
                allTweets.length !== 0 ? allTweets.map(e => (<Posts key={e?._id} data={e} />)) :
                    <div style={{ fontSize: "19px", textAlign: "center" }}>
                        <img src="/assests/notweets.jpeg" alt="" style={{ width: "100%" }} />
                    </div>
            }

        </>
    )
}
