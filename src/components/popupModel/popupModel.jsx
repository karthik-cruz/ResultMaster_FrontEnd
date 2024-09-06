import React, { useState } from 'react';
import { MdClose } from "react-icons/md";

function PopupModal(props) {

    const { isOpen, setIsOpen, name, children } = props



    return (
        <div className="">
            {/* Conditionally render the modal */}
            {isOpen && (
                <div
                    id="popup-modal"
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-xl max-h-full">

                        <div className="relative bg-white rounded-lg p-4 shadow dark:bg-gray-700">
                            {/* model headers */}
                            <div className='flex border-b-2 text-white border-gray-500 items-center justify-between'>
                                <p className='mb-0 text-[25px] font-bold'>{name}</p><MdClose size={30} onClick={() => setIsOpen(false)} className="cursor-pointer" />
                            </div>
                            <div>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PopupModal;
