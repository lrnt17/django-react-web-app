/*

represent a wrapper for or a protected route and the idea is if we wrap something in protected rout then we need
to have an authorization token before we'll be able to actually access this route

*/
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

// customer frontend
function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false)) // load protected route, if there is an error = false
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);

        try {
            const res = await api.post("/api/token/refresh/", {refresh: refreshToken});

            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }

        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    }

/*
    the idea if auth is to first look at our access token
    see if we have one and if we have one check if it's expired or not now if it's expired we want to just automatically
    refresh the token so that the user doesn't have to worry about anything and it just happens by itself in the
    background that's what this function will do now if we cannot refresh the token or it's expired then what we'll do
    is just say hey no you're not you're not authorized and you need to log in again by going to that login route so the
    first thing we're going to check is if you have the token so we're going to say const token is equal to local storage.
*/
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token) // decode the token if we have the token
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000

        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login"/>
}

export default ProtectedRoute