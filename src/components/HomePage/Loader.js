import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

const override = css`
  display: block;
  margin: 2 auto;
  border-color: #cad3e8;
`;

const Loaders = () => {
  const [loading] = useState(true);
  const [color] = useState("#ffffff");

  return (
    <div className="sweet-loading container d-flex align-items-center md-5">
      <ClipLoader 
        color={color} 
        loading={loading} 
        css={override} 
        size={60} 
      />
    </div>
  );
};

export default Loaders;