import React, { useEffect, useState } from 'react';
import { toggleSwitch } from '../../../redux/slices/darkModeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PopUpModel from '../../../components/popupModel/popupModel';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Settings = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const isDark = useSelector((state) => state.toggle.isChecked);
    const user = useSelector(state => state.loginUser);


    // Function to toggle dark mode
    const toggleDarkMode = () => {
        dispatch(toggleSwitch());
    };

    useEffect(() => {
        formik.resetForm();
    }, [isOpen]);

    // Formik configuration
    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        validationSchema: Yup.object({
            currentPassword: Yup.string().required('Current password is required'),
            newPassword: Yup.string().required('New password is required'),
            confirmNewPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                .required('Confirm new password is required'),
        }),
        onSubmit: (values) => {
            console.log('Form Data:', values);
            // Handle form submission logic
        },
    });

    return (
        <div className={`${isDark ? "bg-[#1e1e1e] text-white" : "bg-white text-black"}`}>
            {/* Popup model for changing the phone number */}
            <PopUpModel isOpen={isOpen} setIsOpen={setIsOpen} name="Change Password">
                <form onSubmit={formik.handleSubmit} className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Current Password
                            </label>
                            <input
                                value={formik.values.currentPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="password"
                                name="currentPassword"
                                id="currentPassword"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Current Password"
                            />
                            {formik.touched.currentPassword && formik.errors.currentPassword ? (
                                <div className="text-red-600 text-sm">{formik.errors.currentPassword}</div>
                            ) : null}
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                New Password
                            </label>
                            <input
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="New Password"
                            />
                            {formik.touched.newPassword && formik.errors.newPassword ? (
                                <div className="text-red-600 text-sm">{formik.errors.newPassword}</div>
                            ) : null}
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="confirmNewPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Confirm New Password
                            </label>
                            <input
                                value={formik.values.confirmNewPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                type="password"
                                name="confirmNewPassword"
                                id="confirmNewPassword"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Confirm New Password"
                            />
                            {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? (
                                <div className="text-red-600 text-sm">{formik.errors.confirmNewPassword}</div>
                            ) : null}
                        </div>

                    </div>
                    <div className='mt-10 text-white w-[100%] flex items-center justify-between'>
                        <div onClick={() => setIsOpen(false)} className='bg-gray-500 px-4 py-2 rounded cursor-pointer'>Cancel</div>
                        <button type="submit" className='bg-[#764fe3] px-4 py-2 rounded cursor-pointer'>Submit</button>
                    </div>
                </form>
            </PopUpModel>

            {/* Settings section */}
            <div className="w-[100%] border h-[80px] flex items-center px-4">
                <p className="mb-0 text-[40px] font-bold">Settings</p>
            </div>

            <div className="p-6 flex flex-col">
                <div className="flex flex-col border items-center gap-10 justify-center p-4 rounded shadow w-[20%]">
                    {/* Dark Mode Toggle */}
                    <div className='flex items-center  gap-2 '>
                        <p className="mb-0 font-bold ">Dark Mode</p>
                        <label class="inline-flex items-center cursor-pointer">
                            <input onClick={toggleDarkMode} checked={isDark} type="checkbox" value="" class="sr-only peer" ></input>
                            <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-violet-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#764fe3]"></div>
                        </label>
                    </div>

                    {/* Logout Button */}
                    <div
                        onClick={() => {
                            localStorage.clear();
                            navigate('/login');
                        }}
                        className="w-[100%] text-center py-1 font-bold text-[#764fe3] border hover:text-white cursor-pointer hover:bg-[#764fe3] rounded"
                    >
                        Logout
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
