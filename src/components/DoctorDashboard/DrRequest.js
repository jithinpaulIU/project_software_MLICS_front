import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { CustomToastComponent } from "../../customToast";
import DrFooter from "./DrFooter";
import DrHeader from "./DrHeader";
import DrRequestList from "./DrRequestList";
import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../store/actions/index";

const DrRequest = (props) => {
  const [reqList, setReqList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const micsDrRequestList = useSelector(
    (state) => state.DrRequestReducer.micsDrRequestList
  );

  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const userInfo = JSON.parse(localStorage.getItem("user"));

      const config = {
        method: "get",
        url: `${process.env.REACT_APP_API_URL2}request`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);
      setReqList(response.data);

      dispatch({
        type: actionTypes.GET_DRREQUEST,
        micsDrRequestList: response.data,
      });
    } catch (err) {
      console.error("Error fetching request data:", err);
      setError(err.message || "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <DrHeader />

      <main id="main">
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Requests</h2>
            </div>
          </div>
        </section>

        <section className="inner-page nopadding">
          {isLoading && <p>Loading requests...</p>}
          {error && <p className="text-danger">{error}</p>}
          {!isLoading && !error && (
            <DrRequestList DrRequestList={reqList} FetchData={fetchData} />
          )}
        </section>
      </main>

      <DrFooter />

      <a href="#top" className="back-to-top">
        <i className="icofont-simple-up" />
      </a>

      <CustomToastComponent />
    </div>
  );
};

export default DrRequest;
