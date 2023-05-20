import { signup } from "../../Constants/Constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import "./signup.js"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./signup.js";
import { useState } from "react";

function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const navigate = useNavigate();
    // const {authTokens} = useContext(AuthContext)

    const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    const handleSave = (data) => {
        console.log("fayas", data.image[0])
        const formData = new FormData();
        formData.append("image", data.image[0]);
        formData.append("firstname", data.firstname);
        formData.append("lastname", data.lastname);
        formData.append("username", data.username);
        formData.append("gender", data.gender);
        formData.append("email", data.email);
        formData.append("age", data.age);
        formData.append("interest", data.interest);
        formData.append("password", data.password);
        const body = formData
        axios
            .post(signup, body)
            .then((response) => {
                console.log(response.status)
                if (response.status === 200) {
                    Swal.fire({
                        position: "center",
                        type: "success",
                        title: "User has been created",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/login");
                } else {
                    Swal.fire({
                        position: "center",
                        type: "warning",
                        title: response.data.error,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((err) => {
                Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: err.data.error,
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    }
    return (
        <div>
            {/* Section Design Block */}
            {/* <div className="p-10 flex justify-center items-center bg-gradient-to-r from-white to-[#0d2569] h-screen"> */}
            <section className="bg-gradient-to-r from-white to-[#0d2569] w-[100%] p-3  mx-auto text-center flex flex-col justify-center items-center">
                {/* Background Image */}
                <div className="bg-[#6b6565] pt-3 pl-10 pr-10 bg-opacity-25">

                    <form onSubmit={handleSubmit(handleSave)} className=" w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full md:w-1/2 px-3 ">
                                <label className="flex uppercase tracking-wide text-gray-900 text-lg font-bold " htmlFor="grid-first-name">
                                    First Name
                                </label>
                                <input {...register("firstname")} className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
                                <p className=" text-red-500">{errors.firstname?.message}</p>
                            </div>
                            <div className="w-full md:w-1/2 px-3 ">
                                <label className="flex uppercase tracking-wide text-gray-900 text-lg font-bold " htmlFor="grid-last-name">
                                    Last Name
                                </label>
                                <input {...register("lastname")} className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
                                <p className=" text-red-500">{errors.lastname?.message}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 ">
                            <div className="w-full px-3 ">
                                <label className="flex uppercase tracking-wide text-gray-900 text-lg font-bold " htmlFor="grid-username">
                                    Username
                                </label>
                                <input {...register("username")} className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white" id="grid-username" type="text" placeholder="Jane" />
                                <p className=" text-red-500">{errors.username?.message}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 ">
                            <div className="w-full px-3 ">
                                <label className="flex uppercase tracking-wide text-gray-900 text-lg font-bold " htmlFor="grid-email">
                                    Email
                                </label>
                                <input {...register("email")}
                                    className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white" id="grid-email" type="text" placeholder="Jane@example.com" />
                                <p className=" text-red-500">{errors.email?.message}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full  px-3 md:w-1/2">
                                <label className="flex uppercase tracking-wide text-gray-900 text-lg font-bold " htmlFor="age">
                                    AGE
                                </label>
                                <input {...register("age")}
                                    className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white" id="age" type="text" placeholder="25" />
                                <p className=" text-red-500">{errors.age?.message}</p>
                            </div>
                            <div className="w-full md:w-1/2 px-3 ">
                                <label className="flex uppercase tracking-wide text-gray-900 text-lg font-bold " htmlFor="gender">
                                    Gender
                                </label>
                                <select className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    {...register("gender")} id="gender">
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="TransMale">TransMale</option>
                                    <option value="TransFemale">TransFemale</option>
                                    <option value="TransFemale">I use another term</option>
                                </select>
                                <p className=" text-red-500">{errors.gender?.message}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 ">
                            <div className="w-full px-3">
                                <label className="flex uppercase tracking-wide text-gray-900 text-lg font-bold " htmlFor="grid-password">
                                    Iam interested in
                                </label>
                                <select className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    {...register("interest")}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Men</option>
                                    <option value="Female">Women</option>
                                    <option value="All">Both</option>
                                </select>
                                <p className=" text-red-500">{errors.interest?.message}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 ">
                            <div className="w-full px-3">
                                <label className="flex uppercase tracking-wide text-gray-900 text-lg font-bold " htmlFor="grid-password">
                                    Password
                                </label>
                                <input {...register("password")} className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="Make it as long and as crazy as you'd like" />
                                <p className=" text-red-500">{errors.password?.message}</p>
                                <label className="flex uppercase tracking-wide text-gray-900 text-lg font-bold " htmlFor="grid-re-password">
                                    Retype Password
                                </label>
                                <input {...register("confirmPassword")} className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-re-password" type="password" placeholder="******************" />
                                <p className=" text-red-500">{errors.confirmPassword && "Passwords should match"}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 ">
                            <div className="w-full px-3 ">
                                <label className="flex uppercase tracking-wide text-gray-900 text-lg font-bold " htmlFor="grid-username">
                                    Upload your image
                                </label>
                                {/* <input {...register("username")}  className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white" id="grid-username" type="text" placeholder="Jane" />
                      <p className=" text-red-500">{errors.username?.message}</p> */}
                                <input onChange={handleImageChange} {...register("image")} type="file" className="appearance-none block w-full bg-gray-200 text-gray-900 border border-gray-200 rounded py-3 px-4  leading-tight focus:outline-none focus:bg-white" />
                                <p className=" text-red-500">{errors.image && "fayas"}</p>
                            </div>
                        </div>
                        <div className="pt-3">
                            <button type="submit" className="bg-[#dad6d6] hover:bg-transparent text-black  font-semibold py-2 px-5 border hover:border-gray-600  rounded">SignUp</button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default SignUp