import * as actionTypes from "../actions/index";

const initialState = {
  mlicsDoctorList: [],
};

const DELETE_DOCTOR = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DOCTORLIST:
      return {
        ...state,
        mlicsDoctorList: action.mlicsDoctorLists,
      };

    case actionTypes.DELETE_DOCTOR:
      return {
        ...state,
        mlicsDoctorList: state.mlicsDoctorList.filter(
          (doctor) => doctor.id !== action.doctorId
        ),
      };
    default:
      return state;
  }
};

export default DELETE_DOCTOR;
