import React, { useState, useEffect } from "react";

import axios from "axios";

import { CustomToastComponent } from "../../customToast";
import RequestList from "./RequestList";

import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";

import { useSelector, useDispatch } from "react-redux";

// import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/index";
import { FetchRequest } from "../../store/actions/fetchaction";

const Request = () => {
  let [reqList, setreqList] = useState([]);

  const mlicsRequestList = useSelector(
    (state) => state.RequestReducer.mlicsRequestList,
  );

  const dispatch = useDispatch();

  // const fetchData = React.useCallback(async () => {
  //   let userInfo = localStorage.getItem("user");
  //   userInfo = JSON.parse(userInfo);
  //   var config = {
  //     method: "get",
  //     url: `${process.env.REACT_APP_API_URL}request`,
  //     headers: {
  //       Authorization: `Bearer ` + userInfo.token,
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   await axios(config)
  //     .then((response) => {
  //       setreqList(response.data);
  //       dispatch({
  //         type: actionTypes.GET_REQUESTLIST,
  //         requestList: response.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    const loadDoctor = async () => {
      dispatch(FetchRequest());
    };
    loadDoctor();
  }, [dispatch]);

  return (
    <div>
      {/* ======= Top Bar ======= */} {/* ======= Header ======= */}
      <AdminHeader />
      {/* End Header */}
      <main id="main">
        {/* ======= Breadcrumbs Section ======= */}
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Requests</h2>
            </div>
          </div>
        </section>
        {/* End Breadcrumbs Section */}
        <section className="inner-page  nopadding"></section>
        <RequestList />
      </main>
      {/* End #main */}
      {/* ======= Footer ======= */}
      <AdminFooter />
      {/* End Footer */}
      <a href="#top" className="back-to-top">
        <i className="icofont-simple-up" />
      </a>
      <CustomToastComponent />
    </div>
  );
};

export default Request;
