import { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link, NavLink } from "react-router";
import moment from "moment";

import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";
import PostCard from "../../components/PostCard";

function Home() {
  const [posts, setPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [category, setCategory] = useState([]);
  const userData = useUserData();

  const fetchPosts = async () => {
    try {
      const response = await apiInstance.get(`post/lists/`);

      setPosts(response.data);

      
      if (response.data && response.data.length > 0) {
        const sortedPopularPost = [...response.data]
          ?.filter((p) => p?.view >= 10)
          ?.sort((a, b) => b.view - a.view);
        setPopularPosts(sortedPopularPost);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await apiInstance.get(`post/category/list/`);
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategory();
  }, []);

  
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const postItems = posts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const popularItemsPerPage = 4;
  const [popularCurrentPage, setPopularCurrentPage] = useState(1);
  const popularIndexOfLastItem = popularCurrentPage * popularItemsPerPage;
  const popularIndexOfFirstItem = popularIndexOfLastItem - popularItemsPerPage;
  const popularPostItems = popularPosts.slice(
    popularIndexOfFirstItem,
    popularIndexOfLastItem
  );
  const popularTotalPages = Math.ceil(
    popularPosts.length / popularItemsPerPage
  );
  const popularPageNumbers = Array.from(
    { length: popularTotalPages },
    (_, index) => index + 1
  );

  return (
    <div>
      <Header />
      <section className="p-0">
        <div className="container">
          <div className="row">
            <div className="col">
              <a href="#" className="d-block card-img-flash">
                <img src="assets/images/adv-3.png" alt="" />
              </a>
              <h2 className="text-start d-block mt-1">Trending Articles 🔥</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-4 pb-0">
        <div className="container">
          <div className="row">
            {postItems?.map((p, index) => (
              <PostCard key={index} p={p} fetchPosts={fetchPosts} />
            ))}
          </div>
          <nav className="d-flex mt-5">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link me-1"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  <i className="ci-arrow-left me-2" />
                  Previous
                </button>
              </li>
            </ul>
            <ul className="pagination">
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    currentPage === number ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>

            <ul className="pagination">
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link ms-1"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                  <i className="ci-arrow-right ms-3" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="fw-bold">Featured Categories</h2>
                <Link to="/category/" className="text-decoration-none">
                  View all
                </Link>
              </div>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-4">
            {category?.slice(0, 5).map((c, index) => (
              <div className="col" key={index}>
                <Link
                  to={`/category/${c.slug}/`}
                  className="text-decoration-none"
                >
                  <div className="card h-100 shadow-sm border-0 overflow-hidden">
                    <div className="position-relative">
                      <img
                        className="card-img-top"
                        src={c.image}
                        style={{ height: "140px", objectFit: "cover" }}
                        alt={c.title}
                      />
                      <div className="position-absolute bottom-0 start-0 w-100 p-2 bg-gradient-dark">
                        <span className="badge bg-primary rounded-pill">
                          {c.post_count} Posts
                        </span>
                      </div>
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title mb-0 fw-semibold">{c.title}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="row mt-5">
            <div className="col-12 text-center">
              <Link
                to="/category/"
                className="btn btn-outline-primary px-4 py-2 rounded-pill"
              >
                Explore All Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="p-0">
        <div className="container">
          <div className="row">
            <div className="col">
              <a href="#" className="d-block card-img-flash">
                <img src="assets/images/adv-3.png" alt="" />
              </a>
              <h2 className="text-start d-block mt-1">Popular Articles 🕒</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-4 pb-0">
        <div className="container">
          <div className="row">
            {popularPostItems?.slice(0, 4).map((p, index) => (
              <PostCard key={index} p={p} fetchPosts={fetchPosts} />
            ))}
            {/* <div className="col-sm-6 col-lg-3" key={index}>
                <div className="card mb-4">
                  <div className="card-fold position-relative">
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
                  </div>
                  <div className="card-body px-3 pt-3">
                    <h4 className="card-title">
                      <Link
                        to={`${p.slug}`}
                        className="btn-link text-reset stretched-link fw-bold text-decoration-none"
                      >
                        {p.title?.slice(0, 32) + "..."}
                      </Link>
                    </h4>
                    <ul
                      className="mt-3 list-style-none"
                      style={{ listStyle: "none" }}
                    >
                      <li>
                        <a href="#" className="text-dark text-decoration-none">
                          <i className="fas fa-user"></i> {p.profile?.full_name}
                        </a>
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
              </div> */}
          </div>
         
          <nav className="d-flex mt-5">
            <ul className="pagination">
              <li
                className={`page-item ${
                  popularCurrentPage === 1 ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link me-1"
                  onClick={() => setPopularCurrentPage(popularCurrentPage - 1)}
                >
                  <i className="ci-arrow-left me-2" />
                  Previous
                </button>
              </li>
            </ul>
            <ul className="pagination">
              {popularPageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${
                    popularCurrentPage === number ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPopularCurrentPage(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>

            <ul className="pagination">
              <li
                className={`page-item ${
                  popularCurrentPage === popularTotalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link ms-1"
                  onClick={() => setPopularCurrentPage(popularCurrentPage + 1)}
                >
                  Next
                  <i className="ci-arrow-right ms-3" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
