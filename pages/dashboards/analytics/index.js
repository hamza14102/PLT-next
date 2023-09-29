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
import { use, useEffect, useState } from "react";
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
import MDPagination from "/components/MDPagination";
import { animateScroll as scroll } from "react-scroll";

function Analytics() {
  const { sales, tasks } = reportsLineChartData;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const auth = useAuth();
  const getCurrentUserID = () => {
    if (!auth.isLoading && auth.user) {
      return auth.user.find((attr) => attr.Name === "name").Value;
    }
    return [];
  };

  // MAKE PAGINATION WORK FOR THIS PRODUCTS
  const [page, setPage] = useState(-1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);



  document.addEventListener('keydown', function (event) {
    if (event.key === "Escape" && modalOpen) {
      // code to close the modal
      setModalOpen(false);
    }
  });

  // trigger on page change and slice filteredProducts to get productsPerPage
  useEffect(() => {
    const start = page * productsPerPage;
    const end = start + productsPerPage;

    if (searchText === '') {
      setFilteredProducts(products.slice(start, end));
    } else {
      setFilteredProducts(searchResults.slice(start, end));
    }

  }, [page, productsPerPage]);

  useEffect(() => {
    const userID = getCurrentUserID();
    getFromTasksByAssignedUser(userID).then((res) => {
      setTotalPages(Math.ceil(res.length / productsPerPage));

      res = res.map((task) => {
        return {
          name: task.job_name,
          task_id: task._id,
          quantity: task.quantity,
          image_key: task.image_key,
          OMS: task['PO/OMS'],
          'Shipment Date': task.shipment_date,
          Buyer: task.Buyer,
          remaining: task.remaining ? task.remaining : task.quantity,
        };
      });

      setProducts(res);
      setFilteredProducts(res.slice(0, productsPerPage));
      loadImages();
      setLoading(false);
    }).then(() => {
      setPage(0);
    }
    );
  }, []);

  useEffect(() => {
    // load images for products on page load
    setLoading(true);
    async function fetchData() {
      await loadImages();
    }
    fetchData();
    setLoading(false);
  }, [filteredProducts]);



  const loadImages = async () => {
    filteredProducts.forEach((product) => {
      // if image_url is not already present, then get it from image_key
      if (!product.image_url) {

        getProductImagePresignedUrlFromImageKey(product.image_key).then((res) => {
          product.image_url = res;
          // get image from url
          const image = new Image();
          image.src = res;
          product.image = image;
          // console.log(product.image);
        }).then(() => {
          // trigger re-render
          setFilteredProducts([...filteredProducts]);
        });
      }
    }
    );
  }


  useEffect(() => {
    // console.log('Dashboard - ' + searchText);
    // if searchText is empty, then set products to all products
    if (searchText === '') {
      setLoading(true);
      setFilteredProducts(products.splice(page * productsPerPage, productsPerPage));
      setPage(0);
      setTotalPages(Math.ceil(products.length / productsPerPage));
    } else {
      // else, filter products by searchText

      const filteredProducts = products.filter((product) => {
        return product.name.toLowerCase().includes(searchText.toLowerCase());
      }
      );
      // setProducts(filteredProducts);
      setSearchResults(filteredProducts);
      setFilteredProducts(filteredProducts.slice(0, productsPerPage));
      // setLoading(false);
      setPage(0);
      setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
    }
  }, [searchText]);

  const handleScrollToTop = () => {
    // scroll to top of page on page change very smoothly and slowly
    scroll.scrollToTop({
      duration: 1000,
      smooth: true,
      offset: 50,
    });


  };


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
        {/* <MDButton
          variant="gradient"
          color="success"
          size="medium"
          sx={{
            position: "absolute",
            right: "1rem",
            top: "5rem",
          }}
          onClick={async () => {
            // print filteredProducts
            // await loadImages();
            console.log(filteredProducts);

          }}
          iconOnly
        >
          <Icon>refresh</Icon>
        </MDButton> */}
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
              !loading && filteredProducts.map((product) => {
                return (
                  <Grid item xs={4} md={4} lg={3} key={product.task_id}>
                    <MDBox mt={3}>
                      <BookingCard
                        image={product.image && product.image.src && product.image.height ? product.image : product1}
                        // image={product1}
                        description="Product Description"
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
      {/* center the pagination */}
      <MDBox display="flex" justifyContent="center" mb={3}>

        <MDPagination>
          <MDPagination
            item
            onClick={() => {
              if (page > 0) {
                setPage(page - 1);
                handleScrollToTop();
              }
            }
            }
          >
            <Icon>keyboard_arrow_left</Icon>
          </MDPagination>
          {/* create totalPages number of MDPagination items */}
          {/* if totalPages is more than 10 then only show three from current and end*/}
          {/* add a disabled separator betweeen them also */}
          {
            [...Array(totalPages)].map((e, i) => {
              if (totalPages > 10) {
                if (i === 0 || i === 1 || i === 2 || i === totalPages - 1 || i === totalPages - 2 || i === totalPages - 3 || i === page || i === page - 1 || i === page + 1) {
                  if (i == 2 && page > 3) {
                    // return a disabled separator
                    return (
                      <MDPagination
                        key={i}
                        item
                        disabled
                      >
                        ...
                      </MDPagination>
                    )
                  }
                  if (i == totalPages - 3 && page < totalPages - 4) {
                    // return a disabled separator
                    return (
                      <MDPagination
                        key={i}
                        item
                        disabled
                      >
                        ...
                      </MDPagination>
                    )
                  }
                  return (
                    <MDPagination
                      key={i}
                      item
                      active={page === i}
                      onClick={() => {
                        setPage(i);
                        handleScrollToTop();
                      }}
                    >
                      {i + 1}
                    </MDPagination>
                  )
                }
              } else {
                return (
                  <MDPagination
                    key={i}
                    item
                    active={page === i}
                    onClick={() => {
                      setPage(i);
                      handleScrollToTop();
                    }}
                  >
                    {i + 1}
                  </MDPagination>
                )
              }
            })
          }
          <MDPagination
            item
            onClick={() => {
              if (page < totalPages - 1) {
                setPage(page + 1);
                handleScrollToTop();
              }
            }
            }
          >
            <Icon>keyboard_arrow_right</Icon>
          </MDPagination>
        </MDPagination>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Analytics;
