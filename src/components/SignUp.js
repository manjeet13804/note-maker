import "./SignUp.css"
import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import {AiOutlineLeft} from "react-icons/ai"
function Signup() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();
    const [sigupDetails, setSignDetails] = useState({
        email: "",
        password: "",
        repeatPassword: "",
       checkbox:false
    });
    async function onSubmit() {
             const options = {
            method: 'GET',
            url: 'https://mailcheck.p.rapidapi.com/',
            params: { domain: sigupDetails.email },
            headers: {
                'X-RapidAPI-Key': '080d5c1b4emsh5a99b990e190ee5p167317jsn191d459fc152',
                'X-RapidAPI-Host': 'mailcheck.p.rapidapi.com'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data)
            if (!response.data.disposable && (response.data.risk === 8 || response.data.risk === 10)) {
                    const { email, password } = sigupDetails;   
                    axios
                        .post("http://localhost:5000/api/user/signup", {
                            email: email,
                            password: password,
                        })
                        .then((res) => navigate("/"))
                        .catch((err) => alert("Email already Exists"));
            }
            else {
                alert("please enter a valid  non disposable email")
            }
        }).catch(function (error) {
            console.error(error);
        });

    }

    return <div className="main-box">
        <section className="information">
            <p className="signup-para"><Link to="/">{<AiOutlineLeft/>}</Link> S I G N   U P</p>
            <form className="form" onSubmit={handleSubmit(onSubmit)} >
                <input className="form-control" type="email" placeholder="EMAIL"
                    {...register("email", {
                        required: "Please Enter Your Email!",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Please Enter A Valid Email!",
                        },
                    })}
                    onChange={(e) =>
                        setSignDetails({ ...sigupDetails, email: e.target.value })
                    }
                    value={sigupDetails.email} /><br />

                {errors.email && (
                    <p className="error">* {errors.email.message}</p>
                )}

                <input className="form-control form-control-md" type="password" placeholder="PASSWORD"
                    {...register("password", {
                        required: "Please Enter Your Password",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters long!",
                        },
                    })}
                    onChange={(e) =>
                        setSignDetails({ ...sigupDetails, password: e.target.value })

                    }
                    value={sigupDetails.password}
                /><br />

                {errors.password && (
                    <p className="error">* {errors.password.message}</p>
                )}

                <input className="form-control" type="password" placeholder="REPEAT PASSWORD"
                    {...register("repeatPassword", {
                        required: "Please Reapeat Your Password",
                        validate: (match) => {
                            const password = getValues("password");
                            return match === password || "Passwords should match!";
                        },
                    })}
                    onChange={(e) =>
                        setSignDetails({ ...sigupDetails, repeatPassword: e.target.value })
                    }
                    value={sigupDetails.repeatPassword} />

                {errors.repeatPassword && (
                    <p className="error">* {errors.repeatPassword.message}</p>
                )}
                <input  type="checkbox"
                    {...register("checkbox", {
                        required: "Please accept terms and Conndition",
                       
                    })}
                    onChange={(e) =>
                        setSignDetails({ ...sigupDetails, checkbox:!sigupDetails.checkbox })
                    }
                    value={sigupDetails.checkbox} />
                    <span>  I agree with Terms & Conndition</span><br />

                {errors.checkbox && (
                    <p className="error">* {errors.checkbox.message}</p>
                )}

                <button type="submit" className="btn-button-1">CONTINUE</button>

            </form>
        </section>

    </div>
}

export default Signup;

