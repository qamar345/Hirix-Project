import React from "react";
import { NavLink } from "react-router-dom";
import Login from "../../userAuthentication/Login";
import { AdLogin } from "../../Admin/index.js";

const MobileNavBar = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [adModalShow, setAdModalShow] = React.useState(false);
  return (
    <div className="mobileNav">
      <div
        className="offcanvas offcanvas-start "
        data-bs-scroll="true"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header border-bottom">
          <p className="offcanvas-title" id="mobileMenuLabel">
            <NavLink
              className={`btn-login`}
              type="button"
              variant="primary"
              onClick={() => setModalShow(true)}
            >
              Login
            </NavLink>

            <Login show={modalShow} onHide={() => setModalShow(false)} />
            <AdLogin show={adModalShow} onHide={() => setAdModalShow(false)} />
          </p>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="mobile-menu  mb-5 pb-3">
            {/* <div className="accordion" id="mobileMenuAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Home
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#mobileMenuAccordion"
                >
                  <div className="accordion-body">
                    <ul className="menu-list">
                      <li
                        id="menu-item-4205"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4205"
                      >
                        <a href="https://civi.uxper.co/home-01/">Home 01</a>
                      </li>
                      <li
                        id="menu-item-4204"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4204"
                      >
                        <a href="https://civi.uxper.co/home-02/">Home 02</a>
                      </li>
                      <li
                        id="menu-item-5401"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5401"
                      >
                        <a href="https://civi.uxper.co/home-03/">Home 03</a>
                      </li>
                      <li
                        id="menu-item-6466"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6466"
                      >
                        <a href="https://civi.uxper.co/home-04/">Home 04</a>
                      </li>
                      <li
                        id="menu-item-5400"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5400"
                      >
                        <a href="https://civi.uxper.co/home-05/">Home 05</a>
                      </li>
                      <li
                        id="menu-item-4203"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4203"
                      >
                        <a href="https://civi.uxper.co/home-06/">Home 06</a>
                      </li>
                      <li
                        id="menu-item-6464"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6464"
                      >
                        <a href="https://civi.uxper.co/home-07/">Home 07</a>
                      </li>
                      <li
                        id="menu-item-6463"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6463"
                      >
                        <a href="https://civi.uxper.co/home-08/">Home 08</a>
                      </li>
                      <li
                        id="menu-item-6462"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6462"
                      >
                        <a href="https://civi.uxper.co/home-09/">Home 09</a>
                      </li>
                      <li
                        id="menu-item-6465"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-6465"
                      >
                        <a href="https://civi.uxper.co/home-10/">Home 10</a>
                      </li>
                      <li
                        id="menu-item-8588"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-8588"
                      >
                        <a href="https://civi.uxper.co/home-11/">Home 11</a>
                      </li>
                      <li
                        id="menu-item-8587"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-8587"
                      >
                        <a href="https://civi.uxper.co/home-12/">Home 12</a>
                      </li>
                      <li
                        id="menu-item-11615"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-11615"
                      >
                        <a href="https://civi.uxper.co/freelance/freelance-01/">
                          Freelance 01
                        </a>
                      </li>
                      <li
                        id="menu-item-11616"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-11616"
                      >
                        <a href="https://civi.uxper.co/freelance/freelance-02/">
                          Freelance 02
                        </a>
                      </li>
                      <li
                        id="menu-item-11617"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-11617"
                      >
                        <a href="https://civi.uxper.co/freelance/freelance-03/">
                          Freelance 03
                        </a>
                      </li>
                      <li
                        id="menu-item-11618"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-11618"
                      >
                        <a href="https://civi.uxper.co/freelance/freelance-04/">
                          Freelance 04
                        </a>
                      </li>
                      <li
                        id="menu-item-11619"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-11619"
                      >
                        <a href="https://civi.uxper.co/freelance/freelance-05/">
                          Freelance 05
                        </a>
                      </li>
                      <li
                        id="menu-item-7808"
                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-7808"
                      >
                        <a href="https://civi.uxper.co/home-rtl/">Home RTL</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Jobs
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#mobileMenuAccordion"
                >
                  <div className="accordion-body">
                    <ul className="sub-menu">
                      <li
                        id="menu-item-4212"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-4212"
                      >
                        <a href="#">
                          Jobs Listing
                          <span className="chevron">
                            <i className="far fa-chevron-down" />
                          </span>
                        </a>
                        <ul className="sub-menu" style={{}}>
                          <li
                            id="menu-item-7910"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-7910"
                          >
                            <a href="https://civi.uxper.co/jobs/?layout=layout-grid&has_bg=1">
                              Search bar background
                            </a>
                          </li>
                          <li
                            id="menu-item-4208"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4208"
                          >
                            <a href="https://civi.uxper.co/jobs/">
                              Search bar no background
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li
                        id="menu-item-4219"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-4219"
                      >
                        <a href="#">
                          Jobs Detail
                          <span className="chevron">
                            <i className="far fa-chevron-down" />
                          </span>
                        </a>
                        <ul className="sub-menu" style={{}}>
                          <li
                            id="menu-item-4220"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4220"
                          >
                            <a href="https://civi.uxper.co/jobs/design/product-design-manager/">
                              Type 1 – Default
                            </a>
                          </li>
                          <li
                            id="menu-item-4221"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4221"
                          >
                            <a href="https://civi.uxper.co/jobs/finance/field-marketing-manager/">
                              Type 2 – Cover Image
                            </a>
                          </li>
                          <li
                            id="menu-item-4222"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4222"
                          >
                            <a href="https://civi.uxper.co/jobs/marketing/senior-product-marketing-manager/?layout=type-2">
                              Type 3 – Insights Right
                            </a>
                          </li>
                          <li
                            id="menu-item-4223"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4223"
                          >
                            <a href="https://civi.uxper.co/jobs/development/chief-of-staff/?layout=type-3">
                              Type 4 – Full Sections
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li
                        id="menu-item-4224"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-4224"
                      >
                        <a href="#">
                          Jobs Apply
                          <span className="chevron">
                            <i className="far fa-chevron-down" />
                          </span>
                        </a>
                        <ul className="sub-menu" style={{}}>
                          <li
                            id="menu-item-4228"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4228"
                          >
                            <a href="https://civi.uxper.co/jobs/development/senior-frontend-engineer/">
                              Apply by Email
                            </a>
                          </li>
                          <li
                            id="menu-item-4227"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4227"
                          >
                            <a href="https://civi.uxper.co/jobs/development/lead-web3-engineer/">
                              Apply by Phone Call
                            </a>
                          </li>
                          <li
                            id="menu-item-4226"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4226"
                          >
                            <a href="https://civi.uxper.co/jobs/finance/business-development-manager/">
                              External Apply
                            </a>
                          </li>
                          <li
                            id="menu-item-4225"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4225"
                          >
                            <a href="https://civi.uxper.co/jobs/development/backend-engineer-devops/">
                              Internal Apply (Login)
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Companies
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#mobileMenuAccordion"
                >
                  <div className="accordion-body">
                    <ul className="sub-menu" style={{}}>
                      <li
                        id="menu-item-4230"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-4230"
                      >
                        <a href="#">
                          Companies Listing
                          <span className="chevron">
                            <i className="far fa-chevron-down" />
                          </span>
                        </a>
                        <ul className="sub-menu" style={{}}>
                          <li
                            id="menu-item-7912"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-7912"
                          >
                            <a href="https://civi.uxper.co/companies/?layout=layout-grid&has_bg=1">
                              Search bar background
                            </a>
                          </li>
                          <li
                            id="menu-item-4231"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4231"
                          >
                            <a href="https://civi.uxper.co/companies/?layout=layout-grid">
                              Search bar no background
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li
                        id="menu-item-7911"
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-7911"
                      >
                        <a href="#">
                          Companies Detail
                          <span className="chevron">
                            <i className="far fa-chevron-down" />
                          </span>
                        </a>
                        <ul className="sub-menu" style={{}}>
                          <li
                            id="menu-item-4232"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4232"
                          >
                            <a href="https://civi.uxper.co/companies/saas/cleo/">
                              Type 1 – Cover image
                            </a>
                          </li>
                          <li
                            id="menu-item-4233"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4233"
                          >
                            <a href="https://civi.uxper.co/companies/saas/webflow/">
                              Type 2 – No Cover Image
                            </a>
                          </li>
                          <li
                            id="menu-item-4234"
                            className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4234"
                          >
                            <a href="https://civi.uxper.co/companies/saas/textile/?layout=large-cover-img">
                              Type 3 – Large Cover Image
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          <NavLink className={`civi-button add-job`}>Post a job</NavLink>
        </div>
      </div>
    </div>
  );
};

export default MobileNavBar;
