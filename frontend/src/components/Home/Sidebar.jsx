import React, { useEffect , useState} from 'react'
import { CgNotes } from "react-icons/cg";
import { MdFileDownloadDone } from "react-icons/md";
import { LiaStarSolid } from "react-icons/lia";
import { TbAlertTriangleFilled } from "react-icons/tb";
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';


const Sidebar = () => {
    const dispatch = useDispatch();
    const history = useNavigate();
    const data=[
        {
            title: 'All Tasks',
            icon: <CgNotes/>,
            link:"/",
        },
        {
            title: 'Completed Tasks',
            icon: <MdFileDownloadDone />,
            link:"/completedTasks",
        },
        {
            title: 'Incomplete Tasks',
            icon: <TbAlertTriangleFilled />,
            link: "/incompleteTasks",
        },
        {
            title: 'Important Tasks',
            icon: <LiaStarSolid/>,
            link: "/importantTasks",
        },
    ]
    const [Data, setData] = useState()
    const logout = ()=>{
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        history("/signup");
    };
    const headers = {id:localStorage.getItem("id"), authorization: `Bearer ${localStorage.getItem("token")}`};
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks",{
                headers,
            });
            setData(response.data.data);
        };
        if(localStorage.getItem("id")&& localStorage.getItem("token")){
            fetch();
        }
    }, [])
    
    return (
        <>
            {Data && (
            <div>
                <h2 className='text-xl font-semibold'>{Data.username}</h2>
                <h4 className='my-1 text-purple-300'>{Data.email}</h4>
                <hr />
            </div>
            )}
            <div>
                {data.map((items,i)=>(
                    <Link 
                    to={items.link}
                    key={i}
                    className='my-2 flex items-center gap-2 hover:bg-purple-400 p-2 rounded transition-all duration-300'>
                        {items.icon}{items.title}
                    </Link>
                ))}
            </div>
            <div>
                <button className='bg-purple-400 w-full p-2 rounded'onClick={logout}>Logout</button>
            </div>
        </>
    )
}

export default Sidebar
