import * as actionTypes from "../../store/actions/index";

import axios from "axios";

export const FetchDoctor = () => {
  return async (dispatch) => {
    let loadedDoctor = [];

    let userInfo = localStorage.getItem("user");
    userInfo = JSON.parse(userInfo);
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}doctors`,
      headers: {
        Authorization: `Bearer ` + userInfo.token,
        "Content-Type": "application/json",
      },
    };

    const response = await axios(config)
      .then((response) => {
        console.log(response);
        // props.mlicsDoctorList(response.data, "ADD_DOCTOR");
        dispatch({
          type: actionTypes.SET_DOCTORLIST,
          mlicsDoctorLists: response.data.data,
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
      url: `${process.env.REACT_APP_API_URL}labs`,
      headers: {
        Authorization: `Bearer ` + userInfo.token,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((response) => {
        dispatch({
          type: actionTypes.GET_LABLIST,
          mlicsLabList: response.data.data,
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

export const deleteDoctor = (id) => {
  return async (dispatch) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user"));

      await axios.delete(`${process.env.REACT_APP_API_URL}drdelete`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
        data: {
          id,
        },
      });

      dispatch({
        type: actionTypes.DELETE_DOCTOR,
        doctorId: id,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addDoctor = (doctorData) => async (dispatch) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("user"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}addDoctor`,
      doctorData,
      config
    );

    if (response.status === 200) {
      dispatch(FetchDoctor()); // Refetch doctor list after adding
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDoctor = (id, updatedData) => {
  return async (dispatch) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user"));

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}drupdate/${id}`,
        updatedData,
        config
      );

      if (response.status === 200) {
        dispatch({
          type: actionTypes.UPDATE_DOCTOR,
          updatedDoctor: response.data.data,
        });

        // Optional: Refresh full list
        dispatch(FetchDoctor());
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };
};
