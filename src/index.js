import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { thunk } from "redux-thunk";

// import reducer from "./store/reducers";
// import rootReducer from "./store/reducers/index";
import "bootstrap/dist/css/bootstrap.min.css";
import LabReducer from "./store/reducers/LabListReducers";
import DrLabListReducer from "./store/reducers/DrLabListReducer";
import RequestReducer from "./store/reducers/RequestReducer";
import DrRequestReducer from "./store/reducers/DrRequestReducer";
import DoctorReducer from "./store/reducers/DoctorReducer";
import DoctorUpdate from "./store/reducers/DoctorUpdate";
import FETCHREDUCER from "./store/reducers/FetchReducer";

const rootReducer = combineReducers({
  DoctorReducer,
  LabReducer,
  DrLabListReducer,
  RequestReducer,
  DrRequestReducer,
  DoctorUpdate,
  FETCHREDUCER,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

store.getState();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
