import React, { useState, useEffect } from "react";
import { Card, Col, Image, Button, Badge } from 'react-bootstrap';
import { Facebook, Twitter, Linkedin, Github } from 'react-bootstrap-icons';
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";
import { useParams } from "react-router";
import { Link } from "react-router";

const Postowner = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const response = await apiInstance.get(`post/detail/${slug}/`);
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
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  return (
    <>
      <Header />
      {/* <Col lg={4} md={12} className="mb-4">
        <Card className="h-100">
          <Card.Header as="h5">Profile Details</Card.Header>
          <Card.Body className="d-flex flex-column align-items-center text-center">
            <Image
              src={"https://via.placeholder.com/150"}
              roundedCircle
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
              className="mb-3"
            />
            <h4>Name</h4>
            <p className="text-muted mb-1">{post?.profile?.full_name}</p>
            <p className="text-muted mb-4">Country</p>

            <div className="d-flex justify-content-center mb-2">
              <a
                href="#"
                className="me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook fa-lg"></i>
              </a>

              <a href="#" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
            </div>

            <Card.Text className="mt-3">
              <h6>About Me</h6>
              <p>Hi</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col> */}
      <Col className="mb-4">
      <Card className="h-100 border-0 shadow-sm">
        <div className="bg-primary text-white text-center py-4 rounded-top">
          <Image
            src={post?.profile?.image}
            roundedCircle
            style={{ 
              width: "120px", 
              height: "120px", 
              objectFit: "cover",
              border: "4px solid white"
            }}
            className="mb-3"
          />
          <h3 className="fw-bold mb-0">{post?.profile?.full_name || "John Doe"}</h3>
          <p className="text-light mt-3">
              {post?.profile?.bio || "No bio is given"}
            </p>
          <p className="text-light mb-0">
           Country: {post?.profile?.country || "Country"}
          </p>
        </div>
        
        <Card.Body className="d-flex flex-column align-items-center text-center p-4">
          
          
          <div className="social-links d-flex justify-content-center mb-4">
          {post?.profile?.facebook && (
                    <a href={post.profile.facebook} className="me-3" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook fa-lg"></i>
                    </a>
                  )}
                  {post?.profile?.twitter && (
                    <a href={post.profile.twitter} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter fa-lg"></i>
                    </a>
                  )}
           
          </div>
          
          <Card.Text className="mb-4">
            <h5 className="fw-bold mb-3"></h5>
           
          </Card.Text>
          
         
        </Card.Body>
      </Card>
    </Col>
      <Footer />
    </>
  );
};

export default Postowner;
