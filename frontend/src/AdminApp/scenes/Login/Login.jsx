import { Link } from "react-router-dom"
import { FaHandsHelping } from "react-icons/fa"
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../axios";
// import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

import { useDispatch } from "react-redux";
import { changeAdmin } from "../../Redux/adminReducer";
import { adminLogin } from "../../Constants/Constants";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const Token = localStorage.getItem("adminToken");
    if (Token) {
      navigate("/admin/");
    }
  }, [navigate]);

  const dispatch = useDispatch();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const Submit = (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      username,
      password,
    });
    axios
      .post(adminLogin, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        localStorage.setItem("adminToken", (res.data.data.username));
        let token = String(res.data.data.username);
        Swal.fire({
          position: "center",
          type: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        let username = token;
        dispatch(changeAdmin(username));
        navigate("/admin");
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          type: "warning",
          title: "Invalid credentials",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="w-full bg-gradient-to-r from-white to-[#0d2569] h-screen grid md:flex items-center ">
      <div className="md:w-1/2 flex justify-center  ">
        <Link className="rounded-full p-5 bg-white bg-opacity-30 flex items-center" to="/"><FaHandsHelping size={30} className=" mr-2" /><h1 className="w-full text-3xl font-bold text-black">Koode-Admin</h1>
        </Link>
      </div>
      <div className="md:w-1/2 md:pr-5 p-10 ">
        <form onSubmit={Submit} action="" className="p-5 md:p-10 bg-white bg-opacity-30 ">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block tracking-wide text-gray-900 text-xl font-bold mb-2" htmlFor="grid-first-name">
              Username
            </label>
            <input value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }} name="username" className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
          </div>
          <div className="w-full px-3">
            <label className="block tracking-wide text-gray-900 text-xl font-bold mb-2" htmlFor="grid-password">
              Password
            </label>
            <input value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }} name="password" className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
          </div>
          <div className="flex justify-center">
            <button className="bg-[#dad6d6] hover:bg-transparent text-black font-semibold py-2 px-4 border hover:border-gray-600  rounded">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login