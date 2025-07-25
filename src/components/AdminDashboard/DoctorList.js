import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "axios";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { deleteDoctor } from "../../store/actions/fetchaction"; // Adjust the path if needed

import { useSelector, useDispatch } from "react-redux";
import { FetchDoctor } from "../../store/actions/fetchaction";
import { Box, Typography, useTheme } from "@mui/material";
import UpdateDoctorModel from "./UpdateDoctor";
import { customToast } from "../../customToast";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #cad3e8;
`;

const DoctorList = () => {
  const theme = useTheme();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const mlicsDoctorList = useSelector(
    (state) => state.DoctorReducer?.mlicsDoctorList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(FetchDoctor());
        console.log("mlicsDoctorList", mlicsDoctorList);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  const columns = [
    {
      field: "slno",
      headerName: "#",
      width: 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "SSN",
      headerName: "SSN",
      width: 150,
      sortable: false,
      headerAlign: "center",
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "Phone",
      headerName: "Phone",
      width: 180,
      headerAlign: "center",
    },
    {
      field: "Email",
      headerName: "Email",
      width: 250,
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(params.row.id);
            }}
            color="error"
            aria-label="delete"
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setSelectedDoctor(params.row);
              setModalOpen(true);
            }}
            color="primary"
            aria-label="edit"
            size="small"
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Delete doctor details?")) {
      dispatch(deleteDoctor(id))
        .then(() => {
          customToast("Doctor Deleted", "success");
        })
        .catch(() => {
          customToast("Failed to delete doctor", "error");
        });
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
    SSN: doctor.ssn,
    firstName: doctor.first_name,
    lastName: doctor.last_name,
    Phone: doctor.country_code + " - " + doctor.phone,
    Email: doctor.email,
    username: doctor.username,
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "auto",
        maxWidth: "calc(100vw - 64px)",
        width: "auto",
        mx: "auto",
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
        [theme.breakpoints.up("lg")]: {
          maxWidth: 1300,
        },
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Doctor List
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[10]}
          onRowClick={(params) => setSelectedDoctor(params.row)}
          sx={{
            border: "none",
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid rgba(224, 224, 224, 0.5)",
              display: "flex",
              alignItems: "center",
            },
            "& .MuiDataGrid-cell:hover": {
              cursor: "pointer",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.grey[100],
              borderBottom: `2px solid ${theme.palette.grey[300]}`,
              borderRadius: 0,
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
            },
            "& .MuiDataGrid-virtualScroller": {
              marginTop: "0!important",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: `1px solid ${theme.palette.grey[300]}`,
            },
          }}
          componentsProps={{
            pagination: {
              sx: {
                "& .MuiTablePagination-displayedRows": {
                  fontSize: "0.875rem",
                },
              },
            },
          }}
        />
      </Box>

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
