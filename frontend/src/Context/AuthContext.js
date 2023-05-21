import axios from "../axios";
import jwt_decode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { baseUrl } from "../Constants/Constants";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {
    
    const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null)
    const [user, setUser] = useState(localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')): null)
    // const [loading, setLoading] = useState(true)  
    const loginUser = (data) => {
              const body = data
              const response = 
                axios.post(`${baseUrl}token/`,
                    body,
                    {
                    headers: {
                        'Content-Type': 'application/json'
                      }
                  })
                  .then(function (response) {
                      setAuthTokens(response.data)
                      setUser(jwt_decode(response.data.access))
                      localStorage.setItem('authTokens', JSON.stringify(response.data))
                      localStorage.setItem('user_id', jwt_decode(response.data.access).user_id)
                    })
                  .catch(function (error) {
                    console.log(error,"loginError")
                    Swal.fire({
                      position: "center",
                      type: "error",
                      title: "Invalid credentials",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  });
  }

    // Log out
    const logOutUser = () => {
      console.log("logging out");
      setAuthTokens(null)
      setUser(null)
      localStorage.removeItem('authTokens')
      localStorage.removeItem('user_id')
    }

    const updateToken = async () => {
      const body = JSON.stringify({'refresh':authTokens.refresh})
      const response = await axios.post(
        `${baseUrl}token/refresh/`,
        body,
          {
          headers: {
              'Content-Type': 'application/json'
            }
        }
      ).then((response) => {
        console.log(response.data,"refresh")
        if (response.status === 200){
          setAuthTokens(response.data)
          setUser(jwt_decode(response.data.access))
          localStorage.setItem('authTokens', JSON.stringify(response.data))
          localStorage.setItem('user_id', jwt_decode(response.data.access).user_id)
        }else{
          logOutUser()
        }
      })
    }

    // useEffect(() => {
    //   const fourMinutes = 1000 * 60 * 4
    //   const interval = setInterval(() => {
    //     if(authTokens){
    //       updateToken()
    //     }
    //   }, fourMinutes)
    
    //   return () => clearInterval(interval)
    // }, 4000)
    

    const contextData = {
      user:user,
      loginUser:loginUser,
      logOutUser: logOutUser,
      authTokens:authTokens
    }

    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>       
    )
}