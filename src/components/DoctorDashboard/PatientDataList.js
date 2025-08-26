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
} from "@mui/material";
import { PictureAsPdf, Image, Movie } from "@mui/icons-material";
import { Modal } from "react-bootstrap";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const StyledTableRow = styled(TableRow)({
  "& > *": {
    borderBottom: "unset",
  },
});

const IframeModal = ({ show, onHide, url, resultType }) => {
  const renderResultContent = () => {
    if (!url) return <Typography p={3}>No result available</Typography>;

    const iframeProps = {
      position: "fixed",
      src: `${url}#toolbar=0`,
      name: "imgbox",
      id: "imgbox",
      onContextMenu: (e) => e.preventDefault(),
      style: { border: "none" },
    };

    switch (resultType) {
      case "pdf":
        return <iframe {...iframeProps} width="100%" height="800px" />;
      case "image":
        return <iframe {...iframeProps} width="100%" height="800px" />;
      case "video":
        return <iframe {...iframeProps} width="100%" height="800px" />;
      default:
        return <iframe {...iframeProps} width="100%" height="800px" />;
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ maxWidth: "95vw", width: "100%" }}
    >
      <Modal.Header closeButton className="headerBg">
        <Modal.Title className="modal-title w-100 text-center">
          Test Result
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: 0, height: "80vh" }}>
        {renderResultContent()}
      </Modal.Body>
    </Modal>
  );
};

const TestRow = ({ row, data }) => {
  const [modalShow, setModalShow] = useState(false);

  const handleShowResult = () => {
    if (row.url) {
      setModalShow(true);
    } else {
      customToast("No result available for this test", "info");
    }
  };

  const getResultIcon = () => {
    if (!row.url) return <Typography variant="body2">N/A</Typography>;

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
      <StyledTableRow>
        {/* Display patient name if available */}
        <TableCell align="left">
          {row.name || data.patientDetails?.patientName || "N/A"}
        </TableCell>

        {/* Display SSN if available */}
        <TableCell align="left">
          {row.patientSSN || data.patientDetails?.patientSSN || "N/A"}
        </TableCell>

        {/* Display email if available */}
        <TableCell align="left">
          {row.patientEmail || data.patientDetails?.patientEmail || "N/A"}
        </TableCell>

        <TableCell align="left">{row.type}</TableCell>
        <TableCell align="left">{row.status}</TableCell>
        <TableCell align="left">
          <IconButton
            onClick={handleShowResult}
            disabled={!row.url}
            size="large"
          >
            {getResultIcon()}
          </IconButton>
        </TableCell>
      </StyledTableRow>

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
    fetchTestResults();
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

      if (response.status === 200) {
        setData({
          labDetails: response.data.labDetails,
          testList: response.data.testList,
          patientDetails: {
            patientSSN: response.data.patientSSN,
            patientEmail: response.data.patientEmail,
            patientName: response.data.patientName, // Added patientName if available
          },
        });
      } else {
        customToast("Something went wrong", "error");
      }
    } catch (error) {
      console.error("Error fetching test results:", error);
      customToast("Failed to load test results", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", p: 0, m: 0 }}>
      {isLoading && (
        <Box display="flex" justifyContent="center" p={4}>
          <Typography variant="h6">Loading results...</Typography>
        </Box>
      )}

      {data.labDetails && (
        <Box
          sx={{
            mb: 4,
            p: 3,
            border: "1px solid #eee",
            borderRadius: 2,
            boxShadow: 1,
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Lab Details
          </Typography>
          <Box
            display="flex"
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gap={2}
          >
            <Typography>
              <strong>Name:</strong> {data.labDetails.name}
            </Typography>
            <Typography>
              <strong>Address:</strong> {data.labDetails.address}
            </Typography>
            <Typography>
              <strong>Email:</strong> {data.labDetails.email}
            </Typography>
            <Typography>
              <strong>Phone:</strong> {data.labDetails.phone}
            </Typography>
            <Typography>
              <strong>Status:</strong> {data.labDetails.status}
            </Typography>
            <Typography>
              <strong>Total Requests:</strong> {data.labDetails.totalRequests}
            </Typography>
            <Typography>
              <strong>Success Rate:</strong> {data.labDetails.successRate}%
            </Typography>
          </Box>
        </Box>
      )}

      {data.patientDetails && (
        <Box
          sx={{
            mb: 4,
            p: 3,
            border: "1px solid #eee",
            borderRadius: 2,
            boxShadow: 1,
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            Patient Details
          </Typography>
          <Box display="flex" gap={4}>
            {/* Display patient name if available */}
            {data.patientDetails.patientName && (
              <Typography>
                <strong>Name:</strong> {data.patientDetails.patientName}
              </Typography>
            )}
            <Typography>
              <strong>SSN:</strong> {data.patientDetails.patientSSN}
            </Typography>
            <Typography>
              <strong>Email:</strong> {data.patientDetails.patientEmail}
            </Typography>
          </Box>
        </Box>
      )}

      {data.testList.length > 0 ? (
        <Box
          sx={{
            border: "1px solid #eee",
            borderRadius: 2,
            boxShadow: 1,
            backgroundColor: "background.paper",
            overflow: "hidden",
          }}
        >
          <Typography variant="h5" sx={{ p: 3, fontWeight: "bold" }}>
            Test Results
          </Typography>
          <TableContainer>
            <Table aria-label="test results table" size="medium">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  {/* Updated table headers */}
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Patient Name
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    SSN
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Test Type
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Status
                  </TableCell>
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    Result
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.testList.map((row) => (
                  <TestRow key={row.testID} row={row} data={data} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        !isLoading && (
          <Box display="flex" justifyContent="center" p={4}>
            <Typography variant="h6">No test results found</Typography>
          </Box>
        )
      )}
    </Box>
  );
};

export default LabResultsTable;
