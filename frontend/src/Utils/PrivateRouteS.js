import React, { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "../Components/Sidebar/Sidebar"
import AuthContext from "../Context/AuthContext"

const PrivateRoutes = () => {
    const navigate = useNavigate();
    const _user = useContext(AuthContext)
    useEffect(() => {
        if (!_user.user) {
            navigate("/login");
        }
    }, [_user]);
    
    return(
        <div className="app1">
            <div className=" border border-r-[#aca9a9]">
            < Sidebar />
            </div>
            <main className="content w-[100%]" >
                {/* <Topbar /> */}
                <Outlet />
            </main>
        </div>
    )
}
export default PrivateRoutes


// OLD
// import React from "react"
// import { Navigate, Outlet } from "react-router-dom"
// import { useContext } from "react"
// import AuthContext from "../Context/AuthContext"

// const PrivateRoutes = () => {
//     const _user = useContext(AuthContext)
//     return(
//         _user.user ? <Outlet />: <Navigate to="/login" /> 
//     )
// }
// export default PrivateRoutes

