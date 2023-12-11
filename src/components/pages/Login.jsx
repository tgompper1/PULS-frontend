import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import './Login.css';


const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      //debugger;
      const { data } = await axios.post(
        "http://localhost:8001/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };
/*
  return (
    <div className="form_container">
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );*/
  const[buttonPopup, setButtonPopup] = useState(false);
  return (
    
    <div>
  <h3>ADMIN LOGIN</h3>
                        <h4 onClick={() => setButtonPopup(true)}>Login Here</h4>
                        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                            <h3>My Popup</h3>
                        </Popup>
  </div> 
  );
  function Popup(props) {
    return(props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <div>
                    <h1>Admin Login</h1>
                    <form>
                        <label for="usr">Username: &ensp;</label>
                        <input type="text" id="usr" name="usr"/><br></br>
                        <br></br>
                        <label for="pass">Password:  &ensp;</label>
                        <input type="password" id="pass" name="pass"/><br></br>
                        <br></br><br></br>
                        <input type="submit" value="Submit" className='submit-btn'></input>
                    </form>
                </div>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
                
                {props.children}
            </div>
        </div>
    ) : "";
};
};

export default Login;
