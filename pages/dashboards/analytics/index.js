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

// @mui material components
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";
import ReportsBarChart from "/examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "/examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "/examples/Cards/StatisticsCards/ComplexStatisticsCard";
import BookingCard from "/examples/Cards/BookingCard";

// Anaytics dashboard components
import SalesByCountry from "/pagesComponents/dashboards/analytics/components/SalesByCountry";

// Data
import reportsBarChartData from "/pagesComponents/dashboards/analytics/data/reportsBarChartData";
import reportsLineChartData from "/pagesComponents/dashboards/analytics/data/reportsLineChartData";

// Images
import product1 from "/assets/images/Luggage Rack.jpg";
import product2 from "/assets/images/3 hook.jpg";
import product3 from "/assets/images/Door Stopper.jpg";
import { useEffect, useState } from "react";
import { useAuth } from "hooks/use-auth";
import { getFromProductsByAssignedUser } from "apiHelpers/products";

function Analytics() {
  const { sales, tasks } = reportsLineChartData;

  const [products, setProducts] = useState([]);
  const auth = useAuth();
  const getCurrentUserID = () => {
    if (!auth.isLoading && auth.user) {
      return auth.user.find((attr) => attr.Name === "name").Value;
    }
    return [];
  };

  useEffect(() => {
    const userID = getCurrentUserID();
    console.log(userID);
    getFromProductsByAssignedUser(userID).then((res) => {
      console.log(res);
      // change variable names to match your schema
      res = res.map((product) => {
        return {
          name: product._id,
          quantity: product.Quantity,
          // total: product.price * product.quantity,
          'Shipment Date': product['Ship By Date'],
          Buyer: product.Buyer,
          Rejection: product.Rejection ? product.Rejection : "0%",
          // status: product.status,
          // createdAt: product.createdAt,
        };
      });

      setProducts(res);
    });
  }, []);

  // Action buttons for the BookingCard
  const actionButtons = (
    <>
      <Tooltip title="Refresh" placement="bottom">
        <MDTypography
          variant="body1"
          color="primary"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">refresh</Icon>
        </MDTypography>
      </Tooltip>
      <Tooltip title="Edit" placement="bottom">
        <MDTypography
          variant="body1"
          color="dark"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">edit</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container>
          <SalesByCountry />
        </Grid>
        <MDBox mt={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="dark"
                  title="Daily Output"
                  description="Department output this week"
                  date={reportsBarChartData.updated}
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color={sales.profit > 0 ? "success" : "warning"}
                  title="Monthly Production"
                  description={
                    sales.profit > 0 ? (
                      <>
                        (<strong>+{sales.profit}%</strong>) increase this month.
                      </>
                    ) : (
                      <>
                        (<strong>{Math.abs(sales.profit)}%</strong>) decrease this month.
                      </>
                    )
                  }
                  date={sales.updatedAt}
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="completed tasks"
                  description="Your tasks for this week"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="output"
                  title="Today's Output"
                  count={281}
                  percentage={{
                    color: "success",
                    amount: "+15%",
                    label: "than yesterday",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="info"
                  icon="person_add"
                  title="Manpower Today"
                  count="230"
                  percentage={{
                    color: "warning",
                    amount: "+5%",
                    label: "than yesterday",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="leaderboard"
                  title="Cost Efficiency"
                  count="103.5%"
                  percentage={{
                    color: "warning",
                    amount: "-1%",
                    label: "than yesterday",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="move_to_inbox"
                  title="Upcoming Products"
                  count="+3"
                  percentage={{
                    color: "success",
                    amount: "2",
                    label: "in next week",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={product1}
                  title="Luggage Rack"
                  description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.'
                  // price="$899/night"
                  location="Target"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={product2}
                  title="3 Hook"
                  description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.'
                  // price="$1.119/night"
                  location="Target"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <BookingCard
                  image={product3}
                  title="Door Stopper"
                  description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.'
                  // price="$459/night"
                  location="Target"
                  action={actionButtons}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Analytics;
