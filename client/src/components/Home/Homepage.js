import React from 'react'
import { AiOutlineGift, AiOutlineHeart, AiOutlineVideoCamera } from 'react-icons/ai'
import { BiLocationPlus } from 'react-icons/bi'
import Posts from '../Posts/Posts'
export default function Homepage({ user }) {
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
                        <img src={`/` + user.profilePicture} alt="" />
                        <p>Hello, {user.name}</p>
                    </div>
                    <div className="textarea_div">
                        <textarea name="news" id="news" cols="30" rows="4" placeholder="What's happening"></textarea>


                    </div>
                    <div className="media_section">
                        <div className="media">
                            <label htmlFor="files" style={{ cursor: "pointer" }}>
                                <AiOutlineVideoCamera />
                                <input type="file" style={{ display: "none" }} name='video' id="files" className='file-upload-to-hide' />
                            </label>
                            <p><AiOutlineGift /></p>
                            <p><AiOutlineHeart /></p>
                            <p><BiLocationPlus /></p>
                        </div>
                        <div className="btn_send_upload">
                            <button>Tweet</button>
                        </div>
                    </div>

                </div>


                <Posts />

            </div>
        </div>
    )
}
