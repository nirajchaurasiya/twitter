import './Rightbar.css'
import { } from 'react-icons/ai'
import { BiSearchAlt2, BiTrendingUp } from 'react-icons/bi'
export default function Rightbar({ explore }) {
    return (
        <div className='_right_bar_'>
            <div className="right_bar_content">
                <div className="search_icon_input">
                    <input type="text" placeholder='search' />
                    <BiSearchAlt2 style={{ fontSize: "22px", cursor: "pointer" }} />
                </div>

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


                <div className="actual_content_right_bar">
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
        </div>
    )
}
