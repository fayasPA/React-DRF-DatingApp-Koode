import { useEffect, useState } from "react"
import { FaHandsHelping } from "react-icons/fa"
import { TbFilter } from "react-icons/tb"
import { Link } from "react-router-dom"
import axios from "../../axios"
import { baseimageUrl, filterBy, getAppUsers, userLiked } from "../../Constants/Constants"
import { RxCross2 } from "react-icons/rx"
import { BsCheckLg } from "react-icons/bs"
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

function Home() {
    const Token = localStorage.getItem('user_id')
    const [appUsers, setAppUsers] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);
    const getOtherUsersInfo = () => {
        if (Token){
            axios.get(`${getAppUsers}${Token}`).then((response) => {
                console.log(response.data,);
                setAppUsers(response.data)
            })
        }
    }
    const [currentUser, setCurrentUser] = useState(appUsers[currentIndex]);
    useEffect(() => {
        getOtherUsersInfo();
    }, [])

    const handleLikeButton = () => {
        const body = {
            "curr_user_id": Token,
            "liked_user_id": appUsers[currentIndex].id
        }
        axios.post(userLiked, body).then((response) => {
            console.log(response.data, "User has liked")
        })
        // Increment the current index to move to the next user
        { appUsers[currentIndex + 1] && setCurrentIndex(currentIndex + 1) }
    };

    const handleRejectButton = () => {
        { appUsers[currentIndex + 1] && setCurrentIndex(currentIndex + 1) }
    }
    useEffect(() => {
        // Update the currentUser state whenever currentIndex changes
        setCurrentUser(appUsers[currentIndex]);
    }, [currentIndex, appUsers]);

    const [selectedOption, setSelectedOption] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    function handleOptionChange(e) {
        setSelectedOption(e.target.value);
        console.log(e.target.value)
        const body = {
            'filter': e.target.value,
        }
        axios
            .post(`${filterBy}${Token}`, body)
            .then((response) => {
                console.log(response.data)
                setAppUsers(response.data)
                setCurrentIndex(0)
            })
        setIsOpen(!isOpen)
    }
    return (
        <div className="flex h-screen relative">
            <div className="bg-[#edeee4] h-screen flex-1 ">
                <div className="flex h-20 items-center ">
                    <div className="pl-12 cursor-pointer text-xs md:text-sm w-1/2 text-gray-500">
                        {/* <div className="flex">
                            <p className="">Filter</p>
                        </div> */}
                        <div className="relative inline-block text-left">
                            <div>
                                <span className="rounded-md shadow-sm">
                                    <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" id="filter-dropdown" aria-haspopup="true" aria-expanded={isOpen} onClick={() => { setIsOpen(!isOpen) }}>
                                        Filter by
                                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M10 12l-5-5 1.41-1.41L10 9.18l3.59-3.59L15 7l-5 5z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </span>
                            </div>
                            {isOpen && (
                                <div className="origin-top-right absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="filter-dropdown">
                                    <div className="py-1" role="none">
                                        <label className="block px-4 py-2 text-sm text-gray-700" htmlFor="option1">
                                            <input className="mr-2 leading-tight" type="radio" name="filterOption" id="option1" value="All" checked={selectedOption === 'All'} onChange={handleOptionChange} />
                                            All
                                        </label>
                                        <label className="block px-4 py-2 text-sm text-gray-700" htmlFor="option2">
                                            <input className="mr-2 leading-tight" type="radio" name="filterOption" id="option2" value="Male" checked={selectedOption === 'Male'} onChange={handleOptionChange} />
                                            Men
                                        </label>
                                        <label className="block px-4 py-2 text-sm text-gray-700" htmlFor="option3">
                                            <input className="mr-2 leading-tight" type="radio" name="filterOption" id="option3" value="Female" checked={selectedOption === 'Female'} onChange={handleOptionChange} />
                                            Women
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                    <div className="w-1/2">
                        <Link className="flex items-center" to="/"><FaHandsHelping size={30} className="text-[#344983] rounded-lg mr-2" /><h1 className="w-full text-2xl font-bold text-[#0d2569]">Koode</h1>
                        </Link>
                    </div>
                </div>
                <div className="h-[75vh] md:h-[90%] ">
                    <div className="h-full  pr-5 md:pr-10 pl-5 md:pl-10 md:pb-10 flex">
                        <div className="w-1/2 ">
                            <img className="h-full w-full rounded-l-3xl object-fill" src={currentUser && `${baseimageUrl}${currentUser.image}`} alt="fayas" />
                        </div>
                        <div className="flex flex-col pl-5  text-[#464242] font-extrabold justify-center items-start w-1/2 bg-[#c1c0ec] rounded-r-3xl">
                            <div className="text-3xl w-full">
                                {currentUser?.username}, {currentUser?.age}
                            </div>
                            {currentUser?.user_profile.job && (<div className="pt-5 w-full flex items-center">
                                <div>
                                    <WorkIcon sx={{ mr: "10px" }} />
                                </div>
                                <div >
                                    {currentUser.user_profile.job}
                                </div>
                            </div>)}
                            {currentUser?.user_profile.education && (<div className="pt-2 w-full flex items-center">
                                <div>
                                    <SchoolIcon sx={{ mr: "10px" }} />
                                </div>
                                <div >
                                    {currentUser.user_profile.education}
                                </div>
                            </div>)}
                            {currentUser?.user_profile.zodiac && (<div className="pt-2 w-full flex items-center">
                                <div>
                                    <ElectricBoltIcon sx={{ mr: "10px" }} />
                                </div>
                                <div >
                                    {currentUser.user_profile.zodiac}
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>

            <div key={""} className='absolute bottom-0 left-0 right-0 flex justify-center space-x-5 pb-2'>
                <div className='bg-white border border-[#b3aeae] rounded-full p-5 hover:scale-110'>
                    <RxCross2 onClick={handleRejectButton} className="cursor-pointer" size={40} />
                </div>
                <div className='bg-white border border-[#b3aeae] rounded-full p-5 hover:scale-110'>
                    <BsCheckLg onClick={handleLikeButton} className="cursor-pointer" size={40} />
                </div>
            </div>
        </div>
    )
}

export default Home