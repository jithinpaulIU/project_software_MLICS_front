import * as actionTypes from "../actions/index";

const initialState = {
  mlicsSelectedDoctor: [],
};

const DoctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_DOCTORLIST:
      return {
        state,
        mlicsSelectedDoctor: action.mlicsSelectedDoctor,
        // mlicsDoctorList: [...state.mlicsDoctorList, action.doctorlsid],
      };
    default:
      return state;
  }
};

export default DoctorReducer;
