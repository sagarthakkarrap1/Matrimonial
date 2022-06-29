import React, { useContext, useEffect, useState } from "react";
import userpic from '../image_profiles/user.jpeg';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import "../web/css/bootstrap.css";
import "../web/css/style1.css";


require('dotenv').config();
const Home = () => {

    const [query, setQuery] = useState({
        gtage: "18",
        ltage: "",
        gender: "Male",
        religion: "Hindu"
    });

    let name, value;
    const details_input = (event) => {
        name = event.target.name;
        value = event.target.value;
        setQuery({ ...query, [name]: value });
    }
    const [userData, setState] = useState([]);
    const [imagePath, setPath] = useState('');

    const PostData = async (event) => {
        console.log("search oanks");
        event.preventDefault();
        const { gtage, ltage, gender, religion } = query;

        if (gtage < 18) {
            toast.error("Minimum age should be 18.", { position: toast.POSITION.TOP_CENTER });
        }
        else {
            const res = await fetch("/filter", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    gtage, ltage, gender, religion
                })
            });
            const data = await res.json();
            if (res.status === 422 || !data) {
                toast.error(data.error, { position: toast.POSITION.TOP_CENTER });
            } else {
                toast.success("Matches found! Scroll down to see", { position: toast.POSITION.TOP_CENTER });
                setState(data);
                setPath("http://localhost:5000/public/userProfiles/")
                console.log(data);
            }
        }
    }
    return (
        <div>
            <div class="w3layouts-banner" id="home">
                <div class="agileits-register">
                    <h3>Search your PARTNER!</h3>
                    <form method="POST">

                        <div class="w3_modal_body_grid row">

                            <span>Age :</span>
                            <div className="col-md-4"><input className="form-control" width="50px" type="number" name="gtage" id="gtage" onChange={details_input} value={query.gtage} placeholder="From" /></div>
                            -
                            <div className="col-md-4">
                                <input className="form-control" width="20px" type="number" name="ltage" onChange={details_input} value={query.ltage} placeholder="To" />
                            </div>



                        </div>
                        <br />

                        <div class="w3_modal_body_grid">
                            <span>Gender :</span>
                            <select id="w3_country" name="gender" onChange={details_input} value={query.gender} class="frm-field required">
                                <option value="Male">Male</option>
                                <option value="Female" >Female</option>
                            </select>
                        </div>

                        <br />
                        <div class="w3_modal_body_grid">
                            <span>religion:</span>
                            <select id="w3_country1" name="religion" onChange={details_input} value={query.religion} class="frm-field required">
                                <option value="Hindu" selected="true" >Hindu</option>
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



                        <input type="submit" onClick={PostData} value="Find Match" />

                        <p class="w3ls-login">Already a member? <a href="/login" data-toggle="modal" data-target="#myModal">Login</a></p>
                    </form>
                </div>




            </div>
            <section id="services" class="services section-bg mt-5">
                <div Cssclass="container" data-aos="fade-up">
                    <div CssClass="row" >
                        {userData && userData.map((item, index) => {


                            return (
                                <div data-aos="zoom-in" data-aos-delay="100">
                                    <div class="box">

                                        <img src={item.profile ? imagePath + item.profile : userpic} width="150px" />
                                        <p key={index}>
                                            <p><i className="zmdi zmdi-account material-icons-name "></i>&nbsp;{item.name}</p>
                                            <p>{item.age} yrs</p>
                                            <p>{item.gender}</p>
                                            <p>{item.religion}</p>
                                            <p><i className="zmdi zmdi-calendar"></i>&nbsp;{item.dob}</p>
                                            <p><i className="zmdi zmdi-email"></i>&nbsp;{item.email}</p>
                                            <p><i className="zmdi zmdi-phone"></i>&nbsp;{item.phone}</p>
                                            <Link to={`/viewprofile/${item._id}`}><button className="btn btn-warning">View Profile</button></Link>
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </section>

            <div class="w3l_find-soulmate text-center">
                <h3>Find Your Soulmate</h3>
                <center>
                    <div class="container">

                        <NavLink className="scroll" to="/register">
                            <div class="col-md-3 w3_soulgrid">
                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                <h3>Sign Up</h3>
                                <p>Upload your profile</p>
                            </div>
                        </NavLink>
                        <NavLink className="scroll" to="/search">
                            <div class="col-md-3 w3_soulgrid">
                                <i class="fa fa-search" aria-hidden="true"></i>
                                <h3>Search</h3>
                                <p>Search for right partner</p>
                            </div>
                        </NavLink>
                        <NavLink className="scroll" to="/login">
                            <div class="col-md-3 w3_soulgrid">
                                <i class="fa fa-users" aria-hidden="true"></i>
                                <h3>Connect</h3>
                                <p>Find perfect Match</p>
                            </div>
                        </NavLink>
                        <br />
                        {/* <a class="scroll" href="#home">
                            <div class="col-md-2 w3_soulgrid">
                                <i class="fa fa-comments-o" aria-hidden="true"></i>
                                <h3>Interact</h3>
                                <p>Start Conversation</p>
                            </div>
                        </a>&emsp; */}



                    </div>
                    <br />
                </center>
            </div>
            <br />
            <div class="agile-assisted-service text-center">
                <h4>Assisted Service</h4>
                <p>Our Relationship Managers have helped thousands of members find their life partners.</p>

            </div>
        </div>
    )
}

export default Home