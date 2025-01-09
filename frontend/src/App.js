import React , {useEffect} from 'react'
import Home from './pages/Home'
import { Routes, Route, useNavigate } from 'react-router-dom';
import AllTasks from './pages/AllTasks';
import ImportantTasks from './pages/ImportantTasks';
import CompletedTasks from './pages/CompletedTasks';
import IncompleteTasks from './pages/IncompleteTasks';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  useEffect(() => {
    if(localStorage.getItem("id")&& localStorage.getItem("token")){
      dispatch(authActions.login());
    }
   else if(isLoggedIn===false){
      navigate("/signup");
    }
  }, []);
  
  return (
    <div className='bg-purple-700 text-white h-screen p-2 relative'>
      
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route  index element={<AllTasks />} />
            
            <Route  path='/completedTasks' element={<CompletedTasks />} />
            <Route  path='/incompleteTasks' element={<IncompleteTasks />} />
            <Route  path='/importantTasks' element={<ImportantTasks />} />

          </Route>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      
    </div>
  )
}

export default App
