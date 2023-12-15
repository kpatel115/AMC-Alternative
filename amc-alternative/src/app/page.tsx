'use client';
import React, { useState, useEffect } from 'react';
// import ConfirmationModal from '../components/ConfirmationModal';
import Modal from '../components/Modal'
import { useGetData } from '@/custom-hook/DetailsData';

// Main Function for web app
function App() {

  const [endPoint, setEndpoints] = useState<string>('');
  const [container, setContainer] = useState<any[]>([]);
  const [finalPoint, setFinalPoint] = useState<string>('');
  const [selectionModel, setSelectionModel] = useState<string[]>([])
  
  const [openModal, setOpenModal] = useState<Array<boolean>>([]);

  // const {detailData, getData } = useGetData();
  // const [confirmationModalOpen, setConfirmationModalOpen] = useState<boolean>(false);


  useEffect(() => {
    fetchMe()
  }, [finalPoint])

  // Main Fetch API for Search Results
  const fetchMe = () => {
    fetch(`https://online-movie-database.p.rapidapi.com/title/v2/find?title=+${endPoint}&limit=8`, {
      'method': 'GET',
      'headers': {
        'X-RapidAPI-Key': '2abbd4e4e2msh5ca2ceb936a68dap1c7153jsn56d0a6ae36ea',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error!  Status: ${response.status}`)
        }
        console.log(response)
        return response.json();
      })
      .then(data => {
        console.log(data.results);
        setContainer(data.results)
        setOpenModal(new Array<boolean>(data.results.length).fill(false));
      })
      .catch(err => {
        console.error(err);
      });

      //setOpenModal(new Array(data.results.length).fill(false));
  };



  // const onClickDetails = () => {
  //   setMovieID(movieID)
  // }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEndpoints(e.target.value)
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFinalPoint(endPoint)
  }

  const handleOpen = (index:number) => {
    setOpenModal((prev) => {
      const newOpenModal = [...prev];
      newOpenModal[index] = true;
      return newOpenModal;
    })
}
const handleClose = (index: number) => {
  
    setOpenModal((prev) => {
      const newOpenModal = [...prev];
      newOpenModal[index] = false;
      return newOpenModal;
    })  
  // setOpen(false)
}

  // Main Function Return
  return (
    <div className='bg-white-500 h-screen w-screen'>
      <form onSubmit={submitHandler}>
        <input className='block bg-gray-200 ' type='text' value={endPoint} onChange={onChangeHandler}></input>
        <button className='bg-blue-100 p-2 m-2' type='submit'>Submit</button>
      </form>

      <div className='grid grid-cols-4 gap-2 justify-center items-center'>

        {container.map((item, index) => {

          return (
            <div key={index} className='w-300 h-200 bg-gray-300 overflow-hidden p-3 rounded-lg mt-0 mb-0 ml-auto mr-auto'>
              <img className='w-full h-full object-cover' src={item.image.url} alt="Poster for displayed movie" />
              <p>{item.title}</p>
              <p>{item.id.replace(/\D/g, '')}</p>
              <button
                type='button'
                onClick={() => handleOpen(index)}>
                Details
              </button>
              {/* Modal */}
              <Modal
                id={item.id.replace(/\D/g, '')}
                open={openModal[index]}
                onClose={() => handleClose(index)}
              />
             

            </div>
          )
        }
        )}
      </div>
    </div>
  )
};

export default App;
