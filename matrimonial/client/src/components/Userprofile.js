import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import userpic from '../image_profiles/user.jpeg';
import { Link } from "react-router-dom";
const Userprofile = () => {
    const history = useHistory();
    const [userData, setUserData] = useState({});
    const [imagePath, setPath] = useState('');
    const calluserprofile = async () => {
        try {
            const res = await fetch("/about", {
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
                setUserData(data);
                setPath("http://localhost:5000/public/userProfiles/")
            }
        }
        catch (err) {
            console.log(err);
            history.push("/Login");
        }
    }
    useEffect(() => {
        calluserprofile();
    }, []);

    return (
        <>
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
                                        <hr/>
                            </div>
                        </div>
                    </div>
                    <center>
                    <Link to={`/Search/`}><button className="btn btn-warning btn-md">Back</button></Link>
                                &emsp;
                            <Link to={`/editprofile`}><button className="btn btn-success btn-md ">Edit Profile</button></Link>

                    </center>
                                    <br/>
                </form>
            </div>

        </>
    )
}

export default Userprofile;