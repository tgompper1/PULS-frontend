
import '../styles/popup.css'

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuthContext } from '../hooks/useAuthContext';

export default function Popup(props) {
  const { dispatch } = useAuthContext();

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
      //this does the post to login and checks if the input is a valid user
      
      const { data } = await axios.post(
        "https://pulse.adaptable.app/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        localStorage.setItem('user', JSON.stringify(inputValue));
        
        //handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 200);

        dispatch({type: 'LOGIN', payload: inputValue});
        props.setTrigger(false)
        
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
//DO WE ADD SIGNUP, if so add right before end of form
    return(props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <div>
                    <h1>Admin Login</h1>
                    <form onSubmit={handleSubmit}>
                        <label for="email">Email: &ensp;&ensp;&ensp;&ensp;</label>
                        <input type="email" id="email"  name="email" value={email} placeholder="Enter your email" onChange={handleOnChange}/><br></br>
                        <br></br>
                        <label for="pass">Password:  &ensp;</label>
                        <input type="password" id="pass" name="password" value={password} placeholder="Enter your password" onChange={handleOnChange}/><br></br>
                        <br></br><br></br>
                        <input type="submit" value="Submit" className='submit-btn'></input>
                        
                        
                    </form>
                    
                </div>
                <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
                
                {props.children}
                
            </div>
            <ToastContainer/>
        </div>
        
    ) : "";
}