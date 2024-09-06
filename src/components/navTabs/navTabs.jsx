import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
//icons -----------------------------------------------------------------------
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { MdOutlineAssignment } from "react-icons/md";
import { IoMdBookmarks } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";



const Tabs = () => {

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className='w-full mt-2 flex items-center text-gray-500  px-10 justify-between'>

            <div onClick={() => navigate("/home/dashboard/attendance-marks")} className={` ${location.pathname.includes("attendance-marks") ? "text-[#764fe3] border-b-2 border-[#764fe3]" : " border-b-2 border-white hover:border-b-2 hover:border-gray-500"} flex py-4 items-center  gap-2 cursor-pointer`}>
                <FaRegCalendarCheck size={25} />
                <p className="mb-0 font-bold">Attendance Marks</p>
            </div>
            <div onClick={() => navigate("/home/dashboard/project-review-marks")} className={` ${location.pathname.includes("project-review-marks") ? "text-[#764fe3] border-b-2 border-[#764fe3]" : " border-b-2 border-white hover:border-b-2 hover:border-gray-500"} flex py-4 items-center  gap-2 cursor-pointer`}>
                <FaProjectDiagram size={25} />
                <p className="mb-0 font-bold">Project Review Marks</p>
            </div>
            <div onClick={() => navigate("/home/dashboard/assessment-marks")} className={` ${location.pathname.includes("assessment-marks") ? "text-[#764fe3] border-b-2 border-[#764fe3]" : " border-b-2 border-white hover:border-b-2 hover:border-gray-500"} flex py-4 items-center  gap-2 cursor-pointer`}>
                <MdOutlineAssignment size={25} />
                <p className="mb-0 font-bold">Assessment Marks</p>
            </div>
            <div onClick={() => navigate("/home/dashboard/project-submission-marks")} className={` ${location.pathname.includes("project-submission-marks") ? "text-[#764fe3] border-b-2 border-[#764fe3]" : " border-b-2 border-white hover:border-b-2 hover:border-gray-500"} flex py-4 items-center  gap-2 cursor-pointer`}>
                <IoMdBookmarks size={25} />
                <p className="mb-0 font-bold">Project Submission Marks</p>
            </div>
            <div onClick={() => navigate("/home/dashboard/linkedin-post-marks")} className={` ${location.pathname.includes("linkedin-post-marks") ? "text-[#764fe3] border-b-2 border-[#764fe3]" : " border-b-2 border-white hover:border-b-2 hover:border-gray-500"} flex py-4 items-center  gap-2 cursor-pointer`}>
                <FaLinkedin size={25} />
                <p className="mb-0 font-bold">LinkedInPost Marks</p>
            </div>


        </div>
    )
}

export default Tabs
