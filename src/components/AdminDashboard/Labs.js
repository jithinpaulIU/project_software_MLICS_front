import React, { useState, useEffect } from "react";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { customToast, CustomToastComponent } from "../../customToast";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Modal } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import LabList from "./LabList";

import { useSelector, useDispatch } from "react-redux";

import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/index";
import { FetchLab } from "../../store/actions/fetchaction";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const Labs = (props) => {
  let mlicsLabList = useSelector((state) => state.LabReducer.mlicsLabList);

  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);
  let [listofLabs, setlistofLabs] = useState([]);

  // const fetchData = React.useCallback(async () => {
  //   let userInfo = localStorage.getItem("user");
  //   userInfo = JSON.parse(userInfo);
  //   var config = {
  //     method: "get",
  //     url: `${process.env.REACT_APP_API_URL}lab`,
  //     headers: {
  //       Authorization: `Bearer ` + userInfo.token,
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   await axios(config)
  //     .then((response) => {
  //       setlistofLabs(response.data);
  //       dispatch({
  //         type: actionTypes.GET_LABLIST,
  //         mlicsLabList: response.data,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // React.useEffect(() => {
  //   fetchData();
  // }, [props]);

  useEffect(() => {
    const loadLab = async () => {
      dispatch(FetchLab());
    };
    loadLab();
  }, [dispatch]);

  return (
    <div>
      {/* ======= Top Bar ======= */} {/* ======= Header ======= */}
      <AdminHeader />
      {/* End Header */}
      <main id="main">
        {/* ======= Breadcrumbs Section ======= */}
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Lab</h2>
            </div>
          </div>
        </section>
        {/* End Breadcrumbs Section */}
        <section className="inner-page nopadding">
          <div className="container">
            <>
              <IconButton
                variant="primary"
                className="d-flex justify-content-end icons"
                onClick={() => setModalShow(true)}
              >
                <AddIcon />
              </IconButton>

              <AddLabModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </>
          </div>
        </section>
        <LabList />
      </main>
      {/* End #main */}
      {/* ======= Footer ======= */}
      <AdminFooter />
      {/* End Footer */}
      <a href="#top" className="back-to-top">
        <i className="icofont-simple-up" />
      </a>
      <CustomToastComponent />
    </div>
  );
};

function AddLabModal(props) {
  //   const [loader, setloader] = useState(false);
  const [value, setValue] = useState();
  const [, setModalShow] = useState(props.onHide);
  const dispatch = useDispatch();

  let userInfo = localStorage.getItem("user");
  userInfo = JSON.parse(userInfo);

  const addLab = async (fields) => {
    // setloader(true);
    let body = {
      name: fields.name,
      address: fields.address,
      email: fields.email,
      mobileNo: value,
    };
    let config = {
      headers: {
        Authorization: `Bearer ` + userInfo.token,
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(`${process.env.REACT_APP_API_URL}lab`, body, config)
      .then((res) => {
        if ((res.status = 200)) {
          customToast("Lab added", "success");
          dispatch(FetchLab());
          setModalShow(props.onHide);
        } else {
          customToast("Something went Wrong", "error");
        }
      })
      .catch((err) => {
        console.log(err);
        customToast("Email already taken", "error");
      });
  };

  return (
    <Modal
      {...props}
      size="medium"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="headerBg">
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="modal-title w-100 text-center"
        >
          Add Lab
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={styles.paper}>
            {""}
            <Formik
              initialValues={{
                name: "",
                address: "",
                email: "",
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("First Name is required"),
                address: Yup.string().required("Last Name is required"),
                email: Yup.string()
                  .email("Must be a valid mail")
                  .required("Email is required"),
              })}
              onSubmit={(fields) => {
                addLab(fields);
              }}
            >
              {({ errors, status, touched }) => (
                <Form ncols={["col-md-6", "col-md-6"]}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Field
                      name="name"
                      type="text"
                      className={
                        "form-control" +
                        (errors.name && touched.name ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <Field
                      name="address"
                      type="text"
                      className={
                        "form-control" +
                        (errors.address && touched.address ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      name="email"
                      type="text"
                      className={
                        "form-control" +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phonenumber">Phone Number</label>
                    <PhoneInput
                      defaultCountry="US"
                      value={value}
                      onChange={setValue}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group" align="center" color="primary">
                    <Button type="submit" className="modal-btn">
                      Add Lab
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default Labs;
