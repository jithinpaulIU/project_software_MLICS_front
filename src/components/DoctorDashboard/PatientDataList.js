import React, { useState, useEffect } from "react";
import axios from "axios";
import { customToast } from "../../customToast";
import { Document, Page, pdfjs } from "react-pdf";
import { styled } from "@mui/material/styles";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  PictureAsPdf,
  Image,
  Movie,
} from "@mui/icons-material";
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
    if (!url) return <p>No result available</p>;

    const iframeProps = {
      position: "fixed",
      src: `${url}#toolbar=0`,
      name: "imgbox",
      id: "imgbox",
      onContextMenu: (e) => e.preventDefault(),
    };

    switch (resultType) {
      case "pdf":
        return (
          <iframe {...iframeProps} width="775" height="650" scrolling="no" />
        );
      case "image":
        return (
          <iframe {...iframeProps} width="750" height="650" border="2px" />
        );
      case "video":
        return <iframe {...iframeProps} width="100%" height="100%" />;
      default:
        return (
          <iframe
            {...iframeProps}
            width="750"
            height="600"
            frameBorder="0"
            scrolling="no"
          />
        );
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
        <Modal.Title className="modal-title w-100 text-center">
          Result
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderResultContent()}</Modal.Body>
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
    if (!row.url) return <span>N/A</span>;

    switch (row.resultType) {
      case "pdf":
        return <PictureAsPdf />;
      case "image":
        return <Image />;
      case "video":
        return <Movie />;
      default:
        return <PictureAsPdf />;
    }
  };

  return (
    <>
      <StyledTableRow>
        <TableCell align="left">{row.patientSSN}</TableCell>
        <TableCell align="left">{row.patientEmail}</TableCell>
        <TableCell align="left">{row.type}</TableCell>
        <TableCell align="left">{row.status}</TableCell>
        <TableCell align="left">
          <IconButton onClick={handleShowResult} disabled={!row.url}>
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
    <Box sx={{ width: "100%" }}>
      {isLoading && <Typography>Loading results...</Typography>}

      {data.labDetails && (
        <Box sx={{ mb: 4, p: 1, border: "1px solid #ddd", borderRadius: 1 }}>
          <Typography variant="h5" gutterBottom>
            Lab Details
          </Typography>
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
      )}

      {data.patientDetails && (
        <Box sx={{ mb: 4, p: 2, border: "1px solid #ddd", borderRadius: 1 }}>
          <Typography variant="h5" gutterBottom>
            Patient Details
          </Typography>
          <Typography>
            <strong>SSN:</strong> {data.patientDetails.patientSSN}
          </Typography>
          <Typography>
            <strong>Email:</strong> {data.patientDetails.patientEmail}
          </Typography>
        </Box>
      )}

      {data.testList.length > 0 ? (
        <TableContainer component={Paper}>
          <Typography variant="h5" sx={{ p: 2 }}>
            Test Results
          </Typography>
          <Table aria-label="test results table">
            <TableHead>
              <TableRow>
                <TableCell align="left">SSN</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Test Type</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.testList.map((row) => (
                <TestRow key={row.testID} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        !isLoading && <Typography>No test results found</Typography>
      )}
    </Box>
  );
};

export default LabResultsTable;
