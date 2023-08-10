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
import { Modal } from "@mui/material";
import MDButton from "/components/MDButton";
import DataTable from "/examples/Tables/DataTable";

function Analytics() {
  const { sales, tasks } = reportsLineChartData;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("loading...");

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
      <Tooltip title="Log Production" placement="bottom">
        <MDTypography
          variant="body1"
          color="primary"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
          onClick={() => {
            setModalContent(
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >hello</div>);
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
        >
          <Icon color="inherit">assessment</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {
          <div
            // centered and scrollable
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              overflow: "scroll",
              height: "90%",
              width: "80%",
              boxShadow: 24,
              p: 4,
            }}
          >

            {/* {modalContent} */}
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mt={3}>
                <DataTable
                  table={{
                    columns: [
                      { Header: "name", accessor: "name", width: "25%" },
                      { Header: "position", accessor: "position", width: "30%" },
                      { Header: "office", accessor: "office" },
                      { Header: "age", accessor: "age", width: "12%" },
                    ],
                    rows: [
                      {
                        name: "Hanny Baniard",
                        position: "Data Coordiator",
                        office: "Baorixile",
                        age: 42,
                        startDate: "4/11/2021",
                        salary: "$474,978",
                      },
                      {
                        name: "Lara Puleque",
                        position: "Payment Adjustment Coordinator",
                        office: "Cijangkar",
                        age: 47,
                        startDate: "8/2/2021",
                        salary: "$387,287",
                      },
                      {
                        name: "Torie Repper",
                        position: "Administrative Officer",
                        office: "Montpellier",
                        age: 25,
                        startDate: "4/21/2021",
                        salary: "$94,780",
                      },
                      {
                        name: "Nat Gair",
                        position: "Help Desk Technician",
                        office: "Imider",
                        age: 57,
                        startDate: "12/6/2020",
                        salary: "$179,177",
                      },
                      {
                        name: "Maggi Slowan",
                        position: "Help Desk Technician",
                        office: "Jaunpils",
                        age: 56,
                        startDate: "11/7/2020",
                        salary: "$440,874",
                      },
                      {
                        name: "Marleah Snipe",
                        position: "Account Representative II",
                        office: "Orekhovo-Borisovo Severnoye",
                        age: 31,
                        startDate: "7/18/2021",
                        salary: "$404,983",
                      },
                      {
                        name: "Georgia Danbury",
                        position: "Professor",
                        office: "Gniezno",
                        age: 50,
                        startDate: "10/1/2020",
                        salary: "$346,576",
                      },
                      {
                        name: "Bev Castan",
                        position: "Design Engineer",
                        office: "Acharnés",
                        age: 19,
                        startDate: "1/14/2021",
                        salary: "$445,171",
                      },
                      {
                        name: "Reggi Westney",
                        position: "Financial Advisor",
                        office: "Piuí",
                        age: 56,
                        startDate: "3/21/2021",
                        salary: "$441,569",
                      },
                      {
                        name: "Bartholomeus Prosh",
                        position: "Project Manager",
                        office: "Kelīshād va Sūdarjān",
                        age: 28,
                        startDate: "5/27/2021",
                        salary: "$336,238",
                      },
                      {
                        name: "Sheffy Feehely",
                        position: "Software Consultant",
                        office: "Ndibène Dahra",
                        age: 27,
                        startDate: "3/23/2021",
                        salary: "$473,391",
                      },
                      {
                        name: "Euphemia Chastelain",
                        position: "Engineer IV",
                        office: "Little Baguio",
                        age: 63,
                        startDate: "5/1/2021",
                        salary: "$339,489",
                      }, {
                        name: "Sheffy Feehely",
                        position: "Software Consultant",
                        office: "Ndibène Dahra",
                        age: 27,
                        startDate: "3/23/2021",
                        salary: "$473,391",
                      },
                      {
                        name: "Euphemia Chastelain",
                        position: "Engineer IV",
                        office: "Little Baguio",
                        age: 63,
                        startDate: "5/1/2021",
                        salary: "$339,489",
                      }, {
                        name: "Sheffy Feehely",
                        position: "Software Consultant",
                        office: "Ndibène Dahra",
                        age: 27,
                        startDate: "3/23/2021",
                        salary: "$473,391",
                      },
                      {
                        name: "Euphemia Chastelain",
                        position: "Engineer IV",
                        office: "Little Baguio",
                        age: 63,
                        startDate: "5/1/2021",
                        salary: "$339,489",
                      }, {
                        name: "Sheffy Feehely",
                        position: "Software Consultant",
                        office: "Ndibène Dahra",
                        age: 27,
                        startDate: "3/23/2021",
                        salary: "$473,391",
                      },
                      {
                        name: "Euphemia Chastelain",
                        position: "Engineer IV",
                        office: "Little Baguio",
                        age: 63,
                        startDate: "5/1/2021",
                        salary: "$339,489",
                      }, {
                        name: "Sheffy Feehely",
                        position: "Software Consultant",
                        office: "Ndibène Dahra",
                        age: 27,
                        startDate: "3/23/2021",
                        salary: "$473,391",
                      },
                      {
                        name: "Euphemia Chastelain",
                        position: "Engineer IV",
                        office: "Little Baguio",
                        age: 63,
                        startDate: "5/1/2021",
                        salary: "$339,489",
                      }, {
                        name: "Sheffy Feehely",
                        position: "Software Consultant",
                        office: "Ndibène Dahra",
                        age: 27,
                        startDate: "3/23/2021",
                        salary: "$473,391",
                      },
                      {
                        name: "Euphemia Chastelain",
                        position: "Engineer IV",
                        office: "Little Baguio",
                        age: 63,
                        startDate: "5/1/2021",
                        salary: "$339,489",
                      },
                    ]
                  }}
                />
              </MDBox>
            </Grid>
          </div>
        }
      </Modal>
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
            {/* create a Booking card for each product in products */}
            {
              products.map((product) => {
                return (
                  <Grid item xs={12} md={6} lg={4} key={product.name}>
                    <MDBox mt={3}>
                      <BookingCard
                        image={product1}
                        title={product.name}
                        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.'
                        price={product.quantity + " units"}
                        location={product.Buyer}
                        action={actionButtons}
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
