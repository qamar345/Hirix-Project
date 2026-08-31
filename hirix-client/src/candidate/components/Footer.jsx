import React, { useState } from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaPinterest,
  FaSnapchat,
  FaWhatsapp,
  FaTelegram,
  FaGlobe,
} from "react-icons/fa";
import { letterBox } from "../assets/icons/index.js";
import { NavLink } from "react-router-dom";
import API from "../../api";
import useSiteSettings from "../../useSiteSettings";
import { showSuccess } from "../../utils/toast";

// Map platform name -> icon component
const PLATFORM_ICONS = {
  facebook:    <FaFacebook />,
  linkedin:    <FaLinkedin />,
  "twitter / x": <FaTwitter />,
  twitter:     <FaTwitter />,
  instagram:   <FaInstagram />,
  youtube:     <FaYoutube />,
  tiktok:      <FaTiktok />,
  pinterest:   <FaPinterest />,
  snapchat:    <FaSnapchat />,
  whatsapp:    <FaWhatsapp />,
  telegram:    <FaTelegram />,
};

const getPlatformIcon = (platform) => {
  const key = (platform || "").toLowerCase();
  return PLATFORM_ICONS[key] || <FaGlobe />;
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const { settings, socialLinks } = useSiteSettings();

  const phone   = settings.site_phone    || "(00) 658 54332";
  const mail    = settings.site_email    || "hello@hirix.pk";
  const address = settings.footer_address || "";

  const SubmitNewsLetter = (e) => {
    e.preventDefault();
    API.post("/news-letter", { email })
      .then((res) => {
        showSuccess(res.data.msg);
        setEmail("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <form action="#" className="" onSubmit={SubmitNewsLetter}>
                <div className="container">
                  <div className="row justify-content-between gap-4 gap-md-0">
                    <div className="col-md-6">
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="searchInput"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4  d-flex ">
                      <button
                        type="submit"
                        className={`btn-submit flex-grow-1 text-center`}
                      >
                        Subscribe
                      </button>
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
              <h4>About Us</h4>
              <ul>
                <li>
                  <p>
                    Hirix is Pakistan's leading job portal connecting top talent
                    with the best employers across all industries.
                  </p>
                </li>
                {phone && (
                  <li>
                    <span className="d-block">
                      T.{" "}
                      <a href={`tel:${phone}`} style={{ color: "inherit" }}>
                        {phone}
                      </a>
                    </span>
                  </li>
                )}
                {mail && (
                  <li>
                    <span className="d-block">
                      E.{" "}
                      <a href={`mailto:${mail}`} style={{ color: "inherit" }}>
                        {mail}
                      </a>
                    </span>
                  </li>
                )}
                {address && (
                  <li>
                    <span className="d-block">{address}</span>
                  </li>
                )}
              </ul>
            </div>
            <div className="col-md-4 col-xl-2">
              <h4>Company</h4>
              <ul>
                <li><a href="#">about us</a></li>
                <li><a href="#">carrier</a></li>
                <li><a href="#">blogs</a></li>
                <li><a href="#">FAQ's</a></li>
                <li><a href="#">contact</a></li>
              </ul>
            </div>
            <div className="col-md-4 col-xl-2">
              <h4>Service</h4>
              <ul>
                <li><a href="#">jobs</a></li>
                <li><a href="#">companies</a></li>
                <li><a href="#">candidates</a></li>
                <li><a href="#">pricing</a></li>
                <li><a href="#">partner</a></li>
              </ul>
            </div>
            <div className="col-md-4 col-xl-2">
              <h4>Support</h4>
              <ul>
                <li><a href="#">privacy policy</a></li>
                <li><a href="#">terms of use</a></li>
                <li><a href="#">help center</a></li>
                <li><a href="#">updates</a></li>
                <li><a href="#">documentation</a></li>
              </ul>
            </div>
            <div className="col-md-4 col-xl-2">
              <h4>Connect</h4>
              <ul>
                {socialLinks.length > 0 ? (
                  socialLinks.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="social-icon">
                          {getPlatformIcon(link.platform)}
                        </span>
                        {link.platform}
                      </a>
                    </li>
                  ))
                ) : (
                  /* Fallback when nothing is set yet */
                  <>
                    <li><a href="#"><FaLinkedin className="social-icon" /> Linkedin</a></li>
                    <li><a href="#"><FaTwitter className="social-icon" /> Twitter</a></li>
                    <li><a href="#"><FaFacebook className="social-icon" /> Facebook</a></li>
                    <li><a href="#"><FaInstagram className="social-icon" /> Instagram</a></li>
                    <li><a href="#"><FaYoutube className="social-icon" /> Youtube</a></li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="footer-bottom border-top bg-white">
        <div className="container">
          <div className="row">
            <div className="col-md-12  ">
              <p> © {currentYear} Hirix. All Right Reserved.</p>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
