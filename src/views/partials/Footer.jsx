import React from "react";
import logo from '../../assests/logo.png'
function Footer() {
    return (
        <footer>
            <div className="row bg-dark py-5 mx-0 card card-header  flex-row align-items-center text-center text-md-start">
                <div className="col-md-5 mb-3 mb-md-0">
                    <div className="text-primary-hover text-white">
                          (2024-2025){" "}
                        
                            Blog Team
                       
                        | All rights reserved
                    </div>
                </div>
                <div className="col-md-3 mb-3 mb-md-0">
                    <img src={logo} style={{ width: "150px" }} alt="footer logo" />
                </div>
                <div className="col-md-4">
                    <ul className="nav text-primary-hover justify-content-center justify-content-md-end">
                        <li className="nav-item">
                            <a className="nav-link text-white px-2 fs-5" href="https://facebook.com/" target="_blank">
                                <i className="fab fa-facebook-square" />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white px-2 fs-5" href="https://twitter.com/" target="_blank">
                                <i className="fab fa-twitter-square" />
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link text-white px-2 fs-5" href="https://youtube.com/" target="_blank">
                                <i className="fab fa-youtube-square" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;