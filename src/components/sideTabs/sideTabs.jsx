import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
//icons -----------------------------------------------------
import { MdDashboard } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { PiUploadSimpleBold } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";

//images ----------------------------------------------------
import EmptyAvatar from '../../assets/images/EmptyAvatar.png'
//importing css ---------------------------------------------
import "./sideTabs.css"
//importing components --------------------------------------




const SideTabs = () => {

    const isDark = useSelector((state) => state.toggle.isChecked);
    const user = useSelector((state) => state.loginUser);

    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigateToDashboard = () => {
        navigate("/home/dashboard");
    }
    const handleNavigateToClass = () => {
        navigate("/home/students");
    }
    const handleNavigateToSettings = () => {
        navigate("/home/settings");
    }
    const handleNavigateToAddStudents = () => {
        navigate("/home/add-students");
    }
    const handleNavigateToUploadMarks = () => {
        navigate("/home/upload-marks");
    }


    return (

        <div className={`py-6 px-4 border-r select-none flex flex-col justify-between w-[20%] sideTabs ${isDark ? "bg-[#1e1e1e] text-white" : "bg-white "} `}>

            <div>
                <div onClick={handleNavigateToDashboard} className={`flex py-3 ${isDark ? "hover:bg-gray-700 " : "hover:bg-gray-100 "}  text-gray-500 cursor-pointer ps-6  ${location.pathname.includes("dashboard") ? "bg-violet-50 hover:bg-violet-50" : ""} gap-2 w-full items-center justify-start group`}>
                    <MdDashboard size={30} className={` ${location.pathname.includes("dashboard") ? "text-[#764fe3]" : ""} `} />
                    <span className={`font-bold  text-[20px] ${location.pathname.includes("dashboard") ? "text-[#764fe3]" : ""} `}>Dashboard</span>
                </div>

                <div onClick={handleNavigateToClass} className={`flex py-3 ${isDark ? "hover:bg-gray-700 " : "hover:bg-gray-100 "} text-gray-500 cursor-pointer ps-6  ${location.pathname === "/home/students" ? "bg-violet-50 hover:bg-violet-50" : ""} gap-2 w-full items-center justify-start group`}>
                    <PiStudentFill size={30} className={` ${location.pathname === "/home/students" ? "text-[#764fe3]" : ""} `} />
                    <span className={`font-bold text-[20px] ${location.pathname === "/home/students" ? "text-[#764fe3]" : ""} `}>{user?.isAdmin ? "Students" : "Class"}</span>
                </div>


                {user?.isAdmin &&
                    <div>

                        <div onClick={handleNavigateToAddStudents} className={`flex ${isDark ? "hover:bg-gray-700 " : "hover:bg-gray-100 "} py-3 text-gray-500 cursor-pointer ps-6  ${location.pathname.includes("add-students") ? "bg-violet-50 hover:bg-violet-50 " : ""} gap-2 w-full items-center justify-start group`}>
                            <FaPlus size={30} className={` ${location.pathname.includes("add-students") ? "text-[#764fe3]" : ""} `} />
                            <span className={`font-bold text-[20px] ${location.pathname.includes("add-students") ? "text-[#764fe3]" : ""} `}>Add Students</span>
                        </div>

                        <div onClick={handleNavigateToUploadMarks} className={`flex ${isDark ? "hover:bg-gray-700 " : "hover:bg-gray-100 "} py-3 text-gray-500 cursor-pointer ps-6  ${location.pathname.includes("upload-marks") ? "bg-violet-50 hover:bg-violet-50 " : ""} gap-2 w-full items-center justify-start group`}>
                            <PiUploadSimpleBold size={30} className={` ${location.pathname.includes("upload-marks") ? "text-[#764fe3]" : ""} `} />
                            <span className={`font-bold text-[20px] ${location.pathname.includes("upload-marks") ? "text-[#764fe3]" : ""} `}>Upload Marks</span>
                        </div>

                    </div>
                }

                <div onClick={handleNavigateToSettings} className={`flex ${isDark ? "hover:bg-gray-700 " : "hover:bg-gray-100 "} py-3 text-gray-500 cursor-pointer ps-6  ${location.pathname.includes("settings") ? "bg-violet-50 hover:bg-violet-50 " : ""} gap-2 w-full items-center justify-start group`}>
                    <IoMdSettings size={30} className={` ${location.pathname.includes("settings") ? "text-[#764fe3]" : ""} `} />
                    <span className={`font-bold text-[20px] ${location.pathname.includes("settings") ? "text-[#764fe3]" : ""} `}>Settings</span>
                </div>




            </div>


            <div className='w-full flex items-center gap-4'>
                <div className='rounded-full cursor-pointer border w-[70px] p-[2px] border-[#764fe3]'>
                    <img className='w-full h-full rounded-full' src={EmptyAvatar} alt="" />
                </div>
                <div>
                    <p className='text-[20px] font-bold capitalize'>{user ? user?.user?.username : "User Name"}</p>
                    <p className='text-gray-500'>{user ? user?.user?.email : ""}</p>
                </div>
            </div>

        </div>




    )
}

export default SideTabs
