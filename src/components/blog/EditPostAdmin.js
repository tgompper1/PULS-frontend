import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';


import { useAuthContext } from "../../hooks/useAuthContext";

function EditPostAdmin(props) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  //if the user writes an admin url this will check if they're logged in
  //if not they get redirected to the home page
  if(user === null)
  {
    return <Navigate to="/"/>;
  }



  const [title, setTitle] = useState({title:''});
  const [summary, setSummary] = useState({summary:''});
  const [body, setBody] = useState({body:''});


  const { id } = useParams();
  
  const URL = "https://pulse.adaptable.app/"
  // get the post by id
  useEffect( () => {
    axios
      .get(URL+`api/posts/${id}`)
      .then((res) => {
        setTitle({title: res.data.title});
        setSummary({summary: res.data.summary});
        setBody({body: res.data.body});
      })
      .catch((err) => {
        console.log('Error from EditPostAdmin');
      });
  }, [id]);

  // apply the changes on submit
  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: title.title,
      summary: summary.summary,
      body: body.body,
    };

    axios
      .put(URL+`api/posts/${id}`, data)
      .then((res) => {
        console.log('Updated post successfully');
      })
      .catch((err) => {
        console.log('Error in EditPostAdmin');
      });
    
      navigate('/blog-admin');
  };

  // get spotlight post id
  useEffect(()=>{
    axios.get(URL+'api/settings/spotlight')
    .then((res) =>{
      localStorage.setItem("spotlightPostID", JSON.stringify(res.data.spotlightID));
    })
    .catch(() =>{
      localStorage.setItem("spotlightPostID", JSON.stringify([]));
    });
  });

  // remove spotlight post

  const deleteSpotlight = () => {
    axios
    .delete(URL+`api/settings/spotlight`)
    .then((res) => {
      console.log('successfuly removed old spotlight post');
    })
    .catch((err) => {
      console.log('Error form EditPostAdmin_starClick');
    });
  }

  // set spotlight button
  const addRemoveSpotlight =
    JSON.parse(localStorage.getItem("spotlightPostID")) === String(id)
    ? <Link  to= '/blog-admin' onClick={deleteSpotlight} className="button">
        Remove Spotlight
      </Link>
    :  <Link to='/blog-admin' className="button" onClick={() => onStarClick()}>
        Spotlight
      </Link>

  // delete post
  const onDeleteClick = () => {
    const r = window.confirm("Delete post?");
    if (r){
      if (String(id) === JSON.parse(localStorage.getItem("spotlightPostID"))){
        deleteSpotlight();
      }
      axios
      .delete(URL+`api/posts/${id}`)
      .then((res) => {
        navigate('/blog-admin');
      })
      .catch((err) => {
        console.log('Error form EditPostAdmin_deleteClick');
      });
    }
  };


  // spotlight a post post
  const onStarClick = () => {
    deleteSpotlight();

    // add spotlight post
    axios
    .post(URL+`api/settings/spotlight/`, {id})
    .then((res) => {
      console.log('Successfully added spotlight')
    })
    .catch((err) =>{
      console.log('Error form EditPostAdmin_starClick');
    })
  };

  return (
    <div>
      <Link to='/blog-admin' className="button">
        Back
      </Link>

      <Link to='/blog-admin' className="button" onClick={() => onDeleteClick()}>
        Delete
      </Link>

      {addRemoveSpotlight}

      <h2>Edit Post</h2>

      <form noValidate onSubmit={onSubmit}>
        <div className='input-element'>
          <label>Title (max 100 characters): </label>
          <br />
          <input
            type='text'
            className='text-input'
            name='title'
            maxlength="100"
            value={title.title}
            onChange={(e) =>{
              setTitle({title: e.target.value})}}
          />
        </div>
        <br />

        <div className='input-element'>
          <label>Summary (200 characters max): </label>
          <br />
          <textarea
            type='text'
            className="text-input"
            name='summary'
            maxlength="200"
            value={summary.summary}
            onChange={ (e) =>
              setSummary({['summary']: e.target.value})}
          />
        </div>
        <br />

        <div className='input-element'>
          <label>Body: </label>
          <br />
          <ReactQuill
            name='body'
            value={body.body} 
            onChange={(newValue) =>{
              setBody({body: newValue})}}
          />
        </div>
        <br />

        <input type='submit' onSubmit={onSubmit} className="button" value="Update Post"/>
      </form>
    </div>

  );
}

export default EditPostAdmin;