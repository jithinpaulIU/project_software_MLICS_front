import React, { useState, useEffect } from "react";
import DrFooter from "./DrFooter";
import DrHeader from "./DrHeader";
import { Link } from "react-router-dom";

import axios from "axios";
import MultiSelect from "react-multi-select-component";

// import DrLabLists from "./DrLabLists";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { customToast, CustomToastComponent } from "../../customToast";
import PatientDataList from "./PatientDataList";

// import Loaders from "./Loader";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const PatientViews = (props) => {
  let [listofLabs, setlistofLabs] = useState([]);
  //   const [value, setValue] = React.useState(listofLabs[0]);
  // const [labid, setlabid] = useState("");
  const [testList, settestList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedLabs, setSelectedLabs] = useState([]);
  const [options, setOptions] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchData = React.useCallback(async () => {
    let userInfo = localStorage.getItem("user");
    userInfo = JSON.parse(userInfo);
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}lab`,
      headers: {
        Authorization: `Bearer ` + userInfo.token,
        "Content-Type": "application/json",
      },
    };

    await axios(config)
      .then((response) => {
        setlistofLabs(response.data);
        const selectoptions = response.data.map((LablistsItem, index) => {
          const container = {};
          let count = index + 1;
          container.id = count;
          container.label = LablistsItem.name;
          container.value = LablistsItem.id;
          return container;
        });
        setOptions(selectoptions);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* ======= Top Bar ======= */} {/* ======= Header ======= */}
      <DrHeader />
      {/* End Header */}
      <main id="main">
        {/* ======= Breadcrumbs Section ======= */}
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Patient Details</h2>
              <Link to="/drdashboard" className="nav-link">
                <ArrowBackIcon></ArrowBackIcon>
              </Link>
            </div>
          </div>
        </section>
        <div className="container mt-5 pl-0 d-flex row justify-content-center">
          {" "}
          <MultiSelect
            options={options}
            value={selected}
            onChange={setSelected}
            labelledBy="Select"
            className="noBorder col-md-6"
          />
          <Button
            onClick={() => setSelectedLabs(selected)}
            className="modal-btn"
          >
            View Results
          </Button>
        </div>
        <div className="container my-2 d-flex justify-content-center"></div>

        <div className="container">
          <Grid container spacing={3}>
            {selectedLabs.length > 0 ? (
              selectedLabs.map((item, i) => {
                return (
                  <Grid
                    item
                    spacing={15}
                    justify="right"
                    alignItems="right"
                    xs={12}
                  >
                    <PatientDataList
                      labId={item.value}
                      lab={item.label}
                      key={item.value}
                    />
                  </Grid>
                );
              })
            ) : (
              <p> </p>
            )}
          </Grid>
        </div>
      </main>
      {/* End #main */}
      {/* ======= Footer ======= */}
      <DrFooter />
      {/* End Footer */}
      <a href="#top" className="back-to-top">
        <i className="icofont-simple-up" />
      </a>
      <CustomToastComponent />
    </div>
  );
};

export default PatientViews;
