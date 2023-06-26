import { signup } from "../../Constants/Constants";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../axios";
import "./signup.js"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./signup.js";
import { useState } from "react";
import { FaHandsHelping } from "react-icons/fa";

function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    const handleSave = (data) => {
        if (data.image[0]) {
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
        else {
            Swal.fire({
                toast: true,
                position: "top-right",
                type: "warning",
                title: "image is not added",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    }
    return (
        <div className="h-100 w-screen bg-black">
            <div className="w-100 flex justify-between items-center">
                <div className="flex p-4 text-[#6b5b95]">
                    <div className="text-4xl font-extrabold flex h-full w-full justify-center items-center">
                        <div className="mr-2 mb-1 rounded-lg border-4 border-[#6b5b95] flex justify-center items-center bg-white">
                            <FaHandsHelping size={30} className="text-black rounded-lg " />
                        </div>
                        <h1>KOODE</h1>
                    </div>
                </div>
                <div className="w-1/2 flex justify-end md:p-4 mr-3">
                    <button className="bg-[#6b5b95] flex text-gray-100 md:w-1/2 rounded-full tracking-wide
                                    font-semibold font-display focus:outline-none focus:shadow-outline
                                    shadow-lg">
                        <Link className="rounded-l-full p-2 bg-gray-500 w-1/2" to="/">
                            <h1 >login</h1>
                        </Link>
                        <h1 className="p-2 w-1/2" >signup</h1>
                    </button>
                </div>
            </div>
            <div className="w-100">
                <div className=" text-4xl font-display font-semibold lg:text-left xl:text-5xl
                        xl:text-bold text-white w-full flex justify-start p-5 ">
                    <h1 className="border-b-2 border-[#6b5b95]">Signup</h1>
                </div>
                <div className="mt-5">
                    <form className="pl-10 pb-5" action="" onSubmit={handleSubmit(handleSave)} >
                        <div className="flex">
                            <div className="w-screen text-white mb-5 md:mb-10">
                                <label className="text-sm font-bold tracking-wide block" htmlFor="username">USERNAME</label>
                                <input {...register("username")} className="p-2 border-b-2 border-gray-600 bg-transparent w-[80%] outline-none" type="text" placeholder="Enter your username" id='username' />
                                <p className=" text-red-500">{errors.username?.message}</p>
                            </div>
                        </div>
                        <div className="md:flex">
                            <div className="md:w-1/2 text-white mb-5 md:mb-10">
                                <label className="text-sm font-bold tracking-wide block" htmlFor="firstname">FIRSTNAME</label>
                                <input {...register("firstname")} className="p-2 border-b-2 border-gray-600 bg-transparent w-[80%] outline-none" type="text" placeholder="Enter your firstname" id='firstname' />
                                <p className=" text-red-500">{errors.firstname?.message}</p>
                            </div>
                            <div className="md:w-1/2 text-white mb-5 md:mb-10">
                                <label className="text-sm font-bold tracking-wide block" htmlFor="lastname">LASTNAME</label>
                                <input {...register("lastname")} className="p-2 border-b-2 border-gray-600 bg-transparent w-[80%] outline-none" type="text" placeholder="Enter your lastname" id='lastname' />
                                <p className=" text-red-500">{errors.lastname?.message}</p>
                            </div>
                        </div>

                        <div className="md:flex">
                            <div className="md:w-1/3 text-white mb-5 md:mb-10">
                                <label className="text-sm font-bold tracking-wide block" htmlFor="email">EMAIL</label>
                                <input {...register("email")} className="p-2 border-b-2 border-gray-600 bg-transparent w-[80%] outline-none" type="text" placeholder="Enter your email" id='email' />
                                <p className=" text-red-500">{errors.email?.message}</p>
                            </div>
                            <div className="md:w-1/3 text-white mb-5 md:mb-10">
                                <label className="text-sm font-bold tracking-wide block" htmlFor="age">AGE</label>
                                <input {...register("age")} className="p-2 border-b-2 border-gray-600 bg-transparent w-[80%] outline-none" type="text" placeholder="Enter your age" id='age' />
                                <p className=" text-red-500 w-[80%]">{errors.age?.message}</p>
                            </div>
                            <div className="md:w-1/3 text-white mb-5 md:mb-10">
                                <label className="text-sm font-bold tracking-wide block" htmlFor="gender">GENDER</label>
                                <select className="p-2 border-b-2 border-gray-600 w-[80%] dark:bg-transparent focus:dark:bg-black dark:text-gray-400 dark:border-gray-600 outline-none focus:text-white"
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
                        <div className="flex">
                            <div className="w-screen text-white mb-5 md:mb-10">
                                <label className="text-sm font-bold tracking-wide block" htmlFor="interest">IAM INTERSTED IN</label>
                                <select className="p-2 border-b-2 border-gray-600 w-[80%] dark:bg-transparent focus:dark:bg-black dark:text-gray-400 dark:border-gray-600 outline-none focus:text-white"
                                    {...register("interest")} >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Men</option>
                                    <option value="Female">Women</option>
                                    <option value="All">Both</option>
                                </select>
                                <p className=" text-red-500">{errors.interest?.message}</p>
                            </div>
                        </div>
                        <div className="md:flex">
                            <div className="md:w-1/2 text-white mb-5 md:mb-10">
                                <label className="text-sm font-bold tracking-wide block" htmlFor="password">PASSWORD</label>
                                <input {...register("password")} className="p-2 border-b-2 border-gray-600 bg-transparent w-[80%] outline-none" type="password" placeholder="Enter your password" id='password' />
                                <p className=" text-red-500">{errors.password?.message}</p>
                            </div>
                            <div className="md:w-1/2 text-white mb-5 md:mb-10">
                                <label className="text-sm font-bold tracking-wide block" htmlFor="confirm password">CONFIRM PASSWORD</label>
                                <input {...register("confirmPassword")} className="p-2 border-b-2 border-gray-600 bg-transparent w-[80%] outline-none" type="confirm password" placeholder="Enter your password" id='confirm password' />
                                <p className=" text-red-500">{errors.confirmPassword && "Passwords should match"}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 text-white mb-5 md:mb-10">
                                <label className="text-sm font-bold tracking-wide block">
                                    UPLOAD IMAGE
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="image" className="relative cursor-pointer p-1 md:p-2 bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span className="">Upload a file</span>
                                                <input onChange={handleImageChange} {...register("image")} id="image" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1 text-white">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-white">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                                <p className=" text-red-500">{errors.image && "fayas"}</p>
                            </div>
                        </div>
                        <div className="text-white mb-3">
                            <button type="submit" className="bg-[#6b5b95] text-gray-100 p-4 w-1/3 rounded-full tracking-wide
                                    font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-400
                                    shadow-lg">Signup</button>
                        </div>
                        <div className="text-white">
                            <Link to="/">
                                <h4>Already have an account?</h4>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp