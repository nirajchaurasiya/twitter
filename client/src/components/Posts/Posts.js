import React from 'react';
import { AiOutlineBarChart, AiOutlineComment, AiOutlineHeart, AiOutlineShareAlt, AiOutlineVerified } from 'react-icons/ai'
import moment from 'moment';
import { Link } from 'react-router-dom'
export default function Posts({ data }) {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    return (
        <>
            <div className="main_posts">
                <Link to={`/profile/${data.userId}`} style={{ color: "var(--text-color)", textDecoration: "none" }}>
                    <div className="user_credentials">
                        <img src={`${REACT_APP_API_URL}/${data?.userImage}`} alt="" />
                        <div>
                            <p>{data?.userName}</p>
                            <p><AiOutlineVerified /></p>
                            <p>. {moment(data?.updatedAt).fromNow()}</p>
                        </div>
                    </div>
                </Link>
                <div className="posts_images_emojis">
                    <Link to={`/post/${data._id}`} style={{ color: "var(--text-color)", textDecoration: "none" }}>
                        <p style={{ fontSize: "18px", marginBottom: "2%" }}>{data?.title}</p>
                        <div className="posts_image">
                            <img src={`${REACT_APP_API_URL}/${data?.image}`} alt="" />
                        </div>
                    </Link>
                    <div className="emojis_icon">
                        <AiOutlineShareAlt color="brown" style={{ cursor: "pointer" }} />
                        <p style={{ display: "flex", alignItems: "center", gap: ".4rem" }}><span style={{ fontSize: "15px" }}>{data?.comments?.length}</span><AiOutlineHeart color="red" style={{ cursor: "pointer" }} /></p>

                        <AiOutlineBarChart color="green" style={{ cursor: "pointer" }} />
                        <p style={{ display: "flex", alignItems: "center", gap: ".4rem" }}><span style={{ fontSize: "15px" }}>{data?.comments?.length}</span><AiOutlineComment color="blue" style={{ cursor: "pointer" }} /></p>
                    </div>
                </div>

            </div>
        </>
    )
}
