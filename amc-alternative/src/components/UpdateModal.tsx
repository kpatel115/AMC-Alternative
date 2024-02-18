import React from "react";
import { useState, useEffect } from "react";
import { useGetData } from "../custom-hook/DetailsData";
import Image from "next/image";
import { toast, Toast } from "../components/Toast";
import { auth, db } from "../../firebase/firebase";

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
// just to display the stuff
type ModalProps = {
  // id: string;
  open: any;
  update: any;
  id: any;
  onClose?: () => void;
  handleTitleUpdate: (data: UpdateData) => void;
};
interface UpdateData {
  title: string;
  note: string;
  id: any;
}

const UpdateModal = (props: ModalProps) => {
  if (!props.open) return <></>;
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const dataToSend: UpdateData = {
    title: title,
    note: note,
    id: props.id,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (title == "") {
      toast.error("title is mandatory");
    } else {
      props.handleTitleUpdate(dataToSend);
    }
  };

  return (
    <div
      onClick={props.onClose}
      className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm bg-[#0000008a]  z-1  text-black  "
    >
      {/* Modal */}
      <div
        className="absoulte top-1/2 left-1/2 p-2 -translate-x-1/2 -translate-y-1/2 max-w-600px lg:w-[40%] md:w-[60%] w-[90%] fixed  items-start  bg-white shadow-xl rounded"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col">
            <div className="flex justify-between items-center px-4 py-2">
              <h1 className="text-[24px]  font-[700]">Update Movie</h1>

              <p
                className="flex justify-start m-3 bg-slate-300 rounded p-2 hover:bg-slate-700 text-white"
                onClick={props.onClose}
              >
                X
              </p>
            </div>
          </div>

          <div className="px-4  w-full">
            <div className="relative top-1/2 h-[300px]    w-full  ">
              <label htmlFor="" className="text-[18px] font-semibold ">
                Title
              </label>
              <input
                type="text"
                className="border w-full h-[40px] mt-2 rounded-md p-2"
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="mt-4">
                <label htmlFor="" className="text-[18px] font-semibold mt-4">
                  Notes
                </label>
                <textarea
                  className="border w-full h-[120px] mt-2 rounded-md p-2"
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-[#E20031] text-white p-2 mt-2 px-6 rounded-[5px] w-full"

                // onClick={() => props.handleTitleUpdate(dataToSend)}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateModal;
