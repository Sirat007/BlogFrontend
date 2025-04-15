import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, useNavigate } from "react-router";

import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import moment from "moment";
import Toast from "../../plugin/Toast";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const userId = useUserData()?.user_id;
  const navigate=useNavigate()

  const fetchPosts = async () => {
    const post_res = await apiInstance.get(
      `author/dashboard/post-list/${userId}/`
    );
    setPosts(post_res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (query === "") {
      fetchPosts();
    } else {
      const filtered = posts.filter((p) => {
        return p.title.toLowerCase().includes(query);
      });
      setPosts(filtered);
    }
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    let sortedPosts = [...posts]; 
    console.log(sortValue);
    if (sortValue === "Newest") {
      sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortValue === "Oldest") {
      sortedPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (
      sortValue === "Active" ||
      sortValue === "Draft" ||
      sortValue === "Disabled"
    ) {
      sortedPosts = posts.filter((post) => post.status === sortValue);
    } else if (sortValue === "") {
      fetchPosts();
    }

    console.log(sortedPosts);

    setPosts(sortedPosts);
  };

  const handleDeletePost = async (postId) => {
    try {
      
      if (!window.confirm("Are you sure you want to delete this post?")) {
        return;
      }
      
      
      const response = await apiInstance.delete(`dashboard/posts/${userId}/${postId}/delete/`);
      
      
      if (response.status === 200) {
        Toast("success", "Post Deleted", response.data.message);
        
        
        setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        navigate("/")
      }
    } catch (error) {
     
      if (error.response) {
       
        Toast("error", "Delete Failed", error.response.data.error || "Failed to delete post");
      } else if (error.request) {
        
        Toast("error", "Network Error", "No response received from server");
      } else {
        
        Toast("error", "Error", error.message);
      }
      console.error("Error deleting post:", error);
    }
  };



  return (
    <>
      <Header />
      <section className="py-4" style={{height:'65vh'}}>
        <div className="container">
          <div className="row g-4">
            <div className="col-12">
              <div className="card border bg-transparent rounded-3">
                <div className="card-header bg-transparent border-bottom p-3">
                  <div className="d-sm-flex justify-content-between align-items-center">
                    <h5 className="mb-2 mb-sm-0">
                      All Blog Posts{" "}
                      <span className="badge bg-primary bg-opacity-10 text-primary">
                        {posts?.length}
                      </span>
                    </h5>
                    <Link
                      to="/add-post/"
                      className="btn btn-sm btn-primary mb-0"
                    >
                      Add New <i className="fas fa-plus"></i>
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row g-3 align-items-center justify-content-between mb-3">
                    <div className="col-md-8">
                      <form className="rounded position-relative">
                        <input
                          onChange={(e) => handleSearch(e)}
                          className="form-control pe-5 bg-transparent"
                          type="search"
                          placeholder="Search Posts"
                          aria-label="Search"
                        />
                        <button
                          className="btn bg-transparent border-0 px-2 py-0 position-absolute top-50 end-0 translate-middle-y"
                          type="submit"
                        >
                          <i className="fas fa-search fs-6 " />
                        </button>
                      </form>
                    </div>
                    <div className="col-md-3">
                      <form>
                        <select
                          onChange={handleSortChange}
                          className="form-select z-index-9 bg-transparent"
                          aria-label=".form-select-sm"
                        >
                          <option value="">Sort by</option>
                          <option value={"Newest"}>Newest</option>
                          <option value={"Oldest"}>Oldest</option>
                        </select>
                      </form>
                    </div>
                  </div>
                 
                  <div className="table-responsive border-0">
                    <table className="table align-middle p-4 mb-0 table-hover table-shrink">
                      
                      <thead className="table-dark">
                        <tr>
                          <th scope="col" className="border-0 rounded-start">
                            Image
                          </th>
                          <th scope="col" className="border-0 rounded-start">
                            Post Name
                          </th>
                          <th scope="col" className="border-0">
                            Views
                          </th>
                          <th scope="col" className="border-0">
                            Published Date
                          </th>
                          <th scope="col" className="border-0">
                            Category
                          </th>
                          <th scope="col" className="border-0">
                            Status
                          </th>
                          <th scope="col" className="border-0 rounded-end">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="border-top-0">
                        {posts?.map((p, index) => (
                          <tr>
                            <td>
                              <Link to={`/${p.slug}/`}>
                                <img
                                  src={p.image}
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    borderRadius: "10px",
                                  }}
                                  alt=""
                                />
                              </Link>
                            </td>
                            <td>
                              <h6 className="mt-2 mt-md-0 mb-0 ">
                                <Link
                                  to={`/${p.slug}/`}
                                  className="text-dark text-decoration-none"
                                >
                                  {p?.title}
                                </Link>
                              </h6>
                            </td>
                            <td>
                              <h6 className="mb-0">
                                <a
                                  href="#"
                                  className="text-dark text-decoration-none"
                                >
                                  {p.view} Views
                                </a>
                              </h6>
                            </td>
                            <td>{moment(p.date).format("DD MMM, YYYY")}</td>
                            <td>{p.category?.title}</td>
                            <td>
                              <span className="badge bg-dark bg-opacity-10 text-dark mb-2">
                                {p.status}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex gap-2">
                                <Link
                                  to={`/edit-post/${p.id}/`}
                                  className="btn btn-primary btn-round mb-0"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Edit"
                                >
                                  <i className="bi bi-pencil-square" />
                                </Link>
                                
                                <Link
                                  to="#"
                                  className="btn-round mb-0 btn btn-danger"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Delete"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDeletePost(p.id);
                                  }}
                                >
                                  <i className="bi bi-trash" />
                                </Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     
    </>
  );
}

export default Posts;
