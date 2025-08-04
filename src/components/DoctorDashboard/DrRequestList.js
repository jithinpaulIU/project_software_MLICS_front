import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #cad3e8;
`;

const DrRequestList = ({ FetchData }) => {
  const [selectionModel, setSelectionModel] = useState([]);
  const [loading, setLoading] = useState(false);

  const micsDrRequestList = useSelector(
    (state) => state.DrRequestReducer.micsDrRequestList
  );

  const columns = [
    { field: "id", headerName: "#", width: 50 },
    { field: "Email", headerName: "Email", width: 210 },
    { field: "SSN", headerName: "SSN", width: 150 },
    { field: "Doctor", headerName: "DOCTOR", width: 150 },
    { field: "Lab", headerName: "Lab", width: 100 },
    { field: "Type", headerName: "Type", width: 150 },
    { field: "Status", headerName: "Status", width: 120 },
    {
      field: "Starttime",
      headerName: "Date",
      width: 150,
      valueFormatter: (params) => moment(params.value).format("DD - MM - YYYY"),
    },
  ];

  const rows = micsDrRequestList.map((item, index) => ({
    id: index + 1,
    Email: item.email,
    SSN: item.SSN,
    Doctor: item.doctor,
    Status: item.status,
    Starttime: item.starttime,
    Lab: item.lab,
    Type: item.type,
  }));

  if (loading) {
    return (
      <div className="sweet-loading mt-5">
        <ClipLoader color="#cad3e8" loading={true} css={override} size={100} />
      </div>
    );
  }

  return (
    <div
      style={{ height: 400, width: "100%" }}
      className="container d-flex align-items-center"
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        selectionModel={selectionModel}
        onSelectionModelChange={(newSelection) => {
          setSelectionModel(newSelection);
        }}
        className="mt-5"
        disableSelectionOnClick
      />
    </div>
  );
};

export default DrRequestList;
