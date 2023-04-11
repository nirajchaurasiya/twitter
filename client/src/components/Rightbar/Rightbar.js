import React, { useEffect } from 'react';
import './Rightbar.css'
import { Link } from 'react-router-dom'
import {
    AiOutlineGift,
    AiOutlineHeart,
    AiOutlineVideoCamera,
} from "react-icons/ai";
import { BiLocationPlus } from "react-icons/bi";
import { BiSearchAlt2, BiTrendingUp } from 'react-icons/bi'
import { AuthContext } from '../../context/AuthContext';
import { useContext, useRef, useState } from 'react';
import axios from 'axios';
export default function Rightbar({ explore, profile }) {
    const { user } = useContext(AuthContext);
    const [image, setImage] = useState("");
    const [allUsers, setAllUsers] = useState([])
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    const title = useRef();
    const userId = user._id;
    const handleTweets = () => {
        try {
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

                    })
                    .catch((err) => {
                        console.log("Err");
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };
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
        fetchAllUsers();
    }, [])
    return (
        <div className='_right_bar_'>
            <div className="right_bar_content">
                <div className="search_icon_input">
                    <input type="text" placeholder='search' />
                    <BiSearchAlt2 style={{ fontSize: "22px", cursor: "pointer" }} />
                </div>

                {!profile ? <div style={{ marginTop: "1%" }}>
                    {
                        !explore && <div className="actual_content_right_bar">
                            <p style={{ fontSize: "25px", fontWeight: "600" }}>What’s happening</p>

                            <div className="issue_right_bar" style={{ display: "flex", alignItems: "center", gap: ".9rem" }}>
                                <div>
                                    <BiTrendingUp style={{ fontSize: "30px" }} />
                                </div>
                                <div>
                                    <p>World War III</p>
                                    <span>Trending In USA</span>
                                </div>
                            </div>

                            <div className="issue_right_bar" style={{ display: "flex", alignItems: "center", gap: ".9rem" }}>
                                <div>
                                    <BiTrendingUp style={{ fontSize: "30px" }} />
                                </div>
                                <div>
                                    <p>World War III</p>
                                    <span>Trending In USA</span>
                                </div>
                            </div>

                            <div className="issue_right_bar" style={{ display: "flex", alignItems: "center", gap: ".9rem" }}>
                                <div>
                                    <BiTrendingUp style={{ fontSize: "30px" }} />
                                </div>
                                <div>
                                    <p>World War III</p>
                                    <span>Trending In USA</span>
                                </div>
                            </div>
                        </div>
                    }


                    <div className="actual_content_right_bar" style={{ marginTop: "10%" }}>
                        <p style={{ fontSize: "25px", fontWeight: "600" }}>Who to follow</p>

                        <div className="issue_right_bar">
                            <p>World War III</p>
                            <span>Trending In USA</span>
                        </div>

                        <div className="issue_right_bar">
                            <p>World War III</p>
                            <span>Trending In USA</span>
                        </div>

                        <div className="issue_right_bar">
                            <p>World War III</p>
                            <span>Trending In USA</span>
                        </div>
                    </div>
                </div>
                    :
                    <>
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
                        <div className="all_users">
                            <h3>All Users</h3>

                            {allUsers?.map(e => {
                                return (
                                    <Link key={e._id} to={`/profile/${e?._id}`} style={{ color: "var(--text-color)", textDecoration: "none" }}>
                                        <div className="mid_all_users">
                                            <div className="users_images">
                                                <img src={`${REACT_APP_API_URL}/${e.profilePicture}`} alt="" />
                                            </div>
                                            <div className="users_name" style={{ display: "grid", gap: ".3rem" }}>
                                                <p>{e?.name}</p>
                                                <p style={{ fontSize: "13px", fontFamily: "sans-serif" }}>Follower : {e?.followers?.length}</p>
                                                <p style={{ fontSize: "13px", fontFamily: "sans-serif" }}>Following : {e?.followings?.length}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                            {[1, 2, 3].map(e => {
                                return (
                                    <Link key={e} to='/profile/23iri90hf2fi32' style={{ color: "var(--text-color)", textDecoration: "none" }}>
                                        <div className="mid_all_users">
                                            <div className="users_images">
                                                <img src="/assests/profile.jpeg" alt="" />
                                            </div>
                                            <div className="users_name" style={{ display: "grid", gap: ".3rem" }}>
                                                <p>Niraj Kumar Chaurasiya</p>
                                                <p style={{ fontSize: "13px", fontFamily: "sans-serif" }}>Follower : 0</p>
                                                <p style={{ fontSize: "13px", fontFamily: "sans-serif" }}>Following : 0</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}

                        </div>
                    </>
                }




            </div>
        </div>
    )
}
