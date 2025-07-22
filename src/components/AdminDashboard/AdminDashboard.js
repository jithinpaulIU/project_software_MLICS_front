import React from "react";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";

import down from "../../img/down.png";
import up from "../../img/up.png";
import filter from "../../img/filter.svg";
import calander from "../../img/calendar.svg";
import graph from "../../img/graph.png";
import pie from "../../img/pie.png";

const AdminDashboard = () => {
  return (
    <div>
      {/* ======= Top Bar ======= */} {/* ======= Header ======= */}
      <AdminHeader />
      {/* End Header */}
      <main id="main" className="bg-white">
        {/* ======= Breadcrumbs Section ======= */}
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Admin Home</h2>
            </div>
          </div>
        </section>
        {/* End Breadcrumbs Section */}
        <section className="inner-page">
          <div className="container">
            <section className="content">
              {/* Info boxes */}
              <div
                className="well"
                style={{ backgroundColor: "#FFFFFF !important" }}
              >
                <div className="row">
                  <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box info-bg">
                      <div className="info-box-content">
                        <center>
                          <span className="info-box-text">
                            Doctors Request{" "}
                          </span>
                        </center>
                        <br />
                        <center>
                          {" "}
                          <span className="info-box-number-down">
                            10{" "}
                            <img
                              src={down}
                              alt="down"
                              style={{ height: "28px" }}
                            />
                          </span>
                        </center>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                  </div>
                  {/* /.col */}
                  <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box info-bg">
                      <div className="info-box-content">
                        <center>
                          <span className="info-box-text">Lab API</span>
                        </center>
                        <br />
                        <center>
                          {" "}
                          <span className="info-box-number-up">
                            12{" "}
                            <img src={up} alt="up" style={{ height: "28px" }} />
                          </span>
                        </center>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                  </div>
                  {/* /.col */}
                  {/* fix for small devices only */}
                  <div className="clearfix visible-sm-block" />
                  <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box info-bg">
                      <div className="info-box-content">
                        <center>
                          <span className="info-box-text">
                            Authenication
                            <br />
                            by Doctors
                          </span>
                        </center>
                        <center>
                          {" "}
                          <span className="info-box-number-down">
                            68{" "}
                            <img
                              src={down}
                              alt="down"
                              style={{ height: "28px" }}
                            />
                          </span>
                        </center>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                  </div>
                  {/* /.col */}
                  <div className="col-md-3 col-sm-6 col-xs-12">
                    <div className="info-box info-bg">
                      <div className="info-box-content">
                        <center>
                          <span className="info-box-text">
                            Request Growth
                            <br />
                            From Last Week
                          </span>
                        </center>
                        <center>
                          {" "}
                          <span className="info-box-number-down">
                            10%{" "}
                            <img src={up} alt="up" style={{ height: "28px" }} />
                          </span>
                        </center>
                      </div>
                      {/* /.info-box-content */}
                    </div>
                    {/* /.info-box */}
                  </div>
                  <div className="container d-flex justify-content-end">
                    <div
                      className="col-md-4 "
                      style={{ paddingTop: "10px", paddingBottom: "10px" }}
                    >
                      <div className="row">
                        <div className="col-md-8 col-xs-8 ">
                          <input
                            type="text"
                            style={{
                              backgroundColor:
                                "rgb(245,245,245,60%) !important",
                            }}
                            className="form-control"
                            id="Dates"
                            name="Dates"
                            placeholder="Dates"
                            required
                          />
                        </div>
                        {/* /.info-box */}
                        <div className="col-md-2 col-xs-2">
                          <img
                            src={filter}
                            alt="filter"
                            className="img-responsive icon_3"
                          />
                        </div>
                        <div className="col-md-2 col-xs-2">
                          <img
                            src={calander}
                            alt="calander"
                            className="img-responsive icon_3"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /.col */}
                </div>
                {/* Main row */}
                <div className="row">
                  {/* Left col */}
                  <div className="col-md-12">
                    {/* MAP & BOX PANE */}
                    {/* /.box */}
                    <div className="row">
                      <div className="col-md-6">
                        {/* DIRECT CHAT */}
                        {/*/.direct-chat */}
                      </div>
                      {/* /.col */}
                      {/* /.col */}
                    </div>
                    {/* /.row */}
                    {/* TABLE: LATEST ORDERS */}
                    <div className="box box-info" style={{ borderTop: "none" }}>
                      {/*                <div class="box-header with-border">
                                            <h3 class="box-title">Latest Orders</h3>
                        
                                            <div class="box-tools pull-right">
                                                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                                </button>
                                                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
                                            </div>
                                        </div>*/}
                      {/* /.box-header */}
                      <div
                        className="box-body"
                        style={{ backgroundColor: "transparent !important" }}
                      >
                        <div className="table-responsive">
                          <table className="table no-margin table-striped">
                            <thead className="thead_11">
                              <tr>
                                <th>Doctors</th>
                                <th>Labs</th>
                                <th>Request</th>
                                <th>Authentication</th>
                                <th>Tests</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>Dr Kathy Jones</td>
                                <td>Sanofi Genzyme</td>
                                <td>30</td>
                                <td>15</td>
                                <td>
                                  <span>
                                    <img
                                      src={down}
                                      alt="down"
                                      style={{ height: "14px" }}
                                    />{" "}
                                    &nbsp;00.1%
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>Dr Sara Tom</td>
                                <td>Sanofi Genzyme</td>
                                <td>26</td>
                                <td>20</td>
                                <td>
                                  <span>
                                    <img
                                      src={up}
                                      alt="up"
                                      style={{ height: "14px" }}
                                    />{" "}
                                    &nbsp;01.6%
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>Dr Tom Josy</td>
                                <td>LabCorp</td>
                                <td>18</td>
                                <td>18</td>
                                <td>
                                  <span>
                                    <img
                                      src={up}
                                      alt="up"
                                      style={{ height: "14px" }}
                                    />{" "}
                                    &nbsp;05.6%
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td>Dr Martha Clerk</td>
                                <td>Quest Diagnostics</td>
                                <td>15</td>
                                <td>5</td>
                                <td>
                                  <span>
                                    <img
                                      src={down}
                                      alt="down"
                                      style={{ height: "14px" }}
                                    />{" "}
                                    &nbsp;00.01%
                                  </span>
                                </td>
                              </tr>

                              <tr>
                                <td>Dr Davyn J Paul</td>
                                <td>LabCorp</td>
                                <td>14</td>
                                <td>8</td>
                                <td>
                                  <span>
                                    <img
                                      src={up}
                                      alt="up"
                                      style={{ height: "14px" }}
                                    />{" "}
                                    &nbsp;06.0%
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        {/* /.table-responsive */}
                      </div>
                      {/* /.box-body */}
                      {/*                <div class="box-footer clearfix">
                                            <a href="javascript:void(0)" class="btn btn-sm btn-info btn-flat pull-left">Place New Order</a>
                                            <a href="javascript:void(0)" class="btn btn-sm btn-default btn-flat pull-right">View All Orders</a>
                                        </div>*/}
                      {/* /.box-footer */}
                    </div>
                    {/* /.box */}
                  </div>
                  {/* /.col */}
                  {/* /.col */}
                </div>
              </div>
              {/* /.row */}
              <div className="row">
                <div className="col-md-12">
                  <div className="box">
                    <div className="box-header with-border">
                      {/*<h3 class="box-title">Weekly Delivery Report</h3>*/}
                    </div>
                    {/* /.box-header */}
                    <div className="row">
                      <div className="col-md-6">
                        <img src={graph} alt="graph" className="img-fluid" />
                        {/* BAR CHART */}
                        {/* <div class="box-body">
                                <div class="chart">
                                    <canvas id="barChart" style="height:330px"></canvas>
                                </div>
                            </div> */}
                        {/* /.box-body */}
                        {/* /.box */}
                        {/* AREA CHART */}
                        <div className="box-body" style={{ display: "none" }}>
                          <div className="chart">
                            <canvas
                              id="areaChart"
                              style={{ height: "250px" }}
                            />
                          </div>
                        </div>
                        {/* /.box-body */}
                        {/* /.box */}
                        {/* DONUT CHART */}
                        {/* /.box */}
                      </div>
                      {/* /.col (LEFT) */}
                      <div className="col-md-6">
                        <img
                          src={pie}
                          alt="pie"
                          className="img-fluid"
                          width="60%"
                        />
                      </div>
                      {/* /.col (RIGHT) */}
                    </div>
                    {/* /.box-footer */}
                  </div>
                  {/* /.box */}
                </div>
              </div>
              {/* /.col */}
              {/* /.row */}
              {/* /.row */}
            </section>
          </div>
        </section>
      </main>
      {/* End #main */}
      {/* ======= Footer ======= */}
      <AdminFooter />
      {/* End Footer */}
      <a href="#top" className="back-to-top">
        <i className="icofont-simple-up" />
      </a>
    </div>
  );
};

export default AdminDashboard;
