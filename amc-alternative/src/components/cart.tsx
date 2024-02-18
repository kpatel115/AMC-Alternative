"use client";
import React, { useEffect, useState } from "react";
import Header from "./header";
import { auth, db } from "../../firebase/firebase";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import {
  collection,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Image from "next/image";
import Modal from "./Modal";
import UpdateModal from "./UpdateModal";

function Cart() {
  const [open, setOpen] = useState(null);
  const router = useRouter();
  const [userId, setUserId] = useState<string>("");
  const [cartItems, setCartItem] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [update, setUpdate]: any = useState(null);
  const [updateMovieId, setMovieId] = useState("");

  const handleOpen = (item: any) => {
    setOpen(item);
  };
  interface UpdatedItem {
    [key: string]: any;
  }

  interface UpdatedItem {
    title: string;
    notes: string; // Assuming notes is of type string
    year: number; // Assuming year is of type number
    titleType: string; // Assuming titleType is of type string
    image: {
      height: number;
      width: number;
      url: string;
      id: string;
    }; // Assuming image is an object with specific properties
  }

  const handleUpdateClose = () => {
    setUpdate(null);
  };
  const handleClose = () => {
    setOpen(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        toast.success("user Logout successfully");
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const getdataofFirbase = async () => {
    try {
      const collectionRef = collection(db, "Movies");

      const querySnapshot = await getDocs(
        query(collectionRef, where("userId", "==", userId))
      );

      let arrayof: any = [];

      querySnapshot.forEach((doc) => {
        arrayof.push({ docId: doc.id, ...doc.data() });
      });

      setCartItem(arrayof);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  const handleUpdate = (item: any) => {
    setUpdate(item);
  };

  const handleTitleUpdate = async (item: any) => {
    const updatedItem: UpdatedItem = {
      title: item.title,
      notes: item.note,
      year: update.year,
      titleType: update.titleType,
      image: update.image,
    };
    const id = update.docId;
    console.log(id, "docId");

    if (item && id) {
      try {
        const collectionRef = collection(db, "Movies");
        await updateDoc(doc(collectionRef, id), updatedItem); // newData should contain the updated fields
        getdataofFirbase();
        setUpdate(null);

        toast.success("Updated Successfully");
      } catch (error) {
        console.error("Error updating document: ", error);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (userId) {
      getdataofFirbase();
    }
  }, [userId]);

  // delete

  const deleteDocumentsBasedOnQuery = async (docId: any) => {
    setLoading(true);
    try {
      const collectionRef = collection(db, "Movies");
      await deleteDoc(doc(collectionRef, docId));
      getdataofFirbase();
      setLoading(docId);
      toast.success("Delete Successfully");
    } catch (error) {
      console.error("Error deleting documents based on query: ", error);
      setLoading(false);
    }
  };

  // // update end
  // const updateDocumentsBasedOnQuery = async (docId: any) => {
  //   setLoading(true);
  //   try {
  //     const collectionRef = collection(db, "Movies");
  //     await updateDoc(docId);
  //     getdataofFirbase();
  //     setLoading(docId);
  //     toast.success("Update Successfully");
  //   } catch (error) {
  //     console.error("Error deleting documents based on query: ", error);
  //     setLoading(false);
  //   }
  // };
  console.log(cartItems, "here is cart");
  return (
    <div className="bg-white">
      <Header />

      <div className="bg-black h-screen">
        <div className="w-[90%] mx-auto  ">
          <p className="text-white text-[25px] pt-3 m-0">Cart Section</p>
          <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 ">
            {cartItems &&
              cartItems.map((item: any, index) => (
                <div
                  key={index}
                  className=" rounded-[5px] h-[400px] shadow-lg p-2 bg-white text-black mx-auto w-full my-5 flex flex-col justify-between"
                >
                  <div className="relative h-[300px] w-full  ">
                    <Image
                      src={item.image?.url}
                      alt={`Poster for ${item.title}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  <div>
                    <p className="text-center text-[18px] font-[700] py-3">
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
                      <button
                        type="button"
                        className="bg-[#a2d395] text-white p-2 px-6 rounded-[5px]"
                        onClick={() => handleUpdate(item)}
                      >
                        Update
                      </button>

                      <button
                        onClick={() => deleteDocumentsBasedOnQuery(item.docId)}
                        disabled={loading === item.docId}
                        className="bg-[#1A73E8] w-[80px] p-2 rounded-[5px] text-white  text-[16px]"
                      >
                        {loading === item.docId ? "Loading..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <Modal
          // id={item.id.replace(/\D/g, '')}

          open={open}
          onClose={handleClose}
        />
        <UpdateModal
          open={update}
          update={update}
          id={1}
          onClose={handleUpdateClose}
          handleTitleUpdate={handleTitleUpdate}
        />
      </div>
    </div>
  );
}

export default Cart;
