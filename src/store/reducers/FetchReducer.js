import * as actionTypes from "../actions/index";

import { FetchDoctor } from "../actions/fetchaction";

import { FetchLab } from "../actions/fetchaction";

import { FetchRequest } from "../actions/fetchaction";

const initialState = {
  fetchdoctor: [FetchDoctor], //all spots
  fetchlab: [FetchLab],
  fetchrequest: [FetchRequest],
};

const FETCHREDUCER = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FETCHDOCTOR:
      return { ...state, fetchdoctor: action.fetchdoctor };
    case actionTypes.GET_FETCHLAB:
      return { ...state, fetchdoctor: action.fetchdoctor };
    case actionTypes.GET_FETCHREQUEST:
      return { ...state, fetchrequest: action.fetchrequest };
    default:
      return state;
  }
};

export default FETCHREDUCER;
