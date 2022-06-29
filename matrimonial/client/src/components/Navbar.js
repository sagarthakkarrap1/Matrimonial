import React, { useContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
    const { state, dispatch } = useContext(UserContext);
    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky">
                        <NavLink class="navbar-brand" to="/"> <i>Matri<span class="text-primary">monial</span>Website</i></NavLink>


                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item active">
                                    <NavLink className="btn btn-warning ml-lg-2" to="/">Home </NavLink>
                                </li>
                                &emsp;
                                <li class="nav-item">
                                    <NavLink className="btn btn-primary ml-lgx" to="/search">Search</NavLink>
                                </li>
                                &emsp;
                                <li class="nav-item">
                                    <NavLink className="btn btn-success ml-lg-2" to="/userprofile">UserProfile</NavLink>
                                </li>
                                &emsp;
                                <li class="nav-item">
                                    <NavLink className="btn btn-danger ml-lg-2" to="/editprofile">Manage Profile</NavLink>
                                </li>
                                &emsp;
                                <li class="nav-item">
                                    <NavLink className="btn btn-warning ml-lg-2" to="/logout">Logout</NavLink>
                                </li>
                                &emsp;
                            </ul>
                        </div>
                    </nav>
                </>
            )
        }
        else {
            return (
                <>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <NavLink class="navbar-brand" to="/"> <i>Matri<span class="text-primary">monial</span>Website</i></NavLink>


                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ms-auto">
                                <li class="nav-item">
                                    <NavLink className="btn btn-warning ml-lg-2" to="/home">Home </NavLink>
                                </li>
                                &emsp;
                                <li class="nav-item">
                                    <NavLink className="btn btn-primary ml-lg-2" to="/search">Search</NavLink>
                                </li>
                                &emsp;
                                <li class="nav-item">
                                    <NavLink className="btn btn-danger ml-lg-2" to="/login">Login</NavLink>
                                </li>
                                &emsp;
                                <li class="nav-item">
                                    <NavLink className="btn btn-success ml-lg-2" to="/register">Registration</NavLink>
                                </li>
                                &emsp;
                            </ul>
                        </div>
                    </nav>
                </>
            )
        }
    }
    return (
        <>
            <div className="menu_style">
                <RenderMenu />
            </div>
        </>
    )

}

export default Navbar