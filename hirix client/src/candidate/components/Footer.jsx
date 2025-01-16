import React from "react";

import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { letterBox } from "../assets/icons/index.js";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footerWrapper">
      <section className="footer-top border-bottom">
        <div className="container ">
          <div className="d-flex align-items-center gap-5 justify-content-xl-between flex-wrap justify-content-center">
            <div className="">
              <div className="d-flex flex-column flex-md-row  align-items-center gap-5">
                <div className="letterBox">
                  <img src={letterBox} alt="letterBox" />
                </div>
                <div className="d-flex flex-column justify-content-center ">
                  <h2 className="heading">Subscribe to our newsletter</h2>
                  <p> We'll keep you updated with the best new jobs.</p>
                </div>
              </div>
            </div>
            <div className="">
              <form action="#" className="">
                <div className="container">
                  <div className="row justify-content-between gap-4 gap-md-0">
                    <div className="col-md-6">
                      <input
                        type="text"
                        required
                        placeholder="Enter your email"
                        className="searchInput "
                      />
                    </div>
                    <div className="col-md-4  d-flex ">
                      <NavLink
                        type="submit"
                        className={`btn-submit flex-grow-1 text-center`}
                        to=""
                      >
                        Subscribe
                      </NavLink>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="footer-middle bg-white">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-xl-4">
              <h4 className="heading">About Us</h4>
              <ul>
                <li>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
                    mauris risus, lobortis a commodo at, varius sit amet ipsum.
                  </p>
                </li>
                <li>
                  <span className="d-block">T. (00) 658 54332</span>
                </li>
                <li>
                  <span className="d-block">E. hello@uxper.co</span>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-xl-2">
              <h4>Company</h4>
              <ul>
                <li>
                  <a href="#">about us</a>
                </li>
                <li>
                  <a href="#">carrier</a>
                </li>
                <li>
                  <a href="#">blogs</a>
                </li>
                <li>
                  <a href="#">FAQ's</a>
                </li>
                <li>
                  <a href="#">contact</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-xl-2">
              <h4>Service</h4>
              <ul>
                <li>
                  <a href="#">jobs</a>
                </li>
                <li>
                  <a href="#">companies</a>
                </li>
                <li>
                  <a href="#">candidates</a>
                </li>
                <li>
                  <a href="#">pricing</a>
                </li>
                <li>
                  <a href="#">partner</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-xl-2">
              <h4>Support</h4>
              <ul>
                <li>
                  <a href="#">privacy policy</a>
                </li>
                <li>
                  <a href="#">terms of use</a>
                </li>
                <li>
                  <a href="#">help center</a>
                </li>
                <li>
                  <a href="#">updates</a>
                </li>
                <li>
                  <a href="#">documentation</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-xl-2">
              <h4>Connect</h4>
              <ul>
                <li>
                  <a href="#">
                    <FaLinkedin className="social-icon" />
                    Linkedin
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaTwitter className="social-icon" />
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaFacebook className="social-icon" />
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaInstagram className="social-icon" />
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FaYoutube className="social-icon" />
                    Youtube
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="footer-bottom border-top bg-white">
        <div className="container">
          <div className="row">
            <div className="col-md-12  ">
              <p> © 2024 Hirix. All Right Reserved.</p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
