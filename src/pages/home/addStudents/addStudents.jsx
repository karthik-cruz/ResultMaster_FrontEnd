import React, { useEffect, useState, useRef } from 'react'
import { FaPlus } from "react-icons/fa";
import { FaFileImport } from "react-icons/fa6";
import PopupModel from '../../../components/popupModel/popupModel'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchAddStudent } from '../../../redux/slices/addStudentSlice'
import { useSelector, useDispatch } from 'react-redux';
import { fetchUploadStudents } from '../../../redux/slices/uploadStudentsSlice';
import { toast } from 'react-toastify';

const AddStudents = () => {
    const [isOpen, setIsOpen] = useState(false)
    const fileInputRef = useRef(null);
    const isDark = useSelector(state => state.toggle.isChecked)
    const dispatch = useDispatch()

    useEffect(() => {
        formik.resetForm()
    }, [isOpen])

    const handleUploadStudents = (event) => {
        const file = event.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            dispatch(fetchUploadStudents(formData)).then((res) => {
                if (res?.payload?.success) {
                    toast.success(res.payload.message);
                } else {
                    toast.error(res?.payload?.message || 'File upload failed');
                }
            });
        }
        event.target.value = null;
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            phone: '',
            internDuration: '',
        },
        validationSchema: Yup.object({
            // Add your validation logic here
        }),
        onSubmit: (values) => {
            dispatch(fetchAddStudent(values)).then((res) => {
                if (res?.payload?.message) {
                    toast.success(res.payload.message)
                    setIsOpen(false)
                } else {
                    toast.error(res?.payload?.error || 'Adding student failed')
                }
            })
        }
    })

    const handleClick = () => {
        fileInputRef.current.click(); // Trigger file input click
    };

    return (
        <div>
            <div className='w-[100%] border h-[80px] flex items-center px-4'>
                <p className={`mb-0 text-[40px] font-bold ${isDark ? 'text-white' : 'text-black'}`}>Add New Student</p>
            </div>

            <div className='p-6 flex h-[80vh] w-[100%] flex-col gap-10 items-center justify-center'>
                <PopupModel name="Add New Student" isOpen={isOpen} setIsOpen={setIsOpen} >
                    <form onSubmit={formik.handleSubmit} className="p-4  md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2  ">
                            <div className="col-span-2">
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Student name"
                                />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Email"
                                />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                <input
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Phone Number"
                                />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="internDuration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Intern Duration</label>
                                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" value={formik.values.internDuration} onChange={formik.handleChange} name="internDuration" id=" internDuration">
                                    <option value="">Internship Duration</option>
                                    <option value="1">1 Month</option>
                                    <option value="2">2 Months</option>
                                    <option value="3">3 Months</option>
                                </select>

                            </div>
                        </div>
                        <div className='mt-10 text-white w-[100%] flex items-center justify-between'>
                            <div onClick={() => setIsOpen(false)} className='bg-gray-500 px-4 py-2 rounded cursor-pointer'>Cancel</div>
                            <button type="submit" className='bg-[#764fe3] px-4 py-2 rounded cursor-pointer'>+ Add Student</button>
                        </div>
                    </form>
                </PopupModel>

                <div onClick={() => setIsOpen(true)}
                    className='px-4 py-2 text-[30px] flex items-center gap-2 bg-[#764fe3] text-white font-bold rounded-[8px] cursor-pointer hover:bg-violet-800'>
                    <span>+ Add Student</span>
                </div>

                <div>
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleUploadStudents}
                    />
                    <div
                        className='px-4 py-2 text-[30px] flex items-center gap-2 bg-[#764fe3] text-white font-bold rounded-[8px] cursor-pointer hover:bg-violet-800'
                        onClick={handleClick}
                    >
                        <FaFileImport /> <span>Upload Students</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddStudents;
