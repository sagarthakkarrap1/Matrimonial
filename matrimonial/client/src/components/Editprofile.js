import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import userpic from '../image_profiles/user.jpeg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Login/login/css/style.css";
import "../Login/login/fonts/material-icon/css/material-design-iconic-font.min.css";
toast.configure();

const Editprofile = () => {
    const history = useHistory();
    const [imagePath, setPath] = useState('');
    const [newImage, setImage] = useState('');
    const [user, setUser] = useState({});

    const callProfile = async () => {
        try {
            const res = await fetch("/edit", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"

            });
            const data = await res.json();
            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
            else {
                setUser(data);
                setPath("http://localhost:5000/public/userProfiles/")
            }
        }
        catch (err) {
            console.log(err);
            history.push("/Login");
        }
    }

    let name, value;
    const details_input = (event) => {
        name = event.target.name;
        value = event.target.value;
        setUser({ ...user, [name]: value });
    }
    const imageUpload = (event) => {
        setImage(event.target.files[0]);
    }
    useEffect(() => {
        callProfile();
    }, []);

    const UpdateData = async (event) => {
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
        } else if (user.phone.toString().length != 10) {
            window.alert(user.phone);
            errors.phoneError = "Phone number must have exactly 10 digits";
            toast.error(errors.phoneError, { position: toast.POSITION.TOP_CENTER });
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
            formdata.append('_id', user._id);
            if (newImage) {
                formdata.append('profile', newImage, newImage.name)
            }
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
            const res = await fetch("/update", {
                method: "POST",
                credentials: "include",
                body: formdata
            });

            const data = await res.json();
            if (res.status === 422 || !data) {
                toast.error(data.error, { position: toast.POSITION.TOP_CENTER });

            } else {
                toast.success("Updation successful", { position: toast.POSITION.TOP_CENTER });
                history.push("/userprofile");
            }
        }

    }
    const DeleteData = async (event) => {
        event.preventDefault();
        const res = await fetch("/delete", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        const data = await res.json();
        if (res.status === 422 || !data) {
            toast.error(data.error, { position: toast.POSITION.TOP_CENTER });
            callProfile();
        } else {
            toast.success("Profile deleted successful", { position: toast.POSITION.TOP_CENTER });
            history.push("/Logout");
        }
    }

    return (
        <>
            <br />
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Manage Profile</h2>
                            <img src={user.profile ? imagePath + user.profile : userpic} width="145px" alt="" /><br /><br />
                            <form method="POST" className="register-form" action="/register" id="register-form" encType="multipart/form-data">
                                <div className="form-group">
                                    {/* <span><h6>Upload New Profile</h6></span> */}

                                    <input type="file" maxLength="10" name="profile" onChange={imageUpload} ></input>
                                </div>


                                <div className="form-group">
                                    <label for="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="name" onChange={details_input} value={user.name} id="name" placeholder="Your Name" />
                                </div>

                                <div className="form-group">
                                    <label for="name"><i className="zmdi zmdi-account material-icons-name "></i></label>
                                    <input type="date" id="dob" placeholder="Birth Date" onChange={details_input} name="dob" value={user.dob} required />
                                </div>
                                <div className="form-group">
                                    <label for="age"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" onChange={details_input} value={user.age} name="age" id="age" placeholder="your age" required />
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
                                    <label for="pincode"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="pincode" id="pincode" onChange={details_input} value={user.pincode}
                                        placeholder="pincode" required />
                                </div>


                                <br />
                                <div className="row">
                                    <div className="form-group form-button col">
                                        <input type="submit" name="signup" onClick={UpdateData} id="signup" className="btn btn-success btn-lg btn-block" value="Update" />
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <br /> <br /><br /> <br /><br /><br /><br /><br /><br />

                            <div className="form-group">
                                <label for="email"><i className="zmdi zmdi-email"></i></label>
                                <input type="email" name="email" onChange={details_input} value={user.email} id="email" placeholder="Your Email" />
                            </div>
                            <div className="form-group">
                                <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" onChange={details_input} name="password" id="password" placeholder="New Password" />
                            </div>
                            <div className="form-group">
                                <label for="pass"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" onChange={details_input} name="confirmpassword" id="confirmpassword" placeholder="Confirm New Password" />
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
                                    <option value={user.mother_tongue} selected="selected" disabled="disable">Please Select Mother Tongue</option>
                                    <optgroup label="&nbsp;"></optgroup>
                                    <optgroup label="North">
                                        <option value="Hindi/ Delhi">Hindi/ Delhi</option>
                                        <option value="Hindi /Madhya Pradesh / Bundelkhand / Chattisgarhi">Hindi /Madhya Pradesh / Bundelkhand / Chattisgarhi</option>
                                        <option value="Hindi/U.P./Awadhi/ Bhojpuri/Garhwali">Hindi/U.P./Awadhi/ Bhojpuri/Garhwali</option>
                                        <option value="Punjabi">Punjabi</option>
                                        <option value="Bihari/Maithili/Magahi">Bihari/Maithili/Magahi</option>
                                        <option value="Rajasthani / Marwari / Malwi / Jaipuri">Rajasthani / Marwari / Malwi / Jaipuri</option>
                                        <option value="Haryanvi">Haryanvi</option>
                                        <option value="Himachali/Pahari">Himachali/Pahari</option>
                                        <option value="Kashmiri/Dogri">Kashmiri/Dogri</option>
                                        <option value="Sindhi">Sindhi</option>
                                        <option value="Urdu">Urdu</option></optgroup>
                                    <optgroup label="&nbsp;&nbsp;"></optgroup>
                                    <optgroup label="West">
                                        <option value="Marathi">Marathi</option>
                                        <option value="Gujarati">Gujarati</option>
                                        <option value="Kutchi">Kutchi</option>
                                        <option value="Hindi /Madhya Pradesh / Bundelkhand / Chattisgarhi">Hindi /Madhya Pradesh / Bundelkhand /  Chattisgarhi</option>
                                        <option value="Konkani">Konkani</option>
                                        <option value="Sindhi">Sindhi</option></optgroup>
                                    <optgroup label="&nbsp;&nbsp;&nbsp;"></optgroup>
                                    <optgroup label="South">
                                        <option value="Tamil">Tamil</option>
                                        <option value="Telugu">Telugu</option>
                                        <option value="Kannada">Kannada</option>
                                        <option value="Malayalam">Malayalam</option>
                                        <option value="Tulu">Tulu</option>
                                        <option value="Urdu">Urdu</option></optgroup>
                                    <optgroup label="&nbsp;&nbsp;&nbsp;&nbsp;"></optgroup>
                                    <optgroup label="East">
                                        <option value="Bengali">Bengali</option>
                                        <option value="Oriya">Oriya</option>
                                        <option value="Assamese">Assamese</option>
                                        <option value="Sikkim/ Nepali/ Lepcha/ Bhutia/ Limbu">Sikkim/ Nepali/ Lepcha/ Bhutia/ Limbu</option></optgroup>
                                    <optgroup label="---------"><option value="English">English</option></optgroup>
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
                            <br />
                            <div className="form-group form-button col">
                                <input type="submit" className="btn btn-danger btn-lg btn-block" name="signup" onClick={DeleteData} id="signup" value="Delete Profile" />
                            </div>

                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}

export default Editprofile;