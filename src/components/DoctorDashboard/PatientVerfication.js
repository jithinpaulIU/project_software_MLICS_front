import { useState, Fragment } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import Modal from "react-bootstrap/Modal";
import OTPInput from "otp-input-react";

const PatientVerification = () => {
  const [modalShow, setModalShow] = useState(false);
  const [ssnValue, setSsnValue] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("user"));

  const validate = async (fields) => {
    setSsnValue(fields.ssn);
    setPatientEmail(fields.email);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL2}validateuseremail`,
        {
          email: fields.email,
          SSN: fields.ssn,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setModalShow(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ boxShadow: 3 }}>
      <CssBaseline />
      <div
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <center>
          <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
            <VerifiedUserOutlinedIcon />
          </Avatar>
          <h5>Verify Patient</h5>
        </center>

        <Formik
          initialValues={{
            email: "",
            ssn: "",
          }}
          validationSchema={Yup.object().shape({
            ssn: Yup.string()
              .min(9, "Valid SSN is Required")
              .max(9, "Valid SSN is Required")
              .required("SSN is required"),
            email: Yup.string()
              .email("Must be a valid email")
              .required("Email is required"),
          })}
          onSubmit={validate}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  type="text"
                  className={`form-control${
                    errors.email && touched.email ? " is-invalid" : ""
                  }`}
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
                  className={`form-control${
                    errors.ssn && touched.ssn ? " is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  name="ssn"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group" align="center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#1977cc",
                    color: "#FFFFFF",
                    borderRadius: "50px",
                    padding: "7px 20px",
                    mt: 3,
                    mb: 2,
                    textTransform: "none",
                  }}
                >
                  Validate
                </Button>
              </div>
            </Form>
          )}
        </Formik>

        <OtpModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          ssnvalue={ssnValue}
          navigate={navigate}
          patientEmail={patientEmail}
        />
      </div>
    </Container>
  );
};

const OtpModal = ({ show, onHide, ssnvalue, navigate, patientEmail }) => {
  const [otpValue, setOtpValue] = useState("");
  const [otpMessage, setOtpMessage] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const verifyOtp = async () => {
    setOtpMessage(false);
    setOtpValue("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL2}authenticateuser`,
        {
          otp: otpValue,
          SSN: ssnvalue,
          email: patientEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response2", response);

      if (response.status === 200 && response?.data?.data?.BearerToken) {
        localStorage.setItem(
          "patienttoken",
          JSON.stringify({
            token: response.data.data.BearerToken,
          })
        );
        navigate("/drdashboard/patientTabs");
      } else {
        setOtpMessage(true);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpMessage(true);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="headerBg">
        <Modal.Title className="w-100 text-center">Enter OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container component="main" maxWidth="xs">
          <div
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <OTPInput
              value={otpValue}
              onChange={setOtpValue}
              autoFocus
              OTPLength={6}
              otpType="alphanumeric"
              disabled={false}
              secure
            />

            <Button
              variant="contained"
              sx={{
                alignItems: "center",
                backgroundColor: "#1977cc",
                color: "#FFFFFF",
                borderRadius: "50px",
                padding: "7px 20px",
                mt: 4,
              }}
              onClick={verifyOtp}
            >
              Verify
            </Button>

            {otpMessage && (
              <p style={{ color: "red", paddingTop: "5px" }}>Wrong OTP</p>
            )}
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default PatientVerification;
