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

    case actionTypes.DELETE_DOCTOR:
      return {
        ...state,
        mlicsDoctorList: state.mlicsDoctorList.filter(
          (doctor) => doctor.id !== action.doctorId
        ),
      };

    case actionTypes.UPDATE_DOCTOR:
      return {
        ...state,
        mlicsDoctorList: state.mlicsDoctorList.map((doctor) =>
          doctor.id === action.updatedDoctor.id ? action.updatedDoctor : doctor
        ),
      };

    case actionTypes.UPDATE_DOCTOR:
      return {
        ...state,
        mlicsDoctorList: state.mlicsDoctorList.map((doctor) =>
          doctor.id === action.updatedDoctor.id ? action.updatedDoctor : doctor
        ),
      };

    default:
      return state;
  }
};

export default DoctorReducer;
