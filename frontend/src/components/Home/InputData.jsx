import React ,{useState,useEffect} from 'react'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
const InputData = ({InputDiv,setInputDiv,UpdatedData,setUpdatedData}) => {
    const [Data, setData] = useState({title:"",desc:""});
    useEffect(() => {
      setData({title:UpdatedData.title,desc:UpdatedData.desc});
    }, [UpdatedData])
    
    const headers = {id:localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}`};
    const change = (e) =>{
        const {name,value} = e.target;
        setData({...Data,[name]:value});
    }
    const submitData= async()=>{
        if(Data.title==="" || Data.desc===""){
            alert("Please fill all the fields");
        }
        else{
            await axios.post("http://localhost:1000/api/v2/create-task",Data,{headers});

        }
        setData({title:"",desc:""});
        setInputDiv("hidden");
    }
    const UpdateTask = async()=>{
        if(Data.title==="" || Data.desc===""){
            alert("Please fill all the fields");
        }
        else{
            await axios.put(`http://localhost:1000/api/v2/update-task/${UpdatedData.id}`,Data,{headers});

        }
        setUpdatedData({id:"",title:"",desc:""});
        setData({title:"",desc:""});
        setInputDiv("hidden");
    }

  return (
    <>
        <div className={`${InputDiv} top-0 left-0 bg-purple-800 opacity-80 h-screen w-full`}></div>
        <div className={`${InputDiv} top-0 left-0 flex items-center justify-center  h-screen w-full`}> 
            
            <div className='w-2/6 bg-purple-900  p-4 rounded'>
                <div className='flex justify-end '>
                    <button className='text-2xl' onClick={()=>{
                        setInputDiv("hidden");
                        setData({title:"",desc:""})
                        setUpdatedData({id:"",title:"",desc:""});
                    }}> 
                        <RxCross2/> 
                    </button>
                </div>
                <input 
                type='text' 
                placeholder='title' 
                name='title' 
                className='px-3 py-2 rounded w-full bg-purple-600 my-3'
                value = {Data.title}
                onChange={change}
                />
                <textarea 
                    name ='desc'
                    cols='30'
                    rows='10'
                    placeholder='Description'
                    className='px-3 py-2 rounded w-full bg-purple-600 my-3'
                    value = {Data.desc}
                    onChange={change}
                />
                {UpdatedData.id==="" ? <button className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold' onClick={submitData}>
                    Submit
                </button>: <button className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold' onClick={UpdateTask}>
                    Update
                </button>}
                
                
            </div>
        </div>
        
    </>

  )
}

export default InputData
