import * as actionTypes from "../actions/index";

const initialState = {
  mlicsDrRequestList: [],
};

const DrRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DRREQUEST:
      return {
        ...state,
        mlicsDrRequestList: action.mlicsDrRequestList,
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

export default DrRequestReducer;
