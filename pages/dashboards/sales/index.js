/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDBadgeDot from "/components/MDBadgeDot";
import MDButton from "/components/MDButton";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";
import DefaultStatisticsCard from "/examples/Cards/StatisticsCards/DefaultStatisticsCard";
import DefaultLineChart from "/examples/Charts/LineCharts/DefaultLineChart";
import HorizontalBarChart from "/examples/Charts/BarCharts/HorizontalBarChart";
import SalesTable from "/examples/Tables/SalesTable";
import DataTable from "/examples/Tables/DataTable";

// Sales dashboard components
import ChannelsChart from "/pagesComponents/dashboards/sales/components/ChannelsChart";

// Data
import defaultLineChartData from "/pagesComponents/dashboards/sales/data/defaultLineChartData";
import horizontalBarChartData from "/pagesComponents/dashboards/sales/data/horizontalBarChartData";
import salesTableData from "/pagesComponents/dashboards/sales/data/salesTableData";
import dataTableData from "/pagesComponents/dashboards/sales/data/dataTableData";
import ComplexProjectCard from "/examples/Cards/ProjectCards/ComplexProjectCard";
import profile1 from "assets/images/team-2.jpg";
import profile2 from "assets/images/team-4.jpg";

import SalesByCountry from "/pagesComponents/dashboards/analytics/components/SalesByCountry";

function Sales() {
  // DefaultStatisticsCard state for the dropdown value
  const [salesDropdownValue, setSalesDropdownValue] = useState("6 May - 7 May");
  const [customersDropdownValue, setCustomersDropdownValue] =
    useState("6 May - 7 May");
  const [revenueDropdownValue, setRevenueDropdownValue] =
    useState("6 May - 7 May");

  // DefaultStatisticsCard state for the dropdown action
  const [salesDropdown, setSalesDropdown] = useState(null);
  const [customersDropdown, setCustomersDropdown] = useState(null);
  const [revenueDropdown, setRevenueDropdown] = useState(null);

  // DefaultStatisticsCard handler for the dropdown action
  const openSalesDropdown = ({ currentTarget }) =>
    setSalesDropdown(currentTarget);
  const closeSalesDropdown = ({ currentTarget }) => {
    setSalesDropdown(null);
    setSalesDropdownValue(currentTarget.innerText || salesDropdownValue);
  };
  const openCustomersDropdown = ({ currentTarget }) =>
    setCustomersDropdown(currentTarget);
  const closeCustomersDropdown = ({ currentTarget }) => {
    setCustomersDropdown(null);
    setCustomersDropdownValue(currentTarget.innerText || salesDropdownValue);
  };
  const openRevenueDropdown = ({ currentTarget }) =>
    setRevenueDropdown(currentTarget);
  const closeRevenueDropdown = ({ currentTarget }) => {
    setRevenueDropdown(null);
    setRevenueDropdownValue(currentTarget.innerText || salesDropdownValue);
  };

  // Dropdown menu template for the DefaultStatisticsCard
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
      disableAutoFocusItem
    >
      <MenuItem onClick={close}>Last 7 days</MenuItem>
      <MenuItem onClick={close}>Last week</MenuItem>
      <MenuItem onClick={close}>Last 30 days</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container>
          <SalesByCountry />
        </Grid>
      </MDBox>
      {/* <MDBox py={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="employee of the week"
                count="Employee Name"
                percentage={{
                  color: "success",
                  value: "+55%",
                  label: "productivity boost",
                }}
              // dropdown={{
              //   action: openSalesDropdown,
              //   menu: renderMenu(salesDropdown, closeSalesDropdown),
              //   value: salesDropdownValue,
              // }}
              />
              <ComplexProjectCard
                image={profile1.src}
                title="employee of the week"
                description="Employee Name"
                remark="+45% productivity boost"
              // dateTime="02.03.22"
              // members={[
              //   "https://bit.ly/3KxVWll",
              //   "https://bit.ly/3pW8Bqu",
              //   "https://bit.ly/3tRaxSb",
              //   "https://bit.ly/3t0yuaf"
              // ]}
              // dropdown={{
              //   action: func,
              //   menu: node,
              // }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="employee of the month"
                count="Employee Name"
                percentage={{
                  color: "success",
                  value: "33%",
                  label: "cost reduction",
                }}
              // dropdown={{
              //   action: openCustomersDropdown,
              //   menu: renderMenu(customersDropdown, closeCustomersDropdown),
              //   value: customersDropdownValue,
              // }}
              />
              <ComplexProjectCard
                image={profile2.src}
                title="employee of the month"
                description="Employee Name"
                remark="33% cost reduction"
              // dateTime="02.03.22"
              // members={[
              //   "https://bit.ly/3KxVWll",
              //   "https://bit.ly/3pW8Bqu",
              //   "https://bit.ly/3tRaxSb",
              //   "https://bit.ly/3t0yuaf"
              // ]}
              // dropdown={{
              //   action: func,
              //   menu: node,
              // }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <DefaultStatisticsCard
                title="Department of the month"
                count="Department Name"
                percentage={{
                  color: "success",
                  value: "100%",
                  label: "on time delivery",
                }}
              // dropdown={{
              //   action: openRevenueDropdown,
              //   menu: renderMenu(revenueDropdown, closeRevenueDropdown),
              //   value: revenueDropdownValue,
              // }}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4}>
              <ChannelsChart />
            </Grid>
            <Grid item xs={12} sm={6} lg={8}>
              <DefaultLineChart
                title="Revenue"
                description={
                  <MDBox display="flex" justifyContent="space-between">
                    <MDBox display="flex" ml={-1}>
                      <MDBadgeDot
                        color="info"
                        size="sm"
                        badgeContent="Facebook Ads"
                      />
                      <MDBadgeDot
                        color="dark"
                        size="sm"
                        badgeContent="Google Ads"
                      />
                    </MDBox>
                    <MDBox mt={-4} mr={-1} position="absolute" right="1.5rem">
                      <Tooltip
                        title="See which ads perform better"
                        placement="left"
                        arrow
                      >
                        <MDButton
                          variant="outlined"
                          color="secondary"
                          size="small"
                          circular
                          iconOnly
                        >
                          <Icon>priority_high</Icon>
                        </MDButton>
                      </Tooltip>
                    </MDBox>
                  </MDBox>
                }
                chart={defaultLineChartData}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <HorizontalBarChart
                title="Sales by age"
                chart={horizontalBarChartData}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card>
                <MDBox pt={3} px={3}>
                  <MDTypography variant="h6" fontWeight="medium">
                    Top Performers
                  </MDTypography>
                </MDBox>
                <MDBox py={1}>
                  <DataTable
                    table={dataTableData}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    isSorted={true}
                    noEndBorder
                  />
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <SalesTable title="Production by Department" rows={salesTableData} />
            </Grid>
          </Grid>
        </MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox pt={3} px={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Top Selling Products
                </MDTypography>
              </MDBox>
              <MDBox py={1}>
                <DataTable
                  table={dataTableData}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  isSorted={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox> */}
      <Footer />
    </DashboardLayout>
  );
}

export default Sales;
