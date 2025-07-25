import React, { useState } from "react";

import axios from "axios";

import { customToast } from "../../customToast";

import "react-phone-number-input/style.css";
// import IconButton from "@material-ui/core/IconButton";
// import { MDBContainer, MDBIframe } from "mdbreact";

import { Document, Page, pdfjs } from "react-pdf";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Modal } from "react-bootstrap";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import ImageIcon from "@material-ui/icons/Image";
import MovieIcon from "@material-ui/icons/Movie";

// function MyApp() {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   return (
//     <div>
//       <Document
//         file="somefile.pdf"
//         onLoadSuccess={onDocumentLoadSuccess}
//       >
//         <Page pageNumber={pageNumber} />
//       </Document>
//       <p>Page {pageNumber} of {numPages}</p>
//     </div>
//   );
// }

import { NavLink } from "react-router-dom";
import { PDFObject } from "react-pdfobject";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const [getResult, setgetResult] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [labidprovide, setlabidprovide] = useState();
  const [testidprovide, settestidprovide] = useState();

  const onshowResult = (testid, labid) => {
    setlabidprovide(labid);
    settestidprovide(testid);
    setTimeout(() => {
      setModalShow(true);
    }, [500]);
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="left" component="th" scope="row">
          {row.SSN}
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          {row.email}
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          {row.type}
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          {row.status}
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          {/* <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => getTestResult(row.id, row.Lab)}
          > */}
          {/* <Button
            aria-label="expand row"
            size="small"
            onClick={() => getTestResult(row.id, row.Lab)}
          >
            View Result
          </Button> */}

          <>
            {/* <NavLink
              to="/drdashboard/patientTabs"
              variant="primary"
              // onClick={() => onshowResult(row)}
              onClick={() => onshowResult(row.id, row.Lab)}
            >

// { */}
            {(() => {
              switch (row.resultType) {
                case "pdf":
                  return (
                    <IconButton onClick={() => onshowResult(row.id, row.Lab)}>
                      <PictureAsPdfIcon />
                    </IconButton>
                  );

                case "image":
                  return (
                    <IconButton onClick={() => onshowResult(row.id, row.Lab)}>
                      <ImageIcon />
                    </IconButton>
                  );
                case "video":
                  return (
                    <IconButton onClick={() => onshowResult(row.id, row.Lab)}>
                      <MovieIcon />
                    </IconButton>
                  );
                default:
                  return (
                    <IconButton onClick={() => onshowResult(row.id, row.Lab)}>
                      <PictureAsPdfIcon />
                    </IconButton>
                  );
              }
            })()}
            {/* View Result
              {}
            </NavLink> */}
          </>
          {/* {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
          {/* </IconButton> */}
        </TableCell>
      </TableRow>

      <IframeModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        TestId={testidprovide}
        LabId={labidprovide}
      />
      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Result
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell align="right">Mobile</TableCell>
                    <TableCell align="right">Lab</TableCell>
                    <TableCell align="right">Test</TableCell>
                    <TableCell align="right">Result</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getResult
                    ? getResult.map((historyRow) => (
                        <TableRow key={historyRow.id}>
                          <TableCell key={historyRow.id}>
                            {historyRow.id}
                          </TableCell>

                          <TableCell>{historyRow.createdAt}</TableCell>

                          <TableCell align="right">
                            {historyRow.mobileNo}
                          </TableCell>
                          <TableCell align="right">{historyRow.lab}</TableCell>
                          <TableCell align="right">{historyRow.type}</TableCell>

                          <TableCell align="right">
                            <>
                              <NavLink
                                to="/drdashboard/patientTabs"
                                variant="primary"
                                onClick={() => setModalShow(true)}
                              >
                                View
                              </NavLink>

                              <IframeModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                URL={historyRow.url}
                                Type={historyRow.resultType}
                              />
                            </>
                          </TableCell>
                        </TableRow>
                      ))
                    : " "}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}

export default function LabList(props) {
  const [testResults, setTestResults] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [resultRows, setResultrows] = React.useState([]);
  React.useEffect(() => {
    getTestList();
  }, [props]);

  const getTestList = async () => {
    setLoader(true);

    let userInfo = localStorage.getItem("user");
    userInfo = JSON.parse(userInfo);
    let usertoken = localStorage.getItem("patienttoken");
    usertoken = JSON.parse(usertoken);
    // console.log("userToken", usertoken.token, labid);
    // localStorage.setItem("selected", JSON.stringify(selected));

    let config = {
      headers: {
        Authorization: `Bearer ` + userInfo.token,
        "Content-Type": "application/json",
      },
    };

    // console.log(selected);

    let body = {
      token: usertoken.token,
      labid: props.labId,
    };
    await axios
      .post(`${process.env.REACT_APP_API_URL2}testList`, body, config)
      .then((res) => {
        if ((res.status = 200)) {
          setTestResults(res.data);
          console.log("hhhh", res.data);
          const rows = res.data.map((TestListItem) => {
            const container = {};
            container.id = TestListItem.id;
            container.SSN = TestListItem.SSN;
            container.email = TestListItem.email;
            container.Lab = TestListItem.lab;
            container.type = TestListItem.type;
            container.status = TestListItem.status;
            container.resultType = TestListItem.resultType;
            return container;
          });
          setResultrows(rows);
          // props.updatestateList(res.data);
          // console.log("testresult", testresults);
        } else {
          customToast("Something went Wrong", "error");
          // setTestResults();
          // settestList("");
        }
      })
      .catch((err) => {
        console.log(err);
        //testresults = null;
        // settestList("");
      });
    setLoader(false);
  };

  return (
    <>
      {resultRows.length > 0 ? (
        <TableContainer key={resultRows.Lab} component={Paper}>
          <div className="container footerBg">
            <div className="d-flex justify-content-start pt-2  align-items-center">
              <h4> {props.lab}</h4>
            </div>
          </div>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="left">SSN</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Test Done</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Result</TableCell>
                {/* <TableCell /> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {resultRows.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
          <Divider />
        </TableContainer>
      ) : (
        <p>{""}</p>
      )}
    </>
  );
}

const IframeModal = (props) => {
  React.useEffect(() => {
    if (props.TestId && props.LabId) {
      getTestResult();
    }
  }, [props]);

  const [resultDatas, setresultDatas] = useState([]);

  const getTestResult = async () => {
    let userInfo = localStorage.getItem("user");
    userInfo = JSON.parse(userInfo);
    let usertoken = localStorage.getItem("patienttoken");
    usertoken = JSON.parse(usertoken);

    // let labid = localStorage.getItem("labid");
    // labid = JSON.parse(labid);

    let body = {
      token: usertoken.token,
      labid: props.LabId,
      testid: props.TestId,
    };
    let config = {
      headers: {
        Authorization: `Bearer ` + userInfo.token,
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(`${process.env.REACT_APP_API_URL2}testResult`, body, config)
      .then((res) => {
        if ((res.status = 200)) {
          // setOpen(!open);
          setresultDatas(res.data);
          // setModalShow(true);
          // props.updatestateResult1(res.data);
        } else {
          customToast("Something went Wrong", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  //PDFjs worker from an external cdn
  const part = "https://cors-anywhere.herokuapp.com/";
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
          Result
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {resultDatas ? (
          (() => {
            switch (resultDatas.resultType) {
              case "pdf":
                return (
                  <div onContextMenu={(e) => e.preventDefault()}>
                    <iframe
                      scrolling="no"
                      position="fixed"
                      width="775"
                      height="650"
                      src={resultDatas.url + "#toolbar=0"}
                      name="imgbox"
                      id="imgbox"
                    ></iframe>
                    {/* <Document file={{ url: part + resultDatas.url }}>
                      <Page pageNumber={1} />
                    </Document> */}
                  </div>
                );

              case "image":
                return (
                  <iframe
                    border="2px"
                    position="fixed"
                    width="750"
                    height="650"
                    src={resultDatas.url + "#toolbar=0"}
                    name="imgbox"
                    id="imgbox"
                  ></iframe>
                );
              case "video":
                <iframe
                  // scrolling="no"
                  position="fixed"
                  width="100%"
                  height="100%"
                  src={resultDatas.url + "#toolbar=0"}
                  name="imgbox"
                  id="imgbox"
                ></iframe>;

              default:
                return (
                  <iframe
                    frameborder="0"
                    scrolling="no"
                    width="750"
                    height="600"
                    src={resultDatas.url + "#toolbar=0"}
                    name="imgbox"
                    id="imgbox"
                  ></iframe>
                );
            }
          })()
        ) : (
          <p>Loading....</p>
        )}
      </Modal.Body>
    </Modal>
  );
};
