import { useMemo } from "react";

const DrFooter = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="footer pt-5 py-3 footerBg">
      <div className="container d-md-flex py-12">
        <div className="mr-md-auto text-center text-md-left">
          <div className="copyright">
            © {currentYear}{" "}
            <strong>
              <span>MLICS</span>
            </strong>
            . All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DrFooter;
