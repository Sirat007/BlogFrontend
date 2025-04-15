
// import { useState, useEffect } from "react";
// import Header from "../partials/Header";
// import Footer from "../partials/Footer";
// import { useLocation, Link, NavLink } from "react-router";
// import moment from "moment";
// import apiInstance from "../../utils/axios";

// import useUserData from "../../plugin/useUserData";
// import Toast from "../../plugin/Toast";

// function Search() {
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const userData = useUserData();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const query = searchParams.get('q') || '';
//   const searchPosts = async () => {
//     if (!query.trim()) return;
    
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const response = await apiInstance.get(`post/search/?query=${encodeURIComponent(query)}`);
//       console.log(response,"Search result")
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error("Error searching posts:", error);
//       setError("Failed to search posts. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
   
    
//     searchPosts();
//   }, [query]);

  

//   console.log(userData,"user")

  
//   const handleLikePost = async (postId) => {
//       if (!userData?.user_id) {
//         Toast("error", "Please login to like posts", "");
//         return;
//       }
  
//       try {
//         const jsonData = {
//           user_id: userData.user_id,
//           post_id: postId,
//         };
//         const response = await apiInstance.post(`post/like-post/`, jsonData);
//         Toast("success", response.data.message, "");
//         fetchPosts && fetchPosts(); 
//       } catch (error) {
//         console.error("Error liking post:", error);
//         Toast("error", "Failed to like post", "");
//       }
//     };
  
//     const handleBookmarkPost = async (postId) => {
//       if (!userData?.user_id) {
//         Toast("error", "Please login to bookmark posts", "");
//         return;
//       }
  
//       try {
//         const jsonData = {
//           user_id: userData.user_id,
//           post_id: postId,
//         };
//         const response = await apiInstance.post(`post/bookmark-post/`, jsonData);
//         Toast("success", response.data.message, "");
//         fetchPosts && fetchPosts(); 
//       } catch (error) {
//         console.error("Error bookmarking post:", error);
//         Toast("error", "Failed to bookmark post", "");
//       }
//     };    
  
//   return (
//     <div>
//       <Header />
      
//       <section className="py-4">
//         <div className="container">
//           <div className="row mb-4">
//             <div className="col-12">
//               <h2 className="fw-bold">Search Results for: "{query}"</h2>
//               <p className="text-muted">{searchResults.length} articles found</p>
//             </div>
//           </div>
          
//           {isLoading ? (
//             <div className="d-flex justify-content-center">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </div>
//           ) : error ? (
//             <div className="alert alert-danger">{error}</div>
//           ) : searchResults.length > 0 ? (
//             <div className="row">
//               {searchResults.map((p, index) => (
//                 <div className="col-sm-6 col-lg-3" key={index}>
//                 <div className="card mb-4">
//                   <div className="card-fold position-relative">
//                     <Link
//                       to={`/${p.slug}`}
//                       className="btn-link text-reset stretched-link fw-bold text-decoration-none"
//                     >
                     
//                       <img
//                         className="card-img"
//                         style={{
//                           width: "100%",
//                           height: "160px",
//                           objectFit: "cover",
//                         }}
//                         src={p.image}
//                         alt={p.title}
//                       />
            
//                     </Link>
//                   </div>
//                   <div className="card-body px-3 pt-3">
//                      <NavLink style={{ textDecoration: 'none', color:"black" }} to={`/${p.slug}`}> 
//                         <h5 >
//                         {p.title?.slice(0, 32) + "..."}
//                         </h5>
//                       </NavLink>
                     
                    
//                     <button
//                       type="button"
//                       onClick={() => handleBookmarkPost(p.id)}
//                       style={{ border: "none", background: "none" }}
//                     >
//                       <i className="fas fa-bookmark text-danger"></i>
//                     </button>
//                     <button
//                       onClick={() => handleLikePost(p.id)}
//                       style={{ border: "none", background: "none" }}
//                     >
//                       <i className={`fas fa-thumbs-up  ${p?.likes?.some(user => user.id === userData?.user_id) ?"text-primary":""}`}></i>
//                     </button>{" "}
//                     {p.likes?.length}
//                     <ul
//                       className="mt-3 list-style-none"
//                       style={{ listStyle: "none" }}
//                     >
//                       <li>
//                         <p  className="text-dark text-decoration-none">
//                           <i className="fas fa-user"></i> {p.profile?.full_name}
//                         </p>
//                       </li>
//                       <li className="mt-2">
//                         <i className="fas fa-calendar"></i>{" "}
//                         {moment(p.date).format("DD MMM, YYYY")}
//                       </li>
//                       <li className="mt-2">
//                         <i className="fas fa-eye"></i> {p.view} Views
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
                
//               ))}
//             </div>
//           ) : query ? (
//             <div className="alert alert-info">
//               No articles found matching your search.
//             </div>
//           ) : (
//             <div className="alert alert-info">
//               Please enter a search term to find articles.
//             </div>
//           )}
//         </div>
//       </section>
      
//       <Footer />
//     </div>
//   );
// }

// export default Search;

import { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useLocation, Link, NavLink } from "react-router";
import moment from "moment";
import apiInstance, { root_url } from "../../utils/axios";

import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const userData = useUserData();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  
  const searchPosts = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiInstance.get(`post/search/?query=${encodeURIComponent(query)}`);
      console.log(response,"Search result")
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching posts:", error);
      setError("Failed to search posts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Define fetchPosts to refresh search results
  const fetchPosts = async () => {
    if (query.trim()) {
      try {
        const response = await apiInstance.get(`post/search/?query=${encodeURIComponent(query)}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error refreshing search results:", error);
      }
    }
  };
  
  useEffect(() => {
    searchPosts();
  }, [query]);

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
        fetchPosts(); // Now fetchPosts is defined
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
        fetchPosts(); // Now fetchPosts is defined
      } catch (error) {
        console.error("Error bookmarking post:", error);
        Toast("error", "Failed to bookmark post", "");
      }
    };    
  
  return (
    <div>
      <Header />
      
      <section className="py-4">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="fw-bold">Search Results for: "{query}"</h2>
              <p className="text-muted">{searchResults.length} articles found</p>
            </div>
          </div>
          
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : searchResults.length > 0 ? (
            <div className="row">
              {searchResults.map((p, index) => (
                <div className="col-sm-6 col-lg-3" key={index}>
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
                        src={`${root_url}/${p.image}`}
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
                      <NavLink className='text-decoration-none text-dark' to={`${userData?.user_id === p?.profile?.id? "/profile": `/postowner/${p?.slug}`}`}>
                        <p  className="text-dark text-decoration-none">
                          <i className="fas fa-user"></i>{p.profile?.full_name}
                        </p>
                        </NavLink>
                        
                        
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
                
              ))}
            </div>
          ) : query ? (
            <div className="alert alert-info">
              No articles found matching your search.
            </div>
          ) : (
            <div className="alert alert-info">
              Please enter a search term to find articles.
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default Search;