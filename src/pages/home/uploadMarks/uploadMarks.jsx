import React, { useState, useEffect, useRef } from 'react'
import { FaFileImport } from "react-icons/fa6";
import PopupModel from '../../../components/popupModel/popupModel'
import { useFormik } from 'formik';
import * as Yup from 'yup';
// import * as XLSX from 'xlsx';
import { fetchAddMark } from '../../../redux/slices/addMarkSlice'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchUploadMarks } from '../../../redux/slices/uploadMarksSlice';




const UploadMarks = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState([]);
  const isDark = useSelector((state) => state.toggle.isChecked);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch()

  useEffect(() => {
    formikUploadMarks.resetForm()
  }, [isOpen])


  const handleUploadMarks = (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      dispatch(fetchUploadMarks(formData)).then((res) => {
        if (res?.payload?.success) {
          toast.success(res.payload.message);
        } else {
          toast.error(res?.payload?.message || 'File upload failed');
        }
      });
    }
    event.target.value = null;

  }



  const formikUploadMarks = useFormik({
    initialValues: {
      email: '',
      attendanceMarks: '',
      projectReviewMarks: '',
      assessmentMarks: '',
      projectSubmissionMarks: '',
      linkedInPostMarks: '',

    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required'),
      attendanceMarks: Yup.string().required('Attendance Marks is required'),
      projectReviewMarks: Yup.string().required('Project Review Marks is required'),
      assessmentMarks: Yup.string().required('Assessment Marks is required'),
      projectSubmissionMarks: Yup.string().required('Project Submission Marks is required'),
      linkedInPostMarks: Yup.string().required('LinkedIn Post Marks is required'),
    })
    ,
    onSubmit: (values) => {
      dispatch(fetchAddMark(values)).then((res) => {
        if (res?.payload?.message) {
          toast.success(res.payload.message)
          setIsOpen(false)
          formikUploadMarks.resetForm()
        } else {
          toast.error(res?.payload?.error)
        }
      })
    }
  })

  const handleClick = () => {
    fileInputRef.current.click();
  };


  return (
    <div>

      <div className='w-[100%] border h-[80px] flex items-center px-4'>
        <p className={`mb-0 text-[40px] font-bold ${isDark ? "text-white" : "text-black"}`}>Upload Students Marks</p>
      </div>
      <div className='p-6 flex h-[80vh] flex-col gap-10 items-center justify-center'>


        <PopupModel name="Add Marks" isOpen={isOpen} setIsOpen={setIsOpen} >
          <form onSubmit={formikUploadMarks.handleSubmit} class="p-4 w-[] md:p-5">
            <div class="grid gap-4 mb-4 grid-cols-2  ">


              <div class="col-span-2">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input value={formikUploadMarks.values.email} onChange={formikUploadMarks.handleChange} type="text" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Student Email" />
              </div>

              <div class="col-span-2 sm:col-span-1">
                <label for="attendanceMarks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Attendance Mark</label>
                <input value={formikUploadMarks.values.attendanceMarks} onChange={formikUploadMarks.handleChange} type="text" name="attendanceMarks" id="attendanceMarks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Attendance Mark" />
              </div>

              <div class="col-span-2 sm:col-span-1">
                <label for="projectReviewMarks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Review Mark</label>
                <input value={formikUploadMarks.values.projectReviewMarks} onChange={formikUploadMarks.handleChange} type="text" name="projectReviewMarks" id="projectReviewMarks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Project Review Mark" />
              </div>

              <div class="col-span-2 sm:col-span-1">
                <label for="assessmentMarks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assessment Mark</label>
                <input value={formikUploadMarks.values.assessmentMarks} onChange={formikUploadMarks.handleChange} type="text" name="assessmentMarks" id="assessmentMarks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Assessment Mark" />
              </div>

              <div class="col-span-2 sm:col-span-1">
                <label for="projectSubmissionMarks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project Submission Mark</label>
                <input value={formikUploadMarks.values.projectSubmissionMarks} onChange={formikUploadMarks.handleChange} type="text" name="projectSubmissionMarks" id="projectSubmissionMarks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Project Submission Mark" />
              </div>

              <div class="col-span-2">
                <label for="linkedInPostMarks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">LinkedInPost Mark</label>
                <input value={formikUploadMarks.values.linkedInPostMarks} onChange={formikUploadMarks.handleChange} type="text" name="linkedInPostMarks" id="linkedInPostMarks" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="LinkedInPost Mark" />
              </div>

            </div>
            <div className='mt-10 text-white w-[100%] flex items-center justify-between'>
              <div onClick={() => setIsOpen(false)} className='bg-gray-500 px-4   py-2 rounded cursor-pointer'> Cancel</div>
              <button type="submit" className='bg-[#764fe3] px-6 py-2 rounded cursor-pointer'> Submit</button>
            </div>
          </form>
        </PopupModel>



        <div onClick={() => setIsOpen(true)} className='px-4 py-2 text-[30px] flex items-center gap-2 bg-[#764fe3] text-white font-bold rounded-[8px] cursor-pointer hover:bg-violet-800'><span> + Add Marks </span></div>

        <div>
          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            style={{ display: 'none' }} // Hide the file input
            onChange={handleUploadMarks}
          />
          <div
            className='px-4 py-2 text-[30px] flex items-center gap-2 bg-[#764fe3] text-white font-bold rounded-[8px] cursor-pointer hover:bg-violet-800'
            onClick={handleClick}
          >
            <FaFileImport /> <span>Upload Marks</span>
          </div>
        </div>

      </div>
    </div>

  )
}

export default UploadMarks
