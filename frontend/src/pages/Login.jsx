import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import axios from "axios";
import {authActions} from '../store/auth';
const Login = () => {
    const history = useNavigate();
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

    if(isLoggedIn===true){
        history("/");
      }
    const [Data, setData] = useState({username:"",password:""});
    const dispatch = useDispatch();

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
                    const response = await axios.post("http://localhost:1000/api/v1/log-in",Data);
                    setData({username:"",password:""});
                    localStorage.setItem("id",response.data.id);
                    localStorage.setItem("token",response.data.token);
                    dispatch(authActions.login());
                    history("/");
                }
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    return (
        <div className=' h-[98vh] flex  items-center justify-center'>
            <div className='p-4 w-2/6 rounded bg-purple-900'>
                <div className='text-2xl font-semibold'>Login</div>
                <input
                    type="username" 
                    placeholder='username' 
                    className='bg-purple-800 px-3 py-2 my-3 rounded w-full ' 
                    name='username'
                    value={Data.username}
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
                    <button className='bg-blue-500 text-xl font-semibold px-2 py-2 rounded 'onClick={submit}>
                        Login
                    </button>
                    <Link to="/signup" className='text-purple-400 hover:text-purple-100'>
                        Don't have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
