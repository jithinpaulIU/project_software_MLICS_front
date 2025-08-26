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

  const mlicsDrRequestList = useSelector(
    (state) => state.DrRequestReducer.mlicsDrRequestList
  );

  const columns = [
    { field: "id", headerName: "#", width: 50 },
    { field: "Email", headerName: "Email", width: 210 },
    { field: "SSN", headerName: "SSN", width: 150 },
    { field: "PatientName", headerName: "Patient Name", width: 150 },
    { field: "Lab", headerName: "Lab", width: 200 },
    { field: "Type", headerName: "Type", width: 150 },
    { field: "Mobile", headerName: "Mobile", width: 150 },
    {
      field: "CreatedAt",
      headerName: "Date",
      width: 180,
      valueFormatter: (params) =>
        moment(params.value).format("DD - MM - YYYY HH:mm"),
    },
    { field: "RequestID", headerName: "Request ID", width: 100 },
  ];

  // Flatten the data structure to create rows from all requests
  const rows =
    mlicsDrRequestList?.flatMap((patientData, patientIndex) =>
      patientData.requests.map((request, requestIndex) => ({
        id: `${patientIndex + 1}-${requestIndex + 1}`,
        Email: request.email_patient,
        SSN: patientData.patient_ssn,
        PatientName: patientData.patient_details.name,
        Lab: patientData.lab_details.name,
        Type: request.type,
        Mobile: patientData.patient_details.mobile_no,
        CreatedAt: request.created_at,
        RequestID: request.request_id,
      }))
    ) || [];

  if (loading) {
    return (
      <div className="sweet-loading mt-5">
        <ClipLoader color="#cad3e8" loading={true} css={override} size={100} />
      </div>
    );
  }

  return (
    <div
      style={{ height: 600, width: "100%" }}
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
        autoHeight={false}
      />
    </div>
  );
};

export default DrRequestList;
