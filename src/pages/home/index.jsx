import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
//components -------------------------------------------------------------
import SideTabs from '../../components/sideTabs/sideTabs'
import useAuth from '../../customHooks/useAuth'
import { fetchGetStudents } from '../../redux/slices/getStudentsSlice'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGetAllStudents } from '../../redux/slices/getAllStudentsSlice'

const Index = () => {
    useAuth();
    const dispatch = useDispatch();
    const user = useSelector(state => state.loginUser);
    const isDark = useSelector(state => state.toggle.isChecked)

    useEffect(() => {
        if (user?.isAdmin) {
            dispatch(fetchGetAllStudents()).then((res) => {
                console.log("Admin Data collected")
            });
        } else {
            dispatch(fetchGetStudents(user?.user?.internDuration)).then((res) => {
                console.log("user Data collected")
            });
        }
    }, []);



    return (
        <div className='flex w-[100%] '>
            <SideTabs />
            <div className={`w-[80%] ${isDark ? "bg-[#1e1e1e] " : "bg-white "}`}>
                <Outlet />
            </div>
        </div>
    )
}

export default Index
