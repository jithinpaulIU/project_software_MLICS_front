import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { CustomToastComponent } from "../../customToast";
import RequestList from "./RequestList";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";

import { FetchRequest } from "../../store/actions/fetchaction";

const Request = () => {
  const mlicsRequestList = useSelector(
    (state) => state.RequestReducer.mlicsRequestList
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
    dispatch(FetchRequest());
  }, [dispatch]);

  return (
    <div>
      <AdminHeader />
      <main id="main">
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Requests</h2>
            </div>
          </div>
        </section>

        <section className="inner-page nopadding"></section>

        <RequestList requests={mlicsRequestList} />
      </main>
      <AdminFooter />
      <a href="#top" className="back-to-top">
        <i className="icofont-simple-up" />
      </a>
      <CustomToastComponent />
    </div>
  );
};

export default Request;
