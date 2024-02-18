"use client";
import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { toast, Toast } from "../components/Toast";
import Image from "next/image";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Header from "@/components/header";

// Main Function for web app
function App() {
  const router = useRouter();

  const [endPoint, setEndpoints] = useState<string>("");
  const [container, setContainer] = useState<any[]>([
    {
      id: "/title/tt2705436/",
      image: {
        height: 1000,
        id: "/title/tt2705436/images/rm1596077569",
        url: "https://m.media-amazon.com/images/M/MV5BZWQxMjcwNjItZjI0ZC00ZTc4LWIwMzItM2Q0YTZhNzI3NzdlXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_.jpg",
        width: 706,
      },
      title: "Italian Spiderman",
      titleType: "short",
      year: 2007,
    },
    {
      id: "/title/tt12122034/",
      image: {
        height: 960,
        id: "/title/tt12122034/images/rm1109638401",
        url: "https://m.media-amazon.com/images/M/MV5BNjA2NmZhOGEtZTQ5OS00MDI0LTg4N2UtYTRmOTllM2I2NDlhXkEyXkFqcGdeQXVyNTU4OTE5Nzc@._V1_.jpg",
        width: 679,
      },
      title: "Spiderman the Verse",
      titleType: "tvMiniSeries",
      year: 2019,
    },
    {
      id: "/title/tt18351128/",
      image: {
        height: 1350,
        id: "/title/tt18351128/images/rm550377985",
        url: "https://m.media-amazon.com/images/M/MV5BYzYzZDViNWYtNWViMS00NDMxLThlN2YtZjFkOWMwODkzNzhiXkEyXkFqcGdeQXVyMTUwMzM4NzU0._V1_.jpg",
        width: 1080,
      },
      title: "The Amazing Spiderman 2 Webb Cut",
      titleType: "movie",
      year: 2021,
    },
    {
      id: "/title/tt3696826/",
      title: "Spiderman 5",
      titleType: "short",
      year: 2008,
    },
    {
      id: "/title/tt24154050/",
      image: {
        height: 720,
        id: "/title/tt24154050/images/rm1070803969",
        url: "https://m.media-amazon.com/images/M/MV5BNWNkMzY3NjQtZmUwNy00ODlhLTk1MDctMzYzNmFhNzhhNzg0XkEyXkFqcGdeQXVyMTI0NTA1MDI3._V1_.jpg",
        width: 1280,
      },
      title: "Hyundai Ioniq 5: Spiderman Only Way Home",
      titleType: "video",
      year: 2021,
    },
    {
      id: "/title/tt9146610/",
      image: {
        height: 480,
        id: "/title/tt9146610/images/rm1631024640",
        url: "https://m.media-amazon.com/images/M/MV5BYWU5YTg2ODgtYjY5Mi00ZDJhLTkyYjktYWRmNTc3ZjQ4YmJkXkEyXkFqcGdeQXVyODE4Njg5ODQ@._V1_.jpg",
        width: 640,
      },
      title: "Discount Spiderman 2",
      titleType: "movie",
      year: 2018,
    },
    {
      id: "/title/tt7575846/",
      image: {
        height: 639,
        id: "/title/tt7575846/images/rm2109888512",
        url: "https://m.media-amazon.com/images/M/MV5BNDM5ODA3ZDYtN2VjNy00OTI0LWFlNWYtYTc5ZjJlOTlhNWJlXkEyXkFqcGdeQXVyODE4Njg5ODQ@._V1_.jpg",
        width: 960,
      },
      title: "Discount Spiderman: Origins",
      titleType: "short",
      year: 2017,
    },
    {
      id: "/title/tt0100669/",
      title: "Spiderman",
      titleType: "short",
      year: 1990,
    },
  ]);
  const [finalPoint, setFinalPoint] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [open, setOpen] = useState(null);

  useEffect(() => {
    fetchMe();
  }, [finalPoint]);

  // Main Fetch API for Search Results
  const fetchMe = () => {
    fetch(
      `https://online-movie-database.p.rapidapi.com/title/v2/find?title=+${endPoint}&limit=8`,
      {
        method: "GET",
        headers: {
          'X-RapidAPI-Key': '71669a8e82msh5eac9712c9eb2a9p1ec866jsnda53d5651dca',
          'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        },
      }
    )
      .then((response) => {
        console.log(response.json);
        return response.json();
      })
      .then((data) => {
        setContainer(data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const onClickDetails = () => {
  //   setMovieID(movieID)
  // }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndpoints(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFinalPoint(endPoint);
  };

  const handleOpen = (item: any) => {
    setOpen(item);

  };
 
  const handleClose = () => {
    setOpen(null);
  };
 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in:", user.uid);
        setUserId(user.uid);
      } else {
        // No user is signed in.
        toast.success("user Logout successfully");
        router.push("/login");
        console.log("No user is signed in.");
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const movies = [
    {
      id: 1,
      title: "The Dark Knight",
      director: "Christopher Nolan",
      year: 2008,
      genre: "Action",
      rating: 9.0,
      image: "https://placekitten.com/800/1200",
    },
    {
      id: 2,
      title: "Pulp Fiction",
      director: "Quentin Tarantino",
      year: 1994,
      genre: "Crime",
      rating: 8.9,
      image: "https://placekitten.com/800/1201",
    },
    {
      id: 3,
      title: "Forrest Gump",
      director: "Robert Zemeckis",
      year: 1994,
      genre: "Drama",
      rating: 8.8,
      image: "https://placekitten.com/800/1202",
    },
    {
      id: 4,
      title: "The Matrix",
      director: "Lana and Lilly Wachowski",
      year: 1999,
      genre: "Sci-Fi",
      rating: 8.7,
      image: "https://placekitten.com/800/1203",
    },
    {
      id: 5,
      title: "The Lord of the Rings",
      director: "Peter Jackson",
      year: 2001,
      genre: "Fantasy",
      rating: 8.8,
      image: "https://placekitten.com/800/1204",
    },
    {
      id: 6,
      title: "Inglourious Basterds",
      director: "Quentin Tarantino",
      year: 2009,
      genre: "War",
      rating: 8.3,
      image: "https://placekitten.com/800/1205",
    },
    {
      id: 7,
      title: "Inglourious Basterds",
      director: "Quentin Tarantino",
      year: 2009,
      genre: "War",
      rating: 8.3,
      image: "https://placekitten.com/800/1205",
    },
    {
      id: 8,
      title: "Inglourious Basterds",
      director: "Quentin Tarantino",
      year: 2009,
      genre: "War",
      rating: 8.3,
      image: "https://placekitten.com/800/1205",
    },
  ];

  const dataSaveInFirebaseHandler = async (data: any) => {
    try {
      let userSavedata = {
        userId,
        ...data,
      };

      const collectionRef = collection(db, "Movies");
      const querySnapshot = await getDocs(
        query(
          collectionRef,
          where("id", "==", data.id),
          where("userId", "==", userId)
        )
      );

      if (querySnapshot.docs.length > 0) {
        toast.error("Movie already added in to cart");
      } else {
        const docRef = await addDoc(collectionRef, userSavedata);
        toast.success("Movie  added  to cart");
      }

      // console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const addDocumentAndGetId = async () => {
    try {
      // Assuming "MoviesName" is your collection name
      const collectionRef = collection(db, "Movies");

      // Add a document to the collection
      const querySnapshot = await getDocs(
        query(collectionRef, where("userId", "==", userId))
      );
      console.log(querySnapshot, "querySnapshot");

      let arrayof: any = [];
      // Get the ID of the added document
      querySnapshot.forEach((doc) => {
        console.log("Document ID:", doc.id);
        arrayof.push({ id: doc.id, ...doc.data() });
      });

      console.log(arrayof);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Main Function Return
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="py-5">
        <p className="text-center text-[30px] font-[700]">Search movies </p>
        <form onSubmit={submitHandler}>
          <div className="flex justify-center items-center my-3">
            <input
              className="block bg-white w-[60%] h-[60px] rounded-[5px] px-3 outline-none text-black"
              type="text"
              value={endPoint}
              onChange={onChangeHandler}
            ></input>
          </div>
          <div className="flex justify-center items-center ">
            <button
              className="bg-[#E9222D] py-3  lg:w-[100px] w-[80px] rounded-[5px] text-white  text-[16px]"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="w-[90%] mx-auto   mb-5">
          <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8 justify-center items-center my-[50px] ">

            {container.map((item: any, index) => {
              return (
                <div
                  key={index}
                  className=" h-[400px] shadow-lg p-2 bg-white my-5  text-black mx-auto w-full flex flex-col justify-between rounded-[5px]"
                >
                  <div className="relative h-[300px] w-full  ">
                    <Image
                      src={item?.image?.url}
                      alt={`Poster for ${item.title}`}
                      fill
                      objectFit="cover"
                      className="rounded-[10px]"
                    />
                  </div>

                  <div>
                    <p className="text-center text-[15px] font-[700] py-2">
                      {item.title}
                    </p>

                    <div className="flex justify-between">
                      <button
                        type="button"
                        className="bg-[#E20031] text-white p-2 px-6 rounded-[5px]"
                        onClick={() => handleOpen(item)}
                      >
                        Details
                      </button>

{/* 
                      <button
                        type="button"
                        className="bg-[#E20031] text-white p-2 px-6 rounded-[5px]"
                        onClick={() => handleUpdate(item)}
                      >
                        Update
                      </button> */}



                      <button
                        onClick={() => dataSaveInFirebaseHandler(item)}
                        className="bg-[#54AEFF] p-2  px-2 rounded-[5px] text-white"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <Modal
              open={open}
              onClose={handleClose}
            />


            {/* <UpdateModal
              open={update}
              update={update}
              onClose={handleUpdateClose}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
