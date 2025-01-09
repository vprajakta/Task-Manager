import React from 'react'
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { FaHeart } from "react-icons/fa";

import axios from 'axios';
const Cards = ({ home, setInputDiv, data, setUpdatedData }) => {

  const headers = { id: localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}` };
  const handleCompleteTask = async (id) => {
    try {
      await axios.put(`http://localhost:1000/api/v2/update-complete-task/${id}`, {}, { headers });

    } catch (err) {
      console.log(err);
    }
  }
  const handleImportant = async (id) => {
    try {
      const response = await axios.put(`http://localhost:1000/api/v2/update-imp-task/${id}`, {}, { headers });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
  const handleUpdate = async (id, title, desc) => {
    try {
      setInputDiv("fixed");
      setUpdatedData({ id: id, title: title, desc: desc });

    } catch (err) {

    }
  }
  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:1000/api/v2/delete-task/${id}`, { headers });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      {data && data.map((items, i) => (
        <div className="bg-purple-500 rounded-xl p-4 flex flex-col justify-between">
          <div >
            <h2 className='text-xl font-semibold'>{items.title}</h2>
            <p className='text-purple-200 my-2'>{items.desc}</p>
          </div>
          <div className='mt-4 w-full flex items-center'>
            <button className={`${items.complete === false ? "bg-red-400" : "bg-green-700"} p-2 rounded`}
              onClick={() => handleCompleteTask(items._id)}>
              {items.complete === true ? "Completed" : "Incomplete"}
            </button>
            <div className='text-white  w-full p-2 w-3/6 text-xl flex justify-around font-semobold'>
              <button onClick={() => handleImportant(items._id)}>
                {items.important === false ? <CiHeart /> : <FaHeart className='text-red-500' />}
              </button>
              {home !== "false" &&
                (<button
                  onClick={() => { handleUpdate(items._id, items.title, items.desc) }}>
                  <FaEdit />
                </button>)}
              <button onClick={() => deleteTask(items._id)}><MdDelete /></button>
            </div>
          </div>
        </div>
      ))}
      {home === "true" &&
        (<button className="flex flex-col justify-center items-center bg-purple-500  rounded-xl p-4 hover:scale-105 hover:curser-pointer transition-all duration-300" onClick={() => setInputDiv("fixed")}>
          <IoMdAddCircle className='text-5xl' />
          <h2 className=' mt-4 text-2xl text-purple-200'>Add Task</h2>
        </button>)}
    </div>
  )
}

export default Cards
