import { useContext } from "react"
import {Link} from "react-router-dom"
import AuthContext from "../../Context/AuthContext"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaHandsHelping } from "react-icons/fa";

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().min(3).max(10),
})

function Login() {
    const loginUser = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    return (
        <div className="flex h-screen">
            <div className="hidden md:flex w-1/2">
                <div className="text-4xl font-extrabold flex h-full w-full justify-center items-center">
                    <div className="mr-2 mb-1 rounded-lg border-4 flex justify-center items-center bg-white">
                        <FaHandsHelping size={30} className="text-black rounded-lg " />
                    </div>
                    <h1>KOODE</h1>
                </div>
            </div>
            <div className="flex-1 w-100 bg-black">
                <div className="flex md:hidden pt-4 text-[#6b5b95]">
                    <div className="text-4xl font-extrabold flex h-full w-full justify-center items-center">
                        <div className="mr-2 mb-1 rounded-lg border-4 border-[#6b5b95] flex justify-center items-center bg-white">
                            <FaHandsHelping size={30} className="text-black rounded-lg " />
                        </div>
                        <h1>KOODE</h1>
                    </div>
                </div>
                <div className="w-full flex justify-end p-5">
                    <button className="bg-gray-500 flex text-gray-100 w-1/3 rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline
                                shadow-lg">
                        <h1 className="rounded-l-full py-2 bg-[#6b5b95] w-1/2">login</h1>
                        <Link className="w-1/2 py-2" to="/signup">
                        <h1 >signup</h1>
                        </Link>
                    </button>
                </div>
                <div className=" text-4xl font-display font-semibold lg:text-left xl:text-5xl
                    xl:text-bold text-white w-full flex justify-start p-5 ">
                    <h1 className="border-b-2 border-[#6b5b95]">Login</h1>
                </div>
                <div className="mt-11">
                    <form className="pl-10" onSubmit={handleSubmit(loginUser.loginUser)} action="">
                        <div className="text-white mb-10">
                            <label className="text-sm font-bold tracking-wide block" htmlFor="username">USERNAME</label>
                            <input {...register("username")} className="p-2 border-b-2 border-gray-600 bg-transparent w-[80%] outline-none" type="text" placeholder="Enter your username" id='username' />
                            <p className=" text-red-500">{errors.username?.message}</p>
                        </div>
                        <div className="text-white mb-10">
                            <label className="text-sm font-bold tracking-wide block" htmlFor="password">PASSWORD</label>
                            <input {...register("password")} className="p-2 border-b-2 border-gray-600 bg-transparent w-[80%] outline-none" type="password" placeholder="Enter your password" id='password' />
                            <p className=" text-red-500">{errors.password?.message}</p>
                        </div>
                        <div className="text-white mb-3">
                            <button className="bg-[#6b5b95] text-gray-100 p-4 w-1/3 rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-400
                                shadow-lg">Login</button>
                        </div>
                        <div className="text-white">
                            <Link to="/signup">
                            <h4>Don't have an account?</h4>                            
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login