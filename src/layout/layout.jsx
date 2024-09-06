import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../container/header/header'
// import Footer from '../container/footer/footer'
import { useLocation } from 'react-router-dom'


const Layout = () => {
    const location = useLocation();

    return (
        <div className=''>
            {location.pathname !== "/" && location.pathname !== "/login" &&  location.pathname !== "/forgotPassword" && <Header />}
            <Outlet />
            {/* {location.pathname !== "/" && location.pathname !== "/login" &&  location.pathname !== "/forgotPassword" && <Footer />} */}
        </div>
    )
}

export default Layout
