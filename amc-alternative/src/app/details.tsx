
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function App() {
  const [endPoint, setEndpoints] = useState<string>('');
  const [container, setContainer] = useState<any[]>([]);
  const [finalPoint, setFinalPoint] = useState<string>('');

  useEffect(() => {
    fetchDetails()
  }, [finalPoint])

  const fetchDetails = () => {
    fetch(`https://online-movie-database.p.rapidapi.com/title/get-details?tconst=+${endPoint}`, {
        'method': 'GET',
        'headers': {
            'X-RapidAPI-Key': '2abbd4e4e2msh5ca2ceb936a68dap1c7153jsn56d0a6ae36ea',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    }
  })
  .then((response) => {
    return response.json();
  })
  .then(data => {
    setContainer(data.results)
  })
  .catch(err => {
    console.error(err);
  });
}


  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoints(e.target.value)
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFinalPoint(endPoint)
  }

  return (
    <div className='bg-white-500 h-screen w-screen'>

      <div>
        <Link href="/">Back to home</Link>
      </div>
      <div className='grid grid-cols-4 gap-2 justify-center items-center'>
        {container.map((item, index) => {
          return (
            <div key={index} className='h-96 p-3 rounded-lg mt-0 mb-0 ml-auto mr-auto'>
              <img src={item.image.url} alt="Poster for displayed movie" />
              <p>{item.title}</p>
              
            </div>
            // user will click a movie and i will use that movies id to display the correct 
            // details on the details page
          )
        })}
      </div>
    </div>
  )
}

export default App;

 




function DisplayDetails() {
  return (<h1>Develop Preview Ship </h1>)
}

ReactDOM.render(<DisplayDetails />, app)
