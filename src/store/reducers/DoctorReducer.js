import * as actionTypes from "../actions/index";

const initialState = {
  mlicsDoctorList: [],
};

const DoctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DOCTORLIST:
      return {
        ...state,
        mlicsDoctorList: action.mlicsDoctorLists,
        // mlicsDoctorList: [...state.mlicsDoctorList, action.doctorlsid],
      };

    default:
      return state;
  }
};

export default DoctorReducer;
