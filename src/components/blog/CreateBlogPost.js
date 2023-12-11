import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { useNavigate } from 'react-router-dom';

const CreateBlogPost = (props) => {
  // Define the state with useState hook
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: '',
    body: '',
    photo: ''
  });

  const URL = "https://pulse.adaptable.app/"
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('summary', post.summary);
    formData.append('body', post.body);
    formData.append('photo', post.photo);

    axios
      .post(URL + 'api/posts', formData)
      .then((res) => {
        setPost({
          title: '',
          summary: '',
          body: '',
          photo: '',
        });
      })
      .catch((err) => {
        console.log('Error in CreateBlogPost');
      });

    navigate('/blog-admin');
  };

  return (
    <div>
      <Link to='/blog-admin' className="button">
        Back
      </Link>

      <h2>Add Post</h2>

      <form noValidate onSubmit={onSubmit}>
        <div className='input-element'>
          <label>Title (max 100 characters): </label>
          <br />
          <input
            className="text-input"
            type='text'
            placeholder='Title'
            name='title'
            maxlength="100"
            value={post.title}
            onChange={(e) => setPost({ ...post, [e.target.name]: e.target.value })}
          />
        </div>
        <br />

        <div className='input-element'>
          <label>Summary (max 200 characters): </label>
          <br />
          <textarea
              className="text-input"
              type='text'
              placeholder='Summary'
              name='summary'
              maxlength="200"
              value={post.summary}
              onChange={(e) => setPost({ ...post, [e.target.name]: e.target.value })}
            />
        </div>
        <br />

        <div className='input-element'>
          <label>Image: </label>
          <input 
            type="file" 
            accept='.png, .jpg, .jpeg'
            name='photo' 
            onChange={e => setPost({ ...post, photo: e.target.files[0]})}>
          </input>
        </div>
        <br />

        <div className='input-element'>
          <label>Body: </label>
          <br />
          <ReactQuill
            type='text'
            className="text-editor"
            placeholder='text here'
            name='body'
            value={post.body}
            onChange={(newValue) =>{
              setPost({...post, ["body"]: newValue});}}
          />
        </div>
          
        <input type='submit' onSubmit={onSubmit} className="button" value="Create Post"/>
      </form>
    </div>
  );
};

export default CreateBlogPost;