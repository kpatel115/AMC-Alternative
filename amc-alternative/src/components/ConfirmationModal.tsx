import React, {useEffect } from 'react';
import ReactPortal  from './ReactPortal';

interface ConfirmationModalProps {
    children: React.ReactChildren | React.ReactChild;
    isOpen: Boolean;
    handleClose: () => void;
}

const ConfirmationModal = ({
    children,
    isOpen,
    handleClose
}: ConfirmationModalProps) => {
    // escape key press to exit
    useEffect(() => {
        const escapeKey = (e: KeyboardEvent) => 
            e.key === 'Escape' || 'Enter' ? handleClose() : null;
        document.body.addEventListener('keydown', escapeKey);
        return () => {
            document.body.removeEventListener('keydown', escapeKey);
        };
    }, [handleClose]);

    // disable scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return (): void => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <ReactPortal wrapperId = 'react-portal-modal-container'>
        <>
            <div className='fixed top-0 left-0 w-screen h-screen z-40 bg-nuetral-800 opacity-50' />
            <div className='fixed rounded flex flex-col box-border min-w-fit overflow-hidden p-5 bg-zinc-800 inset-y-32 inset-x-32'>
                <button onClick={handleClose} className='py-3 px-8 self-end font-bold hover:bg-violet-600 border rounded-md'>Close</button>
                <div className='box-border h-5/6'>{children}</div>
            </div>
        </>
        </ReactPortal>
    );
};

export default ConfirmationModal;