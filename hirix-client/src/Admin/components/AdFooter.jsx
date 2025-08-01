import React from "react";

const AdFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footerWrapper">
      <section className="footer-bottom border-top text-end">
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

export default AdFooter;
