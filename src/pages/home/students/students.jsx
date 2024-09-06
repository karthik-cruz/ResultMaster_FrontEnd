import React, { useEffect, useState } from 'react';
import "./students.css";
import { useSelector, useDispatch } from 'react-redux';
import EmptyAvatar from '../../../assets/images/EmptyAvatar.png';
import { fetchGetAllStudents } from "../../../redux/slices/getAllStudentsSlice";
import { fetchGetStudents } from "../../../redux/slices/getStudentsSlice";
import { IoSearch } from 'react-icons/io5';
import NoRecordsFound from '../../../components/noRecordsFound/noRecordsFound';
import { FaRegEdit } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { fetchDeleteUser } from '../../../redux/slices/deleteUserSlice';
import { toast } from 'react-toastify';
import PopupModel from '../../../components/popupModel/popupModel';
import { RiErrorWarningLine } from "react-icons/ri";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchUpdateUser } from '../../../redux/slices/updateUserSlice';
import { fetchUpdateUserMarks } from "../../../redux/slices/updateUserMarksSlice";


const Class = () => {

    const isDark = useSelector((state) => state.toggle.isChecked);
    const user = useSelector((state) => state.loginUser);
    // const allStudents = useSelector((state) => state.getAllStudents);
    const dispatch = useDispatch();
    const [students, setStudents] = useState([]);
    const [totalStudents, setTotalStudents] = useState([]);
    const [unfilteredStudents, setUnfilteredStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [internDuration, setInternDuration] = useState("All");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [popUpfor, setPopUpfor] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);


    useEffect(() => {
        setLoading(true);
        if (user?.isAdmin) {
            dispatch(fetchGetAllStudents()).then((res) => {
                const studentsData = res?.payload?.students || [];
                const copiedStudentsData = studentsData.map(student => ({ ...student }));
                setUnfilteredStudents(copiedStudentsData);
                filterStudentsByDuration(copiedStudentsData, internDuration);
            });
        } else {
            dispatch(fetchGetStudents(user?.user?.internDuration)).then((res) => {
                const studentsData = res?.payload?.students?.filter((item) => item?.id !== user?.user?._id) || [];
                const copiedStudentsData = studentsData.map(student => ({ ...student })); // Create a deep copy of the array elements
                setUnfilteredStudents(copiedStudentsData); // Store the copied data
                setStudents(copiedStudentsData);
                setLoading(false);
            });
        }
    }, [internDuration, formSubmitted, user, dispatch]);


    useEffect(() => {
        formik.resetForm();
    }, [isOpen]);

    const formik = useFormik({
        initialValues: {
            username: selectedUser?.username || '',
            email: selectedUser?.email || '',
            phone: selectedUser?.phone || '',
            internDuration: selectedUser?.internDuration || '',
        },
        validationSchema: Yup.object({
        }),
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log(values, selectedUser)
            dispatch(fetchUpdateUser({ params: selectedUser?._id, data: values })).then((res) => {
                if (res?.payload?.success) {
                    toast.success(res.payload.message)
                    setIsOpen(false)
                    formik.resetForm()
                    setFormSubmitted(!formSubmitted)
                } else {
                    toast.error(res?.payload?.error)
                }
            })
        }
    })


    const formikUploadMarks = useFormik({
        initialValues: {
            attendanceMarks: selectedUser?.attendanceMarks || '',
            projectReviewMarks: selectedUser?.projectReviewMarks || '',
            assessmentMarks: selectedUser?.assessmentMarks || '',
            projectSubmissionMarks: selectedUser?.projectSubmissionMarks || '',
            linkedInPostMarks: selectedUser?.linkedInPostMarks || '',

        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            attendanceMarks: Yup.string().required('Attendance Marks is required'),
            projectReviewMarks: Yup.string().required('Project Review Marks is required'),
            assessmentMarks: Yup.string().required('Assessment Marks is required'),
            projectSubmissionMarks: Yup.string().required('Project Submission Marks is required'),
            linkedInPostMarks: Yup.string().required('LinkedIn Post Marks is required'),
        })
        ,
        onSubmit: (values) => {
            console.log(values)
            dispatch(fetchUpdateUserMarks({ params: selectedUser?._id, data: values })).then((res) => {
                if (res?.payload?.message) {
                    toast.success(res.payload.message)
                    setIsOpen(false)
                    setFormSubmitted(!formSubmitted)
                    formikUploadMarks.resetForm()
                } else {
                    toast.error(res?.payload?.error)
                }
            })
        }
    })


    const filterStudentsByDuration = (studentsData, duration) => {
        if (duration === "All") {
            setTotalStudents(studentsData);
        } else {
            const filteredStudents = studentsData.filter((item) => item?.internDuration === duration);
            setTotalStudents(filteredStudents);
        }
        setLoading(false);
    };

    const handleDurationSelect = (value) => {
        setInternDuration(value);
        filterStudentsByDuration(unfilteredStudents, value);
    };

    const handleOpenDelete = (user) => {
        setSelectedUser(user);
        setPopUpfor("Delete");
    };

    const handleOpenEditMarks = (user) => {
        setSelectedUser(user);
        setPopUpfor("Edit Marks");
    };

    const handleOpenEditDetails = (user) => {
        setSelectedUser(user);
        setPopUpfor("Edit Details");
    };


    const handleDelete = (id) => {
        dispatch(fetchDeleteUser(id)).then((res) => {
            if (res?.payload?.message) {
                toast.success(res?.payload?.message);

                // Refetch data after successful deletion
                if (user?.isAdmin) {
                    dispatch(fetchGetAllStudents()).then((res) => {
                        const studentsData = res?.payload?.students || [];
                        setUnfilteredStudents(studentsData);
                        filterStudentsByDuration(studentsData, internDuration);
                    });
                } else {
                    dispatch(fetchGetStudents(user?.user?.internDuration)).then((res) => {
                        const studentsData = res?.payload?.students.filter((item) => item?.email !== user?.user?.email) || [];
                        setUnfilteredStudents(studentsData);
                        setStudents(studentsData);
                        setTotalStudents(studentsData);
                    });
                }
                setIsOpen(false);
            } else {
                toast.error(res?.payload?.error);
            }
        });
    };


    const handleSearch = (value) => {
        // Filter the unfiltered list by internDuration first
        const filteredByDuration = unfilteredStudents.filter((item) =>
            internDuration === "All" || item?.internDuration === internDuration
        );

        if (value === "") {
            // If search input is cleared, reset the list based on the filteredByDuration
            user?.isAdmin ? setTotalStudents(filteredByDuration) : setStudents(filteredByDuration);
        } else {
            // Filter the filteredByDuration list based on the current search input
            const filteredStudents = filteredByDuration.filter((item) =>
                item?.username?.toLowerCase().includes(value.toLowerCase())
            );
            user?.isAdmin ? setTotalStudents(filteredStudents) : setStudents(filteredStudents);
        }
    };



    return (

        <div className='w-[100%] '>
            <div className='w-[100%] border h-[80px] flex justify-between items-center px-4'>

                <div className={`${isDark ? "text-white" : "text-black"} flex items-center gap-2 mb-0 text-[40px] font-bold `}>
                    <span>{user?.isAdmin ? "Total Students" : "My Class Mates" }</span> 
                    
                    {user?.isAdmin && <span className={`text-[#764fe3] rounded-[25px] px-2 py-1 border-2 border-[#764fe3] text-[12px]`}>{totalStudents?.length} {totalStudents?.length <= 1 ? "Student" : "Students"}</span>}
                </div>
                {user?.isAdmin &&
                    <div className=''>
                        <select onChange={(e) => handleDurationSelect(e.target.value)} className='outline-none border-2 text-[#764fe3] border-[#764fe3] focus-within:ring-4 focus-within:ring-violet-200 font-bold focus-within:shadow-lg focus-within:border-[#764fe3] px-3 py-1 rounded-[10px]' name="" id="">
                            <option className='text-black' value="All">All Interns</option>
                            <option value="1">1 Month Interns</option>
                            <option value="2">2 Months Interns</option>
                            <option value="3">3 Months Interns</option>
                        </select>
                    </div>
                }
                <div className={`py-2 px-3 border ${isDark ? "bg-gray-700 text-white" : "bg-white text-black"} hover:border-[#764fe3] gap-2 rounded-[10px] flex items-center focus-within:ring-4 focus-within:ring-violet-200 focus-within:shadow-lg focus-within:border-[#764fe3]`}>
                    <IoSearch size={25} />
                    <input onChange={(e) => handleSearch(e.target.value)} className='w-full text-inherit bg-inherit ps-2 outline-none border-none' type="text" name="search" id="search" placeholder="Search by name" />
                </div>
            </div>


            <div className='flex p-6 items-start gap-10 justify-start w-[100%] custom-scrollbar h-[70vh] flex-wrap overflow-y-auto '>

                {loading ? <div className='flex w-[100%] h-[100%] items-center justify-center'>
                    <div role="status">
                        <svg aria-hidden="true" class="inline w-36 h-36  text-gray-200 animate-spin
                         fill-[#764fe3]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div> : user?.isAdmin ? totalStudents?.length ? totalStudents?.map((item, index) => {
                    return (

                        <div
                            key={index}
                            className={`relative ${isDark ? "bg-gray-800 text-white" : ""} flex flex-col items-center gap-2 mt-2 w-[200px] p-6 rounded-[10px] shadow-lg group`}
                        >
                            <div className="absolute top-2 right-2 flex flex-col items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div><FaRegEdit onClick={() => { handleOpenEditDetails(item); setIsOpen(true) }} title='Edit Details' className={`cursor-pointer ${isDark ? "text-white" : "text-blue-600"}`} size={20} /></div>
                                <div><LuClipboardEdit onClick={() => { handleOpenEditMarks(item); setIsOpen(true) }} title='Edit Marks' className={`cursor-pointer ${isDark ? "text-white" : "text-blue-600"}`} size={20} /></div>
                                <div><MdDelete title='Delete' onClick={() => { handleOpenDelete(item); setIsOpen(true) }} className='cursor-pointer' size={25} color='red' /></div>
                            </div>
                            <div className="rounded-[20px] cursor-pointer border w-[150px] p-[2px] border-[#764fe3]">
                                <img className="w-full h-full rounded-[20px]" src={EmptyAvatar} alt="" />
                            </div>
                            <p className="mb-0 mt-2 font-bold text-[18px] capitalize">{item?.username}</p>
                            <p className="mb-0 font-bold text-[14px] text-gray-500">{item?.email}</p>
                        </div>


                    )
                }) : <div className='flex items-center justify-center w-[100%] h-[90%]'>
                    <NoRecordsFound />
                </div>

                    : students?.length ? students?.map((item, index) => {
                        return (

                            <div key={index} className='flex flex-col items-center gap-2 mt-2 w-[200px] p-6 rounded-[10px] shadow-lg  '>
                                <div className='rounded-[20px] cursor-pointer border w-[150px] p-[2px] border-[#764fe3]'>
                                    <img className='w-full h-full rounded-[20px]' src={EmptyAvatar} alt="" />
                                </div>
                                <p className="mb-0 mt-2 font-bold text-[18px] capitalize ">{item?.username}</p>
                                {/* <p className="mb-0 font-bold text-[14px] text-gray-500 ">{item?.email}</p> */}
                            </div>

                        )
                    }) : <div className='flex items-center justify-center w-[100%] h-[90%]'>
                        <NoRecordsFound />
                    </div>

                }

                <PopupModel isOpen={isOpen} setIsOpen={setIsOpen} name={popUpfor === "Delete" ? "Delete User" : popUpfor === "Edit Details" ? "Edit Details " + selectedUser?.username : popUpfor === "Edit Marks" ? "Edit Marks " + selectedUser?.username : ""}>

                    {popUpfor === "Delete" ?
                        <div class="flex flex-col justify-center items-center p-6 text-center ">
                            <RiErrorWarningLine className='mb-5' size={100} color='white' />
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this <span className='font-bold capitalize text-white'>{selectedUser?.username}</span> student?
                            </h3>

                            <div className='flex items-center justify-center'>
                                <button onClick={() => handleDelete(selectedUser?._id)} class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                    Yes, I'm sure
                                </button>
                                <button onClick={() => setIsOpen(false)} class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                            </div>
                        </div>
                        :
                        popUpfor === "Edit Details" ?
                            <form onSubmit={formik.handleSubmit} class="p-4  md:p-5">
                                <div class="grid gap-4 mb-4 grid-cols-2  ">

                                    <div class="col-span-2">
                                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input value={formik.values.username} onChange={formik.handleChange} type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Student name" />
                                    </div>


                                    <div class="col-span-2">
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input value={formik.values.email} onChange={formik.handleChange} type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Email" />
                                    </div>

                                    <div class="col-span-2">
                                        <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                        <input maxLength={10} value={formik.values.phone} onChange={formik.handleChange} type="text" name="phone" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Phone Number" />
                                    </div>


                                    <div class="col-span-2 ">
                                        <label for="internDuration" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Intern Duration</label>
                                        <select value={formik.values.internDuration} onChange={formik.handleChange} name="internDuration" id="internshipDuration" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option selected="">Select Month</option>
                                            <option value="1">1 Month</option>
                                            <option value="2">2 Months</option>
                                            <option value="3">3 Months</option>
                                        </select>
                                    </div>



                                </div>
                                <div className='mt-10 text-white w-[100%] flex items-center justify-between'>
                                    <div onClick={() => setIsOpen(false)} className='bg-gray-500 px-4   py-2 rounded cursor-pointer'> Cancel</div>
                                    <button type="submit" className='bg-[#764fe3] px-4 py-2 rounded cursor-pointer'>Update Student</button>
                                </div>
                            </form>
                            : popUpfor === "Edit Marks" ?
                                <form onSubmit={formikUploadMarks.handleSubmit} class="p-4 w-[] md:p-5">
                                    <div class="grid gap-4 mb-4 grid-cols-2  ">

                                        <div class="col-span-2 sm:col-span-1">
                                            <label for="attendanceMarks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Attendance Mark</label>
                                            <input maxLength={2} value={formikUploadMarks.values.attendanceMarks} onChange={formikUploadMarks.handleChange} type="text" name="attendanceMarks" id="attendanceMarks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Attendance Mark" />
                                        </div>

                                        <div class="col-span-2 sm:col-span-1">
                                            <label for="projectReviewMarks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Review Mark</label>
                                            <input maxLength={2} value={formikUploadMarks.values.projectReviewMarks} onChange={formikUploadMarks.handleChange} type="text" name="projectReviewMarks" id="projectReviewMarks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Project Review Mark" />
                                        </div>

                                        <div class="col-span-2 sm:col-span-1">
                                            <label for="assessmentMarks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assessment Mark</label>
                                            <input maxLength={2} value={formikUploadMarks.values.assessmentMarks} onChange={formikUploadMarks.handleChange} type="text" name="assessmentMarks" id="assessmentMarks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Assessment Mark" />
                                        </div>

                                        <div class="col-span-2 sm:col-span-1">
                                            <label for="projectSubmissionMarks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Submission Mark</label>
                                            <input maxLength={2} value={formikUploadMarks.values.projectSubmissionMarks} onChange={formikUploadMarks.handleChange} type="text" name="projectSubmissionMarks" id="projectSubmissionMarks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Project Submission Mark" />
                                        </div>

                                        <div class="col-span-2">
                                            <label for="linkedInPostMarks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LinkedInPost Mark</label>
                                            <input maxLength={2} value={formikUploadMarks.values.linkedInPostMarks} onChange={formikUploadMarks.handleChange} type="text" name="linkedInPostMarks" id="linkedInPostMarks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="LinkedInPost Mark" />
                                        </div>

                                    </div>
                                    <div className='mt-10 text-white w-[100%] flex items-center justify-between'>
                                        <div onClick={() => setIsOpen(false)} className='bg-gray-500 px-4   py-2 rounded cursor-pointer'> Cancel</div>
                                        <button type="submit" className='bg-[#764fe3] px-6 py-2 rounded cursor-pointer'> Submit</button>
                                    </div>
                                </form> : null
                    }

                </PopupModel>

            </div >

        </div >
    )
}

export default Class
