import * as actionTypes from "../actions/index";

const initialState = {
  mlicsDrLabList: [],
};

const DrLabListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LABLIST:
      return {
        ...state,
        mlicsDrLabList: action.mlicsDrLabList,
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

export default DrLabListReducer;
