import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import apiInstance from "../../utils/axios";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import PostCard from "../../components/PostCard";

const CategoryPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categorySlug } = useParams();
  const fetchPosts = async () => {
    try {
      setLoading(true);

      const response = await apiInstance.get(
        `/post/category/posts/${categorySlug}/`
      );

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

  const categoryName =
    category.name ||
    categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
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
          <Button
            variant="outline-danger"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  if (posts.length === 0) {
    return (
      <>
        <Header />
        <Container className="py-4">
          <Alert variant="info">
            <Alert.Heading>{categoryName}</Alert.Heading>
            <p>No posts found in this category.</p>
          </Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container className="py-4">
        <header className="text-center mb-4">
          <h1 className="fw-bold">{categoryName}</h1>
          {category.description && (
            <p className="text-muted">{category.description}</p>
          )}
          <Badge bg="primary" className="mt-2">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </Badge>
        </header>

        <Row xs={1} md={2} lg={3} className="g-3">
          {posts.map((post) => (
            <PostCard key={post.id} p={post} fetchPosts={fetchPosts} />
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default CategoryPostsPage;
