import React,{useState} from 'react'
import { Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {axiosInstance} from '../../config/config';
// import axios from 'axios';
import {setIsFetching, setLoginFailure, setLoginSuccess} from '../../Redux/Slices/userSlice';
import './Login.scss'

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [userdata, setUserdata] = useState({ email: "", password: "" });
  const [serverErrors, setServerErrors] = useState([]);
  const handleChange = (e) => {
    setUserdata((initial) => {
      return { ...initial, [e.target.name]: e.target.value };
    });
  };
  const dispatch = useDispatch();
 

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setIsFetching());
    setLoading(true);
    try {
      const res = await axiosInstance.post('user/login', userdata);
      
      dispatch(setLoginSuccess(res.data));
      res.data && window.location.replace("/");
      setLoading(false);
    } catch (error) {
      dispatch(setLoginFailure());
      setServerErrors(error.response.data);
      setLoading(false);
    }


  };

 
  return (
    <div className="login">
    <span className="loginTitle">Login</span>
    <form className="loginForm" onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        type="email"
        name='email'
        className="loginInput"
        placeholder="Enter your email..."
        onChange={(e) => handleChange(e)}
      />
      <label>Password</label>
      <input
        type="password"
        name='password'
        className="loginInput"
        placeholder="Enter your password..."
        
        onChange={(e) => handleChange(e)}
      />
      <button className="loginButton" type="submit" disabled={loading ? true : false}>
      {loading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
      </button>
    </form>
    <button className="loginRegisterButton">
      <Link className="link" to="/signup">
        Register
      </Link>
    </button>
    {serverErrors && <span className="error-message" style={{color:"red", marginTop:"10px"}}>{serverErrors}</span>}
  </div>
  )
}

export default Login