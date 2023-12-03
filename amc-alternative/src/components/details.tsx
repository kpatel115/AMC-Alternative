
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function MovieDetails() {
  const [endPoint, setEndpoints] = useState<string>('');
  const [container, setContainer] = useState<any[]>([]);
  const [finalPoint, setFinalPoint] = useState<string>('');

  useEffect(() => {
    fetchDetails()
  }, [finalPoint])

  const fetchDetails = () => {
    fetch(`https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=+${endPoint}&currentCountry=US`, {
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
    <div className='b'>

      <div>
        <Link href="/">Back to home</Link>
      </div>

      <div className=''>
        
        {container.map((item, index) => {

          return (

            <div key={index} className=''>

                <img src={item.image.url} alt="Poster for displayed movie" />
                <label>Title</label> 
                <p>{item.title.title}</p>
                <label>Title</label>
                <p>{item.title.titleType}</p>
                <label>Title</label>
                <p>{item.certificates.US.certificate}</p>
                <label>Title</label>
                <p>{item.ratings.rating}</p>
                <label>Title</label>
                <p>{item.genres}</p>
                <label>Title</label>
                <p>{item.plotSummary.text}</p>

                     
            </div>

          )
        })}
      </div>
    </div>
  )
}

export default App;

 




// function DisplayDetails() {
//   return (<h1>Develop Preview Ship </h1>)
// }

// ReactDOM.render(<DisplayDetails />, app)
