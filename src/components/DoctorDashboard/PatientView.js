import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";

import DrFooter from "./DrFooter";
import DrHeader from "./DrHeader";
import PatientDataList from "./PatientDataList";

import { customToast, CustomToastComponent } from "../../customToast";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const PatientViews = () => {
  const [listofLabs, setListofLabs] = useState([]);
  const [testList, setTestList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedLabs, setSelectedLabs] = useState([]);
  const [options, setOptions] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const config = {
        method: "get",
        url: `${process.env.REACT_APP_API_URL2}labs`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios(config);
      console.log("response.data", response.data);
      setListofLabs(response?.data?.data);

      const selectOptions = response.data.data.map((lab, index) => ({
        id: index + 1,
        label: lab.name,
        value: lab.id,
      }));

      setOptions(selectOptions);
    } catch (error) {
      console.error("Error fetching lab data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <DrHeader />
      <main id="main">
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Patient Details</h2>
              <Link to="/drdashboard" className="nav-link">
                <ArrowBackIcon />
              </Link>
            </div>
          </div>
        </section>

        <div className="container mt-5 pl-0 d-flex row justify-content-center">
          <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
            className="noBorder col-md-6"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelectedLabs(selected)}
            className="modal-btn ml-2"
          >
            View Results
          </Button>
        </div>

        <div className="container">
          <Grid container spacing={3}>
            {selectedLabs.length > 0 ? (
              selectedLabs.map((item) => (
                <Grid item xs={12} key={item.value}>
                  <PatientDataList labId={item.value} lab={item.label} />
                </Grid>
              ))
            ) : (
              <p>No lab selected.</p>
            )}
          </Grid>
        </div>
      </main>

      <DrFooter />

      <a href="#top" className="back-to-top">
        <i className="icofont-simple-up" />
      </a>
      <CustomToastComponent />
    </div>
  );
};

export default PatientViews;
