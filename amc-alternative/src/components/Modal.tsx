import React from 'react';
import { useState, useEffect } from 'react'
import { useGetData } from '../custom-hook/DetailsData'

// just to display the stuff 
type ModalProps = {
    id: string;
    open: boolean;
    onClose?: () => void
}

const Modal = (props: ModalProps) => {
    const { detailData, getData } = useGetData(props.id);

    useEffect(() => {
        if (props.open) {
            getData();
        }
    }, [props.open, getData]);

    if (!props.open ) return (<></>);

    return (

        <div onClick={ props.onClose } 
        className='fixed w-full h-full flex overflow-auto z-1 justify-center  bg-gray-300 bg-opacity-25' >
            
            {/* Modal */}
            <div className='max-w-600px w-2/5 fixed flex items-start py-4z-1 mt-20 bg-white shadow-xl rounded' onClick={(e) => {
                e.stopPropagation()
            }}>
                <div className='w-full flex flex-col'>
                    <div className='flex flex-row space-apart'>

                        <p className='flex justify-start m-3 bg-slate-300 rounded p-2 hover:bg-slate-700 text-white' onClick={props.onClose}>
                            X
                        </p>
                    </div>

                    {/* Render the fetched data here */}
                    <div className='flex flex-col items-start text-center mt-3 p-2 py-4'>
                        {/* Use detailData to render your data */}
                        <p>{detailData}</p>
                        {/* Add more elements as needed */}
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Modal