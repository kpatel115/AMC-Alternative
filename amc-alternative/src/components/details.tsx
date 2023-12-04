'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';


const router = useRouter();
const data = router.query
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
    <div className=''>

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

export default MovieDetails;

 




// function DisplayDetails() {
//   return (<h1>Develop Preview Ship </h1>)
// }

// ReactDOM.render(<DisplayDetails />, app)
//////////////////////////////////////////////////////////////////////////////////
// Import necessary modules and components
// 'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import {useRouter} from 'next/router';


// const router = useRouter();


// const MovieDetails = () => {
//   const [container, setContainer] = useState<any[]>([]);
//   const [endPoint, setEndpoints] = useState<string>('');

//   useEffect(() => {
//     // Extract movie ID from the query parameters
//     const { id } = router.query;
//     if (id) {
//       setEndpoints(id as string);
//     }
//   }, [router.query]);

//   useEffect(() => {
//     fetchDetails();
//   }, [endPoint]);

//   const fetchDetails = () => {
//     fetch(`https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=${endPoint}&currentCountry=US`, {
//       method: 'GET',
//       headers: {
//         'X-RapidAPI-Key': '2abbd4e4e2msh5ca2ceb936a68dap1c7153jsn56d0a6ae36ea',
//         'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setContainer(data.results);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEndpoints(e.target.value);
//   };

//   const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Set the final point here if needed
//   };

//   return (
//     <div>
//       <div>
//         <Link href="/">Back to home</Link>
//       </div>

//       <div>
//         {container.map((item, index) => (
//           <div key={index}>
//             <img src={item.image.url} alt="Poster for displayed movie" />
//             <label>Title</label>
//             <p>{item.title.title}</p>
//             <label>Title Type</label>
//             <p>{item.title.titleType}</p>
//             <label>Certificate</label>
//             <p>{item.certificates.US.certificate}</p>
//             <label>Rating</label>
//             <p>{item.ratings.rating}</p>
//             <label>Genres</label>
//             <p>{item.genres}</p>
//             <label>Plot Summary</label>
//             <p>{item.plotSummary.text}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;
