import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginUser = async (e) => {
        e.preventDefault();
        if (!password) {
            toast.error("Password is required", { position: toast.POSITION.TOP_CENTER });
        }
        if (!email) {
            toast.error("Email is required", { position: toast.POSITION.TOP_CENTER });
        }
        else {
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await res.json();
            if (res.status === 422 || !data) {
                toast.error(data.error, { position: toast.POSITION.TOP_CENTER });
            }
            else {
                dispatch({ type: "USER", payload: true })
                toast.success("Login successful", { position: toast.POSITION.TOP_CENTER });

                history.push("/home");
            }
        }

        // alert(email + password);
    }
    return (
        <>
            <br /><br /><br />
            <section class="sign-in">
                <div class="container">
                    <div class="signin-content">


                        <div class="signin-form">
                            <h2 class="form-title">Log In</h2>
                            <form method="POST" class="register-form" id="login-form">
                                <div class="form-group">
                                    <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="email" name="your_name" id="your_name" placeholder="Your Name" onChange={(e) => setEmail(e.target.value)} value={email} />
                                </div>
                                <div class="form-group">
                                    <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="your_pass" id="your_pass" placeholder="Password" />
                                </div>

                                <div class="form-group form-button">
                                    <input type="submit" name="signin" id="signin" class="form-submit" onClick={loginUser} value="Log in" />
                                </div>
                                <Link to="/Register">New User?</Link>
                            </form>

                        </div>
                    </div>
                </div>
            </section>


        </>
    );
}

export default Login;