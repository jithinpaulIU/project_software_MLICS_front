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

// Styles - Using styled API instead of makeStyles
const StyledTableRow = styled(TableRow)({
  "& > *": {
    borderBottom: "unset",
  },
});

// Components
const IframeModal = ({ show, onHide, TestId, LabId }) => {
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    if (TestId && LabId) {
      fetchTestResult();
    }
  }, [TestId, LabId]);

  const fetchTestResult = async () => {
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
        labid: LabId,
        testid: TestId,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL2}testResult`,
        body,
        config
      );

      if (response.status === 200) {
        setResultData(response.data);
      } else {
        customToast("Something went wrong", "error");
      }
    } catch (error) {
      console.error("Error fetching test result:", error);
      customToast("Failed to load test result", "error");
    }
  };

  const renderResultContent = () => {
    if (!resultData) return <p>Loading...</p>;

    const iframeProps = {
      position: "fixed",
      src: `${resultData.url}#toolbar=0`,
      name: "imgbox",
      id: "imgbox",
      onContextMenu: (e) => e.preventDefault(),
    };

    switch (resultData.resultType) {
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
    setModalShow(true);
  };

  const getResultIcon = () => {
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
        <TableCell align="left">{row.SSN}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.type}</TableCell>
        <TableCell align="left">{row.status}</TableCell>
        <TableCell align="left">
          <IconButton onClick={handleShowResult}>{getResultIcon()}</IconButton>
        </TableCell>
      </StyledTableRow>

      <IframeModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        TestId={row.id}
        LabId={row.lab}
      />
    </>
  );
};

const LabResultsTable = ({ labId, lab }) => {
  const [testResults, setTestResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTestList();
  }, [labId]);

  const fetchTestList = async () => {
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
      console.log("body", body);

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL2}testList`,
        body,
        config
      );

      if (response.status === 200) {
        setTestResults(response.data);
      } else {
        customToast("Something went wrong", "error");
      }
    } catch (error) {
      console.error("Error fetching test list:", error);
      customToast("Failed to load test results", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {testResults.length > 0 && (
        <TableContainer component={Paper}>
          <div className="container footerBg">
            <div className="d-flex justify-content-start pt-2 align-items-center">
              <h4>{lab}</h4>
            </div>
          </div>
          <Table aria-label="test results table">
            <TableHead>
              <TableRow>
                <TableCell align="left">SSN</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Test Done</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testResults.map((row) => (
                <TestRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
          <Divider />
        </TableContainer>
      )}
      {isLoading && <p>Loading results...</p>}
    </>
  );
};

export default LabResultsTable;
