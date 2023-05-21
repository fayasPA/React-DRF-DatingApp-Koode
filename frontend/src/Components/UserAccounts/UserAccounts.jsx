import { BsCheckLg } from "react-icons/bs"
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";
import { baseimageUrl, userLiked, userProfiles } from "../../Constants/Constants";
import { RxCross2 } from "react-icons/rx"
import Swal from "sweetalert2";

function UserAccounts(id) {
    const navigate = useNavigate();
    const Token = localStorage.getItem('user_id')
    const params = useParams();
    const [userInfo, setUserInfo] = useState();
    useEffect(() => {
        axios.get(`${userProfiles}${params.id}`).then((res) => {
            console.log("params", res.data)
            setUserInfo(res.data)
        })
    }, [])

    const handleLikeButton = () => {
        const body = {
            "curr_user_id": Token,
            "liked_user_id": params.id
        }
        axios.post(userLiked, body).then((response) => {
            console.log(response.data, "User has liked")
        })
        Swal.fire({
            position: "center",
            type: "success",
            title: "You have liked the user",
            showConfirmButton: false,
            timer: 1000,
        });
        navigate('/')
    };

    const handleRejectButton = () => {
        navigate('/')
    }
    return (
        <div>
            <div className="relative h-[100vh] p-5">
                {userInfo && <div className=" h-full  pr-5 md:pr-10 pl-5 md:pl-10 md:pb-10 flex">
                    <div className="w-1/2 ">
                        <img className="h-full w-full rounded-l-3xl object-fill" src={userInfo && `${baseimageUrl}${userInfo.user.image}`} alt="fayas" />
                    </div>
                    <div className="flex flex-col pl-5  text-[#464242] font-extrabold justify-center items-start w-1/2 bg-[#c1c0ec] rounded-r-3xl">
                        <div className="text-3xl w-full">
                            {userInfo?.user.username}, {userInfo?.user.age}
                        </div>
                        {userInfo?.job && (<div className="pt-5 w-full flex items-center">
                            <div>
                                <WorkIcon sx={{ mr: "10px" }} />
                            </div>
                            <div >
                                {userInfo.job}
                            </div>
                        </div>)}
                        {userInfo?.education && (<div className="pt-2 w-full flex items-center">
                            <div>
                                <SchoolIcon sx={{ mr: "10px" }} />
                            </div>
                            <div >
                                {userInfo.education}
                            </div>
                        </div>)}
                        {userInfo?.zodiac && (<div className="pt-2 w-full flex items-center">
                            <div>
                                <ElectricBoltIcon sx={{ mr: "10px" }} />
                            </div>
                            <div >
                                {userInfo.zodiac}
                            </div>
                        </div>)}
                    </div>
                </div>
                }
                <div className='w-full absolute bottom-0 left-0 right-0 flex justify-center space-x-5 pb-2'>
                    <div className='bg-white border border-[#b3aeae] rounded-full p-5 hover:scale-110'>
                        <RxCross2 onClick={handleRejectButton} className="cursor-pointer" size={40} />
                    </div>
                    <div className='bg-white border border-[#b3aeae] rounded-full p-5 hover:scale-110'>
                        <BsCheckLg onClick={handleLikeButton} className="cursor-pointer" size={40} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAccounts;
