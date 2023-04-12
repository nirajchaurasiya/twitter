import React, { useContext, useRef } from 'react'
import { AiOutlineDislike, AiOutlineLike, AiOutlineVerified } from 'react-icons/ai'
import moment from 'moment'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
export default function CommentReplies({ e, post, index }) {
    const reply = useRef();
    const { user } = useContext(AuthContext);

    const REACT_APP_API_URL = process.env.REACT_APP_API_URL


    const handleReply = (cmtuserId, index) => {
        try {
            const replyData = {
                name: user?.name,
                comment: reply.current.value,
                _id: user?._id,
                picture: user?.profilePicture,
            }
            if (!replyData.comment) {
                alert("Comment can't be empty")
            }
            else {
                axios.post(`${REACT_APP_API_URL}/api/tweet/tweets/${post._id}/comment/${cmtuserId}/reply/${index}`, replyData)
                    .then((data) => {
                        // if (data.data.status === "1") return fetchPosts(postId)
                    })
                    .catch((err) => {
                        console.log("Err")
                    })
            }


        } catch (error) {
            console.log(error)

        }
        reply.current.value = ''
    }

    return (
        <div>
            <div className="comments_posts" >
                <div className="user_credentials" style={{ display: "flex", alignItems: "center" }}>
                    <img style={{ width: "30px", height: "30px" }} src={`${REACT_APP_API_URL}/${e?.picture}`} alt="" />
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <p>{e?.name}</p>
                        <p><AiOutlineVerified /></p>
                        <p>. {moment(e?.updatedAt).fromNow()}</p>
                    </div>
                </div>
                <div className="all_comments_title" style={{ marginLeft: "6%" }}>
                    <p style={{ fontSize: "15px", marginBottom: "2%" }}>{e?.comment}</p>
                    <div className="reply_like">
                        <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}> <span style={{ fontSize: "18px" }}>{e?.like?.length}</span>
                            <AiOutlineLike style={{ fontSize: "25px" }} />
                            <span style={{ fontSize: "18px" }}>{e?.dislike?.length}</span> <AiOutlineDislike style={{ fontSize: "25px" }} />
                        </div>
                        <input type="text" ref={reply} placeholder='Enter a reply' /><button onClick={() => { handleReply(e?._id, index) }}>Reply</button>
                    </div>
                    {e?.reply?.map((data, index) => {
                        return (
                            <div key={Date.now() + Math.random(0, 1000 + index + data?.time + data?.comment)}>
                                <div className="user_credentials" style={{ marginTop: "3%" }}>
                                    <img style={{ width: "30px", height: "30px" }} src={`${REACT_APP_API_URL}/${data?.picture}`} alt="" />
                                    <div>
                                        <p>{data?.name}</p>
                                        <p><AiOutlineVerified /></p>
                                        <p>. {moment(data?.time).fromNow()}</p>
                                    </div>

                                </div>
                                <p style={{ fontSize: "17px", marginBottom: "2%", fontWeight: "400", paddingLeft: "6%" }}>
                                    {data?.comment ? data?.comment : "Hello Everyone"}</p>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}
