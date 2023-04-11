import React from 'react'
import './Explore.css'
import { BiTrendingUp } from 'react-icons/bi'
export default function Explore() {
    return (
        <div className="explore_page">
            <div className="mid_explore_page">
                <div className="search_bar">
                    <input type="text" placeholder="search" />
                </div>
            </div>

            <div className="trending_people_title" style={{ marginTop: "3%" }}>
                <h3>Trending peoples, you may know </h3>
            </div>
            <div className="trending_peoples" style={{ marginTop: "3%" }}>
                <div className="trending_people_image">
                    <img src="/assests/elon.jpeg" alt="" />
                </div>
                <p style={{ fontSize: "17px", fontWeight: "600" }}>Elon Musk</p>
            </div>
            <div className="trending_peoples">
                <div className="trending_people_image">
                    <img src="/assests/billgate.jpg" alt="" />
                </div>
                <p style={{ fontSize: "17px", fontWeight: "600" }}>Bill Gates</p>
            </div>
            <div className="trending_peoples">
                <div className="trending_people_image">
                    <img src="/assests/silas.jpg" alt="" />
                </div>
                <p style={{ fontSize: "17px", fontWeight: "600" }}>Silas Adekunle</p>
            </div>
            <div className="trending_peoples">
                <div className="trending_people_image">
                    <img src="/assests/robert.jpeg" alt="" />
                </div>
                <p style={{ fontSize: "17px", fontWeight: "600" }}>Robert Kiyosaki</p>
            </div>

            <div className="trending_peoples">
                <div className="trending_people_image">
                    <img src="/assests/mark.jpeg" alt="" />
                </div>
                <p style={{ fontSize: "17px", fontWeight: "600" }}>Mark Zuckerburg</p>
            </div>

            <div className="trending_peoples">
                <div className="trending_people_image">
                    <img src="/assests/jeff.jpg" alt="" />
                </div>
                <p style={{ fontSize: "17px", fontWeight: "600" }}>Jeff Bezos</p>
            </div>

            <div className="trending_peoples">
                <div className="trending_people_image">
                    <img src="/assests/steve.jpg" alt="" />
                </div>
                <p style={{ fontSize: "17px", fontWeight: "600" }}>Steve Jobs</p>
            </div>

            <div className="actual_content_right_bar" style={{ marginTop: "3%" }}>
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
        </div>
    )
}
