import React, { useRef, useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import axios from 'axios';
export default function Login() {
    const [showLoadingSpinner, setShowLoadingSpinner] = useState(false)
    const email = useRef();
    const password = useRef();
    const handleLogin = () => {
        try {
            if (!email || !password) {
                alert('Please fill up all the required data.')
            }
            else {
                setShowLoadingSpinner(true);
                const loginData = {
                    email: email.current.value,
                    password: password.current.value
                }
                axios.post('/api/auth/login', loginData)
                    .then((data) => {
                        console.log(data.data)
                        setShowLoadingSpinner(false)
                        if (data.data.status === '1') {
                            localStorage.setItem('twitterdata', JSON.stringify(data.data.data));
                            window.location.href = '/'
                        }
                        else {
                            alert('Invalid Credentials')
                        }
                    })
                    .catch((err) => {

                        alert("Some thing went wrong.")
                        setShowLoadingSpinner(false)
                    })
            }

        } catch (error) {
            alert('Please try again later.')
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
        <div className='login_div'>
            <div className="mid_login_div">
                <p>
                    Login Now
                    <p style={{ fontSize: "20px", fontWeight: "500" }}>Connect to the world.</p>
                </p>
                <div>
                    <div className="input_login">
                        <input ref={email} type="email" name="email" id="email" placeholder='Enter email' />
                        <input ref={password} type="password" placeholder='Enter password' />
                        <button onClick={handleLogin}>Login</button>
                    </div>
                    <div className="dont_have_an_acc">
                        <p>Don't have an account?</p>
                        <Link to='/register'>
                            <button>Signup</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
