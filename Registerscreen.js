import React ,{useState , useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'
import { registerUser } from '../actions/userActions';
export default function Registerscreen() {
  const [name,setname]=useState('');
  const[email,setemail]=useState('');
  const[password,setpassword]=useState('');
  const[cpassword,setcpassword]=useState('');
  const registerstate = useSelector(state =>state.registerUserReducer)
  const {error , loading , success} = registerstate
  const dispatch=useDispatch()
  function register(){
    if(password.length < 6)
    {
        alert("Password must be at least 6 characters long")
    }
    else if(!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email))
    {
        alert("Invalid email format")
    }
    else if(password!=cpassword)
    {
        alert("passwords not matched")
    }
    else{
        const user={
            name,
            email,
            password
        }
        console.log(user);
        dispatch(registerUser(user))
  }
}

  return (
    <div  style={{ backgroundImage: `url('/newbg.jpg')`,minHeight: '80vh'}}>
        <div className="row justify-content-center mt-5">
            <div className="col-md-5 mt-5 text-left shadow-lg p-3 mb-5 bg-white rounded">
            {loading && (<Loading/>)}
          {success && (<Success success='User Registered Successfully' />)}
          {error && (<Error error='Email already registred' />)}
              <h2 className="text-center m-2"style={{fontSize:'35px'}}>Register<svg  style={{height:'35px'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>
</h2>
              <div>
                <input required type="text" placeholder="name" className="form-control" value={name} onChange={(e)=>{setname(e.target.value)}}/>
                <input required type="text" placeholder="email" className="form-control" value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                <input type="text" placeholder="password" className="form-control" value={password}  required
                onChange={(e)=>{setpassword(e.target.value)}}/>
                <input type="text" placeholder="confirm password" className="form-control" value={cpassword}  required onChange={(e)=>{setcpassword(e.target.value)}}/>
                <center><button onClick={register} className="btn mt-3 mb-3">REGISTER</button></center>
              
                <center><a style={{color:'black'}} href="/login">Click Here To Login&nbsp;<svg style={{height:'20px'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

</a></center>
              </div>
            </div>
        </div>
    </div>
  )
}
