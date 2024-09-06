import React, { useState, useEffect, useRef } from 'react';
import { FaGraduationCap } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { BiBell } from "react-icons/bi";
import EmptyAvatar from '../../assets/images/EmptyAvatar.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";


const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown container
  const isDark = useSelector((state) => state.toggle.isChecked);
  const user = useSelector((state) => state.loginUser);


  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);



  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  }


  return (
    <div className={`w-[100%] select-none h-[60px] border flex items-center justify-between ${isDark ? "bg-[#1e1e1e]" : "bg-white"}`}>
      <div className='flex ms-4 gap-2 items-center'>
        <FaGraduationCap className='text-violet-900' size={50} />
        <p className='mb-0 text-[25px] font-bold text-[#764fe3]'>
          <span className='text-violet-900 text-[35px]'>R</span>esult<span className='text-violet-900 text-[30px]'>M</span>aster
        </p>
      </div>

      <div className='flex items-center gap-4 me-4'>
        {/* <div className='w-[100%] py-2 px-3 border bg-white hover:border-[#764fe3] gap-2 rounded-[10px] flex items-center focus-within:ring-4 focus-within:ring-violet-200 focus-within:shadow-lg focus-within:border-[#764fe3]'>
          <IoSearch size={25} />
          <input className='w-full ps-2 outline-none border-none' type="text" name="Search" id="Search" placeholder="Search..." />
        </div> */}
        <BiBell size={25} className={`cursor-pointer ${isDark ? "text-white" : "text-black"}`} />

        <div className='relative' ref={dropdownRef}>
          <div className='rounded-full cursor-pointer border w-[40px] p-[2px] border-[#764fe3]' onClick={toggleDropdown}>
            <img className='w-full h-full rounded-full' src={EmptyAvatar} alt="User avatar" />
          </div>

          {isDropdownOpen && (
            <div className={`absolute p-2 right-0 mt-2 w-52 ${isDark ? "bg-[#1e1e1e] text-white divide-y divide-gray-100 " :"bg-white divide-y divide-gray-100"}   border  rounded-lg shadow-2xl z-10`}>

              <div className='border-b py-2 gap-2 flex items-center'>
                <div className='rounded-full cursor-pointer border w-[40px] p-[2px] border-[#764fe3]' onClick={toggleDropdown}>
                  <img className='w-full h-full rounded-full' src={EmptyAvatar} alt="User avatar" />
                </div>

                <div className='flex flex-col'>
                  <p className='mb-0  capitalize'>{user ? user?.user?.username : "User name"}</p>
                  <p className='mb-0 text-gray-500 text-[14px]'>{user ? user?.user?.email : ""}</p>
                </div>

              </div>

              <div className='block '>
                <div onClick={handleLogout} className='flex  items-center hover:bg-[#764fe3] hover:text-white cursor-pointer gap-2 rounded mt-2 py-1 px-2'>
                  <MdOutlineLogout className='' />
                  <p className="mb-0 font-medium ">Logout</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
