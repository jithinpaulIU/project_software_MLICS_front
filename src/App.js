import React from "react";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";
import LoginWithNavigate from "./components/HomePage/Login";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ProgressBar } from "react-fetch-progressbar";

import  ProtectiveRoute  from "./Proute";
// import { ProtectiveRoute1 } from "./ProtectedRoute1";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AddDoctor from "./components/AdminDashboard/AddDoctor";
// import ContactUS from "./components/DoctorDashboard/ContactUs";
// import Labs from "./components/AdminDashboard/Labs";
// import Request from "./components/AdminDashboard/Request";

// import DrDashboard from "./components/DoctorDashboard/DrDashboard";
// import DrLabs from "./components/DoctorDashboard/DrLabs";Proute
// import DrRequest from "./components/DoctorDashboard/DrRequest";
// import Patienttabs from "./components/DoctorDashboard/PatientTabs";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ProgressBar style={{ position: "fixed", top: 0 }} />
        <Routes>
          {/* Protected Admin Routes */}
          <Route
            path="/admindashboard/"
            element={
              <ProtectiveRoute>
                <AppContainer />
              </ProtectiveRoute>
            }
          />

          {/* Protected Doctor Routes */}
          {/* <Route
            path="/drdashboard/*"
            element={
              <ProtectiveRoute1>
                <DrContainer />
              </ProtectiveRoute1>
            }
          /> */}

          {/* Public Routes */}
          <Route path="/*" element={<DefaultContainer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const DefaultContainer = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginWithNavigate />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

// const DrContainer = () => (
  // <Routes>
    /* <Route path="/" element={<DrDashboard />} />
    <Route path="/contactus" element={<ContactUS />} />
    <Route path="/drlabs" element={<DrLabs />} />
    <Route path="/drrequest" element={<DrRequest />} />
    <Route path="/patientTabs" element={<Patienttabs />} />
    <Route path="*" element={<Navigate to="/drdashboard" replace />} /> */
//   </Routes>
// );

const AppContainer = () => (
 <div className="App">
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/add_doctor" element={<AddDoctor />} />
      {/* <Route path="/labs" element={<Labs />} />
      <Route path="/request" element={<Request />} /> */}
      <Route path="*" element={<Navigate to="/admindashboard" replace />} />
    </Routes>
  </div>
 
);

export default App;