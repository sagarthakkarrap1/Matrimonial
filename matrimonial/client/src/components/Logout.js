import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../App";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Logout = () => {
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    const callLogout = async () => {
        try {
            const res = await fetch('/logout', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            if (res.status === 422 || !data) {
                window.alert(data.error);
            }
            else {
                dispatch({ type: "USER", payload: false });
                toast.success("Logged out successfully", { position: toast.POSITION.TOP_CENTER });
                history.push('/Login', { replace: true });
            }
        }
        catch (err) {
            console.log(err);
        }

    };
    useEffect(() => {
        callLogout();
    }, []);
    return (
        <>

        </>
    )
}

export default Logout;