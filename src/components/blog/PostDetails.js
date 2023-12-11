import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import parse from 'html-react-parser';
import '../../styles/blog.css';

const PostDetails = (props) => {
  const [post, setPost] = useState({
    title: '',
    photo: '',
    body: '',
    createdAt: new Date()
  });

  const { id } = useParams()
  const URL = "https://pulse.adaptable.app/"
  // get the post by id
  useEffect(() => {
    axios
      .get(URL+`api/posts/${id}`)
      .then((res) => {
        setPost({
          title: res.data.title,
          photo: res.data.photo,
          body: res.data.body,
          createdAt:res.data.createdAt,
        });
      })
      .catch((err) => {
        console.log('Error from PostDetails');
      });
  }, [id]);

  const path = "https://pulse.adaptable.app/images/" + post.photo;
  const date = new Date(post.createdAt)
  return(
    <div>
      <div className="page-content">
        <Link to={`/blog`} className="button">
          Back
        </Link>
        <h1 className="page-title">{post.title}</h1>
        <img src={path} className="header-image"></img>
        <p className="date">{date.toDateString()}</p>
        <p className='content'>{parse(post.body)}</p>
      </div>
    </div>
  );
};

export default PostDetails;