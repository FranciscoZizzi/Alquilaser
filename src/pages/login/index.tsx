import React, {useState} from "react";
import TextField from "../../components/textField/TextField";
import PasswordField from "../../components/textField/PasswordField";
import Button from "../../components/button/Button";
import {Link, Navigate, redirect, useHref, useNavigate} from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();



    const config = {
        clientId: '600400561126-hcggrf586pv642rdf4cv164rk6qcj8p0.apps.googleusercontent.com',
        buttonText: 'Login with Google',
        onSuccess: (response: any) => {
            handleGoogleLogin()
            console.log(response)
        },
        onFailure: (error: any) => {
            console.error(error);
        },
    };
    const handleGoogleLogin = async () => {
        window.location.href = 'http://localhost:3001/api/users/google'
    }

    const handleSubmit = async () => {
        try {
            if(localStorage.getItem("isGoogleSession") != null){
                localStorage.removeItem("isGoogleSession");
            }
            const res = await axios.post("http://localhost:3001/api/users/login", { email, password });
            const { token, profilePic } = res.data.data;

            localStorage.setItem("token", token);

            const profilePicDataURL = URL.createObjectURL(new Blob([profilePic], { type: 'image/jpeg' })); // Adjust MIME type if needed

            localStorage.setItem("profilePic", profilePicDataURL);

            navigate('/');
        } catch(e: any) {
            setEmailError(e.response.data.emailError);
            setPasswordError(e.response.data.passwordError);
            setErrorMessage(e.response.data.message);
        }
    };


    return (
        <div style = {{
            backgroundColor: '#e0f0fd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh'
        }}>
            <div style={{
                height: 700,
                width: 360
            }}>
                <h1 style={{
                    color: '#021452'
                }}>
                    Login
                </h1>
                <div style={{
                    fontSize: '16px',
                }}>
                    <TextField value={email} placeholder={"Email"} onChange={setEmail} isError={emailError}/>
                    <PasswordField value={password} placeholder={"Password"} onChange={setPassword} isError={passwordError}/>
                    <Button onClick={handleSubmit}>Login</Button>
                    <div style={{
                        marginTop: '1px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px', // Adds some space between the links
                    }}>
                        <p style={{color: 'red'}}>{errorMessage}</p>
                        <Link to="/forgot_password">Forgot password?</Link>
                    <span>
                        {/*TODO use navigate*/}
                        Don't have an account? <Link to="/register">Register</Link>
                    </span>
                        <span>
                        or
                    </span>
                        <span>
                    <Link to="/">Continue without signing in</Link>
                    </span>
                        <span>
                            <div>
                                <Button onClick={handleGoogleLogin}>Google Login</Button>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage