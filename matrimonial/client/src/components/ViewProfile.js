import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import userpic from '../image_profiles/user.jpeg';
import '../index.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


const ViewProfile = () => {
    const history = useHistory();
    const [userData, setUserData] = useState({});
    const [imagePath, setPath] = useState('');
    const id = useParams().id;
    console.log(id);
    const calluserprofile = async (id) => {
        try {
            const res = await fetch("/view", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    id
                })
            });
            const data = await res.json();
            if (res.status === 422 || !data) {
                toast.error(data.error, { position: toast.POSITION.TOP_CENTER });
                // window.alert(data.error);
            } else {
                setUserData(data);
                setPath("http://localhost:5000/public/userProfiles/")
                // toast.success("Registration successful",{position: toast.POSITION.TOP_CENTER});
                // window.alert("Registration successful");
            }
            console.log(data);

        }
        catch (err) {
            console.log(err);
            history.push("/Search");
        }
    }
    useEffect(() => {
        calluserprofile(id);
    }, [id]);
    return (
        <>
            <br /><br />
            <div class="container ">
                <form method="post">
                    <br /><br />
                    <div class="row">
                        <div class="col-md-4">
                            <div class="profile-img">
                                <img src={userData.profile ? imagePath + userData.profile : userpic} width="145px" alt="" />

                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="profile-head">
                                <h5>
                                    {userData.name}
                                </h5>

                                <hr />

                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Name</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{userData.name}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Email</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{userData.email}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Phone Number</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{userData.phone}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Age</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{userData.age}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Date of Birth</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{userData.dob}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Gender</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{userData.gender}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Marital Status</h5>
                                    </div>

                                    <div className="col-md-6">
                                        <p>{userData.marital_status}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Mother Tongue</h5>
                                    </div>

                                    <div className="col-md-6">
                                        <p>{userData.mother_tongue}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Religion</h5>
                                    </div>

                                    <div className="col-md-6">
                                        <p>{userData.religion}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>City</h5>
                                    </div>

                                    <div className="col-md-6">
                                        <p>{userData.city}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h5>Pincode</h5>
                                    </div>

                                    <div className="col-md-6">
                                        <p>{userData.pincode}</p>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>

                    </div>
                    <center>
                        <Link to={`/Search/`}><button className="btn btn-warning btn-md">Back</button></Link>
                    </center>
                    <br />
                </form>
            </div>
            <br />
        </>
    )
}


export default ViewProfile;
