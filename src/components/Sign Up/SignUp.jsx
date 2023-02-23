import React,{useState} from 'react'
import {Link} from "react-router-dom";
import {useDispatch} from 'react-redux';
// import axios from 'axios';
// import {BASE_URL} from '../../config/config'
import './SignUp.scss';
import {setLoginFailure,setIsFetching} from "../../Redux/Slices/userSlice";
import { axiosInstance } from '../../config/config';

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [userdata, setUserdata] = useState({
    name:"",
    email: "",
    password: "",
  });
  const [serverErrors, setServerErrors] = useState([]);
  const handleChange = (e) => {
    setUserdata((initial) => {
      return { ...initial, [e.target.name]: e.target.value };
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(setIsFetching());
  try {
    const res = await axiosInstance.post('user/register', userdata);
    setLoading(false);
    res.data && window.location.replace("#/login");
  } catch (error) {
    dispatch(setLoginFailure());
    setLoading(false);
    setServerErrors(error.response.data); 
  }
  };

  
  return (
    <div className="register">
    <span className="registerTitle">Register</span>
    <form className="registerForm" onSubmit={handleSubmit}>
      <label>name</label>
      <input
        type="text"
        name='name'
        className="registerInput"
        placeholder="Enter your username..."
        onChange={(e) => handleChange(e)}
      />
      <label>Email</label>
      <input
        type="text"
        name='email'
        className="registerInput"
        placeholder="Enter your email..."
        onChange={(e) => handleChange(e)}
      />
      <label>Password</label>
      <input
        type="password"
        name='password'
        className="registerInput"
        placeholder="Enter your password..."
        onChange={(e) => handleChange(e)}
      />
      <button className="registerButton" type="submit"   disabled={loading ? true : false}>
      {loading ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
      </button>
    </form>
    <button className="registerLoginButton">
      <Link className="link" to="/login">
        Login
      </Link>
    </button>
    {serverErrors && <span className='error-message' style={{color:"red", marginTop:"10px"}}>{serverErrors}</span>}
  </div>
  )
}

export default SignUp