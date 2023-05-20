import { useContext } from "react"
import Typed from "react-typed"
import AuthContext from "../../Context/AuthContext"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().min(3).max(10),
})

function Login() {
    const loginUser = useContext(AuthContext)
    const {register, handleSubmit, formState:{ errors }} = useForm({
        resolver: yupResolver(schema)
      })

    return(
        <div className="p-10 flex justify-center items-center bg-gradient-to-r from-white to-[#0d2569] h-screen">
            <div className="bg-white bg-opacity-20">
                <div className="flex justify-center">
                    <Typed className="pt-5 font-bold md:text-2xl text-lg  pl-2 " strings={['What are you waiting for..']} loop typeSpeed={80} backSpeed={140} />
                </div>
                <div className="p-10">
                <form action="" onSubmit={handleSubmit(loginUser.loginUser)}>
                    <div className="w-full px-3 mb-6 md:mb-0">
                    <label className="block tracking-wide text-gray-900 text-xl font-bold mb-2" htmlFor="grid-first-name">
                        Username
                    </label>
                    <input {...register("username")} className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
                    <p className=" text-red-500">{errors.username?.message}</p>
                    </div>
                    <div className="w-full px-3">
                    <label className="block tracking-wide text-gray-900 text-xl font-bold mb-2" htmlFor="grid-password">
                        Password
                    </label>
                    <input {...register("password")} className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
                    <p className=" text-red-500">{errors.password?.message}</p>
                    </div>
                    <div className="flex justify-center">
                    <button type="submit" className="bg-[#dad6d6] hover:bg-transparent text-black font-semibold py-2 px-4 border hover:border-gray-600  rounded">Login</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Login