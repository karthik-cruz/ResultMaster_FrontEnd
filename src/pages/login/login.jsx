import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import Button from '../../components/button'
import * as Yup from 'yup'
import { useNavigate, useLocation } from 'react-router-dom';
// icons -------------------------------------
import { FaGraduationCap } from 'react-icons/fa6'
import { IoKeyOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";


//  images ------------------------------------
import homeBackground from "../../assets/images/homeBackground.jpg" 
import loginImage from '../../assets/images/3.png'
//import Slices and redux -------------------------------
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserLogin } from '../../redux/slices/loginUserSlice'


const Login = () => {
  // state handling ---------------------------------------------------
  const [showPasswordLogin, setShowPasswordLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginAsStudent, setLoginAsStudent] = useState(true)



  const navigate = useNavigate()
  const dispatch = useDispatch()

  //useEffect methods to clear the input valus when state change---------------------
  useEffect(() => {
    loginFormik.resetForm()
    studentLoginFormik.resetForm()


  }, [loginAsStudent])



  // Formik validation for login admin----------------------------------------
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: values => {
      setLoading(true)
      dispatch(fetchUserLogin(values)).then((res) => {
        if (res?.payload?.success) {
          toast.success(res.payload.message)
          // write here to navigate the home methods and functions
          localStorage.setItem('token', res?.payload?.token)
          setTimeout(() => {
            navigate('/home/dashboard')
          }, 2000)
          setLoading(false)
        } else {
          toast.error(res?.payload?.error)
          setLoading(false)
        }
      })
    },
  });

  //formik validationfor student login----------------------------------------
  const studentLoginFormik = useFormik({
    initialValues: {
      email: '',
      phone: '',

    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required'),
      phone: Yup.string().required('Phone number is required'),
    }),
    onSubmit: values => {
      setLoading(true)
      dispatch(fetchUserLogin(values)).then((res) => {
        if (res?.payload?.success) {
          toast.success(res.payload.message)
          // write here to navigate the home methods and functions
          localStorage.setItem('token', res?.payload?.token)
          setTimeout(() => {
            navigate('/home/dashboard')
          }, 2000)
          setLoading(false)

        } else {
          toast.error(res?.payload?.error)
          setLoading(false)
        }
      })
    },
  });


  return (

    <div style={{ backgroundImage: `url(${homeBackground})` }}
      className="h-[100vh] w-[100%] bg-cover bg-center">
      <div className='flex ms-4  gap-2 items-center'>
        <FaGraduationCap className='text-violet-900' color='' size={50} />
        <p className='mb-0 text-[25px] font-bold text-[#764fe3]'><span className='text-violet-900 text-[35px]'>R</span>esult<span className='text-violet-900 text-[30px]'>M</span>aster</p>
      </div>

      <div style={{ boxShadow: "rgba(0, 0, 0, 0.45) 0px 5px 55px" }} className='bg-[rgba(255,255,255,0.85)] border-4 border-white rounded-[10px] mx-auto my-14 flex w-[65%] h-[70%]' >
        {/* Image section login  ----------------------------------------------------------*/}
        <div style={{ borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" }} className='w-[40%] flex items-center h-[100%] bg-violet-500'><img src={loginImage} alt="..." /></div>


        {/* Form section -------------------------------------------------------------------*/}
        <div className=' flex items-center flex-col  w-[60%] '>
          <p className={`mb-0 text-[45px] mt-[60px]  font-bold`}>{loginAsStudent ? "Login as Student" : "Login as Admin"}</p>



          {/* // login form ------------------------------------------------------------------- */}
          <form className='flex flex-col gap-5 items-center w-[70%] mt-[60px]' action=""
            onSubmit={loginAsStudent ? studentLoginFormik.handleSubmit : loginFormik.handleSubmit}>


            {!loginAsStudent ?
              <div className='w-full flex flex-col gap-5 items-center'>
                <div className='w-full'>
                  <div className='w-[100%] py-2 px-3 border hover:border-[#764fe3] gap-2 rounded-[10px] flex items-center 
                  focus-within:ring-4 focus-within:ring-violet-200 focus-within:shadow-lg focus-within:border-[#764fe3]'>
                    <AiOutlineMail size={25} />
                    <input className='w-full ps-2 outline-none border-none' type="text" name="email" id="email" onChange={loginFormik.handleChange} value={loginFormik.values.email} placeholder="Email" />
                  </div>
                  {loginFormik.touched.email && loginFormik.errors.email && <div className='text-red-500 mt-[2px] flex items-center gap-1 w-full text-[14px]  text-start'>
                    <RiErrorWarningFill size={15} /><span className=''>{loginFormik.errors.email}</span></div>}
                </div>

                <div className='w-full'>
                  <div className='w-[100%] py-2 px-3 border hover:border-[#764fe3] gap-2 rounded-[10px] flex items-center focus-within:ring-4 focus-within:ring-violet-200 focus-within:shadow-lg focus-within:border-[#764fe3]'>
                    <IoKeyOutline size={25} />
                    <input className='w-full ps-2 outline-none border-none' name="password" id="password" onChange={loginFormik.handleChange} value={loginFormik.values.password} type={showPasswordLogin ? "text" : "password"} placeholder="Password" />

                    {showPasswordLogin ?
                      <IoEyeOutline color='gray' size={25} onClick={() => setShowPasswordLogin(!showPasswordLogin)} /> :
                      <IoEyeOffOutline color='gray' size={25} onClick={() => setShowPasswordLogin(!showPasswordLogin)} />}

                  </div>
                  {loginFormik.touched.password && loginFormik.errors.password && <div className='text-red-500 mt-[2px] flex items-center gap-1 w-full text-[14px] text-start'>
                    <RiErrorWarningFill size={15} /><span>{loginFormik.errors.password}</span></div>}
                </div>
              </div>
              : <div className='w-full flex flex-col gap-5 items-center'>

                <div className='w-full'>
                  <div className='w-[100%] py-2 px-3 border hover:border-[#764fe3] gap-2 rounded-[10px] flex items-center focus-within:ring-4 focus-within:ring-violet-200 focus-within:shadow-lg focus-within:border-[#764fe3]'>
                    <AiOutlineMail size={25} />
                    <input className='w-full ps-2 outline-none border-none' type="text" name="email" id="userEmail" onChange={studentLoginFormik.handleChange} value={studentLoginFormik.values.email} placeholder="Email" />
                  </div>

                  {studentLoginFormik.touched.email && studentLoginFormik.errors.email && <div className='text-red-500 mt-[2px] flex items-center gap-1 w-full text-[14px] text-start'>
                    <RiErrorWarningFill size={15} /><span>{studentLoginFormik.errors.email}</span></div>}

                </div>

                <div className='w-full'>
                  <div className='w-[100%] py-2 px-3 border hover:border-[#764fe3] gap-2 rounded-[10px] flex items-center focus-within:ring-4 focus-within:ring-violet-200 focus-within:shadow-lg focus-within:border-[#764fe3]'>
                    <IoKeyOutline size={25} />
                    <input className='w-full ps-2 outline-none border-none' type={showPassword ? "text" : "password"} name="phone" id="userEmail" onChange={studentLoginFormik.handleChange} value={studentLoginFormik.values.phone} placeholder="Password" />
                    {showPassword ?
                      <IoEyeOutline color='gray' size={25} onClick={() => setShowPassword(!showPassword)} /> :
                      <IoEyeOffOutline color='gray' size={25} onClick={() => setShowPassword(!showPassword)} />}
                  </div>

                  {studentLoginFormik.touched.phone && studentLoginFormik.errors.phone && <div className='text-red-500 mt-[2px] flex items-center gap-1 w-full text-[14px] text-start'>
                    <RiErrorWarningFill size={15} /><span>{studentLoginFormik.errors.phone}</span></div>}

                </div>

              </div>
            }




            {loginAsStudent ? <div></div> : <div className='w-full flex justify-end'><p onClick={() => navigate("/forgotPassword")} className='cursor-pointer font-semibold mb-0 text-[#764fe3]'>Forgot Password?</p></div>}

            <div className='w-full flex items-center justify-between'>
              <div className='flex items-center gap-1'>
                <input
                  onChange={() => setLoginAsStudent(true)}
                  checked={loginAsStudent}
                  className='cursor-pointer'
                  type="radio"
                  id='loginAsStudent'
                  name="login"
                />
                <label className='cursor-pointer font-bold text-[14px]' htmlFor="loginAsStudent">Login as Student</label>
              </div>
              <div className='flex items-center gap-1'>
                <input
                  onChange={() => setLoginAsStudent(false)}
                  checked={!loginAsStudent}
                  className='cursor-pointer'
                  type="radio"
                  id='loginAsAdmin'
                  name="login"
                />
                <label className='cursor-pointer font-bold text-[14px]' htmlFor="loginAsAdmin"> Login as Admin</label>
              </div>
            </div>

            <Button btnName="Log in" loading={loading} />
          </form>



        </div>
      </div>



    </div>
  )
}

export default Login
