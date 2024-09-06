import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from '../../../components/navTabs/navTabs';
import { Outlet } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { fetchGetAllStudents } from '../../../redux/slices/getAllStudentsSlice'
// import {fetchGetStudents} from '../../../redux/slices/getStudentsSlice'




const Dashboard = () => {

    const dispatch = useDispatch();

    const isDark = useSelector((state) => state.toggle.isChecked);
    const user = useSelector((state) => state.loginUser);
    const allStudents = useSelector((state) => state.getAllStudents);

    useEffect(() => {
        if (user?.isAdmin) {
            dispatch(fetchGetAllStudents());
        }
    }, []);

    console.log(allStudents, "dashboard")


    const getPerformanceCategory = (marks) => {
        if (marks >= 90) return 'Excellent';
        if (marks >= 75) return 'Good';
        if (marks >= 50) return 'Average';
        if (marks >= 30) return 'Needs Improvement';
        return 'Bad';
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        const columns = ["S.no", "Name", "Marks", "Performance"];
        const data = [
            [1, "Attendance Marks", `${user?.user?.attendanceMarks ? user?.user?.attendanceMarks : 0}/100`, getPerformanceCategory(user?.user?.attendanceMarks)],
            [2, "Project Review Marks", `${user?.user?.projectReviewMarks ? user?.user?.projectReviewMarks : 0}/100`, getPerformanceCategory(user?.user?.projectReviewMarks)],
            [3, "Assessment Marks", `${user?.user?.assessmentMarks ? user?.user?.assessmentMarks : 0}/100`, getPerformanceCategory(user?.user?.assessmentMarks)],
            [4, "Project Submission Marks", `${user?.user?.projectSubmissionMarks ? user?.user?.projectSubmissionMarks : 0}/100`, getPerformanceCategory(user?.user?.projectSubmissionMarks)],
            [5, "LinkedInPost Marks", `${user?.user?.linkedInPostMarks ? user?.user?.linkedInPostMarks : 0}/100`, getPerformanceCategory(user?.user?.linkedInPostMarks)]
        ];

        doc.autoTable({
            head: [columns],
            body: data,
            theme: 'grid',
            headStyles: {
                fillColor: [220, 220, 220],
                textColor: [0, 0, 0],
                fontSize: 12,
                fontStyle: 'bold',
                halign: 'center',
                valign: 'middle',
                lineWidth: 0.5,
                lineColor: [150, 150, 150]
            },
            styles: {
                fontSize: 10,
                cellPadding: 8,
                valign: 'middle',
                halign: 'center',
                lineWidth: 0.5,
                lineColor: [150, 150, 150],
            },
            margin: { top: 10 },
        });

        doc.save(`${user?.user?.username}_Marks.pdf`);
    };

    return (
        <div className='w-[100%]'>
            <div className='w-[100%] border h-[80px] flex items-center px-4 justify-between'>
                <p className={`mb-0 text-[40px] ${isDark ? "text-white" : "text-black"} font-bold`}>Dashboard</p>
                {user?.isAdmin !== true && (
                    <div
                        onClick={handleDownloadPDF}
                        className='bg-[#764fe3] font-bold cursor-pointer text-white rounded-[8px] hover:bg-violet-800 px-3 py-2'>
                        Download Marks
                    </div>
                )}
            </div>
            <Tabs />
            <Outlet />
        </div>
    );
};

export default Dashboard;
