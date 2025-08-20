import React, { useState, useEffect } from "react";
import axios from "axios";
import { customToast } from "../../customToast";
import { Document, Page, pdfjs } from "react-pdf";
import { styled } from "@mui/material/styles";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Grid,
  Chip,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  PictureAsPdf,
  Image,
  Movie,
  Visibility,
  Person,
  Science,
  Assignment,
} from "@mui/icons-material";
import { Modal } from "react-bootstrap";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StatusChip = ({ status }) => {
  const getStatusColor = () => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Chip label={status || "Unknown"} color={getStatusColor()} size="small" />
  );
};

const IframeModal = ({ show, onHide, url, resultType }) => {
  const renderResultContent = () => {
    if (!url) return <Typography p={3}>No result available</Typography>;

    const iframeProps = {
      src: `${url}#toolbar=0`,
      style: {
        border: "none",
        width: "100%",
        height: "100%",
        minHeight: "600px",
      },
      onContextMenu: (e) => e.preventDefault(),
    };

    return <iframe {...iframeProps} />;
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="result-modal-title"
      centered
      style={{ maxWidth: "100vw", width: "100%" }}
    >
      <Modal.Header closeButton className="headerBg">
        <Modal.Title className="modal-title w-100 text-center">
          <Box display="flex" alignItems="center" justifyContent="center">
            <Visibility sx={{ mr: 1 }} />
            Test Result - {resultType?.toUpperCase()}
          </Box>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: 0, height: "80vh" }}>
        {renderResultContent()}
      </Modal.Body>
    </Modal>
  );
};

const TestRow = ({ row }) => {
  const [modalShow, setModalShow] = useState(false);

  const handleShowResult = () => {
    if (row.url) {
      setModalShow(true);
    } else {
      customToast("No result available for this test", "info");
    }
  };

  const getResultIcon = () => {
    if (!row.url) return null;

    switch (row.resultType) {
      case "pdf":
        return <PictureAsPdf color="error" />;
      case "image":
        return <Image color="primary" />;
      case "video":
        return <Movie color="secondary" />;
      default:
        return <PictureAsPdf color="error" />;
    }
  };

  return (
    <>
      <TableRow>
        {/* Display Name if available, otherwise show SSN */}
        <TableCell sx={{ fontWeight: "bold", minWidth: 150 }}>
          {row.name ? (
            <Box>
              <Typography variant="subtitle2" fontWeight="bold">
                {row.name}
              </Typography>
            </Box>
          ) : (
            <Typography variant="body2" fontWeight="medium">
              {row.ssn}
            </Typography>
          )}
        </TableCell>
        <TableCell sx={{ minWidth: 200 }}>
          <Typography variant="body2" noWrap title={row.ssn}>
            {row.ssn}
          </Typography>
        </TableCell>

        <TableCell sx={{ minWidth: 200 }}>
          <Typography variant="body2" noWrap title={row.email}>
            {row.email}
          </Typography>
        </TableCell>

        <TableCell sx={{ minWidth: 120 }}>
          <Typography variant="body2">{row.type}</Typography>
        </TableCell>

        <TableCell sx={{ minWidth: 120 }}>
          <StatusChip status={row.status} />
        </TableCell>

        <TableCell sx={{ minWidth: 100 }}>
          <IconButton
            onClick={handleShowResult}
            disabled={!row.url}
            size="medium"
            title={row.url ? "View Result" : "No result available"}
          >
            {getResultIcon() || (
              <Typography variant="caption" color="textSecondary">
                N/A
              </Typography>
            )}
          </IconButton>
        </TableCell>
      </TableRow>

      {row.url && (
        <IframeModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          url={row.url}
          resultType={row.resultType}
        />
      )}
    </>
  );
};

const LabResultsTable = ({ labId }) => {
  const [data, setData] = useState({
    labDetails: null,
    testList: [],
    patientDetails: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (labId) {
      fetchTestResults();
    }
  }, [labId]);

  const fetchTestResults = async () => {
    setIsLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem("user") || "{}");
      const userToken = JSON.parse(
        localStorage.getItem("patienttoken") || "{}"
      );

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type": "application/json",
        },
      };

      const body = {
        token: userToken.token,
        labid: labId,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL2}testList`,
        body,
        config
      );

      console.log("response888", response);

      if (response.status === 200) {
        setData({
          labDetails: response.data.labDetails,
          testList: response.data.testList,
          patientDetails: {
            patientSSN: response.data.patientSSN,
            patientEmail: response.data.patientEmail,
            patientName: response.data.patientName, // Added patientName
          },
        });
      } else {
        customToast("Failed to fetch test results", "error");
      }
    } catch (error) {
      console.error("Error fetching test results:", error);
      customToast(
        error.response?.data?.message || "Failed to load test results",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading results...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", p: 5 }}>
      {/* Lab Details Section */}
      {data.labDetails && (
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Science color="primary" sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h5" fontWeight="bold">
              Lab Information
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Lab Name
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {data.labDetails.name}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Address
              </Typography>
              <Typography variant="body1">{data.labDetails.address}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Contact Email
              </Typography>
              <Typography variant="body1">{data.labDetails.email}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Phone Number
              </Typography>
              <Typography variant="body1">{data.labDetails.phone}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Status
              </Typography>
              <StatusChip status={data.labDetails.status} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Performance Metrics
              </Typography>
              <Box display="flex" gap={3}>
                <Typography variant="body2">
                  Requests: {data.labDetails.totalRequests}
                </Typography>
                <Typography variant="body2">
                  Success: {data.labDetails.successRate}%
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Patient Details Section */}
      {data.patientDetails && (
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Person color="primary" sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h5" fontWeight="bold">
              Patient Information
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            {/* Display Name if available */}
            {data.patientDetails.patientName && (
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Patient Name
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {data.patientDetails.patientName}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Social Security Number
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {data.patientDetails.patientSSN}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" color="textSecondary">
                Email Address
              </Typography>
              <Typography variant="body1">
                {data.patientDetails.patientEmail}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Test Results Section */}
      {data.testList.length > 0 ? (
        <Paper elevation={2} sx={{ borderRadius: 1, overflow: "hidden" }}>
          <Box sx={{ p: 2, backgroundColor: "primary.main", color: "white" }}>
            <Box display="flex" alignItems="center">
              <Assignment sx={{ mr: 2 }} />
              <Typography variant="h5" fontWeight="bold">
                Test Results ({data.testList.length})
              </Typography>
            </Box>
          </Box>
          <TableContainer>
            <Table aria-label="test results table" size="medium">
              <TableHead>
                <TableRow sx={{ backgroundColor: "grey.100" }}>
                  <TableCell sx={{ fontWeight: "bold", minWidth: 150 }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", minWidth: 150 }}>
                    SSN
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", minWidth: 200 }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", minWidth: 120 }}>
                    Test Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", minWidth: 120 }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", minWidth: 100 }}>
                    Result
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.testList.map((row) => (
                  <TestRow key={row.testID || Math.random()} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        !isLoading && (
          <Paper
            elevation={2}
            sx={{ p: 4, textAlign: "center", borderRadius: 2 }}
          >
            <Assignment color="disabled" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h6" color="textSecondary">
              No test results found
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              There are no test results available for the selected criteria.
            </Typography>
          </Paper>
        )
      )}
    </Box>
  );
};

export default LabResultsTable;
