import React, { useState, useEffect } from "react";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { customToast, CustomToastComponent } from "../../customToast";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Modal } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import LabList from "./LabList";
import { useSelector, useDispatch } from "react-redux";
import { FetchLab } from "../../store/actions/fetchaction";

const Labs = () => {
  const mlicsLabList = useSelector((state) => state.LabReducer.mlicsLabList);
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [listofLabs, setlistofLabs] = useState([]);

  useEffect(() => {
    const loadLab = async () => {
      console.log("hello lab");
      dispatch(FetchLab());
    };
    loadLab();
  }, [dispatch]);

  return (
    <div>
      <AdminHeader />
      <main id="main">
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Lab</h2>
            </div>
          </div>
        </section>

        <section className="inner-page nopadding">
          <div className="container">
            <IconButton
              variant="primary"
              className="d-flex justify-content-end icons"
              onClick={() => setModalShow(true)}
              color="primary"
              size="large"
            >
              <AddIcon />
            </IconButton>

            <AddLabModal show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        </section>

        <LabList />
      </main>

      <AdminFooter />

      <a href="#top" className="back-to-top">
        <i className="icofont-simple-up" />
      </a>

      <CustomToastComponent />
    </div>
  );
};

function AddLabModal(props) {
  const [phoneValue, setPhoneValue] = useState();
  const dispatch = useDispatch();

  const userInfo = JSON.parse(localStorage.getItem("user"));

  const addLab = async (fields) => {
    const body = {
      name: fields.name,
      address: fields.address,
      email: fields.email,
      mobileNo: phoneValue,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}lab`,
        body,
        config
      );
      if (res.status === 200) {
        customToast("Lab added", "success");
        dispatch(FetchLab());
        props.onHide();
      }
    } catch (err) {
      console.error(err);
      customToast(
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
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
          <Formik
            initialValues={{
              name: "",
              address: "",
              email: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is required"),
              address: Yup.string().required("Address is required"),
              email: Yup.string()
                .email("Must be a valid email")
                .required("Email is required"),
            })}
            onSubmit={addLab}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <Field
                    name="name"
                    type="text"
                    className={`form-control ${
                      errors.name && touched.name ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <Field
                    name="address"
                    type="text"
                    className={`form-control ${
                      errors.address && touched.address ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className={`form-control ${
                      errors.email && touched.email ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="phonenumber" className="form-label">
                    Phone Number
                  </label>
                  <PhoneInput
                    defaultCountry="US"
                    value={phoneValue}
                    onChange={setPhoneValue}
                    className={`form-control ${
                      !phoneValue ? "is-invalid" : ""
                    }`}
                  />
                  {!phoneValue && (
                    <div className="invalid-feedback">
                      Phone number is required
                    </div>
                  )}
                </div>

                <div className="form-group text-center mt-4">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Add Lab
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default Labs;
