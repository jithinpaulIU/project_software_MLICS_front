import * as actionTypes from "../../store/actions/index";

import axios from "axios";

export const FetchDoctor = () => {
  return async (dispatch) => {
    let loadedDoctor = [];

    let userInfo = localStorage.getItem("user");
    userInfo = JSON.parse(userInfo);
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}doctor`,
      headers: {
        Authorization: `Bearer ` + userInfo.token,
        "Content-Type": "application/json",
      },
    };

    const response = await axios(config)
      .then((response) => {
        // props.mlicsDoctorList(response.data, "ADD_DOCTOR");
        dispatch({
          type: actionTypes.SET_DOCTORLIST,
          mlicsDoctorLists: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const FetchLab = () => {
  return async (dispatch) => {
    let userInfo = localStorage.getItem("user");
    userInfo = JSON.parse(userInfo);
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}lab`,
      headers: {
        Authorization: `Bearer ` + userInfo.token,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((response) => {
        dispatch({
          type: actionTypes.GET_LABLIST,
          mlicsLabList: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const FetchRequest = () => {
  return async (dispatch) => {
    let userInfo = localStorage.getItem("user");
    userInfo = JSON.parse(userInfo);
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}request`,
      headers: {
        Authorization: `Bearer ` + userInfo.token,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((response) => {
        dispatch({
          type: actionTypes.GET_REQUESTLIST,
          requestList: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
