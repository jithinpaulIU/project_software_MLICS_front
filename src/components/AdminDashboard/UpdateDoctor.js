import React, { useState } from "react";

import axios from "axios";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { customToast } from "../../customToast";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

import Container from "@material-ui/core/Container";

import { Modal } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { useSelector, useDispatch } from "react-redux";
import * as actionTypes from "../../store/actions/index";
import { FetchDoctor } from "../../store/actions/fetchaction";

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

const UpdateDoctorModel = (props) => {
  //   const [loader, setloader] = useState(false);
  const [value, setValue] = useState();
  const [, setModalShow] = useState(props.onHide);

  const dispatch = useDispatch();

  const mlicsSelectedDoctor = useSelector(
    (state) => state.DoctorUpdate.mlicsSelectedDoctor,
  );
  let userInfo = localStorage.getItem("user");
  userInfo = JSON.parse(userInfo);

  const updateDoctor = async (fields) => {
    // setloader(true);
    let body = {
      firstName: fields.firstName,
      lastName: fields.lastName,
      email: fields.email,
      mobileNo: value,
      password: fields.password,
      SSN: fields.ssn,
    };

    //

    var config = {
      method: "put",
      url: `${process.env.REACT_APP_API_URL}doctor/` + mlicsSelectedDoctor.id,
      headers: {
        Authorization: `Bearer ` + userInfo.token,
        "Content-Type": "application/json",
      },
      data: body,
    };
    //

    await axios(config)
      .then((res) => {
        if ((res.status = 200)) {
          customToast("Doctor Updated", "success");
          dispatch(FetchDoctor());
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
          Update Doctor
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={styles.paper}>
            {""}
            <Formik
              initialValues={{
                firstName: mlicsSelectedDoctor.firstName,
                lastName: mlicsSelectedDoctor.lastName,
                PhoneInput: mlicsSelectedDoctor.Phone,
                email: mlicsSelectedDoctor.Email,
                password: "",
                ssn: mlicsSelectedDoctor.SSN,
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string().required("First Name is required"),
                lastName: Yup.string().required("Last Name is required"),
                ssn: Yup.string().required("SSN is required"),

                email: Yup.string()
                  .email("Must be a valid mail")
                  .required("Email is required"),
              })}
              onSubmit={(fields) => {
                updateDoctor(fields);
              }}
            >
              {({ errors, status, touched }) => (
                <Form ncols={["col-md-6", "col-md-6"]}>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <Field
                      name="firstName"
                      type="text"
                      className={
                        "form-control" +
                        (errors.firstName && touched.firstName
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                      name="lastName"
                      type="text"
                      className={
                        "form-control" +
                        (errors.lastName && touched.lastName
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="lastName"
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
                    <label htmlFor="ssn">SSN</label>
                    <Field
                      name="ssn"
                      type="text"
                      className={
                        "form-control" +
                        (errors.ssn && touched.ssn ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="ssn"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phonenumber">Phone Number</label>
                    <PhoneInput
                      defaultCountry="US"
                      value={mlicsSelectedDoctor.Phone}
                      onChange={setValue}
                    />
                  </div>

                  <div className="form-group" align="center" color="primary">
                    <Button type="submit" className="modal-btn">
                      Update Doctor
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
};

export default UpdateDoctorModel;
