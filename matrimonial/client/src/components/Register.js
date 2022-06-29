import { render } from "@testing-library/react";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Login/login/css/style.css";
import "../Login/login/fonts/material-icon/css/material-design-iconic-font.min.css";
toast.configure()
// import { useState } from "react-router-dom";


const Register = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        dob: "",
        age: "",
        gender: "",
        phone: "",
        profile: "",
        marital_status: "",
        mother_tongue: "",
        religion: "",
        city: "",
        pincode: "",
    });


    let name, value;
    const details_input = (event) => {
        name = event.target.name;
        value = event.target.value;
        setUser({ ...user, [name]: value });
    }
    const imageUpload = (event) => {
        setUser({ ...user, profile: event.target.files[0] });
    }
    const PostData = async (event) => {
        // console.log(user.email + user.password
        //     + user.profile);
        event.preventDefault();
        let errors = {};
        let isError = false;
        if (!user.name) {
            errors.nameError = "Username is required";
            toast.error(errors.nameError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        }
        if (!user.email) {
            errors.emailError = "Email is required";
            toast.error(errors.emailError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        }
        else if (!/\S+@\S+\.\S+/.test(user.email)) {
            errors.emailError = "Email address is invalid";
            toast.error(errors.emailError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        }
        if (!user.password) {
            errors.passwordError = "Password is required";
            toast.error(errors.passwordError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        }
        if (user.password != user.confirmpassword) {
            toast.error("Password & Confirm Password does not match", { position: toast.POSITION.TOP_CENTER });
            isError = true;
        }
        if (!user.dob) {
            errors.dobError = "Date of Birth is Required";
            toast.error(errors.dobError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        }
        if (!user.gender) {
            errors.genderError = "Gender is Required";
            toast.error(errors.genderError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        }
        if (!user.age) {
            errors.ageError = "Age is required";
            toast.error(errors.ageError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        }
        else if (isNaN(user.age)) {
            errors.ageError = "Age must be a number";
            toast.error(errors.ageError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        }
        else if (parseInt(user.age) < 18) {
            errors.ageError = "Age must be greater than 18";
            toast.error(errors.ageError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        }
        if (!user.phone) {
            errors.phoneError = "Phone number is required";
            toast.error(errors.phoneError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        } else if (isNaN(user.phone)) {
            errors.phoneError = "Invalid phone number";
            toast.error(errors.phoneError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        } else if (user.phone.length != 10) {
            errors.phoneError = "Phone number must have exactly 10 digits";
            toast.error(errors.phoneError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        }
        if (!user.profile) {
            errors.imageError = "Please upload your profile image";
            toast.error(errors.imageError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        }
        if (!user.city) {
            errors.cityError = "Please select city";
            toast.error(errors.cityError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        }
        if (!user.mother_tongue) {
            errors.mother_tongueError = "Please select your mother tongue";
            toast.error(errors.mother_tongueError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        }
        if (!user.marital_status) {
            errors.marital_statusError = "Please select your marital status";
            toast.error(errors.marital_statusError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        }
        if (!user.religion) {
            errors.religionError = "Please select your religion";
            toast.error(errors.religionError, { position: toast.POSITION.TOP_CENTER });
            isError = true;
        }
        if (!isError) {
            const formdata = new FormData();
            formdata.append('profile', user.profile, user.profile.name)
            formdata.append('name', user.name)
            formdata.append('age', user.age)
            formdata.append('dob', user.dob)
            formdata.append('gender', user.gender)
            formdata.append('phone', user.phone)
            formdata.append('email', user.email)
            formdata.append('password', user.password)
            formdata.append('marital_status', user.marital_status)
            formdata.append('mother_tongue', user.mother_tongue)
            formdata.append('religion', user.religion)
            formdata.append('city', user.city)
            formdata.append('pincode', user.pincode)
            console.log(formdata);
            const res = await fetch("/register", {
                method: "POST",

                body: formdata
            });
            const data = await res.json();
            if (res.status === 422 || !data) {
                toast.error(data.error, { position: toast.POSITION.TOP_CENTER });
                // window.alert(data.error);
            } else {
                toast.success("Registration successful", { position: toast.POSITION.TOP_CENTER });
                history.push("/Login")
                // window.alert("Registration successful");
            }
        }

        // alert(user.name + user.email + user.dob );
    };

    return (
        <>
            <br /><br /><br />
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" action="/register" id="register-form" encType="multipart/form-data">
                                <div className="form-group">
                                    <label for="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="name" onChange={details_input} value={user.name} id="name" placeholder="Your Name" />
                                </div>

                                <div className="form-group">
                                    <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" onChange={details_input} name="password" id="password" placeholder="Password" />
                                </div>

                                <div className="form-group">
                                    <label for="name"><i className="zmdi zmdi-account material-icons-name "></i></label>
                                    <input type="date" id="dob" placeholder="Birth Date" onChange={details_input} name="dob" value={user.dob} required />
                                </div>

                                <div className="form-group">
                                    <label for="phone"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="phone" id="phone" maxLength="10" onChange={details_input} value={user.phone} placeholder="Mobile Number" required />

                                </div>

                                <div className="form-group">
                                    <label for="city"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="city" id="city" onChange={details_input} value={user.city} placeholder="city" required />

                                </div>

                                <div className="form-group">
                                    <label for="city"><i className="zmdi zmdi-hc-fw"></i></label>
                                    <input type="file" maxLength="10" name="profile" onChange={imageUpload} ></input>
                                    {/* <input type="file" name="profile" onChange={details_input} value={user.image} id="profile" placeholder="image" required /> */}
                                </div>
                                <div className="form-group">
                                    <label for="pincode"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="pincode" id="pincode" onChange={details_input} value={user.pincode}
                                        placeholder="pincode" required />
                                </div>



                                <div className="form-group form-button">
                                    <input type="submit" name="signup" onClick={PostData} id="signup" className="form-submit" value="Register" />
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <br /> <br />
                            <div className="form-group">
                                <label for="email"><i className="zmdi zmdi-email"></i></label>
                                <input type="email" name="email" onChange={details_input} id="email" placeholder="Your Email" />
                            </div>

                            <div className="form-group">
                                <label for="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                <input type="password" onChange={details_input} name="confirmpassword" id="confirmpassword" placeholder="Repeat your password" />
                            </div>

                            <div className="form-group">
                                <label for="age"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                <input type="text" onChange={details_input} value={user.age} name="age" id="age" placeholder="your age" required />
                            </div>

                            <div className="form-group">

                                <select name="gender" placeholder="Select Gender" className="dropdown block-size form-select" onChange={details_input}
                                    value={user.gender}>
                                    <option value="" disabled="disable" selected>Select Gender</option>
                                    <option value="Male" >Male</option>
                                    <option value="Female" >Female</option>
                                </select>


                            </div>

                            <div className="form-group">

                                <select name="mother_tongue" id="mother_tongue" className="dropdown form-select" onChange={details_input} value={user.mother_tongue} required>
                                    <option value="" selected="selected" disabled="disable">Please Select Mother Tongue</option>

                                    <option value="Hindi">Hindi</option>
                                    <option value="Punjabi">Punjabi</option>
                                    <option value="Bihari">Bihari</option>
                                    <option value="Rajasthani">Rajasthani</option>
                                    <option value="Haryanvi">Haryanvi</option>
                                    <option value="Himachali">Himachali</option>
                                    <option value="Kashmiri">Kashmiri</option>
                                    <option value="Sindhi">Sindhi</option>
                                    <option value="Urdu">Urdu</option>

                                    <option value="Marathi">Marathi</option>
                                    <option value="Gujarati">Gujarati</option>
                                    <option value="Kutchi">Kutchi</option>

                                    <option value="Konkani">Konkani</option>
                                    <option value="Sindhi">Sindhi</option>

                                    <option value="Tamil">Tamil</option>
                                    <option value="Telugu">Telugu</option>
                                    <option value="Kannada">Kannada</option>
                                    <option value="Malayalam">Malayalam</option>
                                    <option value="Tulu">Tulu</option>
                                    <option value="Urdu">Urdu</option>


                                    <option value="Bengali">Bengali</option>
                                    <option value="Oriya">Oriya</option>
                                    <option value="Assamese">Assamese</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="English">English</option>
                                </select>



                            </div>
                            <div className="form-group">

                                <select name="marital_status" id="marital_status" className="dropdown form-select" placeholder="Status" onChange={details_input}
                                    value={user.marital_status} required >
                                    <option value="" selected="selected" disabled="disable">Please Select</option>
                                    <option value="Never Married">Never Married</option>
                                    <option value="Married">Married</option>
                                    <option value="Awaiting Divorce">Awaiting Divorce</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                    <option value="Annulled">Annulled</option>
                                </select>

                            </div>
                            <div className="form-group">

                                <select name="religion" id="religion" onChange={details_input} className="dropdown form-select" value={user.religion} required>
                                    <option value="" selected="selected" disabled="disable" >Select a Religion</option>
                                    <option value="Hindu">Hindu</option>
                                    <option value="Muslim">Muslim</option>
                                    <option value="Sikh">Sikh</option>
                                    <option value="Christian">Christian</option>
                                    <option value="Buddhist">Buddhist</option>
                                    <option value="Jain">Jain</option>
                                    <option value="Parsi">Parsi</option>
                                    <option value="Jewish">Jewish</option>
                                    <option value="Bahai">Bahai</option>
                                </select>
                            </div>

                            {/* <figure><img src="images/signup-image.jpg" alt="sing up image" /></figure> */}
                            <Link to="/Login" className="signup-image-link">I am already member</Link>
                        </div>
                    </div>
                </div>
            </section>




        </>
    );
}

export default Register