const handleUserProfileUpdate = () => {
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
}

const handleUserCoverUpdate = () => {
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
}



const fetchAllTweets = () => {
    try {
        axios.get(`${REACT_APP_API_URL}/api/tweet/alltweet`)
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
}


const getUser = (id) => {
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
                }
            })
            .catch((err) => {
                console.log("ERR")
            })
    } catch (error) {
        console.log(error)
    }
}









// Rightbar

const fetchAllUsers = () => {
    try {
        axios.get(`${REACT_APP_API_URL}/api/user/getalluser/getalluser`)
            .then((data) => {
                console.log(data.data)
                setAllUsers(data.data.msg)
            })
            .catch((err) => {
                console.log("Err")
            })
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    const fetchData = async () => {
        await fetchAllUsers();
    };
    fetchData();
}, [fetchAllUsers]);