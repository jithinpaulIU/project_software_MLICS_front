import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { CustomToastComponent } from "../../customToast";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #cad3e8;
`;

const DrLabLists = () => {
  const [, setSelectionData] = useState([]);
  const mlicsLabList = useSelector((state) => state?.LabReducer?.mlicsLabList);

  const columns = [
    { field: "id", headerName: "#", width: 50 },
    { field: "Name", headerName: "Name", width: 225 },
    { field: "Address", headerName: "Address", width: 400 },
    { field: "Email", headerName: "Email", width: 225 },
    { field: "Phone", headerName: "Phone", width: 150 },
  ];

  // Create rows data
  const rows = mlicsLabList.map((LablistsItem, index) => ({
    id: index + 1,
    Name: LablistsItem.name || "N/A",
    Address: LablistsItem.address || "N/A",
    Phone: LablistsItem.mobileNo || LablistsItem.phone || "N/A",
    Email: LablistsItem.email || "N/A",
  }));

  const handleRowSelection = (selectionModel) => {
    const selectedRowData = rows.find((row) => row.id === selectionModel[0]);
    setSelectionData(selectedRowData);
  };

  if (mlicsLabList.length === 0) {
    return <Loader />;
  }

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
          onRowSelectionModelChange={handleRowSelection}
          className="mt-5"
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          disableRowSelectionOnClick
        />
        <CustomToastComponent />
      </div>
    </>
  );
};

const Loader = () => {
  const [loading] = useState(true);
  const [color] = useState("#cad3e8"); // Changed to a more visible color

  return (
    <div
      className="sweet-loading d-flex justify-content-center align-items-center"
      style={{ height: "400px" }}
    >
      <ClipLoader color={color} loading={loading} css={override} size={100} />
    </div>
  );
};

export default DrLabLists;
