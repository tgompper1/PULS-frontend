import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../../styles/blog.css';

const PostCard = (props) => {
  const post = props.post;
  const date = new Date(post.createdAt); 
  const path = "https://pulse.adaptable.app/images/" + post.photo
  return(
    <Link to={`/post/${post._id}`} className="post">
      <div>
        <img src={path} className="blog-image"></img>
      </div>
      <div className="post-text">
        <h3 className="post-title">{post.title}</h3>
        <p className="date">{date.toDateString()}</p>
        <p>{post.summary}</p>
      </div>
    </Link>
  );
};

export default PostCard;