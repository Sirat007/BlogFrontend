import moment from 'moment'
import React from 'react'
import { Link, NavLink } from 'react-router'
import apiInstance from '../utils/axios';
import Toast from '../plugin/Toast';
import useUserData from '../plugin/useUserData';

const PostCard = ({p, fetchPosts}) => {
  
  
    const userData = useUserData();

    console.log(userData,"user")

    
    const handleLikePost = async (postId) => {
        if (!userData?.user_id) {
          Toast("error", "Please login to like posts", "");
          return;
        }
    
        try {
          const jsonData = {
            user_id: userData.user_id,
            post_id: postId,
          };
          const response = await apiInstance.post(`post/like-post/`, jsonData);
          Toast("success", response.data.message, "");
          fetchPosts && fetchPosts(); 
        } catch (error) {
          console.error("Error liking post:", error);
          Toast("error", "Failed to like post", "");
        }
      };
    
      const handleBookmarkPost = async (postId) => {
        if (!userData?.user_id) {
          Toast("error", "Please login to bookmark posts", "");
          return;
        }
    
        try {
          const jsonData = {
            user_id: userData.user_id,
            post_id: postId,
          };
          const response = await apiInstance.post(`post/bookmark-post/`, jsonData);
          Toast("success", response.data.message, "");
          fetchPosts && fetchPosts(); 
        } catch (error) {
          console.error("Error bookmarking post:", error);
          Toast("error", "Failed to bookmark post", "");
        }
      };    
  return (
    <div className="col-sm-6 col-lg-3">
    <div className="card mb-4">
      <div className="card-fold position-relative">
        <Link
          to={`/${p.slug}`}
          className="btn-link text-reset stretched-link fw-bold text-decoration-none"
        >
         
          <img
            className="card-img"
            style={{
              width: "100%",
              height: "160px",
              objectFit: "cover",
            }}
            src={p.image}
            alt={p.title}
          />

        </Link>
      </div>
      <div className="card-body px-3 pt-3">
         <NavLink style={{ textDecoration: 'none', color:"black" }} to={`/${p.slug}`}> 
            <h5 >
            {p.title?.slice(0, 32) + "..."}
            </h5>
          </NavLink>
         
        
        <button
          type="button"
          onClick={() => handleBookmarkPost(p.id)}
          style={{ border: "none", background: "none" }}
        >
          <i className="fas fa-bookmark text-danger"></i>
        </button>
        <button
          onClick={() => handleLikePost(p.id)}
          style={{ border: "none", background: "none" }}
        >
          <i className={`fas fa-thumbs-up  ${p?.likes?.some(user => user.id === userData?.user_id) ?"text-primary":""}`}></i>
        </button>{" "}
        {p.likes?.length}
        <ul
          className="mt-3 list-style-none"
          style={{ listStyle: "none" }}
        >
          <li>
            <Link className='text-decoration-none text-dark' to={`${userData?.user_id === p?.profile?.id? "/profile": `/postowner/${p?.slug}`}`} >
            <p  className="text-dark text-decoration-none">
              <i className="fas fa-user"></i> {p.profile?.full_name}
            </p>
            </Link>
          </li>
          <li className="mt-2">
            <i className="fas fa-calendar"></i>{" "}
            {moment(p.date).format("DD MMM, YYYY")}
          </li>
          <li className="mt-2">
            <i className="fas fa-eye"></i> {p.view} Views
          </li>
        </ul>
      </div>
    </div>
  </div>
  )
}

export default PostCard
