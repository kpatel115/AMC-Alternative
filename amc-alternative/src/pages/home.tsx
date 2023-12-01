'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Home() {
  const [endPoint, setEndpoints] = useState<string>('');
  const [container, setContainer] = useState<any[]>([]);
  const [finalPoint, setFinalPoint] = useState<string>('');

  useEffect(() => {
    fetchMe()
  }, [finalPoint])

  const fetchMe = () => {
    fetch(`https://online-movie-database.p.rapidapi.com/title/v2/find?title=+${endPoint}&limit=8`, {
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
      <form onSubmit={submitHandler}>
        <input className='block bg-gray-200 ' type='text' value={endPoint} onChange={onChangeHandler}></input>
        <button className='bg-blue-100 p-2 m-2' type='submit'>Submit</button>
      </form>
      <div className='grid grid-cols-4 gap-2 justify-center items-center'>
        {container.map((item, index) => {
          return (
            <div key={index} className='h-96 p-3 rounded-lg mt-0 mb-0 ml-auto mr-auto'>
              <img src={item.image.url} alt="Poster for displayed movie" />
              <p>{item.title}</p>
              <p>{item.id}</p>
              <Link href="/post-details">details</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home;


