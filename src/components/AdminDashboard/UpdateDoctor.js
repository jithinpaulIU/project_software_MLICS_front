import React, { useState } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { customToast } from "../../customToast";

// MUI v5 Imports
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

// Phone Input
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { FetchDoctor } from "../../store/actions/fetchaction";

// Styled Components
const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  width: 400,
  maxWidth: "90%",
}));

const UpdateDoctorModel = ({ open, onClose }) => {
  const [phoneValue, setPhoneValue] = useState();
  const dispatch = useDispatch();

  const mlicsSelectedDoctor = useSelector(
    (state) => state.DoctorUpdate.mlicsSelectedDoctor
  );

  const userInfo = JSON.parse(localStorage.getItem("user"));

  const updateDoctor = async (fields) => {
    try {
      const body = {
        firstName: fields.firstName,
        lastName: fields.lastName,
        email: fields.email,
        mobileNo: phoneValue,
        password: fields.password,
        SSN: fields.ssn,
      };

      const config = {
        method: "put",
        url: `${process.env.REACT_APP_API_URL}doctor/${mlicsSelectedDoctor.id}`,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
        data: body,
      };

      const response = await axios(config);
      if (response.status === 200) {
        customToast("Doctor Updated", "success");
        dispatch(FetchDoctor());
        onClose();
      }
    } catch (err) {
      console.error(err);
      customToast(err.response?.data?.message || "Update failed", "error");
    }
  };

  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="update-doctor-modal"
    >
      <ModalContent>
        <Typography variant="h6" component="h2" align="center" gutterBottom>
          Update Doctor
        </Typography>

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{ mt: 2 }}>
            <Formik
              initialValues={{
                firstName: mlicsSelectedDoctor?.firstName || "",
                lastName: mlicsSelectedDoctor?.lastName || "",
                email: mlicsSelectedDoctor?.email || "",
                password: "",
                ssn: mlicsSelectedDoctor?.SSN || "",
              }}
              validationSchema={Yup.object().shape({
                firstName: Yup.string().required("First Name is required"),
                lastName: Yup.string().required("Last Name is required"),
                ssn: Yup.string().required("SSN is required"),
                email: Yup.string()
                  .email("Must be a valid email")
                  .required("Email is required"),
              })}
              onSubmit={updateDoctor}
            >
              {({ errors, touched }) => (
                <Form>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      First Name
                    </Typography>
                    <Field
                      name="firstName"
                      type="text"
                      fullWidth
                      variant="outlined"
                      error={Boolean(errors.firstName && touched.firstName)}
                      helperText={touched.firstName && errors.firstName}
                      as={TextField}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Last Name
                    </Typography>
                    <Field
                      name="lastName"
                      type="text"
                      fullWidth
                      variant="outlined"
                      error={Boolean(errors.lastName && touched.lastName)}
                      helperText={touched.lastName && errors.lastName}
                      as={TextField}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Email
                    </Typography>
                    <Field
                      name="email"
                      type="email"
                      fullWidth
                      variant="outlined"
                      error={Boolean(errors.email && touched.email)}
                      helperText={touched.email && errors.email}
                      as={TextField}
                    />
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      SSN
                    </Typography>
                    <Field
                      name="ssn"
                      type="text"
                      fullWidth
                      variant="outlined"
                      error={Boolean(errors.ssn && touched.ssn)}
                      helperText={touched.ssn && errors.ssn}
                      as={TextField}
                    />
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Phone Number
                    </Typography>
                    <PhoneInput
                      defaultCountry="US"
                      value={mlicsSelectedDoctor?.mobileNo || phoneValue}
                      onChange={setPhoneValue}
                      style={{ width: "100%" }}
                    />
                  </Box>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                  >
                    Update Doctor
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Container>
      </ModalContent>
    </StyledModal>
  );
};

export default UpdateDoctorModel;
