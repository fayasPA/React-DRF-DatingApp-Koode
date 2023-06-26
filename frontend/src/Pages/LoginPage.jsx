import React, { useContext, useEffect } from "react"
import Login from "../Components/Login/Login"
import { useNavigate } from "react-router-dom"
import AuthContext from "../Context/AuthContext"

function LoginPage() {
    const _user = useContext(AuthContext)
    const navigate = useNavigate();
    useEffect(() => {
        if (_user.user) {
            navigate("/")
        }
    }, [_user], navigate)

    return (
        <div className="bg-[#6b5b95] h-screen">
            <Login />
        </div>
    )
}

export default LoginPage