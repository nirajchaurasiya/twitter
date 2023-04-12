import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AiOutlineBarChart, AiOutlineComment, AiOutlineHeart, AiOutlineShareAlt, AiOutlineVerified } from 'react-icons/ai'
import './Singlepost.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../context/AuthContext'
import CommentReplies from '../CommentReplies/CommentReplies';
export default function Singlepost() {
    const [post, setPost] = useState([]);
    const [postDoesnotExist, setPostDoesnotExist] = useState(false)
    const [loader, setLoader] = useState(true)
    const { postId } = useParams();
    const { user } = useContext(AuthContext);
    const commentdata = useRef();
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL

    const comment = () => {
        try {
            if (commentdata.current.value) {
                const commentData = {
                    name: user.name,
                    comment: commentdata.current.value,
                    _id: user?._id,
                    picture: user?.profilePicture,
                    updatedAt: Date.now()
                }
                axios.post(`${REACT_APP_API_URL}/api/tweet/tweetcomment/${post._id}`, commentData)
                    .then((data) => {
                        data.data.status === "1" && fetchPosts(postId)

                    })
                    .catch((err) => {
                        console.log("Err")
                    })
            }
            commentdata.current.value = ''

        }
        catch (error) {
            console.log(error)
        }

    }

    const fetchPosts = useCallback((postId) => {
        try {
            axios.get(`${REACT_APP_API_URL}/api/post/getpost/${postId}`)
                .then((data) => {
                    if (data.data.status === "1") {
                        setPost(data.data.msg)
                        setPostDoesnotExist(false)
                        setLoader(false)
                    }
                    else return setPostDoesnotExist(true)
                })
                .catch((err) => {
                    console.log("ERR")
                })
        } catch (error) {
            console.log(error)
        }
    }, [setPost, REACT_APP_API_URL])
    useEffect(() => {
        const posts = async (postId) => {
            await fetchPosts(postId)
        }
        posts(postId)
        if (post?.userName) {
            setTimeout(() => {
                document.title = `Twitter / ${post?.userName} / ${post?.title}`
            }, 1000);
        }
        document.title = "Loading..."
        setLoader(true)
    }, [postId, fetchPosts, post.userName, post.title])


    if (postDoesnotExist) {
        return (
            <div style={{ fontSize: "20px", textAlign: "center", marginTop: "5vh" }}>
                <img src="/assests/postnotfound.jpeg" alt="" style={{ width: "90%" }} />
                <p>Post doesn't exist</p>
            </div>
        )
    }
    if (loader) {
        return <div><div className="spinner"></div></div>

    }
    return (
        <>
            <div className='single_posts'>
                <div className="main_posts">
                    <div className="user_credentials">
                        <img src={`${REACT_APP_API_URL}/${post?.userImage}`} alt="" />
                        <div>
                            <p>{post?.userName}</p>
                            <p><AiOutlineVerified /></p>
                            <p>. {moment(post?.createdAt).fromNow()}</p>
                        </div>
                    </div>
                    <div className="posts_images_emojis">
                        <p style={{ fontSize: "18px", marginBottom: "2%" }}>{post?.title}</p>
                        <div className="posts_image">
                            <img src={`${REACT_APP_API_URL}/${post?.image}`} alt="" />
                        </div>
                        <div className="emojis_icon">
                            <AiOutlineShareAlt color="brown" style={{ cursor: "pointer" }} />
                            <p style={{ display: "flex", alignItems: "center", gap: ".4rem" }}><span style={{ fontSize: "15px" }}>{post?.comments?.length}</span><AiOutlineHeart color="red" style={{ cursor: "pointer" }} /></p>

                            <AiOutlineBarChart color="green" style={{ cursor: "pointer" }} />
                            <p style={{ display: "flex", alignItems: "center", gap: ".4rem" }}><span style={{ fontSize: "15px" }}>{post?.comments?.length}</span><AiOutlineComment color="blue" style={{ cursor: "pointer" }} /></p>
                        </div>
                    </div>

                    <h4>Comments</h4>
                    <div className="reply_like" style={{ marginTop: "3%", marginBottom: "3%" }}>
                        <input type="text" ref={commentdata} placeholder='Enter a comment' /><button onClick={comment}>Comment</button>
                    </div>
                    <div className='comments_user'>
                        {post?.comments?.map((e, index) => {
                            return (
                                <CommentReplies key={Date.now() + Math.random(0, 1000 + index + e?.createdAt + e?.comment)
                                } e={e} index={index} post={post} user={user} />
                            )
                        })}
                    </div>

                </div>


            </div >
        </>
    )
}
