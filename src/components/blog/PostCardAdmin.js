import React from 'react';
import {Link, useParams} from 'react-router-dom';
import '../../styles/blog.css';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";


const PostCard = (props) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  //if the user writes an admin url this will check if they're logged in
  //if not they get redirected to the home page
  if(user === null)
  {
    navigate("/");
  }


  const post = props.post;
  const date = new Date(post.createdAt)
  const path = "https://pulse.adaptable.app/images/" + post.photo

  return(
    <div className="post-edit">
      <Link to={`/edit-post/${post._id}`}>
        <img src="images\edit-regular.svg" className="edit-button"></img>
      </Link>
      <div className="post">
        <div>
          <img src={path} className="blog-image"></img>
        </div>
        <div className="post-text">
          <h3 className="post-title">{post.title}</h3>
          <p className="date">{date.toDateString()}</p>
          <p>{post.summary}</p>
        </div>
      </div>
    </div>
  
  );
};

export default PostCard;