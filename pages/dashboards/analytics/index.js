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
// import { getFromProductsByAssignedUser } from "apiHelpers/products";
import { getFromTasksByAssignedUser } from "apiHelpers/tasks";
import { getProductImagePresignedUrlFromImageKey } from "apiHelpers/products";
import { Modal } from "@mui/material";
import MDButton from "/components/MDButton";
import DataTable from "/examples/Tables/DataTable";
import Card from "@mui/material/Card";
import { CircularProgress } from "@mui/material";
import ProductionLog from "/pagesComponents/dashboards/analytics/components/ProductionLog/index.js";
import LogTable from "/pagesComponents/dashboards/analytics/components/LogTable";

function Analytics() {
  const { sales, tasks } = reportsLineChartData;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const auth = useAuth();
  const getCurrentUserID = () => {
    if (!auth.isLoading && auth.user) {
      return auth.user.find((attr) => attr.Name === "name").Value;
    }
    return [];
  };

  document.addEventListener('keydown', function (event) {
    if (event.key === "Escape" && modalOpen) {
      // code to close the modal
      setModalOpen(false);
    }
  });

  useEffect(() => {
    const userID = getCurrentUserID();
    getFromTasksByAssignedUser(userID).then((res) => {
      // change variable names to match your schema
      res = res.map((task) => {
        // const presignedUrl = await getProductImagePresignedUrlFromImageKey(task.image_key);
        // console.log(presignedUrl);
        return {
          name: task.job_name,
          task_id: task._id,
          quantity: task.quantity,
          image_key: task.image_key,
          OMS: task['PO/OMS'],
          // image_url: presignedUrl,
          // total: product.price * product.quantity,
          'Shipment Date': task.shipment_date,
          Buyer: task.Buyer,
          // Rejection: product.rejected ? product.rejected : "0%",
          remaining: task.remaining ? task.remaining : task.quantity,
          // status: product.status,
          // createdAt: product.createdAt,
        };
      });

      setProducts(res);
      setFilteredProducts(res);

      setLoading(false);
    });
  }, []);

  useEffect(() => {
    console.log('Dashboard - ' + searchText);
    // if searchText is empty, then set products to all products
    if (searchText === '') {
      setLoading(true);
      setFilteredProducts(products);
    } else {
      // else, filter products by searchText

      const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchText.toLowerCase());
      }
      );
      // setProducts(filteredProducts);
      setFilteredProducts(filteredProducts);
      // setLoading(false);
    }
  }, [searchText]);

  return (
    <DashboardLayout>
      <DashboardNavbar setSearchText={setSearchText} />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {/* if modalContent then display modalContent.title */}
        {modalContent && (
          <>{modalContent.content}</>
        )}
      </Modal>
      <MDBox py={3}>
        {/* <Grid container>
          <SalesByCountry />
        </Grid> */}
        {/* <MDBox mt={6}>
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
        </MDBox> */}
        {/* <MDBox mt={1.5}>
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
        </MDBox> */}
        <MDBox mt={2}>
          <Grid container spacing={3}>
            {/* create a Booking card for each product in products */}
            {/* {
              loading ? (
                <CircularProgress
                  sx={{
                    position: "absolute",
                    right: "1rem",
                    top: "5rem",
                  }}

                />
              ) : (
                <MDButton
                  variant="gradient"
                  color="success"
                  size="medium"
                  sx={{
                    position: "absolute",
                    right: "1rem",
                    top: "5rem",
                  }}
                  onClick={() => {
                    setLoading(true);
                  }}
                  iconOnly
                >
                  <Icon>refresh</Icon>
                </MDButton>
              )
            } */}
            {
              filteredProducts.map((product) => {
                return (
                  <Grid item xs={12} md={6} lg={4} key={product.task_id}>
                    <MDBox mt={3}>
                      <BookingCard
                        // image={product.image_url ? <image src={product.image_url} alt={product.name} /> : product1}
                        image={product1}
                        title={product.name}
                        // description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.'
                        price={product.remaining + " units"}
                        location={product.OMS}
                        action={<>
                          <Tooltip title="Log Production" placement="bottom">
                            <MDTypography
                              variant="body1"
                              color="primary"
                              lineHeight={1}
                              sx={{ cursor: "pointer", mx: 3 }}
                              onClick={() => {
                                setModalContent({
                                  title: "Log Production",
                                  content: (
                                    <ProductionLog product_id={product.name} task_id={product.task_id} />
                                  )
                                });
                                setModalOpen(true);
                              }}
                            >
                              <Icon color="inherit">backup</Icon>
                            </MDTypography>
                          </Tooltip>
                          <Tooltip title="View Logs" placement="bottom">
                            <MDTypography
                              variant="body1"
                              color="dark"
                              lineHeight={1}
                              sx={{ cursor: "pointer", mx: 3 }}
                              onClick={() => {
                                setModalContent({
                                  title: "Log Production",
                                  content: (
                                    <LogTable product_id={product.name} />
                                  )
                                });
                                setModalOpen(true);
                              }}
                            >
                              <Icon color="inherit">assessment</Icon>
                            </MDTypography>
                          </Tooltip>
                        </>}
                      />
                    </MDBox>
                  </Grid>
                )
              }
              )
            }
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Analytics;
