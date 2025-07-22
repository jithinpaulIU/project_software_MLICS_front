import React, { useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { FetchLab } from "../../store/actions/fetchaction";
import { CustomToastComponent, customToast } from "../../customToast";
import UpdateLabModel from "./UpdateLab";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #cad3e8;
`;

const LabList = () => {
  const [selectionData, setSelectionData] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const mlicsLabList = useSelector((state) => state.LabReducer.mlicsLabList);
  const dispatch = useDispatch();

  const columns = [
    { field: "slNo", headerName: "#", width: 90 },
    { field: "Name", headerName: "Lab Name", width: 180, flex: 1 },
    { field: "Address", headerName: "Address", width: 340, flex: 1.5 },
    { field: "Email", headerName: "Email", width: 220, flex: 1 },
    { field: "Phone", headerName: "Phone", width: 150, flex: 1 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => deleteLab(params.id)}
          label="Delete"
        />,
        <GridActionsCellItem
          icon={<EditOutlinedIcon />}
          onClick={() => {
            setSelectionData(params.row);
            setModalShow(true);
          }}
          label="Edit"
        />,
      ],
    },
  ];

  const rows = mlicsLabList.map((LablistsItem, index) => ({
    id: LablistsItem.id,
    slNo: index + 1,
    Name: LablistsItem.name,
    Address: LablistsItem.address,
    Phone: LablistsItem.mobileNo,
    Email: LablistsItem.email,
  }));

  const deleteLab = async (id) => {
    const answer = window.confirm("Delete Lab details?");
    if (!answer) return;

    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
      
      await axios.delete(`${process.env.REACT_APP_API_URL}lab/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      });

      customToast("Lab Deleted Successfully", "success");
      dispatch(FetchLab());
    } catch (error) {
      console.error("Error deleting lab:", error);
      customToast("Error deleting lab", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <ClipLoader loading={true} css={override} size={50} />
      </Box>
    );
  }

  return (
    <Box sx={{ height: 400, width: "100%", mt: 4 }}>
      {mlicsLabList.length > 0 ? (
        <>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            onRowClick={(params) => setSelectionData(params.row)}
            sx={{
              "& .MuiDataGrid-cell": {
                cursor: "pointer",
              },
            }}
          />
          <UpdateLabModel
            open={modalShow}
            onClose={() => setModalShow(false)}
            dataToUpdate={selectionData}
            onSuccess={() => dispatch(FetchLab())}
          />
          <CustomToastComponent />
        </>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <ClipLoader loading={true} css={override} size={50} />
        </Box>
      )}
    </Box>
  );
};

export default LabList;