import React from "react";

const AdminFooter = () => {
  return (
    <div>
      {/* ======= Footer ======= */}
      <footer id="footer " className="pt-5 fixed-bottom py-3 footerBg">
        <div className="container d-md-flex py-12">
          <div className="mr-md-auto text-center text-md-left">
            <div className="copyright">
              Copyright © {new Date().getFullYear()}{" "}
              <strong>
                <span>MLICS</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className="credits"></div>
          </div>
        </div>
      </footer>
      {/* End Footer */}
    </div>
  );
};

export default AdminFooter;
