import React, { useEffect, useState } from "react";
import DrFooter from "./DrFooter";
import DrHeader from "./DrHeader";

import axios from "axios";
import { CustomToastComponent } from "../../customToast";
import DrLabLists from "./DrLabLists";
import { useSelector, useDispatch } from "react-redux";

import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/index";
import { FetchLab } from "../../store/actions/fetchaction";

// const styles = (theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// });

const DrLabs = (props) => {
  let [listofLabs, setlistofLabs] = useState([]);

  // let micsLabList = useSelector((state) => state.LabReducer.micsLabList);

  // console.log("DRLAB", micsLabList);
  const dispatch = useDispatch();

  // const fetchData = React.useCallback(async () => {
  //   let userInfo = localStorage.getItem("user");
  //   userInfo = JSON.parse(userInfo);
  //   var config = {
  //     method: "get",
  //     url: `${process.env.REACT_APP_API_URL}lab`,
  //     headers: {
  //       Authorization: `Bearer ` + userInfo.token,
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   await axios(config)
  //     .then((response) => {
  //       setlistofLabs(response.data);
  //       dispatch({
  //         type: actionTypes.GET_LABLIST,
  //         micsDrLabList: response.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  // useEffect(() => {
  //   fetchData();
  // }, [props]);

  useEffect(() => {
    const loadLab = async () => {
      dispatch(FetchLab());
    };
    loadLab();
  }, [dispatch]);

  return (
    <div>
      {/* ======= Top Bar ======= */} {/* ======= Header ======= */}
      <DrHeader />
      {/* End Header */}
      <main id="main">
        {/* ======= Breadcrumbs Section ======= */}
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Lab</h2>
            </div>
          </div>
        </section>

        <DrLabLists />
      </main>
      {/* End #main */}
      {/* ======= Footer ======= */}
      <DrFooter />
      {/* End Footer */}
      <a href="#top" className="back-to-top">
        <i className="icofont-simple-up" />
      </a>
      <CustomToastComponent />
    </div>
  );
};

export default DrLabs;
