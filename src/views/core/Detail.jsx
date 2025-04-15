// // import React, { useState, useEffect } from "react";
// // import Header from "../partials/Header";
// // import Footer from "../partials/Footer";

// // import apiInstance from "../../utils/axios";
// // import moment from "moment";
// // import Toast from "../../plugin/Toast";
// // import { Link,useParams } from "react-router";

// // function Detail() {
// //     const [post, setPost] = useState([]);
// //     const [tags, setTags] = useState([]);
// //     const [createComment, setCreateComment] = useState({ full_name: "", email: "", comment: "" });

// //     const param = useParams();

// //     const fetchPost = async () => {
// //         const response = await apiInstance.get(`post/detail/${param.slug}/`);
// //         setPost(response.data);

// //         const tagArray = response.data?.tags?.split(",");
// //         setTags(tagArray);
// //     };

// //     useEffect(() => {
// //         fetchPost();
// //     }, [param.slug]);

// //     const handleCreateCommentChange = (event) => {
// //         setCreateComment({
// //             ...createComment,
// //             [event.target.name]: event.target.value,
// //         });
// //     };

// //     const handleCreateCommentSubmit = async (e) => {
// //         e.preventDefault();

// //         console.log(post.id);
// //         console.log(createComment.full_name);
// //         console.log(createComment.email);
// //         console.log(createComment.comment);

// //         const jsonData = {
// //             post_id: post?.id,
// //             name: createComment.full_name,
// //             email: createComment.email,
// //             comment: createComment.comment,
// //         };

// //         const response = await apiInstance.post(`post/comment-post/`, jsonData);
// //         console.log(response);
// //         fetchPost();
// //         Toast("success", "Comment Posted.", "");
// //         setCreateComment({
// //             full_name: "",
// //             email: "",
// //             comment: "",
// //         });
// //     };

// //     return (
// //         <>
// //             <Header />
// //             <section className=" mt-5">
// //                 <div className="container">
// //                     <div className="row">
// //                         <div className="col-12">
// //                             <a href="#" className="badge bg-danger mb-2 text-decoration-none">
// //                                 <i className="small fw-bold " />
// //                                 {post.category?.title}
// //                             </a>
// //                             <h1 className="text-center">{post.title}</h1>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </section>

// //             <section className="pt-0">
// //                 <div className="container position-relative" data-sticky-container="">
// //                     <div className="row">
// //                         <div className="col-lg-2">
// //                             <div className="text-start text-lg-center mb-5" data-sticky="" data-margin-top={80} data-sticky-for={991}>
// //                                 <div className="position-relative">
// //                                     <div className="avatar avatar-xl">
// //                                         <img className="avatar-img" style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }} src={post.profile?.image} alt="avatar" />
// //                                     </div>
// //                                     <a href="#" className="h5 fw-bold text-dark text-decoration-none mt-2 mb-0 d-block">
// //                                         {post.profile?.full_name}
// //                                     </a>
// //                                     <p>{post.profile?.bio}</p>
// //                                 </div>

// //                                 <hr className="d-none d-lg-block " />

// //                                 <ul className="list-inline list-unstyled">
// //                                     <li className="list-inline-item d-lg-block my-lg-2 text-start">
// //                                         <i className="fas fa-calendar"></i> {moment(post.date).format("DD MMM, YYYY")}
// //                                     </li>
// //                                     <li className="list-inline-item d-lg-block my-lg-2 text-start">
// //                                         <i className="fas fa-clock"></i> 5 min read
// //                                     </li>
// //                                     <li className="list-inline-item d-lg-block my-lg-2 text-start">
// //                                         <a href="#" className="text-body">
// //                                             <i className="fas fa-heart me-1" />
// //                                         </a>
// //                                         {post.likes?.length} Likes
// //                                     </li>
// //                                     <li className="list-inline-item d-lg-block my-lg-2 text-start">
// //                                         <i className="fas fa-eye me-1" />
// //                                         {post.view} Views
// //                                     </li>
// //                                 </ul>
// //                                 {/* Tags */}
// //                                 <ul className="list-inline text-primary-hover mt-0 mt-lg-3 text-start">
// //                                     {tags?.map((t, index) => (
// //                                         <li className="list-inline-item">
// //                                             <a className="text-body text-decoration-none fw-bold" href="#">
// //                                                 #{t}
// //                                             </a>
// //                                         </li>
// //                                     ))}
// //                                 </ul>
// //                             </div>
// //                         </div>
// //                         {/* Left sidebar END */}
// //                         {/* Main Content START */}
// //                         <div className="col-lg-10 mb-5">
// //                             <p dangerouslySetInnerHTML={{ __html: post.description }}></p>

// //                             {/* <div className="mt-5">
// //                                 <h2 className="my-3">
// //                                     <i className="bi bi-symmetry-vertical me-2" />
// //                                     Related post
// //                                 </h2>
// //                                 <section className="pt-4 pb-0">
// //                                     <div className="container">
// //                                         <div className="row">
// //                                             <div className="col-sm-6 col-lg-3">
// //                                                 <div className="card mb-4">
// //                                                     <div className="card-fold position-relative">
// //                                                         <img className="card-img" style={{ width: "100%", height: "160px", objectFit: "cover" }} src="https://awcdn1.ahmad.works/writing/wp-content/uploads/2015/05/kitchen-and-dining-room-P5JHHM6.jpg" alt="Card image" />
// //                                                     </div>
// //                                                     <div className="card-body px-3 pt-3">
// //                                                         <h4 className="card-title">
// //                                                             <Link to={`/7-common-mistakes-everyone-makes-while-travelling/`} className="btn-link text-reset stretched-link fw-bold text-decoration-none">
// //                                                                 7 common mistakes everyone makes while traveling
// //                                                             </Link>
// //                                                         </h4>
// //                                                     </div>
// //                                                 </div>
// //                                             </div>

// //                                             <div className="col-sm-6 col-lg-3">
// //                                                 <div className="card mb-4">
// //                                                     <div className="card-fold position-relative">
// //                                                         <img className="card-img" style={{ width: "100%", height: "160px", objectFit: "cover" }} src="https://awcdn1.ahmad.works/writing/wp-content/uploads/2015/05/black-woman-smiling-with-hands-in-hair-PMCFL93-1.jpg" alt="Card image" />
// //                                                     </div>
// //                                                     <div className="card-body px-3 pt-3">
// //                                                         <h4 className="card-title">
// //                                                             <a href="post-single.html" className="btn-link text-reset stretched-link fw-bold text-decoration-none">
// //                                                                 7 common mistakes everyone makes while traveling
// //                                                             </a>
// //                                                         </h4>
// //                                                     </div>
// //                                                 </div>
// //                                             </div>

// //                                             <div className="col-sm-6 col-lg-3">
// //                                                 <div className="card mb-4">
// //                                                     <div className="card-fold position-relative">
// //                                                         <img className="card-img" style={{ width: "100%", height: "160px", objectFit: "cover" }} src="https://awcdn1.ahmad.works/writing/wp-content/uploads/2015/05/flat-with-touch-of-creativity-PX387LV-2.jpg" alt="Card image" />
// //                                                     </div>
// //                                                     <div className="card-body px-3 pt-3">
// //                                                         <h4 className="card-title">
// //                                                             <a href="post-single.html" className="btn-link text-reset stretched-link fw-bold text-decoration-none">
// //                                                                 7 common mistakes everyone makes while traveling
// //                                                             </a>
// //                                                         </h4>
// //                                                     </div>
// //                                                 </div>
// //                                             </div>

// //                                             <div className="col-sm-6 col-lg-3">
// //                                                 <div className="card mb-4">
// //                                                     <div className="card-fold position-relative">
// //                                                         <img className="card-img" style={{ width: "100%", height: "160px", objectFit: "cover" }} src="https://awcdn1.ahmad.works/writing/wp-content/uploads/2015/05/young-handsome-afro-black-man-going-upstairs-from-PJWPWPR-2.jpg" alt="Card image" />
// //                                                     </div>
// //                                                     <div className="card-body px-3 pt-3">
// //                                                         <h4 className="card-title">
// //                                                             <a href="post-single.html" className="btn-link text-reset stretched-link fw-bold text-decoration-none">
// //                                                                 7 common mistakes everyone makes while traveling
// //                                                             </a>
// //                                                         </h4>
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                         </div>
// //                                     </div>
// //                                 </section>
// //                             </div> */}

// //                             <hr />
// //                             <div className="d-flex py-4">
// //                                 <a href="#">
// //                                     <div className="avatar avatar-xxl me-4">
// //                                         <img className="avatar-img rounded-circle" src={post.profile?.image} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }} alt="avatar" />
// //                                     </div>
// //                                 </a>
// //                                 <div>
// //                                     <div className="d-sm-flex align-items-center justify-content-between">
// //                                         <div>
// //                                             <h4 className="m-0">
// //                                                 <a href="#" className="text-dark text-decoration-none">
// //                                                     {post.profile?.full_name}
// //                                                 </a>
// //                                             </h4>
// //                                             <small>{post.profile?.bio}</small>
// //                                         </div>
// //                                     </div>
// //                                     <p className="my-2">{post.profile?.about}</p>
// //                                     {/* Social icons */}
// //                                     <ul className="nav">
// //                                         {post.profile?.facebook !== null && (
// //                                             <li className="nav-item">
// //                                                 <a className="nav-link ps-0 pe-2 fs-5" target="_blank" href={post.facebook}>
// //                                                     <i className="fab fa-facebook-square" />
// //                                                 </a>
// //                                             </li>
// //                                         )}
// //                                         {post.profile?.twitter !== null && (
// //                                             <a className="nav-link px-2 fs-5" target="_blank" href={post.twitter}>
// //                                                 <li className="nav-item">
// //                                                     <i className="fab fa-twitter-square" />
// //                                                 </li>
// //                                             </a>
// //                                         )}
// //                                     </ul>
// //                                 </div>
// //                             </div>

// //                             <div>
// //                                 <h3>{post.comments?.length} comments</h3>
// //                                 {post.comments?.map((c, index) => (
// //                                     <div className="my-4 d-flex bg-light p-3 mb-3 rounded">
// //                                         <img
// //                                             className="avatar avatar-md rounded-circle float-start me-3"
// //                                             src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
// //                                             style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "50%" }}
// //                                             alt="avatar"
// //                                         />
// //                                         <div>
// //                                             <div className="mb-2">
// //                                                 <h5 className="m-0">{c.name}</h5>
// //                                                 <span className="me-3 small">{moment(c.date).format("DD MMM, YYYY")}</span>
// //                                             </div>
// //                                             <p className="fw-bold">{c.comment}</p>
// //                                             {c.reply !== null && <p className="">Reply: {c.reply}</p>}
// //                                         </div>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                             {/* Comments END */}
// //                             {/* Reply START */}
// //                             <div className="bg-light p-3 rounded">
// //                                 <h3 className="fw-bold">Leave a reply</h3>
// //                                 <small>Your email address will not be published. Required fields are marked *</small>
// //                                 <form className="row g-3 mt-2" onSubmit={handleCreateCommentSubmit}>
// //                                     <div className="col-md-6">
// //                                         <label className="form-label">Name *</label>
// //                                         <input onChange={handleCreateCommentChange} name="full_name" value={createComment.full_name} type="text" className="form-control" aria-label="First name" />
// //                                     </div>
// //                                     <div className="col-md-6">
// //                                         <label className="form-label">Email *</label>
// //                                         <input onChange={handleCreateCommentChange} name="email" value={createComment.email} type="email" className="form-control" />
// //                                     </div>
// //                                     <div className="col-12">
// //                                         <label className="form-label">Write Comment *</label>
// //                                         <textarea onChange={handleCreateCommentChange} name="comment" value={createComment.comment} className="form-control" rows={4} />
// //                                     </div>
// //                                     <div className="col-12">
// //                                         <button type="submit" className="btn btn-primary">
// //                                             Post comment <i className="fas fa-paper-plane"></i>
// //                                         </button>
// //                                     </div>
// //                                 </form>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </section>
// //             <Footer />
// //         </>
// //     );
// // }

// // export default Detail;

// import React, { useState, useEffect } from "react";
// import Header from "../partials/Header";
// import Footer from "../partials/Footer";

// import apiInstance from "../../utils/axios";
// import moment from "moment";
// import Toast from "../../plugin/Toast";
// import { Link, useParams } from "react-router"; // Fixed import from 'react-router' to 'react-router-dom'

// function Detail() {
//     const [post, setPost] = useState({});  // Initialize as empty object, not array
//     const [tags, setTags] = useState([]);
//     const [createComment, setCreateComment] = useState({ full_name: "", email: "", comment: "" });

//     const params = useParams();  // Changed variable name to params for clarity

//     const fetchPost = async () => {
//         try {
            
//             const response = await apiInstance.get(`post/detail/${params.slug}/`);
//             setPost(response.data);
    
//             if (response.data?.tags) {
//                 const tagArray = response.data.tags.split(",");
//                 setTags(tagArray);
//             }
//         } catch (error) {
//             console.error("Error fetching post:", error);
//             Toast("error", "Failed to load post details", "");
//         }
//     };

//     useEffect(() => {
//         if (params.slug) {
//             fetchPost();
//         }
//     }, [params.slug]);

//     const handleCreateCommentChange = (event) => {
//         setCreateComment({
//             ...createComment,
//             [event.target.name]: event.target.value,
//         });
//     };

//     const handleCreateCommentSubmit = async (e) => {
//         e.preventDefault();

//         if (!post.id || !createComment.full_name || !createComment.email || !createComment.comment) {
//             Toast("error", "Please fill in all required fields", "");
//             return;
//         }

//         const jsonData = {
//             post_id: post.id,
//             name: createComment.full_name,
//             email: createComment.email,
//             comment: createComment.comment,
//         };

//         try {
//             const response = await apiInstance.post(`api/post/comment-post/`, jsonData);
//             fetchPost();
//             Toast("success", "Comment Posted.", "");
//             setCreateComment({
//                 full_name: "",
//                 email: "",
//                 comment: "",
//             });
//         } catch (error) {
//             console.error("Error posting comment:", error);
//             Toast("error", "Failed to post comment", "");
//         }
//     };

//     // Add safety checks for profile data
//     const renderProfile = () => {
//         if (!post.profile) return null;
        
//         return (
//             <div className="text-start text-lg-center mb-5" data-sticky="" data-margin-top={80} data-sticky-for={991}>
//                 <div className="position-relative">
//                     <div className="avatar avatar-xl">
//                         <img 
//                             className="avatar-img" 
//                             style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }} 
//                             src={post.profile.image} 
//                             alt="avatar" 
//                         />
//                     </div>
//                     <a href="#" className="h5 fw-bold text-dark text-decoration-none mt-2 mb-0 d-block">
//                         {post.profile.full_name}
//                     </a>
//                     <p>{post.profile.bio}</p>
//                 </div>
//                 {/* Rest of profile code... */}
//             </div>
//         );
//     };

//     return (
//         <>
//             <Header />
//             <section className="mt-5">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-12">
//                             {post.category && (
//                                 <a href="#" className="badge bg-danger mb-2 text-decoration-none">
//                                     <i className="small fw-bold" />
//                                     {post.category.title}
//                                 </a>
//                             )}
//                             <h1 className="text-center">{post.title}</h1>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <section className="pt-0">
//                 <div className="container position-relative" data-sticky-container="">
//                     <div className="row">
//                         <div className="col-lg-2">
//                             {renderProfile()}
//                         </div>
                        
//                         {/* Main Content START */}
//                         <div className="col-lg-10 mb-5">
//                             {post.description && (
//                                 <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
//                             )}

//                             <hr />
                            
//                             {/* Rest of code remains the same, with added null checks where needed */}
                            
//                             {/* Comments section */}
//                             <div>
//                                 <h3>{post.comments?.length || 0} comments</h3>
//                                 {post.comments?.map((c, index) => (
//                                     <div key={index} className="my-4 d-flex bg-light p-3 mb-3 rounded">
//                                         <img
//                                             className="avatar avatar-md rounded-circle float-start me-3"
//                                             src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
//                                             style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "50%" }}
//                                             alt="avatar"
//                                         />
//                                         <div>
//                                             <div className="mb-2">
//                                                 <h5 className="m-0">{c.name}</h5>
//                                                 <span className="me-3 small">{moment(c.date).format("DD MMM, YYYY")}</span>
//                                             </div>
//                                             <p className="fw-bold">{c.comment}</p>
//                                             {c.reply !== null && <p className="">Reply: {c.reply}</p>}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
                            
//                             {/* Reply form */}
//                             <div className="bg-light p-3 rounded">
//                                 <h3 className="fw-bold">Leave a reply</h3>
//                                 <small>Your email address will not be published. Required fields are marked *</small>
//                                 <form className="row g-3 mt-2" onSubmit={handleCreateCommentSubmit}>
//                                     <div className="col-md-6">
//                                         <label className="form-label">Name *</label>
//                                         <input onChange={handleCreateCommentChange} name="full_name" value={createComment.full_name} type="text" className="form-control" aria-label="First name" />
//                                     </div>
//                                     <div className="col-md-6">
//                                         <label className="form-label">Email *</label>
//                                         <input onChange={handleCreateCommentChange} name="email" value={createComment.email} type="email" className="form-control" />
//                                     </div>
//                                     <div className="col-12">
//                                         <label className="form-label">Write Comment *</label>
//                                         <textarea onChange={handleCreateCommentChange} name="comment" value={createComment.comment} className="form-control" rows={4} />
//                                     </div>
//                                     <div className="col-12">
//                                         <button type="submit" className="btn btn-primary">
//                                             Post comment <i className="fas fa-paper-plane"></i>
//                                         </button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             <Footer />
//         </>
//     );
// }

// export default Detail;

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
    const [createComment, setCreateComment] = useState({ full_name: "", email: "", comment: "" });
    const [isLoading, setIsLoading] = useState(true);
    const userData = useUserData();
    const params = useParams();

    const fetchPost = async () => {
        try {
            setIsLoading(true);
            const response = await apiInstance.get(`post/detail/${params.slug}/`);
            setPost(response.data);
    
            if (response.data?.tags) {
                const tagArray = response.data.tags.split(",").filter(tag => tag.trim() !== "");
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

        if (!post.id || !createComment.full_name || !createComment.email || !createComment.comment) {
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
                                <Link to={`/category/${post.category.slug}`} className="badge bg-primary mb-2 text-decoration-none">
                                    {post.category.title}
                                </Link>
                            )}
                            <h1 className="display-4 fw-bold mb-4">{post.title}</h1>
                            
                            
                            <div className="d-flex align-items-center mb-4">
                                {post.profile?.image && (
                                    <Link className='text-decoration-none text-dark' to={`${userData?.user_id === post?.profile?.id? "/profile": `/postowner/${post?.slug}`}`}>
                                    <img 
                                        className="rounded-circle me-3"
                                        src={post.profile.image} 
                                        alt={post.profile?.full_name || "Author"}
                                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                    />
                                    </Link>
                                )}
                                <div>
                                    <Link className='text-decoration-none text-dark' to={`${userData?.user_id === post?.profile?.id? "/profile": `/postowner/${post?.slug}`}`}>
                                    <h6 className="mb-1">{post.profile?.full_name || "Anonymous"}</h6>
                                    </Link>
                                    <div className="d-flex text-muted small">
                                        <span><i className="fas fa-calendar-alt me-1"></i> {moment(post.date).format("MMM DD, YYYY")}</span>
                                        <span className="mx-2">•</span>
                                        <span><i className="fas fa-eye me-1"></i> {post.view || 0} views</span>
                                        <span className="mx-2">•</span>
                                        <span><i className="fas fa-heart me-1"></i> {post.likes?.length || 0} likes</span>
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
                            <div className="card border-0 shadow-sm sticky-top" style={{ top: "80px" }}>
                                <div className="card-body text-center">
                                    {post.profile?.image && (
                                        <Link className='text-decoration-none text-dark' to={`${userData?.user_id === post?.profile?.id? "/profile": `/postowner/${post?.slug}`}`}>
                                        <img 
                                            className="rounded-circle mb-3 shadow-sm"
                                            src={post.profile.image} 
                                            alt={post.profile?.full_name || "Author"}
                                            style={{ width: "120px", height: "120px", objectFit: "cover" }}
                                        />
                                        </Link>
                                    )}
                                    <Link className='text-decoration-none text-dark' to={`${userData?.user_id === post?.profile?.id? "/profile": `/postowner/${post?.slug}`}`}>
                                    <h5 className="mb-1">{post.profile?.full_name || "Anonymous"}</h5>
                                    </Link>
                                    
                                    
                                    <hr className="my-3" />
                                    
                                    <div className="d-flex justify-content-between mb-3">
                                        <div className="text-center">
                                            <i className="fas fa-calendar-alt text-primary mb-1"></i>
                                            <p className="small mb-0">{moment(post.date).format("MMM DD, YYYY")}</p>
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
                                    
                                    {/* Social Media Icons */}
                                    {/* {(post.profile?.facebook || post.profile?.twitter) && (
                                        <div className="mt-3">
                                            <h6 className="mb-2">Follow</h6>
                                            <div className="d-flex justify-content-center gap-2">
                                                {post.profile?.facebook && (
                                                    <a href={post.profile.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                                                        <i className="fab fa-facebook-f"></i>
                                                    </a>
                                                )}
                                                {post.profile?.twitter && (
                                                    <a href={post.profile.twitter} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-info">
                                                        <i className="fab fa-twitter"></i>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </div>
                        
                       
                        <div className="col-lg-9">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body p-4 p-lg-5">
                                    {post.description && (
                                        <div className="post-content" >
                                            <div style={{
                                            fontSize:"18px"
                                        }} dangerouslySetInnerHTML={{ __html: post.description }}></div>
                                        </div>
                                    )}
                                    
                                    <hr className="my-5" />
                                    
                                    
                                    <div className="bg-light p-4 rounded-3 mb-5">
                                        <div className="d-flex">
                                            {post.profile?.image && (
                                                <Link className='text-decoration-none text-dark' to={`${userData?.user_id === post?.profile?.id? "/profile": `/postowner/${post?.slug}`}`}>
                                                <img 
                                                    className="rounded-circle me-4"
                                                    src={post.profile.image} 
                                                    alt={post.profile?.full_name || "Author"}
                                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                                />
                                                </Link>
                                            )}
                                            <div>
                                            <Link className='text-decoration-none text-dark' to={`${userData?.user_id === post?.profile?.id? "/profile": `/postowner/${post?.slug}`}`}>
                                                <h4 className="mb-1 mt-4">{post.profile?.full_name || "Anonymous"}</h4>
                                             </Link>   
                                                {/* {post.profile?.bio && (
                                                    <p className="text-muted small mb-2">{post.profile.bio}</p>
                                                )} */}
                                                {/* {post.profile?.about && (
                                                    <p className="mb-3">{post.profile.about}</p>
                                                )} */}
                                                
                                                {/* Social Media
                                                {(post.profile?.facebook || post.profile?.twitter) && (
                                                    <div className="d-flex">
                                                        {post.profile?.facebook && (
                                                            <a href={post.profile.facebook} target="_blank" rel="noopener noreferrer" className="me-3 text-primary">
                                                                <i className="fab fa-facebook-square fa-lg"></i>
                                                            </a>
                                                        )}
                                                        {post.profile?.twitter && (
                                                            <a href={post.profile.twitter} target="_blank" rel="noopener noreferrer" className="me-3 text-info">
                                                                <i className="fab fa-twitter-square fa-lg"></i>
                                                            </a>
                                                        )}
                                                    </div>
                                                )} */}
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
                                                <div key={index} className="card border-0 shadow-sm mb-4">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <img
                                                                className="rounded-circle me-3"
                                                                src="https://as1.ftcdn.net/v2/jpg/03/53/11/00/1000_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg"
                                                                style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                                                alt="avatar"
                                                            />
                                                            <div>
                                                                <div className="d-flex align-items-center mb-2">
                                                                    <h5 className="card-title mb-0 me-3">{comment.name}</h5>
                                                                    <small className="text-muted">{moment(comment.date).format("MMM DD, YYYY")}</small>
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
                                            <p className="text-muted">No comments yet. Be the first to comment!</p>
                                        )}
                                    </div>
                                    
                                    {/* Comment Form */}
                                    <div className="card border-0 shadow-sm">
                                        <div className="card-body p-4">
                                            <h3 className="mb-2">Leave a Comment</h3>
                                            <p className="text-muted small mb-4">Your email address will not be published. Required fields are marked *</p>
                                            
                                            <form onSubmit={handleCreateCommentSubmit}>
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <label htmlFor="fullName" className="form-label">Name *</label>
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
                                                        <label htmlFor="email" className="form-label">Email *</label>
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
                                                        <label htmlFor="comment" className="form-label">Comment *</label>
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