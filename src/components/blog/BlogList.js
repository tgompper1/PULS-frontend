import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import PostCard from './PostCard';
import SpotlightPostCard from './SpotlightPostCard';
import '../twelve_column_grid.css'
import '../../styles/blog.css';

function BlogList(){
  const [posts, setPosts] = useState([]);
  const [spotlightPost, setSpotlightPost] = useState([]);

  const URL = "https://pulse.adaptable.app/"

  // get spotlight post id
  useEffect(()=>{
    axios.get(URL+'api/settings/spotlight')
    .then((res) =>{
      localStorage.setItem("spotlightPostID", JSON.stringify(res.data.spotlightID));
    })
    .catch(() =>{
      localStorage.setItem("spotlightPostID", JSON.stringify([]));
      console.log('No spotlight id');
    });
  });

  // get posts
  useEffect(()=>{
    axios
      .get(URL+'api/posts')
      .then((res) => {
        setPosts(res.data.filter((post) => {
          return String(post._id) !== JSON.parse(localStorage.getItem("spotlightPostID"));
        }));
      })
      .catch((err) => {
        console.log('Error from BlogList');
      });
  }, []);

  // get spotlight post by id
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("spotlightPostID")).length !== 0) {
      axios
      .get(`https://pulse.adaptable.app/api/posts/${JSON.parse(localStorage.getItem("spotlightPostID"))}`)
        .then((res) => {
          setSpotlightPost({
            _id: JSON.parse(localStorage.getItem("spotlightPostID")),
            title: res.data.title,
            photo: res.data.photo,
            body: res.data.body,
            summary: res.data.summary,
            createdAt:res.data.createdAt,
          });
        })
        .catch((err) => {
          console.log('Error from BlogList');
        });
    }
  });

  const blogList = 
    posts.length === 0
      ? ''
      : posts.map((post, k) => <PostCard post={post} key={k} />);

  
  const post = 
    JSON.parse(localStorage.getItem("spotlightPostID")) !== null && JSON.parse(localStorage.getItem("spotlightPostID")).length === 0
    ? ""
    : <SpotlightPostCard post={spotlightPost} key={JSON.parse(localStorage.getItem("spotlightPostID"))}/>;
  
  return (
    <div>
      <h1>Blog</h1>
      {post}
      {blogList}
    </div>
  );
}

export default BlogList;