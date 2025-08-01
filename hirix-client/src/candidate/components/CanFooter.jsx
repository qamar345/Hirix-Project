import React from "react";

const CanFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footerWrapper">
      <section className="footer-bottom text-end">
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

export default CanFooter;
