import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { ModalManager } from "@material-ui/core";
// import { CustomToastComponent } from "../customToast";
import moment from "moment";
// import Loaders from "./Loader";

import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #cad3e8;
`;

import { useSelector } from "react-redux";

const DrRequestList = (props) => {
  const [, setSelectionData] = useState([]);

  const micsDrRequestList = useSelector(
    (state) => state.DrRequestReducer.micsDrRequestList,
  );

  console.log(micsDrRequestList);

  const columns = [
    { field: "id", headerName: "#", width: 50 },

    {
      field: "Email",
      headerName: "Email",
      width: 210,
    },

    { field: "SSN", headerName: "SSN", width: 150 },
    { field: "Doctor", headerName: "DOCTOR", width: 150 },
    {
      field: "Lab",
      headerName: "Lab",
      type: "number",
      width: 100,
    },
    {
      field: "Type",
      headerName: "Type",
      type: "number",
      width: 150,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "Starttime",
      headerName: "Date",
      type: "number",
      width: 150,
    },
  ];

  const rows = micsDrRequestList.map((DrReqlistsItem, index) => {
    const container = {};

    let count = index + 1;
    // console.log(moment(DrReqlistsItem.starttime).format("DD / MM / YYYY"));

    container.id = count;

    container.Email = DrReqlistsItem.email;
    container.SSN = DrReqlistsItem.SSN;
    container.Doctor = DrReqlistsItem.doctor;
    container.Status = DrReqlistsItem.status;
    container.Starttime = moment(DrReqlistsItem.starttime).format(
      "DD - MM - YYYY",
    );

    container.Lab = DrReqlistsItem.lab;
    container.Type = DrReqlistsItem.type;
    return container;
  });

  if (rows.length > 0) {
    return (
      <>
        <div
          style={{ height: 400, width: "100%" }}
          className="container d-flex align-items-center"
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
    <div className="sweet-loading mt-5">
      <ClipLoader color={color} loading={loading} css={override} size={100} />
    </div>
  );
}
export default DrRequestList;
