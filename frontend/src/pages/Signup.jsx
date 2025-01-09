import React, {useState}from 'react';

import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useSelector } from 'react-redux';
const Signup = () => {
    const history = useNavigate();
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

    if(isLoggedIn===true){
        history("/");
      }
    const [Data, setData] = useState({username:"",email:"",password:""});
    
    const change = (e)=>{
        const {name,value} = e.target;
        setData({ ...Data,[name]:value});
    };
    const submit =async ()=>{
        try {
            if(Data.username==="" || Data.email==="" || Data.password==="")
                {
                    alert("all fields are required");
                }
                else{
                    const response = await axios.post("http://localhost:1000/api/v1/sign-in",Data);
                    setData({username:"",email:"",password:""});
                    console.log("response:",response.data);
                    history("/login");
                }
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    return (
        <div className=' h-[98vh] flex  items-center justify-center'>
            <div className='p-4 w-2/6 rounded bg-purple-900'>
                <div className='text-2xl font-semibold'>Signup</div>
                <input
                    type="username" 
                    placeholder='username' 
                    className='bg-purple-800 px-3 py-2 my-3 rounded w-full ' 
                    name='username'
                    value={Data.username}
                    onChange={change}
                    
                />
                <input
                    type="email" 
                    placeholder='email' 
                    className='bg-purple-800 px-3 py-2 my-3 rounded w-full' 
                    name='email' 
                    
                    value={Data.email}
                    required
                    onChange={change}
                />
                <input
                    type="password" 
                    placeholder='password' 
                    className='bg-purple-800 px-3 py-2 my-3 rounded w-full ' 
                    name='password'
                    value={Data.password}
                    onChange={change}
                />
                <div className='w-full flex items-center justify-between'>
                    <button className='bg-blue-500 text-xl font-semibold px-2 py-2 rounded '
                    onClick={submit}>
                        Signup
                    </button>
                    <Link to="/login" className='text-purple-400 hover:text-purple-100'>
                        Already have an account? LogIn Here
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup
