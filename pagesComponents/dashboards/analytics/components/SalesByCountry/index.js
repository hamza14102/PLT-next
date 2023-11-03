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

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// NextJS Material Dashboard 2 PRO components
import MDBox from "/components/MDBox";
import MDTypography from "/components/MDTypography";

// NextJS Material Dashboard 2 PRO examples
import SalesTable from "/examples/Tables/SalesTable";

// Data
import salesTableData from "/pagesComponents/dashboards/analytics/components/SalesByCountry/data/salesTableData";

import { getFromProductsByAssignedUser } from "apiHelpers/products";
import { getFromTasksByAssignedUser } from "/apiHelpers/tasks";
import { getProductionLogs } from "/apiHelpers/productionLogs.js";

import { useAuth } from "hooks/use-auth";
import { CircularProgress } from "@mui/material";
import MDButton from "/components/MDButton";
import MDPagination from "/components/MDPagination";

function SalesByCountry() {
  const [products, setProducts] = useState([]);
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const getCurrentUserID = () => {
    if (!auth.isLoading && auth.user) {
      return auth.user.find((attr) => attr.Name === "name").Value;
    }
    return [];
  };

  useEffect(() => {
    const mapContainer = document.getElementById("map");
    const jsVectorMap = require("jsvectormap");
    require("jsvectormap/dist/maps/world-merc.js");


    const userID = getCurrentUserID();

    getProductionLogs().then((res) => {
      // console.log(res);
      // group by product_id

      let prod = res.reduce((acc, cur) => {
        if (acc[cur.product_id]) {
          acc[cur.product_id][0] += parseInt(cur.quantity);
          acc[cur.product_id][1] += parseInt(cur.planned);
        } else {
          // split cur.job_name into product name and job name by '|'
          // convert cur.quantity to int
          // convert cur.planned to int
          acc[cur.product_id] = [parseInt(cur.quantity), parseInt(cur.planned)];
        }
        return acc;
      }, {});
      console.log(prod);

      // change variable names to match your schema
      // res = res.map((product) => {
      //   return {
      //     name: product._id,
      //     quantity: product.Quantity,
      //     // total: product.price * product.quantity,
      //     'Date': product['Ship By Date'],
      //     Buyer: product.Buyer,
      //     Rejection: product.rejected > 0 ? (product.rejected / (product.Quantity - product.remaining) * 100).toFixed(1) + "%" : "0%",
      //     Progress: 100 - (product.remaining / product.Quantity * 100).toFixed(1) + "%",
      //     // remaining: product.remaining,
      //     // status: product.status,
      //     // createdAt: product.createdAt,
      //   };
      // });

      prod = Object.entries(prod).map(([key, product]) => {
        return {
          name: key,
          quantity: product[0],
          planned: product[1],
          efficiency: (product[0] / product[1] * 100).toFixed(1) + "%",
          // total: product.price * product.quantity,
          // 'Date': product['Ship By Date'],
          // Buyer: product.Buyer,
          // Rejection: product.rejected > 0 ? (product.rejected / (product.Quantity - product.remaining) * 100).toFixed(1) + "%" : "0%",
          // Progress: 100 - (product.remaining / product.Quantity * 100).toFixed(1) + "%",
          // remaining: product.remaining,
          // status: product.status,
        };
      });
      prod.sort((a, b) => (b.quantity / b.planned) - (a.quantity / a.planned));
      prod = prod.slice(0, 10);
      setProducts(prod);
      setLoading(false);
    });
    // console.log(prod);

    // console.log(prod);

    const createMap = () =>
      new jsVectorMap({
        selector: "#map",
        map: "world_merc",
        zoomOnScroll: false,
        zoomButtons: false,
        selectedMarkers: [],
        markersSelectable: false,
        markers: [
          // {
          //   name: "USA",
          //   coords: [40.71296415909766, -74.00437720027804],
          // },
          // {
          //   name: "Germany",
          //   coords: [51.17661451970939, 10.97947735117339],
          // },
          // {
          //   name: "Brazil",
          //   coords: [-7.596735421549542, -54.781694323779185],
          // },
          // {
          //   name: "Russia",
          //   coords: [62.318222797104276, 89.81564777631716],
          // },
          {
            name: "India",
            coords: [20.5937, 78.9629],
          },
        ],
        markerStyle: {
          initial: {
            fill: "#1A73E8",
          },
          hover: {
            fill: "#1A73E8",
          },
          selected: {
            fill: "#191919",
          },
        },
      });

    if (mapContainer && mapContainer.children.length === 0) createMap();

    () => mapContainer.children[0].remove();
  }, [loading]);

  return (
    <Card sx={{ width: "100%" }}>
      <MDBox display="flex">
        <MDBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          variant="gradient"
          bgColor="success"
          color="white"
          shadow="md"
          borderRadius="xl"
          ml={3}
          mt={-2}
        >
          <Icon fontSize="medium" color="inherit">
            sell
          </Icon>
        </MDBox>
        <MDTypography variant="h6" sx={{ mt: 2, mb: 1, ml: 2 }}>
          Top 10 Active Products
        </MDTypography>
        {
          loading ? (
            <CircularProgress
              sx={{
                position: "absolute",
                right: "1rem",
                top: "1rem",
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
                top: "1rem",
              }}
              onClick={() => {
                setLoading(true);
              }}
              iconOnly
            >
              <Icon>refresh</Icon>
            </MDButton>
          )
        }
      </MDBox>
      <MDBox p={2}>
        <Grid container>
          <Grid item xs={12} md={10} lg={10}>
            <SalesTable rows={products} shadow={false} />
          </Grid>
          <Grid item xs={12} md={2} lg={2} sx={{ mt: { xs: 5, lg: 0 } }}>
            <MDBox id="map" width="100%" height="100%" mt={-3} />
          </Grid>
        </Grid>
        {/* <MDBox display="flex" justifyContent="center" alignItems="center">
          <MDPagination>
            <MDPagination item>
              <Icon>keyboard_arrow_left</Icon>
            </MDPagination>
            <MDPagination item active>1</MDPagination>
            <MDPagination item>2</MDPagination>
            <MDPagination item>3</MDPagination>
            <MDPagination item>
              <Icon>keyboard_arrow_right</Icon>
            </MDPagination>
          </MDPagination>
        </MDBox> */}
      </MDBox>
    </Card>
  );
}

export default SalesByCountry;
