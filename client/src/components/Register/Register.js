import React, { useRef, useState } from 'react'
import './Register.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function Register() {
    const [profilePicture, setProfilePicture] = useState('')
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false)
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL
    const name = useRef();
    const email = useRef();
    const username = useRef();
    const status = useRef();
    const phone = useRef();
    const password = useRef();
    const cpassword = useRef();
    const from = useRef();
    const city = useRef();
    const website = useRef();
    const handleRegisterBtn = () => {
        try {
            if (!profilePicture || !email || !username || !password) {
                alert('Please fill up all the required data.')
            }
            else {
                setShowLoadingSpinner(true)
                const fd = new FormData();
                fd.append('name', name.current.value);
                fd.append('username', username.current.value);
                fd.append('email', email.current.value);
                fd.append('password', password.current.value);
                fd.append('contact', phone.current.value);
                fd.append('profilePicture', profilePicture);
                fd.append('status', status.current.value);
                fd.append('city', city.current.value)
                fd.append('from', from.current.value);
                fd.append('website', website.current.value);
                fd.forEach(e => {
                    console.log(e)
                })
                axios.post(`${REACT_APP_API_URL}/api/auth/register`, fd)
                    .then((data) => {
                        if (data.data.status === "1") {
                            alert(data.data.msg)
                        }
                        else if (data.data.status === "0") {
                            alert(data.data.msg)
                        }
                        else if (data.data.status === "2") {
                            alert(data.data.msg)
                        } else {
                            alert("Something went wrong")
                        }
                        setShowLoadingSpinner(false)
                    })
                    .catch((err) => {
                        console.log("err");
                        setShowLoadingSpinner(false)
                    })
            }

        } catch (error) {
            console.log(error)
        }
    }
    if (showLoadingSpinner) {
        return (
            <div>
                <div className='spinner'></div>
                <p style={{ fontSize: "20px", textAlign: "center", marginTop: "2%" }}>Please wait while we check your credentials</p>
            </div>
        )
    }
    return (
        <div className='Signup_div'>
            <div className="mid_Signup_div">
                <p>
                    Signup Now
                    <p style={{ fontSize: "20px", fontWeight: "500" }}>Connect to the world.</p>
                </p>
                <div>
                    <div className="input_Signup">
                        <input ref={name} type="text" placeholder='Enter fullname' />
                        <input type="email" ref={email} name="email" id="email" placeholder='Enter email' />
                        <input type="text" name="username" ref={username} id="username" placeholder='Enter username' />
                        <input type="password" placeholder='Enter password' ref={password} />
                        <input type="password" name="cpassword" id="cpassword" ref={cpassword} placeholder='Confirm password' />
                        <input type="number" placeholder='Enter contact number' ref={phone} />
                        <input type="text" placeholder='Enter status' ref={status} />
                        <input type="text" name="from" id="from" placeholder='Where are you from?' ref={from} />
                        <input type="text" placeholder='Enter city' ref={city} />
                        <input type="text" placeholder='Website link' ref={website} />
                        <input onChange={(e) => { setProfilePicture(e.target.files[0]) }} type="file" title='profile picture' />
                        <button onClick={handleRegisterBtn}>Signup</button>
                    </div>
                    <div className="dont_have_an_acc">
                        <p>Already have an account?</p>
                        <Link to='/login'> <button>Login</button></Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
