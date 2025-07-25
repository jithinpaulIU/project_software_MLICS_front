import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { CustomToastComponent } from "../../customToast";

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #cad3e8;
`;

const DrLabLists = (props) => {
  const [, setSelectionData] = useState([]);

  let micsLabList = useSelector((state) => state.LabReducer.micsLabList);

  const columns = [
    { field: "id", headerName: "#", width: 50 },

    { field: "Name", headerName: "Name", width: 225 },
    { field: "Address", headerName: "Address", width: 400 },
    {
      field: "Email",
      headerName: "Email",
      width: 225,
    },
    {
      field: "Phone",
      headerName: "Phone",
      type: "number",
      width: 150,
    },
  ];

  if (micsLabList.length > 0) {
    const rows = micsLabList.map((LablistsItem, index) => {
      const container = {};
      let count = index + 1;
      container.id = count;
      container.Name = LablistsItem.name;
      container.Address = LablistsItem.address;
      container.Phone = LablistsItem.mobileNo;
      container.Email = LablistsItem.email;

      return container;
    });

    return (
      <>
        <div
          style={{ height: 400, width: "100%" }}
          className="container d-flex align-items-center "
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            onRowSelected={(e) => {
              setSelectionData(e.data);
            }}
            className="mt-5"
          />

          <CustomToastComponent />
        </div>
      </>
    );
  } else {
    return <Loaders />;
  }
};

function Loaders() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="sweet-loading">
      <ClipLoader color={color} loading={loading} css={override} size={100} />
    </div>
  );
}
export default DrLabLists;
