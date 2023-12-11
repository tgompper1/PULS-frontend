import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../../styles/blog.css';

const SpotlightPostCard = (props) => {
  const post = props.post;
  const date = new Date(post.createdAt); 
  const path = "http://localhost:8001/images/" + post.photo

  return(
    <div className="post-container">
      <Link to={`/post/${post._id}`} className="spotlight-post">
        <img src={path} className="header-image"></img>
        <div className="spotlight-text">
          <h2 className>{post.title}</h2>
          <p>{date.toDateString()}</p>
          <p>{post.summary}</p>
        </div>
      </Link>
    </div>
  );
};

export default SpotlightPostCard;