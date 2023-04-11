import React, { useEffect, useRef, useState } from "react";
import {
    AiOutlineGift,
    AiOutlineHeart,
    AiOutlineVideoCamera,
} from "react-icons/ai";
import { BiLocationPlus } from "react-icons/bi";
import axios from "axios";
import Posts from "../Posts/Posts";
export default function Homepage({ user }) {
    const [image, setImage] = useState("");
    const [loader, setLoader] = useState(true)
    const [allTweets, setAllTweets] = useState([]);
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    const title = useRef();
    const userId = user._id;
    const handleTweets = () => {
        try {
            setLoader(true)
            if (!image || !title || !title) {
                alert("Please fill up all fields");
            } else {
                const fd = new FormData();
                fd.append("title", title.current.value);
                fd.append("userId", userId);
                fd.append("image", image);
                fd.append('userImage', user.profilePicture);
                fd.append('userName', user.name);
                axios
                    .post(`${REACT_APP_API_URL}/api/tweet`, fd)
                    .then((data) => {
                        fetchAllTweets();
                        setLoader(false)
                    })
                    .catch((err) => {
                        console.log("Err");
                        setLoader(false)
                    });
            }
        } catch (error) {
            console.log(error);
            setLoader(false);
        }
    };
    const fetchAllTweets = async () => {
        try {
            if (user._id) {
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
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchAllTweets();
        setLoader(true)
        // eslint-disable-next-line
    }, [user._id])
    if (loader) {
        return (
            <div>
                <div className="spinner">

                </div>
            </div>
        )
    }
    return (
        <div className="actual_main_content">
            <div className="main_content_header">
                <h3>Home</h3>
                <div className="two_part_divide">
                    <p>For you</p>
                    <p>Following</p>
                </div>
            </div>

            <div className="main_content_div">
                <div className="main_upload_news">
                    <div className="profile_main_upload">
                        <img src={`${REACT_APP_API_URL}/` + user.profilePicture} alt="" />
                        <p>Hello, {user.name}</p>
                    </div>
                    <div className="textarea_div">
                        <textarea
                            ref={title}
                            name="news"
                            id="news"
                            cols="30"
                            rows="4"
                            placeholder="What's happening"
                        ></textarea>
                    </div>
                    <div className="media_section">
                        <div className="media">
                            <label htmlFor="files" style={{ cursor: "pointer" }}>
                                <AiOutlineVideoCamera />
                                <input
                                    onChange={(e) => {
                                        setImage(e.target.files[0]);
                                    }}
                                    type="file"
                                    style={{ display: "none" }}
                                    name="video"
                                    id="files"
                                    className="file-upload-to-hide"
                                />
                            </label>
                            <p>
                                <AiOutlineGift />
                            </p>
                            <p>
                                <AiOutlineHeart />
                            </p>
                            <p>
                                <BiLocationPlus />
                            </p>
                        </div>
                        <div className="btn_send_upload">
                            <button onClick={handleTweets}>Tweet</button>
                        </div>
                    </div>
                </div>

                {
                    allTweets.length !== 0 ? allTweets.map(e => {
                        return (
                            <Posts key={e?._id} data={e} />
                        )
                    })
                        : <div style={{ fontSize: "19px", textAlign: "center", marginTop: "10vh" }}>No Tweets</div>}
            </div>
        </div>
    );
}
