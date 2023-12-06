import React, { useEffect, useState } from 'react';
import ReactPortal from './ReactPortal';


interface ConfirmationModalProps {
    // children: React.ReactChildren | React.ReactChild;
    // children: React.ReactNode
    isOpen: boolean;
    id: string;
    handleClose: () => void;
}

const ConfirmationModal = ({
    // children,
    isOpen,
    id,
    handleClose
}: ConfirmationModalProps) => {

    const [container, setContainer] = useState<any[]>([]);
    // escape key press to exit
    useEffect(() => {
        const escapeKey = (e: KeyboardEvent) =>
            e.key === 'Escape' || e.key === 'Enter' && handleClose();
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

    // get details
    useEffect(() => {
        fetchDetails()
    }, [id]);
    // FetchDetails function used in the useEffect #3

    const fetchDetails = () => {
        fetch(`https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=${id}&currentCountry=US`, {
            'method': 'GET',
            'headers': {
                'X-RapidAPI-Key': '2abbd4e4e2msh5ca2ceb936a68dap1c7153jsn56d0a6ae36ea',
                'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
            }
        })
            .then((response) => {
                console.log(response.json)
                return response.json();
            })
            .then(data => {
                console.log('Data from Details API: ', data)
                setContainer(data.results)
            })
            .catch(err => {
                console.error('error fetching data', err);
            });
    }



    ////////////////////////////////////////////////////////

    if (!isOpen) return null;

    return (
        <ReactPortal wrapperId='react-portal-modal-container'>
            <>
                <div className='fixed top-0 left-0 w-screen h-screen z-40 bg-neutral-80 opacity-50' />

                <div className='fixed rounded flex flex-col box-border min-w-fit overflow-hidden p-5 bg-zinc-800 inset-y-32 inset-x-32'>
                    <div className='box-border'>
                        {/* {children} */}
                        {container && container.map((item) => {
                            return (
                                <div className='h-auto w-auto p-5 m-3 flex justify-center align-center'>
                                    <p>Hello</p>
                                    <label>Title</label>
                                    <p>{item.title}</p>
                                    <label>Plot</label>
                                    <p>{item.plotSummary.text}</p>
                                </div>
                            )
                        })}
                    </div>
                    <button onClick={handleClose} className='py-3 px-8 self-end font-bold hover:bg-violet-600 border rounded-md'>Close</button>
                </div>
            </>
        </ReactPortal>
    );
};

export default ConfirmationModal;