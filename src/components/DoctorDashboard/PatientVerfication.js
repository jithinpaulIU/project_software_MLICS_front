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
import { CircularProgress, Typography } from "@mui/material";

const PatientVerification = () => {
  const [modalShow, setModalShow] = useState(false);
  const [ssnValue, setSsnValue] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const userInfo = JSON.parse(localStorage.getItem("user"));

  const validate = async (fields) => {
    setLoading(true);
    setErrorMessage("");
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
      setErrorMessage(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ boxShadow: 3, mt: 4, p: 3 }}
    >
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

        {errorMessage && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}

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
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  name="email"
                  type="email"
                  className={`form-control${
                    errors.email && touched.email ? " is-invalid" : ""
                  }`}
                  placeholder="Enter patient's email address"
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
                  placeholder="Enter patient's SSN"
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
                  disabled={loading}
                  sx={{
                    backgroundColor: "#1977cc",
                    color: "#FFFFFF",
                    borderRadius: "50px",
                    padding: "7px 20px",
                    mt: 3,
                    mb: 2,
                    textTransform: "none",
                    minWidth: "120px",
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : "Validate"}
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
  const [otpMessage, setOtpMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem("user"));

  // Resend OTP functionality
  const resendOtp = async () => {
    setResendLoading(true);
    setOtpMessage("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL2}validateuseremail`,
        {
          email: patientEmail,
          SSN: ssnvalue,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setOtpMessage("OTP sent successfully! Check your email.");
        setResendCooldown(60); // 60 seconds cooldown
        startCooldownTimer();
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setOtpMessage("Failed to resend OTP. Please try again.");
    } finally {
      setResendLoading(false);
    }
  };

  // Cooldown timer for resend OTP
  const startCooldownTimer = () => {
    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const verifyOtp = async () => {
    if (otpValue.length !== 6) {
      setOtpMessage("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setOtpMessage("");

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

      if (response.status === 200 && response?.data?.data?.BearerToken) {
        localStorage.setItem(
          "patienttoken",
          JSON.stringify({
            token: response.data.data.BearerToken,
          })
        );
        navigate("/drdashboard/patientTabs");
      } else {
        setOtpMessage("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpMessage(
        error.response?.data?.message ||
          "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
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
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Typography variant="body2" align="center">
              We've sent a 6-digit OTP to {patientEmail}
            </Typography>

            <OTPInput
              value={otpValue}
              onChange={setOtpValue}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              secure
              inputStyles={{
                width: "40px",
                height: "40px",
                margin: "0 5px",
                fontSize: "18px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />

            <Button
              variant="contained"
              disabled={loading || otpValue.length !== 6}
              sx={{
                backgroundColor: "#1977cc",
                color: "#FFFFFF",
                borderRadius: "50px",
                padding: "7px 20px",
                minWidth: "120px",
              }}
              onClick={verifyOtp}
            >
              {loading ? <CircularProgress size={24} /> : "Verify OTP"}
            </Button>

            <div style={{ textAlign: "center" }}>
              <Typography variant="body2" color="textSecondary">
                Didn't receive the OTP?
              </Typography>
              <Button
                variant="text"
                disabled={resendLoading || resendCooldown > 0}
                onClick={resendOtp}
                sx={{
                  textTransform: "none",
                  fontSize: "14px",
                }}
              >
                {resendLoading ? (
                  <CircularProgress size={16} />
                ) : resendCooldown > 0 ? (
                  `Resend in ${resendCooldown}s`
                ) : (
                  "Resend OTP"
                )}
              </Button>
            </div>

            {otpMessage && (
              <Typography
                color={otpMessage.includes("success") ? "success" : "error"}
                align="center"
                variant="body2"
              >
                {otpMessage}
              </Typography>
            )}
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default PatientVerification;
