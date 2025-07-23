import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { customToast, CustomToastComponent } from "../../customToast";
import { useDispatch } from "react-redux";
import { FetchDoctor } from "../../store/actions/fetchaction";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { parsePhoneNumberFromString } from "libphonenumber-js";

// MUI Components
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

// Components
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import DoctorList from "./DoctorList";

// Bootstrap Modal
import Modal from "react-bootstrap/Modal";
import { Height } from "@mui/icons-material";

const AddDoctor = () => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchDoctor());
  }, [dispatch]);

  return (
    <div>
      <AdminHeader />
      <main id="main">
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Doctors</h2>
              <IconButton
                color="primary"
                aria-label="add doctor"
                onClick={() => setModalShow(true)}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
        </section>

        <section className="inner-page nopadding">
          <div className="container">
            <AddDoctorModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              onDoctorAdded={() => dispatch(FetchDoctor())}
            />
          </div>
        </section>

        <DoctorList />
      </main>
      <AdminFooter />
      <CustomToastComponent />
    </div>
  );
};

const AddDoctorModal = ({ show, onHide, onDoctorAdded }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    ssn: "",
    role: "Doctor",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be at maximum of 12 characters")
      .required("Password is required"),
    ssn: Yup.string()
      .length(9, "SSN must be exactly 9 characters")
      .required("SSN is required"),
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      let countryCode = "";
      let phone = "";

      if (phoneNumber) {
        const parsedNumber = parsePhoneNumberFromString(phoneNumber);
        if (parsedNumber) {
          countryCode = `+${parsedNumber.countryCallingCode}`;
          phone = parsedNumber.nationalNumber;
        }
      }

      const body = {
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        password: values.password,
        SSN: values.ssn,
        countryCode,
        phone,
        role: values.role,
      };

      const config = {
        method: "post",
        url: `${process.env.REACT_APP_API_URL}addDoctor`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
        data: body,
      };

      const response = await axios(config);

      if (response.status === 200) {
        customToast("Doctor added successfully", "success");
        resetForm();
        onHide();
        onDoctorAdded();
      }
    } catch (error) {
      console.error("Error adding doctor:", error);
      customToast(
        error.response?.data?.message || "Something went wrong",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="add-doctor-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="modal-title w-100 text-center">
          Add Doctor
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <Field
                    name="firstName"
                    type="text"
                    className={`form-control ${
                      errors.firstName && touched.firstName ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <Field
                    name="lastName"
                    type="text"
                    className={`form-control ${
                      errors.lastName && touched.lastName ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <Field
                    name="username"
                    type="text"
                    className={`form-control ${
                      errors.username && touched.username ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-3">
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

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className={`form-control ${
                      errors.password && touched.password ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="ssn" className="form-label">
                    SSN
                  </label>
                  <Field
                    name="ssn"
                    type="text"
                    className={`form-control ${
                      errors.ssn && touched.ssn ? "is-invalid" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="ssn"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <div className="mb-3 ">
                  <label htmlFor="phoneNumber" className="form-label mb-0">
                    Phone Number
                  </label>
                  <div className="mb-3 d-flex align-items-center gap-2">
                    <div style={{ flex: "1", minWidth: 0 }}>
                      {" "}
                      {/* Prevents overflow */}
                      <PhoneInput
                        defaultCountry="DE"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        international
                        className="form-control"
                        style={{
                          display: "flex",
                          gap: "8px",
                          lineHeight: "1.5",
                        }} // Forces inline layout
                      />
                    </div>
                  </div>
                </div>

                <Field name="role" type="hidden" value="Doctor" />

                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding..." : "Add Doctor"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default AddDoctor;
