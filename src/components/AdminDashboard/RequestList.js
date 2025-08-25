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
    { field: "PatientName", headerName: "PATIENT NAME", width: 150 },
    { field: "Doctor", headerName: "DOCTOR", width: 140 },
    {
      field: "Lab",
      headerName: "Lab",
      width: 120,
    },
    {
      field: "Type",
      headerName: "Type",
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
      width: 150,
    },
  ];

  // Flatten the data structure for the DataGrid
  const rows = mlicsRequestList.flatMap((patientGroup, groupIndex) => {
    return patientGroup.requests.map((request, requestIndex) => {
      const container = {};
      container.id = `${patientGroup.SSN}-${request.request_id}`;
      container.slno = groupIndex * 1000 + requestIndex + 1;
      container.Email = request.email;
      container.SSN = patientGroup.SSN;
      container.PatientName = patientGroup.patient_details?.name || "N/A";
      container.Doctor = `${request.doctor?.first_name || ""} ${
        request.doctor?.last_name || ""
      }`.trim();
      container.Lab = patientGroup.lab_test_details?.lab?.name || "N/A";
      container.Type = request.type;
      container.Status = patientGroup.lab_test_details?.status || "N/A";
      container.Date = moment(request.timestamp).format("DD - MM - YYYY");
      container.requestData = request; // Store full request data for selection
      container.patientData = patientGroup; // Store full patient data for selection
      return container;
    });
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
