import React from 'react';
import { AiOutlineBarChart, AiOutlineComment, AiOutlineHeart, AiOutlineShareAlt, AiOutlineVerified } from 'react-icons/ai'
import { format } from 'timeago.js'
export default function Posts({ data }) {
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
    return (
        <>
            <div className="main_posts">
                <div className="user_credentials">
                    <img src={`${REACT_APP_API_URL}/${data?.userImage}`} alt="" />
                    <div>
                        <p>{data?.userName}</p>
                        <p><AiOutlineVerified /></p>
                        <p>. {format(data?.updatedAt)}</p>
                    </div>
                </div>
                <div className="posts_images_emojis">
                    <p style={{ fontSize: "18px", marginBottom: "2%" }}>{data?.title}</p>
                    <div className="posts_image">
                        <img src={`${REACT_APP_API_URL}/${data?.image}`} alt="" />
                    </div>
                    <div className="emojis_icon">
                        <AiOutlineShareAlt color="brown" style={{ cursor: "pointer" }} />
                        <AiOutlineHeart color="red" style={{ cursor: "pointer" }} />
                        <AiOutlineBarChart color="green" style={{ cursor: "pointer" }} />
                        <AiOutlineComment color="blue" style={{ cursor: "pointer" }} />
                    </div>
                </div>

            </div>
        </>
    )
}
