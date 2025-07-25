import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";

import { CustomToastComponent } from "../../customToast";

import DrFooter from "./DrFooter";
import DrHeader from "./DrHeader";
import DrRequestList from "./DrRequestList";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../store/actions/index";

const DrRequest = (props) => {
  let [reqList, setreqList] = useState([]);

  const micsDrRequestList = useSelector(
    (state) => state.DrRequestReducer.micsDrRequestList,
  );

  const dispatch = useDispatch();

  const fetchData = React.useCallback(async () => {
    let userInfo = localStorage.getItem("user");
    userInfo = JSON.parse(userInfo);
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL2}request`,
      headers: {
        Authorization: `Bearer ` + userInfo.token,
        "Content-Type": "application/json",
      },
    };
    await axios(config)
      .then((response) => {
        setreqList(response.data);

        dispatch({
          type: actionTypes.GET_DRREQUEST,
          micsDrRequestList: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  React.useEffect(() => {
    fetchData();
  }, []);

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
              <h2>Requests</h2>
            </div>
          </div>
        </section>
        {/* End Breadcrumbs Section */}
        <section className="inner-page  nopadding"></section>
        <DrRequestList DrRequestList={reqList} FetchData={fetchData} />
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

export default DrRequest;
