import React from 'react'

const Footer = () => {

    const currentYear = new Date().getFullYear()


    return (
        <div className='w-full flex border-t-2 border-white items-center justify-center h-[50px] bg-[#764fe3]'>
            <span className='text-white font-bold'>KARTHIK © {currentYear} ResultMaster</span>
        </div>
    )
}

export default Footer
