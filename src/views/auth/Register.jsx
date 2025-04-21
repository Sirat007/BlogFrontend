import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { FaUserPlus, FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { register } from "../../utils/auth";
import { useAuthStore } from "../../store/auth";

function Register() {
  const [bioData, setBioData] = useState({
    full_name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const handleBioDataChange = (event) => {
    setBioData({
      ...bioData,
      [event.target.name]: event.target.value,
    });
  };

  const resetForm = () => {
    setBioData({
      full_name: "",
      email: "",
      password: "",
      password2: "",
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await register(
      bioData.full_name,
      bioData.email,
      bioData.password,
      bioData.password2
    );
    if (error) {
      alert(JSON.stringify(error));
      resetForm();
    } else {
      navigate("/");
    }

    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <Header />
      <Container className="d-flex flex-column min-vh-100 py-5">
        <Row className="align-items-center justify-content-center my-5">
          <Col lg={5} md={8}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-1">Create Account</h2>
                  <p className="text-muted">
                    Already have an account?{" "}
                    <Link to="/login/" className="text-primary fw-semibold">
                      Log In
                    </Link>
                  </p>
                </div>

                <Form onSubmit={handleRegister}>
                  <Form.Group className="mb-4">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="full_name"
                      value={bioData.full_name}
                      onChange={handleBioDataChange}
                      placeholder="Enter your full name"
                      required
                      className="py-2"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter your full name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={bioData.email}
                      onChange={handleBioDataChange}
                      placeholder="Enter your email"
                      required
                      className="py-2"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={bioData.password}
                        onChange={handleBioDataChange}
                        placeholder="Enter your password"
                        required
                        className="py-2"
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Password must be at least 8 characters long.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        name="password2"
                        value={bioData.password2}
                        onChange={handleBioDataChange}
                        placeholder="Confirm your password"
                        required
                        className="py-2"
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </InputGroup>
                    <Form.Control.Feedback type="invalid">
                      Passwords must match.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2 mt-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="fa-spin me-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaUserPlus className="me-2" />
                        Sign Up
                      </>
                    )}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Register;
