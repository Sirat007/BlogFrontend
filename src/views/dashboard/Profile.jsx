// import React, { useState, useEffect } from "react";
// import Header from "../partials/Header";
// import Footer from "../partials/Footer";
// import { Link } from "react-router";

// import apiInstance from "../../utils/axios";
// import useUserData from "../../plugin/useUserData";
// import Toast from "../../plugin/Toast";

// function Profile() {
//     const [profileData, setProfileData] = useState({
//         image: null,
//         full_name: "",
//         about: "",
//         bio: "",
//         facebook: "",
//         twitter: "",
//         country: "",
//     });
//     const userId = useUserData()?.user_id;

//     const [imagePreview, setImagePreview] = useState("");
//     const [loading, setLoading] = useState(false);

//     const fetchProfile = () => {
//         apiInstance.get(`user/profile/${userId}/`).then((res) => {
//             setProfileData(res.data);
//         });
//     };

//     useEffect(() => {
//         fetchProfile();
//     }, []);

//     const handleProfileChange = (event) => {
//         setProfileData({
//             ...profileData,
//             [event.target.name]: event.target.value,
//         });
//     };

//     const handleFileChange = (event) => {
//         const selectedFile = event.target.files[0];
//         setProfileData({
//             ...profileData,
//             [event.target.name]: selectedFile,
//         });

//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setImagePreview(reader.result);
//         };
//         if (selectedFile) {
//             reader.readAsDataURL(selectedFile);
//         }
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         const res = await apiInstance.get(`user/profile/${userId}/`);

//         const formData = new FormData();
//         if (profileData.image && profileData.image !== res.data.image) {
//             formData.append("image", profileData.image);
//         }
//         formData.append("full_name", profileData.full_name);
//         formData.append("about", profileData.about);
//         formData.append("facebook", profileData.facebook);
//         formData.append("twitter", profileData.twitter);
//         formData.append("country", profileData.country);

//         try {
//             const res = await apiInstance.patch(`user/profile/${userId}/`, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             Toast("success", "Profile updated successfully", "");
//             setLoading(false);
//         } catch (error) {
//             console.error("Error updating profile:", error);
//             Toast("error", "An Error Occured", "");
//         }
//     };

//     console.log(profileData);
//     return (
//         <>
//             <Header />
//             <section className="pt-5 pb-5">
//                 <div className="container">
//                     <div className="row mt-0 mt-md-4">
//                         <div className="col-lg-12 col-md-8 col-12">
//                             {/* Card */}
//                             <div className="card">
//                                 {/* Card header */}
//                                 <div className="card-header">
//                                     <h3 className="mb-0">Profile Details</h3>
//                                     <p className="mb-0">You have full control to manage your own account setting.</p>
//                                 </div>
//                                 {/* Card body */}
//                                 <form className="card-body" onSubmit={handleFormSubmit}>
//                                     <div className="d-lg-flex align-items-center justify-content-between">
//                                         <div className="d-flex align-items-center mb-4 mb-lg-0">
//                                             <img
//                                                 src={imagePreview || profileData?.image}
//                                                 id="img-uploaded"
//                                                 className="avatar-xl rounded-circle"
//                                                 alt="avatar"
//                                                 style={{
//                                                     width: "100px",
//                                                     height: "100px",
//                                                     borderRadius: "50%",
//                                                     objectFit: "cover",
//                                                 }}
//                                             />

//                                             <div className="ms-3">
//                                                 <h4 className="mb-0">Profile Picture</h4>
//                                                 <p className="mb-0">PNG or JPG no bigger than 800px wide and tall.</p>
//                                                 <input type="file" name="image" className="form-control mt-3" onChange={handleFileChange} />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <hr className="my-5" />
//                                     <div>
//                                         <h4 className="mb-0">Personal Details</h4>
//                                         <p className="mb-4">Edit your personal information and address.</p>
//                                         {/* Form */}
//                                         <div className="row gx-3">
//                                             {/* First name */}
//                                             <div className="mb-3 col-12 col-md-12">
//                                                 <label className="form-label" htmlFor="fname">
//                                                     Full Name
//                                                 </label>
//                                                 <input type="text" id="fname" className="form-control" placeholder="First Name" required="" onChange={handleProfileChange} name="full_name" value={profileData?.full_name} />
//                                                 <div className="invalid-feedback">Please enter first name.</div>
//                                             </div>
//                                             {/* Last name */}
//                                             <div className="mb-3 col-12 col-md-12">
//                                                 <label className="form-label" htmlFor="lname">
//                                                     About Me
//                                                 </label>
//                                                 <textarea onChange={handleProfileChange} name="about" id="" cols="30" value={profileData?.about} rows="5" className="form-control"></textarea>
//                                             </div>
//                                             {/* Country */}
//                                             <div className="mb-3 col-12 col-md-12">
//                                                 <label className="form-label" htmlFor="editCountry">
//                                                     Bio
//                                                 </label>
//                                                 <input type="text" id="bio" className="form-control" placeholder="Country" required="" value={profileData?.bio} onChange={handleProfileChange} name="bio" />
//                                                 <div className="invalid-feedback">Please choose country.</div>
//                                             </div>
//                                             {/* Country */}
//                                             <div className="mb-3 col-12 col-md-12">
//                                                 <label className="form-label" htmlFor="editCountry">
//                                                     Country
//                                                 </label>
//                                                 <input type="text" id="country" className="form-control" placeholder="Country" required="" value={profileData?.country} onChange={handleProfileChange} name="country" />
//                                                 <div className="invalid-feedback">Please choose country.</div>
//                                             </div>
//                                             {/* Country */}
//                                             <div className="mb-3 col-12 col-md-12">
//                                                 <label className="form-label" htmlFor="editCountry">
//                                                     Facebook
//                                                 </label>
//                                                 <input type="text" id="facebook" className="form-control" placeholder="Country" required="" value={profileData?.facebook} onChange={handleProfileChange} name="facebook" />
//                                             </div>
//                                             {/* Country */}
//                                             <div className="mb-3 col-12 col-md-12">
//                                                 <label className="form-label" htmlFor="editCountry">
//                                                     Twitter
//                                                 </label>
//                                                 <input type="text" id="twitter" className="form-control" placeholder="Country" required="" value={profileData?.twitter} onChange={handleProfileChange} name="twitter" />
//                                             </div>
//                                             <div className="col-12">
//                                                 {/* Button */}
//                                                 <button className="btn btn-primary" type="submit">
//                                                     Update Profile <i className="fas fa-check-circle"></i>
//                                                 </button>
//                                             </div>
//                                         </div>
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

// export default Profile;

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Image } from "react-bootstrap";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import apiInstance from "../../utils/axios";
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";

function Profile() {
  const [profileData, setProfileData] = useState({
    image: null,
    full_name: "",
    about: "",
    bio: "",
    facebook: "",
    twitter: "",
    country: "",
  });
  const userId = useUserData()?.user_id;
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProfile = () => {
    apiInstance.get(`user/profile/${userId}/`).then((res) => {
      setProfileData(res.data);
    });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setProfileData({
      ...profileData,
      [event.target.name]: selectedFile,
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await apiInstance.get(`user/profile/${userId}/`);

    const formData = new FormData();
    if (profileData.image && profileData.image !== res.data.image) {
      formData.append("image", profileData.image);
    }
    formData.append("full_name", profileData.full_name);
    formData.append("about", profileData.about);
    formData.append("bio", profileData.bio);
    formData.append("facebook", profileData.facebook);
    formData.append("twitter", profileData.twitter);
    formData.append("country", profileData.country);

    try {
      await apiInstance.patch(`user/profile/${userId}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Toast("success", "Profile updated successfully", "");
      setLoading(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      Toast("error", "An Error Occurred", "");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container className="py-5">
        <h2 className="mb-4">User Profile</h2>
        <Row>
          {/* Profile Details Card (Left Side) */}
          <Col lg={4} md={12} className="mb-4">
            <Card className="h-100">
              <Card.Header as="h5">Profile Details</Card.Header>
              <Card.Body className="d-flex flex-column align-items-center text-center">
                <Image 
                  src={profileData?.image } 
                  roundedCircle 
                  style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  className="mb-3"
                />
                <h4>{profileData.full_name}</h4>
                <p className="text-muted mb-1">{profileData.bio}</p>
                <p className="text-muted mb-4">{profileData.country}</p>
                
                <div className="d-flex justify-content-center mb-2">
                  {profileData.facebook && (
                    <a href={profileData.facebook} className="me-3" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook fa-lg"></i>
                    </a>
                  )}
                  {profileData.twitter && (
                    <a href={profileData.twitter} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter fa-lg"></i>
                    </a>
                  )}
                </div>
                
                <Card.Text className="mt-3">
                  <h6>About Me</h6>
                  <p>{profileData.about}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

         
          <Col lg={8} md={12}>
            <Card>
              <Card.Header as="h5">Edit Profile</Card.Header>
              <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control 
                      type="file" 
                      name="image" 
                      onChange={handleFileChange} 
                    />
                    <Form.Text className="text-muted">
                      PNG or JPG no bigger than 800px wide and tall.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="full_name"
                      value={profileData.full_name}
                      onChange={handleProfileChange}
                      placeholder="Enter your full name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                      type="text"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      placeholder="Brief bio"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>About Me</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="about"
                      value={profileData.about}
                      onChange={handleProfileChange}
                      placeholder="Tell us about yourself"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      name="country"
                      value={profileData.country}
                      onChange={handleProfileChange}
                      placeholder="Your country"
                    />
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Facebook</Form.Label>
                        <Form.Control
                          type="text"
                          name="facebook"
                          value={profileData.facebook}
                          onChange={handleProfileChange}
                          placeholder="Facebook profile URL"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Twitter</Form.Label>
                        <Form.Control
                          type="text"
                          name="twitter"
                          value={profileData.twitter}
                          onChange={handleProfileChange}
                          placeholder="Twitter profile URL"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading}
                    className="mt-3"
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
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

export default Profile;