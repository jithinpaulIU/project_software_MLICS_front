import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  IconButton,
  Paper,
  CircularProgress,
  Divider,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";

const PatientViews = () => {
  const navigate = useNavigate();
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
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <DrHeader />

      <Container component="main" maxWidth="xl" sx={{ py: 4, flex: 1 }}>
        {/* Header Section - Improved */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 50 }}
        >
          <Typography variant="h4" fontWeight="600" color="primary">
            Patient Test Results
          </Typography>

          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/drdashboard")}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: "none",
              borderWidth: 2,
              "&:hover": {
                borderWidth: 2,
              },
            }}
          >
            <Typography variant="subtitle1">Back to Dashboard</Typography>
          </Button>
        </Stack>

        {/* Lab Selection Card */}
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
          <Grid container spacing={2} alignItems="center">
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
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "12px",
                    fontSize: "16px",
                  },
                  chips: {
                    background: "#1976d2",
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
                  height: "56px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {isLoading ? "Processing..." : "View Results"}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Results Section */}
        {selectedLabs.length > 0 ? (
          <Box>
            <Typography
              variant="h6"
              fontWeight="600"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Showing Results for {selectedLabs.length} Selected Lab(s)
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              {selectedLabs.map((item) => (
                <Grid item xs={12} key={item.value}>
                  <PatientDataList labId={item.value} labName={item.label} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: 1,
              p: 4,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              {selected.length > 0
                ? "Click 'View Results' to display data"
                : "Please select labs to view test results"}
            </Typography>
          </Box>
        )}
      </Container>

      <DrFooter />
      <CustomToastComponent />
    </Box>
  );
};

export default PatientViews;
