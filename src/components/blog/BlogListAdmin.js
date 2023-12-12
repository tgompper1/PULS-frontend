import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import PostCardAdmin from './PostCardAdmin';
import '../twelve_column_grid.css'
import '../../styles/blog.css';
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

function AdminBlogList(){
  const { user } = useAuthContext();
  const navigate = useNavigate();
  //if the user writes an admin url this will check if they're logged in
  //if not they get redirected to the home page
  if(user === null)
  {
    navigate("/");
    return ;
  }

  const [posts, setPosts] = useState([]);

  const URL= "https://pulse.adaptable.app/"
  // get posts
  useEffect(()=>{
    axios
      .get(URL+'api/posts')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log('Error from BlogListAdmin');
      });
  }, []);


  const blogList = 
    posts.length === 0
      ? ''
      : posts.map((post, k) => <PostCardAdmin post={post} key={k} />);

  
  return (
    <div>
      <h1>Blog</h1>
      
      <Link to="/create-post" className="button">
        Create
      </Link>

      {blogList}
    </div>
  );
}

export default AdminBlogList;