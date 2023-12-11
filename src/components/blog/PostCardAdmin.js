import React from 'react';
import {Link, useParams} from 'react-router-dom';
import '../../styles/blog.css';

const PostCard = (props) => {
  const post = props.post;
  const date = new Date(post.createdAt)
  const path = "http://localhost:8001/images/" + post.photo

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