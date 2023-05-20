import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "../scenes/global/Sidebar"
import Topbar from "../scenes/global/Topbar"

const PrivateRoutes = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const Token = localStorage.getItem("adminToken");
        if (!Token) {
          navigate("/admin/login");
        }
      }, []);
    return(
        <div className="app1">
            < Sidebar />
            <main className="content" >
                <Topbar />
                <Outlet />
            </main>
        </div>
    )
}
export default PrivateRoutes