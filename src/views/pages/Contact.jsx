import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

function Contact() {
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const form = event.currentTarget;
  
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      console.log('Form submitted:', formData);
      const response = await fetch(
        "https://formsubmit.co/ajax/sirat2753@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // if(!response?.ok){
      //   return
      // }
      setShowSuccess(true);
  
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
  
      // Reset validation state
      setValidated(false);
  
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }
  };
  

  return (
    <>
    <Header/>
    <Container className="py-5">
      <h1 className="text-center mb-5">Contact Us</h1>
      
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          Thank you for your message! We'll get back to you soon.
        </Alert>
      )}
      
      <Row>
        <Col lg={5} className="mb-4">
          <Card className="h-100">
            <Card.Body>
              <h4 className="mb-4">Get In Touch</h4>
              <p>
                We'd love to hear from you! Whether you have a question, want to start a project, 
                or just want to connect, feel free to reach out to us.
              </p>
              
              <div className="d-flex align-items-center mb-3">
                <div className="me-3">
                  <span className="text-primary fs-4">📱</span>
                </div>
                <div>
                  <h6 className="mb-0">Phone</h6>
                  <p className="mb-0">(123) 456-7890</p>
                </div>
              </div>
              
              <div className="d-flex align-items-center mb-3">
                <div className="me-3">
                  <span className="text-primary fs-4">✉️</span>
                </div>
                <div>
                  <h6 className="mb-0">Email</h6>
                  <p className="mb-0">shahriarsirat795@gmail.com</p>
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <span className="text-primary fs-4">📍</span>
                </div>
                <div>
                  <h6 className="mb-0">Address</h6>
                  <p className="mb-0">123 Business Street, Suite 100<br />New York, NY 10001</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={7}>
          <Card>
            <Card.Body>
              <h4 className="mb-4">Send a Message</h4>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="contactName">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required 
                        placeholder="Enter your name"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="contactEmail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required 
                        placeholder="Enter your email"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email address.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3" controlId="contactSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required 
                    placeholder="What is this regarding?"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a subject.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-4" controlId="contactMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control 
                    as="textarea" 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    rows={5} 
                    placeholder="How can we help you?"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your message.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Button variant="primary" type="submit" size="lg">
                  Send Message
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  );
}

export default Contact