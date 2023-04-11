import { AiOutlineBarChart, AiOutlineComment, AiOutlineHeart, AiOutlineShareAlt, AiOutlineVerified } from 'react-icons/ai'

export default function Posts() {

    return (
        <>
            {[1, 2, 3, 4, 5].map((e) => {
                return (
                    <div key={e} className="main_posts">
                        <div className="user_credentials">
                            <img src="/assests/elon.jpeg" alt="" />
                            <div>
                                <p>Elon Musk </p>
                                <p><AiOutlineVerified /></p>
                                <p>. 1 hr ago</p>
                            </div>
                        </div>
                        <div className="posts_images_emojis">
                            <p style={{ fontSize: "18px", marginBottom: "2%" }}>I am feeling well.</p>
                            <div className="posts_image">
                                <img src="/assests/posts.jpeg" alt="" />
                            </div>
                            <div className="emojis_icon">
                                <AiOutlineShareAlt color="brown" style={{ cursor: "pointer" }} />
                                <AiOutlineHeart color="red" style={{ cursor: "pointer" }} />
                                <AiOutlineBarChart color="green" style={{ cursor: "pointer" }} />
                                <AiOutlineComment color="blue" style={{ cursor: "pointer" }} />
                            </div>
                        </div>

                    </div>
                )
            })}
        </>
    )
}
