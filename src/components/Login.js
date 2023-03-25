import "./SignUp.css"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useForm } from "react-hook-form";
const Login = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });
    const login = (e) => {

        let DATA = {
            email: loginDetails.email,
            password: loginDetails.password
        }
        localStorage.setItem('userId', DATA.email)
        localStorage.setItem('userId', DATA.email)
         axios.post('http://localhost:5000/api/user/login', DATA)
                .then(function (response) {
                     console.log(response.data.message);
                    const res = response.data.message
                     console.log(res);
                     if (res === "Login successful") {
                            // console.log("Hello")
                            localStorage.setItem('token', response.data.token)
                            // navigate('/dashboard')
                        }
                        else {
        
                            alert(response.data.message)
                            localStorage.setItem('token', "BLOGS " + response.data.token)
                            console.log(localStorage, localStorage.token)
                            // headers: {
                            //         Authorization: localStorage.getItem('token')
                            //      }
                            alert(response.data.message)
                            navigate('/dashboard')
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                        alert(error)
                    });
            
    }

    return <div className="main-box">
        <section className="information">
            <p className="login-para">Sign In</p>   
            <form onSubmit={handleSubmit(login)} className="input-form">
                <label htmlFor="email" >Email Address</label><br/>
             <input className="form-input" type="email" placeholder="Mail Id"
                    {...register("email", {
                        required: "Please Enter Your Email!",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please Enter A Valid Email!",
                        },
                    })}
                    onChange={(e) =>
                        setLoginDetails({ ...loginDetails, email: e.target.value })
                    }
                    value={loginDetails.email} /><br />
                {errors.email && (
                    <p className="error">* {errors.email.message}</p>
                )}
                <label htmlFor="email" >Password</label><br/>

                <input className="form-input" type="password" placeholder="password"
                    {...register("password", {
                        required: "Please Enter Your Password",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long!",
                        },
                    })}
                    onChange={(e) =>
                        setLoginDetails({ ...loginDetails, password: e.target.value })

                    }
                    value={loginDetails.password}
                /><br />

                {errors.password && (
                    <p className="error">* {errors.password.message}</p>
                )}
                < input type="checkbox" className="checkbox" />
                <span>  Remember me?</span><br/>
                <button className="btn-button" >Login</button>
            </form>
            <div className="signup-link">
                <span>Need an Account? </span>
                <Link to="/signup">
                    <span className="signup-link1">Sign Up</span>
                </Link>
            </div>
        </section >

    </div >
}
export default Login;

