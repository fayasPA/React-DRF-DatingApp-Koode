import React, { useContext, useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "../Components/Sidebar/Sidebar"
import AuthContext from "../Context/AuthContext"
import SocketContext from "../Context/SocketContext"

const PrivateRoutes = () => {
    const navigate = useNavigate();
    const _user = useContext(AuthContext)
    const Token = localStorage.getItem('user_id')
    useEffect(() => {
        if (!_user.user) {
            navigate("/login");
        }
    }, [_user]);

    // Websocket start
    const [not_socket, setNot_socket] = useState(null);
    useEffect(() => {
        if (Token) {
            const notSocket = new WebSocket(`wss://www.koode.live/ws/notification/${Token}/`);
            // const notSocket = new WebSocket(`ws://localhost:8000/ws/notification/${Token}/`);
            notSocket.onopen = () => {
                console.log('Notification WebSocket connection established.');
            };

            notSocket.onclose = () => {
                console.log('Notification WebSocket connection closed.');
            }
            setNot_socket(notSocket)
            return () => {
                notSocket.close()
            }
        }
    }, [])
    // Websocket ends

    return (
        <div className="app1">

            <SocketContext.Provider value={not_socket} >
                <div className=" border border-r-[#aca9a9]">
                    < Sidebar />
                </div>
                <main className="content w-[100%]" >
                    <Outlet />
                </main>
            </SocketContext.Provider>
        </div>
    )
}
export default PrivateRoutes
