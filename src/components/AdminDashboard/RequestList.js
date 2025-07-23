import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { CustomToastComponent } from "../../customToast";
import moment from "moment";
import { useSelector } from "react-redux";

const RequestList = (props) => {
  const [, setSelectionData] = useState([]);

  const mlicsRequestList = useSelector(
    (state) => state.RequestReducer.mlicsRequestList
  );

  const columns = [
    { field: "slno", headerName: "#", width: 90 },
    {
      field: "Email",
      headerName: "Email",
      width: 250,
    },

    { field: "SSN", headerName: "SSN", width: 100 },
    { field: "Doctor", headerName: "DOCTOR", width: 140 },
    {
      field: "Lab",
      headerName: "Lab",
      type: "number",
      width: 120,
    },
    {
      field: "Type",
      headerName: "Type",
      type: "number",
      width: 120,
    },
    {
      field: "Status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "Date",
      headerName: "Date",
      type: "number",
      width: 150,
    },
  ];
  // let [count, setcount] = React.useState(0);
  const rows = mlicsRequestList.map((ReqlistsItem, index) => {
    const container = {};
    container.id = ReqlistsItem.id;
    let count = index + 1;

    container.slno = count;
    container.Email = ReqlistsItem.email;
    container.SSN = ReqlistsItem.SSN;
    container.Doctor = ReqlistsItem.doctor;
    container.Status = ReqlistsItem.status;
    container.Date = moment(ReqlistsItem.starttime).format("DD - MM - YYYY");
    container.Lab = ReqlistsItem.lab;
    container.Type = ReqlistsItem.type;
    return container;
  });

  return (
    <>
      <div
        style={{ height: 400, width: "100%" }}
        className="container d-flex align-items-center mt-4"
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          onRowSelected={(e) => {
            setSelectionData(e.data);
          }}
        />

        <CustomToastComponent />
      </div>
    </>
  );
};

export default RequestList;
