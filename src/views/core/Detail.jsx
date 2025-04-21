import React, { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";

import apiInstance from "../../utils/axios";
import moment from "moment";
import Toast from "../../plugin/Toast";
import { Link, useParams } from "react-router";
import useUserData from "../../plugin/useUserData";

function Detail() {
  const [post, setPost] = useState({});
  const [tags, setTags] = useState([]);
  const [createComment, setCreateComment] = useState({
    full_name: "",
    email: "",
    comment: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const userData = useUserData();
  const params = useParams();

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const response = await apiInstance.get(`post/detail/${params.slug}/`);
      setPost(response.data);

      if (response.data?.tags) {
        const tagArray = response.data.tags
          .split(",")
          .filter((tag) => tag.trim() !== "");
        setTags(tagArray);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      Toast("error", "Failed to load post details", "");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params.slug) {
      fetchPost();
    }
  }, [params.slug]);

  const handleCreateCommentChange = (event) => {
    setCreateComment({
      ...createComment,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateCommentSubmit = async (e) => {
    e.preventDefault();
    if (!userData?.user_id) {
      Toast("error", "Please login to comment posts", "");
      return;
    }

    if (
      !post.id ||
      !createComment.full_name ||
      !createComment.email ||
      !createComment.comment
    ) {
      Toast("error", "Please fill in all required fields", "");
      return;
    }

    const jsonData = {
      post_id: post.id,
      name: createComment.full_name,
      email: createComment.email,
      comment: createComment.comment,
    };

    try {
      await apiInstance.post(`post/comment-post/`, jsonData);
      fetchPost();
      Toast("success", "Comment Posted.", "");
      setCreateComment({
        full_name: "",
        email: "",
        comment: "",
      });
    } catch (error) {
      console.error("Error posting comment:", error);
      Toast("error", "Failed to post comment", "");
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="container my-5 py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading post...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12">
              {post.category && (
                <Link
                  to={`/category/${post.category.slug}`}
                  className="badge bg-primary mb-2 text-decoration-none"
                >
                  {post.category.title}
                </Link>
              )}
              <h1 className="display-4 fw-bold mb-4">{post.title}</h1>

              <div className="d-flex align-items-center mb-4">
                {post.profile?.image && (
                  <Link
                    className="text-decoration-none text-dark"
                    to={`${
                      userData?.user_id === post?.profile?.id
                        ? "/profile"
                        : `/postowner/${post?.slug}`
                    }`}
                  >
                    <img
                      className="rounded-circle me-3"
                      src={post.profile.image}
                      alt={post.profile?.full_name || "Author"}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </Link>
                )}
                <div>
                  <Link
                    className="text-decoration-none text-dark"
                    to={`${
                      userData?.user_id === post?.profile?.id
                        ? "/profile"
                        : `/postowner/${post?.slug}`
                    }`}
                  >
                    <h6 className="mb-1">
                      {post.profile?.full_name || "Anonymous"}
                    </h6>
                  </Link>
                  <div className="d-flex text-muted small">
                    <span>
                      <i className="fas fa-calendar-alt me-1"></i>{" "}
                      {moment(post.date).format("MMM DD, YYYY")}
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      <i className="fas fa-eye me-1"></i> {post.view || 0} views
                    </span>
                    <span className="mx-2">•</span>
                    <span>
                      <i className="fas fa-heart me-1"></i>{" "}
                      {post.likes?.length || 0} likes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {post.image && (
        <section className="pb-0">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="rounded overflow-hidden shadow">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="img-fluid w-100"
                    style={{ maxHeight: "500px", objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div
                className="card border-0 shadow-sm sticky-top"
                style={{ top: "80px" }}
              >
                <div className="card-body text-center">
                  {post.profile?.image && (
                    <Link
                      className="text-decoration-none text-dark"
                      to={`${
                        userData?.user_id === post?.profile?.id
                          ? "/profile"
                          : `/postowner/${post?.slug}`
                      }`}
                    >
                      <img
                        className="rounded-circle mb-3 shadow-sm"
                        src={post.profile.image}
                        alt={post.profile?.full_name || "Author"}
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  )}
                  <Link
                    className="text-decoration-none text-dark"
                    to={`${
                      userData?.user_id === post?.profile?.id
                        ? "/profile"
                        : `/postowner/${post?.slug}`
                    }`}
                  >
                    <h5 className="mb-1">
                      {post.profile?.full_name || "Anonymous"}
                    </h5>
                  </Link>

                  <hr className="my-3" />

                  <div className="d-flex justify-content-between mb-3">
                    <div className="text-center">
                      <i className="fas fa-calendar-alt text-primary mb-1"></i>
                      <p className="small mb-0">
                        {moment(post.date).format("MMM DD, YYYY")}
                      </p>
                    </div>
                    <div className="text-center">
                      <i className="fas fa-eye text-primary mb-1"></i>
                      <p className="small mb-0">{post.view || 0} views</p>
                    </div>
                    <div className="text-center">
                      <i className="fas fa-heart text-primary mb-1"></i>
                      <p className="small mb-0">{post.likes?.length || 0}</p>
                    </div>
                  </div>

                  {tags.length > 0 && (
                    <>
                      <div className="text-start mt-3">
                        <h6 className="mb-2">Tags</h6>
                        <div className="d-flex flex-wrap gap-2">
                          {tags.map((tag, index) => (
                            <Link
                              key={index}
                              to={`/tag/${tag.trim()}`}
                              className="badge bg-light text-dark text-decoration-none"
                            >
                              #{tag.trim()}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4 p-lg-5">
                  {post.description && (
                    <div className="post-content">
                      <div
                        style={{
                          fontSize: "18px",
                        }}
                        dangerouslySetInnerHTML={{ __html: post.description }}
                      ></div>
                    </div>
                  )}

                  <hr className="my-5" />

                  <div className="bg-light p-4 rounded-3 mb-5">
                    <div className="d-flex">
                      {post.profile?.image && (
                        <Link
                          className="text-decoration-none text-dark"
                          to={`${
                            userData?.user_id === post?.profile?.id
                              ? "/profile"
                              : `/postowner/${post?.slug}`
                          }`}
                        >
                          <img
                            className="rounded-circle me-4"
                            src={post.profile.image}
                            alt={post.profile?.full_name || "Author"}
                            style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </Link>
                      )}
                      <div>
                        <Link
                          className="text-decoration-none text-dark"
                          to={`${
                            userData?.user_id === post?.profile?.id
                              ? "/profile"
                              : `/postowner/${post?.slug}`
                          }`}
                        >
                          <h4 className="mb-1 mt-4">
                            {post.profile?.full_name || "Anonymous"}
                          </h4>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="mb-5">
                    <h3 className="mb-4">
                      <i className="far fa-comments me-2"></i>
                      {post.comments?.length || 0} Comments
                    </h3>

                    {post.comments && post.comments.length > 0 ? (
                      post.comments.map((comment, index) => (
                        <div
                          key={index}
                          className="card border-0 shadow-sm mb-4"
                        >
                          <div className="card-body p-4">
                            <div className="d-flex">
                              <img
                                className="rounded-circle me-3"
                                src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                                style={{
                                  width: "60px",
                                  height: "60px",
                                  objectFit: "cover",
                                }}
                                alt="avatar"
                              />
                              <div>
                                <div className="d-flex align-items-center mb-2">
                                  <h5 className="card-title mb-0 me-3">
                                    {comment.name}
                                  </h5>
                                  <small className="text-muted">
                                    {moment(comment.date).format(
                                      "MMM DD, YYYY"
                                    )}
                                  </small>
                                </div>
                                <p className="mb-1">{comment.comment}</p>

                                {comment.reply && (
                                  <div className="bg-light p-3 rounded mt-3">
                                    <h6 className="mb-2">Author Reply:</h6>
                                    <p className="mb-0">{comment.reply}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">
                        No comments yet. Be the first to comment!
                      </p>
                    )}
                  </div>

                  {/* Comment Form */}
                  <div className="card border-0 shadow-sm">
                    <div className="card-body p-4">
                      <h3 className="mb-2">Leave a Comment</h3>
                      <p className="text-muted small mb-4">
                        Your email address will not be published. Required
                        fields are marked *
                      </p>

                      <form onSubmit={handleCreateCommentSubmit}>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label htmlFor="fullName" className="form-label">
                              Name *
                            </label>
                            <input
                              type="text"
                              id="fullName"
                              className="form-control"
                              name="full_name"
                              value={createComment.full_name}
                              onChange={handleCreateCommentChange}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="email" className="form-label">
                              Email *
                            </label>
                            <input
                              type="email"
                              id="email"
                              className="form-control"
                              name="email"
                              value={createComment.email}
                              onChange={handleCreateCommentChange}
                              required
                            />
                          </div>
                          <div className="col-12">
                            <label htmlFor="comment" className="form-label">
                              Comment *
                            </label>
                            <textarea
                              className="form-control"
                              id="comment"
                              name="comment"
                              rows="5"
                              value={createComment.comment}
                              onChange={handleCreateCommentChange}
                              required
                            ></textarea>
                          </div>
                          <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                              <i className="fas fa-paper-plane me-2"></i>
                              Post Comment
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Detail;
