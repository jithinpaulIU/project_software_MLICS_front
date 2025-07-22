import React, { useState, useEffect } from "react";
import { DataGrid, GridColumnsContainer } from "@material-ui/data-grid";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import axios from "axios";
import UpdateDoctorModel from "./UpdateDoctor";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { customToast, CustomToastComponent } from "../../customToast";

import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../store/actions/index";
import { FetchDoctor } from "../../store/actions/fetchaction";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #cad3e8;
`;

const DoctorList = (props) => {
  const [selectionData, setSelectionData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const mlicsDoctorList = useSelector(
    (state) => state.DoctorReducer.mlicsDoctorList,
  );

  const mlicsSelectedDoctor = useSelector(
    (state) => state.DoctorReducer.mlicsSelectedDoctor,
  );
  const dispatch = useDispatch();
  // console.log(mlicsSelectedDoctor);

  const columns = [
    { field: "slno", headerName: "#", width: 90 },
    {
      field: "SSN",
      headerName: "SSN",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 120,
    },
    { field: "firstName", headerName: "First name", width: 200 },
    { field: "lastName", headerName: "Last name", width: 150 },
    {
      field: "Phone",
      headerName: "Phone",
      type: "number",
      width: 150,
    },
    {
      field: "Email",
      headerName: "Email",
      // description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 250,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => deleteDoctor(params.row.id)}>
            <Delete />
          </IconButton>

          <IconButton
            variant="primary"
            className="d-flex justify-content-between align-items-center"
            onClick={() => setModalShow(true)}
          >
            <EditOutlinedIcon />
          </IconButton>

          <UpdateDoctorModel
            show={modalShow}
            onHide={() => setModalShow(false)}
            // UpdatedDocData={selectionData}
            // FetchData={props.FetchData}
          />
        </>
      ),
    },
  ];

  const deleteDoctor = async (id) => {
    console.log();
    var answer = window.confirm("Delete Doctor datails?");
    if (answer) {
      let userInfo = localStorage.getItem("user");
      userInfo = JSON.parse(userInfo);
      var config = {
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}doctor/` + id,
        headers: {
          Authorization: `Bearer ` + userInfo.token,
          "Content-Type": "application/json",
        },
      };
      await axios(config)
        .then(async (response) => {
          customToast("Doctor Deleted", "success");
          // props.FetchData();
          dispatch(FetchDoctor());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  if (mlicsDoctorList.length > 0 || "") {
    const rows = mlicsDoctorList.map((DoclistItem, index) => {
      const container = {};
      let count = index + 1;
      container.id = DoclistItem.id;

      container.slno = count;
      container.SSN = DoclistItem.SSN;
      container.lastName = DoclistItem.lastName;
      container.firstName = DoclistItem.firstName;
      container.Phone = DoclistItem.mobileNo;
      container.Email = DoclistItem.email;

      return container;
    });

    return (
      <React.Fragment>
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

              dispatch({
                type: actionTypes.UPDATE_DOCTORLIST,
                mlicsSelectedDoctor: e.data,
              });
            }}
          />

          <CustomToastComponent />
        </div>
      </React.Fragment>
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
      <ClipLoader color={color} loading={loading} css={override} size={150} />
    </div>
  );
}

export default DoctorList;
