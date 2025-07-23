import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector, useDispatch } from "react-redux";
import { FetchDoctor } from "../../store/actions/fetchaction";
import { Box, Typography } from "@mui/material";
import UpdateDoctorModel from "./UpdateDoctor";
import { customToast } from "../../customToast";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #cad3e8;
`;

const DoctorList = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const mlicsDoctorList = useSelector(
    (state) => state.DoctorReducer.mlicsDoctorList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(FetchDoctor());
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const columns = [
    { field: "slno", headerName: "#", width: 90 },
    {
      field: "SSN",
      headerName: "SSN",
      width: 120,
      sortable: false,
    },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "Phone", headerName: "Phone", width: 150 },
    { field: "Email", headerName: "Email", width: 250 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleDelete(params.row.id)}
            color="error"
            aria-label="delete"
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setSelectedDoctor(params.row);
              setModalOpen(true);
            }}
            color="primary"
            aria-label="edit"
          >
            <EditOutlinedIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDelete = async (id) => {
    if (window.confirm("Delete doctor details?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        await axios.delete(`${process.env.REACT_APP_API_URL}doctor/${id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        customToast("Doctor Deleted", "success");
        dispatch(FetchDoctor());
      } catch (error) {
        console.error("Delete error:", error);
        customToast("Failed to delete doctor", "error");
      }
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="300px"
      >
        <ClipLoader
          color="#cad3e8"
          loading={loading}
          css={override}
          size={50}
        />
      </Box>
    );
  }

  if (!mlicsDoctorList?.length) {
    return (
      <Box textAlign="center" p={4}>
        <Typography variant="h6">No doctors found</Typography>
      </Box>
    );
  }

  const rows = mlicsDoctorList.map((doctor, index) => ({
    id: doctor.id,
    slno: index + 1,
    SSN: doctor.SSN,
    firstName: doctor.firstName,
    lastName: doctor.lastName,
    Phone: doctor.mobileNo,
    Email: doctor.email,
  }));

  return (
    <Box sx={{ height: 600, width: "100%", p: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onRowClick={(params) => setSelectedDoctor(params.row)}
        sx={{
          "& .MuiDataGrid-cell:hover": {
            cursor: "pointer",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
          },
        }}
      />

      <UpdateDoctorModel
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        doctorData={selectedDoctor}
        refreshData={() => dispatch(FetchDoctor())}
      />
    </Box>
  );
};

export default DoctorList;
