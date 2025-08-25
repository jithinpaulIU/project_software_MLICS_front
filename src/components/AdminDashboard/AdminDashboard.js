import React from "react";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import down from "../../img/down.png";
import up from "../../img/up.png";
import filter from "../../img/filter.svg";
import calander from "../../img/calendar.svg";

// Register ChartJS components
ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  // Hardcoded data for the dashboard
  const stats = [
    { title: "Doctors Request", value: 24, trend: "up" },
    { title: "Lab API", value: 15, trend: "down" },
    { title: "Authentication by Doctors", value: 42, trend: "up" },
    { title: "Request Growth From Last Week", value: "18%", trend: "up" },
  ];

  const doctorData = [
    {
      name: "Dr. Kevin Jose",
      lab: "Sanofi Genzyme",
      requests: 24,
      auth: 18,
      trend: "up",
      change: "2.5%",
    },
    {
      name: "Dr. Michael Chen",
      lab: "LabCorp",
      requests: 18,
      auth: 15,
      trend: "down",
      change: "1.2%",
    },
    {
      name: "Dr. Emily Wilson",
      lab: "Quest Diagnostics",
      requests: 15,
      auth: 12,
      trend: "up",
      change: "3.8%",
    },
    {
      name: "Dr. Bibin Rodriguez",
      lab: "BioReference",
      requests: 12,
      auth: 10,
      trend: "up",
      change: "5.1%",
    },
    {
      name: "Dr. Jessica Kim",
      lab: "Mayo Clinic Labs",
      requests: 9,
      auth: 8,
      trend: "down",
      change: "0.7%",
    },
  ];

  // Chart data - Monthly Requests (Bar Chart)
  const monthlyRequestsData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Lab Requests",
        data: [45, 60, 75, 80, 65, 70, 85, 90, 78, 92, 88, 95],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Authenticated Requests",
        data: [30, 45, 50, 60, 45, 55, 65, 70, 58, 75, 70, 80],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart data - Request Distribution (Pie Chart)
  const requestDistributionData = {
    labels: [
      "Sanofi Genzyme",
      "LabCorp",
      "Quest Diagnostics",
      "BioReference",
      "Mayo Clinic",
    ],
    datasets: [
      {
        data: [35, 25, 20, 12, 8],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  // Chart options
  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div>
      <AdminHeader />

      <main id="main" className="bg-white">
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Admin Dashboard</h2>
            </div>
          </div>
        </section>

        <section className="inner-page">
          <div className="container">
            {/* Stats Cards */}
            <div className="row mb-4">
              {stats.map((stat, index) => (
                <div className="col-md-3 col-sm-6 mb-3" key={index}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-body text-center">
                      <h6 className="card-subtitle mb-2 text-muted">
                        {stat.title}
                      </h6>
                      <h3 className="card-title">
                        {stat.value}
                        <img
                          src={stat.trend === "up" ? up : down}
                          alt={stat.trend}
                          className="ms-2"
                          style={{ height: "20px" }}
                        />
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Date Filter */}
            <div className="row mb-4 justify-content-end">
              <div className="col-md-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Select date range"
                  />
                  <button className="btn btn-outline-secondary" type="button">
                    <img src={filter} alt="Filter" style={{ height: "20px" }} />
                  </button>
                  <button className="btn btn-outline-secondary" type="button">
                    <img
                      src={calander}
                      alt="Calendar"
                      style={{ height: "20px" }}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Doctors Table */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead className="table-light">
                          <tr>
                            <th>Doctors</th>
                            <th>Labs</th>
                            <th>Requests</th>
                            <th>Authentication</th>
                            <th>Change</th>
                          </tr>
                        </thead>
                        <tbody>
                          {doctorData.map((doctor, index) => (
                            <tr key={index}>
                              <td>{doctor.name}</td>
                              <td>{doctor.lab}</td>
                              <td>{doctor.requests}</td>
                              <td>{doctor.auth}</td>
                              <td>
                                <img
                                  src={doctor.trend === "up" ? up : down}
                                  alt={doctor.trend}
                                  style={{ height: "14px" }}
                                />
                                {doctor.change}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Monthly Requests</h5>
                    <div style={{ height: "300px" }}>
                      <Bar
                        data={monthlyRequestsData}
                        options={barChartOptions}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Request Distribution</h5>
                    <div style={{ height: "300px" }}>
                      <Pie
                        data={requestDistributionData}
                        options={pieChartOptions}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AdminFooter />
    </div>
  );
};

export default AdminDashboard;
