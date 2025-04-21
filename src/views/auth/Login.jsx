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
import { FaSignInAlt, FaSpinner, FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { login } from "../../utils/auth";
import { useAuthStore } from "../../store/auth";

function Login() {
  const [bioData, setBioData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      email: "",
      password: "",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await login(bioData.email, bioData.password);
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

  return (
    <>
      <Header />
      <Container className="d-flex flex-column min-vh-100 py-5">
        <Row className="align-items-center justify-content-center my-5">
          <Col lg={5} md={8}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-1">Welcome Back</h2>
                  <p className="text-muted">
                    Don't have an account?{" "}
                    <Link to="/register/" className="text-primary fw-semibold">
                      Sign up
                    </Link>
                  </p>
                </div>

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-4">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={bioData.email}
                      onChange={handleBioDataChange}
                      placeholder="johndoe@example.com"
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
                      <Form.Control.Feedback type="invalid">
                        Please enter your password.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      id="rememberMe"
                      label="Remember me"
                    />
                    <Link to="/forgot-password/" className="text-primary">
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-2 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="fa-spin me-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaSignInAlt className="me-2" />
                        Log In
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

export default Login;
