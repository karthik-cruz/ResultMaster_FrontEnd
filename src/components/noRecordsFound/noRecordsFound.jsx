import React from 'react'
import NoRecordsFoundImage from '../../assets/images/NoRecordsFound.png'


const NoRecordsFound = () => {
    return (
        <div className='flex flex-col items-center'>
            <img className='w-[300px]' src={NoRecordsFoundImage} alt="" />
            <p className='mb-0 font-bold text-[#764fe3] mt-2'>No Records Found</p>
        </div>
    )
}

export default NoRecordsFound
