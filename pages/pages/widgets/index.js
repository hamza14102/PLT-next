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

import { useMemo, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO examples
import DashboardLayout from "/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "/examples/Navbars/DashboardNavbar";
import Footer from "/examples/Footer";
import MiniStatisticsCard from "/examples/Cards/StatisticsCards/MiniStatisticsCard";
import ProgressLineChart from "/examples/Charts/LineCharts/ProgressLineChart";
import DefaultInfoCard from "/examples/Cards/InfoCards/DefaultInfoCard";
import MasterCard from "/examples/Cards/MasterCard";
import MiniInfoCard from "/examples/Cards/InfoCards/MiniInfoCard";
import ControllerCard from "/examples/Cards/ControllerCard";
import CategoriesList from "/examples/Lists/CategoriesList";
import Calendar from "/examples/Calendar";

// Widgets page components
import Steps from "/pagesComponents/pages/widgets/components/Steps";
import FullBody from "/pagesComponents/pages/widgets/components/FullBody";
import MediaPlayer from "/pagesComponents/pages/widgets/components/MediaPlayer";
import OrdersOverview from "/pagesComponents/pages/widgets/components/OrdersOverview";
import UpcomingEvents from "/pagesComponents/pages/widgets/components/UpcomingEvents";
import Chart from "/pagesComponents/pages/widgets/components/Chart";

// Data
import progressLineChartData from "/pagesComponents/pages/widgets/data/progressLineChartData";
import calendarEventsData from "/pagesComponents/pages/widgets/data/calendarEventsData";
import categoriesListData from "/pagesComponents/pages/widgets/data/categoriesListData";
import caloriesChartData from "/pagesComponents/pages/widgets/data/caloriesChartData";

import { getFromProductsByID, postToProducts, deleteFromProductsByID, putToProductsByID, getFromProductsByAssignedUser, getFromProductsByAssignedUserAndSpecifiedAttribute } from "/apiHelpers/products";
import { getUsers } from "/apiHelpers/users";
import MDInput from "/components/MDInput";
import MDButton from "/components/MDButton";
import MDSnackbar from "/components/MDSnackbar";

function Widgets() {
  const [lights, setLights] = useState(false);

  const handleSetLights = () => setLights(!lights);

  const [productID, setProductID] = useState("");
  const [show, setShow] = useState(true);

  const toggleSnackbar = () => {
    setShow(!show);
  };


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDSnackbar
        color="success"
        icon="notifications"
        title="Notification"
        content="Successfully made changes to inventory!"
        dateTime="now"
        open={show}
        close={toggleSnackbar}
      />
      <MDBox my={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={6}>
              {/* <UpcomingEvents /> */}
              {/* button to call api */}
              {/* input field for product _id*/}
              <MDInput
                label="Product ID"
                variant="outlined"
                size="small"
                fullWidth
                mb={3}
                value={productID}
                onChange={(e) => setProductID(e.target.value)}
              />
              <MDButton onClick={async () => {
                if (productID === "") {
                  return;
                }
                const product = await getFromProductsByID(productID);
                console.log(product);
              }}>GET API</MDButton>

              <MDInput
                label="Product ID"
                variant="outlined"
                size="small"
                fullWidth
                mb={3}
                value={productID}
                onChange={(e) => setProductID(e.target.value)}
              />
              <MDButton onClick={async () => {
                if (productID === "") {
                  return;
                }
                const product = await deleteFromProductsByID(productID);
                console.log(product);
              }}>DELETE API</MDButton>

              <MDInput
                label="Product ID"
                variant="outlined"
                size="small"
                fullWidth
                mb={3}
                value={productID}
                onChange={(e) => setProductID(e.target.value)}
              />
              <MDButton onClick={async () => {
                if (productID === "") {
                  return;
                }
                const product = await getFromProductsByAssignedUser(productID);
                console.log(product);
              }}>USER API</MDButton>

              <MDInput
                label="Product ID"
                variant="outlined"
                size="small"
                fullWidth
                mb={3}
                value={productID}
                onChange={(e) => setProductID(e.target.value)}
              />
              <MDButton onClick={async () => {
                if (productID === "") {
                  return;
                }
                const product = await getUsers();
                console.log(product);
              }}>GET ATTR USER</MDButton>

              {/* <MDBox mb={3}>
                <MiniStatisticsCard
                  title={{ text: "battery health" }}
                  count="99 %"
                  icon={{ color: "dark", component: "battery_charging_full" }}
                  direction="left"
                />
              </MDBox> */}

            </Grid>
            <Grid item xs={12} lg={6}>
              {/* <ProgressLineChart
                icon="date_range"
                title="Tasks"
                count={480}
                progress={60}
                height="13.375rem"
                chart={progressLineChartData}
              /> */}
              <MDInput
                label="Product ID"
                variant="outlined"
                size="small"
                fullWidth
                mb={3}
                value={productID}
                onChange={(e) => setProductID(e.target.value)}
              />
              <MDButton onClick={async () => {
                if (productID === "") {
                  return;
                }
                const product = await postToProducts({ "_id": productID, "name": "test" });
                console.log(product);
              }}>POST API</MDButton>

              <MDInput
                label="Product ID"
                variant="outlined"
                size="small"
                fullWidth
                mb={3}
                value={productID}
                onChange={(e) => setProductID(e.target.value)}
              />
              <MDButton onClick={async () => {
                if (productID === "") {
                  return;
                }
                const product = await putToProductsByID(productID, { "_id": productID, "product_name": "test", "product_description": "test_description", "product_price": 100, "product_quantity": 100, "user_ids": ["test_user_id"] });
                console.log(product);
              }}>PUT API</MDButton>

              <MDInput
                label="Product ID"
                variant="outlined"
                size="small"
                fullWidth
                mb={3}
                value={productID}
                onChange={(e) => setProductID(e.target.value)}
              />
              <MDButton onClick={async () => {
                if (productID === "") {
                  return;
                }
                const product = await getFromProductsByAssignedUserAndSpecifiedAttribute("test_user_id", "product_name", productID);
                console.log(product);
              }}>SEARCH ATTR API</MDButton>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={3}>
                <MiniStatisticsCard
                  title={{ text: "battery health" }}
                  count="99 %"
                  icon={{ color: "dark", component: "battery_charging_full" }}
                  direction="left"
                />
              </MDBox>
              <MiniStatisticsCard
                title={{ text: "music volume" }}
                count="15/100"
                icon={{ color: "dark", component: "volume_down" }}
                direction="left"
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              lg={5}
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
            >
              <MDBox width="100%" mr={{ xs: 0, sm: 3 }} mb={{ xs: 3, sm: 0 }}>
                <DefaultInfoCard
                  icon="account_balance"
                  title="salary"
                  description="Belong Interactive"
                  value="+$2000"
                />
              </MDBox>
              <MDBox width="100%">
                <DefaultInfoCard
                  icon="paypal"
                  title="paypal"
                  description="Freelance Payment"
                  value="$455.00"
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} lg={4}>
              <MasterCard
                number={4562112245947852}
                holder="jack peterson"
                expires="11/22"
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <FullBody />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <ControllerCard
                state={lights}
                icon={
                  <Icon
                    className={lights ? "text-white" : "text-dark"}
                    fontSize="large"
                  >
                    lightbulb
                  </Icon>
                }
                title="Lights"
                onChange={handleSetLights}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Chart
                title="calories"
                count={97}
                percentage={{ color: "success", label: "+5%" }}
                chart={caloriesChartData}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <MiniInfoCard
                icon="shortcut"
                title={
                  <>
                    754&nbsp;
                    <MDTypography
                      variant="button"
                      color="secondary"
                      fontWeight="medium"
                    >
                      m
                    </MDTypography>
                  </>
                }
                description="New York City"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <Steps />
            </Grid>
          </Grid>
        </MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={5}>
            {useMemo(
              () => (
                <Calendar
                  header={{ title: "calendar", date: "Monday, 2021" }}
                  headerToolbar={false}
                  initialView="dayGridMonth"
                  initialDate="2021-08-10"
                  events={calendarEventsData}
                  selectable
                  editable
                />
              ),
              // eslint-disable-next-line react-hooks/exhaustive-deps
              [calendarEventsData]
            )}
          </Grid>
          <Grid item xs={12} lg={3}>
            <MDBox mb={3}>
              <CategoriesList
                title="categories"
                categories={categoriesListData}
              />
            </MDBox>
            <MediaPlayer />
          </Grid>
          <Grid item xs={12} lg={4}>
            <OrdersOverview />
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Widgets;
