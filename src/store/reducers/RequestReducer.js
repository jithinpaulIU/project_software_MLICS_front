import * as actionTypes from "../actions/index";

const initialState = {
  mlicsRequestList: [],
};

const RequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_REQUESTLIST:
      return {
        ...state,
        mlicsRequestList: action.requestList,
        // mlicsDoctorList: [...state.mlicsDoctorList, action.doctorlsid],
      };
    // case actionTypes.DELETE_DOCTOR:
    //   return {
    //     ...state,
    //     mlicsDoctorList: state.mlicsDoctorList.filter(
    //       (doctorls) => doctorls !== action.doctorlsid,
    //     ),
    //   };
    default:
      return state;
  }
};

export default RequestReducer;
