import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { MultiSelect } from "react-multi-select-component";

// Components
import DrFooter from "./DrFooter";
import DrHeader from "./DrHeader";
import PatientDataList from "./PatientDataList";
import { customToast, CustomToastComponent } from "../../customToast";

// MUI Components
import {
  Button,
  Grid,
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Divider,
  Stack,
  Avatar,
  useTheme,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  MedicalInformation as MedicalInformationIcon,
  Science as ScienceIcon,
} from "@mui/icons-material";

const PatientViews = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [labs, setLabs] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedLabs, setSelectedLabs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const fetchLabs = useCallback(async () => {
    setIsFetching(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL2}labs`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setLabs(data?.data || []);

      const labOptions = data.data.map((lab) => ({
        id: lab.id,
        label: lab.name,
        value: lab.id,
      }));

      setOptions(labOptions);
    } catch (error) {
      console.error("Error fetching labs:", error);
      customToast("Failed to load labs", "error");
    } finally {
      setIsFetching(false);
    }
  }, []);

  useEffect(() => {
    fetchLabs();
  }, [fetchLabs]);

  const handleViewResults = () => {
    if (selected.length === 0) {
      customToast("Please select at least one lab", "warning");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setSelectedLabs(selected);
      setIsLoading(false);
    }, 500);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <DrHeader />

      <Container
        component="main"
        maxWidth="xl"
        sx={{
          py: 4,
          flex: 1,
          px: { xs: 2, sm: 3, md: 1 },
        }}
      >
        {/* Centered content with max width */}
        <Box
          sx={{
            maxWidth: "auto",
            mx: "auto",
            width: "100%",
          }}
        >
          {/* Header with gradient background */}
          <section className="breadcrumbs py-3">
            <div className="container">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">Patient Details</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <Link to="/drdashboard" className="text-decoration-none">
                        Home
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </section>

          {/* Lab Selection Card */}
          <Paper
            elevation={1}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              width: "100%",
              borderLeft: `2px solid ${theme.palette.secondary.main}`,
              alignItems: "center",
            }}
          >
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs={12} md={9}>
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select Labs"
                  isLoading={isFetching}
                  disableSearch={false}
                  overrideStrings={{
                    selectSomeItems: "Search and select labs...",
                    search: "Search labs...",
                  }}
                  styles={{
                    searchBox: {
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: "8px",
                      padding: "12px",
                      fontSize: "16px",
                    },
                    chips: {
                      background: theme.palette.primary.main,
                      color: "white",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={
                    isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <SearchIcon />
                    )
                  }
                  onClick={handleViewResults}
                  disabled={isLoading || selected.length === 0}
                  sx={{
                    height: "auto",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "600",
                    boxShadow: theme.shadows[2],
                    "&:hover": {
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  {isLoading ? "Processing..." : "View Results"}
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {/* Results Section */}
          {selectedLabs.length > 0 ? (
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                width: "100%",
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <ScienceIcon color="secondary" sx={{ fontSize: 36 }} />
                <Typography variant="h5" fontWeight={600}>
                  Lab Results
                </Typography>
                <Box
                  sx={{
                    ml: "auto",

                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    backgroundColor: theme.palette.primary.light,
                    color: "white",
                  }}
                >
                  {selectedLabs.length} Selected
                </Box>
              </Stack>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {selectedLabs.map((item) => (
                  <Grid item xs={12} key={item.value}>
                    <PatientDataList labId={item.value} labName={item.label} />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          ) : (
            <Paper
              elevation={3}
              sx={{
                p: 6,
                borderRadius: 3,
                textAlign: "center",
                width: "100%",
              }}
            >
              <SearchIcon
                sx={{
                  fontSize: 64,
                  color: theme.palette.text.disabled,
                  mb: 2,
                }}
              />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {selected.length > 0
                  ? "Ready to view results?"
                  : "No labs selected yet"}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {selected.length > 0
                  ? "Click the 'View Results' button to display the data"
                  : "Please select labs from the list above to view test results"}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleViewResults}
                disabled={selected.length === 0}
              >
                View Results
              </Button>
            </Paper>
          )}
        </Box>
      </Container>

      <DrFooter />
      <CustomToastComponent />
    </Box>
  );
};

export default PatientViews;
