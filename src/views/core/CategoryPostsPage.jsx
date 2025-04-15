// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router';
// // import apiInstance from '../../utils/axios';
// // const CategoryPostsPage = () => {
// //   const [posts, setPosts] = useState([]);
// //   const [category, setCategory] = useState({});
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const { categorySlug } = useParams();

// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       try {
// //         setLoading(true);
        
// //         // Fetch posts by category using your API endpoint
// //         const response = await apiInstance.get(`/post/category/posts/${categorySlug}/`);
        
// //         if (response.status !==200) {
// //           throw new Error(`Failed to fetch posts: ${response.status}`);
// //         }
        
        
// //         console.log(response)
// //         const data = await response?.data;
// //         setPosts(data);
        
       
        
// //         setLoading(false);
// //       } catch (err) {
// //         setError(err.message);
// //         setLoading(false);
// //       }
// //     };

// //     fetchPosts();
// //   }, [categorySlug]);

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 p-6">
// //         <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
// //           <h1 className="text-red-500 text-2xl font-bold mb-4">Error</h1>
// //           <p>{error}</p>
// //           <button 
// //             onClick={() => window.location.reload()} 
// //             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// //           >
// //             Try Again
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (posts.length === 0) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 p-6">
// //         <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
// //           <h1 className="text-2xl font-bold mb-4">
// //             {category.name || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}
// //           </h1>
// //           <p className="text-gray-600">No posts found in this category.</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <div className="max-w-4xl mx-auto">
// //         <header className="mb-8">
// //           <h1 className="text-3xl font-bold text-gray-800">
// //             {category.name || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}
// //           </h1>
// //           {category.description && (
// //             <p className="mt-2 text-gray-600">{category.description}</p>
// //           )}
// //           <p className="mt-2 text-sm text-gray-500">{posts.length} posts</p>
// //         </header>

// //         <div className="space-y-6">
// //           {posts.map((post) => (
// //             <article 
// //               key={post.id} 
// //               className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
// //             >
// //               {post.image && (
// //                 <div className="h-48 overflow-hidden">
// //                   <img 
// //                     src={post.image} 
// //                     alt={post.title} 
// //                     className="w-full h-full object-cover"
// //                   />
// //                 </div>
// //               )}
              
// //               <div className="p-6">
// //                 <h2 className="text-xl font-semibold text-gray-800 mb-2">
// //                   <a href={`/posts/${post.slug}`} className="hover:text-blue-600">
// //                     {post.title}
// //                   </a>
// //                 </h2>
                
// //                 <div className="flex items-center text-sm text-gray-500 mb-3">
// //                   <span>
// //                     Posted on {new Date(post.date).toLocaleDateString()}
// //                   </span>
// //                   <span className="mx-2">•</span>
// //                   <span>{post.view} views</span>
// //                 </div>
                
// //                 {post.description && (
// //                   <p className="text-gray-600 mb-4">
// //                     {post.description.length > 150
// //                       ? `${post.description.substring(0, 150)}...`
// //                       : post.description}
// //                   </p>
// //                 )}
                
// //                 {post.tags && (
// //                   <div className="mb-4">
// //                     {post.tags.split(',').map((tag, index) => (
// //                       <span 
// //                         key={index} 
// //                         className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded mr-2 mb-2"
// //                       >
// //                         {tag.trim()}
// //                       </span>
// //                     ))}
// //                   </div>
// //                 )}
                
// //                 <div className="flex justify-between items-center">
// //                   <a 
// //                     href={`/posts/${post.slug}`}
// //                     className="text-blue-600 hover:text-blue-800 font-medium"
// //                   >
// //                     Read more
// //                   </a>
                  
// //                   <div className="flex items-center space-x-2">
// //                     <span className="text-sm text-gray-500">
// //                       {post.likes ? post.likes.length : 0} likes
// //                     </span>
// //                     <span className="text-sm text-gray-500">
// //                       {post?.comments?.length} comments
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </article>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CategoryPostsPage;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router';
// import apiInstance from '../../utils/axios';
// import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const CategoryPostsPage = () => {
//   const [posts, setPosts] = useState([]);
//   const [category, setCategory] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { categorySlug } = useParams();

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch posts by category using your API endpoint
//         const response = await apiInstance.get(`/post/category/posts/${categorySlug}/`);
        
//         if (response.status !== 200) {
//           throw new Error(`Failed to fetch posts: ${response.status}`);
//         }
        
//         const data = await response?.data;
//         setPosts(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, [categorySlug]);

//   const categoryName = category.name || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

//   if (loading) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//         <Spinner animation="border" variant="primary" />
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="py-4">
//         <Alert variant="danger">
//           <Alert.Heading>Error Loading Posts</Alert.Heading>
//           <p>{error}</p>
//           <Button variant="outline-danger" onClick={() => window.location.reload()}>
//             Try Again
//           </Button>
//         </Alert>
//       </Container>
//     );
//   }

//   if (posts.length === 0) {
//     return (
//       <Container className="py-4">
//         <Alert variant="info">
//           <Alert.Heading>{categoryName}</Alert.Heading>
//           <p>No posts found in this category.</p>
//         </Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="py-4">
//       <header className="text-center mb-4">
//         <h1 className="fw-bold">{categoryName}</h1>
//         {category.description && (
//           <p className="text-muted">{category.description}</p>
//         )}
//         <Badge bg="primary" className="mt-2">
//           {posts.length} {posts.length === 1 ? 'post' : 'posts'}
//         </Badge>
//       </header>

//       <Row xs={1} md={2} lg={3} className="g-3">
//         {posts.map((post) => (
//           <Col key={post.id}>
//             <Card className="h-100 shadow-sm">
//               <div className="d-flex p-2">
//                 {post.image && (
//                   <div style={{ width: '40px', height: '40px', marginRight: '10px' }}>
//                     <Card.Img 
//                       src={post.image} 
//                       alt={post.title} 
//                       style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}
//                     />
//                   </div>
//                 )}
//                 <div>
//                   <Card.Title as="h6" className="mb-1">
//                     <a 
//                       href={`/posts/${post.slug}`} 
//                       className="text-decoration-none text-dark"
//                       style={{ fontSize: '0.9rem' }}
//                     >
//                       {post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title}
//                     </a>
//                   </Card.Title>
//                   <div className="d-flex small text-muted" style={{ fontSize: '0.7rem' }}>
//                     <span>{new Date(post.date).toLocaleDateString()}</span>
//                     <span className="mx-1">•</span>
//                     <span>{post.view} views</span>
//                   </div>
//                 </div>
//               </div>
              
//               <Card.Body className="p-2 pt-0">
//                 {post.description && (
//                   <Card.Text className="small text-secondary mb-2" style={{ fontSize: '0.8rem' }}>
//                     {post.description.length > 80 
//                       ? post.description.substring(0, 80) + '...' 
//                       : post.description}
//                   </Card.Text>
//                 )}
                
//                 {post.tags && (
//                   <div className="mb-2">
//                     {post.tags.split(',').slice(0, 2).map((tag, index) => (
//                       <Badge 
//                         key={index} 
//                         bg="light" 
//                         text="dark" 
//                         className="me-1"
//                         style={{ fontSize: '0.7rem' }}
//                       >
//                         {tag.trim()}
//                       </Badge>
//                     ))}
//                     {post.tags.split(',').length > 2 && (
//                       <small className="text-muted" style={{ fontSize: '0.7rem' }}>
//                         +{post.tags.split(',').length - 2}
//                       </small>
//                     )}
//                   </div>
//                 )}
//               </Card.Body>
              
//               <Card.Footer className="bg-white p-2 d-flex justify-content-between align-items-center">
//                 <a 
//                   href={`/posts/${post.slug}`}
//                   className="text-primary small text-decoration-none"
//                   style={{ fontSize: '0.75rem' }}
//                 >
//                   Read more
//                 </a>
                
//                 <div>
//                   <small className="text-muted me-2" style={{ fontSize: '0.7rem' }}>
//                     <i className="bi bi-heart-fill text-danger me-1" style={{ fontSize: '0.7rem' }}></i>
//                     {post.likes ? post.likes.length : 0}
//                   </small>
//                   <small className="text-muted" style={{ fontSize: '0.7rem' }}>
//                     <i className="bi bi-chat-fill text-primary me-1" style={{ fontSize: '0.7rem' }}></i>
//                     {post?.comments?.length || 0}
//                   </small>
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//         ))}
//       </Row>
      
//       {posts.length > 9 && (
//         <div className="text-center mt-4">
//           <Button variant="outline-secondary" size="sm">
//             Load more posts
//           </Button>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default CategoryPostsPage;



import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import apiInstance from '../../utils/axios';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import PostCard from '../../components/PostCard';

const CategoryPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categorySlug } = useParams();
  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // Fetch posts by category using your API endpoint
      const response = await apiInstance.get(`/post/category/posts/${categorySlug}/`);
      
      if (response.status !== 200) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }
      
      const data = await response?.data;
      setPosts(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [categorySlug]);

  const categoryName = category.name || categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Posts</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  if (posts.length === 0) {
    return (
      <Container className="py-4">
        <Alert variant="info">
          <Alert.Heading>{categoryName}</Alert.Heading>
          <p>No posts found in this category.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <>
    <Header/>
    <Container className="py-4">
      <header className="text-center mb-4">
        <h1 className="fw-bold">{categoryName}</h1>
        {category.description && (
          <p className="text-muted">{category.description}</p>
        )}
        <Badge bg="primary" className="mt-2">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </Badge>
      </header>

      <Row xs={1} md={2} lg={3} className="g-3">
        {posts.map((post) => (
          <PostCard key={post.id} p={post} fetchPosts={fetchPosts} />
        ))}
      </Row>
      
      {posts.length > 9 && (
        <div className="text-center mt-4">
          <Button variant="outline-secondary" size="sm">
            Load more posts
          </Button>
        </div>
      )}
    </Container>
    <Footer/>
    </>  
    );
};

export default CategoryPostsPage;